import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';
import { PictureCard } from '../ui/PictureCard';
import type { ActivityProps } from './activityTypes';

export const Peekaboo: React.FC<ActivityProps> = ({ words, level, audio, onDone }) => {
  const pool = words.slice(0, 4);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const target = pool[Math.min(idx, pool.length - 1)];

  useEffect(() => {
    setRevealed(false);
    audio.speak('Peekaboo! Who is hiding?', 0.85);
  }, [idx]);

  if (!target) {
    onDone();
    return null;
  }

  const handleReveal = () => {
    if (revealed) {
      audio.speak(target.word, 0.8);
      return;
    }
    setRevealed(true);
    audio.playSfx('pop');
    audio.speak(`Peekaboo! ${target.word}!`, 0.8);
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      <div className="flex items-center gap-3">
        <Mascot pose={revealed ? 'cheer' : 'think'} size="sm" />
        <div className="font-kid font-extrabold text-2xl text-slate-800">
          🙈 Ú oà! Ai trốn sau đám mây thế? ({idx + 1}/{pool.length})
        </div>
      </div>

      {!revealed ? (
        <button
          type="button"
          onClick={handleReveal}
          className="w-64 h-64 rounded-[36px] bg-gradient-to-br from-sky-200 to-indigo-200 border-4 border-white shadow-xl flex flex-col items-center justify-center gap-3 animate-kid-bounce active:scale-95 transition"
        >
          <span className="text-8xl">☁️</span>
          <span className="font-kid font-extrabold text-2xl text-sky-900">Chạm mở ú oà!</span>
        </button>
      ) : (
        <div className="animate-kid-pop">
          <PictureCard
            slug={target.image}
            emoji={target.emoji}
            label={target.word}
            subLabelVi={target.meaningVi}
            swatch={target.swatch}
            size="xl"
            pop
            onClick={() => audio.speak(target.word, 0.8)}
          />
        </div>
      )}

      {revealed && (
        <BigButton
          color={level.color}
          shadowColor={level.colorDark}
          size="lg"
          onClick={() => {
            audio.playSfx('ding');
            if (idx < pool.length - 1) setIdx((i) => i + 1);
            else onDone();
          }}
        >
          <span>{idx < pool.length - 1 ? 'Ú oà tiếp!' : 'Giỏi quá!'}</span>
          <ArrowRight className="w-6 h-6" />
        </BigButton>
      )}
    </div>
  );
};
