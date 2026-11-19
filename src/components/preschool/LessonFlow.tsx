import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FastForward,
  Mic,
  MicOff,
  Play,
  Sparkles,
  Turtle,
  Volume2,
} from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LEW_OBSERVATION_META, type LewAgeLevelMeta } from '../../data/preschool/lewLevels';
import { LEW_TOPICS } from '../../data/preschool/lewTopics';
import type {
  LewChildProfile,
  LewObservationCode,
  LewTopic,
} from '../../data/preschool/lewTypes';
import { unitCoverUrl, wordImageUrl } from '../../data/preschool/types';
import { isSpeechRecognitionSupported, startSpeechRecognition } from '../../utils/speechEngine';
import { LewGames } from './LewGames';
import {
  KidsRibbonBanner,
  KidsRobotHelper,
  KidsSceneShell,
  KidsStarIcon,
  KidsStoryForestBackdrop,
  KidsTopHeader,
  kidTopicIconUrl,
} from './ui/KidsSceneShell';
import { RewardBurst } from './ui/RewardBurst';
import type { useKidAudio } from './ui/useKidAudio';

export type LessonStepId = 1 | 2 | 3 | 4 | 5 | 6;

const STEP_META: { id: LessonStepId; key: string; shortVi: string; headerTitle: string }[] = [
  { id: 1, key: 'warmup', shortVi: 'Khởi động', headerTitle: 'Khởi động' },
  { id: 2, key: 'input', shortVi: 'Bài học', headerTitle: 'Bài học' },
  { id: 3, key: 'listening', shortVi: 'Nghe chọn', headerTitle: 'Trò chơi' },
  { id: 4, key: 'games', shortVi: 'Trò chơi', headerTitle: 'Trò chơi' },
  { id: 5, key: 'parentActivity', shortVi: 'Kể chuyện & Cha mẹ', headerTitle: 'Kể chuyện tiếng Anh' },
  { id: 6, key: 'review', shortVi: 'Phần thưởng', headerTitle: 'Phần thưởng' },
];

export interface LessonSessionMetrics {
  audioReplays: number;
  gameAttempts: number;
  activitiesTried: string[];
  offlineActivityDone: boolean;
}

interface LessonFlowProps {
  topic: LewTopic;
  allTopics?: LewTopic[];
  child: LewChildProfile;
  levelMeta: LewAgeLevelMeta;
  initialStep?: LessonStepId;
  audio: ReturnType<typeof useKidAudio>;
  onStartLesson?: () => void;
  onSkipLesson?: (metrics: LessonSessionMetrics) => void;
  onFinishLesson: (
    observations: LewObservationCode[],
    parentNote: string,
    metrics: LessonSessionMetrics
  ) => void;
  onExit: () => void;
}

