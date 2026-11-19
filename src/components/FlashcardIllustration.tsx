import React from 'react';
import { WordEntry } from '../types/learning';
import { resolveFlashcardImage } from '../utils/flashcardMedia';

interface FlashcardIllustrationProps {
  wordEntry: WordEntry;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Hiển thị thẻ tranh minh họa chuẩn nền trắng căn giữa (`object-contain bg-white`)
 * cho từng từ vựng trên Flashcard 3D, Thư viện Từ vựng và SRS.
 */
export const FlashcardIllustration: React.FC<FlashcardIllustrationProps> = ({
  wordEntry,
  size = 'lg',
}) => {
  const sizeCls =
    size === 'sm'
      ? 'w-14 h-14 p-1 rounded-xl'
      : size === 'md'
      ? 'w-20 h-20 p-1.5 rounded-2xl'
      : 'w-28 h-28 sm:w-32 sm:h-32 p-2 rounded-2xl';

  const imgSrc = resolveFlashcardImage(wordEntry.word, wordEntry.meaningVi, wordEntry.topicId);

  return (
    <div
      title={`${wordEntry.word}: ${wordEntry.meaningVi}`}
      className={`${sizeCls} bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center shrink-0 select-none overflow-hidden`}
    >
      <img
        src={imgSrc}
        alt={wordEntry.word}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
  );
};
