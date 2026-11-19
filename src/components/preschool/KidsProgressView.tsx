import { BookOpen, Trophy } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { LEW_AVATARS, type LewAgeLevelMeta } from '../../data/preschool/lewLevels';
import type {
  LewChildProfile,
  LewLessonProgressRecord,
  LewObservationRecord,
  LewTopic,
} from '../../data/preschool/lewTypes';
import { unitCoverUrl } from '../../data/preschool/types';
import {
  KIDS_CHART_COLORS,
  KIDS_PASTEL_TILES,
  KidsStarIcon,
  kidAvatarUrl,
  kidTopicIconUrl,
} from './ui/KidsSceneShell';

interface KidsProgressViewProps {
  child: LewChildProfile;
  levelMeta: LewAgeLevelMeta;
  topics: LewTopic[];
  earnedStickers: string[];
  completedKeys: string[];
  lessonProgress: LewLessonProgressRecord[];
  observations: LewObservationRecord[];
  onOpenTopic: (topic: LewTopic) => void;
  onSpeak: (text: string) => void;
}

const DAY_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export const KidsProgressView: React.FC<KidsProgressViewProps> = ({
  child,
  levelMeta,
  topics,
  earnedStickers,
  completedKeys,
  lessonProgress,
  observations,
  onOpenTopic,
  onSpeak,
}) => {
  const [subTab, setSubTab] = useState<'stats' | 'achievements'>('stats');
  const avatarMeta = LEW_AVATARS.find((a) => a.id === child.avatar) || LEW_AVATARS[0];
  const stickerSet = new Set(earnedStickers);

  const childProg = useMemo(
    () => lessonProgress.filter((p) => p.childId === child.id),
    [lessonProgress, child.id]
  );
  const childObs = useMemo(
    () => observations.filter((o) => o.childId === child.id),
    [observations, child.id]
  );

  const completedCount = Math.max(
    completedKeys.length,
    childProg.filter((p) => p.status === 'completed').length
  );
  const totalLessonsTouched = Math.max(completedCount, childProg.length, earnedStickers.length);
  const totalPoints = completedCount * 20 + earnedStickers.length * 10;

  // Compute 7-day Monday..Sunday activity counts from real timestamps
  const weeklyBars = useMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0, 0];
    const now = new Date();
    const dayOfWeek = (now.getDay() + 6) % 7; // Mon=0 .. Sun=6
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - dayOfWeek);

    const recordDates = [
      ...childProg.map((p) => p.completedAt || p.updatedAt || p.startedAt),
      ...childObs.map((o) => o.createdAt),
    ];

    for (const iso of recordDates) {
      if (!iso) continue;
      const d = new Date(iso);
      if (Number.isNaN(d.getTime()) || d < startOfWeek) continue;
      const idx = (d.getDay() + 6) % 7;
      counts[idx] += 1;
    }

    const maxReal = Math.max(...counts, 1);
    const hasAnyActivity = counts.some((c) => c > 0);
    // Visual heights (20%..100%) so empty week shows gentle ascending preview bars, real data scales accurately
    const previewScale = [26, 36, 48, 60, 72, 84, 92];
    return DAY_LABELS.map((label, idx) => ({
      label,
      count: counts[idx],
      color: KIDS_CHART_COLORS[idx],
      heightPct: hasAnyActivity
        ? Math.max(16, Math.round((counts[idx] / maxReal) * 95))
        : previewScale[idx],
      isPreview: !hasAnyActivity,
    }));
  }, [childProg, childObs]);

  return (
    <div className="space-y-4">
      {/* Profile Card (Exact Mockup #5) */}
      <div className="kids-glass-card rounded-[28px] p-4 sm:p-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-16 h-16 rounded-full bg-[#DFF4FF] border-[3px] border-[#66C7FF] overflow-hidden flex items-center justify-center shadow-sm shrink-0">
            <img
              src={kidAvatarUrl(child.avatar, avatarMeta.img)}
              alt={child.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#123A6F] leading-tight">
              Bé {child.name}
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#4B75A5]">
              Cấp độ: <span className="text-[#167CE8] font-extrabold">{levelMeta.name}</span>
            </div>
          </div>
        </div>
        <KidsStarIcon className="w-11 h-11 sm:w-12 sm:h-12 drop-shadow-sm shrink-0 animate-kid-float" />
      </div>

      {/* Sub-tabs: Thống kê | Thành tích */}
      <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl bg-white/80 border-2 border-white shadow-sm">
        <button
          type="button"
          onClick={() => setSubTab('stats')}
          className={`py-2.5 rounded-xl font-extrabold text-sm sm:text-base transition ${
            subTab === 'stats'
              ? 'bg-[#2196F3] text-white shadow-sm'
              : 'text-[#446A96] hover:bg-sky-50'
          }`}
        >
          Thống kê
        </button>
        <button
          type="button"
          onClick={() => setSubTab('achievements')}
          className={`py-2.5 rounded-xl font-extrabold text-sm sm:text-base transition ${
            subTab === 'achievements'
              ? 'bg-[#2196F3] text-white shadow-sm'
              : 'text-[#446A96] hover:bg-sky-50'
          }`}
        >
          Thành tích ({earnedStickers.length}/{topics.length})
        </button>
      </div>

      {subTab === 'stats' ? (
        <div className="space-y-4">
          {/* 3 KPI Stat Cards matching Mockup #5 */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
            <div className="kids-glass-card rounded-[24px] p-3.5 sm:p-4 text-center flex flex-col items-center gap-1">
              <KidsStarIcon className="w-9 h-9 sm:w-10 sm:h-10" />
              <div className="text-2xl sm:text-3xl font-extrabold text-[#123A6F] leading-none mt-1">
                {totalPoints}
              </div>
              <div className="text-xs font-bold text-[#5C7FA6]">Tổng điểm</div>
            </div>

            <div className="kids-glass-card rounded-[24px] p-3.5 sm:p-4 text-center flex flex-col items-center gap-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#DFF3FF] flex items-center justify-center text-[#1684F0]">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#123A6F] leading-none mt-1">
                {totalLessonsTouched}
              </div>
              <div className="text-xs font-bold text-[#5C7FA6]">Bài học</div>
            </div>

            <div className="kids-glass-card rounded-[24px] p-3.5 sm:p-4 text-center flex flex-col items-center gap-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#FFF2C2] flex items-center justify-center text-[#E69300]">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#123A6F] leading-none mt-1">
                {completedCount}
              </div>
              <div className="text-xs font-bold text-[#5C7FA6]">Hoàn thành</div>
            </div>
          </div>

          {/* Weekly Progress Bar Chart (Biểu đồ tiến độ T2 - CN) */}
          <div className="kids-glass-card rounded-[28px] p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#123A6F]">
                Biểu đồ tiến độ
              </h3>
              <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-[#E3F5FF] text-[#1474DB]">
                Tuần này
              </span>
            </div>

            <div className="relative pt-8 pb-2">
              {/* Upward Trend Arrow SVG matching mockup */}
              <svg
                className="pointer-events-none absolute top-0 left-3 right-3 w-[calc(100%-24px)] h-20"
                viewBox="0 0 320 80"
                preserveAspectRatio="none"
                fill="none"
              >
                <defs>
                  <linearGradient id="trendGrad" x1="0" y1="60" x2="320" y2="10" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF9F43" />
                    <stop offset="50%" stopColor="#48B9FF" />
                    <stop offset="100%" stopColor="#FF5F9E" />
                  </linearGradient>
                </defs>
                <path
                  d="M14 64 C 95 54, 175 44, 298 14"
                  stroke="url(#trendGrad)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                <path
                  d="M284 10 L302 13 L292 28"
                  stroke="#FF5F9E"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="grid grid-cols-7 items-end gap-2 sm:gap-3 h-40 sm:h-44 pt-6 border-b-2 border-[#E3F1FC] px-1">
                {weeklyBars.map((bar) => (
                  <div key={bar.label} className="h-full flex flex-col items-center justify-end gap-1.5">
                    {bar.count > 0 && (
                      <span className="text-[11px] font-extrabold text-[#123A6F]">{bar.count}</span>
                    )}
                    <div
                      className="w-full max-w-[34px] rounded-t-xl shadow-sm transition-all duration-500 relative overflow-hidden"
                      style={{
                        height: `${bar.heightPct}%`,
                        backgroundColor: bar.color,
                        opacity: bar.isPreview ? 0.88 : 1,
                      }}
                    >
                      <div className="absolute inset-y-0 left-1 w-1.5 bg-white/30 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2 sm:gap-3 pt-2 px-1">
                {weeklyBars.map((bar) => (
                  <div key={bar.label} className="text-center text-xs sm:text-sm font-extrabold text-[#2B5382]">
                    {bar.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Achievements & Sticker Album */
        <div className="kids-glass-card rounded-[28px] p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-[#123A6F]">
                Bộ Sưu Tập Huy Hiệu & Sticker
              </h3>
              <p className="text-xs font-bold text-[#5C7FA6]">
                Hoàn thành mỗi chủ đề để nhận ngay 1 Sticker xinh xắn và +20 điểm!
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#FFF3B8] border border-[#FFE074] text-[#9A5B00] text-xs font-extrabold">
              ⭐ {earnedStickers.length} / {topics.length}
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3">
            {topics.map((topic, idx) => {
              const unlocked = stickerSet.has(topic.id);
              const tile = KIDS_PASTEL_TILES[idx % KIDS_PASTEL_TILES.length];
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => {
                    if (unlocked) onSpeak(`${topic.titleEn}! Great job!`);
                    else onOpenTopic(topic);
                  }}
                  style={{
                    backgroundColor: unlocked ? tile.bg : '#F3F7FB',
                    borderColor: unlocked ? tile.border : '#DCE7F2',
                  }}
                  className={`rounded-[22px] border-2 p-2.5 flex flex-col items-center text-center gap-1.5 transition ${
                    unlocked ? 'shadow-sm hover:scale-105' : 'opacity-65 hover:opacity-100'
                  }`}
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                    <img
                      src={kidTopicIconUrl(topic.id)}
                      onError={(e) => {
                        const fallback = unitCoverUrl(topic.coverSlug);
                        if (!e.currentTarget.src.endsWith(fallback)) e.currentTarget.src = fallback;
                      }}
                      alt={topic.titleEn}
                      className={`w-full h-full object-contain drop-shadow-xs ${
                        unlocked ? '' : 'grayscale opacity-75'
                      }`}
                    />
                    {unlocked && (
                      <KidsStarIcon className="w-5 h-5 absolute -top-1 -right-1 drop-shadow" />
                    )}
                  </div>
                  <div className="text-[11px] font-extrabold text-[#123A6F] line-clamp-1 leading-tight">
                    {topic.titleVi}
                  </div>
                  <div className="text-[10px] font-bold text-[#5C7FA6] line-clamp-1">
                    {unlocked ? 'Đã nhận ⭐' : `(${topic.titleEn})`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
