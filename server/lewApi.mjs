import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  db,
  DEV_EMAIL,
  getUserBySessionToken,
  listAllUsersAdmin,
  loadFullProgress,
  saveFullProgress,
} from './db.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SEED_PATH = path.join(__dirname, 'lewSeedData.json');
const LEW_MEDIA_DIR = path.join(ROOT_DIR, 'data', 'lew-media');

if (!fs.existsSync(LEW_MEDIA_DIR)) {
  fs.mkdirSync(LEW_MEDIA_DIR, { recursive: true });
}

const VALID_CMS_ROLES = new Set(['admin', 'editor', 'viewer', 'user']);
const VALID_STATUSES = new Set(['draft', 'review', 'published', 'archived']);
const VALID_LEVEL_IDS = new Set(['level1', 'level2', 'level3', 'level4', 'level5']);
const VALID_AVATARS = new Set(['benny', 'toto', 'bunny', 'kitty']);
const VALID_OBS_CODES = new Set([
  'recognized',
  'understood',
  'spoke',
  'real_life',
  'needs_review',
  'not_observed',
]);

const DEFAULT_ENABLED_ACTIVITIES = {
  warmup: true,
  input: true,
  listening: true,
  games: true,
  parentActivity: true,
  story: true,
  enabledGameModes: ['listen', 'match', 'missing', 'sort', 'story_order', 'move'],
};

function parseJsonSafe(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeAuditLog(actorEmail, actorRole, action, entityType, entityId, summary) {
  const id = `audit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO lew_audit_logs (id, actor_email, actor_role, action, entity_type, entity_id, summary, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    String(actorEmail || 'system'),
    String(actorRole || 'admin'),
    String(action || 'update'),
    String(entityType || 'topic'),
    String(entityId || ''),
    String(summary || ''),
    now
  );
}

export function ensureLewSeeded() {
  const topicCountRow = db.prepare('SELECT COUNT(*) AS cnt FROM lew_topics').get();
  const levelCountRow = db.prepare('SELECT COUNT(*) AS cnt FROM lew_age_levels').get();

  if (Number(topicCountRow?.cnt || 0) > 0 && Number(levelCountRow?.cnt || 0) > 0) {
    return;
  }

  if (!fs.existsSync(SEED_PATH)) {
    return;
  }

  const seed = parseJsonSafe(fs.readFileSync(SEED_PATH, 'utf8'), null);
  if (!seed) return;

  const now = new Date().toISOString();
  db.exec('BEGIN');
  try {
    if (Number(levelCountRow?.cnt || 0) === 0 && seed.ageLevels) {
      const ageOrder = ['level1', 'level2', 'level3', 'level4', 'level5'];
      const minMaxByLevel = {
        level1: [1, 2],
        level2: [2, 3],
        level3: [3, 4],
        level4: [4, 5],
        level5: [5, 6],
      };
      const insLevel = db.prepare(
        `INSERT OR REPLACE INTO lew_age_levels
         (id, code, name, age_range_vi, min_age, max_age, is_parent_led, max_choices, sort_order, meta_json, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );
      ageOrder.forEach((lvId, idx) => {
        const meta = seed.ageLevels[lvId];
        if (!meta) return;
        const [minAge, maxAge] = minMaxByLevel[lvId] || [1, 6];
        insLevel.run(
          lvId,
          meta.code || `Level ${idx + 1}`,
          meta.name || lvId,
          meta.ageRangeVi || `${minAge}–${maxAge} tuổi`,
          minAge,
          maxAge,
          meta.isParentLed ? 1 : 0,
          Number(meta.maxChoices || 3),
          idx + 1,
          JSON.stringify(meta),
          now
        );
      });
    }

    if (Number(topicCountRow?.cnt || 0) === 0 && Array.isArray(seed.topics)) {
      const insTopic = db.prepare(
        `INSERT OR REPLACE INTO lew_topics
         (id, code, sort_order, title_en, title_vi, subtitle_vi, status, version, estimated_minutes, license_note, enabled_activities_json, payload_json, updated_by, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, 'published', 1, 10, ?, ?, ?, 'system-seed', ?)`
      );
      for (const t of seed.topics) {
        insTopic.run(
          t.id,
          t.code,
          Number(t.order || 1),
          t.titleEn,
          t.titleVi,
          t.subtitleVi || '',
          'Internal SVG/WebP Illustration Library (CC0 / Project Owned)',
          JSON.stringify(DEFAULT_ENABLED_ACTIVITIES),
          JSON.stringify(t),
          now
        );
      }
    }

    const mediaCount = db.prepare('SELECT COUNT(*) AS cnt FROM lew_media_assets').get();
    if (Number(mediaCount?.cnt || 0) === 0) {
      const insMedia = db.prepare(
        `INSERT INTO lew_media_assets
         (id, type, title, storage_key, url, mime_type, license_note, status, created_by, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'active', 'system-seed', ?)`
      );
      const sampleAssets = [
        {
          id: 'media-mascot-benny',
          type: 'image',
          title: 'Benny the Bear Mascot',
          storageKey: 'builtin:mascot/hello.webp',
          url: '/preschool/img/mascot/hello.webp',
          mimeType: 'image/webp',
          licenseNote: 'Project Built-in Vector/WebP Asset (Owned)',
        },
        {
          id: 'media-word-apple',
          type: 'image',
          title: 'Flashcard: Apple (Quả táo)',
          storageKey: 'builtin:words/apple.webp',
          url: '/preschool/img/words/apple.webp',
          mimeType: 'image/webp',
          licenseNote: 'Project Built-in Flashcard Illustration (Owned)',
        },
        {
          id: 'media-word-dog',
          type: 'image',
          title: 'Flashcard: Dog (Con chó)',
          storageKey: 'builtin:words/dog.webp',
          url: '/preschool/img/words/dog.webp',
          mimeType: 'image/webp',
          licenseNote: 'Project Built-in Flashcard Illustration (Owned)',
        },
        {
          id: 'media-song-animals',
          type: 'audio',
          title: 'Song MP3: Animal Friends Song',
          storageKey: 'builtin:audio/kids-songs/animals.mp3',
          url: '/audio/kids-songs/animals.mp3',
          mimeType: 'audio/mpeg',
          licenseNote: 'Synthesized Children Vocal Track (Royalty-free / Project Generated)',
        },
      ];
      for (const a of sampleAssets) {
        insMedia.run(a.id, a.type, a.title, a.storageKey, a.url, a.mimeType, a.licenseNote, now);
      }
    }

    writeAuditLog(
      'system',
      'admin',
      'seed',
      'curriculum',
      'lew-v1',
      `Khởi tạo dữ liệu chuẩn Little English World (5 nhóm tuổi, ${seed.topics?.length || 0} chủ đề)`
    );
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    console.error('Failed to seed LEW data:', err);
  }
}

ensureLewSeeded();

function rowToTopic(row) {
  const payload = parseJsonSafe(row.payload_json, {});
  const enabledActivities = {
    ...DEFAULT_ENABLED_ACTIVITIES,
    ...parseJsonSafe(row.enabled_activities_json, {}),
  };
  return {
    ...payload,
    id: row.id,
    code: row.code,
    order: Number(row.sort_order || payload.order || 1),
    titleEn: row.title_en || payload.titleEn,
    titleVi: row.title_vi || payload.titleVi,
    subtitleVi: row.subtitle_vi ?? payload.subtitleVi ?? '',
    status: row.status || 'published',
    version: Number(row.version || 1),
    estimatedMinutes: Number(row.estimated_minutes || 10),
    licenseNote: row.license_note || 'Internal SVG/WebP Illustration Library',
    enabledActivities,
    updatedBy: row.updated_by || 'admin',
    updatedAt: row.updated_at,
  };
}

