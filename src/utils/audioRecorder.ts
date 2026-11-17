export interface CapturedAudioResult {
  wavBase64: string;
  playbackUrl?: string;
  fallbackBase64?: string;
  fallbackMimeType?: string;
  durationMs: number;
  hadSpeech: boolean;
}

export interface UniversalCaptureOptions {
  maxDurationMs?: number;
  autoStopOnSilence?: boolean;
  silenceStopMs?: number;
  onSpeechDetected?: () => void;
  onStatusText?: (text: string) => void;
}

function getAudioContextCtor(): typeof AudioContext | null {
  if (typeof window === 'undefined') return null;
  return (window.AudioContext || (window as any).webkitAudioContext || null) as typeof AudioContext | null;
}

function pickSupportedRecorderMime(): string | undefined {
  if (typeof MediaRecorder === 'undefined' || typeof MediaRecorder.isTypeSupported !== 'function') {
    return undefined;
  }
  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg;codecs=opus',
    'audio/mp4',
  ];
  return candidates.find((m) => MediaRecorder.isTypeSupported(m));
}

function uint8ToBase64(bytes: Uint8Array): string {
  const CHUNK_SIZE = 0x8000;
  const parts: string[] = [];
  for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
    const slice = bytes.subarray(i, i + CHUNK_SIZE);
    parts.push(String.fromCharCode(...slice));
  }
  return btoa(parts.join(''));
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      resolve(result.split(',')[1] || '');
    };
    reader.onerror = () => reject(new Error('Lỗi đọc dữ liệu âm thanh.'));
    reader.readAsDataURL(blob);
  });
}

function mixDownToMono(audioBuffer: AudioBuffer): Float32Array {
  const channels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length;
  if (channels <= 1) {
    return audioBuffer.getChannelData(0).slice();
  }
  const mono = new Float32Array(length);
  for (let ch = 0; ch < channels; ch++) {
    const data = audioBuffer.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      mono[i] += data[i] / channels;
    }
  }
  return mono;
}

function resampleLinear(samples: Float32Array, sourceRate: number, targetRate = 16000): Float32Array {
  if (sourceRate === targetRate || samples.length === 0) return samples;
  const ratio = sourceRate / targetRate;
  const outLen = Math.max(1, Math.round(samples.length / ratio));
  const out = new Float32Array(outLen);
  for (let i = 0; i < outLen; i++) {
    const pos = i * ratio;
    const idx = Math.floor(pos);
    const frac = pos - idx;
    const a = samples[idx] ?? 0;
    const b = samples[Math.min(idx + 1, samples.length - 1)] ?? a;
    out[i] = a + (b - a) * frac;
  }
  return out;
}

async function resampleTo16kMono(audioBuffer: AudioBuffer): Promise<Float32Array> {
  if (audioBuffer.sampleRate === 16000 && audioBuffer.numberOfChannels === 1) {
    return audioBuffer.getChannelData(0).slice();
  }
  const OfflineCtx =
    typeof window !== 'undefined'
      ? (window.OfflineAudioContext || (window as any).webkitOfflineAudioContext)
      : null;

  if (OfflineCtx && audioBuffer.duration > 0.05) {
    try {
      const targetLen = Math.max(1, Math.ceil(audioBuffer.duration * 16000));
      const offline = new OfflineCtx(1, targetLen, 16000);
      const src = offline.createBufferSource();
      src.buffer = audioBuffer;
      src.connect(offline.destination);
      src.start(0);
      const rendered = await offline.startRendering();
      return rendered.getChannelData(0).slice();
    } catch {
      // Fallback to linear resampling below
    }
  }
  const mono = mixDownToMono(audioBuffer);
  return resampleLinear(mono, audioBuffer.sampleRate, 16000);
}

function encodeFloat32ToWavBuffer(samples: Float32Array, sampleRate = 16000): ArrayBuffer {
  const dataBytes = samples.length * 2;
  const buffer = new ArrayBuffer(44 + dataBytes);
  const view = new DataView(buffer);

  const writeAscii = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeAscii(0, 'RIFF');
  view.setUint32(4, 36 + dataBytes, true);
  writeAscii(8, 'WAVE');
  writeAscii(12, 'fmt ');
  view.setUint32(16, 16, true); // PCM fmt chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // Byte rate
  view.setUint16(32, 2, true); // Block align
  view.setUint16(34, 16, true); // 16-bit
  writeAscii(36, 'data');
  view.setUint32(40, dataBytes, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
    offset += 2;
  }

  return buffer;
}

