import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ChartBar,
  CheckCircle2,
  Database,
  FastForward,
  LogOut,
  Play,
  Plus,
  Printer,
  Save,
  Sliders,
  Trash2,
  Turtle,
  UserCheck,
  Users,
  Volume2,
  X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  LEW_AGE_LEVELS,
  LEW_AVATARS,
  LEW_LEVEL_ORDER,
  LEW_OBSERVATION_META,
  type LewAgeLevelMeta,
} from '../../data/preschool/lewLevels';
import { LEW_TOPICS } from '../../data/preschool/lewTopics';
import type {
  LewAgeLevelId,
  LewAvatarId,
  LewChildProfile,
  LewLessonProgressRecord,
  LewObservationRecord,
  LewTopic,
} from '../../data/preschool/lewTypes';
import { unitCoverUrl, wordImageUrl } from '../../data/preschool/types';
import { PaginationBar, usePagination } from '../common/PaginationBar';
import { kidAvatarUrl } from './ui/KidsSceneShell';

const INTEREST_OPTIONS = [
  'Động vật',
  'Bài hát & Nhịp điệu',
  'Truyện tranh',
  'Vận động ngoài trời',
  'Màu sắc & Vẽ tranh',
  'Xe cộ & Đồ chơi',
  'Thiên nhiên',
  'Đồ ăn & Trái cây',
];

interface LewParentZoneProps {
  topics?: LewTopic[];
  ageLevels?: Record<LewAgeLevelId, LewAgeLevelMeta>;
  childrenList: LewChildProfile[];
  activeChild: LewChildProfile;
  completedKeys: string[];
  earnedStickers: string[];
  observations: LewObservationRecord[];
  lessonProgress?: LewLessonProgressRecord[];
  recommendedTopic?: LewTopic;
  canAccessCms?: boolean;
  isPreview?: boolean;
  onBackToKid: () => void;
  onSelectChild: (childId: string) => void;
  onChangeLevel: (levelId: LewAgeLevelId) => void;
  onCreateChild?: (
    name: string,
    levelId: LewAgeLevelId,
    avatar: LewAvatarId,
    extra?: { birthMonth?: number; birthYear?: number; familyLanguage?: string; interests?: string[] }
  ) => void;
  onUpdateChild?: (childId: string, patch: Partial<LewChildProfile>) => void;
  onDeleteChild?: (childId: string) => void;
  onToggleOfflineDone?: (topicId: string) => void;
  onSkipRecommendedTopic?: (topicId: string) => void;
  onOpenTopicLesson: (topic: LewTopic) => void;
  onOpenCms?: () => void;
  onOpenProfileModal: () => void;
  onExitPreview?: () => void;
  onLogout: () => void;
  onSpeak: (text: string, rate?: number) => void;
}

