import { BookOpen, Check, CheckCircle2, Clock, Gamepad2, RotateCcw, Sparkles, Volume2 } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import type { LewAgeLevelMeta } from '../../data/preschool/lewLevels';
import { LEW_TOPICS } from '../../data/preschool/lewTopics';
import type { LewTopic, LewVocabItem } from '../../data/preschool/lewTypes';
import { wordImageUrl } from '../../data/preschool/types';
import { KidsRobotHelper } from './ui/KidsSceneShell';
import type { useKidAudio } from './ui/useKidAudio';

export type LewGameMode = 'listen' | 'match' | 'missing' | 'sort' | 'story_order' | 'move';

interface LewGamesProps {
  topic: LewTopic;
  allTopics?: LewTopic[];
  words: LewVocabItem[];
  levelMeta: LewAgeLevelMeta;
  audio: ReturnType<typeof useKidAudio>;
  initialMode?: LewGameMode;
  onGameAttempt?: () => void;
  onAudioReplay?: () => void;
  onCompleteGame: () => void;
}

const GAME_TABS: { id: LewGameMode; labelVi: string; ageHintVi: string }[] = [
  { id: 'listen', labelVi: '👂 Chọn hình đúng', ageHintVi: '2–6t' },
  { id: 'match', labelVi: '🧩 Ghép cặp', ageHintVi: '3–6t' },
  { id: 'missing', labelVi: '🙈 Hình trốn mất', ageHintVi: '3–6t' },
  { id: 'sort', labelVi: '🧺 Phân loại', ageHintVi: '3–6t' },
  { id: 'story_order', labelVi: '📖 Xếp tranh', ageHintVi: '4–6t' },
  { id: 'move', labelVi: '🤸 Vận động', ageHintVi: '1–6t' },
];

