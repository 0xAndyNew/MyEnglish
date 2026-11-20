import React, { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Volume2,
  Award,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  RotateCcw,
  Lock,
  PenTool,
  FolderOpen,
  X,
} from 'lucide-react';
import { LEARNING_STAGES } from '../data/curriculumData';
import { getAudienceMeta, LearnerProfile } from '../types/audience';
import { AccentMode, WordEntry } from '../types/learning';
import { filterAndSortByProfile, getAllowedCategoriesForProfile } from '../utils/audienceFilter';
import { getAllStructuredLessons } from '../utils/lessonGenerator';
import { speakText } from '../utils/speechEngine';
import { WordAnatomyCard } from './WordAnatomyCard';

export type RoadmapTargetTab = 'roadmap' | 'ipa' | 'audio' | 'readwrite' | 'vocab_srs';

interface CurriculumRoadmapProps {
  accent: AccentMode;
  completedLessons: string[];
  savedWords: WordEntry[];
  onCompleteLesson: (lessonId: string) => void;
  onResetLessons: () => void;
  onNavigateTab: (tab: RoadmapTargetTab) => void;
  onSaveWord: (word: WordEntry) => void;
  onPronunciationScore: (score: number) => void;
  isStep2BUnlocked?: boolean;
  onUnlockStep2B?: () => void;
  devUnlockAll?: boolean;
  learnerProfile?: LearnerProfile | null;
}

