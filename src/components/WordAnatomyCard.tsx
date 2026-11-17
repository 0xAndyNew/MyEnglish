import React, { useState } from 'react';
import {
  Volume2,
  Turtle,
  Mic,
  BookmarkPlus,
  BookmarkCheck,
  Sparkles,
  BookOpen,
  Layers,
  GitBranch,
  Lightbulb,
  Eye,
  EyeOff,
} from 'lucide-react';
import { AccentMode, WordEntry } from '../types/learning';
import { isVowelChar } from '../utils/wordAnalyzer';
import {
  isSpeechRecognitionSupported,
  PronunciationScoreResult,
  recordAudioClip,
  scorePronunciation,
  speakText,
  startSpeechRecognition,
} from '../utils/speechEngine';
import { PronunciationReportCard } from './PronunciationReportCard';

interface WordAnatomyCardProps {
  wordEntry: WordEntry;
  accent: AccentMode;
  isSaved?: boolean;
  onSaveWord?: (word: WordEntry) => void;
  onPronunciationScore?: (score: number) => void;
}

export const WordAnatomyCard: React.FC<WordAnatomyCardProps> = ({
  wordEntry,
  accent,
  isSaved = false,
  onSaveWord,
  onPronunciationScore,
}) => {
  const [showColorCode, setShowColorCode] = useState(true);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [scoreResult, setScoreResult] = useState<PronunciationScoreResult | null>(null);
  const [recordingSelf, setRecordingSelf] = useState(false);
  const [selfAudioUrl, setSelfAudioUrl] = useState<string | null>(null);

  const ipa = accent === 'en-US' ? wordEntry.ipaUS : wordEntry.ipaUK;
  const silentSet = new Set(wordEntry.silentIndices || []);

  // Tính chỉ số ký tự toàn cục để đánh dấu âm câm chính xác trên từng âm tiết
  let globalCharIdx = 0;

  const handleSpeak = (rate: number) => {
    speakText(wordEntry.word, accent, rate, rate === 1.0 ? wordEntry.audioUrl : undefined);
  };

  const handleMicTest = () => {
    if (!isSpeechRecognitionSupported()) {
      setSpeechError('Trình duyệt chưa hỗ trợ Micro nhận diện giọng nói (hãy dùng Chrome hoặc Edge).');
      return;
    }
    setSpeechError(null);
    setScoreResult(null);
    setIsListening(true);

    startSpeechRecognition(
      accent,
      (transcript) => {
        const res = scorePronunciation(wordEntry.word, transcript);
        setScoreResult(res);
        onPronunciationScore?.(res.score);
      },
      (err) => setSpeechError(err),
      () => setIsListening(false)
    );
  };

  const handleRecordSelf = async () => {
    setSpeechError(null);
    setRecordingSelf(true);
    try {
      const { url } = await recordAudioClip(3000);
      setSelfAudioUrl(url);
    } catch (err: any) {
      setSpeechError(err?.message || 'Không thể mở Micro để tự ghi âm.');
    } finally {
      setRecordingSelf(false);
    }
  };

  const levelBadgeColors: Record<string, string> = {
    A0: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    A1: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
    A2: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    B1: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    B2: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    C1: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="p-5 sm:p-6 bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/70 dark:from-slate-800/70 dark:via-slate-900 dark:to-indigo-950/30 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${levelBadgeColors[wordEntry.level] || levelBadgeColors.A1}`}>
              {wordEntry.level}
            </span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {wordEntry.pos}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowColorCode(!showColorCode)}
              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              title="Bật/tắt tô màu nhận diện mặt chữ"
            >
              {showColorCode ? <Eye className="w-3.5 h-3.5 text-indigo-500" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{showColorCode ? 'Đang tô màu âm' : 'Chữ thường'}</span>
            </button>

            {onSaveWord && (
              <button
                onClick={() => onSaveWord(wordEntry)}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition ${
                  isSaved
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
                <span>{isSaved ? 'Đã lưu sổ tay' : 'Lưu vào sổ tay'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Visual Word Breakdown */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
              {wordEntry.syllables.map((syl, sIdx) => {
                const isStressed = sIdx === wordEntry.stressIndex && wordEntry.syllables.length > 1;
                const chars = syl.split('');
                return (
                  <React.Fragment key={sIdx}>
                    <span
                      className={`inline-flex items-baseline px-2 py-1 rounded-xl transition ${
                        isStressed
                          ? 'bg-amber-100/80 dark:bg-amber-900/30 ring-2 ring-amber-400/70 font-extrabold text-3xl sm:text-4xl'
                          : 'font-bold text-2xl sm:text-3xl bg-white/70 dark:bg-slate-800/50'
                      }`}
                    >
                      {chars.map((ch, cIdx) => {
                        const currentIdx = globalCharIdx++;
                        const isSilent = silentSet.has(currentIdx);
                        const isVowel = isVowelChar(ch);

                        let colorClass = 'text-slate-900 dark:text-white';
                        if (showColorCode) {
                          if (isSilent) {
                            colorClass = 'text-slate-400 dark:text-slate-500 underline decoration-dashed decoration-slate-400';
                          } else if (isVowel) {
                            colorClass = 'text-orange-600 dark:text-orange-400';
                          } else {
                            colorClass = 'text-sky-700 dark:text-sky-400';
                          }
                        }

                        return (
                          <span
                            key={cIdx}
                            className={colorClass}
                            title={isSilent ? 'Âm câm (viết nhưng không đọc)' : isVowel ? 'Nguyên âm' : 'Phụ âm'}
                          >
                            {ch}
                          </span>
                        );
                      })}
                    </span>
                    {sIdx < wordEntry.syllables.length - 1 && (
                      <span className="text-slate-400 font-bold text-xl">·</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {showColorCode && (
              <div className="flex flex-wrap items-center gap-3 mt-2.5 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500" /> Nguyên âm
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-600" /> Phụ âm
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-400" /> Chữ gạch nét đứt = Âm câm
                </span>
                {wordEntry.syllables.length > 1 && (
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" /> Khung vàng = Trọng âm chính
                  </span>
                )}
              </div>
            )}

            {/* IPA & Viet Phonetic */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="font-mono text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-lg">
                {ipa}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Đọc gợi ý: <strong className="text-slate-900 dark:text-white">{wordEntry.vietPhonetic}</strong>
              </span>
            </div>
          </div>

          {/* Audio & Mic Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleSpeak(1.0)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe (1.0x)</span>
            </button>
            <button
              onClick={() => handleSpeak(0.55)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200 text-sm font-semibold transition"
              title="Nghe chậm từng âm tiết"
            >
              <Turtle className="w-4 h-4" />
              <span>Chậm</span>
            </button>
            <button
              onClick={handleMicTest}
              disabled={isListening}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>{isListening ? 'Đang nghe...' : 'Đọc thử'}</span>
            </button>
            <button
              onClick={handleRecordSelf}
              disabled={recordingSelf}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold transition"
              title="Thu âm 3 giây & nghe lại không cần API Key"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>{recordingSelf ? 'Đang thu 3s...' : 'Tự thu nghe lại'}</span>
            </button>
            {selfAudioUrl && (
              <button
                onClick={() => new Audio(selfAudioUrl).play()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 text-indigo-700 text-xs font-semibold transition"
              >
                <Volume2 className="w-3.5 h-3.5" /> Nghe lại giọng bạn
              </button>
            )}
          </div>
        </div>

        {/* Speech Scoring Feedback */}
        {speechError && (
          <div className="mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
            {speechError}
          </div>
        )}
        {scoreResult && (
          <div className="mt-3">
            <PronunciationReportCard
              result={scoreResult}
              accent={accent}
              title="Kết quả phát âm"
              compact
            />
          </div>
        )}
      </div>

      {/* Body: 8 Layers of Information */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Meaning */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Nghĩa tiếng Việt</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">{wordEntry.meaningVi}</div>
          {wordEntry.extendedMeaning && (
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Nghĩa mở rộng: {wordEntry.extendedMeaning}</p>
          )}
        </div>

        {/* Phonics Rule + Mnemonic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/25 border border-sky-100 dark:border-sky-900/50">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-300 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quy tắc nhận diện mặt chữ (Phonics)</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{wordEntry.phonicsRule}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-100 dark:border-amber-900/50">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 mb-1">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Mẹo nhớ nhanh (Mnemonic)</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{wordEntry.mnemonic}</p>
          </div>
        </div>

        {/* Collapsible Advanced Info */}
        {(wordEntry.morphology ||
          (wordEntry.wordFamily && wordEntry.wordFamily.length > 0) ||
          wordEntry.collocations ||
          wordEntry.synonyms ||
          wordEntry.antonyms) && (
          <div>
            <button
              onClick={() => setShowMoreInfo(!showMoreInfo)}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>
                {showMoreInfo
                  ? 'Thu gọn chi tiết mở rộng ▲'
                  : 'Xem thêm chi tiết mở rộng (Gốc từ, Gia đình từ, Cụm từ đi kèm) ▼'}
              </span>
            </button>

            {showMoreInfo && (
              <div className="mt-3 space-y-3">
                {/* Morphology & Word Family */}
                {(wordEntry.morphology || (wordEntry.wordFamily && wordEntry.wordFamily.length > 0)) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {wordEntry.morphology && (
                      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1.5">
                          <Layers className="w-3.5 h-3.5" />
                          <span>Giải phẫu cấu tạo từ</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono mb-1.5">
                          {wordEntry.morphology.prefix && (
                            <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                              {wordEntry.morphology.prefix}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold">
                            {wordEntry.morphology.root}
                          </span>
                          {wordEntry.morphology.suffix && (
                            <span className="px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300">
                              {wordEntry.morphology.suffix}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{wordEntry.morphology.explanation}</p>
                      </div>
                    )}

                    {wordEntry.wordFamily && wordEntry.wordFamily.length > 0 && (
                      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1.5">
                          <GitBranch className="w-3.5 h-3.5" />
                          <span>Gia đình từ (Học 1 biết thêm nhiều)</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {wordEntry.wordFamily.map((wf, i) => (
                            <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {wf}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Collocations, Synonyms, Antonyms */}
                {(wordEntry.collocations || wordEntry.synonyms || wordEntry.antonyms) && (
                  <div className="flex flex-wrap gap-2 text-xs">
                    {wordEntry.collocations?.map((col, idx) => (
                      <span
                        key={`col-${idx}`}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50"
                      >
                        🔗 {col}
                      </span>
                    ))}
                    {wordEntry.synonyms && wordEntry.synonyms.length > 0 && (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300">
                        ≈ Đồng nghĩa: {wordEntry.synonyms.join(', ')}
                      </span>
                    )}
                    {wordEntry.antonyms && wordEntry.antonyms.length > 0 && (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300">
                        ≠ Trái nghĩa: {wordEntry.antonyms.join(', ')}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Bilingual Examples */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ví dụ trong ngữ cảnh (Bấm để nghe)</span>
          </div>
          <div className="space-y-2">
            {wordEntry.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50/50 dark:hover:bg-slate-800 transition flex items-start justify-between gap-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{ex.en}</p>
                  {ex.ipa && <p className="text-xs font-mono text-indigo-500 mt-0.5">{ex.ipa}</p>}
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{ex.vi}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => speakText(ex.en, accent, 1.0)}
                    className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:text-indigo-600 transition"
                    title="Nghe câu ví dụ"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => speakText(ex.en, accent, 0.6)}
                    className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:text-amber-600 transition"
                    title="Nghe chậm 0.6x"
                  >
                    <Turtle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
