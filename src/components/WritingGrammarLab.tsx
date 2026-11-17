import React, { useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  PenTool,
  BookOpen,
  Puzzle,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  Sparkles,
  RotateCw,
  Send,
  Award,
  ChevronRight,
  Lock,
} from 'lucide-react';
import { CORE_VOCABULARY } from '../data/coreVocabulary';
import { COMPREHENSIVE_GRAMMAR_EXAM, GRAMMAR_LESSONS } from '../data/grammarData';
import { EXAMPLE_BREAKDOWNS } from '../data/grammarExamplesMeta';
import { AccentMode, CefrLevel } from '../types/learning';
import { callGeminiText } from '../utils/geminiClient';
import { speakText } from '../utils/speechEngine';

interface WritingGrammarLabProps {
  accent: AccentMode;
  geminiApiKey?: string;
  onAddXp: (amount: number) => void;
  isStep3Unlocked?: boolean;
  onUnlockStep3?: () => void;
  devUnlockAll?: boolean;
  savedCompletedGrammarIds?: string[];
  onCompleteGrammarId?: (id: string) => void;
}

interface SentenceExercise {
  id: string;
  level: CefrLevel;
  vi: string;
  en: string;
  hint: string;
}

const SENTENCE_EXERCISES: SentenceExercise[] = [
  {
    id: 'se-1',
    level: 'A1',
    vi: 'Tôi uống cà phê ở nhà mỗi sáng.',
    en: 'I drink coffee at home every morning',
    hint: 'Trật tự: Chủ ngữ + Động từ + Tân ngữ + Nơi chốn + Thời gian.',
  },
  {
    id: 'se-2',
    level: 'A1',
    vi: 'Tên của tôi là Hiếu và tôi rất vui được gặp bạn.',
    en: 'My name is Hieu and I am happy to meet you',
    hint: 'Nhớ dùng động từ "to be" (is / am) trước tên và tính từ "happy".',
  },
  {
    id: 'se-3',
    level: 'A2',
    vi: 'Bạn có thể chỉ cho tôi đường đến sân bay được không?',
    en: 'Could you show me the way to the airport',
    hint: 'Câu nhờ vả lịch sự bắt đầu bằng "Could you + V...".',
  },
  {
    id: 'se-4',
    level: 'B1',
    vi: 'Mặc dù bài học khá khó, tôi vẫn luyện tập mỗi ngày.',
    en: 'Although the lesson is difficult I practice every day',
    hint: 'Không dùng thêm "but" khi đã có "Although" ở đầu câu!',
  },
  {
    id: 'se-5',
    level: 'B2',
    vi: 'Theo góc nhìn của tôi, giao tiếp tốt mở ra nhiều cơ hội.',
    en: 'From my perspective good communication opens many opportunities',
    hint: 'Cụm mở đầu quan điểm: "From my perspective...".',
  },
  {
    id: 'se-6',
    level: 'A1',
    vi: 'Ngày hôm qua tôi đã học từ mới cùng bạn bè.',
    en: 'Yesterday I learned new words with my friends',
    hint: 'Quá khứ đơn với "Yesterday" + động từ chia quá khứ "learned".',
  },
  {
    id: 'se-7',
    level: 'A2',
    vi: 'Cô ấy đã hoàn thành dự án rất cẩn thận.',
    en: 'She has finished the project very carefully',
    hint: 'Hiện tại hoàn thành: "has + V3 (finished)" + trạng từ "carefully" đứng cuối.',
  },
  {
    id: 'se-8',
    level: 'A2',
    vi: 'Chúng tôi sẽ tổ chức một cuộc họp quan trọng vào ngày mai.',
    en: 'We will organize an important meeting tomorrow',
    hint: 'Tương lai đơn: "will + V nguyên mẫu" + cụm danh từ "an important meeting".',
  },
  {
    id: 'se-9',
    level: 'B1',
    vi: 'Bạn có thường xuyên luyện nói tiếng Anh vào buổi sáng không?',
    en: 'Do you often practice speaking English in the morning',
    hint: 'Câu hỏi Hiện tại đơn: "Do + S + trạng từ tần suất (often) + V nguyên mẫu".',
  },
  {
    id: 'se-10',
    level: 'B2',
    vi: 'Mặc dù trời mưa to, họ vẫn đến văn phòng đúng giờ.',
    en: 'Although it rained heavily they still arrived at the office on time',
    hint: '"Although + S + V" không đi kèm với "but".',
  },
];

interface WritingPrompt {
  id: string;
  level: CefrLevel;
  title: string;
  task: string;
  template: string;
  usefulPhrases: string[];
}

