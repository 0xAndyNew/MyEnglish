import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  AUDIENCE_TRACKS,
  getInitialUnlockedStepForTrack,
  resolveTrack,
} from './config/audienceTracks';
import {
  AudienceId,
  createDefaultProfile,
  getAudienceMeta,
  getExamMeta,
  LearnerProfile,
} from './types/audience';
import { MobileAppShell } from './components/app/MobileAppShell';
import { UserAccount, UserProgress, WordEntry } from './types/learning';
import {
  addWordToNotebook,
  CustomLessonRecord,
  fetchCustomLessons,
  fetchSessionState,
  getAuthToken,
  getDefaultProgress,
  isDevAccount,
  logoutAccount,
  saveLearnerProfileApi,
  saveProgressToDb,
  updateSrsCard,
} from './utils/storage';
import { setServerHasGeminiKey, setServerSttProvider } from './utils/speechEngine';
import { AuthScreen } from './components/AuthScreen';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { LearnerProfilePanel } from './components/LearnerProfilePanel';
import { AdminPanelModal } from './components/AdminPanelModal';

const PreschoolApp = lazy(() =>
  import('./components/preschool/PreschoolApp').then((m) => ({ default: m.PreschoolApp }))
);
const WorkbookStudio = lazy(() =>
  import('./components/workbook/WorkbookStudio').then((m) => ({ default: m.WorkbookStudio }))
);

function normalizeProgressUnlock(prog: UserProgress): UserProgress {
  return prog.unlockedStepIndex >= 4 && prog.unlockedStepIndex < 6
    ? { ...prog, unlockedStepIndex: 6 }
    : prog;
}

