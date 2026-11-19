import { AccentMode } from '../types/learning';
import { startParallelAudioBackup, startUniversalAudioCapture } from './audioRecorder';
import { SttProviderMode, transcribeSpeechViaServer } from './storage';

let serverHasGeminiKey = false;
let serverSttProvider: SttProviderMode = 'auto';

const WEB_SPEECH_BLOCKED_KEY = 'myenglish_webspeech_blocked_v1';

export function setServerHasGeminiKey(flag: boolean): void {
  serverHasGeminiKey = flag;
}

export function setServerSttProvider(provider: SttProviderMode): void {
  serverSttProvider = provider;
}

function isWebSpeechFlaggedBlocked(): boolean {
  try {
    return sessionStorage.getItem(WEB_SPEECH_BLOCKED_KEY) === '1';
  } catch {
    return false;
  }
}

function markWebSpeechBlocked(): void {
  try {
    sessionStorage.setItem(WEB_SPEECH_BLOCKED_KEY, '1');
  } catch {
    // ignore storage restriction
  }
}

function isKnownUnsupportedWebSpeechBrowser(): boolean {
  if (typeof navigator === 'undefined') return true;
  const ua = navigator.userAgent || '';
  if ((navigator as any).brave) return true;
  if (/Edg\/|OPR\/|Vivaldi\/|Electron\/|SamsungBrowser\/|Firefox\/|; wv\)/i.test(ua)) {
    return true;
  }
  return false;
}

function shouldUseUniversalServerStt(): boolean {
  if (serverSttProvider === 'local' || serverSttProvider === 'gemini') {
    return true;
  }
  const SpeechRec =
    typeof window !== 'undefined' &&
    ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  if (!SpeechRec) return true;
  if (isWebSpeechFlaggedBlocked()) return true;
  if (isKnownUnsupportedWebSpeechBrowser()) return true;
  return false;
}

export function hasServerGeminiFallback(): boolean {
  return serverHasGeminiKey;
}

export interface WordMatchResult {
  word: string;
  displayWord: string;
  status: 'correct' | 'close' | 'wrong';
  spokenWord?: string;
  reason: 'matched' | 'mispronounced' | 'substituted' | 'missing';
}

export interface PronunciationScoreResult {
  score: number; // 0 - 100
  transcript: string;
  wordResults: WordMatchResult[];
  feedback: string;
  correctCount: number;
  closeCount: number;
  wrongCount: number;
  totalWords: number;
  wrongWords: string[];
  extraWords: string[];
}

export interface SpeechRecognitionOptions {
  continuous?: boolean;
  onInterim?: (transcript: string) => void;
  maxDurationMs?: number;
}

export interface SpeechRecognitionResultMeta {
  audioUrl?: string;
  provider?: 'web-speech' | 'server-stt';
}

export type TtsVoicePreset = 'teacher-warm' | 'kid-cute';

const TTS_VOICE_PRESET_KEY = 'myenglish_tts_voice_preset_v1';

export function getStoredTtsVoicePreset(): TtsVoicePreset {
  try {
    const raw = localStorage.getItem(TTS_VOICE_PRESET_KEY);
    return raw === 'kid-cute' ? 'kid-cute' : 'teacher-warm';
  } catch {
    return 'teacher-warm';
  }
}

export function setStoredTtsVoicePreset(preset: TtsVoicePreset): void {
  try {
    localStorage.setItem(TTS_VOICE_PRESET_KEY, preset);
  } catch {
    // ignore storage restrictions
  }
}

export interface SpeakTextOptions {
  onEnded?: () => void;
  voicePreset?: TtsVoicePreset;
  preferNeural?: boolean;
}

let ttsScheduleTimer: ReturnType<typeof setTimeout> | null = null;
let activeAudioPlayer: HTMLAudioElement | null = null;
let activeAudioCtx: AudioContext | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;
let activePlaybackCancelHook: (() => void) | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];

// Pre-warm speechSynthesis voice list on browser load & listen for async voice hydration
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const refreshVoices = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
  refreshVoices();
  window.speechSynthesis.addEventListener?.('voiceschanged', refreshVoices);
}

