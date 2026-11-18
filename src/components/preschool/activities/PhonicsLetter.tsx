import { ArrowRight, Volume2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { PHONICS_LETTERS, getPhonicsLetter } from '../../../data/preschool/phonics';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';
import { PictureCard } from '../ui/PictureCard';
import type { ActivityProps } from './activityTypes';

export const PhonicsLetter: React.FC<ActivityProps> = ({ activity, level, audio, onDone }) => {
  const item = getPhonicsLetter(activity.letter || 's') || PHONICS_LETTERS[0];
  const [heard, setHeard] = useState(false);

  useEffect(() => {
    audio.speak(`${item.sound}. ${item.exampleWord}`, 0.8);
  }, [item.letter]);

  const handleHear = () => {
    setHeard(true);
    audio.playSfx('pop');
    audio.speak(item.chant, 0.8);
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      <div className="flex items-center gap-3">
        <Mascot pose="point" size="sm" />
        <div className="font-kid font-extrabold text-2xl text-slate-800">
          🔤 Âm mới hôm nay: &ldquo;{item.letter.toUpperCase()}&rdquo;
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-5">
        <button
          type="button"
          onClick={handleHear}
          className="w-44 h-44 sm:w-52 sm:h-52 rounded-[36px] bg-white border-4 border-sky-200 shadow-lg flex flex-col items-center justify-center gap-1 hover:border-sky-400 active:scale-95 transition"
        >
          <span className="font-kid font-extrabold text-6xl sm:text-7xl text-sky-600 leading-none">
            {item.letter.toUpperCase()} {item.letter}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 mt-1">
            <Volume2 className="w-4 h-4 text-sky-500" />
            /{item.sound}/
          </span>
        </button>

        <PictureCard
          slug={item.exampleImage}
          emoji={item.emoji}
          label={item.exampleWord}
          size="lg"
          onClick={() => {
            setHeard(true);
            audio.playSfx('pop');
            audio.speak(`${item.sound}, ${item.exampleWord}`, 0.8);
          }}
        />
      </div>

      <div className="max-w-md px-4 py-2.5 rounded-2xl bg-sky-50 border-2 border-sky-200 text-xs sm:text-sm font-bold text-sky-900">
        👐 Động tác Jolly Phonics: {item.actionVi}
      </div>

      <BigButton
        color={level.color}
        shadowColor={level.colorDark}
        size="lg"
        onClick={() => {
          audio.playSfx('ding');
          if (!heard) audio.speak(item.chant, 0.85);
          onDone();
        }}
      >
        <span>Bé nhớ âm này rồi!</span>
        <ArrowRight className="w-6 h-6" />
      </BigButton>
    </div>
  );
};