export const LewGames: React.FC<LewGamesProps> = ({
  topic,
  allTopics = LEW_TOPICS,
  words,
  levelMeta,
  audio,
  initialMode,
  onGameAttempt,
  onAudioReplay,
  onCompleteGame,
}) => {
  const allowedModes = topic.enabledActivities?.enabledGameModes;
  const visibleTabs = useMemo(() => {
    if (!Array.isArray(allowedModes) || allowedModes.length === 0) return GAME_TABS;
    const filtered = GAME_TABS.filter((t) => allowedModes.includes(t.id));
    return filtered.length > 0 ? filtered : GAME_TABS;
  }, [allowedModes]);

  const defaultMode: LewGameMode = useMemo(() => {
    if (initialMode && visibleTabs.some((t) => t.id === initialMode)) return initialMode;
    const preferred: LewGameMode = levelMeta.id === 'level1' ? 'move' : 'listen';
    return visibleTabs.some((t) => t.id === preferred) ? preferred : visibleTabs[0].id;
  }, [initialMode, levelMeta.id, visibleTabs]);

  const [mode, setMode] = useState<LewGameMode>(defaultMode);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [roundScore, setRoundScore] = useState<number>(10);
  const [elapsedSec, setElapsedSec] = useState<number>(0);

  // Calm playful elapsed seconds indicator (never penalizes child)
  useEffect(() => {
    const id = window.setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  // --- 1. LISTEN & FIND (Exact Mockup #4) ---
  const [listenIdx, setListenIdx] = useState(0);
  const [listenMatchedId, setListenMatchedId] = useState<string | null>(null);
  const listenTarget = words[listenIdx % words.length];
  const listenChoices = useMemo(() => {
    const count = Math.min(words.length, levelMeta.maxChoices === 2 ? 2 : 3);
    const others = words.filter((w) => w.id !== listenTarget.id).slice(0, count - 1);
    return [listenTarget, ...others].sort((a, b) => a.id.localeCompare(b.id));
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
    () =>
      allTopics.find((t) => t.id !== topic.id) ||
      LEW_TOPICS.find((t) => t.id !== topic.id) ||
      LEW_TOPICS[0],
    [allTopics, topic.id]
  );
  const sortItems = useMemo(() => {
    const a = words.slice(0, 2).map((w) => ({ word: w, group: 'current' as const }));
    const b = contrastTopic.words.slice(0, 2).map((w) => ({ word: w, group: 'other' as const }));
    return [a[0], b[0], a[1], b[1]].filter(Boolean);
  }, [words, contrastTopic]);
  const [sortIdx, setSortIdx] = useState(0);
  const [sortedCount, setSortedCount] = useState(0);

  // --- 5. STORY ORDER ---
  const storyPages = useMemo(() => {
    const raw = topic.levels[levelMeta.id]?.storyPages || [];
    if (raw.length >= 2) return raw.slice(0, 4);
    return words.slice(0, 3).map((w) => ({
      imageSlug: w.imageSlug,
      en: w.sampleEn,
      vi: w.sampleVi,
    }));
  }, [topic, levelMeta.id, words]);

  const scrambledStory = useMemo(() => {
    const indexed = storyPages.map((p, idx) => ({ ...p, orderIndex: idx }));
    return [...indexed].reverse();
  }, [storyPages]);
  const [storyPlacedCount, setStoryPlacedCount] = useState(0);

  // --- 6. MOVE & SAY ---
  const moveActions = topic.levels[levelMeta.id]?.moveAndSay || [];
  const [doneMoveIdx, setDoneMoveIdx] = useState<number[]>([]);

  useEffect(() => {
    setFeedback(null);
    setListenMatchedId(null);
    if (mode === 'listen' && listenTarget) {
      audio.speak(`Where is the ${listenTarget.word}?`, 0.82);
    } else if (mode === 'missing' && missingPool[missingHiddenIdx]) {
      setMissingRevealed(false);
      audio.speak("Look closely! What's missing?", 0.85);
    } else if (mode === 'story_order' && storyPages[0]) {
      audio.speak(storyPages[0].en, 0.84);
    } else if (mode === 'move' && moveActions[0]) {
      audio.speak(moveActions[0].en, 0.85);
    }
  }, [mode, listenIdx, missingHiddenIdx, topic.id]);

  const praise = (msgVi: string, speakEn: string) => {
    onGameAttempt?.();
    setRoundScore((s) => s + 10);
    audio.playSfx('ding');
    setFeedback(msgVi);
    audio.speak(speakEn, 0.85);
  };

  const gentleRetry = (speakEn: string, hintVi = 'Thử lại nhẹ nhàng cùng bé nhé!') => {
    onGameAttempt?.();
    audio.playSfx('tap');
    setFeedback(hintVi);
    audio.speak(speakEn, 0.8);
  };

  return (
    <div className="space-y-4">
      {/* Game HUD Row matching Mockup #4: Timer | Trò chơi | +10 */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border-2 border-white shadow-sm text-[#123A6F] font-extrabold text-sm">
          <Clock className="w-4 h-4 text-[#FF9F43]" />
          <span>{elapsedSec}s</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 border-2 border-white shadow-sm text-[#123A6F] font-extrabold text-base">
          <Gamepad2 className="w-5 h-5 text-[#2EC24B]" />
          <span>Trò chơi</span>
        </div>

        <div className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#FFF2B5] border-2 border-white shadow-sm text-[#A85B00] font-extrabold text-sm">
          <span>+{roundScore}</span>
        </div>
      </div>

      {/* Compact Game Mode Switcher Pills */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {visibleTabs.map((tab) => {
          const active = mode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
              className={`px-3 py-1.5 rounded-full border-2 text-xs font-extrabold transition ${
                active
                  ? 'bg-[#1684F0] text-white border-white shadow-md scale-105'
                  : 'bg-white/85 text-[#2B5382] border-white hover:bg-white'
              }`}
            >
              {tab.labelVi}
            </button>
          );
        })}
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className="mx-auto max-w-md px-4 py-2 rounded-full bg-[#E8FBEE] border-2 border-[#5CE06D] text-[#146D28] text-center text-sm font-extrabold shadow-sm animate-kid-pop">
          🌟 {feedback}
        </div>
      )}

      {/* GAME 1: LISTEN & FIND — Exact Mockup #4 ("Chọn hình đúng với từ 'Cat'") */}
      {mode === 'listen' && listenTarget && (
        <div className="space-y-4 text-center">
          {/* Sunny Yellow Question Banner */}
          <button
            type="button"
            onClick={() => {
              onAudioReplay?.();
              audio.speak(listenTarget.word, 0.8);
            }}
            className="kids-banner-yellow mx-auto w-full max-w-lg rounded-[26px] px-5 py-3.5 flex items-center justify-center gap-3 active:scale-[0.98] transition"
          >
            <div className="text-center">
              <div className="font-kid font-extrabold text-xl sm:text-2xl text-[#143A6B] leading-snug">
                Chọn hình đúng với từ &ldquo;{listenTarget.word}&rdquo;
              </div>
              <div className="text-xs font-bold text-[#7A5400]">
                Chạm để nghe lại ({listenIdx + 1}/{words.length})
              </div>
            </div>
            <span className="kids-btn-blue w-10 h-10 rounded-full text-white flex items-center justify-center shrink-0">
              <Volume2 className="w-5 h-5" />
            </span>
          </button>

          {/* Center Big Focal Character Stage matching Mockup #4 */}
          <div className="mx-auto max-w-xs sm:max-w-sm py-1 flex flex-col items-center justify-center">
            {listenMatchedId === listenTarget.id ? (
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-[34px] bg-white/95 border-4 border-[#5CE06D] shadow-xl p-4 flex items-center justify-center animate-kid-pop">
                <img
                  src={wordImageUrl(listenTarget.imageSlug)}
                  alt={listenTarget.word}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onAudioReplay?.();
                  audio.speak(`Find the ${listenTarget.word}!`, 0.82);
                }}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white/80 border-4 border-white shadow-lg flex items-center justify-center group-hover:scale-105 transition">
                  <KidsRobotHelper mood="happy" className="w-28 h-28 sm:w-36 sm:h-36" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-white/90 text-[#123A6F] text-xs font-extrabold shadow-xs">
                  Nghe & chọn hình bên dưới nhé! 👇
                </span>
              </button>
            )}
          </div>

          {/* Bottom 2 or 3 Chunky Rounded Answer Cards with Green Checkmark Badge */}
          <div
            className={`grid gap-3 sm:gap-4 max-w-xl mx-auto ${
              listenChoices.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
            }`}
          >
            {listenChoices.map((item) => {
              const isMatched = listenMatchedId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (listenMatchedId) return;
                    if (item.id === listenTarget.id) {
                      setListenMatchedId(item.id);
                      praise(
                        `Xuất sắc! Đúng là ${item.word} (${item.meaningVi})!`,
                        `Yes! ${item.word}!`
                      );
                      window.setTimeout(() => {
                        setListenMatchedId(null);
                        if (listenIdx < words.length - 1) setListenIdx((i) => i + 1);
                        else onCompleteGame();
                      }, 950);
                    } else {
                      gentleRetry(`Let's find ${listenTarget.word}`);
                    }
                  }}
                  className={`relative rounded-[26px] bg-white p-2.5 sm:p-3.5 border-4 flex flex-col items-center shadow-lg active:scale-95 transition ${
                    isMatched
                      ? 'border-[#33C450] bg-[#EEFFF2] scale-105'
                      : 'border-white hover:border-[#4DC0FF]'
                  }`}
                >
                  {isMatched && (
                    <span className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-[#2EC24B] border-2 border-white text-white flex items-center justify-center shadow-md animate-kid-pop">
                      <Check className="w-5 h-5 stroke-[3.5]" />
                    </span>
                  )}
                  <div className="w-full h-28 sm:h-36 flex items-center justify-center">
                    <img
                      src={wordImageUrl(item.imageSlug)}
                      alt={item.word}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="mt-1 font-kid font-extrabold text-sm sm:text-lg text-[#123A6F]">
                    {item.word}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* GAME 2: MATCH THE PICTURE */}
      {mode === 'match' && (
        <div className="kids-glass-card rounded-[32px] p-5 text-center space-y-4">
          <div className="kids-banner-yellow mx-auto max-w-lg rounded-2xl px-4 py-2.5 font-kid font-extrabold text-base sm:text-xl text-[#143A6B]">
            🧩 Chạm 1 hình bên trái rồi chạm hình giống hệt bên phải!
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-xl mx-auto">
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
                      onAudioReplay?.();
                      audio.speak(w.word, 0.82);
                    }}
                    className={`relative w-full p-2.5 rounded-2xl border-4 flex items-center gap-2.5 transition ${
                      done
                        ? 'bg-[#EEFFF2] border-[#5CE06D] opacity-60'
                        : selected
                        ? 'bg-[#FFF7CC] border-[#FFB636] scale-[1.03] shadow-md'
                        : 'bg-white border-[#DDF0FF] hover:border-[#4DC0FF]'
                    }`}
                  >
                    <img
                      src={wordImageUrl(w.imageSlug)}
                      alt={w.word}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white p-1 object-contain shrink-0"
                    />
                    <div className="text-left min-w-0">
                      <div className="font-kid font-extrabold text-base sm:text-lg text-[#123A6F] truncate">
                        {w.word}
                      </div>
                      <div className="text-xs font-bold text-[#5C7FA6] truncate">{w.meaningVi}</div>
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
                        onAudioReplay?.();
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
                    className={`relative w-full p-2.5 rounded-2xl border-4 flex items-center justify-center transition ${
                      done
                        ? 'bg-[#EEFFF2] border-[#5CE06D] opacity-60'
                        : 'bg-[#EFF9FF] border-[#BAE2FF] hover:border-[#2498F8]'
                    }`}
                  >
                    {done && (
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#2EC24B] text-white flex items-center justify-center shadow">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    )}
                    <img
                      src={wordImageUrl(w.imageSlug)}
                      alt={w.word}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white p-1 object-contain"
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
        <div className="kids-glass-card rounded-[32px] p-5 text-center space-y-4">
          <div className="kids-banner-yellow mx-auto max-w-lg rounded-2xl px-4 py-2.5 font-kid font-extrabold text-base sm:text-xl text-[#143A6B]">
            🙈 Hình nào đang trốn sau đám mây nhỉ?
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
            {missingPool.map((w, idx) => {
              const isHidden = idx === missingHiddenIdx && !missingRevealed;
              return (
                <div
                  key={w.id}
                  className="p-3 rounded-[24px] bg-[#F2F8FF] border-3 border-[#CBE7FF] flex flex-col items-center justify-center min-h-[140px]"
                >
                  {isHidden ? (
                    <div className="text-center space-y-1">
                      <span className="text-4xl sm:text-5xl">☁️❓</span>
                      <div className="text-xs font-extrabold text-[#1674DA]">Ai trốn đây?</div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={wordImageUrl(w.imageSlug)}
                        alt={w.word}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-1.5 object-contain"
                      />
                      <span className="font-kid font-extrabold text-sm sm:text-base text-[#123A6F] mt-1">
                        {w.word}
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-xs font-extrabold text-[#4B75A5]">
            Chạm vào đáp án đúng bên dưới:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
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
                    gentleRetry('Look again!');
                  }
                }}
                className="px-4 py-2 rounded-2xl bg-white border-3 border-[#BEE2FF] hover:border-[#2498F8] flex items-center gap-2 shadow-sm active:scale-95 transition"
              >
                <img
                  src={wordImageUrl(w.imageSlug)}
                  alt={w.word}
                  className="w-12 h-12 rounded-xl object-contain"
                />
                <span className="font-kid font-extrabold text-base text-[#123A6F]">{w.word}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GAME 4: SORT BY CATEGORY */}
      {mode === 'sort' && sortItems[sortIdx] && (
        <div className="kids-glass-card rounded-[32px] p-5 text-center space-y-4">
          <div className="kids-banner-yellow mx-auto max-w-lg rounded-2xl px-4 py-2.5 font-kid font-extrabold text-base sm:text-xl text-[#143A6B]">
            🧺 Đưa hình về đúng giỏ chủ đề nhé! ({sortedCount}/{sortItems.length})
          </div>

          <div className="mx-auto w-48 rounded-[28px] bg-white border-4 border-[#FFE074] overflow-hidden flex flex-col items-center shadow-md p-3">
            <div className="w-36 h-36 flex items-center justify-center">
              <img
                src={wordImageUrl(sortItems[sortIdx].word.imageSlug)}
                alt={sortItems[sortIdx].word.word}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="pt-1 font-kid font-extrabold text-lg text-[#123A6F]">
              {sortItems[sortIdx].word.word}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5 max-w-lg mx-auto">
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
              className="p-4 rounded-[24px] bg-[#DDF5C3] hover:bg-[#CEEEAD] border-3 border-[#8CE352] font-kid font-extrabold text-base sm:text-lg text-[#1A5E14] shadow-sm active:scale-95 transition"
            >
              🧺 {topic.titleVi}
              <div className="text-xs font-bold opacity-80">({topic.titleEn})</div>
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
              className="p-4 rounded-[24px] bg-[#CBEFFF] hover:bg-[#B2E4FF] border-3 border-[#6CC8FF] font-kid font-extrabold text-base sm:text-lg text-[#0E4D8A] shadow-sm active:scale-95 transition"
            >
              🧺 {contrastTopic.titleVi}
              <div className="text-xs font-bold opacity-80">({contrastTopic.titleEn})</div>
            </button>
          </div>
        </div>
      )}

      {/* GAME 5: STORY ORDER */}
      {mode === 'story_order' && (
        <div className="kids-glass-card rounded-[32px] p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="font-kid font-extrabold text-lg sm:text-xl text-[#123A6F] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#1684F0]" />
              <span>📖 Xếp tranh theo thứ tự câu chuyện</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setStoryPlacedCount(0);
                setFeedback(null);
                if (storyPages[0]) audio.speak(storyPages[0].en, 0.84);
              }}
              className="px-3 py-1.5 rounded-full bg-[#E5F4FF] text-xs font-extrabold text-[#1674DA] inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xếp lại</span>
            </button>
          </div>

          {storyPages[storyPlacedCount] && (
            <button
              type="button"
              onClick={() => {
                onAudioReplay?.();
                audio.speak(storyPages[storyPlacedCount].en, 0.84);
              }}
              className="kids-banner-yellow w-full p-3.5 rounded-2xl flex items-center justify-between gap-3 text-left"
            >
              <div>
                <div className="text-xs font-extrabold text-[#8A5400]">
                  Tìm tranh số {storyPlacedCount + 1} / {storyPages.length}
                </div>
                <div className="text-base sm:text-lg font-extrabold text-[#143A6B]">
                  &ldquo;{storyPages[storyPlacedCount].en}&rdquo;
                </div>
                <div className="text-xs font-bold text-[#6E5000]">
                  {storyPages[storyPlacedCount].vi}
                </div>
              </div>
              <span className="kids-btn-blue w-10 h-10 rounded-full text-white flex items-center justify-center shrink-0">
                <Volume2 className="w-5 h-5" />
              </span>
            </button>
          )}

          <div
            className={`grid gap-2.5 ${
              storyPages.length <= 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
            }`}
          >
            {storyPages.map((pg, idx) => {
              const isPlaced = idx < storyPlacedCount;
              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-2xl border-3 flex flex-col items-center justify-center min-h-[120px] text-center transition ${
                    isPlaced
                      ? 'bg-[#EEFFF2] border-[#5CE06D]'
                      : idx === storyPlacedCount
                      ? 'bg-[#FFFBE0] border-[#FFD028] border-dashed'
                      : 'bg-[#F5FAFF] border-[#D3E8FA] border-dashed'
                  }`}
                >
                  <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-black text-[#123A6F] mb-1">
                    Tranh {idx + 1}
                  </span>
                  {isPlaced ? (
                    <img
                      src={wordImageUrl(pg.imageSlug)}
                      alt={pg.en}
                      className="w-20 h-20 rounded-xl bg-white p-1 object-contain"
                    />
                  ) : (
                    <span className="text-[11px] font-bold text-[#7C9BBF]">
                      {idx === storyPlacedCount ? 'Chọn bên dưới ↓' : 'Chờ xếp...'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div
            className={`grid gap-2.5 ${
              scrambledStory.length <= 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
            }`}
          >
            {scrambledStory.map((card) => {
              const alreadyUsed = card.orderIndex < storyPlacedCount;
              return (
                <button
                  key={card.orderIndex}
                  type="button"
                  disabled={alreadyUsed}
                  onClick={() => {
                    if (card.orderIndex === storyPlacedCount) {
                      const nextCount = storyPlacedCount + 1;
                      setStoryPlacedCount(nextCount);
                      praise(`Đúng tranh số ${nextCount} rồi!`, card.en);
                      if (nextCount < storyPages.length) {
                        window.setTimeout(() => audio.speak(storyPages[nextCount].en, 0.84), 1100);
                      } else {
                        window.setTimeout(onCompleteGame, 1000);
                      }
                    } else {
                      const targetPg = storyPages[storyPlacedCount];
                      gentleRetry(
                        targetPg ? targetPg.en : card.en,
                        `Gợi ý: Tìm tranh "${targetPg?.vi || ''}" trước nhé!`
                      );
                    }
                  }}
                  className={`p-2.5 rounded-2xl border-3 flex flex-col items-center gap-1.5 transition ${
                    alreadyUsed
                      ? 'bg-[#EEFFF2] border-[#A7F3B5] opacity-35'
                      : 'bg-white border-[#CBE7FF] hover:border-[#1684F0] shadow-xs active:scale-95'
                  }`}
                >
                  <img
                    src={wordImageUrl(card.imageSlug)}
                    alt={card.en}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-contain"
                  />
                  <span className="text-[11px] font-bold text-[#123A6F] line-clamp-2">
                    {card.vi}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* GAME 6: MOVE & SAY */}
      {mode === 'move' && (
        <div className="kids-glass-card rounded-[32px] p-5 space-y-4">
          <div className="kids-banner-yellow mx-auto max-w-lg rounded-2xl px-4 py-2.5 text-center font-kid font-extrabold text-base sm:text-xl text-[#143A6B]">
            🤸 Nghe câu lệnh và vận động cùng cha mẹ!
          </div>

          <div className="space-y-2.5 max-w-xl mx-auto">
            {moveActions.map((act, idx) => {
              const done = doneMoveIdx.includes(idx);
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border-2 flex flex-wrap items-center justify-between gap-3 transition ${
                    done ? 'bg-[#EEFFF2] border-[#5CE06D]' : 'bg-[#FFF5FA] border-[#FFD1E6]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-kid font-extrabold text-lg text-[#123A6F]">{act.en}</div>
                    <div className="text-xs font-bold text-[#5C7FA6]">{act.vi}</div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFF3B8] text-[#8A5400] text-xs font-extrabold">
                      👐 {act.actionVi}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onAudioReplay?.();
                        audio.speak(act.en, 0.82);
                      }}
                      className="kids-btn-blue px-3.5 py-2 rounded-full text-white font-extrabold text-xs inline-flex items-center gap-1"
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
                      className={`px-3.5 py-2 rounded-full font-extrabold text-xs inline-flex items-center gap-1 ${
                        done
                          ? 'kids-btn-green text-white'
                          : 'bg-white border-2 border-[#CBE7FF] text-[#123A6F]'
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

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={onCompleteGame}
              className="kids-btn-orange px-7 py-3.5 rounded-full text-white font-kid font-extrabold text-lg inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Tiếp tục →</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
