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

export const MiniCheck: React.FC<ActivityProps> = ({ unit, words, level, audio, onDone }) => {
  const questions = useMemo(() => shuffle(words).slice(0, 3), [unit.id]);
  const [idx, setIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [popId, setPopId] = useState<string | null>(null);
  const [wiggleId, setWiggleId] = useState<string | null>(null);

  const target = questions[idx];
  const options = useMemo(() => {
    if (!target) return [];
    const others = shuffle(unit.words.filter((w) => w.id !== target.id)).slice(
      0,
      Math.max(1, level.maxChoices - 1)
    );
    return shuffle([target, ...others]);
  }, [target?.id, unit.id, level.maxChoices]);

  useEffect(() => {
    if (target) audio.speak(`Find ${target.word}!`, 0.8);
  }, [target?.id]);

  if (!target) {
    onDone();
    return null;
  }

  const handlePick = (id: string) => {
    if (popId) return;
    if (id === target.id) {
      audio.playSfx('celebrate');
      setPopId(id);
      setStars((s) => s + 1);
      audio.speak(`Super! ${target.word}!`, 0.85);
      window.setTimeout(() => {
        setPopId(null);
        if (idx < questions.length - 1) setIdx((i) => i + 1);
        else onDone();
      }, 900);
    } else {
      audio.playSfx('tap');
      setWiggleId(id);
      audio.speak(`Almost! Find ${target.word}`, 0.82);
      window.setTimeout(() => setWiggleId(null), 450);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Mascot pose={popId ? 'cheer' : 'hello'} size="sm" />
        <div className="font-kid font-extrabold text-2xl text-slate-800">
          🌟 Thử thách vui nhận Sticker! ({stars}/{questions.length} ⭐)
        </div>
      </div>

      <BigButton
        color="#FFB84D"
        shadowColor="#E08B1F"
        size="lg"
        onClick={() => audio.speak(target.word, 0.8)}
      >
        <Volume2 className="w-6 h-6" />
        <span>Nghe: &ldquo;{target.word}&rdquo;</span>
      </BigButton>

      <div className="flex flex-wrap items-center justify-center gap-4 max-w-3xl">
        {options.map((opt) => (
          <PictureCard
            key={opt.id}
            slug={opt.image}
            emoji={opt.emoji}
            swatch={opt.swatch}
            size="lg"
            hideText
            pop={popId === opt.id}
            wiggle={wiggleId === opt.id}
            onClick={() => handlePick(opt.id)}
          />
        ))}
      </div>
    </div>
  );
};