export function stopActiveAudioPlayback(): void {
  if (ttsScheduleTimer) {
    clearTimeout(ttsScheduleTimer);
    ttsScheduleTimer = null;
  }
  if (activePlaybackCancelHook) {
    const hook = activePlaybackCancelHook;
    activePlaybackCancelHook = null;
    hook();
  }
  if (activeAudioPlayer) {
    try {
      activeAudioPlayer.onended = null;
      activeAudioPlayer.onerror = null;
      activeAudioPlayer.pause();
      activeAudioPlayer.currentTime = 0;
    } catch {
      // ignore
    }
    activeAudioPlayer = null;
  }
  if (activeAudioCtx && activeAudioCtx.state !== 'closed') {
    activeAudioCtx.close().catch(() => {});
    activeAudioCtx = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
    activeUtterance = null;
  }
}

/**
 * Play an audio file/URL with optional Web Audio gain boost + soft limiter so quiet
 * dictionary MP3s and recorded clips sound loud and clear without clipping.
 */
export function playLoudAudioUrl(
  url: string,
  options: { gain?: number; onEnded?: () => void; onError?: () => void } = {}
): () => void {
  stopActiveAudioPlayback();
  let cancelled = false;
  const cancelSelf = () => {
    cancelled = true;
  };
  activePlaybackCancelHook = cancelSelf;

  const gainValue = options.gain ?? 1.5;
  const audio = new Audio();
  if (!url.startsWith('blob:') && !url.startsWith('data:') && !url.startsWith('/')) {
    audio.crossOrigin = 'anonymous';
  }
  audio.src = url;
  activeAudioPlayer = audio;

  const AudioCtx =
    typeof window !== 'undefined'
      ? (window.AudioContext || (window as any).webkitAudioContext)
      : null;

  if (AudioCtx && gainValue !== 1.0) {
    try {
      const ctx = new AudioCtx() as AudioContext;
      activeAudioCtx = ctx;
      const src = ctx.createMediaElementSource(audio);
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -16;
      compressor.knee.value = 18;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.005;
      compressor.release.value = 0.15;

      const gainNode = ctx.createGain();
      gainNode.gain.value = gainValue;

      src.connect(gainNode);
      gainNode.connect(compressor);
      compressor.connect(ctx.destination);
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    } catch {
      // Fallback to direct HTMLAudioElement output if Web Audio wiring fails
    }
  }

  audio.onended = () => {
    if (cancelled) return;
    if (activePlaybackCancelHook === cancelSelf) activePlaybackCancelHook = null;
    stopActiveAudioPlayback();
    options.onEnded?.();
  };
  audio.onerror = () => {
    if (cancelled) return;
    if (activePlaybackCancelHook === cancelSelf) activePlaybackCancelHook = null;
    stopActiveAudioPlayback();
    options.onError?.();
  };

  audio.play().catch((err) => {
    if (cancelled) return;
    const errName = err?.name || '';
    if (errName === 'AbortError') return;
    if (activePlaybackCancelHook === cancelSelf) activePlaybackCancelHook = null;
    stopActiveAudioPlayback();
    if (errName === 'NotAllowedError') {
      // Browser autoplay blocked before first user gesture — don't cascade into blocked fallback
      return;
    }
    options.onError?.();
  });

  return () => {
    cancelSelf();
    stopActiveAudioPlayback();
  };
}

function buildNeuralTtsUrl(
  text: string,
  accent: AccentMode,
  rate: number,
  preset: TtsVoicePreset
): string {
  const params = new URLSearchParams({
    text: text.trim().slice(0, 500),
    accent,
    rate: String(Number.isFinite(rate) ? Number(rate.toFixed(2)) : 1.0),
    preset,
  });
  return `/api/tts?${params.toString()}`;
}

/**
 * Tải trước âm thanh giọng nữ Neural vào cache server/trình duyệt để chạm là phát tức thì.
 */
