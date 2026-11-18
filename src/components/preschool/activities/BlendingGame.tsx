import { ArrowRight, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';
import { PictureCard } from '../ui/PictureCard';
import type { ActivityProps } from './activityTypes';

const CVC_EMOJI: Record<string, string> = {
  cat: '🐱',
  hat: '👒',
  pig: '🐷',
  sit: '🪑',
  bat: '🦇',
  pin: '📌',
  dog: '🐶',
  sun: '☀️',
  bed: '🛏️',
  hot: '🥵',
  bus: '🚌',
  pen: '🖊️',
};

export const BlendingGame: React.FC<ActivityProps> = ({ unit, level, audio, onDone }) => {
  const list = (unit.phonics?.cvc || ['cat', 'hat', 'pig']).slice(0, 3);
  const [idx, setIdx] = useState(0);
  const [tappedIdx, setTappedIdx] = useState<number[]>([]);
  const [blended, setBlended] = useState(false);

  const word = list[Math.min(idx, list.length - 1)] || 'cat';
  const letters = word.split('');

  useEffect(() => {
    setTappedIdx([]);
    setBlended(false);
    audio.speak('Tap each sound, then blend!', 0.85);
  }, [word]);

  const handleTapLetter = (i: number, ch: string) => {
    audio.playSfx('pop');
    audio.speak(ch, 0.75);
    if (!tappedIdx.includes(i)) {
      const next = [...tappedIdx, i];
      setTappedIdx(next);
      if (next.length === letters.length) {
        window.setTimeout(() => {
          setBlended(true);
          audio.playSfx('ding');
          audio.speak(word, 0.8);
        }, 450);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      <div className="flex items-center gap-3">
        <Mascot pose={blended ? 'cheer' : 'think'} size="sm" />
        <div className="font-kid font-extrabold text-2xl text-slate-800">
          🧩 Ghép âm đọc từ! ({idx + 1}/{list.length})
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-5">
        {letters.map((ch, i) => {
          const hit = tappedIdx.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleTapLetter(i, ch)}
              className={`w-24 h-28 sm:w-28 sm:h-32 rounded-[28px] border-4 font-kid font-extrabold text-5xl sm:text-6xl transition shadow-md ${
                blended
                  ? 'bg-emerald-400 text-white border-emerald-500 scale-105'
                  : hit
                  ? 'bg-amber-300 text-slate-900 border-amber-500 scale-105'
                  : 'bg-white text-sky-600 border-sky-200 hover:border-sky-400'
              }`}
            >
              {ch}
            </button>
          );
        })}
      </div>

      {blended ? (
        <div className="animate-kid-pop flex flex-col items-center gap-4">
          <PictureCard
            slug={word}
            emoji={CVC_EMOJI[word] || '⭐'}
            label={word}
            size="md"
            pop
            onClick={() => audio.speak(word, 0.8)}
          />
          <BigButton
            color={level.color}
            shadowColor={level.colorDark}
            size="lg"
            onClick={() => {
              if (idx < list.length - 1) setIdx((i) => i + 1);
              else onDone();
            }}
          >
            <span>{idx < list.length - 1 ? 'Từ tiếp!' : 'Đọc siêu quá!'}</span>
            <ArrowRight className="w-6 h-6" />
          </BigButton>
        </div>
      ) : (
        <BigButton
          color="#FFB84D"
          shadowColor="#E08B1F"
          size="md"
          onClick={() => {
            setTappedIdx(letters.map((_, i) => i));
            setBlended(true);
            audio.playSfx('ding');
            audio.speak(word, 0.8);
          }}
        >
          <Sparkles className="w-5 h-5" />
          <span>Ghép lại nghe thử!</span>
        </BigButton>
      )}
    </div>
  );
};
