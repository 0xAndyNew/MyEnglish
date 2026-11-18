import { ArrowRight, Volume2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';
import { PictureCard } from '../ui/PictureCard';
import type { ActivityProps } from './activityTypes';

export const FlashcardActivity: React.FC<ActivityProps> = ({
  activity,
  words,
  level,
  audio,
  onDone,
}) => {
  const isReview = activity.type === 'review';
  const [idx, setIdx] = useState(0);
  const [tapped, setTapped] = useState(false);
  const [popping, setPopping] = useState(false);

  const card = words[Math.min(idx, words.length - 1)];

  useEffect(() => {
    setTapped(false);
    if (card) {
      audio.speak(card.word, 0.78);
    }
  }, [idx, card?.id]);

  if (!card) {
    onDone();
    return null;
  }

  const handleCardTap = () => {
    audio.playSfx('pop');
    setPopping(true);
    setTapped(true);
    window.setTimeout(() => setPopping(false), 350);
    const spoken = card.sound ? `${card.word}! ${card.sound}` : card.word;
    audio.speak(spoken, 0.78);
  };

  const handleNext = () => {
    audio.playSfx('ding');
    if (idx < words.length - 1) {
      setIdx((i) => i + 1);
    } else {
      onDone();
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <div className="flex items-center gap-3">
        <Mascot pose="point" size="sm" onClick={handleCardTap} />
        <div className="font-kid font-extrabold text-xl sm:text-2xl text-slate-700">
          {isReview ? '🔁 Nhớ lại nào!' : '🖼️ Chạm vào tranh để nghe!'} ({idx + 1}/{words.length})
        </div>
      </div>

      <PictureCard
        slug={card.image}
        emoji={card.emoji}
        label={card.word}
        subLabelVi={card.meaningVi}
        swatch={card.swatch}
        size="xl"
        pop={popping}
        onClick={handleCardTap}
      />

      {card.sound && (
        <div className="px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-kid font-bold text-lg">
          🔊 {card.sound}
        </div>
      )}

      {level.parentTips && (
        <div className="text-xs font-semibold text-slate-500 bg-white/80 px-4 py-2 rounded-full border border-amber-100">
          💡 Bố mẹ chạm vào tranh cùng bé và nhắc lại từ <strong>"{card.word}"</strong> nhé!
        </div>
      )}

      <div className="flex items-center gap-3 pt-1">
        <BigButton
          color="#94A3B8"
          shadowColor="#64748B"
          size="md"
          onClick={handleCardTap}
        >
          <Volume2 className="w-6 h-6" />
          <span>Nghe lại</span>
        </BigButton>

        <BigButton
          color={level.color}
          shadowColor={level.colorDark}
          size="lg"
          disabled={!tapped && !isReview}
          onClick={handleNext}
        >
          <span>{idx < words.length - 1 ? 'Từ tiếp' : 'Xong rồi!'}</span>
          <ArrowRight className="w-6 h-6" />
        </BigButton>
      </div>
    </div>
  );
};
