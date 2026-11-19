import React, { useEffect, useMemo, useState } from 'react';
import { wordImageUrl } from '../../../data/preschool/types';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';
import type { ActivityProps } from './activityTypes';

export const CountTap: React.FC<ActivityProps> = ({ words, level, audio, onDone }) => {
  const maxNum = level.id === 'star' ? 10 : 6;
  const rounds = useMemo(() => {
    const counts = words
      .map((w) => w.count)
      .filter((c): c is number => typeof c === 'number' && c >= 1 && c <= maxNum);
    if (counts.length >= 2) return counts.slice(0, 3);
    return level.id === 'star' ? [3, 6, 8] : [2, 4, 5];
  }, [words, level.id, maxNum]);

  const [rIdx, setRIdx] = useState(0);
  const [popping, setPopping] = useState(false);
  const [wiggleNum, setWiggleNum] = useState<number | null>(null);

  const targetCount = rounds[rIdx] || 3;
  const countItems = [
    { slug: 'apple', emoji: '🍎' },
    { slug: 'star', emoji: '⭐' },
    { slug: 'balloon', emoji: '🎈' },
    { slug: 'duck', emoji: '🐥' },
    { slug: 'flower', emoji: '🌸' },
  ];
  const itemVisual = countItems[rIdx % countItems.length];

  const options = useMemo(() => {
    const set = new Set<number>([targetCount]);
    while (set.size < Math.min(4, maxNum)) {
      const n = 1 + Math.floor(Math.random() * maxNum);
      set.add(n);
    }
    return Array.from(set).sort((a, b) => a - b);
  }, [targetCount, maxNum]);

  useEffect(() => {
    audio.speak('How many? Count together!', 0.85);
  }, [targetCount, rIdx]);

  const handlePick = (n: number) => {
    if (popping) return;
    if (n === targetCount) {
      setPopping(true);
      audio.playSfx('ding');
      audio.speak(`${n}! Great counting!`, 0.85);
      window.setTimeout(() => {
        setPopping(false);
        if (rIdx < rounds.length - 1) setRIdx((i) => i + 1);
        else onDone();
      }, 900);
    } else {
      audio.playSfx('tap');
      setWiggleNum(n);
      audio.speak('Try again!', 0.85);
      window.setTimeout(() => setWiggleNum(null), 450);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      <div className="flex items-center gap-3">
        <Mascot pose={popping ? 'cheer' : 'point'} size="sm" />
        <div className="font-kid font-extrabold text-2xl text-slate-800">
          🔢 Có bao nhiêu bạn nhỏ nào? ({rIdx + 1}/{rounds.length})
        </div>
      </div>

      <div
        className={`max-w-lg w-full bg-white rounded-[32px] border-4 border-amber-100 p-6 shadow-md flex flex-wrap items-center justify-center gap-4 min-h-[160px] ${
          popping ? 'animate-kid-pop border-emerald-300' : ''
        }`}
      >
        {Array.from({ length: targetCount }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              audio.playSfx('pop');
              audio.speak(String(i + 1), 0.85);
            }}
            className="w-16 h-16 sm:w-20 sm:h-20 hover:scale-110 active:scale-95 transition select-none flex items-center justify-center"
          >
            <img
              src={wordImageUrl(itemVisual.slug)}
              alt={itemVisual.slug}
              className="w-full h-full object-contain pointer-events-none"
            />
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {options.map((n) => (
          <BigButton
            key={n}
            color="#5B8DEF"
            shadowColor="#3A6AD0"
            size="xl"
            onClick={() => handlePick(n)}
            className={`min-w-[96px] ${wiggleNum === n ? 'animate-kid-wiggle' : ''}`}
          >
            <span className="text-3xl">{n}</span>
          </BigButton>
        ))}
      </div>
    </div>
  );
};
