import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { TILE_PALETTE, type AgeTier } from '../theme/ageTiers';

export interface AppCardProps {
  tier?: AgeTier;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  tier = 'pro',
  className = '',
  children,
  onClick,
}) => {
  const base =
    tier === 'playful'
      ? 'kids-glass-card rounded-[26px]'
      : tier === 'bright'
      ? 'bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 card-3d rounded-[22px]'
      : 'bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm rounded-[18px]';

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`w-full text-left transition active:scale-[0.99] ${base} ${className}`}
      >
        {children}
      </button>
    );
  }
  return <div className={`${base} ${className}`}>{children}</div>;
};

export interface AppTileProps {
  tier: AgeTier;
  index: number;
  title: string;
  subtitle?: string;
  emoji?: string;
  image?: string;
  badge?: string;
  done?: boolean;
  className?: string;
  onClick: () => void;
}

export const AppTile: React.FC<AppTileProps> = ({
  tier,
  index,
  title,
  subtitle,
  emoji,
  image,
  badge,
  done,
  className = '',
  onClick,
}) => {
  const palette = TILE_PALETTE[index % TILE_PALETTE.length];

  if (tier === 'playful') {
    return (
      <button
        type="button"
        onClick={onClick}
        style={{ backgroundColor: palette.bg, borderColor: palette.border }}
        className={`relative rounded-[24px] border-2 p-3.5 sm:p-4 flex flex-col items-center text-center gap-2 shadow-[0_6px_14px_-6px_rgba(18,58,111,0.2)] hover:scale-[1.02] active:scale-95 transition min-h-[146px] ${className}`}
      >
        {done && (
          <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 text-amber-500 flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </span>
        )}
        {badge && !done && (
          <span
            style={{ color: palette.ink }}
            className="absolute top-2 left-2.5 text-xs font-extrabold opacity-80"
          >
            {badge}
          </span>
        )}

        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mt-1">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-contain drop-shadow-xs" />
          ) : (
            <span className="text-4xl">{emoji || '✨'}</span>
          )}
        </div>

        <div className="w-full leading-tight">
          <div className="text-sm sm:text-base font-extrabold text-[#123A6F] line-clamp-2">
            {title}
          </div>
          {subtitle && (
            <div className="text-xs font-bold text-[#486B94] line-clamp-1 mt-0.5">{subtitle}</div>
          )}
        </div>
      </button>
    );
  }

  const isBright = tier === 'bright';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left p-4 flex flex-col justify-between gap-3 transition active:scale-[0.98] min-h-[138px] ${className} ${
        isBright
          ? 'bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 rounded-[22px] card-3d hover:border-brand/60'
          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[18px] shadow-xs hover:border-brand/50 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between gap-2 w-full">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden ${
            isBright ? 'bg-brand-soft/80' : 'bg-slate-100 dark:bg-slate-800'
          }`}
        >
          {image ? (
            <img src={image} alt={title} className="w-10 h-10 object-contain" />
          ) : (
            <span className="text-2xl">{emoji || '📘'}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {badge && (
            <span className="px-2 py-0.5 rounded-lg bg-brand-soft text-brand text-xs font-extrabold">
              {badge}
            </span>
          )}
          {done && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug line-clamp-2">
          {title}
        </div>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </button>
  );
};
