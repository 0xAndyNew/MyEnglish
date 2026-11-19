import { BookOpen, CheckCircle2, Music, Play, Plus, Sliders, Sparkles, Users, Volume2 } from 'lucide-react';
import React, { useRef, useState } from 'react';
import {
  LEW_AGE_LEVELS,
  LEW_AVATARS,
  LEW_LEVEL_ORDER,
} from '../../data/preschool/lewLevels';
import { LEW_TOPICS } from '../../data/preschool/lewTopics';
import type {
  LewAgeLevelId,
  LewAvatarId,
  LewChildProfile,
  LewTopic,
} from '../../data/preschool/lewTypes';
import { unitCoverUrl, wordImageUrl } from '../../data/preschool/types';
import { PaginationBar, usePagination } from '../common/PaginationBar';
import type { LessonStepId } from './LessonFlow';
import { LEW_SONGS_LIST, LewPhonicsView, LewSongsView } from './LewSongsAndPhonics';
import type { useKidAudio } from './ui/useKidAudio';

interface ChildHomeProps {
  childrenList: LewChildProfile[];
  activeChild: LewChildProfile;
  earnedStickers: string[];
  completedKeys: string[];
  recommendedTopic: LewTopic;
  audio: ReturnType<typeof useKidAudio>;
  onSelectChild: (childId: string) => void;
  onChangeLevel: (levelId: LewAgeLevelId) => void;
  onCreateChild: (name: string, levelId: LewAgeLevelId, avatar: LewAvatarId) => void;
  onOpenTopic: (topic: LewTopic, initialStep?: LessonStepId) => void;
  onOpenParentZone: () => void;
  onSpeak: (text: string) => void;
}

