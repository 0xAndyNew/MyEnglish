import React from 'react';
import { Home, Search } from 'lucide-react';
import type { TrackStep } from '../../../config/audienceTracks';
import type { AgeTier } from '../theme/ageTiers';
import { TopBar } from '../ui/TopBar';
import { ModuleRenderer, type ModuleRendererProps } from '../ModuleRenderer';

export interface ModuleScreenProps extends ModuleRendererProps {
  step: TrackStep;
  tier: AgeTier;
  showSearch: boolean;
  onOpenSearch: () => void;
  onBack: () => void;
}

export const ModuleScreen: React.FC<ModuleScreenProps> = ({
  step,
  tier,
  showSearch,
  onOpenSearch,
  onBack,
  ...rendererProps
}) => {
  return (
    <div className="min-h-dvh flex flex-col animate-screen-in">
      <TopBar
        tier={tier}
        title={step.shortLabel || step.label}
        subtitle={step.shortDesc || step.description}
        onBack={onBack}
        rightSlot={
          <>
            {showSearch && (
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Tra từ điển nhanh"
                className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            <button
              type="button"
              onClick={rendererProps.onBackToLearn}
              aria-label="Về trang chủ"
              title="Trang chủ"
              className={`w-11 h-11 rounded-full flex items-center justify-center transition active:scale-95 ${
                tier === 'playful'
                  ? 'bg-[#E3F4FF] text-[#1674DA] border-2 border-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Home className="w-5 h-5" />
            </button>
          </>
        }
      />

      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-5 pt-4 pb-10">
        <ModuleRenderer step={step} tier={tier} {...rendererProps} />
      </main>
    </div>
  );
};
