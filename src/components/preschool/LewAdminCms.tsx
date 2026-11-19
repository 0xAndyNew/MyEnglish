import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Database,
  Eye,
  FileCode2,
  History,
  Image,
  Layers,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Shield,
  Sparkles,
  Trash2,
  Upload,
  Users,
  Volume2,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  LEW_AGE_LEVELS,
  LEW_LEVEL_ORDER,
  type LewAgeLevelMeta,
} from '../../data/preschool/lewLevels';
import type {
  LewAgeLevelId,
  LewAuditLogEntry,
  LewCmsDashboardStats,
  LewCmsRole,
  LewContentStatus,
  LewMediaAsset,
  LewTopic,
  LewVocabItem,
} from '../../data/preschool/lewTypes';
import { unitCoverUrl, wordImageUrl } from '../../data/preschool/types';
import { blobToBase64 } from '../../utils/audioRecorder';
import {
  archiveLewMediaAssetApi,
  createLewTopicApi,
  deleteOrArchiveLewTopicApi,
  fetchLewAdminDashboard,
  updateLewAgeLevelApi,
  updateLewTopicApi,
  updateLewTopicStatusApi,
  updateLewUserRoleApi,
  uploadLewMediaAssetApi,
} from '../../utils/lewApiClient';
import type { AdminUserSummary } from '../../utils/storage';

interface LewAdminCmsProps {
  currentUserEmail: string;
  currentUserRole?: LewCmsRole;
  onClose: () => void;
  onContentChanged?: () => void;
  onPreviewTopic?: (topic: LewTopic) => void;
  onSpeak?: (text: string) => void;
}

const STATUS_BADGE: Record<
  LewContentStatus,
  { label: string; bg: string; text: string }
> = {
  published: { label: 'Published (Đã xuất bản)', bg: '#D1FAE5', text: '#065F46' },
  review: { label: 'Review (Chờ duyệt)', bg: '#FEF3C7', text: '#92400E' },
  draft: { label: 'Draft (Bản nháp)', bg: '#E0F2FE', text: '#075985' },
  archived: { label: 'Archived (Lưu trữ)', bg: '#F1F5F9', text: '#475569' },
};

