import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { env, pipeline } from '@huggingface/transformers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const MODELS_DIR = path.join(ROOT_DIR, 'data', 'models');

export const ALLOWED_STT_MODELS = [
  'Xenova/whisper-tiny.en',
  'Xenova/whisper-base.en',
];
export const DEFAULT_STT_MODEL = 'Xenova/whisper-tiny.en';

if (!fs.existsSync(MODELS_DIR)) {
  fs.mkdirSync(MODELS_DIR, { recursive: true });
}
env.cacheDir = MODELS_DIR;

let activePipeline = null;
let loadedModelName = '';
let loadingPromise = null;
let loadingModelName = '';
let sttState = {
  status: 'idle', // 'idle' | 'loading' | 'ready' | 'error'
  model: DEFAULT_STT_MODEL,
  progressPercent: 0,
  lastError: null,
};

export function sanitizeSttModel(modelName) {
  return ALLOWED_STT_MODELS.includes(modelName) ? modelName : DEFAULT_STT_MODEL;
}

export function isModelCached(modelName = DEFAULT_STT_MODEL) {
  const safeName = sanitizeSttModel(modelName);
  const onnxDir = path.join(MODELS_DIR, ...safeName.split('/'), 'onnx');
  if (!fs.existsSync(onnxDir)) return false;
  try {
    const files = fs.readdirSync(onnxDir);
    return files.some((f) => f.endsWith('.onnx'));
  } catch {
    return false;
  }
}

export function getLocalSttStatus(preferredModel = DEFAULT_STT_MODEL) {
  const targetModel = sanitizeSttModel(preferredModel);
  const downloadedModels = ALLOWED_STT_MODELS.filter((m) => isModelCached(m));
  return {
    ...sttState,
    targetModel,
    isLoaded: Boolean(activePipeline && loadedModelName === targetModel),
    isTargetCached: isModelCached(targetModel),
    downloadedModels,
  };
}

/**
 * Load (or return cached) Whisper ASR pipeline for the requested English model.
 */
export async function ensureWhisperPipeline(modelName = DEFAULT_STT_MODEL) {
  const targetModel = sanitizeSttModel(modelName);

  if (activePipeline && loadedModelName === targetModel) {
    return activePipeline;
  }

  if (loadingPromise && loadingModelName === targetModel) {
    return loadingPromise;
  }

  loadingModelName = targetModel;
  sttState = {
    status: 'loading',
    model: targetModel,
    progressPercent: isModelCached(targetModel) ? 95 : 0,
    lastError: null,
  };

  loadingPromise = (async () => {
    try {
      const fileProgress = new Map();
      const asr = await pipeline('automatic-speech-recognition', targetModel, {
        dtype: 'q8',
        progress_callback: (info) => {
          if (info?.file && typeof info?.progress === 'number') {
            fileProgress.set(info.file, info.progress);
            const vals = Array.from(fileProgress.values());
            const avg = vals.reduce((a, b) => a + b, 0) / Math.max(1, vals.length);
            sttState.progressPercent = Math.min(99, Math.round(avg));
          }
        },
      });
      activePipeline = asr;
      loadedModelName = targetModel;
      sttState = {
        status: 'ready',
        model: targetModel,
        progressPercent: 100,
        lastError: null,
      };
      return asr;
    } catch (err) {
      activePipeline = null;
      loadedModelName = '';
      sttState = {
        status: 'error',
        model: targetModel,
        progressPercent: 0,
        lastError: err?.message || 'Không tải được mô hình Whisper offline.',
      };
      throw err;
    } finally {
      loadingPromise = null;
      loadingModelName = '';
    }
  })();

  return loadingPromise;
}

/**
 * Warm up the local Whisper model in the background only if already downloaded on disk.
 */
export function warmupCachedSttIfPresent(modelName = DEFAULT_STT_MODEL) {
  const safeName = sanitizeSttModel(modelName);
  if (!isModelCached(safeName)) return;
  ensureWhisperPipeline(safeName).catch(() => {
    // Ignore background warmup errors; request-time path surfaces errors cleanly.
  });
}

function resampleLinear(monoSamples, sourceRate, targetRate = 16000) {
  if (sourceRate === targetRate || monoSamples.length === 0) {
    return monoSamples;
  }
  const ratio = sourceRate / targetRate;
  const outLength = Math.max(1, Math.round(monoSamples.length / ratio));
  const out = new Float32Array(outLength);
  for (let i = 0; i < outLength; i++) {
    const srcPos = i * ratio;
    const idx = Math.floor(srcPos);
    const frac = srcPos - idx;
    const a = monoSamples[idx] ?? 0;
    const b = monoSamples[Math.min(idx + 1, monoSamples.length - 1)] ?? a;
    out[i] = a + (b - a) * frac;
  }
  return out;
}

