import React, { useEffect, useMemo, useState } from 'react';
import { Mascot } from '../shell/Mascot';
import { PictureCard } from '../ui/PictureCard';
import type { ActivityProps } from './activityTypes';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const ShadowMatch: React.FC<ActivityProps> = ({ words, audio, onDone }) => {
  const items = useMemo(() => words.slice(0, 3), [words]);
  const rightOrder = useMemo(() => shuffle(items), [items]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wiggleId, setWiggleId] = useState<string | null>(null);

  useEffect(() => {
    audio.speak('Match the picture to its shadow!', 0.85);
  }, []);

  const handleRightTap = (rightId: string) => {
    if (matchedIds.includes(rightId) || !selectedLeft) return;
    if (selectedLeft === rightId) {
      audio.playSfx('ding');
      const wordObj = items.find((w) => w.id === rightId);
      if (wordObj) audio.speak(wordObj.word, 0.85);
      const next = [...matchedIds, rightId];
      setMatchedIds(next);
      setSelectedLeft(null);
      if (next.length >= items.length) {
        audio.playSfx('celebrate');
        window.setTimeout(onDone, 800);
      }
    } else {
      audio.playSfx('tap');
      setWiggleId(rightId);
      audio.speak('Try again!', 0.85);
      window.setTimeout(() => setWiggleId(null), 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 py-2 text-center">
      <div className="flex items-center gap-3">
        <Mascot pose="think" size="sm" />
        <div className="font-kid font-extrabold text-xl sm:text-2xl text-slate-800">
          🌑 Ghép tranh với chiếc bóng đúng!
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:gap-10 max-w-2xl w-full items-center">
        {/* Left: Colored pictures */}
        <div className="flex flex-col items-center gap-3">
          {items.map((w) => {
            const done = matchedIds.includes(w.id);
            return (
              <PictureCard
                key={w.id}
                slug={w.image}
                emoji={w.emoji}
                swatch={w.swatch}
                size="md"
                hideText
                selected={selectedLeft === w.id}
                pop={done}
                onClick={() => {
                  if (done) return;
                  audio.playSfx('tap');
                  audio.speak(w.word, 0.8);
                  setSelectedLeft(w.id);
                }}
                className={done ? 'opacity-45' : ''}
              />
            );
          })}
        </div>

        {/* Right: Silhouettes */}
        <div className="flex flex-col items-center gap-3">
          {rightOrder.map((w) => {
            const done = matchedIds.includes(w.id);
            return (
              <PictureCard
                key={w.id}
                slug={w.image}
                emoji={w.emoji}
                size="md"
                hideText
                silhouette={!done}
                wiggle={wiggleId === w.id}
                pop={done}
                onClick={() => handleRightTap(w.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