export function getLewAgeLevelsMap() {
  ensureLewSeeded();
  const rows = db.prepare('SELECT * FROM lew_age_levels ORDER BY sort_order ASC').all();
  const map = {};
  for (const r of rows) {
    const meta = parseJsonSafe(r.meta_json, {});
    map[r.id] = {
      ...meta,
      id: r.id,
      code: r.code,
      name: r.name,
      ageRangeVi: r.age_range_vi,
      isParentLed: Boolean(r.is_parent_led),
      maxChoices: Number(r.max_choices || 3),
    };
  }
  return map;
}

export function listLewTopics({ includeUnpublished = false } = {}) {
  ensureLewSeeded();
  const sql = includeUnpublished
    ? 'SELECT * FROM lew_topics ORDER BY sort_order ASC, code ASC'
    : "SELECT * FROM lew_topics WHERE status = 'published' ORDER BY sort_order ASC, code ASC";
  return db.prepare(sql).all().map(rowToTopic);
}

export function getLewTopicById(topicId) {
  ensureLewSeeded();
  const row = db.prepare('SELECT * FROM lew_topics WHERE id = ?').get(topicId);
  return row ? rowToTopic(row) : null;
}

function rowToChild(r) {
  const prefs = parseJsonSafe(r.preferences_json, {});
  return {
    id: r.id,
    name: r.display_name,
    ageLevelId: VALID_LEVEL_IDS.has(r.age_level_id) ? r.age_level_id : 'level3',
    avatar: VALID_AVATARS.has(r.avatar_id) ? r.avatar_id : 'benny',
    birthMonth: r.birth_month ? Number(r.birth_month) : undefined,
    birthYear: r.birth_year ? Number(r.birth_year) : undefined,
    familyLanguage: r.family_language || 'Tiếng Việt',
    interests: parseJsonSafe(r.interests_json, []),
    skippedTopicIds: Array.isArray(prefs.skippedTopicIds) ? prefs.skippedTopicIds : [],
  };
}

/**
 * Ensures relational tables (lew_children, lew_child_progress, lew_observations)
 * are hydrated from legacy user_progress.preschool_progress.lew if the parent has
 * no rows in lew_children yet.
 */