/**
 * Parse a RIFF/WAVE Buffer (PCM 8/16/32-bit or IEEE Float 32-bit) into 16kHz mono Float32Array.
 */
export function decodeWavToFloat32(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 44) {
    throw new Error('Dữ liệu âm thanh WAV không hợp lệ.');
  }
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WAVE') {
    throw new Error('Định dạng âm thanh không phải WAV chuẩn.');
  }

  let audioFormat = 0;
  let numChannels = 1;
  let sampleRate = 16000;
  let bitsPerSample = 16;
  let dataStart = -1;
  let dataLength = 0;

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunkId = buffer.toString('ascii', offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const bodyStart = offset + 8;

    if (chunkId === 'fmt ' && chunkSize >= 16 && bodyStart + 16 <= buffer.length) {
      audioFormat = buffer.readUInt16LE(bodyStart);
      numChannels = buffer.readUInt16LE(bodyStart + 2);
      sampleRate = buffer.readUInt32LE(bodyStart + 4);
      bitsPerSample = buffer.readUInt16LE(bodyStart + 14);
    } else if (chunkId === 'data') {
      dataStart = bodyStart;
      dataLength = Math.min(chunkSize, buffer.length - bodyStart);
      break;
    }

    // RIFF chunks are word-aligned (padded to even byte count)
    offset = bodyStart + chunkSize + (chunkSize % 2);
  }

  if (dataStart < 0 || dataLength <= 0) {
    throw new Error('Không tìm thấy dữ liệu âm thanh trong file WAV.');
  }
  if (![1, 3].includes(audioFormat)) {
    throw new Error(`Không hỗ trợ codec WAV (format ${audioFormat}).`);
  }

  const bytesPerSample = Math.max(1, bitsPerSample / 8);
  const frameSize = bytesPerSample * Math.max(1, numChannels);
  const frameCount = Math.floor(dataLength / frameSize);
  const mono = new Float32Array(frameCount);

  for (let i = 0; i < frameCount; i++) {
    let sum = 0;
    const frameOffset = dataStart + i * frameSize;
    for (let ch = 0; ch < numChannels; ch++) {
      const sampleOffset = frameOffset + ch * bytesPerSample;
      let val = 0;
      if (audioFormat === 3 && bitsPerSample === 32) {
        val = buffer.readFloatLE(sampleOffset);
      } else if (bitsPerSample === 16) {
        val = buffer.readInt16LE(sampleOffset) / 32768;
      } else if (bitsPerSample === 8) {
        val = (buffer.readUInt8(sampleOffset) - 128) / 128;
      } else if (bitsPerSample === 32) {
        val = buffer.readInt32LE(sampleOffset) / 2147483648;
      }
      sum += val;
    }
    mono[i] = sum / numChannels;
  }

  return resampleLinear(mono, sampleRate, 16000);
}

function computeAudioStats(samples) {
  let sumSq = 0;
  let peak = 0;
  for (let i = 0; i < samples.length; i++) {
    const abs = Math.abs(samples[i]);
    if (abs > peak) peak = abs;
    sumSq += samples[i] * samples[i];
  }
  const rms = samples.length > 0 ? Math.sqrt(sumSq / samples.length) : 0;
  return {
    rms,
    peak,
    durationSec: samples.length / 16000,
  };
}

function padWithSilence(samples, padSamples = 4000) {
  const padded = new Float32Array(samples.length + padSamples * 2);
  padded.set(samples, padSamples);
  return padded;
}

function cleanWhisperTranscript(rawText) {
  return String(rawText || '')
    .replace(/\[[^\]]*\]/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Transcribe a base64-encoded WAV buffer using the local offline Whisper model.
 */
export async function transcribeWavBase64Local(wavBase64, options = {}) {
  const modelName = sanitizeSttModel(options.modelName || DEFAULT_STT_MODEL);
  const rawBuffer = Buffer.from(String(wavBase64 || ''), 'base64');
  const samples = decodeWavToFloat32(rawBuffer);
  const stats = computeAudioStats(samples);

  // Guard against Whisper silence hallucinations (e.g. "you" / "Thank you") on muted or silent mic input
  if (stats.durationSec < 0.12 || stats.rms < 0.0025 || stats.peak < 0.012) {
    return {
      transcript: '',
      model: modelName,
      provider: 'local-whisper',
      durationSec: stats.durationSec,
      silent: true,
    };
  }

  const asr = await ensureWhisperPipeline(modelName);
  const padded = padWithSilence(samples, 4000);
  const output = await asr(padded, {
    chunk_length_s: 30,
    stride_length_s: 5,
  });

  const text = Array.isArray(output)
    ? output.map((chunk) => chunk?.text || '').join(' ')
    : output?.text || '';

  return {
    transcript: cleanWhisperTranscript(text),
    model: modelName,
    provider: 'local-whisper',
    durationSec: stats.durationSec,
    silent: false,
  };
}
