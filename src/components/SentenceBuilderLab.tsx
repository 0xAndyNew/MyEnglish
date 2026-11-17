import React, { useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  HelpCircle,
  Puzzle,
  RotateCcw,
  Volume2,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { SENTENCE_EXERCISES, SENTENCE_TOPICS } from '../data/sentenceExercisesData';
import { AccentMode, CefrLevel } from '../types/learning';
import { speakText } from '../utils/speechEngine';

interface SentenceBuilderLabProps {
  accent: AccentMode;
  onAddXp: (amount: number) => void;
  savedCompletedIds?: string[];
  onCompleteId?: (id: string) => void;
  isNextUnlocked?: boolean;
  onUnlockNext?: () => void;
}

export const SentenceBuilderLab: React.FC<SentenceBuilderLabProps> = ({
  accent,
  onAddXp,
  savedCompletedIds,
  onCompleteId,
  isNextUnlocked = false,
  onUnlockNext,
}) => {
  const [levelFilter, setLevelFilter] = useState<'ALL' | CefrLevel>('ALL');
  const [topicFilter, setTopicFilter] = useState<string>('Tất cả');
  const [sessionLimit, setSessionLimit] = useState<number>(20);
  const [exIdx, setExIdx] = useState(0);
  const [pickedIndices, setPickedIndices] = useState<number[]>([]);
  const [checked, setChecked] = useState<'none' | 'correct' | 'wrong'>('none');
  const [showHint, setShowHint] = useState(false);
  const [localCompletedIds, setLocalCompletedIds] = useState<string[]>([]);

  const completedIds = savedCompletedIds ?? localCompletedIds;

  const filteredList = useMemo(() => {
    const matched = SENTENCE_EXERCISES.filter((item) => {
      const okLevel = levelFilter === 'ALL' || item.level === levelFilter;
      const okTopic = topicFilter === 'Tất cả' || item.topic === topicFilter;
      return okLevel && okTopic;
    });
    const list = matched.length > 0 ? matched : SENTENCE_EXERCISES;
    return sessionLimit === 0 ? list : list.slice(0, sessionLimit);
  }, [levelFilter, topicFilter, sessionLimit]);

  const safeIdx = exIdx % filteredList.length;
  const currentEx = filteredList[safeIdx] || SENTENCE_EXERCISES[0];

  const exWords = useMemo(() => currentEx.en.split(' '), [currentEx]);
  const shuffledExWords = useMemo(() => {
    return exWords
      .map((w, idx) => ({ w, idx }))
      .sort((a, b) => a.w.localeCompare(b.w));
  }, [exWords]);

  const builtSentence = pickedIndices.map((i) => exWords[i]).join(' ');

  const selectIndex = (idx: number) => {
    setExIdx(idx);
    setPickedIndices([]);
    setChecked('none');
    setShowHint(false);
  };

  const handleCheck = () => {
    if (builtSentence.toLowerCase() === currentEx.en.toLowerCase()) {
      setChecked('correct');
      speakText(currentEx.en, accent, 0.9);
      if (!completedIds.includes(currentEx.id)) {
        setLocalCompletedIds((prev) => (prev.includes(currentEx.id) ? prev : [...prev, currentEx.id]));
        onCompleteId?.(currentEx.id);
        onAddXp(15);
      }
      confetti({ particleCount: 30, spread: 50 });
    } else {
      setChecked('wrong');
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">
            <Puzzle className="w-4 h-4" /> Bước 2C • Kho {SENTENCE_EXERCISES.length} bài thực hành ghép câu
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
            Lab Thực Hành Ghép Câu Chuẩn (A1 → B2)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Chọn cấp độ & số lượng bài muốn luyện. Bấm vào từng từ để vừa ghép vừa nghe phát âm chuẩn.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            Đã hoàn thành: {completedIds.length}/{SENTENCE_EXERCISES.length} câu
          </div>
          {onUnlockNext && !isNextUnlocked && (
            <button
              onClick={onUnlockNext}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              Chuyển sang Bước 3: Luyện Nghe & Nói <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filters & Session Count */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Cấp độ:
            </span>
            {(['ALL', 'A1', 'A2', 'B1', 'B2'] as const).map((lv) => (
              <button
                key={lv}
                onClick={() => {
                  setLevelFilter(lv);
                  selectIndex(0);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  levelFilter === lv
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {lv === 'ALL' ? 'Tất cả (120)' : lv}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 mr-1">Số bài muốn làm:</span>
            {[
              { label: '10 câu', val: 10 },
              { label: '20 câu', val: 20 },
              { label: '50 câu', val: 50 },
              { label: 'Tất cả', val: 0 },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  setSessionLimit(opt.val);
                  selectIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  sessionLimit === opt.val
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 mr-1">Chủ đề:</span>
          {SENTENCE_TOPICS.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTopicFilter(t);
                selectIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                topicFilter === t
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200 border border-indigo-300'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Exercise Card */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                Câu {safeIdx + 1}/{filteredList.length} • Cấp {currentEx.level}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {currentEx.topic}
              </span>
            </div>
            {completedIds.includes(currentEx.id) && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Đã ghép đúng
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              "{currentEx.vi}"
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHint((v) => !v)}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" /> {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý cấu trúc'}
              </button>
              <button
                onClick={() => speakText(currentEx.en, accent, 0.85)}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> Nghe câu mẫu
              </button>
            </div>
            {showHint && (
              <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl px-3 py-2">
                💡 {currentEx.hint}
              </p>
            )}
          </div>

          {/* Built area */}
          <div className="min-h-[68px] p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap gap-2 items-center">
            {pickedIndices.length === 0 ? (
              <span className="text-xs text-slate-400">
                Bấm lần lượt các từ bên dưới để ghép thành câu chuẩn (bấm vào từ đã chọn để bỏ ra)...
              </span>
            ) : (
              pickedIndices.map((i, pos) => (
                <button
                  key={pos}
                  onClick={() => {
                    setPickedIndices((prev) => prev.filter((_, pIdx) => pIdx !== pos));
                    setChecked('none');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-rose-600 transition"
                >
                  {exWords[i]}
                </button>
              ))
            )}
          </div>

          {/* Word bank */}
          <div className="flex flex-wrap gap-2">
            {shuffledExWords.map(({ w, idx }) => {
              const used = pickedIndices.includes(idx);
              return (
                <button
                  key={idx}
                  disabled={used}
                  onClick={() => {
                    speakText(w, accent, 0.9);
                    setPickedIndices((prev) => [...prev, idx]);
                    setChecked('none');
                  }}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-sm hover:border-indigo-500 disabled:opacity-25 transition"
                >
                  {w}
                </button>
              );
            })}
          </div>

          {checked === 'correct' && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>
                Chính xác tuyệt đối! Câu chuẩn: <strong>"{currentEx.en}."</strong>
              </span>
            </div>
          )}

          {checked === 'wrong' && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 text-sm text-rose-700 dark:text-rose-300">
              Chưa đúng trật tự chuẩn — hãy xem gợi ý hoặc bấm nghe câu mẫu rồi thử lại nhé!
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleCheck}
              disabled={pickedIndices.length === 0}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold disabled:opacity-40"
            >
              Kiểm tra câu
            </button>
            <button
              onClick={() => {
                setPickedIndices([]);
                setChecked('none');
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Xếp lại
            </button>
            <button
              onClick={() => selectIndex((safeIdx + 1) % filteredList.length)}
              className="ml-auto px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-700 text-white text-sm font-bold"
            >
              Câu tiếp theo →
            </button>
          </div>
        </div>

        {/* Quick Jump Grid */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 h-fit">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase text-slate-500">
              Danh sách câu ({filteredList.length} câu)
            </h4>
            <span className="text-[11px] font-bold text-emerald-600">
              ✓ {filteredList.filter((x) => completedIds.includes(x.id)).length}/{filteredList.length}
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-1.5 max-h-48 lg:max-h-[340px] overflow-y-auto pr-1">
            {filteredList.map((item, idx) => {
              const done = completedIds.includes(item.id);
              const active = idx === safeIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => selectIndex(idx)}
                  title={`${item.level}: ${item.vi}`}
                  className={`py-1.5 rounded-lg text-xs font-bold border transition ${
                    active
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : done
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/30 dark:text-emerald-300'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