const WRITING_PROMPTS: WritingPrompt[] = [
  {
    id: 'wp-diary',
    level: 'A1',
    title: '📔 Viết Nhật Ký Hàng Ngày (3–5 câu về hôm nay)',
    task: 'Viết 3–5 câu đơn giản kể lại hôm nay bạn làm gì, cảm thấy thế nào và kế hoạch ngày mai.',
    template:
      'Today is a good day. In the morning, I drank coffee and studied English for thirty minutes. At work, I finished my tasks on schedule. In the evening, I feel happy and relaxed.',
    usefulPhrases: ['Today is...', 'In the morning, I...', 'I feel...', 'Tomorrow I will...'],
  },
  {
    id: 'wp-intro',
    level: 'A1',
    title: 'Viết đoạn tự giới thiệu bản thân (3–5 câu)',
    task: 'Hãy viết 3–5 câu giới thiệu tên, công việc/sở thích và lý do bạn học tiếng Anh.',
    template:
      'Hello! My name is [Tên]. I am from Vietnam and I work as a [Nghề nghiệp]. In my free time, I like [Sở thích]. I am learning English because [Lý do].',
    usefulPhrases: ['My name is...', 'I work as a...', 'In my free time...', 'I want to improve...'],
  },
  {
    id: 'wp-dialogue',
    level: 'A2',
    title: 'Viết đoạn hội thoại A-B tại Quán Cà Phê / Cửa Hàng',
    task: 'Hãy tự viết một đoạn hội thoại ngắn 4 lượt giữa Nhân viên (A) và Bạn (B) khi gọi đồ uống hoặc hỏi giá.',
    template:
      'A: Good morning! How can I help you today?\nB: Hi! Can I have a cup of iced coffee, please?\nA: Sure! Anything else?\nB: No, thank you. How much is it?',
    usefulPhrases: ['How can I help you?', 'Can I have... please?', 'How much is it?', 'Thank you very much!'],
  },
  {
    id: 'wp-email',
    level: 'B1',
    title: 'Viết Email / Tin nhắn công việc ngắn',
    task: 'Viết một tin nhắn/email ngắn gửi đồng nghiệp để hẹn lịch họp hoặc báo cáo tiến độ dự án.',
    template:
      'Hi [Tên],\nI hope you are doing well. I am writing to share an update about our project. We have finished the first stage on schedule. Could we have a short meeting tomorrow morning to discuss the next steps?\nBest regards,',
    usefulPhrases: ['I am writing to...', 'on schedule', 'Could we have a meeting...', 'Best regards,'],
  },
];

