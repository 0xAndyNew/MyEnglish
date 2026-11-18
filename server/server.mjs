import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  addCustomLesson,
  createSession,
  db,
  deleteCustomLesson,
  DEV_EMAIL,
  getAppSetting,
  getLearnerProfile,
  getUserBySessionToken,
  hashPassword,
  listAllUsersAdmin,
  listCustomLessons,
  loadFullProgress,
  resetProgressInDb,
  saveFullProgress,
  saveLearnerProfile,
  setAppSetting,
  verifyPassword,
} from './db.mjs';
import {
  ALLOWED_STT_MODELS,
  DEFAULT_STT_MODEL,
  ensureWhisperPipeline,
  getLocalSttStatus,
  sanitizeSttModel,
  transcribeWavBase64Local,
  warmupCachedSttIfPresent,
} from './speechStt.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const SONG_AUDIO_DIR = path.resolve(__dirname, '../data/song-audio');
const PORT = Number(process.env.PORT || 3001);

const SONG_MIME_BY_EXT = {
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4',
  '.webm': 'audio/webm',
};

const SONG_EXT_BY_MIME = {
  'audio/mpeg': '.mp3',
  'audio/mp3': '.mp3',
  'audio/wav': '.wav',
  'audio/wave': '.wav',
  'audio/x-wav': '.wav',
  'audio/ogg': '.ogg',
  'audio/mp4': '.m4a',
  'audio/x-m4a': '.m4a',
  'audio/m4a': '.m4a',
  'audio/webm': '.webm',
};

function sanitizeUnitId(raw) {
  return String(raw || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
}

function readKidsSongsMediaMap() {
  try {
    const raw = getAppSetting('kids_songs_media');
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeKidsSongsMediaMap(map) {
  setAppSetting('kids_songs_media', JSON.stringify(map || {}));
}

function removeUploadedSongFiles(unitId) {
  for (const ext of Object.keys(SONG_MIME_BY_EXT)) {
    const fp = path.join(SONG_AUDIO_DIR, `${unitId}${ext}`);
    if (fs.existsSync(fp)) {
      try {
        fs.unlinkSync(fp);
      } catch {
        // ignore
      }
    }
  }
}

function findUploadedSongFile(unitId) {
  for (const [ext, mime] of Object.entries(SONG_MIME_BY_EXT)) {
    const fp = path.join(SONG_AUDIO_DIR, `${unitId}${ext}`);
    if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
      return { filePath: fp, ext, mime };
    }
  }
  return null;
}

function extractYouTubeIdServer(raw) {
  const clean = String(raw || '').trim();
  if (!clean) return '';
  if (/^[A-Za-z0-9_-]{11}$/.test(clean)) return clean;
  try {
    const url = new URL(clean);
    if (url.hostname.includes('youtu.be')) {
      const seg = url.pathname.replace(/^\/+/, '').split('/')[0] || '';
      return /^[A-Za-z0-9_-]{11}$/.test(seg) ? seg : '';
    }
    const v = url.searchParams.get('v') || '';
    if (/^[A-Za-z0-9_-]{11}$/.test(v)) return v;
    const parts = url.pathname.split('/').filter(Boolean);
    const idx = parts.findIndex((p) => p === 'embed' || p === 'shorts' || p === 'v');
    if (idx >= 0 && parts[idx + 1] && /^[A-Za-z0-9_-]{11}$/.test(parts[idx + 1])) {
      return parts[idx + 1];
    }
  } catch {
    // ignore
  }
  return '';
}

const GEMINI_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.8-flash-lite',
  'gemini-flash-latest',
  'gemini-2.5-flash',
];

function sendJson(res, status, data) {
  const payload = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(payload);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    req.on('data', (chunk) => {
      total += chunk.length;
      if (total > 14 * 1024 * 1024) {
        reject(new Error('Dữ liệu gửi lên quá lớn (tối đa ~9MB file gốc).'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw.trim()) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('JSON không hợp lệ.'));
      }
    });
    req.on('error', reject);
  });
}

function extractToken(req) {
  const auth = req.headers['authorization'] || '';
  if (auth.toLowerCase().startsWith('bearer ')) {
    return auth.slice(7).trim();
  }
  return '';
}