export function ensureParentChildrenHydrated(emailRaw, displayName = 'Bé') {
  const email = String(emailRaw || '').trim().toLowerCase();
  const existingChildren = db
    .prepare('SELECT * FROM lew_children WHERE parent_email = ? ORDER BY created_at ASC')
    .all(email);

  if (existingChildren.length > 0) {
    return existingChildren.map(rowToChild);
  }

  const fullProg = loadFullProgress(email);
  const rawLew = fullProg?.preschool?.lew;
  const now = new Date().toISOString();

  const seedChildren =
    Array.isArray(rawLew?.children) && rawLew.children.length > 0
      ? rawLew.children
      : [
          {
            id: `child-${email.replace(/[^a-z0-9]/g, '')}-1`,
            name: displayName || 'Bin',
            ageLevelId: 'level3',
            avatar: 'benny',
          },
        ];

  db.exec('BEGIN');
  try {
    const insChild = db.prepare(
      `INSERT OR IGNORE INTO lew_children
       (id, parent_email, display_name, birth_month, birth_year, age_level_id, avatar_id, family_language, interests_json, preferences_json, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    for (const c of seedChildren) {
      const cid = String(c.id || `child-${Date.now()}`);
      insChild.run(
        cid,
        email,
        String(c.name || 'Bin').trim(),
        c.birthMonth ? Number(c.birthMonth) : null,
        c.birthYear ? Number(c.birthYear) : null,
        VALID_LEVEL_IDS.has(c.ageLevelId) ? c.ageLevelId : 'level3',
        VALID_AVATARS.has(c.avatar) ? c.avatar : 'benny',
        c.familyLanguage || 'Tiếng Việt',
        JSON.stringify(Array.isArray(c.interests) ? c.interests : []),
        JSON.stringify({ skippedTopicIds: Array.isArray(c.skippedTopicIds) ? c.skippedTopicIds : [] }),
        now,
        now
      );
    }

    // Migrate completedKeys into lew_child_progress
    if (rawLew?.completedKeys && typeof rawLew.completedKeys === 'object') {
      const insProg = db.prepare(
        `INSERT OR IGNORE INTO lew_child_progress
         (id, child_id, parent_email, topic_id, level_id, status, audio_replays, game_attempts, activities_tried_json, offline_done, started_at, completed_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 'completed', 2, 1, ?, 1, ?, ?, ?)`
      );
      for (const [childId, keys] of Object.entries(rawLew.completedKeys)) {
        if (!Array.isArray(keys)) continue;
        for (const key of keys) {
          const [topicId, levelId] = String(key).split(':');
          if (!topicId || !levelId) continue;
          const pid = `prog-${childId}-${topicId}-${levelId}`;
          insProg.run(
            pid,
            childId,
            email,
            topicId,
            levelId,
            JSON.stringify(['warmup', 'input', 'listening', 'game', 'parent', 'review']),
            now,
            now,
            now
          );
        }
      }
    }

    // Migrate observations
    if (Array.isArray(rawLew?.observations)) {
      const insObs = db.prepare(
        `INSERT OR IGNORE INTO lew_observations
         (id, child_id, parent_email, topic_id, level_id, observations_json, parent_note, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      );
      for (const o of rawLew.observations) {
        if (!o || !o.childId || !o.topicId) continue;
        insObs.run(
          String(o.id || `obs-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
          String(o.childId),
          email,
          String(o.topicId),
          VALID_LEVEL_IDS.has(o.levelId) ? o.levelId : 'level3',
          JSON.stringify(Array.isArray(o.observations) ? o.observations : ['recognized']),
          o.parentNote ? String(o.parentNote) : null,
          o.createdAt || now
        );
      }
    }

    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    console.error('Hydrate children error:', err);
  }

  return db
    .prepare('SELECT * FROM lew_children WHERE parent_email = ? ORDER BY created_at ASC')
    .all(email)
    .map(rowToChild);
}

export function buildFamilyBootstrap(emailRaw, displayName = 'Bé') {
  const email = String(emailRaw || '').trim().toLowerCase();
  const children = ensureParentChildrenHydrated(email, displayName);

  const progressRows = db
    .prepare('SELECT * FROM lew_child_progress WHERE parent_email = ? ORDER BY updated_at DESC')
    .all(email);

  const obsRows = db
    .prepare('SELECT * FROM lew_observations WHERE parent_email = ? ORDER BY created_at DESC')
    .all(email);

  const completedKeys = {};
  const stickersByChild = {};
  const lessonProgress = [];

  for (const c of children) {
    completedKeys[c.id] = [];
    stickersByChild[c.id] = [];
  }

  for (const p of progressRows) {
    lessonProgress.push({
      id: p.id,
      childId: p.child_id,
      topicId: p.topic_id,
      levelId: p.level_id,
      status: p.status,
      audioReplays: Number(p.audio_replays || 0),
      gameAttempts: Number(p.game_attempts || 0),
      activitiesTried: parseJsonSafe(p.activities_tried_json, []),
      offlineActivityDone: Boolean(p.offline_done),
      startedAt: p.started_at,
      completedAt: p.completed_at || undefined,
      updatedAt: p.updated_at,
    });

    if (p.status === 'completed') {
      if (!completedKeys[p.child_id]) completedKeys[p.child_id] = [];
      const key = `${p.topic_id}:${p.level_id}`;
      if (!completedKeys[p.child_id].includes(key)) {
        completedKeys[p.child_id].push(key);
      }
      if (!stickersByChild[p.child_id]) stickersByChild[p.child_id] = [];
      if (!stickersByChild[p.child_id].includes(p.topic_id)) {
        stickersByChild[p.child_id].push(p.topic_id);
      }
    }
  }

  const observations = obsRows.map((o) => ({
    id: o.id,
    childId: o.child_id,
    topicId: o.topic_id,
    levelId: o.level_id,
    observations: parseJsonSafe(o.observations_json, ['recognized']),
    parentNote: o.parent_note || undefined,
    createdAt: o.created_at,
  }));

  // Also sync back into user_progress.preschool_progress so legacy progress stays consistent
  const fullProg = loadFullProgress(email);
  const activeChildId =
    fullProg?.preschool?.lew?.activeChildId &&
    children.some((c) => c.id === fullProg.preschool.lew.activeChildId)
      ? fullProg.preschool.lew.activeChildId
      : children[0]?.id || 'child-1';

  return {
    ageLevels: getLewAgeLevelsMap(),
    topics: listLewTopics({ includeUnpublished: false }),
    children,
    activeChildId,
    completedKeys,
    stickersByChild,
    lessonProgress,
    observations,
  };
}

function syncRelationalToLegacyProgress(emailRaw, activeChildIdHint) {
  const email = String(emailRaw || '').trim().toLowerCase();
  const state = buildFamilyBootstrap(email);
  const fullProg = loadFullProgress(email);
  const allStickers = Array.from(new Set(Object.values(state.stickersByChild).flat()));
  const allCompleted = Array.from(new Set(Object.values(state.completedKeys).flat()));
  const activeChildId =
    activeChildIdHint && state.children.some((c) => c.id === activeChildIdHint)
      ? activeChildIdHint
      : state.activeChildId;

  fullProg.preschool = {
    completedLessonIds: allCompleted,
    stickers: allStickers,
    stars: allStickers.length * 3,
    lastLessonAt: new Date().toISOString(),
    lew: {
      children: state.children,
      activeChildId,
      completedKeys: state.completedKeys,
      stickersByChild: state.stickersByChild,
      observations: state.observations,
      lessonProgress: state.lessonProgress,
    },
  };
  saveFullProgress(email, fullProg);
  return state;
}

function validateTopicBeforePublish(topic) {
  const errors = [];
  if (!topic.code || !String(topic.code).trim()) errors.push('Thiếu mã chủ đề (code).');
  if (!topic.titleEn || !String(topic.titleEn).trim()) errors.push('Thiếu tên chủ đề tiếng Anh (titleEn).');
  if (!topic.titleVi || !String(topic.titleVi).trim()) errors.push('Thiếu tên chủ đề tiếng Việt (titleVi).');
  if (!Array.isArray(topic.words) || topic.words.length < 3) {
    errors.push('Chủ đề cần tối thiểu 3 từ vựng có hình ảnh và nghĩa tiếng Việt.');
  }
  if (!topic.parentGuide || !topic.parentGuide.offlineGameVi) {
    errors.push('Thiếu hướng dẫn phụ huynh hoặc hoạt động thực tế ngoài màn hình (parentGuide).');
  }
  return errors;
}

function canViewCms(role) {
  return role === 'admin' || role === 'editor' || role === 'viewer';
}

function canEditCms(role) {
  return role === 'admin' || role === 'editor';
}

function buildOpenApiSpec() {
  return {
    openapi: '3.0.3',
    info: {
      title: 'Little English World API',
      version: '1.0.0',
      description:
        'REST API cho ứng dụng học tiếng Anh đầu đời Little English World (1–6 tuổi), bao gồm Child App, Parent Zone và Admin CMS.',
    },
    servers: [{ url: '/api/v1', description: 'API v1 Server' }],
    paths: {
      '/bootstrap': {
        get: {
          summary: 'Tải toàn bộ dữ liệu khởi tạo cho gia đình (5 nhóm tuổi, chủ đề đã xuất bản, hồ sơ bé, tiến độ, ghi nhận)',
        },
      },
      '/age-levels': { get: { summary: 'Danh sách 5 nhóm tuổi và khung kỹ năng' } },
      '/curriculum': { get: { summary: 'Khung chương trình 5 cấp độ & kế hoạch 4 tuần/tháng' } },
      '/topics': { get: { summary: 'Danh sách chủ đề đã xuất bản (hỗ trợ phân trang page/limit)' } },
      '/lessons/{id}': { get: { summary: 'Chi tiết bài học theo chủ đề và nhóm tuổi' } },
      '/lessons/{id}/activities': { get: { summary: 'Danh sách hoạt động 6 bước của bài học' } },
      '/lessons/{id}/parent-guide': { get: { summary: 'Giáo án dành cho phụ huynh và hoạt động ngoài màn hình' } },
      '/children': {
        get: { summary: 'Danh sách hồ sơ các bé của phụ huynh hiện tại' },
        post: { summary: 'Tạo hồ sơ bé mới' },
      },
      '/children/{id}': {
        get: { summary: 'Chi tiết hồ sơ bé (kiểm tra quyền sở hữu parent_email)' },
        patch: { summary: 'Cập nhật hồ sơ bé (tên, nhóm tuổi, tháng/năm sinh, sở thích, avatar)' },
        delete: { summary: 'Xóa hồ sơ bé' },
      },
      '/children/{id}/progress': {
        get: { summary: 'Xem tiến độ học tập, số lần nghe audio, thử game và ghi nhận của bé' },
        post: { summary: 'Ghi nhận bắt đầu/hoàn thành/bỏ qua bài học, số lần nghe audio và quan sát của cha mẹ' },
      },
      '/admin/dashboard': { get: { summary: 'Số liệu tổng quan CMS, báo cáo nội dung phổ biến và nhật ký Audit Logs' } },
      '/admin/topics': {
        get: { summary: 'Danh sách toàn bộ chủ đề (Draft, Review, Published, Archived)' },
        post: { summary: 'Tạo chủ đề/bài học mới (Draft hoặc Published)' },
      },
      '/admin/topics/{id}': {
        put: { summary: 'Cập nhật nội dung chủ đề, từ vựng, truyện, trò chơi, giáo án phụ huynh (tăng version)' },
        delete: { summary: 'Lưu trữ (Archive) hoặc xóa chủ đề nháp chưa có học viên học' },
      },
      '/admin/topics/{id}/status': {
        patch: { summary: 'Chuyển trạng thái xuất bản: draft -> review -> published -> archived' },
      },
      '/admin/media': {
        get: { summary: 'Danh sách thư viện media (ảnh, audio, phiếu in) và thông tin bản quyền' },
        post: { summary: 'Tải lên hoặc đăng ký media mới kèm license_note' },
      },
      '/admin/users/{email}/role': {
        put: { summary: 'Phân quyền hệ thống CMS: admin, editor, viewer, user' },
      },
    },
  };
}

const MEDIA_MIME_BY_EXT = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.pdf': 'application/pdf',
};

export async function handleLewV1Request(req, res, pathname, parsedUrl, method, helpers) {
  const { sendJson, readJsonBody, extractToken } = helpers;

  // 1. Public OpenAPI Spec
  if (method === 'GET' && pathname === '/api/v1/openapi.json') {
    return sendJson(res, 200, buildOpenApiSpec());
  }

  // 2. Public uploaded media file streaming
  const mediaFileMatch = pathname.match(/^\/api\/v1\/media\/file\/([^/]+)$/);
  if ((method === 'GET' || method === 'HEAD') && mediaFileMatch) {
    const safeFile = path.basename(decodeURIComponent(mediaFileMatch[1]));
    const fp = path.join(LEW_MEDIA_DIR, safeFile);
    if (!fs.existsSync(fp) || !fs.statSync(fp).isFile()) {
      return sendJson(res, 404, { error: 'Không tìm thấy tệp media.' });
    }
    const ext = path.extname(fp).toLowerCase();
    const mime = MEDIA_MIME_BY_EXT[ext] || 'application/octet-stream';
    const stat = fs.statSync(fp);
    res.writeHead(200, {
      'Content-Type': mime,
      'Content-Length': stat.size,
      'Cache-Control': 'public, max-age=86400',
    });
    if (method === 'HEAD') return res.end();
    fs.createReadStream(fp).pipe(res);
    return true;
  }

  // 3. Public read-only curriculum endpoints
  if (method === 'GET' && pathname === '/api/v1/age-levels') {
    return sendJson(res, 200, { ageLevels: getLewAgeLevelsMap() });
  }

  if (method === 'GET' && pathname === '/api/v1/curriculum') {
    const topics = listLewTopics({ includeUnpublished: false });
    return sendJson(res, 200, {
      ageLevels: getLewAgeLevelsMap(),
      monthlyPlan: [
        { week: 1, titleVi: 'Tuần 1 – Làm quen', focusVi: 'Từ khóa và hình ảnh chủ đề lớn, nghe phát âm chuẩn.' },
        { week: 2, titleVi: 'Tuần 2 – Nhận biết', focusVi: 'Nghe, chọn hình, ghép cặp, tìm đồ vật quanh nhà.' },
        { week: 3, titleVi: 'Tuần 3 – Sử dụng', focusVi: 'Mẫu câu ngắn, hội thoại và hoạt động tương tác với cha mẹ.' },
        { week: 4, titleVi: 'Tuần 4 – Ôn tập & Ứng dụng', focusVi: 'Truyện tranh, trò chơi tổng hợp và hoạt động ngoài màn hình.' },
      ],
      totalTopics: topics.length,
      topics,
    });
  }

  if (method === 'GET' && pathname === '/api/v1/topics') {
    const allTopics = listLewTopics({ includeUnpublished: false });
    const page = Math.max(1, Number(parsedUrl.searchParams.get('page') || 1));
    const limit = Math.max(1, Math.min(100, Number(parsedUrl.searchParams.get('limit') || 50)));
    const start = (page - 1) * limit;
    return sendJson(res, 200, {
      page,
      limit,
      total: allTopics.length,
      topics: allTopics.slice(start, start + limit),
    });
  }

  const lessonMatch = pathname.match(/^\/api\/v1\/lessons\/([^/]+)$/);
  if (method === 'GET' && lessonMatch) {
    const topicId = decodeURIComponent(lessonMatch[1]);
    const topic = getLewTopicById(topicId);
    if (!topic) return sendJson(res, 404, { error: 'Không tìm thấy bài học.' });
    return sendJson(res, 200, { lesson: topic });
  }

  const lessonActMatch = pathname.match(/^\/api\/v1\/lessons\/([^/]+)\/activities$/);
  if (method === 'GET' && lessonActMatch) {
    const topicId = decodeURIComponent(lessonActMatch[1]);
    const topic = getLewTopicById(topicId);
    if (!topic) return sendJson(res, 404, { error: 'Không tìm thấy bài học.' });
    return sendJson(res, 200, {
      lessonId: topic.id,
      enabledActivities: topic.enabledActivities || DEFAULT_ENABLED_ACTIVITIES,
      steps: [
        { step: 1, type: 'warmup', titleVi: 'Chào hỏi / Khởi động', enabled: topic.enabledActivities?.warmup !== false },
        { step: 2, type: 'input', titleVi: 'Từ mới & Mẫu câu', enabled: topic.enabledActivities?.input !== false },
        { step: 3, type: 'listening', titleVi: 'Nghe hiểu & Chọn hình', enabled: topic.enabledActivities?.listening !== false },
        { step: 4, type: 'games', titleVi: 'Trò chơi tương tác', enabled: topic.enabledActivities?.games !== false },
        { step: 5, type: 'parent_story', titleVi: 'Cùng cha mẹ thực hành & Đọc truyện', enabled: topic.enabledActivities?.parentActivity !== false },
        { step: 6, type: 'review', titleVi: 'Ôn tập, Nhận Sticker & Ghi nhận', enabled: true },
      ],
    });
  }

  const parentGuideMatch = pathname.match(/^\/api\/v1\/lessons\/([^/]+)\/parent-guide$/);
  if (method === 'GET' && parentGuideMatch) {
    const topicId = decodeURIComponent(parentGuideMatch[1]);
    const topic = getLewTopicById(topicId);
    if (!topic) return sendJson(res, 404, { error: 'Không tìm thấy giáo án cho bài học này.' });
    return sendJson(res, 200, {
      lessonId: topic.id,
      titleEn: topic.titleEn,
      titleVi: topic.titleVi,
      parentGuide: topic.parentGuide,
      levels: topic.levels,
    });
  }

  // 4. Authenticated family & CMS routes
  const token = extractToken(req);
  const currentUser = getUserBySessionToken(token);
  if (!currentUser) {
    return sendJson(res, 401, { error: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.' });
  }

  // GET /api/v1/bootstrap
  if (method === 'GET' && pathname === '/api/v1/bootstrap') {
    const data = buildFamilyBootstrap(currentUser.email, currentUser.displayName);
    return sendJson(res, 200, data);
  }

  // CHILDREN CRUD (/api/v1/children)
  if (method === 'GET' && pathname === '/api/v1/children') {
    const children = ensureParentChildrenHydrated(currentUser.email, currentUser.displayName);
    return sendJson(res, 200, { children });
  }

  if (method === 'POST' && pathname === '/api/v1/children') {
    const body = await readJsonBody(req);
    const name = String(body.name || body.displayName || '').trim();
    if (!name) {
      return sendJson(res, 400, { error: 'Vui lòng nhập tên hiển thị của bé.' });
    }
    const ageLevelId = VALID_LEVEL_IDS.has(body.ageLevelId) ? body.ageLevelId : 'level3';
    const avatar = VALID_AVATARS.has(body.avatar) ? body.avatar : 'benny';
    const birthMonth = body.birthMonth ? Math.min(12, Math.max(1, Number(body.birthMonth))) : null;
    const birthYear = body.birthYear ? Number(body.birthYear) : null;
    const familyLanguage = String(body.familyLanguage || 'Tiếng Việt').trim();
    const interests = Array.isArray(body.interests)
      ? body.interests.map((x) => String(x).trim()).filter(Boolean)
      : [];

    ensureParentChildrenHydrated(currentUser.email, currentUser.displayName);
    const id = `child-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const now = new Date().toISOString();

    db.prepare(
      `INSERT INTO lew_children
       (id, parent_email, display_name, birth_month, birth_year, age_level_id, avatar_id, family_language, interests_json, preferences_json, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, '{}', ?, ?)`
    ).run(
      id,
      currentUser.email,
      name,
      birthMonth,
      birthYear,
      ageLevelId,
      avatar,
      familyLanguage,
      JSON.stringify(interests),
      now,
      now
    );

    const state = syncRelationalToLegacyProgress(currentUser.email, id);
    const created = state.children.find((c) => c.id === id);
    return sendJson(res, 201, { child: created, children: state.children, activeChildId: id });
  }

  const childIdMatch = pathname.match(/^\/api\/v1\/children\/([^/]+)$/);
  if (childIdMatch) {
    const childId = decodeURIComponent(childIdMatch[1]);
    ensureParentChildrenHydrated(currentUser.email, currentUser.displayName);
    const row = db.prepare('SELECT * FROM lew_children WHERE id = ?').get(childId);
    if (!row) {
      return sendJson(res, 404, { error: 'Không tìm thấy hồ sơ bé.' });
    }
    // Strict family isolation check (Section 12)
    if (row.parent_email !== currentUser.email && currentUser.role !== 'admin') {
      return sendJson(res, 403, { error: 'Bạn không có quyền truy cập hồ sơ bé của gia đình khác.' });
    }

    if (method === 'GET') {
      return sendJson(res, 200, { child: rowToChild(row) });
    }

    if (method === 'PATCH' || method === 'PUT') {
      const body = await readJsonBody(req);
      const nextName = body.name !== undefined ? String(body.name).trim() : row.display_name;
      if (!nextName) {
        return sendJson(res, 400, { error: 'Tên hiển thị của bé không được để trống.' });
      }
      const nextLevel = VALID_LEVEL_IDS.has(body.ageLevelId) ? body.ageLevelId : row.age_level_id;
      const nextAvatar = VALID_AVATARS.has(body.avatar) ? body.avatar : row.avatar_id;
      const nextMonth =
        body.birthMonth !== undefined
          ? body.birthMonth
            ? Math.min(12, Math.max(1, Number(body.birthMonth)))
            : null
          : row.birth_month;
      const nextYear =
        body.birthYear !== undefined
          ? body.birthYear
            ? Number(body.birthYear)
            : null
          : row.birth_year;
      const nextLang =
        body.familyLanguage !== undefined
          ? String(body.familyLanguage || 'Tiếng Việt').trim()
          : row.family_language;
      const nextInterests =
        Array.isArray(body.interests)
          ? body.interests.map((x) => String(x).trim()).filter(Boolean)
          : parseJsonSafe(row.interests_json, []);
      const prevPrefs = parseJsonSafe(row.preferences_json, {});
      const nextSkipped =
        Array.isArray(body.skippedTopicIds)
          ? body.skippedTopicIds.map(String)
          : Array.isArray(prevPrefs.skippedTopicIds)
          ? prevPrefs.skippedTopicIds
          : [];

      const now = new Date().toISOString();
      db.prepare(
        `UPDATE lew_children SET
           display_name = ?, birth_month = ?, birth_year = ?, age_level_id = ?, avatar_id = ?,
           family_language = ?, interests_json = ?, preferences_json = ?, updated_at = ?
         WHERE id = ?`
      ).run(
        nextName,
        nextMonth,
        nextYear,
        nextLevel,
        nextAvatar,
        nextLang,
        JSON.stringify(nextInterests),
        JSON.stringify({ ...prevPrefs, skippedTopicIds: nextSkipped }),
        now,
        childId
      );

      const state = syncRelationalToLegacyProgress(row.parent_email, childId);
      const updated = state.children.find((c) => c.id === childId);
      return sendJson(res, 200, { child: updated, children: state.children });
    }

    if (method === 'DELETE') {
      const allForParent = db
        .prepare('SELECT id FROM lew_children WHERE parent_email = ?')
        .all(row.parent_email);
      if (allForParent.length <= 1) {
        return sendJson(res, 400, {
          error: 'Gia đình cần giữ lại ít nhất 1 hồ sơ bé.',
        });
      }
      db.prepare('DELETE FROM lew_children WHERE id = ?').run(childId);
      const state = syncRelationalToLegacyProgress(row.parent_email);
      return sendJson(res, 200, { ok: true, children: state.children, activeChildId: state.activeChildId });
    }
  }

  // CHILD PROGRESS & OBSERVATIONS (/api/v1/children/:id/progress)
  const childProgMatch = pathname.match(/^\/api\/v1\/children\/([^/]+)\/progress$/);
  if (childProgMatch) {
    const childId = decodeURIComponent(childProgMatch[1]);
    ensureParentChildrenHydrated(currentUser.email, currentUser.displayName);
    const childRow = db.prepare('SELECT * FROM lew_children WHERE id = ?').get(childId);
    if (!childRow) {
      return sendJson(res, 404, { error: 'Không tìm thấy hồ sơ bé.' });
    }
    if (childRow.parent_email !== currentUser.email && currentUser.role !== 'admin') {
      return sendJson(res, 403, { error: 'Bạn không có quyền truy cập dữ liệu của gia đình khác.' });
    }

    if (method === 'GET') {
      const state = buildFamilyBootstrap(childRow.parent_email);
      return sendJson(res, 200, {
        childId,
        completedKeys: state.completedKeys[childId] || [],
        stickers: state.stickersByChild[childId] || [],
        lessonProgress: state.lessonProgress.filter((p) => p.childId === childId),
        observations: state.observations.filter((o) => o.childId === childId),
      });
    }

    if (method === 'POST') {
      const body = await readJsonBody(req);
      const topicId = String(body.topicId || '').trim();
      if (!topicId) {
        return sendJson(res, 400, { error: 'Thiếu mã bài học/chủ đề (topicId).' });
      }
      const levelId = VALID_LEVEL_IDS.has(body.levelId) ? body.levelId : childRow.age_level_id;
      const status = ['started', 'completed', 'skipped'].includes(body.status)
        ? body.status
        : 'completed';
      const addReplays = Math.max(0, Number(body.audioReplays || 0));
      const addAttempts = Math.max(0, Number(body.gameAttempts || 0));
      const incomingActivities = Array.isArray(body.activitiesTried)
        ? body.activitiesTried.map(String)
        : [];
      const offlineDone = Boolean(body.offlineActivityDone);
      const now = new Date().toISOString();

      const progId = `prog-${childId}-${topicId}-${levelId}`;
      const existingProg = db.prepare('SELECT * FROM lew_child_progress WHERE id = ?').get(progId);

      if (!existingProg) {
        db.prepare(
          `INSERT INTO lew_child_progress
           (id, child_id, parent_email, topic_id, level_id, status, audio_replays, game_attempts, activities_tried_json, offline_done, started_at, completed_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).run(
          progId,
          childId,
          childRow.parent_email,
          topicId,
          levelId,
          status,
          addReplays,
          addAttempts,
          JSON.stringify(incomingActivities),
          offlineDone ? 1 : 0,
          now,
          status === 'completed' ? now : null,
          now
        );
      } else {
        const prevActivities = parseJsonSafe(existingProg.activities_tried_json, []);
        const mergedActivities = Array.from(new Set([...prevActivities, ...incomingActivities]));
        // Never downgrade 'completed' to 'started' or 'skipped'
        const finalStatus =
          existingProg.status === 'completed' ? 'completed' : status;
        const completedAt =
          finalStatus === 'completed'
            ? existingProg.completed_at || now
            : existingProg.completed_at;

        db.prepare(
          `UPDATE lew_child_progress SET
             status = ?,
             audio_replays = audio_replays + ?,
             game_attempts = game_attempts + ?,
             activities_tried_json = ?,
             offline_done = CASE WHEN ? = 1 THEN 1 ELSE offline_done END,
             completed_at = ?,
             updated_at = ?
           WHERE id = ?`
        ).run(
          finalStatus,
          addReplays,
          addAttempts,
          JSON.stringify(mergedActivities),
          offlineDone ? 1 : 0,
          completedAt,
          now,
          progId
        );
      }

      // Record parent observation if provided
      if (Array.isArray(body.observations) && body.observations.length > 0) {
        const cleanObs = body.observations.filter((c) => VALID_OBS_CODES.has(c));
        const obsList = cleanObs.length > 0 ? cleanObs : ['recognized'];
        const obsId = `obs-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        db.prepare(
          `INSERT INTO lew_observations
           (id, child_id, parent_email, topic_id, level_id, observations_json, parent_note, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        ).run(
          obsId,
          childId,
          childRow.parent_email,
          topicId,
          levelId,
          JSON.stringify(obsList),
          body.parentNote ? String(body.parentNote).trim() : null,
          now
        );
      }

      const state = syncRelationalToLegacyProgress(childRow.parent_email, childId);
      return sendJson(res, 200, {
        ok: true,
        completedKeys: state.completedKeys,
        stickersByChild: state.stickersByChild,
        lessonProgress: state.lessonProgress,
        observations: state.observations,
      });
    }
  }

  // 5. ADMIN CMS ROUTES (/api/v1/admin/*)
  if (pathname.startsWith('/api/v1/admin/')) {
    if (!canViewCms(currentUser.role)) {
      return sendJson(res, 403, {
        error: 'Chỉ Quản trị viên (Admin), Biên tập viên (Editor) hoặc Kiểm duyệt (Viewer) mới được truy cập CMS.',
      });
    }

    if (method === 'GET' && pathname === '/api/v1/admin/dashboard') {
      const allTopics = listLewTopics({ includeUnpublished: true });
      const topicsByStatus = { draft: 0, review: 0, published: 0, archived: 0 };
      let totalVocabWords = 0;
      let totalStories = 0;

      for (const t of allTopics) {
        const st = VALID_STATUSES.has(t.status) ? t.status : 'published';
        topicsByStatus[st] = (topicsByStatus[st] || 0) + 1;
        totalVocabWords += Array.isArray(t.words) ? t.words.length : 0;
        if (t.levels?.level5?.storyPages?.length) totalStories += 1;
      }

      const totalParents = Number(
        db.prepare('SELECT COUNT(*) AS cnt FROM users').get()?.cnt || 0
      );
      const totalChildren = Number(
        db.prepare('SELECT COUNT(*) AS cnt FROM lew_children').get()?.cnt || 0
      );
      const totalMediaAssets = Number(
        db.prepare("SELECT COUNT(*) AS cnt FROM lew_media_assets WHERE status = 'active'").get()?.cnt || 0
      );
      const totalCompletedLessons = Number(
        db.prepare("SELECT COUNT(*) AS cnt FROM lew_child_progress WHERE status = 'completed'").get()?.cnt || 0
      );
      const totalObservations = Number(
        db.prepare('SELECT COUNT(*) AS cnt FROM lew_observations').get()?.cnt || 0
      );

      const popRows = db
        .prepare(
          `SELECT topic_id, COUNT(*) AS cnt
           FROM lew_child_progress
           GROUP BY topic_id
           ORDER BY cnt DESC
           LIMIT 6`
        )
        .all();

      const popularTopics = popRows.map((r) => {
        const found = allTopics.find((t) => t.id === r.topic_id);
        return {
          topicId: r.topic_id,
          titleEn: found?.titleEn || r.topic_id,
          titleVi: found?.titleVi || '',
          count: Number(r.cnt || 0),
        };
      });

      const mediaAssets = db
        .prepare('SELECT * FROM lew_media_assets ORDER BY created_at DESC')
        .all()
        .map((m) => ({
          id: m.id,
          type: m.type,
          title: m.title,
          storageKey: m.storage_key,
          url: m.url,
          mimeType: m.mime_type,
          licenseNote: m.license_note,
          status: m.status,
          createdBy: m.created_by,
          createdAt: m.created_at,
        }));

      const auditLogs = db
        .prepare('SELECT * FROM lew_audit_logs ORDER BY created_at DESC LIMIT 60')
        .all()
        .map((a) => ({
          id: a.id,
          actorEmail: a.actor_email,
          actorRole: a.actor_role,
          action: a.action,
          entityType: a.entity_type,
          entityId: a.entity_id,
          summary: a.summary,
          createdAt: a.created_at,
        }));

      return sendJson(res, 200, {
        stats: {
          totalParents,
          totalChildren,
          topicsByStatus,
          totalVocabWords,
          totalStories,
          totalMediaAssets,
          totalCompletedLessons,
          totalObservations,
          popularTopics,
        },
        ageLevels: getLewAgeLevelsMap(),
        topics: allTopics,
        mediaAssets,
        auditLogs,
        users: listAllUsersAdmin(),
      });
    }

    if (method === 'GET' && pathname === '/api/v1/admin/topics') {
      return sendJson(res, 200, { topics: listLewTopics({ includeUnpublished: true }) });
    }

    // Update Age Level configuration
    const ageLevelAdminMatch = pathname.match(/^\/api\/v1\/admin\/age-levels\/([^/]+)$/);
    if (method === 'PUT' && ageLevelAdminMatch) {
      if (!canEditCms(currentUser.role)) {
        return sendJson(res, 403, { error: 'Quyền Viewer chỉ được xem, không được chỉnh sửa nhóm tuổi.' });
      }
      const levelId = decodeURIComponent(ageLevelAdminMatch[1]);
      if (!VALID_LEVEL_IDS.has(levelId)) {
        return sendJson(res, 400, { error: 'Mã nhóm tuổi không hợp lệ.' });
      }
      const body = await readJsonBody(req);
      const currentMap = getLewAgeLevelsMap();
      const existing = currentMap[levelId] || {};
      const nextMeta = {
        ...existing,
        ...body,
        id: levelId,
        maxChoices: [2, 3, 4].includes(Number(body.maxChoices))
          ? Number(body.maxChoices)
          : existing.maxChoices || 3,
        isParentLed: body.isParentLed !== undefined ? Boolean(body.isParentLed) : Boolean(existing.isParentLed),
      };
      const now = new Date().toISOString();
      db.prepare(
        `UPDATE lew_age_levels SET
           name = ?, age_range_vi = ?, is_parent_led = ?, max_choices = ?, meta_json = ?, updated_at = ?
         WHERE id = ?`
      ).run(
        String(nextMeta.name || existing.name),
        String(nextMeta.ageRangeVi || existing.ageRangeVi),
        nextMeta.isParentLed ? 1 : 0,
        nextMeta.maxChoices,
        JSON.stringify(nextMeta),
        now,
        levelId
      );

      writeAuditLog(
        currentUser.email,
        currentUser.role,
        'update',
        'age_level',
        levelId,
        `Cập nhật cấu hình nhóm tuổi ${nextMeta.code} (${nextMeta.name})`
      );
      return sendJson(res, 200, { ageLevels: getLewAgeLevelsMap() });
    }

    // Create new Topic / Lesson
    if (method === 'POST' && pathname === '/api/v1/admin/topics') {
      if (!canEditCms(currentUser.role)) {
        return sendJson(res, 403, { error: 'Quyền Viewer không được phép tạo chủ đề mới.' });
      }
      const body = await readJsonBody(req);
      const allTopics = listLewTopics({ includeUnpublished: true });
      const nextOrder = Number(body.order || allTopics.length + 1);
      const code = String(body.code || String(nextOrder).padStart(2, '0')).trim();
      const titleEn = String(body.titleEn || '').trim();
      const titleVi = String(body.titleVi || '').trim();
      if (!titleEn || !titleVi) {
        return sendJson(res, 400, { error: 'Vui lòng nhập đầy đủ Tên tiếng Anh và Tên tiếng Việt cho chủ đề.' });
      }

      const id =
        String(body.id || '').trim() ||
        `topic-${code}-${titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`;

      const status = VALID_STATUSES.has(body.status) ? body.status : 'draft';
      const templateTopic = allTopics[0];
      const words = Array.isArray(body.words) && body.words.length > 0 ? body.words : templateTopic.words.slice(0, 4);
      const parentGuide = body.parentGuide || templateTopic.parentGuide;
      const levels = body.levels || templateTopic.levels;
      const enabledActivities = {
        ...DEFAULT_ENABLED_ACTIVITIES,
        ...(body.enabledActivities || {}),
      };

      const fullTopic = {
        id,
        code,
        order: nextOrder,
        titleEn,
        titleVi,
        subtitleVi: String(body.subtitleVi || titleVi).trim(),
        color: String(body.color || '#F59E0B'),
        softBg: String(body.softBg || '#FFFBEB'),
        coverSlug: String(body.coverSlug || 'ex-u1'),
        words,
        levels,
        parentGuide,
      };

      if (status === 'published') {
        const errs = validateTopicBeforePublish(fullTopic);
        if (errs.length > 0) {
          return sendJson(res, 400, { error: errs.join(' ') });
        }
      }

      const now = new Date().toISOString();
      db.prepare(
        `INSERT INTO lew_topics
         (id, code, sort_order, title_en, title_vi, subtitle_vi, status, version, estimated_minutes, license_note, enabled_activities_json, payload_json, updated_by, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?)`
      ).run(
        id,
        code,
        nextOrder,
        titleEn,
        titleVi,
        fullTopic.subtitleVi,
        status,
        Number(body.estimatedMinutes || 10),
        String(body.licenseNote || 'Internal SVG/WebP Illustration Library (Owned)'),
        JSON.stringify(enabledActivities),
        JSON.stringify(fullTopic),
        currentUser.email,
        now
      );

      writeAuditLog(
        currentUser.email,
        currentUser.role,
        'create',
        'topic',
        id,
        `Tạo chủ đề mới "${code}. ${titleEn} (${titleVi})" ở trạng thái [${status.toUpperCase()}]`
      );

      return sendJson(res, 201, { topic: getLewTopicById(id) });
    }

    // Update Topic status (Draft -> Review -> Published -> Archived)
    const topicStatusMatch = pathname.match(/^\/api\/v1\/admin\/topics\/([^/]+)\/status$/);
    if (method === 'PATCH' && topicStatusMatch) {
      if (!canEditCms(currentUser.role)) {
        return sendJson(res, 403, { error: 'Quyền Viewer không được phép thay đổi trạng thái xuất bản.' });
      }
      const topicId = decodeURIComponent(topicStatusMatch[1]);
      const existing = getLewTopicById(topicId);
      if (!existing) {
        return sendJson(res, 404, { error: 'Không tìm thấy chủ đề.' });
      }
      const body = await readJsonBody(req);
      const nextStatus = String(body.status || '').trim();
      if (!VALID_STATUSES.has(nextStatus)) {
        return sendJson(res, 400, { error: 'Trạng thái không hợp lệ (draft | review | published | archived).' });
      }
      if (nextStatus === 'published') {
        const errs = validateTopicBeforePublish(existing);
        if (errs.length > 0) {
          return sendJson(res, 400, { error: `Chưa đủ điều kiện xuất bản: ${errs.join(' ')}` });
        }
      }
      const now = new Date().toISOString();
      db.prepare(
        'UPDATE lew_topics SET status = ?, version = version + 1, updated_by = ?, updated_at = ? WHERE id = ?'
      ).run(nextStatus, currentUser.email, now, topicId);

      writeAuditLog(
        currentUser.email,
        currentUser.role,
        `status:${nextStatus}`,
        'topic',
        topicId,
        `Chuyển trạng thái chủ đề "${existing.code}. ${existing.titleEn}" từ [${existing.status}] sang [${nextStatus}]`
      );
      return sendJson(res, 200, { topic: getLewTopicById(topicId) });
    }

    // Update or Archive/Delete Topic
    const topicAdminMatch = pathname.match(/^\/api\/v1\/admin\/topics\/([^/]+)$/);
    if (topicAdminMatch) {
      const topicId = decodeURIComponent(topicAdminMatch[1]);
      const existing = getLewTopicById(topicId);
      if (!existing) {
        return sendJson(res, 404, { error: 'Không tìm thấy chủ đề.' });
      }

      if (method === 'PUT' || method === 'PATCH') {
        if (!canEditCms(currentUser.role)) {
          return sendJson(res, 403, { error: 'Quyền Viewer không được phép sửa nội dung.' });
        }
        const body = await readJsonBody(req);
        const nextStatus = VALID_STATUSES.has(body.status) ? body.status : existing.status || 'published';
        const merged = {
          ...existing,
          ...body,
          id: topicId,
          code: String(body.code ?? existing.code).trim(),
          order: Number(body.order ?? existing.order ?? 1),
          titleEn: String(body.titleEn ?? existing.titleEn).trim(),
          titleVi: String(body.titleVi ?? existing.titleVi).trim(),
          subtitleVi: String(body.subtitleVi ?? existing.subtitleVi ?? '').trim(),
          words: Array.isArray(body.words) ? body.words : existing.words,
          levels: body.levels && typeof body.levels === 'object' ? body.levels : existing.levels,
          parentGuide:
            body.parentGuide && typeof body.parentGuide === 'object'
              ? body.parentGuide
              : existing.parentGuide,
        };

        if (nextStatus === 'published') {
          const errs = validateTopicBeforePublish(merged);
          if (errs.length > 0) {
            return sendJson(res, 400, { error: errs.join(' ') });
          }
        }

        const enabledActivities = {
          ...DEFAULT_ENABLED_ACTIVITIES,
          ...(existing.enabledActivities || {}),
          ...(body.enabledActivities || {}),
        };
        const now = new Date().toISOString();

        db.prepare(
          `UPDATE lew_topics SET
             code = ?, sort_order = ?, title_en = ?, title_vi = ?, subtitle_vi = ?,
             status = ?, version = version + 1, estimated_minutes = ?, license_note = ?,
             enabled_activities_json = ?, payload_json = ?, updated_by = ?, updated_at = ?
           WHERE id = ?`
        ).run(
          merged.code,
          merged.order,
          merged.titleEn,
          merged.titleVi,
          merged.subtitleVi,
          nextStatus,
          Number(body.estimatedMinutes ?? existing.estimatedMinutes ?? 10),
          String(body.licenseNote ?? existing.licenseNote ?? 'Internal Illustration Library'),
          JSON.stringify(enabledActivities),
          JSON.stringify(merged),
          currentUser.email,
          now,
          topicId
        );

        writeAuditLog(
          currentUser.email,
          currentUser.role,
          'update',
          'topic',
          topicId,
          `Cập nhật nội dung chủ đề "${merged.code}. ${merged.titleEn}" (v${(existing.version || 1) + 1})`
        );

        return sendJson(res, 200, { topic: getLewTopicById(topicId) });
      }

      if (method === 'DELETE') {
        if (currentUser.role !== 'admin') {
          return sendJson(res, 403, { error: 'Chỉ Admin mới có quyền xóa hoặc lưu trữ chủ đề.' });
        }
        // Check if any child has progress or observations on this topic (Section 9: no hard-delete if in use)
        const inUseProg = db
          .prepare('SELECT COUNT(*) AS cnt FROM lew_child_progress WHERE topic_id = ?')
          .get(topicId);
        const inUseObs = db
          .prepare('SELECT COUNT(*) AS cnt FROM lew_observations WHERE topic_id = ?')
          .get(topicId);
        const isUsed = Number(inUseProg?.cnt || 0) > 0 || Number(inUseObs?.cnt || 0) > 0;

        if (isUsed || existing.status === 'published') {
          const now = new Date().toISOString();
          db.prepare(
            "UPDATE lew_topics SET status = 'archived', version = version + 1, updated_by = ?, updated_at = ? WHERE id = ?"
          ).run(currentUser.email, now, topicId);
          writeAuditLog(
            currentUser.email,
            currentUser.role,
            'archive',
            'topic',
            topicId,
            `Lưu trữ (Archive) chủ đề "${existing.code}. ${existing.titleEn}" để bảo toàn dữ liệu học tập`
          );
          return sendJson(res, 200, {
            ok: true,
            archived: true,
            topic: getLewTopicById(topicId),
          });
        }

        db.prepare('DELETE FROM lew_topics WHERE id = ?').run(topicId);
        writeAuditLog(
          currentUser.email,
          currentUser.role,
          'delete',
          'topic',
          topicId,
          `Xóa bản nháp chủ đề "${existing.code}. ${existing.titleEn}"`
        );
        return sendJson(res, 200, { ok: true, deleted: true });
      }
    }

    // MEDIA LIBRARY (/api/v1/admin/media)
    if (method === 'GET' && pathname === '/api/v1/admin/media') {
      const assets = db
        .prepare('SELECT * FROM lew_media_assets ORDER BY created_at DESC')
        .all()
        .map((m) => ({
          id: m.id,
          type: m.type,
          title: m.title,
          storageKey: m.storage_key,
          url: m.url,
          mimeType: m.mime_type,
          licenseNote: m.license_note,
          status: m.status,
          createdBy: m.created_by,
          createdAt: m.created_at,
        }));
      return sendJson(res, 200, { mediaAssets: assets });
    }

    if (method === 'POST' && pathname === '/api/v1/admin/media') {
      if (!canEditCms(currentUser.role)) {
        return sendJson(res, 403, { error: 'Quyền Viewer không được phép tải lên media.' });
      }
      const body = await readJsonBody(req);
      const title = String(body.title || '').trim();
      const licenseNote = String(body.licenseNote || '').trim();
      if (!title || !licenseNote) {
        return sendJson(res, 400, {
          error: 'Vui lòng nhập Tên media và Thông tin bản quyền / nguồn cấp phép (licenseNote).',
        });
      }
      const type = ['image', 'audio', 'printable'].includes(body.type) ? body.type : 'image';
      const id = `media-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const now = new Date().toISOString();

      let url = String(body.url || '').trim();
      let storageKey = `external:${url}`;
      let mimeType = String(body.mimeType || (type === 'audio' ? 'audio/mpeg' : 'image/webp'));

      if (body.base64Data) {
        const cleanB64 = String(body.base64Data).replace(/^data:[^;]+;base64,/, '');
        const buf = Buffer.from(cleanB64, 'base64');
        if (!buf.length || buf.length > 8 * 1024 * 1024) {
          return sendJson(res, 400, { error: 'Tệp tải lên trống hoặc vượt quá 8MB.' });
        }
        const rawExt = path.extname(String(body.fileName || '')).toLowerCase();
        const ext = MEDIA_MIME_BY_EXT[rawExt]
          ? rawExt
          : type === 'audio'
          ? '.mp3'
          : '.webp';
        const fileKey = `${id}${ext}`;
        fs.writeFileSync(path.join(LEW_MEDIA_DIR, fileKey), buf);
        storageKey = `local:${fileKey}`;
        url = `/api/v1/media/file/${fileKey}`;
        mimeType = MEDIA_MIME_BY_EXT[ext] || mimeType;
      } else if (!url) {
        return sendJson(res, 400, { error: 'Vui lòng chọn tệp tải lên hoặc nhập đường dẫn URL media.' });
      }

      db.prepare(
        `INSERT INTO lew_media_assets
         (id, type, title, storage_key, url, mime_type, license_note, status, created_by, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'active', ?, ?)`
      ).run(id, type, title, storageKey, url, mimeType, licenseNote, currentUser.email, now);

      writeAuditLog(
        currentUser.email,
        currentUser.role,
        'upload_media',
        'media',
        id,
        `Thêm media "${title}" (${type}) · Bản quyền: ${licenseNote}`
      );

      return sendJson(res, 201, {
        mediaAsset: {
          id,
          type,
          title,
          storageKey,
          url,
          mimeType,
          licenseNote,
          status: 'active',
          createdBy: currentUser.email,
          createdAt: now,
        },
      });
    }

    const mediaDelMatch = pathname.match(/^\/api\/v1\/admin\/media\/([^/]+)$/);
    if (method === 'DELETE' && mediaDelMatch) {
      if (!canEditCms(currentUser.role)) {
        return sendJson(res, 403, { error: 'Quyền Viewer không được phép lưu trữ media.' });
      }
      const mediaId = decodeURIComponent(mediaDelMatch[1]);
      db.prepare("UPDATE lew_media_assets SET status = 'archived' WHERE id = ?").run(mediaId);
      writeAuditLog(
        currentUser.email,
        currentUser.role,
        'archive_media',
        'media',
        mediaId,
        `Lưu trữ media [${mediaId}]`
      );
      return sendJson(res, 200, { ok: true });
    }

    // USER ROLE MANAGEMENT (/api/v1/admin/users/:email/role)
    const userRoleMatch = pathname.match(/^\/api\/v1\/admin\/users\/([^/]+)\/role$/);
    if (method === 'PUT' && userRoleMatch) {
      if (currentUser.role !== 'admin') {
        return sendJson(res, 403, { error: 'Chỉ Admin mới có quyền phân quyền tài khoản.' });
      }
      const targetEmail = decodeURIComponent(userRoleMatch[1]).toLowerCase();
      if (targetEmail === DEV_EMAIL) {
        return sendJson(res, 400, { error: 'Không thể thay đổi quyền của tài khoản Admin gốc.' });
      }
      const body = await readJsonBody(req);
      const nextRole = String(body.role || '').trim();
      if (!VALID_CMS_ROLES.has(nextRole)) {
        return sendJson(res, 400, { error: 'Vai trò không hợp lệ (admin | editor | viewer | user).' });
      }
      const exists = db.prepare('SELECT email FROM users WHERE email = ?').get(targetEmail);
      if (!exists) {
        return sendJson(res, 404, { error: 'Không tìm thấy tài khoản.' });
      }
      db.prepare('UPDATE users SET role = ? WHERE email = ?').run(nextRole, targetEmail);
      writeAuditLog(
        currentUser.email,
        currentUser.role,
        'change_role',
        'user',
        targetEmail,
        `Phân quyền tài khoản "${targetEmail}" thành [${nextRole.toUpperCase()}]`
      );
      return sendJson(res, 200, { ok: true, email: targetEmail, role: nextRole });
    }

    if (method === 'GET' && pathname === '/api/v1/admin/audit-logs') {
      const logs = db
        .prepare('SELECT * FROM lew_audit_logs ORDER BY created_at DESC LIMIT 100')
        .all()
        .map((a) => ({
          id: a.id,
          actorEmail: a.actor_email,
          actorRole: a.actor_role,
          action: a.action,
          entityType: a.entity_type,
          entityId: a.entity_id,
          summary: a.summary,
          createdAt: a.created_at,
        }));
      return sendJson(res, 200, { auditLogs: logs });
    }
  }

  return sendJson(res, 404, { error: `Không tìm thấy API endpoint: ${method} ${pathname}` });
}
