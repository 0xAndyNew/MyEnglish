import type { LewAgeLevelMeta } from '../data/preschool/lewLevels';
import type {
  LewAgeLevelId,
  LewAuditLogEntry,
  LewChildProfile,
  LewCmsDashboardStats,
  LewCmsRole,
  LewContentStatus,
  LewLessonProgressRecord,
  LewMediaAsset,
  LewObservationCode,
  LewObservationRecord,
  LewTopic,
} from '../data/preschool/lewTypes';
import type { AdminUserSummary } from './storage';
import { getAuthToken } from './storage';

async function lewRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(path, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Lỗi kết nối API (${res.status})`);
  }
  return data as T;
}

export interface LewBootstrapPayload {
  ageLevels: Record<LewAgeLevelId, LewAgeLevelMeta>;
  topics: LewTopic[];
  children: LewChildProfile[];
  activeChildId: string;
  completedKeys: Record<string, string[]>;
  stickersByChild: Record<string, string[]>;
  lessonProgress: LewLessonProgressRecord[];
  observations: LewObservationRecord[];
}

export async function fetchLewBootstrap(): Promise<LewBootstrapPayload> {
  return lewRequest<LewBootstrapPayload>('/api/v1/bootstrap');
}

export async function createLewChildApi(input: {
  name: string;
  ageLevelId: LewAgeLevelId;
  avatar: LewChildProfile['avatar'];
  birthMonth?: number;
  birthYear?: number;
  familyLanguage?: string;
  interests?: string[];
}): Promise<{ child: LewChildProfile; children: LewChildProfile[]; activeChildId: string }> {
  return lewRequest('/api/v1/children', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function updateLewChildApi(
  childId: string,
  patch: Partial<LewChildProfile>
): Promise<{ child: LewChildProfile; children: LewChildProfile[] }> {
  return lewRequest(`/api/v1/children/${encodeURIComponent(childId)}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });
}

export async function deleteLewChildApi(
  childId: string
): Promise<{ ok: boolean; children: LewChildProfile[]; activeChildId: string }> {
  return lewRequest(`/api/v1/children/${encodeURIComponent(childId)}`, {
    method: 'DELETE',
  });
}

export async function recordLewChildProgressApi(
  childId: string,
  payload: {
    topicId: string;
    levelId: LewAgeLevelId;
    status: 'started' | 'completed' | 'skipped';
    audioReplays?: number;
    gameAttempts?: number;
    activitiesTried?: string[];
    offlineActivityDone?: boolean;
    observations?: LewObservationCode[];
    parentNote?: string;
  }
): Promise<{
  ok: boolean;
  completedKeys: Record<string, string[]>;
  stickersByChild: Record<string, string[]>;
  lessonProgress: LewLessonProgressRecord[];
  observations: LewObservationRecord[];
}> {
  return lewRequest(`/api/v1/children/${encodeURIComponent(childId)}/progress`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// --- ADMIN CMS API HELPERS ---

export interface LewAdminDashboardResponse {
  stats: LewCmsDashboardStats;
  ageLevels: Record<LewAgeLevelId, LewAgeLevelMeta>;
  topics: LewTopic[];
  mediaAssets: LewMediaAsset[];
  auditLogs: LewAuditLogEntry[];
  users: AdminUserSummary[];
}

export async function fetchLewAdminDashboard(): Promise<LewAdminDashboardResponse> {
  return lewRequest<LewAdminDashboardResponse>('/api/v1/admin/dashboard');
}

export async function updateLewAgeLevelApi(
  levelId: LewAgeLevelId,
  patch: Partial<LewAgeLevelMeta>
): Promise<{ ageLevels: Record<LewAgeLevelId, LewAgeLevelMeta> }> {
  return lewRequest(`/api/v1/admin/age-levels/${encodeURIComponent(levelId)}`, {
    method: 'PUT',
    body: JSON.stringify(patch),
  });
}

export async function createLewTopicApi(
  topic: Partial<LewTopic>
): Promise<{ topic: LewTopic }> {
  return lewRequest('/api/v1/admin/topics', {
    method: 'POST',
    body: JSON.stringify(topic),
  });
}

export async function updateLewTopicApi(
  topicId: string,
  topic: Partial<LewTopic>
): Promise<{ topic: LewTopic }> {
  return lewRequest(`/api/v1/admin/topics/${encodeURIComponent(topicId)}`, {
    method: 'PUT',
    body: JSON.stringify(topic),
  });
}

export async function updateLewTopicStatusApi(
  topicId: string,
  status: LewContentStatus
): Promise<{ topic: LewTopic }> {
  return lewRequest(`/api/v1/admin/topics/${encodeURIComponent(topicId)}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function deleteOrArchiveLewTopicApi(
  topicId: string
): Promise<{ ok: boolean; archived?: boolean; deleted?: boolean; topic?: LewTopic }> {
  return lewRequest(`/api/v1/admin/topics/${encodeURIComponent(topicId)}`, {
    method: 'DELETE',
  });
}

export async function uploadLewMediaAssetApi(payload: {
  title: string;
  type: 'image' | 'audio' | 'printable';
  licenseNote: string;
  url?: string;
  base64Data?: string;
  fileName?: string;
  mimeType?: string;
}): Promise<{ mediaAsset: LewMediaAsset }> {
  return lewRequest('/api/v1/admin/media', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function archiveLewMediaAssetApi(
  mediaId: string
): Promise<{ ok: boolean }> {
  return lewRequest(`/api/v1/admin/media/${encodeURIComponent(mediaId)}`, {
    method: 'DELETE',
  });
}

export async function updateLewUserRoleApi(
  email: string,
  role: LewCmsRole
): Promise<{ ok: boolean; email: string; role: LewCmsRole }> {
  return lewRequest(`/api/v1/admin/users/${encodeURIComponent(email)}/role`, {
    method: 'PUT',
    body: JSON.stringify({ role }),
  });
}
