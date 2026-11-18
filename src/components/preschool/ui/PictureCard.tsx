import React, { useEffect, useState } from 'react';
import { wordImageUrl } from '../../../data/preschool/types';

interface PictureCardProps {
  slug?: string;
  src?: string;
  emoji: string;
  label?: string;
  subLabelVi?: string;
  swatch?: string;
  onClick?: () => void;
  selected?: boolean;
  wiggle?: boolean;
  pop?: boolean;
  grayscale?: boolean;
  colorRevealPercent?: number; // 0..100 for MagicColor
  silhouette?: boolean; // dark shadow for ShadowMatch
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  hideText?: boolean;
}

export const PictureCard: React.FC<PictureCardProps> = ({
  slug,
  src,
  emoji,
  label,
  subLabelVi,
  swatch,
  onClick,
  selected = false,
  wiggle = false,
  pop = false,
  grayscale = false,
  colorRevealPercent,
  silhouette = false,
  size = 'lg',
  className = '',
  hideText = false,
}) => {
  const resolvedSrc = src || (slug ? wordImageUrl(slug) : '');
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [resolvedSrc]);

  const sizeBox =
    size === 'xl'
      ? 'w-56 h-56 sm:w-64 sm:h-64'
      : size === 'lg'
      ? 'w-40 h-40 sm:w-48 sm:h-48'
      : size === 'md'
      ? 'w-28 h-28 sm:w-36 sm:h-36'
      : 'w-20 h-20 sm:w-24 sm:h-24';

  const emojiText =
    size === 'xl'
      ? 'text-8xl'
      : size === 'lg'
      ? 'text-6xl sm:text-7xl'
      : size === 'md'
      ? 'text-5xl'
      : 'text-4xl';

  const filterStyle: React.CSSProperties = {};
  if (silhouette) {
    filterStyle.filter = 'brightness(0) opacity(0.85)';
  } else if (typeof colorRevealPercent === 'number') {
    const grayAmount = Math.max(0, 100 - colorRevealPercent);
    filterStyle.filter = `grayscale(${grayAmount}%)`;
    filterStyle.transition = 'filter 0.35s ease';
  } else if (grayscale) {
    filterStyle.filter = 'grayscale(100%)';
  }

  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      {...(onClick ? { type: 'button' as const, onClick } : {})}
      className={`group relative rounded-[28px] bg-white border-4 p-3 sm:p-4 flex flex-col items-center justify-center gap-2 shadow-[0_8px_0_rgba(15,23,42,0.08)] transition select-none ${
        selected
          ? 'border-amber-400 ring-4 ring-amber-200 scale-[1.03]'
          : 'border-white hover:border-amber-200'
      } ${onClick ? 'cursor-pointer active:translate-y-1' : ''} ${
        wiggle ? 'animate-kid-wiggle border-rose-200' : ''
      } ${pop ? 'animate-kid-pop border-emerald-400 ring-4 ring-emerald-200' : ''} ${className}`}
    >
      <div
        className={`${sizeBox} rounded-3xl flex items-center justify-center overflow-hidden bg-amber-50/40 relative`}
      >
        {swatch && !silhouette && (
          <div
            className="absolute inset-2 rounded-2xl opacity-20 pointer-events-none"
            style={{ backgroundColor: swatch }}
          />
        )}

        {resolvedSrc && !imgFailed ? (
          <img
            src={resolvedSrc}
            alt={label || emoji}
            loading="lazy"
            onError={() => setImgFailed(true)}
            style={filterStyle}
            className="w-full h-full object-contain p-1.5 select-none pointer-events-none"
          />
        ) : swatch && !silhouette ? (
          <div
            style={{ backgroundColor: swatch, ...filterStyle }}
            className="w-4/5 h-4/5 rounded-full shadow-inner border-4 border-white"
          />
        ) : (
          <span style={filterStyle} className={`${emojiText} leading-none select-none`}>
            {emoji}
          </span>
        )}
      </div>

      {!hideText && label && (
        <div className="text-center">
          <div className="font-kid font-extrabold text-slate-800 text-xl sm:text-2xl leading-tight tracking-wide">
            {label}
          </div>
          {subLabelVi && (
            <div className="text-xs font-semibold text-slate-400 mt-0.5">{subLabelVi}</div>
          )}
        </div>
      )}
    </Tag>
  );
};
