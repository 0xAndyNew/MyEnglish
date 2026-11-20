import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { AgeTier } from '../theme/ageTiers';

export interface TopBarProps {
  tier: AgeTier;
  title: string;
  subtitle?: string;
  onBack: () => void;
  rightSlot?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({
  tier,
  title,
  subtitle,
  onBack,
  rightSlot,
}) => {
  const isPlayful = tier === 'playful';

  return (
    <header
      className={`sticky top-0 z-30 pt-safe border-b backdrop-blur-md ${
        isPlayful
          ? 'bg-white/90 border-white shadow-xs'
          : 'bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800'
      }`}
    >
      <div className="max-w-5xl mx-auto h-14 px-3 sm:px-5 flex items-center gap-2.5">
        <button
          type="button"
          onClick={onBack}
          aria-label="Quay lại"
          className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition active:scale-95 ${
            isPlayful
              ? 'bg-[#E3F4FF] text-[#1674DA] border-2 border-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="min-w-0 flex-1">
          <h1
            className={`text-base sm:text-lg font-extrabold truncate ${
              isPlayful ? 'text-[#123A6F]' : 'text-slate-900 dark:text-white'
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{subtitle}</p>
          )}
        </div>

        {rightSlot && <div className="shrink-0 flex items-center gap-1.5">{rightSlot}</div>}
      </div>
    </header>
  );
};
