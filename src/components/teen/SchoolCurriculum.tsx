import React, { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  AlertTriangle,
  Award,
  BarChart3,
  BookOpen,
  BookmarkCheck,
  BookmarkPlus,
  CheckCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  GraduationCap,
  HelpCircle,
  ListChecks,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Turtle,
  Volume2,
  XCircle,
} from 'lucide-react';
import {
  getReviewsByGrade,
  getUnitsByGrade,
  SCHOOL_EXAMS,
  SCHOOL_EXAM_SETS,
  SCHOOL_GRADES,
  SCHOOL_UNITS,
  SchoolExamId,
  SchoolGrade,
  SchoolUnit,
  TeenVocabItem,
} from '../../data/teen/schoolCurriculumData';
import { AccentMode, LearnerProfile, WordEntry } from '../../types/learning';
import { speakText } from '../../utils/speechEngine';
import { detectPhonicsHint, detectSilentIndices, splitSyllables } from '../../utils/wordAnalyzer';
import { ExerciseRunner } from '../practice/ExerciseRunner';
import { PaginationBar, usePagination } from '../common/PaginationBar';

export interface SchoolCurriculumProps {
  accent: AccentMode;
  profile?: LearnerProfile | null;
  onAddXp: (amount: number) => void;
  onSaveWord?: (word: WordEntry) => void;
  initialMode?: 'units' | 'exams';
  allowAllOptions?: boolean;
  hideHeaderNav?: boolean;
}

type UnitStepId = 'vocab' | 'grammar' | 'quiz' | 'exercises';

interface SectionBreakdown {
  section: string;
  correct: number;
  total: number;
  percent: number;
}

function estimateStressIndex(ipa: string, syllableCount: number): number {
  if (syllableCount <= 1) return 0;
  const cleaned = ipa.replace(/^\/|\/$/g, '');
  const primaryIdx = cleaned.indexOf('ˈ');
  if (primaryIdx <= 0) return 0;
  const beforeStress = cleaned.slice(0, primaryIdx);
  const vowelClusters = beforeStress.match(/[aæɑɒeɛəɜiɪoɔuʊʌ]+/g);
  const count = vowelClusters ? vowelClusters.length : 0;
  return Math.min(Math.max(0, count), syllableCount - 1);
}

function buildTeenWordEntry(item: TeenVocabItem, unit: SchoolUnit): WordEntry {
  const cleanTokens = item.word
    .trim()
    .split(/[\s-]+/)
    .filter(Boolean);

  const syllables =
    cleanTokens.length > 1
      ? cleanTokens.flatMap((token) => splitSyllables(token))
      : splitSyllables(item.word);

  const safeSyllables = syllables.length > 0 ? syllables : [item.word];
  const isSingleWord = cleanTokens.length <= 1;
  const silentIndices = isSingleWord ? detectSilentIndices(item.word) : [];
  const { rule, vietApprox } = detectPhonicsHint(item.word);

  const normalizedSlug = item.word
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return {
    id: `teen-${unit.id}-${normalizedSlug}`,
    word: item.word,
    syllables: safeSyllables,
    stressIndex: estimateStressIndex(item.ipa, safeSyllables.length),
    silentIndices,
    ipaUS: item.ipa,
    ipaUK: item.ipa,
    vietPhonetic: vietApprox,
    phonicsRule: rule,
    pos: item.pos,
    level: unit.level,
    meaningVi: item.meaningVi,
    mnemonic: `Từ vựng Lớp ${unit.grade} (Unit ${unit.unitNumber}: ${unit.title}) — đọc theo nhịp "${safeSyllables.join(' · ')}" và ghi nhớ qua câu mẫu.`,
    examples: [
      {
        en: item.exampleEn,
        vi: item.exampleVi,
        ipa: item.ipa,
      },
    ],
    topicId: unit.id,
    audiences: ['teen'],
  };
}

