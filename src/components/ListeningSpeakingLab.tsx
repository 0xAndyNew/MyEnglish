import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Headphones,
  Play,
  Square,
  Eye,
  EyeOff,
  Volume2,
  CheckCircle2,
  XCircle,
  Mic,
  Turtle,
  MessageSquare,
  Sparkles,
  Loader2,
  BookOpen,
  ArrowRight,
  PlusCircle,
  Search,
} from 'lucide-react';
import {
  LISTENING_CATEGORIES,
  LISTENING_READING_LESSONS,
  ListeningReadingLesson,
} from '../data/listeningReadingLessons';
import { PRACTICAL_CATEGORIES } from '../data/practicalCategories';
import {
  PRACTICE_SENTENCES,
  SPEAKING_TOPICS,
  SpeakingPracticeItem,
} from '../data/speakingPracticeData';
import { ROLEPLAY_SCENARIOS } from '../data/curriculumData';
import { AccentMode, CefrLevel, RoleplayScenario, WordEntry } from '../types/learning';
import { LearnerProfile } from '../types/audience';
import { filterAndSortByProfile, getAllowedCategoriesForProfile } from '../utils/audienceFilter';
import { analyzeWordFull } from '../utils/wordAnalyzer';
import { callGeminiText } from '../utils/geminiClient';
import {
  isSpeechRecognitionSupported,
  PronunciationScoreResult,
  scorePronunciation,
  speakText,
  startSpeechRecognition,
} from '../utils/speechEngine';
import { PronunciationReportCard } from './PronunciationReportCard';
import { WordAnatomyCard } from './WordAnatomyCard';

interface ListeningSpeakingLabProps {
  accent: AccentMode;
  geminiApiKey?: string;
  extraLessons?: ListeningReadingLesson[];
  extraScenarios?: RoleplayScenario[];
  savedWords: WordEntry[];
  onSaveWord: (word: WordEntry) => void;
  onPronunciationScore: (score: number) => void;
  onAddXp: (amount: number) => void;
  isNextUnlocked?: boolean;
  onUnlockNext?: () => void;
  learnerProfile?: LearnerProfile | null;
}

