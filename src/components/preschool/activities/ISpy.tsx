import { Volume2 } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';
import { PictureCard } from '../ui/PictureCard';
import type { ActivityProps } from './activityTypes';

export const ISpy: React.FC<ActivityProps> = ({ unit, words, audio, onDone }) => {
  const targets = useMemo(() => words.slice(0, 3), [words]);
  const board = useMemo(() => unit.words.slice(0, 8), [unit.words]);
  const [tIdx, setTIdx] = useState(0);
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [wiggleId, setWiggleId] = useState<string | null>(null);

  const target = targets[tIdx];

  useEffect(() => {
    if (target) {
      audio.speak(`I spy with my little eye... ${target.word}!`, 0.82);
    }
  }, [target?.id]);

  if (!target) {
    onDone();
    return null;
  }

  const handleTap = (id: string) => {
    if (foundIds.includes(id)) return;
    if (id === target.id) {
      audio.playSfx('ding');
      const nextFound = [...foundIds, id];
      setFoundIds(nextFound);
      audio.speak(`You found ${target.word}!`, 0.85);
      window.setTimeout(() => {
        if (tIdx < targets.length - 1) setTIdx((i) => i + 1);
        else onDone();
      }, 750);
    } else {
      audio.playSfx('tap');
      setWiggleId(id);
      audio.speak(`Keep looking for ${target.word}!`, 0.85);
      window.setTimeout(() => setWiggleId(null), 450);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 py-2 text-center">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Mascot
          pose="think"
          size="sm"
          speechBubble={`I spy "${target.word}"!`}
          onClick={() => audio.speak(target.word, 0.8)}
        />
        <BigButton
          color="#5B8DEF"
          shadowColor="#3A6AD0"
          size="md"
          onClick={() => audio.speak(`I spy ${target.word}`, 0.8)}
        >
          <Volume2 className="w-5 h-5" />
          <span>Tìm đồ vật ({tIdx + 1}/{targets.length})</span>
        </BigButton>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
        {board.map((w) => {
          const found = foundIds.includes(w.id);
          return (
            <PictureCard
              key={w.id}
              slug={w.image}
              emoji={w.emoji}
              swatch={w.swatch}
              size="md"
              hideText
              pop={found}
              wiggle={wiggleId === w.id}
              onClick={() => handleTap(w.id)}
              className={found ? 'opacity-50' : ''}
            />
          );
        })}
      </div>
    </div>
  );
};
