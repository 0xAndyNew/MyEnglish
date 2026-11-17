import React from 'react';
import { CheckCircle2, AlertTriangle, Volume2, RotateCcw, XCircle } from 'lucide-react';
import { AccentMode } from '../types/learning';
import { PronunciationScoreResult, speakText } from '../utils/speechEngine';

interface PronunciationReportCardProps {
  result: PronunciationScoreResult;
  accent: AccentMode;
  title?: string;
  onRetry?: () => void;
  compact?: boolean;
}

export const PronunciationReportCard: React.FC<PronunciationReportCardProps> = ({
  result,
  accent,
  title = 'Kết quả chấm phát âm chi tiết từng chữ',
  onRetry,
  compact = false,
}) => {
  const scoreColorClass =
    result.score >= 80
      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300'
      : result.score >= 55
      ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300'
      : 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/50 dark:text-rose-300';

  const errorItems = result.wordResults.filter((w) => w.status !== 'correct');

  return (
    <div
      className={`rounded-2xl bg-white dark:bg-slate-900 border-2 ${
        result.score >= 80
          ? 'border-emerald-300 dark:border-emerald-800'
          : result.score >= 55
          ? 'border-amber-300 dark:border-amber-800'
          : 'border-rose-300 dark:border-rose-800'
      } ${compact ? 'p-3.5 space-y-2.5' : 'p-4 space-y-3'}`}
    >
      {/* Top Score & Summary Counts */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-3 py-1 rounded-xl border text-sm font-black ${scoreColorClass}`}>
            {result.score}/100 điểm
          </span>
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100">{title}</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
          <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Đúng: {result.correctCount}/{result.totalWords}
          </span>
          {result.closeCount > 0 && (
            <span className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Gần đúng: {result.closeCount}
            </span>
          )}
          {result.wrongCount > 0 && (
            <span className="px-2 py-0.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1">
              <XCircle className="w-3 h-3" /> Sai/Thiếu: {result.wrongCount}
            </span>
          )}
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="px-2.5 py-0.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Đọc lại
            </button>
          )}
        </div>
      </div>

      {/* Transcript recognized + Feedback */}
      <div className="text-xs space-y-1 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2.5 border border-slate-200/70 dark:border-slate-700">
        <div className="text-slate-600 dark:text-slate-300">
          <strong className="text-slate-800 dark:text-white">Máy nghe được:</strong> "{result.transcript || '(chưa có giọng nói)'}"
        </div>
        <div className="font-semibold text-indigo-700 dark:text-indigo-300">{result.feedback}</div>
      </div>

      {/* Word-by-word highlight interactive chips */}
      {result.wordResults.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <span className="font-bold">Đối chiếu từng chữ (bấm vào chữ vàng/đỏ để nghe chậm 0.65x):</span>
            <div className="flex flex-wrap items-center gap-2 font-semibold">
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Đúng
              </span>
              <span className="inline-flex items-center gap-1 text-amber-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Gần đúng
              </span>
              <span className="inline-flex items-center gap-1 text-rose-700">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Sai / Bỏ sót
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {result.wordResults.map((item, idx) => {
              const label = item.displayWord || item.word;
              const style =
                item.status === 'correct'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                  : item.status === 'close'
                  ? 'bg-amber-50 text-amber-900 border-amber-400 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700'
                  : 'bg-rose-50 text-rose-800 border-rose-400 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-700';

              const subNote =
                item.status === 'close' && item.spokenWord
                  ? `≠ "${item.spokenWord}"`
                  : item.status === 'wrong'
                  ? item.reason === 'missing'
                    ? '(thiếu)'
                    : item.spokenWord
                    ? `≠ "${item.spokenWord}"`
                    : '(sai)'
                  : '';

              return (
                <button
                  key={`${item.word}-${idx}`}
                  type="button"
                  onClick={() => speakText(item.word, accent, item.status === 'correct' ? 0.9 : 0.65)}
                  title={
                    item.status === 'correct'
                      ? `"${label}" — Phát âm chuẩn (bấm nghe lại)`
                      : item.reason === 'missing'
                      ? `"${label}" — Bạn chưa đọc / bị bỏ sót. Bấm nghe mẫu chậm!`
                      : `"${label}" — Máy nghe thành "${item.spokenWord}". Bấm nghe mẫu chậm!`
                  }
                  className={`px-2 py-1 rounded-lg border text-xs font-bold inline-flex items-center gap-1 transition ${style}`}
                >
                  <span>{label}</span>
                  {subNote && <span className="text-[10px] font-semibold opacity-80">{subNote}</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Focused Correction List */}
      {!compact && errorItems.length > 0 && (
        <div className="p-2.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 space-y-1.5">
          <div className="text-[11px] font-extrabold uppercase text-rose-700 dark:text-rose-300">
            Chữ cần sửa lại ({result.wrongWords.length} từ):
          </div>
          <div className="flex flex-wrap gap-1.5">
            {result.wrongWords.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => speakText(w, accent, 0.65)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 text-xs font-bold inline-flex items-center gap-1 hover:bg-rose-100"
              >
                <Volume2 className="w-3 h-3" /> {w}
              </button>
            ))}
          </div>
        </div>
      )}

      {result.extraWords.length > 0 && (
        <div className="text-[11px] text-slate-500">
          <strong>Từ đọc dư / không có trong bài:</strong> {result.extraWords.join(', ')}
        </div>
      )}
    </div>
  );
};