export const CurriculumRoadmap: React.FC<CurriculumRoadmapProps> = ({
  accent,
  completedLessons,
  savedWords,
  onCompleteLesson,
  onResetLessons,
  onSaveWord,
  onPronunciationScore,
  isStep2BUnlocked = false,
  onUnlockStep2B,
  devUnlockAll = false,
  learnerProfile,
}) => {
  const allLessons = useMemo(() => getAllStructuredLessons(), []);

  const visibleStages = useMemo(() => {
    const profileFiltered = filterAndSortByProfile(LEARNING_STAGES, learnerProfile);
    if (!learnerProfile) return profileFiltered;
    if (learnerProfile.audience === 'teen') {
      const teenLevels = new Set(['A0', 'A1', 'A2', 'B1']);
      return profileFiltered.filter((st) => teenLevels.has(st.level));
    }
    return profileFiltered;
  }, [learnerProfile]);

  const visibleStageIds = useMemo(
    () => new Set(visibleStages.map((st) => st.id)),
    [visibleStages]
  );

  const visibleLessons = useMemo(
    () => allLessons.filter((l) => visibleStageIds.has(l.stageId)),
    [allLessons, visibleStageIds]
  );

  const [showLessonDrawer, setShowLessonDrawer] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState(visibleStages[0]?.id || LEARNING_STAGES[0].id);
  const [selectedLessonId, setSelectedLessonId] = useState(visibleLessons[0]?.id || allLessons[0].id);
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [viewedWords, setViewedWords] = useState<Record<string, boolean>>({});

  // 2-step flow per lesson: 1 = Học từ (2 cột) -> 2 = Quiz Nghe & Viết lại chính tả 100%
  const [lessonStep, setLessonStep] = useState<1 | 2>(1);
  const [spellingInputs, setSpellingInputs] = useState<Record<string, string>>({});
  const [spellingChecked, setSpellingChecked] = useState(false);
  const [quizPassed100, setQuizPassed100] = useState(false);

  useEffect(() => {
    if (!visibleStageIds.has(selectedStageId) && visibleStages[0]) {
      const nextStageId = visibleStages[0].id;
      setSelectedStageId(nextStageId);
      const firstInStage = allLessons.find((l) => l.stageId === nextStageId);
      if (firstInStage) {
        setSelectedLessonId(firstInStage.id);
      }
    }
  }, [visibleStageIds, visibleStages, selectedStageId, allLessons]);

  const stageLessons = allLessons.filter((l) => l.stageId === selectedStageId);
  const currentLesson =
    visibleLessons.find((l) => l.id === selectedLessonId) || stageLessons[0] || visibleLessons[0] || allLessons[0];
  const currentWord = currentLesson.words[activeWordIdx] || currentLesson.words[0];
  const isCompleted = completedLessons.includes(currentLesson.id);

  const markViewed = (wordId: string) => {
    setViewedWords((prev) => (prev[wordId] ? prev : { ...prev, [wordId]: true }));
  };

  const viewedCountInLesson = currentLesson.words.filter(
    (w, idx) => idx === activeWordIdx || viewedWords[w.id]
  ).length;
  const allWordsViewed = viewedCountInLesson >= currentLesson.words.length;

  const currentGlobalLessonIdx = allLessons.findIndex((l) => l.id === currentLesson.id);
  const candidateNext =
    currentGlobalLessonIdx >= 0 && currentGlobalLessonIdx + 1 < allLessons.length
      ? allLessons[currentGlobalLessonIdx + 1]
      : null;
  const nextLesson =
    candidateNext && visibleStageIds.has(candidateNext.stageId) ? candidateNext : null;

  const profileRecommendation = useMemo(() => {
    if (!learnerProfile) return null;
    const meta = getAudienceMeta(learnerProfile.audience);
    const preferredCats = getAllowedCategoriesForProfile([], learnerProfile);
    void preferredCats;
    let hint = `Bắt đầu gợi ý từ cấp ${learnerProfile.startLevel}`;
    if (learnerProfile.audience === 'teen') {
      hint = `Lộ trình A0 → B1 phù hợp THCS/THPT • Mốc hiện tại: ${learnerProfile.startLevel}`;
    } else if (learnerProfile.audience === 'kids') {
      hint = `Lộ trình nền tảng A0 → A1 • Mỗi ngày ${learnerProfile.dailyMinutes} phút`;
    } else if (learnerProfile.audience === 'worker') {
      const inds = learnerProfile.worker?.industries?.slice(0, 2).join(', ');
      hint = inds
        ? `Cấp ${learnerProfile.startLevel} • Ưu tiên thực hành: ${inds}`
        : `Lộ trình A0 → C1 cho Người đi làm • Mốc ${learnerProfile.startLevel}`;
    } else if (learnerProfile.audience === 'university') {
      hint = `Cấp ${learnerProfile.startLevel} → C1 • Chuẩn đầu ra & Học thuật`;
    } else if (learnerProfile.audience === 'exam') {
      hint = `Bổ trợ từ vựng đến C1 cho kỳ thi ${learnerProfile.exam?.examType?.toUpperCase() || ''}`.trim();
    }
    return { meta, hint };
  }, [learnerProfile]);

  const resetLessonLocalState = () => {
    setActiveWordIdx(0);
    setLessonStep(1);
    setSpellingInputs({});
    setSpellingChecked(false);
    setQuizPassed100(false);
  };

  const handleSelectWord = (idx: number) => {
    const w = currentLesson.words[idx];
    if (w) {
      markViewed(w.id);
      speakText(w.word, accent, 0.95);
    }
    setActiveWordIdx(idx);
  };

  const correctSpellingCount = currentLesson.words.filter(
    (w) => (spellingInputs[w.id] || '').trim().toLowerCase() === w.word.toLowerCase()
  ).length;
  const totalLessonWords = currentLesson.words.length;

  const handleCheckSpellingQuiz = () => {
    setSpellingChecked(true);
    if (correctSpellingCount === totalLessonWords && totalLessonWords > 0) {
      setQuizPassed100(true);
      onCompleteLesson(currentLesson.id);
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
    }
  };

  const handleGoNextLesson = () => {
    if (nextLesson) {
      setSelectedStageId(nextLesson.stageId);
      setSelectedLessonId(nextLesson.id);
      resetLessonLocalState();
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Step 2B Unlock Banner */}
      {onUnlockStep2B && (
        <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
            <strong>🎯 Nhiệm vụ mở khóa Bước 2B (Ngữ Pháp: 4 Từ loại, S+V+O & 6 Thì):</strong>{' '}
            Hoàn thành ít nhất 2 bài Nạp Từ Vựng đầu tiên ({Math.min(2, completedLessons.length)}/2 bài).
          </div>
          {isStep2BUnlocked || completedLessons.length >= 2 ? (
            <button
              onClick={onUnlockStep2B}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition"
            >
              🎉 Đạt chuẩn! Mở khóa Bước 2B: Ngữ Pháp →
            </button>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-xs font-bold text-slate-500 border border-slate-200 dark:border-slate-700">
              🔒 Hoàn thành 2 bài để mở khóa Bước 2B
            </span>
          )}
        </div>
      )}

      {/* Clean Focus Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60">
                Cấp {currentLesson.level}
              </span>
              <span>•</span>
              <span>
                Đã hoàn thành{' '}
                {visibleLessons.filter((l) => completedLessons.includes(l.id)).length}/
                {visibleLessons.length} bài
              </span>
              {profileRecommendation && (
                <span
                  className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${profileRecommendation.meta.badgeColor}`}
                >
                  {profileRecommendation.meta.emoji} {profileRecommendation.hint}
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              {currentLesson.title} ({totalLessonWords} từ)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLessonDrawer(!showLessonDrawer)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100 transition"
            >
              <FolderOpen className="w-4 h-4" />
              <span>{showLessonDrawer ? 'Đóng danh sách' : `Chọn bài khác (${visibleLessons.length} bài)`}</span>
            </button>
            <button
              onClick={() => {
                onResetLessons();
                setSelectedStageId(visibleStages[0]?.id || LEARNING_STAGES[0].id);
                setSelectedLessonId(visibleLessons[0]?.id || allLessons[0].id);
                setViewedWords({});
                resetLessonLocalState();
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-600 hover:border-rose-300 transition"
              title="Học lại từ Bài 1 (Reset)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Collapsible Stage & Lesson Picker Drawer */}
        {showLessonDrawer && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-500">Chọn Chặng & Bài Học</span>
              <button onClick={() => setShowLessonDrawer(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {visibleStages.map((st) => {
                const active = st.id === selectedStageId;
                const count = allLessons.filter((l) => l.stageId === st.id).length;
                const done = allLessons.filter((l) => l.stageId === st.id && completedLessons.includes(l.id)).length;
                const isRecommendedStage =
                  Boolean(learnerProfile) &&
                  (st.level === learnerProfile?.startLevel ||
                    (learnerProfile?.startLevel === 'C1' && st.level === 'B2'));
                return (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStageId(st.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                      active
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : isRecommendedStage
                        ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {isRecommendedStage ? '⭐ ' : ''}
                    {st.level} ({done}/{count})
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
              {stageLessons.map((lesson) => {
                const globalIdx = allLessons.findIndex((l) => l.id === lesson.id);
                const done = completedLessons.includes(lesson.id);
                const locked =
                  !devUnlockAll &&
                  globalIdx > 0 &&
                  !completedLessons.includes(allLessons[globalIdx - 1].id) &&
                  !done;
                const active = lesson.id === currentLesson.id;
                return (
                  <button
                    key={lesson.id}
                    disabled={locked}
                    onClick={() => {
                      setSelectedLessonId(lesson.id);
                      resetLessonLocalState();
                      setShowLessonDrawer(false);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-semibold transition ${
                      active
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : locked
                        ? 'bg-slate-100/60 dark:bg-slate-800/30 text-slate-400 border-slate-200/60 cursor-not-allowed'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    {locked ? (
                      <Lock className="w-3.5 h-3.5 shrink-0" />
                    ) : done ? (
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-emerald-300' : 'text-emerald-500'}`} />
                    ) : null}
                    <span className="truncate">{lesson.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2-Step Stepper for Vocabulary Lesson */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setLessonStep(1)}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition ${
              lessonStep === 1
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
            }`}
          >
            <span>1. Học từ vựng ({viewedCountInLesson}/{totalLessonWords} từ)</span>
          </button>

          <button
            disabled={!allWordsViewed && !isCompleted}
            onClick={() => setLessonStep(2)}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition ${
              lessonStep === 2
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : allWordsViewed || isCompleted
                ? 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                : 'bg-slate-100/60 dark:bg-slate-800/30 text-slate-400 border-slate-200/60 cursor-not-allowed'
            }`}
          >
            {!allWordsViewed && !isCompleted && <Lock className="w-3.5 h-3.5" />}
            <span>2. Quiz Nghe & Viết Lại Chính Tả (100%)</span>
          </button>
        </div>
      </div>

      {/* STEP 1: 2-COLUMN LAYOUT (LEFT = WORD LIST, RIGHT = WORD INFO) */}
      {lessonStep === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Left Column: 10 Words List */}
          <div className="md:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2 h-fit md:sticky md:top-20">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase text-slate-500">
                Danh sách {totalLessonWords} từ trong bài
              </span>
              <span className="text-xs font-bold text-emerald-600">
                {viewedCountInLesson}/{totalLessonWords} đã học
              </span>
            </div>

            <div className="space-y-1.5 max-h-56 lg:max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
              {currentLesson.words.map((w, idx) => {
                const active = idx === activeWordIdx;
                const viewed = active || viewedWords[w.id];
                return (
                  <button
                    key={w.id}
                    onClick={() => handleSelectWord(idx)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition ${
                      active
                        ? 'border-indigo-600 bg-indigo-50/90 dark:bg-indigo-950/50 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {viewed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                      )}
                      <div className="truncate">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {idx + 1}. {w.word}
                        </span>
                        <span className="block text-xs text-slate-500 truncate">{w.meaningVi}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {(allWordsViewed || isCompleted) && (
              <button
                onClick={() => setLessonStep(2)}
                className="w-full mt-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Đã học xong! Làm Quiz Chính Tả →</span>
              </button>
            )}
          </div>

          {/* Right Column: Detailed Word Info */}
          <div className="md:col-span-7 space-y-3">
            <WordAnatomyCard
              wordEntry={currentWord}
              accent={accent}
              isSaved={savedWords.some((w) => w.word.toLowerCase() === currentWord.word.toLowerCase())}
              onSaveWord={onSaveWord}
              onPronunciationScore={onPronunciationScore}
            />

            <div className="flex items-center justify-between pt-1">
              <button
                disabled={activeWordIdx === 0}
                onClick={() => handleSelectWord(Math.max(0, activeWordIdx - 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" /> Từ trước
              </button>

              <span className="text-xs font-bold text-slate-500">
                Từ {activeWordIdx + 1} / {totalLessonWords}
              </span>

              {activeWordIdx + 1 < totalLessonWords ? (
                <button
                  onClick={() => handleSelectWord(activeWordIdx + 1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-sm"
                >
                  Từ tiếp theo <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setLessonStep(2)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-sm"
                >
                  Làm Quiz Chính Tả (100%) <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: 100% SPELLING DICTATION QUIZ */}
      {lessonStep === 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase">
                <PenTool className="w-5 h-5" /> Quiz Nhận Diện Mặt Chữ: Nghe & Viết Lại Chính Tả (Cần 100%)
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Bấm nghe từng từ và gõ lại đúng chính tả toàn bộ {totalLessonWords} từ trong bài để qua bài tiếp theo.
              </p>
            </div>
            {spellingChecked && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                  correctSpellingCount === totalLessonWords
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                Đúng {correctSpellingCount}/{totalLessonWords} từ (
                {Math.round((correctSpellingCount / totalLessonWords) * 100)}%)
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentLesson.words.map((w, idx) => {
              const val = (spellingInputs[w.id] || '').trim().toLowerCase();
              const isRight = val === w.word.toLowerCase();
              return (
                <div
                  key={w.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Câu {idx + 1}: <strong>{w.meaningVi}</strong>
                    </span>
                    <button
                      onClick={() => speakText(w.word, accent, 0.85)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe từ
                    </button>
                  </div>
                  <input
                    value={spellingInputs[w.id] || ''}
                    onChange={(e) => {
                      setSpellingInputs((prev) => ({ ...prev, [w.id]: e.target.value }));
                      setSpellingChecked(false);
                    }}
                    placeholder="Gõ lại mặt chữ tiếng Anh..."
                    className={`w-full px-3 py-2 text-sm font-bold rounded-lg border bg-white dark:bg-slate-900 ${
                      spellingChecked
                        ? isRight
                          ? 'border-emerald-500 text-emerald-700'
                          : 'border-rose-500 text-rose-700'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {spellingChecked && (
                    <p className={`text-[11px] font-semibold ${isRight ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isRight ? '✓ Chính xác!' : '✗ Chưa đúng — hãy bấm "Nghe từ" và sửa lại nhé!'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setLessonStep(1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-bold"
            >
              <ChevronLeft className="w-4 h-4" /> Quay lại ôn 10 từ
            </button>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleCheckSpellingQuiz}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold"
              >
                <Award className="w-4 h-4 inline mr-1.5" />
                Chấm điểm (Cần 100%)
              </button>

              {(quizPassed100 || isCompleted) && nextLesson && (
                <button
                  onClick={handleGoNextLesson}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-sm"
                >
                  🎉 Đạt 100%! Qua bài tiếp theo →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
