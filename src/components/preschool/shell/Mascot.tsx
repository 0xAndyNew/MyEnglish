import React, { useEffect, useState } from 'react';
import { mascotUrl } from '../../../data/preschool/types';

export type MascotPose = 'hello' | 'cheer' | 'think' | 'sleep' | 'point' | 'wave' | 'dance' | 'read';

interface MascotProps {
  pose?: MascotPose;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  speechBubble?: string;
  onClick?: () => void;
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  pose = 'hello',
  size = 'md',
  speechBubble,
  onClick,
  className = '',
}) => {
  const [failed, setFailed] = useState(false);
  const src = mascotUrl(pose);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const dim =
    size === 'lg'
      ? 'w-32 h-32 sm:w-40 sm:h-40'
      : size === 'md'
      ? 'w-20 h-20 sm:w-24 sm:h-24'
      : size === 'sm'
      ? 'w-14 h-14'
      : 'w-11 h-11';

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <button
        type="button"
        onClick={onClick}
        className={`${dim} shrink-0 rounded-full bg-white border-4 border-amber-200 shadow-md overflow-hidden flex items-center justify-center animate-kid-float focus:outline-none ${
          onClick ? 'cursor-pointer active:scale-95 transition' : 'cursor-default'
        }`}
        aria-label="Gấu Bo"
      >
        {!failed ? (
          <img
            src={src}
            alt={`Gấu Bo (${pose})`}
            onError={() => setFailed(true)}
            className="w-full h-full object-contain p-0.5 select-none pointer-events-none"
          />
        ) : (
          <span className={size === 'lg' ? 'text-6xl' : size === 'md' ? 'text-4xl' : 'text-2xl'}>
            🐻
          </span>
        )}
      </button>

      {speechBubble && (
        <div className="relative bg-white border-2 border-amber-200 rounded-2xl px-4 py-2 shadow-sm font-kid font-bold text-slate-800 text-base sm:text-lg max-w-xs">
          {speechBubble}
        </div>
      )}
    </div>
  );
};