function maskKey(key) {
  if (!key) return '';
  if (key.length <= 10) return '****';
  return `${key.slice(0, 7)}...${key.slice(-4)}`;
}

async function callGoogleGemini(apiKey, parts) {
  const key = String(apiKey || '').trim();
  if (!key) {
    throw new Error('Chưa cấu hình Gemini API Key trong mục Quản trị Admin.');
  }

  const body = JSON.stringify({ contents: [{ parts }] });
  const errors = [];

  for (const model of GEMINI_MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': key,
      },
      body,
    });
    const data = await r.json().catch(() => ({}));
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (r.ok && text) {
      return { text, model };
    }
    const errMsg = data?.error?.message || `HTTP ${r.status}`;
    errors.push(`${model}: ${errMsg}`);
    if (![400, 404, 429, 500, 503].includes(r.status)) {
      break;
    }
  }

  // Fallback Vertex AI Express endpoint
  const vUrl = `https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(key)}`;
  const vr = await fetch(vUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  const vData = await vr.json().catch(() => ({}));
  const vText = vData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  if (vr.ok && vText) {
    return { text: vText, model: 'vertex-ai-gemini-2.5-flash' };
  }

  throw new Error(errors.join(' | ') || vData?.error?.message || 'Lỗi kết nối Gemini API');
}

function getSttSettings() {
  const rawProvider = getAppSetting('stt_provider');
  const sttProvider = ['auto', 'local', 'gemini'].includes(rawProvider) ? rawProvider : 'auto';
  const sttModel = sanitizeSttModel(getAppSetting('stt_model') || DEFAULT_STT_MODEL);
  return { sttProvider, sttModel };
}

