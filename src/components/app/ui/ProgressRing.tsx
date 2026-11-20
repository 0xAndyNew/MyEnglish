import React from 'react';

export interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  max,
  size = 68,
  strokeWidth = 7,
  label,
  sublabel,
}) => {
  const safeMax = Math.max(1, max);
  const pct = Math.min(1, Math.max(0, value / safeMax));
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct);

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgb(var(--brand))"
          strokeWidth={strokeWidth}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
        <span className="text-sm font-black text-slate-900 dark:text-white">
          {label ?? `${Math.round(pct * 100)}%`}
        </span>
        {sublabel && (
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
