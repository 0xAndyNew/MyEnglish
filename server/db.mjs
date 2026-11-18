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
    srs_cards TEXT NOT NULL DEFAULT '{}',
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

  CREATE TABLE IF NOT EXISTS custom_lessons (
    id TEXT PRIMARY KEY,
    kind TEXT NOT NULL,
    payload_json TEXT NOT NULL,
    audiences TEXT NOT NULL DEFAULT '[]',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS learner_profiles (
    email TEXT PRIMARY KEY REFERENCES users(email) ON DELETE CASCADE,
    audience TEXT NOT NULL DEFAULT 'worker',
    start_level TEXT NOT NULL DEFAULT 'A0',
    daily_minutes INTEGER NOT NULL DEFAULT 20,
    details_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

function ensureColumnExists(tableName, columnName, columnDef) {
  const cols = db.prepare(`PRAGMA table_info(${tableName})`).all();
  if (!cols.some((c) => c.name === columnName)) {
    db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDef}`);
  }
}

ensureColumnExists('user_progress', 'track_unlocks', "TEXT NOT NULL DEFAULT '{}'");
ensureColumnExists('user_progress', 'srs_cards', "TEXT NOT NULL DEFAULT '{}'");
ensureColumnExists('custom_lessons', 'audiences', "TEXT NOT NULL DEFAULT '[]'");

export const VALID_AUDIENCES = new Set(['kids', 'teen', 'university', 'worker', 'exam']);
const VALID_LEVELS = new Set(['A0', 'A1', 'A2', 'B1', 'B2', 'C1']);
const VALID_DAILY_MINUTES = new Set([10, 20, 30, 60]);

// Safe migration for existing SQLite databases missing srs_cards column
const progressCols = db.prepare('PRAGMA table_info(user_progress)').all().map((c) => c.name);
if (!progressCols.includes('srs_cards')) {
  db.exec("ALTER TABLE user_progress ADD COLUMN srs_cards TEXT NOT NULL DEFAULT '{}'");
}

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
    trackUnlocks: {},
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

  Object.assign(srsCards, parseJsonSafe(row.srs_cards, {}));

  return {
    xp: row.xp || 0,
    streakDays,
    lastActiveDate,
    unlockedStepIndex: row.unlocked_step_index || 0,
    trackUnlocks: parseJsonSafe(row.track_unlocks, {}),
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
        track_unlocks = ?,
        accent = ?,
        passed_letters = ?,
        passed_ipa_pairs = ?,
        completed_grammar_ids = ?,
        completed_sentence_ids = ?,
        completed_lessons = ?,
        mastered_phonemes = ?,
        pronunciation_scores = ?,
        srs_cards = ?,
        updated_at = ?
      WHERE email = ?`
    ).run(
      Number(progress.xp || 0),
      Number(progress.streakDays || 1),
      String(progress.lastActiveDate || todayStr()),
      Number(progress.unlockedStepIndex || 0),
      JSON.stringify(progress.trackUnlocks || {}),
      progress.accent === 'en-GB' ? 'en-GB' : 'en-US',
      JSON.stringify(progress.passedLetters || []),
      JSON.stringify(progress.passedIpaPairs || []),
      JSON.stringify(progress.completedGrammarIds || []),
      JSON.stringify(progress.completedSentenceIds || []),
      JSON.stringify(progress.completedLessons || []),
      JSON.stringify(progress.masteredPhonemes || []),
      JSON.stringify(progress.pronunciationScores || []),
      JSON.stringify(progress.srsCards || {}),
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

function rowToLearnerProfile(row) {
  if (!row) return null;
  const details = parseJsonSafe(row.details_json, {});
  return {
    audience: VALID_AUDIENCES.has(row.audience) ? row.audience : 'worker',
    startLevel: VALID_LEVELS.has(row.start_level) ? row.start_level : 'A0',
    dailyMinutes: VALID_DAILY_MINUTES.has(Number(row.daily_minutes)) ? Number(row.daily_minutes) : 20,
    ...(details && typeof details === 'object' ? details : {}),
    updatedAt: row.updated_at,
  };
}

export function getLearnerProfile(emailRaw) {
  const email = String(emailRaw || '').trim().toLowerCase();
  if (!email) return null;
  const row = db.prepare('SELECT * FROM learner_profiles WHERE email = ?').get(email);
  return rowToLearnerProfile(row);
}

export function saveLearnerProfile(emailRaw, profileInput = {}) {
  const email = String(emailRaw || '').trim().toLowerCase();
  const audience = VALID_AUDIENCES.has(profileInput.audience) ? profileInput.audience : 'worker';
  const startLevel = VALID_LEVELS.has(profileInput.startLevel) ? profileInput.startLevel : 'A0';
  const dailyMinutesNum = Number(profileInput.dailyMinutes || 20);
  const dailyMinutes = VALID_DAILY_MINUTES.has(dailyMinutesNum) ? dailyMinutesNum : 20;

  const details = {};
  if (profileInput.kids && typeof profileInput.kids === 'object') details.kids = profileInput.kids;
  if (profileInput.teen && typeof profileInput.teen === 'object') details.teen = profileInput.teen;
  if (profileInput.university && typeof profileInput.university === 'object') details.university = profileInput.university;
  if (profileInput.worker && typeof profileInput.worker === 'object') details.worker = profileInput.worker;
  if (profileInput.exam && typeof profileInput.exam === 'object') details.exam = profileInput.exam;

  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO learner_profiles (email, audience, start_level, daily_minutes, details_json, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(email) DO UPDATE SET
       audience = excluded.audience,
       start_level = excluded.start_level,
       daily_minutes = excluded.daily_minutes,
       details_json = excluded.details_json,
       updated_at = excluded.updated_at`
  ).run(email, audience, startLevel, dailyMinutes, JSON.stringify(details), now, now);

  return getLearnerProfile(email);
}

export function listAllUsersAdmin() {
  const rows = db
    .prepare(
      `SELECT u.email, u.display_name, u.role, u.created_at,
              p.xp, p.unlocked_step_index, p.completed_lessons,
              lp.audience, lp.start_level, lp.daily_minutes, lp.details_json, lp.updated_at AS profile_updated_at
       FROM users u
       LEFT JOIN user_progress p ON p.email = u.email
       LEFT JOIN learner_profiles lp ON lp.email = u.email
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
    audience: r.audience && VALID_AUDIENCES.has(r.audience) ? r.audience : null,
    profile: r.audience
      ? rowToLearnerProfile({
          audience: r.audience,
          start_level: r.start_level,
          daily_minutes: r.daily_minutes,
          details_json: r.details_json,
          updated_at: r.profile_updated_at || r.created_at,
        })
      : null,
  }));
}

export function resetProgressInDb(emailRaw) {
  const email = emailRaw.trim().toLowerCase();
  const now = new Date().toISOString();
  db.exec('BEGIN');
  try {
    db.prepare(
      `UPDATE user_progress SET
        xp = 0, streak_days = 1, last_active_date = ?, unlocked_step_index = 0, track_unlocks = '{}',
        passed_letters = '[]', passed_ipa_pairs = '[]', completed_grammar_ids = '[]',
        completed_sentence_ids = '[]', completed_lessons = '[]', mastered_phonemes = '[]',
        pronunciation_scores = '[]', srs_cards = '{}', updated_at = ?
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

export function listCustomLessons() {
  const rows = db
    .prepare('SELECT id, kind, payload_json, audiences, created_at FROM custom_lessons ORDER BY created_at DESC')
    .all();
  return rows.map((r) => {
    const rawAudiences = parseJsonSafe(r.audiences, []);
    const audiences = Array.isArray(rawAudiences)
      ? rawAudiences.filter((a) => VALID_AUDIENCES.has(a))
      : [];
    return {
      id: r.id,
      kind: r.kind,
      payload: parseJsonSafe(r.payload_json, {}),
      audiences,
      createdAt: r.created_at,
    };
  });
}

export function addCustomLesson(kind, payload, rawAudiences = []) {
  const id = `cl-${kind}-${Date.now()}`;
  const createdAt = new Date().toISOString();
  const audiences = Array.isArray(rawAudiences)
    ? Array.from(new Set(rawAudiences.filter((a) => VALID_AUDIENCES.has(a))))
    : [];
  const payloadWithId = { ...payload, id, ...(audiences.length > 0 ? { audiences } : {}) };
  db.prepare('INSERT INTO custom_lessons (id, kind, payload_json, audiences, created_at) VALUES (?, ?, ?, ?, ?)')
    .run(id, kind, JSON.stringify(payloadWithId), JSON.stringify(audiences), createdAt);
  return { id, kind, payload: payloadWithId, audiences, createdAt };
}

export function deleteCustomLesson(id) {
  const res = db.prepare('DELETE FROM custom_lessons WHERE id = ?').run(id);
  return res.changes > 0;
}
