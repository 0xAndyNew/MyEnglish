import { Volume2 } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';
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

export const FeedAnimal: React.FC<ActivityProps> = ({ unit, words, level, audio, onDone }) => {
  const rounds = useMemo(() => shuffle(words).slice(0, 3), [unit.id]);
  const [rIdx, setRIdx] = useState(0);
  const [wiggleId, setWiggleId] = useState<string | null>(null);
  const [fed, setFed] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const target = rounds[rIdx];
  const choices = useMemo(() => {
    if (!target) return [];
    const others = shuffle(unit.words.filter((w) => w.id !== target.id)).slice(
      0,
      Math.max(1, level.maxChoices - 1)
    );
    return shuffle([target, ...others]);
  }, [target?.id, unit.id, level.maxChoices]);

  useEffect(() => {
    setFed(false);
    if (target) {
      audio.speak(`Give Bo the ${target.word}, please!`, 0.82);
    }
  }, [target?.id]);

  if (!target) {
    onDone();
    return null;
  }

  const handleGive = (id: string) => {
    if (fed) return;
    if (id === target.id) {
      setFed(true);
      audio.playSfx('ding');
      audio.speak(`Yummy! Thank you for the ${target.word}!`, 0.85);
      window.setTimeout(() => {
        if (rIdx < rounds.length - 1) setRIdx((i) => i + 1);
        else onDone();
      }, 950);
    } else {
      audio.playSfx('tap');
      setWiggleId(id);
      audio.speak(`Oops! Bo wants ${target.word}!`, 0.82);
      window.setTimeout(() => setWiggleId(null), 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      {/* Drop Zone: Bo the Bear */}
      <div
        onDragOver={(e) => {
          if (!level.allowDrag) return;
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const id = e.dataTransfer.getData('text/plain');
          if (id) handleGive(id);
        }}
        className={`rounded-[32px] border-4 px-6 py-4 transition flex flex-wrap items-center justify-center gap-4 ${
          dragOver
            ? 'border-emerald-400 bg-emerald-50 scale-105'
            : fed
            ? 'border-amber-400 bg-amber-50 animate-kid-pop'
            : 'border-white bg-white/90 shadow-md'
        }`}
      >
        <Mascot
          pose={fed ? 'cheer' : 'hello'}
          size="md"
          speechBubble={fed ? 'Yummy! Thank you!' : `Give me "${target.word}"!`}
          onClick={() => audio.speak(target.word, 0.8)}
        />
        <BigButton
          color="#FFB84D"
          shadowColor="#E08B1F"
          size="md"
          onClick={() => audio.speak(`Give Bo the ${target.word}`, 0.8)}
        >
          <Volume2 className="w-5 h-5" />
          <span>({rIdx + 1}/{rounds.length})</span>
        </BigButton>
      </div>

      <div className="text-xs font-bold text-slate-500">
        {level.allowDrag
          ? '🤲 Kéo thẻ hoặc chạm vào thẻ để đưa cho Gấu Bo!'
          : '👆 Chạm vào thẻ đúng để đưa cho Gấu Bo!'}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {choices.map((c) => (
          <div
            key={c.id}
            draggable={level.allowDrag}
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', c.id);
            }}
          >
            <PictureCard
              slug={c.image}
              emoji={c.emoji}
              swatch={c.swatch}
              size="lg"
              hideText
              wiggle={wiggleId === c.id}
              pop={fed && c.id === target.id}
              onClick={() => handleGive(c.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
