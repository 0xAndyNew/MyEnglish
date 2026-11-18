import React, { useEffect, useState } from 'react';
import { Mascot } from '../shell/Mascot';
import { PictureCard } from '../ui/PictureCard';
import type { ActivityProps } from './activityTypes';

export const BubblePop: React.FC<ActivityProps> = ({ words, level, audio, onDone }) => {
  const bubbles = words.slice(0, level.allowWrong ? 4 : 3);
  const [poppedIds, setPoppedIds] = useState<string[]>([]);
  const [targetIdx, setTargetIdx] = useState(0);
  const [wiggleId, setWiggleId] = useState<string | null>(null);

  const target = bubbles[targetIdx];

  useEffect(() => {
    if (level.allowWrong && target) {
      audio.speak(`Pop ${target.word}!`, 0.8);
    } else if (!level.allowWrong) {
      audio.speak('Pop the bubbles!', 0.85);
    }
  }, [targetIdx, level.allowWrong]);

  const handlePop = (wId: string, wordText: string) => {
    if (poppedIds.includes(wId)) return;

    if (!level.allowWrong || wId === target?.id) {
      audio.playSfx('pop');
      audio.speak(wordText, 0.8);
      const nextPopped = [...poppedIds, wId];
      setPoppedIds(nextPopped);
      if (nextPopped.length >= bubbles.length) {
        audio.playSfx('celebrate');
        window.setTimeout(onDone, 700);
      } else if (level.allowWrong) {
        setTargetIdx((i) => i + 1);
      }
    } else {
      audio.playSfx('tap');
      setWiggleId(wId);
      audio.speak(`Try again! ${target.word}`, 0.8);
      window.setTimeout(() => setWiggleId(null), 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      <div className="flex items-center gap-3">
        <Mascot pose="cheer" size="sm" />
        <div className="font-kid font-extrabold text-2xl text-slate-800">
          {level.allowWrong && target
            ? `🫧 Chạm bong bóng "${target.word}"!`
            : '🫧 Bắn nổ hết bong bóng nào!'}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-5 max-w-2xl py-2">
        {bubbles.map((w) => {
          const isPopped = poppedIds.includes(w.id);
          return (
            <div
              key={w.id}
              className={`rounded-full p-2 bg-gradient-to-br from-sky-100/90 via-white to-pink-100/90 border-4 border-sky-200 shadow-lg transition-all duration-300 ${
                isPopped ? 'scale-125 opacity-0 pointer-events-none' : 'animate-kid-float'
              }`}
            >
              <PictureCard
                slug={w.image}
                emoji={w.emoji}
                swatch={w.swatch}
                size="md"
                hideText
                wiggle={wiggleId === w.id}
                onClick={() => handlePop(w.id, w.word)}
                className="!rounded-full !border-0 !shadow-none !bg-transparent"
              />
            </div>
          );
        })}
      </div>

      {level.parentTips && (
        <div className="text-xs font-semibold text-slate-500">
          💡 Chạm từng bong bóng để nghe tiếng nổ "bốp" và tên đồ vật!
        </div>
      )}
    </div>
  );
};
