import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { storyPageUrl, unitCoverUrl, type PreschoolUnit } from '../../../data/preschool/types';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';

interface StoryCornerProps {
  units: PreschoolUnit[];
  completedLessonIds: string[];
  allowAll?: boolean;
  onSpeak: (text: string, rate?: number) => void;
}

export const StoryCorner: React.FC<StoryCornerProps> = ({
  units,
  completedLessonIds,
  allowAll = false,
  onSpeak,
}) => {
  const unlockedUnits = units.filter(
    (u, idx) => allowAll || idx === 0 || completedLessonIds.some((id) => id.startsWith(`${u.id}-`))
  );
  const [selectedId, setSelectedId] = useState(unlockedUnits[0]?.id || units[0]?.id);
  const [pageIdx, setPageIdx] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  const unit = unlockedUnits.find((u) => u.id === selectedId) || unlockedUnits[0] || units[0];
  const pages = unit.story.pages;
  const page = pages[Math.min(pageIdx, pages.length - 1)];

  useEffect(() => {
    setImgFailed(false);
  }, [unit.id, pageIdx]);

  return (
    <div className="w-full max-w-[920px] mx-auto px-4 pb-6 pt-1 space-y-5">
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
        {unlockedUnits.map((u) => {
          const active = u.id === unit.id;
          return (
            <button
              key={u.id}
              type="button"
              onClick={() => {
                setSelectedId(u.id);
                setPageIdx(0);
                onSpeak(u.story.title);
              }}
              className={`shrink-0 min-h-[60px] px-4 py-2 rounded-[20px] border-3 flex items-center gap-2 font-kid font-extrabold transition ${
                active
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-[1.03]'
                  : 'bg-white text-slate-700 border-white hover:border-emerald-200'
              }`}
            >
              <img
                src={unitCoverUrl(u.id)}
                alt={u.title}
                className="w-9 h-9 rounded-xl object-contain shrink-0 bg-white p-0.5"
              />
              <span className="text-sm sm:text-base">{u.story.title}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-[32px] border-4 border-emerald-100 p-6 sm:p-8 shadow-lg space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Mascot pose="read" size="sm" />
            <div>
              <h2 className="font-kid font-extrabold text-2xl text-slate-800">{unit.story.title}</h2>
              <div className="text-xs font-bold text-slate-400">
                {unit.story.titleVi} · Trang {pageIdx + 1}/{pages.length}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSpeak(page.en, 0.8)}
          className="w-full rounded-[28px] bg-emerald-50/50 border-3 border-emerald-100 p-5 flex flex-col items-center gap-4 hover:border-emerald-300 transition active:scale-[0.99]"
        >
          <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-white flex items-center justify-center overflow-hidden shadow-sm">
            {!imgFailed ? (
              <img
                src={storyPageUrl(unit.id, pageIdx)}
                alt={page.en}
                onError={() => setImgFailed(true)}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <span className="text-8xl">{page.emoji}</span>
            )}
          </div>

          <div className="flex items-center gap-2 font-kid font-extrabold text-2xl sm:text-3xl text-slate-800">
            <span>{page.en}</span>
            <Volume2 className="w-6 h-6 text-emerald-500 shrink-0" />
          </div>
          <div className="text-sm font-semibold text-slate-500">{page.vi}</div>
        </button>

        <div className="flex items-center justify-between gap-3">
          <BigButton
            color="#94A3B8"
            shadowColor="#64748B"
            size="md"
            disabled={pageIdx === 0}
            onClick={() => {
              const prev = Math.max(0, pageIdx - 1);
              setPageIdx(prev);
              onSpeak(pages[prev].en, 0.8);
            }}
          >
            <ChevronLeft className="w-6 h-6" />
            <span>Trang trước</span>
          </BigButton>

          <BigButton
            color="#4CC38A"
            shadowColor="#2E9E68"
            size="md"
            disabled={pageIdx >= pages.length - 1}
            onClick={() => {
              const next = Math.min(pages.length - 1, pageIdx + 1);
              setPageIdx(next);
              onSpeak(pages[next].en, 0.8);
            }}
          >
            <span>Trang sau</span>
            <ChevronRight className="w-6 h-6" />
          </BigButton>
        </div>
      </div>
    </div>
  );
};
