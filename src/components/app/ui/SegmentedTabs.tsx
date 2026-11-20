import React, { useEffect, useRef } from 'react';
import type { AgeTier } from '../theme/ageTiers';

export interface SegmentedTabItem {
  id: string;
  label: string;
  badge?: string | number;
}

export interface SegmentedTabsProps {
  items: SegmentedTabItem[];
  activeId: string;
  onChange: (id: string) => void;
  tier?: AgeTier;
  sticky?: boolean;
}

export const SegmentedTabs: React.FC<SegmentedTabsProps> = ({
  items,
  activeId,
  onChange,
  tier = 'pro',
  sticky = true,
}) => {
  const activeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [activeId]);

  if (items.length <= 1) return null;

  return (
    <div
      className={`${
        sticky ? 'sticky top-14 z-20' : ''
      } -mx-3 sm:-mx-5 px-3 sm:px-5 py-2 backdrop-blur-md ${
        tier === 'playful'
          ? 'bg-white/85 border-b border-white'
          : 'bg-slate-50/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800'
      }`}
    >
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={active ? activeRef : undefined}
              type="button"
              onClick={() => onChange(item.id)}
              className={`min-h-[44px] px-4 py-2 text-sm font-extrabold shrink-0 inline-flex items-center gap-1.5 transition active:scale-95 ${
                tier === 'playful' ? 'rounded-full' : 'rounded-xl'
              } ${
                active
                  ? tier === 'playful'
                    ? 'bg-[#1684F0] text-white shadow-sm'
                    : 'bg-brand text-white shadow-sm'
                  : tier === 'playful'
                  ? 'bg-[#EEF7FF] text-[#355C8A] hover:bg-[#DCF0FF]'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-brand/50'
              }`}
            >
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-xs font-extrabold ${
                    active
                      ? 'bg-white/25 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
