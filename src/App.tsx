import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { BookOpenCheck, X, Loader2 } from 'lucide-react';
import {
  AUDIENCE_TRACKS,
  canViewPage,
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
import { AppShell } from './components/layout/AppShell';
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
import { analyzeWordFull } from './utils/wordAnalyzer';
import { AuthScreen } from './components/AuthScreen';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { LearnerProfilePanel } from './components/LearnerProfilePanel';
import { AlphabetFoundation } from './components/AlphabetFoundation';
import { IpaPhonicsLab } from './components/IpaPhonicsLab';
import { CurriculumRoadmap } from './components/CurriculumRoadmap';
import { WritingGrammarLab } from './components/WritingGrammarLab';
import { SentenceBuilderLab } from './components/SentenceBuilderLab';
import { ListeningSpeakingLab } from './components/ListeningSpeakingLab';
import { BilingualWritingLab } from './components/BilingualWritingLab';
import { AdminPanelModal } from './components/AdminPanelModal';
import { OcrSmartReader } from './components/OcrSmartReader';
import { VocabularyLibrary } from './components/VocabularyLibrary';
import { MemoryGamesSRS } from './components/MemoryGamesSRS';
import { WordAnatomyCard } from './components/WordAnatomyCard';
const KidsPlayground = lazy(() => import('./components/kids/KidsPlayground').then((m) => ({ default: m.KidsPlayground })));
const PreschoolApp = lazy(() => import('./components/preschool/PreschoolApp').then((m) => ({ default: m.PreschoolApp })));
const SchoolCurriculum = lazy(() => import('./components/teen/SchoolCurriculum').then((m) => ({ default: m.SchoolCurriculum })));
const AcademicSkills = lazy(() => import('./components/university/AcademicSkills').then((m) => ({ default: m.AcademicSkills })));
const WorkplaceCareerHub = lazy(() => import('./components/worker/WorkplaceCareerHub').then((m) => ({ default: m.WorkplaceCareerHub })));
const ExamPrepCenter = lazy(() => import('./components/exam/ExamPrepCenter').then((m) => ({ default: m.ExamPrepCenter })));
const WorkbookStudio = lazy(() => import('./components/workbook/WorkbookStudio').then((m) => ({ default: m.WorkbookStudio })));

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
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [darkMode, setDarkMode] = useState(false);
  const [devUnlockAll, setDevUnlockAll] = useState(false);
  const [hasServerApiKey, setHasServerApiKey] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [customLessons, setCustomLessons] = useState<CustomLessonRecord[]>([]);
  const effectiveApiKey = hasServerApiKey ? 'SERVER_CONFIGURED' : '';
  const hydratedEmailRef = useRef<string | null>(null);

  // Sub-views for composite steps
  const [step2ASub, setStep2ASub] = useState<'roadmap' | 'vocab' | 'srs'>('roadmap');
  const [step5Sub, setStep5Sub] = useState<'write' | 'read'>('write');
  const [workerStep4Sub, setWorkerStep4Sub] = useState<'sentence' | 'grammar'>('sentence');
  const [uniStep6Sub, setUniStep6Sub] = useState<'ocr' | 'srs'>('ocr');
  const [examStep5Sub, setExamStep5Sub] = useState<'vocab' | 'grammar' | 'srs'>('vocab');

  // Global quick word lookup
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchedWord, setSearchedWord] = useState<WordEntry | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

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
        setActiveStepIdx(0);
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

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

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

  const safeStepIdx = Math.min(activeStepIdx, Math.max(0, activeTrackSteps.length - 1));
  const currentStep = activeTrackSteps[safeStepIdx] || activeTrackSteps[0];
  const audienceMeta = getAudienceMeta(effectiveProfile.audience);
  const isKidsAudience = effectiveProfile.audience === 'kids';

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
    setActiveStepIdx(0);
    setDevUnlockAll(user.role === 'admin' || isDevAccount(user.email));
    setSearchedWord(null);
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
    setActiveStepIdx(0);
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
      setActiveStepIdx(0);
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
    setSearchedWord(null);
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
    setActiveStepIdx(boundedTarget);
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

  // Require OnboardingWizard for regular users who haven't chosen a profile yet (or opted to customize on register)
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

  const handleGlobalSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    setSearchError(null);
    try {
      const result = await analyzeWordFull(searchQuery);
      setSearchedWord(result);
    } catch (err: any) {
      setSearchError(err?.message || 'Không thể phân tích từ này.');
    } finally {
      setSearchLoading(false);
    }
  };

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

  const canRenderCurrentPage = canViewPage(currentStep.page, effectiveProfile);

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
      <AppShell
        currentUser={currentUser}
        effectiveProfile={effectiveProfile}
        audienceMeta={audienceMeta}
        audienceSubTag={audienceSubTag}
        activeTrackConfig={activeTrackConfig}
        activeTrackSteps={activeTrackSteps}
        safeStepIdx={safeStepIdx}
        currentStep={currentStep}
        currentAudienceUnlock={currentAudienceUnlock}
        progress={progress}
        darkMode={darkMode}
        devUnlockAll={devUnlockAll}
        isAdminUser={isAdminUser}
        isDevUser={isDevAccount(currentUser.email)}
        adminPreviewAudience={adminPreviewAudience}
        searchQuery={searchQuery}
        searchLoading={searchLoading}
        onSearchQueryChange={setSearchQuery}
        onGlobalSearch={handleGlobalSearch}
        onSelectStep={setActiveStepIdx}
        onQuickSwitchAudience={handleQuickSwitchAudience}
        onOpenProfileModal={() => setShowProfileModal(true)}
        onOpenAdminModal={() => setShowAdminModal(true)}
        onToggleAccent={() =>
          setProgress((p) => ({ ...p, accent: p.accent === 'en-US' ? 'en-GB' : 'en-US' }))
        }
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onToggleDevUnlock={() => setDevUnlockAll(!devUnlockAll)}
        onChangeAdminPreview={(val) => {
          setAdminPreviewAudience(val);
          setActiveStepIdx(0);
        }}
        onExportData={handleExportData}
        onLogout={handleLogout}
      >
        <div className="mb-4 flex justify-end print:hidden">
          <button
            type="button"
            onClick={() => setShowWorkbookStudio(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition shadow-sm"
          >
            <BookOpenCheck className="w-4 h-4" />
            <span>📚 Xuất Sách Bài Tập PDF (Có Đáp Án)</span>
          </button>
        </div>

        {searchError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-700 text-sm flex justify-between items-center">
            <span>{searchError}</span>
            <button onClick={() => setSearchError(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {searchedWord && !isKidsAudience && (
          <div className="mb-6">
            <div className="flex items-center justify-between bg-indigo-600 text-white px-4 py-2 rounded-t-2xl text-xs font-bold">
              <span>🔍 Kết quả tra cứu: "{searchedWord.word}"</span>
              <button onClick={() => setSearchedWord(null)} className="inline-flex items-center gap-1 hover:underline">
                Đóng <X className="w-4 h-4" />
              </button>
            </div>
            <div className="[&>div]:rounded-t-none">
              <WordAnatomyCard
                wordEntry={searchedWord}
                accent={progress.accent}
                isSaved={progress.savedWords.some(
                  (w) => w.word.toLowerCase() === searchedWord.word.toLowerCase()
                )}
                onSaveWord={handleSaveWord}
                onPronunciationScore={handlePronunciationScore}
              />
            </div>
          </div>
        )}

        {!canRenderCurrentPage ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
              Trang này không thuộc lộ trình của nhóm {audienceMeta.label}.
            </p>
            <button
              onClick={() => setActiveStepIdx(0)}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
            >
              Về bước đầu tiên của lộ trình
            </button>
          </div>
        ) : (
          <>
            {/* PAGE: ALPHABET FOUNDATION (Kids Mode / Foundation) */}
            {currentStep.page === 'alphabet' && (
              <AlphabetFoundation
                accent={progress.accent}
                kidsMode={isKidsAudience || currentStep.subView === 'kids'}
                isStepCompleted={currentAudienceUnlock >= safeStepIdx + 1}
                onCompleteStep1A={() => unlockStep(safeStepIdx + 1)}
                savedPassedLetters={progress.passedLetters ?? []}
                onPassLetter={(letter) =>
                  setProgress((p) => {
                    const prev = p.passedLetters ?? [];
                    return prev.includes(letter) ? p : { ...p, passedLetters: [...prev, letter] };
                  })
                }
              />
            )}

            <Suspense
              fallback={
                <div className="flex items-center justify-center py-16 text-sm font-semibold text-slate-500 gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-sky-600" />
                  <span>Đang tải nội dung bài học...</span>
                </div>
              }
            >
              {/* PAGE: KIDS PLAYGROUND (6-10 years old) */}
              {currentStep.page === 'kids' && (
                <KidsPlayground
                  accent={progress.accent}
                  profile={effectiveProfile}
                  onAddXp={handleAddXp}
                  initialTab={(currentStep.subView as any) || 'vocab'}
                  allowAllOptions={isAdminUser}
                  hideHeaderNav={true}
                />
              )}

              {/* PAGE: TEEN SCHOOL CURRICULUM (Grades 6-12 + Entrance 10 & THPT Exams) */}
              {currentStep.page === 'school' && (
                <SchoolCurriculum
                  accent={progress.accent}
                  profile={effectiveProfile}
                  onAddXp={handleAddXp}
                  onSaveWord={handleSaveWord}
                  initialMode={currentStep.subView === 'exams' ? 'exams' : 'units'}
                  allowAllOptions={isAdminUser}
                  hideHeaderNav={true}
                />
              )}

              {/* PAGE: UNIVERSITY ACADEMIC SKILLS (AWL, Seminar, Academic Writing, CV/Graduation) */}
              {currentStep.page === 'academic' && (
                <AcademicSkills
                  accent={progress.accent}
                  geminiApiKey={effectiveApiKey}
                  profile={effectiveProfile}
                  onAddXp={handleAddXp}
                  onSaveWord={handleSaveWord}
                  initialTab={(currentStep.subView as any) || 'awl'}
                  hideHeaderNav={true}
                />
              )}

              {/* PAGE: WORKPLACE CAREER HUB (10 Industries, Meetings, Email/Slack, STAR Interview) */}
              {currentStep.page === 'workplace' && (
                <WorkplaceCareerHub
                  accent={progress.accent}
                  profile={effectiveProfile}
                  onAddXp={handleAddXp}
                  allowAllOptions={isAdminUser}
                  hideHeaderNav={true}
                />
              )}

              {/* PAGE: EXAM PREP CENTER (IELTS, TOEIC, VSTEP, Cambridge, TOEFL iBT) */}
              {currentStep.page === 'exam' && (
                <ExamPrepCenter
                  accent={progress.accent}
                  geminiApiKey={effectiveApiKey}
                  profile={effectiveProfile}
                  onAddXp={handleAddXp}
                  initialTab={(currentStep.subView as any) || 'diagnostic'}
                  allowAllOptions={isAdminUser}
                  hideHeaderNav={true}
                />
              )}
            </Suspense>

            {/* PAGE: 44 IPA PHONICS LAB */}
            {currentStep.page === 'ipa' && (
              <IpaPhonicsLab
                accent={progress.accent}
                masteredPhonemes={progress.masteredPhonemes}
                onToggleMastered={handleTogglePhoneme}
                defaultSubStep="vowels"
                isStepCompleted={currentAudienceUnlock >= safeStepIdx + 1}
                onCompleteStep1B={() => unlockStep(safeStepIdx + 1)}
                savedPassedPairs={progress.passedIpaPairs ?? []}
                onPassPair={(pairId) =>
                  setProgress((p) => {
                    const prev = p.passedIpaPairs ?? [];
                    return prev.includes(pairId) ? p : { ...p, passedIpaPairs: [...prev, pairId] };
                  })
                }
              />
            )}

            {/* PAGE: VOCABULARY ROADMAP + CORE VOCAB + SRS */}
            {currentStep.page === 'roadmap' && (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 gap-1 w-full sm:w-fit">
                    {[
                      { id: 'roadmap', label: '📖 Lộ Trình Nạp Từ (133 bài)' },
                      { id: 'vocab', label: '📚 Kho 980+ Từ Cốt Lõi' },
                      { id: 'srs', label: '🧠 Ôn Tập Từ Đã Lưu (SRS 1-3-7-30)' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setStep2ASub(t.id as 'roadmap' | 'vocab' | 'srs')}
                        className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                          step2ASub === t.id
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {step2ASub === 'roadmap' && (
                  <CurriculumRoadmap
                    accent={progress.accent}
                    learnerProfile={effectiveProfile}
                    completedLessons={progress.completedLessons}
                    savedWords={progress.savedWords}
                    onCompleteLesson={handleCompleteLesson}
                    onResetLessons={() => setProgress((p) => ({ ...p, completedLessons: [] }))}
                    onNavigateTab={(tab) => {
                      if (tab === 'vocab_srs') setStep2ASub('vocab');
                    }}
                    onSaveWord={handleSaveWord}
                    onPronunciationScore={handlePronunciationScore}
                    isStep2BUnlocked={currentAudienceUnlock >= safeStepIdx + 1}
                    onUnlockStep2B={() => unlockStep(safeStepIdx + 1)}
                    devUnlockAll={devUnlockAll}
                  />
                )}

                {step2ASub === 'vocab' && (
                  <VocabularyLibrary
                    accent={progress.accent}
                    learnerProfile={effectiveProfile}
                    savedWords={progress.savedWords}
                    onSaveWord={handleSaveWord}
                    onPronunciationScore={handlePronunciationScore}
                  />
                )}

                {step2ASub === 'srs' && (
                  <MemoryGamesSRS
                    accent={progress.accent}
                    savedWords={progress.savedWords}
                    srsCards={progress.srsCards}
                    onRateSrs={handleRateSrs}
                    onAddXp={handleAddXp}
                  />
                )}
              </div>
            )}

            {/* PAGE: VOCABULARY + GRAMMAR + SRS SUPPLEMENT (E.g. Exam Prep Step E5) */}
            {currentStep.page === 'vocab' && (
              <div className="space-y-5">
                <div className="flex flex-wrap bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 gap-1 w-full sm:w-fit">
                  {[
                    { id: 'vocab', label: '📚 Kho 980+ Từ Cốt Lõi Theo Cấp Độ' },
                    { id: 'grammar', label: '📐 Ngữ Pháp Trọng Tâm Lấp Lỗ Hổng' },
                    { id: 'srs', label: '🧠 Ôn Tập Từ & Lỗi Sai (SRS)' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setExamStep5Sub(t.id as 'vocab' | 'grammar' | 'srs')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                        examStep5Sub === t.id
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {examStep5Sub === 'vocab' && (
                  <VocabularyLibrary
                    accent={progress.accent}
                    learnerProfile={effectiveProfile}
                    savedWords={progress.savedWords}
                    onSaveWord={handleSaveWord}
                    onPronunciationScore={handlePronunciationScore}
                  />
                )}
                {examStep5Sub === 'grammar' && (
                  <WritingGrammarLab
                    accent={progress.accent}
                    learnerProfile={effectiveProfile}
                    geminiApiKey={effectiveApiKey}
                    onAddXp={handleAddXp}
                    isStep3Unlocked={true}
                    onUnlockStep3={() => {}}
                    onAutoUnlockNext={autoUnlockPracticeStages}
                    onGoToStep3={() => {}}
                    devUnlockAll={true}
                    savedCompletedGrammarIds={progress.completedGrammarIds ?? []}
                    onCompleteGrammarId={(id) =>
                      setProgress((p) => {
                        const prev = p.completedGrammarIds ?? [];
                        return prev.includes(id) ? p : { ...p, completedGrammarIds: [...prev, id] };
                      })
                    }
                  />
                )}
                {examStep5Sub === 'srs' && (
                  <MemoryGamesSRS
                    accent={progress.accent}
                    savedWords={progress.savedWords}
                    srsCards={progress.srsCards}
                    onRateSrs={handleRateSrs}
                    onAddXp={handleAddXp}
                  />
                )}
              </div>
            )}

            {/* PAGE: GRAMMAR LAB */}
            {currentStep.page === 'grammar' && (
              <WritingGrammarLab
                accent={progress.accent}
                learnerProfile={effectiveProfile}
                geminiApiKey={effectiveApiKey}
                onAddXp={handleAddXp}
                isStep3Unlocked={currentAudienceUnlock >= safeStepIdx + 1}
                onUnlockStep3={() => unlockStep(safeStepIdx + 1)}
                onAutoUnlockNext={autoUnlockPracticeStages}
                onGoToStep3={() => unlockStep(safeStepIdx + 1)}
                devUnlockAll={devUnlockAll}
                savedCompletedGrammarIds={progress.completedGrammarIds ?? []}
                onCompleteGrammarId={(id) =>
                  setProgress((p) => {
                    const prev = p.completedGrammarIds ?? [];
                    return prev.includes(id) ? p : { ...p, completedGrammarIds: [...prev, id] };
                  })
                }
              />
            )}

            {/* PAGE: SENTENCE BUILDER LAB (With Grammar toggle for Worker track) */}
            {currentStep.page === 'sentence' && (
              <div className="space-y-4">
                {effectiveProfile.audience === 'worker' && (
                  <div className="flex flex-wrap bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 gap-1 w-full sm:w-fit">
                    {[
                      { id: 'sentence', label: '🧩 Lab Ghép Câu Theo Ngành' },
                      { id: 'grammar', label: '📐 Hệ Thống 14 Chuyên Đề Ngữ Pháp' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setWorkerStep4Sub(t.id as 'sentence' | 'grammar')}
                        className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                          workerStep4Sub === t.id
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                )}

                {effectiveProfile.audience === 'worker' && workerStep4Sub === 'grammar' ? (
                  <WritingGrammarLab
                    accent={progress.accent}
                    learnerProfile={effectiveProfile}
                    geminiApiKey={effectiveApiKey}
                    onAddXp={handleAddXp}
                    isStep3Unlocked={currentAudienceUnlock >= safeStepIdx + 1}
                    onUnlockStep3={() => unlockStep(safeStepIdx + 1)}
                    onAutoUnlockNext={autoUnlockPracticeStages}
                    onGoToStep3={() => setWorkerStep4Sub('sentence')}
                    devUnlockAll={devUnlockAll}
                    savedCompletedGrammarIds={progress.completedGrammarIds ?? []}
                    onCompleteGrammarId={(id) =>
                      setProgress((p) => {
                        const prev = p.completedGrammarIds ?? [];
                        return prev.includes(id) ? p : { ...p, completedGrammarIds: [...prev, id] };
                      })
                    }
                  />
                ) : (
                  <SentenceBuilderLab
                    accent={progress.accent}
                    learnerProfile={effectiveProfile}
                    onAddXp={handleAddXp}
                    extraExercises={customLessons
                      .filter((l) => l.kind === 'sentence')
                      .map((l) => l.payload)}
                    savedCompletedIds={progress.completedSentenceIds ?? []}
                    onCompleteId={(id) =>
                      setProgress((p) => {
                        const prev = p.completedSentenceIds ?? [];
                        return prev.includes(id) ? p : { ...p, completedSentenceIds: [...prev, id] };
                      })
                    }
                    isNextUnlocked={currentAudienceUnlock >= safeStepIdx + 1}
                    onUnlockNext={() => unlockStep(safeStepIdx + 1)}
                  />
                )}
              </div>
            )}

            {/* PAGE: LISTENING & SPEAKING LAB */}
            {currentStep.page === 'listenSpeak' && (
              <ListeningSpeakingLab
                accent={progress.accent}
                learnerProfile={effectiveProfile}
                geminiApiKey={effectiveApiKey}
                extraLessons={customLessons.filter((l) => l.kind === 'listening').map((l) => l.payload)}
                extraScenarios={customLessons.filter((l) => l.kind === 'roleplay').map((l) => l.payload)}
                savedWords={progress.savedWords}
                onSaveWord={handleSaveWord}
                onPronunciationScore={handlePronunciationScore}
                onAddXp={handleAddXp}
                isNextUnlocked={currentAudienceUnlock >= safeStepIdx + 1}
                onUnlockNext={() => unlockStep(safeStepIdx + 1)}
              />
            )}

            {/* PAGE: BILINGUAL WRITING + OCR READER */}
            {currentStep.page === 'writing' && (
              <div className="space-y-5">
                <div className="flex flex-wrap bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 gap-1 w-full sm:w-fit">
                  {[
                    { id: 'write', label: '✍️ Luyện Viết Song Ngữ (Việt ↔ Anh)' },
                    { id: 'read', label: '📖 Đọc & Quét Ảnh OCR' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setStep5Sub(t.id as 'write' | 'read')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                        step5Sub === t.id ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {step5Sub === 'write' && (
                  <BilingualWritingLab
                    accent={progress.accent}
                    learnerProfile={effectiveProfile}
                    geminiApiKey={effectiveApiKey}
                    extraPrompts={customLessons.filter((l) => l.kind === 'writing').map((l) => l.payload)}
                    onAddXp={handleAddXp}
                  />
                )}
                {step5Sub === 'read' && (
                  <OcrSmartReader
                    accent={progress.accent}
                    savedWords={progress.savedWords}
                    onSaveWord={handleSaveWord}
                    onPronunciationScore={handlePronunciationScore}
                  />
                )}
              </div>
            )}

            {/* PAGE: OCR SMART READER + SRS (University U6) */}
            {currentStep.page === 'ocr' && (
              <div className="space-y-5">
                <div className="flex flex-wrap bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 gap-1 w-full sm:w-fit">
                  {[
                    { id: 'ocr', label: '📖 Quét Giáo Trình & Tài Liệu OCR' },
                    { id: 'srs', label: '🧠 Ôn Tập Từ Đã Lưu (SRS 1-3-7-30)' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setUniStep6Sub(t.id as 'ocr' | 'srs')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                        uniStep6Sub === t.id ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {uniStep6Sub === 'ocr' ? (
                  <OcrSmartReader
                    accent={progress.accent}
                    savedWords={progress.savedWords}
                    onSaveWord={handleSaveWord}
                    onPronunciationScore={handlePronunciationScore}
                  />
                ) : (
                  <MemoryGamesSRS
                    accent={progress.accent}
                    savedWords={progress.savedWords}
                    srsCards={progress.srsCards}
                    onRateSrs={handleRateSrs}
                    onAddXp={handleAddXp}
                  />
                )}
              </div>
            )}
          </>
        )}
      </AppShell>

      {/* Learner Profile & Audience Switcher Modal */}
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
            setActiveStepIdx(0);
          }}
        />
      )}
    </>
  );
}

export default App;
