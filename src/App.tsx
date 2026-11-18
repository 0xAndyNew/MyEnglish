import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import {
  Search,
  Flame,
  Trophy,
  Sun,
  Moon,
  Download,
  X,
  Loader2,
  BookOpenCheck,
  Lock,
  Unlock,
  CheckCircle2,
  LogOut,
  Shield,
  Sliders,
  Eye,
  ArrowRight,
} from 'lucide-react';
import {
  AUDIENCE_TRACKS,
  canViewPage,
  getInitialUnlockedStepForTrack,
  isStepAutoPassed,
  resolveTrack,
} from './config/audienceTracks';
import {
  AUDIENCE_METADATA,
  AudienceId,
  createDefaultProfile,
  getAudienceMeta,
  getExamMeta,
  LearnerProfile,
} from './types/audience';
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
const SchoolCurriculum = lazy(() => import('./components/teen/SchoolCurriculum').then((m) => ({ default: m.SchoolCurriculum })));
const AcademicSkills = lazy(() => import('./components/university/AcademicSkills').then((m) => ({ default: m.AcademicSkills })));
const WorkplaceCareerHub = lazy(() => import('./components/worker/WorkplaceCareerHub').then((m) => ({ default: m.WorkplaceCareerHub })));
const ExamPrepCenter = lazy(() => import('./components/exam/ExamPrepCenter').then((m) => ({ default: m.ExamPrepCenter })));

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
  const [showProfileModal, setShowProfileModal] = useState(false);
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
      return createDefaultProfile(adminPreviewAudience);
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
    pendingAudience?: AudienceId
  ) => {
    const normalizedProg = normalizeProgressUnlock(loadedProg);
    hydratedEmailRef.current = user.email;
    setCurrentUser(user);
    setLearnerProfile(user.profile ?? null);
    setPendingWizardAudience(pendingAudience);
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
    setLearnerProfile(nextProfile);
    setPendingWizardAudience(undefined);
    setAdminPreviewAudience(null);
    setActiveStepIdx(0);

    const saved = await saveLearnerProfileApi(nextProfile);
    setLearnerProfile(saved);
    setCurrentUser((prev) => (prev ? { ...prev, profile: saved } : prev));

    const steps = resolveTrack(saved);
    const initUnlock = getInitialUnlockedStepForTrack(steps, saved);
    setProgress((prev) => {
      const prevAudUnlock = prev.trackUnlocks?.[saved.audience] ?? 0;
      const nextUnlock = Math.max(prevAudUnlock, initUnlock);
      return {
        ...prev,
        trackUnlocks: {
          ...(prev.trackUnlocks || {}),
          [saved.audience]: nextUnlock,
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
      startLevel: aud === 'kids' ? 'A0' : learnerProfile?.startLevel || base.startLevel,
      dailyMinutes: learnerProfile?.dailyMinutes || base.dailyMinutes,
    };
    handleSaveLearnerProfile(nextProf);
  };

  const handleLogout = async () => {
    hydratedEmailRef.current = null;
    await logoutAccount();
    setCurrentUser(null);
    setLearnerProfile(null);
    setPendingWizardAudience(undefined);
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
        initialProfile={learnerProfile}
        onComplete={handleSaveLearnerProfile}
      />
    );
  }

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

  return (
    <div
      className={`min-h-screen flex flex-col text-slate-900 dark:text-slate-100 ${
        isKidsAudience
          ? 'bg-gradient-to-b from-amber-50/70 via-sky-50/40 to-pink-50/40 dark:from-slate-950 dark:to-slate-900'
          : 'bg-slate-50 dark:bg-slate-950'
      }`}
    >
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
          {/* Logo + Account Info + Active Audience Pill */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-9 h-9 rounded-xl bg-gradient-to-br ${audienceMeta.accentGradient} text-white flex items-center justify-center shadow-sm shrink-0`}
            >
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-base font-black tracking-tight text-slate-900 dark:text-white leading-none">
                  MyEnglish
                </span>
                <button
                  type="button"
                  onClick={() => setShowProfileModal(true)}
                  title="Bấm để xem hoặc đổi nhóm đối tượng học tập"
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold border transition hover:opacity-90 ${audienceMeta.badgeColor}`}
                >
                  <span>{audienceMeta.emoji}</span>
                  <span>{audienceMeta.shortLabel}</span>
                  <span className="opacity-75">• {audienceSubTag}</span>
                  <Sliders className="w-2.5 h-2.5 ml-0.5" />
                </button>
              </div>
              <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 truncate block max-w-[200px] sm:max-w-[280px] mt-0.5">
                {currentUser.displayName} ({currentUser.email})
              </span>
            </div>
          </div>

          {/* Global Quick Word Search — Hidden in Kids Mode per visibility matrix */}
          {!isKidsAudience && (
            <form onSubmit={handleGlobalSearch} className="order-last sm:order-none w-full sm:flex-1 sm:max-w-xs">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tra từ điển nhanh..."
                  className="w-full pl-9 pr-14 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={searchLoading}
                  className="absolute right-1 px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
                >
                  {searchLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Tra'}
                </button>
              </div>
            </form>
          )}

          {/* Stats & Account Actions */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-[11px] sm:text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{progress.streakDays}d</span>
            </div>
            <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[11px] sm:text-xs font-bold">
              <Trophy className="w-3.5 h-3.5 text-indigo-500" />
              <span>{progress.xp} XP</span>
            </div>

            <button
              onClick={() => setShowProfileModal(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100 transition"
              title="Đổi nhóm đối tượng / Lộ trình học tập"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Đổi đối tượng</span>
            </button>

            <button
              onClick={() =>
                setProgress((p) => ({ ...p, accent: p.accent === 'en-US' ? 'en-GB' : 'en-US' }))
              }
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
            >
              {progress.accent === 'en-US' ? '🇺🇸 US' : '🇬🇧 UK'}
            </button>

            <button
              onClick={handleExportData}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              title="Sao lưu dữ liệu học (JSON)"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              title="Sáng / Tối"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {isDevAccount(currentUser.email) && (
              <>
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/70 dark:bg-violet-950/40 text-xs font-bold text-violet-700 dark:text-violet-300">
                  <Eye className="w-3.5 h-3.5 shrink-0" />
                  <select
                    value={adminPreviewAudience || ''}
                    onChange={(e) => {
                      const val = (e.target.value || null) as AudienceId | null;
                      setAdminPreviewAudience(val);
                      setActiveStepIdx(0);
                    }}
                    className="bg-transparent outline-none text-xs font-bold cursor-pointer"
                    title="Admin: Xem giao diện như nhóm đối tượng"
                  >
                    <option value="">Xem như: Hồ sơ gốc</option>
                    {AUDIENCE_METADATA.map((aud) => (
                      <option key={aud.id} value={aud.id}>
                        {aud.emoji} Xem như: {aud.shortLabel}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setDevUnlockAll(!devUnlockAll)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                    devUnlockAll
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                      : 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300'
                  }`}
                  title="Bật/tắt chế độ tạm mở khóa tất cả để test tính năng"
                >
                  {devUnlockAll ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                  <span className="hidden xl:inline">{devUnlockAll ? 'Dev: Mở hết' : 'Khóa tuần tự'}</span>
                </button>
                <button
                  onClick={() => setShowAdminModal(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-300 transition"
                  title="Mở bảng quản trị Admin (API Key & Tài khoản)"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Quản trị</span>
                </button>
              </>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 dark:bg-slate-800 dark:text-slate-300 text-xs font-bold transition"
              title="Đăng xuất tài khoản"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Audience Selector Bar + Track Progression Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 pb-2.5 space-y-2">
          {/* 1-Click Audience Group Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 mr-1">
                Độ tuổi / Đối tượng:
              </span>
              {AUDIENCE_METADATA.map((aud) => {
                const isSelected = effectiveProfile.audience === aud.id;
                return (
                  <button
                    key={aud.id}
                    type="button"
                    onClick={() => handleQuickSwitchAudience(aud.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-extrabold border transition ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-100/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    <span>{aud.emoji}</span>
                    <span>{aud.shortLabel}</span>
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setShowProfileModal(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold border border-dashed border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
              >
                <Sliders className="w-3 h-3" />
                <span>Tùy chỉnh lớp / ngành / kỳ thi ({audienceSubTag})</span>
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              {activeTrackConfig.skillDistribution.slice(0, 4).map((sk) => (
                <span key={sk.skill} className="inline-flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${sk.color}`} />
                  {sk.skill}: {sk.percent}%
                </span>
              ))}
            </div>
          </div>

          <div
            className={`grid grid-cols-2 sm:grid-cols-3 ${
              activeTrackSteps.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-6'
            } gap-1.5`}
          >
            {activeTrackSteps.map((st) => {
              const autoPassed = isStepAutoPassed(st, effectiveProfile);
              const isLocked = !devUnlockAll && st.idx > currentAudienceUnlock && !autoPassed;
              const isDone = st.idx < currentAudienceUnlock || autoPassed;
              const isActive = safeStepIdx === st.idx;
              return (
                <button
                  key={st.code}
                  disabled={isLocked}
                  onClick={() => setActiveStepIdx(st.idx)}
                  title={`${st.label} — ${st.description}`}
                  className={`inline-flex items-center justify-center sm:justify-start gap-1.5 px-2.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold border transition text-left ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : isLocked
                      ? 'bg-slate-100/70 dark:bg-slate-800/40 text-slate-400 border-slate-200/60 dark:border-slate-800 cursor-not-allowed'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                  }`}
                >
                  {isLocked ? (
                    <Lock className="w-3 h-3 shrink-0" />
                  ) : isDone ? (
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-300' : 'text-emerald-500'}`}
                    />
                  ) : null}
                  <span className="truncate">{st.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content — Renders ONLY the pages allowed for the active audience track */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6">
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
              <div className="space-y-4">
                {!isKidsAudience && (
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      {currentStep.label}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {currentStep.description}
                    </p>
                  </div>
                )}
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
              </div>
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
                />
              )}

              {/* PAGE: WORKPLACE CAREER HUB (10 Industries, Meetings, Email/Slack, STAR Interview) */}
              {currentStep.page === 'workplace' && (
                <WorkplaceCareerHub
                  accent={progress.accent}
                  profile={effectiveProfile}
                  onAddXp={handleAddXp}
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

            {/* Track Progression Helper Footer for Audience Steps */}
            {safeStepIdx < activeTrackSteps.length - 1 && (
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-sm">
                <div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                    Đang học: {currentStep.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Bước tiếp theo: <strong>{activeTrackSteps[safeStepIdx + 1].label}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => unlockStep(safeStepIdx + 1)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition"
                >
                  <span>Hoàn thành & Qua bước {activeTrackSteps[safeStepIdx + 1].code}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Learner Profile & Audience Switcher Modal */}
      <LearnerProfilePanel
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profile={learnerProfile}
        onSaveProfile={handleSaveLearnerProfile}
        xp={progress.xp}
        savedWordsCount={progress.savedWords.length}
      />

      {isDevAccount(currentUser.email) && (
        <AdminPanelModal
          isOpen={showAdminModal}
          onClose={() => setShowAdminModal(false)}
          hasApiKey={hasServerApiKey}
          onApiKeyStatusChange={setHasServerApiKey}
          currentEmail={currentUser.email}
          onCustomLessonsChange={setCustomLessons}
          onResetCurrentProgress={() => {
            setProgress(getDefaultProgress());
            setActiveStepIdx(0);
          }}
        />
      )}
    </div>
  );
}

export default App;
