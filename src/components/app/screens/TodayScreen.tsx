import React, { useMemo } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Flame,
  Gamepad2,
  Play,
  RotateCcw,
} from 'lucide-react';
import { type AudienceTrackConfig, type TrackStep } from '../../../config/audienceTracks';
import { type AudienceMetadataItem, type LearnerProfile } from '../../../types/audience';
import type { UserProgress } from '../../../types/learning';
import { KidsRocketHeroBanner } from '../../preschool/ui/KidsSceneShell';
import { isTrackStepDone } from '../studyTracker';
import type { AppRoute } from '../useHashRoute';
import type { AgeTier } from '../theme/ageTiers';
import { AppButton } from '../ui/Button';
import { AppCard, AppTile } from '../ui/Card';

export interface TodayScreenProps {
  tier: AgeTier;
  displayName: string;
  profile: LearnerProfile;
  audienceMeta: AudienceMetadataItem;
  audienceSubTag: string;
  trackConfig: AudienceTrackConfig;
  steps: TrackStep[];
  progress: UserProgress;
  lastStepCode: string | null;
  visitedStepCodes: string[];
  todayMinutes: number;
  onNavigate: (route: AppRoute) => void;
}

export const TodayScreen: React.FC<TodayScreenProps> = ({
  tier,
  displayName,
  profile,
  audienceMeta,
  audienceSubTag,
  trackConfig,
  steps,
  progress,
  lastStepCode,
  visitedStepCodes,
  todayMinutes,
  onNavigate,
}) => {
  const learnSteps = useMemo(() => steps.filter((s) => !s.practiceOnly), [steps]);

  const recommendedStep = useMemo(() => {
    if (lastStepCode) {
      const found = learnSteps.find((s) => s.code === lastStepCode);
      if (found) return found;
    }
    const nextUnfinished = learnSteps.find(
      (s) => !isTrackStepDone(s, profile, progress, visitedStepCodes)
    );
    return nextUnfinished || learnSteps[0] || steps[0];
  }, [lastStepCode, learnSteps, steps, profile, progress, visitedStepCodes]);

  const dueSrsCount = useMemo(() => {
    const now = Date.now();
    return progress.savedWords.filter((w) => {
      const card = progress.srsCards[w.id];
      return !card || card.nextReviewAt <= now;
    }).length;
  }, [progress.savedWords, progress.srsCards]);

  const srsRoute: AppRoute = { tab: 'practice', stepCode: 'srs' };

  const completedStepsCount = learnSteps.filter((s) =>
    isTrackStepDone(s, profile, progress, visitedStepCodes)
  ).length;

  // ============================================================================
  // PLAYFUL TIER (Kids 6–10) — Matching Preschool 1–6 aesthetic
  // ============================================================================
  if (tier === 'playful') {
    const mainSteps = learnSteps;
    return (
      <div className="space-y-6">
        <KidsRocketHeroBanner
          subtitle={`Hôm nay: ${recommendedStep.shortLabel || recommendedStep.label}`}
          onStart={() => onNavigate({ tab: 'learn', stepCode: recommendedStep.code })}
        />

        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#123A6F]">
              Hành trình của bé
            </h2>
            <span className="px-3 py-1 rounded-full bg-white/85 border border-white text-xs font-extrabold text-[#1674DA] shadow-2xs">
              {completedStepsCount}/{learnSteps.length} chặng
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {mainSteps.map((st, idx) => {
              const isOddLast =
                mainSteps.length % 2 === 1 && idx === mainSteps.length - 1;
              return (
                <AppTile
                  key={st.code}
                  tier="playful"
                  index={idx}
                  title={st.shortLabel || st.label}
                  subtitle={st.shortDesc}
                  emoji={st.emoji}
                  image={st.image}
                  badge={st.code}
                  done={isTrackStepDone(st, profile, progress, visitedStepCodes)}
                  className={isOddLast ? 'col-span-2 sm:col-span-1' : ''}
                  onClick={() => onNavigate({ tab: 'learn', stepCode: st.code })}
                />
              );
            })}
          </div>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#123A6F] px-1">
            Góc vui học mỗi ngày
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onNavigate({ tab: 'learn', stepCode: 'K3' })}
              className="rounded-[24px] bg-gradient-to-br from-[#DDF7C8] to-[#BCEE9B] border-2 border-white p-4 flex items-center gap-3.5 shadow-sm hover:scale-[1.01] active:scale-95 transition text-left min-h-[76px]"
            >
              <span className="w-12 h-12 rounded-2xl bg-white/90 text-[#2E9A1E] flex items-center justify-center shadow-xs shrink-0">
                <BookOpen className="w-6 h-6" />
              </span>
              <div className="min-w-0">
                <div className="font-extrabold text-base text-[#144B1A]">
                  Truyện kể & Bài hát
                </div>
                <div className="text-xs font-bold text-[#2F6D36]">
                  Nghe truyện tranh & hát theo nhịp điệu
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate({ tab: 'practice' })}
              className="rounded-[24px] bg-gradient-to-br from-[#FFE0B5] to-[#FFC880] border-2 border-white p-4 flex items-center gap-3.5 shadow-sm hover:scale-[1.01] active:scale-95 transition text-left min-h-[76px]"
            >
              <span className="w-12 h-12 rounded-2xl bg-white/90 text-[#EA580C] flex items-center justify-center shadow-xs shrink-0">
                <Gamepad2 className="w-6 h-6" />
              </span>
              <div className="min-w-0">
                <div className="font-extrabold text-base text-[#7C2D12]">
                  {profile.kids?.goal === 'yle' ? 'Bài tập & Cambridge YLE' : 'Làm bài tập & Trò chơi'}
                </div>
                <div className="text-xs font-bold text-[#9A3412]">
                  24 bài tập theo chủ đề & ghép tranh vui
                </div>
              </div>
            </button>
          </div>
        </section>
      </div>
    );
  }

  // ============================================================================
  // BRIGHT (Teen) & PRO (University / Worker / Exam)
  // ============================================================================
  const isBright = tier === 'bright';

  return (
    <div className="space-y-4">
      {/* Compact Hero Next Lesson Card */}
      <AppCard
        tier={tier}
        className={`p-5 overflow-hidden relative ${
          isBright
            ? 'bg-gradient-to-br from-sky-500 to-blue-600 border-sky-400 text-white'
            : 'bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-950 border-slate-800 text-white'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-xs font-extrabold backdrop-blur-xs">
              <span>{audienceMeta.emoji}</span>
              <span>{audienceSubTag}</span>
              <span className="opacity-70">•</span>
              <span>{recommendedStep.code}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black leading-snug">
              {recommendedStep.shortLabel || recommendedStep.label}
            </h2>
            <p className="text-sm text-white/85 line-clamp-2 leading-relaxed">
              {recommendedStep.shortDesc || recommendedStep.description}
            </p>
          </div>

          {recommendedStep.image && (
            <img
              src={recommendedStep.image}
              alt={recommendedStep.shortLabel || recommendedStep.label}
              className="w-16 h-16 rounded-2xl bg-white/15 p-1.5 object-contain shrink-0 hidden sm:block"
            />
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <AppButton
            tier={tier}
            size="lg"
            onClick={() => onNavigate({ tab: 'learn', stepCode: recommendedStep.code })}
            className={
              isBright
                ? '!bg-amber-400 !text-slate-950 ![box-shadow:0_4px_0_#b45309]'
                : '!bg-brand !text-white'
            }
          >
            <Play className="w-5 h-5 fill-current" />
            <span>{lastStepCode ? 'Học tiếp ngay' : 'Bắt đầu học'}</span>
          </AppButton>

          <div className="flex items-center gap-2 text-xs font-bold text-white/85">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              {progress.streakDays} ngày
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/10">
              {todayMinutes}/{profile.dailyMinutes} phút
            </span>
          </div>
        </div>
      </AppCard>

      {/* Only show SRS reminder strip when there are words due to review */}
      {dueSrsCount > 0 && (
        <button
          type="button"
          onClick={() => onNavigate(srsRoute)}
          className="w-full min-h-[46px] px-4 py-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between gap-2 text-left hover:border-amber-400 transition"
        >
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-800 dark:text-amber-200">
            <RotateCcw className="w-4 h-4 shrink-0" />
            <span>Có {dueSrsCount} từ vựng đến hạn ôn tập</span>
          </span>
          <span className="text-xs font-black text-amber-700 dark:text-amber-300 shrink-0">
            Ôn ngay →
          </span>
        </button>
      )}

      {/* Focused Lesson List */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
            Danh sách bài học ({learnSteps.length})
          </h3>
          <span className="text-xs font-extrabold text-brand">
            Đã mở {completedStepsCount}/{learnSteps.length}
          </span>
        </div>

        <div className="space-y-2.5">
          {learnSteps.map((st) => {
            const isDone = isTrackStepDone(st, profile, progress, visitedStepCodes);
            const isRecommended = st.code === recommendedStep.code;
            return (
              <AppCard
                key={st.code}
                tier={tier}
                onClick={() => onNavigate({ tab: 'learn', stepCode: st.code })}
                className={`p-3.5 sm:p-4 flex items-center gap-3 ${
                  isRecommended ? 'ring-2 ring-brand/60' : ''
                }`}
              >
                <div className="w-11 h-11 rounded-2xl bg-brand-soft text-brand flex items-center justify-center text-sm font-black shrink-0 overflow-hidden">
                  {st.image ? (
                    <img
                      src={st.image}
                      alt={st.shortLabel || st.label}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    st.emoji || st.code
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-brand">{st.code}</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate">
                      {st.shortLabel || st.label}
                    </span>
                    {isRecommended && (
                      <span className="px-2 py-0.5 rounded-full bg-brand text-white text-xs font-bold shrink-0">
                        Tiếp theo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {st.shortDesc || st.description}
                  </p>
                </div>

                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </AppCard>
            );
          })}
        </div>

        {/* Keep subtle track summary accessible */}
        <p className="text-xs text-slate-400 dark:text-slate-500 px-1 pt-1">
          {trackConfig.subtitle}
        </p>
      </section>
    </div>
  );
};