function highlightKeyTerms(text: string, focusTerms: string[] = []): React.ReactNode {
  if (!focusTerms || focusTerms.length === 0) return text;
  const escaped = [...focusTerms]
    .sort((a, b) => b.length - a.length)
    .map((t) => {
      const esc = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const prefix = /^[\p{L}\p{N}]/u.test(t) ? '(?<![\\p{L}\\p{N}])' : '';
      const suffix = /[\p{L}\p{N}]$/u.test(t) ? '(?![\\p{L}\\p{N}])' : '';
      return `${prefix}${esc}${suffix}`;
    });
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gu');
  const parts = text.split(pattern);
  const termSet = new Set(focusTerms);

  return parts.map((part, idx) => {
    if (!part) return null;
    if (termSet.has(part)) {
      return (
        <strong
          key={idx}
          className="font-extrabold text-indigo-700 dark:text-indigo-300 bg-indigo-100/80 dark:bg-indigo-900/50 px-1 py-0.5 rounded mx-0.5"
        >
          {part}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function analyzeWritingOffline(text: string): { issues: string[]; wordCount: number; score: number } {
  const trimmed = text.trim();
  if (!trimmed) return { issues: ['Bạn chưa nhập nội dung nào.'], wordCount: 0, score: 0 };

  const words = trimmed.split(/\s+/).filter(Boolean);
  const issues: string[] = [];
  let deductions = 0;

  if (/^[a-z]/.test(trimmed)) {
    issues.push('⚠️ Chữ cái đầu tiên của đoạn văn nên viết hoa.');
    deductions += 8;
  }
  if (!/[.!?]$/.test(trimmed)) {
    issues.push('⚠️ Cuối đoạn văn nên có dấu chấm (.), dấu chấm hỏi (?) hoặc dấu chấm than (!).');
    deductions += 8;
  }
  if (/\bI\s+is\b/i.test(trimmed) || /\bI\s+are\b/i.test(trimmed)) {
    issues.push('❌ Lỗi chia "to be": Chủ ngữ "I" phải đi với "am" (I am).');
    deductions += 15;
  }
  if (/\byou\s+is\b/i.test(trimmed) || /\bwe\s+is\b/i.test(trimmed) || /\bthey\s+is\b/i.test(trimmed)) {
    issues.push('❌ Lỗi chia "to be": "You / We / They" phải đi với "are".');
    deductions += 15;
  }
  if (/\b(he|she|it)\s+(have|go|do|work|like|want|need)\b/i.test(trimmed)) {
    issues.push('⚠️ Sau "He / She / It" ở Hiện tại đơn, động từ cần thêm "-s/-es".');
    deductions += 12;
  }
  if (/\balthough\b.*\bbut\b/i.test(trimmed)) {
    issues.push('❌ Không dùng cả "although" và "but" trong cùng một câu.');
    deductions += 15;
  }
  if (/\bi\b/.test(trimmed)) {
    issues.push('⚠️ Đại từ "I" (tôi) luôn luôn phải viết HOA.');
    deductions += 8;
  }
  if (words.length < 8) {
    issues.push('💡 Đoạn viết hơi ngắn — thử mở rộng thêm 1–2 câu nhé.');
  }
  if (issues.length === 0) {
    issues.push('✅ Cấu trúc câu, viết hoa, dấu câu và chia động từ cơ bản rất chuẩn!');
  }

  return {
    issues,
    wordCount: words.length,
    score: Math.max(40, 100 - deductions),
  };
}

export const WritingGrammarLab: React.FC<WritingGrammarLabProps> = ({
  accent,
  geminiApiKey,
  onAddXp,
  isStep3Unlocked = false,
  onUnlockStep3,
  devUnlockAll = false,
  savedCompletedGrammarIds,
  onCompleteGrammarId,
}) => {
  const [subTab, setSubTab] = useState<'grammar' | 'studio'>('grammar');

  // Step-by-step Grammar Lessons state
  const [selectedGrammarIdx, setSelectedGrammarIdx] = useState<number>(0); // 0..12 = lessons, 13 = Final Exam
  const [localCompletedGrammarIds, setLocalCompletedGrammarIds] = useState<string[]>([]);
  const completedGrammarIds = savedCompletedGrammarIds ?? localCompletedGrammarIds;
  const [lessonQuizCount, setLessonQuizCount] = useState<number>(3);
  const [lessonQuizAns, setLessonQuizAns] = useState<Record<number, number>>({});
  const [lessonQuizSubmitted, setLessonQuizSubmitted] = useState(false);
  const [expandedPos, setExpandedPos] = useState<Record<string, boolean>>({});

  // Inline sentence drills state for each grammar lesson
  const [drillIdx, setDrillIdx] = useState(0);
  const [drillPicked, setDrillPicked] = useState<number[]>([]);
  const [drillChecked, setDrillChecked] = useState<'none' | 'correct' | 'wrong'>('none');

  const posBuckets = useMemo(() => {
    const nouns = CORE_VOCABULARY.filter((w) => w.pos === 'n');
    const verbs = CORE_VOCABULARY.filter((w) => w.pos === 'v');
    const adjs = CORE_VOCABULARY.filter((w) => w.pos === 'adj');
    const coreAdvs = CORE_VOCABULARY.filter((w) => w.pos === 'adv');
    const extraAdvs = [
      { word: 'quickly', pos: 'adv', level: 'A1' as CefrLevel, topic: 'Mô tả', meaningVi: 'một cách nhanh chóng' },
      { word: 'carefully', pos: 'adv', level: 'A2' as CefrLevel, topic: 'Mô tả', meaningVi: 'một cách cẩn thận' },
      { word: 'slowly', pos: 'adv', level: 'A1' as CefrLevel, topic: 'Mô tả', meaningVi: 'một cách chậm rãi' },
      { word: 'easily', pos: 'adv', level: 'A2' as CefrLevel, topic: 'Mô tả', meaningVi: 'một cách dễ dàng' },
      { word: 'happily', pos: 'adv', level: 'A2' as CefrLevel, topic: 'Cảm xúc', meaningVi: 'một cách vui vẻ' },
      { word: 'clearly', pos: 'adv', level: 'B1' as CefrLevel, topic: 'Giao tiếp', meaningVi: 'một cách rõ ràng' },
      { word: 'fluently', pos: 'adv', level: 'B1' as CefrLevel, topic: 'Giao tiếp', meaningVi: 'một cách trôi chảy' },
      { word: 'effectively', pos: 'adv', level: 'B2' as CefrLevel, topic: 'Công việc', meaningVi: 'một cách hiệu quả' },
    ];
    const advMap = new Map([...coreAdvs, ...extraAdvs].map((a) => [a.word, a]));
    return {
      n: nouns,
      v: verbs,
      adj: adjs,
      adv: Array.from(advMap.values()),
    };
  }, []);

  // Final Comprehensive Exam state (10 / 15 / 20 questions)
  const [examCount, setExamCount] = useState<number>(10);
  const [examAns, setExamAns] = useState<Record<number, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);

  // Sentence builder state
  const [exIdx, setExIdx] = useState(0);
  const [pickedIndices, setPickedIndices] = useState<number[]>([]);
  const [builderChecked, setBuilderChecked] = useState<'none' | 'correct' | 'wrong'>('none');

  // Writing studio state
  const [promptIdx, setPromptIdx] = useState(0);
  const [essay, setEssay] = useState('');
  const [offlineCheck, setOfflineCheck] = useState<{ issues: string[]; wordCount: number; score: number } | null>(null);
  const [aiReview, setAiReview] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const isExamMode = selectedGrammarIdx === GRAMMAR_LESSONS.length;
  const currentLesson = GRAMMAR_LESSONS[selectedGrammarIdx] || GRAMMAR_LESSONS[0];
  const activeLessonQuiz = currentLesson.quiz.slice(0, lessonQuizCount);
  const activeExamQuestions = COMPREHENSIVE_GRAMMAR_EXAM.slice(0, examCount);

  // Inline drill tokens for currentLesson
  const currentDrill = currentLesson.sentenceDrills[drillIdx % currentLesson.sentenceDrills.length];
  const drillTokens = useMemo(() => currentDrill.en.split(/\s+/), [currentDrill]);
  const shuffledDrillTokens = useMemo(
    () => drillTokens.map((w, i) => ({ w, i })).sort((a, b) => a.w.localeCompare(b.w)),
    [drillTokens]
  );

  const handleSelectGrammarItem = (idx: number) => {
    setSelectedGrammarIdx(idx);
    setLessonQuizAns({});
    setLessonQuizSubmitted(false);
    setDrillIdx(0);
    setDrillPicked([]);
    setDrillChecked('none');
  };

  const handleSubmitLessonQuiz = () => {
    setLessonQuizSubmitted(true);
    const correctCount = activeLessonQuiz.filter((item, idx) => lessonQuizAns[idx] === item.correct).length;
    if (correctCount === activeLessonQuiz.length) {
      setLocalCompletedGrammarIds((prev) =>
        prev.includes(currentLesson.id) ? prev : [...prev, currentLesson.id]
      );
      onCompleteGrammarId?.(currentLesson.id);
      onAddXp(20);
      confetti({ particleCount: 30, spread: 50 });
    }
  };

  const examCorrectCount = activeExamQuestions.filter(
    (item, idx) => examAns[idx] === item.correct
  ).length;
  const examScorePercent = Math.round((examCorrectCount / activeExamQuestions.length) * 100);
  const examPassed = examSubmitted && examScorePercent >= 80;

  const handleSubmitExam = () => {
    setExamSubmitted(true);
    if (examScorePercent >= 80) {
      onAddXp(60);
      confetti({ particleCount: 80, spread: 70 });
    }
  };

  const currentEx = SENTENCE_EXERCISES[exIdx % SENTENCE_EXERCISES.length];
  const exWords = useMemo(() => currentEx.en.split(' '), [currentEx]);
  const shuffledExWords = useMemo(() => {
    return exWords
      .map((w, idx) => ({ w, idx }))
      .sort((a, b) => a.w.localeCompare(b.w));
  }, [exWords]);

  const builtSentence = pickedIndices.map((i) => exWords[i]).join(' ');

  const handleCheckSentence = () => {
    if (builtSentence.toLowerCase() === currentEx.en.toLowerCase()) {
      setBuilderChecked('correct');
      speakText(currentEx.en, accent, 0.9);
      onAddXp(20);
      confetti({ particleCount: 35, spread: 50 });
    } else {
      setBuilderChecked('wrong');
    }
  };

  const currentPrompt = WRITING_PROMPTS[promptIdx];

  const handleCheckWriting = () => {
    const res = analyzeWritingOffline(essay);
    setOfflineCheck(res);
    if (res.score >= 85 && res.wordCount >= 10) {
      onAddXp(25);
    }
  };

  const handleAiReview = async () => {
    if (!geminiApiKey || !essay.trim()) return;
    setAiLoading(true);
    setAiReview(null);
    try {
      const reply = await callGeminiText(
        geminiApiKey,
        `Bạn là giáo viên tiếng Anh tận tâm dạy người Việt. Hãy chấm bài viết tiếng Anh dưới đây theo đề bài "${currentPrompt.task}":
1. Chỉ ra lỗi ngữ pháp/từ vựng (nếu có) và giải thích ngắn gọn bằng tiếng Việt.
2. Viết lại một phiên bản tự nhiên chuẩn bản xứ để học viên tham khảo.
Bài viết của học viên:
"${essay}"`
      );
      setAiReview(reply || 'Không nhận được phản hồi từ AI.');
    } catch (err: any) {
      setAiReview(`Lỗi kết nối Gemini API: ${err?.message || 'Vui lòng kiểm tra lại API Key.'}`);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <PenTool className="w-6 h-6 text-indigo-600" />
            <span>Ngữ Pháp Từng Bước & Viết Văn</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Học từng bài ngữ pháp + làm Quiz ngay cho từng bài, sau đó vượt qua <strong>Bài Thi Tổng Hợp ≥ 80%</strong> để sang <strong>Lab Ghép Câu</strong>.
          </p>
        </div>

        <div className="flex flex-wrap bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1">
          {[
            { id: 'grammar', label: '📖 Học Ngữ Pháp Từng Bước', icon: BookOpen },
            { id: 'studio', label: '✍️ Viết Hội thoại & Nhật ký', icon: PenTool },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                subTab === t.id
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: STEP-BY-STEP GRAMMAR (2-COLUMN LAYOUT) */}
      {subTab === 'grammar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: 14 Lessons + Final Exam */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2 h-fit lg:sticky lg:top-28">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase text-slate-500">Lộ trình Ngữ pháp</span>
              <span className="text-xs font-bold text-emerald-600">
                {completedGrammarIds.length}/{GRAMMAR_LESSONS.length} bài
              </span>
            </div>

            <div className="space-y-1.5 max-h-56 lg:max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
              {GRAMMAR_LESSONS.map((lesson, idx) => {
                const done = completedGrammarIds.includes(lesson.id);
                const locked =
                  !devUnlockAll &&
                  idx > 0 &&
                  !completedGrammarIds.includes(GRAMMAR_LESSONS[idx - 1].id) &&
                  !done;
                const active = selectedGrammarIdx === idx;
                return (
                  <button
                    key={lesson.id}
                    disabled={locked}
                    onClick={() => handleSelectGrammarItem(idx)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-semibold transition ${
                      active
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : locked
                        ? 'bg-slate-100/60 dark:bg-slate-800/30 text-slate-400 border-slate-200/60 cursor-not-allowed'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {locked ? (
                        <Lock className="w-3.5 h-3.5 shrink-0" />
                      ) : done ? (
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${active ? 'text-emerald-300' : 'text-emerald-500'}`} />
                      ) : (
                        <span className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                      )}
                      <span className="leading-snug">{lesson.title}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-70" />
                  </button>
                );
              })}

              {/* Final Comprehensive Exam Button */}
              {(() => {
                const examLocked = !devUnlockAll && completedGrammarIds.length < GRAMMAR_LESSONS.length;
                const active = isExamMode;
                return (
                  <button
                    disabled={examLocked}
                    onClick={() => handleSelectGrammarItem(GRAMMAR_LESSONS.length)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs font-extrabold transition mt-2 ${
                      active
                        ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                        : examLocked
                        ? 'bg-slate-100/60 text-slate-400 border-slate-200/60 cursor-not-allowed'
                        : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 text-amber-800 dark:text-amber-300 hover:border-amber-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {examLocked ? <Lock className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                      <span>🏆 Bài {GRAMMAR_LESSONS.length + 1}: Thi Tổng Hợp Các Thì (≥ 80%)</span>
                    </div>
                  </button>
                );
              })()}
            </div>
          </div>

          {/* Right Column: Single Grammar Lesson OR Comprehensive Exam */}
          <div className="lg:col-span-8">
            {!isExamMode ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5">
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                      Cấp {currentLesson.level}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-2">
                      {currentLesson.title}
                    </h3>
                  </div>
                  {completedGrammarIds.includes(currentLesson.id) && (
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shrink-0">
                      ✓ Đã hoàn thành
                    </span>
                  )}
                </div>

                {/* Purpose & Signals */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/25 border border-sky-100 dark:border-sky-900/50">
                    <div className="font-bold text-sky-700 dark:text-sky-300 mb-1">🎯 Mục đích sử dụng:</div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {highlightKeyTerms(currentLesson.purpose, currentLesson.focusTerms)}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/25 border border-purple-100 dark:border-purple-900/50">
                    <div className="font-bold text-purple-700 dark:text-purple-300 mb-1">🔎 Dấu hiệu nhận biết:</div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {highlightKeyTerms(currentLesson.signals, currentLesson.focusTerms)}
                    </p>
                  </div>
                </div>

                {/* Formula */}
                <div className="p-5 rounded-2xl bg-indigo-50/90 dark:bg-indigo-950/50 border-2 border-indigo-400 dark:border-indigo-600 shadow-sm space-y-3">
                  <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                    📐 Công thức chuẩn (Ghi nhớ trọng tâm)
                  </div>
                  <div className="space-y-2.5">
                    {(currentLesson.formulaRows ??
                      currentLesson.formula.split(' | ').map((part) => {
                        const colonIdx = part.indexOf(':');
                        const hasLabel = colonIdx > 0 && colonIdx <= 14;
                        return {
                          label: hasLabel ? part.slice(0, colonIdx).trim() : undefined,
                          code: hasLabel ? part.slice(colonIdx + 1).trim() : part.trim(),
                          note: '',
                        };
                      })
                    ).map((row, fIdx) => {
                      const label = row.label ?? '';
                      const labelStyle =
                        label === 'Khẳng định' || label === 'Hành động'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700'
                          : label === 'Phủ định'
                          ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-700'
                          : label === 'Hỏi' || label === 'Câu hỏi'
                          ? 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-700'
                          : 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-900/60 dark:text-indigo-200 dark:border-indigo-700';

                      return (
                        <div
                          key={fIdx}
                          className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-700 shadow-sm space-y-1"
                        >
                          <div className="flex flex-wrap items-center gap-2.5">
                            {label && (
                              <span className={`px-2.5 py-0.5 rounded-lg border text-xs font-extrabold shrink-0 ${labelStyle}`}>
                                {label}
                              </span>
                            )}
                            <div className="font-sans text-lg sm:text-xl font-black text-indigo-950 dark:text-white tracking-wide leading-snug">
                              {row.code}
                            </div>
                          </div>
                          {row.note && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                              ↳ {row.note}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                    {highlightKeyTerms(currentLesson.explanation, currentLesson.focusTerms)}
                  </p>
                </div>

                {/* Common Mistake */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/70 text-xs space-y-1">
                  <p className="text-rose-700 dark:text-rose-300">{currentLesson.commonMistake}</p>
                  <p className="text-emerald-700 dark:text-emerald-300 font-semibold">{currentLesson.correction}</p>
                </div>

                {/* Detailed Single Part-of-Speech Word List (for Bài 1..4) */}
                {currentLesson.posKey && (() => {
                  const key = currentLesson.posKey;
                  const list = posBuckets[key];
                  const isExpanded = Boolean(expandedPos[key]);
                  const visibleWords = isExpanded ? list : list.slice(0, 18);
                  return (
                    <div className="p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900/50 bg-slate-50/70 dark:bg-slate-800/40 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">
                          📚 Danh sách các từ thuộc loại này (Bấm vào từ để nghe)
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800">
                          {list.length} từ trong kho
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {visibleWords.map((w) => (
                          <button
                            key={w.word}
                            onClick={() => speakText(w.word, accent, 0.9)}
                            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] hover:border-indigo-400 transition"
                            title={`Bấm nghe "${w.word}"`}
                          >
                            <strong className="text-slate-900 dark:text-white">{w.word}</strong>{' '}
                            <span className="text-slate-500">({w.meaningVi})</span>
                          </button>
                        ))}
                      </div>

                      {list.length > 18 && (
                        <button
                          onClick={() =>
                            setExpandedPos((prev) => ({ ...prev, [key]: !isExpanded }))
                          }
                          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          {isExpanded
                            ? 'Thu gọn danh sách ▲'
                            : `Xem đầy đủ tất cả ${list.length} từ loại này ▼`}
                        </button>
                      )}
                    </div>
                  );
                })()}

                {/* Examples */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold uppercase text-slate-500">🔊 Ví dụ minh họa & Phân tích chi tiết (Bấm để nghe)</div>
                  {currentLesson.examples.map((ex, i) => {
                    const breakdown = EXAMPLE_BREAKDOWNS[currentLesson.id]?.[i];
                    const colorMap = {
                      blue: 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/40 dark:text-sky-200 dark:border-sky-800',
                      orange: 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-200 dark:border-orange-800',
                      green: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800',
                      purple: 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/40 dark:text-purple-200 dark:border-purple-800',
                      amber: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800',
                    };
                    return (
                      <div
                        key={i}
                        onClick={() => speakText(ex.en, accent, 0.9)}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/60 border border-slate-200/70 dark:border-slate-700/70 cursor-pointer space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                              {highlightKeyTerms(ex.en, currentLesson.focusTerms)}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">{ex.vi}</p>
                          </div>
                          <Volume2 className="w-4 h-4 text-indigo-500 shrink-0" />
                        </div>

                        {breakdown && (
                          <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
                            <div className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
                              ⏱️ {breakdown.tenseNote}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {breakdown.parts.map((part, pIdx) => (
                                <span
                                  key={pIdx}
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[11px] ${colorMap[part.color]}`}
                                >
                                  <strong className="font-extrabold">{part.token}</strong>
                                  <span className="opacity-75">→ {part.role}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Inline Sentence Drills for THIS lesson */}
                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-extrabold text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                      <Puzzle className="w-4 h-4" /> Thực hành Ghép Câu ({drillIdx + 1}/{currentLesson.sentenceDrills.length})
                    </div>
                    <div className="flex gap-1">
                      {currentLesson.sentenceDrills.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setDrillIdx(i);
                            setDrillPicked([]);
                            setDrillChecked('none');
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                            drillIdx === i
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white dark:bg-slate-800 text-slate-600 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          Câu {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Nghĩa: "{currentDrill.vi}"
                  </p>

                  <div className="min-h-[48px] p-2.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-dashed border-emerald-200 dark:border-emerald-800 flex flex-wrap gap-1.5 items-center">
                    {drillPicked.length === 0 ? (
                      <span className="text-xs text-slate-400">Bấm lần lượt vào các từ bên dưới để ghép câu...</span>
                    ) : (
                      drillPicked.map((idx, pos) => (
                        <button
                          key={pos}
                          onClick={() => {
                            setDrillPicked((p) => p.filter((_, i) => i !== pos));
                            setDrillChecked('none');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-rose-600"
                        >
                          {drillTokens[idx]}
                        </button>
                      ))
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {shuffledDrillTokens.map(({ w, i }) => (
                      <button
                        key={i}
                        disabled={drillPicked.includes(i)}
                        onClick={() => {
                          speakText(w, accent, 0.9);
                          setDrillPicked((p) => [...p, i]);
                          setDrillChecked('none');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold disabled:opacity-25 hover:border-indigo-500"
                      >
                        {w}
                      </button>
                    ))}
                  </div>

                  {drillChecked === 'correct' && (
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      ✅ Chính xác tuyệt đối! Câu chuẩn: "{currentDrill.en}."
                    </p>
                  )}
                  {drillChecked === 'wrong' && (
                    <p className="text-xs font-bold text-rose-600">
                      ❌ Chưa đúng trật tự — thử bấm vào từ để bỏ bớt và xếp lại nhé!
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      disabled={drillPicked.length === 0}
                      onClick={() => {
                        const built = drillPicked.map((i) => drillTokens[i]).join(' ');
                        if (built.toLowerCase() === currentDrill.en.toLowerCase()) {
                          setDrillChecked('correct');
                          speakText(currentDrill.en, accent, 0.9);
                          onAddXp(10);
                        } else {
                          setDrillChecked('wrong');
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold disabled:opacity-40"
                    >
                      Kiểm tra ghép câu
                    </button>
                    <button
                      onClick={() => {
                        setDrillPicked([]);
                        setDrillChecked('none');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 text-xs font-semibold"
                    >
                      Xếp lại ↻
                    </button>
                  </div>
                </div>

                {/* Per-lesson Quiz with Question Count Selector */}
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-extrabold text-sm text-indigo-700 dark:text-indigo-300">
                      📝 Thực hành Quiz cho bài này (Đúng {lessonQuizCount}/{lessonQuizCount} để qua bài):
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-slate-500 font-semibold mr-1">Số câu muốn làm:</span>
                      {[3, 5, 6].map((cnt) => (
                        <button
                          key={cnt}
                          onClick={() => {
                            setLessonQuizCount(cnt);
                            setLessonQuizAns({});
                            setLessonQuizSubmitted(false);
                          }}
                          className={`px-2.5 py-1 rounded-lg font-bold transition ${
                            lessonQuizCount === cnt
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white dark:bg-slate-800 text-slate-600 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {cnt} câu
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {activeLessonQuiz.map((qItem, qIdx) => (
                      <div key={qIdx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          Câu {qIdx + 1}: {qItem.q}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                          {qItem.options.map((opt, oIdx) => {
                            const picked = lessonQuizAns[qIdx] === oIdx;
                            const isRight = oIdx === qItem.correct;
                            let cls = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
                            if (lessonQuizSubmitted) {
                              if (isRight) cls = 'bg-emerald-100 border-emerald-500 text-emerald-900';
                              else if (picked) cls = 'bg-rose-100 border-rose-500 text-rose-900';
                            } else if (picked) {
                              cls = 'bg-indigo-600 text-white border-indigo-600';
                            }
                            return (
                              <button
                                key={oIdx}
                                disabled={lessonQuizSubmitted}
                                onClick={() => setLessonQuizAns((prev) => ({ ...prev, [qIdx]: oIdx }))}
                                className={`px-3 py-2 rounded-lg border text-xs font-semibold text-left transition ${cls}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {lessonQuizSubmitted && (
                          <p className="text-[11px] text-indigo-600 dark:text-indigo-300">💡 {qItem.explain}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSubmitLessonQuiz}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
                      >
                        Kiểm tra đáp án
                      </button>
                      {lessonQuizSubmitted && (
                        <button
                          onClick={() => {
                            setLessonQuizAns({});
                            setLessonQuizSubmitted(false);
                          }}
                          className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 text-xs font-semibold"
                        >
                          Làm lại ↻
                        </button>
                      )}
                    </div>

                    {completedGrammarIds.includes(currentLesson.id) && (
                      <button
                        onClick={() => handleSelectGrammarItem(selectedGrammarIdx + 1)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
                      >
                        {selectedGrammarIdx + 1 < GRAMMAR_LESSONS.length
                          ? '🎉 Qua bài Ngữ pháp tiếp theo →'
                          : '🏆 Vào Bài Thi Tổng Hợp →'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* COMPREHENSIVE EXAM (10 / 15 / 20 QUESTIONS, >= 80% REQUIRED) */
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-amber-300 dark:border-amber-800 p-5 sm:p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-amber-700 dark:text-amber-300">
                      🏆 Bài {GRAMMAR_LESSONS.length + 1}: Thi Tổng Hợp Nhận Biết Các Thì & Cấu Trúc ({examCount} câu)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Đạt từ <strong>80% trở lên ({Math.ceil(examCount * 0.8)}/{examCount} câu đúng)</strong> để mở khóa <strong>Bước 3: Luyện Nghe</strong>.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-slate-500 font-semibold mr-1">Chọn số câu thi:</span>
                      {[10, 15, 20].map((cnt) => (
                        <button
                          key={cnt}
                          onClick={() => {
                            setExamCount(cnt);
                            setExamAns({});
                            setExamSubmitted(false);
                          }}
                          className={`px-2.5 py-1 rounded-lg font-bold transition ${
                            examCount === cnt
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                          }`}
                        >
                          {cnt} câu
                        </button>
                      ))}
                    </div>

                    {examSubmitted && (
                      <span
                        className={`px-3.5 py-1.5 rounded-full text-sm font-black ${
                          examScorePercent >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {examScorePercent}% ({examCorrectCount}/{examCount} câu)
                      </span>
                    )}
                  </div>
                </div>

                {/* 6 Tenses Cheat-Sheet before Exam */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-2.5">
                  <div className="text-xs font-extrabold uppercase text-indigo-700 dark:text-indigo-300">
                    📊 Bảng So Sánh 6 Thì Trong 1 Nháy Mắt (Cùng động từ "work" — Bấm để nghe)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {[
                      { tense: '1. Hiện tại đơn', formula: 'S + V(s/es)', ex: 'She works every day.', signal: 'every day, always, often' },
                      { tense: '2. Hiện tại tiếp diễn', formula: 'am/is/are + V-ing', ex: 'She is working right now.', signal: 'now, right now, at the moment' },
                      { tense: '3. Quá khứ đơn', formula: 'S + V2/ed', ex: 'She worked yesterday.', signal: 'yesterday, last week, ago' },
                      { tense: '4. Quá khứ tiếp diễn', formula: 'was/were + V-ing', ex: 'She was working at 8 PM.', signal: 'at 8 PM yesterday, when/while' },
                      { tense: '5. Tương lai đơn', formula: 'will + V nguyên mẫu', ex: 'She will work tomorrow.', signal: 'tomorrow, next week, soon' },
                      { tense: '6. Hiện tại hoàn thành', formula: 'have/has + V3/ed', ex: 'She has worked here for 3 years.', signal: 'already, yet, since, for' },
                    ].map((row) => (
                      <button
                        key={row.tense}
                        type="button"
                        onClick={() => speakText(row.ex, accent, 0.9)}
                        className="text-left p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-700 hover:border-indigo-400 transition space-y-1"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[11px] font-extrabold text-indigo-700 dark:text-indigo-300">{row.tense}</span>
                          <Volume2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        </div>
                        <div className="font-mono text-[11px] font-bold text-slate-900 dark:text-white">{row.formula}</div>
                        <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">"{row.ex}"</div>
                        <div className="text-[10px] text-slate-500">Dấu hiệu: {row.signal}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {activeExamQuestions.map((qItem, qIdx) => (
                    <div key={qIdx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{qItem.q}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {qItem.options.map((opt, oIdx) => {
                          const picked = examAns[qIdx] === oIdx;
                          const isRight = oIdx === qItem.correct;
                          let cls = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700';
                          if (examSubmitted) {
                            if (isRight) cls = 'bg-emerald-100 border-emerald-500 text-emerald-900';
                            else if (picked) cls = 'bg-rose-100 border-rose-500 text-rose-900';
                          } else if (picked) {
                            cls = 'bg-indigo-600 text-white border-indigo-600';
                          }
                          return (
                            <button
                              key={oIdx}
                              disabled={examSubmitted}
                              onClick={() => setExamAns((prev) => ({ ...prev, [qIdx]: oIdx }))}
                              className={`px-3 py-2 rounded-lg border text-xs font-semibold transition ${cls}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {examSubmitted && (
                        <p className="text-[11px] text-indigo-700 dark:text-indigo-300">💡 {qItem.explain}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSubmitExam}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold"
                    >
                      Nộp bài & Chấm điểm
                    </button>
                    {examSubmitted && (
                      <button
                        onClick={() => {
                          setExamAns({});
                          setExamSubmitted(false);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                      >
                        Thi lại ↻
                      </button>
                    )}
                  </div>

                  {onUnlockStep3 && (isStep3Unlocked || examPassed) && (
                    <button
                      onClick={onUnlockStep3}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md"
                    >
                      🎉 Đạt chuẩn ≥ 80%! Mở khóa toàn bộ Bước Thực Hành (Ghép Câu, Nghe–Nói & Viết) →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: WRITING STUDIO */}
      {subTab === 'studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2.5">
              <div className="text-xs font-bold uppercase text-slate-500">Chọn đề bài luyện viết</div>
              {WRITING_PROMPTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setPromptIdx(i);
                    setOfflineCheck(null);
                    setAiReview(null);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition ${
                    promptIdx === i
                      ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/30'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 mr-2">
                    {p.level}
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{p.title}</span>
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
              <div className="text-xs font-bold uppercase text-indigo-600">Khung mẫu tham khảo</div>
              <pre className="whitespace-pre-wrap font-sans text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentPrompt.template}
              </pre>
              <button
                onClick={() => setEssay(currentPrompt.template)}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                📋 Chép khung mẫu vào ô viết để sửa lại theo ý mình
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase text-indigo-600">Đề bài ({currentPrompt.level})</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{currentPrompt.task}</h3>
            </div>

            <textarea
              rows={7}
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              placeholder="Viết đoạn hội thoại hoặc đoạn văn tiếng Anh của bạn vào đây..."
              className="w-full p-4 text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleCheckWriting}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
                >
                  <CheckCircle2 className="w-4 h-4" /> Kiểm tra Ngữ pháp & Chính tả
                </button>
                <button
                  onClick={() => speakText(essay, accent, 0.9)}
                  disabled={!essay.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold disabled:opacity-40"
                >
                  <Volume2 className="w-4 h-4" /> Nghe đọc bài của bạn
                </button>
              </div>

              {geminiApiKey && (
                <button
                  onClick={handleAiReview}
                  disabled={aiLoading || !essay.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold disabled:opacity-40"
                >
                  <Sparkles className="w-4 h-4" /> {aiLoading ? 'AI đang chấm...' : 'AI Giáo viên sửa chi tiết'}
                </button>
              )}
            </div>

            {offlineCheck && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Số từ: {offlineCheck.wordCount} từ
                  </span>
                  <span className="text-sm font-extrabold text-indigo-600">
                    Điểm cấu trúc cơ bản: {offlineCheck.score}/100
                  </span>
                </div>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {offlineCheck.issues.map((iss, i) => (
                    <li key={i}>{iss}</li>
                  ))}
                </ul>
              </div>
            )}

            {aiReview && (
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-900/50 text-xs sm:text-sm whitespace-pre-wrap text-slate-800 dark:text-slate-200">
                <div className="font-bold text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1">
                  <Send className="w-3.5 h-3.5" /> Nhận xét từ Gia sư AI:
                </div>
                {aiReview}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
