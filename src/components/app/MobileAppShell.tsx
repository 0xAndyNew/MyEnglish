import React, { useEffect, useMemo, useState } from 'react';
import { BookOpenCheck, Flame, Search, Settings, Trophy, X } from 'lucide-react';
import { type AudienceTrackConfig, type TrackStep } from '../../config/audienceTracks';
import {
  type AudienceId,
  type AudienceMetadataItem,
  type LearnerProfile,
} from '../../types/audience';
import type { UserAccount, UserProgress, WordEntry } from '../../types/learning';
import { AUDIENCE_IMAGE_MAP } from '../../utils/flashcardMedia';
import type { CustomLessonRecord } from '../../utils/storage';
import { KidsSceneShell } from '../preschool/ui/KidsSceneShell';
import { SearchSheet } from './SearchSheet';
import {
  addTodayStudySeconds,
  getLastStepCode,
  getTodayStudyMinutes,
  getVisitedStepCodes,
  markStepVisited,
  setLastStepCode,
} from './studyTracker';
import { MeScreen } from './screens/MeScreen';
import { ModuleScreen } from './screens/ModuleScreen';
import { PracticeScreen } from './screens/PracticeScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { TodayScreen } from './screens/TodayScreen';
import { getNavItems, getTabTitle, getTier, type AppTab } from './theme/ageTiers';
import { useHashRoute } from './useHashRoute';