export const ListeningSpeakingLab: React.FC<ListeningSpeakingLabProps> = ({
  accent,
  geminiApiKey,
  extraLessons = [],
  extraScenarios = [],
  savedWords,
  onSaveWord,
  onPronunciationScore,
  onAddXp,
  isNextUnlocked = false,
  onUnlockNext,
  learnerProfile,
}) => {
  const [subTab, setSubTab] = useState<'listen_read' | 'shadowing' | 'roleplay'>('listen_read');

  // AI generated custom items
  const [customLessons, setCustomLessons] = useState<ListeningReadingLesson[]>([]);
  const [customSentences, setCustomSentences] = useState<SpeakingPracticeItem[]>([]);
  const [customScenarios, setCustomScenarios] = useState<RoleplayScenario[]>([]);
  const [aiTopicInput, setAiTopicInput] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiGenError, setAiGenError] = useState<string | null>(null);

  // Tab 1: Listen & Read state
  const [catFilter, setCatFilter] = useState<string>('Tất cả');
  const [lessonLevelFilter, setLessonLevelFilter] = useState<'ALL' | CefrLevel>('ALL');
  const [lessonSearch, setLessonSearch] = useState('');
  const [lessonPage, setLessonPage] = useState(0);
  const [lessonIdx, setLessonIdx] = useState(0);
  const [rate, setRate] = useState<number>(0.9);
  const [showTranscript, setShowTranscript] = useState(true);
  const [showVi, setShowVi] = useState(false);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [quizResults, setQuizResults] = useState<Record<string, 'correct' | 'wrong'>>({});
  const [passageScores, setPassageScores] = useState<Record<string, number>>({});
  const [lookedUpWord, setLookedUpWord] = useState<WordEntry | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);

  // Full Passage Read-Aloud scoring state
  const [passageListening, setPassageListening] = useState(false);
  const [passageInterim, setPassageInterim] = useState('');
  const [passageScoreResult, setPassageScoreResult] = useState<PronunciationScoreResult | null>(null);
  const [passageSpeechError, setPassageSpeechError] = useState<string | null>(null);
  const [passageSelfAudioUrl, setPassageSelfAudioUrl] = useState<string | null>(null);
  const stopMicRef = useRef<((abort?: boolean) => void) | null>(null);

  // Inline Shadowing on current lesson sentence
  const [shadowSentenceIdx, setShadowSentenceIdx] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [micInterim, setMicInterim] = useState('');
  const [scoreResult, setScoreResult] = useState<PronunciationScoreResult | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [selfAudioUrl, setSelfAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (passageSelfAudioUrl) URL.revokeObjectURL(passageSelfAudioUrl);
    };
  }, [passageSelfAudioUrl]);

  useEffect(() => {
    return () => {
      if (selfAudioUrl) URL.revokeObjectURL(selfAudioUrl);
    };
  }, [selfAudioUrl]);

  const availableLevels = useMemo(
    () =>
      learnerProfile?.audience === 'kids'
        ? (['ALL', 'A1'] as const)
        : (['ALL', 'A1', 'A2', 'B1', 'B2'] as const),
    [learnerProfile]
  );

  // Tab 2: Standalone Speaking sentences (Focus Mode 1-by-1)
  const allSentences = useMemo(
    () => filterAndSortByProfile([...customSentences, ...PRACTICE_SENTENCES], learnerProfile),
    [customSentences, learnerProfile]
  );
  const allowedSpeakingTopics = useMemo(
    () => [
      'Tất cả',
      ...getAllowedCategoriesForProfile(
        SPEAKING_TOPICS.filter((t) => t !== 'Tất cả'),
        learnerProfile
      ),
    ],
    [learnerProfile]
  );
  const [speakingTopicFilter, setSpeakingTopicFilter] = useState<string>('Tất cả');
  const [speakingLevelFilter, setSpeakingLevelFilter] = useState<'ALL' | CefrLevel>('ALL');
  const [speakingSearch, setSpeakingSearch] = useState('');
  const [speakingPage, setSpeakingPage] = useState(0);
  const [speakingStatusFilter, setSpeakingStatusFilter] = useState<'ALL' | 'passed' | 'need_fix' | 'todo'>('ALL');
  const [speakingIdx, setSpeakingIdx] = useState(0);
  const [customPracticeText, setCustomPracticeText] = useState<string | null>(null);
  const [sentenceScores, setSentenceScores] = useState<Record<string, number>>({});
  const [customInput, setCustomInput] = useState('');

  useEffect(() => {
    if (!allowedSpeakingTopics.includes(speakingTopicFilter)) {
      setSpeakingTopicFilter('Tất cả');
      setSpeakingIdx(0);
    }
  }, [allowedSpeakingTopics, speakingTopicFilter]);

  const filteredSpeakingList = useMemo(() => {
    const q = speakingSearch.trim().toLowerCase();
    const matched = allSentences.filter((item) => {
      const okTopic = speakingTopicFilter === 'Tất cả' || item.topic === speakingTopicFilter;
      const okLevel = speakingLevelFilter === 'ALL' || item.level === speakingLevelFilter;
      const okQuery =
        !q ||
        item.en.toLowerCase().includes(q) ||
        item.vi.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q);
      return okTopic && okLevel && okQuery;
    });
    return matched.length > 0 ? matched : allSentences;
  }, [allSentences, speakingTopicFilter, speakingLevelFilter, speakingSearch]);

  const safeSpeakingIdx = speakingIdx % Math.max(1, filteredSpeakingList.length);
  const currentSpeakingItem =
    filteredSpeakingList[safeSpeakingIdx] || allSentences[0] || PRACTICE_SENTENCES[0];
  const activeTargetSentence = customPracticeText ?? currentSpeakingItem.en;

  useEffect(() => {
    return () => {
      stopMicRef.current?.(true);
      stopMicRef.current = null;
    };
  }, []);

  // Tab 3: Roleplay
  const allScenarios = useMemo(
    () =>
      filterAndSortByProfile(
        [...customScenarios, ...extraScenarios, ...ROLEPLAY_SCENARIOS],
        learnerProfile
      ),
    [customScenarios, extraScenarios, learnerProfile]
  );
  const allowedRoleplayCategories = useMemo(
    () => ['Tất cả', ...getAllowedCategoriesForProfile(PRACTICAL_CATEGORIES, learnerProfile)],
    [learnerProfile]
  );
  const [roleplayCatFilter, setRoleplayCatFilter] = useState<string>('Tất cả');
  const [roleplayLevelFilter, setRoleplayLevelFilter] = useState<'ALL' | CefrLevel>('ALL');
  const [roleplaySearch, setRoleplaySearch] = useState('');
  const [roleplayPage, setRoleplayPage] = useState(0);
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [turnIdx, setTurnIdx] = useState(0);
  const [roleplayFeedback, setRoleplayFeedback] = useState<PronunciationScoreResult | null>(null);

  useEffect(() => {
    if (!allowedRoleplayCategories.includes(roleplayCatFilter)) {
      setRoleplayCatFilter('Tất cả');
      setScenarioIdx(0);
    }
  }, [allowedRoleplayCategories, roleplayCatFilter]);

  const filteredScenarios = useMemo(() => {
    const q = roleplaySearch.trim().toLowerCase();
    const matched = allScenarios.filter((sc) => {
      const okCat = roleplayCatFilter === 'Tất cả' || (sc.category || 'Đời sống & Giao tiếp') === roleplayCatFilter;
      const okLevel = roleplayLevelFilter === 'ALL' || sc.level === roleplayLevelFilter;
      const okQuery =
        !q ||
        sc.title.toLowerCase().includes(q) ||
        sc.context.toLowerCase().includes(q);
      return okCat && okLevel && okQuery;
    });
    return matched.length > 0 ? matched : allScenarios;
  }, [allScenarios, roleplayCatFilter, roleplayLevelFilter, roleplaySearch]);

  const allLessons = useMemo(
    () =>
      filterAndSortByProfile(
        [...customLessons, ...extraLessons, ...LISTENING_READING_LESSONS],
        learnerProfile
      ),
    [customLessons, extraLessons, learnerProfile]
  );
  const allowedListeningCategories = useMemo(
    () => [
      'Tất cả',
      ...getAllowedCategoriesForProfile(
        LISTENING_CATEGORIES.filter((c) => c !== 'Tất cả'),
        learnerProfile
      ),
    ],
    [learnerProfile]
  );

  useEffect(() => {
    if (!allowedListeningCategories.includes(catFilter)) {
      setCatFilter('Tất cả');
      setLessonIdx(0);
    }
  }, [allowedListeningCategories, catFilter]);

  const filteredLessons = useMemo(() => {
    const q = lessonSearch.trim().toLowerCase();
    const list = allLessons.filter((l) => {
      const okCat = catFilter === 'Tất cả' || l.category === catFilter;
      const okLevel = lessonLevelFilter === 'ALL' || l.level === lessonLevelFilter;
      const okQuery =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.transcript.toLowerCase().includes(q) ||
        l.translation.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q);
      return okCat && okLevel && okQuery;
    });
    return list.length > 0 ? list : allLessons;
  }, [allLessons, catFilter, lessonLevelFilter, lessonSearch]);

  const currentLesson =
    filteredLessons[lessonIdx % Math.max(1, filteredLessons.length)] ||
    allLessons[0] ||
    LISTENING_READING_LESSONS[0];
  const lessonSentences = useMemo(
    () =>
      currentLesson.transcript
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.trim())
        .filter(Boolean),
    [currentLesson]
  );
  const activeLessonSentence = lessonSentences[shadowSentenceIdx % lessonSentences.length] || currentLesson.transcript;

  const stopActiveMic = () => {
    stopMicRef.current?.(true);
    stopMicRef.current = null;
    setIsListening(false);
    setPassageListening(false);
    setMicInterim('');
    setPassageInterim('');
  };

  const handleSelectLesson = (idx: number) => {
    window.speechSynthesis?.cancel();
    stopActiveMic();
    setLessonIdx(idx);
    setLessonPage(Math.floor(idx / 20));
    setSelectedAns(null);
    setShadowSentenceIdx(0);
    setScoreResult(null);
    setSpeechError(null);
    setPassageScoreResult(null);
    setPassageSpeechError(null);
    setPassageInterim('');
    setPassageSelfAudioUrl(null);
    setSelfAudioUrl(null);
    setLookedUpWord(null);
  };

  const handleWordClick = async (rawToken: string) => {
    const clean = rawToken.replace(/[^a-zA-Z'-]/g, '').toLowerCase();
    if (!clean) return;
    speakText(clean, accent, 0.9);
    setLookupLoading(true);
    try {
      const entry = await analyzeWordFull(clean);
      setLookedUpWord(entry);
    } finally {
      setLookupLoading(false);
    }
  };

  const handleAnswerQuiz = (oIdx: number) => {
    setSelectedAns(oIdx);
    const isCorrect = oIdx === currentLesson.question.correctIdx;
    setQuizResults((prev) => ({
      ...prev,
      [currentLesson.id]: isCorrect ? 'correct' : 'wrong',
    }));
    if (isCorrect && !completedIds.includes(currentLesson.id)) {
      setCompletedIds((prev) => [...prev, currentLesson.id]);
      onAddXp(20);
    }
  };

  const runPassageMicCheck = () => {
    if (passageListening) {
      stopMicRef.current?.(false);
      return;
    }
    if (!isSpeechRecognitionSupported()) {
      setPassageSpeechError('Trình duyệt không hỗ trợ thu âm Micro.');
      return;
    }
    stopActiveMic();
    setPassageSpeechError(null);
    setPassageScoreResult(null);
    setPassageSelfAudioUrl(null);
    setPassageInterim('');
    setPassageListening(true);

    stopMicRef.current = startSpeechRecognition(
      accent,
      (transcript, meta) => {
        const res = scorePronunciation(currentLesson.transcript, transcript);
        setPassageScoreResult(res);
        setPassageSelfAudioUrl(meta?.audioUrl ?? null);
        setPassageScores((prev) => ({
          ...prev,
          [currentLesson.id]: Math.max(prev[currentLesson.id] ?? 0, res.score),
        }));
        onPronunciationScore(res.score);
        if (res.score >= 70) {
          onAddXp(25);
        }
      },
      (err) => setPassageSpeechError(err),
      () => {
        setPassageListening(false);
        setPassageInterim('');
        stopMicRef.current = null;
      },
      {
        continuous: true,
        maxDurationMs: 25000,
        onInterim: (text) => setPassageInterim(text),
      }
    );
  };

  const selectSpeakingLesson = (idx: number) => {
    window.speechSynthesis?.cancel();
    stopActiveMic();
    const len = Math.max(1, filteredSpeakingList.length);
    const nextIdx = ((idx % len) + len) % len;
    setSpeakingIdx(nextIdx);
    setSpeakingPage(Math.floor(nextIdx / 20));
    setCustomPracticeText(null);
    setScoreResult(null);
    setSpeechError(null);
    setSelfAudioUrl(null);
  };

  const runMicCheck = (expectedText: string, onSuccess?: (res: PronunciationScoreResult) => void) => {
    if (isListening) {
      stopMicRef.current?.(false);
      return;
    }
    if (!isSpeechRecognitionSupported()) {
      setSpeechError('Trình duyệt không hỗ trợ thu âm Micro.');
      return;
    }
    stopActiveMic();
    setSpeechError(null);
    setScoreResult(null);
    setRoleplayFeedback(null);
    setSelfAudioUrl(null);
    setMicInterim('');
    setIsListening(true);
    stopMicRef.current = startSpeechRecognition(
      accent,
      (transcript, meta) => {
        const res = scorePronunciation(expectedText, transcript);
        setSelfAudioUrl(meta?.audioUrl ?? null);
        if (onSuccess) {
          onSuccess(res);
        } else {
          setScoreResult(res);
          const prevBest = sentenceScores[expectedText];
          setSentenceScores((prev) => ({
            ...prev,
            [expectedText]: Math.max(prev[expectedText] ?? 0, res.score),
          }));
          if (res.score >= 80 && (prevBest === undefined || prevBest < 80)) {
            onAddXp(15);
          }
        }
        onPronunciationScore(res.score);
      },
      (err) => setSpeechError(err),
      () => {
        setIsListening(false);
        setMicInterim('');
        stopMicRef.current = null;
      },
      {
        onInterim: (text) => setMicInterim(text),
      }
    );
  };

  const safeScenarioIdx = scenarioIdx % Math.max(1, filteredScenarios.length);
  const currentScenario =
    filteredScenarios[safeScenarioIdx] || allScenarios[0] || ROLEPLAY_SCENARIOS[0];
  const currentTurn = currentScenario.turns[turnIdx] || currentScenario.turns[0];

  const callGeminiJson = async (promptText: string) => {
    const key = (geminiApiKey || '').trim();
    if (!key) {
      setAiGenError(`Tính năng AI chưa được Admin cấu hình API Key. Bạn hãy học kho ${allLessons.length} bài có sẵn nhé!`);
      return null;
    }
    setAiGenError(null);
    setAiGenerating(true);
    try {
      const raw = await callGeminiText(key, promptText);
      const jsonMatch = raw.match(/[\[{][\s\S]*[\]}]/);
      if (!jsonMatch) throw new Error('Dữ liệu AI trả về chưa đúng định dạng JSON.');
      return JSON.parse(jsonMatch[0]);
    } catch (err: any) {
      setAiGenError(`Lỗi kết nối AI: ${err?.message || 'Admin hãy kiểm tra lại Gemini API Key.'}`);
      return null;
    } finally {
      setAiGenerating(false);
    }
  };

  const handleAiCreateLesson = async () => {
    const topic = aiTopicInput.trim() || 'Giao tiếp hàng ngày & công việc';
    const defaultCategory =
      learnerProfile?.audience === 'kids' || learnerProfile?.audience === 'teen'
        ? 'Hội thoại đời sống'
        : 'Giao tiếp công việc';
    const parsed = await callGeminiJson(
      `Tạo 1 bài luyện Nghe & Đọc tiếng Anh trình độ A2-B1 về chủ đề: "${topic}". Trả về JSON thuần theo cấu trúc:
{"title":"✨ Tiêu đề ngắn tiếng Việt","level":"A2","category":"${defaultCategory}","transcript":"Đoạn tiếng Anh 3-4 câu rõ ràng tự nhiên","translation":"Bản dịch tiếng Việt chuẩn","keyPhrases":[{"en":"cụm từ 1","vi":"nghĩa 1"},{"en":"cụm từ 2","vi":"nghĩa 2"}],"question":{"q":"Câu hỏi đọc hiểu ngắn bằng tiếng Anh","options":["Đáp án A","Đáp án B","Đáp án C"],"correctIdx":0}}`
    );
    if (!parsed || !parsed.transcript) return;
    const newLesson: ListeningReadingLesson = {
      id: `ai-lr-${Date.now()}`,
      level: parsed.level || (learnerProfile?.audience === 'kids' ? 'A1' : 'A2'),
      category:
        learnerProfile?.audience === 'kids' || learnerProfile?.audience === 'teen'
          ? defaultCategory
          : parsed.category || defaultCategory,
      title: parsed.title || `✨ Bài AI: ${topic}`,
      sourceStyle: 'Gemini AI • Thực hành tùy chỉnh',
      transcript: parsed.transcript,
      translation: parsed.translation || '',
      keyPhrases: Array.isArray(parsed.keyPhrases) ? parsed.keyPhrases : [],
      question: parsed.question || { q: 'Did you understand the passage?', options: ['Yes', 'No', 'Maybe'], correctIdx: 0 },
    };
    setCustomLessons((prev) => [newLesson, ...prev]);
    setCatFilter('Tất cả');
    handleSelectLesson(0);
    setAiTopicInput('');
  };

  const handleAiCreateSentences = async () => {
    const topic = aiTopicInput.trim() || 'Giao tiếp công sở & đời sống';
    const parsed = await callGeminiJson(
      `Tạo 3 câu tiếng Anh thực tế để luyện nói theo chủ đề "${topic}" (trình độ A2-B1). Trả về mảng JSON thuần: [{"en":"English sentence","vi":"Nghĩa tiếng Việt"}]`
    );
    if (!Array.isArray(parsed) || parsed.length === 0) return;
    const now = Date.now();
    const valid: SpeakingPracticeItem[] = parsed
      .filter((x) => x?.en && x?.vi)
      .map((x, idx) => ({
        id: `ai-sp-${now}-${idx}`,
        level: 'B1',
        topic: 'Giao tiếp cơ bản',
        en: String(x.en).trim(),
        vi: String(x.vi).trim(),
      }));
    if (valid.length === 0) return;
    setCustomSentences((prev) => [...valid, ...prev]);
    setSpeakingTopicFilter('Tất cả');
    setSpeakingIdx(0);
    setCustomPracticeText(null);
    setScoreResult(null);
    setSpeechError(null);
    setAiTopicInput('');
  };

  const handleAiCreateScenario = async () => {
    const topic = aiTopicInput.trim() || 'Họp với khách hàng & giới thiệu sản phẩm';
    const parsed = await callGeminiJson(
      `Tạo 1 kịch bản hội thoại tiếng Anh 3 lượt theo tình huống "${topic}" (trình độ A2-B1). Trả về JSON thuần:
{"title":"✨ Tên tình huống ngắn","level":"B1","context":"Mô tả ngắn tiếng Việt","turns":[{"speaker":"AI","en":"Câu AI nói","ipa":"","vi":"Nghĩa tiếng Việt","suggestedReplies":[{"en":"Câu người học đáp","ipa":"","vi":"Nghĩa câu đáp"}]}]}`
    );
    if (!parsed || !Array.isArray(parsed.turns) || parsed.turns.length === 0) return;
    const newScenario: RoleplayScenario = {
      id: `ai-rp-${Date.now()}`,
      title: parsed.title || `✨ ${topic}`,
      level: parsed.level || 'B1',
      context: parsed.context || topic,
      turns: parsed.turns,
    };
    setCustomScenarios((prev) => [newScenario, ...prev]);
    setScenarioIdx(0);
    setTurnIdx(0);
    setRoleplayFeedback(null);
    setAiTopicInput('');
  };

  return (
    <div className="space-y-4">
      {/* Clean Mobile Sub-tabs */}
      <div className="flex overflow-x-auto no-scrollbar bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 gap-1.5">
        {[
          { id: 'listen_read', label: `🎧 Nghe & Đọc (${allLessons.length})` },
          { id: 'shadowing', label: `🎙️ Nói Shadowing (${allSentences.length})` },
          { id: 'roleplay', label: `💬 Hội Thoại (${allScenarios.length})` },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => {
              window.speechSynthesis?.cancel();
              stopActiveMic();
              setSubTab(t.id as 'listen_read' | 'shadowing' | 'roleplay');
              setScoreResult(null);
              setSpeechError(null);
            }}
            className={`min-h-[42px] px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold shrink-0 transition ${
              subTab === t.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: LISTEN & READ + INLINE SHADOWING */}
      {subTab === 'listen_read' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Lesson list */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 h-fit">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-extrabold uppercase text-slate-500">
                Kho bài Nghe & Đọc ({allLessons.length} bài)
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Quiz: {completedIds.length}/{allLessons.length}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Đọc: {Object.keys(passageScores).length}/{allLessons.length}
                </span>
              </div>
            </div>

            {/* AI Generate Listening Lesson */}
            <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-2">
              <input
                value={aiTopicInput}
                onChange={(e) => setAiTopicInput(e.target.value)}
                placeholder="Nhập chủ đề muốn AI tạo bài nghe..."
                className="w-full px-2.5 py-1.5 rounded-lg border border-purple-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
              />
              <button
                onClick={handleAiCreateLesson}
                disabled={aiGenerating}
                className="w-full py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {aiGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <PlusCircle className="w-3.5 h-3.5" />}
                ✨ AI Tạo Bài Nghe Mới
              </button>
              {aiGenError && <p className="text-[11px] text-rose-600 font-semibold">{aiGenError}</p>}
            </div>

            {/* Search & Level Filter */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  value={lessonSearch}
                  onChange={(e) => {
                    setLessonSearch(e.target.value);
                    handleSelectLesson(0);
                  }}
                  placeholder={`Tìm trong ${allLessons.length} bài Nghe & Đọc...`}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                />
              </div>
              <div className="flex flex-wrap gap-1">
                {availableLevels.map((lv) => (
                  <button
                    key={lv}
                    onClick={() => {
                      setLessonLevelFilter(lv);
                      handleSelectLesson(0);
                    }}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                      lessonLevelFilter === lv
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {lv === 'ALL' ? 'Mọi cấp' : lv}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto pr-1">
              {allowedListeningCategories.map((cat) => {
                const isPreferred =
                  learnerProfile?.audience === 'worker' &&
                  learnerProfile.worker?.industries?.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setCatFilter(cat);
                      handleSelectLesson(0);
                    }}
                    className={`px-2 py-1 rounded-lg text-[11px] font-semibold ${
                      catFilter === cat
                        ? 'bg-indigo-600 text-white'
                        : isPreferred
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {isPreferred ? `⭐ ${cat}` : cat}
                  </button>
                );
              })}
            </div>

            {(() => {
              const PAGE_SIZE = 20;
              const totalPages = Math.max(1, Math.ceil(filteredLessons.length / PAGE_SIZE));
              const safePage = Math.min(lessonPage, totalPages - 1);
              const pageItems = filteredLessons.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);
              return (
                <>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>Đang lọc: {filteredLessons.length} bài</span>
                    {totalPages > 1 && <span>Trang {safePage + 1}/{totalPages}</span>}
                  </div>
                  <div className="space-y-1.5 max-h-52 lg:max-h-[420px] overflow-y-auto pr-1">
                    {pageItems.map((item, offset) => {
                      const idx = safePage * PAGE_SIZE + offset;
                      const active = item.id === currentLesson.id;
                      const done = completedIds.includes(item.id);
                      const quizWrong = !done && quizResults[item.id] === 'wrong';
                      const passageScore = passageScores[item.id];
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectLesson(idx)}
                          className={`w-full text-left p-2.5 rounded-xl border transition flex items-start justify-between gap-2 ${
                            active
                              ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-400 text-indigo-900 dark:text-indigo-200'
                              : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:border-indigo-300'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-bold">{item.title}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap items-center gap-1.5">
                              <span>{item.level} • {item.category}</span>
                              {passageScore !== undefined && (
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                                    passageScore >= 80
                                      ? 'bg-emerald-100 text-emerald-700'
                                      : passageScore >= 55
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-rose-100 text-rose-700'
                                  }`}
                                >
                                  Đọc: {passageScore}đ
                                </span>
                              )}
                            </div>
                          </div>
                          {done ? (
                            <span title="Đã làm đúng Quiz" className="shrink-0 mt-0.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            </span>
                          ) : quizWrong ? (
                            <span title="Quiz đang chọn sai" className="shrink-0 mt-0.5">
                              <XCircle className="w-4 h-4 text-rose-500" />
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold">
                      <button
                        type="button"
                        disabled={safePage <= 0}
                        onClick={() => setLessonPage((p) => Math.max(0, p - 1))}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40"
                      >
                        ← Trước
                      </button>
                      <span className="text-slate-500">
                        {safePage + 1} / {totalPages}
                      </span>
                      <button
                        type="button"
                        disabled={safePage >= totalPages - 1}
                        onClick={() => setLessonPage((p) => Math.min(totalPages - 1, p + 1))}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40"
                      >
                        Sau →
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* Right: Active Lesson Player + Reader + Quiz + Shadowing */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-700">
                    Cấp {currentLesson.level} • {currentLesson.sourceStyle}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1.5">
                    {currentLesson.title}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {[0.75, 0.9, 1.0].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRate(r)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        rate === r
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {r}x
                    </button>
                  ))}
                  <button
                    onClick={() => speakText(currentLesson.transcript, accent, rate)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" /> Nghe cả bài
                  </button>
                  <button
                    onClick={() => window.speechSynthesis?.cancel()}
                    className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-600"
                    title="Dừng đọc"
                  >
                    <Square className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Transcript & Translation toggles */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowTranscript((v) => !v)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  {showTranscript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {showTranscript ? 'Ẩn bài đọc (Luyện nghe chay)' : 'Hiện bài đọc'}
                </button>
                <button
                  onClick={() => setShowVi((v) => !v)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" /> {showVi ? 'Ẩn dịch tiếng Việt' : 'Xem dịch tiếng Việt'}
                </button>
              </div>

              {showTranscript && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400">
                    Bấm vào bất kỳ từ nào để nghe phát âm & tra nghĩa:
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
                    {currentLesson.transcript.split(/\s+/).map((tok, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleWordClick(tok)}
                        className="inline-block mr-1.5 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:text-indigo-700 rounded px-0.5 transition"
                      >
                        {tok}
                      </button>
                    ))}
                  </p>
                </div>
              )}

              {showVi && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>Dịch nghĩa:</strong> {currentLesson.translation}
                </div>
              )}

              {/* Key Phrases */}
              <div className="flex flex-wrap gap-1.5">
                {currentLesson.keyPhrases.map((kp) => (
                  <button
                    key={kp.en}
                    onClick={() => speakText(kp.en, accent, 0.9)}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs inline-flex items-center gap-1.5 hover:border-indigo-400"
                  >
                    <Volume2 className="w-3 h-3 text-indigo-500" />
                    <strong className="text-indigo-900 dark:text-indigo-200">{kp.en}</strong>
                    <span className="text-slate-500">({kp.vi})</span>
                  </button>
                ))}
              </div>

              {/* Word Lookup Card */}
              {lookupLoading && (
                <div className="text-xs text-indigo-600 flex items-center gap-1.5">
                  <Loader2 className="w-4 h-4 animate-spin" /> Đang tra từ...
                </div>
              )}
              {lookedUpWord && (
                <WordAnatomyCard
                  wordEntry={lookedUpWord}
                  accent={accent}
                  isSaved={savedWords.some((w) => w.word === lookedUpWord.word)}
                  onSaveWord={onSaveWord}
                  onPronunciationScore={onPronunciationScore}
                />
              )}

              {/* Full Passage Read-Aloud & Word-by-Word Pronunciation Grading */}
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-extrabold uppercase text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                      <Mic className="w-4 h-4" /> Đọc phát âm lại cả đoạn văn & Chấm điểm từng chữ
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                      Bấm đọc cả đoạn văn bằng giọng của bạn rồi bấm Dừng — hệ thống sẽ chỉ rõ chữ nào phát âm đúng, gần đúng hay sai/thiếu.
                    </p>
                  </div>
                  {passageScores[currentLesson.id] !== undefined && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black">
                      Điểm cao nhất: {passageScores[currentLesson.id]}/100
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={runPassageMicCheck}
                    className={`px-4 py-2 rounded-xl text-xs font-bold text-white inline-flex items-center gap-1.5 transition ${
                      passageListening
                        ? 'bg-rose-600 hover:bg-rose-700 animate-pulse'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {passageListening ? (
                      <>
                        <Square className="w-3.5 h-3.5" /> Dừng đọc & Chấm điểm ngay
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5" /> Bắt đầu đọc cả đoạn văn
                      </>
                    )}
                  </button>
                </div>

                {passageListening && (
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-300 text-xs text-slate-700 dark:text-slate-200">
                    <span className="font-bold text-rose-600">● Đang thu giọng đọc đoạn văn... </span>
                    <span>{passageInterim || 'Hãy đọc to, rõ ràng từng câu theo đoạn văn phía trên...'}</span>
                  </div>
                )}

                {passageSpeechError && <p className="text-xs text-rose-600 font-semibold">{passageSpeechError}</p>}

                {passageScoreResult && (
                  <PronunciationReportCard
                    result={passageScoreResult}
                    accent={accent}
                    title="Chấm điểm đọc đoạn văn từng chữ"
                    userAudioUrl={passageSelfAudioUrl}
                    sampleText={currentLesson.transcript}
                    onRetry={runPassageMicCheck}
                  />
                )}
              </div>

              {/* Comprehension Quiz */}
              <div className="p-4 rounded-xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/50 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-extrabold uppercase text-sky-700 dark:text-sky-300">
                    📝 Kiểm tra Nghe & Đọc hiểu
                  </div>
                  {selectedAns !== null && (
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[11px] font-bold ${
                        selectedAns === currentLesson.question.correctIdx
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {selectedAns === currentLesson.question.correctIdx
                        ? '✓ Trả lời đúng (+20 XP)'
                        : '✕ Trả lời chưa đúng'}
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{currentLesson.question.q}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentLesson.question.options.map((opt, oIdx) => {
                    const picked = selectedAns === oIdx;
                    const isCorrect = oIdx === currentLesson.question.correctIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswerQuiz(oIdx)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition ${
                          selectedAns !== null
                            ? isCorrect
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                              : picked
                              ? 'bg-rose-100 border-rose-500 text-rose-900'
                              : 'bg-white dark:bg-slate-900 border-slate-200 opacity-60'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {selectedAns !== null && selectedAns !== currentLesson.question.correctIdx && (
                  <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">
                    ✕ Đáp án bạn chọn chưa đúng. Đáp án chính xác là:{' '}
                    <strong>"{currentLesson.question.options[currentLesson.question.correctIdx]}"</strong>
                  </p>
                )}
              </div>

              {/* Inline Shadowing Practice on THIS lesson */}
              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-extrabold uppercase text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <Mic className="w-4 h-4" /> Luyện Nói / Đọc Nhại (Shadowing) từng câu trong bài
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {lessonSentences.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setShadowSentenceIdx(idx);
                          setScoreResult(null);
                          setSpeechError(null);
                        }}
                        className={`px-2 py-0.5 rounded-lg text-[11px] font-bold ${
                          shadowSentenceIdx % lessonSentences.length === idx
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white dark:bg-slate-800 text-slate-600 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        Câu {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  "{activeLessonSentence}"
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => speakText(activeLessonSentence, accent, 0.85)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <Turtle className="w-3.5 h-3.5 text-indigo-500" /> Nghe mẫu câu này
                  </button>
                  <button
                    onClick={() => runMicCheck(activeLessonSentence)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold text-white inline-flex items-center gap-1.5 ${
                      isListening ? 'bg-rose-500 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    {isListening ? (
                      <>
                        <Square className="w-3.5 h-3.5" /> Dừng & Chấm điểm
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5" /> Bấm Mic để đọc nhại
                      </>
                    )}
                  </button>
                </div>

                {isListening && micInterim && (
                  <p className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">● {micInterim}</p>
                )}
                {speechError && <p className="text-xs text-rose-600 font-semibold">{speechError}</p>}
                {scoreResult && (
                  <PronunciationReportCard
                    result={scoreResult}
                    accent={accent}
                    title="Chấm phát âm câu Shadowing"
                    userAudioUrl={selfAudioUrl}
                    sampleText={activeLessonSentence}
                    onRetry={() => runMicCheck(activeLessonSentence)}
                  />
                )}
              </div>

              {onUnlockNext && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={onUnlockNext}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    {isNextUnlocked
                      ? 'Sang Bước 4: Đọc & Viết Thực Chiến (Đã mở khóa)'
                      : 'Mở khóa Bước 4: Đọc & Viết Thực Chiến'}{' '}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STANDALONE SHADOWING & MIC SCORING (1-BY-1 FOCUS MODE) */}
      {subTab === 'shadowing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Main Column: Single-Sentence Practice & Grading Studio */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5">
              {/* Top Meta + Score Status */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  {customPracticeText ? (
                    <>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                        Câu tự nhập tùy chỉnh
                      </span>
                      <button
                        type="button"
                        onClick={() => setCustomPracticeText(null)}
                        className="text-xs font-bold text-indigo-600 hover:underline"
                      >
                        ← Quay lại Bài {safeSpeakingIdx + 1}
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                        Bài {safeSpeakingIdx + 1}/{filteredSpeakingList.length} • Cấp {currentSpeakingItem.level}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {currentSpeakingItem.topic}
                      </span>
                    </>
                  )}
                </div>

                {sentenceScores[activeTargetSentence] !== undefined ? (
                  <span
                    className={`px-2.5 py-1 rounded-xl text-xs font-black border ${
                      sentenceScores[activeTargetSentence] >= 80
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : sentenceScores[activeTargetSentence] >= 55
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : 'bg-rose-50 text-rose-700 border-rose-300'
                    }`}
                  >
                    {sentenceScores[activeTargetSentence] >= 80 ? '✓ Đạt chuẩn: ' : 'Điểm cao nhất: '}
                    {sentenceScores[activeTargetSentence]}/100
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">
                    Chưa luyện nói bài này
                  </span>
                )}
              </div>

              {/* Single Focused Prompt */}
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-3">
                <div className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  "{activeTargetSentence}"
                </div>
                {!customPracticeText && (
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <strong>Nghĩa:</strong> {currentSpeakingItem.vi}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => speakText(activeTargetSentence, accent, 0.8)}
                    className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1.5 hover:border-indigo-400"
                  >
                    <Turtle className="w-4 h-4 text-indigo-500" /> Nghe chậm (0.8x)
                  </button>
                  <button
                    onClick={() => speakText(activeTargetSentence, accent, 1.0)}
                    className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1.5 hover:border-indigo-400"
                  >
                    <Volume2 className="w-4 h-4 text-indigo-500" /> Nghe chuẩn (1.0x)
                  </button>
                  <button
                    onClick={() => runMicCheck(activeTargetSentence)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold text-white inline-flex items-center gap-1.5 ${
                      isListening ? 'bg-rose-500 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    {isListening ? (
                      <>
                        <Square className="w-4 h-4" /> Dừng & Chấm điểm
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4" /> Bấm Mic & Đọc to
                      </>
                    )}
                  </button>
                </div>

                {isListening && micInterim && (
                  <p className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">● {micInterim}</p>
                )}
                {speechError && <p className="text-xs text-rose-600 font-semibold">{speechError}</p>}
                {scoreResult && (
                  <PronunciationReportCard
                    result={scoreResult}
                    accent={accent}
                    title={`Chấm điểm Bài ${safeSpeakingIdx + 1} từng chữ`}
                    userAudioUrl={selfAudioUrl}
                    sampleText={activeTargetSentence}
                    onRetry={() => runMicCheck(activeTargetSentence)}
                  />
                )}
              </div>

              {/* Prev / Next Lesson Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => selectSpeakingLesson(safeSpeakingIdx - 1)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-400"
                >
                  ← Bài trước
                </button>
                <span className="text-xs font-bold text-slate-500">
                  Bài {safeSpeakingIdx + 1} / {filteredSpeakingList.length}
                </span>
                <button
                  type="button"
                  onClick={() => selectSpeakingLesson(safeSpeakingIdx + 1)}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-indigo-600 text-white text-xs sm:text-sm font-bold transition"
                >
                  Bài tiếp theo →
                </button>
              </div>
            </div>

            {/* Compact Custom Sentence & AI Generator below main lesson */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                <input
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Hoặc tự nhập một câu tiếng Anh bất kỳ để luyện đọc ngay..."
                  className="w-full sm:flex-1 sm:min-w-[220px] px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customInput.trim()) {
                      setCustomPracticeText(customInput.trim());
                      setScoreResult(null);
                      setSpeechError(null);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Dùng câu này
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-2">
                <div className="flex flex-wrap gap-2">
                  <input
                    value={aiTopicInput}
                    onChange={(e) => setAiTopicInput(e.target.value)}
                    placeholder="Nhập công việc / tình huống để AI tạo thêm câu luyện nói (vd: Kế toán, Y tá, Bán hàng)..."
                    className="w-full sm:flex-1 sm:min-w-[220px] px-3 py-1.5 rounded-xl border border-purple-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAiCreateSentences}
                    disabled={aiGenerating}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {aiGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <PlusCircle className="w-3.5 h-3.5" />}
                    ✨ AI Tạo Câu Nói Mới
                  </button>
                </div>
                {aiGenError && <p className="text-xs text-rose-600 font-semibold">{aiGenError}</p>}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Compact Lesson List (Bài 1 .. Bài 25) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 h-fit">
            {(() => {
              const passedCount = filteredSpeakingList.filter(
                (it) => (sentenceScores[it.en] ?? -1) >= 80
              ).length;
              const needFixCount = filteredSpeakingList.filter((it) => {
                const sc = sentenceScores[it.en];
                return sc !== undefined && sc < 80;
              }).length;
              const todoCount = filteredSpeakingList.length - passedCount - needFixCount;

              return (
                <>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold uppercase text-slate-500">
                      Danh sách bài luyện nói ({filteredSpeakingList.length})
                    </h4>
                    <span className="text-[11px] font-bold text-emerald-600">
                      ✓ {passedCount}/{filteredSpeakingList.length}
                    </span>
                  </div>

                  {/* Summary Pills */}
                  <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                    <div className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-center">
                      ✓ Đạt: {passedCount}
                    </div>
                    <div className="px-2 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-center">
                      ! Sửa: {needFixCount}
                    </div>
                    <div className="px-2 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200 text-center">
                      Chưa: {todoCount}
                    </div>
                  </div>

                  {/* Search & Level filter */}
                  <div className="space-y-1.5">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                      <input
                        value={speakingSearch}
                        onChange={(e) => {
                          setSpeakingSearch(e.target.value);
                          selectSpeakingLesson(0);
                        }}
                        placeholder={`Tìm trong ${allSentences.length} câu luyện nói...`}
                        className="w-full pl-8 pr-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                      />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {availableLevels.map((lv) => (
                        <button
                          key={lv}
                          type="button"
                          onClick={() => {
                            setSpeakingLevelFilter(lv);
                            selectSpeakingLesson(0);
                          }}
                          className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                            speakingLevelFilter === lv
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {lv === 'ALL' ? 'Mọi cấp' : lv}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Topic filter */}
                  <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                    {allowedSpeakingTopics.map((tp) => {
                      const isPreferred =
                        learnerProfile?.audience === 'worker' &&
                        learnerProfile.worker?.industries?.includes(tp);
                      return (
                        <button
                          key={tp}
                          type="button"
                          onClick={() => {
                            setSpeakingTopicFilter(tp);
                            selectSpeakingLesson(0);
                          }}
                          className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition ${
                            speakingTopicFilter === tp
                              ? 'bg-indigo-600 text-white'
                              : isPreferred
                              ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {isPreferred ? `⭐ ${tp}` : tp}
                        </button>
                      );
                    })}
                  </div>

                  {/* Status filter */}
                  <div className="flex flex-wrap gap-1 text-[11px] font-bold pt-1 border-t border-slate-100 dark:border-slate-800">
                    {[
                      { id: 'ALL', label: 'Tất cả bài' },
                      { id: 'need_fix', label: `Cần sửa (${needFixCount})` },
                      { id: 'passed', label: `✓ Đạt (${passedCount})` },
                      { id: 'todo', label: `Chưa đọc (${todoCount})` },
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          setSpeakingStatusFilter(st.id as any);
                          setSpeakingPage(0);
                        }}
                        className={`px-2 py-1 rounded-lg border transition ${
                          speakingStatusFilter === st.id
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </>
              );
            })()}

            {/* Paginated Single-Line Lesson Picker */}
            {(() => {
              const SP_PAGE_SIZE = 20;
              const visibleEntries = filteredSpeakingList
                .map((item, idx) => ({ item, idx }))
                .filter(({ item }) => {
                  const sc = sentenceScores[item.en];
                  const isPassed = sc !== undefined && sc >= 80;
                  const isNeedFix = sc !== undefined && sc < 80;
                  if (speakingStatusFilter === 'passed') return isPassed;
                  if (speakingStatusFilter === 'need_fix') return isNeedFix;
                  if (speakingStatusFilter === 'todo') return sc === undefined;
                  return true;
                });
              const totalPages = Math.max(1, Math.ceil(visibleEntries.length / SP_PAGE_SIZE));
              const safePage = Math.min(speakingPage, totalPages - 1);
              const pageEntries = visibleEntries.slice(
                safePage * SP_PAGE_SIZE,
                (safePage + 1) * SP_PAGE_SIZE
              );

              return (
                <>
                  <div className="space-y-1.5 max-h-60 lg:max-h-[340px] overflow-y-auto pr-1">
                    {pageEntries.map(({ item, idx }) => {
                      const sc = sentenceScores[item.en];
                      const isPassed = sc !== undefined && sc >= 80;
                      const isNeedFix = sc !== undefined && sc < 80;
                      const active = !customPracticeText && idx === safeSpeakingIdx;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => selectSpeakingLesson(idx)}
                          className={`w-full text-left px-3 py-2 rounded-xl border transition flex items-center justify-between gap-2 ${
                            active
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                              : isPassed
                              ? 'bg-emerald-50/70 border-emerald-300 text-slate-800 dark:bg-emerald-950/30 dark:text-slate-100'
                              : isNeedFix
                              ? 'bg-rose-50/70 border-rose-300 text-slate-800 dark:bg-rose-950/30 dark:text-slate-100'
                              : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-extrabold flex items-center gap-1.5">
                              <span>Bài {idx + 1}</span>
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded ${
                                  active
                                    ? 'bg-white/20 text-white'
                                    : 'bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                }`}
                              >
                                {item.level}
                              </span>
                            </div>
                            <div className={`text-[11px] truncate mt-0.5 ${active ? 'text-indigo-100' : 'text-slate-500'}`}>
                              {item.en}
                            </div>
                          </div>
                          {sc !== undefined && (
                            <span
                              className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-black ${
                                active
                                  ? 'bg-white text-indigo-700'
                                  : isPassed
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-rose-100 text-rose-700'
                              }`}
                            >
                              {isPassed ? `✓ ${sc}đ` : `${sc}đ`}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold">
                      <button
                        type="button"
                        disabled={safePage <= 0}
                        onClick={() => setSpeakingPage((p) => Math.max(0, p - 1))}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40"
                      >
                        ← Trước
                      </button>
                      <span className="text-slate-500">
                        Trang {safePage + 1}/{totalPages}
                      </span>
                      <button
                        type="button"
                        disabled={safePage >= totalPages - 1}
                        onClick={() => setSpeakingPage((p) => Math.min(totalPages - 1, p + 1))}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40"
                      >
                        Sau →
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB 3: ROLEPLAY SITUATIONS */}
      {subTab === 'roleplay' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
          {/* AI Create Roleplay Scenario Bar */}
          <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-2">
            <div className="flex flex-wrap gap-2">
              <input
                value={aiTopicInput}
                onChange={(e) => setAiTopicInput(e.target.value)}
                placeholder="Nhập tình huống hội thoại muốn AI tạo kịch bản mới (vd: Phỏng vấn IT, Đặt phòng khách sạn)..."
                className="w-full sm:flex-1 sm:min-w-[220px] px-3 py-1.5 rounded-xl border border-purple-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
              />
              <button
                onClick={handleAiCreateScenario}
                disabled={aiGenerating}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
              >
                {aiGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <PlusCircle className="w-3.5 h-3.5" />}
                ✨ AI Tạo Hội Thoại Mới
              </button>
            </div>
            {aiGenError && <p className="text-xs text-rose-600 font-semibold">{aiGenError}</p>}
          </div>

          {/* Filter & Paginated Scenario Picker */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  value={roleplaySearch}
                  onChange={(e) => {
                    setRoleplaySearch(e.target.value);
                    setScenarioIdx(0);
                    setRoleplayPage(0);
                    setTurnIdx(0);
                    setRoleplayFeedback(null);
                  }}
                  placeholder={`Tìm trong ${allScenarios.length} kịch bản hội thoại thực tế...`}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                />
              </div>
              <div className="flex flex-wrap gap-1">
                {availableLevels.map((lv) => (
                  <button
                    key={lv}
                    onClick={() => {
                      setRoleplayLevelFilter(lv);
                      setScenarioIdx(0);
                      setRoleplayPage(0);
                      setTurnIdx(0);
                      setRoleplayFeedback(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      roleplayLevelFilter === lv
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {lv === 'ALL' ? 'Mọi cấp' : lv}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {allowedRoleplayCategories.map((cat) => {
                const isPreferred =
                  learnerProfile?.audience === 'worker' &&
                  learnerProfile.worker?.industries?.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setRoleplayCatFilter(cat);
                      setScenarioIdx(0);
                      setRoleplayPage(0);
                      setTurnIdx(0);
                      setRoleplayFeedback(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                      roleplayCatFilter === cat
                        ? 'bg-indigo-600 text-white'
                        : isPreferred
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {isPreferred ? `⭐ ${cat}` : cat}
                  </button>
                );
              })}
            </div>

            {(() => {
              const RP_PAGE_SIZE = 12;
              const totalPages = Math.max(1, Math.ceil(filteredScenarios.length / RP_PAGE_SIZE));
              const safePage = Math.min(roleplayPage, totalPages - 1);
              const pageItems = filteredScenarios.slice(
                safePage * RP_PAGE_SIZE,
                (safePage + 1) * RP_PAGE_SIZE
              );

              return (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>
                      Kịch bản {safeScenarioIdx + 1}/{filteredScenarios.length} ({currentScenario.level}
                      {currentScenario.category ? ` • ${currentScenario.category}` : ''})
                    </span>
                    {totalPages > 1 && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={safePage <= 0}
                          onClick={() => setRoleplayPage((p) => Math.max(0, p - 1))}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40"
                        >
                          ← Trước
                        </button>
                        <span>
                          Trang {safePage + 1}/{totalPages}
                        </span>
                        <button
                          type="button"
                          disabled={safePage >= totalPages - 1}
                          onClick={() => setRoleplayPage((p) => Math.min(totalPages - 1, p + 1))}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40"
                        >
                          Sau →
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {pageItems.map((sc, offset) => {
                      const idx = safePage * RP_PAGE_SIZE + offset;
                      return (
                        <button
                          key={sc.id}
                          onClick={() => {
                            setScenarioIdx(idx);
                            setTurnIdx(0);
                            setRoleplayFeedback(null);
                            setSelfAudioUrl(null);
                          }}
                          className={`px-3 py-2 rounded-xl text-xs font-bold border text-left transition ${
                            safeScenarioIdx === idx
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{sc.title}</span>
                          </div>
                          <div
                            className={`text-[10px] mt-0.5 ${
                              safeScenarioIdx === idx ? 'text-indigo-100' : 'text-slate-500'
                            }`}
                          >
                            {sc.level} • {sc.category || 'Hội thoại chung'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600">
                Lượt {turnIdx + 1}/{currentScenario.turns.length} • {currentScenario.context}
              </span>
              <button
                onClick={() => speakText(currentTurn.en, accent, 0.9)}
                className="text-xs font-bold text-indigo-600 inline-flex items-center gap-1"
              >
                <Volume2 className="w-4 h-4" /> Nghe câu này
              </button>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-bold text-slate-400 uppercase">
                {currentTurn.speaker === 'AI' ? 'Người đối thoại nói:' : 'Lượt của bạn:'}
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{currentTurn.en}</div>
              <div className="text-xs text-slate-500 mt-0.5">{currentTurn.vi}</div>
            </div>

            {(() => {
              const targetReply = currentTurn.suggestedReplies?.[0]?.en ?? currentTurn.en;
              return (
                <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Câu gợi ý bạn đáp lại / luyện nói:
                  </div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">{targetReply}</div>
                  {currentTurn.suggestedReplies?.[0]?.vi && (
                    <div className="text-xs text-slate-500">{currentTurn.suggestedReplies[0].vi}</div>
                  )}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => speakText(targetReply, accent, 0.9)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 text-xs font-bold"
                    >
                      🔊 Nghe mẫu câu đáp
                    </button>
                    <button
                      onClick={() => runMicCheck(targetReply, (res) => setRoleplayFeedback(res))}
                      className={`px-4 py-1.5 rounded-xl text-white text-xs font-bold inline-flex items-center gap-1.5 ${
                        isListening ? 'bg-rose-500 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700'
                      }`}
                    >
                      {isListening ? '⏹️ Dừng & Chấm điểm' : '🎙️ Bấm Mic nói câu đáp'}
                    </button>
                    <button
                      onClick={() => {
                        setTurnIdx((t) => (t + 1) % currentScenario.turns.length);
                        setRoleplayFeedback(null);
                        setSelfAudioUrl(null);
                      }}
                      className="ml-auto px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                    >
                      Lượt tiếp →
                    </button>
                  </div>
                  {isListening && micInterim && (
                    <p className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">● {micInterim}</p>
                  )}
                  {speechError && <p className="text-xs text-rose-600 font-semibold">{speechError}</p>}
                  {roleplayFeedback && (
                    <PronunciationReportCard
                      result={roleplayFeedback}
                      accent={accent}
                      title="Điểm phản xạ hội thoại từng chữ"
                      userAudioUrl={selfAudioUrl}
                      sampleText={targetReply}
                      compact
                      onRetry={() => runMicCheck(targetReply, (res) => setRoleplayFeedback(res))}
                    />
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