export function prefetchTtsAudio(
  texts: string[],
  accent: AccentMode = 'en-US',
  rate: number = 0.85,
  preset: TtsVoicePreset = getStoredTtsVoicePreset()
): void {
  if (typeof window === 'undefined' || !texts.length) return;
  const unique = Array.from(new Set(texts.map((t) => t.trim()).filter(Boolean))).slice(0, 14);
  let idx = 0;
  const pump = () => {
    if (idx >= unique.length) return;
    const text = unique[idx++];
    const url = buildNeuralTtsUrl(text, accent, rate, preset);
    fetch(url, { method: 'GET' })
      .catch(() => {})
      .finally(() => {
        if (idx < unique.length) {
          setTimeout(pump, 120);
        }
      });
  };
  setTimeout(pump, 150);
}

function pickBestFemaleVoice(
  voices: SpeechSynthesisVoice[],
  accent: AccentMode
): SpeechSynthesisVoice | undefined {
  if (!voices.length) return undefined;
  const targetLang = accent.toLowerCase();
  const targetPrefix = targetLang.split('-')[0];
  const normLang = (v: SpeechSynthesisVoice) => (v.lang || '').replace('_', '-').toLowerCase();

  const maleRegex =
    /david|mark|george|ryan|guy|daniel|richard|james|eric|roger|steffan|andrew|brian|christopher|liam|connor|mitchell|william|thomas|\bmale\b/i;
  const neuralFemaleRegex =
    /\b(ana|ava|aria|jenny|emma|sonia|libby|maisie|michelle)\b|natural|neural/i;
  const sweetFemaleRegex =
    /google us english|google uk english female|samantha|victoria|karen|moira|tessa|fiona|zira|hazel|susan|catherine|female/i;

  let best: SpeechSynthesisVoice | undefined;
  let bestScore = -Infinity;

  for (const v of voices) {
    const lang = normLang(v);
    if (!lang.startsWith(targetPrefix)) continue;

    let score = lang === targetLang ? 100 : 50;
    const name = v.name || '';
    if (maleRegex.test(name)) {
      score -= 1000;
    } else {
      if (neuralFemaleRegex.test(name)) score += 220;
      if (sweetFemaleRegex.test(name)) score += 150;
      if (/online/i.test(name)) score += 40;
    }

    if (score > bestScore) {
      bestScore = score;
      best = v;
    }
  }
  return best;
}

/**
 * Phát âm văn bản tiếng Anh chuẩn bằng giọng nữ Neural AI (tự động fallback giọng nữ trình duyệt nếu offline).
 */
export function speakText(
  text: string,
  accent: AccentMode = 'en-US',
  rate: number = 1.0,
  audioUrl?: string,
  options?: SpeakTextOptions
): void {
  const cleanText = String(text || '').trim();
  if (!cleanText) {
    options?.onEnded?.();
    return;
  }

  const preset = options?.voicePreset || getStoredTtsVoicePreset();
  const preferNeural = options?.preferNeural !== false;

  const playNeuralOrFallback = () => {
    if (!preferNeural) {
      fallbackTTS(cleanText, accent, rate, options?.onEnded);
      return;
    }
    const ttsUrl = buildNeuralTtsUrl(cleanText, accent, rate, preset);
    playLoudAudioUrl(ttsUrl, {
      gain: 1.0,
      onEnded: options?.onEnded,
      onError: () => fallbackTTS(cleanText, accent, rate, options?.onEnded),
    });
  };

  if (rate === 1.0 && audioUrl) {
    playLoudAudioUrl(audioUrl, {
      gain: 1.85,
      onEnded: options?.onEnded,
      onError: playNeuralOrFallback,
    });
    return;
  }

  playNeuralOrFallback();
}

