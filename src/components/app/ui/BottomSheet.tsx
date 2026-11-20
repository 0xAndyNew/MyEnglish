import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useBackToClose } from '../useHashRoute';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  useBackToClose(open, onClose);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="fixed inset-0 bg-slate-950/55 backdrop-blur-xs animate-fade-in"
        onClick={onClose}
      />

      <div className="relative z-10 w-full sm:max-w-lg max-h-[88dvh] bg-white dark:bg-slate-900 rounded-t-[28px] sm:rounded-[28px] border-t sm:border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-sheet-up pb-safe">
        {/* Grab handle on mobile */}
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden">
          <div className="w-10 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white truncate">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="w-11 h-11 -mr-2 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  );
};
