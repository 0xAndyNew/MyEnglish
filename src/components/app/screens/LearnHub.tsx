import React from 'react';
import { type AudienceTrackConfig, type TrackStep } from '../../../config/audienceTracks';
import type { AudienceMetadataItem, LearnerProfile } from '../../../types/audience';
import type { UserProgress } from '../../../types/learning';
import { isTrackStepDone } from '../studyTracker';
import type { AppRoute } from '../useHashRoute';
import type { AgeTier } from '../theme/ageTiers';
import { AppCard, AppTile } from '../ui/Card';

export interface LearnHubProps {
  tier: AgeTier;
  profile: LearnerProfile;
  audienceMeta: AudienceMetadataItem;
  audienceSubTag: string;
  trackConfig: AudienceTrackConfig;
  steps: TrackStep[];
  progress: UserProgress;
  visitedStepCodes: string[];
  onNavigate: (route: AppRoute) => void;
}

export const LearnHub: React.FC<LearnHubProps> = ({
  tier,
  profile,
  audienceMeta,
  audienceSubTag,
  trackConfig,
  steps,
  progress,
  visitedStepCodes,
  onNavigate,
}) => {
  const learnSteps = steps.filter((s) => !s.practiceOnly);
  const completedCount = learnSteps.filter((s) =>
    isTrackStepDone(s, profile, progress, visitedStepCodes)
  ).length;
  const pct = Math.round((completedCount / Math.max(1, learnSteps.length)) * 100);

  return (
    <div className="space-y-5">
      <AppCard tier={tier} className="p-4 sm:p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand">
              <span>{audienceMeta.emoji}</span>
              <span>
                {audienceMeta.shortLabel} · {audienceSubTag}
              </span>
            </span>
            <h2
              className={`text-lg sm:text-xl font-extrabold mt-1 ${
                tier === 'playful' ? 'text-[#123A6F]' : 'text-slate-900 dark:text-white'
              }`}
            >
              {trackConfig.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {trackConfig.subtitle}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-brand-soft text-brand text-xs font-black shrink-0">
            {completedCount}/{learnSteps.length}
          </span>
        </div>

        <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300"
            style={{ width: `${Math.max(8, pct)}%` }}
          />
        </div>
      </AppCard>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {learnSteps.map((st, idx) => (
          <AppTile
            key={st.code}
            tier={tier}
            index={idx}
            title={st.shortLabel || st.label}
            subtitle={st.shortDesc || st.description}
            emoji={st.emoji}
            image={st.image}
            badge={st.code}
            done={isTrackStepDone(st, profile, progress, visitedStepCodes)}
            onClick={() => onNavigate({ tab: 'learn', stepCode: st.code })}
          />
        ))}
      </div>
    </div>
  );
};