function fallbackTTS(
  text: string,
  accent: AccentMode,
  rate: number,
  onEnded?: () => void
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnded?.();
    return;
  }
  stopActiveAudioPlayback();
  const synth = window.speechSynthesis;

  const speakNow = () => {
    if (synth.paused) {
      synth.resume();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = accent;
    utterance.rate = rate;
    utterance.pitch = 1.06;
    utterance.volume = 1.0;

    const liveVoices = synth.getVoices();
    const voices = liveVoices.length ? liveVoices : cachedVoices;
    const preferred = pickBestFemaleVoice(voices, accent);

    if (preferred) {
      utterance.voice = preferred;
    }

    activeUtterance = utterance;
    utterance.onend = () => {
      if (activeUtterance === utterance) activeUtterance = null;
      onEnded?.();
    };
    utterance.onerror = () => {
      if (activeUtterance === utterance) activeUtterance = null;
    };

    synth.speak(utterance);
  };

  // Chromium/Edge clips the start of short single words if cancel() and speak() fire on the same tick
  ttsScheduleTimer = setTimeout(() => {
    ttsScheduleTimer = null;
    speakNow();
  }, 55);
}

export function startControllableAudioRecording(durationMs = 4000): {
  promise: Promise<{ blob: Blob; url: string; mimeType: string }>;
  stop: () => void;
} {
  let activeRecorder: MediaRecorder | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const stop = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (activeRecorder && activeRecorder.state !== 'inactive') {
      try {
        activeRecorder.stop();
      } catch {
        // ignore
      }
    }
  };

  const promise = new Promise<{ blob: Blob; url: string; mimeType: string }>((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      reject(new Error('Trình duyệt không hỗ trợ ghi âm Micro.'));
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        activeRecorder = recorder;
        const chunks: Blob[] = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };
        recorder.onerror = () => {
          if (timer) clearTimeout(timer);
          stream.getTracks().forEach((t) => t.stop());
          reject(new Error('Không thể ghi âm từ Micro.'));
        };
        recorder.onstop = () => {
          if (timer) clearTimeout(timer);
          stream.getTracks().forEach((t) => t.stop());
          const mimeType = recorder.mimeType || 'audio/webm';
          const blob = new Blob(chunks, { type: mimeType });
          const url = URL.createObjectURL(blob);
          resolve({ blob, url, mimeType });
        };

        recorder.start();
        timer = setTimeout(() => {
          stop();
        }, durationMs);
      })
      .catch((err) => {
        reject(err instanceof Error ? err : new Error('Không thể mở Micro để ghi âm.'));
      });
  });

  return { promise, stop };
}

export async function recordAudioClip(durationMs = 4000): Promise<{ blob: Blob; url: string; mimeType: string }> {
  return startControllableAudioRecording(durationMs).promise;
}

/**
 * Kiểm tra trình duyệt có hỗ trợ nhận diện giọng nói hoặc thu âm Micro đa trình duyệt không.
 */
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(
    (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      navigator.mediaDevices?.getUserMedia ||
      !window.isSecureContext
  );
}

/**
 * Bắt đầu thu giọng nói đa trình duyệt:
 * - Tự động dùng Universal Audio Capture (16kHz WAV + VAD) + Backend Whisper/Gemini trên Edge/Brave/Firefox/Safari/Webview.
 * - Trên Chrome chính chủ: dùng Web Speech API (realtime) và tự chuyển dự phòng + ghi nhớ nếu gặp lỗi network.
 * - Gọi hàm trả về stop(false) để dừng & chấm ngay, hoặc stop(true) để hủy.
 */
