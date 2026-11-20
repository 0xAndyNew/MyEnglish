import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Volume2,
  XCircle,
} from 'lucide-react';
import {
  ErrorFindExercise,
  Exercise,
  GapFillExercise,
  MatchingExercise,
  McqExercise,
  PronunciationExercise,
  TransformExercise,
  TrueFalseExercise,
  WordOrderExercise,
} from '../../types/exercise';
import { AccentMode } from '../../types/learning';
import { speakText } from '../../utils/speechEngine';

export interface ExerciseRunnerProps {
  exercises: Exercise[];
  title?: string;
  subtitle?: string;
  accent?: AccentMode;
  shuffleOptions?: boolean;
  onComplete?: (
    correct: number,
    total: number,
    details?: { skillStats?: Record<string, { correct: number; total: number }> }
  ) => void;
}

function normalizeAnswer(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/[.!?]+$/, '');
}

function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const copy = [...arr];
  let s = seed || 1;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
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

function isExerciseCorrect(ex: Exercise, userAnswer: unknown): boolean {
  if (userAnswer === undefined || userAnswer === null) return false;

  switch (ex.kind) {
    case 'mcq':
      return userAnswer === ex.correctIndex;
    case 'pronunciation':
      return userAnswer === ex.correctIndex;
    case 'error-find':
      return userAnswer === ex.wrongIndex;
    case 'true-false':
      return userAnswer === ex.answer;
    case 'gap-fill': {
      const inputs = Array.isArray(userAnswer) ? (userAnswer as string[]) : [String(userAnswer)];
      const blankCount = (ex.sentence.match(/___/g) || []).length || 1;
      if (blankCount === 1) {
        const val = normalizeAnswer(inputs[0] || '');
        if (!val) return false;
        return ex.answers.some((ans) =>
          ans.split('|').some((variant) => normalizeAnswer(variant) === val)
        );
      }
      return ex.answers.every((ans, idx) => {
        const val = normalizeAnswer(inputs[idx] || '');
        return ans.split('|').some((variant) => normalizeAnswer(variant) === val);
      });
    }
    case 'word-order': {
      const val = normalizeAnswer(Array.isArray(userAnswer) ? (userAnswer as string[]).join(' ') : String(userAnswer));
      return val === normalizeAnswer(ex.answer);
    }
    case 'transform': {
      const val = normalizeAnswer(String(userAnswer));
      if (!val) return false;
      return ex.answers.some((ans) => normalizeAnswer(ans) === val);
    }
    case 'matching': {
      const mapping = userAnswer as Record<number, number>;
      if (!mapping || typeof mapping !== 'object') return false;
      return ex.pairs.every((_, idx) => mapping[idx] === idx);
    }
  }
}