export const LewAdminCms: React.FC<LewAdminCmsProps> = ({
  currentUserEmail,
  currentUserRole = 'admin',
  onClose,
  onContentChanged,
  onPreviewTopic,
  onSpeak,
}) => {
  const [cmsTab, setCmsTab] = useState<
    'dashboard' | 'topics' | 'levels' | 'media' | 'users_audit'
  >('dashboard');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [stats, setStats] = useState<LewCmsDashboardStats | null>(null);
  const [ageLevels, setAgeLevels] =
    useState<Record<LewAgeLevelId, LewAgeLevelMeta>>(LEW_AGE_LEVELS);
  const [topics, setTopics] = useState<LewTopic[]>([]);
  const [mediaAssets, setMediaAssets] = useState<LewMediaAsset[]>([]);
  const [auditLogs, setAuditLogs] = useState<LewAuditLogEntry[]>([]);
  const [users, setUsers] = useState<AdminUserSummary[]>([]);

  // Topic Editor state
  const [statusFilter, setStatusFilter] = useState<'all' | LewContentStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [editorSubTab, setEditorSubTab] = useState<
    'meta' | 'vocab' | 'levels' | 'story' | 'parent'
  >('meta');
  const [editingLevelId, setEditingLevelId] = useState<LewAgeLevelId>('level3');
  const [draftTopic, setDraftTopic] = useState<LewTopic | null>(null);

  // New Topic Modal
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTitleVi, setNewTitleVi] = useState('');
  const [newStatus, setNewStatus] = useState<LewContentStatus>('draft');

  // Age Level Editor
  const [selectedAgeLevelId, setSelectedAgeLevelId] = useState<LewAgeLevelId>('level1');
  const [draftAgeLevel, setDraftAgeLevel] = useState<LewAgeLevelMeta>(LEW_AGE_LEVELS.level1);

  // Media Upload state
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'audio' | 'printable'>('image');
  const [mediaLicense, setMediaLicense] = useState('CC0 / Project Owned Illustration');
  const [mediaUrlInput, setMediaUrlInput] = useState('');
  const [mediaFileDraft, setMediaFileDraft] = useState<{
    base64: string;
    fileName: string;
    mimeType: string;
  } | null>(null);

  const canEdit = currentUserRole === 'admin' || currentUserRole === 'editor';
  const isAdmin = currentUserRole === 'admin';

  const loadDashboard = async (keepTopicId?: string) => {
    setLoading(true);
    try {
      const res = await fetchLewAdminDashboard();
      setStats(res.stats);
      setAgeLevels(res.ageLevels);
      setTopics(res.topics);
      setMediaAssets(res.mediaAssets);
      setAuditLogs(res.auditLogs);
      setUsers(res.users);

      const targetId = keepTopicId || selectedTopicId || res.topics[0]?.id || '';
      const found = res.topics.find((t) => t.id === targetId) || res.topics[0] || null;
      if (found) {
        setSelectedTopicId(found.id);
        setDraftTopic(JSON.parse(JSON.stringify(found)));
      }
      setDraftAgeLevel(res.ageLevels[selectedAgeLevelId] || LEW_AGE_LEVELS[selectedAgeLevelId]);
    } catch (err: any) {
      setToast(`❌ ${err?.message || 'Không tải được dữ liệu CMS.'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  useEffect(() => {
    const found = topics.find((t) => t.id === selectedTopicId);
    if (found) {
      setDraftTopic(JSON.parse(JSON.stringify(found)));
    }
  }, [selectedTopicId]);

  useEffect(() => {
    if (ageLevels[selectedAgeLevelId]) {
      setDraftAgeLevel(JSON.parse(JSON.stringify(ageLevels[selectedAgeLevelId])));
    }
  }, [selectedAgeLevelId, ageLevels]);

  const filteredTopics = topics.filter((t) => {
    const st = t.status || 'published';
    if (statusFilter !== 'all' && st !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      return (
        t.titleEn.toLowerCase().includes(q) ||
        t.titleVi.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSaveTopic = async () => {
    if (!draftTopic || !canEdit) return;
    setSaving(true);
    setToast(null);
    try {
      const res = await updateLewTopicApi(draftTopic.id, draftTopic);
      setToast(
        `✅ Đã lưu chủ đề "${res.topic.code}. ${res.topic.titleEn}" (v${res.topic.version}).`
      );
      await loadDashboard(res.topic.id);
      onContentChanged?.();
    } catch (err: any) {
      setToast(`❌ ${err?.message || 'Lưu chủ đề thất bại.'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (nextStatus: LewContentStatus) => {
    if (!draftTopic || !canEdit) return;
    setSaving(true);
    setToast(null);
    try {
      // Save any pending edits first
      await updateLewTopicApi(draftTopic.id, { ...draftTopic, status: nextStatus });
      const res = await updateLewTopicStatusApi(draftTopic.id, nextStatus);
      setToast(
        `✅ Đã chuyển trạng thái chủ đề "${res.topic.titleEn}" sang [${nextStatus.toUpperCase()}].`
      );
      await loadDashboard(res.topic.id);
      onContentChanged?.();
    } catch (err: any) {
      setToast(`❌ ${err?.message || 'Đổi trạng thái thất bại.'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleEn.trim() || !newTitleVi.trim()) return;
    setSaving(true);
    setToast(null);
    try {
      const res = await createLewTopicApi({
        code: newCode.trim() || String(topics.length + 1).padStart(2, '0'),
        order: topics.length + 1,
        titleEn: newTitleEn.trim(),
        titleVi: newTitleVi.trim(),
        subtitleVi: newTitleVi.trim(),
        status: newStatus,
      });
      setShowNewTopicModal(false);
      setNewCode('');
      setNewTitleEn('');
      setNewTitleVi('');
      setToast(`✅ Đã tạo chủ đề mới "${res.topic.code}. ${res.topic.titleEn}"!`);
      setCmsTab('topics');
      await loadDashboard(res.topic.id);
      onContentChanged?.();
    } catch (err: any) {
      setToast(`❌ ${err?.message || 'Tạo chủ đề thất bại.'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleArchiveOrDeleteTopic = async () => {
    if (!draftTopic || !isAdmin) return;
    setSaving(true);
    setToast(null);
    try {
      const res = await deleteOrArchiveLewTopicApi(draftTopic.id);
      if (res.archived) {
        setToast(
          `📦 Đã chuyển chủ đề "${draftTopic.titleEn}" sang Lưu trữ (Archived) để bảo toàn lịch sử học tập.`
        );
        await loadDashboard(draftTopic.id);
      } else {
        setToast(`🗑️ Đã xóa bản nháp "${draftTopic.titleEn}".`);
        await loadDashboard();
      }
      onContentChanged?.();
    } catch (err: any) {
      setToast(`❌ ${err?.message || 'Thao tác thất bại.'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAgeLevel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) return;
    setSaving(true);
    setToast(null);
    try {
      const res = await updateLewAgeLevelApi(selectedAgeLevelId, draftAgeLevel);
      setAgeLevels(res.ageLevels);
      setToast(`✅ Đã lưu cấu hình nhóm tuổi ${draftAgeLevel.code} (${draftAgeLevel.name}).`);
      onContentChanged?.();
    } catch (err: any) {
      setToast(`❌ ${err?.message || 'Lưu nhóm tuổi thất bại.'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleUploadMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) return;
    setSaving(true);
    setToast(null);
    try {
      await uploadLewMediaAssetApi({
        title: mediaTitle.trim(),
        type: mediaType,
        licenseNote: mediaLicense.trim(),
        url: mediaFileDraft ? undefined : mediaUrlInput.trim(),
        base64Data: mediaFileDraft?.base64,
        fileName: mediaFileDraft?.fileName,
        mimeType: mediaFileDraft?.mimeType,
      });
      setMediaTitle('');
      setMediaUrlInput('');
      setMediaFileDraft(null);
      setToast('✅ Đã tải lên và lưu media vào thư viện kèm thông tin bản quyền.');
      await loadDashboard();
    } catch (err: any) {
      setToast(`❌ ${err?.message || 'Tải lên media thất bại.'}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3EEFF] text-slate-900 font-kid">
      {/* Top CMS Navigation Header matching Mockup #10: Quản trị (Admin) */}
      <header
        className="sticky top-0 z-30 text-white px-4 py-3.5 shadow-md"
        style={{ background: 'linear-gradient(90deg, #7A4CE8 0%, #5E34C8 100%)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs inline-flex items-center gap-1.5 border border-white/30"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </button>
            <div>
              <div className="text-base font-extrabold flex items-center gap-2">
                <Database className="w-4 h-4 text-[#FFE66D]" />
                <span>Quản trị (Admin) · Kids English CMS</span>
              </div>
              <div className="text-[11px] text-purple-100">
                Tài khoản: <strong className="text-white">{currentUserEmail}</strong> · Quyền:{' '}
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-bold uppercase">
                  {currentUserRole}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/api/v1/openapi.json"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold inline-flex items-center gap-1.5 border border-white/25"
            >
              <FileCode2 className="w-3.5 h-3.5 text-[#AEE4FF]" />
              <span>OpenAPI v1 JSON</span>
            </a>
            <button
              type="button"
              onClick={() => loadDashboard()}
              className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold inline-flex items-center gap-1.5 border border-white/25"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Làm mới</span>
            </button>
            {canEdit && (
              <button
                type="button"
                onClick={() => setShowNewTopicModal(true)}
                className="kids-btn-blue px-4 py-2 rounded-full text-white text-xs font-extrabold inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm bài học mới</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-5">
        {/* CMS Main Module Switcher matching Mockup #10 lavender sidebar pills */}
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-3xl bg-white/90 border-2 border-[#E3D7FF] shadow-xs">
          {[
            { id: 'dashboard' as const, label: '📊 Tổng quan & Thống kê', icon: Layers },
            {
              id: 'topics' as const,
              label: `📘 Bài học & Trò chơi (${topics.length})`,
              icon: BookOpen,
            },
            { id: 'levels' as const, label: '🎯 5 Nhóm tuổi (1–6t)', icon: Sparkles },
            { id: 'media' as const, label: `🖼️ Hình ảnh & Bài hát (${mediaAssets.length})`, icon: Image },
            {
              id: 'users_audit' as const,
              label: `⚙️ Cài đặt & Phân quyền (${auditLogs.length})`,
              icon: Shield,
            },
          ].map((t) => {
            const Icon = t.icon;
            const active = cmsTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setCmsTab(t.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold inline-flex items-center gap-2 transition ${
                  active
                    ? 'bg-[#6F42E5] text-white shadow-sm'
                    : 'bg-[#F6F2FF] text-[#4C348F] hover:bg-[#ECE4FF]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {toast && (
          <div className="p-3.5 rounded-2xl bg-white border-2 border-indigo-200 text-slate-900 text-xs font-extrabold flex items-center justify-between shadow-xs">
            <span>{toast}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-slate-700"
            >
              Đóng
            </button>
          </div>
        )}

        {loading && !stats ? (
          <div className="p-12 rounded-3xl bg-white border border-slate-200 flex items-center justify-center gap-2 text-sm font-bold text-slate-500">
            <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
            <span>Đang tải dữ liệu CMS từ SQLite...</span>
          </div>
        ) : null}

        {/* MODULE 1: DASHBOARD & REPORTS */}
        {cmsTab === 'dashboard' && stats && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-1">
                <div className="text-xs font-bold text-slate-500">Tài khoản & Hồ sơ bé</div>
                <div className="text-2xl font-black text-slate-900">
                  {stats.totalParents} Phụ huynh · {stats.totalChildren} Bé
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold">
                  Phân quyền độc lập từng gia đình
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-1">
                <div className="text-xs font-bold text-slate-500">Chủ đề & Bài học</div>
                <div className="text-2xl font-black text-emerald-700">
                  {stats.topicsByStatus.published || 0} Published
                </div>
                <div className="text-[11px] text-slate-500 font-semibold">
                  Nháp: {stats.topicsByStatus.draft || 0} · Chờ duyệt: {stats.topicsByStatus.review || 0} · Lưu trữ: {stats.topicsByStatus.archived || 0}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-1">
                <div className="text-xs font-bold text-slate-500">Kho Từ vựng & Truyện</div>
                <div className="text-2xl font-black text-indigo-700">
                  {stats.totalVocabWords} Từ · {stats.totalStories} Truyện
                </div>
                <div className="text-[11px] text-slate-500 font-semibold">
                  {stats.totalMediaAssets} tệp Media đã kiểm tra bản quyền
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-1">
                <div className="text-xs font-bold text-slate-500">Tiến độ & Ghi nhận cha mẹ</div>
                <div className="text-2xl font-black text-amber-600">
                  {stats.totalCompletedLessons} Lượt hoàn thành
                </div>
                <div className="text-[11px] text-slate-500 font-semibold">
                  {stats.totalObservations} nhật ký quan sát từ phụ huynh
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Popular topics report */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
                <h3 className="text-sm font-black text-slate-900">
                  📈 Chủ đề phổ biến được các gia đình học nhiều nhất
                </h3>
                {stats.popularTopics.length === 0 ? (
                  <p className="text-xs text-slate-500">Chưa có lượt học nào được ghi nhận.</p>
                ) : (
                  <div className="space-y-2">
                    {stats.popularTopics.map((p) => (
                      <div
                        key={p.topicId}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-extrabold text-slate-900">{p.titleEn}</span>{' '}
                          <span className="text-slate-500">({p.titleVi})</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 font-extrabold">
                          {p.count} lượt học
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Audit Logs */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <History className="w-4 h-4 text-indigo-600" />
                    <span>Nhật ký chỉnh sửa & Xuất bản gần đây (Audit Logs)</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCmsTab('users_audit')}
                    className="text-xs font-bold text-indigo-600 hover:underline"
                  >
                    Xem tất cả →
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {auditLogs.slice(0, 6).map((log) => (
                    <div
                      key={log.id}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-0.5"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>
                          <strong className="text-slate-700">{log.actorEmail}</strong> ({log.actorRole}) ·{' '}
                          <code className="text-indigo-600">{log.action}</code>
                        </span>
                        <span>{log.createdAt.slice(0, 19).replace('T', ' ')}</span>
                      </div>
                      <div className="font-semibold text-slate-800">{log.summary}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 2: TOPICS, LESSONS, VOCABULARY, GAMES, STORIES & PARENT GUIDES */}
        {cmsTab === 'topics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Sidebar: Topic List & Status Filter */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-4 space-y-3 flex flex-col max-h-[82vh]">
              <div className="space-y-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="🔍 Tìm theo mã, tên Anh/Việt..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                />
                <div className="flex flex-wrap gap-1">
                  {(['all', 'published', 'draft', 'review', 'archived'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold capitalize ${
                        statusFilter === st
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                {filteredTopics.map((t) => {
                  const active = t.id === selectedTopicId;
                  const st = t.status || 'published';
                  const badge = STATUS_BADGE[st] || STATUS_BADGE.published;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTopicId(t.id)}
                      className={`w-full p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition ${
                        active
                          ? 'bg-indigo-50 border-indigo-400'
                          : 'bg-white border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <img
                        src={unitCoverUrl(t.coverSlug)}
                        alt={t.titleEn}
                        className="w-12 h-10 rounded-xl bg-white p-1 border border-slate-100 object-contain shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-black text-slate-900 truncate">
                          {t.code}. {t.titleEn}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">{t.titleVi}</div>
                      </div>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase shrink-0"
                        style={{ backgroundColor: badge.bg, color: badge.text }}
                      >
                        {st}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Panel: Full Topic / Lesson Editor */}
            {draftTopic && (
              <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 space-y-5">
                {/* Editor Top Bar: Title + Publishing Workflow Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={unitCoverUrl(draftTopic.coverSlug)}
                      alt={draftTopic.titleEn}
                      className="w-20 h-14 rounded-2xl bg-white p-1 border border-slate-200 object-contain"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold"
                          style={{
                            backgroundColor:
                              STATUS_BADGE[draftTopic.status || 'published']?.bg,
                            color: STATUS_BADGE[draftTopic.status || 'published']?.text,
                          }}
                        >
                          {STATUS_BADGE[draftTopic.status || 'published']?.label}
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                          v{draftTopic.version || 1} · Sửa bởi: {draftTopic.updatedBy || 'admin'}
                        </span>
                      </div>
                      <h2 className="text-xl font-black text-slate-900 mt-0.5">
                        {draftTopic.code}. {draftTopic.titleEn} — {draftTopic.titleVi}
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {onPreviewTopic && (
                      <button
                        type="button"
                        onClick={() => onPreviewTopic(draftTopic)}
                        className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-xs inline-flex items-center gap-1.5"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Xem trước bài học</span>
                      </button>
                    )}

                    {canEdit && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={handleSaveTopic}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Publishing Workflow Pipeline Bar (Draft -> Review -> Published -> Archived) */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-extrabold text-slate-700">
                    Quy trình xuất bản (Workflow):
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(['draft', 'review', 'published', 'archived'] as LewContentStatus[]).map(
                      (st) => {
                        const active = (draftTopic.status || 'published') === st;
                        return (
                          <button
                            key={st}
                            type="button"
                            disabled={!canEdit || saving}
                            onClick={() => handleStatusChange(st)}
                            className={`px-3 py-1.5 rounded-xl font-extrabold capitalize transition ${
                              active
                                ? 'bg-slate-900 text-white'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50'
                            }`}
                          >
                            {active ? '● ' : ''}
                            {st}
                          </button>
                        );
                      }
                    )}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={handleArchiveOrDeleteTopic}
                        className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-extrabold inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Lưu trữ / Xóa nháp</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Sub-tabs inside Topic Editor */}
                <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-3">
                  {[
                    { id: 'meta' as const, label: '1. Thông tin & Hoạt động' },
                    { id: 'vocab' as const, label: `2. Từ vựng (${draftTopic.words.length})` },
                    { id: 'levels' as const, label: '3. Nội dung 5 Cấp độ & Game' },
                    {
                      id: 'story' as const,
                      label: `4. Truyện tranh (${draftTopic.levels.level5?.storyPages?.length || 0} trang)`,
                    },
                    { id: 'parent' as const, label: '5. Giáo án Phụ huynh' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setEditorSubTab(st.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold ${
                        editorSubTab === st.id
                          ? 'bg-amber-400 text-slate-900'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                {/* SUB-TAB 1: METADATA & ACTIVITY TOGGLES */}
                {editorSubTab === 'meta' && (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-extrabold text-slate-700 mb-1">Mã chủ đề</label>
                        <input
                          type="text"
                          value={draftTopic.code}
                          onChange={(e) =>
                            setDraftTopic({ ...draftTopic, code: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-extrabold text-slate-700 mb-1">
                          Thứ tự hiển thị
                        </label>
                        <input
                          type="number"
                          value={draftTopic.order}
                          onChange={(e) =>
                            setDraftTopic({ ...draftTopic, order: Number(e.target.value) })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-extrabold text-slate-700 mb-1">
                          Thời lượng ước tính (phút)
                        </label>
                        <input
                          type="number"
                          value={draftTopic.estimatedMinutes || 10}
                          onChange={(e) =>
                            setDraftTopic({
                              ...draftTopic,
                              estimatedMinutes: Number(e.target.value),
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-extrabold text-slate-700 mb-1">
                          Tên chủ đề tiếng Anh
                        </label>
                        <input
                          type="text"
                          value={draftTopic.titleEn}
                          onChange={(e) =>
                            setDraftTopic({ ...draftTopic, titleEn: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-extrabold text-slate-700 mb-1">
                          Tên chủ đề tiếng Việt
                        </label>
                        <input
                          type="text"
                          value={draftTopic.titleVi}
                          onChange={(e) =>
                            setDraftTopic({ ...draftTopic, titleVi: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-extrabold text-slate-700 mb-1">
                          Slug hoặc URL ảnh bìa
                        </label>
                        <input
                          type="text"
                          value={draftTopic.coverSlug}
                          onChange={(e) =>
                            setDraftTopic({ ...draftTopic, coverSlug: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-extrabold text-slate-700 mb-1">
                          Thông tin bản quyền / Nguồn media
                        </label>
                        <input
                          type="text"
                          value={
                            draftTopic.licenseNote ||
                            'Internal SVG/WebP Illustration Library (Owned)'
                          }
                          onChange={(e) =>
                            setDraftTopic({ ...draftTopic, licenseNote: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                        />
                      </div>
                    </div>

                    {/* Toggle Lesson Activities (Section 5 requirement) */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <div className="font-black text-slate-900">
                        Bật / Tắt từng hoạt động của bài học (Mục 5 Đặc tả):
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { key: 'warmup' as const, label: '1. Chào hỏi / Khởi động' },
                          { key: 'input' as const, label: '2. Từ mới & Câu mẫu' },
                          { key: 'listening' as const, label: '3. Nghe hiểu & Chọn hình' },
                          { key: 'games' as const, label: '4. Trò chơi tương tác' },
                          { key: 'parentActivity' as const, label: '5. Giáo án cùng cha mẹ' },
                          { key: 'story' as const, label: '6. Truyện tranh cùng đọc' },
                        ].map((act) => {
                          const current = draftTopic.enabledActivities || {
                            warmup: true,
                            input: true,
                            listening: true,
                            games: true,
                            parentActivity: true,
                            story: true,
                          };
                          const checked = current[act.key] !== false;
                          return (
                            <label
                              key={act.key}
                              className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2 font-bold cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) =>
                                  setDraftTopic({
                                    ...draftTopic,
                                    enabledActivities: {
                                      ...current,
                                      [act.key]: e.target.checked,
                                    },
                                  })
                                }
                              />
                              <span>{act.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-TAB 2: VOCABULARY MANAGER */}
                {editorSubTab === 'vocab' && (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="font-black text-slate-800">
                        Danh sách từ vựng trong chủ đề ({draftTopic.words.length} từ)
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newWord: LewVocabItem = {
                            id: `${draftTopic.id}-w-${Date.now().toString().slice(-3)}`,
                            word: 'New Word',
                            meaningVi: 'nghĩa tiếng Việt',
                            ipa: '/nuː/',
                            imageSlug: 'star',
                            category: 'object',
                            sampleEn: 'Look at this!',
                            sampleVi: 'Nhìn này con!',
                          };
                          setDraftTopic({
                            ...draftTopic,
                            words: [...draftTopic.words, newWord],
                          });
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold inline-flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Thêm từ vựng</span>
                      </button>
                    </div>

                    <div className="space-y-2.5 max-h-[52vh] overflow-y-auto pr-1">
                      {draftTopic.words.map((w, idx) => (
                        <div
                          key={w.id || idx}
                          className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                        >
                          <div className="sm:col-span-2 flex flex-col items-center gap-1">
                            <img
                              src={wordImageUrl(w.imageSlug)}
                              alt={w.word}
                              className="w-16 h-16 rounded-xl bg-white p-1 border border-slate-200 object-contain"
                            />
                            <button
                              type="button"
                              onClick={() => onSpeak?.(w.word)}
                              className="text-[11px] font-bold text-amber-700 inline-flex items-center gap-1"
                            >
                              <Volume2 className="w-3 h-3" /> Nghe
                            </button>
                          </div>

                          <div className="sm:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input
                              type="text"
                              value={w.word}
                              onChange={(e) => {
                                const next = [...draftTopic.words];
                                next[idx] = { ...w, word: e.target.value };
                                setDraftTopic({ ...draftTopic, words: next });
                              }}
                              placeholder="Từ tiếng Anh"
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-extrabold"
                            />
                            <input
                              type="text"
                              value={w.meaningVi}
                              onChange={(e) => {
                                const next = [...draftTopic.words];
                                next[idx] = { ...w, meaningVi: e.target.value };
                                setDraftTopic({ ...draftTopic, words: next });
                              }}
                              placeholder="Nghĩa tiếng Việt"
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-bold"
                            />
                            <input
                              type="text"
                              value={w.imageSlug}
                              onChange={(e) => {
                                const next = [...draftTopic.words];
                                next[idx] = { ...w, imageSlug: e.target.value };
                                setDraftTopic({ ...draftTopic, words: next });
                              }}
                              placeholder="Slug ảnh hoặc URL (/api/v1/media/...)"
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-mono"
                            />
                            <input
                              type="text"
                              value={w.ipa}
                              onChange={(e) => {
                                const next = [...draftTopic.words];
                                next[idx] = { ...w, ipa: e.target.value };
                                setDraftTopic({ ...draftTopic, words: next });
                              }}
                              placeholder="Phiên âm IPA"
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                            />
                            <input
                              type="text"
                              value={w.sampleEn}
                              onChange={(e) => {
                                const next = [...draftTopic.words];
                                next[idx] = { ...w, sampleEn: e.target.value };
                                setDraftTopic({ ...draftTopic, words: next });
                              }}
                              placeholder="Câu mẫu tiếng Anh"
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-bold"
                            />
                            <input
                              type="text"
                              value={w.sampleVi}
                              onChange={(e) => {
                                const next = [...draftTopic.words];
                                next[idx] = { ...w, sampleVi: e.target.value };
                                setDraftTopic({ ...draftTopic, words: next });
                              }}
                              placeholder="Nghĩa câu mẫu"
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                            />
                          </div>

                          <div className="sm:col-span-1 flex justify-end">
                            {draftTopic.words.length > 3 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const next = draftTopic.words.filter((_, i) => i !== idx);
                                  setDraftTopic({ ...draftTopic, words: next });
                                }}
                                className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                                title="Xóa từ này"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUB-TAB 3: 5 AGE LEVELS & GAME CONFIG */}
                {editorSubTab === 'levels' && (
                  <div className="space-y-4 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {LEW_LEVEL_ORDER.map((lvId) => {
                        const lv = ageLevels[lvId] || LEW_AGE_LEVELS[lvId];
                        return (
                          <button
                            key={lvId}
                            type="button"
                            onClick={() => setEditingLevelId(lvId)}
                            className={`px-3 py-1.5 rounded-xl font-extrabold ${
                              editingLevelId === lvId
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {lv.code} ({lv.shortAgeVi})
                          </button>
                        );
                      })}
                    </div>

                    {(() => {
                      const lvVar = draftTopic.levels[editingLevelId];
                      if (!lvVar) return null;
                      return (
                        <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                          <div>
                            <label className="block font-extrabold text-slate-700 mb-1">
                              Mục tiêu bài học ở {editingLevelId.toUpperCase()}
                            </label>
                            <input
                              type="text"
                              value={lvVar.objectiveVi}
                              onChange={(e) =>
                                setDraftTopic({
                                  ...draftTopic,
                                  levels: {
                                    ...draftTopic.levels,
                                    [editingLevelId]: {
                                      ...lvVar,
                                      objectiveVi: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-2">
                              <label className="block font-extrabold text-slate-700 mb-1">
                                Đầu ra kỳ vọng (Expected Outcome)
                              </label>
                              <input
                                type="text"
                                value={lvVar.expectedOutcomeVi}
                                onChange={(e) =>
                                  setDraftTopic({
                                    ...draftTopic,
                                    levels: {
                                      ...draftTopic.levels,
                                      [editingLevelId]: {
                                        ...lvVar,
                                        expectedOutcomeVi: e.target.value,
                                      },
                                    },
                                  })
                                }
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                              />
                            </div>
                            <div>
                              <label className="block font-extrabold text-slate-700 mb-1">
                                Số từ vựng hiển thị ở cấp này
                              </label>
                              <input
                                type="number"
                                min={2}
                                max={10}
                                value={lvVar.wordCount}
                                onChange={(e) =>
                                  setDraftTopic({
                                    ...draftTopic,
                                    levels: {
                                      ...draftTopic.levels,
                                      [editingLevelId]: {
                                        ...lvVar,
                                        wordCount: Number(e.target.value),
                                      },
                                    },
                                  })
                                }
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="font-extrabold text-slate-700">
                              Trò chơi vận động Move & Say (Câu lệnh Anh - Việt - Động tác):
                            </div>
                            {lvVar.moveAndSay.map((act, idx) => (
                              <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <input
                                  type="text"
                                  value={act.en}
                                  onChange={(e) => {
                                    const next = [...lvVar.moveAndSay];
                                    next[idx] = { ...act, en: e.target.value };
                                    setDraftTopic({
                                      ...draftTopic,
                                      levels: {
                                        ...draftTopic.levels,
                                        [editingLevelId]: { ...lvVar, moveAndSay: next },
                                      },
                                    });
                                  }}
                                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-bold"
                                />
                                <input
                                  type="text"
                                  value={act.vi}
                                  onChange={(e) => {
                                    const next = [...lvVar.moveAndSay];
                                    next[idx] = { ...act, vi: e.target.value };
                                    setDraftTopic({
                                      ...draftTopic,
                                      levels: {
                                        ...draftTopic.levels,
                                        [editingLevelId]: { ...lvVar, moveAndSay: next },
                                      },
                                    });
                                  }}
                                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                                />
                                <input
                                  type="text"
                                  value={act.actionVi}
                                  onChange={(e) => {
                                    const next = [...lvVar.moveAndSay];
                                    next[idx] = { ...act, actionVi: e.target.value };
                                    setDraftTopic({
                                      ...draftTopic,
                                      levels: {
                                        ...draftTopic.levels,
                                        [editingLevelId]: { ...lvVar, moveAndSay: next },
                                      },
                                    });
                                  }}
                                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* SUB-TAB 4: STORY PAGES EDITOR */}
                {editorSubTab === 'story' && (
                  <div className="space-y-3 text-xs">
                    <div className="font-black text-slate-800">
                      Các trang truyện tranh của chủ đề (Dùng cho cả Story Time & Game Story Order):
                    </div>
                    {(draftTopic.levels.level5?.storyPages || []).map((pg, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3"
                      >
                        <img
                          src={wordImageUrl(pg.imageSlug)}
                          alt={pg.en}
                          className="w-16 h-16 rounded-xl bg-white p-1 border border-slate-200 object-contain shrink-0"
                        />
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={pg.imageSlug}
                            onChange={(e) => {
                              const nextLevels = { ...draftTopic.levels };
                              for (const lvKey of LEW_LEVEL_ORDER) {
                                const pages = [...(nextLevels[lvKey].storyPages || [])];
                                if (pages[idx]) {
                                  pages[idx] = { ...pages[idx], imageSlug: e.target.value };
                                  nextLevels[lvKey] = { ...nextLevels[lvKey], storyPages: pages };
                                }
                              }
                              setDraftTopic({ ...draftTopic, levels: nextLevels });
                            }}
                            placeholder="Slug/URL hình"
                            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-mono"
                          />
                          <input
                            type="text"
                            value={pg.en}
                            onChange={(e) => {
                              const nextLevels = { ...draftTopic.levels };
                              for (const lvKey of LEW_LEVEL_ORDER) {
                                const pages = [...(nextLevels[lvKey].storyPages || [])];
                                if (pages[idx]) {
                                  pages[idx] = { ...pages[idx], en: e.target.value };
                                  nextLevels[lvKey] = { ...nextLevels[lvKey], storyPages: pages };
                                }
                              }
                              setDraftTopic({ ...draftTopic, levels: nextLevels });
                            }}
                            placeholder="Lời thoại tiếng Anh"
                            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-bold"
                          />
                          <input
                            type="text"
                            value={pg.vi}
                            onChange={(e) => {
                              const nextLevels = { ...draftTopic.levels };
                              for (const lvKey of LEW_LEVEL_ORDER) {
                                const pages = [...(nextLevels[lvKey].storyPages || [])];
                                if (pages[idx]) {
                                  pages[idx] = { ...pages[idx], vi: e.target.value };
                                  nextLevels[lvKey] = { ...nextLevels[lvKey], storyPages: pages };
                                }
                              }
                              setDraftTopic({ ...draftTopic, levels: nextLevels });
                            }}
                            placeholder="Lời dịch tiếng Việt"
                            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SUB-TAB 5: PARENT GUIDE EDITOR */}
                {editorSubTab === 'parent' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-extrabold text-slate-700 mb-1">
                        Tóm tắt từ mục tiêu cho phụ huynh
                      </label>
                      <input
                        type="text"
                        value={draftTopic.parentGuide.targetWordsSummaryVi}
                        onChange={(e) =>
                          setDraftTopic({
                            ...draftTopic,
                            parentGuide: {
                              ...draftTopic.parentGuide,
                              targetWordsSummaryVi: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-extrabold text-slate-700 mb-1">
                        Vật dụng cha mẹ cần chuẩn bị
                      </label>
                      <input
                        type="text"
                        value={draftTopic.parentGuide.materialsVi}
                        onChange={(e) =>
                          setDraftTopic({
                            ...draftTopic,
                            parentGuide: {
                              ...draftTopic.parentGuide,
                              materialsVi: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-extrabold text-slate-700 mb-1">
                        Trò chơi thực tế ngoài màn hình (Offline Family Activity)
                      </label>
                      <textarea
                        rows={2}
                        value={draftTopic.parentGuide.offlineGameVi}
                        onChange={(e) =>
                          setDraftTopic({
                            ...draftTopic,
                            parentGuide: {
                              ...draftTopic.parentGuide,
                              offlineGameVi: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* MODULE 3: 5 AGE LEVELS MANAGER */}
        {cmsTab === 'levels' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  🎯 Quản lý 5 Nhóm Tuổi & Quy tắc Tương tác
                </h2>
                <p className="text-xs text-slate-500">
                  Chỉnh sửa mục tiêu, thời lượng phiên học, số đáp án tối đa và bật/tắt chế độ Parent-led.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {LEW_LEVEL_ORDER.map((lvId) => {
                  const lv = ageLevels[lvId] || LEW_AGE_LEVELS[lvId];
                  return (
                    <button
                      key={lvId}
                      type="button"
                      onClick={() => setSelectedAgeLevelId(lvId)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold ${
                        selectedAgeLevelId === lvId
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {lv.code} ({lv.shortAgeVi})
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSaveAgeLevel} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Tên cấp độ</label>
                  <input
                    type="text"
                    value={draftAgeLevel.name}
                    onChange={(e) =>
                      setDraftAgeLevel({ ...draftAgeLevel, name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Độ tuổi</label>
                  <input
                    type="text"
                    value={draftAgeLevel.ageRangeVi}
                    onChange={(e) =>
                      setDraftAgeLevel({ ...draftAgeLevel, ageRangeVi: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">
                    Thời lượng gợi ý
                  </label>
                  <input
                    type="text"
                    value={draftAgeLevel.recommendedSessionVi}
                    onChange={(e) =>
                      setDraftAgeLevel({
                        ...draftAgeLevel,
                        recommendedSessionVi: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">
                    Số hình lựa chọn tối đa
                  </label>
                  <select
                    value={draftAgeLevel.maxChoices}
                    onChange={(e) =>
                      setDraftAgeLevel({
                        ...draftAgeLevel,
                        maxChoices: Number(e.target.value) as 2 | 3 | 4,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                  >
                    <option value={2}>2 hình (Trẻ nhỏ 1–3 tuổi)</option>
                    <option value={3}>3 hình (Trẻ 3–5 tuổi)</option>
                    <option value={4}>4 hình (Trẻ 5–6 tuổi)</option>
                  </select>
                </div>
              </div>

              <label className="inline-flex items-center gap-2 font-extrabold text-amber-900 bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draftAgeLevel.isParentLed}
                  onChange={(e) =>
                    setDraftAgeLevel({ ...draftAgeLevel, isParentLed: e.target.checked })
                  }
                />
                <span>
                  Bật chế độ Cha Mẹ Dẫn Dắt (Parent-led Mode — không giao bé tự học độc lập trên màn hình)
                </span>
              </label>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Mục tiêu chính</label>
                <input
                  type="text"
                  value={draftAgeLevel.mainGoalVi}
                  onChange={(e) =>
                    setDraftAgeLevel({ ...draftAgeLevel, mainGoalVi: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              {canEdit && (
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold inline-flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu cấu hình nhóm tuổi</span>
                </button>
              )}
            </form>
          </div>
        )}

        {/* MODULE 4: MEDIA LIBRARY & COPYRIGHT TRACKING */}
        {cmsTab === 'media' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Upload / Register Media Form */}
            <form
              onSubmit={handleUploadMedia}
              className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3.5 text-xs"
            >
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-indigo-600" />
                <span>Tải lên / Đăng ký Media mới</span>
              </h3>
              <p className="text-slate-500">
                Mọi hình ảnh, audio hoặc phiếu in phải ghi rõ nguồn cấp phép / bản quyền trước khi sử dụng trong bài học (Mục 5 & 9).
              </p>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Tên tệp / Mô tả</label>
                <input
                  type="text"
                  required
                  value={mediaTitle}
                  onChange={(e) => setMediaTitle(e.target.value)}
                  placeholder="Ví dụ: Flashcard Puppy / Audio Hello..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Loại Media</label>
                <select
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                >
                  <option value="image">Hình ảnh minh họa (WebP / PNG / SVG)</option>
                  <option value="audio">Âm thanh / Nhạc bài hát (MP3 / WAV)</option>
                  <option value="printable">Phiếu hoạt động / Flashcard PDF</option>
                </select>
              </div>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1">
                  Tải tệp từ máy tính (&lt;= 8MB)
                </label>
                <input
                  type="file"
                  accept="image/*,audio/*,.pdf"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const b64 = await blobToBase64(f);
                    setMediaFileDraft({
                      base64: b64,
                      fileName: f.name,
                      mimeType: f.type || 'image/webp',
                    });
                    if (!mediaTitle) setMediaTitle(f.name);
                  }}
                  className="w-full text-xs"
                />
                {mediaFileDraft && (
                  <div className="text-emerald-700 font-bold mt-1">
                    ✓ Đã chọn file: {mediaFileDraft.fileName}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1">
                  Hoặc nhập đường dẫn URL sẵn có
                </label>
                <input
                  type="text"
                  value={mediaUrlInput}
                  onChange={(e) => setMediaUrlInput(e.target.value)}
                  placeholder="/preschool/img/words/cat.webp"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1">
                  Thông tin bản quyền / Nguồn cấp phép (Bắt buộc)
                </label>
                <input
                  type="text"
                  required
                  value={mediaLicense}
                  onChange={(e) => setMediaLicense(e.target.value)}
                  placeholder="CC0 / Tự thiết kế / Đã mua bản quyền..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              {canEdit && (
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold"
                >
                  + Lưu vào Thư viện Media
                </button>
              )}
            </form>

            {/* Media Assets List */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
              <h3 className="text-base font-black text-slate-900">
                Danh sách Media & Kiểm tra Bản quyền ({mediaAssets.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[65vh] overflow-y-auto">
                {mediaAssets.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 text-xs ${
                      m.status === 'archived'
                        ? 'bg-slate-50 border-slate-200 opacity-50'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    {m.type === 'image' ? (
                      <img
                        src={m.url}
                        alt={m.title}
                        className="w-16 h-16 rounded-xl bg-slate-50 p-1 border border-slate-100 object-contain shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-indigo-50 text-indigo-700 font-black flex items-center justify-center shrink-0">
                        AUDIO
                      </div>
                    )}
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="font-extrabold text-slate-900 truncate">{m.title}</div>
                      <div className="font-mono text-[11px] text-indigo-700 truncate">{m.url}</div>
                      <div className="text-[11px] text-emerald-700 font-semibold">
                        📜 {m.licenseNote}
                      </div>
                      {m.status === 'active' && canEdit && (
                        <button
                          type="button"
                          onClick={async () => {
                            await archiveLewMediaAssetApi(m.id);
                            await loadDashboard();
                          }}
                          className="text-[11px] text-rose-600 font-bold hover:underline"
                        >
                          Lưu trữ (Archive)
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 5: USERS & ROLES + FULL AUDIT LOGS */}
        {cmsTab === 'users_audit' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Users & Roles */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Quản lý Tài khoản & Phân quyền CMS (Admin / Editor / Viewer / Parent)</span>
              </h3>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {users.map((u) => (
                  <div
                    key={u.email}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="font-extrabold text-slate-900">{u.displayName}</div>
                      <div className="text-slate-500">{u.email}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        disabled={!isAdmin || u.email === 'admin'}
                        value={u.role}
                        onChange={async (e) => {
                          try {
                            const nextRole = e.target.value as LewCmsRole;
                            await updateLewUserRoleApi(u.email, nextRole);
                            setToast(`✅ Đã đổi quyền của ${u.email} thành [${nextRole}].`);
                            await loadDashboard();
                          } catch (err: any) {
                            setToast(`❌ ${err?.message}`);
                          }
                        }}
                        className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white font-extrabold"
                      >
                        <option value="user">Parent (Phụ huynh)</option>
                        <option value="viewer">Viewer (Chỉ xem CMS)</option>
                        <option value="editor">Editor (Biên tập nội dung)</option>
                        <option value="admin">Admin (Toàn quyền)</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Audit Logs */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <History className="w-4 h-4 text-emerald-600" />
                <span>Lịch sử Cập nhật Nội dung & Hệ thống (Audit Logs)</span>
              </h3>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>
                        <strong className="text-slate-800">{log.actorEmail}</strong> [{log.actorRole}] ·{' '}
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono">
                          {log.action}
                        </span>
                      </span>
                      <span>{log.createdAt.slice(0, 19).replace('T', ' ')}</span>
                    </div>
                    <div className="font-bold text-slate-800">{log.summary}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Create New Topic */}
      {showNewTopicModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateTopic}
            className="max-w-md w-full bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4 shadow-2xl text-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">
                + Tạo Chủ Đề / Bài Học Mới
              </h3>
              <button
                type="button"
                onClick={() => setShowNewTopicModal(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 font-bold"
              >
                Đóng
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Mã số</label>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder={String(topics.length + 1).padStart(2, '0')}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-extrabold text-slate-700 mb-1">
                  Trạng thái ban đầu
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as LewContentStatus)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                >
                  <option value="draft">Draft (Bản nháp)</option>
                  <option value="review">Review (Chờ duyệt)</option>
                  <option value="published">Published (Xuất bản luôn)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-extrabold text-slate-700 mb-1">
                Tên chủ đề tiếng Anh
              </label>
              <input
                type="text"
                required
                value={newTitleEn}
                onChange={(e) => setNewTitleEn(e.target.value)}
                placeholder="Ví dụ: Musical Instruments"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
              />
            </div>

            <div>
              <label className="block font-extrabold text-slate-700 mb-1">
                Tên chủ đề tiếng Việt
              </label>
              <input
                type="text"
                required
                value={newTitleVi}
                onChange={(e) => setNewTitleVi(e.target.value)}
                placeholder="Ví dụ: Nhạc cụ vui nhộn"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold inline-flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Tạo Chủ Đề & Mở Trình Biên Tập</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
