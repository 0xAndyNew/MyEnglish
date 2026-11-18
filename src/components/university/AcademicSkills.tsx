import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Award,
  BookmarkCheck,
  BookmarkPlus,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  Lightbulb,
  Loader2,
  MessageSquareQuote,
  Mic,
  PenTool,
  Presentation,
  RotateCcw,
  RotateCw,
  Search,
  Sparkles,
  Square,
  Target,
  Turtle,
  Volume2,
  XCircle,
} from 'lucide-react';
import {
  ACADEMIC_ABSTRACTS,
  ACADEMIC_WRITING_PROMPTS,
  AcademicAbstract,
  AcademicWritingPrompt,
  AcademicWritingType,
  ATS_CV_GUIDES,
  AWL_DOMAINS,
  AWL_DRILLS,
  AWL_WORDS,
  AwlDomain,
  AwlWordItem,
  CV_ACTION_VERB_GROUPS,
  GRADUATION_QUICK_QUIZ,
  GRADUATION_STANDARDS,
  PRESENTATION_PHRASES,
  PRESENTATION_STAGES,
  PresentationStageId,
  SEMINAR_PHRASES,
  UNIVERSITY_YEAR_ROADMAP,
} from '../../data/university/academicCurriculumData';
import { AccentMode, LearnerProfile, WordEntry } from '../../types/learning';
import { callGeminiText } from '../../utils/geminiClient';
import {
  isSpeechRecognitionSupported,
  PronunciationScoreResult,
  scorePronunciation,
  speakText,
  startSpeechRecognition,
} from '../../utils/speechEngine';
import { PronunciationReportCard } from '../PronunciationReportCard';
import { ExerciseRunner } from '../practice/ExerciseRunner';

export interface AcademicSkillsProps {
  accent: AccentMode;
  geminiApiKey?: string;
  profile?: LearnerProfile | null;
  onAddXp: (amount: number) => void;
  onSaveWord?: (word: WordEntry) => void;
  initialTab?: 'awl' | 'presentation' | 'writing' | 'career';
  hideHeaderNav?: boolean;
}

type MainTabId = 'awl' | 'presentation' | 'writing' | 'career';

interface OfflineWritingEvaluation {
  score: number;
  bandHint: string;
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  suggestions: string[];
}

const GOAL_LABEL_VI: Record<'graduation' | 'academic' | 'communication', string> = {
  graduation: 'Đạt chuẩn đầu ra ĐH',
  academic: 'Học thuật, nghiên cứu & du học',
  communication: 'Thuyết trình & xin thực tập',
};

const LEVEL_BADGE_CLASS: Record<'B1' | 'B2' | 'C1', string> = {
  B1: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800',
  B2: 'bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-800',
  C1: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
};

const ATS_SELF_CHECKLIST = [
  { id: 'chk-1col', label: 'CV dùng bố cục 1 cột gọn gàng, không dùng bảng phức tạp hay biểu đồ % kỹ năng.' },
  { id: 'chk-pdf', label: 'Xuất file PDF chọn/copy được chữ (text-selectable), không phải file ảnh.' },
  { id: 'chk-edu', label: 'Mục Education ghi rõ trường, ngành, thời gian dự kiến tốt nghiệp và GPA (nếu >= 3.2/4.0).' },
  { id: 'chk-xyz', label: 'Các gạch đầu dòng dự án/kinh nghiệm mở đầu bằng Action Verb mạnh và có con số định lượng.' },
  { id: 'chk-jd', label: 'Đã đối chiếu và lồng ghép tự nhiên các từ khóa kỹ năng từ JD vị trí ứng tuyển.' },
  { id: 'chk-proof', label: 'Đã kiểm tra chính tả tiếng Anh, không dùng đại từ "I/My" trong CV Summary.' },
];

function toWordEntry(item: AwlWordItem): WordEntry {
  return {
    id: item.id,
    word: item.word,
    syllables: item.syllables,
    stressIndex: item.stressIndex,
    ipaUS: item.ipa,
    ipaUK: item.ipaUK,
    vietPhonetic: item.vietPhonetic,
    phonicsRule: item.phonicsRule,
    pos: item.pos,
    level: item.level,
    meaningVi: item.meaningVi,
    mnemonic: item.mnemonic,
    wordFamily: item.wordFamily,
    collocations: item.collocations,
    examples: [
      {
        en: item.academicExampleEn,
        vi: item.academicExampleVi,
      },
    ],
    topicId: `AWL: ${item.domain}`,
    audiences: ['university'],
  };
}

