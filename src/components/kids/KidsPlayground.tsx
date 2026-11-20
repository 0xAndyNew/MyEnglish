import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Flame,
  Gamepad2,
  Headphones,
  MessageCircle,
  Mic,
  Music,
  Palette,
  Play,
  RotateCcw,
  Shield,
  Sparkles,
  Square,
  Star,
  Trophy,
  Turtle,
  Video,
  Volume2,
} from 'lucide-react';
import { AccentMode } from '../../types/learning';
import { LearnerProfile } from '../../types/audience';
import { resolveFlashcardImage } from '../../utils/flashcardMedia';
import {
  isSpeechRecognitionSupported,
  playLoudAudioUrl,
  scorePronunciation,
  speakText,
  startSpeechRecognition,
  stopActiveAudioPlayback,
} from '../../utils/speechEngine';
import { playKidsMelody, playRealSongAudio } from '../../utils/kidsSongPlayer';
import { startUniversalAudioCapture } from '../../utils/audioRecorder';
import { fetchKidsSongsMedia, KidsSongMediaEntry } from '../../utils/storage';
import {
  KIDS_SENTENCE_CHUNKS,
  KIDS_UNITS,
  KIDS_YLE_CHALLENGES,
  KIDS_YLE_MOCK_TESTS,
  KidsSentenceChunk,
  KidsUnit,
  KidsVocabWord,
  KidsYleMockTest,
  YleLevel,
} from '../../data/kids/kidsCurriculumData';
import { ExerciseRunner } from '../practice/ExerciseRunner';
import { PaginationBar, usePagination } from '../common/PaginationBar';
import { KidsFlashcard3D } from './KidsFlashcard3D';

export type KidsTab = 'vocab' | 'stories' | 'sentences' | 'games' | 'yle';

export interface KidsPlaygroundProps {
  accent: AccentMode;
  profile?: LearnerProfile | null;
  onAddXp: (amount: number) => void;
  initialTab?: KidsTab;
  allowAllOptions?: boolean;
  hideHeaderNav?: boolean;
}

interface KidsBadgeInfo {
  minStars: number;
  emoji: string;
  title: string;
  colorClass: string;
}

