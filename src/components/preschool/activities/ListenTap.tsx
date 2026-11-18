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

export const ListenTap: React.FC<ActivityProps> = ({ unit, words, level, audio, onDone }) => {
  const questions = useMemo(() => shuffle(words).slice(0, 4), [unit.id]);
  const [qIdx, setQIdx] = useState(0);
  const [wiggleId, setWiggleId] = useState<string | null>(null);
  const [popId, setPopId] = useState<string | null>(null);

  const target = questions[qIdx];

  const options = useMemo(() => {
    if (!target) return [];
    const others = shuffle(unit.words.filter((w) => w.id !== target.id)).slice(
      0,
      Math.max(1, level.maxChoices - 1)
    );
    return shuffle([target, ...others]);
  }, [target?.id, unit.id, level.maxChoices]);

  useEffect(() => {
    if (target) {
      audio.speak(`Where is ${target.word}?`, 0.8);
    }
  }, [target?.id]);

  if (!target) {
    onDone();
    return null;
  }

  const handlePick = (pickedId: string) => {
    if (popId) return;
    if (pickedId === target.id) {
      audio.playSfx('ding');
      setPopId(pickedId);
      audio.speak(`Great job! ${target.word}!`, 0.85);
      window.setTimeout(() => {
        setPopId(null);
        if (qIdx < questions.length - 1) setQIdx((i) => i + 1);
        else onDone();
      }, 900);
    } else {
      audio.playSfx('tap');
      setWiggleId(pickedId);
      audio.speak(`Try again! ${target.word}`, 0.8);
      window.setTimeout(() => setWiggleId(null), 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Mascot
          pose={popId ? 'cheer' : 'think'}
          size="sm"
          speechBubble={`Where is "${target.word}"?`}
          onClick={() => audio.speak(target.word, 0.78)}
        />
        <BigButton
          color="#FFB84D"
          shadowColor="#E08B1F"
          size="md"
          onClick={() => audio.speak(target.word, 0.78)}
        >
          <Volume2 className="w-6 h-6" />
          <span>Nghe lại ({qIdx + 1}/{questions.length})</span>
        </BigButton>
      </div>

      <div
        className={`grid gap-4 max-w-3xl ${
          options.length <= 2
            ? 'grid-cols-2'
            : options.length === 3
            ? 'grid-cols-3'
            : 'grid-cols-2 sm:grid-cols-4'
        }`}
      >
        {options.map((opt) => (
          <PictureCard
            key={opt.id}
            slug={opt.image}
            emoji={opt.emoji}
            swatch={opt.swatch}
            size="lg"
            hideText
            wiggle={wiggleId === opt.id}
            pop={popId === opt.id}
            onClick={() => handlePick(opt.id)}
          />
        ))}
      </div>
    </div>
  );
};