function renderFormattedText(text: string): React.ReactNode {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  return parts.map((part, idx) => {
    if (part.startsWith('[[') && part.endsWith(']]')) {
      const inner = part.slice(2, -2);
      return (
        <span
          key={idx}
          className="underline decoration-2 decoration-sky-600 dark:decoration-sky-400 underline-offset-4 font-extrabold text-sky-700 dark:text-sky-300"
        >
          {inner}
        </span>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function getDefaultGradeFromProfile(profile?: LearnerProfile | null): SchoolGrade {
  const grade = profile?.teen?.grade;
  if (grade && grade >= 6 && grade <= 12) return grade;
  return 9;
}

function getDefaultExamFromProfile(profile?: LearnerProfile | null): SchoolExamId {
  if (profile?.teen?.goal === 'thpt') return 'thpt';
  if (profile?.teen?.goal === 'entrance10') return 'entrance10';
  if (profile?.teen?.grade && profile.teen.grade >= 10) return 'thpt';
  return 'entrance10';
}

export const SchoolCurriculum: React.FC<SchoolCurriculumProps> = ({
  accent,
  profile,
  onAddXp,
  onSaveWord,
  initialMode,
  allowAllOptions = false,
}) => {
  // Top-level mode ('units' vs 'exams')
  const [mode, setMode] = useState<'units' | 'exams'>(() => initialMode || 'units');

  // Units mode state
  const [selectedGrade, setSelectedGrade] = useState<SchoolGrade>(() =>
    getDefaultGradeFromProfile(profile)
  );
  const gradeUnits = useMemo(() => getUnitsByGrade(selectedGrade), [selectedGrade]);
  const gradeReviews = useMemo(() => getReviewsByGrade(selectedGrade), [selectedGrade]);
  const [selectedUnitId, setSelectedUnitId] = useState<string>(
    () => getUnitsByGrade(getDefaultGradeFromProfile(profile))[0]?.id || SCHOOL_UNITS[0].id
  );
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [unitSectionFilter, setUnitSectionFilter] = useState<'all' | 'vocab' | 'grammar' | 'quiz' | 'exercises'>(
    'all'
  );
  const [semesterFilter, setSemesterFilter] = useState<'all' | 'hk1' | 'hk2'>('all');
  const [savedWordKeys, setSavedWordKeys] = useState<Record<string, boolean>>({});

  // Unit Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [completedUnitIds, setCompletedUnitIds] = useState<string[]>([]);

  // Exams mode state
  const [selectedExamId, setSelectedExamId] = useState<SchoolExamId>(() =>
    getDefaultExamFromProfile(profile)
  );
  const [selectedExamSetIdx, setSelectedExamSetIdx] = useState<number>(0);
  const availableExamSets = SCHOOL_EXAM_SETS[selectedExamId] || [SCHOOL_EXAMS[selectedExamId]];
  const activeExam = availableExamSets[selectedExamSetIdx] || availableExamSets[0];
  const [examAnswers, setExamAnswers] = useState<Record<string, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examRewarded, setExamRewarded] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(
    () => SCHOOL_EXAMS[getDefaultExamFromProfile(profile)].durationMinutes * 60
  );
  const [timerRunning, setTimerRunning] = useState<boolean>(true);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong'>('all');

  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Sync initialMode when prop changes
  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    }
  }, [initialMode]);

  // Sync default grade from profile?.teen?.grade
  useEffect(() => {
    if (profile?.teen?.grade && profile.teen.grade >= 6 && profile.teen.grade <= 12) {
      setSelectedGrade(profile.teen.grade);
    }
  }, [profile?.teen?.grade]);

  // Sync default exam set when profile teen goal/grade updates (only if user hasn't answered yet)
  useEffect(() => {
    if (Object.keys(examAnswers).length === 0 && !examSubmitted) {
      const nextExam = getDefaultExamFromProfile(profile);
      setSelectedExamId(nextExam);
      setSecondsLeft(SCHOOL_EXAMS[nextExam].durationMinutes * 60);
    }
  }, [profile?.teen?.goal, profile?.teen?.grade]);

  // Keep selectedUnitId valid for selectedGrade
  useEffect(() => {
    if (!gradeUnits.some((u) => u.id === selectedUnitId) && gradeUnits[0]) {
      setSelectedUnitId(gradeUnits[0].id);
      setQuizAnswers({});
      setQuizSubmitted(false);
    }
  }, [gradeUnits, selectedUnitId]);

  const activeUnit = useMemo(
    () => gradeUnits.find((u) => u.id === selectedUnitId) || gradeUnits[0] || SCHOOL_UNITS[0],
    [gradeUnits, selectedUnitId]
  );

  const filteredGradeUnits = useMemo(() => {
    const splitPoint = selectedGrade <= 9 ? 6 : 5;
    return gradeUnits.filter((u) => {
      if (semesterFilter === 'hk1') return u.unitNumber <= splitPoint;
      if (semesterFilter === 'hk2') return u.unitNumber > splitPoint;
      return true;
    });
  }, [gradeUnits, selectedGrade, semesterFilter]);

  const teenUnitsRef = useRef<HTMLDivElement | null>(null);
  const teenVocabRef = useRef<HTMLDivElement | null>(null);
  const teenExamsRef = useRef<HTMLDivElement | null>(null);

  const unitPagination = usePagination(filteredGradeUnits, 8, {
    resetKey: `${selectedGrade}:${semesterFilter}`,
  });
  const unitVocabPagination = usePagination(activeUnit.vocabulary, 8, {
    resetKey: activeUnit.id,
  });
  const examSetPagination = usePagination(availableExamSets, 6, {
    resetKey: selectedExamId,
    activeIndex: selectedExamSetIdx,
  });

  const activeGradeMeta = useMemo(
    () => SCHOOL_GRADES.find((g) => g.grade === selectedGrade) || SCHOOL_GRADES[0],
    [selectedGrade]
  );

  // Exam countdown timer effect
  useEffect(() => {
    if (mode !== 'exams' || examSubmitted || !timerRunning) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [mode, examSubmitted, timerRunning]);

  // Auto-submit exam when countdown reaches 0
  useEffect(() => {
    if (mode === 'exams' && secondsLeft === 0 && !examSubmitted) {
      handleSubmitExam();
    }
  }, [secondsLeft, mode, examSubmitted]);

  const handleSelectGrade = (grade: SchoolGrade) => {
    setSelectedGrade(grade);
    setSelectedReviewId(null);
    const firstUnit = getUnitsByGrade(grade)[0];
    if (firstUnit) {
      setSelectedUnitId(firstUnit.id);
    }
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleSelectUnit = (unitId: string) => {
    setSelectedReviewId(null);
    setSelectedUnitId(unitId);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleSaveVocabWord = (item: TeenVocabItem) => {
    const entry = buildTeenWordEntry(item, activeUnit);
    onSaveWord?.(entry);
    setSavedWordKeys((prev) => ({
      ...prev,
      [`${activeUnit.id}::${item.word.toLowerCase()}`]: true,
    }));
  };

  const handleSaveAllUnitWords = () => {
    if (!onSaveWord) return;
    const updates: Record<string, boolean> = {};
    activeUnit.vocabulary.forEach((item) => {
      const key = `${activeUnit.id}::${item.word.toLowerCase()}`;
      if (!savedWordKeys[key]) {
        onSaveWord(buildTeenWordEntry(item, activeUnit));
      }
      updates[key] = true;
    });
    setSavedWordKeys((prev) => ({ ...prev, ...updates }));
  };

  // Unit Quiz evaluation
  const unitQuizCorrectCount = useMemo(() => {
    return activeUnit.practiceQuiz.reduce(
      (acc, q) => (quizAnswers[q.id] === q.correctIndex ? acc + 1 : acc),
      0
    );
  }, [activeUnit, quizAnswers]);

  const handleSubmitUnitQuiz = () => {
    setQuizSubmitted(true);
    const total = activeUnit.practiceQuiz.length;
    const passed = total > 0 && unitQuizCorrectCount / total >= 0.5;
    if (!completedUnitIds.includes(activeUnit.id) && passed) {
      setCompletedUnitIds((prev) => [...prev, activeUnit.id]);
      const earned = unitQuizCorrectCount === total ? 30 : 20;
      onAddXp(earned);
    }
    if (total > 0 && unitQuizCorrectCount / total >= 0.75) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.65 } });
    }
  };

  const handleResetUnitQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  // Exam Handlers
  const handleSwitchExam = (examId: SchoolExamId) => {
    setSelectedExamId(examId);
    setSelectedExamSetIdx(0);
    const nextSet = SCHOOL_EXAM_SETS[examId]?.[0] || SCHOOL_EXAMS[examId];
    setExamAnswers({});
    setExamSubmitted(false);
    setExamRewarded(false);
    setReviewFilter('all');
    setSecondsLeft(nextSet.durationMinutes * 60);
    setTimerRunning(true);
  };

  const handleSelectExamSet = (idx: number) => {
    const sets = SCHOOL_EXAM_SETS[selectedExamId] || [SCHOOL_EXAMS[selectedExamId]];
    const target = sets[idx] || sets[0];
    setSelectedExamSetIdx(idx);
    setExamAnswers({});
    setExamSubmitted(false);
    setExamRewarded(false);
    setReviewFilter('all');
    setSecondsLeft(target.durationMinutes * 60);
    setTimerRunning(true);
  };

  const handleSubmitExam = () => {
    if (examSubmitted) return;
    setExamSubmitted(true);
    setTimerRunning(false);

    const total = activeExam.questions.length;
    const correct = activeExam.questions.reduce(
      (acc, q) => (examAnswers[q.id] === q.correctIndex ? acc + 1 : acc),
      0
    );
    const score10 = total > 0 ? (correct / total) * 10 : 0;

    if (!examRewarded) {
      setExamRewarded(true);
      const xpGain = score10 >= 8 ? 60 : score10 >= 5 ? 35 : 15;
      onAddXp(xpGain);
    }

    if (score10 >= 8) {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleResetExam = () => {
    setExamAnswers({});
    setExamSubmitted(false);
    setExamRewarded(false);
    setReviewFilter('all');
    setSecondsLeft(activeExam.durationMinutes * 60);
    setTimerRunning(true);
  };

  // Exam Analytics
  const examStats = useMemo(() => {
    const total = activeExam.questions.length;
    const answeredCount = activeExam.questions.filter((q) => examAnswers[q.id] !== undefined).length;
    const correctCount = activeExam.questions.reduce(
      (acc, q) => (examAnswers[q.id] === q.correctIndex ? acc + 1 : acc),
      0
    );
    const score10 = total > 0 ? (correctCount / total) * 10 : 0;

    const sectionMap = new Map<string, { correct: number; total: number }>();
    activeExam.questions.forEach((q) => {
      const cur = sectionMap.get(q.section) || { correct: 0, total: 0 };
      cur.total += 1;
      if (examAnswers[q.id] === q.correctIndex) cur.correct += 1;
      sectionMap.set(q.section, cur);
    });

    const breakdowns: SectionBreakdown[] = Array.from(sectionMap.entries()).map(
      ([section, stats]) => ({
        section,
        correct: stats.correct,
        total: stats.total,
        percent: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
      })
    );

    const weakSections = breakdowns.filter((b) => b.percent < 60);
    const timeSpentSeconds = Math.max(0, activeExam.durationMinutes * 60 - secondsLeft);

    return {
      total,
      answeredCount,
      correctCount,
      score10,
      breakdowns,
      weakSections,
      timeSpentSeconds,
    };
  }, [activeExam, examAnswers, secondsLeft]);

  const thcsGrades = SCHOOL_GRADES.filter((g) => g.stage === 'THCS');
  const thptGrades = SCHOOL_GRADES.filter((g) => g.stage === 'THPT');

  const allUnitWordsSaved = activeUnit.vocabulary.every(
    (item) => savedWordKeys[`${activeUnit.id}::${item.word.toLowerCase()}`]
  );

  const visibleExamQuestions = useMemo(() => {
    if (!examSubmitted || reviewFilter === 'all') return activeExam.questions;
    return activeExam.questions.filter((q) => examAnswers[q.id] !== q.correctIndex);
  }, [activeExam.questions, examSubmitted, reviewFilter, examAnswers]);

  return (
    <div className="space-y-6">
      {/* Top Hero Banner + 2 Major Mode Switcher */}
      <div className="rounded-3xl bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 text-white p-5 sm:p-7 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-extrabold tracking-wide">
              <GraduationCap className="w-4 h-4" />
              <span>CHƯƠNG TRÌNH THCS & THPT • SGK GLOBAL SUCCESS (CT GDPT 2018)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              Học Tiếng Anh Lớp 6–12 & Luyện Đề Chuyển Cấp
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 max-w-2xl">
              Từ vựng trọng tâm theo từng Unit, Ngữ pháp kèm mẹo tránh bẫy đề thi và Ngân hàng đề chuẩn hóa
              Thi vào 10 &amp; Tốt nghiệp THPT chấm điểm thang 10.
            </p>
          </div>

          {profile?.teen && (
            <div className="flex flex-wrap items-center gap-2 bg-white/15 backdrop-blur-sm px-3.5 py-2.5 rounded-2xl border border-white/20 text-xs font-bold shrink-0">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>
                Hồ sơ của bạn: <strong>Lớp {profile.teen.grade}</strong> • Mục tiêu:{' '}
                <strong>
                  {profile.teen.goal === 'entrance10'
                    ? 'Thi vào lớp 10'
                    : profile.teen.goal === 'thpt'
                    ? 'Thi Tốt nghiệp THPT'
                    : profile.teen.goal === 'communication'
                    ? 'Giao tiếp học đường'
                    : 'Bám sát SGK trên lớp'}
                </strong>
              </span>
            </div>
          )}
        </div>

        {/* 2 Primary Sections Switcher */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setMode('units')}
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border text-left transition ${
              mode === 'units'
                ? 'bg-white text-sky-700 border-white shadow-md'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  mode === 'units' ? 'bg-sky-100 text-sky-600' : 'bg-white/15 text-white'
                }`}
              >
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-extrabold text-sm truncate">📚 Bài Học Theo Lớp 6–12</div>
                <div
                  className={`text-[11px] truncate ${
                    mode === 'units' ? 'text-slate-500' : 'text-sky-100'
                  }`}
                >
                  35 Unit (Global Success) • Từ vựng SRS, Ngữ pháp &amp; Quiz
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 shrink-0 opacity-75" />
          </button>

          <button
            type="button"
            onClick={() => setMode('exams')}
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border text-left transition ${
              mode === 'exams'
                ? 'bg-white text-indigo-700 border-white shadow-md'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  mode === 'exams' ? 'bg-indigo-100 text-indigo-600' : 'bg-white/15 text-white'
                }`}
              >
                <Target className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-extrabold text-sm truncate">
                  🎯 Luyện Đề Thi Vào 10 &amp; Tốt Nghiệp THPT
                </div>
                <div
                  className={`text-[11px] truncate ${
                    mode === 'exams' ? 'text-slate-500' : 'text-sky-100'
                  }`}
                >
                  Bấm giờ làm bài • Thang điểm 10 • Phân tích từng chuyên đề
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 shrink-0 opacity-75" />
          </button>
        </div>
      </div>

      {/* ==================== MODE 1: UNITS (LỚP 6–12) ==================== */}
      {mode === 'units' && (
        <div className="space-y-6">
          {/* Grade Picker (Admin sees all 6-12; student sees ONLY their registered grade) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-4">
            {allowAllOptions ? (
              <>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                      1. Chọn Khối Lớp (THCS &amp; THPT)
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Mỗi khối lớp gồm 5 Unit tiêu biểu bám sát SGK Global Success
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300 w-fit">
                    <CheckCheck className="w-3.5 h-3.5" />
                    Đã hoàn thành {completedUnitIds.length} / {SCHOOL_UNITS.length} Unit Quiz
                  </span>
                </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {/* THCS Block */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700 dark:text-sky-400 mb-2">
                  Bậc THCS (Lớp 6 – 9)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {thcsGrades.map((g) => {
                    const isSelected = selectedGrade === g.grade;
                    const isUserGrade = profile?.teen?.grade === g.grade;
                    return (
                      <button
                        type="button"
                        key={g.grade}
                        onClick={() => handleSelectGrade(g.grade)}
                        className={`relative px-3 py-2.5 rounded-xl border text-center transition ${
                          isSelected
                            ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-sky-400'
                        }`}
                      >
                        <div className="text-sm font-black">{g.label}</div>
                        <div
                          className={`text-[10px] font-semibold ${
                            isSelected ? 'text-sky-100' : 'text-slate-400'
                          }`}
                        >
                          {g.cefrRange}
                        </div>
                        {isUserGrade && (
                          <span
                            className={`mt-1 inline-block px-1.5 py-0.5 rounded text-[9px] font-extrabold ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300'
                            }`}
                          >
                            Lớp của bạn
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* THPT Block */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 mb-2">
                  Bậc THPT (Lớp 10 – 12)
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {thptGrades.map((g) => {
                    const isSelected = selectedGrade === g.grade;
                    const isUserGrade = profile?.teen?.grade === g.grade;
                    return (
                      <button
                        type="button"
                        key={g.grade}
                        onClick={() => handleSelectGrade(g.grade)}
                        className={`relative px-3 py-2.5 rounded-xl border text-center transition ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                        }`}
                      >
                        <div className="text-sm font-black">{g.label}</div>
                        <div
                          className={`text-[10px] font-semibold ${
                            isSelected ? 'text-indigo-100' : 'text-slate-400'
                          }`}
                        >
                          {g.cefrRange}
                        </div>
                        {isUserGrade && (
                          <span
                            className={`mt-1 inline-block px-1.5 py-0.5 rounded text-[9px] font-extrabold ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300'
                            }`}
                          >
                            Lớp của bạn
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Grade Info Strip */}
            <div className="p-3 rounded-xl bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/70 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="text-sky-900 dark:text-sky-200">
                <strong className="font-extrabold">
                  {activeGradeMeta.bookTitle} ({activeGradeMeta.label}):
                </strong>{' '}
                {activeGradeMeta.focusVi}
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 font-bold text-sky-700 dark:text-sky-300">
                Trình độ {activeGradeMeta.cefrRange}
              </span>
            </div>
              </>
            ) : (
              <div className="p-3.5 rounded-xl bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <div className="text-[11px] font-extrabold uppercase text-sky-600 dark:text-sky-400">
                    Chương trình theo hồ sơ đăng ký: {activeGradeMeta.label}
                  </div>
                  <div className="text-sm font-black text-sky-900 dark:text-sky-100 mt-0.5">
                    {activeGradeMeta.bookTitle} — {activeGradeMeta.focusVi}
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 font-extrabold text-sky-700 dark:text-sky-300">
                  Trình độ {activeGradeMeta.cefrRange}
                </span>
              </div>
            )}

            {/* Unit Selector Tabs */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                  2. Chọn Unit bài học trong {activeGradeMeta.label} ({gradeUnits.length} Unit):
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg gap-1">
                  {[
                    { id: 'all' as const, label: 'Cả năm' },
                    { id: 'hk1' as const, label: 'Học kỳ 1' },
                    { id: 'hk2' as const, label: 'Học kỳ 2' },
                  ].map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setSemesterFilter(s.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition ${
                        semesterFilter === s.id
                          ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-sm'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <div ref={teenUnitsRef} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {unitPagination.pageItems.map((unit) => {
                    const isActive = unit.id === activeUnit.id;
                    const isDone = completedUnitIds.includes(unit.id);
                  return (
                    <button
                      type="button"
                      key={unit.id}
                      onClick={() => handleSelectUnit(unit.id)}
                      className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 ${
                        isActive
                          ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 ring-2 ring-sky-500/20'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                            isActive
                              ? 'bg-sky-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          Unit {unit.unitNumber}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-bold text-slate-400">{unit.level}</span>
                          {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                        </div>
                      </div>
                      <div>
                        <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                          {unit.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {unit.titleVi}
                        </div>
                      </div>
                    </button>
                  );
                })}
                </div>

                <PaginationBar
                  page={unitPagination.page}
                  totalPages={unitPagination.totalPages}
                  totalItems={unitPagination.totalItems}
                  startIdx={unitPagination.startIdx}
                  endIdx={unitPagination.endIdx}
                  onPageChange={unitPagination.setPage}
                  itemLabel="Unit"
                  scrollTargetRef={teenUnitsRef}
                />
              </div>

              {gradeReviews.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-extrabold text-indigo-700 dark:text-indigo-300 mb-2">
                    Ôn tập định kỳ {activeGradeMeta.label} (30 câu tổng hợp/bài):
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {gradeReviews.map((rev) => {
                      const isRevActive = selectedReviewId === rev.id;
                      return (
                        <button
                          type="button"
                          key={rev.id}
                          onClick={() => setSelectedReviewId(isRevActive ? null : rev.id)}
                          className={`p-2.5 rounded-xl border text-left transition ${
                            isRevActive
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                              : 'bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 hover:border-indigo-400'
                          }`}
                        >
                          <div className="text-xs font-extrabold">{rev.title}</div>
                          <div className={`text-[11px] ${isRevActive ? 'text-indigo-100' : 'text-indigo-600 dark:text-indigo-400'}`}>
                            {rev.unitRange} • {rev.exercises.length} câu
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {selectedReviewId ? (
            (() => {
              const activeReview = gradeReviews.find((r) => r.id === selectedReviewId);
              if (!activeReview) return null;
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4">
                    <div>
                      <div className="text-xs font-extrabold uppercase text-indigo-600 dark:text-indigo-400">
                        {activeGradeMeta.label} • {activeReview.unitRange}
                      </div>
                      <h2 className="text-lg font-black text-slate-900 dark:text-white">
                        {activeReview.title}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedReviewId(null)}
                      className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-50"
                    >
                      ← Quay lại Unit
                    </button>
                  </div>
                  <ExerciseRunner
                    key={activeReview.id}
                    exercises={activeReview.exercises}
                    accent={accent}
                    title={`${activeReview.title} (${activeReview.unitRange})`}
                    subtitle="30 bài tập tổng hợp nhiều dạng ôn kiến thức cụm Unit."
                    onComplete={(correct, total) => {
                      if (correct >= Math.ceil(total * 0.6)) onAddXp(40);
                    }}
                  />
                </div>
              );
            })()
          ) : (
          /* Active Unit Detail Panel */
          <div className="space-y-6">
            {/* Unit Overview + Objectives + Section Filter */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-sky-600 text-white text-xs font-extrabold">
                      Lớp {activeUnit.grade} • Unit {activeUnit.unitNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
                      CEFR {activeUnit.level}
                    </span>
                    {completedUnitIds.includes(activeUnit.id) && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã vượt qua Quiz
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mt-2">
                    {activeUnit.title} — {activeUnit.titleVi}
                  </h2>
                </div>

                {/* Quick Filter inside Unit */}
                <div className="flex flex-wrap bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1 w-fit">
                  {[
                    { id: 'all' as const, label: 'Tất cả' },
                    { id: 'vocab' as const, label: `Từ vựng (${activeUnit.vocabulary.length})` },
                    { id: 'grammar' as const, label: 'Ngữ pháp & Bẫy' },
                    { id: 'quiz' as const, label: `Quiz (${activeUnit.practiceQuiz.length})` },
                    { id: 'exercises' as const, label: `📝 Bài tập (${activeUnit.exercises?.length || 0})` },
                  ].map((tab) => (
                    <button
                      type="button"
                      key={tab.id}
                      onClick={() => setUnitSectionFilter(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        unitSectionFilter === tab.id
                          ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Objectives */}
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200/70 dark:border-slate-700/60">
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-sky-600" />
                  Mục tiêu bài học (Learning Objectives)
                </div>
                <ul className="space-y-1.5">
                  {activeUnit.objectives.map((obj, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section A: Vocabulary */}
            {(unitSectionFilter === 'all' || unitSectionFilter === 'vocab') && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-sky-600" />
                      <span>Từ Vựng Trọng Tâm Unit {activeUnit.unitNumber}</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Nghe phát âm chuẩn ({accent === 'en-US' ? 'Anh-Mỹ' : 'Anh-Anh'}) và lưu vào sổ từ SRS để ôn tập ngắt quãng.
                    </p>
                  </div>

                  {onSaveWord && (
                    <button
                      type="button"
                      onClick={handleSaveAllUnitWords}
                      disabled={allUnitWordsSaved}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                        allUnitWordsSaved
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm'
                      }`}
                    >
                      {allUnitWordsSaved ? (
                        <>
                          <BookmarkCheck className="w-4 h-4" />
                          <span>Đã lưu cả Unit vào SRS</span>
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="w-4 h-4" />
                          <span>+ Lưu tất cả từ Unit vào SRS</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div ref={teenVocabRef} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {unitVocabPagination.pageItems.map((item) => {
                    const key = `${activeUnit.id}::${item.word.toLowerCase()}`;
                    const isSaved = Boolean(savedWordKeys[key]);
                    return (
                      <div
                        key={item.word}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4 flex flex-col justify-between gap-3 hover:border-sky-300 dark:hover:border-sky-700 transition"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-lg font-black text-slate-900 dark:text-white">
                                  {item.word}
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-[11px] font-bold">
                                  {item.pos}
                                </span>
                              </div>
                              <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">
                                {item.ipa}
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => speakText(item.word, accent, 0.95)}
                                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/50 transition"
                                title="Nghe phát âm chuẩn"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => speakText(item.word, accent, 0.65)}
                                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition"
                                title="Nghe chậm 0.65x"
                              >
                                <Turtle className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                            {item.meaningVi}
                          </div>

                          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/70 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                                “{item.exampleEn}”
                              </p>
                              <button
                                type="button"
                                onClick={() => speakText(item.exampleEn, accent, 0.95)}
                                className="p-1 rounded-lg text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 shrink-0"
                                title="Nghe câu ví dụ"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              → {item.exampleVi}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleSaveVocabWord(item)}
                            disabled={!onSaveWord || isSaved}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                              isSaved
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                : 'bg-white dark:bg-slate-900 border border-sky-300 dark:border-sky-700 text-sky-700 dark:text-sky-300 hover:bg-sky-600 hover:text-white hover:border-sky-600 disabled:opacity-50'
                            }`}
                          >
                            {isSaved ? (
                              <>
                                <BookmarkCheck className="w-3.5 h-3.5" />
                                <span>Đã lưu sổ từ SRS</span>
                              </>
                            ) : (
                              <>
                                <BookmarkPlus className="w-3.5 h-3.5" />
                                <span>+ Lưu sổ từ SRS</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  </div>

                  <PaginationBar
                    page={unitVocabPagination.page}
                    totalPages={unitVocabPagination.totalPages}
                    totalItems={unitVocabPagination.totalItems}
                    startIdx={unitVocabPagination.startIdx}
                    endIdx={unitVocabPagination.endIdx}
                    onPageChange={unitVocabPagination.setPage}
                    itemLabel="từ vựng"
                    scrollTargetRef={teenVocabRef}
                  />
                </div>
              </div>
            )}

            {/* Section B: Grammar & Exam Trap */}
            {(unitSectionFilter === 'all' || unitSectionFilter === 'grammar') && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Ngữ Pháp Trọng Tâm
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {activeUnit.grammar.title}
                  </h3>
                </div>

                {/* Formula */}
                <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-1">
                    Công thức cốt lõi
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-indigo-950 dark:text-indigo-100 break-words">
                    {activeUnit.grammar.formula}
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeUnit.grammar.explanationVi}
                </p>

                {/* Examples */}
                <div className="space-y-2">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Ví dụ minh họa (Bấm loa để nghe)
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {activeUnit.grammar.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">
                            {ex.en}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">→ {ex.vi}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => speakText(ex.en, accent, 0.95)}
                          className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sky-600 hover:bg-sky-50 shrink-0"
                          title="Nghe câu ví dụ"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exam Trap Callout */}
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700/80 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                      ⚠️ Lưu ý bẫy hay ra trong đề kiểm tra &amp; đề thi
                    </div>
                    <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed font-medium">
                      {activeUnit.grammar.examTrap}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Section C: Unit Practice Quiz */}
            {(unitSectionFilter === 'all' || unitSectionFilter === 'quiz') && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-emerald-600" />
                      <span>Quiz Kiểm Tra Nhanh Unit {activeUnit.unitNumber}</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Hoàn thành đạt từ 50% trở lên để nhận thưởng +20 đến +30 XP!
                    </p>
                  </div>

                  {quizSubmitted && (
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${
                          unitQuizCorrectCount >= Math.ceil(activeUnit.practiceQuiz.length / 2)
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300'
                        }`}
                      >
                        Đúng {unitQuizCorrectCount} / {activeUnit.practiceQuiz.length} câu
                      </span>
                      <button
                        type="button"
                        onClick={handleResetUnitQuiz}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Làm lại
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {activeUnit.practiceQuiz.map((q, qIdx) => {
                    const chosen = quizAnswers[q.id];
                    const isCorrect = chosen === q.correctIndex;
                    return (
                      <div
                        key={q.id}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-3"
                      >
                        <div className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                          <span className="text-sky-600 dark:text-sky-400 mr-1.5">
                            Câu {qIdx + 1}.
                          </span>
                          {renderFormattedText(q.question)}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, optIdx) => {
                            const letter = String.fromCharCode(65 + optIdx);
                            const isSelected = chosen === optIdx;
                            const isRightOpt = q.correctIndex === optIdx;

                            let btnStyle =
                              'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-sky-400';

                            if (!quizSubmitted && isSelected) {
                              btnStyle =
                                'bg-sky-50 dark:bg-sky-950/50 border-sky-600 text-sky-800 dark:text-sky-200 ring-2 ring-sky-500/20';
                            } else if (quizSubmitted) {
                              if (isRightOpt) {
                                btnStyle =
                                  'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-200';
                              } else if (isSelected && !isRightOpt) {
                                btnStyle =
                                  'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-200';
                              } else {
                                btnStyle =
                                  'bg-white/60 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-400';
                              }
                            }

                            return (
                              <button
                                type="button"
                                key={optIdx}
                                disabled={quizSubmitted}
                                onClick={() =>
                                  setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                                }
                                className={`px-3.5 py-2.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between gap-2 ${btnStyle}`}
                              >
                                <span>
                                  <strong className="mr-1.5">{letter}.</strong>
                                  {renderFormattedText(opt)}
                                </span>
                                {quizSubmitted && isRightOpt && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                                {quizSubmitted && isSelected && !isRightOpt && (
                                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div
                            className={`p-3 rounded-xl text-xs leading-relaxed border ${
                              isCorrect
                                ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                                : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                            }`}
                          >
                            <strong>Giải thích: </strong>
                            {q.explanationVi}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {!quizSubmitted && (
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <span className="text-xs text-slate-500">
                      Đã chọn{' '}
                      <strong>
                        {activeUnit.practiceQuiz.filter((q) => quizAnswers[q.id] !== undefined).length}
                      </strong>{' '}
                      / {activeUnit.practiceQuiz.length} câu
                    </span>
                    <button
                      type="button"
                      onClick={handleSubmitUnitQuiz}
                      disabled={
                        activeUnit.practiceQuiz.filter((q) => quizAnswers[q.id] !== undefined)
                          .length < activeUnit.practiceQuiz.length
                      }
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs sm:text-sm font-extrabold shadow-sm transition"
                    >
                      Kiểm tra đáp án Quiz
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Section D: Full 25-Exercise Practice Pack */}
            {(unitSectionFilter === 'all' || unitSectionFilter === 'exercises') &&
              activeUnit.exercises &&
              activeUnit.exercises.length > 0 && (
                <ExerciseRunner
                  key={activeUnit.id}
                  exercises={activeUnit.exercises}
                  accent={accent}
                  title={`Bài Tập Thực Hành Unit ${activeUnit.unitNumber}: ${activeUnit.title}`}
                  subtitle="25 câu đa dạng: Ngữ âm, Trọng âm, Từ vựng, Ngữ pháp, Tìm lỗi sai, Sắp xếp câu, Nối cặp & Đọc hiểu."
                  onComplete={(correct, total) => {
                    if (correct >= Math.ceil(total * 0.6)) {
                      onAddXp(35);
                    }
                  }}
                />
              )}
          </div>
          )}
        </div>
      )}

      {/* ==================== MODE 2: EXAMS (THI VÀO 10 & THPT) ==================== */}
      {mode === 'exams' && (
        <div className="space-y-6">
          {/* Exam Selector (Admin sees both; student sees ONLY the exam matching their grade/goal) */}
          <div className={`grid grid-cols-1 ${allowAllOptions ? 'md:grid-cols-2' : ''} gap-4`}>
            {(allowAllOptions
              ? (['entrance10', 'thpt'] as const)
              : [getDefaultExamFromProfile(profile)]
            ).map((examId) => {
              const exam = SCHOOL_EXAMS[examId];
              const isSelected = selectedExamId === examId;
              return (
                <button
                  type="button"
                  key={examId}
                  onClick={() => handleSwitchExam(examId)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition space-y-2 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {exam.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      {exam.durationMinutes} phút • {exam.questions.length} câu
                    </span>
                  </div>
                  <div className="text-base font-black text-slate-900 dark:text-white">
                    {exam.title}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {exam.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Exam Set Picker (6 đề/trang) */}
          {availableExamSets.length > 1 && (
            <div ref={teenExamsRef} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
              <div className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Chọn bộ đề luyện tập ({availableExamSets.length} đề có sẵn):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {examSetPagination.pageItems.map((set, localIdx) => {
                  const idx = examSetPagination.startIdx + localIdx;
                  const isCurrent = idx === selectedExamSetIdx;
                  return (
                    <button
                      type="button"
                      key={set.setKey || idx}
                      onClick={() => handleSelectExamSet(idx)}
                      className={`px-3 py-2 rounded-xl border text-left transition ${
                        isCurrent
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400'
                      }`}
                    >
                      <div className="text-xs font-extrabold">Đề số {idx + 1}</div>
                      <div className={`text-[10px] truncate ${isCurrent ? 'text-indigo-100' : 'text-slate-500'}`}>
                        {set.questions.length} câu • {set.durationMinutes}p
                      </div>
                    </button>
                  );
                })}
              </div>

              <PaginationBar
                page={examSetPagination.page}
                totalPages={examSetPagination.totalPages}
                totalItems={examSetPagination.totalItems}
                startIdx={examSetPagination.startIdx}
                endIdx={examSetPagination.endIdx}
                onPageChange={examSetPagination.setPage}
                itemLabel="đề thi"
                scrollTargetRef={teenExamsRef}
              />
            </div>
          )}

          {/* Sticky Timer & Exam Toolbar */}
          <div className="sticky top-16 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-black tabular-nums ${
                  examSubmitted
                    ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    : secondsLeft <= 60
                    ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 animate-pulse'
                    : secondsLeft <= 300
                    ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                    : 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{formatClock(secondsLeft)}</span>
              </div>

              {!examSubmitted && (
                <button
                  type="button"
                  onClick={() => setTimerRunning((r) => !r)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50"
                >
                  {timerRunning ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Tạm dừng
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Tiếp tục
                    </>
                  )}
                </button>
              )}

              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Đã trả lời:{' '}
                <strong className="text-indigo-600 dark:text-indigo-400">
                  {examStats.answeredCount}
                </strong>{' '}
                / {examStats.total} câu
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetExam}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Làm lại đề
              </button>
              {!examSubmitted && (
                <button
                  type="button"
                  onClick={handleSubmitExam}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-extrabold shadow-sm transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Nộp bài &amp; Chấm điểm</span>
                </button>
              )}
            </div>
          </div>

          {/* Exam Results & Section Analytics (Visible after submission) */}
          {examSubmitted && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-indigo-200 dark:border-indigo-800 p-5 sm:p-6 space-y-5 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 border-2 ${
                      examStats.score10 >= 8
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-700 dark:text-emerald-300'
                        : examStats.score10 >= 5
                        ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-400 text-sky-700 dark:text-sky-300'
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-700 dark:text-rose-300'
                    }`}
                  >
                    <span className="text-2xl font-black leading-none">
                      {examStats.score10.toFixed(1)}
                    </span>
                    <span className="text-[10px] font-bold mt-1">/ 10 điểm</span>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      <Award className="w-4 h-4" /> Kết Quả Bài Thi ({activeExam.badge})
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      Đúng {examStats.correctCount} / {examStats.total} câu (
                      {Math.round((examStats.correctCount / examStats.total) * 100)}%)
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Thời gian làm bài: <strong>{formatClock(examStats.timeSpentSeconds)}</strong> •{' '}
                      Xếp loại:{' '}
                      <strong className="text-slate-800 dark:text-slate-200">
                        {examStats.score10 >= 8.5
                          ? 'Xuất sắc'
                          : examStats.score10 >= 7
                          ? 'Khá / Giỏi'
                          : examStats.score10 >= 5
                          ? 'Đạt trung bình'
                          : 'Cần củng cố nền tảng'}
                      </strong>
                    </p>
                  </div>
                </div>

                {examStats.weakSections.length > 0 ? (
                  <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 max-w-sm">
                    <div className="text-xs font-extrabold text-amber-800 dark:text-amber-300 mb-1">
                      📌 Chuyên đề cần ưu tiên ôn lại:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {examStats.weakSections.map((w) => (
                        <span
                          key={w.section}
                          className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-[11px] font-bold text-amber-900 dark:text-amber-200"
                        >
                          {w.section} ({w.correct}/{w.total})
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    🎉 Tuyệt vời! Bạn đạt từ 60% trở lên ở tất cả các chuyên đề!
                  </div>
                )}
              </div>

              {/* Section-by-Section Analytics Bars */}
              <div className="space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                  <span>Phân Tích Kết Quả Theo Từng Chuyên Đề</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {examStats.breakdowns.map((b) => (
                    <div
                      key={b.section}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-100 truncate">
                          {b.section}
                        </span>
                        <span className="font-black text-slate-700 dark:text-slate-200 shrink-0">
                          {b.correct}/{b.total} ({b.percent}%)
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            b.percent >= 80
                              ? 'bg-emerald-500'
                              : b.percent >= 50
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${b.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Question Navigator Grid */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                Bảng điều hướng câu hỏi ({activeExam.questions.length} câu)
              </span>
              {examSubmitted && (
                <div className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setReviewFilter('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      reviewFilter === 'all'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Tất cả ({activeExam.questions.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewFilter('wrong')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      reviewFilter === 'wrong'
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Câu làm sai / bỏ trống ({examStats.total - examStats.correctCount})
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {activeExam.questions.map((q, idx) => {
                const chosen = examAnswers[q.id];
                const isAnswered = chosen !== undefined;
                const isRight = chosen === q.correctIndex;

                let pillClass =
                  'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';

                if (!examSubmitted && isAnswered) {
                  pillClass = 'bg-sky-600 text-white border-sky-600';
                } else if (examSubmitted) {
                  pillClass = isRight
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-rose-600 text-white border-rose-600';
                }

                return (
                  <button
                    type="button"
                    key={q.id}
                    onClick={() => {
                      if (examSubmitted && reviewFilter === 'wrong' && isRight) {
                        setReviewFilter('all');
                      }
                      window.setTimeout(() => {
                        questionRefs.current[q.id]?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        });
                      }, 30);
                    }}
                    className={`w-8 h-8 rounded-lg border text-xs font-extrabold transition hover:opacity-90 ${pillClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Exam Questions List */}
          <div className="space-y-4">
            {visibleExamQuestions.length === 0 ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 text-center text-emerald-800 dark:text-emerald-200 font-bold text-sm">
                🎉 Không có câu sai nào! Bạn đã trả lời chính xác 100% các câu hỏi trong đề.
              </div>
            ) : (
              visibleExamQuestions.map((q) => {
                const realIdx = activeExam.questions.findIndex((item) => item.id === q.id);
                const prevQuestion = realIdx > 0 ? activeExam.questions[realIdx - 1] : null;
                const showPassageBox =
                  Boolean(q.passage) &&
                  (reviewFilter === 'wrong'
                    ? true
                    : !prevQuestion || prevQuestion.passageTitle !== q.passageTitle);

                const chosen = examAnswers[q.id];
                const isCorrect = chosen === q.correctIndex;

                return (
                  <React.Fragment key={q.id}>
                    {showPassageBox && q.passage && (
                      <div className="rounded-2xl bg-sky-50/70 dark:bg-sky-950/25 border border-sky-200 dark:border-sky-800/80 p-5 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-sky-800 dark:text-sky-300">
                            <FileText className="w-4 h-4" />
                            <span>
                              Đoạn văn đọc hiểu: {q.passageTitle || q.section}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => speakText(q.passage || '', accent, 0.95)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-700 text-xs font-bold text-sky-700 dark:text-sky-300 hover:bg-sky-50"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> Nghe đoạn văn
                          </button>
                        </div>
                        <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line font-medium">
                          {q.passage}
                        </div>
                      </div>
                    )}

                    <div
                      ref={(el) => {
                        questionRefs.current[q.id] = el;
                      }}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-3.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-[11px] font-extrabold border border-indigo-200/80 dark:border-indigo-800">
                          Câu {realIdx + 1} • {q.section}
                        </span>
                        {examSubmitted && (
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-extrabold ${
                              isCorrect
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" /> Chính xác
                              </>
                            ) : chosen === undefined ? (
                              <>
                                <XCircle className="w-4 h-4" /> Chưa chọn đáp án
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4" /> Chưa đúng
                              </>
                            )}
                          </span>
                        )}
                      </div>

                      <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                        {renderFormattedText(q.question)}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt, optIdx) => {
                          const letter = String.fromCharCode(65 + optIdx);
                          const isSelected = chosen === optIdx;
                          const isRightOpt = q.correctIndex === optIdx;

                          let btnStyle =
                            'bg-slate-50/70 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-400';

                          if (!examSubmitted && isSelected) {
                            btnStyle =
                              'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-800 dark:text-indigo-200 ring-2 ring-indigo-500/20';
                          } else if (examSubmitted) {
                            if (isRightOpt) {
                              btnStyle =
                                'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-200';
                            } else if (isSelected && !isRightOpt) {
                              btnStyle =
                                'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-200';
                            } else {
                              btnStyle =
                                'bg-slate-50/40 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800 text-slate-400';
                            }
                          }

                          return (
                            <button
                              type="button"
                              key={optIdx}
                              disabled={examSubmitted}
                              onClick={() =>
                                setExamAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                              }
                              className={`px-3.5 py-2.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between gap-2 ${btnStyle}`}
                            >
                              <span>
                                <strong className="mr-1.5">{letter}.</strong>
                                {renderFormattedText(opt)}
                              </span>
                              {examSubmitted && isRightOpt && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                              {examSubmitted && isSelected && !isRightOpt && (
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {examSubmitted && (
                        <div
                          className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                            isCorrect
                              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                              : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                          }`}
                        >
                          <strong className="font-extrabold">
                            Đáp án đúng: {String.fromCharCode(65 + q.correctIndex)} —{' '}
                          </strong>
                          {q.explanationVi}
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })
            )}
          </div>

          {!examSubmitted && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleSubmitExam}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold shadow-md transition"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>
                  Nộp Bài &amp; Chấm Điểm ({examStats.answeredCount}/{examStats.total} câu)
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
