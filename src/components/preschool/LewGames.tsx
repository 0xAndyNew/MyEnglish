import { CheckCircle2, Sparkles, Volume2 } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import type { LewAgeLevelMeta } from '../../data/preschool/lewLevels';
import { LEW_TOPICS } from '../../data/preschool/lewTopics';
import type { LewTopic, LewVocabItem } from '../../data/preschool/lewTypes';
import { wordImageUrl } from '../../data/preschool/types';
import type { useKidAudio } from './ui/useKidAudio';

export type LewGameMode = 'match' | 'missing' | 'sort' | 'move' | 'listen';

interface LewGamesProps {
  topic: LewTopic;
  words: LewVocabItem[];
  levelMeta: LewAgeLevelMeta;
  audio: ReturnType<typeof useKidAudio>;
  onCompleteGame: () => void;
}

const GAME_TABS: { id: LewGameMode; labelVi: string; subVi: string; minLevel: number }[] = [
  { id: 'listen', labelVi: '👂 Nghe & Tìm hình', subVi: 'Listen & Find', minLevel: 1 },
  { id: 'match', labelVi: '🧩 Ghép cặp hình', subVi: 'Match the Picture', minLevel: 2 },
  { id: 'missing', labelVi: '🙈 Hình nào trốn mất?', subVi: "What's Missing?", minLevel: 2 },
  { id: 'sort', labelVi: '🧺 Phân loại nhóm', subVi: 'Sort by Category', minLevel: 3 },
  { id: 'move', labelVi: '🤸 Vận động cùng cha mẹ', subVi: 'Move & Say', minLevel: 1 },
];