const KIDS_BADGES: KidsBadgeInfo[] = [
  { minStars: 0, emoji: '🐣', title: 'Bé Khám Phá', colorClass: 'bg-amber-100 text-amber-800 border-amber-300' },
  { minStars: 5, emoji: '🌟', title: 'Ngôi Sao Nhỏ', colorClass: 'bg-sky-100 text-sky-800 border-sky-300' },
  { minStars: 12, emoji: '🦁', title: 'Dũng Sĩ Anh Ngữ', colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { minStars: 22, emoji: '🚀', title: 'Siêu Sao Nhí', colorClass: 'bg-violet-100 text-violet-800 border-violet-300' },
  { minStars: 35, emoji: '👑', title: 'Quán Quân YLE', colorClass: 'bg-pink-100 text-pink-800 border-pink-300' },
];

const YLE_LEVEL_META: Record<
  YleLevel,
  { label: string; subtitle: string; emoji: string; gradient: string }
> = {
  starters: {
    label: 'Pre-A1 Starters',
    subtitle: 'Bé 6–7 tuổi • Làm quen từ vựng & nghe tranh cơ bản',
    emoji: '🐣',
    gradient: 'from-amber-400 to-orange-500',
  },
  movers: {
    label: 'A1 Movers',
    subtitle: 'Bé 7–9 tuổi • Ghép câu ngắn & nghe hiểu tình huống',
    emoji: '🦊',
    gradient: 'from-emerald-400 to-teal-500',
  },
  flyers: {
    label: 'A2 Flyers',
    subtitle: 'Bé 9–10 tuổi • Kể chuyện, thói quen & giao tiếp tự tin',
    emoji: '🦅',
    gradient: 'from-violet-500 to-indigo-600',
  },
};

const PRAISE_WORDS = [
  '🎉 Tuyệt vời quá bé ơi!',
  '🌟 Siêu sao xuất sắc!',
  '🦁 Dũng cảm và thông minh lắm!',
  '🎈 Hoan hô! Chuẩn 100 điểm luôn!',
  '✨ Bé giỏi thật đấy!',
];

const ALL_KIDS_WORDS: KidsVocabWord[] = KIDS_UNITS.flatMap((u) => u.words);

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildListenRound(pool: KidsVocabWord[], excludeId?: string) {
  const candidates = pool.length >= 4 ? pool : ALL_KIDS_WORDS;
  const filteredTargets =
    candidates.length > 1 && excludeId
      ? candidates.filter((w) => w.id !== excludeId)
      : candidates;
  const target = filteredTargets[Math.floor(Math.random() * filteredTargets.length)];
  const distractors = shuffleArray(candidates.filter((w) => w.id !== target.id)).slice(0, 3);
  const options = shuffleArray([target, ...distractors]);
  return { target, options };
}

function buildMatchingBoard(pool: KidsVocabWord[]) {
  const source = pool.length >= 4 ? pool : ALL_KIDS_WORDS;
  const pairs = shuffleArray(source).slice(0, 4);
  return {
    pairs,
    leftCards: shuffleArray(pairs),
    rightCards: shuffleArray(pairs),
  };
}

export const KidsPlayground: React.FC<KidsPlaygroundProps> = ({
  accent,
  profile,
  onAddXp,
  initialTab,
  allowAllOptions = false,
  hideHeaderNav = false,
}) => {
  const showYleTab = allowAllOptions || profile?.kids?.goal === 'yle';
  const [activeTab, setActiveTab] = useState<KidsTab>(() => {
    const t = initialTab || 'vocab';
    if (t === 'yle' && !showYleTab) return 'vocab';
    return t;
  });
  const [speechRate, setSpeechRate] = useState<number>(0.85);

  // Sync tab when parent updates initialTab
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab === 'yle' && !showYleTab ? 'vocab' : initialTab);
    }
  }, [initialTab, showYleTab]);

  // Session rewards: Stars, XP, Combo
  const [stars, setStars] = useState<number>(0);
  const [sessionXp, setSessionXp] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [celebrationBanner, setCelebrationBanner] = useState<string | null>(null);

  // Shared Unit selection for Vocab & Stories
  const [selectedUnitId, setSelectedUnitId] = useState<string>(KIDS_UNITS[0].id);
  const [showUnitPicker, setShowUnitPicker] = useState<boolean>(false);
  const [vocabViewMode, setVocabViewMode] = useState<'3d' | 'grid'>('3d');
  const activeUnit: KidsUnit = useMemo(
    () => KIDS_UNITS.find((u) => u.id === selectedUnitId) || KIDS_UNITS[0],
    [selectedUnitId]
  );
  const activeUnitIndex = useMemo(
    () => Math.max(0, KIDS_UNITS.findIndex((u) => u.id === activeUnit.id)),
    [activeUnit.id]
  );
  const vocabUnitsRef = useRef<HTMLDivElement | null>(null);
  const vocabWordsRef = useRef<HTMLDivElement | null>(null);
  const storiesUnitsRef = useRef<HTMLDivElement | null>(null);
  const chunksSectionRef = useRef<HTMLDivElement | null>(null);

  const vocabUnitPagination = usePagination(KIDS_UNITS, 8, { activeIndex: activeUnitIndex });
  const storiesUnitPagination = usePagination(KIDS_UNITS, 8, { activeIndex: activeUnitIndex });
  const vocabWordPagination = usePagination(activeUnit.words, 8, { resetKey: activeUnit.id });

  // Vocab completion state
  const [starredWordIds, setStarredWordIds] = useState<string[]>([]);

  // Mic / speaking state (used in Vocab & Sentences)
  const [listeningKey, setListeningKey] = useState<string | null>(null);
  const [micInterim, setMicInterim] = useState<string>('');
  const [micError, setMicError] = useState<string | null>(null);
  const [micFeedback, setMicFeedback] = useState<{
    key: string;
    score: number;
    heard: string;
    audioUrl?: string;
  } | null>(null);
  const stopMicRef = useRef<((abort?: boolean) => void) | null>(null);

  // Stories & Songs state
  const [storyPlayingIdx, setStoryPlayingIdx] = useState<number | null>(null);
  const [completedChantIds, setCompletedChantIds] = useState<string[]>([]);
  const [completedStoryIds, setCompletedStoryIds] = useState<string[]>([]);
  const storyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Song melody / vocal audio / Karaoke highlight / Kid singing recorder state
  const [kidsSongsMedia, setKidsSongsMedia] = useState<Record<string, KidsSongMediaEntry>>({});
  const [songPlayingMode, setSongPlayingMode] = useState<'none' | 'vocal' | 'melody'>('none');
  const [songTempo, setSongTempo] = useState<0.75 | 1.0>(1.0);
  const [activeSongLineIdx, setActiveSongLineIdx] = useState<number | null>(null);
  const [songNotice, setSongNotice] = useState<string | null>(null);
  const [showSongYoutube, setShowSongYoutube] = useState<boolean>(false);
  const [recordingKidSong, setRecordingKidSong] = useState<boolean>(false);
  const [kidSongAudioUrl, setKidSongAudioUrl] = useState<string | null>(null);
  const [kidSongRecError, setKidSongRecError] = useState<string | null>(null);
  const [playingKidSong, setPlayingKidSong] = useState<boolean>(false);
  const stopSongPlayerRef = useRef<(() => void) | null>(null);
  const stopKidSongCaptureRef = useRef<(() => void) | null>(null);
  const stopKidSongReplayRef = useRef<(() => void) | null>(null);

  // Sentence Chunks state
  const [chunkCategory, setChunkCategory] = useState<string>('Tất cả');
  const [selectedSwaps, setSelectedSwaps] = useState<Record<string, number>>({});
  const [completedChunkIds, setCompletedChunkIds] = useState<string[]>([]);

  // Games state
  const [gameMode, setGameMode] = useState<'listen-pick' | 'match-pairs'>('listen-pick');
  const [gameUnitFilter, setGameUnitFilter] = useState<string>('all');
  const [hideWordsInGame, setHideWordsInGame] = useState<boolean>(false);
  const gamePool = useMemo(() => {
    if (gameUnitFilter === 'all') return ALL_KIDS_WORDS;
    return KIDS_UNITS.find((u) => u.id === gameUnitFilter)?.words || ALL_KIDS_WORDS;
  }, [gameUnitFilter]);

  const [listenRound, setListenRound] = useState(() => buildListenRound(ALL_KIDS_WORDS));
  const [listenPickedId, setListenPickedId] = useState<string | null>(null);

  const [matchBoard, setMatchBoard] = useState(() => buildMatchingBoard(ALL_KIDS_WORDS));
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [mismatchHint, setMismatchHint] = useState<string | null>(null);
  const mismatchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cambridge YLE state
  const [yleLevel, setYleLevel] = useState<YleLevel>(profile?.kids?.yleLevel || 'starters');
  const [yleMockId, setYleMockId] = useState<string | null>(null);
  const [yleMockAnswers, setYleMockAnswers] = useState<Record<string, number>>({});
  const [yleMockSubmitted, setYleMockSubmitted] = useState(false);
  const [yleMockSeconds, setYleMockSeconds] = useState(0);

  const yleMocksForLevel = useMemo(
    () => KIDS_YLE_MOCK_TESTS.filter((m) => m.level === yleLevel),
    [yleLevel]
  );
  const activeYleMock: KidsYleMockTest | undefined = useMemo(
    () => yleMocksForLevel.find((m) => m.id === yleMockId),
    [yleMocksForLevel, yleMockId]
  );

  useEffect(() => {
    if (!activeYleMock || yleMockSubmitted || yleMockSeconds <= 0) return;
    const t = window.setInterval(() => {
      setYleMockSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => window.clearInterval(t);
  }, [activeYleMock, yleMockSubmitted, yleMockSeconds]);

  useEffect(() => {
    if (activeYleMock && !yleMockSubmitted && yleMockSeconds === 0) {
      setYleMockSubmitted(true);
    }
  }, [activeYleMock, yleMockSubmitted, yleMockSeconds]);
  useEffect(() => {
    if (profile?.kids?.yleLevel) {
      setYleLevel(profile.kids.yleLevel);
    }
  }, [profile?.kids?.yleLevel]);

  const yleQuestions = useMemo(
    () => KIDS_YLE_CHALLENGES.filter((q) => q.level === yleLevel),
    [yleLevel]
  );
  const [yleIndex, setYleIndex] = useState<number>(0);
  const [yleAnswers, setYleAnswers] = useState<Record<string, number>>({});

  // Reset YLE index when level changes
  useEffect(() => {
    setYleIndex(0);
  }, [yleLevel]);

  const rewardChild = useCallback(
    (xpAmount: number, starAmount: number, message?: string, burstConfetti = false) => {
      if (xpAmount > 0) {
        onAddXp(xpAmount);
        setSessionXp((prev) => prev + xpAmount);
      }
      if (starAmount > 0) {
        setStars((prev) => prev + starAmount);
      }
      if (message) {
        setCelebrationBanner(message);
      }
      if (burstConfetti) {
        confetti({
          particleCount: 55,
          spread: 70,
          origin: { y: 0.7 },
        });
      }
    },
    [onAddXp]
  );

  const stopStoryNarration = useCallback(() => {
    if (storyTimerRef.current) {
      clearTimeout(storyTimerRef.current);
      storyTimerRef.current = null;
    }
    setStoryPlayingIdx(null);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const songCaptureSessionRef = useRef<number>(0);

  const stopSongPlayback = useCallback(() => {
    stopSongPlayerRef.current?.();
    stopSongPlayerRef.current = null;
    setSongPlayingMode('none');
    setActiveSongLineIdx(null);
  }, []);

  const stopKidSongReplay = useCallback(() => {
    stopKidSongReplayRef.current?.();
    stopKidSongReplayRef.current = null;
    stopActiveAudioPlayback();
    setPlayingKidSong(false);
  }, []);

  const stopKidSongCapture = useCallback(() => {
    songCaptureSessionRef.current += 1;
    stopKidSongCaptureRef.current?.();
    stopKidSongCaptureRef.current = null;
    setRecordingKidSong(false);
  }, []);

  const startMelodyPlayback = useCallback(
    (unit: KidsUnit, rate: number, notice: string | null = null) => {
      if (!unit.melodyId) {
        setSongPlayingMode('none');
        setActiveSongLineIdx(null);
        return;
      }
      stopStoryNarration();
      stopSongPlayback();
      stopKidSongReplay();
      setSongNotice(notice);
      setSongPlayingMode('melody');
      setActiveSongLineIdx(0);
      stopSongPlayerRef.current = playKidsMelody(unit.melodyId, {
        rate,
        onLineChange: (idx) => setActiveSongLineIdx(idx),
        onEnded: () => {
          stopSongPlayerRef.current = null;
          setSongPlayingMode('none');
          setActiveSongLineIdx(null);
        },
      }).stop;
    },
    [stopStoryNarration, stopSongPlayback, stopKidSongReplay]
  );

  // Load admin-configured kids song vocal/YouTube media
  useEffect(() => {
    let active = true;
    fetchKidsSongsMedia().then((map) => {
      if (active) setKidsSongsMedia(map);
    });
    return () => {
      active = false;
    };
  }, []);

  // Cleanup timers, mic, song playback, and audio URLs
  useEffect(() => {
    return () => {
      stopMicRef.current?.(true);
      stopMicRef.current = null;
      stopStoryNarration();
      stopSongPlayback();
      stopKidSongReplay();
      stopKidSongCapture();
      if (mismatchTimerRef.current) clearTimeout(mismatchTimerRef.current);
    };
  }, [stopStoryNarration, stopSongPlayback, stopKidSongReplay, stopKidSongCapture]);

  useEffect(() => {
    const url = micFeedback?.audioUrl;
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [micFeedback?.audioUrl]);

  useEffect(() => {
    const url = kidSongAudioUrl;
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [kidSongAudioUrl]);

  useEffect(() => {
    setKidSongAudioUrl(null);
  }, [selectedUnitId]);

  // Stop narration & song playback when switching tab or unit
  useEffect(() => {
    stopStoryNarration();
    stopSongPlayback();
    stopKidSongReplay();
    stopKidSongCapture();
    setShowSongYoutube(false);
    setSongNotice(null);
    setKidSongRecError(null);
  }, [activeTab, selectedUnitId, stopStoryNarration, stopSongPlayback, stopKidSongReplay, stopKidSongCapture]);

  // Rebuild game rounds when filter changes
  useEffect(() => {
    setListenRound(buildListenRound(gamePool));
    setListenPickedId(null);
    setMatchBoard(buildMatchingBoard(gamePool));
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setMatchedIds([]);
    setMismatchHint(null);
  }, [gamePool]);

  const currentBadge = useMemo(() => {
    let earned = KIDS_BADGES[0];
    for (const b of KIDS_BADGES) {
      if (stars >= b.minStars) earned = b;
    }
    return earned;
  }, [stars]);

  const nextBadge = useMemo(
    () => KIDS_BADGES.find((b) => b.minStars > stars) || null,
    [stars]
  );

  const handlePracticeMic = (key: string, expectedText: string) => {
    if (listeningKey === key) {
      stopMicRef.current?.(false);
      return;
    }
    if (listeningKey) {
      stopMicRef.current?.(true);
      stopMicRef.current = null;
    }
    if (!isSpeechRecognitionSupported()) {
      setMicError('Thiết bị này chưa bật Micro. Bé bấm nút Loa để nghe và đọc to theo nha!');
      return;
    }

    setListeningKey(key);
    setMicInterim('');
    setMicError(null);
    setMicFeedback(null);

    stopMicRef.current = startSpeechRecognition(
      accent,
      (transcript, meta) => {
        const res = scorePronunciation(expectedText, transcript);
        setMicFeedback({
          key,
          score: res.score,
          heard: transcript,
          audioUrl: meta?.audioUrl,
        });
        if (res.score >= 65) {
          const praise = PRAISE_WORDS[Math.floor(Math.random() * PRAISE_WORDS.length)];
          rewardChild(10, 1, `${praise} Bé đọc "${expectedText}" đạt ${res.score}%! (+1 ⭐)`, true);
        } else {
          setCelebrationBanner(
            `💪 Cố lên bé ơi! Bé nghe loa chậm rồi đọc to lại "${expectedText}" nha!`
          );
        }
      },
      (err) => setMicError(err),
      () => {
        setListeningKey(null);
        setMicInterim('');
        stopMicRef.current = null;
      },
      { onInterim: (t) => setMicInterim(t) }
    );
  };

  const handleToggleStarWord = (word: KidsVocabWord) => {
    const already = starredWordIds.includes(word.id);
    if (already) return;
    setStarredWordIds((prev) => [...prev, word.id]);
    speakText(word.word, accent, speechRate);
    rewardChild(5, 1, `⭐ Bé đã thuộc từ "${word.word}" (${word.meaningVi})! +1 Ngôi sao!`, true);
  };

  const handlePlayWholeStory = () => {
    if (storyPlayingIdx !== null) {
      stopStoryNarration();
      return;
    }
    const lines = activeUnit.story.lines;
    if (lines.length === 0) return;

    const playStep = (idx: number) => {
      if (idx >= lines.length) {
        setStoryPlayingIdx(null);
        return;
      }
      setStoryPlayingIdx(idx);
      const line = lines[idx];
      speakText(line.en, accent, speechRate);
      const wordCount = line.en.split(/\s+/).filter(Boolean).length;
      const estimatedMs = Math.max(2300, Math.round((wordCount * 460) / speechRate) + 800);
      storyTimerRef.current = setTimeout(() => {
        playStep(idx + 1);
      }, estimatedMs);
    };

    playStep(0);
  };

  const activeSongLines = useMemo(() => {
    if (activeUnit.songLines && activeUnit.songLines.length > 0) {
      return activeUnit.songLines;
    }
    const enParts = activeUnit.songChant.split('\n');
    const viParts = activeUnit.songChantVi.split('\n');
    return enParts.map((en, i) => ({ en, vi: viParts[i] || '' }));
  }, [activeUnit]);

  const activeSongMedia = kidsSongsMedia[activeUnit.id];
  const resolvedSongAudioUrl = activeSongMedia?.audioUrl || activeUnit.songAudioUrl || '';
  const resolvedSongYoutubeId = activeSongMedia?.youtubeId || activeUnit.youtubeId || '';

  const handleTogglePlayVocal = () => {
    if (songPlayingMode === 'vocal') {
      stopSongPlayback();
      return;
    }
    if (!resolvedSongAudioUrl) {
      startMelodyPlayback(activeUnit, songTempo);
      return;
    }
    stopStoryNarration();
    stopSongPlayback();
    stopKidSongReplay();
    setSongNotice(null);
    const targetUnit = activeUnit;
    const targetTempo = songTempo;
    setSongPlayingMode('vocal');
    setActiveSongLineIdx(0);
    stopSongPlayerRef.current = playRealSongAudio(resolvedSongAudioUrl, {
      rate: targetTempo,
      lineCount: activeSongLines.length,
      onLineChange: (idx) => setActiveSongLineIdx(idx),
      onEnded: () => {
        stopSongPlayerRef.current = null;
        setSongPlayingMode('none');
        setActiveSongLineIdx(null);
      },
      onError: () => {
        stopSongPlayerRef.current = null;
        startMelodyPlayback(
          targetUnit,
          targetTempo,
          '⚠️ Không phát được file vocal ngoài — chuyển sang nhạc đệm giai điệu gốc!'
        );
      },
    }).stop;
  };

  const handleTogglePlayMelody = () => {
    if (songPlayingMode === 'melody') {
      stopSongPlayback();
      return;
    }
    setSongNotice(null);
    startMelodyPlayback(activeUnit, songTempo);
  };

  const handleChangeSongTempo = (nextTempo: 0.75 | 1.0) => {
    if (nextTempo === songTempo) return;
    setSongTempo(nextTempo);
    if (songPlayingMode !== 'none') {
      stopSongPlayback();
    }
  };

  const handleToggleKidSongRecord = async () => {
    if (recordingKidSong) {
      stopKidSongCaptureRef.current?.();
      return;
    }
    if (
      typeof navigator === 'undefined' ||
      !navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== 'function'
    ) {
      setKidSongRecError('Thiết bị này chưa bật Micro để thu âm giọng hát.');
      return;
    }
    stopKidSongReplay();
    setKidSongRecError(null);
    setRecordingKidSong(true);
    const session = ++songCaptureSessionRef.current;

    const capture = startUniversalAudioCapture({
      maxDurationMs: 45000,
      autoStopOnSilence: false,
    });
    stopKidSongCaptureRef.current = capture.stop;

    try {
      const res = await capture.promise;
      if (session !== songCaptureSessionRef.current) {
        if (res.playbackUrl) URL.revokeObjectURL(res.playbackUrl);
        return;
      }
      if (res.playbackUrl) {
        setKidSongAudioUrl(res.playbackUrl);
        setCelebrationBanner('🎙️ Đã thu âm phần hát của bé! Bấm "Nghe lại giọng bé" để thưởng thức nha!');
      } else {
        setKidSongRecError('Chưa thu được giọng hát của bé. Hãy bấm Thu âm và hát to hơn nha!');
      }
    } catch (err: any) {
      if (session === songCaptureSessionRef.current) {
        setKidSongRecError(err?.message || 'Không thể mở Micro để thu âm.');
      }
    } finally {
      stopKidSongCaptureRef.current = null;
      if (session === songCaptureSessionRef.current) {
        setRecordingKidSong(false);
      }
    }
  };

  const handleTogglePlayKidSong = () => {
    if (playingKidSong) {
      stopKidSongReplay();
      return;
    }
    if (!kidSongAudioUrl) return;
    stopStoryNarration();
    stopSongPlayback();
    setPlayingKidSong(true);
    stopKidSongReplayRef.current = playLoudAudioUrl(kidSongAudioUrl, {
      gain: 2.0,
      onEnded: () => {
        stopKidSongReplayRef.current = null;
        setPlayingKidSong(false);
      },
      onError: () => {
        stopKidSongReplayRef.current = null;
        setPlayingKidSong(false);
      },
    });
  };

  const handleSelectListenOption = (opt: KidsVocabWord) => {
    if (listenPickedId) return;
    setListenPickedId(opt.id);
    if (opt.id === listenRound.target.id) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      const xpBonus = nextCombo >= 3 ? 15 : 10;
      const praise = PRAISE_WORDS[Math.floor(Math.random() * PRAISE_WORDS.length)];
      rewardChild(
        xpBonus,
        1,
        `${praise} Đúng là "${opt.word}" (${opt.meaningVi})! ${nextCombo >= 2 ? `🔥 Chuỗi ${nextCombo} câu đúng!` : ''}`,
        true
      );
    } else {
      setCombo(0);
      speakText(listenRound.target.word, accent, 0.85);
      setCelebrationBanner(
        `🎈 Suýt nữa trúng rồi! Đáp án vừa rồi là ${listenRound.target.emoji} "${listenRound.target.word}" (${listenRound.target.meaningVi}) nhé!`
      );
    }
  };

  const handleNextListenQuestion = () => {
    const nextRound = buildListenRound(gamePool, listenRound.target.id);
    setListenRound(nextRound);
    setListenPickedId(null);
    speakText(nextRound.target.word, accent, speechRate);
  };

  const handleMatchAttempt = (leftId: string | null, rightId: string | null) => {
    if (!leftId || !rightId) return;
    if (leftId === rightId) {
      const wordObj = matchBoard.pairs.find((p) => p.id === leftId);
      const nextMatched = matchedIds.includes(leftId) ? matchedIds : [...matchedIds, leftId];
      setMatchedIds(nextMatched);
      setSelectedLeftId(null);
      setSelectedRightId(null);
      setMismatchHint(null);

      if (nextMatched.length === matchBoard.pairs.length) {
        rewardChild(
          20,
          2,
          `🏆 Hoan hô! Bé đã ghép đúng toàn bộ ${matchBoard.pairs.length} cặp từ! (+2 ⭐, +20 XP)`,
          true
        );
      } else {
        rewardChild(5, 1, `✨ Đúng cặp "${wordObj?.word}" rồi! (+1 ⭐)`, false);
      }
    } else {
      setMismatchHint('🙈 Chưa khớp rồi nè! Bé thử ghép cặp khác xem sao nha!');
      if (mismatchTimerRef.current) clearTimeout(mismatchTimerRef.current);
      mismatchTimerRef.current = setTimeout(() => {
        setSelectedLeftId(null);
        setSelectedRightId(null);
        setMismatchHint(null);
      }, 650);
    }
  };

  const handleResetMatchBoard = () => {
    setMatchBoard(buildMatchingBoard(gamePool));
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setMatchedIds([]);
    setMismatchHint(null);
  };

  const handlePickYleOption = (questionId: string, optionIdx: number, correctIdx: number, explain: string) => {
    if (yleAnswers[questionId] !== undefined) return;
    setYleAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    if (optionIdx === correctIdx) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      rewardChild(15, 2, `${explain} (+2 ⭐, +15 XP)`, true);
    } else {
      setCombo(0);
      setCelebrationBanner(`💡 Gợi ý cho bé: ${explain}`);
    }
  };

  const currentYleQuestion = yleQuestions[yleIndex] || yleQuestions[0];
  const yleAnsweredCount = yleQuestions.filter((q) => yleAnswers[q.id] !== undefined).length;
  const yleCorrectCount = yleQuestions.filter((q) => yleAnswers[q.id] === q.correctIndex).length;
  const yleShields =
    yleQuestions.length > 0
      ? Math.max(1, Math.round((yleCorrectCount / yleQuestions.length) * 5))
      : 1;

  const filteredChunks = useMemo(() => {
    if (chunkCategory === 'Tất cả') return KIDS_SENTENCE_CHUNKS;
    return KIDS_SENTENCE_CHUNKS.filter((c) => c.category === chunkCategory);
  }, [chunkCategory]);
  const chunkPagination = usePagination(filteredChunks, 6, { resetKey: chunkCategory });

  const ageBandText = profile?.kids?.ageBand === '8-10' ? '8–10 tuổi' : '6–7 tuổi';

  const TABS: { id: KidsTab; label: string; emoji: string; activeGradient: string }[] = [
    { id: 'vocab', label: 'Từ Vựng Qua Tranh', emoji: '🎨', activeGradient: 'from-pink-500 to-rose-500' },
    { id: 'stories', label: 'Truyện Kể & Bài Hát', emoji: '📖', activeGradient: 'from-amber-500 to-orange-500' },
    { id: 'sentences', label: 'Mẫu Câu Đầu Tiên', emoji: '💬', activeGradient: 'from-sky-500 to-cyan-500' },
    { id: 'games', label: 'Trò Chơi Ghép & Nghe', emoji: '🎮', activeGradient: 'from-emerald-500 to-teal-500' },
    ...(showYleTab
      ? [{ id: 'yle' as KidsTab, label: 'Thử Thách Cambridge YLE', emoji: '🏅', activeGradient: 'from-violet-500 to-purple-600' }]
      : []),
  ];

  return (
    <div className="space-y-4">
      {/* Compact Playful Status Strip when inside MobileAppShell (hideHeaderNav=true) */}
      {hideHeaderNav ? (
        <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-[22px] bg-white/95 border-2 border-[#DDF1FF] shadow-xs">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FFF7D1] border border-[#FFE074] text-[#9A5600] font-extrabold text-xs inline-flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              {stars} Sao
            </span>
            {sessionXp > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-[#E3F4FF] text-[#1674DA] font-extrabold text-xs">
                +{sessionXp} XP
              </span>
            )}
          </div>

          <div className="inline-flex items-center gap-1 bg-[#F0F8FF] p-1 rounded-full border border-[#D6ECFF]">
            <button
              type="button"
              onClick={() => setSpeechRate(0.85)}
              className={`min-h-[34px] px-3 py-1 rounded-full text-xs font-extrabold transition flex items-center gap-1 ${
                speechRate === 0.85 ? 'bg-[#1684F0] text-white shadow-xs' : 'text-[#426996]'
              }`}
            >
              <Turtle className="w-3.5 h-3.5" /> Chậm
            </button>
            <button
              type="button"
              onClick={() => setSpeechRate(1.0)}
              className={`min-h-[34px] px-3 py-1 rounded-full text-xs font-extrabold transition flex items-center gap-1 ${
                speechRate === 1.0 ? 'bg-[#1684F0] text-white shadow-xs' : 'text-[#426996]'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" /> Chuẩn
            </button>
          </div>
        </div>
      ) : (
        /* Full Hero Banner for standalone usage */
        <div className="rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-pink-500 p-5 sm:p-6 text-white shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/25 backdrop-blur-sm text-xs font-extrabold">
                <span>🧸 Khu Vườn Tiếng Anh Nhí ({ageBandText})</span>
                <span>•</span>
                <span>{accent === 'en-GB' ? '🇬🇧 Giọng Anh' : '🇺🇸 Giọng Mỹ'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Chào Bé Yêu! Cùng Chơi &amp; Học Tiếng Anh Nhé! 🌈
              </h2>
              <p className="text-sm sm:text-base text-white/95 font-medium max-w-2xl">
                Chạm vào hình để nghe phát âm, hát theo vè nhịp điệu, chơi ghép tranh và thu thập thật nhiều ngôi sao lấp lánh!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="px-3.5 py-2 rounded-2xl bg-white text-amber-700 font-black text-sm shadow-sm flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>{stars} Sao</span>
              </div>
              <div className="px-3.5 py-2 rounded-2xl bg-white/95 text-orange-600 font-black text-sm shadow-sm flex items-center gap-1.5">
                <Flame className="w-4 h-4 fill-orange-400 text-orange-500" />
                <span>Combo {combo}</span>
              </div>
              <div className="px-3.5 py-2 rounded-2xl bg-white/95 text-violet-700 font-black text-sm shadow-sm flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-violet-500" />
                <span>+{sessionXp} XP</span>
              </div>
              <div
                className={`px-3.5 py-2 rounded-2xl border font-extrabold text-xs sm:text-sm shadow-sm flex items-center gap-1.5 ${currentBadge.colorClass}`}
              >
                <span>{currentBadge.emoji}</span>
                <span>{currentBadge.title}</span>
                {nextBadge && (
                  <span className="opacity-75 text-xs">
                    (còn {nextBadge.minStars - stars}⭐ lên {nextBadge.emoji})
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/25 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold">🔊 Tốc độ đọc cho bé:</span>
              <button
                type="button"
                onClick={() => setSpeechRate(0.85)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold transition flex items-center gap-1.5 ${
                  speechRate === 0.85
                    ? 'bg-white text-orange-600 shadow-md scale-[1.03]'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Turtle className="w-4 h-4" /> Chậm Rõ (0.85x)
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(1.0)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold transition flex items-center gap-1.5 ${
                  speechRate === 1.0
                    ? 'bg-white text-orange-600 shadow-md scale-[1.03]'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Volume2 className="w-4 h-4" /> Tự Nhiên (1.0x)
              </button>
            </div>

            <div className="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-full">
              ⭐ Đã thuộc {starredWordIds.length}/{ALL_KIDS_WORDS.length} từ vựng tranh
            </div>
          </div>
        </div>
      )}

      {/* Cheerful Feedback Toast */}
      {celebrationBanner && (
        <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 border-2 border-emerald-300 dark:border-emerald-700 px-4 py-3 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2.5 text-sm sm:text-base font-extrabold text-emerald-900 dark:text-emerald-200">
            <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
            <span>{celebrationBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setCelebrationBanner(null)}
            className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-white"
          >
            Ẩn
          </button>
        </div>
      )}

      {/* 5 Big Colorful Tabs (only shown in standalone mode) */}
      {!hideHeaderNav && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[56px] px-3.5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-2 border-2 ${
                  isActive
                    ? `bg-gradient-to-r ${tab.activeGradient} text-white border-transparent shadow-md scale-[1.02]`
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-amber-300'
                }`}
              >
                <span className="text-xl leading-none">{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Compact K5 Switcher between Games & YLE when inside MobileAppShell */}
      {hideHeaderNav && showYleTab && (activeTab === 'games' || activeTab === 'yle') && (
        <div className="flex items-center gap-2 bg-white/90 p-1.5 rounded-full border-2 border-[#DDF1FF] w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('games')}
            className={`min-h-[40px] px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold transition ${
              activeTab === 'games'
                ? 'bg-[#1684F0] text-white shadow-xs'
                : 'text-[#355C8A] hover:bg-[#EEF7FF]'
            }`}
          >
            🎮 Trò chơi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('yle')}
            className={`min-h-[40px] px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold transition ${
              activeTab === 'yle'
                ? 'bg-[#7C3AED] text-white shadow-xs'
                : 'text-[#355C8A] hover:bg-[#EEF7FF]'
            }`}
          >
            🏅 Cambridge YLE
          </button>
        </div>
      )}

      {/* ==================== TAB 1: VOCAB ==================== */}
      {activeTab === 'vocab' && (
        <div className="space-y-4">
          {/* Compact Unit Picker Toggle on mobile so Flashcard is immediately visible */}
          {hideHeaderNav && (
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setShowUnitPicker((v) => !v)}
                className="min-h-[44px] px-4 py-2 rounded-full bg-white border-2 border-[#D6ECFF] text-[#123A6F] text-sm font-extrabold inline-flex items-center gap-2 shadow-xs"
              >
                <Palette className="w-4 h-4 text-pink-500" />
                <span>{showUnitPicker ? 'Thu gọn danh sách chủ đề' : `Đổi chủ đề (${KIDS_UNITS.length})`}</span>
              </button>
              <span className="text-xs font-extrabold text-[#486B94]">
                ⭐ {starredWordIds.length}/{ALL_KIDS_WORDS.length} từ
              </span>
            </div>
          )}

          {/* Units Selector (8 units per page) */}
          {(!hideHeaderNav || showUnitPicker) && (
          <div ref={vocabUnitsRef} className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-200/80 dark:border-slate-800 p-4 sm:p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-500" />
                <span>Chọn 1 Trong {KIDS_UNITS.length} Chủ Đề Vui Nhộn</span>
              </h3>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {KIDS_UNITS.length} chủ đề • {ALL_KIDS_WORDS.length} từ
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {vocabUnitPagination.pageItems.map((unit, idx) => {
                const unitNumber = vocabUnitPagination.startIdx + idx + 1;
                const isSelected = unit.id === activeUnit.id;
                const doneCount = unit.words.filter((w) => starredWordIds.includes(w.id)).length;
                const unitThumb = unit.words[0] ? resolveFlashcardImage(unit.words[0].word, unit.words[0].meaningVi, unit.id) : '/preschool/img/words/star.webp';
                return (
                  <button
                    key={unit.id}
                    type="button"
                    onClick={() => {
                      setSelectedUnitId(unit.id);
                      if (hideHeaderNav) setShowUnitPicker(false);
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? `bg-gradient-to-br ${unit.color} text-white border-transparent shadow-md scale-[1.03]`
                        : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-amber-300 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <img
                        src={unitThumb}
                        alt={unit.title}
                        className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-100 object-contain shrink-0"
                      />
                      <span
                        className={`text-xs font-black px-2 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-white/25 text-white'
                            : 'bg-amber-100 text-amber-800 dark:bg-slate-700 dark:text-amber-300'
                        }`}
                      >
                        {doneCount}/{unit.words.length} ⭐
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-black leading-tight">
                        Unit {unitNumber}: {unit.title}
                      </div>
                      <div
                        className={`text-xs font-semibold mt-0.5 ${
                          isSelected ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {unit.titleVi}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <PaginationBar
              page={vocabUnitPagination.page}
              totalPages={vocabUnitPagination.totalPages}
              totalItems={vocabUnitPagination.totalItems}
              startIdx={vocabUnitPagination.startIdx}
              endIdx={vocabUnitPagination.endIdx}
              onPageChange={vocabUnitPagination.setPage}
              variant="kid"
              itemLabel="chủ đề"
              scrollTargetRef={vocabUnitsRef}
            />
          </div>
          )}

          {/* Active Unit Banner */}
          <div className={`rounded-3xl bg-gradient-to-r ${activeUnit.color} p-5 text-white shadow-md flex flex-wrap items-center justify-between gap-3`}>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-sm flex items-center justify-center shrink-0">
                <img
                  src={activeUnit.words[0] ? resolveFlashcardImage(activeUnit.words[0].word, activeUnit.words[0].meaningVi, activeUnit.id) : '/preschool/img/words/star.webp'}
                  alt={activeUnit.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wide text-white/90">
                  Chủ đề đang học
                </div>
                <h3 className="text-xl sm:text-2xl font-black">
                  {activeUnit.title} — {activeUnit.titleVi}
                </h3>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex bg-white/25 backdrop-blur-sm p-1 rounded-2xl gap-1">
                <button
                  type="button"
                  onClick={() => setVocabViewMode('3d')}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition ${
                    vocabViewMode === '3d'
                      ? 'bg-white text-pink-600 shadow'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  🎴 Flashcard 3D
                </button>
                <button
                  type="button"
                  onClick={() => setVocabViewMode('grid')}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition ${
                    vocabViewMode === 'grid'
                      ? 'bg-white text-pink-600 shadow'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  🃏 Lưới Tất Cả Thẻ
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  const allWords = activeUnit.words.map((w) => w.word).join(', ');
                  speakText(allWords, accent, speechRate);
                }}
                className="px-4 py-2.5 rounded-2xl bg-white text-slate-900 font-black text-xs sm:text-sm shadow hover:scale-105 transition flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4 text-pink-500" />
                Nghe Tất Cả {activeUnit.words.length} Từ
              </button>
            </div>
          </div>

          {/* Mic feedback status */}
          {(listeningKey || micError || micFeedback) && (
            <div className="space-y-2">
              {listeningKey && (
                <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-300 text-sm font-extrabold text-sky-800 dark:text-sky-200 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                  <span>Đang lắng nghe bé đọc... {micInterim ? `"${micInterim}"` : 'Bé nói to rõ vào Micro nhé!'}</span>
                </div>
              )}
              {micError && (
                <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-200 text-sm font-bold text-rose-700 dark:text-rose-200">
                  {micError}
                </div>
              )}
              {micFeedback && (
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 flex flex-wrap items-center justify-between gap-2 text-sm font-extrabold text-emerald-800 dark:text-emerald-200">
                  <span>
                    🎤 Bé vừa đọc: "{micFeedback.heard}" — Độ khớp: {micFeedback.score}%
                  </span>
                  {micFeedback.audioUrl && (
                    <button
                      type="button"
                      onClick={() => playLoudAudioUrl(micFeedback.audioUrl!, { gain: 1.5 })}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold inline-flex items-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe lại giọng bé
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {vocabViewMode === '3d' ? (
            <KidsFlashcard3D
              unit={activeUnit}
              accent={accent}
              speechRate={speechRate}
              starredWordIds={starredWordIds}
              listeningKey={listeningKey}
              onToggleStar={handleToggleStarWord}
              onPracticeMic={handlePracticeMic}
              onAddXp={onAddXp}
            />
          ) : (
            /* Giant Kid-Friendly Vocab Cards Grid (8 words/page) */
            <div ref={vocabWordsRef} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vocabWordPagination.pageItems.map((item) => {
              const isStarred = starredWordIds.includes(item.id);
              const isMicActive = listeningKey === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border-2 p-5 transition shadow-sm flex flex-col justify-between gap-4 ${activeUnit.cardBg}`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      onClick={() => speakText(item.word, accent, speechRate)}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white shadow-md border-2 border-white/80 p-2 flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition"
                      title="Bấm vào hình để nghe"
                    >
                      <img
                        src={resolveFlashcardImage(item.word, item.meaningVi, activeUnit.id)}
                        alt={item.word}
                        className="w-full h-full object-contain"
                      />
                    </button>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                          {item.word}
                        </h4>
                        {isStarred && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-white text-xs font-black shadow-sm">
                            <Star className="w-3.5 h-3.5 fill-white" /> Đã nhớ
                          </span>
                        )}
                      </div>

                      <div className="text-base sm:text-lg font-extrabold text-slate-800 dark:text-slate-100">
                        {item.meaningVi}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-0.5">
                        <span className={`px-2.5 py-1 rounded-xl text-xs font-extrabold ${activeUnit.badgeClass}`}>
                          🗣️ Đọc gần giống: "{item.phoneticVi}"
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sample sentence box */}
                  <div className="rounded-2xl bg-white/90 dark:bg-slate-900/80 p-3.5 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                        “{item.sampleSentence}”
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-0.5">
                        {item.sampleVi}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakText(item.sampleSentence, accent, speechRate)}
                      className="p-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white shrink-0 shadow-sm"
                      title="Nghe câu mẫu"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => speakText(item.word, accent, 0.85)}
                      className="flex-1 min-w-[105px] py-2.5 px-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Turtle className="w-4 h-4" /> Nghe 0.85x
                    </button>

                    <button
                      type="button"
                      onClick={() => speakText(item.word, accent, 1.0)}
                      className="py-2.5 px-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5"
                    >
                      <Volume2 className="w-4 h-4 text-indigo-500" /> 1.0x
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePracticeMic(item.id, item.word)}
                      className={`py-2.5 px-3.5 rounded-2xl font-extrabold text-xs sm:text-sm text-white shadow-sm flex items-center justify-center gap-1.5 transition ${
                        isMicActive
                          ? 'bg-rose-600 animate-pulse'
                          : 'bg-emerald-500 hover:bg-emerald-600'
                      }`}
                    >
                      {isMicActive ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      {isMicActive ? 'Dừng' : 'Đọc theo'}
                    </button>

                    <button
                      type="button"
                      disabled={isStarred}
                      onClick={() => handleToggleStarWord(item)}
                      className={`py-2.5 px-3.5 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition ${
                        isStarred
                          ? 'bg-amber-200/80 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 cursor-default'
                          : 'bg-amber-400 hover:bg-amber-500 text-white shadow-sm'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-600' : 'fill-white'}`} />
                      {isStarred ? 'Đã thuộc' : 'Chấm sao'}
                    </button>
                  </div>
                </div>
              );
            })}
              </div>

              <PaginationBar
                page={vocabWordPagination.page}
                totalPages={vocabWordPagination.totalPages}
                totalItems={vocabWordPagination.totalItems}
                startIdx={vocabWordPagination.startIdx}
                endIdx={vocabWordPagination.endIdx}
                onPageChange={vocabWordPagination.setPage}
                variant="kid"
                itemLabel="từ vựng"
                scrollTargetRef={vocabWordsRef}
              />
            </div>
          )}

          {!hideHeaderNav && activeUnit.exercises && activeUnit.exercises.length > 0 && (
            <div className="mt-6">
              <ExerciseRunner
                key={activeUnit.id}
                exercises={activeUnit.exercises}
                accent={accent}
                title={`🎯 Bé Luyện Tập: ${activeUnit.titleVi}`}
                subtitle="10 bài tập vui (Chọn từ, Điền chữ, Ghép câu, Nối cặp, Đúng/Sai) giúp bé nhớ từ siêu lâu!"
                onComplete={(correct, total) => {
                  if (correct >= Math.ceil(total * 0.6)) onAddXp(25);
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB 2: STORIES & SONGS ==================== */}
      {activeTab === 'stories' && (
        <div className="space-y-5">
          {/* Quick Unit Pill Bar (8 per page) */}
          <div ref={storiesUnitsRef} className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-200/80 dark:border-slate-800 p-4 space-y-3">
            <div className="text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400">
              Chọn chủ đề truyện &amp; bài hát cho bé:
            </div>
            <div className="flex flex-wrap gap-2">
              {storiesUnitPagination.pageItems.map((u) => {
                const active = u.id === activeUnit.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setSelectedUnitId(u.id)}
                    className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition flex items-center gap-1.5 border-2 ${
                      active
                        ? `bg-gradient-to-r ${u.color} text-white border-transparent shadow-sm`
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <span>{u.emoji}</span>
                    <span>{u.titleVi}</span>
                  </button>
                );
              })}
            </div>

            <PaginationBar
              page={storiesUnitPagination.page}
              totalPages={storiesUnitPagination.totalPages}
              totalItems={storiesUnitPagination.totalItems}
              startIdx={storiesUnitPagination.startIdx}
              endIdx={storiesUnitPagination.endIdx}
              onPageChange={storiesUnitPagination.setPage}
              variant="kid"
              itemLabel="chủ đề"
              scrollTargetRef={storiesUnitsRef}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Song / Chant Card */}
            <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-200 dark:border-amber-800 p-5 sm:p-6 flex flex-col justify-between gap-4">
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="inline-block px-3 py-1 rounded-full bg-amber-400 text-white text-xs font-black">
                        🎵 Bài Hát Thiếu Nhi
                      </span>
                      {activeUnit.originalTuneName && (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-800 text-amber-800 dark:text-amber-200 text-[11px] font-extrabold border border-amber-200 dark:border-amber-700">
                          🎶 Giai điệu: {activeUnit.originalTuneName}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mt-2">
                      {activeUnit.songChantTitle}
                    </h3>
                  </div>
                  <span className="text-4xl">{activeUnit.emoji}</span>
                </div>

                {/* Tempo control */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-extrabold text-amber-900 dark:text-amber-200">
                    🎹 Nhịp nhạc cho bé:
                  </span>
                  <div className="inline-flex rounded-xl bg-white/80 dark:bg-slate-800 p-1 border border-amber-200 dark:border-slate-700 gap-1">
                    <button
                      type="button"
                      onClick={() => handleChangeSongTempo(0.75)}
                      className={`px-2.5 py-1 rounded-lg font-extrabold transition ${
                        songTempo === 0.75
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-amber-100/70'
                      }`}
                    >
                      🐢 Chậm 0.75x
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChangeSongTempo(1.0)}
                      className={`px-2.5 py-1 rounded-lg font-extrabold transition ${
                        songTempo === 1.0
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-amber-100/70'
                      }`}
                    >
                      🎵 Chuẩn 1.0x
                    </button>
                  </div>
                </div>

                {/* Karaoke Lyric Lines */}
                <div className="rounded-2xl bg-white/95 dark:bg-slate-900 p-3.5 border border-amber-200 dark:border-slate-700 space-y-2">
                  {activeSongLines.map((line, idx) => {
                    const isCurrent = activeSongLineIdx === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => speakText(line.en, accent, speechRate)}
                        title="Chạm để nghe đọc chậm câu này"
                        className={`rounded-xl px-3 py-2 cursor-pointer transition border ${
                          isCurrent
                            ? 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/40 border-orange-400 shadow-sm scale-[1.01]'
                            : 'border-transparent hover:bg-amber-50/70 dark:hover:bg-slate-800/70'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className={`text-sm mt-0.5 shrink-0 ${
                              isCurrent ? 'animate-bounce' : 'opacity-40'
                            }`}
                          >
                            {isCurrent ? '🎶' : '♪'}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-sm sm:text-base font-extrabold leading-snug ${
                                isCurrent
                                  ? 'text-orange-700 dark:text-amber-200'
                                  : 'text-indigo-700 dark:text-indigo-300'
                              }`}
                            >
                              {line.en}
                            </p>
                            {line.vi && (
                              <p className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                                {line.vi}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {songNotice && (
                  <div className="rounded-xl bg-amber-100/90 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700 px-3 py-2 text-xs font-bold text-amber-900 dark:text-amber-200">
                    {songNotice}
                  </div>
                )}

                {showSongYoutube && resolvedSongYoutubeId && (
                  <div className="rounded-2xl overflow-hidden border-2 border-rose-200 dark:border-rose-800 bg-black aspect-video shadow-sm">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${resolvedSongYoutubeId}?rel=0`}
                      title={activeUnit.songChantTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {kidSongRecError && (
                  <div className="rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 px-3 py-2 text-xs font-bold text-rose-700 dark:text-rose-200">
                    {kidSongRecError}
                  </div>
                )}
              </div>

              <div className="space-y-2.5">
                {/* Main Music / Vocal Row */}
                <div className="flex flex-wrap items-center gap-2">
                  {resolvedSongAudioUrl ? (
                    <>
                      <button
                        type="button"
                        onClick={handleTogglePlayVocal}
                        className={`flex-1 min-w-[175px] py-3 px-4 rounded-2xl font-black text-sm shadow-sm flex items-center justify-center gap-2 transition ${
                          songPlayingMode === 'vocal'
                            ? 'bg-rose-500 hover:bg-rose-600 text-white'
                            : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white'
                        }`}
                      >
                        {songPlayingMode === 'vocal' ? (
                          <>
                            <Square className="w-4 h-4 fill-current" /> Dừng Bài Hát
                          </>
                        ) : (
                          <>
                            <Music className="w-5 h-5" /> Nghe Ca Sĩ Hát ({songTempo}x)
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleTogglePlayMelody}
                        className={`py-3 px-3.5 rounded-2xl font-black text-xs sm:text-sm border transition flex items-center justify-center gap-1.5 ${
                          songPlayingMode === 'melody'
                            ? 'bg-rose-500 text-white border-rose-500'
                            : 'bg-white dark:bg-slate-800 text-orange-700 dark:text-amber-300 border-orange-300 dark:border-slate-700 hover:bg-orange-50'
                        }`}
                      >
                        {songPlayingMode === 'melody' ? (
                          <>
                            <Square className="w-4 h-4 fill-current" /> Dừng Nhạc Đệm
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current" /> Nhạc Đệm Karaoke
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleTogglePlayMelody}
                      className={`flex-1 min-w-[190px] py-3 px-4 rounded-2xl font-black text-sm shadow-sm flex items-center justify-center gap-2 transition ${
                        songPlayingMode === 'melody'
                          ? 'bg-rose-500 hover:bg-rose-600 text-white'
                          : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white'
                      }`}
                    >
                      {songPlayingMode === 'melody' ? (
                        <>
                          <Square className="w-4 h-4 fill-current" /> Dừng Giai Điệu
                        </>
                      ) : (
                        <>
                          <Music className="w-5 h-5" /> Hát Theo Giai Điệu ({songTempo}x)
                        </>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      stopSongPlayback();
                      speakText(activeUnit.songChant.replace(/\n/g, ' '), accent, speechRate);
                    }}
                    title="Nghe đọc từng từ chậm rõ để bé làm quen lời"
                    className="py-3 px-3 rounded-2xl bg-white/95 dark:bg-slate-800 border border-amber-300 dark:border-slate-700 text-amber-800 dark:text-amber-200 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-100/70"
                  >
                    <Volume2 className="w-4 h-4" /> Đọc lời
                  </button>

                  {resolvedSongYoutubeId && (
                    <button
                      type="button"
                      onClick={() => {
                        stopSongPlayback();
                        setShowSongYoutube((v) => !v);
                      }}
                      className={`py-3 px-3 rounded-2xl font-bold text-xs border flex items-center gap-1.5 transition ${
                        showSongYoutube
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-300 border-rose-200 dark:border-rose-800 hover:bg-rose-50'
                      }`}
                    >
                      <Video className="w-4 h-4" /> {showSongYoutube ? 'Ẩn Video' : 'Video Hát Gốc'}
                    </button>
                  )}
                </div>

                {/* Kid Self-Recording + Star Reward Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleKidSongRecord}
                    className={`py-2.5 px-3.5 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition border ${
                      recordingKidSong
                        ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                        : 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-200 border-indigo-200 dark:border-slate-700 hover:bg-indigo-50'
                    }`}
                  >
                    {recordingKidSong ? (
                      <>
                        <Square className="w-4 h-4 fill-current" /> Dừng thu
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4" /> Thu âm bé hát
                      </>
                    )}
                  </button>

                  {kidSongAudioUrl && (
                    <button
                      type="button"
                      onClick={handleTogglePlayKidSong}
                      className={`py-2.5 px-3.5 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition border ${
                        playingKidSong
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-200 border-sky-200 dark:border-sky-700 hover:bg-sky-100'
                      }`}
                    >
                      {playingKidSong ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-current" /> Dừng phát
                        </>
                      ) : (
                        <>
                          <Headphones className="w-4 h-4" /> Nghe lại giọng bé
                        </>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    disabled={completedChantIds.includes(activeUnit.id)}
                    onClick={() => {
                      if (completedChantIds.includes(activeUnit.id)) return;
                      setCompletedChantIds((prev) => [...prev, activeUnit.id]);
                      rewardChild(
                        10,
                        1,
                        `🎶 Bé hát bài "${activeUnit.songChantTitle}" hay quá! (+1 ⭐, +10 XP)`,
                        true
                      );
                    }}
                    className={`ml-auto py-2.5 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition ${
                      completedChantIds.includes(activeUnit.id)
                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-200'
                        : 'bg-amber-400 hover:bg-amber-500 text-white shadow-sm'
                    }`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                    {completedChantIds.includes(activeUnit.id) ? 'Đã hát xong' : 'Bé đã hát theo!'}
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Bilingual Mini Story */}
            <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between gap-4">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-sky-500 text-white text-xs font-black">
                      📖 Truyện Kể Song Ngữ
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
                      {activeUnit.story.title}
                    </h3>
                    <p className="text-sm font-bold text-sky-600 dark:text-sky-400">
                      {activeUnit.story.titleVi}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handlePlayWholeStory}
                    className={`px-4 py-3 rounded-2xl font-black text-sm text-white shadow-md flex items-center gap-2 transition ${
                      storyPlayingIdx !== null
                        ? 'bg-rose-500 hover:bg-rose-600'
                        : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:opacity-95'
                    }`}
                  >
                    {storyPlayingIdx !== null ? (
                      <>
                        <Square className="w-4 h-4 fill-white" /> Dừng Kể Truyện
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-white" /> Kể Toàn Bộ Truyện
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-3">
                  {activeUnit.story.lines.map((line, idx) => {
                    const isReading = storyPlayingIdx === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          stopStoryNarration();
                          speakText(line.en, accent, speechRate);
                        }}
                        className={`cursor-pointer p-4 rounded-2xl border-2 transition flex items-start gap-3.5 ${
                          isReading
                            ? 'bg-sky-50 dark:bg-sky-950/50 border-sky-400 shadow-md scale-[1.01]'
                            : 'bg-slate-50/80 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-sky-300'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-3xl shrink-0 shadow-sm">
                          {line.avatar}
                        </div>
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-black uppercase text-sky-600 dark:text-sky-400">
                              {line.speaker}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                              <Volume2 className="w-3.5 h-3.5" /> Chạm để nghe
                            </span>
                          </div>
                          <p className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                            {line.en}
                          </p>
                          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                            {line.vi}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-sky-500" /> Bấm từng khung thoại để nghe lặp lại chậm!
                </span>
                <button
                  type="button"
                  disabled={completedStoryIds.includes(activeUnit.id)}
                  onClick={() => {
                    if (completedStoryIds.includes(activeUnit.id)) return;
                    setCompletedStoryIds((prev) => [...prev, activeUnit.id]);
                    rewardChild(
                      15,
                      2,
                      `📖 Bé đã đọc xong truyện "${activeUnit.story.titleVi}"! (+2 ⭐, +15 XP)`,
                      true
                    );
                  }}
                  className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition ${
                    completedStoryIds.includes(activeUnit.id)
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-200'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {completedStoryIds.includes(activeUnit.id) ? 'Đã đọc xong' : 'Bé đã hiểu truyện! (+2⭐)'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 3: FIRST SENTENCE CHUNKS ==================== */}
      {activeTab === 'sentences' && (
        <div ref={chunksSectionRef} className="space-y-5">
          {/* Category Filter */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-sky-200/80 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-base font-black text-slate-900 dark:text-white">
              <MessageCircle className="w-5 h-5 text-sky-500" />
              <span>Mẫu Câu Giao Tiếp Đầu Đời (Chạm để ghép từ vui!)</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Tất cả', 'Chào hỏi', 'Sở thích', 'Xin phép', 'Vui chơi'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setChunkCategory(cat)}
                  className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition border-2 ${
                    chunkCategory === cat
                      ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chunkPagination.pageItems.map((chunk: KidsSentenceChunk) => {
              const activeSwapIdx = selectedSwaps[chunk.id];
              const activeSwap =
                chunk.swaps && activeSwapIdx !== undefined ? chunk.swaps[activeSwapIdx] : null;
              const displayEn = activeSwap ? activeSwap.fullEn : chunk.exampleEn;
              const displayVi = activeSwap ? activeSwap.fullVi : chunk.meaningVi;
              const isDone = completedChunkIds.includes(chunk.id);
              const isMicActive = listeningKey === chunk.id;

              return (
                <div
                  key={chunk.id}
                  className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-slate-800 p-5 space-y-4 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-200 text-xs font-black">
                        {chunk.emoji} {chunk.category}
                      </span>
                      <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
                        Khung câu: {chunk.pattern}
                      </span>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/40 p-4 border border-sky-100 dark:border-sky-900 space-y-1.5">
                      <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                        “{displayEn}”
                      </div>
                      <div className="text-sm sm:text-base font-bold text-sky-700 dark:text-sky-300">
                        {displayVi}
                      </div>
                      {!activeSwap && (
                        <div className="text-xs font-bold text-slate-600 dark:text-slate-300 pt-1">
                          🗣️ Gợi ý đọc: <span className="text-indigo-600 dark:text-indigo-400">"{chunk.phoneticVi}"</span>
                        </div>
                      )}
                    </div>

                    {/* Interactive Word Swaps */}
                    {chunk.swaps && chunk.swaps.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-xs font-extrabold text-slate-500 dark:text-slate-400">
                          ✨ Thử thay đổi từ để nói câu mới:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {chunk.swaps.map((sw, idx) => {
                            const selected = activeSwapIdx === idx;
                            return (
                              <button
                                key={sw.label}
                                type="button"
                                onClick={() => {
                                  setSelectedSwaps((prev) => ({ ...prev, [chunk.id]: idx }));
                                  speakText(sw.fullEn, accent, speechRate);
                                }}
                                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border-2 transition flex items-center gap-1 ${
                                  selected
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                                }`}
                              >
                                <span>{sw.emoji}</span>
                                <span>{sw.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="text-xs font-semibold text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 px-3 py-2 rounded-xl border border-amber-200/80 dark:border-amber-800/50">
                      💡 Mẹo nhỏ: {chunk.tipForKids}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => speakText(displayEn, accent, 0.85)}
                      className="flex-1 min-w-[110px] py-2.5 px-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Turtle className="w-4 h-4" /> Nghe Chậm
                    </button>

                    <button
                      type="button"
                      onClick={() => speakText(displayEn, accent, 1.0)}
                      className="py-2.5 px-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5"
                    >
                      <Volume2 className="w-4 h-4 text-sky-600" /> 1.0x
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePracticeMic(chunk.id, displayEn)}
                      className={`py-2.5 px-3.5 rounded-2xl font-extrabold text-xs sm:text-sm text-white flex items-center gap-1.5 ${
                        isMicActive ? 'bg-rose-600 animate-pulse' : 'bg-emerald-500 hover:bg-emerald-600'
                      }`}
                    >
                      {isMicActive ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      {isMicActive ? 'Dừng' : 'Nói theo'}
                    </button>

                    <button
                      type="button"
                      disabled={isDone}
                      onClick={() => {
                        if (isDone) return;
                        setCompletedChunkIds((prev) => [...prev, chunk.id]);
                        rewardChild(10, 1, `💬 Bé đã nói thành thạo mẫu câu "${displayEn}"! (+1 ⭐)`, true);
                      }}
                      className={`py-2.5 px-3.5 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-1 ${
                        isDone
                          ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200'
                          : 'bg-amber-400 hover:bg-amber-500 text-white shadow-sm'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      {isDone ? 'Đã thuộc' : 'Chấm sao'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <PaginationBar
            page={chunkPagination.page}
            totalPages={chunkPagination.totalPages}
            totalItems={chunkPagination.totalItems}
            startIdx={chunkPagination.startIdx}
            endIdx={chunkPagination.endIdx}
            onPageChange={chunkPagination.setPage}
            variant="kid"
            itemLabel="mẫu câu"
            scrollTargetRef={chunksSectionRef}
          />
        </div>
      )}

      {/* ==================== TAB 4: GAMES ==================== */}
      {activeTab === 'games' && (
        <div className="space-y-5">
          {/* Game Switcher & Scope Controls */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-200 dark:border-slate-800 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setGameMode('listen-pick')}
                className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition ${
                  gameMode === 'listen-pick'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                <Gamepad2 className="w-4 h-4" /> 🎧 Nghe &amp; Chọn Hình
              </button>
              <button
                type="button"
                onClick={() => setGameMode('match-pairs')}
                className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition ${
                  gameMode === 'match-pairs'
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                <span>🧩 Ghép Cặp Tranh – Từ</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="text-xs font-extrabold text-slate-500 dark:text-slate-400">
                Chủ đề chơi:
              </label>
              <select
                value={gameUnitFilter}
                onChange={(e) => setGameUnitFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-800 dark:text-white"
              >
                <option value="all">🌈 Tất cả 12 chủ đề ({ALL_KIDS_WORDS.length} từ)</option>
                {KIDS_UNITS.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.emoji} {u.title} ({u.titleVi})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* GAME MODE 1: LISTEN & PICK */}
          {gameMode === 'listen-pick' && (
            <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    🎧 Thử Tài Nghe Nhanh — Chạm Đúng Hình Bí Mật!
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Bấm nút màu xanh để nghe từ tiếng Anh, sau đó chọn đúng bức tranh nhé!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setHideWordsInGame((v) => !v)}
                  className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
                >
                  {hideWordsInGame ? <Eye className="w-4 h-4 text-emerald-500" /> : <EyeOff className="w-4 h-4 text-amber-500" />}
                  {hideWordsInGame ? 'Hiện chữ gợi ý' : 'Ẩn chữ (Thử thách Siêu Nhĩ!)'}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 py-2">
                <button
                  type="button"
                  onClick={() => speakText(listenRound.target.word, accent, speechRate)}
                  className="px-6 py-4 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-white font-black text-base sm:text-lg shadow-lg flex items-center gap-2.5 active:scale-95 transition"
                >
                  <Volume2 className="w-6 h-6" /> Nghe Từ Bí Mật ({speechRate}x)
                </button>

                {listenPickedId && (
                  <button
                    type="button"
                    onClick={handleNextListenQuestion}
                    className="px-5 py-4 rounded-3xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base shadow-md flex items-center gap-2"
                  >
                    <span>Câu Tiếp Theo</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {listenRound.options.map((opt) => {
                  const isPicked = listenPickedId === opt.id;
                  const isCorrect = opt.id === listenRound.target.id;
                  let cardStyle =
                    'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-400 hover:-translate-y-0.5';

                  if (listenPickedId) {
                    if (isCorrect) {
                      cardStyle = 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 scale-[1.03] shadow-md';
                    } else if (isPicked) {
                      cardStyle = 'bg-rose-100 dark:bg-rose-950/60 border-rose-500';
                    } else {
                      cardStyle = 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={Boolean(listenPickedId)}
                      onClick={() => handleSelectListenOption(opt)}
                      className={`p-5 rounded-3xl border-4 transition flex flex-col items-center justify-center gap-2 min-h-[150px] ${cardStyle}`}
                    >
                      <span className="w-24 h-24 rounded-2xl bg-white p-2 border border-slate-100 shadow-2xs flex items-center justify-center">
                        <img
                          src={resolveFlashcardImage(
                            opt.word,
                            opt.meaningVi,
                            gameUnitFilter === 'all' ? undefined : gameUnitFilter
                          )}
                          alt={opt.word}
                          className="w-full h-full object-contain"
                        />
                      </span>
                      {(!hideWordsInGame || listenPickedId) && (
                        <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                          {opt.word}
                        </span>
                      )}
                      {listenPickedId && (
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                          {opt.meaningVi}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* GAME MODE 2: MATCHING PAIRS */}
          {gameMode === 'match-pairs' && (
            <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-teal-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    🧩 Trò Chơi Ghép Cặp Tranh – Chữ
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Chạm 1 thẻ Hình (bên trái) rồi chạm 1 thẻ Tiếng Anh (bên phải) tương ứng nhé!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleResetMatchBoard}
                  className="px-4 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" /> Chơi Ván Mới ({matchedIds.length}/{matchBoard.pairs.length})
                </button>
              </div>

              {mismatchHint && (
                <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-200 text-sm font-extrabold text-rose-700 dark:text-rose-200 text-center">
                  {mismatchHint}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left Column: Emoji + Vietnamese */}
                <div className="space-y-2.5">
                  <div className="text-xs font-black uppercase text-teal-600 dark:text-teal-400 px-1">
                    1. Chọn Tranh Minh Họa
                  </div>
                  {matchBoard.leftCards.map((card) => {
                    const isMatched = matchedIds.includes(card.id);
                    const isSelected = selectedLeftId === card.id;
                    return (
                      <button
                        key={`L-${card.id}`}
                        type="button"
                        disabled={isMatched}
                        onClick={() => {
                          setSelectedLeftId(card.id);
                          handleMatchAttempt(card.id, selectedRightId);
                        }}
                        className={`w-full p-3.5 rounded-2xl border-2 flex items-center gap-3.5 transition text-left ${
                          isMatched
                            ? 'bg-emerald-100 dark:bg-emerald-950/50 border-emerald-400 text-emerald-800 dark:text-emerald-200 opacity-75'
                            : isSelected
                            ? 'bg-amber-100 dark:bg-amber-950/50 border-amber-500 scale-[1.02] shadow-md'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                        }`}
                      >
                        <div className="w-16 h-16 rounded-xl bg-white p-1.5 border border-slate-100 flex items-center justify-center shrink-0">
                          <img
                            src={resolveFlashcardImage(
                              card.word,
                              card.meaningVi,
                              gameUnitFilter === 'all' ? undefined : gameUnitFilter
                            )}
                            alt={card.word}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                          {card.meaningVi}
                        </span>
                        {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600 ml-auto" />}
                      </button>
                    );
                  })}
                </div>

                {/* Right Column: English Words */}
                <div className="space-y-2.5">
                  <div className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 px-1">
                    2. Chọn Từ Tiếng Anh (Bấm để nghe)
                  </div>
                  {matchBoard.rightCards.map((card) => {
                    const isMatched = matchedIds.includes(card.id);
                    const isSelected = selectedRightId === card.id;
                    return (
                      <button
                        key={`R-${card.id}`}
                        type="button"
                        disabled={isMatched}
                        onClick={() => {
                          speakText(card.word, accent, speechRate);
                          setSelectedRightId(card.id);
                          handleMatchAttempt(selectedLeftId, card.id);
                        }}
                        className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between gap-3 transition ${
                          isMatched
                            ? 'bg-emerald-100 dark:bg-emerald-950/50 border-emerald-400 text-emerald-800 dark:text-emerald-200 opacity-75'
                            : isSelected
                            ? 'bg-indigo-100 dark:bg-indigo-950/50 border-indigo-500 scale-[1.02] shadow-md'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                        }`}
                      >
                        <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                          {card.word}
                        </span>
                        <span className="p-2 rounded-xl bg-white dark:bg-slate-900 text-indigo-600 shadow-sm">
                          <Volume2 className="w-4 h-4" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB 5: CAMBRIDGE YLE ==================== */}
      {activeTab === 'yle' && showYleTab && (
        <div className="space-y-5">
          {/* YLE Level Selector */}
          <div className={`grid grid-cols-1 ${allowAllOptions ? 'md:grid-cols-3' : 'md:grid-cols-1'} gap-3`}>
            {(allowAllOptions
              ? (['starters', 'movers', 'flyers'] as YleLevel[])
              : [profile?.kids?.yleLevel || yleLevel]
            ).map((lvl) => {
              const meta = YLE_LEVEL_META[lvl];
              const isSelected = yleLevel === lvl;
              const qs = KIDS_YLE_CHALLENGES.filter((q) => q.level === lvl);
              const done = qs.filter((q) => yleAnswers[q.id] !== undefined).length;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setYleLevel(lvl)}
                  className={`p-4 rounded-3xl border-2 text-left transition flex items-start gap-3.5 ${
                    isSelected
                      ? `bg-gradient-to-br ${meta.gradient} text-white border-transparent shadow-md scale-[1.01]`
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-violet-300 text-slate-800 dark:text-slate-100'
                  }`}
                >
                  <span className="text-4xl leading-none">{meta.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base font-black">{meta.label}</span>
                      <span
                        className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-white/25 text-white'
                            : 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'
                        }`}
                      >
                        {done}/{qs.length}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 font-medium ${isSelected ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
                      {meta.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* YLE Mock Tests (3 đề thi thử / cấp độ) */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-white">
                  🛡️ Đề Thi Thử Cambridge {YLE_LEVEL_META[yleLevel].label} (20 câu / đề)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Làm bài bấm giờ và quy đổi kết quả sang Khiên Cambridge (1–5 ⭐)!
                </p>
              </div>
              {activeYleMock && (
                <button
                  type="button"
                  onClick={() => setYleMockId(null)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold"
                >
                  Đóng đề thi thử
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {yleMocksForLevel.map((mock) => {
                const isOpen = yleMockId === mock.id;
                return (
                  <button
                    type="button"
                    key={mock.id}
                    onClick={() => {
                      setYleMockId(mock.id);
                      setYleMockAnswers({});
                      setYleMockSubmitted(false);
                      setYleMockSeconds(mock.durationMinutes * 60);
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition ${
                      isOpen
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40'
                        : 'border-slate-200 dark:border-slate-700 hover:border-amber-400'
                    }`}
                  >
                    <div className="text-xs font-black text-slate-900 dark:text-white">{mock.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {mock.questions.length} câu • {mock.durationMinutes} phút
                    </div>
                  </button>
                );
              })}
            </div>

            {activeYleMock && (
              <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-2xl">
                  <span className="text-sm font-black text-amber-900 dark:text-amber-200">
                    ⏱️ Thời gian còn lại: {Math.floor(yleMockSeconds / 60)}:
                    {String(yleMockSeconds % 60).padStart(2, '0')}
                  </span>
                  {yleMockSubmitted && (() => {
                    const correct = activeYleMock.questions.filter(
                      (q) => yleMockAnswers[q.id] === q.correctIndex
                    ).length;
                    const shields = Math.max(1, Math.min(5, Math.ceil((correct / activeYleMock.questions.length) * 5)));
                    return (
                      <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-black">
                        Đúng {correct}/{activeYleMock.questions.length} • {'⭐'.repeat(shields)} ({shields}/5 Khiên)
                      </span>
                    );
                  })()}
                </div>

                <div className="space-y-3">
                  {activeYleMock.questions.map((q, qIdx) => {
                    const chosen = yleMockAnswers[q.id];
                    return (
                      <div key={q.id} className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-sm font-bold text-slate-900 dark:text-white">
                            <span className="mr-1.5">{q.emojiHint}</span>
                            Câu {qIdx + 1}. {q.prompt}
                          </div>
                          <button
                            type="button"
                            onClick={() => speakText(q.spokenText, accent, speechRate)}
                            className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 shrink-0"
                            title="Nghe"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, optIdx) => {
                            const selected = chosen === optIdx;
                            const right = q.correctIndex === optIdx;
                            let cls = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700';
                            if (!yleMockSubmitted && selected) cls = 'bg-amber-50 border-amber-500 text-amber-900';
                            else if (yleMockSubmitted && right) cls = 'bg-emerald-50 border-emerald-500 text-emerald-800';
                            else if (yleMockSubmitted && selected && !right) cls = 'bg-rose-50 border-rose-500 text-rose-800';
                            return (
                              <button
                                type="button"
                                key={optIdx}
                                disabled={yleMockSubmitted}
                                onClick={() => setYleMockAnswers((p) => ({ ...p, [q.id]: optIdx }))}
                                className={`px-3 py-2 rounded-xl border text-left text-xs font-bold ${cls}`}
                              >
                                {String.fromCharCode(65 + optIdx)}. {opt}
                              </button>
                            );
                          })}
                        </div>
                        {yleMockSubmitted && (
                          <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl">
                            {q.funExplain}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {!yleMockSubmitted && (
                  <button
                    type="button"
                    onClick={() => {
                      setYleMockSubmitted(true);
                      const correct = activeYleMock.questions.filter(
                        (q) => yleMockAnswers[q.id] === q.correctIndex
                      ).length;
                      if (correct >= 10) onAddXp(40);
                    }}
                    className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-sm"
                  >
                    Nộp bài &amp; Nhận Khiên ⭐
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Active YLE Question Card */}
          {currentYleQuestion && (
            <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-violet-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-sm">
              {/* Progress Dots */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-200 text-xs font-black">
                    {currentYleQuestion.type === 'picture-word'
                      ? '🖼️ Nhìn Hình Chọn Từ'
                      : currentYleQuestion.type === 'listen-pick'
                      ? '🎧 Nghe & Chọn Đáp Án'
                      : '🧩 Điền Từ Vào Câu'}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-500 dark:text-slate-400">
                    Câu {yleIndex + 1} / {yleQuestions.length}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {yleQuestions.map((q, idx) => {
                    const ans = yleAnswers[q.id];
                    const isCurrent = idx === yleIndex;
                    let dotCls = 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
                    if (ans !== undefined) {
                      dotCls =
                        ans === q.correctIndex
                          ? 'bg-emerald-500 text-white'
                          : 'bg-rose-400 text-white';
                    }
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setYleIndex(idx)}
                        className={`w-7 h-7 rounded-full text-xs font-black transition ${dotCls} ${
                          isCurrent ? 'ring-2 ring-violet-500 ring-offset-2 dark:ring-offset-slate-900' : ''
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prompt & Emoji Hint */}
              <div className="rounded-3xl bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 border border-violet-200 dark:border-violet-800/70 p-5 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-24 rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-violet-100 dark:border-slate-700 flex items-center justify-center text-5xl shrink-0">
                  {currentYleQuestion.emojiHint}
                </div>
                <div className="flex-1 text-center sm:text-left space-y-2.5">
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                    {currentYleQuestion.prompt}
                  </h4>
                  <button
                    type="button"
                    onClick={() => speakText(currentYleQuestion.spokenText, accent, speechRate)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white text-xs sm:text-sm font-black shadow-sm"
                  >
                    <Volume2 className="w-4 h-4" />
                    {currentYleQuestion.type === 'listen-pick'
                      ? 'Bấm Nghe Đề Bài'
                      : 'Nghe Gợi Ý Tiếng Anh'}
                  </button>
                </div>
              </div>

              {/* 4 Big Answer Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentYleQuestion.options.map((opt, idx) => {
                  const chosenIdx = yleAnswers[currentYleQuestion.id];
                  const isAnswered = chosenIdx !== undefined;
                  const isRight = idx === currentYleQuestion.correctIndex;
                  const isPicked = chosenIdx === idx;

                  let optCls =
                    'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-violet-400 text-slate-900 dark:text-white';
                  if (isAnswered) {
                    if (isRight) {
                      optCls = 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100';
                    } else if (isPicked) {
                      optCls = 'bg-rose-100 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100';
                    } else {
                      optCls = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={isAnswered}
                      onClick={() =>
                        handlePickYleOption(
                          currentYleQuestion.id,
                          idx,
                          currentYleQuestion.correctIndex,
                          currentYleQuestion.funExplain
                        )
                      }
                      className={`min-h-[60px] p-4 rounded-2xl border-2 font-black text-base sm:text-lg text-left transition flex items-center gap-3 ${optCls}`}
                    >
                      <span className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm font-black shrink-0 text-violet-600 dark:text-violet-300">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Navigation */}
              {yleAnswers[currentYleQuestion.id] !== undefined && (
                <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-200 dark:border-amber-800 p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm font-extrabold text-amber-900 dark:text-amber-200">
                    {currentYleQuestion.funExplain}
                  </div>
                  {yleIndex < yleQuestions.length - 1 && (
                    <button
                      type="button"
                      onClick={() => setYleIndex((i) => Math.min(yleQuestions.length - 1, i + 1))}
                      className="px-4 py-2.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Câu Tiếp Theo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {/* Cambridge Shields Summary when all questions in level answered */}
              {yleAnsweredCount === yleQuestions.length && yleQuestions.length > 0 && (
                <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-5 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1.5 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase bg-white/20 px-3 py-1 rounded-full">
                      <Award className="w-4 h-4" /> Huy Hiệu Khiên Cambridge YLE
                    </div>
                    <h4 className="text-xl sm:text-2xl font-black">
                      Chúc Mừng Bé Hoàn Thành {YLE_LEVEL_META[yleLevel].label}! 🎉
                    </h4>
                    <p className="text-sm font-semibold text-white/90">
                      Bé trả lời đúng {yleCorrectCount}/{yleQuestions.length} câu — Đạt {yleShields}/5 Khiên Cambridge!
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 pt-1">
                      {Array.from({ length: 5 }).map((_, sIdx) => (
                        <Shield
                          key={sIdx}
                          className={`w-7 h-7 ${
                            sIdx < yleShields
                              ? 'fill-amber-300 text-amber-200'
                              : 'text-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setYleAnswers((prev) => {
                          const next = { ...prev };
                          yleQuestions.forEach((q) => {
                            delete next[q.id];
                          });
                          return next;
                        });
                        setYleIndex(0);
                      }}
                      className="px-4 py-3 rounded-2xl bg-white text-violet-700 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow"
                    >
                      <RotateCcw className="w-4 h-4" /> Làm Lại Cấp Này
                    </button>

                    {yleLevel !== 'flyers' && (
                      <button
                        type="button"
                        onClick={() =>
                          setYleLevel(yleLevel === 'starters' ? 'movers' : 'flyers')
                        }
                        className="px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow"
                      >
                        <span>Thử Cấp Cao Hơn</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
