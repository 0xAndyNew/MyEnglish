import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface UsePaginationOptions {
  /** Thay đổi giá trị này (vd: bộ lọc, từ khóa, khối lớp) sẽ tự đưa về trang 1 */
  resetKey?: string | number | boolean;
  /** Chỉ số (0-based) của mục đang được chọn; khi thay đổi sẽ tự nhảy tới trang chứa mục đó */
  activeIndex?: number;
}

export interface PaginationResult<T> {
  page: number;
  setPage: (nextPage: number) => void;
  totalPages: number;
  pageItems: T[];
  startIdx: number;
  endIdx: number;
  totalItems: number;
  jumpToIndex: (index: number) => void;
}

export function usePagination<T>(
  items: readonly T[],
  pageSize: number,
  options?: UsePaginationOptions,
): PaginationResult<T> {
  const safeSize = Math.max(1, pageSize);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safeSize));

  const [page, setPageState] = useState<number>(() => {
    const idx = options?.activeIndex;
    if (typeof idx === 'number' && idx >= 0) {
      return Math.floor(idx / safeSize) + 1;
    }
    return 1;
  });

  const prevResetKey = useRef(options?.resetKey);
  useEffect(() => {
    if (options?.resetKey !== prevResetKey.current) {
      prevResetKey.current = options?.resetKey;
      setPageState(1);
    }
  }, [options?.resetKey]);

  const prevActiveIdx = useRef(options?.activeIndex);
  useEffect(() => {
    const idx = options?.activeIndex;
    if (typeof idx === 'number' && idx >= 0 && idx !== prevActiveIdx.current) {
      prevActiveIdx.current = idx;
      const targetPage = Math.floor(idx / safeSize) + 1;
      setPageState(Math.min(Math.max(1, targetPage), totalPages));
    } else {
      prevActiveIdx.current = idx;
    }
  }, [options?.activeIndex, safeSize, totalPages]);

  const safePage = Math.min(Math.max(1, page), totalPages);
  const startIdx = (safePage - 1) * safeSize;
  const pageItems = useMemo(
    () => items.slice(startIdx, startIdx + safeSize),
    [items, startIdx, safeSize],
  );
  const endIdx = startIdx + pageItems.length;

  const setPage = (next: number) => {
    setPageState(Math.min(Math.max(1, next), totalPages));
  };

  const jumpToIndex = (index: number) => {
    if (index < 0) return;
    setPage(Math.floor(index / safeSize) + 1);
  };

  return {
    page: safePage,
    setPage,
    totalPages,
    pageItems,
    startIdx,
    endIdx,
    totalItems,
    jumpToIndex,
  };
}

function getPageTokens(current: number, total: number, compact?: boolean): (number | 'dots')[] {
  if (total <= (compact ? 5 : 7)) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (compact) {
    const set = new Set<number>([1, total, current]);
    if (current > 1) set.add(current - 1);
    if (current < total) set.add(current + 1);
    const sorted = Array.from(set).sort((a, b) => a - b);
    const tokens: (number | 'dots')[] = [];
    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i] - sorted[i - 1] > 1) tokens.push('dots');
      tokens.push(sorted[i]);
    }
    return tokens;
  }

  const tokens: (number | 'dots')[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) tokens.push('dots');
  for (let p = left; p <= right; p++) tokens.push(p);
  if (right < total - 1) tokens.push('dots');
  tokens.push(total);
  return tokens;
}

export interface PaginationBarProps {
  page: number;
  totalPages: number;
  totalItems: number;
  startIdx: number;
  endIdx: number;
  onPageChange: (page: number) => void;
  variant?: 'kid' | 'default';
  itemLabel?: string;
  compact?: boolean;
  className?: string;
  scrollTargetRef?: React.RefObject<HTMLElement | null>;
}

export const PaginationBar: React.FC<PaginationBarProps> = ({
  page,
  totalPages,
  totalItems,
  startIdx,
  endIdx,
  onPageChange,
  variant = 'default',
  itemLabel = 'mục',
  compact = false,
  className = '',
  scrollTargetRef,
}) => {
  if (totalItems === 0 || totalPages <= 1) return null;

  const handleChange = (nextPage: number) => {
    if (nextPage === page || nextPage < 1 || nextPage > totalPages) return;
    onPageChange(nextPage);
    if (scrollTargetRef?.current) {
      scrollTargetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tokens = getPageTokens(page, totalPages, compact);
  const from = startIdx + 1;
  const to = endIdx;

  if (variant === 'kid') {
    return (
      <nav
        aria-label={`Phân trang ${itemLabel}`}
        className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/90 via-white to-rose-50/80 px-4 py-3 shadow-sm ${className}`}
      >
        <div className="text-xs sm:text-sm font-bold text-slate-600">
          Đang xem <span className="text-rose-600 font-black">{from}–{to}</span> / {totalItems} {itemLabel}
          {!compact && (
            <span className="ml-2 text-slate-400 font-semibold">
              • Trang {page}/{totalPages}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleChange(page - 1)}
            disabled={page <= 1}
            className="inline-flex items-center gap-1 rounded-xl border border-amber-200 bg-white px-3 py-2 text-xs sm:text-sm font-extrabold text-slate-700 shadow-sm transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            {!compact && <span>Trước</span>}
          </button>

          {tokens.map((tok, i) =>
            tok === 'dots' ? (
              <span key={`dots-${i}`} className="px-1.5 text-xs font-extrabold text-slate-400 select-none">
                ...
              </span>
            ) : (
              <button
                key={tok}
                type="button"
                onClick={() => handleChange(tok)}
                aria-current={tok === page ? 'page' : undefined}
                className={`min-w-[36px] h-9 px-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
                  tok === page
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md scale-105'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50'
                }`}
              >
                {tok}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => handleChange(page + 1)}
            disabled={page >= totalPages}
            className="inline-flex items-center gap-1 rounded-xl border border-amber-200 bg-white px-3 py-2 text-xs sm:text-sm font-extrabold text-slate-700 shadow-sm transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            {!compact && <span>Sau</span>}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav
      aria-label={`Phân trang ${itemLabel}`}
      className={`flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/90 px-3.5 py-2.5 shadow-sm ${className}`}
    >
      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
        Đang xem <span className="font-bold text-slate-800 dark:text-slate-100">{from}–{to}</span> / {totalItems} {itemLabel}
        {!compact && (
          <span className="ml-1.5 text-slate-400 dark:text-slate-500">
            • Trang {page}/{totalPages}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={() => handleChange(page - 1)}
          disabled={page <= 1}
          aria-label="Trang trước"
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition hover:bg-slate-50 dark:hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          {!compact && <span>Trước</span>}
        </button>

        {tokens.map((tok, i) =>
          tok === 'dots' ? (
            <span key={`dots-${i}`} className="px-1 text-xs font-bold text-slate-400 select-none">
              ...
            </span>
          ) : (
            <button
              key={tok}
              type="button"
              onClick={() => handleChange(tok)}
              aria-current={tok === page ? 'page' : undefined}
              className={`min-w-[30px] h-7 px-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                tok === page
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {tok}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => handleChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Trang sau"
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition hover:bg-slate-50 dark:hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          {!compact && <span>Sau</span>}
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </nav>
  );
};
