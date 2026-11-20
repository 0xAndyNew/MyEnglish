import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Gamepad2,
  Headphones,
  Loader2,
  Play,
  RotateCcw,
  Search,
  Square,
  Timer,
  Volume2,
} from 'lucide-react';
import type { SchoolGrade } from '../../../data/teen/types';
import { getExamMeta, type ExamType, type LearnerProfile } from '../../../types/audience';
import type { UserProgress } from '../../../types/learning';
import { speakText } from '../../../utils/speechEngine';
import { PaginationBar, usePagination } from '../../common/PaginationBar';
import {
  EXAM_PREF_EVENT,
  getExamDiagnosticSummary,
  getExamTargetScore,
  getPreferredExam,
  saveExamDiagnosticSummary,
  setPreferredExam,
  type ExamDiagSkillKey,
  type ExamDiagnosticSummary,
} from '../../exam/examPreferences';
import { MemoryGamesSRS } from '../../MemoryGamesSRS';
import { ExerciseRunner } from '../../practice/ExerciseRunner';
import type { AgeTier } from '../theme/ageTiers';
import { AppButton } from '../ui/Button';
import { AppCard } from '../ui/Card';
import { SegmentedTabs, type SegmentedTabItem } from '../ui/SegmentedTabs';
import type { AppRoute } from '../useHashRoute';
import {
  buildCategories,
  buildExerciseSetsForAudience,
  type ExerciseSetItem,
} from './exerciseSetBuilders';
import { getExerciseScoreMap, recordExerciseScore, type ExerciseScoreRecord } from './exerciseTracker';

const ExamPrepCenter = lazy(() =>
  import('../../exam/ExamPrepCenter').then((m) => ({ default: m.ExamPrepCenter }))
);

export interface ExerciseHubProps {
  tier: AgeTier;
  profile: LearnerProfile;
  progress: UserProgress;
  effectiveApiKey?: string;
  initialCategory?: string;
  initialSub?: string;
  onRateSrs: (wordId: string, quality: 0 | 2 | 4 | 5) => void;
  onAddXp: (amount: number) => void;
  onNavigate: (route: AppRoute) => void;
}

