import { DatabaseSync } from 'node:sqlite';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const DB_PATH = path.join(DATA_DIR, 'myenglish.db');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    email TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    email TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS user_progress (
    email TEXT PRIMARY KEY REFERENCES users(email) ON DELETE CASCADE,
    xp INTEGER NOT NULL DEFAULT 0,
    streak_days INTEGER NOT NULL DEFAULT 1,
    last_active_date TEXT NOT NULL,
    unlocked_step_index INTEGER NOT NULL DEFAULT 0,
    accent TEXT NOT NULL DEFAULT 'en-US',
    passed_letters TEXT NOT NULL DEFAULT '[]',
    passed_ipa_pairs TEXT NOT NULL DEFAULT '[]',
    completed_grammar_ids TEXT NOT NULL DEFAULT '[]',
    completed_sentence_ids TEXT NOT NULL DEFAULT '[]',
    completed_lessons TEXT NOT NULL DEFAULT '[]',
    mastered_phonemes TEXT NOT NULL DEFAULT '[]',
    pronunciation_scores TEXT NOT NULL DEFAULT '[]',
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS saved_words (
    email TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    word TEXT NOT NULL,
    entry_json TEXT NOT NULL,
    srs_json TEXT,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (email, word)
  );

  CREATE TABLE IF NOT EXISTS app_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

export const DEV_EMAIL = 'admin';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derived}`;
}

export function verifyPassword(password, storedHash) {
  const [salt, keyHex] = String(storedHash || '').split(':');
  if (!salt || !keyHex) return false;
  const derived = crypto.scryptSync(password, salt, 64);
  const keyBuf = Buffer.from(keyHex, 'hex');
  if (derived.length !== keyBuf.length) return false;
  return crypto.timingSafeEqual(derived, keyBuf);
}

export function getDefaultProgressObj() {
  return {
    xp: 0,
    streakDays: 1,
    lastActiveDate: todayStr(),
    unlockedStepIndex: 0,
    passedLetters: [],
    passedIpaPairs: [],
    completedGrammarIds: [],
    completedSentenceIds: [],
    completedLessons: [],
    masteredPhonemes: [],
    savedWords: [],
    srsCards: {},
    pronunciationScores: [],
    accent: 'en-US',
  };
}

function ensureUserProgressRow(email) {
  const row = db.prepare('SELECT email FROM user_progress WHERE email = ?').get(email);
  if (!row) {
    const now = new Date().toISOString();
    db.prepare(
      `INSERT INTO user_progress (email, xp, streak_days, last_active_date, unlocked_step_index, accent, updated_at)
       VALUES (?, 0, 1, ?, 0, 'en-US', ?)`
    ).run(email, todayStr(), now);
  }
}

// Seed Admin Dev account if missing & migrate legacy admin@hieupro.io.vn
function seedAdminAccount() {
  db.prepare('DELETE FROM users WHERE email = ?').run('admin@hieupro.io.vn');
  const existing = db.prepare('SELECT email FROM users WHERE email = ?').get(DEV_EMAIL);
  if (!existing) {
    const now = new Date().toISOString();
    db.prepare(
      'INSERT INTO users (email, display_name, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?)'
    ).run(DEV_EMAIL, 'Admin Dev', hashPassword('Admin@123'), 'admin', now);
  }
  ensureUserProgressRow(DEV_EMAIL);
}

seedAdminAccount();

function parseJsonSafe(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function loadFullProgress(emailRaw) {
  const email = emailRaw.trim().toLowerCase();
  ensureUserProgressRow(email);
  const row = db.prepare('SELECT * FROM user_progress WHERE email = ?').get(email);

  const today = todayStr();
  let streakDays = row.streak_days || 1;
  let lastActiveDate = row.last_active_date || today;
  if (lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    streakDays = lastActiveDate === yesterday ? streakDays + 1 : 1;
    lastActiveDate = today;
    db.prepare('UPDATE user_progress SET streak_days = ?, last_active_date = ?, updated_at = ? WHERE email = ?')
      .run(streakDays, lastActiveDate, new Date().toISOString(), email);
  }

  const wordRows = db.prepare('SELECT word, entry_json, srs_json FROM saved_words WHERE email = ? ORDER BY updated_at DESC').all(email);
  const savedWords = [];
  const srsCards = {};

  for (const wr of wordRows) {
    const entry = parseJsonSafe(wr.entry_json, null);
    if (entry) {
      savedWords.push(entry);
      const srs = parseJsonSafe(wr.srs_json, null);
      if (srs && entry.id) {
        srsCards[entry.id] = srs;
      }
    }
  }

  return {
    xp: row.xp || 0,
    streakDays,
    lastActiveDate,
    unlockedStepIndex: row.unlocked_step_index || 0,
    passedLetters: parseJsonSafe(row.passed_letters, []),
    passedIpaPairs: parseJsonSafe(row.passed_ipa_pairs, []),
    completedGrammarIds: parseJsonSafe(row.completed_grammar_ids, []),
    completedSentenceIds: parseJsonSafe(row.completed_sentence_ids, []),
    completedLessons: parseJsonSafe(row.completed_lessons, []),
    masteredPhonemes: parseJsonSafe(row.mastered_phonemes, []),
    savedWords,
    srsCards,
    pronunciationScores: parseJsonSafe(row.pronunciation_scores, []),
    accent: row.accent === 'en-GB' ? 'en-GB' : 'en-US',
  };
}

export function saveFullProgress(emailRaw, progress) {
  const email = emailRaw.trim().toLowerCase();
  ensureUserProgressRow(email);
  const now = new Date().toISOString();

  db.exec('BEGIN');
  try {
    db.prepare(
      `UPDATE user_progress SET
        xp = ?,
        streak_days = ?,
        last_active_date = ?,
        unlocked_step_index = ?,
        accent = ?,
        passed_letters = ?,
        passed_ipa_pairs = ?,
        completed_grammar_ids = ?,
        completed_sentence_ids = ?,
        completed_lessons = ?,
        mastered_phonemes = ?,
        pronunciation_scores = ?,
        updated_at = ?
      WHERE email = ?`
    ).run(
      Number(progress.xp || 0),
      Number(progress.streakDays || 1),
      String(progress.lastActiveDate || todayStr()),
      Number(progress.unlockedStepIndex || 0),
      progress.accent === 'en-GB' ? 'en-GB' : 'en-US',
      JSON.stringify(progress.passedLetters || []),
      JSON.stringify(progress.passedIpaPairs || []),
      JSON.stringify(progress.completedGrammarIds || []),
      JSON.stringify(progress.completedSentenceIds || []),
      JSON.stringify(progress.completedLessons || []),
      JSON.stringify(progress.masteredPhonemes || []),
      JSON.stringify(progress.pronunciationScores || []),
      now,
      email
    );

    const savedWords = Array.isArray(progress.savedWords) ? progress.savedWords : [];
    const srsCards = progress.srsCards || {};
    db.prepare('DELETE FROM saved_words WHERE email = ?').run(email);
    const insertWord = db.prepare(
      'INSERT INTO saved_words (email, word, entry_json, srs_json, updated_at) VALUES (?, ?, ?, ?, ?)'
    );
    for (const entry of savedWords) {
      if (!entry || !entry.word) continue;
      const wordKey = String(entry.word).trim().toLowerCase();
      const srs = entry.id && srsCards[entry.id] ? JSON.stringify(srsCards[entry.id]) : null;
      insertWord.run(email, wordKey, JSON.stringify(entry), srs, now);
    }

    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

export function createSession(email) {
  const token = crypto.randomBytes(32).toString('hex');
  db.prepare('INSERT INTO sessions (token, email, created_at) VALUES (?, ?, ?)').run(
    token,
    email,
    new Date().toISOString()
  );
  return token;
}

export function getUserBySessionToken(token) {
  if (!token) return null;
  const row = db
    .prepare(
      `SELECT u.email, u.display_name, u.role, u.created_at
       FROM sessions s
       JOIN users u ON u.email = s.email
       WHERE s.token = ?`
    )
    .get(token);
  if (!row) return null;
  return {
    email: row.email,
    displayName: row.display_name,
    role: row.role,
    createdAt: row.created_at,
  };
}

export function getAppSetting(key) {
  const row = db.prepare('SELECT value FROM app_settings WHERE key = ?').get(key);
  return row ? row.value : '';
}

export function setAppSetting(key, value) {
  const clean = String(value || '').trim();
  if (!clean) {
    db.prepare('DELETE FROM app_settings WHERE key = ?').run(key);
    return;
  }
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO app_settings (key, value, updated_at) VALUES (?, ?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
  ).run(key, clean, now);
}

export function listAllUsersAdmin() {
  const rows = db
    .prepare(
      `SELECT u.email, u.display_name, u.role, u.created_at,
              p.xp, p.unlocked_step_index, p.completed_lessons
       FROM users u
       LEFT JOIN user_progress p ON p.email = u.email
       ORDER BY CASE WHEN u.role = 'admin' THEN 0 ELSE 1 END, u.created_at DESC`
    )
    .all();

  return rows.map((r) => ({
    email: r.email,
    displayName: r.display_name,
    role: r.role,
    createdAt: r.created_at,
    xp: r.xp || 0,
    unlockedStepIndex: r.unlocked_step_index || 0,
    completedLessonsCount: parseJsonSafe(r.completed_lessons, []).length,
  }));
}

export function resetProgressInDb(emailRaw) {
  const email = emailRaw.trim().toLowerCase();
  const now = new Date().toISOString();
  db.exec('BEGIN');
  try {
    db.prepare(
      `UPDATE user_progress SET
        xp = 0, streak_days = 1, last_active_date = ?, unlocked_step_index = 0,
        passed_letters = '[]', passed_ipa_pairs = '[]', completed_grammar_ids = '[]',
        completed_sentence_ids = '[]', completed_lessons = '[]', mastered_phonemes = '[]',
        pronunciation_scores = '[]', updated_at = ?
      WHERE email = ?`
    ).run(todayStr(), now, email);
    db.prepare('DELETE FROM saved_words WHERE email = ?').run(email);
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
  return loadFullProgress(email);
}