async function transcribeWithGeminiServer(apiKey, base64Audio, mimeType) {
  const cleanMime = String(mimeType || 'audio/wav').split(';')[0] || 'audio/wav';
  const result = await callGoogleGemini(apiKey, [
    {
      text: 'Listen to this short English speech recording and transcribe ONLY the exact English words spoken. Return plain text with no quotes or extra explanation. If nothing was spoken, return an empty string.',
    },
    {
      inline_data: {
        mime_type: cleanMime,
        data: base64Audio,
      },
    },
  ]);
  const cleanText = String(result.text || '').trim().replace(/^["']|["']$/g, '');
  return {
    transcript: cleanText,
    provider: 'gemini',
    model: result.model,
    silent: !cleanText,
  };
}

const MIME_MAP = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4',
  '.webm': 'audio/webm',
};

function serveStatic(req, reqPath, res) {
  if (!fs.existsSync(DIST_DIR)) {
    sendJson(res, 404, { error: 'Frontend chưa build (dist/ không tồn tại). Hãy chạy npm run dev hoặc npm run build.' });
    return;
  }
  const cleanPath = reqPath === '/' ? '/index.html' : reqPath;
  const filePath = path.join(DIST_DIR, cleanPath);
  const target = fs.existsSync(filePath) && fs.statSync(filePath).isFile()
    ? filePath
    : path.join(DIST_DIR, 'index.html');
  const ext = path.extname(target);
  const mime = MIME_MAP[ext] || 'application/octet-stream';
  const stat = fs.statSync(target);
  const total = stat.size;
  const rangeHeader = String(req.headers.range || '');

  if (rangeHeader && (ext === '.mp3' || ext === '.wav' || ext === '.ogg' || ext === '.m4a' || ext === '.webm')) {
    const match = rangeHeader.match(/^bytes=(\d*)-(\d*)$/);
    if (!match) {
      res.writeHead(416, { 'Content-Range': `bytes */${total}` });
      return res.end();
    }
    const start = match[1] ? Number(match[1]) : 0;
    const end = match[2] ? Math.min(Number(match[2]), total - 1) : total - 1;
    if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= total) {
      res.writeHead(416, { 'Content-Range': `bytes */${total}` });
      return res.end();
    }
    const chunkSize = end - start + 1;
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': mime,
      'Cache-Control': 'public, max-age=86400',
    });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(target, { start, end }).pipe(res);
    return;
  }

  res.writeHead(200, {
    'Content-Type': mime,
    'Content-Length': total,
    'Accept-Ranges': 'bytes',
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400',
  });
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(target).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url || '/', `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;
  const method = req.method || 'GET';

  if (!pathname.startsWith('/api/')) {
    serveStatic(req, pathname, res);
    return;
  }

  try {
    if (method === 'GET' && pathname === '/api/health') {
      return sendJson(res, 200, { ok: true, database: 'sqlite', path: 'data/myenglish.db' });
    }

    // KIDS SONGS MEDIA METADATA & STREAMING (Public read so kids audio works seamlessly)
    if (method === 'GET' && pathname === '/api/kids/songs-media') {
      return sendJson(res, 200, { media: readKidsSongsMediaMap() });
    }

    const songAudioMatch = pathname.match(/^\/api\/kids\/song-audio\/([^/]+)$/);
    if ((method === 'GET' || method === 'HEAD') && songAudioMatch) {
      const unitId = sanitizeUnitId(decodeURIComponent(songAudioMatch[1]));
      const fileInfo = unitId ? findUploadedSongFile(unitId) : null;
      if (!fileInfo) {
        return sendJson(res, 404, { error: 'Không tìm thấy file nhạc cho chủ đề này.' });
      }
      const stat = fs.statSync(fileInfo.filePath);
      const total = stat.size;
      const rangeHeader = String(req.headers.range || '');

      if (rangeHeader) {
        const match = rangeHeader.match(/^bytes=(\d*)-(\d*)$/);
        if (!match) {
          res.writeHead(416, { 'Content-Range': `bytes */${total}` });
          return res.end();
        }
        const start = match[1] ? Number(match[1]) : 0;
        const end = match[2] ? Math.min(Number(match[2]), total - 1) : total - 1;
        if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= total) {
          res.writeHead(416, { 'Content-Range': `bytes */${total}` });
          return res.end();
        }
        const chunkSize = end - start + 1;
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${total}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': fileInfo.mime,
          'Cache-Control': 'public, max-age=3600',
        });
        if (method === 'HEAD') return res.end();
        fs.createReadStream(fileInfo.filePath, { start, end }).pipe(res);
        return;
      }

      res.writeHead(200, {
        'Accept-Ranges': 'bytes',
        'Content-Length': total,
        'Content-Type': fileInfo.mime,
        'Cache-Control': 'public, max-age=3600',
      });
      if (method === 'HEAD') return res.end();
      fs.createReadStream(fileInfo.filePath).pipe(res);
      return;
    }

    // AUTH: REGISTER
    if (method === 'POST' && pathname === '/api/auth/register') {
      const body = await readJsonBody(req);
      const email = String(body.email || '').trim().toLowerCase();
      const displayName = String(body.displayName || '').trim() || email.split('@')[0];
      const password = String(body.password || '');

      if (email === DEV_EMAIL) {
        return sendJson(res, 400, { error: 'Tài khoản quản trị đã được tạo sẵn, vui lòng chuyển sang tab Đăng nhập.' });
      }
      if (!email.endsWith('@gmail.com') || email.length < 11) {
        return sendJson(res, 400, { error: 'Vui lòng nhập đúng địa chỉ Gmail (ví dụ: tenban@gmail.com).' });
      }
      if (password.length < 6) {
        return sendJson(res, 400, { error: 'Mật khẩu phải có ít nhất 6 ký tự.' });
      }

      const exists = db.prepare('SELECT email FROM users WHERE email = ?').get(email);
      if (exists) {
        return sendJson(res, 409, { error: 'Gmail này đã được đăng ký. Vui lòng chuyển sang tab Đăng nhập.' });
      }

      const now = new Date().toISOString();
      db.prepare('INSERT INTO users (email, display_name, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?)')
        .run(email, displayName, hashPassword(password), 'user', now);

      const profile =
        body.profile && typeof body.profile === 'object'
          ? saveLearnerProfile(email, body.profile)
          : null;

      const progress = loadFullProgress(email);
      const token = createSession(email);
      return sendJson(res, 201, {
        user: { email, displayName, role: 'user', createdAt: now, profile },
        token,
        progress,
      });
    }

    // AUTH: LOGIN
    if (method === 'POST' && pathname === '/api/auth/login') {
      const body = await readJsonBody(req);
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');

      const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      if (!row) {
        return sendJson(res, 404, { error: 'Không tìm thấy tài khoản này trong CSDL. Hãy bấm Đăng ký mới nhé.' });
      }
      if (!verifyPassword(password, row.password_hash)) {
        return sendJson(res, 401, { error: 'Mật khẩu chưa đúng. Vui lòng thử lại.' });
      }

      const progress = loadFullProgress(email);
      const profile = getLearnerProfile(email);
      const token = createSession(email);
      return sendJson(res, 200, {
        user: {
          email: row.email,
          displayName: row.display_name,
          role: row.role,
          createdAt: row.created_at,
          profile,
        },
        token,
        progress,
      });
    }

    // AUTH: LOGOUT
    if (method === 'POST' && pathname === '/api/auth/logout') {
      const token = extractToken(req);
      if (token) {
        db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
      }
      return sendJson(res, 200, { ok: true });
    }

    // Require session for protected routes below
    const token = extractToken(req);
    const currentUser = getUserBySessionToken(token);
    if (!currentUser) {
      return sendJson(res, 401, { error: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.' });
    }

    if (method === 'GET' && pathname === '/api/auth/me') {
      const progress = loadFullProgress(currentUser.email);
      const profile = getLearnerProfile(currentUser.email);
      const hasApiKey = Boolean(getAppSetting('gemini_api_key'));
      const { sttProvider, sttModel } = getSttSettings();
      return sendJson(res, 200, {
        user: { ...currentUser, profile },
        progress,
        hasApiKey,
        sttProvider,
        sttModel,
      });
    }

    if (method === 'GET' && pathname === '/api/profile') {
      const profile = getLearnerProfile(currentUser.email);
      return sendJson(res, 200, { profile });
    }

    if (method === 'PUT' && pathname === '/api/profile') {
      const existing = getLearnerProfile(currentUser.email);
      if (existing && currentUser.role !== 'admin') {
        return sendJson(res, 403, {
          error: 'Hồ sơ đối tượng đã được cố định theo thông tin đăng ký tài khoản. Chỉ Quản trị viên mới có quyền thay đổi.',
        });
      }
      const body = await readJsonBody(req);
      const payload = body.profile && typeof body.profile === 'object' ? body.profile : body;
      const profile = saveLearnerProfile(currentUser.email, payload);
      return sendJson(res, 200, { ok: true, profile });
    }

    if (method === 'GET' && pathname === '/api/speech/status') {
      const { sttProvider, sttModel } = getSttSettings();
      const hasGeminiKey = Boolean(getAppSetting('gemini_api_key'));
      return sendJson(res, 200, {
        sttProvider,
        sttModel,
        allowedModels: ALLOWED_STT_MODELS,
        hasGeminiKey,
        localStt: getLocalSttStatus(sttModel),
      });
    }

    if (method === 'POST' && pathname === '/api/speech/transcribe') {
      const body = await readJsonBody(req);
      const wavBase64 = typeof body.wavBase64 === 'string' ? body.wavBase64.trim() : '';
      const fallbackBase64 = typeof body.fallbackBase64 === 'string' ? body.fallbackBase64.trim() : '';
      const fallbackMimeType = typeof body.fallbackMimeType === 'string' ? body.fallbackMimeType : 'audio/webm';

      if (!wavBase64 && !fallbackBase64) {
        return sendJson(res, 400, { error: 'Thiếu dữ liệu âm thanh để nhận diện.' });
      }

      const { sttProvider, sttModel } = getSttSettings();
      const geminiKey = getAppSetting('gemini_api_key');

      // When Admin prioritizes Gemini and has a key, try Gemini first and fall back to Local Whisper
      if (sttProvider === 'gemini' && geminiKey) {
        try {
          const b64 = fallbackBase64 || wavBase64;
          const mime = fallbackBase64 ? fallbackMimeType : 'audio/wav';
          const out = await transcribeWithGeminiServer(geminiKey, b64, mime);
          return sendJson(res, 200, out);
        } catch (geminiErr) {
          if (!wavBase64) {
            throw geminiErr;
          }
          const out = await transcribeWavBase64Local(wavBase64, { modelName: sttModel });
          return sendJson(res, 200, out);
        }
      }

      // Default ('auto' or 'local'): run Local Offline Whisper on Node.js (works on all browsers without API Key)
      if (wavBase64) {
        try {
          const out = await transcribeWavBase64Local(wavBase64, { modelName: sttModel });
          return sendJson(res, 200, out);
        } catch (localErr) {
          if (geminiKey && sttProvider !== 'local') {
            const b64 = fallbackBase64 || wavBase64;
            const mime = fallbackBase64 ? fallbackMimeType : 'audio/wav';
            const out = await transcribeWithGeminiServer(geminiKey, b64, mime);
            return sendJson(res, 200, out);
          }
          throw localErr;
        }
      }

      // If browser failed to produce WAV and only sent compressed blob, use Gemini if available
      if (geminiKey && fallbackBase64) {
        const out = await transcribeWithGeminiServer(geminiKey, fallbackBase64, fallbackMimeType);
        return sendJson(res, 200, out);
      }

      return sendJson(res, 400, { error: 'Trình duyệt không giải mã được âm thanh WAV để chấm offline.' });
    }

    if (method === 'GET' && pathname === '/api/progress') {
      const progress = loadFullProgress(currentUser.email);
      return sendJson(res, 200, { progress });
    }

    if (method === 'PUT' && pathname === '/api/progress') {
      const body = await readJsonBody(req);
      saveFullProgress(currentUser.email, body.progress || {});
      return sendJson(res, 200, { ok: true });
    }

    if (method === 'GET' && pathname === '/api/custom-lessons') {
      const lessons = listCustomLessons();
      if (currentUser.role === 'admin') {
        return sendJson(res, 200, { lessons });
      }
      const userProfile = getLearnerProfile(currentUser.email);
      const userAud = userProfile?.audience;
      const filtered = userAud
        ? lessons.filter((l) => !Array.isArray(l.audiences) || l.audiences.length === 0 || l.audiences.includes(userAud))
        : lessons;
      return sendJson(res, 200, { lessons: filtered });
    }

    // AI PROXY (Key stays safely in SQLite on server!)
    if (method === 'POST' && pathname === '/api/ai/generate') {
      const body = await readJsonBody(req);
      const parts = Array.isArray(body.parts)
        ? body.parts
        : body.prompt
        ? [{ text: String(body.prompt) }]
        : [];
      if (parts.length === 0) {
        return sendJson(res, 400, { error: 'Thiếu nội dung prompt gửi tới AI.' });
      }
      const key = getAppSetting('gemini_api_key');
      const result = await callGoogleGemini(key, parts);
      return sendJson(res, 200, result);
    }

    // ADMIN ROUTES
    if (pathname.startsWith('/api/admin/')) {
      if (currentUser.role !== 'admin') {
        return sendJson(res, 403, { error: 'Chỉ tài khoản Quản trị Admin mới có quyền thao tác mục này.' });
      }

      if (method === 'GET' && pathname === '/api/admin/overview') {
        const key = getAppSetting('gemini_api_key');
        const users = listAllUsersAdmin();
        const { sttProvider, sttModel } = getSttSettings();
        return sendJson(res, 200, {
          hasApiKey: Boolean(key),
          maskedApiKey: maskKey(key),
          users,
          sttProvider,
          sttModel,
          allowedSttModels: ALLOWED_STT_MODELS,
          localStt: getLocalSttStatus(sttModel),
        });
      }

      if (method === 'PUT' && pathname === '/api/admin/stt-settings') {
        const body = await readJsonBody(req);
        const nextProvider = ['auto', 'local', 'gemini'].includes(body.sttProvider)
          ? body.sttProvider
          : 'auto';
        const nextModel = sanitizeSttModel(body.sttModel || DEFAULT_STT_MODEL);
        setAppSetting('stt_provider', nextProvider);
        setAppSetting('stt_model', nextModel);
        return sendJson(res, 200, {
          ok: true,
          sttProvider: nextProvider,
          sttModel: nextModel,
          localStt: getLocalSttStatus(nextModel),
        });
      }

      if (method === 'POST' && pathname === '/api/admin/stt-warmup') {
        const body = await readJsonBody(req);
        const { sttModel } = getSttSettings();
        const targetModel = sanitizeSttModel(body.model || sttModel);
        await ensureWhisperPipeline(targetModel);
        return sendJson(res, 200, {
          ok: true,
          localStt: getLocalSttStatus(targetModel),
        });
      }

      if (method === 'PUT' && pathname === '/api/admin/api-key') {
        const body = await readJsonBody(req);
        setAppSetting('gemini_api_key', body.apiKey || '');
        const saved = getAppSetting('gemini_api_key');
        return sendJson(res, 200, {
          ok: true,
          hasApiKey: Boolean(saved),
          maskedApiKey: maskKey(saved),
        });
      }

      if (method === 'POST' && pathname === '/api/admin/test-key') {
        const body = await readJsonBody(req);
        const keyToTest = String(body.apiKey || '').trim() || getAppSetting('gemini_api_key');
        const result = await callGoogleGemini(keyToTest, [{ text: 'Reply ONLY with: OK' }]);
        return sendJson(res, 200, result);
      }

      const resetProgressMatch = pathname.match(/^\/api\/admin\/users\/([^/]+)\/reset-progress$/);
      if (method === 'POST' && resetProgressMatch) {
        const targetEmail = decodeURIComponent(resetProgressMatch[1]).toLowerCase();
        const progress = resetProgressInDb(targetEmail);
        return sendJson(res, 200, { ok: true, progress });
      }

      const resetPwMatch = pathname.match(/^\/api\/admin\/users\/([^/]+)\/reset-password$/);
      if (method === 'POST' && resetPwMatch) {
        const targetEmail = decodeURIComponent(resetPwMatch[1]).toLowerCase();
        if (targetEmail === DEV_EMAIL) {
          return sendJson(res, 400, { error: 'Không thể reset mật khẩu Admin tại đây.' });
        }
        const body = await readJsonBody(req);
        const newPw = String(body.newPassword || '123456');
        db.prepare('UPDATE users SET password_hash = ? WHERE email = ?').run(hashPassword(newPw), targetEmail);
        return sendJson(res, 200, { ok: true });
      }

      const delUserMatch = pathname.match(/^\/api\/admin\/users\/([^/]+)$/);
      if (method === 'DELETE' && delUserMatch) {
        const targetEmail = decodeURIComponent(delUserMatch[1]).toLowerCase();
        if (targetEmail === DEV_EMAIL) {
          return sendJson(res, 400, { error: 'Không thể xóa tài khoản Admin Dev.' });
        }
        db.prepare('DELETE FROM users WHERE email = ?').run(targetEmail);
        return sendJson(res, 200, { ok: true });
      }

      const updateProfileMatch = pathname.match(/^\/api\/admin\/users\/([^/]+)\/profile$/);
      if (method === 'PUT' && updateProfileMatch) {
        const targetEmail = decodeURIComponent(updateProfileMatch[1]).toLowerCase();
        const exists = db.prepare('SELECT email FROM users WHERE email = ?').get(targetEmail);
        if (!exists) {
          return sendJson(res, 404, { error: 'Không tìm thấy tài khoản.' });
        }
        const body = await readJsonBody(req);
        const payload = body.profile && typeof body.profile === 'object' ? body.profile : body;
        const profile = saveLearnerProfile(targetEmail, payload);
        return sendJson(res, 200, { ok: true, profile });
      }

      if (method === 'POST' && pathname === '/api/admin/lessons') {
        const body = await readJsonBody(req);
        const kind = String(body.kind || '');
        const allowed = ['sentence', 'listening', 'roleplay', 'writing'];
        if (!allowed.includes(kind)) {
          return sendJson(res, 400, { error: 'Loại bài học không hợp lệ.' });
        }
        if (!body.payload || typeof body.payload !== 'object') {
          return sendJson(res, 400, { error: 'Thiếu nội dung bài học.' });
        }
        const audiences = Array.isArray(body.audiences) ? body.audiences : [];
        const created = addCustomLesson(kind, body.payload, audiences);
        return sendJson(res, 201, { lesson: created });
      }

      const delLessonMatch = pathname.match(/^\/api\/admin\/lessons\/([^/]+)$/);
      if (method === 'DELETE' && delLessonMatch) {
        const lessonId = decodeURIComponent(delLessonMatch[1]);
        deleteCustomLesson(lessonId);
        return sendJson(res, 200, { ok: true });
      }

      if (method === 'POST' && pathname === '/api/admin/kids-song-media') {
        const body = await readJsonBody(req);
        const unitId = sanitizeUnitId(body.unitId);
        if (!unitId) {
          return sendJson(res, 400, { error: 'Thiếu mã chủ đề bài hát (unitId).' });
        }

        const map = readKidsSongsMediaMap();
        const nextEntry = { ...(map[unitId] || {}) };
        const rawBase64 = String(body.audioBase64 || '').trim();

        if (rawBase64) {
          const cleanB64 = rawBase64.replace(/^data:[^;]+;base64,/, '');
          const buf = Buffer.from(cleanB64, 'base64');
          if (!buf.length) {
            return sendJson(res, 400, { error: 'File âm thanh trống hoặc không hợp lệ.' });
          }
          if (buf.length > 9 * 1024 * 1024) {
            return sendJson(res, 400, { error: 'File nhạc quá lớn (tối đa 9MB).' });
          }
          const rawExt = path.extname(String(body.fileName || '')).toLowerCase();
          const mimeKey = String(body.mimeType || '').split(';')[0].trim().toLowerCase();
          const ext = SONG_MIME_BY_EXT[rawExt] ? rawExt : SONG_EXT_BY_MIME[mimeKey] || '.mp3';

          fs.mkdirSync(SONG_AUDIO_DIR, { recursive: true });
          removeUploadedSongFiles(unitId);
          fs.writeFileSync(path.join(SONG_AUDIO_DIR, `${unitId}${ext}`), buf);

          nextEntry.audioUrl = `/api/kids/song-audio/${unitId}?v=${Date.now()}`;
          nextEntry.isUploaded = true;
          nextEntry.mimeType = SONG_MIME_BY_EXT[ext] || 'audio/mpeg';
        } else if (body.audioUrl !== undefined) {
          const cleanUrl = String(body.audioUrl || '').trim();
          if (!cleanUrl) {
            delete nextEntry.audioUrl;
            delete nextEntry.isUploaded;
            delete nextEntry.mimeType;
            removeUploadedSongFiles(unitId);
          } else if (
            !/^https?:\/\//i.test(cleanUrl) &&
            !cleanUrl.startsWith('/api/kids/song-audio/')
          ) {
            return sendJson(res, 400, { error: 'Link nhạc phải bắt đầu bằng http:// hoặc https://.' });
          } else {
            nextEntry.audioUrl = cleanUrl;
            if (!cleanUrl.startsWith('/api/kids/song-audio/')) {
              delete nextEntry.isUploaded;
              delete nextEntry.mimeType;
              removeUploadedSongFiles(unitId);
            }
          }
        }

        if (body.youtubeId !== undefined) {
          const rawYt = String(body.youtubeId || '').trim();
          if (!rawYt) {
            delete nextEntry.youtubeId;
          } else {
            const yt = extractYouTubeIdServer(rawYt);
            if (!yt) {
              return sendJson(res, 400, { error: 'Link hoặc ID YouTube không hợp lệ.' });
            }
            nextEntry.youtubeId = yt;
          }
        }

        if (!nextEntry.audioUrl && !nextEntry.youtubeId) {
          delete map[unitId];
        } else {
          nextEntry.updatedAt = new Date().toISOString();
          map[unitId] = nextEntry;
        }

        writeKidsSongsMediaMap(map);
        return sendJson(res, 200, { ok: true, unitId, entry: map[unitId] || null, media: map });
      }

      const delSongMediaMatch = pathname.match(/^\/api\/admin\/kids-song-media\/([^/]+)$/);
      if (method === 'DELETE' && delSongMediaMatch) {
        const unitId = sanitizeUnitId(decodeURIComponent(delSongMediaMatch[1]));
        if (!unitId) {
          return sendJson(res, 400, { error: 'Mã chủ đề không hợp lệ.' });
        }
        removeUploadedSongFiles(unitId);
        const map = readKidsSongsMediaMap();
        delete map[unitId];
        writeKidsSongsMediaMap(map);
        return sendJson(res, 200, { ok: true, unitId, media: map });
      }
    }

    sendJson(res, 404, { error: 'API endpoint không tồn tại.' });
  } catch (err) {
    sendJson(res, 500, { error: err?.message || 'Lỗi máy chủ SQLite API.' });
  }
});

server.listen(PORT, () => {
  console.log(`✅ MyEnglish SQLite API Server running on http://localhost:${PORT}`);
  const { sttModel } = getSttSettings();
  warmupCachedSttIfPresent(sttModel);
});
