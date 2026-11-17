import { SrsCardState, UserAccount, UserProgress, WordEntry } from '../types/learning';

const ACCOUNTS_KEY = 'myenglish_accounts_v1';
const SESSION_KEY = 'myenglish_active_email_v1';
const GLOBAL_API_KEY_STORAGE = 'myenglish_global_gemini_key_v1';

export const DEV_EMAIL = 'admin@hieupro.io.vn';

export function isDevAccount(email?: string | null): boolean {
  return (email ?? '').trim().toLowerCase() === DEV_EMAIL;
}

export function getGlobalApiKey(): string {
  try {
    return localStorage.getItem(GLOBAL_API_KEY_STORAGE) || '';
  } catch {
    return '';
  }
}

export function saveGlobalApiKey(apiKey: string): void {
  try {
    const clean = apiKey.trim();
    if (clean) localStorage.setItem(GLOBAL_API_KEY_STORAGE, clean);
    else localStorage.removeItem(GLOBAL_API_KEY_STORAGE);
  } catch {
    // ignore storage errors
  }
}

function getProgressKey(email: string): string {
  return `myenglish_progress_${email.trim().toLowerCase()}`;
}

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function hashPassword(password: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    const data = new TextEncoder().encode(password);
    const hashBuf = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  return btoa(password);
}

export function getAccounts(): UserAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as UserAccount[]) : [];
  } catch {
    return [];
  }
}

export function getCurrentUser(): UserAccount | null {
  try {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    return getAccounts().find((a) => a.email.toLowerCase() === email.toLowerCase()) || null;
  } catch {
    return null;
  }
}

export async function registerAccount(
  emailRaw: string,
  displayNameRaw: string,
  password: string
): Promise<{ ok: true; user: UserAccount } | { ok: false; error: string }> {
  const email = emailRaw.trim().toLowerCase();
  const displayName = displayNameRaw.trim() || email.split('@')[0];

  if (email === DEV_EMAIL) {
    return { ok: false, error: 'Tài khoản quản trị đã được tạo sẵn, vui lòng chuyển sang tab Đăng nhập.' };
  }
  if (!email.endsWith('@gmail.com') || email.length < 11) {
    return { ok: false, error: 'Vui lòng nhập đúng địa chỉ Gmail (ví dụ: tenban@gmail.com).' };
  }
  if (password.length < 6) {
    return { ok: false, error: 'Mật khẩu phải có ít nhất 6 ký tự.' };
  }

  const accounts = getAccounts();
  if (accounts.some((a) => a.email.toLowerCase() === email)) {
    return { ok: false, error: 'Gmail này đã được đăng ký. Vui lòng chuyển sang tab Đăng nhập.' };
  }

  const passwordHash = await hashPassword(password);
  const user: UserAccount = {
    email,
    displayName,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, user]));
  localStorage.setItem(SESSION_KEY, email);
  saveProgress(getDefaultProgress(), email);
  return { ok: true, user };
}

export async function loginAccount(
  emailRaw: string,
  password: string
): Promise<{ ok: true; user: UserAccount } | { ok: false; error: string }> {
  const email = emailRaw.trim().toLowerCase();
  const accounts = getAccounts();

  if (email === DEV_EMAIL) {
    if (password !== 'Admin@123') {
      return { ok: false, error: 'Mật khẩu tài khoản Dev chưa đúng.' };
    }
    let devUser = accounts.find((a) => a.email.toLowerCase() === DEV_EMAIL);
    if (!devUser) {
      const passwordHash = await hashPassword('Admin@123');
      devUser = {
        email: DEV_EMAIL,
        displayName: 'Admin Dev',
        passwordHash,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, devUser]));
      saveProgress(getDefaultProgress(), DEV_EMAIL);
    }
    localStorage.setItem(SESSION_KEY, DEV_EMAIL);
    return { ok: true, user: devUser };
  }

  const found = accounts.find((a) => a.email.toLowerCase() === email);
  if (!found) {
    return { ok: false, error: 'Không tìm thấy tài khoản Gmail này. Anh hãy bấm Đăng ký mới nhé.' };
  }

  const passwordHash = await hashPassword(password);
  if (found.passwordHash !== passwordHash) {
    return { ok: false, error: 'Mật khẩu chưa đúng. Vui lòng thử lại.' };
  }

  localStorage.setItem(SESSION_KEY, email);
  return { ok: true, user: found };
}