export function App() {
  const [authChecking, setAuthChecking] = useState(() => Boolean(getAuthToken()));
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(null);
  const [pendingWizardAudience, setPendingWizardAudience] = useState<AudienceId | undefined>(undefined);
  const [pendingDraftProfile, setPendingDraftProfile] = useState<LearnerProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showWorkbookStudio, setShowWorkbookStudio] = useState(false);
  const [adminPreviewAudience, setAdminPreviewAudience] = useState<AudienceId | null>(null);

  const [progress, setProgress] = useState<UserProgress>(() => getDefaultProgress());
  const [darkMode, setDarkMode] = useState(false);
  const [devUnlockAll, setDevUnlockAll] = useState(false);
  const [hasServerApiKey, setHasServerApiKey] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [customLessons, setCustomLessons] = useState<CustomLessonRecord[]>([]);
  const effectiveApiKey = hasServerApiKey ? 'SERVER_CONFIGURED' : '';
  const hydratedEmailRef = useRef<string | null>(null);

  useEffect(() => {
    setServerHasGeminiKey(hasServerApiKey);
  }, [hasServerApiKey]);

  useEffect(() => {
    let active = true;
    (async () => {
      const state = await fetchSessionState();
      if (!active) return;
      if (state) {
        const normalizedProg = normalizeProgressUnlock(state.progress);
        hydratedEmailRef.current = state.user.email;
        setCurrentUser(state.user);
        setLearnerProfile(state.user.profile ?? null);
        setProgress(normalizedProg);
        setDevUnlockAll(state.user.role === 'admin' || isDevAccount(state.user.email));
        setHasServerApiKey(state.hasApiKey);
        if (state.sttProvider) {
          setServerSttProvider(state.sttProvider);
        }
        const lessons = await fetchCustomLessons();
        if (active) setCustomLessons(lessons);
      }
      setAuthChecking(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (currentUser?.email && hydratedEmailRef.current === currentUser.email) {
      saveProgressToDb(progress);
    }
  }, [progress, currentUser]);

  const effectiveProfile = useMemo<LearnerProfile>(() => {
    if (adminPreviewAudience) {
      if (learnerProfile && learnerProfile.audience === adminPreviewAudience) {
        return learnerProfile;
      }
      const base = createDefaultProfile(adminPreviewAudience);
      return {
        ...base,
        preschool: learnerProfile?.preschool || base.preschool,
        kids: learnerProfile?.kids || base.kids,
        teen: learnerProfile?.teen || base.teen,
        university: learnerProfile?.university || base.university,
        worker: learnerProfile?.worker || base.worker,
        exam: learnerProfile?.exam || base.exam,
      };
    }
    return learnerProfile || createDefaultProfile('worker');
  }, [adminPreviewAudience, learnerProfile]);

  useEffect(() => {
    const isPlayful =
      effectiveProfile.audience === 'kids' || effectiveProfile.audience === 'preschool';
    if (darkMode && !isPlayful) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode, effectiveProfile.audience]);

  const activeTrackConfig = AUDIENCE_TRACKS[effectiveProfile.audience] || AUDIENCE_TRACKS.worker;
  const activeTrackSteps = useMemo(() => resolveTrack(effectiveProfile), [effectiveProfile]);

  const currentAudienceUnlock = useMemo(() => {
    const aud = effectiveProfile.audience;
    const explicitUnlock = progress.trackUnlocks?.[aud];
    const autoInit = getInitialUnlockedStepForTrack(activeTrackSteps, effectiveProfile);
    if (explicitUnlock !== undefined) {
      return Math.max(explicitUnlock, autoInit);
    }
    if (aud === 'worker' && progress.unlockedStepIndex > 0) {
      return Math.max(Math.min(activeTrackSteps.length - 1, progress.unlockedStepIndex), autoInit);
    }
    return autoInit;
  }, [effectiveProfile, progress.trackUnlocks, progress.unlockedStepIndex, activeTrackSteps]);

  const audienceMeta = getAudienceMeta(effectiveProfile.audience);

  const handleAuthSuccess = async (
    user: UserAccount,
    loadedProg: UserProgress,
    pendingAudience?: AudienceId,
    draftProfile?: LearnerProfile
  ) => {
    const normalizedProg = normalizeProgressUnlock(loadedProg);
    hydratedEmailRef.current = user.email;
    setCurrentUser(user);
    setLearnerProfile(user.profile ?? null);
    setPendingWizardAudience(pendingAudience);
    setPendingDraftProfile(draftProfile ?? null);
    setProgress(normalizedProg);
    setDevUnlockAll(user.role === 'admin' || isDevAccount(user.email));
    const [state, lessons] = await Promise.all([fetchSessionState(), fetchCustomLessons()]);
    if (state) {
      setHasServerApiKey(state.hasApiKey);
      if (state.user?.profile) {
        setLearnerProfile(state.user.profile);
      }
      if (state.sttProvider) {
        setServerSttProvider(state.sttProvider);
      }
    }
    setCustomLessons(lessons);
  };

  const handleSaveLearnerProfile = async (nextProfile: LearnerProfile) => {
    const mergedProfile: LearnerProfile = {
      ...nextProfile,
      preschool: nextProfile.preschool || learnerProfile?.preschool,
      kids: nextProfile.kids || learnerProfile?.kids,
      teen: nextProfile.teen || learnerProfile?.teen,
      university: nextProfile.university || learnerProfile?.university,
      worker: nextProfile.worker || learnerProfile?.worker,
      exam: nextProfile.exam || learnerProfile?.exam,
      updatedAt: new Date().toISOString(),
    };
    const saved = await saveLearnerProfileApi(mergedProfile, currentUser?.email);
    const hydratedSaved: LearnerProfile = {
      ...mergedProfile,
      ...saved,
      preschool: saved.preschool || mergedProfile.preschool,
      kids: saved.kids || mergedProfile.kids,
      teen: saved.teen || mergedProfile.teen,
      university: saved.university || mergedProfile.university,
      worker: saved.worker || mergedProfile.worker,
      exam: saved.exam || mergedProfile.exam,
    };
    setLearnerProfile(hydratedSaved);
    setPendingWizardAudience(undefined);
    setPendingDraftProfile(null);
    setAdminPreviewAudience(null);
    setCurrentUser((prev) => (prev ? { ...prev, profile: hydratedSaved } : prev));

    const steps = resolveTrack(hydratedSaved);
    const initUnlock = getInitialUnlockedStepForTrack(steps, hydratedSaved);
    setProgress((prev) => {
      const prevAudUnlock = prev.trackUnlocks?.[hydratedSaved.audience] ?? 0;
      const nextUnlock = Math.max(prevAudUnlock, initUnlock);
      return {
        ...prev,
        trackUnlocks: {
          ...(prev.trackUnlocks || {}),
          [hydratedSaved.audience]: nextUnlock,
        },
      };
    });
    const lessons = await fetchCustomLessons();
    setCustomLessons(lessons);
  };

  const handleQuickSwitchAudience = (aud: AudienceId) => {
    setAdminPreviewAudience(null);
    if (learnerProfile && learnerProfile.audience === aud) {
      return;
    }
    const base = createDefaultProfile(aud);
    const nextProf: LearnerProfile = {
      ...base,
      ...(learnerProfile || {}),
      audience: aud,
      startLevel:
        aud === 'kids' || aud === 'preschool'
          ? 'A0'
          : learnerProfile?.startLevel && learnerProfile.startLevel !== 'A0'
          ? learnerProfile.startLevel
          : base.startLevel,
      dailyMinutes: learnerProfile?.dailyMinutes || base.dailyMinutes,
      preschool: learnerProfile?.preschool || base.preschool,
      kids: learnerProfile?.kids || base.kids,
      teen: learnerProfile?.teen || base.teen,
      university: learnerProfile?.university || base.university,
      worker: learnerProfile?.worker || base.worker,
      exam: learnerProfile?.exam || base.exam,
      updatedAt: new Date().toISOString(),
    };
    handleSaveLearnerProfile(nextProf);
  };

  const handleLogout = async () => {
    hydratedEmailRef.current = null;
    await logoutAccount();
    setCurrentUser(null);
    setLearnerProfile(null);
    setPendingWizardAudience(undefined);
    setPendingDraftProfile(null);
    setAdminPreviewAudience(null);
    setDevUnlockAll(false);
    setHasServerApiKey(false);
    setServerSttProvider('auto');
    setCustomLessons([]);
    window.location.hash = '';
  };

  const unlockStep = (targetIdx: number) => {
    const aud = effectiveProfile.audience;
    const maxStep = Math.max(0, activeTrackSteps.length - 1);
    const boundedTarget = Math.min(maxStep, targetIdx);
    setProgress((prev) => {
      const prevTrackUnlock = prev.trackUnlocks?.[aud] ?? currentAudienceUnlock;
      const isNewUnlock = prevTrackUnlock < boundedTarget;
      return {
        ...prev,
        unlockedStepIndex:
          aud === 'worker' ? Math.max(prev.unlockedStepIndex, boundedTarget) : prev.unlockedStepIndex,
        trackUnlocks: {
          ...(prev.trackUnlocks || {}),
          [aud]: Math.max(prevTrackUnlock, boundedTarget),
        },
        xp: prev.xp + (isNewUnlock ? 40 : 0),
      };
    });
  };

  const autoUnlockPracticeStages = () => {
    const aud = effectiveProfile.audience;
    const maxStep = Math.max(0, activeTrackSteps.length - 1);
    setProgress((prev) => {
      const prevTrackUnlock = prev.trackUnlocks?.[aud] ?? 0;
      if (prevTrackUnlock >= maxStep) return prev;
      return {
        ...prev,
        unlockedStepIndex: aud === 'worker' ? Math.max(prev.unlockedStepIndex, 6) : prev.unlockedStepIndex,
        trackUnlocks: {
          ...(prev.trackUnlocks || {}),
          [aud]: maxStep,
        },
        xp: prev.xp + 40,
      };
    });
  };

  const handleAddXp = (amount: number) => {
    setProgress((p) => ({ ...p, xp: p.xp + amount }));
  };

  if (authChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-3 text-slate-600 dark:text-slate-300">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-sm font-semibold">Đang đồng bộ dữ liệu từ SQLite...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  const needsOnboarding =
    (!learnerProfile || Boolean(pendingWizardAudience)) &&
    currentUser.role !== 'admin' &&
    !isDevAccount(currentUser.email);

  if (needsOnboarding) {
    return (
      <OnboardingWizard
        displayName={currentUser.displayName}
        initialAudience={pendingWizardAudience || 'worker'}
        initialProfile={pendingDraftProfile || learnerProfile}
        onComplete={handleSaveLearnerProfile}
      />
    );
  }

  const isAdminUser = currentUser.role === 'admin' || isDevAccount(currentUser.email);

  const handleSaveWord = (word: WordEntry) => {
    setProgress((prev) => addWordToNotebook(prev, word));
  };

  const handleCompleteLesson = (lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        xp: prev.xp + 50,
      };
    });
  };

  const handleTogglePhoneme = (id: string) => {
    setProgress((prev) => {
      const exists = prev.masteredPhonemes.includes(id);
      const next = exists
        ? prev.masteredPhonemes.filter((p) => p !== id)
        : [...prev.masteredPhonemes, id];
      return {
        ...prev,
        masteredPhonemes: next,
        xp: prev.xp + (exists ? 0 : 15),
      };
    });
  };

  const handlePronunciationScore = (score: number) => {
    setProgress((prev) => ({
      ...prev,
      pronunciationScores: [...prev.pronunciationScores.slice(-29), score],
      xp: prev.xp + (score >= 70 ? 15 : 5),
    }));
  };

  const handleRateSrs = (wordId: string, quality: 0 | 2 | 4 | 5) => {
    setProgress((prev) => ({
      ...prev,
      srsCards: {
        ...prev.srsCards,
        [wordId]: updateSrsCard(prev.srsCards[wordId], wordId, quality),
      },
      xp: prev.xp + 10,
    }));
  };

  const handleExportData = () => {
    const blob = new Blob([JSON.stringify({ profile: learnerProfile, progress }, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `myenglish-${currentUser.email}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const audienceSubTag = (() => {
    if (effectiveProfile.audience === 'preschool') {
      return `${effectiveProfile.preschool?.ageBand || '3-4'} tuổi`;
    }
    if (effectiveProfile.audience === 'kids') {
      return effectiveProfile.kids?.goal === 'yle'
        ? `YLE ${(effectiveProfile.kids.yleLevel || 'starters').toUpperCase()}`
        : `${effectiveProfile.kids?.ageBand || '6-10'} tuổi`;
    }
    if (effectiveProfile.audience === 'teen') {
      return `Lớp ${effectiveProfile.teen?.grade || 9}`;
    }
    if (effectiveProfile.audience === 'university') {
      return `SV Năm ${effectiveProfile.university?.year || 2}`;
    }
    if (effectiveProfile.audience === 'exam') {
      const ex = getExamMeta(effectiveProfile.exam?.examType || 'ielts');
      return `${ex.shortLabel} ${effectiveProfile.exam?.targetScore || ''}`.trim();
    }
    return `Cấp ${effectiveProfile.startLevel}`;
  })();

  if (showWorkbookStudio) {
    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20 text-sm font-semibold text-slate-500 gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
            <span>Đang tải Xưởng Xuất Sách Bài Tập PDF...</span>
          </div>
        }
      >
        <WorkbookStudio
          defaultAudience={effectiveProfile.audience}
          onClose={() => setShowWorkbookStudio(false)}
        />
      </Suspense>
    );
  }

  if (effectiveProfile.audience === 'preschool') {
    return (
      <>
        <Suspense
          fallback={
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8EC] gap-3 font-kid text-amber-800">
              <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
              <p className="text-lg font-bold">Đang mở lớp học của bé...</p>
            </div>
          }
        >
          <PreschoolApp
            profile={effectiveProfile}
            progress={progress.preschool || { completedLessonIds: [], stickers: [], stars: 0 }}
            accent={progress.accent}
            displayName={currentUser.displayName}
            userEmail={currentUser.email}
            userRole={currentUser.role}
            isAdmin={isAdminUser}
            isPreview={Boolean(adminPreviewAudience)}
            onProgressChange={(nextPreschool, gainedXp = 0) =>
              setProgress((prev) => ({
                ...prev,
                xp: prev.xp + gainedXp,
                preschool: nextPreschool,
              }))
            }
            onSaveProfile={handleSaveLearnerProfile}
            onOpenProfileModal={() => setShowProfileModal(true)}
            onExitPreview={() => setAdminPreviewAudience(null)}
            onLogout={handleLogout}
          />
        </Suspense>

        <LearnerProfilePanel
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          profile={effectiveProfile}
          onSaveProfile={handleSaveLearnerProfile}
          xp={progress.xp}
          savedWordsCount={progress.savedWords.length}
        />
      </>
    );
  }

  return (
    <>
      <MobileAppShell
        currentUser={currentUser}
        effectiveProfile={effectiveProfile}
        audienceMeta={audienceMeta}
        audienceSubTag={audienceSubTag}
        activeTrackConfig={activeTrackConfig}
        activeTrackSteps={activeTrackSteps}
        currentAudienceUnlock={currentAudienceUnlock}
        progress={progress}
        darkMode={darkMode}
        devUnlockAll={devUnlockAll}
        isAdminUser={isAdminUser}
        isDevUser={isDevAccount(currentUser.email)}
        adminPreviewAudience={adminPreviewAudience}
        effectiveApiKey={effectiveApiKey}
        customLessons={customLessons}
        onQuickSwitchAudience={handleQuickSwitchAudience}
        onOpenProfileModal={() => setShowProfileModal(true)}
        onOpenAdminModal={() => setShowAdminModal(true)}
        onOpenWorkbookStudio={() => setShowWorkbookStudio(true)}
        onToggleAccent={() =>
          setProgress((p) => ({ ...p, accent: p.accent === 'en-US' ? 'en-GB' : 'en-US' }))
        }
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onToggleDevUnlock={() => setDevUnlockAll(!devUnlockAll)}
        onChangeAdminPreview={(val) => setAdminPreviewAudience(val)}
        onExportData={handleExportData}
        onLogout={handleLogout}
        onUnlockStep={unlockStep}
        onAutoUnlockPracticeStages={autoUnlockPracticeStages}
        onAddXp={handleAddXp}
        onSaveWord={handleSaveWord}
        onCompleteLesson={handleCompleteLesson}
        onResetLessons={() => setProgress((p) => ({ ...p, completedLessons: [] }))}
        onTogglePhoneme={handleTogglePhoneme}
        onPronunciationScore={handlePronunciationScore}
        onRateSrs={handleRateSrs}
        onUpdateProgress={setProgress}
      />

      <LearnerProfilePanel
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profile={effectiveProfile}
        onSaveProfile={handleSaveLearnerProfile}
        xp={progress.xp}
        savedWordsCount={progress.savedWords.length}
      />

      {(isAdminUser || currentUser.role === 'editor' || currentUser.role === 'viewer') && (
        <AdminPanelModal
          isOpen={showAdminModal}
          onClose={() => setShowAdminModal(false)}
          hasApiKey={hasServerApiKey}
          onApiKeyStatusChange={setHasServerApiKey}
          currentEmail={currentUser.email}
          onCustomLessonsChange={setCustomLessons}
          onOpenPreschoolMode={() => {
            setShowAdminModal(false);
            setAdminPreviewAudience('preschool');
          }}
          onResetCurrentProgress={() => {
            setProgress(getDefaultProgress());
            window.location.hash = '#/today';
          }}
        />
      )}
    </>
  );
}

export default App;