function encodeFloat32ToWavBase64(samples: Float32Array, sampleRate = 16000): string {
  const buffer = encodeFloat32ToWavBuffer(samples, sampleRate);
  return uint8ToBase64(new Uint8Array(buffer));
}

/**
 * Peak/RMS-normalize recorded microphone samples with soft limiting so self-playback
 * is loud and clear without clipping or amplifying dead silence.
 */
export function createNormalizedPlaybackUrl(samples: Float32Array, sampleRate = 16000): string {
  if (samples.length === 0) return '';
  let sumSq = 0;
  let peak = 0;
  for (let i = 0; i < samples.length; i++) {
    const abs = Math.abs(samples[i]);
    if (abs > peak) peak = abs;
    sumSq += samples[i] * samples[i];
  }
  const rms = Math.sqrt(sumSq / samples.length);
  const out = new Float32Array(samples.length);

  if (peak < 0.005 || rms < 0.002) {
    out.set(samples);
  } else {
    // Boost quiet mic recordings toward ~0.18 RMS (capped at 8x), then soft-limit peaks above 0.85
    const gain = Math.min(8.0, Math.max(1.2, 0.18 / rms));
    const threshold = 0.85;
    const headroom = 0.13;
    for (let i = 0; i < samples.length; i++) {
      const s = samples[i] * gain;
      const abs = Math.abs(s);
      if (abs > threshold) {
        out[i] = Math.sign(s) * (threshold + headroom * Math.tanh((abs - threshold) / headroom));
      } else {
        out[i] = s;
      }
    }
  }

  const wavBuffer = encodeFloat32ToWavBuffer(out, sampleRate);
  const blob = new Blob([wavBuffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

function concatFloat32Chunks(chunks: Float32Array[]): Float32Array {
  const total = chunks.reduce((acc, c) => acc + c.length, 0);
  const merged = new Float32Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }
  return merged;
}

function mapMicError(err: unknown): Error {
  const name = (err as any)?.name || '';
  if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
    return new Error('Bạn chưa cấp quyền Micro. Vui lòng bấm cho phép Micro trên thanh địa chỉ trình duyệt.');
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
    return new Error('Không tìm thấy Micro trên thiết bị này.');
  }
  if (name === 'NotReadableError' || name === 'TrackStartError') {
    return new Error('Micro đang được ứng dụng khác sử dụng hoặc không khả dụng.');
  }
  return err instanceof Error ? err : new Error('Không thể mở Micro để ghi âm.');
}

async function openMicStream(): Promise<MediaStream> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    if (typeof window !== 'undefined' && !window.isSecureContext) {
      throw new Error(
        'Trình duyệt chặn Micro vì địa chỉ không phải localhost hoặc HTTPS. Hãy truy cập qua http://localhost:5173 hoặc http://localhost:3001.'
      );
    }
    throw new Error('Trình duyệt này không hỗ trợ ghi âm Micro (getUserMedia).');
  }

  try {
    // Disable echoCancellation so Windows/Bluetooth headsets do not enter low-volume VoIP/HFP ducking mode
    return await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
  } catch (err: any) {
    if (err?.name === 'OverconstrainedError' || err?.name === 'ConstraintNotSatisfiedError') {
      return await navigator.mediaDevices.getUserMedia({ audio: true });
    }
    throw mapMicError(err);
  }
}

/**
 * Capture microphone audio across ALL browsers (Chrome, Edge, Brave, Firefox, Safari, WebViews),
 * detect silence automatically (VAD), support manual early stop, and encode as 16kHz mono WAV.
 */
