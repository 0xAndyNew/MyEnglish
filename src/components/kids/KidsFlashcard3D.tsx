import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Mic,
  RotateCw,
  Shuffle,
  Sparkles,
  Square,
  Star,
  Volume2,
} from 'lucide-react';
import { KidsUnit, KidsVocabWord } from '../../data/kids/kidsCurriculumData';
import { AccentMode } from '../../types/learning';
import { resolveFlashcardImage } from '../../utils/flashcardMedia';
import { speakText } from '../../utils/speechEngine';

export interface KidsFlashcard3DProps {
  unit: KidsUnit;
  accent: AccentMode;
  speechRate: number;
  starredWordIds: string[];
  listeningKey: string | null;
  onToggleStar: (word: KidsVocabWord) => void;
  onPracticeMic: (id: string, word: string) => void;
  onAddXp: (amount: number) => void;
}

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

function renderColorCodedWord(word: string) {
  return word.split('').map((ch, idx) => {
    const isVowel = VOWELS.has(ch.toLowerCase());
    return (
      <span
        key={idx}
        className={
          isVowel
            ? 'text-orange-500 dark:text-orange-400'
            : 'text-slate-900 dark:text-white'
        }
      >
        {ch}
      </span>
    );
  });
}

function getSmartTip(word: KidsVocabWord, unitTitle: string): string {
  if (word.funTip) return word.funTip;
  return `Bé chạm nút loa đọc "${word.word}" (${word.meaningVi}) 3 lần để nhớ thật lâu chủ đề ${unitTitle} nhé!`;
}

