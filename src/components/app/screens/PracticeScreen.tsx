import React, { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import type { TrackStep } from '../../../config/audienceTracks';
import type { LearnerProfile } from '../../../types/audience';
import type { UserProgress } from '../../../types/learning';
import type { AgeTier } from '../theme/ageTiers';
import type { AppRoute } from '../useHashRoute';

const ExerciseHub = lazy(() =>
  import('../exercises/ExerciseHub').then((m) => ({ default: m.ExerciseHub }))
);

export interface PracticeScreenProps {
  tier: AgeTier;
  profile: LearnerProfile;
  steps: TrackStep[];
  progress: UserProgress;
  effectiveApiKey?: string;
  initialCategory?: string;
  initialSub?: string;
  onRateSrs: (wordId: string, quality: 0 | 2 | 4 | 5) => void;
  onAddXp: (amount: number) => void;
  onNavigate: (route: AppRoute) => void;
}

export const PracticeScreen: React.FC<PracticeScreenProps> = ({
  tier,
  profile,
  progress,
  effectiveApiKey,
  initialCategory,
  initialSub,
  onRateSrs,
  onAddXp,
  onNavigate,
}) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-16 text-sm font-semibold text-slate-500 gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-brand" />
          <span>Đang mở kho bài tập...</span>
        </div>
      }
    >
      <ExerciseHub
        tier={tier}
        profile={profile}
        progress={progress}
        effectiveApiKey={effectiveApiKey}
        initialCategory={initialCategory}
        initialSub={initialSub}
        onRateSrs={onRateSrs}
        onAddXp={onAddXp}
        onNavigate={onNavigate}
      />
    </Suspense>
  );
};