export function startUniversalAudioCapture(options: UniversalCaptureOptions = {}): {
  promise: Promise<CapturedAudioResult>;
  stop: () => void;
} {
  const maxDurationMs = options.maxDurationMs ?? 8000;
  const autoStopOnSilence = options.autoStopOnSilence ?? true;
  const silenceStopMs = options.silenceStopMs ?? 1200;

  // Create AudioContext synchronously inside user click gesture for Safari / WebView compatibility
  const AudioCtx = getAudioContextCtor();
  const audioCtx = AudioCtx ? new AudioCtx() : null;
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  let stopped = false;
  let stopFn = () => {
    stopped = true;
  };

  const promise = new Promise<CapturedAudioResult>((resolve, reject) => {
    let stream: MediaStream | null = null;
    let recorder: MediaRecorder | null = null;
    let processor: ScriptProcessorNode | null = null;
    let silentGain: GainNode | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let maxTimer: ReturnType<typeof setTimeout> | null = null;
    let vadTimer: ReturnType<typeof setInterval> | null = null;
    let settled = false;

    const pcmChunks: Float32Array[] = [];
    const mediaChunks: Blob[] = [];
    let hadSpeech = false;
    let startedAt = Date.now();

    const cleanupAudioGraph = () => {
      if (maxTimer) {
        clearTimeout(maxTimer);
        maxTimer = null;
      }
      if (vadTimer) {
        clearInterval(vadTimer);
        vadTimer = null;
      }
      try {
        processor?.disconnect();
        silentGain?.disconnect();
        source?.disconnect();
      } catch {
        // ignore disconnect errors
      }
      stream?.getTracks().forEach((t) => t.stop());
    };

    const closeAudioCtx = () => {
      if (audioCtx && audioCtx.state !== 'closed') {
        audioCtx.close().catch(() => {});
      }
    };

    const finalizeCapture = async () => {
      if (settled) return;
      settled = true;
      cleanupAudioGraph();

      const durationMs = Date.now() - startedAt;
      const mimeType = recorder?.mimeType || 'audio/webm';
      const blob = mediaChunks.length > 0 ? new Blob(mediaChunks, { type: mimeType }) : null;

      let wavBase64 = '';
      let playbackUrl: string | undefined;
      let fallbackBase64: string | undefined;

      if (blob && blob.size > 0) {
        try {
          if (audioCtx) {
            const arrBuf = await blob.arrayBuffer();
            const decoded = await audioCtx.decodeAudioData(arrBuf.slice(0));
            const resampled = await resampleTo16kMono(decoded);
            wavBase64 = encodeFloat32ToWavBase64(resampled, 16000);
            playbackUrl = createNormalizedPlaybackUrl(resampled, 16000);
          }
        } catch {
          // Will fall back to raw PCM chunks or compressed blob below
        }

        if (!wavBase64) {
          fallbackBase64 = await blobToBase64(blob);
          if (!playbackUrl) {
            playbackUrl = URL.createObjectURL(blob);
          }
        }
      }

      if (!wavBase64 && pcmChunks.length > 0 && audioCtx) {
        const merged = concatFloat32Chunks(pcmChunks);
        const resampled = resampleLinear(merged, audioCtx.sampleRate, 16000);
        wavBase64 = encodeFloat32ToWavBase64(resampled, 16000);
        if (!playbackUrl) {
          playbackUrl = createNormalizedPlaybackUrl(resampled, 16000);
        }
      }

      closeAudioCtx();

      if (!wavBase64 && !fallbackBase64) {
        reject(new Error('Không thu được dữ liệu âm thanh từ Micro.'));
        return;
      }

      resolve({
        wavBase64,
        playbackUrl,
        fallbackBase64,
        fallbackMimeType: mimeType,
        durationMs,
        hadSpeech,
      });
    };

    const triggerStop = () => {
      if (stopped) return;
      stopped = true;
      if (recorder && recorder.state !== 'inactive') {
        try {
          recorder.stop();
          return;
        } catch {
          // Fall through to manual finalize
        }
      }
      void finalizeCapture();
    };

    stopFn = triggerStop;

    openMicStream()
      .then((micStream) => {
        if (stopped) {
          micStream.getTracks().forEach((t) => t.stop());
          closeAudioCtx();
          reject(new Error('Đã hủy thu âm.'));
          return;
        }

        stream = micStream;
        startedAt = Date.now();
        options.onStatusText?.('Đang nghe... (nói xong sẽ tự chấm, hoặc bấm lại để dừng)');

        if (audioCtx) {
          if (audioCtx.state === 'suspended') {
            audioCtx.resume().catch(() => {});
          }
          source = audioCtx.createMediaStreamSource(micStream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 1024;
          source.connect(analyser);

          // Capture raw Float32 PCM backup in parallel in case a webview fails decodeAudioData
          if (typeof audioCtx.createScriptProcessor === 'function') {
            processor = audioCtx.createScriptProcessor(4096, 1, 1);
            silentGain = audioCtx.createGain();
            silentGain.gain.value = 0;
            processor.onaudioprocess = (ev) => {
              if (!stopped) {
                pcmChunks.push(ev.inputBuffer.getChannelData(0).slice());
              }
            };
            source.connect(processor);
            processor.connect(silentGain);
            silentGain.connect(audioCtx.destination);
          }

          // Voice Activity Detection (VAD) for automatic stop after speech ends
          const timeData = new Float32Array(analyser.fftSize);
          let speechFrames = 0;
          let lastSpeechAt = Date.now();

          vadTimer = setInterval(() => {
            if (stopped) return;
            const elapsed = Date.now() - startedAt;
            if (elapsed < 220) return;

            analyser.getFloatTimeDomainData(timeData);
            let sumSq = 0;
            let peak = 0;
            for (let i = 0; i < timeData.length; i++) {
              const v = timeData[i];
              const abs = Math.abs(v);
              if (abs > peak) peak = abs;
              sumSq += v * v;
            }
            const rms = Math.sqrt(sumSq / timeData.length);

            if (rms > 0.015 || peak > 0.045) {
              speechFrames += 1;
              lastSpeechAt = Date.now();
              if (!hadSpeech && speechFrames >= 2) {
                hadSpeech = true;
                options.onSpeechDetected?.();
                options.onStatusText?.('Đang thu giọng nói... (ngừng nói hoặc bấm lại để chấm)');
              }
            } else if (hadSpeech && autoStopOnSilence && Date.now() - lastSpeechAt >= silenceStopMs) {
              triggerStop();
            }
          }, 60);
        }

        if (typeof MediaRecorder !== 'undefined') {
          const preferredMime = pickSupportedRecorderMime();
          recorder = preferredMime ? new MediaRecorder(micStream, { mimeType: preferredMime }) : new MediaRecorder(micStream);
          recorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
              mediaChunks.push(e.data);
            }
          };
          recorder.onerror = () => {
            if (!settled) {
              void finalizeCapture();
            }
          };
          recorder.onstop = () => {
            void finalizeCapture();
          };
          recorder.start(150);
        }

        maxTimer = setTimeout(() => {
          triggerStop();
        }, maxDurationMs);
      })
      .catch((err) => {
        cleanupAudioGraph();
        closeAudioCtx();
        reject(mapMicError(err));
      });
  });

  return {
    promise,
    stop: () => stopFn(),
  };
}

