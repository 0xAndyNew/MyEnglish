import React, { useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, RotateCw, Layers, Headphones, Puzzle, Zap, CheckCircle2 } from 'lucide-react';
import { ALL_CURRICULUM_WORDS } from '../data/curriculumData';
import { AccentMode, SrsCardState, WordEntry } from '../types/learning';
import { speakText } from '../utils/speechEngine';

interface MemoryGamesSRSProps {
  accent: AccentMode;
  savedWords: WordEntry[];
  srsCards: Record<string, SrsCardState>;
  onRateSrs: (wordId: string, quality: 0 | 2 | 4 | 5) => void;
  onAddXp: (amount: number) => void;
}

export const MemoryGamesSRS: React.FC<MemoryGamesSRSProps> = ({
  accent,
  savedWords,
  srsCards,
  onRateSrs,
  onAddXp,
}) => {
  const [gameMode, setGameMode] = useState<'flashcard' | 'sound2word' | 'syllables' | 'match'>('flashcard');

  const pool = useMemo(() => {
    const map = new Map<string, WordEntry>();
    [...savedWords, ...ALL_CURRICULUM_WORDS].forEach((w) => map.set(w.word.toLowerCase(), w));
    return Array.from(map.values());
  }, [savedWords]);

  // Flashcard state
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Sound-to-word state
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizChoice, setQuizChoice] = useState<string | null>(null);

  // Syllable builder state
  const [sylWordIdx, setSylWordIdx] = useState(() =>
    Math.max(0, pool.findIndex((w) => w.syllables.length > 1))
  );
  const [pickedSyllables, setPickedSyllables] = useState<number[]>([]);

  // Speed Match state
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);

  const currentCard = pool[cardIdx % pool.length];

  const handleRate = (q: 0 | 2 | 4 | 5) => {
    onRateSrs(currentCard.id, q);
    setFlipped(false);
    setCardIdx((i) => (i + 1) % pool.length);
  };

  // Sound-to-Word options
  const targetQuizWord = pool[quizIdx % pool.length];
  const quizOptions = useMemo(() => {
    const others = pool.filter((w) => w.id !== targetQuizWord.id).slice(0, 3);
    const list = [targetQuizWord, ...others];
    return list.sort((a, b) => a.word.localeCompare(b.word));
  }, [pool, targetQuizWord]);

  // Syllable builder
  const multiSylWords = useMemo(() => pool.filter((w) => w.syllables.length > 1), [pool]);
  const currentSylWord = multiSylWords[sylWordIdx % multiSylWords.length] || pool[0];
  const shuffledSyllables = useMemo(() => {
    return currentSylWord.syllables
      .map((s, idx) => ({ s, idx }))
      .sort((a, b) => a.s.localeCompare(b.s));
  }, [currentSylWord]);

  const builtWord = pickedSyllables.map((idx) => currentSylWord.syllables[idx]).join('');
  const isSylComplete = builtWord.toLowerCase() === currentSylWord.word.toLowerCase();

  // Match pairs
  const matchItems = useMemo(() => pool.slice(0, 5), [pool]);
  const shuffledRight = useMemo(
    () => [...matchItems].sort((a, b) => a.meaningVi.localeCompare(b.meaningVi)),
    [matchItems]
  );

  const handleMatchRight = (rightId: string) => {
    if (!selectedLeft || matchedIds.includes(rightId)) return;
    if (selectedLeft === rightId) {
      const next = [...matchedIds, rightId];
      setMatchedIds(next);
      setSelectedLeft(null);
      onAddXp(10);
      if (next.length === matchItems.length) {
        confetti({ particleCount: 50, spread: 60 });
      }
    } else {
      setSelectedLeft(null);
    }
  };

  const dueCount = Object.values(srsCards).filter((c) => c.nextReviewAt <= Date.now()).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Ôn Tập Ngắt Quãng (SRS) & Game Nhận Diện Mặt Chữ
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Củng cố trí nhớ dài hạn với Flashcard 3D (có <strong>{dueCount}</strong> từ cần ôn) và 3 trò chơi phản xạ mặt chữ.
          </p>
        </div>

        <div className="flex flex-wrap bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1">
          {[
            { id: 'flashcard', label: 'Flashcard 3D', icon: Layers },
            { id: 'sound2word', label: 'Nghe âm bắt chữ', icon: Headphones },
            { id: 'syllables', label: 'Ghép âm tiết', icon: Puzzle },
            { id: 'match', label: 'Nối từ siêu tốc', icon: Zap },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setGameMode(tab.id as any)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  gameMode === tab.id
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. FLASHCARD 3D */}
      {gameMode === 'flashcard' && currentCard && (
        <div className="max-w-xl mx-auto space-y-5">
          <div
            onClick={() => setFlipped(!flipped)}
            className="cursor-pointer perspective-1000 h-72 w-full"
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                flipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-900/60 shadow-lg p-6 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2">
                  Thẻ {cardIdx + 1}/{pool.length} — Bấm để lật xem nghĩa
                </span>
                <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  {currentCard.syllables.join(' · ')}
                </div>
                <div className="font-mono text-lg text-indigo-600 dark:text-indigo-400 mt-3">
                  {accent === 'en-US' ? currentCard.ipaUS : currentCard.ipaUK}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(currentCard.word, accent, 0.9);
                  }}
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-sm font-semibold hover:bg-indigo-100"
                >
                  <Volume2 className="w-4 h-4" /> Nghe phát âm
                </button>
              </div>

              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-lg p-6 flex flex-col items-center justify-center text-center">
                <div className="text-2xl font-extrabold mb-1">{currentCard.meaningVi}</div>
                <div className="text-xs opacity-80 mb-3">
                  ({currentCard.pos}) • Đọc gợi ý: {currentCard.vietPhonetic}
                </div>
                <p className="text-sm bg-white/15 rounded-xl p-3 max-w-md mb-3">
                  💡 {currentCard.mnemonic}
                </p>
                {currentCard.examples[0] && (
                  <p className="text-xs italic opacity-90">"{currentCard.examples[0].en}"</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { q: 0 as const, label: 'Quên (Học lại)', cls: 'bg-rose-100 text-rose-800 hover:bg-rose-200' },
              { q: 2 as const, label: 'Khó (1 ngày)', cls: 'bg-amber-100 text-amber-800 hover:bg-amber-200' },
              { q: 4 as const, label: 'Tốt (3 ngày)', cls: 'bg-sky-100 text-sky-800 hover:bg-sky-200' },
              { q: 5 as const, label: 'Dễ (7 ngày)', cls: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' },
            ].map((btn) => (
              <button
                key={btn.q}
                onClick={() => handleRate(btn.q)}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition ${btn.cls}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. SOUND TO WORD */}
      {gameMode === 'sound2word' && (
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 text-center space-y-5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Nghe phát âm và chọn đúng mặt chữ tiếng Anh
          </h3>
          <button
            onClick={() => speakText(targetQuizWord.word, accent, 0.9)}
            className="mx-auto inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md"
          >
            <Volume2 className="w-5 h-5" /> Bấm để nghe từ cần tìm
          </button>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {quizOptions.map((opt) => {
              const isPicked = quizChoice === opt.word;
              const isCorrect = opt.word === targetQuizWord.word;
              let btnCls = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400';
              if (quizChoice) {
                if (isCorrect) btnCls = 'bg-emerald-100 border-emerald-500 text-emerald-900';
                else if (isPicked) btnCls = 'bg-rose-100 border-rose-500 text-rose-900';
              }
              return (
                <button
                  key={opt.id}
                  disabled={Boolean(quizChoice)}
                  onClick={() => {
                    setQuizChoice(opt.word);
                    if (isCorrect) {
                      onAddXp(15);
                      confetti({ particleCount: 25, spread: 45 });
                    }
                  }}
                  className={`p-4 rounded-xl border-2 font-bold text-lg transition ${btnCls}`}
                >
                  {opt.word}
                </button>
              );
            })}
          </div>

          {quizChoice && (
            <div className="pt-2">
              <p className="text-xs text-slate-500 mb-3">
                Nghĩa: <strong>{targetQuizWord.meaningVi}</strong> ({targetQuizWord.ipaUS})
              </p>
              <button
                onClick={() => {
                  setQuizChoice(null);
                  setQuizIdx((i) => i + 1);
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
              >
                Câu tiếp theo →
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. SYLLABLE BUILDER */}
      {gameMode === 'syllables' && (
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 text-center space-y-5">
          <div>
            <span className="text-xs font-bold uppercase text-indigo-500">Ghép các âm tiết thành từ đúng</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              "{currentSylWord.meaningVi}"
            </h3>
            <p className="text-xs font-mono text-slate-500 mt-1">{currentSylWord.ipaUS}</p>
          </div>

          <div className="min-h-[56px] p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 flex-wrap">
            {pickedSyllables.length === 0 ? (
              <span className="text-xs text-slate-400">Bấm lần lượt vào các mảnh âm tiết bên dưới...</span>
            ) : (
              pickedSyllables.map((idx, pos) => (
                <span
                  key={pos}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-lg"
                >
                  {currentSylWord.syllables[idx]}
                </span>
              ))
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            {shuffledSyllables.map(({ s, idx }) => {
              const used = pickedSyllables.includes(idx);
              return (
                <button
                  key={idx}
                  disabled={used}
                  onClick={() => {
                    const next = [...pickedSyllables, idx];
                    setPickedSyllables(next);
                    if (next.map((i) => currentSylWord.syllables[i]).join('').toLowerCase() === currentSylWord.word.toLowerCase()) {
                      speakText(currentSylWord.word, accent, 0.9);
                      onAddXp(20);
                      confetti({ particleCount: 30, spread: 50 });
                    }
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-base hover:border-indigo-500 disabled:opacity-30"
                >
                  {s}
                </button>
              );
            })}
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setPickedSyllables([])}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
            >
              <RotateCw className="w-3.5 h-3.5" /> Làm lại
            </button>
            {isSylComplete && (
              <button
                onClick={() => {
                  setPickedSyllables([]);
                  setSylWordIdx((i) => i + 1);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                Chính xác! Từ tiếp theo →
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. SPEED MATCH */}
      {gameMode === 'match' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white">
              Chọn 1 từ tiếng Anh bên trái rồi nối với nghĩa tiếng Việt bên phải
            </h3>
            <button
              onClick={() => {
                setMatchedIds([]);
                setSelectedLeft(null);
              }}
              className="text-xs font-semibold text-indigo-600"
            >
              Chơi lại ↻
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2.5">
              {matchItems.map((item) => {
                const done = matchedIds.includes(item.id);
                const active = selectedLeft === item.id;
                return (
                  <button
                    key={item.id}
                    disabled={done}
                    onClick={() => {
                      setSelectedLeft(item.id);
                      speakText(item.word, accent, 0.9);
                    }}
                    className={`w-full p-3 rounded-xl border text-left font-bold transition ${
                      done
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700 opacity-60'
                        : active
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {done && <CheckCircle2 className="w-4 h-4 inline mr-1.5" />}
                    {item.word}
                  </button>
                );
              })}
            </div>

            <div className="space-y-2.5">
              {shuffledRight.map((item) => {
                const done = matchedIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    disabled={done}
                    onClick={() => handleMatchRight(item.id)}
                    className={`w-full p-3 rounded-xl border text-left text-sm transition ${
                      done
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700 opacity-60'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    {item.meaningVi}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