function maskTargetWordInSentence(sentence: string, word: string): string {
  const stem = word.length > 5 ? word.slice(0, word.length - 1) : word;
  const escaped = stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\b${escaped}[a-z]*\\b`, 'i');
  if (regex.test(sentence)) {
    return sentence.replace(regex, '__________');
  }
  return `${sentence} (Target: __________)`;
}

function renderHighlightedAbstract(text: string, keyTerms: string[]): React.ReactNode {
  if (!keyTerms.length) return text;
  const sorted = [...keyTerms].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(
    `\\b(${sorted.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
    'gi'
  );
  const parts = text.split(pattern);
  const lowerSet = new Set(keyTerms.map((t) => t.toLowerCase()));
  return parts.map((part, idx) =>
    lowerSet.has(part.toLowerCase()) ? (
      <mark
        key={`${part}-${idx}`}
        className="px-1 py-0.5 rounded bg-violet-100 dark:bg-violet-900/60 text-violet-900 dark:text-violet-200 font-bold"
      >
        {part}
      </mark>
    ) : (
      <React.Fragment key={idx}>{part}</React.Fragment>
    )
  );
}

function gradeAcademicWritingOffline(
  text: string,
  prompt: AcademicWritingPrompt
): OfflineWritingEvaluation {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const sentences = trimmed
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2);
  const sentenceCount = sentences.length;
  const paragraphs = trimmed
    .split(/\n\s*\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const paragraphCount = paragraphs.length;

  const matchedKeywords = prompt.keywordsEn.filter((kw) => lower.includes(kw.toLowerCase()));
  const missingKeywords = prompt.keywordsEn.filter((kw) => !lower.includes(kw.toLowerCase()));

  const strengths: string[] = [];
  const suggestions: string[] = [];

  // 1. Length score (0 - 30)
  const target = prompt.recommendedWords;
  const ratio = wordCount / Math.max(40, target);
  let lengthScore = 0;
  if (ratio >= 0.85 && ratio <= 1.45) {
    lengthScore = 30;
    strengths.push(`Độ dài đạt chuẩn (${wordCount} từ, mục tiêu ~${target} từ).`);
  } else if (ratio >= 0.6) {
    lengthScore = Math.round(18 + ((ratio - 0.6) / 0.25) * 10);
    suggestions.push(`Bài viết hơi ngắn (${wordCount}/${target} từ). Nên triển khai thêm dẫn chứng hoặc chi tiết.`);
  } else if (ratio > 1.45) {
    lengthScore = 25;
    suggestions.push(`Bài viết khá dài (${wordCount} từ). Cần cô đọng hơn để giữ đúng trọng tâm đề bài.`);
  } else {
    lengthScore = Math.max(5, Math.round(ratio * 28));
    suggestions.push(`Bài viết còn quá ngắn (${wordCount} từ so với mức gợi ý ${target} từ).`);
  }

  // 2. Keyword & Academic vocabulary coverage (0 - 35)
  const kwRatio = prompt.keywordsEn.length > 0 ? matchedKeywords.length / prompt.keywordsEn.length : 1;
  const keywordScore = Math.round(kwRatio * 35);
  if (matchedKeywords.length >= Math.ceil(prompt.keywordsEn.length * 0.6)) {
    strengths.push(`Vận dụng tốt từ vựng/cụm từ học thuật gợi ý (${matchedKeywords.length}/${prompt.keywordsEn.length}).`);
  } else {
    suggestions.push(
      `Nên bổ sung các từ khóa trọng tâm chưa dùng: ${missingKeywords.slice(0, 4).join(', ')}.`
    );
  }

  // 3. Genre-specific structure score (0 - 20)
  let structureScore = 0;
  const isEmailOrLetter =
    prompt.type === 'Email giảng viên' ||
    prompt.type === 'Email xin thực tập' ||
    prompt.type === 'Cover Letter';
  const isEssayOrPs =
    prompt.type.startsWith('Essay:') || prompt.type === 'Personal Statement';

  if (isEmailOrLetter) {
    const hasGreeting = /\b(dear|to whom it may concern)\b/i.test(trimmed);
    const hasClosing = /\b(sincerely|best regards|yours sincerely|yours faithfully|respectfully|regards)\b/i.test(trimmed);
    const hasSubjectOrBody = paragraphs.length >= 2 || /\bsubject:/i.test(trimmed);
    if (hasGreeting) structureScore += 7;
    else suggestions.push('Thiếu lời chào trang trọng đầu thư (VD: "Dear Dr. Nguyen," hoặc "Dear Hiring Manager,").');

    if (hasClosing) structureScore += 7;
    else suggestions.push('Thiếu lời kết thư chuyên nghiệp (VD: "Sincerely," hoặc "Best regards,").');

    if (hasSubjectOrBody) structureScore += 6;
    else suggestions.push('Nên chia rõ đoạn văn (Mở đầu mục đích → Nội dung/Năng lực → Kết thúc) và thêm dòng Subject.');

    if (hasGreeting && hasClosing && hasSubjectOrBody) {
      strengths.push('Bố cục thư/email chuẩn mực, có mở đầu và kết thư trang trọng.');
    }
  } else if (isEssayOrPs) {
    const hasTransitions =
      /\b(however|moreover|furthermore|consequently|therefore|nevertheless|although|in conclusion|to summarize|first|secondly|ultimately)\b/i.test(
        trimmed
      );
    if (paragraphCount >= 3) {
      structureScore += 12;
      strengths.push(`Bố cục chia đoạn mạch lạc (${paragraphCount} đoạn rõ ràng).`);
    } else if (paragraphCount === 2) {
      structureScore += 7;
      suggestions.push('Nên tách thành ít nhất 3–4 đoạn (Mở bài – Thân bài 1/2 – Kết bài) để đạt điểm Coherence cao.');
    } else {
      structureScore += 3;
      suggestions.push('Bài viết đang dính thành 1 khối đoạn văn; cần xuống dòng tách rõ Mở – Thân – Kết.');
    }

    if (hasTransitions) {
      structureScore += 8;
      strengths.push('Có sử dụng từ nối học thuật (transition signals) liên kết lập luận.');
    } else {
      suggestions.push('Bổ sung từ nối học thuật như However, Furthermore, Consequently, In conclusion.');
    }
  } else {
    // CV Summary
    const hasQuantifier = /\d+%|\d+\+?/.test(trimmed);
    const hasActionVerb =
      /\b(engineered|developed|analyzed|evaluated|spearheaded|coordinated|optimized|automated|streamlined|designed|built|led|managed)\b/i.test(
        trimmed
      );
    const usesFirstPerson = /\b(i|my|me)\b/i.test(trimmed);
    if (hasActionVerb) {
      structureScore += 8;
      strengths.push('Đã dùng động từ hành động mạnh (Action Verbs) chuẩn CV.');
    } else {
      suggestions.push('Mỗi bullet trong CV nên mở đầu bằng Action Verb mạnh (Analyzed, Engineered, Spearheaded...).');
    }
    if (hasQuantifier) {
      structureScore += 7;
      strengths.push('Có số liệu định lượng cụ thể làm nổi bật tác động.');
    } else {
      suggestions.push('Bổ sung con số đo lường (%, số lượng người dùng, thời gian tiết kiệm) theo công thức XYZ.');
    }
    if (!usesFirstPerson) {
      structureScore += 5;
    } else {
      suggestions.push('CV Summary & Bullet chuẩn quốc tế tránh dùng đại từ "I / my / me".');
    }
  }

  // 4. Register & Mechanics (0 - 15)
  let mechanicsScore = 15;
  if (trimmed && !/^[A-Z]/.test(trimmed)) {
    mechanicsScore -= 3;
    suggestions.push('Chữ cái đầu văn bản cần viết hoa.');
  }
  if (trimmed && !/[.!?]$/.test(trimmed) && prompt.type !== 'CV Summary' && !isEmailOrLetter) {
    mechanicsScore -= 2;
    suggestions.push('Kiểm tra lại dấu chấm câu ở cuối đoạn.');
  }
  if (/\bi\b/.test(trimmed)) {
    mechanicsScore -= 4;
    suggestions.push('Đại từ "I" phải luôn viết HOA.');
  }
  const informalMatches = trimmed.match(
    /\b(wanna|gonna|kinda|sorta|stuff|things|a lot of|kids|super|asap|hey|hi teacher)\b/gi
  );
  if (informalMatches && informalMatches.length > 0) {
    mechanicsScore -= Math.min(6, informalMatches.length * 2);
    suggestions.push(
      `Phát hiện từ ngữ thân mật/văn nói (${Array.from(new Set(informalMatches)).join(', ')}). Hãy thay bằng từ học thuật/trang trọng hơn.`
    );
  }
  if (!isEmailOrLetter && /\b(don't|can't|won't|it's|they're|isn't|aren't)\b/i.test(trimmed)) {
    mechanicsScore -= 3;
    suggestions.push('Trong bài luận học thuật, nên viết đầy đủ (do not, cannot, it is) thay vì viết tắt.');
  }
  if (sentenceCount < 3 && wordCount >= 40) {
    mechanicsScore -= 3;
    suggestions.push('Số câu quá ít so với độ dài — cẩn thận lỗi câu quá dài (run-on sentences).');
  }

  mechanicsScore = Math.max(0, mechanicsScore);
  const totalScore = Math.max(15, Math.min(100, lengthScore + keywordScore + structureScore + mechanicsScore));

  let bandHint = 'A2–B1 (Cần cải thiện)';
  if (totalScore >= 85) bandHint = 'B2+ – C1 (Xuất sắc / Chuẩn học thuật)';
  else if (totalScore >= 70) bandHint = 'B2 (Khá tốt / Đạt chuẩn ĐH)';
  else if (totalScore >= 55) bandHint = 'B1 (Đạt yêu cầu cơ bản)';

  return {
    score: totalScore,
    bandHint,
    wordCount,
    sentenceCount,
    paragraphCount,
    matchedKeywords,
    missingKeywords,
    strengths,
    suggestions,
  };
}

export const AcademicSkills: React.FC<AcademicSkillsProps> = ({
  accent,
  geminiApiKey,
  profile,
  onAddXp,
  onSaveWord,
  initialTab,
  hideHeaderNav,
}) => {
  const [activeTab, setActiveTab] = useState<MainTabId>(initialTab || 'awl');

  useEffect(() => {
    if (initialTab) {
      stopRecordingSafely();
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // =========================================================
  // TAB 1: AWL STATE
  // =========================================================
  const [awlMode, setAwlMode] = useState<'browse' | 'practice'>('browse');
  const [awlDomainFilter, setAwlDomainFilter] = useState<'ALL' | AwlDomain>('ALL');
  const [awlLevelFilter, setAwlLevelFilter] = useState<'ALL' | 'B1' | 'B2' | 'C1'>('ALL');
  const [awlQuery, setAwlQuery] = useState('');
  const [selectedAwlId, setSelectedAwlId] = useState<string>(AWL_WORDS[0].id);
  const [savedAwlIds, setSavedAwlIds] = useState<string[]>([]);

  // AWL Practice (Flashcard / Context Quiz)
  const [practiceKind, setPracticeKind] = useState<'flashcard' | 'quiz'>('flashcard');
  const [flashIdx, setFlashIdx] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);
  const [quizAnsweredCount, setQuizAnsweredCount] = useState(0);

  // =========================================================
  // TAB 2: PRESENTATION, SEMINAR & READING STATE
  // =========================================================
  const [presSubMode, setPresSubMode] = useState<'presentation' | 'seminar' | 'reading'>('presentation');
  const [activeStage, setActiveStage] = useState<PresentationStageId>('Opening');
  const [seminarCategory, setSeminarCategory] = useState<string>('ALL');

  // Shared Speaking Practice state (used in AWL Inspector & Presentation/Seminar)
  const [practicingId, setPracticingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [micInterim, setMicInterim] = useState('');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [speechResult, setSpeechResult] = useState<PronunciationScoreResult | null>(null);
  const [speechAudioUrl, setSpeechAudioUrl] = useState<string | null>(null);
  const stopMicRef = useRef<((abort?: boolean) => void) | null>(null);

  // Academic Abstract Reading state
  const [selectedAbstractIdx, setSelectedAbstractIdx] = useState(0);
  const [showAbstractTrans, setShowAbstractTrans] = useState(false);
  const [abstractAnswers, setAbstractAnswers] = useState<Record<string, number>>({});
  const [rewardedAbstractIds, setRewardedAbstractIds] = useState<string[]>([]);

  // =========================================================
  // TAB 3: WRITING STATE
  // =========================================================
  const [writingTypeFilter, setWritingTypeFilter] = useState<'ALL' | AcademicWritingType>('ALL');
  const [selectedPromptId, setSelectedPromptId] = useState<string>(ACADEMIC_WRITING_PROMPTS[0].id);
  const [draftText, setDraftText] = useState('');
  const [showOutline, setShowOutline] = useState(true);
  const [showSample, setShowSample] = useState(false);
  const [offlineEval, setOfflineEval] = useState<OfflineWritingEvaluation | null>(null);
  const [rewardedWritingIds, setRewardedWritingIds] = useState<string[]>([]);
  const [aiGrading, setAiGrading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // =========================================================
  // TAB 4: CAREER & GRADUATION STATE
  // =========================================================
  const [atsCheckedIds, setAtsCheckedIds] = useState<string[]>([]);
  const [gradQuizAnswers, setGradQuizAnswers] = useState<Record<string, number>>({});
  const [rewardedGradQuizIds, setRewardedGradQuizIds] = useState<string[]>([]);

  // Cleanup audio URLs and mic on unmount
  useEffect(() => {
    return () => {
      stopMicRef.current?.(true);
      stopMicRef.current = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (speechAudioUrl) {
        URL.revokeObjectURL(speechAudioUrl);
      }
    };
  }, [speechAudioUrl]);

  const stopRecordingSafely = () => {
    stopMicRef.current?.(true);
    stopMicRef.current = null;
    setIsListening(false);
    setMicInterim('');
  };

  const handlePracticeSpeaking = (itemId: string, expectedText: string) => {
    if (isListening && practicingId === itemId) {
      stopMicRef.current?.(false);
      return;
    }
    if (isListening) {
      stopRecordingSafely();
    }
    if (!isSpeechRecognitionSupported()) {
      setPracticingId(itemId);
      setSpeechError('Trình duyệt của bạn chưa hỗ trợ thu âm Micro.');
      return;
    }
    setPracticingId(itemId);
    setSpeechError(null);
    setSpeechResult(null);
    setSpeechAudioUrl(null);
    setMicInterim('');
    setIsListening(true);

    stopMicRef.current = startSpeechRecognition(
      accent,
      (transcript, meta) => {
        const res = scorePronunciation(expectedText, transcript);
        setSpeechResult(res);
        setSpeechAudioUrl(meta?.audioUrl ?? null);
        if (res.score >= 70) {
          onAddXp(15);
        }
      },
      (err) => {
        setSpeechError(err);
      },
      () => {
        setIsListening(false);
        stopMicRef.current = null;
      },
      {
        continuous: expectedText.split(/\s+/).length > 7,
        onInterim: (txt) => setMicInterim(txt),
      }
    );
  };

  // =========================================================
  // DERIVED MEMOS
  // =========================================================
  const filteredAwlWords = useMemo(() => {
    const q = awlQuery.trim().toLowerCase();
    return AWL_WORDS.filter((item) => {
      if (awlDomainFilter !== 'ALL' && item.domain !== awlDomainFilter) return false;
      if (awlLevelFilter !== 'ALL' && item.level !== awlLevelFilter) return false;
      if (
        q &&
        !item.word.toLowerCase().includes(q) &&
        !item.meaningVi.toLowerCase().includes(q) &&
        !item.collocations.some((c) => c.toLowerCase().includes(q))
      ) {
        return false;
      }
      return true;
    });
  }, [awlDomainFilter, awlLevelFilter, awlQuery]);

  const activeAwlWord = useMemo(() => {
    return (
      filteredAwlWords.find((w) => w.id === selectedAwlId) ||
      filteredAwlWords[0] ||
      AWL_WORDS[0]
    );
  }, [filteredAwlWords, selectedAwlId]);

  const practicePool = useMemo(() => {
    return filteredAwlWords.length >= 4 ? filteredAwlWords : AWL_WORDS;
  }, [filteredAwlWords]);

  const currentFlashCard = practicePool[flashIdx % practicePool.length];
  const currentQuizTarget = practicePool[quizIdx % practicePool.length];

  const currentQuizOptions = useMemo(() => {
    const others = AWL_WORDS.filter(
      (w) => w.id !== currentQuizTarget.id && w.pos === currentQuizTarget.pos
    );
    const fallbackOthers = AWL_WORDS.filter((w) => w.id !== currentQuizTarget.id);
    const distractors = (others.length >= 3 ? others : fallbackOthers).slice(0, 3);
    const pool = [currentQuizTarget, ...distractors];
    return [...pool].sort((a, b) => a.word.localeCompare(b.word));
  }, [currentQuizTarget]);

  const stagePhrases = useMemo(
    () => PRESENTATION_PHRASES.filter((p) => p.stage === activeStage),
    [activeStage]
  );

  const stageMeta = useMemo(
    () => PRESENTATION_STAGES.find((s) => s.id === activeStage) || PRESENTATION_STAGES[0],
    [activeStage]
  );

  const seminarCategories = useMemo(
    () => Array.from(new Set(SEMINAR_PHRASES.map((p) => p.category))),
    []
  );

  const filteredSeminarPhrases = useMemo(
    () =>
      seminarCategory === 'ALL'
        ? SEMINAR_PHRASES
        : SEMINAR_PHRASES.filter((p) => p.category === seminarCategory),
    [seminarCategory]
  );

  const currentAbstract: AcademicAbstract =
    ACADEMIC_ABSTRACTS[selectedAbstractIdx] || ACADEMIC_ABSTRACTS[0];

  const writingTypes = useMemo(
    () => Array.from(new Set(ACADEMIC_WRITING_PROMPTS.map((p) => p.type))),
    []
  );

  const filteredWritingPrompts = useMemo(
    () =>
      writingTypeFilter === 'ALL'
        ? ACADEMIC_WRITING_PROMPTS
        : ACADEMIC_WRITING_PROMPTS.filter((p) => p.type === writingTypeFilter),
    [writingTypeFilter]
  );

  const activeWritingPrompt = useMemo(
    () =>
      ACADEMIC_WRITING_PROMPTS.find((p) => p.id === selectedPromptId) ||
      filteredWritingPrompts[0] ||
      ACADEMIC_WRITING_PROMPTS[0],
    [selectedPromptId, filteredWritingPrompts]
  );

  const draftStats = useMemo(() => {
    const trimmed = draftText.trim();
    const lower = trimmed.toLowerCase();
    const wordCount = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const matchedKws = activeWritingPrompt.keywordsEn.filter((kw) =>
      lower.includes(kw.toLowerCase())
    );
    return { wordCount, matchedKws };
  }, [draftText, activeWritingPrompt]);

  // =========================================================
  // HANDLERS
  // =========================================================
  const handleSaveAwlWord = (item: AwlWordItem) => {
    const entry = toWordEntry(item);
    onSaveWord?.(entry);
    if (!savedAwlIds.includes(item.id)) {
      setSavedAwlIds((prev) => [...prev, item.id]);
      onAddXp(10);
    }
  };

  const handleQuizAnswer = (chosenWord: string) => {
    if (quizSelected) return;
    setQuizSelected(chosenWord);
    setQuizAnsweredCount((c) => c + 1);
    if (chosenWord === currentQuizTarget.word) {
      setQuizCorrectCount((c) => c + 1);
      onAddXp(15);
    }
  };

  const handleSelectAbstractOption = (qId: string, optionIdx: number) => {
    const nextAnswers = { ...abstractAnswers, [qId]: optionIdx };
    setAbstractAnswers(nextAnswers);

    const allDone = currentAbstract.questions.every((q) => nextAnswers[q.id] !== undefined);
    if (allDone && !rewardedAbstractIds.includes(currentAbstract.id)) {
      const correctNum = currentAbstract.questions.filter(
        (q) => nextAnswers[q.id] === q.correctIndex
      ).length;
      setRewardedAbstractIds((prev) => [...prev, currentAbstract.id]);
      onAddXp(10 + correctNum * 10);
    }
  };

  const handleSelectPrompt = (promptId: string) => {
    setSelectedPromptId(promptId);
    setDraftText('');
    setOfflineEval(null);
    setAiFeedback(null);
    setAiError(null);
    setShowSample(false);
  };

  const handleInsertKeyword = (kw: string) => {
    setDraftText((prev) => {
      if (!prev.trim()) return kw;
      const needsSpace = !/[\s\n]$/.test(prev);
      return `${prev}${needsSpace ? ' ' : ''}${kw}`;
    });
  };

  const handleGradeOffline = () => {
    if (!draftText.trim()) return;
    const evaluation = gradeAcademicWritingOffline(draftText, activeWritingPrompt);
    setOfflineEval(evaluation);
    if (!rewardedWritingIds.includes(activeWritingPrompt.id)) {
      setRewardedWritingIds((prev) => [...prev, activeWritingPrompt.id]);
      onAddXp(20);
    }
  };

  const handleGradeWithAi = async () => {
    const key = (geminiApiKey || '').trim();
    if (!key) {
      setAiError(
        'Tính năng AI chưa có API Key. Bạn hãy bấm "Chấm điểm Offline" miễn phí ngay bên cạnh để xem đánh giá chi tiết nhé!'
      );
      return;
    }
    if (!draftText.trim()) return;
    setAiError(null);
    setAiGrading(true);
    try {
      const promptMsg = `Bạn là giảng viên tiếng Anh học thuật đại học (EAP & Career Advisor). Hãy chấm bài viết của sinh viên bằng tiếng Việt theo các mục rõ ràng:
1. Điểm tổng quan (/100) & Ước lượng trình độ CEFR (B1/B2/C1).
2. Điểm mạnh về cấu trúc, lập luận và từ vựng học thuật.
3. Lỗi ngữ pháp, diễn đạt chưa tự nhiên hoặc lỗi văn phong (register) cần sửa.
4. Gợi ý nâng cấp 2 câu hay nhất theo văn phong học thuật/chuyên nghiệp.

Thể loại: ${activeWritingPrompt.type} (${activeWritingPrompt.level})
Đề bài: ${activeWritingPrompt.promptEn}
Từ khóa gợi ý: ${activeWritingPrompt.keywordsEn.join(', ')}
Bài làm của sinh viên (${draftStats.wordCount} từ):
"""
${draftText}
"""`;

      const reply = await callGeminiText(key, promptMsg);
      setAiFeedback(reply);
      if (!rewardedWritingIds.includes(activeWritingPrompt.id)) {
        setRewardedWritingIds((prev) => [...prev, activeWritingPrompt.id]);
      }
      onAddXp(30);
    } catch (err: any) {
      setAiError(
        `Không thể chấm qua Gemini AI: ${err?.message || 'Lỗi kết nối.'} Hãy sử dụng nút Chấm điểm Offline bên cạnh.`
      );
    } finally {
      setAiGrading(false);
    }
  };

  const handleGradQuizAnswer = (qId: string, optIdx: number, correctIdx: number) => {
    if (gradQuizAnswers[qId] !== undefined) return;
    setGradQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    if (optIdx === correctIdx && !rewardedGradQuizIds.includes(qId)) {
      setRewardedGradQuizIds((prev) => [...prev, qId]);
      onAddXp(15);
    }
  };

  const universityYear = profile?.university?.year;
  const universityGoal = profile?.university?.goal;
  const graduationExam = profile?.university?.graduationExam;
  const majorCategories = profile?.university?.majorCategories || [];

  const mainTabs: { id: MainTabId; label: string; icon: React.ReactNode }[] = [
    { id: 'awl', label: '📚 Từ Vựng Học Thuật (AWL)', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'presentation', label: '🎤 Thuyết Trình, Seminar & Đọc', icon: <Presentation className="w-4 h-4" /> },
    { id: 'writing', label: '✍️ Viết Email, Essay & Chấm AI', icon: <PenTool className="w-4 h-4" /> },
    { id: 'career', label: '🎓 Hồ Sơ CV & Chuẩn Đầu Ra', icon: <Briefcase className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* HERO BANNER */}
      <div className="rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 text-white p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-extrabold tracking-wide uppercase">
              <GraduationCap className="w-4 h-4" />
              <span>Phân Hệ Sinh Viên Đại Học (18–24 Tuổi) • EAP & Career</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Kỹ Năng Học Thuật, Nghiên Cứu & Chuẩn Đầu Ra ĐH
            </h1>
            <p className="text-sm text-violet-100 max-w-3xl leading-relaxed">
              Làm chủ 50 từ vựng Academic Word List theo 5 lĩnh vực, khung thuyết trình Seminar 5 giai đoạn, đọc hiểu Abstract khoa học, viết Email/Essay/CV chuẩn ATS và bứt phá chuẩn đầu ra VSTEP / TOEIC / IELTS.
            </p>
          </div>

          {profile?.university && (
            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[250px] space-y-1.5 text-xs">
              <div className="font-extrabold text-white flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-300" />
                <span>Hồ sơ sinh viên của bạn</span>
              </div>
              <div className="text-violet-100">
                Năm học: <strong className="text-white">Năm {universityYear || 2}</strong>
                {graduationExam && (
                  <>
                    {' '}• Chuẩn mục tiêu:{' '}
                    <strong className="uppercase text-amber-200">{graduationExam}</strong>
                  </>
                )}
              </div>
              {universityGoal && (
                <div className="text-violet-100">
                  Mục tiêu: <strong className="text-white">{GOAL_LABEL_VI[universityGoal]}</strong>
                </div>
              )}
              {majorCategories.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {majorCategories.slice(0, 3).map((cat) => (
                    <span
                      key={cat}
                      className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold text-white"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 4 MAIN TABS */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {mainTabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  stopRecordingSafely();
                  setActiveTab(tab.id);
                }}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 ${
                  active
                    ? 'bg-white text-violet-800 shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================================================================= */}
      {/* TAB 1: AWL ACADEMIC VOCABULARY                                    */}
      {/* ================================================================= */}
      {activeTab === 'awl' && (
        <div className="space-y-5">
          {/* Sub-mode + Filter Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setAwlMode('browse')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition ${
                    awlMode === 'browse'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  📖 Tra cứu & Lưu SRS ({AWL_WORDS.length} từ)
                </button>
                <button
                  type="button"
                  onClick={() => setAwlMode('practice')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition ${
                    awlMode === 'practice'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  ⚡ Flashcard & Mini Quiz AWL
                </button>
              </div>

              <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Đã lưu phiên này:{' '}
                <span className="text-violet-600 dark:text-violet-400 font-extrabold">
                  {savedAwlIds.length}/{AWL_WORDS.length} từ
                </span>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  value={awlQuery}
                  onChange={(e) => setAwlQuery(e.target.value)}
                  placeholder="Tìm từ học thuật, nghĩa tiếng Việt hoặc collocation..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {(['ALL', 'B1', 'B2', 'C1'] as const).map((lv) => (
                  <button
                    key={lv}
                    type="button"
                    onClick={() => setAwlLevelFilter(lv)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold border transition ${
                      awlLevelFilter === lv
                        ? 'bg-violet-600 text-white border-violet-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {lv === 'ALL' ? 'Mọi cấp' : lv}
                  </button>
                ))}
              </div>
            </div>

            {/* 5 Domain Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setAwlDomainFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                  awlDomainFilter === 'ALL'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                }`}
              >
                Tất cả lĩnh vực ({AWL_WORDS.length})
              </button>
              {AWL_DOMAINS.map((dom) => (
                <button
                  key={dom}
                  type="button"
                  onClick={() => setAwlDomainFilter(dom)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                    awlDomainFilter === dom
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>

          {awlMode === 'browse' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Word List */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[640px]">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                    Danh sách từ ({filteredAwlWords.length})
                  </span>
                  <span className="text-[11px] text-slate-400">Chọn từ để xem chi tiết</span>
                </div>
                <div className="overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredAwlWords.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500">
                      Không tìm thấy từ AWL phù hợp với bộ lọc hiện tại.
                    </div>
                  ) : (
                    filteredAwlWords.map((item) => {
                      const isSelected = activeAwlWord.id === item.id;
                      const isSaved = savedAwlIds.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSelectedAwlId(item.id);
                            speakText(item.word, accent, 0.95);
                          }}
                          className={`w-full text-left px-4 py-3 transition flex items-start justify-between gap-3 ${
                            isSelected
                              ? 'bg-violet-50/90 dark:bg-violet-950/40 border-l-4 border-l-violet-600'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                                {item.word}
                              </span>
                              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                                ({item.pos}) {accent === 'en-US' ? item.ipa : item.ipaUK}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-1">
                              {item.meaningVi}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {isSaved && <BookmarkCheck className="w-4 h-4 text-emerald-600" />}
                            <span
                              className={`px-2 py-0.5 rounded-md border text-[10px] font-extrabold ${LEVEL_BADGE_CLASS[item.level]}`}
                            >
                              {item.level}
                            </span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Word Inspector */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-lg border text-xs font-extrabold ${LEVEL_BADGE_CLASS[activeAwlWord.level]}`}
                      >
                        {activeAwlWord.level}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                        {activeAwlWord.domain}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        ({activeAwlWord.pos})
                      </span>
                    </div>

                    {/* Word + Syllable stress breakdown */}
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        {activeAwlWord.word}
                      </h2>
                      <div className="flex items-center gap-1 text-sm font-bold">
                        {activeAwlWord.syllables.map((syl, idx) => (
                          <React.Fragment key={`${syl}-${idx}`}>
                            <span
                              className={`px-2 py-0.5 rounded-md ${
                                idx === activeAwlWord.stressIndex
                                  ? 'bg-violet-600 text-white shadow-sm'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              {syl}
                            </span>
                            {idx < activeAwlWord.syllables.length - 1 && (
                              <span className="text-slate-400">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                      <span className="font-mono font-bold text-violet-700 dark:text-violet-300">
                        {accent === 'en-US' ? `US ${activeAwlWord.ipa}` : `UK ${activeAwlWord.ipaUK}`}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Đọc gợi ý: <strong>{activeAwlWord.vietPhonetic}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Audio & Save SRS Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => speakText(activeAwlWord.word, accent, 0.95)}
                      className="px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-extrabold inline-flex items-center gap-1.5 transition"
                    >
                      <Volume2 className="w-4 h-4" /> Nghe chuẩn
                    </button>
                    <button
                      type="button"
                      onClick={() => speakText(activeAwlWord.word, accent, 0.65)}
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-extrabold inline-flex items-center gap-1.5 transition"
                    >
                      <Turtle className="w-4 h-4" /> 0.65x
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handlePracticeSpeaking(`awl-say-${activeAwlWord.id}`, activeAwlWord.word)
                      }
                      className={`px-3 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 transition border ${
                        isListening && practicingId === `awl-say-${activeAwlWord.id}`
                          ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-violet-400'
                      }`}
                    >
                      {isListening && practicingId === `awl-say-${activeAwlWord.id}` ? (
                        <>
                          <Square className="w-3.5 h-3.5" /> Dừng
                        </>
                      ) : (
                        <>
                          <Mic className="w-3.5 h-3.5 text-violet-600" /> Nói thử
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveAwlWord(activeAwlWord)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 transition ${
                        savedAwlIds.includes(activeAwlWord.id)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
                      }`}
                    >
                      {savedAwlIds.includes(activeAwlWord.id) ? (
                        <>
                          <BookmarkCheck className="w-4 h-4" /> Đã lưu sổ SRS
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="w-4 h-4" /> Lưu vào sổ SRS
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Pronunciation report if practiced on this word */}
                {practicingId === `awl-say-${activeAwlWord.id}` &&
                  (micInterim || speechError || speechResult) && (
                    <div className="space-y-2">
                      {micInterim && isListening && (
                        <div className="text-xs font-semibold text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/40 px-3 py-2 rounded-xl">
                          🎙️ Đang nghe: {micInterim}
                        </div>
                      )}
                      {speechError && (
                        <div className="text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 px-3 py-2 rounded-xl">
                          {speechError}
                        </div>
                      )}
                      {speechResult && (
                        <PronunciationReportCard
                          result={speechResult}
                          accent={accent}
                          userAudioUrl={speechAudioUrl}
                          sampleText={activeAwlWord.word}
                          compact
                        />
                      )}
                    </div>
                  )}

                {/* Meaning & Mnemonic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700">
                    <div className="text-[11px] font-extrabold uppercase text-slate-400">
                      Nghĩa học thuật
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {activeAwlWord.meaningVi}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                      📌 {activeAwlWord.phonicsRule}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800">
                    <div className="text-[11px] font-extrabold uppercase text-amber-700 dark:text-amber-300 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5" /> Mẹo nhớ gốc từ
                    </div>
                    <div className="text-xs font-semibold text-amber-900 dark:text-amber-200 mt-1 leading-relaxed">
                      {activeAwlWord.mnemonic}
                    </div>
                  </div>
                </div>

                {/* Collocations & Word Family */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-extrabold uppercase text-slate-500 mb-2">
                      Cụm từ học thuật hay dùng (Collocations)
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeAwlWord.collocations.map((col) => (
                        <button
                          key={col}
                          type="button"
                          onClick={() => speakText(col, accent, 0.9)}
                          className="px-2.5 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/50 dark:hover:bg-violet-900/60 text-violet-800 dark:text-violet-200 border border-violet-200 dark:border-violet-800 text-xs font-bold inline-flex items-center gap-1 transition"
                          title="Bấm để nghe phát âm cụm từ"
                        >
                          <Volume2 className="w-3 h-3" />
                          {col}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold uppercase text-slate-500 mb-2">
                      Họ từ vựng (Word Family)
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeAwlWord.wordFamily.map((wf) => (
                        <span
                          key={wf}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700"
                        >
                          {wf}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Academic Example */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold uppercase text-indigo-700 dark:text-indigo-300">
                      Ví dụ trong bài viết / nghiên cứu học thuật
                    </span>
                    <button
                      type="button"
                      onClick={() => speakText(activeAwlWord.academicExampleEn, accent, 0.92)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold inline-flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe câu
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                    “{activeAwlWord.academicExampleEn}”
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {activeAwlWord.academicExampleVi}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* AWL PRACTICE: FLASHCARD + MINI QUIZ */
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPracticeKind('flashcard')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition ${
                      practiceKind === 'flashcard'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    🃏 Flashcard Lật Thẻ
                  </button>
                  <button
                    type="button"
                    onClick={() => setPracticeKind('quiz')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition ${
                      practiceKind === 'quiz'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    ✍️ Mini Quiz Điền Từ Học Thuật
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  Bộ thẻ đang ôn: <strong>{practicePool.length} từ</strong>
                </span>
              </div>

              {practiceKind === 'flashcard' ? (
                <div className="max-w-2xl mx-auto space-y-4">
                  <div
                    onClick={() => setFlashFlipped((f) => !f)}
                    className="cursor-pointer rounded-3xl border-2 border-violet-200 dark:border-violet-800 bg-gradient-to-br from-violet-50/80 to-indigo-50/70 dark:from-slate-800 dark:to-slate-900 p-6 sm:p-8 min-h-[260px] flex flex-col justify-between shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold text-violet-700 dark:text-violet-300">
                        Thẻ {(flashIdx % practicePool.length) + 1}/{practicePool.length} •{' '}
                        {currentFlashCard.domain}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md border text-[11px] font-extrabold ${LEVEL_BADGE_CLASS[currentFlashCard.level]}`}
                      >
                        {currentFlashCard.level}
                      </span>
                    </div>

                    {!flashFlipped ? (
                      <div className="text-center py-6 space-y-3">
                        <div className="text-4xl font-black text-slate-900 dark:text-white">
                          {currentFlashCard.word}
                        </div>
                        <div className="text-sm font-mono text-violet-700 dark:text-violet-300">
                          ({currentFlashCard.pos}){' '}
                          {accent === 'en-US' ? currentFlashCard.ipa : currentFlashCard.ipaUK}
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakText(currentFlashCard.word, accent, 0.95);
                          }}
                          className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-extrabold inline-flex items-center gap-1.5"
                        >
                          <Volume2 className="w-4 h-4" /> Nghe phát âm
                        </button>
                        <p className="text-xs text-slate-400 pt-2">
                          (Bấm vào thẻ để lật xem nghĩa, collocations & ví dụ)
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 py-2">
                        <div className="text-xl font-black text-violet-800 dark:text-violet-200">
                          {currentFlashCard.word} — {currentFlashCard.meaningVi}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {currentFlashCard.collocations.map((col) => (
                            <span
                              key={col}
                              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-violet-200 dark:border-violet-700 text-xs font-bold text-slate-700 dark:text-slate-200"
                            >
                              {col}
                            </span>
                          ))}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300">
                          <strong>Word Family:</strong> {currentFlashCard.wordFamily.join(' • ')}
                        </div>
                        <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 text-xs space-y-1">
                          <div className="font-bold text-slate-900 dark:text-white">
                            “{currentFlashCard.academicExampleEn}”
                          </div>
                          <div className="text-slate-500 dark:text-slate-400">
                            {currentFlashCard.academicExampleVi}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="text-center text-[11px] font-bold text-violet-600 dark:text-violet-400 inline-flex items-center justify-center gap-1">
                      <RotateCw className="w-3.5 h-3.5" /> Chạm để lật thẻ
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFlashFlipped(false);
                        setFlashIdx((i) => (i - 1 + practicePool.length) % practicePool.length);
                      }}
                      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-extrabold inline-flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" /> Thẻ trước
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveAwlWord(currentFlashCard)}
                        className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold inline-flex items-center gap-1.5"
                      >
                        <BookmarkPlus className="w-4 h-4" />
                        {savedAwlIds.includes(currentFlashCard.id) ? 'Đã lưu SRS' : 'Lưu vào SRS'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onAddXp(5);
                          setFlashFlipped(false);
                          setFlashIdx((i) => (i + 1) % practicePool.length);
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold inline-flex items-center gap-1"
                      >
                        Đã thuộc (+5 XP) <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Fill-in-the-blank AWL Mini Quiz */
                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>
                      Câu {(quizIdx % practicePool.length) + 1} • Lĩnh vực:{' '}
                      <strong className="text-slate-700 dark:text-slate-200">
                        {currentQuizTarget.domain}
                      </strong>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                      Điểm đúng: {quizCorrectCount}/{quizAnsweredCount}
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="text-xs font-extrabold uppercase text-violet-600 dark:text-violet-400">
                      Chọn từ học thuật đúng để hoàn chỉnh câu sau ({currentQuizTarget.pos} •{' '}
                      {currentQuizTarget.level}):
                    </div>
                    <p className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                      {maskTargetWordInSentence(
                        currentQuizTarget.academicExampleEn,
                        currentQuizTarget.word
                      )}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Gợi ý nghĩa: {currentQuizTarget.academicExampleVi}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentQuizOptions.map((opt) => {
                      const isChosen = quizSelected === opt.word;
                      const isCorrect = opt.word === currentQuizTarget.word;
                      let btnClass =
                        'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-violet-400';
                      if (quizSelected) {
                        if (isCorrect) {
                          btnClass =
                            'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-200';
                        } else if (isChosen) {
                          btnClass =
                            'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-200';
                        } else {
                          btnClass =
                            'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60';
                        }
                      }
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={Boolean(quizSelected)}
                          onClick={() => handleQuizAnswer(opt.word)}
                          className={`p-3.5 rounded-xl border-2 text-left transition ${btnClass}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-sm">{opt.word}</span>
                            <span className="text-[11px] font-mono text-slate-500">
                              ({opt.pos})
                            </span>
                          </div>
                          {quizSelected && (
                            <div className="text-xs mt-1 opacity-85">{opt.meaningVi}</div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSelected && (
                    <div className="p-4 rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="space-y-1 text-xs">
                        <div className="font-extrabold text-slate-900 dark:text-white">
                          {quizSelected === currentQuizTarget.word
                            ? '✅ Chính xác! (+15 XP)'
                            : `❌ Đáp án đúng là "${currentQuizTarget.word}"`}
                        </div>
                        <div className="text-slate-600 dark:text-slate-300">
                          Collocations: {currentQuizTarget.collocations.join(' • ')}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            speakText(currentQuizTarget.academicExampleEn, accent, 0.92)
                          }
                          className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Nghe câu
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setQuizSelected(null);
                            setQuizIdx((i) => (i + 1) % practicePool.length);
                          }}
                          className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-extrabold inline-flex items-center gap-1"
                        >
                          Câu tiếp theo <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {AWL_DRILLS.length > 0 && (
            <ExerciseRunner
              exercises={AWL_DRILLS}
              accent={accent}
              title={`Luyện Tập Collocation & Word-Form AWL (${AWL_DRILLS.length} bài tập)`}
              subtitle="Chọn collocation chuẩn học thuật, chia dạng từ (word-form) và nối thuật ngữ."
              onComplete={(correct, total) => {
                if (correct >= Math.ceil(total * 0.6)) onAddXp(40);
              }}
            />
          )}
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 2: PRESENTATION, SEMINAR & ACADEMIC ABSTRACTS                 */}
      {/* ================================================================= */}
      {activeTab === 'presentation' && (
        <div className="space-y-5">
          {/* Sub-navigation */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex flex-wrap gap-2">
            {[
              { id: 'presentation' as const, label: '🎤 Khung Thuyết Trình 5 Giai Đoạn' },
              { id: 'seminar' as const, label: '💬 Thảo Luận & Phản Biện Seminar' },
              { id: 'reading' as const, label: `📑 Đọc Hiểu Abstract (${ACADEMIC_ABSTRACTS.length} bài)` },
            ].map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => {
                  stopRecordingSafely();
                  setPresSubMode(sub.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                  presSubMode === sub.id
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* 2A. PRESENTATION 5 STAGES */}
          {presSubMode === 'presentation' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PRESENTATION_STAGES.map((st, idx) => {
                  const active = st.id === activeStage;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        stopRecordingSafely();
                        setActiveStage(st.id);
                      }}
                      className={`p-3 rounded-2xl border text-left transition ${
                        active
                          ? 'border-violet-600 bg-violet-50 dark:bg-violet-950/40 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-300'
                      }`}
                    >
                      <div className="text-[10px] font-extrabold uppercase text-violet-600 dark:text-violet-400">
                        Giai đoạn {idx + 1}
                      </div>
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">
                        {st.id}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{st.durationHint}</div>
                    </button>
                  );
                })}
              </div>

              <div className="bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4">
                <div className="text-sm font-black text-indigo-900 dark:text-indigo-200">
                  {stageMeta.titleVi}
                </div>
                <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">
                  🎯 Mục tiêu: {stageMeta.goalVi}
                </p>
              </div>

              <div className="space-y-3">
                {stagePhrases.map((phrase) => {
                  const isPracticingThis = practicingId === phrase.id;
                  return (
                    <div
                      key={phrase.id}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-md border text-[10px] font-extrabold ${LEVEL_BADGE_CLASS[phrase.level]}`}
                            >
                              {phrase.level}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400">
                              {phrase.stage}
                            </span>
                          </div>
                          <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-relaxed">
                            “{phrase.en}”
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-300">{phrase.vi}</p>
                          <p className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold">
                            💡 {phrase.usageTip}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => speakText(phrase.en, accent, 0.95)}
                            className="px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-extrabold inline-flex items-center gap-1"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> Nghe mẫu
                          </button>
                          <button
                            type="button"
                            onClick={() => speakText(phrase.en, accent, 0.72)}
                            className="px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold inline-flex items-center gap-1"
                          >
                            <Turtle className="w-3.5 h-3.5" /> Chậm
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePracticeSpeaking(phrase.id, phrase.en)}
                            className={`px-3 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 border transition ${
                              isListening && isPracticingThis
                                ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                                : 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                            }`}
                          >
                            {isListening && isPracticingThis ? (
                              <>
                                <Square className="w-3.5 h-3.5" /> Dừng & Chấm
                              </>
                            ) : (
                              <>
                                <Mic className="w-3.5 h-3.5" /> Luyện đọc to
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {isPracticingThis && (micInterim || speechError || speechResult) && (
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                          {micInterim && isListening && (
                            <div className="text-xs font-semibold text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/40 px-3 py-2 rounded-xl">
                              🎙️ Đang nhận giọng: {micInterim}
                            </div>
                          )}
                          {speechError && (
                            <div className="text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 px-3 py-2 rounded-xl">
                              {speechError}
                            </div>
                          )}
                          {speechResult && (
                            <PronunciationReportCard
                              result={speechResult}
                              accent={accent}
                              userAudioUrl={speechAudioUrl}
                              sampleText={phrase.en}
                              compact
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2B. SEMINAR DISCUSSION PHRASES */}
          {presSubMode === 'seminar' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
                  <MessageSquareQuote className="w-4 h-4 text-violet-600" />
                  <span>Mẫu Câu Thảo Luận & Phản Biện Lịch Sự Trong Seminar</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSeminarCategory('ALL')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                      seminarCategory === 'ALL'
                        ? 'bg-violet-600 text-white border-violet-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Tất cả ({SEMINAR_PHRASES.length})
                  </button>
                  {seminarCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSeminarCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                        seminarCategory === cat
                          ? 'bg-violet-600 text-white border-violet-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSeminarPhrases.map((item) => {
                  const isPracticingThis = practicingId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-lg bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 text-[11px] font-extrabold">
                          {item.category}
                        </span>
                        <p className="text-sm font-extrabold text-slate-900 dark:text-white leading-relaxed">
                          “{item.en}”
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">{item.vi}</p>
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">
                          🎯 {item.toneTip}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => speakText(item.en, accent, 0.95)}
                            className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold inline-flex items-center gap-1"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> Nghe mẫu
                          </button>
                          <button
                            type="button"
                            onClick={() => speakText(item.en, accent, 0.72)}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold inline-flex items-center gap-1"
                          >
                            <Turtle className="w-3.5 h-3.5" /> 0.72x
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePracticeSpeaking(item.id, item.en)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1 border ${
                              isListening && isPracticingThis
                                ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                            }`}
                          >
                            {isListening && isPracticingThis ? (
                              <>
                                <Square className="w-3.5 h-3.5" /> Dừng
                              </>
                            ) : (
                              <>
                                <Mic className="w-3.5 h-3.5" /> Tập nói
                              </>
                            )}
                          </button>
                        </div>

                        {isPracticingThis && (micInterim || speechError || speechResult) && (
                          <div className="space-y-2">
                            {micInterim && isListening && (
                              <div className="text-xs font-semibold text-violet-700 dark:text-violet-300">
                                🎙️ {micInterim}
                              </div>
                            )}
                            {speechError && (
                              <div className="text-xs font-semibold text-rose-600">{speechError}</div>
                            )}
                            {speechResult && (
                              <PronunciationReportCard
                                result={speechResult}
                                accent={accent}
                                userAudioUrl={speechAudioUrl}
                                sampleText={item.en}
                                compact
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2C. ACADEMIC ABSTRACTS READING */}
          {presSubMode === 'reading' && (
            <div className="space-y-5">
              {/* Abstract Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {ACADEMIC_ABSTRACTS.map((abs, idx) => {
                  const active = idx === selectedAbstractIdx;
                  const done = rewardedAbstractIds.includes(abs.id);
                  return (
                    <button
                      key={abs.id}
                      type="button"
                      onClick={() => {
                        window.speechSynthesis?.cancel();
                        setSelectedAbstractIdx(idx);
                        setShowAbstractTrans(false);
                      }}
                      className={`p-3 rounded-2xl border text-left transition ${
                        active
                          ? 'border-violet-600 bg-violet-50 dark:bg-violet-950/40 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${LEVEL_BADGE_CLASS[abs.level]}`}
                        >
                          {abs.level}
                        </span>
                        {done && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-2">
                        {abs.title}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">{abs.domain}</div>
                    </button>
                  );
                })}
              </div>

              {/* Abstract Passage + Comprehension Questions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase text-violet-600 dark:text-violet-400">
                        {currentAbstract.publicationContext}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                        {currentAbstract.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => speakText(currentAbstract.abstractEn, accent, 0.92)}
                        className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold inline-flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Nghe Abstract
                      </button>
                      <button
                        type="button"
                        onClick={() => window.speechSynthesis?.cancel()}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold"
                      >
                        Dừng đọc
                      </button>
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-slate-800 dark:text-slate-100 font-medium">
                    {renderHighlightedAbstract(currentAbstract.abstractEn, currentAbstract.keyTerms)}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-500">Từ khóa học thuật:</span>
                    {currentAbstract.keyTerms.map((term) => (
                      <span
                        key={term}
                        className="px-2 py-0.5 rounded-md bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 text-[11px] font-bold border border-violet-200 dark:border-violet-800"
                      >
                        {term}
                      </span>
                    ))}
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => setShowAbstractTrans((v) => !v)}
                      className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {showAbstractTrans ? '▲ Ẩn bản dịch tiếng Việt' : '▼ Xem bản dịch tiếng Việt đối chiếu'}
                    </button>
                    {showAbstractTrans && (
                      <div className="mt-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs leading-relaxed text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {currentAbstract.translationVi}
                      </div>
                    )}
                  </div>
                </div>

                {/* Questions Column */}
                <div className="lg:col-span-5 space-y-3">
                  {currentAbstract.questions.map((q, qIdx) => {
                    const chosen = abstractAnswers[q.id];
                    const isAnswered = chosen !== undefined;
                    return (
                      <div
                        key={q.id}
                        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-extrabold text-violet-600 dark:text-violet-400">
                            Câu {qIdx + 1} • {q.focusSkill}
                          </span>
                          {isAnswered &&
                            (chosen === q.correctIndex ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-600" />
                            ))}
                        </div>
                        <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                          {q.questionEn}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {q.questionVi}
                        </p>

                        <div className="space-y-1.5 pt-1">
                          {q.options.map((opt, optIdx) => {
                            let cls =
                              'border-slate-200 dark:border-slate-700 hover:border-violet-400 bg-slate-50/70 dark:bg-slate-800/60';
                            if (isAnswered) {
                              if (optIdx === q.correctIndex) {
                                cls =
                                  'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold';
                              } else if (optIdx === chosen) {
                                cls =
                                  'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200';
                              } else {
                                cls = 'border-slate-200 dark:border-slate-800 opacity-60';
                              }
                            }
                            return (
                              <button
                                key={optIdx}
                                type="button"
                                disabled={isAnswered}
                                onClick={() => handleSelectAbstractOption(q.id, optIdx)}
                                className={`w-full text-left px-3 py-2 rounded-xl border text-xs transition ${cls}`}
                              >
                                <span className="font-extrabold mr-1.5">
                                  {String.fromCharCode(65 + optIdx)}.
                                </span>
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {isAnswered && (
                          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-[11px] text-indigo-900 dark:text-indigo-200 leading-relaxed">
                            💡 {q.explanationVi}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 3: ACADEMIC WRITING, EMAIL & AI/OFFLINE GRADING               */}
      {/* ================================================================= */}
      {activeTab === 'writing' && (
        <div className="space-y-5">
          {/* Prompt Type Filter & Prompt Selector */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-600" />
                <span>Chọn Đề Luyện Viết Thực Tế ({ACADEMIC_WRITING_PROMPTS.length} đề)</span>
              </h3>
              <span className="text-xs text-slate-500">
                Hỗ trợ chấm điểm Offline tức thì & Gemini AI chi tiết
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setWritingTypeFilter('ALL')}
                className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                  writingTypeFilter === 'ALL'
                    ? 'bg-violet-600 text-white border-violet-600'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Tất cả ({ACADEMIC_WRITING_PROMPTS.length})
              </button>
              {writingTypes.map((wt) => (
                <button
                  key={wt}
                  type="button"
                  onClick={() => setWritingTypeFilter(wt)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                    writingTypeFilter === wt
                      ? 'bg-violet-600 text-white border-violet-600'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {wt}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
              {filteredWritingPrompts.map((pr) => {
                const active = pr.id === activeWritingPrompt.id;
                return (
                  <button
                    key={pr.id}
                    type="button"
                    onClick={() => handleSelectPrompt(pr.id)}
                    className={`p-3 rounded-xl border text-left transition ${
                      active
                        ? 'border-violet-600 bg-violet-50/90 dark:bg-violet-950/40 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-violet-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase text-violet-700 dark:text-violet-300">
                        {pr.type}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded border text-[10px] font-extrabold ${LEVEL_BADGE_CLASS[pr.level]}`}
                      >
                        {pr.level}
                      </span>
                    </div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-2">
                      {pr.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Mục tiêu ~{pr.recommendedWords} từ
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt Details + Editor */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Prompt, Keywords, Outline, Sample */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-200 text-xs font-extrabold">
                    {activeWritingPrompt.type}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg border text-xs font-extrabold ${LEVEL_BADGE_CLASS[activeWritingPrompt.level]}`}
                  >
                    {activeWritingPrompt.level} • ~{activeWritingPrompt.recommendedWords} từ
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {activeWritingPrompt.title}
                </h3>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 space-y-2 text-xs">
                  <p className="font-semibold text-slate-700 dark:text-slate-200 leading-relaxed">
                    🇻🇳 {activeWritingPrompt.promptVi}
                  </p>
                  <p className="font-bold text-indigo-900 dark:text-indigo-200 leading-relaxed border-t border-slate-200 dark:border-slate-700 pt-2">
                    🇬🇧 {activeWritingPrompt.promptEn}
                  </p>
                </div>

                {/* Keywords live tracker */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-extrabold text-slate-600 dark:text-slate-300">
                    <span>
                      Từ khóa mục tiêu ({draftStats.matchedKws.length}/
                      {activeWritingPrompt.keywordsEn.length})
                    </span>
                    <span className="text-[11px] font-normal text-slate-400">
                      Bấm để chèn nhanh
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeWritingPrompt.keywordsEn.map((kw) => {
                      const used = draftStats.matchedKws.includes(kw);
                      return (
                        <button
                          key={kw}
                          type="button"
                          onClick={() => handleInsertKeyword(kw)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition inline-flex items-center gap-1 ${
                            used
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-violet-400'
                          }`}
                        >
                          {used && <CheckCircle2 className="w-3 h-3" />}
                          {kw}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Outline & Sample Toggles */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowOutline((v) => !v)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition ${
                      showOutline
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 inline mr-1" />
                    {showOutline ? 'Ẩn dàn ý & tiêu chí' : 'Xem dàn ý & tiêu chí'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSample((v) => !v)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition ${
                      showSample
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                    {showSample ? 'Ẩn bài mẫu Band cao' : 'Xem bài mẫu Band cao'}
                  </button>
                </div>

                {showOutline && (
                  <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-3 text-xs">
                    <div>
                      <div className="font-extrabold text-indigo-900 dark:text-indigo-200 mb-1.5">
                        📋 Dàn ý gợi ý:
                      </div>
                      <ul className="space-y-1 text-indigo-800 dark:text-indigo-300 list-disc pl-4">
                        {activeWritingPrompt.structureOutline.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-indigo-200/70 dark:border-indigo-800 pt-2">
                      <div className="font-extrabold text-indigo-900 dark:text-indigo-200 mb-1">
                        ✅ Tiêu chí tự kiểm tra:
                      </div>
                      <ul className="space-y-1 text-indigo-800 dark:text-indigo-300 list-disc pl-4">
                        {activeWritingPrompt.gradingChecklistVi.map((chk, i) => (
                          <li key={i}>{chk}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {showSample && (
                  <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold text-amber-900 dark:text-amber-200">
                        🏆 Bài mẫu tham khảo ({activeWritingPrompt.level}+)
                      </span>
                      <button
                        type="button"
                        onClick={() => speakText(activeWritingPrompt.sampleBandHigh, accent, 0.92)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold inline-flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Nghe bài mẫu
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-800 dark:text-slate-200">
                      {activeWritingPrompt.sampleBandHigh}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Writing Editor & Results */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Soạn bài viết tiếng Anh của bạn
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span
                      className={`px-2.5 py-1 rounded-lg ${
                        draftStats.wordCount >= activeWritingPrompt.recommendedWords * 0.8
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      Số từ: {draftStats.wordCount} / ~{activeWritingPrompt.recommendedWords}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setDraftText('');
                        setOfflineEval(null);
                        setAiFeedback(null);
                        setAiError(null);
                      }}
                      className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 inline-flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Xóa nháp
                    </button>
                  </div>
                </div>

                <textarea
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  rows={12}
                  placeholder={`Viết bài ${activeWritingPrompt.type} bằng tiếng Anh tại đây...\nMẹo: Bấm vào các từ khóa mục tiêu bên trái để chèn nhanh hoặc bật Dàn ý gợi ý để bám sát cấu trúc.`}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 text-sm leading-relaxed text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    disabled={!draftText.trim()}
                    onClick={handleGradeOffline}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs sm:text-sm font-extrabold inline-flex items-center gap-2 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Chấm điểm Offline (Cấu trúc & Từ khóa)
                  </button>

                  <button
                    type="button"
                    disabled={!draftText.trim() || aiGrading}
                    onClick={handleGradeWithAi}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-40 text-white text-xs sm:text-sm font-extrabold inline-flex items-center gap-2 transition shadow-sm"
                  >
                    {aiGrading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> AI đang chấm bài...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" /> Chấm AI chi tiết (Gemini)
                      </>
                    )}
                  </button>
                </div>

                {aiError && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-semibold text-amber-800 dark:text-amber-200">
                    ⚠️ {aiError}
                  </div>
                )}
              </div>

              {/* Offline Evaluation Report */}
              {offlineEval && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white text-base font-black">
                        {offlineEval.score}/100 điểm
                      </span>
                      <span className="text-xs font-extrabold text-indigo-700 dark:text-indigo-300">
                        Ước lượng: {offlineEval.bandHint}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {offlineEval.wordCount} từ • {offlineEval.sentenceCount} câu •{' '}
                      {offlineEval.paragraphCount} đoạn
                    </span>
                  </div>

                  {offlineEval.strengths.length > 0 && (
                    <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
                      <div className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300">
                        ✅ Điểm đạt được:
                      </div>
                      <ul className="text-xs text-emerald-700 dark:text-emerald-200 list-disc pl-4 space-y-0.5">
                        {offlineEval.strengths.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {offlineEval.suggestions.length > 0 && (
                    <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
                      <div className="text-xs font-extrabold text-amber-800 dark:text-amber-300">
                        💡 Gợi ý cải thiện:
                      </div>
                      <ul className="text-xs text-amber-800 dark:text-amber-200 list-disc pl-4 space-y-0.5">
                        {offlineEval.suggestions.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Gemini AI Detailed Review */}
              {aiFeedback && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-violet-300 dark:border-violet-800 p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-black text-violet-700 dark:text-violet-300">
                    <Sparkles className="w-4 h-4" />
                    <span>Nhận Xét & Chấm Điểm Chi Tiết Từ Gemini AI</span>
                  </div>
                  <div className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                    {aiFeedback}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 4: CAREER (ATS CV / COVER LETTER) & GRADUATION STANDARDS      */}
      {/* ================================================================= */}
      {activeTab === 'career' && (
        <div className="space-y-6">
          {/* SECTION A: ATS CV GUIDE + ACTION VERBS */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-violet-600" />
                  <span>Cẩm Nang Viết CV Tiếng Anh Chuẩn ATS Cho Sinh Viên Thực Tập</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Hơn 75% doanh nghiệp lớn dùng phần mềm ATS (Applicant Tracking System) lọc CV trước khi nhân sự đọc trực tiếp.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('writing');
                    setWritingTypeFilter('ALL');
                    handleSelectPrompt('aw-cv-summary');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-extrabold transition"
                >
                  ✍️ Thực hành viết CV Summary
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('writing');
                    setWritingTypeFilter('ALL');
                    handleSelectPrompt('aw-cover-letter');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-extrabold transition"
                >
                  📄 Viết Cover Letter thực tập
                </button>
              </div>
            </div>

            {/* 3 ATS Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {ATS_CV_GUIDES.map((guide) => (
                <div
                  key={guide.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {guide.sectionTitle}
                    </h3>
                    <div className="space-y-1">
                      <div className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400">
                        ✅ Nên làm:
                      </div>
                      <ul className="text-xs text-slate-700 dark:text-slate-300 list-disc pl-4 space-y-1">
                        {guide.doList.map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[11px] font-extrabold text-rose-700 dark:text-rose-400">
                        ⚠️ Cần tránh:
                      </div>
                      <ul className="text-xs text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-1">
                        {guide.avoidList.map((a, idx) => (
                          <li key={idx}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                    {guide.sampleLineEn}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Verbs + XYZ Bullets */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Kho Động Từ Hành Động (Strong Action Verbs) & Mẫu Công Thức XYZ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CV_ACTION_VERB_GROUPS.map((grp) => (
                  <div
                    key={grp.category}
                    className="rounded-2xl border border-violet-200/80 dark:border-violet-800/80 bg-violet-50/40 dark:bg-violet-950/20 p-4 space-y-2.5"
                  >
                    <div className="text-xs font-black text-violet-800 dark:text-violet-300">
                      {grp.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {grp.verbs.map((v) => (
                        <span
                          key={v}
                          className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-violet-200 dark:border-violet-700 text-[11px] font-extrabold text-slate-800 dark:text-slate-100"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                    <div className="pt-1 space-y-1 text-xs">
                      <p className="font-bold text-slate-900 dark:text-white">
                        • {grp.exampleBulletEn}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {grp.exampleBulletVi}
                      </p>
                      <button
                        type="button"
                        onClick={() => speakText(grp.exampleBulletEn, accent, 0.92)}
                        className="text-[11px] font-bold text-violet-600 dark:text-violet-400 inline-flex items-center gap-1 hover:underline"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Nghe phát âm câu mẫu
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive ATS Self-Checklist */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                  Checklist Tự Rà Soát CV Trước Khi Nộp Hồ Sơ
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold">
                  Độ sẵn sàng ATS:{' '}
                  {Math.round((atsCheckedIds.length / ATS_SELF_CHECKLIST.length) * 100)}%
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {ATS_SELF_CHECKLIST.map((item) => {
                  const checked = atsCheckedIds.includes(item.id);
                  return (
                    <label
                      key={item.id}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer text-xs transition ${
                        checked
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          setAtsCheckedIds((prev) =>
                            prev.includes(item.id)
                              ? prev.filter((id) => id !== item.id)
                              : [...prev, item.id]
                          )
                        }
                        className="mt-0.5 rounded text-emerald-600"
                      />
                      <span>{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION B: UNIVERSITY GRADUATION STANDARDS CONVERSION & ROADMAP */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-5">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Góc Chuẩn Đầu Ra Đại Học Việt Nam (VSTEP / TOEIC / IELTS)</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Bảng quy đổi tham chiếu theo Khung 6 bậc VN & CEFR. Lưu ý luôn đối chiếu thông báo mới nhất của phòng Đào tạo trường bạn.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GRADUATION_STANDARDS.map((std) => {
                const isUserExam =
                  graduationExam && std.id.includes(graduationExam.toLowerCase());
                return (
                  <div
                    key={std.id}
                    className={`rounded-2xl border p-4 space-y-2.5 ${
                      isUserExam
                        ? 'border-violet-500 bg-violet-50/50 dark:bg-violet-950/30 ring-1 ring-violet-400'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-black text-slate-900 dark:text-white">
                        {std.examName}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        {isUserExam && (
                          <span className="px-2 py-0.5 rounded-md bg-violet-600 text-white text-[10px] font-extrabold">
                            Mục tiêu của bạn
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-200 text-[11px] font-extrabold">
                          {std.cefrTarget}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] text-slate-400 font-bold">Chuẩn phổ biến</div>
                        <div className="font-extrabold text-slate-800 dark:text-slate-100">
                          {std.commonThreshold}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] text-slate-400 font-bold">CLC / Tiên tiến</div>
                        <div className="font-extrabold text-violet-700 dark:text-violet-300">
                          {std.advancedThreshold}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>Ứng dụng:</strong> {std.universityUseCaseVi}
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                      💡 <strong>Chiến thuật:</strong> {std.studyTipVi} ({std.validity})
                    </p>
                  </div>
                );
              })}
            </div>

            {/* 4-Year University Roadmap */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>Lộ Trình Gợi Ý Theo Năm Học (Năm 1 → Năm 4)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {UNIVERSITY_YEAR_ROADMAP.map((yr) => {
                  const isCurrentYear = universityYear === yr.year;
                  return (
                    <div
                      key={yr.year}
                      className={`rounded-2xl border p-4 space-y-2 ${
                        isCurrentYear
                          ? 'border-violet-600 bg-violet-50/70 dark:bg-violet-950/30 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-violet-700 dark:text-violet-300">
                          {yr.focusTitle}
                        </span>
                        {isCurrentYear && (
                          <span className="px-2 py-0.5 rounded-full bg-violet-600 text-white text-[10px] font-extrabold shrink-0">
                            Hiện tại
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-lg">
                        🎯 {yr.recommendedScoreTarget}
                      </div>
                      <ul className="text-xs text-slate-600 dark:text-slate-300 list-disc pl-4 space-y-1">
                        {yr.milestones.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION C: QUICK GRADUATION & CAREER QUIZ */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-violet-600" />
                  <span>Kiểm Tra Nhanh Kiến Thức Chuẩn Đầu Ra & Hồ Sơ Thực Tập</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Trả lời đúng mỗi câu nhận ngay +15 XP và hiểu rõ bẫy thường gặp khi xét tốt nghiệp / nộp CV.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-200 text-xs font-extrabold">
                  Đã làm: {Object.keys(gradQuizAnswers).length}/{GRADUATION_QUICK_QUIZ.length}
                </span>
                {Object.keys(gradQuizAnswers).length > 0 && (
                  <button
                    type="button"
                    onClick={() => setGradQuizAnswers({})}
                    className="px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Làm lại
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GRADUATION_QUICK_QUIZ.map((q, idx) => {
                const chosen = gradQuizAnswers[q.id];
                const isAnswered = chosen !== undefined;
                return (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2.5 bg-slate-50/40 dark:bg-slate-800/30"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-extrabold">
                        Câu {idx + 1} • {q.category}
                      </span>
                      {isAnswered &&
                        (chosen === q.correctIndex ? (
                          <span className="text-xs font-extrabold text-emerald-600">✓ Đúng</span>
                        ) : (
                          <span className="text-xs font-extrabold text-rose-600">✕ Chưa đúng</span>
                        ))}
                    </div>

                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                      {q.question}
                    </p>

                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        let optClass =
                          'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-violet-400';
                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            optClass =
                              'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                          } else if (optIdx === chosen) {
                            optClass =
                              'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200';
                          } else {
                            optClass =
                              'bg-white/60 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60';
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            disabled={isAnswered}
                            onClick={() => handleGradQuizAnswer(q.id, optIdx, q.correctIndex)}
                            className={`w-full text-left px-3 py-2 rounded-xl border text-xs transition ${optClass}`}
                          >
                            <span className="font-extrabold mr-1.5">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-[11px] text-violet-900 dark:text-violet-200 leading-relaxed">
                        💡 {q.explanationVi}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
