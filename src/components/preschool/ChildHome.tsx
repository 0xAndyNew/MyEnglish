import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Gamepad2,
  Home,
  Music,
  Plus,
  Settings,
  Sparkles,
  Trophy,
  User,
} from 'lucide-react';
import React, { useMemo, useRef, useState } from 'react';
import {
  LEW_AGE_LEVELS,
  LEW_AVATARS,
  LEW_LEVEL_ORDER,
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
import { unitCoverUrl } from '../../data/preschool/types';
import { PaginationBar, usePagination } from '../common/PaginationBar';
import { KidsProgressView } from './KidsProgressView';
import { KidsStoryTheater } from './KidsStoryTheater';
import type { LessonStepId } from './LessonFlow';
import { LewGames } from './LewGames';
import { LEW_SONGS_LIST, LewPhonicsView, LewSongsView } from './LewSongsAndPhonics';
import { ParentGate } from './shell/ParentGate';
import {
  KIDS_PASTEL_TILES,
  KidsRocketHeroBanner,
  KidsSceneShell,
  KidsStarIcon,
  kidAvatarUrl,
  kidTopicIconUrl,
} from './ui/KidsSceneShell';
import type { useKidAudio } from './ui/useKidAudio';

type BottomDockTab = 'home' | 'games' | 'progress' | 'kid';
type KidCornerSubTab = 'stories' | 'songs' | 'phonics';

interface ChildHomeProps {
  topics?: LewTopic[];
  ageLevels?: Record<LewAgeLevelId, LewAgeLevelMeta>;
  childrenList: LewChildProfile[];
  activeChild: LewChildProfile;
  earnedStickers: string[];
  completedKeys: string[];
  lessonProgress?: LewLessonProgressRecord[];
  observations?: LewObservationRecord[];
  recommendedTopic: LewTopic;
  isPreview?: boolean;
  audio: ReturnType<typeof useKidAudio>;
  onSelectChild: (childId: string) => void;
  onChangeLevel: (levelId: LewAgeLevelId) => void;
  onCreateChild: (
    name: string,
    levelId: LewAgeLevelId,
    avatar: LewAvatarId,
    extra?: { birthMonth?: number; birthYear?: number; familyLanguage?: string; interests?: string[] }
  ) => void;
  onOpenTopic: (topic: LewTopic, initialStep?: LessonStepId) => void;
  onOpenParentZone: () => void;
  onShowSplash?: () => void;
  onSpeak: (text: string) => void;
}

export const ChildHome: React.FC<ChildHomeProps> = ({
  topics = LEW_TOPICS,
  ageLevels = LEW_AGE_LEVELS,
  childrenList,
  activeChild,
  earnedStickers,
  completedKeys,
  lessonProgress = [],
  observations = [],
  recommendedTopic,
  isPreview = false,
  audio,
  onSelectChild,
  onChangeLevel,
  onCreateChild,
  onOpenTopic,
  onOpenParentZone,
  onShowSplash,
  onSpeak,
}) => {
  const levelMeta = ageLevels[activeChild.ageLevelId] || LEW_AGE_LEVELS[activeChild.ageLevelId];
  const avatarMeta = LEW_AVATARS.find((a) => a.id === activeChild.avatar) || LEW_AVATARS[0];
  const stickerSet = new Set(earnedStickers);
  const completedSet = new Set(completedKeys);

  const [dockTab, setDockTab] = useState<BottomDockTab>('home');
  const [kidSubTab, setKidSubTab] = useState<KidCornerSubTab>('stories');
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [gameTopicId, setGameTopicId] = useState<string>(recommendedTopic?.id || topics[0]?.id || '');

  const [showChildModal, setShowChildModal] = useState(false);
  const [parentGateOpen, setParentGateOpen] = useState(false);
  const [pendingGateTarget, setPendingGateTarget] = useState<'parent_zone' | 'child_modal'>(
    'parent_zone'
  );

  const [newChildName, setNewChildName] = useState('');
  const [newChildLevel, setNewChildLevel] = useState<LewAgeLevelId>('level3');
  const [newChildAvatar, setNewChildAvatar] = useState<LewAvatarId>('benny');
  const [newBirthYear, setNewBirthYear] = useState<string>('');
  const topicsSectionRef = useRef<HTMLElement | null>(null);
  const topicPagination = usePagination(topics, 6, {
    resetKey: `${activeChild.ageLevelId}-${topics.length}`,
  });

  const safeRecommended = recommendedTopic || topics[0] || LEW_TOPICS[0];
  const activeGameTopic = useMemo(
    () => topics.find((t) => t.id === gameTopicId) || safeRecommended,
    [topics, gameTopicId, safeRecommended]
  );
  const activeGameWords = useMemo(() => {
    const v = activeGameTopic.levels[activeChild.ageLevelId] || activeGameTopic.levels.level3;
    return activeGameTopic.words.slice(0, Math.max(3, v.wordCount || 4));
  }, [activeGameTopic, activeChild.ageLevelId]);

  const totalPoints = useMemo(() => {
    const completedCount = Math.max(
      completedKeys.length,
      lessonProgress.filter((p) => p.childId === activeChild.id && p.status === 'completed').length
    );
    return completedCount * 20 + earnedStickers.length * 10;
  }, [completedKeys.length, lessonProgress, activeChild.id, earnedStickers.length]);

  const requestParentZoneAccess = () => {
    if (levelMeta.isParentLed || isPreview) {
      onOpenParentZone();
      return;
    }
    setPendingGateTarget('parent_zone');
    setParentGateOpen(true);
  };

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim()) return;
    const yr = Number(newBirthYear);
    onCreateChild(newChildName.trim(), newChildLevel, newChildAvatar, {
      birthYear: yr >= 2018 && yr <= 2027 ? yr : undefined,
    });
    setNewChildName('');
    setNewBirthYear('');
    setShowChildModal(false);
  };

  const visibleTopics = showAllTopics ? topics : topicPagination.pageItems;
  const sceneVariant =
    dockTab === 'games'
      ? 'sky-meadow'
      : dockTab === 'kid' && kidSubTab === 'songs'
      ? 'music'
      : dockTab === 'kid' && kidSubTab === 'stories'
      ? 'story'
      : 'sky-soft';

  const avatarImgSrc = kidAvatarUrl(activeChild.avatar, avatarMeta.img);

  return (
    <KidsSceneShell variant={sceneVariant}>
      {/* Top Bar matching Mockup #2: Avatar + Xin chào Bé | ⭐ Points | ⚙️ Parent Zone */}
      <header className="sticky top-0 z-30 bg-white/88 backdrop-blur-md border-b-2 border-white/90 px-3.5 sm:px-6 py-2.5 shadow-xs">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center justify-between gap-2">
            {/* Child Greeting Chip */}
            <button
              type="button"
              onClick={() => setShowChildModal(true)}
              className="flex items-center gap-2.5 text-left group"
              title="Đổi hoặc thêm hồ sơ bé"
            >
              <div className="w-11 h-11 rounded-full bg-[#DFF4FF] border-2 border-[#5CC4FF] flex items-center justify-center shadow-xs overflow-hidden shrink-0 group-hover:scale-105 transition">
                <img
                  src={avatarImgSrc}
                  alt={activeChild.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-bold text-[#5C7FA6]">Xin chào,</div>
                <div className="text-base sm:text-lg font-extrabold text-[#123A6F]">
                  Bé {activeChild.name}!
                </div>
              </div>
            </button>

            {/* Right: Star Points Pill + Settings Gear */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDockTab('progress')}
                className="px-3 py-1.5 rounded-full bg-[#FFF7D1] hover:bg-[#FFEFA8] border-2 border-[#FFE074] text-[#9A5600] font-extrabold text-sm inline-flex items-center gap-1.5 shadow-2xs transition active:scale-95"
                title="Xem tiến độ & điểm thưởng"
              >
                <KidsStarIcon className="w-5 h-5" />
                <span>{totalPoints}</span>
              </button>

              <button
                type="button"
                onClick={requestParentZoneAccess}
                title="Góc phụ huynh & Giáo án"
                className="w-10 h-10 rounded-full bg-[#E3F4FF] hover:bg-[#CBE9FF] border-2 border-white text-[#1674DA] flex items-center justify-center shadow-sm active:scale-95 transition"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 5 Age Level Selector Pills (1–6 tuổi, free selection) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            {LEW_LEVEL_ORDER.map((lvId) => {
              const lv = ageLevels[lvId] || LEW_AGE_LEVELS[lvId];
              const active = lvId === activeChild.ageLevelId;
              return (
                <button
                  key={lvId}
                  type="button"
                  onClick={() => onChangeLevel(lvId)}
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-extrabold border transition ${
                    active
                      ? 'bg-[#1684F0] text-white border-[#0E69C8] shadow-xs'
                      : 'bg-[#F0F8FF] text-[#426996] border-[#D6ECFF] hover:bg-[#E0F2FF]'
                  }`}
                >
                  {lv.shortAgeVi}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area (padded for fixed bottom dock) */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-3.5 sm:px-6 pt-4 pb-28 space-y-5">
        {/* Level 1 Parent-led Gentle Reminder */}
        {levelMeta.isParentLed && dockTab === 'home' && (
          <div className="rounded-[24px] bg-[#FFF7D6]/95 border-2 border-[#FFE074] px-4 py-3 text-xs font-bold text-[#7A4B00] shadow-xs">
            👶 <strong>Chế độ Cha Mẹ Dẫn Dắt (1–2 tuổi):</strong> Cha mẹ mở bài học cùng nghe phát âm mẫu và tương tác đồ vật thật cùng bé nhé!
          </div>
        )}

        {/* TAB 1: TRANG CHỦ (EXACT MOCKUP #2) */}
        {dockTab === 'home' && (
          <>
            {/* Hero Rocket Banner: "Let's learn English!" */}
            <KidsRocketHeroBanner
              subtitle={`Hôm nay: ${safeRecommended.titleVi} (${safeRecommended.titleEn})`}
              onStart={() => onOpenTopic(safeRecommended, 2)}
            />

            {/* Topic Grid Section: "Chủ đề học tập" + "Xem tất cả >" */}
            <section ref={topicsSectionRef} className="space-y-3">
              <div className="flex items-center justify-between gap-2 px-0.5">
                <h2 className="text-lg sm:text-2xl font-extrabold text-[#123A6F]">
                  Chủ đề học tập
                </h2>
                <button
                  type="button"
                  onClick={() => setShowAllTopics((v) => !v)}
                  className="text-xs sm:text-sm font-extrabold text-[#1684F0] hover:text-[#0C64C4] inline-flex items-center gap-0.5"
                >
                  <span>{showAllTopics ? 'Thu gọn' : `Xem tất cả (${topics.length})`}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Exact 6-Color Pastel Square Topic Tiles */}
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3.5">
                {visibleTopics.map((topic, idx) => {
                  const globalIdx = showAllTopics ? idx : topicPagination.startIdx + idx;
                  const tile = KIDS_PASTEL_TILES[globalIdx % KIDS_PASTEL_TILES.length];
                  const hasSticker = stickerSet.has(topic.id);
                  const isDoneAtLevel = completedSet.has(`${topic.id}:${activeChild.ageLevelId}`);

                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => onOpenTopic(topic, 2)}
                      style={{
                        backgroundColor: tile.bg,
                        borderColor: tile.border,
                      }}
                      className="relative rounded-[24px] border-2 p-2.5 sm:p-3 flex flex-col items-center text-center gap-1.5 shadow-[0_6px_14px_-6px_rgba(18,58,111,0.18)] hover:scale-[1.03] active:scale-95 transition group"
                    >
                      {(isDoneAtLevel || hasSticker) && (
                        <span className="absolute top-1.5 right-1.5">
                          <KidsStarIcon className="w-5 h-5 drop-shadow-xs" />
                        </span>
                      )}

                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                        <img
                          src={kidTopicIconUrl(topic.id)}
                          onError={(e) => {
                            const fallback = unitCoverUrl(topic.coverSlug);
                            if (!e.currentTarget.src.endsWith(fallback)) {
                              e.currentTarget.src = fallback;
                            }
                          }}
                          alt={topic.titleEn}
                          className="w-full h-full object-contain drop-shadow-xs group-hover:scale-105 transition"
                        />
                      </div>

                      <div className="leading-tight w-full">
                        <div className="text-xs sm:text-sm font-extrabold text-[#123A6F] line-clamp-1">
                          {topic.titleVi}
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-bold text-[#486B94] line-clamp-1">
                          ({topic.titleEn})
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {!showAllTopics && (
                <PaginationBar
                  page={topicPagination.page}
                  totalPages={topicPagination.totalPages}
                  totalItems={topicPagination.totalItems}
                  startIdx={topicPagination.startIdx}
                  endIdx={topicPagination.endIdx}
                  onPageChange={topicPagination.setPage}
                  variant="kid"
                  itemLabel="chủ đề"
                  scrollTargetRef={topicsSectionRef}
                />
              )}
            </section>

            {/* Quick Fun Corners matching bottom row of mockup (Stories, Songs, Phonics) */}
            <section className="space-y-2.5">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#123A6F] px-0.5">
                Học mà chơi mỗi ngày
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setKidSubTab('stories');
                    setDockTab('kid');
                  }}
                  className="rounded-[24px] bg-gradient-to-br from-[#DDF7C8] to-[#BCEE9B] border-2 border-white p-3.5 flex items-center gap-3 shadow-sm hover:scale-[1.02] active:scale-95 transition text-left"
                >
                  <span className="w-12 h-12 rounded-2xl bg-white/90 text-[#2E9A1E] flex items-center justify-center shadow-xs shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-extrabold text-sm sm:text-base text-[#144B1A]">
                      Kể chuyện tiếng Anh
                    </div>
                    <div className="text-xs font-bold text-[#2F6D36]">
                      {topics.length} truyện tranh có giọng đọc
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setKidSubTab('songs');
                    setDockTab('kid');
                  }}
                  className="rounded-[24px] bg-gradient-to-br from-[#FFD9EC] to-[#FFBCE0] border-2 border-white p-3.5 flex items-center gap-3 shadow-sm hover:scale-[1.02] active:scale-95 transition text-left"
                >
                  <span className="w-12 h-12 rounded-2xl bg-white/90 text-[#E11D74] flex items-center justify-center shadow-xs shrink-0">
                    <Music className="w-6 h-6" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-extrabold text-sm sm:text-base text-[#7B1143]">
                      Học qua bài hát
                    </div>
                    <div className="text-xs font-bold text-[#A22961]">
                      {LEW_SONGS_LIST.length} bài hát thiếu nhi MP3
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setKidSubTab('phonics');
                    setDockTab('kid');
                  }}
                  className="rounded-[24px] bg-gradient-to-br from-[#CBEFFF] to-[#9FDEFF] border-2 border-white p-3.5 flex items-center gap-3 shadow-sm hover:scale-[1.02] active:scale-95 transition text-left"
                >
                  <span className="w-12 h-12 rounded-2xl bg-white/90 text-[#1674DA] flex items-center justify-center shadow-xs shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-extrabold text-sm sm:text-base text-[#123A6F]">
                      Chữ cái A–Z
                    </div>
                    <div className="text-xs font-bold text-[#2B649E]">
                      26 âm Phonics kèm flashcard
                    </div>
                  </div>
                </button>
              </div>
            </section>
          </>
        )}

        {/* TAB 2: TRÒ CHƠI (EXACT MOCKUP #4 STANDALONE HUB) */}
        {dockTab === 'games' && (
          <div className="space-y-4">
            {/* Quick Topic Switcher for Games */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {topics.slice(0, 12).map((t) => {
                const active = t.id === activeGameTopic.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setGameTopicId(t.id)}
                    className={`shrink-0 px-3 py-1.5 rounded-full border-2 text-xs font-extrabold inline-flex items-center gap-1.5 transition ${
                      active
                        ? 'bg-[#FF8C1A] text-white border-white shadow-sm'
                        : 'bg-white/90 text-[#123A6F] border-white hover:bg-white'
                    }`}
                  >
                    <img
                      src={kidTopicIconUrl(t.id)}
                      onError={(e) => {
                        const fallback = unitCoverUrl(t.coverSlug);
                        if (!e.currentTarget.src.endsWith(fallback)) e.currentTarget.src = fallback;
                      }}
                      alt={t.titleEn}
                      className="w-5 h-5 object-contain"
                    />
                    <span>{t.titleVi}</span>
                  </button>
                );
              })}
            </div>

            <LewGames
              key={activeGameTopic.id}
              topic={activeGameTopic}
              allTopics={topics}
              words={activeGameWords}
              levelMeta={levelMeta}
              audio={audio}
              initialMode="listen"
              onCompleteGame={() => onOpenTopic(activeGameTopic, 6)}
            />
          </div>
        )}

        {/* TAB 3: THÀNH TÍCH / TIẾN ĐỘ HỌC TẬP (EXACT MOCKUP #5) */}
        {dockTab === 'progress' && (
          <KidsProgressView
            child={activeChild}
            levelMeta={levelMeta}
            topics={topics}
            earnedStickers={earnedStickers}
            completedKeys={completedKeys}
            lessonProgress={lessonProgress}
            observations={observations}
            onOpenTopic={(t) => onOpenTopic(t, 2)}
            onSpeak={onSpeak}
          />
        )}

        {/* TAB 4: CỦA BÉ (STORIES + SONGS + PHONICS + PROFILE) */}
        {dockTab === 'kid' && (
          <div className="space-y-4">
            {/* Sub-mode Pill Selector */}
            <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-white/85 border-2 border-white shadow-sm">
              <button
                type="button"
                onClick={() => setKidSubTab('stories')}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold inline-flex items-center justify-center gap-1.5 transition ${
                  kidSubTab === 'stories'
                    ? 'bg-[#2EC24B] text-white shadow-xs'
                    : 'text-[#365D88] hover:bg-sky-50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Kể chuyện</span>
              </button>
              <button
                type="button"
                onClick={() => setKidSubTab('songs')}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold inline-flex items-center justify-center gap-1.5 transition ${
                  kidSubTab === 'songs'
                    ? 'bg-[#EC4899] text-white shadow-xs'
                    : 'text-[#365D88] hover:bg-sky-50'
                }`}
              >
                <Music className="w-4 h-4" />
                <span>Bài hát</span>
              </button>
              <button
                type="button"
                onClick={() => setKidSubTab('phonics')}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold inline-flex items-center justify-center gap-1.5 transition ${
                  kidSubTab === 'phonics'
                    ? 'bg-[#1684F0] text-white shadow-xs'
                    : 'text-[#365D88] hover:bg-sky-50'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Chữ cái A–Z</span>
              </button>
            </div>

            {kidSubTab === 'stories' && (
              <KidsStoryTheater
                topics={topics}
                ageLevelId={activeChild.ageLevelId}
                initialTopicId={safeRecommended.id}
                audio={audio}
              />
            )}
            {kidSubTab === 'songs' && <LewSongsView audio={audio} />}
            {kidSubTab === 'phonics' && <LewPhonicsView audio={audio} />}

            {/* Quick Kid & Parent Actions Card */}
            <div className="kids-glass-card rounded-[24px] p-4 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5">
                <img
                  src={avatarImgSrc}
                  alt={activeChild.name}
                  className="w-11 h-11 rounded-full bg-[#DFF4FF] object-cover border-2 border-[#66C7FF]"
                />
                <div>
                  <div className="text-sm font-extrabold text-[#123A6F]">
                    Hồ sơ: Bé {activeChild.name}
                  </div>
                  <div className="text-xs font-bold text-[#5C7FA6]">
                    {levelMeta.code} · {levelMeta.ageRangeVi}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const next = audio.voicePreset === 'teacher-warm' ? 'kid-cute' : 'teacher-warm';
                    audio.setVoicePreset(next);
                    audio.speak("Hello! Let's learn English together!", 0.88);
                  }}
                  className="px-3.5 py-2 rounded-full bg-[#FFEAF3] hover:bg-[#FFD6E8] text-[#B81D65] font-extrabold text-xs"
                  title="Đổi giọng nữ đọc tiếng Anh"
                >
                  {audio.voicePreset === 'kid-cute' ? '🌸 Giọng đọc: Cô Bella' : '👩 Giọng đọc: Cô Heart'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowChildModal(true)}
                  className="px-3.5 py-2 rounded-full bg-[#E3F4FF] hover:bg-[#CBE9FF] text-[#1674DA] font-extrabold text-xs"
                >
                  Đổi / Thêm bé
                </button>
                {onShowSplash && (
                  <button
                    type="button"
                    onClick={onShowSplash}
                    className="px-3.5 py-2 rounded-full bg-[#FFF3B8] hover:bg-[#FFE680] text-[#9A5600] font-extrabold text-xs"
                  >
                    Màn hình chào
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Fixed Bottom Navigation Dock matching Mockup #2 (Trang chủ | Trò chơi | Thành tích | Của bé) */}
      <nav
        aria-label="Điều hướng chính cho bé"
        className="fixed bottom-0 inset-x-0 z-40 px-3 pb-3 pt-1 pointer-events-none"
      >
        <div className="pointer-events-auto max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-[26px] border-2 border-[#DDF1FF] shadow-[0_10px_30px_-6px_rgba(18,58,111,0.28)] grid grid-cols-4 p-1.5">
          {(
            [
              { id: 'home', label: 'Trang chủ', icon: Home },
              { id: 'games', label: 'Trò chơi', icon: Gamepad2 },
              { id: 'progress', label: 'Thành tích', icon: Trophy },
              { id: 'kid', label: 'Của bé', icon: User },
            ] as const
          ).map((item) => {
            const Icon = item.icon;
            const active = dockTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  audio.stopAll();
                  setDockTab(item.id);
                }}
                className={`py-2 px-1 rounded-[20px] flex flex-col items-center justify-center gap-0.5 transition ${
                  active
                    ? 'bg-[#E3F4FF] text-[#1684F0] font-extrabold'
                    : 'text-[#6A88A9] hover:text-[#1674DA] font-bold'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'scale-110 stroke-[2.6]' : ''}`} />
                <span className="text-[11px] leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Two-step Child-Safe Parent Gate */}
      <ParentGate
        isOpen={parentGateOpen}
        onClose={() => setParentGateOpen(false)}
        onUnlock={() => {
          setParentGateOpen(false);
          if (pendingGateTarget === 'parent_zone') {
            onOpenParentZone();
          } else {
            setShowChildModal(true);
          }
        }}
      />

      {/* Child Profile Switcher / Creator Modal */}
      {showChildModal && (
        <div className="fixed inset-0 z-50 bg-[#0D2B4F]/55 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-[32px] border-4 border-[#9CE0FF] p-5 sm:p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-[#123A6F]">
                👶 Chọn hoặc Thêm Hồ Sơ Bé
              </h3>
              <button
                type="button"
                onClick={() => setShowChildModal(false)}
                className="px-3 py-1 rounded-full bg-[#EEF7FF] text-xs font-extrabold text-[#486B94]"
              >
                Đóng
              </button>
            </div>

            <div className="space-y-2">
              {childrenList.map((c) => {
                const lv = ageLevels[c.ageLevelId] || LEW_AGE_LEVELS[c.ageLevelId];
                const av = LEW_AVATARS.find((a) => a.id === c.avatar) || LEW_AVATARS[0];
                const active = c.id === activeChild.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      onSelectChild(c.id);
                      setShowChildModal(false);
                    }}
                    className={`w-full p-3 rounded-2xl border-2 flex items-center justify-between transition ${
                      active
                        ? 'bg-[#E8F6FF] border-[#2498F8]'
                        : 'bg-white border-[#E3F1FC] hover:border-[#9CE0FF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={kidAvatarUrl(c.avatar, av.img)}
                        alt={c.name}
                        className="w-11 h-11 rounded-full object-cover bg-[#DFF4FF]"
                      />
                      <div className="text-left">
                        <div className="font-extrabold text-[#123A6F] text-sm">
                          Bé {c.name}
                          {c.birthYear ? ` (${c.birthYear})` : ''}
                        </div>
                        <div className="text-xs font-bold text-[#5C7FA6]">
                          {lv.code} · {lv.name} ({lv.ageRangeVi})
                        </div>
                      </div>
                    </div>
                    {active && <CheckCircle2 className="w-5 h-5 text-[#1684F0]" />}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleAddChild} className="pt-3 border-t border-[#E3F1FC] space-y-3">
              <div className="text-xs font-extrabold text-[#123A6F] flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#2EC24B]" />
                <span>Thêm hồ sơ bé mới</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  required
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  placeholder="Tên bé (An, Bông...)"
                  className="col-span-2 px-3.5 py-2.5 rounded-xl border-2 border-[#DCEEFF] text-xs font-bold text-[#123A6F]"
                />
                <input
                  type="number"
                  min={2019}
                  max={2027}
                  value={newBirthYear}
                  onChange={(e) => setNewBirthYear(e.target.value)}
                  placeholder="Năm sinh"
                  className="px-3 py-2.5 rounded-xl border-2 border-[#DCEEFF] text-xs font-bold text-[#123A6F]"
                />
              </div>

              <div className="grid grid-cols-5 gap-1.5">
                {LEW_LEVEL_ORDER.map((lvId) => {
                  const lv = ageLevels[lvId] || LEW_AGE_LEVELS[lvId];
                  return (
                    <button
                      key={lvId}
                      type="button"
                      onClick={() => setNewChildLevel(lvId)}
                      className={`py-2 rounded-xl border-2 text-[11px] font-extrabold ${
                        newChildLevel === lvId
                          ? 'bg-[#1684F0] text-white border-[#0C5BB8]'
                          : 'bg-[#F4FAFF] text-[#4B6F99] border-[#DCEEFF]'
                      }`}
                    >
                      {lv.shortAgeVi}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {LEW_AVATARS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setNewChildAvatar(av.id)}
                    className={`p-2 rounded-xl border-2 flex flex-col items-center gap-1 ${
                      newChildAvatar === av.id
                        ? 'border-[#1684F0] bg-[#E8F6FF]'
                        : 'border-[#DCEEFF]'
                    }`}
                  >
                    <img
                      src={kidAvatarUrl(av.id, av.img)}
                      alt={av.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <span className="text-[11px] font-bold text-[#123A6F]">{av.name}</span>
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="kids-btn-blue w-full py-3 rounded-full text-white font-extrabold text-sm"
              >
                + Tạo hồ sơ bé
              </button>
            </form>
          </div>
        </div>
      )}
    </KidsSceneShell>
  );
};