export const LewGames: React.FC<LewGamesProps> = ({
  topic,
  words,
  levelMeta,
  audio,
  onCompleteGame,
}) => {
  const defaultMode: LewGameMode = levelMeta.id === 'level1' ? 'move' : 'match';
  const [mode, setMode] = useState<LewGameMode>(defaultMode);
  const [feedback, setFeedback] = useState<string | null>(null);

  // --- 1. LISTEN & FIND ---
  const [listenIdx, setListenIdx] = useState(0);
  const listenTarget = words[listenIdx % words.length];
  const listenChoices = useMemo(() => {
    const others = words.filter((w) => w.id !== listenTarget.id).slice(0, levelMeta.maxChoices - 1);
    const list = [listenTarget, ...others];
    return list.sort((a, b) => a.id.localeCompare(b.id));
  }, [listenTarget, words, levelMeta.maxChoices]);

  // --- 2. MATCH THE PICTURE ---
  const matchPool = useMemo(() => words.slice(0, 3), [words]);
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const rightMatchPool = useMemo(() => [...matchPool].reverse(), [matchPool]);

  // --- 3. WHAT'S MISSING? ---
  const missingPool = useMemo(() => words.slice(0, 3), [words]);
  const [missingHiddenIdx, setMissingHiddenIdx] = useState(0);
  const [missingRevealed, setMissingRevealed] = useState(false);

  // --- 4. SORT BY CATEGORY ---
  const contrastTopic = useMemo(
    () => LEW_TOPICS.find((t) => t.id !== topic.id) || LEW_TOPICS[0],
    [topic.id]
  );
  const sortItems = useMemo(() => {
    const a = words.slice(0, 2).map((w) => ({ word: w, group: 'current' as const }));
    const b = contrastTopic.words.slice(0, 2).map((w) => ({ word: w, group: 'other' as const }));
    return [a[0], b[0], a[1], b[1]].filter(Boolean);
  }, [words, contrastTopic]);
  const [sortIdx, setSortIdx] = useState(0);
  const [sortedCount, setSortedCount] = useState(0);

  // --- 5. MOVE & SAY ---
  const moveActions = topic.levels[levelMeta.id].moveAndSay;
  const [doneMoveIdx, setDoneMoveIdx] = useState<number[]>([]);

  useEffect(() => {
    setFeedback(null);
    if (mode === 'listen' && listenTarget) {
      audio.speak(`Where is the ${listenTarget.word}?`, 0.82);
    } else if (mode === 'missing' && missingPool[missingHiddenIdx]) {
      setMissingRevealed(false);
      audio.speak("Look closely! What's missing?", 0.85);
    } else if (mode === 'move' && moveActions[0]) {
      audio.speak(moveActions[0].en, 0.85);
    }
  }, [mode, listenIdx, missingHiddenIdx]);

  const praise = (msgVi: string, speakEn: string) => {
    audio.playSfx('ding');
    setFeedback(msgVi);
    audio.speak(speakEn, 0.85);
  };

  const gentleRetry = (speakEn: string) => {
    audio.playSfx('tap');
    setFeedback('Thử lại nhẹ nhàng cùng bé nhé!');
    audio.speak(speakEn, 0.8);
  };

  return (
    <div className="space-y-5">
      {/* Mode selector pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {GAME_TABS.map((tab) => {
          const active = mode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
              className={`px-4 py-2.5 rounded-2xl border-2 text-left transition flex items-center gap-2 ${
                active
                  ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-sm font-extrabold'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 font-bold'
              }`}
            >
              <span className="text-sm">{tab.labelVi}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback toast */}
      {feedback && (
        <div className="mx-auto max-w-md px-4 py-2 rounded-full bg-emerald-50 border-2 border-emerald-200 text-emerald-800 text-center text-sm font-extrabold animate-kid-pop">
          🌟 {feedback}
        </div>
      )}

      {/* GAME 1: LISTEN & FIND */}
      {mode === 'listen' && listenTarget && (
        <div className="bg-white rounded-[32px] border-4 border-amber-100 p-6 text-center space-y-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => audio.speak(`Where is the ${listenTarget.word}?`, 0.8)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-extrabold text-xl shadow-sm"
            >
              <Volume2 className="w-6 h-6" />
              <span>Where is the &ldquo;{listenTarget.word}&rdquo;?</span>
            </button>
          </div>
          <p className="text-xs font-bold text-slate-500">
            Cha mẹ hỏi bé: &ldquo;Hình <strong>{listenTarget.meaningVi}</strong> ở đâu nhỉ?&rdquo; ({listenIdx + 1}/{words.length})
          </p>

          <div
            className={`grid gap-4 max-w-2xl mx-auto ${
              listenChoices.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'
            }`}
          >
            {listenChoices.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === listenTarget.id) {
                    praise(`Đúng rồi! ${item.word} (${item.meaningVi})`, `Yes! ${item.word}!`);
                    window.setTimeout(() => {
                      if (listenIdx < words.length - 1) setListenIdx((i) => i + 1);
                      else onCompleteGame();
                    }, 900);
                  } else {
                    gentleRetry(`Let's find ${listenTarget.word}`);
                  }
                }}
                className="rounded-3xl bg-white hover:bg-amber-50 border-4 border-slate-100 hover:border-amber-400 overflow-hidden flex flex-col items-center shadow-md active:scale-95 transition"
              >
                <div className="w-full h-44 sm:h-52 bg-white p-3 flex items-center justify-center">
                  <img
                    src={wordImageUrl(item.imageSlug)}
                    alt={item.word}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="py-2.5 font-kid font-extrabold text-xl text-slate-800">
                  {item.word}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GAME 2: MATCH THE PICTURE */}
      {mode === 'match' && (
        <div className="bg-white rounded-[32px] border-4 border-sky-100 p-6 text-center space-y-4 shadow-sm">
          <div className="font-kid font-extrabold text-xl sm:text-2xl text-slate-800">
            🧩 Chạm 1 hình bên trái rồi chạm hình giống hệt bên phải!
          </div>
          <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="space-y-3">
              {matchPool.map((w) => {
                const done = matchedIds.includes(w.id);
                const selected = selectedLeftId === w.id;
                return (
                  <button
                    key={w.id}
                    type="button"
                    disabled={done}
                    onClick={() => {
                      setSelectedLeftId(w.id);
                      audio.speak(w.word, 0.82);
                    }}
                    className={`w-full p-3 rounded-2xl border-4 flex items-center gap-3 transition ${
                      done
                        ? 'bg-emerald-50 border-emerald-300 opacity-50'
                        : selected
                        ? 'bg-amber-50 border-amber-400 scale-[1.02]'
                        : 'bg-slate-50 border-slate-200 hover:border-sky-300'
                    }`}
                  >
                    <img
                      src={wordImageUrl(w.imageSlug)}
                      alt={w.word}
                      className="w-20 h-20 rounded-xl bg-white p-1.5 border border-slate-100 object-contain shrink-0"
                    />
                    <div className="text-left">
                      <div className="font-kid font-extrabold text-lg text-slate-800">{w.word}</div>
                      <div className="text-xs font-bold text-slate-400">{w.meaningVi}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-3">
              {rightMatchPool.map((w) => {
                const done = matchedIds.includes(w.id);
                return (
                  <button
                    key={w.id}
                    type="button"
                    disabled={done}
                    onClick={() => {
                      if (!selectedLeftId) {
                        audio.speak(w.word, 0.82);
                        setSelectedLeftId(w.id);
                        return;
                      }
                      if (selectedLeftId === w.id) {
                        const next = [...matchedIds, w.id];
                        setMatchedIds(next);
                        setSelectedLeftId(null);
                        praise(`Ghép đúng ${w.word}!`, `Great match! ${w.word}!`);
                        if (next.length >= matchPool.length) {
                          window.setTimeout(onCompleteGame, 900);
                        }
                      } else {
                        gentleRetry(w.word);
                      }
                    }}
                    className={`w-full p-2.5 rounded-2xl border-4 flex items-center justify-center transition ${
                      done
                        ? 'bg-emerald-50 border-emerald-300 opacity-50'
                        : 'bg-sky-50/50 border-sky-200 hover:border-sky-400'
                    }`}
                  >
                    <img
                      src={wordImageUrl(w.imageSlug)}
                      alt={w.word}
                      className="w-20 h-20 rounded-xl bg-white p-1.5 border border-slate-100 object-contain"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* GAME 3: WHAT'S MISSING? */}
      {mode === 'missing' && (
        <div className="bg-white rounded-[32px] border-4 border-purple-100 p-6 text-center space-y-5 shadow-sm">
          <div className="font-kid font-extrabold text-xl sm:text-2xl text-slate-800">
            🙈 Bạn nào đang trốn sau đám mây nhỉ?
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            {missingPool.map((w, idx) => {
              const isHidden = idx === missingHiddenIdx && !missingRevealed;
              return (
                <div
                  key={w.id}
                  className="p-4 rounded-3xl bg-purple-50/50 border-4 border-purple-100 flex flex-col items-center justify-center min-h-[150px]"
                >
                  {isHidden ? (
                    <div className="text-center space-y-1">
                      <span className="text-5xl">☁️❓</span>
                      <div className="text-xs font-extrabold text-purple-700">Ai trốn đây?</div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={wordImageUrl(w.imageSlug)}
                        alt={w.word}
                        className="w-32 h-32 rounded-2xl bg-white p-2 border border-purple-100 object-contain"
                      />
                      <span className="font-kid font-extrabold text-base text-slate-800 mt-1.5">
                        {w.word}
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-xs font-bold text-slate-500">Chạm vào hình đang trốn bên dưới:</div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {missingPool.map((w, idx) => (
              <button
                key={w.id}
                type="button"
                onClick={() => {
                  if (idx === missingHiddenIdx) {
                    setMissingRevealed(true);
                    praise(`Tìm thấy ${w.word} rồi!`, `Peekaboo! It's ${w.word}!`);
                    window.setTimeout(() => {
                      if (missingHiddenIdx < missingPool.length - 1) {
                        setMissingHiddenIdx((i) => i + 1);
                      } else {
                        onCompleteGame();
                      }
                    }, 950);
                  } else {
                    gentleRetry(`Look again!`);
                  }
                }}
                className="px-4 py-2.5 rounded-2xl bg-white border-2 border-purple-200 hover:border-purple-400 flex items-center gap-2.5 shadow-sm"
              >
                <img
                  src={wordImageUrl(w.imageSlug)}
                  alt={w.word}
                  className="w-14 h-14 rounded-xl bg-white p-1 border border-slate-100 object-contain"
                />
                <span className="font-kid font-extrabold text-base text-slate-800">{w.word}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GAME 4: SORT BY CATEGORY */}
      {mode === 'sort' && sortItems[sortIdx] && (
        <div className="bg-white rounded-[32px] border-4 border-emerald-100 p-6 text-center space-y-5 shadow-sm">
          <div className="font-kid font-extrabold text-xl sm:text-2xl text-slate-800">
            🧺 Đưa hình về đúng giỏ chủ đề nhé! ({sortedCount}/{sortItems.length})
          </div>

          <div className="mx-auto w-56 rounded-3xl bg-white border-4 border-amber-200 overflow-hidden flex flex-col items-center shadow-md">
            <div className="w-full h-44 bg-white p-3 flex items-center justify-center">
              <img
                src={wordImageUrl(sortItems[sortIdx].word.imageSlug)}
                alt={sortItems[sortIdx].word.word}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="py-2 font-kid font-extrabold text-lg text-slate-800">
              {sortItems[sortIdx].word.word}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            <button
              type="button"
              onClick={() => {
                if (sortItems[sortIdx].group === 'current') {
                  praise(`Đúng giỏ ${topic.titleVi}!`, topic.titleEn);
                  const nextCount = sortedCount + 1;
                  setSortedCount(nextCount);
                  if (sortIdx < sortItems.length - 1) setSortIdx((i) => i + 1);
                  else window.setTimeout(onCompleteGame, 700);
                } else {
                  gentleRetry(sortItems[sortIdx].word.word);
                }
              }}
              className="p-4 rounded-3xl bg-emerald-50 hover:bg-emerald-100 border-4 border-emerald-300 font-kid font-extrabold text-lg text-emerald-900 shadow-sm"
            >
              🧺 Giỏ 1: {topic.titleVi}
              <div className="text-xs font-bold opacity-75">{topic.titleEn}</div>
            </button>

            <button
              type="button"
              onClick={() => {
                if (sortItems[sortIdx].group === 'other') {
                  praise(`Đúng giỏ ${contrastTopic.titleVi}!`, contrastTopic.titleEn);
                  const nextCount = sortedCount + 1;
                  setSortedCount(nextCount);
                  if (sortIdx < sortItems.length - 1) setSortIdx((i) => i + 1);
                  else window.setTimeout(onCompleteGame, 700);
                } else {
                  gentleRetry(sortItems[sortIdx].word.word);
                }
              }}
              className="p-4 rounded-3xl bg-sky-50 hover:bg-sky-100 border-4 border-sky-300 font-kid font-extrabold text-lg text-sky-900 shadow-sm"
            >
              🧺 Giỏ 2: {contrastTopic.titleVi}
              <div className="text-xs font-bold opacity-75">{contrastTopic.titleEn}</div>
            </button>
          </div>
        </div>
      )}

      {/* GAME 5: MOVE & SAY (OFF-SCREEN ACTION WITH PARENT) */}
      {mode === 'move' && (
        <div className="bg-white rounded-[32px] border-4 border-pink-100 p-6 space-y-4 shadow-sm">
          <div className="text-center">
            <div className="font-kid font-extrabold text-2xl text-slate-800">
              🤸 Move & Say — Nghe câu lệnh và vận động cùng cha mẹ!
            </div>
            <p className="text-xs font-bold text-slate-500 mt-1">
              Cha mẹ bấm loa nghe câu mẫu rồi cùng bé làm động tác ngoài đời thật (không cần nhìn màn hình).
            </p>
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            {moveActions.map((act, idx) => {
              const done = doneMoveIdx.includes(idx);
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border-2 flex flex-wrap items-center justify-between gap-3 transition ${
                    done ? 'bg-emerald-50 border-emerald-300' : 'bg-pink-50/40 border-pink-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-kid font-extrabold text-xl text-slate-800">{act.en}</div>
                    <div className="text-xs font-bold text-slate-600">{act.vi}</div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold">
                      👐 Động tác: {act.actionVi}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => audio.speak(act.en, 0.82)}
                      className="px-3.5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs inline-flex items-center gap-1.5"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!done) setDoneMoveIdx((prev) => [...prev, idx]);
                        praise('Hai mẹ con làm giỏi quá!', 'Awesome job!');
                      }}
                      className={`px-3.5 py-2.5 rounded-xl font-bold text-xs inline-flex items-center gap-1 ${
                        done
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-emerald-50'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{done ? 'Đã tập' : 'Đánh dấu'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onCompleteGame}
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-kid font-extrabold text-lg inline-flex items-center gap-2 shadow-md"
            >
              <Sparkles className="w-5 h-5" />
              <span>Hoàn thành phần Trò chơi →</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
