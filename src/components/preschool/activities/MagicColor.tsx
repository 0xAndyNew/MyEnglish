import { ArrowRight, Paintbrush } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';
import { PictureCard } from '../ui/PictureCard';
import type { ActivityProps } from './activityTypes';

export const MagicColor: React.FC<ActivityProps> = ({ words, level, audio, onDone }) => {
  const pool = words.slice(0, 3);
  const [idx, setIdx] = useState(0);
  const [reveal, setReveal] = useState(0);

  const card = pool[Math.min(idx, pool.length - 1)];

  useEffect(() => {
    setReveal(0);
    if (card) audio.speak(`Color the ${card.word}!`, 0.85);
  }, [idx, card?.id]);

  if (!card) {
    onDone();
    return null;
  }

  const handlePaintTap = () => {
    const next = Math.min(100, reveal + 35);
    setReveal(next);
    audio.playSfx(next >= 100 ? 'ding' : 'pop');
    if (next >= 100) {
      audio.speak(`${card.word}! Beautiful!`, 0.85);
    } else {
      audio.speak(card.word, 0.85);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      <div className="flex items-center gap-3">
        <Mascot pose={reveal >= 100 ? 'cheer' : 'point'} size="sm" />
        <div className="font-kid font-extrabold text-2xl text-slate-800">
          🖌️ Chạm tô màu phép thuật! ({idx + 1}/{pool.length})
        </div>
      </div>

      <PictureCard
        slug={card.image}
        emoji={card.emoji}
        label={card.word}
        subLabelVi={card.meaningVi}
        swatch={card.swatch}
        size="xl"
        colorRevealPercent={reveal}
        pop={reveal >= 100}
        onClick={handlePaintTap}
      />

      <div className="w-48 h-4 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-pink-500 to-emerald-400 transition-all duration-300"
          style={{ width: `${reveal}%` }}
        />
      </div>

      {reveal < 100 ? (
        <BigButton color="#A55EEA" shadowColor="#7E3AF2" size="lg" onClick={handlePaintTap}>
          <Paintbrush className="w-6 h-6" />
          <span>Tô màu ({reveal}%)</span>
        </BigButton>
      ) : (
        <BigButton
          color={level.color}
          shadowColor={level.colorDark}
          size="lg"
          onClick={() => {
            if (idx < pool.length - 1) setIdx((i) => i + 1);
            else onDone();
          }}
        >
          <span>{idx < pool.length - 1 ? 'Tranh tiếp!' : 'Đẹp quá!'}</span>
          <ArrowRight className="w-6 h-6" />
        </BigButton>
      )}
    </div>
  );
};
