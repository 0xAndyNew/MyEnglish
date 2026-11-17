import React, { useEffect, useRef, useState } from 'react';
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
} from 'lucide-react';
import { UserAccount, UserProgress, WordEntry } from './types/learning';
import {
  addWordToNotebook,
  fetchSessionState,
  getAuthToken,
  getDefaultProgress,
  isDevAccount,
  logoutAccount,
  saveProgressToDb,
  updateSrsCard,
} from './utils/storage';
import { setServerHasGeminiKey } from './utils/speechEngine';
import { analyzeWordFull } from './utils/wordAnalyzer';
import { AuthScreen } from './components/AuthScreen';
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

const ROADMAP_STEPS = [
  { idx: 0, label: 'B1A: 26 Chữ cái A–Z' },
  { idx: 1, label: 'B1B: 44 Âm IPA' },
  { idx: 2, label: 'B2A: Nạp Từ vựng' },
  { idx: 3, label: 'B2B: Ngữ pháp' },
  { idx: 4, label: 'B2C: Lab Ghép Câu' },
  { idx: 5, label: 'B3: Luyện Nghe & Nói' },
  { idx: 6, label: 'B4: Đọc, Viết & SRS' },
];

export function App() {
  const [authChecking, setAuthChecking] = useState(() => Boolean(getAuthToken()));
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [progress, setProgress] = useState<UserProgress>(() => getDefaultProgress());
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [darkMode, setDarkMode] = useState(false);
  const [devUnlockAll, setDevUnlockAll] = useState(false);
  const [hasServerApiKey, setHasServerApiKey] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const effectiveApiKey = hasServerApiKey ? 'SERVER_CONFIGURED' : '';
  const hydratedEmailRef = useRef<string | null>(null);

  // Step 6 (B5) sub-view
  const [step5Sub, setStep5Sub] = useState<'write' | 'read' | 'vocab' | 'srs'>('write');

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
        hydratedEmailRef.current = state.user.email;
        setCurrentUser(state.user);
        setProgress(state.progress);
        setActiveStepIdx(state.progress.unlockedStepIndex || 0);
        setDevUnlockAll(state.user.role === 'admin' || isDevAccount(state.user.email));
        setHasServerApiKey(state.hasApiKey);
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

  const handleAuthSuccess = async (user: UserAccount, loadedProg: UserProgress) => {
    hydratedEmailRef.current = user.email;
    setCurrentUser(user);
    setProgress(loadedProg);
    setActiveStepIdx(loadedProg.unlockedStepIndex || 0);
    setDevUnlockAll(user.role === 'admin' || isDevAccount(user.email));
    setSearchedWord(null);
    const state = await fetchSessionState();
    if (state) {
      setHasServerApiKey(state.hasApiKey);
    }
  };

  const handleLogout = async () => {
    hydratedEmailRef.current = null;
    await logoutAccount();
    setCurrentUser(null);
    setDevUnlockAll(false);
    setHasServerApiKey(false);
    setSearchedWord(null);
  };

  const unlockStep = (targetIdx: number) => {
    const effectiveTarget = targetIdx >= 4 ? 6 : targetIdx;
    setProgress((prev) => ({
      ...prev,
      unlockedStepIndex: Math.max(prev.unlockedStepIndex, effectiveTarget),
      xp: prev.xp + (prev.unlockedStepIndex < effectiveTarget ? 40 : 0),
    }));
    setActiveStepIdx(targetIdx);
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
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `myenglish-${currentUser.email}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
          {/* Logo + Account Info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white leading-none block">
                MyEnglish
              </span>
              <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 truncate block max-w-[155px] sm:max-w-[260px]">
                {currentUser.displayName} ({currentUser.email})
              </span>
            </div>
          </div>

          {/* Global Quick Word Search */}
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
                  <span className="hidden lg:inline">{devUnlockAll ? 'Dev: Đang mở hết' : 'Chế độ khóa tuần tự'}</span>
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
              title="Đăng xuất tài khoản Gmail"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Responsive Single-Track Progression Grid (fits cleanly across Mobile / Tablet / Desktop without clipping) */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 pb-2.5">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
            {ROADMAP_STEPS.map((st) => {
              const isLocked =
                !devUnlockAll &&
                st.idx > progress.unlockedStepIndex &&
                !(st.idx >= 4 && progress.unlockedStepIndex >= 4);
              const isDone = st.idx < progress.unlockedStepIndex;
              const isActive = activeStepIdx === st.idx;
              return (
                <button
                  key={st.idx}
                  disabled={isLocked}
                  onClick={() => setActiveStepIdx(st.idx)}
                  title={st.label}
                  className={`inline-flex items-center justify-center sm:justify-start gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold border transition text-left ${
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
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-300' : 'text-emerald-500'}`} />
                  ) : null}
                  <span className="truncate">{st.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content — Responsive container across all screen sizes */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {searchError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-700 text-sm flex justify-between items-center">
            <span>{searchError}</span>
            <button onClick={() => setSearchError(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {searchedWord && (
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

        {/* B1A: 26 Chữ cái (A-Z) */}
        {activeStepIdx === 0 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Bước 1A: Làm Chủ 26 Chữ Cái Tiếng Anh (A–Z)
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Nghe phát âm, tự tay viết lại chữ cái & hoàn thành bài kiểm tra bên dưới để mở khóa <strong>Bước 1B: 44 Âm IPA</strong>.
              </p>
            </div>
            <AlphabetFoundation
              accent={progress.accent}
              isStepCompleted={progress.unlockedStepIndex >= 1}
              onCompleteStep1A={() => unlockStep(1)}
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

        {/* B1B: 44 Âm IPA (20 Nguyên âm + 24 Phụ âm & Âm cuối) */}
        {activeStepIdx === 1 && (
          <IpaPhonicsLab
            accent={progress.accent}
            masteredPhonemes={progress.masteredPhonemes}
            onToggleMastered={handleTogglePhoneme}
            defaultSubStep="vowels"
            isStepCompleted={progress.unlockedStepIndex >= 2}
            onCompleteStep1B={() => unlockStep(2)}
            savedPassedPairs={progress.passedIpaPairs ?? []}
            onPassPair={(pairId) =>
              setProgress((p) => {
                const prev = p.passedIpaPairs ?? [];
                return prev.includes(pairId) ? p : { ...p, passedIpaPairs: [...prev, pairId] };
              })
            }
          />
        )}

        {/* B2A: Nạp Từ Vựng (133 bài khóa tuần tự) */}
        {activeStepIdx === 2 && (
          <CurriculumRoadmap
            accent={progress.accent}
            completedLessons={progress.completedLessons}
            savedWords={progress.savedWords}
            onCompleteLesson={handleCompleteLesson}
            onResetLessons={() => setProgress((p) => ({ ...p, completedLessons: [] }))}
            onNavigateTab={() => {}}
            onSaveWord={handleSaveWord}
            onPronunciationScore={handlePronunciationScore}
            isStep2BUnlocked={progress.unlockedStepIndex >= 3}
            onUnlockStep2B={() => unlockStep(3)}
            devUnlockAll={devUnlockAll}
          />
        )}

        {/* B2B: Ngữ Pháp (5 Từ loại, S+V+O, 6 Thì cơ bản) */}
        {activeStepIdx === 3 && (
          <WritingGrammarLab
            accent={progress.accent}
            geminiApiKey={effectiveApiKey}
            onAddXp={(amount) => setProgress((p) => ({ ...p, xp: p.xp + amount }))}
            isStep3Unlocked={progress.unlockedStepIndex >= 4}
            onUnlockStep3={() => unlockStep(4)}
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

        {/* B2C: Lab Ghép Câu (120 bài A1 -> B2) */}
        {activeStepIdx === 4 && (
          <SentenceBuilderLab
            accent={progress.accent}
            onAddXp={(amount) => setProgress((p) => ({ ...p, xp: p.xp + amount }))}
            savedCompletedIds={progress.completedSentenceIds ?? []}
            onCompleteId={(id) =>
              setProgress((p) => {
                const prev = p.completedSentenceIds ?? [];
                return prev.includes(id) ? p : { ...p, completedSentenceIds: [...prev, id] };
              })
            }
            isNextUnlocked={progress.unlockedStepIndex >= 5}
            onUnlockNext={() => unlockStep(5)}
          />
        )}

        {/* B3: Luyện Nghe & Nói Tích Hợp */}
        {activeStepIdx === 5 && (
          <ListeningSpeakingLab
            accent={progress.accent}
            geminiApiKey={effectiveApiKey}
            savedWords={progress.savedWords}
            onSaveWord={handleSaveWord}
            onPronunciationScore={handlePronunciationScore}
            onAddXp={(amount) => setProgress((p) => ({ ...p, xp: p.xp + amount }))}
            isNextUnlocked={progress.unlockedStepIndex >= 6}
            onUnlockNext={() => unlockStep(6)}
          />
        )}

        {/* B5: Mở rộng Đọc OCR, Viết Nhật Ký, Kho 980+ Từ & Ôn SRS */}
        {activeStepIdx === 6 && (
          <div className="space-y-5">
            <div className="flex flex-wrap bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 gap-1 w-full sm:w-fit">
              {[
                { id: 'write', label: '✍️ Luyện Viết Song Ngữ (Việt ↔ Anh)' },
                { id: 'read', label: '📖 Đọc & Quét Ảnh OCR' },
                { id: 'vocab', label: '📚 Kho 980+ Từ Cốt Lõi' },
                { id: 'srs', label: '🧠 Ôn Tập SRS (1-3-7-30)' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setStep5Sub(t.id as any)}
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
                geminiApiKey={effectiveApiKey}
                onAddXp={(amount) => setProgress((p) => ({ ...p, xp: p.xp + amount }))}
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
            {step5Sub === 'vocab' && (
              <VocabularyLibrary
                accent={progress.accent}
                savedWords={progress.savedWords}
                onSaveWord={handleSaveWord}
                onPronunciationScore={handlePronunciationScore}
              />
            )}
            {step5Sub === 'srs' && (
              <MemoryGamesSRS
                accent={progress.accent}
                savedWords={progress.savedWords}
                srsCards={progress.srsCards}
                onRateSrs={handleRateSrs}
                onAddXp={(amount) => setProgress((p) => ({ ...p, xp: p.xp + amount }))}
              />
            )}
          </div>
        )}
      </main>

      {isDevAccount(currentUser.email) && (
        <AdminPanelModal
          isOpen={showAdminModal}
          onClose={() => setShowAdminModal(false)}
          hasApiKey={hasServerApiKey}
          onApiKeyStatusChange={setHasServerApiKey}
          currentEmail={currentUser.email}
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