export const ExerciseRunner: React.FC<ExerciseRunnerProps> = ({
  exercises,
  title = 'Bài tập thực hành tổng hợp',
  subtitle,
  accent = 'en-US',
  shuffleOptions = true,
  onComplete,
}) => {
  const [attemptSeed, setAttemptSeed] = useState(1);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [submittedAll, setSubmittedAll] = useState(false);
  const [onlyWrongMode, setOnlyWrongMode] = useState(false);

  const visibleExercises = useMemo(() => {
    if (!onlyWrongMode) return exercises;
    return exercises.filter((ex) => !isExerciseCorrect(ex, answers[ex.id]));
  }, [exercises, onlyWrongMode, answers]);

  const answeredCount = useMemo(() => {
    return exercises.filter((ex) => {
      const a = answers[ex.id];
      if (a === undefined || a === null) return false;
      if (Array.isArray(a)) return a.some((x) => String(x).trim() !== '');
      if (typeof a === 'object') return Object.keys(a).length > 0;
      return String(a).trim() !== '';
    }).length;
  }, [exercises, answers]);

  const correctCount = useMemo(() => {
    return exercises.filter((ex) => isExerciseCorrect(ex, answers[ex.id])).length;
  }, [exercises, answers]);

  const handleCheckOne = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubmitAll = () => {
    const allChecked: Record<string, boolean> = {};
    const skillStats: Record<string, { correct: number; total: number }> = {};
    exercises.forEach((ex) => {
      allChecked[ex.id] = true;
      if (ex.skill) {
        const cur = skillStats[ex.skill] || { correct: 0, total: 0 };
        cur.total += 1;
        if (isExerciseCorrect(ex, answers[ex.id])) cur.correct += 1;
        skillStats[ex.skill] = cur;
      }
    });
    setCheckedIds(allChecked);
    setSubmittedAll(true);
    onComplete?.(correctCount, exercises.length, { skillStats });
  };

  const handleResetAll = () => {
    setAnswers({});
    setCheckedIds({});
    setSubmittedAll(false);
    setOnlyWrongMode(false);
    setAttemptSeed((s) => s + 1);
  };

  const handleRetryWrong = () => {
    const nextAnswers: Record<string, unknown> = {};
    const nextChecked: Record<string, boolean> = {};
    exercises.forEach((ex) => {
      if (isExerciseCorrect(ex, answers[ex.id])) {
        nextAnswers[ex.id] = answers[ex.id];
        nextChecked[ex.id] = true;
      }
    });
    setAnswers(nextAnswers);
    setCheckedIds(nextChecked);
    setSubmittedAll(false);
    setOnlyWrongMode(true);
    setAttemptSeed((s) => s + 1);
  };

  if (exercises.length === 0) {
    return (
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center text-sm text-slate-500">
        Chưa có bài tập nào trong mục này.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-sky-600 shrink-0" />
            <span>{title}</span>
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
            Đã làm: {answeredCount}/{exercises.length}
          </span>
          {submittedAll && (
            <span
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${
                correctCount >= Math.ceil(exercises.length * 0.6)
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
              }`}
            >
              Điểm: {correctCount}/{exercises.length} (
              {Math.round((correctCount / exercises.length) * 100)}%)
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {visibleExercises.map((ex, idx) => {
          const isChecked = Boolean(checkedIds[ex.id]);
          const isCorrect = isChecked && isExerciseCorrect(ex, answers[ex.id]);

          return (
            <div
              key={ex.id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Câu {idx + 1} • {kindLabel(ex.kind)}
                </span>
                {!isChecked && (
                  <button
                    type="button"
                    onClick={() => handleCheckOne(ex.id)}
                    className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 text-xs font-bold hover:bg-sky-100 dark:hover:bg-sky-900/50 transition"
                  >
                    Kiểm tra
                  </button>
                )}
              </div>

              {ex.kind === 'mcq' && (
                <McqView
                  ex={ex}
                  accent={accent}
                  value={answers[ex.id] as number | undefined}
                  checked={isChecked}
                  shuffle={shuffleOptions}
                  seed={attemptSeed}
                  onChange={(val) => setAnswers((p) => ({ ...p, [ex.id]: val }))}
                />
              )}

              {ex.kind === 'pronunciation' && (
                <PronunciationView
                  ex={ex}
                  accent={accent}
                  value={answers[ex.id] as number | undefined}
                  checked={isChecked}
                  onChange={(val) => setAnswers((p) => ({ ...p, [ex.id]: val }))}
                />
              )}

              {ex.kind === 'gap-fill' && (
                <GapFillView
                  ex={ex}
                  value={answers[ex.id] as string[] | undefined}
                  checked={isChecked}
                  onChange={(val) => setAnswers((p) => ({ ...p, [ex.id]: val }))}
                />
              )}

              {ex.kind === 'word-order' && (
                <WordOrderView
                  ex={ex}
                  accent={accent}
                  value={answers[ex.id] as string[] | undefined}
                  checked={isChecked}
                  seed={attemptSeed}
                  onChange={(val) => setAnswers((p) => ({ ...p, [ex.id]: val }))}
                />
              )}

              {ex.kind === 'error-find' && (
                <ErrorFindView
                  ex={ex}
                  value={answers[ex.id] as number | undefined}
                  checked={isChecked}
                  onChange={(val) => setAnswers((p) => ({ ...p, [ex.id]: val }))}
                />
              )}

              {ex.kind === 'transform' && (
                <TransformView
                  ex={ex}
                  value={(answers[ex.id] as string) || ''}
                  checked={isChecked}
                  onChange={(val) => setAnswers((p) => ({ ...p, [ex.id]: val }))}
                />
              )}

              {ex.kind === 'true-false' && (
                <TrueFalseView
                  ex={ex}
                  value={answers[ex.id] as boolean | undefined}
                  checked={isChecked}
                  onChange={(val) => setAnswers((p) => ({ ...p, [ex.id]: val }))}
                />
              )}

              {ex.kind === 'matching' && (
                <MatchingView
                  ex={ex}
                  value={(answers[ex.id] as Record<number, number>) || {}}
                  checked={isChecked}
                  seed={attemptSeed}
                  onChange={(val) => setAnswers((p) => ({ ...p, [ex.id]: val }))}
                />
              )}

              {isChecked && (
                <div
                  className={`p-3 rounded-xl text-xs leading-relaxed border flex items-start gap-2 ${
                    isCorrect
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                      : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong>{isCorrect ? 'Chính xác! ' : 'Chưa đúng. '}</strong>
                    {ex.explanationVi}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        {!submittedAll ? (
          <button
            type="button"
            onClick={handleSubmitAll}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-extrabold shadow-sm transition"
          >
            Nộp bài &amp; Xem điểm ({answeredCount}/{exercises.length})
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleResetAll}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <RotateCcw className="w-4 h-4" /> Làm lại tất cả
            </button>
            {correctCount < exercises.length && (
              <button
                type="button"
                onClick={handleRetryWrong}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold"
              >
                <RotateCcw className="w-4 h-4" /> Làm lại {exercises.length - correctCount} câu sai
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function kindLabel(kind: Exercise['kind']): string {
  switch (kind) {
    case 'mcq':
      return 'Trắc nghiệm';
    case 'gap-fill':
      return 'Điền từ';
    case 'word-order':
      return 'Sắp xếp câu';
    case 'error-find':
      return 'Tìm lỗi sai';
    case 'transform':
      return 'Viết lại câu';
    case 'matching':
      return 'Nối cặp';
    case 'true-false':
      return 'Đúng / Sai';
    case 'pronunciation':
      return 'Phát âm / Trọng âm';
  }
}

const McqView: React.FC<{
  ex: McqExercise;
  accent: AccentMode;
  value: number | undefined;
  checked: boolean;
  shuffle: boolean;
  seed: number;
  onChange: (idx: number) => void;
}> = ({ ex, accent, value, checked, shuffle, seed, onChange }) => {
  const orderedIndices = useMemo(() => {
    const base = ex.options.map((_, i) => i);
    const hasPositionalRef = ex.options.some((o) =>
      /\b(all of the above|both [ab]|none of the above)\b/i.test(o)
    );
    if (!shuffle || hasPositionalRef) return base;
    return seededShuffle(base, hashSeed(ex.id) + seed);
  }, [ex.id, ex.options, shuffle, seed]);

  return (
    <div className="space-y-3">
      {ex.audioScript && (
        <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-extrabold text-indigo-800 dark:text-indigo-200">
              Nghe Audio câu hỏi (Transcript mở sau khi kiểm tra)
            </span>
            <button
              type="button"
              onClick={() => speakText(ex.audioScript!, accent, 0.92)}
              className="min-h-[36px] px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold inline-flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5" /> Phát Audio
            </button>
          </div>
          {checked && (
            <p className="text-xs text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/70 p-2.5 rounded-lg leading-relaxed">
              <strong>Transcript:</strong> {ex.audioScript}
            </p>
          )}
        </div>
      )}
      {ex.passage && (
        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {ex.passage}
        </div>
      )}
      <div className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
        {renderFormattedText(ex.question)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {orderedIndices.map((origIdx, displayIdx) => {
          const letter = String.fromCharCode(65 + displayIdx);
          const isSelected = value === origIdx;
          const isRight = ex.correctIndex === origIdx;
          let cls =
            'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-sky-400';
          if (!checked && isSelected) {
            cls = 'bg-sky-50 dark:bg-sky-950/50 border-sky-600 text-sky-800 dark:text-sky-200 ring-2 ring-sky-500/20';
          } else if (checked) {
            if (isRight) cls = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-200';
            else if (isSelected) cls = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-200';
          }
          return (
            <button
              type="button"
              key={origIdx}
              disabled={checked}
              onClick={() => onChange(origIdx)}
              className={`px-3.5 py-2.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between gap-2 ${cls}`}
            >
              <span>
                <strong className="mr-1.5">{letter}.</strong>
                {renderFormattedText(ex.options[origIdx])}
              </span>
              {checked && isRight && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              {checked && isSelected && !isRight && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const PronunciationView: React.FC<{
  ex: PronunciationExercise;
  accent: AccentMode;
  value: number | undefined;
  checked: boolean;
  onChange: (idx: number) => void;
}> = ({ ex, accent, value, checked, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="text-sm font-bold text-slate-900 dark:text-white">
        {ex.question ||
          (ex.focus === 'stress'
            ? 'Chọn từ có trọng âm khác với các từ còn lại:'
            : 'Chọn từ có phần gạch chân phát âm khác với các từ còn lại:')}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {ex.words.map((w, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isSelected = value === idx;
          const isRight = ex.correctIndex === idx;
          const cleanWord = w.replace(/\[\[|\]\]/g, '');
          let cls =
            'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-sky-400';
          if (!checked && isSelected) {
            cls = 'bg-sky-50 dark:bg-sky-950/50 border-sky-600 text-sky-800 dark:text-sky-200';
          } else if (checked) {
            if (isRight) cls = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-200';
            else if (isSelected) cls = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-200';
          }
          return (
            <div key={idx} className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={checked}
                onClick={() => onChange(idx)}
                className={`flex-1 px-3.5 py-2.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between ${cls}`}
              >
                <span>
                  <strong className="mr-1.5">{letter}.</strong>
                  {renderFormattedText(w)}
                </span>
              </button>
              <button
                type="button"
                onClick={() => speakText(cleanWord, accent, 0.9)}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sky-600 hover:bg-sky-50"
                title={`Nghe "${cleanWord}"`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GapFillView: React.FC<{
  ex: GapFillExercise;
  value: string[] | undefined;
  checked: boolean;
  onChange: (val: string[]) => void;
}> = ({ ex, value = [], checked, onChange }) => {
  const parts = ex.sentence.split('___');
  const blankCount = Math.max(1, parts.length - 1);

  const handleInput = (idx: number, text: string) => {
    const next = [...value];
    while (next.length < blankCount) next.push('');
    next[idx] = text;
    onChange(next);
  };

  return (
    <div className="space-y-2.5">
      <div className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed flex flex-wrap items-center gap-1.5">
        {parts.map((part, idx) => (
          <React.Fragment key={idx}>
            <span>{part}</span>
            {idx < blankCount && (
              <input
                type="text"
                disabled={checked}
                value={value[idx] || ''}
                onChange={(e) => handleInput(idx, e.target.value)}
                placeholder="..."
                className="inline-block w-32 px-2.5 py-1 rounded-lg border border-sky-300 dark:border-sky-700 bg-white dark:bg-slate-900 text-sm font-bold text-sky-800 dark:text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            )}
          </React.Fragment>
        ))}
      </div>
      {ex.hintVi && (
        <div className="text-xs text-slate-500 dark:text-slate-400">Gợi ý: {ex.hintVi}</div>
      )}
      {checked && (
        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
          Đáp án: {ex.answers.map((a) => a.split('|')[0]).join(' / ')}
        </div>
      )}
    </div>
  );
};

const WordOrderView: React.FC<{
  ex: WordOrderExercise;
  accent: AccentMode;
  value: string[] | undefined;
  checked: boolean;
  seed: number;
  onChange: (val: string[]) => void;
}> = ({ ex, accent, value = [], checked, seed, onChange }) => {
  const bank = useMemo(
    () => seededShuffle(ex.words.map((w, i) => ({ w, i })), hashSeed(ex.id) + seed),
    [ex.id, ex.words, seed]
  );
  const [pickedIndices, setPickedIndices] = useState<number[]>([]);

  const handlePick = (itemIdx: number) => {
    if (checked) return;
    if (pickedIndices.includes(itemIdx)) {
      const nextIdx = pickedIndices.filter((x) => x !== itemIdx);
      setPickedIndices(nextIdx);
      onChange(nextIdx.map((i) => ex.words[i]));
    } else {
      const nextIdx = [...pickedIndices, itemIdx];
      setPickedIndices(nextIdx);
      onChange(nextIdx.map((i) => ex.words[i]));
    }
  };

  return (
    <div className="space-y-3">
      {ex.promptVi && (
        <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
          Nghĩa tiếng Việt: “{ex.promptVi}”
        </div>
      )}
      <div className="min-h-[44px] p-3 rounded-xl bg-white dark:bg-slate-900 border border-dashed border-sky-300 dark:border-sky-700 flex flex-wrap gap-1.5 items-center">
        {value.length === 0 ? (
          <span className="text-xs text-slate-400">Bấm vào các thẻ từ bên dưới để ghép câu...</span>
        ) : (
          pickedIndices.map((idx) => (
            <button
              type="button"
              key={idx}
              disabled={checked}
              onClick={() => handlePick(idx)}
              className="px-2.5 py-1 rounded-lg bg-sky-600 text-white text-xs font-bold"
            >
              {ex.words[idx]}
            </button>
          ))
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {bank.map(({ w, i }) => {
          const used = pickedIndices.includes(i);
          return (
            <button
              type="button"
              key={i}
              disabled={checked || used}
              onClick={() => handlePick(i)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition ${
                used
                  ? 'opacity-35 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-sky-500'
              }`}
            >
              {w}
            </button>
          );
        })}
      </div>
      {checked && (
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
          <span>Đáp án đúng: {ex.answer}</span>
          <button
            type="button"
            onClick={() => speakText(ex.answer, accent, 0.9)}
            className="p-1 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

const ErrorFindView: React.FC<{
  ex: ErrorFindExercise;
  value: number | undefined;
  checked: boolean;
  onChange: (idx: number) => void;
}> = ({ ex, value, checked, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
        Tìm phần gạch chân chứa lỗi sai: {renderFormattedText(ex.sentence)}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {ex.parts.map((p, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isSelected = value === idx;
          const isRight = ex.wrongIndex === idx;
          let cls =
            'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200';
          if (!checked && isSelected) cls = 'bg-sky-50 border-sky-600 text-sky-800';
          else if (checked && isRight) cls = 'bg-emerald-50 border-emerald-500 text-emerald-800';
          else if (checked && isSelected && !isRight) cls = 'bg-rose-50 border-rose-500 text-rose-800';

          return (
            <button
              type="button"
              key={idx}
              disabled={checked}
              onClick={() => onChange(idx)}
              className={`px-3 py-2 rounded-xl border text-xs font-bold text-left ${cls}`}
            >
              <strong>{letter}.</strong> {p}
            </button>
          );
        })}
      </div>
      {checked && (
        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
          Sửa lại thành: {ex.correction}
        </div>
      )}
    </div>
  );
};

const TransformView: React.FC<{
  ex: TransformExercise;
  value: string;
  checked: boolean;
  onChange: (val: string) => void;
}> = ({ ex, value, checked, onChange }) => {
  return (
    <div className="space-y-2.5">
      <div className="text-sm font-bold text-slate-900 dark:text-white">{ex.prompt}</div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        {ex.starter && (
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 shrink-0">
            {ex.starter}
          </span>
        )}
        <input
          type="text"
          disabled={checked}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Nhập phần viết lại..."
          className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
      {checked && (
        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
          Gợi ý đáp án: {ex.starter ? `${ex.starter} ` : ''}{ex.answers[0]}
        </div>
      )}
    </div>
  );
};

const TrueFalseView: React.FC<{
  ex: TrueFalseExercise;
  value: boolean | undefined;
  checked: boolean;
  onChange: (val: boolean) => void;
}> = ({ ex, value, checked, onChange }) => {
  return (
    <div className="space-y-3">
      {ex.passage && (
        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {ex.passage}
        </div>
      )}
      <div className="text-sm font-bold text-slate-900 dark:text-white">{ex.statement}</div>
      <div className="flex gap-2">
        {[
          { label: 'True (Đúng)', val: true },
          { label: 'False (Sai)', val: false },
        ].map((item) => {
          const isSelected = value === item.val;
          const isRight = ex.answer === item.val;
          let cls = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700';
          if (!checked && isSelected) cls = 'bg-sky-50 border-sky-600 text-sky-800';
          else if (checked && isRight) cls = 'bg-emerald-50 border-emerald-500 text-emerald-800';
          else if (checked && isSelected && !isRight) cls = 'bg-rose-50 border-rose-500 text-rose-800';
          return (
            <button
              type="button"
              key={String(item.val)}
              disabled={checked}
              onClick={() => onChange(item.val)}
              className={`px-4 py-2 rounded-xl border text-xs font-bold ${cls}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const MatchingView: React.FC<{
  ex: MatchingExercise;
  value: Record<number, number>;
  checked: boolean;
  seed: number;
  onChange: (val: Record<number, number>) => void;
}> = ({ ex, value, checked, seed, onChange }) => {
  const shuffledRightIndices = useMemo(
    () => seededShuffle(ex.pairs.map((_, i) => i), hashSeed(ex.id) + seed),
    [ex.id, ex.pairs, seed]
  );

  return (
    <div className="space-y-2.5">
      <div className="text-sm font-bold text-slate-900 dark:text-white">
        {ex.promptVi || 'Ghép các cặp tương ứng bên trái với cột bên phải:'}
      </div>
      <div className="space-y-2">
        {ex.pairs.map((pair, leftIdx) => {
          const chosenRight = value[leftIdx];
          const isRightMatch = chosenRight === leftIdx;
          return (
            <div
              key={leftIdx}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
            >
              <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                {leftIdx + 1}. {pair.left}
              </div>
              <select
                disabled={checked}
                value={chosenRight === undefined ? '' : chosenRight}
                onChange={(e) => {
                  const v = e.target.value === '' ? undefined : Number(e.target.value);
                  const next = { ...value };
                  if (v === undefined) delete next[leftIdx];
                  else next[leftIdx] = v;
                  onChange(next);
                }}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold bg-slate-50 dark:bg-slate-800 ${
                  checked
                    ? isRightMatch
                      ? 'border-emerald-500 text-emerald-700'
                      : 'border-rose-500 text-rose-700'
                    : 'border-slate-300 dark:border-slate-600'
                }`}
              >
                <option value="">-- Chọn đáp án --</option>
                {shuffledRightIndices.map((origRightIdx) => (
                  <option key={origRightIdx} value={origRightIdx}>
                    {ex.pairs[origRightIdx].right}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};
