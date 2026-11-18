import { ArrowRight, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { storyPageUrl } from '../../../data/preschool/types';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';
import type { ActivityProps } from './activityTypes';

export const StoryActivity: React.FC<ActivityProps> = ({ unit, level, audio, onDone }) => {
  const pages = unit.story.pages;
  const [pageIdx, setPageIdx] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  const page = pages[Math.min(pageIdx, pages.length - 1)];

  useEffect(() => {
    setImgFailed(false);
    audio.speak(page.en, 0.8);
  }, [pageIdx, unit.id]);

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="flex items-center gap-3">
        <Mascot pose="read" size="sm" />
        <div>
          <div className="font-kid font-extrabold text-2xl text-slate-800">
            📖 {unit.story.title}
          </div>
          <div className="text-xs font-bold text-slate-400">
            {unit.story.titleVi} · Trang {pageIdx + 1}/{pages.length}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => audio.speak(page.en, 0.8)}
        className="w-full max-w-xl rounded-[32px] bg-white border-4 border-emerald-100 p-5 shadow-md flex flex-col items-center gap-3 active:scale-[0.99] transition"
      >
        <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-3xl bg-emerald-50/50 flex items-center justify-center overflow-hidden">
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

        <div className="flex items-center gap-2 font-kid font-extrabold text-xl sm:text-2xl text-slate-800 text-center">
          <span>{page.en}</span>
          <Volume2 className="w-5 h-5 text-emerald-500 shrink-0" />
        </div>
        <div className="text-xs font-semibold text-slate-500">{page.vi}</div>
      </button>

      <div className="flex items-center gap-3">
        {pageIdx > 0 && (
          <BigButton
            color="#94A3B8"
            shadowColor="#64748B"
            size="md"
            onClick={() => setPageIdx((p) => p - 1)}
          >
            <ChevronLeft className="w-6 h-6" />
          </BigButton>
        )}

        {pageIdx < pages.length - 1 ? (
          <BigButton
            color={level.color}
            shadowColor={level.colorDark}
            size="lg"
            onClick={() => {
              audio.playSfx('tap');
              setPageIdx((p) => p + 1);
            }}
          >
            <span>Lật trang</span>
            <ChevronRight className="w-6 h-6" />
          </BigButton>
        ) : (
          <BigButton
            color={level.color}
            shadowColor={level.colorDark}
            size="lg"
            onClick={() => {
              audio.playSfx('ding');
              onDone();
            }}
          >
            <span>Hết truyện rồi!</span>
            <ArrowRight className="w-6 h-6" />
          </BigButton>
        )}
      </div>
    </div>
  );
};