export interface MobileAppShellProps {
  currentUser: UserAccount;
  effectiveProfile: LearnerProfile;
  audienceMeta: AudienceMetadataItem;
  audienceSubTag: string;
  activeTrackConfig: AudienceTrackConfig;
  activeTrackSteps: TrackStep[];
  currentAudienceUnlock: number;
  progress: UserProgress;
  darkMode: boolean;
  devUnlockAll: boolean;
  isAdminUser: boolean;
  isDevUser: boolean;
  adminPreviewAudience: AudienceId | null;
  effectiveApiKey: string;
  customLessons: CustomLessonRecord[];
  onQuickSwitchAudience: (aud: AudienceId) => void;
  onOpenProfileModal: () => void;
  onOpenAdminModal: () => void;
  onOpenWorkbookStudio: () => void;
  onToggleAccent: () => void;
  onToggleDarkMode: () => void;
  onToggleDevUnlock: () => void;
  onChangeAdminPreview: (aud: AudienceId | null) => void;
  onExportData: () => void;
  onLogout: () => void;
  onUnlockStep: (idx: number) => void;
  onAutoUnlockPracticeStages: () => void;
  onAddXp: (amount: number) => void;
  onSaveWord: (word: WordEntry) => void;
  onCompleteLesson: (lessonId: string) => void;
  onResetLessons: () => void;
  onTogglePhoneme: (id: string) => void;
  onPronunciationScore: (score: number) => void;
  onRateSrs: (wordId: string, quality: 0 | 2 | 4 | 5) => void;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const MobileAppShell: React.FC<MobileAppShellProps> = ({
  currentUser,
  effectiveProfile,
  audienceMeta,
  audienceSubTag,
  activeTrackConfig,
  activeTrackSteps,
  currentAudienceUnlock,
  progress,
  darkMode,
  devUnlockAll,
  isAdminUser,
  isDevUser,
  adminPreviewAudience,
  effectiveApiKey,
  customLessons,
  onQuickSwitchAudience,
  onOpenProfileModal,
  onOpenAdminModal,
  onOpenWorkbookStudio,
  onToggleAccent,
  onToggleDarkMode,
  onToggleDevUnlock,
  onChangeAdminPreview,
  onExportData,
  onLogout,
  onUnlockStep,
  onAutoUnlockPracticeStages,
  onAddXp,
  onSaveWord,
  onCompleteLesson,
  onResetLessons,
  onTogglePhoneme,
  onPronunciationScore,
  onRateSrs,
  onUpdateProgress,
}) => {
  const { route, navigate, back } = useHashRoute();
  const [searchOpen, setSearchOpen] = useState(false);
  const [todayMinutes, setTodayMinutes] = useState(() => getTodayStudyMinutes());

  const audience = effectiveProfile.audience;
  const [visitedStepCodes, setVisitedStepCodes] = useState<string[]>(() =>
    getVisitedStepCodes(audience)
  );
  const tier = getTier(audience);
  const isPlayful = tier === 'playful';
  const navItems = useMemo(() => getNavItems(audience), [audience]);

  useEffect(() => {
    setVisitedStepCodes(getVisitedStepCodes(audience));
  }, [audience]);

  const activeStep = useMemo(() => {
    if (route.tab !== 'learn' || !route.stepCode) return null;
    return activeTrackSteps.find((s) => s.code === route.stepCode) || null;
  }, [route, activeTrackSteps]);

  // Reset invalid/stale step routes when switching audience
  useEffect(() => {
    if (route.tab === 'learn' && route.stepCode && !activeStep) {
      navigate({ tab: 'today' }, { replace: true });
    }
  }, [audience, route.tab, route.stepCode, activeStep, navigate]);

  // Remember last visited step per audience & track active study minutes
  useEffect(() => {
    if (!activeStep) return;
    setLastStepCode(audience, activeStep.code);
    setVisitedStepCodes(markStepVisited(audience, activeStep.code));
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setTodayMinutes(addTodayStudySeconds(15));
      }
    }, 15000);
    return () => window.clearInterval(id);
  }, [activeStep, audience]);

  const lastStepCode = getLastStepCode(audience);

  // Ensure active tab is valid for current audience
  const activeTab: AppTab = navItems.some((n) => n.id === route.tab)
    ? route.tab
    : route.tab === 'learn' && audience === 'kids'
    ? 'today'
    : 'today';

  const bgClass = isPlayful
    ? ''
    : tier === 'bright'
    ? 'bg-gradient-to-b from-sky-50/80 via-slate-50 to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 text-slate-900 dark:text-slate-100'
    : 'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100';

  const renderDesktopRail = () => (
    <aside className="hidden lg:flex lg:w-60 shrink-0 flex-col justify-between sticky top-0 h-dvh border-r border-slate-200/80 dark:border-slate-800 bg-white/85 dark:bg-slate-900/90 backdrop-blur-md p-4">
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center shadow-sm shrink-0">
            <BookOpenCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-base font-black tracking-tight text-slate-900 dark:text-white truncate">
              MyEnglish
            </div>
            <div className="text-xs font-bold text-brand truncate">
              {audienceMeta.shortLabel} · {audienceSubTag}
            </div>
          </div>
        </div>

        <nav className="space-y-1.5" aria-label="Điều hướng chính">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isCurrent =
              activeStep && audience === 'kids'
                ? item.id === 'today'
                : activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate({ tab: item.id })}
                className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-2xl flex items-center gap-3 text-sm font-extrabold transition ${
                  isCurrent
                    ? 'bg-brand text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400">
            <Flame className="w-4 h-4" />
            {progress.streakDays} ngày
          </span>
          <span className="inline-flex items-center gap-1 text-brand">
            <Trophy className="w-4 h-4" />
            {progress.xp} XP
          </span>
        </div>
        {!isPlayful && (
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="w-full min-h-[40px] px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2 hover:border-brand transition"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span>Tra từ điển nhanh...</span>
          </button>
        )}
      </div>
    </aside>
  );

  const renderMobileHeader = () => (
    <header
      className={`sticky top-0 z-30 pt-safe backdrop-blur-md border-b ${
        isPlayful
          ? 'bg-white/88 border-white/90 shadow-xs'
          : 'bg-white/92 dark:bg-slate-900/92 border-slate-200/80 dark:border-slate-800'
      }`}
    >
      <div className="max-w-3xl mx-auto h-[60px] px-3.5 sm:px-5 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => navigate({ tab: 'me' })}
          className="flex items-center gap-2.5 min-w-0 text-left group"
          title="Hồ sơ & Cài đặt"
        >
          <div
            className={`w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 ${
              isPlayful
                ? 'bg-[#DFF4FF] border-[#5CC4FF]'
                : 'bg-brand-soft border-brand/30'
            }`}
          >
            <img
              src={AUDIENCE_IMAGE_MAP[audienceMeta.id]}
              alt={audienceMeta.shortLabel}
              className="w-full h-full object-contain p-0.5"
            />
          </div>
          <div className="min-w-0 leading-tight">
            <div
              className={`text-xs font-bold truncate ${
                isPlayful ? 'text-[#5C7FA6]' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {activeTab === 'today'
                ? `Chào ${currentUser.displayName}!`
                : getTabTitle(audience, activeTab)}
            </div>
            <div
              className={`text-xs font-extrabold truncate ${
                isPlayful ? 'text-[#123A6F]' : 'text-slate-900 dark:text-white'
              }`}
            >
              {audienceMeta.shortLabel} · {audienceSubTag}
            </div>
          </div>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          {isPlayful ? (
            <button
              type="button"
              onClick={() => navigate({ tab: 'me' })}
              aria-label="Của bé & Cài đặt"
              className="w-10 h-10 rounded-full bg-[#E3F4FF] hover:bg-[#CBE9FF] border-2 border-white text-[#1674DA] flex items-center justify-center shadow-xs active:scale-95 transition"
            >
              <Settings className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Tra từ điển"
              className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition active:scale-95"
            >
              <Search className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );

  const renderMobileBottomNav = () => {
    if (isPlayful) {
      return (
        <nav
          aria-label="Điều hướng chính"
          className="lg:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-1 pointer-events-none"
        >
          <div className="pointer-events-auto max-w-sm mx-auto bg-white/95 backdrop-blur-md rounded-[26px] border-2 border-[#DDF1FF] shadow-[0_10px_30px_-6px_rgba(18,58,111,0.28)] grid grid-cols-3 p-1.5"> {/* ui-ok: 3-tab bottom dock */}
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate({ tab: item.id })}
                  className={`min-h-[52px] py-1.5 px-1 rounded-[20px] flex flex-col items-center justify-center gap-0.5 active:scale-95 ${
                    active
                      ? 'bg-[#E3F4FF] text-[#1684F0] font-extrabold'
                      : 'text-[#6A88A9] hover:text-[#1674DA] font-bold'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'scale-110 stroke-[2.5]' : ''}`} />
                  <span className="text-xs leading-tight">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      );
    }

    return (
      <nav
        aria-label="Điều hướng chính"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe"
      >
        <div className="max-w-sm mx-auto grid grid-cols-3 px-2 py-1"> {/* ui-ok: 3-tab bottom nav */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate({ tab: item.id })}
                className={`min-h-[54px] py-1.5 rounded-2xl flex flex-col items-center justify-center gap-1 active:scale-95 ${
                  active
                    ? 'text-brand font-extrabold'
                    : 'text-slate-500 dark:text-slate-400 font-semibold'
                }`}
              >
                <span
                  className={`px-3 py-1 rounded-full ${
                    active ? 'bg-brand-soft' : ''
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : ''}`} />
                </span>
                <span className="text-xs leading-none">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  };

  const mainContent = (
    <div
      data-tier={tier}
      data-audience={audience}
      className={`app-shell flex flex-col lg:flex-row ${bgClass}`}
    >
      {renderDesktopRail()}

      <div className="flex-1 min-w-0 flex flex-col">
        {adminPreviewAudience && (
          <div className="bg-violet-600 text-white px-3 py-1.5 text-xs font-bold flex items-center justify-between gap-2">
            <span className="truncate">
              Đang xem thử giao diện: {audienceMeta.emoji} {audienceMeta.label}
            </span>
            <button
              type="button"
              onClick={() => onChangeAdminPreview(null)}
              className="px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white/30 inline-flex items-center gap-1 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              <span>Thoát</span>
            </button>
          </div>
        )}

        {activeStep ? (
          <ModuleScreen
            step={activeStep}
            initialSub={route.sub}
            tier={tier}
            showSearch={!isPlayful}
            onOpenSearch={() => setSearchOpen(true)}
            onBack={() => back({ tab: 'today' })}
            effectiveProfile={effectiveProfile}
            progress={progress}
            effectiveApiKey={effectiveApiKey}
            isAdminUser={isAdminUser}
            devUnlockAll={devUnlockAll}
            customLessons={customLessons}
            currentAudienceUnlock={currentAudienceUnlock}
            onUnlockStep={onUnlockStep}
            onAutoUnlockPracticeStages={onAutoUnlockPracticeStages}
            onAddXp={onAddXp}
            onSaveWord={onSaveWord}
            onCompleteLesson={onCompleteLesson}
            onResetLessons={onResetLessons}
            onTogglePhoneme={onTogglePhoneme}
            onPronunciationScore={onPronunciationScore}
            onRateSrs={onRateSrs}
            onUpdateProgress={onUpdateProgress}
            onBackToLearn={() => navigate({ tab: 'today' })}
            onNavigate={(r) => navigate(r)}
          />
        ) : (
          <>
            {renderMobileHeader()}

            <main className="flex-1 w-full max-w-3xl mx-auto px-3.5 sm:px-6 pt-4 pb-nav animate-screen-in">
              {activeTab === 'today' && (
                <TodayScreen
                  tier={tier}
                  displayName={currentUser.displayName}
                  profile={effectiveProfile}
                  audienceMeta={audienceMeta}
                  audienceSubTag={audienceSubTag}
                  trackConfig={activeTrackConfig}
                  steps={activeTrackSteps}
                  progress={progress}
                  lastStepCode={lastStepCode}
                  visitedStepCodes={visitedStepCodes}
                  todayMinutes={todayMinutes}
                  onNavigate={(r) => navigate(r)}
                />
              )}

              {activeTab === 'practice' && (
                <PracticeScreen
                  tier={tier}
                  profile={effectiveProfile}
                  steps={activeTrackSteps}
                  progress={progress}
                  effectiveApiKey={effectiveApiKey}
                  initialCategory={route.stepCode}
                  initialSub={route.sub}
                  onRateSrs={onRateSrs}
                  onAddXp={onAddXp}
                  onNavigate={(r) => navigate(r)}
                />
              )}

              {activeTab === 'progress' && (
                <ProgressScreen
                  displayName={currentUser.displayName}
                  profile={effectiveProfile}
                  steps={activeTrackSteps}
                  visitedStepCodes={visitedStepCodes}
                  progress={progress}
                  onNavigate={(r) => navigate(r)}
                />
              )}

              {activeTab === 'me' && (
                <MeScreen
                  tier={tier}
                  currentUser={currentUser}
                  effectiveProfile={effectiveProfile}
                  audienceMeta={audienceMeta}
                  audienceSubTag={audienceSubTag}
                  progress={progress}
                  darkMode={darkMode}
                  devUnlockAll={devUnlockAll}
                  isAdminUser={isAdminUser}
                  isDevUser={isDevUser}
                  adminPreviewAudience={adminPreviewAudience}
                  onToggleAccent={onToggleAccent}
                  onToggleDarkMode={onToggleDarkMode}
                  onToggleDevUnlock={onToggleDevUnlock}
                  onQuickSwitchAudience={onQuickSwitchAudience}
                  onChangeAdminPreview={onChangeAdminPreview}
                  onOpenProfileModal={onOpenProfileModal}
                  onOpenWorkbookStudio={onOpenWorkbookStudio}
                  onOpenAdminModal={onOpenAdminModal}
                  onExportData={onExportData}
                  onLogout={onLogout}
                />
              )}
            </main>

            {renderMobileBottomNav()}
          </>
        )}
      </div>

      {!isPlayful && (
        <SearchSheet
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          tier={tier}
          accent={progress.accent}
          savedWords={progress.savedWords}
          onSaveWord={onSaveWord}
          onPronunciationScore={onPronunciationScore}
        />
      )}
    </div>
  );

  if (isPlayful) {
    return <KidsSceneShell variant="sky-soft">{mainContent}</KidsSceneShell>;
  }
  return mainContent;
};