export const ChildHome: React.FC<ChildHomeProps> = ({
  childrenList,
  activeChild,
  earnedStickers,
  completedKeys,
  recommendedTopic,
  audio,
  onSelectChild,
  onChangeLevel,
  onCreateChild,
  onOpenTopic,
  onOpenParentZone,
  onSpeak,
}) => {
  const levelMeta = LEW_AGE_LEVELS[activeChild.ageLevelId];
  const avatarMeta = LEW_AVATARS.find((a) => a.id === activeChild.avatar) || LEW_AVATARS[0];
  const stickerSet = new Set(earnedStickers);
  const completedSet = new Set(completedKeys);

  const [homeTab, setHomeTab] = useState<'topics' | 'songs' | 'phonics'>('topics');
  const [showChildModal, setShowChildModal] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildLevel, setNewChildLevel] = useState<LewAgeLevelId>('level3');
  const [newChildAvatar, setNewChildAvatar] = useState<LewAvatarId>('benny');
  const topicsSectionRef = useRef<HTMLElement | null>(null);
  const topicPagination = usePagination(LEW_TOPICS, 6, { resetKey: activeChild.ageLevelId });

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim()) return;
    onCreateChild(newChildName.trim(), newChildLevel, newChildAvatar);
    setNewChildName('');
    setShowChildModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] font-kid pb-12">
      {/* Top Bar: Child Switcher + 5 Age Levels + Parent Zone Button */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b-2 border-amber-100 px-4 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Active Child Chip */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowChildModal(true)}
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 transition"
              title="Đổi hoặc thêm hồ sơ bé"
            >
              <img
                src={avatarMeta.img}
                alt={activeChild.name}
                className="w-10 h-10 rounded-full bg-white p-0.5 object-contain border border-amber-300"
              />
              <div className="text-left">
                <div className="text-base font-extrabold text-slate-900 leading-tight flex items-center gap-1">
                  <span>Bé {activeChild.name}</span>
                  <Users className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <div className="text-[11px] font-bold text-amber-700">
                  {levelMeta.code} · {levelMeta.ageRangeVi}
                </div>
              </div>
            </button>
          </div>

          {/* 5 Age Level Selector Pills (Never locked — parents choose freely) */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {LEW_LEVEL_ORDER.map((lvId) => {
              const lv = LEW_AGE_LEVELS[lvId];
              const active = lvId === activeChild.ageLevelId;
              return (
                <button
                  key={lvId}
                  type="button"
                  onClick={() => onChangeLevel(lvId)}
                  style={active ? { backgroundColor: lv.color } : undefined}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-extrabold transition ${
                    active
                      ? 'text-white shadow-sm scale-105'
                      : 'bg-slate-100 text-slate-600 hover:bg-amber-100'
                  }`}
                >
                  {lv.shortAgeVi}
                </button>
              );
            })}
          </div>

          {/* Right: Sticker count & Parent Zone */}
          <div className="flex items-center gap-2">
            <div className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-sm flex items-center gap-1.5">
              <img
                src="/preschool/img/ui/dock-stickers.webp"
                alt="Stickers"
                className="w-5 h-5 object-contain"
              />
              <span>{earnedStickers.length}/{LEW_TOPICS.length}</span>
            </div>

            <button
              type="button"
              onClick={onOpenParentZone}
              className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-xs"
            >
              <Sliders className="w-4 h-4 text-amber-300" />
              <span>Góc Cha Mẹ & Giáo Án</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-5 space-y-6">
        {/* Level 1 (1–2 years old) Parent-led Mode Banner */}
        {levelMeta.isParentLed && (
          <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-sm font-extrabold text-amber-900 flex items-center gap-2">
                <span>👶 Chế độ Cha Mẹ Dẫn Dắt — Level 1: Little Listener (1–2 tuổi)</span>
              </div>
              <p className="text-xs font-semibold text-amber-800 leading-relaxed">
                Theo khuyến nghị WHO, trẻ 1–2 tuổi không tự ngồi xem màn hình một mình. Cha mẹ hãy mở từng chủ đề bên dưới để nghe phát âm mẫu, xem kịch bản nói với con và tổ chức trò chơi với đồ vật thật.
              </p>
            </div>
          </div>
        )}

        {/* Hero Recommendation Card with Benny & Toto */}
        <section
          className="rounded-[36px] border-4 p-5 sm:p-7 shadow-md flex flex-col lg:flex-row items-center justify-between gap-6"
          style={{
            backgroundColor: recommendedTopic.softBg,
            borderColor: `${recommendedTopic.color}44`,
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div
              className="relative shrink-0 w-full sm:w-64 h-44 sm:h-48 rounded-[28px] overflow-hidden border-4 border-white bg-white p-1.5 shadow-lg flex items-center justify-center"
            >
              <img
                src={unitCoverUrl(recommendedTopic.coverSlug)}
                alt={recommendedTopic.titleEn}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-xs font-extrabold text-slate-700 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  Gợi ý hôm nay cho {activeChild.name} · {levelMeta.name} ({levelMeta.ageRangeVi})
                </span>
              </div>

              <button
                type="button"
                onClick={() => onSpeak(recommendedTopic.titleEn)}
                className="flex items-center justify-center sm:justify-start gap-2 text-2xl sm:text-4xl font-extrabold text-slate-900 hover:opacity-80"
              >
                <span>
                  {recommendedTopic.code}. {recommendedTopic.titleEn} — {recommendedTopic.titleVi}
                </span>
                <Volume2 className="w-6 h-6 text-amber-600 shrink-0" />
              </button>

              <p className="text-xs sm:text-sm font-bold text-slate-600">
                🎯 {recommendedTopic.levels[activeChild.ageLevelId].objectiveVi}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenTopic(recommendedTopic, 5)}
              className="px-5 py-3.5 rounded-full bg-white hover:bg-amber-50 border-2 border-slate-200 text-slate-800 font-extrabold text-sm inline-flex items-center gap-2 shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Giáo án cha mẹ</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenTopic(recommendedTopic, 1)}
              style={{ backgroundColor: recommendedTopic.color }}
              className="kid-btn-3d px-7 py-4 rounded-full text-white font-extrabold text-xl inline-flex items-center gap-2.5 shadow-lg"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>{levelMeta.isParentLed ? 'Cùng chơi & Khởi động' : 'Bắt đầu học ngay'}</span>
            </button>
          </div>
        </section>

        {/* Sub-mode Quick Switcher: 24 Topics | 12 MP3 Songs | 26 Phonics Letters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setHomeTab('topics')}
            className={`px-4 py-2.5 rounded-2xl border-2 text-sm font-extrabold inline-flex items-center gap-2 transition ${
              homeTab === 'topics'
                ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>🗺️ {LEW_TOPICS.length} Chủ đề học tập</span>
          </button>

          <button
            type="button"
            onClick={() => setHomeTab('songs')}
            className={`px-4 py-2.5 rounded-2xl border-2 text-sm font-extrabold inline-flex items-center gap-2 transition ${
              homeTab === 'songs'
                ? 'bg-pink-500 text-white border-pink-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-pink-300'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>🎵 Phòng Hát ({LEW_SONGS_LIST.length} bài MP3)</span>
          </button>

          <button
            type="button"
            onClick={() => setHomeTab('phonics')}
            className={`px-4 py-2.5 rounded-2xl border-2 text-sm font-extrabold inline-flex items-center gap-2 transition ${
              homeTab === 'phonics'
                ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>🔤 Chữ cái A–Z (Phonics)</span>
          </button>
        </div>

        {homeTab === 'songs' && <LewSongsView audio={audio} />}
        {homeTab === 'phonics' && <LewPhonicsView audio={audio} />}

        {/* 24 Core Topics Grid (Learning Map — Zero locks, 1-tap access) */}
        {homeTab === 'topics' && (
        <section ref={topicsSectionRef} className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                🗺️ Thế giới {LEW_TOPICS.length} Chủ đề ({levelMeta.name} · {levelMeta.ageRangeVi})
              </h2>
              <p className="text-xs font-bold text-slate-500">
                Tất cả {LEW_TOPICS.length} chủ đề đều mở tự do — chạm vào chủ đề hoặc nút Cùng chơi để bắt đầu từ Khởi động.
              </p>
            </div>
            <div className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-amber-100 text-amber-900">
              Trang {topicPagination.page}/{topicPagination.totalPages} ({topicPagination.startIdx + 1}–{topicPagination.endIdx} / {topicPagination.totalItems})
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topicPagination.pageItems.map((topic) => {
              const lvVar = topic.levels[activeChild.ageLevelId];
              const topicWords = topic.words.slice(0, lvVar.wordCount);
              const hasSticker = stickerSet.has(topic.id);
              const isDoneAtLevel = completedSet.has(`${topic.id}:${activeChild.ageLevelId}`);

              return (
                <div
                  key={topic.id}
                  className="rounded-[28px] bg-white border-3 border-slate-100 hover:border-amber-300 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between"
                >
                  {/* Clean White-Framed Topic Flashcard Cover Header (No Cropping) */}
                  <button
                    type="button"
                    onClick={() => onOpenTopic(topic, 1)}
                    className="w-full text-left group"
                  >
                    <div
                      className="relative w-full h-44 sm:h-48 bg-white p-3 pt-10 flex items-center justify-center overflow-hidden border-b border-slate-100"
                    >
                      <img
                        src={unitCoverUrl(topic.coverSlug)}
                        alt={topic.titleEn}
                        className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                      />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-extrabold text-white shadow-sm"
                          style={{ backgroundColor: topic.color }}
                        >
                          Chủ đề {topic.code}
                        </span>
                        {isDoneAtLevel ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-extrabold inline-flex items-center gap-1 shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Đã học
                          </span>
                        ) : hasSticker ? (
                          <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-extrabold shadow-sm">
                            Đã có Sticker
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div
                      className="px-4 py-2.5 border-b border-slate-100"
                      style={{ backgroundColor: topic.softBg }}
                    >
                      <h3 className="text-xl font-extrabold leading-tight text-slate-900">
                        {topic.titleEn}
                      </h3>
                      <div className="text-xs font-bold text-slate-600">{topic.titleVi}</div>
                    </div>
                  </button>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    {/* Preview of words with crisp centered flashcard thumbnails */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {topicWords.slice(0, 5).map((w) => (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => onSpeak(w.word)}
                          className="pl-1 pr-2.5 py-1 rounded-full bg-slate-50 hover:bg-amber-50 border border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-700"
                        >
                          <img
                            src={wordImageUrl(w.imageSlug)}
                            alt={w.word}
                            className="w-7 h-7 rounded-full object-contain bg-white p-0.5 border border-slate-100 shrink-0"
                          />
                          <span>{w.word}</span>
                        </button>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onOpenTopic(topic, 5)}
                        className="py-2.5 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs inline-flex items-center justify-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Giáo án cha mẹ</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenTopic(topic, 1)}
                        style={{ backgroundColor: topic.color }}
                        className="py-2.5 px-3 rounded-2xl text-white font-extrabold text-xs inline-flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{levelMeta.isParentLed ? 'Cùng chơi' : 'Vào bài học'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

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
        </section>
        )}
      </main>

      {/* Child Profile Switcher / Creator Modal */}
      {showChildModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border-4 border-amber-200 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900">
                👶 Chọn hoặc Thêm Hồ Sơ Bé
              </h3>
              <button
                type="button"
                onClick={() => setShowChildModal(false)}
                className="px-3 py-1 rounded-xl bg-slate-100 text-xs font-bold text-slate-600"
              >
                Đóng
              </button>
            </div>

            <div className="space-y-2">
              {childrenList.map((c) => {
                const lv = LEW_AGE_LEVELS[c.ageLevelId];
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
                      active ? 'bg-amber-50 border-amber-400' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={av.img} alt={c.name} className="w-11 h-11 rounded-full object-contain bg-amber-50" />
                      <div className="text-left">
                        <div className="font-extrabold text-slate-900 text-sm">Bé {c.name}</div>
                        <div className="text-xs font-bold text-slate-500">
                          {lv.code} · {lv.name} ({lv.ageRangeVi})
                        </div>
                      </div>
                    </div>
                    {active && <CheckCircle2 className="w-5 h-5 text-amber-600" />}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleAddChild} className="pt-3 border-t border-slate-200 space-y-3">
              <div className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>Thêm hồ sơ bé mới (anh/chị/em trong nhà)</span>
              </div>

              <input
                type="text"
                required
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                placeholder="Tên gọi ở nhà của bé (ví dụ: Bông, Sóc...)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
              />

              <div className="grid grid-cols-5 gap-1.5">
                {LEW_LEVEL_ORDER.map((lvId) => {
                  const lv = LEW_AGE_LEVELS[lvId];
                  return (
                    <button
                      key={lvId}
                      type="button"
                      onClick={() => setNewChildLevel(lvId)}
                      className={`py-2 rounded-xl border text-[11px] font-extrabold ${
                        newChildLevel === lvId
                          ? 'bg-amber-400 text-slate-900 border-amber-500'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
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
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1 ${
                      newChildAvatar === av.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-slate-200'
                    }`}
                  >
                    <img src={av.img} alt={av.name} className="w-9 h-9 object-contain" />
                    <span className="text-[11px] font-bold">{av.name}</span>
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs"
              >
                + Tạo hồ sơ bé
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
