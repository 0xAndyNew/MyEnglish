import React, { useState } from 'react';
import { unitCoverUrl, type PreschoolUnit } from '../../../data/preschool/types';
import { Mascot } from '../shell/Mascot';

interface StickerBookProps {
  units: PreschoolUnit[];
  earnedStickers: string[];
  onSpeak: (text: string) => void;
}

export const StickerBook: React.FC<StickerBookProps> = ({ units, earnedStickers, onSpeak }) => {
  const [failedIds, setFailedIds] = useState<Record<string, boolean>>({});
  const earnedSet = new Set(earnedStickers);
  const terms = Array.from(new Set(units.map((u) => u.term))).sort((a, b) => a - b);

  return (
    <div className="w-full max-w-[920px] mx-auto px-4 pb-6 pt-1 space-y-6">
      <div className="bg-white rounded-[28px] border-4 border-amber-200 p-5 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Mascot pose="cheer" size="sm" />
          <div>
            <h2 className="font-kid font-extrabold text-2xl text-slate-800">
              Bộ sưu tập Sticker của bé
            </h2>
            <p className="text-xs font-bold text-slate-500">
              Hoàn thành Buổi 4 của mỗi Unit để mở khoá Sticker mới!
            </p>
          </div>
        </div>
        <div className="px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-kid font-extrabold text-xl">
          {earnedSet.size}/{units.length} ⭐
        </div>
      </div>

      {terms.map((term) => (
        <div key={term} className="space-y-3">
          <h3 className="font-kid font-extrabold text-xl text-slate-700 px-1">Term {term}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {units
              .filter((u) => u.term === term)
              .map((u) => {
                const earned = earnedSet.has(u.id);
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() =>
                      onSpeak(earned ? `${u.title}! Great job!` : `${u.title}`)
                    }
                    className={`rounded-[28px] p-4 flex flex-col items-center gap-2 transition ${
                      earned
                        ? 'bg-white border-4 border-amber-400 shadow-md animate-kid-pop'
                        : 'bg-white/55 border-3 border-dashed border-slate-300 opacity-65'
                    }`}
                  >
                    <div
                      className={`w-28 h-28 rounded-full flex items-center justify-center overflow-hidden border-4 ${
                        earned ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-slate-100 grayscale'
                      }`}
                    >
                      {!failedIds[u.id] ? (
                        <img
                          src={unitCoverUrl(u.id)}
                          alt={u.title}
                          onError={() => setFailedIds((prev) => ({ ...prev, [u.id]: true }))}
                          className="w-full h-full object-contain p-1.5"
                        />
                      ) : (
                        <span className="text-5xl">{u.emoji}</span>
                      )}
                    </div>
                    <div className="font-kid font-extrabold text-slate-800 text-base text-center">
                      {u.title}
                    </div>
                    <div className="text-[11px] font-bold text-slate-400">
                      {earned ? '🎉 Đã sưu tập!' : 'Buổi 4'}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};