export const ExerciseHub: React.FC<ExerciseHubProps> = ({
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
  const aud = profile.audience;
  const categories = useMemo(() => buildCategories(aud), [aud]);
  const [activeCat, setActiveCat] = useState<string>(() =>
    initialCategory && categories.some((c) => c.id === initialCategory)
      ? initialCategory
      : categories[0].id
  );

  // Audience-specific sub-filters
  const [teenGrade, setTeenGrade] = useState<SchoolGrade>(() => profile.teen?.grade || 9);
  const [selectedExam, setSelectedExam] = useState<ExamType>(() =>
    getPreferredExam(profile)
  );
  const [examSkillSubFilter, setExamSkillSubFilter] = useState<
    'all' | 'reading' | 'listening' | 'grammar'
  >('all');
  const [examMockCount, setExamMockCount] = useState<number>(5);
  const [examDiagSummary, setExamDiagSummary] = useState<ExamDiagnosticSummary | null>(() =>
    getExamDiagnosticSummary(getPreferredExam(profile))
  );
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'done'>('all');

  const [loading, setLoading] = useState(true);
  const [sets, setSets] = useState<ExerciseSetItem[]>([]);
  const [activeSet, setActiveSet] = useState<ExerciseSetItem | null>(null);
  const [showViSummary, setShowViSummary] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [scores, setScores] = useState<Record<string, ExerciseScoreRecord>>(() =>
    getExerciseScoreMap()
  );

  const listRef = useRef<HTMLDivElement | null>(null);

  // Reset category & active set when audience changes
  useEffect(() => {
    const nextCats = buildCategories(aud);
    setActiveCat(
      initialCategory && nextCats.some((c) => c.id === initialCategory)
        ? initialCategory
        : nextCats[0].id
    );
    setActiveSet(null);
    setQuery('');
    setStatusFilter('all');
  }, [aud]);

  // Sync deep-link category & sub filter
  useEffect(() => {
    if (initialCategory && categories.some((c) => c.id === initialCategory)) {
      setActiveCat(initialCategory);
      setActiveSet(null);
    }
    if (
      initialCategory === 'skills' &&
      (initialSub === 'reading' || initialSub === 'listening' || initialSub === 'grammar')
    ) {
      setExamSkillSubFilter(initialSub);
    } else if (!initialSub && initialCategory === 'skills') {
      setExamSkillSubFilter('all');
    }
  }, [initialCategory, initialSub, categories]);

  useEffect(() => {
    if (profile.teen?.grade) setTeenGrade(profile.teen.grade);
  }, [profile.teen?.grade]);

  useEffect(() => {
    const syncExam = () => {
      const ex = getPreferredExam(profile);
      setSelectedExam(ex);
      setExamDiagSummary(getExamDiagnosticSummary(ex));
    };
    syncExam();
    window.addEventListener(EXAM_PREF_EVENT, syncExam);
    return () => window.removeEventListener(EXAM_PREF_EVENT, syncExam);
  }, [profile]);

  const handleSelectExam = (ex: ExamType) => {
    setSelectedExam(ex);
    setPreferredExam(ex);
    setExamDiagSummary(getExamDiagnosticSummary(ex));
  };

  // Dynamically load only the current audience's exercise data
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setActiveSet(null);

    buildExerciseSetsForAudience({
      aud,
      teenGrade,
      selectedExam,
      profile,
    }).then((res) => {
      if (!mounted) return;
      setExamMockCount(res.examMockCount);
      setSets(res.sets);
      setLoading(false);
    });

    return () => {
      mounted = false;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [aud, teenGrade, selectedExam, profile.worker?.industries]);

  const parsedRubricTask = useMemo(() => {
    if (activeCat !== 'rubric' || !initialSub) return undefined;
    const [modeRaw, ...rest] = initialSub.split(':');
    const mode = modeRaw === 'speaking' ? 'speaking' : 'writing';
    const taskId = rest.join(':');
    return { mode, taskId: taskId || undefined } as const;
  }, [activeCat, initialSub]);

  const categorySets = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sets.filter((s) => {
      if (s.category !== activeCat) return false;
      if (
        aud === 'exam' &&
        activeCat === 'skills' &&
        examSkillSubFilter !== 'all' &&
        s.skillTag !== examSkillSubFilter
      ) {
        return false;
      }
      if (q && !s.title.toLowerCase().includes(q) && !s.subtitle.toLowerCase().includes(q)) {
        return false;
      }
      if (statusFilter === 'done' && !scores[s.id]) return false;
      if (statusFilter === 'todo' && Boolean(scores[s.id])) return false;
      return true;
    });
  }, [sets, activeCat, aud, examSkillSubFilter, query, statusFilter, scores]);

  const pagination = usePagination(categorySets, 10, {
    resetKey: `${aud}-${activeCat}-${teenGrade}-${selectedExam}-${examSkillSubFilter}-${query}-${statusFilter}`,
  });

  const completedInCat = useMemo(() => {
    const inCat = sets.filter((s) => {
      if (s.category !== activeCat) return false;
      if (
        aud === 'exam' &&
        activeCat === 'skills' &&
        examSkillSubFilter !== 'all' &&
        s.skillTag !== examSkillSubFilter
      ) {
        return false;
      }
      return true;
    });
    const done = inCat.filter((s) => Boolean(scores[s.id])).length;
    return { done, total: inCat.length };
  }, [sets, activeCat, aud, examSkillSubFilter, scores]);

  // Stop speech when leaving an active exercise set
  useEffect(() => {
    setShowViSummary(false);
    setIsPlayingAudio(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [activeSet?.id]);

  // =========================================================================
  // ACTIVE EXERCISE VIEW
  // =========================================================================
  if (activeSet) {
    const rec = scores[activeSet.id];
    return (
      <div className="space-y-4 animate-screen-in">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setActiveSet(null)}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-extrabold text-slate-700 dark:text-slate-200 inline-flex items-center gap-2 shadow-2xs active:scale-95 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Danh sách bài tập</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-soft text-brand text-xs font-extrabold">
              {activeSet.badge}
            </span>
            {rec && (
              <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold">
                Cao nhất: {rec.bestCorrect}/{rec.total}
              </span>
            )}
          </div>
        </div>

        {/* Reading passage / Listening audio script card */}
        {activeSet.passage && (
          <AppCard tier={tier} className="p-4 sm:p-5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {activeSet.passage.title}
                </h3>
                {activeSet.passage.subtitle && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {activeSet.passage.subtitle}
                  </p>
                )}
              </div>
              {activeSet.passage.audioScript && (
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold inline-flex items-center gap-1 shrink-0">
                  <Headphones className="w-3.5 h-3.5" /> Nghe
                </span>
              )}
            </div>

            {activeSet.passage.audioScript && (
              <div className="flex flex-wrap items-center gap-2">
                <AppButton
                  tier={tier}
                  onClick={() => {
                    if (isPlayingAudio) {
                      window.speechSynthesis?.cancel();
                      setIsPlayingAudio(false);
                    } else {
                      setIsPlayingAudio(true);
                      speakText(activeSet.passage!.audioScript!, progress.accent, 0.92);
                    }
                  }}
                >
                  {isPlayingAudio ? <Square className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isPlayingAudio ? 'Dừng phát Audio' : 'Phát bài nghe'}</span>
                </AppButton>
              </div>
            )}

            {activeSet.passage.textEn && (
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                {activeSet.passage.textEn}
              </p>
            )}

            {activeSet.passage.textVi && (
              <div>
                <button
                  type="button"
                  onClick={() => setShowViSummary((v) => !v)}
                  className="text-xs font-extrabold text-brand hover:underline"
                >
                  {showViSummary ? 'Ẩn gợi ý / bản dịch tiếng Việt' : 'Xem gợi ý / bản dịch tiếng Việt'}
                </button>
                {showViSummary && (
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-amber-50/70 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200/80 dark:border-amber-800/50 leading-relaxed">
                    {activeSet.passage.textVi}
                  </p>
                )}
              </div>
            )}
          </AppCard>
        )}

        <ExerciseRunner
          key={activeSet.id}
          exercises={activeSet.exercises}
          title={activeSet.title}
          subtitle={activeSet.subtitle}
          accent={progress.accent}
          onComplete={async (correct, total, details) => {
            const next = recordExerciseScore(activeSet.id, correct, total);
            setScores(next);
            if (correct > 0) {
              onAddXp(Math.max(10, Math.round((correct / Math.max(1, total)) * 30)));
            }
            if (aud === 'exam' && activeSet.category === 'diagnostic') {
              const { estimateExamScore } = await import('../../../data/exam/examPrepData');
              const est = estimateExamScore(selectedExam, correct, total);
              const stats = details?.skillStats || {};
              const diagSkills: ExamDiagSkillKey[] = ['listening', 'reading', 'grammar', 'vocab'];
              const weakSkills = diagSkills.filter((sk) => {
                const st = stats[sk];
                return st && st.total > 0 && st.correct / st.total < 0.7;
              });
              const summary: ExamDiagnosticSummary = {
                examType: selectedExam,
                estimatedScore: est.estimatedScore,
                cefr: est.cefr,
                correctCount: correct,
                totalCount: total,
                accuracyPercent: est.accuracyPercent,
                commentVi: est.commentVi,
                weakSkills,
                skillStats: {
                  listening: stats.listening,
                  reading: stats.reading,
                  grammar: stats.grammar,
                  vocab: stats.vocab,
                },
                updatedAt: Date.now(),
              };
              saveExamDiagnosticSummary(summary);
              setExamDiagSummary(summary);
            }
          }}
        />
      </div>
    );
  }

  // =========================================================================
  // CATEGORY LIST / PICKER VIEW
  // =========================================================================
  const tabItems: SegmentedTabItem[] = categories.map((c) => {
    const count =
      aud === 'exam' && c.id === 'mocks'
        ? examMockCount
        : sets.filter((s) => s.category === c.id).length;
    return {
      id: c.id,
      label: c.label,
      badge: c.id !== 'srs' && c.id !== 'rubric' && count > 0 ? count : undefined,
    };
  });

  const examTargetScore = aud === 'exam' ? getExamTargetScore(selectedExam, profile) : '';
  const weakSkillLabelMap: Record<ExamDiagSkillKey, string> = {
    listening: 'Listening',
    reading: 'Reading',
    grammar: 'Ngữ pháp',
    vocab: 'Từ vựng',
  };

  return (
    <div className="space-y-4">
      <SegmentedTabs
        items={tabItems}
        activeId={activeCat}
        onChange={setActiveCat}
        tier={tier}
        sticky={false}
      />

      {activeCat === 'srs' ? (
        <MemoryGamesSRS
          accent={progress.accent}
          savedWords={progress.savedWords}
          srsCards={progress.srsCards}
          onRateSrs={onRateSrs}
          onAddXp={onAddXp}
        />
      ) : loading ? (
        <div className="flex items-center justify-center py-16 text-sm font-semibold text-slate-500 gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-brand" />
          <span>Đang tải danh sách bài tập...</span>
        </div>
      ) : (
        <div ref={listRef} className="space-y-4">
          {/* Audience-specific selectors (Teen Grade / Exam Type) */}
          {aud === 'teen' && (activeCat === 'units' || activeCat === 'reviews') && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
              {([6, 7, 8, 9, 10, 11, 12] as SchoolGrade[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setTeenGrade(g)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-extrabold shrink-0 border transition ${
                    teenGrade === g
                      ? 'bg-brand text-white border-brand shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  Lớp {g}
                </button>
              ))}
            </div>
          )}

          {aud === 'exam' && (
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 px-3.5 py-2">
                <div className="flex items-center gap-2">
                  <select
                    value={selectedExam}
                    onChange={(e) => handleSelectExam(e.target.value as ExamType)}
                    aria-label="Chọn kỳ thi"
                    className="min-h-[38px] px-2.5 py-1 rounded-xl bg-brand-soft border border-brand/20 text-xs sm:text-sm font-extrabold text-brand outline-none cursor-pointer"
                  >
                    {(['ielts', 'toeic', 'vstep', 'cambridge', 'toefl'] as ExamType[]).map((ex) => (
                      <option key={ex} value={ex}>
                        {getExamMeta(ex).shortLabel}
                      </option>
                    ))}
                  </select>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-extrabold text-slate-700 dark:text-slate-200">
                    Mục tiêu {examTargetScore}
                  </span>
                </div>

                {activeCat === 'skills' && (
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {(
                      [
                        { id: 'all', label: 'Tất cả' },
                        { id: 'reading', label: 'Reading' },
                        { id: 'listening', label: 'Listening' },
                        { id: 'grammar', label: 'Ngữ pháp' },
                      ] as const
                    ).map((sf) => (
                      <button
                        key={sf.id}
                        type="button"
                        onClick={() => setExamSkillSubFilter(sf.id)}
                        className={`min-h-[34px] px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 transition ${
                          examSkillSubFilter === sf.id
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {sf.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {activeCat === 'diagnostic' && examDiagSummary && (
                <AppCard tier={tier} className="p-4 bg-gradient-to-r from-indigo-50 via-rose-50 to-amber-50 dark:from-indigo-950/40 dark:via-rose-950/30 dark:to-amber-950/30 border-indigo-200 dark:border-indigo-800 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-extrabold uppercase text-indigo-700 dark:text-indigo-300">
                        Kết quả chẩn đoán {getExamMeta(selectedExam).shortLabel} gần nhất
                      </div>
                      <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                        {examDiagSummary.estimatedScore}{' '}
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white ml-1">
                          CEFR {examDiagSummary.cefr}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      Đúng {examDiagSummary.correctCount}/{examDiagSummary.totalCount} ({examDiagSummary.accuracyPercent}%)
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                    {examDiagSummary.commentVi}
                  </p>
                  {examDiagSummary.weakSkills.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="font-bold text-rose-700 dark:text-rose-300">Cần ưu tiên học:</span>
                      {examDiagSummary.weakSkills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-extrabold"
                        >
                          {weakSkillLabelMap[sk]}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onNavigate({ tab: 'learn', stepCode: 'E1' })}
                      className="min-h-[36px] px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-indigo-700 dark:text-indigo-300"
                    >
                      Cấu trúc đề (E1) →
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate({ tab: 'learn', stepCode: 'E3' })}
                      className="min-h-[36px] px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-extrabold"
                    >
                      Luyện 4 kỹ năng (E3) →
                    </button>
                  </div>
                </AppCard>
              )}
            </div>
          )}

          {aud === 'exam' && (activeCat === 'mocks' || activeCat === 'rubric') ? (
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12 text-sm font-semibold text-slate-500 gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-brand" />
                  <span>Đang mở phòng {activeCat === 'mocks' ? 'thi thử' : 'chấm Rubric'}...</span>
                </div>
              }
            >
              <ExamPrepCenter
                accent={progress.accent}
                geminiApiKey={effectiveApiKey}
                profile={profile}
                onAddXp={onAddXp}
                initialTab={activeCat === 'mocks' ? 'mock' : 'rubric'}
                initialRubricTask={parsedRubricTask}
                hideHeaderNav={true}
                hideExamBar={true}
                onNavigate={onNavigate}
              />
            </Suspense>
          ) : (
            <>

          {/* Filter & progress strip when there are many sets */}
          {sets.filter((s) => s.category === activeCat).length > 6 && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm tên bài tập..."
                  className="w-full min-h-[40px] pl-9 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-brand"
                />
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2">
                <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1">
                  {(
                    [
                      { id: 'all', label: 'Tất cả' },
                      { id: 'todo', label: 'Chưa làm' },
                      { id: 'done', label: 'Đã làm' },
                    ] as const
                  ).map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setStatusFilter(st.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                        statusFilter === st.id
                          ? 'bg-white dark:bg-slate-900 text-brand shadow-2xs'
                          : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
                <span className="text-xs font-extrabold text-brand shrink-0">
                  {completedInCat.done}/{completedInCat.total} bài
                </span>
              </div>
            </div>
          )}

          {/* Exercise Set Cards */}
          {pagination.pageItems.length === 0 ? (
            <AppCard tier={tier} className="p-8 text-center space-y-2">
              <ClipboardList className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                Không có bài tập nào khớp bộ lọc hiện tại.
              </p>
            </AppCard>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pagination.pageItems.map((item) => {
                const rec = scores[item.id];
                const pct = rec ? Math.round((rec.bestCorrect / Math.max(1, rec.total)) * 100) : 0;

                return (
                  <AppCard
                    key={item.id}
                    tier={tier}
                    onClick={() => {
                      if (item.launchRoute) {
                        onNavigate(item.launchRoute);
                      } else {
                        setActiveSet(item);
                      }
                    }}
                    className="p-4 flex flex-col justify-between gap-3 hover:border-brand/60 transition"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-brand-soft text-brand text-xs font-extrabold">
                        {item.badge}
                      </span>

                      {item.launchRoute ? (
                        <span className="inline-flex items-center gap-1 text-xs font-extrabold text-brand">
                          <Gamepad2 className="w-4 h-4" />
                          <span>Mở ngay</span>
                        </span>
                      ) : rec ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {rec.bestCorrect}/{rec.total} ({pct}%)
                          </span>
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-slate-400">
                          {item.exercises.length} câu
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3
                        className={`text-sm sm:text-base font-extrabold leading-snug line-clamp-2 ${
                          tier === 'playful' ? 'text-[#123A6F]' : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-extrabold text-brand">
                      <span className="inline-flex items-center gap-1.5">
                        {item.launchRoute ? (
                          <Gamepad2 className="w-4 h-4" />
                        ) : activeCat === 'mocks' || activeCat === 'exams' ? (
                          <Timer className="w-4 h-4" />
                        ) : activeCat === 'abstracts' ? (
                          <BookOpen className="w-4 h-4" />
                        ) : rec ? (
                          <RotateCcw className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 fill-current" />
                        )}
                        <span>
                          {item.launchLabel || (rec ? 'Làm lại bài tập' : 'Bắt đầu làm bài')}
                        </span>
                      </span>
                      {!item.launchRoute && (
                        <span className="text-slate-400 font-bold">{item.exercises.length} câu</span>
                      )}
                    </div>
                  </AppCard>
                );
              })}
            </div>
          )}

          {categorySets.length > 10 && (
            <PaginationBar
              page={pagination.page}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              startIdx={pagination.startIdx}
              endIdx={pagination.endIdx}
              onPageChange={pagination.setPage}
              variant={tier === 'playful' ? 'kid' : 'default'}
              itemLabel="bài tập"
              scrollTargetRef={listRef}
            />
          )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