export const LessonFlow: React.FC<LessonFlowProps> = ({
  topic,
  allTopics = LEW_TOPICS,
  child,
  levelMeta,
  initialStep,
  audio,
  onStartLesson,
  onSkipLesson,
  onFinishLesson,
  onExit,
}) => {
  const variant = topic.levels[levelMeta.id] || topic.levels.level3;
  const activeWords = topic.words.slice(0, Math.max(2, variant.wordCount || 4));

  const enabledSteps = useMemo(() => {
    const cfg = topic.enabledActivities;
    if (!cfg) return STEP_META;
    const filtered = STEP_META.filter((s) => {
      if (s.id === 1) return cfg.warmup !== false;
      if (s.id === 2) return cfg.input !== false;
      if (s.id === 3) return cfg.listening !== false;
      if (s.id === 4) return cfg.games !== false;
      if (s.id === 5) return cfg.parentActivity !== false || cfg.story !== false;
      return true;
    });
    return filtered.length > 0 ? filtered : STEP_META;
  }, [topic.enabledActivities]);

  // Default to Step 2 (Bài học flashcard — exact Mockup #3) unless caller requested another step
  const defaultStep: LessonStepId =
    initialStep ||
    (enabledSteps.some((s) => s.id === 2) ? 2 : enabledSteps[0]?.id || 2);

  const [step, setStep] = useState<LessonStepId>(defaultStep);
  const [wordIdx, setWordIdx] = useState(0);
  const [listenIdx, setListenIdx] = useState(0);
  const [listenMatchedId, setListenMatchedId] = useState<string | null>(null);
  const [listenPoints, setListenPoints] = useState(10);
  const [storyIdx, setStoryIdx] = useState(0);

  // Mic speaking state in Step 2 (Bài học — exact Mockup #3 blue mic button!)
  const [micListening, setMicListening] = useState(false);
  const [spokenText, setSpokenText] = useState<string | null>(null);
  const [spokenPraised, setSpokenPraised] = useState(false);
  const stopRecRef = useRef<(() => void) | null>(null);
  const micSupported = isSpeechRecognitionSupported();

  // Engagement metrics
  const [audioReplays, setAudioReplays] = useState(0);
  const [gameAttempts, setGameAttempts] = useState(0);
  const [activitiesTried, setActivitiesTried] = useState<string[]>(['input']);
  const [offlineActivityDone, setOfflineActivityDone] = useState(false);
  const startedLoggedRef = useRef(false);

  // Step 6 observation state
  const [selectedObs, setSelectedObs] = useState<LewObservationCode[]>(['recognized']);
  const [parentNote, setParentNote] = useState('');
  const [showParentObs, setShowParentObs] = useState(false);

  const currentWord = activeWords[wordIdx % activeWords.length] || activeWords[0];
  const listenTarget = activeWords[listenIdx % activeWords.length] || activeWords[0];

  const listenChoices = useMemo(() => {
    const count = Math.min(activeWords.length, levelMeta.maxChoices === 2 ? 2 : 3);
    const others = activeWords.filter((w) => w.id !== listenTarget.id).slice(0, count - 1);
    return [listenTarget, ...others].sort((a, b) => a.id.localeCompare(b.id));
  }, [activeWords, listenTarget, levelMeta.maxChoices]);

  useEffect(() => {
    if (!startedLoggedRef.current) {
      startedLoggedRef.current = true;
      onStartLesson?.();
    }
    return () => {
      stopRecRef.current?.();
    };
  }, []);

  useEffect(() => {
    audio.prefetchWords(
      [
        ...activeWords.map((w) => w.word),
        ...activeWords.slice(0, 3).map((w) => w.sampleEn),
      ],
      0.85
    );
  }, [topic.id, audio.voicePreset]);

  const markActivityTried = (actKey: string) => {
    setActivitiesTried((prev) => (prev.includes(actKey) ? prev : [...prev, actKey]));
  };

  const speakAndCount = (text: string, rate = 0.85) => {
    setAudioReplays((n) => n + 1);
    audio.speak(text, rate);
  };

  const goToNextEnabledStep = (afterStep: LessonStepId) => {
    stopRecRef.current?.();
    setMicListening(false);
    const next = enabledSteps.find((s) => s.id > afterStep);
    setStep(next ? next.id : 6);
  };

  useEffect(() => {
    stopRecRef.current?.();
    setMicListening(false);
    setSpokenText(null);
    setSpokenPraised(false);
    setListenMatchedId(null);

    const stepMeta = STEP_META.find((s) => s.id === step);
    if (stepMeta) markActivityTried(stepMeta.key);

    if (step === 1) {
      audio.speak(`Hello ${child.name}! Let's learn about ${topic.titleEn}!`, 0.85);
    } else if (step === 2 && currentWord) {
      audio.speak(currentWord.word, 0.82);
    } else if (step === 3 && listenTarget) {
      audio.speak(`Where is ${listenTarget.word}?`, 0.82);
    } else if (step === 6) {
      audio.playSfx('celebrate');
      audio.speak(`Awesome job ${child.name}! You earned 20 stars!`, 0.85);
    }
  }, [step, wordIdx, listenIdx]);

  const handleMicPress = () => {
    if (!currentWord) return;
    if (micListening) {
      stopRecRef.current?.();
      setMicListening(false);
      return;
    }
    audio.stopAll();
    setGameAttempts((n) => n + 1);

    if (!micSupported) {
      setSpokenPraised(true);
      setSpokenText(currentWord.word);
      audio.playSfx('ding');
      audio.speak(`Great job! ${currentWord.word}!`, 0.85);
      return;
    }

    setMicListening(true);
    setSpokenText(null);
    setSpokenPraised(false);
    const stopFn = startSpeechRecognition(
      'en-US',
      (transcript) => {
        setSpokenText(transcript);
        setSpokenPraised(true);
        setMicListening(false);
        audio.playSfx('ding');
        audio.speak(`Awesome! ${currentWord.word}!`, 0.85);
      },
      () => {
        // Gentle child-friendly fallback — never discourage a 1-6 year old!
        setMicListening(false);
        setSpokenPraised(true);
        audio.playSfx('ding');
        audio.speak(`Nice try! ${currentWord.word}!`, 0.85);
      },
      () => {
        setMicListening(false);
      }
    );
    stopRecRef.current = () => stopFn(true);
  };

  const toggleObs = (code: LewObservationCode) => {
    setSelectedObs((prev) =>
      prev.includes(code) ? prev.filter((x) => x !== code) : [...prev, code]
    );
  };

  const currentMetrics: LessonSessionMetrics = {
    audioReplays,
    gameAttempts,
    activitiesTried,
    offlineActivityDone,
  };

  const activeHeaderTitle =
    STEP_META.find((s) => s.id === step)?.headerTitle || 'Bài học';

  const sceneVariant =
    step === 6 ? 'celebration' : step === 5 ? 'story' : 'sky-meadow';

  return (
    <KidsSceneShell variant={sceneVariant}>
      {/* Top Floating Header matching Mockup #3 / #4 / #6 */}
      <KidsTopHeader
        title={activeHeaderTitle}
        onBack={() => {
          stopRecRef.current?.();
          audio.stopAll();
          onExit();
        }}
        rightSlot={
          step === 2 && currentWord ? (
            <button
              type="button"
              onClick={() => speakAndCount(currentWord.word, 0.85)}
              aria-label="Nghe lại từ"
              className="kids-btn-blue w-11 h-11 rounded-full text-white flex items-center justify-center"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          ) : step < 6 ? (
            <button
              type="button"
              onClick={() => {
                audio.stopAll();
                if (onSkipLesson) onSkipLesson(currentMetrics);
                else onExit();
              }}
              title="Bỏ qua bài học này"
              className="px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#1674DA] font-extrabold text-xs inline-flex items-center gap-1 shadow-sm border border-white"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bỏ qua</span>
            </button>
          ) : (
            <span className="w-11 h-11 rounded-full bg-white/90 border-2 border-white shadow-sm flex items-center justify-center">
              <KidsStarIcon className="w-7 h-7" />
            </span>
          )
        }
      />

      {/* Compact Free-Jump Step Pills (Zero Locks) */}
      <div className="px-3 pb-1">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-1.5 overflow-x-auto py-1">
          {enabledSteps.map((s) => {
            const active = step === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  stopRecRef.current?.();
                  audio.stopAll();
                  setStep(s.id);
                }}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-extrabold border-2 transition ${
                  active
                    ? 'bg-[#1684F0] text-white border-white shadow-md scale-105'
                    : 'bg-white/80 text-[#2B5382] border-white/80 hover:bg-white'
                }`}
              >
                {s.shortVi}
              </button>
            );
          })}
        </div>
      </div>

      {/* Parent-led Mode Banner for 1–2 years old */}
      {levelMeta.isParentLed && (
        <div className="max-w-2xl mx-auto px-3 pt-1">
          <div className="rounded-2xl bg-[#FFF6CC]/95 border-2 border-[#FFE074] px-3.5 py-2 text-center text-xs font-extrabold text-[#7A4B00] shadow-xs">
            👶 Chế độ Cha Mẹ Dẫn Dắt (1–2 tuổi): Cha mẹ mở âm thanh mẫu và cùng chơi với bé nhé!
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-3xl mx-auto px-3.5 sm:px-5 pt-2 pb-8 flex flex-col justify-center">
        {/* STEP 1: WARM-UP */}
        {step === 1 && (
          <div className="kids-glass-card rounded-[34px] p-6 sm:p-8 text-center space-y-5 max-w-lg mx-auto w-full">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E3F5FF] text-[#1474DB] text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9F43]" />
              <span>
                Chủ đề {topic.code} · {levelMeta.ageRangeVi}
              </span>
            </div>

            <div className="mx-auto w-52 h-52 sm:w-60 sm:h-60 rounded-[30px] bg-[#F5FAFF] border-3 border-[#D8EEFF] p-5 flex items-center justify-center shadow-inner">
              <img
                src={kidTopicIconUrl(topic.id)}
                onError={(e) => {
                  const fallback = unitCoverUrl(topic.coverSlug);
                  if (!e.currentTarget.src.endsWith(fallback)) e.currentTarget.src = fallback;
                }}
                alt={topic.titleEn}
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123A6F]">
                {topic.titleEn}
              </h1>
              <div className="text-base font-extrabold text-[#1684F0]">{topic.titleVi}</div>
              <p className="text-xs sm:text-sm font-bold text-[#5C7FA6] pt-1">
                🎯 {variant.objectiveVi}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() =>
                  speakAndCount(
                    `Hello ${child.name}! Today we play with ${topic.titleEn}!`,
                    0.85
                  )
                }
                className="kids-btn-blue px-5 py-3.5 rounded-full text-white font-extrabold text-base inline-flex items-center gap-2"
              >
                <Volume2 className="w-5 h-5" />
                <span>Nghe chào bé</span>
              </button>

              <button
                type="button"
                onClick={() => goToNextEnabledStep(1)}
                className="kids-btn-orange px-7 py-3.5 rounded-full text-white font-extrabold text-lg inline-flex items-center gap-2"
              >
                <span>Bắt đầu học</span>
                <ArrowRight className="w-5 h-5 stroke-[2.75]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: BÀI HỌC FLASHCARD + ROBOT + BIG BLUE MIC (EXACT MOCKUP #3) */}
        {step === 2 && currentWord && (
          <div className="w-full max-w-md mx-auto space-y-4">
            {/* Main White Rounded Flashcard */}
            <div className="kids-glass-card rounded-[36px] px-5 pt-4 pb-6 text-center space-y-3">
              {/* Word Selector Dots & Mini Progress */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold text-[#5C7FA6]">
                  {topic.titleVi} ({wordIdx + 1}/{activeWords.length})
                </span>
                <div className="flex items-center gap-1.5">
                  {activeWords.map((w, idx) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setWordIdx(idx)}
                      aria-label={w.word}
                      className={`h-2.5 rounded-full transition-all ${
                        idx === wordIdx
                          ? 'w-7 bg-[#1684F0]'
                          : 'w-2.5 bg-[#CBE7FF] hover:bg-[#8CD2FF]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Big Crisp Illustration */}
              <button
                type="button"
                onClick={() => speakAndCount(currentWord.word, 0.85)}
                className="mx-auto w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center rounded-[28px] hover:scale-[1.03] active:scale-95 transition"
              >
                <img
                  src={wordImageUrl(currentWord.imageSlug)}
                  alt={currentWord.word}
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </button>

              {/* Big Word + IPA + Inline Blue Speaker & Slow Turtle */}
              <div className="space-y-1">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#123A6F] tracking-tight leading-none">
                  {currentWord.word}
                </h2>
                <div className="flex items-center justify-center gap-2.5 pt-1">
                  <span className="text-lg sm:text-xl font-bold text-[#4D6F97]">
                    {currentWord.ipa}
                  </span>
                  <button
                    type="button"
                    onClick={() => speakAndCount(currentWord.word, 0.88)}
                    aria-label="Nghe phát âm chuẩn"
                    className="w-10 h-10 rounded-full bg-[#DCEEFF] hover:bg-[#C2E3FF] text-[#167CE8] flex items-center justify-center active:scale-90 transition shadow-2xs"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => speakAndCount(currentWord.word, 0.62)}
                    aria-label="Nghe đọc chậm"
                    title="Nghe chậm"
                    className="w-9 h-9 rounded-full bg-[#FFF3C4] hover:bg-[#FFE693] text-[#B86E00] flex items-center justify-center active:scale-90 transition shadow-2xs"
                  >
                    <Turtle className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const next = audio.voicePreset === 'teacher-warm' ? 'kid-cute' : 'teacher-warm';
                      audio.setVoicePreset(next);
                      audio.speak(currentWord.word, 0.85);
                    }}
                    title="Đổi giọng nữ đọc (Cô Heart / Cô Bella)"
                    className="px-2.5 py-1 rounded-full bg-[#FFEAF3] hover:bg-[#FFD6E8] text-[#B81D65] text-[11px] font-extrabold transition shadow-2xs"
                  >
                    {audio.voicePreset === 'kid-cute' ? '🌸 Cô Bella' : '👩 Cô Heart'}
                  </button>
                </div>
              </div>

              {/* Optional Phonics Hint for 4–6 yrs */}
              {variant.phonicsNote && (
                <button
                  type="button"
                  onClick={() =>
                    speakAndCount(
                      `${variant.phonicsNote?.letter}. ${variant.phonicsNote?.exampleWord}.`,
                      0.82
                    )
                  }
                  className="mx-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1EBFF] text-[#5B35C4] text-xs font-extrabold"
                >
                  <span>
                    🔤 Âm /{variant.phonicsNote.sound}/ · {variant.phonicsNote.letter.toUpperCase()} —{' '}
                    {variant.phonicsNote.exampleWord}
                  </span>
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Robot Helper + Soft Blue Speech Bubble Row (Exact Mockup #3!) */}
            <div className="flex items-center gap-3 px-1">
              <KidsRobotHelper
                mood={micListening ? 'listening' : spokenPraised ? 'cheer' : 'happy'}
                className="w-20 h-20 sm:w-24 sm:h-24"
              />

              <button
                type="button"
                onClick={() => speakAndCount(currentWord.sampleEn, 0.82)}
                className="relative flex-1 rounded-[26px] bg-[#E3F5FF]/95 hover:bg-white border-[3px] border-white px-4 py-3 text-center shadow-md transition active:scale-[0.98]"
              >
                {/* Speech bubble pointer triangle */}
                <span
                  className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#E3F5FF] border-l-[3px] border-b-[3px] border-white rotate-45"
                  aria-hidden="true"
                />
                {micListening ? (
                  <div className="space-y-0.5">
                    <div className="text-base sm:text-lg font-extrabold text-[#167CE8]">
                      🎤 Bé đọc to &ldquo;{currentWord.word}&rdquo; nhé!
                    </div>
                    <div className="text-xs font-bold text-[#4B75A5]">Robot đang lắng nghe bé...</div>
                  </div>
                ) : spokenPraised ? (
                  <div className="space-y-0.5 animate-kid-pop">
                    <div className="text-base sm:text-lg font-extrabold text-[#148735]">
                      🌟 Giỏi quá! {currentWord.word} ({currentWord.meaningVi})
                    </div>
                    {spokenText && (
                      <div className="text-xs font-bold text-[#4B75A5]">
                        Bé vừa nói: &ldquo;{spokenText}&rdquo;
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    <div className="text-lg sm:text-xl font-extrabold text-[#123A6F] leading-tight">
                      {currentWord.word}{' '}
                      <span className="text-[#167CE8]">({currentWord.meaningVi})</span>
                    </div>
                    <div className="text-xs font-bold text-[#4B75A5] line-clamp-1">
                      💬 &ldquo;{currentWord.sampleEn}&rdquo;
                    </div>
                  </div>
                )}
              </button>
            </div>

            {/* Bottom 3-Button Control Dock: [← Orange] [🎤 Giant Blue Mic] [→ Orange] */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 pt-2">
              <button
                type="button"
                disabled={wordIdx === 0}
                onClick={() => setWordIdx((i) => Math.max(0, i - 1))}
                aria-label="Từ trước"
                className="kids-btn-orange w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white flex items-center justify-center disabled:opacity-45"
              >
                <ArrowLeft className="w-7 h-7 stroke-[3]" />
              </button>

              <button
                type="button"
                onClick={handleMicPress}
                aria-label={micListening ? 'Dừng ghi âm' : 'Bấm để bé tập nói theo'}
                className={`kids-btn-blue w-20 h-20 sm:w-22 sm:h-22 rounded-full text-white flex items-center justify-center ${
                  micListening ? 'animate-kids-mic scale-105' : ''
                }`}
              >
                {micListening ? (
                  <MicOff className="w-9 h-9 stroke-[2.6]" />
                ) : (
                  <Mic className="w-10 h-10 stroke-[2.5]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (wordIdx < activeWords.length - 1) {
                    setWordIdx((i) => i + 1);
                  } else {
                    goToNextEnabledStep(2);
                  }
                }}
                aria-label={wordIdx < activeWords.length - 1 ? 'Từ tiếp theo' : 'Sang trò chơi'}
                className="kids-btn-orange w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white flex items-center justify-center"
              >
                <ArrowRight className="w-7 h-7 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: NGHE & CHỌN HÌNH ĐÚNG (EXACT MOCKUP #4) */}
        {step === 3 && listenTarget && (
          <div className="w-full max-w-xl mx-auto space-y-4 text-center">
            {/* Top Game Mini HUD */}
            <div className="flex items-center justify-between px-1">
              <span className="px-3.5 py-1 rounded-full bg-white/95 border-2 border-white text-[#123A6F] text-xs font-extrabold shadow-xs">
                Câu {listenIdx + 1}/{activeWords.length}
              </span>
              <span className="px-3.5 py-1 rounded-full bg-[#FFF2B5] border-2 border-white text-[#A85B00] text-xs font-extrabold shadow-xs">
                ⭐ +{listenPoints}
              </span>
            </div>

            {/* Yellow Question Banner */}
            <button
              type="button"
              onClick={() => speakAndCount(listenTarget.word, 0.8)}
              className="kids-banner-yellow mx-auto w-full rounded-[26px] px-5 py-3.5 flex items-center justify-center gap-3 active:scale-[0.98] transition"
            >
              <div>
                <div className="font-kid font-extrabold text-xl sm:text-2xl text-[#143A6B]">
                  Chọn hình đúng với từ &ldquo;{listenTarget.word}&rdquo;
                </div>
                <div className="text-xs font-bold text-[#7A5400]">
                  Chạm để nghe lại giọng đọc mẫu
                </div>
              </div>
              <span className="kids-btn-blue w-10 h-10 rounded-full text-white flex items-center justify-center shrink-0">
                <Volume2 className="w-5 h-5" />
              </span>
            </button>

            {/* Center Focal Character / Matched Reveal */}
            <div className="flex justify-center py-1">
              {listenMatchedId === listenTarget.id ? (
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-[34px] bg-white border-4 border-[#33C450] shadow-xl p-4 flex items-center justify-center animate-kid-pop">
                  <img
                    src={wordImageUrl(listenTarget.imageSlug)}
                    alt={listenTarget.word}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => speakAndCount(`Where is ${listenTarget.word}?`, 0.82)}
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white/85 border-4 border-white shadow-lg flex items-center justify-center hover:scale-105 transition"
                >
                  <KidsRobotHelper mood="happy" className="w-28 h-28 sm:w-36 sm:h-36" />
                </button>
              )}
            </div>

            {/* Chunky Bottom Answer Cards with Green Checkmark */}
            <div
              className={`grid gap-3 sm:gap-4 ${
                listenChoices.length === 2 ? 'grid-cols-2 max-w-md mx-auto' : 'grid-cols-3'
              }`}
            >
              {listenChoices.map((opt) => {
                const isMatched = listenMatchedId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      if (listenMatchedId) return;
                      setGameAttempts((n) => n + 1);
                      if (opt.id === listenTarget.id) {
                        setListenMatchedId(opt.id);
                        setListenPoints((p) => p + 10);
                        audio.playSfx('ding');
                        audio.speak(`Yes! ${opt.word}!`, 0.85);
                        window.setTimeout(() => {
                          setListenMatchedId(null);
                          if (listenIdx < activeWords.length - 1) setListenIdx((i) => i + 1);
                          else goToNextEnabledStep(3);
                        }, 900);
                      } else {
                        audio.playSfx('tap');
                        audio.speak(`Try again! Where is ${listenTarget.word}?`, 0.8);
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
                        src={wordImageUrl(opt.imageSlug)}
                        alt={opt.word}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="mt-1 font-kid font-extrabold text-sm sm:text-lg text-[#123A6F]">
                      {opt.word}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: 6 MINI-GAMES */}
        {step === 4 && (
          <LewGames
            topic={topic}
            allTopics={allTopics}
            words={activeWords}
            levelMeta={levelMeta}
            audio={audio}
            onGameAttempt={() => setGameAttempts((n) => n + 1)}
            onAudioReplay={() => setAudioReplays((n) => n + 1)}
            onCompleteGame={() => goToNextEnabledStep(4)}
          />
        )}

        {/* STEP 5: KỂ CHUYỆN TIẾNG ANH (MOCKUP #7) + GIÁO ÁN CHA MẸ */}
        {step === 5 && (
          <div className="space-y-5">
            {topic.enabledActivities?.story !== false && variant.storyPages.length > 0 && (
              <div className="kids-glass-card rounded-[32px] p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2 font-extrabold text-base sm:text-lg text-[#123A6F]">
                    <BookOpen className="w-5 h-5 text-[#1684F0]" />
                    <span>
                      Kể chuyện: {topic.titleEn} ({storyIdx + 1}/{variant.storyPages.length})
                    </span>
                  </div>
                </div>

                {(() => {
                  const pg = variant.storyPages[storyIdx] || variant.storyPages[0];
                  const pct = Math.round(((storyIdx + 1) / variant.storyPages.length) * 100);
                  return (
                    <div className="space-y-3">
                      <KidsStoryForestBackdrop>
                        <button
                          type="button"
                          onClick={() => {
                            markActivityTried('story');
                            speakAndCount(pg.en, 0.82);
                          }}
                          className="w-full py-5 px-4 flex justify-center"
                        >
                          <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-[28px] bg-white/95 border-4 border-white shadow-xl p-3 flex items-center justify-center">
                            <img
                              src={wordImageUrl(pg.imageSlug)}
                              alt={pg.en}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </button>
                      </KidsStoryForestBackdrop>

                      <div className="rounded-[24px] bg-[#FFFDF0] border-2 border-[#FFE9A3] p-4 space-y-3">
                        <button
                          type="button"
                          onClick={() => {
                            markActivityTried('story');
                            speakAndCount(pg.en, 0.82);
                          }}
                          className="w-full flex items-start gap-2.5 text-left"
                        >
                          <KidsStarIcon className="w-6 h-6 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="font-extrabold text-lg sm:text-xl text-[#143A6B]">
                              {pg.en}
                            </div>
                            <div className="text-xs font-bold text-[#6A7F99]">{pg.vi}</div>
                          </div>
                          <Volume2 className="w-5 h-5 text-[#1684F0] shrink-0" />
                        </button>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              markActivityTried('story');
                              speakAndCount(pg.en, 0.82);
                            }}
                            className="kids-btn-blue w-11 h-11 rounded-full text-white flex items-center justify-center shrink-0"
                          >
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </button>

                          <div className="flex-1 space-y-1.5">
                            <div className="h-2.5 rounded-full bg-[#DCEEFF] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#4DC0FF] to-[#1684F0] transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-xs font-extrabold text-[#1674DA]">
                              <button
                                type="button"
                                disabled={storyIdx === 0}
                                onClick={() => setStoryIdx((i) => Math.max(0, i - 1))}
                                className="disabled:opacity-35"
                              >
                                ← Trang trước
                              </button>
                              <button
                                type="button"
                                disabled={storyIdx >= variant.storyPages.length - 1}
                                onClick={() =>
                                  setStoryIdx((i) =>
                                    Math.min(variant.storyPages.length - 1, i + 1)
                                  )
                                }
                                className="disabled:opacity-35"
                              >
                                Trang sau →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Parent Co-play Guide Card */}
            {topic.enabledActivities?.parentActivity !== false && (
              <div className="kids-glass-card rounded-[30px] p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E3F1FC] pb-3">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-[#DFF7E6] text-[#146D28] text-xs font-extrabold">
                      👨‍👩‍👧 Giáo án cho Cha Mẹ tại nhà
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-[#123A6F] mt-1">
                      Cùng bé thực hành: {topic.titleEn} ({topic.titleVi})
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOfflineActivityDone((v) => !v)}
                    className={`px-3.5 py-2 rounded-full text-xs font-extrabold inline-flex items-center gap-1.5 transition ${
                      offlineActivityDone
                        ? 'kids-btn-green text-white'
                        : 'bg-[#EEFFF2] text-[#146D28] border-2 border-[#A7F3B5]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{offlineActivityDone ? 'Đã thực hành ngoài màn hình' : 'Đánh dấu đã thực hành'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#FFF9DC] border border-[#FFE48A] space-y-1">
                    <div className="font-extrabold text-[#8A5400]">1. Từ mục tiêu & Chuẩn bị</div>
                    <p className="font-bold text-[#334E6F]">
                      <strong>Từ vựng:</strong> {topic.parentGuide.targetWordsSummaryVi}
                    </p>
                    <p className="font-bold text-[#334E6F]">
                      <strong>Đồ thật:</strong> {topic.parentGuide.materialsVi}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#E9FBF0] border border-[#B5EDC5] space-y-1">
                    <div className="font-extrabold text-[#146D28]">2. Hoạt động ngoài màn hình</div>
                    <p className="font-bold text-[#334E6F] leading-relaxed">
                      {topic.parentGuide.offlineGameVi}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {topic.parentGuide.sampleSentences.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => speakAndCount(s.en, 0.82)}
                      className="p-3 rounded-2xl bg-[#F4FAFF] hover:bg-[#E5F4FF] border border-[#CBE7FF] text-left transition space-y-1"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <span className="font-extrabold text-[#123A6F] text-xs sm:text-sm">
                          &ldquo;{s.en}&rdquo;
                        </span>
                        <Volume2 className="w-4 h-4 text-[#1684F0] shrink-0" />
                      </div>
                      <div className="text-[11px] font-semibold text-[#5C7FA6]">{s.vi}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setStep(6)}
                className="kids-btn-orange px-8 py-3.5 rounded-full text-white font-extrabold text-lg inline-flex items-center gap-2"
              >
                <span>Nhận Phần thưởng</span>
                <ArrowRight className="w-5 h-5 stroke-[2.75]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: PHẦN THƯỞNG CÚP VÀNG + RUY-BĂNG "XUẤT SẮC!" (EXACT MOCKUP #6) */}
        {step === 6 && (
          <div className="w-full max-w-md mx-auto space-y-4 text-center">
            <RewardBurst visible message={`Xuất sắc! +20 điểm`} />

            <div className="kids-glass-card rounded-[36px] px-6 py-7 space-y-4">
              {/* Golden 3D Trophy with Radial Glow & Sparkles */}
              <div className="relative mx-auto w-44 h-44 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-75"
                  style={{
                    background:
                      'radial-gradient(circle, #FFE566 0%, rgba(255,229,102,0) 70%)',
                  }}
                />
                <KidsStarIcon className="w-8 h-8 absolute top-2 left-2 animate-kid-bounce" />
                <KidsStarIcon className="w-7 h-7 absolute top-5 right-3 animate-kid-float" />
                <img
                  src="/preschool/img/kids-ui/trophy-cutout.webp"
                  alt="Cúp vàng phần thưởng"
                  className="relative z-10 w-36 h-36 sm:w-40 sm:h-40 object-contain drop-shadow-xl animate-kid-pop"
                />
              </div>

              {/* Folded Golden Ribbon: "Xuất sắc!" */}
              <div className="-mt-3">
                <KidsRibbonBanner label="Xuất sắc!" />
              </div>

              <div className="space-y-1.5">
                <p className="text-sm sm:text-base font-bold text-[#3E628C]">
                  Bạn đã hoàn thành bài học <strong>{topic.titleVi}</strong> và nhận được:
                </p>
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFF7D1] border-2 border-[#FFE074] shadow-xs">
                  <KidsStarIcon className="w-7 h-7" />
                  <span className="font-kid font-extrabold text-2xl sm:text-3xl text-[#E87A00]">
                    +20 điểm
                  </span>
                </div>
              </div>

              {/* Unlocked Topic Sticker Mini Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#EEF8FF] border border-[#CBE7FF]">
                <img
                  src={kidTopicIconUrl(topic.id)}
                  onError={(e) => {
                    const fallback = unitCoverUrl(topic.coverSlug);
                    if (!e.currentTarget.src.endsWith(fallback)) e.currentTarget.src = fallback;
                  }}
                  alt={topic.titleEn}
                  className="w-10 h-10 object-contain"
                />
                <div className="text-left">
                  <div className="text-[11px] font-extrabold text-[#1684F0]">
                    🏅 Sticker mới mở khóa
                  </div>
                  <div className="text-xs font-extrabold text-[#123A6F]">
                    {topic.titleEn} · {topic.titleVi}
                  </div>
                </div>
              </div>

              {/* Big Glossy Orange CTA Button: Tiếp tục */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onFinishLesson(selectedObs, parentNote, currentMetrics)}
                  className="kids-btn-orange w-full py-4 px-8 rounded-full text-white font-kid font-extrabold text-2xl"
                >
                  Tiếp tục
                </button>
              </div>
            </div>

            {/* Collapsible Parent Observation Note (Preserves full LEW tracking cleanly) */}
            <div className="kids-glass-card rounded-[24px] p-3.5 text-left">
              <button
                type="button"
                onClick={() => setShowParentObs((v) => !v)}
                className="w-full flex items-center justify-between gap-2 text-xs font-extrabold text-[#2B5382]"
              >
                <span>📝 Ghi nhận nhanh của Cha Mẹ (Không chấm điểm bé)</span>
                {showParentObs ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showParentObs && (
                <div className="pt-3 space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(Object.keys(LEW_OBSERVATION_META) as LewObservationCode[]).map((code) => {
                      const meta = LEW_OBSERVATION_META[code];
                      const active = selectedObs.includes(code);
                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => toggleObs(code)}
                          className={`p-2.5 rounded-xl border-2 text-left transition flex items-start gap-2 ${
                            active
                              ? 'bg-[#EEFFF2] border-[#33C450]'
                              : 'bg-white border-[#DCEEFF]'
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              active ? 'text-[#2EC24B]' : 'text-slate-300'
                            }`}
                          />
                          <div>
                            <div className="text-xs font-extrabold text-[#123A6F]">
                              {meta.labelVi}
                            </div>
                            <div className="text-[10px] font-semibold text-[#5C7FA6]">
                              {meta.descVi}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <input
                    type="text"
                    value={parentNote}
                    onChange={(e) => setParentNote(e.target.value)}
                    placeholder="Ghi chú thêm của cha mẹ..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#CBE7FF] bg-white text-xs font-bold text-[#123A6F]"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </KidsSceneShell>
  );
};
