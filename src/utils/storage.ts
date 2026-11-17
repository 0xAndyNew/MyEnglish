import { SrsCardState, UserAccount, UserProgress, WordEntry } from '../types/learning';

const TOKEN_KEY = 'myenglish_token_v1';
export const DEV_EMAIL = 'admin';

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function isDevAccount(email?: string | null): boolean {
  return (email ?? '').trim().toLowerCase() === DEV_EMAIL;
}

export function getAuthToken(): string {
  try {
    return localStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export function setAuthToken(token: string): void {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore storage errors
  }
}

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(path, { ...options, headers });
  } catch {
    throw new Error('Không kết nối được Backend SQLite Server (cổng 3001). Hãy chạy "npm run server".');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Lỗi máy chủ (${res.status})`);
  }
  return data as T;
}

export function getDefaultProgress(): UserProgress {
  return {
    xp: 0,
    streakDays: 1,
    lastActiveDate: getTodayStr(),
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
    geminiApiKey: '',
  };
}

export type SttProviderMode = 'auto' | 'local' | 'gemini';

export interface LocalSttStatus {
  status: 'idle' | 'loading' | 'ready' | 'error';
  model: string;
  targetModel: string;
  progressPercent: number;
  lastError: string | null;
  isLoaded: boolean;
  isTargetCached: boolean;
  downloadedModels: string[];
}

export async function fetchSessionState(): Promise<{
  user: UserAccount;
  progress: UserProgress;
  hasApiKey: boolean;
  sttProvider?: SttProviderMode;
  sttModel?: string;
} | null> {
  const token = getAuthToken();
  if (!token) return null;
  try {
    return await apiRequest<{
      user: UserAccount;
      progress: UserProgress;
      hasApiKey: boolean;
      sttProvider?: SttProviderMode;
      sttModel?: string;
    }>('/api/auth/me');
  } catch {
    setAuthToken('');
    return null;
  }
}

export async function registerAccount(
  emailRaw: string,
  displayNameRaw: string,
  password: string
): Promise<{ ok: true; user: UserAccount; progress: UserProgress } | { ok: false; error: string }> {
  try {
    const data = await apiRequest<{ user: UserAccount; token: string; progress: UserProgress }>(
      '/api/auth/register',
      {
        method: 'POST',
        body: JSON.stringify({
          email: emailRaw.trim().toLowerCase(),
          displayName: displayNameRaw.trim(),
          password,
        }),
      }
    );
    setAuthToken(data.token);
    return { ok: true, user: data.user, progress: data.progress };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Đăng ký thất bại.' };
  }
}

export async function loginAccount(
  emailRaw: string,
  password: string
): Promise<{ ok: true; user: UserAccount; progress: UserProgress } | { ok: false; error: string }> {
  try {
    const data = await apiRequest<{ user: UserAccount; token: string; progress: UserProgress }>(
      '/api/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({
          email: emailRaw.trim().toLowerCase(),
          password,
        }),
      }
    );
    setAuthToken(data.token);
    return { ok: true, user: data.user, progress: data.progress };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Đăng nhập thất bại.' };
  }
}

export async function logoutAccount(): Promise<void> {
  const token = getAuthToken();
  setAuthToken('');
  if (!token) return;
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    // ignore network errors on logout
  }
}

export async function saveProgressToDb(progress: UserProgress): Promise<void> {
  if (!getAuthToken()) return;
  try {
    await apiRequest('/api/progress', {
      method: 'PUT',
      body: JSON.stringify({ progress }),
    });
  } catch {
    // ignore transient save error
  }
}

// ---------------- ADMIN SQLITE API ----------------

export interface AdminUserSummary {
  email: string;
  displayName: string;
  role: 'admin' | 'user';
  createdAt: string;
  xp: number;
  unlockedStepIndex: number;
  completedLessonsCount: number;
}

export async function fetchAdminOverview(): Promise<{
  hasApiKey: boolean;
  maskedApiKey: string;
  users: AdminUserSummary[];
  sttProvider: SttProviderMode;
  sttModel: string;
  allowedSttModels: string[];
  localStt: LocalSttStatus;
}> {
  return apiRequest('/api/admin/overview');
}

export async function fetchSpeechStatus(): Promise<{
  sttProvider: SttProviderMode;
  sttModel: string;
  allowedModels: string[];
  hasGeminiKey: boolean;
  localStt: LocalSttStatus;
}> {
  return apiRequest('/api/speech/status');
}

export async function transcribeSpeechViaServer(payload: {
  wavBase64?: string;
  fallbackBase64?: string;
  fallbackMimeType?: string;
}): Promise<{
  transcript: string;
  provider: string;
  model: string;
  durationSec?: number;
  silent?: boolean;
}> {
  return apiRequest('/api/speech/transcribe', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function adminUpdateSttSettings(
  sttProvider: SttProviderMode,
  sttModel: string
): Promise<{
  ok: boolean;
  sttProvider: SttProviderMode;
  sttModel: string;
  localStt: LocalSttStatus;
}> {
  return apiRequest('/api/admin/stt-settings', {
    method: 'PUT',
    body: JSON.stringify({ sttProvider, sttModel }),
  });
}

export async function adminWarmupSttModel(model?: string): Promise<{
  ok: boolean;
  localStt: LocalSttStatus;
}> {
  return apiRequest('/api/admin/stt-warmup', {
    method: 'POST',
    body: JSON.stringify({ model }),
  });
}

export async function saveAdminApiKey(apiKey: string): Promise<{
  hasApiKey: boolean;
  maskedApiKey: string;
}> {
  return apiRequest('/api/admin/api-key', {
    method: 'PUT',
    body: JSON.stringify({ apiKey }),
  });
}

export async function testAdminApiKey(apiKey?: string): Promise<{ text: string; model: string }> {
  return apiRequest('/api/admin/test-key', {
    method: 'POST',
    body: JSON.stringify({ apiKey: apiKey || '' }),
  });
}

export async function adminResetUserProgress(email: string): Promise<UserProgress> {
  const res = await apiRequest<{ ok: boolean; progress: UserProgress }>(
    `/api/admin/users/${encodeURIComponent(email)}/reset-progress`,
    { method: 'POST' }
  );
  return res.progress;
}

export async function adminResetUserPassword(email: string, newPassword = '123456'): Promise<void> {
  await apiRequest(`/api/admin/users/${encodeURIComponent(email)}/reset-password`, {
    method: 'POST',
    body: JSON.stringify({ newPassword }),
  });
}

export async function adminDeleteUser(email: string): Promise<void> {
  await apiRequest(`/api/admin/users/${encodeURIComponent(email)}`, {
    method: 'DELETE',
  });
}

// ---------------- CUSTOM LESSONS SQLITE API ----------------

export type CustomLessonKind = 'sentence' | 'listening' | 'roleplay' | 'writing';

export interface CustomLessonRecord {
  id: string;
  kind: CustomLessonKind;
  payload: any;
  createdAt: string;
}

export async function fetchCustomLessons(): Promise<CustomLessonRecord[]> {
  if (!getAuthToken()) return [];
  try {
    const res = await apiRequest<{ lessons: CustomLessonRecord[] }>('/api/custom-lessons');
    return Array.isArray(res.lessons) ? res.lessons : [];
  } catch {
    return [];
  }
}

export async function adminCreateCustomLesson(
  kind: CustomLessonKind,
  payload: Record<string, any>
): Promise<CustomLessonRecord> {
  const res = await apiRequest<{ lesson: CustomLessonRecord }>('/api/admin/lessons', {
    method: 'POST',
    body: JSON.stringify({ kind, payload }),
  });
  return res.lesson;
}

export async function adminDeleteCustomLesson(id: string): Promise<void> {
  await apiRequest(`/api/admin/lessons/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

/**
 * Thuật toán Ôn tập Ngắt quãng (SM-2)
 */
export function updateSrsCard(
  current: SrsCardState | undefined,
  wordId: string,
  quality: 0 | 2 | 4 | 5
): SrsCardState {
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
