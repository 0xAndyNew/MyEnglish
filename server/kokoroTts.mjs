import crypto from 'node:crypto';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const MODELS_DIR = path.join(ROOT_DIR, 'data', 'models');
const TTS_CACHE_DIR = path.join(ROOT_DIR, 'data', 'tts-cache');
const KOKORO_MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX';

const VOICE_MAP = {
  'en-US': {
    'teacher-warm': 'af_heart', // Grade A warmest expressive female voice
    'kid-cute': 'af_bella',     // Grade A- sweet cheerful female voice
  },
  'en-GB': {
    'teacher-warm': 'bf_emma',  // Sweet British female voice
    'kid-cute': 'bf_emma',
  },
};

let ttsInstancePromise = null;
const inFlightSynthMap = new Map();

function sanitizeTtsText(rawText) {
  return String(rawText || '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500);
}

function resolveKokoroVoice(accent, preset) {
  const safeAccent = accent === 'en-GB' ? 'en-GB' : 'en-US';
  const safePreset = preset === 'kid-cute' ? 'kid-cute' : 'teacher-warm';
  return VOICE_MAP[safeAccent][safePreset];
}

function clampSpeed(rawRate) {
  const num = Number(rawRate);
  if (!Number.isFinite(num)) return 0.92;
  return Number(Math.max(0.55, Math.min(1.4, num)).toFixed(2));
}

async function configureTransformersCacheDir() {
  await fsp.mkdir(MODELS_DIR, { recursive: true });
  // kokoro-js may resolve its own nested @huggingface/transformers or the top-level one
  const candidates = [
    path.join(
      ROOT_DIR,
      'node_modules',
      'kokoro-js',
      'node_modules',
      '@huggingface',
      'transformers',
      'dist',
      'transformers.node.mjs'
    ),
  ];
  for (const cand of candidates) {
    if (fs.existsSync(cand)) {
      try {
        const mod = await import(pathToFileURL(cand).href);
        if (mod?.env) mod.env.cacheDir = MODELS_DIR;
      } catch {
        // ignore
      }
    }
  }
  try {
    const topMod = await import('@huggingface/transformers');
    if (topMod?.env) topMod.env.cacheDir = MODELS_DIR;
  } catch {
    // ignore
  }
}

export function isKokoroModelCached() {
  const onnxDir = path.join(MODELS_DIR, 'onnx-community', 'Kokoro-82M-v1.0-ONNX', 'onnx');
  if (!fs.existsSync(onnxDir)) return false;
  try {
    return fs.readdirSync(onnxDir).some((f) => f.endsWith('.onnx'));
  } catch {
    return false;
  }
}

export async function ensureKokoroPipeline() {
  if (ttsInstancePromise) return ttsInstancePromise;

  ttsInstancePromise = (async () => {
    await configureTransformersCacheDir();
    const { KokoroTTS } = await import('kokoro-js');
    return KokoroTTS.from_pretrained(KOKORO_MODEL_ID, {
      dtype: 'q8',
      device: 'cpu',
    });
  })().catch((err) => {
    ttsInstancePromise = null;
    throw err;
  });

  return ttsInstancePromise;
}

export function warmupKokoroIfCached() {
  if (isKokoroModelCached()) {
    ensureKokoroPipeline().catch(() => {});
  }
}

export async function synthesizeKokoroTtsWav({
  text: rawText,
  accent = 'en-US',
  rate = 0.92,
  preset = 'teacher-warm',
}) {
  const text = sanitizeTtsText(rawText);
  if (!text) {
    throw new Error('Thiếu nội dung văn bản để đọc.');
  }

  const voice = resolveKokoroVoice(accent, preset);
  const speed = clampSpeed(rate);
  const cacheKey = crypto
    .createHash('sha256')
    .update(`kokoro-q8|${voice}|${speed}|${text}`)
    .digest('hex')
    .slice(0, 32);

  await fsp.mkdir(TTS_CACHE_DIR, { recursive: true });
  const targetPath = path.join(TTS_CACHE_DIR, `${cacheKey}.wav`);

  if (fs.existsSync(targetPath)) {
    const stat = await fsp.stat(targetPath);
    if (stat.size > 0) {
      return { filePath: targetPath, voice, cached: true };
    }
  }

  let pending = inFlightSynthMap.get(cacheKey);
  if (!pending) {
    pending = (async () => {
      const tts = await ensureKokoroPipeline();
      const audio = await tts.generate(text, { voice, speed });
      const tmpPath = `${targetPath}.${process.pid}.${Date.now()}.tmp.wav`;
      try {
        await audio.save(tmpPath);
        await fsp.rename(tmpPath, targetPath);
      } catch (err) {
        await fsp.unlink(tmpPath).catch(() => {});
        throw err;
      }
      return targetPath;
    })().finally(() => {
      inFlightSynthMap.delete(cacheKey);
    });
    inFlightSynthMap.set(cacheKey, pending);
  }

  await pending;
  return { filePath: targetPath, voice, cached: false };
}
