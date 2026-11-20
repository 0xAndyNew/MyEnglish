import React from 'react';
import type { AgeTier } from '../theme/ageTiers';

export interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tier?: AgeTier;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'md' | 'lg';
  fullWidth?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({
  tier = 'pro',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...rest
}) => {
  const sizeCls =
    size === 'lg'
      ? 'min-h-[52px] px-5 py-3 text-base font-extrabold'
      : 'min-h-[44px] px-4 py-2.5 text-sm font-bold';

  const variantCls = (() => {
    if (variant === 'primary') {
      if (tier === 'playful') {
        return 'kids-btn-orange text-white rounded-full';
      }
      if (tier === 'bright') {
        return 'bg-brand text-white btn-3d rounded-[var(--radius-btn)]';
      }
      return 'bg-brand text-white hover:brightness-110 active:scale-[0.98] shadow-sm rounded-[var(--radius-btn)]';
    }
    if (variant === 'secondary') {
      if (tier === 'playful') {
        return 'kids-btn-blue text-white rounded-full';
      }
      if (tier === 'bright') {
        return 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-2 border-slate-200 dark:border-slate-700 shadow-[0_3px_0_rgba(148,163,184,0.35)] active:translate-y-[2px] rounded-[var(--radius-btn)]';
      }
      return 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 active:scale-[0.98] rounded-[var(--radius-btn)]';
    }
    if (variant === 'danger') {
      return 'bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.98] rounded-[var(--radius-btn)]';
    }
    return 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98] rounded-[var(--radius-btn)]';
  })();

  return (
    <button
      type={rest.type || 'button'}
      {...rest}
      className={`inline-flex items-center justify-center gap-2 transition disabled:opacity-45 disabled:cursor-not-allowed select-none ${sizeCls} ${variantCls} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
};
