import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  createSession,
  db,
  DEV_EMAIL,
  getAppSetting,
  getUserBySessionToken,
  hashPassword,
  listAllUsersAdmin,
  loadFullProgress,
  resetProgressInDb,
  saveFullProgress,
  setAppSetting,
  verifyPassword,
} from './db.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = Number(process.env.PORT || 3001);

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
      if (total > 12 * 1024 * 1024) {
        reject(new Error('Dữ liệu gửi lên quá lớn.'));
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

const MIME_MAP = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

function serveStatic(reqPath, res) {
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
  res.writeHead(200, { 'Content-Type': MIME_MAP[ext] || 'application/octet-stream' });
  fs.createReadStream(target).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url || '/', `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;
  const method = req.method || 'GET';

  if (!pathname.startsWith('/api/')) {
    serveStatic(pathname, res);
    return;
  }

  try {
    if (method === 'GET' && pathname === '/api/health') {
      return sendJson(res, 200, { ok: true, database: 'sqlite', path: 'data/myenglish.db' });
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

      const progress = loadFullProgress(email);
      const token = createSession(email);
      return sendJson(res, 201, {
        user: { email, displayName, role: 'user', createdAt: now },
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
      const token = createSession(email);
      return sendJson(res, 200, {
        user: {
          email: row.email,
          displayName: row.display_name,
          role: row.role,
          createdAt: row.created_at,
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
      const hasApiKey = Boolean(getAppSetting('gemini_api_key'));
      return sendJson(res, 200, { user: currentUser, progress, hasApiKey });
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
        return sendJson(res, 200, {
          hasApiKey: Boolean(key),
          maskedApiKey: maskKey(key),
          users,
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
    }

    sendJson(res, 404, { error: 'API endpoint không tồn tại.' });
  } catch (err) {
    sendJson(res, 500, { error: err?.message || 'Lỗi máy chủ SQLite API.' });
  }
});

server.listen(PORT, () => {
  console.log(`✅ MyEnglish SQLite API Server running on http://localhost:${PORT}`);
});
