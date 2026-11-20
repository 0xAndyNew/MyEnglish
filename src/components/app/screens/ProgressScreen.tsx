import React from 'react';
import { CheckCircle2, Flame, Sparkles, Trophy } from 'lucide-react';
import type { TrackStep } from '../../../config/audienceTracks';
import type { LearnerProfile } from '../../../types/audience';
import type { UserProgress } from '../../../types/learning';
import { KidsStarIcon } from '../../preschool/ui/KidsSceneShell';
import { isTrackStepDone } from '../studyTracker';
import type { AppRoute } from '../useHashRoute';
import { AppCard } from '../ui/Card';

export interface ProgressScreenProps {
  displayName: string;
  profile: LearnerProfile;
  steps: TrackStep[];
  visitedStepCodes: string[];
  progress: UserProgress;
  onNavigate: (route: AppRoute) => void;
}

/** Kids 6–10 "Thành tích" tab matching Preschool KidsProgressView aesthetics */
export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  displayName,
  profile,
  steps,
  visitedStepCodes,
  progress,
  onNavigate,
}) => {
  const passedLetters = progress.passedLetters?.length ?? 0;

  return (
    <div className="space-y-5">
      <AppCard tier="playful" className="p-5 text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#FFF3B8] border-2 border-[#FFE074] flex items-center justify-center shadow-sm">
          <Trophy className="w-8 h-8 text-[#D98200]" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-[#123A6F]">
            Bảng vàng của {displayName}!
          </h2>
          <p className="text-xs sm:text-sm font-bold text-[#486B94] mt-0.5">
            Mỗi ngày học một chút, bé sẽ nói tiếng Anh thật tự nhiên.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2.5 pt-2"> {/* ui-ok: 3-stat strip */}
          <div className="p-3 rounded-2xl bg-[#FFF7D1] border border-[#FFE074]">
            <div className="flex items-center justify-center gap-1 text-lg font-black text-[#9A5600]">
              <KidsStarIcon className="w-5 h-5" />
              <span>{progress.xp}</span>
            </div>
            <div className="text-xs font-bold text-[#9A5600]">Điểm XP</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFE7D1] border border-[#FFC28A]">
            <div className="flex items-center justify-center gap-1 text-lg font-black text-[#C2410C]">
              <Flame className="w-5 h-5 text-orange-500" />
              <span>{progress.streakDays}</span>
            </div>
            <div className="text-xs font-bold text-[#9A3412]">Ngày liên tiếp</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#DBF1FF] border border-[#95D9FF]">
            <div className="flex items-center justify-center gap-1 text-lg font-black text-[#075985]">
              <Sparkles className="w-4 h-4 text-[#1684F0]" />
              <span>{passedLetters}/26</span>
            </div>
            <div className="text-xs font-bold text-[#075985]">Chữ cái A–Z</div>
          </div>
        </div>
      </AppCard>

      <section className="space-y-2.5">
        <h3 className="text-lg font-extrabold text-[#123A6F] px-1">
          Huy hiệu chặng học
        </h3>
        <div className="space-y-2.5">
          {steps.map((st) => {
            const done = isTrackStepDone(st, profile, progress, visitedStepCodes);
            return (
              <AppCard
                key={st.code}
                tier="playful"
                onClick={() => onNavigate({ tab: 'learn', stepCode: st.code })}
                className="p-3.5 flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EEF7FF] flex items-center justify-center shrink-0 overflow-hidden">
                  {st.image ? (
                    <img src={st.image} alt={st.shortLabel || st.label} className="w-9 h-9 object-contain" />
                  ) : (
                    <span className="text-2xl">{st.emoji}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-extrabold text-[#123A6F] truncate">
                    {st.code} · {st.shortLabel || st.label}
                  </div>
                  <div className="text-xs font-bold text-[#486B94] truncate">
                    {done ? 'Đã mở huy hiệu chặng này!' : 'Chạm để khám phá ngay'}
                  </div>
                </div>
                {done ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-[#E3F4FF] text-[#1674DA] text-xs font-extrabold shrink-0">
                    Học
                  </span>
                )}
              </AppCard>
            );
          })}
        </div>
      </section>
    </div>
  );
};