export const LewParentZone: React.FC<LewParentZoneProps> = ({
  topics = LEW_TOPICS,
  ageLevels = LEW_AGE_LEVELS,
  childrenList,
  activeChild,
  completedKeys,
  earnedStickers,
  observations,
  lessonProgress = [],
  recommendedTopic,
  canAccessCms = false,
  isPreview = false,
  onBackToKid,
  onSelectChild,
  onChangeLevel,
  onCreateChild,
  onUpdateChild,
  onDeleteChild,
  onToggleOfflineDone,
  onSkipRecommendedTopic,
  onOpenTopicLesson,
  onOpenCms,
  onOpenProfileModal,
  onExitPreview,
  onLogout,
  onSpeak,
}) => {
  const [tab, setTab] = useState<'guides' | 'reports' | 'profiles' | 'levels'>('guides');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics[0]?.id || LEW_TOPICS[0].id);
  const [printModeTopic, setPrintModeTopic] = useState<LewTopic | null>(null);
  const [profileSaveMsg, setProfileSaveMsg] = useState<string | null>(null);

  // Child edit form state
  const [editName, setEditName] = useState(activeChild.name);
  const [editMonth, setEditMonth] = useState<string>(activeChild.birthMonth ? String(activeChild.birthMonth) : '');
  const [editYear, setEditYear] = useState<string>(activeChild.birthYear ? String(activeChild.birthYear) : '');
  const [editLevel, setEditLevel] = useState<LewAgeLevelId>(activeChild.ageLevelId);
  const [editAvatar, setEditAvatar] = useState<LewAvatarId>(activeChild.avatar);
  const [editLang, setEditLang] = useState<string>(activeChild.familyLanguage || 'Tiếng Việt');
  const [editInterests, setEditInterests] = useState<string[]>(activeChild.interests || []);

  // New child form state
  const [newName, setNewName] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newLevel, setNewLevel] = useState<LewAgeLevelId>('level3');
  const [newAvatar, setNewAvatar] = useState<LewAvatarId>('toto');

  useEffect(() => {
    setEditName(activeChild.name);
    setEditMonth(activeChild.birthMonth ? String(activeChild.birthMonth) : '');
    setEditYear(activeChild.birthYear ? String(activeChild.birthYear) : '');
    setEditLevel(activeChild.ageLevelId);
    setEditAvatar(activeChild.avatar);
    setEditLang(activeChild.familyLanguage || 'Tiếng Việt');
    setEditInterests(activeChild.interests || []);
    setProfileSaveMsg(null);
  }, [activeChild]);

  const levelMeta = ageLevels[activeChild.ageLevelId] || LEW_AGE_LEVELS[activeChild.ageLevelId];
  const selectedTopicIdx = Math.max(0, topics.findIndex((t) => t.id === selectedTopicId));
  const selectedTopic = topics[selectedTopicIdx] || topics[0] || LEW_TOPICS[0];
  const childObs = observations.filter((o) => o.childId === activeChild.id);
  const childProg = lessonProgress.filter((p) => p.childId === activeChild.id);

  const guideTopicPagination = usePagination(topics, 8, { activeIndex: selectedTopicIdx });
  const obsPagination = usePagination(childObs, 5, { resetKey: activeChild.id });

  const needsReviewTopics = topics.filter((t) =>
    childObs.some((o) => o.topicId === t.id && o.observations.includes('needs_review'))
  );

  // Calculate engagement stats for active child (Section 13)
  const startedCount = childProg.length || completedKeys.length;
  const completedCount = childProg.filter((p) => p.status === 'completed').length || completedKeys.length;
  const skippedCount = childProg.filter((p) => p.status === 'skipped').length;
  const offlineDoneCount = childProg.filter((p) => p.offlineActivityDone).length;
  const totalAudioReplays = childProg.reduce((sum, p) => sum + (p.audioReplays || 0), 0);
  const totalGameAttempts = childProg.reduce((sum, p) => sum + (p.gameAttempts || 0), 0);

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayProg = childProg.filter((p) => (p.updatedAt || p.startedAt || '').startsWith(todayStr));
  const weekAgoMs = Date.now() - 7 * 86400000;
  const weekProg = childProg.filter((p) => {
    const t = Date.parse(p.updatedAt || p.startedAt || '');
    return Number.isFinite(t) && t >= weekAgoMs;
  });

  const nextSuggested = recommendedTopic || topics.find((t) => !earnedStickers.includes(t.id)) || selectedTopic;
  const selectedTopicProg = childProg.find(
    (p) => p.topicId === selectedTopic.id && p.levelId === activeChild.ageLevelId
  );

  const handleSaveChildProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;
    onUpdateChild?.(activeChild.id, {
      name: editName.trim(),
      ageLevelId: editLevel,
      avatar: editAvatar,
      birthMonth: editMonth ? Number(editMonth) : undefined,
      birthYear: editYear ? Number(editYear) : undefined,
      familyLanguage: editLang.trim() || 'Tiếng Việt',
      interests: editInterests,
    });
    setProfileSaveMsg('✅ Đã lưu cập nhật hồ sơ của bé vào cơ sở dữ liệu.');
  };

  // Printable A4 Flashcard & Parent Activity Sheet View (Section 6)
  if (printModeTopic) {
    const pVar = printModeTopic.levels[activeChild.ageLevelId] || printModeTopic.levels.level3;
    const pWords = printModeTopic.words.slice(0, pVar.wordCount);
    return (
      <div className="min-h-screen bg-white text-slate-900 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Non-print toolbar */}
          <div className="print:hidden flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <div>
              <div className="text-sm font-black text-slate-900">
                🖨️ Bản in Flashcard & Phiếu Hoạt Động Gia Đình — Chủ đề {printModeTopic.code}: {printModeTopic.titleEn}
              </div>
              <div className="text-xs text-slate-600">
                Bấm nút &ldquo;In ngay / Lưu PDF&rdquo; để in ra giấy A4 cắt thành thẻ từ hoặc dán góc học tập cho bé.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs inline-flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>In ngay / Lưu PDF (A4)</span>
              </button>
              <button
                type="button"
                onClick={() => setPrintModeTopic(null)}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs inline-flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                <span>Đóng bản in</span>
              </button>
            </div>
          </div>

          {/* Printable Header */}
          <div className="border-b-2 border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Little English World · Phiếu Học Tập & Flashcard Tại Nhà
              </div>
              <h1 className="text-2xl font-black text-slate-900">
                Chủ đề {printModeTopic.code}: {printModeTopic.titleEn} — {printModeTopic.titleVi}
              </h1>
              <div className="text-xs font-semibold text-slate-600">
                Dành cho: Bé {activeChild.name} · {levelMeta.code} ({levelMeta.name} – {levelMeta.ageRangeVi})
              </div>
            </div>
            <img
              src={unitCoverUrl(printModeTopic.coverSlug)}
              alt={printModeTopic.titleEn}
              className="w-24 h-16 object-contain border border-slate-200 rounded-xl p-1"
            />
          </div>

          {/* Printable Flashcards Grid */}
          <div>
            <h2 className="text-sm font-black uppercase text-slate-700 mb-3">
              1. Bộ Thẻ Từ Vựng Cắt Rời (Flashcards — {pWords.length} từ mục tiêu)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {pWords.map((w) => (
                <div
                  key={w.id}
                  className="p-4 rounded-2xl border-2 border-dashed border-slate-400 flex flex-col items-center text-center gap-2 break-inside-avoid"
                >
                  <img
                    src={wordImageUrl(w.imageSlug)}
                    alt={w.word}
                    className="w-28 h-28 object-contain"
                  />
                  <div className="text-xl font-black text-slate-900">{w.word}</div>
                  <div className="text-xs font-semibold text-slate-600">
                    {w.ipa} · <strong>{w.meaningVi}</strong>
                  </div>
                  <div className="text-[11px] text-slate-500 italic">
                    &ldquo;{w.sampleEn}&rdquo; ({w.sampleVi})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Printable Parent Script & Offline Activity */}
          <div className="p-5 rounded-2xl border-2 border-slate-300 space-y-3 break-inside-avoid">
            <h2 className="text-sm font-black uppercase text-slate-800">
              2. Kịch Bản Dành Cho Cha Mẹ Tại Nhà (Không Cần Màn Hình)
            </h2>
            <div className="text-xs space-y-1.5">
              <p>
                <strong>• Mục tiêu:</strong> {pVar.objectiveVi}
              </p>
              <p>
                <strong>• Vật dụng chuẩn bị:</strong> {printModeTopic.parentGuide.materialsVi}
              </p>
              <p>
                <strong>• Câu tiếng Anh cha mẹ nói cùng bé:</strong>{' '}
                {printModeTopic.parentGuide.sampleSentences
                  .map((s) => `"${s.en}" (${s.vi})`)
                  .join('  |  ')}
              </p>
              <p>
                <strong>• Trò chơi thực tế trong nhà:</strong> {printModeTopic.parentGuide.offlineGameVi}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalPoints = completedCount * 20 + earnedStickers.length * 10;
  const estTotalMinutes = Math.max(10, (startedCount + completedCount) * 8);
  const estTimeLabel =
    estTotalMinutes >= 60
      ? `${Math.floor(estTotalMinutes / 60)}h${String(estTotalMinutes % 60).padStart(2, '0')}`
      : `${estTotalMinutes}p`;
  const weeklyPct = Math.min(100, Math.max(weekProg.length > 0 ? Math.round((weekProg.length / 5) * 100) : completedCount > 0 ? 40 : 0, 0));

  return (
    <div
      className="min-h-screen text-[#123A6F] font-kid"
      style={{ background: 'linear-gradient(180deg, #CFEFFF 0%, #EAF7FF 30%, #F5FAFF 100%)' }}
    >
      {/* Top Bar matching Mockup #9: Góc phụ huynh */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b-2 border-[#D7EEFF] px-4 py-3 shadow-2xs">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToKid}
            className="kids-btn-blue inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-extrabold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về lớp của Bé {activeChild.name}</span>
          </button>

          <div className="text-center">
            <div className="text-base sm:text-lg font-extrabold text-[#123A6F]">
              Góc phụ huynh
            </div>
            <div className="text-[11px] font-bold text-[#5C7FA6]">
              Kids English · Bé {activeChild.name} ({levelMeta.ageRangeVi})
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenCms && canAccessCms && (
              <button
                type="button"
                onClick={onOpenCms}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#7A4CE8] to-[#5E34C8] hover:opacity-95 text-white text-xs font-extrabold shadow-sm"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Quản trị (Admin)</span>
              </button>
            )}
            {isPreview && onExitPreview && (
              <button
                type="button"
                onClick={onExitPreview}
                className="px-3 py-2 rounded-full bg-[#123A6F] text-white text-xs font-extrabold"
              >
                Thoát Preview
              </button>
            )}
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border-2 border-[#CBE7FF] bg-white hover:bg-[#EAF6FF] text-xs font-extrabold text-[#1674DA]"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Đổi nhóm học</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border-2 border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-extrabold text-rose-700"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 sm:p-6 space-y-5">
        {/* Mockup #9 Hero Parent Overview Card */}
        <section className="kids-glass-card rounded-[32px] p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 rounded-full bg-[#DFF3FF] border-[3px] border-[#66C7FF] p-1 overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
                <img
                  src="/preschool/img/kids-ui/mommy-cutout.webp"
                  alt="Phụ huynh"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#123A6F] leading-tight">
                  Bé {activeChild.name}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#5C7FA6]">
                  {levelMeta.ageRangeVi} · {levelMeta.name}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setTab('reports')}
                className="kids-btn-green px-5 py-2 rounded-full text-white font-extrabold text-sm"
              >
                Theo dõi
              </button>
              <button
                type="button"
                onClick={() => setTab('profiles')}
                className="px-3.5 py-2 rounded-full bg-[#E5F4FF] hover:bg-[#CBE9FF] text-[#1674DA] font-extrabold text-xs inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Đổi / Thêm bé</span>
              </button>
            </div>
          </div>

          {/* 3 Compact Stat Boxes matching Mockup #9: Bài học | Thời gian | Điểm số */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
            <div className="rounded-2xl bg-[#F2F9FF] border-2 border-[#DCEEFF] p-3 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-[#123A6F]">{completedCount}</div>
              <div className="text-xs font-bold text-[#5C7FA6]">Bài học</div>
            </div>
            <div className="rounded-2xl bg-[#F2F9FF] border-2 border-[#DCEEFF] p-3 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-[#1684F0]">{estTimeLabel}</div>
              <div className="text-xs font-bold text-[#5C7FA6]">Thời gian</div>
            </div>
            <div className="rounded-2xl bg-[#FFF8DB] border-2 border-[#FFE68C] p-3 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-[#D97A00]">{totalPoints}</div>
              <div className="text-xs font-bold text-[#9A6300]">Điểm số</div>
            </div>
          </div>

          {/* Green Weekly Progress Bar matching Mockup #9 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#123A6F]">
              <span>Tiến độ tuần này</span>
              <span className="text-[#1CA337]">{weeklyPct}%</span>
            </div>
            <div className="h-3.5 rounded-full bg-[#E3F2EC] overflow-hidden border border-[#C2EBD5]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#5CE06D] to-[#2EC24B] transition-all duration-500"
                style={{ width: `${Math.max(8, weeklyPct)}%` }}
              />
            </div>
          </div>

          {/* Child & 5 Age Level Switcher Strip */}
          <div className="pt-2 border-t border-[#E3F1FC] space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-extrabold text-[#486B94]">
                <Users className="w-4 h-4 text-[#1684F0]" />
                <span>Hồ sơ bé:</span>
                {childrenList.map((c) => {
                  const av = LEW_AVATARS.find((a) => a.id === c.avatar) || LEW_AVATARS[0];
                  const active = c.id === activeChild.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => onSelectChild(c.id)}
                      className={`px-3 py-1 rounded-full border-2 text-xs font-extrabold inline-flex items-center gap-1.5 transition ${
                        active
                          ? 'bg-[#1684F0] text-white border-[#0C5BB8]'
                          : 'bg-[#F4FAFF] text-[#486B94] border-[#DCEEFF]'
                      }`}
                    >
                      <img
                        src={kidAvatarUrl(c.avatar, av.img)}
                        alt={c.name}
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span>Bé {c.name}</span>
                    </button>
                  );
                })}
              </div>
              <div className="text-xs font-bold text-[#5C7FA6]">
                Khuyến nghị: <strong className="text-[#123A6F]">{levelMeta.recommendedSessionVi}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {LEW_LEVEL_ORDER.map((lvId) => {
                const lv = ageLevels[lvId] || LEW_AGE_LEVELS[lvId];
                const active = lvId === activeChild.ageLevelId;
                return (
                  <button
                    key={lvId}
                    type="button"
                    onClick={() => onChangeLevel(lvId)}
                    className={`p-2.5 rounded-2xl border-2 text-left transition ${
                      active
                        ? 'border-[#1684F0] bg-[#E8F6FF] shadow-2xs'
                        : 'border-[#DCEEFF] bg-white hover:border-[#8AD1FF]'
                    }`}
                  >
                    <div className="text-xs font-black text-[#123A6F]">
                      {lv.code} · {lv.ageRangeVi}
                    </div>
                    <div className="text-[11px] font-bold text-[#1684F0]">{lv.name}</div>
                    <div className="text-[10px] text-[#5C7FA6] mt-0.5 line-clamp-2">{lv.mainGoalVi}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sub-navigation Tabs matching Mockup #9 style */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'guides' as const, label: `📋 Tổng quan & Giáo án (${topics.length})`, icon: BookOpen },
            { id: 'reports' as const, label: '📊 Hoạt động & Báo cáo', icon: ChartBar },
            { id: 'profiles' as const, label: `👶 Hồ sơ các bé (${childrenList.length})`, icon: UserCheck },
            { id: 'levels' as const, label: '⚙️ Cài đặt & Khung 5 Nhóm tuổi', icon: Users },
          ].map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`px-4 py-2.5 rounded-full font-extrabold text-xs inline-flex items-center gap-2 transition border-2 ${
                  active
                    ? 'bg-[#1684F0] text-white border-white shadow-md'
                    : 'bg-white border-[#DCEEFF] text-[#355B85] hover:bg-[#EAF6FF]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PARENT LESSON GUIDES & 4-WEEK MONTHLY PLAN (Section 4 & 6) */}
        {tab === 'guides' && (
          <div className="space-y-5">
            {/* 4-Week Monthly Implementation Roadmap (Section 4) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Cấu trúc triển khai mỗi chủ đề trong 4 tuần (Gợi ý cho cha mẹ tại nhà)</span>
                </div>
                <span className="text-[11px] font-bold text-slate-500">
                  Không bắt buộc các bé học cùng tốc độ — điều chỉnh linh hoạt theo sự hứng thú của con
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                  <div className="font-black text-amber-900">Tuần 1 · Làm quen</div>
                  <p className="text-slate-700 font-medium">
                    Nghe từ khóa và xem hình ảnh lớn của chủ đề <strong>{selectedTopic.titleEn}</strong> ({selectedTopic.words.slice(0, 3).map((w) => w.word).join(', ')}).
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1">
                  <div className="font-black text-sky-900">Tuần 2 · Nhận biết</div>
                  <p className="text-slate-700 font-medium">
                    Chơi Nghe & Chọn hình, Ghép cặp, Hình nào trốn mất và tìm đồ vật thật trong nhà.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
                  <div className="font-black text-purple-900">Tuần 3 · Sử dụng</div>
                  <p className="text-slate-700 font-medium">
                    Cha mẹ nói câu mẫu (&ldquo;{selectedTopic.parentGuide.sampleSentences[0]?.en}&rdquo;) và vận động Move & Say cùng bé.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                  <div className="font-black text-emerald-900">Tuần 4 · Ôn tập & Ứng dụng</div>
                  <p className="text-slate-700 font-medium">
                    Đọc truyện tranh cùng bé, chơi Xếp tranh kể chuyện và thực hành trò chơi ngoài màn hình.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Topic list */}
              <div className="bg-white rounded-3xl border border-slate-200 p-4 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-extrabold uppercase text-slate-500 px-2 pb-1">
                    <span>Chọn 1 trong {topics.length} chủ đề</span>
                    <span className="text-amber-600">
                      Trang {guideTopicPagination.page}/{guideTopicPagination.totalPages}
                    </span>
                  </div>
                  {guideTopicPagination.pageItems.map((t) => {
                    const active = t.id === selectedTopic.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTopicId(t.id)}
                        className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition ${
                          active
                            ? 'bg-amber-50 border-amber-400 font-extrabold'
                            : 'bg-white border-slate-100 hover:bg-slate-50 font-bold'
                        }`}
                      >
                        <img
                          src={unitCoverUrl(t.coverSlug)}
                          alt={t.titleEn}
                          className="w-16 h-12 rounded-xl bg-white p-1 border border-slate-100 object-contain shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-black text-slate-900 truncate">
                            {t.code}. {t.titleEn}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">{t.titleVi}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <PaginationBar
                  page={guideTopicPagination.page}
                  totalPages={guideTopicPagination.totalPages}
                  totalItems={guideTopicPagination.totalItems}
                  startIdx={guideTopicPagination.startIdx}
                  endIdx={guideTopicPagination.endIdx}
                  onPageChange={guideTopicPagination.setPage}
                  variant="kid"
                  itemLabel="chủ đề"
                  compact
                />
              </div>

              {/* Detailed Parent Lesson Plan Table (Matches Section 6 Spec) */}
              <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={unitCoverUrl(selectedTopic.coverSlug)}
                      alt={selectedTopic.titleEn}
                      className="w-24 h-16 rounded-2xl bg-white p-1 object-contain border border-amber-200"
                    />
                    <div>
                      <span className="text-xs font-extrabold text-amber-600">
                        Giáo án Phụ huynh · Chủ đề {selectedTopic.code} ({levelMeta.ageRangeVi})
                      </span>
                      <h2 className="text-xl font-black text-slate-900">
                        {selectedTopic.titleEn} — {selectedTopic.titleVi}
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPrintModeTopic(selectedTopic)}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs inline-flex items-center gap-1.5"
                    >
                      <Printer className="w-4 h-4 text-emerald-700" />
                      <span>In Flashcard & Phiếu A4</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenTopicLesson(selectedTopic)}
                      style={{ backgroundColor: selectedTopic.color }}
                      className="px-4 py-2.5 rounded-xl text-white font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Mở bài học này cùng bé</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <table className="w-full text-xs">
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <th className="w-1/4 bg-slate-50 p-3.5 text-left font-black text-slate-700 align-top">
                          Mục tiêu ({levelMeta.shortAgeVi})
                        </th>
                        <td className="p-3.5 text-slate-700 font-semibold">
                          <div>
                            {(selectedTopic.levels[activeChild.ageLevelId] || selectedTopic.levels.level3).objectiveVi}
                          </div>
                          <div className="text-emerald-700 mt-1">
                            <strong>Đầu ra kỳ vọng:</strong>{' '}
                            {(selectedTopic.levels[activeChild.ageLevelId] || selectedTopic.levels.level3).expectedOutcomeVi}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-slate-50 p-3.5 text-left font-black text-slate-700 align-top">
                          Từ mục tiêu (Bấm nghe phát âm)
                        </th>
                        <td className="p-3.5 space-y-2">
                          <div className="text-slate-700 font-semibold">
                            {selectedTopic.parentGuide.targetWordsSummaryVi}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedTopic.words
                              .slice(
                                0,
                                (selectedTopic.levels[activeChild.ageLevelId] || selectedTopic.levels.level3).wordCount
                              )
                              .map((w) => (
                                <button
                                  key={w.id}
                                  type="button"
                                  onClick={() => onSpeak(w.word, 0.85)}
                                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-800 font-bold inline-flex items-center gap-1.5"
                                >
                                  <span>{w.word}</span>
                                  <span className="text-slate-500 font-normal">{w.ipa}</span>
                                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                                </button>
                              ))}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-slate-50 p-3.5 text-left font-black text-slate-700 align-top">
                          Cha mẹ nói câu gì? (Nghe chuẩn / chậm)
                        </th>
                        <td className="p-3.5 space-y-2">
                          {selectedTopic.parentGuide.sampleSentences.map((s, i) => (
                            <div
                              key={i}
                              className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200"
                            >
                              <div>
                                <div className="font-extrabold text-slate-900">&ldquo;{s.en}&rdquo;</div>
                                <div className="text-[11px] text-slate-500">{s.vi}</div>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => onSpeak(s.en, 0.85)}
                                  className="px-2.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold inline-flex items-center gap-1"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                  <span>Chuẩn</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onSpeak(s.en, 0.65)}
                                  className="px-2 py-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-900 font-extrabold inline-flex items-center gap-1"
                                  title="Nghe tốc độ chậm"
                                >
                                  <Turtle className="w-3.5 h-3.5" />
                                  <span>Chậm</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-slate-50 p-3.5 text-left font-black text-slate-700 align-top">
                          Cha mẹ chuẩn bị
                        </th>
                        <td className="p-3.5 text-slate-700 font-semibold">
                          {selectedTopic.parentGuide.materialsVi}
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-slate-50 p-3.5 text-left font-black text-slate-700 align-top">
                          Cách hướng dẫn
                        </th>
                        <td className="p-3.5 text-slate-700 font-semibold">
                          <ol className="list-decimal list-inside space-y-1">
                            {selectedTopic.parentGuide.howToGuideVi.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ol>
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-slate-50 p-3.5 text-left font-black text-slate-700 align-top">
                          Hoạt động ngoài màn hình
                        </th>
                        <td className="p-3.5 text-emerald-900 bg-emerald-50/50 font-bold space-y-2">
                          <div>🏡 {selectedTopic.parentGuide.offlineGameVi}</div>
                          {onToggleOfflineDone && (
                            <button
                              type="button"
                              onClick={() => onToggleOfflineDone(selectedTopic.id)}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold inline-flex items-center gap-1.5 transition ${
                                selectedTopicProg?.offlineActivityDone
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                              }`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>
                                {selectedTopicProg?.offlineActivityDone
                                  ? 'Đã thực hiện hoạt động ngoài màn hình'
                                  : 'Đánh dấu đã thực hiện cùng bé'}
                              </span>
                            </button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 4-QUADRANT PROGRESS REPORT & OBSERVATIONS (Section 13) */}
        {tab === 'reports' && (
          <div className="space-y-5">
            {/* 4 Report Quadrants: Hôm nay | Tuần này | Theo kỹ năng | Gợi ý tiếp theo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Hôm nay */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-xs">
                <div className="text-xs font-extrabold uppercase text-amber-600">
                  1. Hôm nay & Mức độ tham gia
                </div>
                <div className="text-lg font-black text-slate-900">
                  Hôm nay đã mở {todayProg.length} bài · Tổng tích lũy {earnedStickers.length}/{topics.length} Sticker
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <div className="text-lg font-black text-emerald-900">{completedCount}</div>
                    <div className="font-bold text-emerald-700">Hoàn thành</div>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-sky-50 border border-sky-200">
                    <div className="text-lg font-black text-sky-900">{totalAudioReplays}</div>
                    <div className="font-bold text-sky-700">Lượt nghe audio</div>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-purple-50 border border-purple-200">
                    <div className="text-lg font-black text-purple-900">{totalGameAttempts}</div>
                    <div className="font-bold text-purple-700">Lượt chơi game</div>
                  </div>
                </div>
                <p className="text-xs text-slate-600">
                  Đã bắt đầu: <strong>{startedCount}</strong> bài · Tạm bỏ qua: <strong>{skippedCount}</strong> bài · Đã thực hành ngoài màn hình: <strong>{offlineDoneCount}</strong> chủ đề.
                </p>
              </div>

              {/* 2. Tuần này */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-xs">
                <div className="text-xs font-extrabold uppercase text-sky-600">
                  2. Tuần này (7 ngày gần nhất)
                </div>
                <div className="text-lg font-black text-slate-900">
                  Khám phá {weekProg.length} bài học trong tuần qua
                </div>
                {needsReviewTopics.length > 0 ? (
                  <div className="space-y-1.5">
                    <div className="text-xs font-extrabold text-slate-700">
                      Nội dung cha mẹ đánh dấu &ldquo;Cần gặp lại&rdquo;:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {needsReviewTopics.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => onOpenTopicLesson(t)}
                          className="px-3 py-1 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-900 text-xs font-extrabold"
                        >
                          🔁 {t.titleEn} ({t.titleVi})
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs font-semibold text-slate-600">
                    Chưa có chủ đề nào cần ôn gấp trong tuần này. Bé đang làm quen rất tự nhiên!
                  </div>
                )}
              </div>
            </div>

            {/* 3. Theo kỹ năng (Skill Expression Summary) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-black text-slate-900">
                  3. Theo kỹ năng (Ghi nhận biểu hiện thực tế của bé theo thời gian)
                </h3>
                <span className="text-[11px] font-semibold text-slate-500">
                  Không dùng một lần chơi để gắn nhãn năng lực của bé
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {(Object.keys(LEW_OBSERVATION_META) as (keyof typeof LEW_OBSERVATION_META)[]).map(
                  (code) => {
                    const meta = LEW_OBSERVATION_META[code];
                    const count = childObs.filter((o) => o.observations.includes(code)).length;
                    return (
                      <div
                        key={code}
                        className="p-3 rounded-2xl border border-slate-200 bg-slate-50 text-center space-y-1"
                      >
                        <div className="text-2xl font-black text-slate-900">{count}</div>
                        <div className="text-xs font-extrabold text-slate-700">{meta.labelVi}</div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* 4. Gợi ý tiếp theo (With Change/Skip Option per Section 13) */}
            {nextSuggested && (
              <div className="bg-white rounded-3xl border border-emerald-200 p-5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-4">
                  <img
                    src={unitCoverUrl(nextSuggested.coverSlug)}
                    alt={nextSuggested.titleEn}
                    className="w-20 h-16 rounded-2xl bg-white p-1 border border-slate-200 object-contain"
                  />
                  <div>
                    <div className="text-xs font-extrabold uppercase text-emerald-600">
                      4. Gợi ý bài học tiếp theo cho bé {activeChild.name}
                    </div>
                    <div className="text-lg font-black text-slate-900">
                      Chủ đề {nextSuggested.code}: {nextSuggested.titleEn} — {nextSuggested.titleVi}
                    </div>
                    <div className="text-xs text-slate-600">
                      🎯 {(nextSuggested.levels[activeChild.ageLevelId] || nextSuggested.levels.level3).objectiveVi}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {onSkipRecommendedTopic && (
                    <button
                      type="button"
                      onClick={() => onSkipRecommendedTopic(nextSuggested.id)}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs inline-flex items-center gap-1.5"
                    >
                      <FastForward className="w-3.5 h-3.5" />
                      <span>Đổi / Bỏ qua gợi ý này</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onOpenTopicLesson(nextSuggested)}
                    style={{ backgroundColor: nextSuggested.color }}
                    className="px-4 py-2.5 rounded-xl text-white font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Mở bài học gợi ý</span>
                  </button>
                </div>
              </div>
            )}

            {/* Observation Log */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-black text-slate-900">
                Nhật ký học tập & Ghi chú của cha mẹ ({childObs.length} bản ghi)
              </h3>
              {childObs.length === 0 ? (
                <p className="text-xs text-slate-500">
                  Chưa có ghi nhận nào. Khi hoàn thành Bước 6 của mỗi bài học, cha mẹ có thể tích chọn biểu hiện của bé để lưu vào đây.
                </p>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-2">
                    {obsPagination.pageItems.map((rec) => {
                      const top = topics.find((t) => t.id === rec.topicId);
                      return (
                        <div
                          key={rec.id}
                          className="p-3 rounded-2xl border border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-2 text-xs"
                        >
                          <div>
                            <span className="font-extrabold text-slate-900">
                              {top?.titleEn || rec.topicId}
                            </span>{' '}
                            <span className="text-slate-400">
                              ({rec.createdAt.slice(0, 10)})
                            </span>
                            {rec.parentNote && (
                              <div className="text-slate-600 mt-0.5">💬 {rec.parentNote}</div>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {rec.observations.map((c) => (
                              <span
                                key={c}
                                className="px-2 py-0.5 rounded-full text-[11px] font-bold"
                                style={{
                                  backgroundColor: LEW_OBSERVATION_META[c]?.badgeBg,
                                  color: LEW_OBSERVATION_META[c]?.badgeText,
                                }}
                              >
                                {LEW_OBSERVATION_META[c]?.labelVi}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <PaginationBar
                    page={obsPagination.page}
                    totalPages={obsPagination.totalPages}
                    totalItems={obsPagination.totalItems}
                    startIdx={obsPagination.startIdx}
                    endIdx={obsPagination.endIdx}
                    onPageChange={obsPagination.setPage}
                    variant="default"
                    itemLabel="ghi nhận"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CHILD PROFILES MANAGEMENT (Section 6 & 11) */}
        {tab === 'profiles' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Edit Active Child Profile */}
            <form
              onSubmit={handleSaveChildProfile}
              className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    👶 Hồ sơ chi tiết của Bé {activeChild.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Không thu thập họ tên thật đầy đủ, trường học hay địa chỉ của trẻ (Mục 12 An toàn trẻ em).
                  </p>
                </div>
                {childrenList.length > 1 && onDeleteChild && (
                  <button
                    type="button"
                    onClick={() => onDeleteChild(activeChild.id)}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-extrabold inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa hồ sơ này</span>
                  </button>
                )}
              </div>

              {profileSaveMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  {profileSaveMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">
                    Tên hiển thị / Tên ở nhà của bé
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">
                    Ngôn ngữ gia đình
                  </label>
                  <input
                    type="text"
                    value={editLang}
                    onChange={(e) => setEditLang(e.target.value)}
                    placeholder="Tiếng Việt / Song ngữ Việt - Anh"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">
                    Tháng sinh (Tùy chọn)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={editMonth}
                    onChange={(e) => setEditMonth(e.target.value)}
                    placeholder="1 – 12"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">
                    Năm sinh (Tùy chọn)
                  </label>
                  <input
                    type="number"
                    min={2019}
                    max={2027}
                    value={editYear}
                    onChange={(e) => setEditYear(e.target.value)}
                    placeholder="Ví dụ: 2022"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Cấp độ chương trình do phụ huynh chọn
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {LEW_LEVEL_ORDER.map((lvId) => {
                    const lv = ageLevels[lvId] || LEW_AGE_LEVELS[lvId];
                    return (
                      <button
                        key={lvId}
                        type="button"
                        onClick={() => setEditLevel(lvId)}
                        className={`p-2 rounded-xl border text-center text-xs font-extrabold ${
                          editLevel === lvId
                            ? 'bg-amber-400 text-slate-900 border-amber-500'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        <div>{lv.code}</div>
                        <div className="text-[10px] opacity-80">{lv.shortAgeVi}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Nhân vật đồng hành yêu thích
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {LEW_AVATARS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setEditAvatar(av.id)}
                      className={`p-2.5 rounded-2xl border flex items-center gap-2 ${
                        editAvatar === av.id
                          ? 'border-amber-500 bg-amber-50 font-extrabold'
                          : 'border-slate-200 font-bold'
                      }`}
                    >
                      <img src={av.img} alt={av.name} className="w-8 h-8 object-contain" />
                      <div className="text-left">
                        <div className="text-xs text-slate-900">{av.name}</div>
                        <div className="text-[10px] text-slate-500">{av.roleVi}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Sở thích của bé (Gợi ý chủ đề phù hợp)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {INTEREST_OPTIONS.map((tag) => {
                    const active = editInterests.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          setEditInterests((prev) =>
                            prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]
                          )
                        }
                        className={`px-3 py-1.5 rounded-full border text-xs font-bold transition ${
                          active
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {active ? '✓ ' : '+ '}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs inline-flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Lưu cập nhật hồ sơ bé</span>
              </button>
            </form>

            {/* Create Another Child Profile */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-black text-slate-900">
                + Thêm hồ sơ bé khác trong gia đình
              </h3>
              <p className="text-xs text-slate-500">
                Phụ huynh có thể tạo nhiều hồ sơ cho các anh/chị/em để theo dõi tiến độ và nhóm tuổi riêng biệt.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newName.trim() || !onCreateChild) return;
                  const yr = Number(newYear);
                  onCreateChild(newName.trim(), newLevel, newAvatar, {
                    birthYear: yr >= 2019 && yr <= 2027 ? yr : undefined,
                  });
                  setNewName('');
                  setNewYear('');
                }}
                className="space-y-3 text-xs"
              >
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Tên gọi ở nhà của bé mới..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
                />
                <input
                  type="number"
                  min={2019}
                  max={2027}
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  placeholder="Năm sinh (tùy chọn, ví dụ: 2023)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
                />

                <div className="grid grid-cols-5 gap-1">
                  {LEW_LEVEL_ORDER.map((lvId) => {
                    const lv = ageLevels[lvId] || LEW_AGE_LEVELS[lvId];
                    return (
                      <button
                        key={lvId}
                        type="button"
                        onClick={() => setNewLevel(lvId)}
                        className={`py-2 rounded-lg border text-[11px] font-extrabold ${
                          newLevel === lvId
                            ? 'bg-amber-400 text-slate-900 border-amber-500'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {lv.shortAgeVi}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {LEW_AVATARS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setNewAvatar(av.id)}
                      className={`p-2 rounded-xl border flex items-center gap-2 ${
                        newAvatar === av.id ? 'border-amber-500 bg-amber-50' : 'border-slate-200'
                      }`}
                    >
                      <img src={av.img} alt={av.name} className="w-7 h-7 object-contain" />
                      <span className="font-bold">{av.name}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold"
                >
                  + Tạo hồ sơ bé mới
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: 5 AGE LEVELS MATRIX & WHO GUIDELINES */}
        {tab === 'levels' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-black text-slate-900">
              Khung phát triển kỹ năng theo 5 Nhóm tuổi ({levelMeta.code} đang chọn)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <strong>Listening (Nghe hiểu):</strong> {levelMeta.skillsVi.listening}
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <strong>Speaking (Phản hồi / Nói):</strong> {levelMeta.skillsVi.speaking}
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <strong>Vocabulary (Từ vựng):</strong> {levelMeta.skillsVi.vocabulary}
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <strong>Early Literacy (Làm quen đọc sớm):</strong> {levelMeta.skillsVi.literacy}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <strong>Lưu ý thời lượng màn hình (Tham chiếu WHO & NAEYC):</strong>
              <p>
                • Nhóm 1 tuổi: Không khuyến nghị thời gian màn hình tĩnh độc lập; ứng dụng đóng vai trò công cụ phát audio và gợi ý hoạt động cho cha mẹ.
                <br />• Nhóm 2–4 tuổi: Tổng thời gian màn hình từ mọi nguồn không quá 1 giờ/ngày, càng ít càng tốt, luôn có cha mẹ đồng hành.
                <br />• Nhóm 5–6 tuổi: Thiết kế phiên học ngắn 10–15 phút, ưu tiên đóng vai, kể chuyện theo tranh và hoạt động thực tế ngoài màn hình.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