const TenFrameCounter: React.FC<{ count: number; emoji: string }> = ({ count, emoji }) => {
  const frameCount = count > 10 ? 2 : 1;
  const frames = Array.from({ length: frameCount }, (_, fIdx) => {
    const start = fIdx * 10;
    const filledInFrame = Math.max(0, Math.min(10, count - start));
    return { fIdx, filledInFrame };
  });

  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      {frames.map(({ fIdx, filledInFrame }) => (
        <div
          key={fIdx}
          className="grid grid-cols-5 gap-1.5 p-2 rounded-2xl bg-white/90 dark:bg-slate-800/90 border-2 border-amber-200 dark:border-amber-700/70 shadow-inner"
          aria-label={`Khung đếm ${filledInFrame} trong 10`}
        >
          {Array.from({ length: 10 }, (_, idx) => {
            const filled = idx < filledInFrame;
            return (
              <div
                key={idx}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-base sm:text-lg transition ${
                  filled
                    ? 'bg-amber-100 dark:bg-amber-900/50 border border-amber-300 dark:border-amber-700 shadow-sm scale-100'
                    : 'bg-slate-100/80 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-700 opacity-50'
                }`}
              >
                {filled ? emoji : ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const KidsFlashcard3D: React.FC<KidsFlashcard3DProps> = ({
  unit,
  accent,
  speechRate,
  starredWordIds,
  listeningKey,
  onToggleStar,
  onPracticeMic,
  onAddXp,
}) => {
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [hideWordMode, setHideWordMode] = useState(false);
  const [spellXpIds, setSpellXpIds] = useState<string[]>([]);

  // Reset to first card when switching unit
  useEffect(() => {
    setCardIdx(0);
    setFlipped(false);
  }, [unit.id]);

  const safeIdx = Math.min(cardIdx, Math.max(0, unit.words.length - 1));
  const currentWord = unit.words[safeIdx] || unit.words[0];
  const isStarred = starredWordIds.includes(currentWord.id);
  const isMicActive = listeningKey === currentWord.id;

  const selectCard = (nextIdx: number, shouldSpeak = autoSpeak) => {
    const bounded = (nextIdx + unit.words.length) % unit.words.length;
    setCardIdx(bounded);
    setFlipped(false);
    const target = unit.words[bounded];
    if (shouldSpeak && target) {
      speakText(target.word, accent, speechRate);
    }
  };

  const handleRandomCard = () => {
    if (unit.words.length <= 1) return;
    let rand = Math.floor(Math.random() * unit.words.length);
    if (rand === safeIdx) {
      rand = (safeIdx + 1) % unit.words.length;
    }
    selectCard(rand, autoSpeak);
  };

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const handleSpellWord = (e: React.MouseEvent) => {
    e.stopPropagation();
    const letters = currentWord.word.replace(/[^a-zA-Z]/g, '').split('');
    speakText(`${letters.join(' ')}, ${currentWord.word}`, accent, 0.8);
    if (!spellXpIds.includes(currentWord.id)) {
      setSpellXpIds((prev) => [...prev, currentWord.id]);
      onAddXp(5);
    }
  };

  const swatchStyle: React.CSSProperties | undefined = currentWord.swatchHex
    ? currentWord.swatchHex === 'rainbow'
      ? {
          background:
            'conic-gradient(from 45deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #a855f7, #ec4899, #ef4444)',
        }
      : {
          background: `radial-gradient(circle at 32% 28%, #ffffff99 0%, ${currentWord.swatchHex} 45%, #0f172a66 120%)`,
        }
    : undefined;

  const letters = currentWord.word.split('');

  return (
    <div className="space-y-4">
      {/* Top Interactive Control Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white dark:bg-slate-900 rounded-2xl border-2 border-amber-200/80 dark:border-slate-800 px-4 py-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setAutoSpeak((v) => !v)}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border-2 transition inline-flex items-center gap-1.5 ${
              autoSpeak
                ? 'bg-sky-50 border-sky-300 text-sky-700 dark:bg-sky-950/50 dark:border-sky-700 dark:text-sky-300'
                : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            Tự đọc từ khi chọn thẻ: {autoSpeak ? 'Bật' : 'Tắt'}
          </button>

          <button
            type="button"
            onClick={() => {
              setHideWordMode((v) => !v);
              setFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border-2 transition inline-flex items-center gap-1.5 ${
              hideWordMode
                ? 'bg-violet-600 border-violet-600 text-white shadow-sm'
                : 'bg-violet-50 border-violet-200 text-violet-700 dark:bg-violet-950/40 dark:border-violet-800 dark:text-violet-300'
            }`}
          >
            {hideWordMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {hideWordMode ? '🙈 Đang đố bé (Ẩn chữ)' : '🙈 Thử trí nhớ (Ẩn chữ)'}
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-600 dark:text-slate-300">
          <span className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300">
            Cam = Nguyên âm
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            Thẻ {safeIdx + 1}/{unit.words.length}
          </span>
        </div>
      </div>

  {/* Main 3D Interactive Card Stage */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-2xl perspective-1200 select-none">
          {/* Steady 3D Card Container (Grid-stacked faces, Smooth 180-deg Flip, Never Clipped) */}
          <div
            className={`relative w-full grid transition-transform duration-500 transform-style-3d ${
              flipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* ==================== FRONT FACE ==================== */}
            <div
              onClick={() => setFlipped(true)}
              className={`col-start-1 row-start-1 w-full min-h-[380px] sm:min-h-[420px] backface-hidden rounded-[2rem] border-4 border-white dark:border-slate-700 bg-gradient-to-br from-white via-amber-50/60 to-pink-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/60 kids-card-shadow p-4 sm:p-7 flex flex-col justify-between gap-4 cursor-pointer ${
                flipped ? 'pointer-events-none' : 'pointer-events-auto'
              }`}
            >
                {/* Front Header */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-black shadow-sm ${unit.badgeClass}`}>
                    {unit.emoji} {unit.title} • Thẻ {safeIdx + 1}/{unit.words.length}
                  </span>

                  <div className="flex items-center gap-2">
                    {isStarred && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-white text-xs font-black shadow-sm">
                        <Star className="w-3.5 h-3.5 fill-white" /> Đã thuộc
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800 text-pink-600 dark:text-pink-300 text-[11px] font-extrabold border border-pink-200 dark:border-slate-700 shadow-sm">
                      <RotateCw className="w-3 h-3" /> Chạm thẻ để lật
                    </span>
                  </div>
                </div>

                {/* Front Center Visual Stage */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center gap-3.5 my-auto py-2">
                  {/* 1. Number Recognition Mode (1..20) */}
                  {currentWord.countNumber !== undefined ? (
                    <div className="space-y-3 w-full">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakText(currentWord.word, accent, speechRate);
                          }}
                          className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-white border-4 border-amber-200 p-2 shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition"
                          title="Chạm để nghe số"
                        >
                          <img
                            src={resolveFlashcardImage(currentWord.word, currentWord.meaningVi, unit.id)}
                            alt={currentWord.word}
                            className="w-full h-full object-contain"
                          />
                        </button>
                      </div>
                      <TenFrameCounter
                        count={currentWord.countNumber}
                        emoji={currentWord.countEmoji || '🍎'}
                      />
                    </div>
                  ) : currentWord.swatchHex ? (
                    /* 2. Color Recognition Mode */
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(currentWord.word, accent, speechRate);
                      }}
                      className="w-36 h-36 sm:w-40 sm:h-40 rounded-3xl bg-white border-4 border-white p-3 shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition relative overflow-hidden"
                      style={swatchStyle}
                      title="Chạm để nghe màu sắc"
                    >
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center">
                        <img
                          src={resolveFlashcardImage(currentWord.word, currentWord.meaningVi, unit.id)}
                          alt={currentWord.word}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </button>
                  ) : (
                    /* 3. Standard Flashcard Studio Illustration */
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(currentWord.word, accent, speechRate);
                      }}
                      className="w-40 h-40 sm:w-48 sm:h-48 rounded-[2rem] bg-white border-4 border-amber-200 p-3 shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition"
                      title="Chạm vào hình để nghe"
                    >
                      <img
                        src={resolveFlashcardImage(currentWord.word, currentWord.meaningVi, unit.id)}
                        alt={currentWord.word}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  )}

                  {/* Word Display or Mystery Mode */}
                  {hideWordMode ? (
                    <div className="px-5 py-2.5 rounded-2xl bg-violet-100 dark:bg-violet-950/60 border-2 border-dashed border-violet-400 text-violet-800 dark:text-violet-200 font-black text-base sm:text-lg">
                      🙈 Bé đoán xem từ tiếng Anh là gì nào? (Bấm lật thẻ để xem!)
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(currentWord.word, accent, speechRate);
                        }}
                        className="text-4xl sm:text-5xl font-black tracking-tight hover:scale-105 active:scale-95 transition"
                        title="Bấm vào từ để nghe phát âm"
                      >
                        {renderColorCodedWord(currentWord.word)}
                      </button>
                      <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-200 shadow-sm">
                          <span>🗣️ Đọc gần giống: “{currentWord.phoneticVi}”</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Front Footer Quick Sound */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-amber-200/60 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(currentWord.word, accent, speechRate);
                    }}
                    className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-extrabold shadow-sm inline-flex items-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" /> Nghe phát âm ({speechRate}x)
                  </button>

                  <span className="text-xs font-extrabold text-pink-600 dark:text-pink-400">
                    👆 Chạm vào thẻ để xem nghĩa &amp; đánh vần!
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPracticeMic(currentWord.id, currentWord.word);
                    }}
                    className={`px-4 py-2 rounded-2xl text-white text-xs sm:text-sm font-extrabold shadow-sm inline-flex items-center gap-1.5 transition ${
                      isMicActive
                        ? 'bg-rose-500 animate-pulse'
                        : 'bg-emerald-500 hover:bg-emerald-600'
                    }`}
                  >
                    {isMicActive ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {isMicActive ? 'Dừng' : 'Bé đọc theo'}
                  </button>
                </div>
              </div>

              {/* ==================== BACK FACE ==================== */}
              <div
                onClick={() => setFlipped(false)}
                className={`col-start-1 row-start-1 w-full min-h-[380px] sm:min-h-[420px] backface-hidden rotate-y-180 rounded-[2rem] border-4 border-white dark:border-slate-700 bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-600 text-white kids-card-shadow p-4 sm:p-7 flex flex-col justify-between gap-3.5 cursor-pointer ${
                  !flipped ? 'pointer-events-none' : 'pointer-events-auto'
                }`}
              >
                {/* Back Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
                      {currentWord.countNumber !== undefined ? currentWord.countNumber : currentWord.emoji}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xl sm:text-2xl font-black leading-tight">
                        {currentWord.meaningVi}
                      </div>
                      <div className="text-xs text-white/85 font-bold">
                        {currentWord.word} • đọc “{currentWord.phoneticVi}”
                        <span className="opacity-70 ml-2 font-mono">{currentWord.ipa}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(currentWord.word, accent, speechRate);
                    }}
                    className="px-3 py-1.5 rounded-full bg-white/25 hover:bg-white/35 text-xs font-extrabold shrink-0 inline-flex items-center gap-1 shadow-sm transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Nghe từ
                  </button>
                </div>

                {/* Interactive Letter-by-Letter Spelling Tiles */}
                <div className="space-y-1.5 bg-white/15 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wide text-amber-200">
                      🔤 Đánh vần từng chữ cái (Chạm chữ để nghe)
                    </span>
                    <button
                      type="button"
                      onClick={handleSpellWord}
                      className="px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 text-[11px] font-black inline-flex items-center gap-1 shadow-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Đánh vần cả từ
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                    {letters.map((ch, i) => {
                      const isSpace = ch === ' ';
                      const isVowel = VOWELS.has(ch.toLowerCase());
                      if (isSpace) return <div key={i} className="w-3" />;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakText(ch.toLowerCase(), accent, 0.85);
                          }}
                          className={`w-9 h-10 sm:w-10 sm:h-11 rounded-xl font-black text-base sm:text-lg shadow-md border-b-4 active:translate-y-0.5 transition flex items-center justify-center ${
                            isVowel
                              ? 'bg-amber-300 text-slate-900 border-amber-500'
                              : 'bg-white text-indigo-900 border-indigo-200'
                          }`}
                          title={`Nghe chữ "${ch.toUpperCase()}"`}
                        >
                          {ch.toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sample Sentence + Fun Tip */}
                <div className="space-y-2">
                  <div className="rounded-2xl bg-white text-slate-900 p-3 flex items-center justify-between gap-3 shadow-md">
                    <div className="min-w-0">
                      <div className="text-sm sm:text-base font-black text-indigo-900">
                        “{currentWord.sampleSentence}”
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-600">
                        {currentWord.sampleVi}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(currentWord.sampleSentence, accent, speechRate);
                      }}
                      className="relative z-20 p-3 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white shrink-0 shadow-sm transition"
                      title="Bấm vào loa để nghe câu ví dụ"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="px-3 py-2 rounded-xl bg-white/15 border border-white/20 text-xs font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>{getSmartTip(currentWord, unit.titleVi)}</span>
                  </div>
                </div>

                {/* Back Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPracticeMic(currentWord.id, currentWord.word);
                    }}
                    className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm text-white shadow-md inline-flex items-center gap-1.5 transition ${
                      isMicActive
                        ? 'bg-rose-500 animate-pulse'
                        : 'bg-emerald-500 hover:bg-emerald-400'
                    }`}
                  >
                    {isMicActive ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {isMicActive ? 'Dừng' : 'Bé đọc theo'}
                  </button>

                  <button
                    type="button"
                    disabled={isStarred}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStar(currentWord);
                    }}
                    className={`flex-1 py-2.5 px-4 rounded-2xl font-black text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 transition shadow-md ${
                      isStarred
                        ? 'bg-amber-300/90 text-amber-950 cursor-default'
                        : 'bg-amber-400 hover:bg-amber-300 text-slate-900'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-700' : 'fill-slate-900'}`} />
                    {isStarred ? 'Con đã thuộc thẻ này!' : '⭐ Chấm sao đã thuộc (+10 XP)'}
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* Unified Single Control Cluster */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={() => selectCard(safeIdx - 1)}
          className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-extrabold inline-flex items-center gap-1.5 hover:border-amber-400 shadow-sm transition"
        >
          <ChevronLeft className="w-4 h-4" /> Thẻ trước
        </button>

        <button
          type="button"
          onClick={handleFlip}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs sm:text-sm font-black shadow-sm hover:scale-105 transition inline-flex items-center gap-1.5"
        >
          <RotateCw className="w-4 h-4" /> {flipped ? 'Lật về mặt tranh' : 'Lật thẻ xem nghĩa'}
        </button>

        <button
          type="button"
          onClick={() => selectCard(safeIdx + 1)}
          className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-extrabold inline-flex items-center gap-1.5 hover:border-amber-400 shadow-sm transition"
        >
          Thẻ sau <ChevronRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleRandomCard}
          className="px-3.5 py-2.5 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700 text-xs font-extrabold hover:bg-amber-200/80 transition inline-flex items-center gap-1.5"
          title="Chọn thẻ ngẫu nhiên"
        >
          <Shuffle className="w-3.5 h-3.5" /> Ngẫu nhiên
        </button>
      </div>

      {/* Interactive Mini-Card Deck Picker (Kids love picking cards directly!) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-200/80 dark:border-slate-800 p-4 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
            🃏 Bấm chọn thẻ bé thích ({unit.words.length} thẻ trong chủ đề {unit.title}):
          </span>
          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
            ⭐ {unit.words.filter((w) => starredWordIds.includes(w.id)).length}/{unit.words.length} thẻ đã thuộc
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {unit.words.map((w, idx) => {
            const active = idx === safeIdx;
            const done = starredWordIds.includes(w.id);
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => selectCard(idx, autoSpeak)}
                className={`relative p-2.5 rounded-2xl border-2 transition flex flex-col items-center justify-center gap-1 text-center ${
                  active
                    ? `bg-gradient-to-br ${unit.color} text-white border-transparent shadow-md scale-[1.04]`
                    : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-amber-300 text-slate-800 dark:text-slate-100'
                }`}
              >
                {done && (
                  <Star
                    className={`w-3.5 h-3.5 absolute top-1.5 right-1.5 ${
                      active ? 'fill-yellow-200 text-yellow-200' : 'fill-amber-400 text-amber-500'
                    }`}
                  />
                )}
                <span className="text-2xl sm:text-3xl leading-none font-black">
                  {w.countNumber !== undefined ? w.countNumber : w.emoji}
                </span>
                <span className="text-[11px] font-extrabold truncate max-w-full">
                  {hideWordMode && !active ? '???' : w.word}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