export function logoutAccount(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getDefaultProgress(): UserProgress {
  return {
    xp: 0,
    streakDays: 1,
    lastActiveDate: getTodayStr(),
    unlockedStepIndex: 0, // Bắt đầu từ Bước 1A (Chữ cái A-Z)
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
    geminiApiKey: '',
  };
}

export function loadProgress(email?: string): UserProgress {
  if (!email) return getDefaultProgress();
  try {
    const raw = localStorage.getItem(getProgressKey(email));
    if (!raw) return getDefaultProgress();
    const parsed = JSON.parse(raw) as UserProgress;
    const today = getTodayStr();
    if (parsed.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      parsed.streakDays = parsed.lastActiveDate === yesterday ? (parsed.streakDays || 0) + 1 : 1;
      parsed.lastActiveDate = today;
    }
    return { ...getDefaultProgress(), ...parsed };
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress, email?: string): void {
  if (!email) return;
  try {
    localStorage.setItem(getProgressKey(email), JSON.stringify(progress));
  } catch {
    // ignore quota errors
  }
}

/**
 * Thuật toán Ôn tập Ngắt quãng (SM-2)
 */
export function updateSrsCard(current: SrsCardState | undefined, wordId: string, quality: 0 | 2 | 4 | 5): SrsCardState {
  const card: SrsCardState = current || {
    wordId,
    intervalDays: 0,
    easeFactor: 2.5,
    repetitions: 0,
    nextReviewAt: Date.now(),
  };

  let { intervalDays, easeFactor, repetitions } = card;

  if (quality < 3) {
    repetitions = 0;
    intervalDays = 0;
  } else {
    if (repetitions === 0) intervalDays = 1;
    else if (repetitions === 1) intervalDays = 3;
    else intervalDays = Math.round(intervalDays * easeFactor);
    repetitions += 1;
  }

  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  const nextReviewAt = Date.now() + intervalDays * 86400000;

  return {
    wordId,
    intervalDays,
    easeFactor,
    repetitions,
    nextReviewAt,
    lastScore: quality,
  };
}

export function addWordToNotebook(progress: UserProgress, word: WordEntry): UserProgress {
  const exists = progress.savedWords.some((w) => w.word.toLowerCase() === word.word.toLowerCase());
  const savedWords = exists ? progress.savedWords : [word, ...progress.savedWords];
  const srsCards = { ...progress.srsCards };
  if (!srsCards[word.id]) {
    srsCards[word.id] = {
      wordId: word.id,
      intervalDays: 0,
      easeFactor: 2.5,
      repetitions: 0,
      nextReviewAt: Date.now(),
    };
  }
  return { ...progress, savedWords, srsCards, xp: progress.xp + (exists ? 0 : 10) };
}

export function resetUserProgress(email: string): UserProgress {
  const fresh = getDefaultProgress();
  saveProgress(fresh, email);
  return fresh;
}

export async function resetUserPassword(email: string, newPass = '123456'): Promise<boolean> {
  const lower = email.trim().toLowerCase();
  if (lower === DEV_EMAIL) return false;
  const accounts = getAccounts();
  const idx = accounts.findIndex((a) => a.email.toLowerCase() === lower);
  if (idx < 0) return false;
  const passwordHash = await hashPassword(newPass);
  const updated = [...accounts];
  updated[idx] = { ...updated[idx], passwordHash };
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updated));
  return true;
}

export function deleteUserAccount(email: string): boolean {
  const lower = email.trim().toLowerCase();
  if (lower === DEV_EMAIL) return false;
  const accounts = getAccounts().filter((a) => a.email.toLowerCase() !== lower);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  localStorage.removeItem(getProgressKey(lower));
  return true;
}
