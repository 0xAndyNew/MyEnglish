import { BookOpen, ChevronLeft, ChevronRight, Pause, Play, Volume2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { LewAgeLevelId, LewTopic } from '../../data/preschool/lewTypes';
import { unitCoverUrl, wordImageUrl } from '../../data/preschool/types';
import { KIDS_PASTEL_TILES, KidsStarIcon, KidsStoryForestBackdrop, kidTopicIconUrl } from './ui/KidsSceneShell';
import type { useKidAudio } from './ui/useKidAudio';

interface KidsStoryTheaterProps {
  topics: LewTopic[];
  ageLevelId: LewAgeLevelId;
  initialTopicId?: string;
  audio: ReturnType<typeof useKidAudio>;
}

export const KidsStoryTheater: React.FC<KidsStoryTheaterProps> = ({
  topics,
  ageLevelId,
  initialTopicId,
  audio,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    initialTopicId || topics[0]?.id || ''
  );
  const [pageIdx, setPageIdx] = useState(0);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const [showBookShelf, setShowBookShelf] = useState(false);

  const currentTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];
  const variant = currentTopic?.levels[ageLevelId] || currentTopic?.levels.level3;
  const pages = variant?.storyPages?.length
    ? variant.storyPages
    : currentTopic?.words.slice(0, 4).map((w) => ({
        imageSlug: w.imageSlug,
        en: w.sampleEn,
        vi: w.sampleVi,
      })) || [];

  const safeIdx = Math.min(pageIdx, Math.max(0, pages.length - 1));
  const currentPage = pages[safeIdx];

  useEffect(() => {
    setPageIdx(0);
    setAutoPlaying(false);
    audio.stopAll();
  }, [selectedTopicId]);

  useEffect(() => {
    if (!autoPlaying || !currentPage) return;
    audio.speak(currentPage.en, 0.82, () => {
      if (safeIdx < pages.length - 1) {
        setPageIdx((i) => i + 1);
      } else {
        setAutoPlaying(false);
      }
    });
  }, [autoPlaying, safeIdx, currentTopic?.id]);

  useEffect(() => {
    return () => {
      audio.stopAll();
    };
  }, []);

  if (!currentTopic || !currentPage) return null;

  const progressPct = Math.round(((safeIdx + 1) / Math.max(1, pages.length)) * 100);

  return (
    <div className="space-y-4">
      {/* Main Storybook Stage matching Mockup #7 */}
      <div className="kids-glass-card rounded-[32px] p-3.5 sm:p-5 space-y-4">
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-3 py-1 rounded-full bg-[#E3F5FF] text-[#1474DB] font-extrabold text-xs shrink-0">
              📖 Truyện {currentTopic.code}
            </span>
            <h3 className="font-extrabold text-base sm:text-lg text-[#123A6F] truncate">
              {currentTopic.titleEn} — {currentTopic.titleVi}
            </h3>
          </div>
          <span className="text-xs font-extrabold text-[#5C7FA6] shrink-0">
            Trang {safeIdx + 1}/{pages.length}
          </span>
        </div>

        {/* Lush Fairytale Forest Scene Frame */}
        <KidsStoryForestBackdrop>
          <button
            type="button"
            onClick={() => audio.speak(currentPage.en, 0.82)}
            className="w-full py-6 px-4 flex flex-col items-center justify-center gap-2 group"
          >
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-[30px] bg-white/95 border-4 border-white shadow-xl p-4 flex items-center justify-center group-hover:scale-[1.03] transition">
              <img
                src={wordImageUrl(currentPage.imageSlug)}
                alt={currentPage.en}
                className="w-full h-full object-contain"
              />
            </div>
          </button>
        </KidsStoryForestBackdrop>

        {/* Cream-Yellow Story Subtitle & Audio Player Bar matching Mockup #7 */}
        <div className="rounded-[26px] bg-[#FFFDF0] border-2 border-[#FFE9A3] p-4 sm:p-5 space-y-4 shadow-xs">
          <button
            type="button"
            onClick={() => audio.speak(currentPage.en, 0.82)}
            className="w-full flex items-start gap-2.5 text-left group"
          >
            <KidsStarIcon className="w-6 h-6 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <div className="font-extrabold text-lg sm:text-2xl text-[#143A6B] group-hover:text-[#1684F0] transition leading-snug">
                {currentPage.en}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#6A7F99]">{currentPage.vi}</div>
            </div>
            <Volume2 className="w-5 h-5 text-[#1684F0] shrink-0 mt-1" />
          </button>

          {/* Audio Player Bar: Play button + Blue progress bar + Book Picker */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (autoPlaying) {
                  setAutoPlaying(false);
                  audio.stopAll();
                } else {
                  setAutoPlaying(true);
                }
              }}
              aria-label={autoPlaying ? 'Tạm dừng kể chuyện' : 'Nghe kể chuyện'}
              className="kids-btn-blue w-12 h-12 rounded-full text-white flex items-center justify-center shrink-0"
            >
              {autoPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <div className="flex-1 flex flex-col gap-1.5">
              <div className="h-3 rounded-full bg-[#DCEEFF] overflow-hidden border border-[#BEE0FF]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4DC0FF] to-[#1684F0] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  disabled={safeIdx === 0}
                  onClick={() => {
                    setAutoPlaying(false);
                    const next = Math.max(0, safeIdx - 1);
                    setPageIdx(next);
                    audio.speak(pages[next].en, 0.82);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-[#1674DA] disabled:opacity-35"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Trang trước</span>
                </button>
                <button
                  type="button"
                  disabled={safeIdx >= pages.length - 1}
                  onClick={() => {
                    setAutoPlaying(false);
                    const next = Math.min(pages.length - 1, safeIdx + 1);
                    setPageIdx(next);
                    audio.speak(pages[next].en, 0.82);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-[#1674DA] disabled:opacity-35"
                >
                  <span>Trang sau</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowBookShelf((v) => !v)}
              title="Chọn truyện khác"
              className={`w-11 h-11 rounded-2xl border-2 flex items-center justify-center transition shrink-0 ${
                showBookShelf
                  ? 'bg-[#1684F0] text-white border-[#1684F0]'
                  : 'bg-[#E5F4FF] text-[#1674DA] border-[#BEE2FF] hover:bg-[#D4ECFF]'
              }`}
            >
              <BookOpen className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal / Expandable Story Picker */}
      <div className="kids-glass-card rounded-[26px] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-extrabold text-sm sm:text-base text-[#123A6F]">
            📚 Kho truyện tranh ({topics.length} câu chuyện)
          </div>
          <button
            type="button"
            onClick={() => setShowBookShelf((v) => !v)}
            className="text-xs font-extrabold text-[#1684F0]"
          >
            {showBookShelf ? 'Thu gọn' : 'Xem tất cả >'}
          </button>
        </div>

        <div
          className={
            showBookShelf
              ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5'
              : 'flex items-center gap-2.5 overflow-x-auto pb-1'
          }
        >
          {(showBookShelf ? topics : topics.slice(0, 12)).map((t, idx) => {
            const active = t.id === currentTopic.id;
            const tile = KIDS_PASTEL_TILES[idx % KIDS_PASTEL_TILES.length];
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setSelectedTopicId(t.id);
                  setShowBookShelf(false);
                }}
                style={{
                  backgroundColor: active ? '#1684F0' : tile.bg,
                  borderColor: active ? '#0C5BB8' : tile.border,
                }}
                className={`shrink-0 rounded-2xl border-2 px-3 py-2 flex items-center gap-2 text-left transition ${
                  active ? 'text-white shadow-md scale-[1.02]' : 'text-[#123A6F] hover:scale-[1.02]'
                }`}
              >
                <img
                  src={kidTopicIconUrl(t.id)}
                  onError={(e) => {
                    const fallback = unitCoverUrl(t.coverSlug);
                    if (!e.currentTarget.src.endsWith(fallback)) e.currentTarget.src = fallback;
                  }}
                  alt={t.titleEn}
                  className={`w-9 h-9 object-contain shrink-0 ${
                    active ? 'bg-white rounded-xl p-0.5' : 'drop-shadow-2xs'
                  }`}
                />
                <div className="min-w-0">
                  <div className="text-xs font-extrabold leading-tight line-clamp-1">
                    {t.titleVi}
                  </div>
                  <div
                    className={`text-[10px] font-bold line-clamp-1 ${
                      active ? 'text-sky-100' : 'text-[#4B6F99]'
                    }`}
                  >
                    {t.titleEn}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
