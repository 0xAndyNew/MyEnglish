import React from 'react';

interface ProgressCaterpillarProps {
  total: number;
  current: number; // 0-based active index
  accentColor?: string;
}

export const ProgressCaterpillar: React.FC<ProgressCaterpillarProps> = ({
  total,
  current,
  accentColor = '#4CC38A',
}) => {
  const dots = Array.from({ length: total }, (_, i) => i);

  return (
    <div
      className="inline-flex items-center gap-1.5 bg-white/85 backdrop-blur px-3 py-1.5 rounded-full shadow-sm border-2 border-white"
      aria-label={`Hoạt động ${current + 1} trên ${total}`}
    >
      <span className="text-xl leading-none select-none" aria-hidden>
        🐛
      </span>
      <div className="flex items-center gap-1">
        {dots.map((idx) => {
          const done = idx < current;
          const active = idx === current;
          return (
            <span
              key={idx}
              style={{
                backgroundColor: done || active ? accentColor : '#E2E8F0',
              }}
              className={`rounded-full transition-all duration-300 ${
                active ? 'w-5 h-3.5 ring-2 ring-amber-300 scale-110' : 'w-3 h-3'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