export function startSpeechRecognition(
  accent: AccentMode,
  onResult: (transcript: string, meta?: SpeechRecognitionResultMeta) => void,
  onError: (msg: string) => void,
  onEnd?: () => void,
  options?: SpeechRecognitionOptions
): (abort?: boolean) => void {
  const isContinuous = Boolean(options?.continuous);
  const maxDurationMs = options?.maxDurationMs ?? (isContinuous ? 25000 : 8000);
  let universalStopper: (() => void) | null = null;
  let aborted = false;
  let cancelledByError = false;

  const runUniversalServerStt = async () => {
    let createdPlaybackUrl: string | undefined;
    try {
      const capture = startUniversalAudioCapture({
        maxDurationMs,
        autoStopOnSilence: !isContinuous,
        silenceStopMs: isContinuous ? 2200 : 1150,
        onStatusText: (statusText) => {
          if (!aborted) options?.onInterim?.(statusText);
        },
      });
      universalStopper = capture.stop;
      const captured = await capture.promise;
      createdPlaybackUrl = captured.playbackUrl;
      if (aborted) {
        if (createdPlaybackUrl) URL.revokeObjectURL(createdPlaybackUrl);
        return;
      }

      options?.onInterim?.('Đang phân tích giọng nói...');
      const stt = await transcribeSpeechViaServer({
        wavBase64: captured.wavBase64,
        fallbackBase64: captured.fallbackBase64,
        fallbackMimeType: captured.fallbackMimeType,
      });
      if (aborted) {
        if (createdPlaybackUrl) URL.revokeObjectURL(createdPlaybackUrl);
        return;
      }

      if (!stt.transcript || stt.silent) {
        if (createdPlaybackUrl) URL.revokeObjectURL(createdPlaybackUrl);
        onError('Không nghe thấy giọng nói rõ ràng. Hãy nói to và rõ hơn gần Micro nhé!');
      } else {
        onResult(stt.transcript, { audioUrl: createdPlaybackUrl, provider: 'server-stt' });
      }
    } catch (err: any) {
      if (createdPlaybackUrl) URL.revokeObjectURL(createdPlaybackUrl);
      if (!aborted) {
        onError(err?.message || 'Không thể thu âm hoặc kết nối máy chủ nhận diện giọng nói.');
      }
    } finally {
      universalStopper = null;
      onEnd?.();
    }
  };

  if (shouldUseUniversalServerStt()) {
    void runUniversalServerStt();
    return (shouldAbort = false) => {
      if (shouldAbort) aborted = true;
      universalStopper?.();
    };
  }

  const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const backupRecorder = startParallelAudioBackup();
  let handedOffToFallback = false;
  let latestTranscript = '';
  let deliveredResult = false;
  let pendingDeliveryPromise: Promise<void> | null = null;

  const recognition = new SpeechRec();
  recognition.lang = accent;
  recognition.continuous = isContinuous;
  recognition.interimResults = Boolean(isContinuous || options?.onInterim);
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    if (aborted) return;
    if (isContinuous) {
      const finals: string[] = [];
      const interims: string[] = [];
      for (let i = 0; i < (event.results?.length || 0); i++) {
        const res = event.results[i];
        const piece = res?.[0]?.transcript || '';
        if (!piece) continue;
        if (res.isFinal) finals.push(piece.trim());
        else interims.push(piece.trim());
      }
      latestTranscript = [...finals, ...interims].join(' ').trim();
      options?.onInterim?.(latestTranscript);
      return;
    }

    const res = event.results?.[0];
    const transcript = res?.[0]?.transcript || '';
    if (res && !res.isFinal) {
      options?.onInterim?.(transcript);
      return;
    }
    deliveredResult = true;
    pendingDeliveryPromise = (async () => {
      const audioUrl = await backupRecorder.stopAndGetUrl(false);
      if (!aborted) {
        onResult(transcript, { audioUrl, provider: 'web-speech' });
      } else if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    })();
  };

  recognition.onerror = (event: any) => {
    if (aborted || event.error === 'aborted') {
      return;
    }
    if (event.error === 'not-allowed') {
      cancelledByError = true;
      void backupRecorder.stopAndGetUrl(true);
      onError('Bạn chưa cấp quyền Micro. Vui lòng bấm cho phép Micro trên thanh địa chỉ trình duyệt.');
    } else if (event.error === 'no-speech') {
      if (!isContinuous || !latestTranscript.trim()) {
        cancelledByError = true;
        void backupRecorder.stopAndGetUrl(true);
        onError('Không nghe thấy giọng nói. Hãy nói to và rõ hơn gần Micro nhé!');
      }
    } else if (
      event.error === 'network' ||
      event.error === 'service-not-allowed' ||
      event.error === 'language-not-supported'
    ) {
      markWebSpeechBlocked();
      handedOffToFallback = true;
      void backupRecorder.stopAndGetUrl(true);
      options?.onInterim?.('Chuyển sang chế độ thu âm đa trình duyệt — mời bạn đọc...');
      void runUniversalServerStt();
    } else {
      cancelledByError = true;
      void backupRecorder.stopAndGetUrl(true);
      onError(`Lỗi nhận diện giọng nói: ${event.error}`);
    }
  };

  recognition.onend = () => {
    if (handedOffToFallback) return;
    void (async () => {
      if (pendingDeliveryPromise) {
        await pendingDeliveryPromise;
      } else if (!aborted && isContinuous && !deliveredResult && !cancelledByError) {
        const cleaned = latestTranscript.trim();
        if (cleaned) {
          deliveredResult = true;
          const audioUrl = await backupRecorder.stopAndGetUrl(false);
          if (!aborted) {
            onResult(cleaned, { audioUrl, provider: 'web-speech' });
          } else if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
          }
        } else {
          await backupRecorder.stopAndGetUrl(true);
          onError('Chưa thu được câu nào rõ ràng. Hãy thử đọc lại to hơn gần Micro nhé!');
        }
      } else {
        await backupRecorder.stopAndGetUrl(true);
      }
      onEnd?.();
    })();
  };

  try {
    recognition.start();
  } catch {
    markWebSpeechBlocked();
    handedOffToFallback = true;
    void backupRecorder.stopAndGetUrl(true);
    void runUniversalServerStt();
  }

  return (shouldAbort = false) => {
    if (shouldAbort) {
      aborted = true;
      void backupRecorder.stopAndGetUrl(true);
    }
    if (universalStopper) {
      universalStopper();
      return;
    }
    try {
      if (shouldAbort) recognition.abort();
      else recognition.stop();
    } catch {
      // ignore
    }
  };
}

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

