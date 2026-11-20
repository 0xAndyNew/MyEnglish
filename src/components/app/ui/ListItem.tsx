import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface ListItemProps {
  icon: React.ReactNode;
  iconBg?: string;
  title: string;
  subtitle?: string;
  value?: string;
  onClick?: () => void;
  rightSlot?: React.ReactNode;
  danger?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  icon,
  iconBg = 'bg-brand-soft text-brand',
  title,
  subtitle,
  value,
  onClick,
  rightSlot,
  danger = false,
}) => {
  const inner = (
    <>
      <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span
          className={`block text-sm font-bold truncate ${
            danger ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'
          }`}
        >
          {title}
        </span>
        {subtitle && (
          <span className="block text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
            {subtitle}
          </span>
        )}
      </span>
      {value && (
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">
          {value}
        </span>
      )}
      {rightSlot ?? (onClick ? <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" /> : null)}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full min-h-[54px] px-4 py-2.5 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 active:bg-slate-100 dark:active:bg-slate-800 transition"
      >
        {inner}
      </button>
    );
  }
  return (
    <div className="w-full min-h-[54px] px-4 py-2.5 flex items-center gap-3">{inner}</div>
  );
};
