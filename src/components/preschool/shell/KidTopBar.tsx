import { Lock } from 'lucide-react';
import React from 'react';
import { Mascot } from './Mascot';

interface KidTopBarProps {
  childName: string;
  stars: number;
  termUnitLabel: string;
  levelColor: string;
  onGreet?: () => void;
  onOpenParentGate: () => void;
}

export const KidTopBar: React.FC<KidTopBarProps> = ({
  childName,
  stars,
  termUnitLabel,
  levelColor,
  onGreet,
  onOpenParentGate,
}) => {
  return (
    <header className="w-full max-w-[1100px] mx-auto px-4 pt-3 pb-2 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <Mascot pose="hello" size="xs" onClick={onGreet} />
        <button
          type="button"
          onClick={onGreet}
          className="text-left min-w-0 focus:outline-none"
        >
          <div className="font-kid font-extrabold text-slate-800 text-lg sm:text-2xl truncate">
            Hi, {childName}!
          </div>
          <div
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-sm"
            style={{ backgroundColor: levelColor }}
          >
            {termUnitLabel}
          </div>
        </button>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <div
          className="flex items-center gap-1.5 bg-white border-2 border-amber-300 rounded-full px-3.5 py-1.5 shadow-sm"
          aria-label={`${stars} ngôi sao`}
        >
          <span className="text-xl leading-none">⭐</span>
          <span className="font-kid font-extrabold text-amber-600 text-lg sm:text-xl">{stars}</span>
        </div>

        <button
          type="button"
          onClick={onOpenParentGate}
          className="w-12 h-12 rounded-full bg-white/85 hover:bg-white border-2 border-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center shadow-sm transition active:scale-95"
          aria-label="Khu Phụ huynh"
          title="Khu Phụ huynh (giữ để mở khoá)"
        >
          <Lock className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