function normalizeSingleWord(token: string): string {
  return token.toLowerCase().replace(/[^a-z0-9']/g, '');
}

function normalizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function wordSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  return maxLen === 0 ? 1 : (maxLen - dist) / maxLen;
}

/**
 * Chấm điểm phát âm theo thứ tự từ trong câu/đoạn văn (Dynamic Programming sequence alignment).
 * Phân biệt rõ: Đúng (correct), Gần đúng/Lệch âm (close), Sai hoặc Bỏ sót (wrong), và Từ đọc dư (extraWords).
 */
export function scorePronunciation(expected: string, spoken: string): PronunciationScoreResult {
  const expectedItems = expected
    .trim()
    .split(/[\s—–-]+/)
    .map((displayWord) => ({
      displayWord,
      word: normalizeSingleWord(displayWord),
    }))
    .filter((item) => item.word.length > 0);

  const spokenWords = normalizeWords(spoken);
  const n = expectedItems.length;
  const m = spokenWords.length;

  if (n === 0) {
    return {
      score: 0,
      transcript: spoken,
      wordResults: [],
      feedback: 'Không có câu/đoạn văn mẫu.',
      correctCount: 0,
      closeCount: 0,
      wrongCount: 0,
      totalWords: 0,
      wrongWords: [],
      extraWords: [],
    };
  }

  // Dynamic programming alignment matrix
  const GAP_PENALTY = -0.5;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  const trace: ('diag' | 'up' | 'left')[][] = Array.from({ length: n + 1 }, () =>
    Array(m + 1).fill('up')
  );

  for (let i = 1; i <= n; i++) {
    dp[i][0] = dp[i - 1][0] + GAP_PENALTY;
    trace[i][0] = 'up';
  }
  for (let j = 1; j <= m; j++) {
    dp[0][j] = dp[0][j - 1] + GAP_PENALTY;
    trace[0][j] = 'left';
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const sim = wordSimilarity(expectedItems[i - 1].word, spokenWords[j - 1]);
      const pairScore = sim === 1 ? 2.0 : sim >= 0.55 ? sim * 1.4 : -0.6;

      const diagScore = dp[i - 1][j - 1] + pairScore;
      const upScore = dp[i - 1][j] + GAP_PENALTY;
      const leftScore = dp[i][j - 1] + GAP_PENALTY;

      if (diagScore >= upScore && diagScore >= leftScore) {
        dp[i][j] = diagScore;
        trace[i][j] = 'diag';
      } else if (upScore >= leftScore) {
        dp[i][j] = upScore;
        trace[i][j] = 'up';
      } else {
        dp[i][j] = leftScore;
        trace[i][j] = 'left';
      }
    }
  }

  // Backtrack to obtain ordered wordResults and extraWords
  const wordResultsReversed: WordMatchResult[] = [];
  const extraWordsReversed: string[] = [];
  let totalCredit = 0;

  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    const dir = trace[i][j];
    if (i > 0 && j > 0 && dir === 'diag') {
      const exp = expectedItems[i - 1];
      const sp = spokenWords[j - 1];
      const sim = wordSimilarity(exp.word, sp);

      if (sim >= 0.85) {
        totalCredit += sim;
        wordResultsReversed.push({
          word: exp.word,
          displayWord: exp.displayWord,
          status: 'correct',
          spokenWord: sp,
          reason: 'matched',
        });
      } else if (sim >= 0.55) {
        totalCredit += sim;
        wordResultsReversed.push({
          word: exp.word,
          displayWord: exp.displayWord,
          status: 'close',
          spokenWord: sp,
          reason: 'mispronounced',
        });
      } else {
        wordResultsReversed.push({
          word: exp.word,
          displayWord: exp.displayWord,
          status: 'wrong',
          spokenWord: sp,
          reason: 'substituted',
        });
      }
      i--;
      j--;
    } else if (i > 0 && (j === 0 || dir === 'up')) {
      const exp = expectedItems[i - 1];
      wordResultsReversed.push({
        word: exp.word,
        displayWord: exp.displayWord,
        status: 'wrong',
        reason: 'missing',
      });
      i--;
    } else {
      extraWordsReversed.push(spokenWords[j - 1]);
      j--;
    }
  }

  const wordResults = wordResultsReversed.reverse();
  const extraWords = extraWordsReversed.reverse();

  const correctCount = wordResults.filter((w) => w.status === 'correct').length;
  const closeCount = wordResults.filter((w) => w.status === 'close').length;
  const wrongCount = wordResults.filter((w) => w.status === 'wrong').length;
  const wrongWords = Array.from(
    new Set(wordResults.filter((w) => w.status !== 'correct').map((w) => w.word))
  );

  const rawScore = Math.round((totalCredit / n) * 100);
  const extraPenalty = extraWords.length > 2 ? Math.min(10, (extraWords.length - 2) * 2) : 0;
  const finalScore = Math.max(0, Math.min(100, rawScore - extraPenalty));

  let feedback = '';
  if (finalScore >= 90 && wrongCount === 0 && closeCount === 0) {
    feedback = 'Xuất sắc! Bạn phát âm chuẩn xác từng chữ một.';
  } else if (finalScore >= 85) {
    feedback =
      wrongCount > 0
        ? 'Rất tốt! Hãy chú ý các từ màu vàng/đỏ (sai hoặc bỏ sót) bên dưới để đạt chuẩn 100%.'
        : 'Rất tốt! Hãy chú ý chỉnh nhẹ các từ màu vàng để đạt chuẩn 100%.';
  } else if (finalScore >= 65) {
    feedback =
      'Khá tốt! Hãy bấm vào từng từ màu vàng/đỏ bên dưới để nghe chậm và đọc sửa lại chỗ sai nhé.';
  } else if (finalScore >= 40) {
    feedback =
      'Cần luyện thêm: một số chữ bị đọc lệch hoặc bỏ sót (màu đỏ). Bấm vào chữ sai để nghe mẫu 0.65x rồi đọc lại.';
  } else {
    feedback = 'Chưa khớp với bài mẫu — thử nghe chậm từng cụm từ và đọc to rõ hơn gần Micro nhé!';
  }

  return {
    score: finalScore,
    transcript: spoken,
    wordResults,
    feedback,
    correctCount,
    closeCount,
    wrongCount,
    totalWords: n,
    wrongWords,
    extraWords,
  };
}