/**
 * Lightweight parallel recorder for browsers using native Web Speech API (Chrome)
 * so learners can also replay their exact spoken voice right after scoring.
 */
export function startParallelAudioBackup(): {
  stopAndGetUrl: (abort?: boolean) => Promise<string | undefined>;
} {
  if (
    typeof navigator === 'undefined' ||
    !navigator.mediaDevices?.getUserMedia ||
    typeof MediaRecorder === 'undefined'
  ) {
    return { stopAndGetUrl: async () => undefined };
  }

  let stream: MediaStream | null = null;
  let recorder: MediaRecorder | null = null;
  const chunks: Blob[] = [];
  let finished = false;
  let aborted = false;
  let readyPromise: Promise<void>;
  let resolveStopUrl: ((url: string | undefined) => void) | null = null;
  let stopPromise: Promise<string | undefined> | null = null;

  const AudioCtx = getAudioContextCtor();

  const cleanup = () => {
    stream?.getTracks().forEach((t) => t.stop());
    stream = null;
  };

  readyPromise = navigator.mediaDevices
    .getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: true,
        autoGainControl: true,
      },
    })
    .then((micStream) => {
      if (aborted || finished) {
        micStream.getTracks().forEach((t) => t.stop());
        return;
      }
      stream = micStream;
      const mime = pickSupportedRecorderMime();
      recorder = mime ? new MediaRecorder(micStream, { mimeType: mime }) : new MediaRecorder(micStream);
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };
      recorder.onstop = async () => {
        const mimeType = recorder?.mimeType || 'audio/webm';
        cleanup();
        if (aborted || chunks.length === 0) {
          resolveStopUrl?.(undefined);
          return;
        }
        const blob = new Blob(chunks, { type: mimeType });
        if (AudioCtx) {
          const ctx = new AudioCtx();
          try {
            const arr = await blob.arrayBuffer();
            const decoded = await ctx.decodeAudioData(arr.slice(0));
            const resampled = await resampleTo16kMono(decoded);
            const url = createNormalizedPlaybackUrl(resampled, 16000);
            resolveStopUrl?.(url || URL.createObjectURL(blob));
            return;
          } catch {
            // fallback to raw blob url below
          } finally {
            ctx.close().catch(() => {});
          }
        }
        resolveStopUrl?.(URL.createObjectURL(blob));
      };
      recorder.start(150);
    })
    .catch(() => {
      cleanup();
    });

  return {
    stopAndGetUrl: async (shouldAbort = false) => {
      if (shouldAbort) aborted = true;
      if (stopPromise) return stopPromise;
      finished = true;

      stopPromise = (async () => {
        await readyPromise;
        if (!recorder || recorder.state === 'inactive' || aborted) {
          cleanup();
          return undefined;
        }
        return await new Promise<string | undefined>((resolve) => {
          resolveStopUrl = resolve;
          try {
            recorder!.stop();
          } catch {
            cleanup();
            resolve(undefined);
          }
        });
      })();

      return stopPromise;
    },
  };
}
