import assert from 'node:assert/strict';
import http from 'node:http';
import { createSession, db, DEV_EMAIL, hashPassword } from '../server/db.mjs';
import { handleLewV1Request } from '../server/lewApi.mjs';

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      resolve(raw ? JSON.parse(raw) : {});
    });
    req.on('error', reject);
  });
}

function extractToken(req) {
  const auth = req.headers['authorization'] || '';
  return auth.toLowerCase().startsWith('bearer ') ? auth.slice(7).trim() : '';
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url || '/', 'http://localhost');
  await handleLewV1Request(req, res, parsedUrl.pathname, parsedUrl, req.method || 'GET', {
    sendJson,
    readJsonBody,
    extractToken,
  });
});

async function callApi(baseUrl, path, { method = 'GET', token = '', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

async function runTests() {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const addr = server.address();
  const baseUrl = `http://127.0.0.1:${addr.port}`;

  const parentAEmail = 'test_lew_parent_a@gmail.com';
  const parentBEmail = 'test_lew_parent_b@gmail.com';
  let createdTopicId = '';
  let createdMediaId = '';

  try {
    console.log('1. Testing GET /api/v1/openapi.json & /api/v1/curriculum...');
    const openApiRes = await callApi(baseUrl, '/api/v1/openapi.json');
    assert.equal(openApiRes.status, 200);
    assert.equal(openApiRes.data.openapi, '3.0.3');

    const currRes = await callApi(baseUrl, '/api/v1/curriculum');
    assert.equal(currRes.status, 200);
    assert.equal(Object.keys(currRes.data.ageLevels).length, 5);
    assert.equal(currRes.data.monthlyPlan.length, 4);
    assert.ok(currRes.data.topics.length >= 12, 'Must have at least 12 core topics');

    console.log('2. Creating two Parent accounts & Admin session...');
    const now = new Date().toISOString();
    db.prepare('DELETE FROM users WHERE email IN (?, ?)').run(parentAEmail, parentBEmail);
    db.prepare(
      'INSERT INTO users (email, display_name, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?)'
    ).run(parentAEmail, 'Mẹ Bé Bông', hashPassword('123456'), 'user', now);
    db.prepare(
      'INSERT INTO users (email, display_name, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?)'
    ).run(parentBEmail, 'Bố Bé Sóc', hashPassword('123456'), 'user', now);

    const tokenA = createSession(parentAEmail);
    const tokenB = createSession(parentBEmail);
    const adminToken = createSession(DEV_EMAIL);

    console.log('3. Testing Family Bootstrap & Multi-Child Profile Management...');
    const bootA = await callApi(baseUrl, '/api/v1/bootstrap', { token: tokenA });
    assert.equal(bootA.status, 200);
    assert.ok(bootA.data.children.length >= 1);

    const createChildRes = await callApi(baseUrl, '/api/v1/children', {
      method: 'POST',
      token: tokenA,
      body: {
        name: 'Bông',
        ageLevelId: 'level2',
        avatar: 'bunny',
        birthMonth: 5,
        birthYear: 2024,
        familyLanguage: 'Tiếng Việt',
        interests: ['Động vật', 'Bài hát & Nhịp điệu'],
      },
    });
    assert.equal(createChildRes.status, 201);
    const childAId = createChildRes.data.child.id;
    assert.equal(createChildRes.data.child.name, 'Bông');

    console.log('4. Testing Family Data Isolation (Parent B cannot access Parent A child)...');
    const forbiddenGet = await callApi(baseUrl, `/api/v1/children/${childAId}`, {
      token: tokenB,
    });
    assert.equal(forbiddenGet.status, 403, 'Parent B must be blocked from viewing Parent A child');

    const forbiddenProg = await callApi(baseUrl, `/api/v1/children/${childAId}/progress`, {
      method: 'POST',
      token: tokenB,
      body: { topicId: 'topic-01-family', levelId: 'level2', status: 'completed' },
    });
    assert.equal(forbiddenProg.status, 403, 'Parent B must be blocked from updating Parent A progress');

    console.log('5. Testing Lesson Progress, Audio Replays, Game Attempts & Parent Observations...');
    const progRes = await callApi(baseUrl, `/api/v1/children/${childAId}/progress`, {
      method: 'POST',
      token: tokenA,
      body: {
        topicId: 'topic-03-animals',
        levelId: 'level2',
        status: 'completed',
        audioReplays: 5,
        gameAttempts: 3,
        activitiesTried: ['warmup', 'input', 'listening', 'games', 'story'],
        offlineActivityDone: true,
        observations: ['recognized', 'understood', 'spoke'],
        parentNote: 'Bé chỉ đúng con chó và nói Dog rất vui!',
      },
    });
    assert.equal(progRes.status, 200);
    assert.ok(progRes.data.stickersByChild[childAId].includes('topic-03-animals'));
    assert.ok(progRes.data.observations.some((o) => o.childId === childAId && o.topicId === 'topic-03-animals'));

    console.log('6. Testing Admin CMS Workflow (Draft -> Publish -> App Fetch -> Archive)...');
    // Parent A cannot access CMS
    const nonAdminCms = await callApi(baseUrl, '/api/v1/admin/dashboard', { token: tokenA });
    assert.equal(nonAdminCms.status, 403);

    // Admin creates a Draft topic
    const createTopicRes = await callApi(baseUrl, '/api/v1/admin/topics', {
      method: 'POST',
      token: adminToken,
      body: {
        code: '99',
        order: 99,
        titleEn: 'Test Musical Instruments',
        titleVi: 'Nhạc cụ thử nghiệm',
        status: 'draft',
      },
    });
    assert.equal(createTopicRes.status, 201);
    createdTopicId = createTopicRes.data.topic.id;
    assert.equal(createTopicRes.data.topic.status, 'draft');

    // Draft topic should NOT appear in public /api/v1/topics yet
    const publicBeforePub = await callApi(baseUrl, '/api/v1/topics?limit=100');
    assert.ok(
      !publicBeforePub.data.topics.some((t) => t.id === createdTopicId),
      'Draft topic must not be visible to learners before publishing'
    );

    // Publish topic via CMS workflow
    const pubRes = await callApi(
      baseUrl,
      `/api/v1/admin/topics/${encodeURIComponent(createdTopicId)}/status`,
      {
        method: 'PATCH',
        token: adminToken,
        body: { status: 'published' },
      }
    );
    assert.equal(pubRes.status, 200);
    assert.equal(pubRes.data.topic.status, 'published');

    // Now it MUST appear in public /api/v1/topics
    const publicAfterPub = await callApi(baseUrl, '/api/v1/topics?limit=100');
    assert.ok(
      publicAfterPub.data.topics.some((t) => t.id === createdTopicId),
      'Published topic must be immediately served to learners via API'
    );

    // Deleting a published topic soft-archives it (Section 9)
    const delPublishedRes = await callApi(
      baseUrl,
      `/api/v1/admin/topics/${encodeURIComponent(createdTopicId)}`,
      {
        method: 'DELETE',
        token: adminToken,
      }
    );
    assert.equal(delPublishedRes.status, 200);
    assert.equal(delPublishedRes.data.archived, true);

    console.log('7. Testing Media Library & Audit Logs...');
    const mediaRes = await callApi(baseUrl, '/api/v1/admin/media', {
      method: 'POST',
      token: adminToken,
      body: {
        title: 'Test Flashcard Star',
        type: 'image',
        url: '/preschool/img/words/star.webp',
        licenseNote: 'CC0 Test License',
      },
    });
    assert.equal(mediaRes.status, 201);
    createdMediaId = mediaRes.data.mediaAsset.id;

    const dashRes = await callApi(baseUrl, '/api/v1/admin/dashboard', { token: adminToken });
    assert.equal(dashRes.status, 200);
    assert.ok(dashRes.data.auditLogs.length >= 3);

    console.log('✅ ALL LITTLE ENGLISH WORLD API & ACCEPTANCE TESTS PASSED!');
  } finally {
    // Cleanup temporary test data
    if (createdTopicId) {
      db.prepare('DELETE FROM lew_topics WHERE id = ?').run(createdTopicId);
      db.prepare('DELETE FROM lew_audit_logs WHERE entity_id = ?').run(createdTopicId);
    }
    if (createdMediaId) {
      db.prepare('DELETE FROM lew_media_assets WHERE id = ?').run(createdMediaId);
      db.prepare('DELETE FROM lew_audit_logs WHERE entity_id = ?').run(createdMediaId);
    }
    db.prepare('DELETE FROM users WHERE email IN (?, ?)').run(parentAEmail, parentBEmail);
    server.close();
  }
}

runTests().catch((err) => {
  console.error('❌ TEST FAILED:', err);
  process.exit(1);
});
