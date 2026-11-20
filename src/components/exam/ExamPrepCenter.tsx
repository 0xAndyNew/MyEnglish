import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  BookmarkCheck,
  BookmarkPlus,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Compass,
  Eye,
  EyeOff,
  FileText,
  Flag,
  Headphones,
  Lightbulb,
  ListChecks,
  Loader2,
  Mic,
  PenTool,
  Play,
  RotateCcw,
  Search,
  ShieldAlert,
  Sparkles,
  Square,
  Target,
  Timer,
  Volume2,
  XCircle,
} from 'lucide-react';
import {
  estimateExamScore,
  EXAM_ORDER,
  EXAM_PREP_DATA,
  ExamMcqQuestion,
  ExamRubricCriterion,
  ExamSpeakingTask,
  ExamWritingTask,
} from '../../data/exam/examPrepData';
import {
  getExpandedListeningLessons,
  getExpandedReadingLessons,
  getExpandedSpeakingLessons,
  getExpandedWritingLessons,
} from '../../data/exam/examSkillLessons';
import { PaginationBar, usePagination } from '../common/PaginationBar';
import { ExamType, getExamMeta, LearnerProfile } from '../../types/audience';
import { AccentMode, CefrLevel, WordEntry } from '../../types/learning';
import type { AppRoute } from '../app/useHashRoute';
import {
  buildExamWordEntry,
  EXAM_PREF_EVENT,
  EXAM_TARGET_PRESETS,
  getExamDiagnosticSummary,
  getExamTargetScore,
  getPreferredExam,
  setExamTargetScore,
  setPreferredExam,
  type ExamDiagnosticSummary,
} from './examPreferences';
import { EXAM_IMAGE_MAP } from '../../utils/flashcardMedia';
import { callGeminiText } from '../../utils/geminiClient';
import {
  isSpeechRecognitionSupported,
  speakText,
  startSpeechRecognition,
} from '../../utils/speechEngine';

export interface ExamPrepCenterProps {
  accent: AccentMode;
  geminiApiKey?: string;
  profile?: LearnerProfile | null;
  onAddXp: (amount: number) => void;
  onSaveWord?: (word: WordEntry) => void;
  savedWords?: WordEntry[];
  initialTab?: 'diagnostic' | 'strategies' | 'practice' | 'mock' | 'rubric';
  initialPracticeSkill?: PracticeSkill;
  initialRubricTask?: { mode: 'writing' | 'speaking'; taskId?: string };
  allowAllOptions?: boolean;
  hideHeaderNav?: boolean;
  hideExamBar?: boolean;
  onNavigate?: (route: AppRoute) => void;
}

type ExamCenterTab = 'diagnostic' | 'strategies' | 'practice' | 'mock' | 'rubric';
type PracticeSkill = 'listening' | 'reading' | 'writing' | 'speaking';

interface OfflineCriterionScore {
  criterion: ExamRubricCriterion;
  scoreTen: number;
  note: string;
}

interface OfflineRubricEvaluation {
  overallExamScore: string;
  percentScore: number;
  wordCount: number;
  sentenceCount: number;
  criteriaScores: OfflineCriterionScore[];
  strengths: string[];
  improvements: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
}

const DISCOURSE_MARKERS = [
  'however',
  'moreover',
  'furthermore',
  'consequently',
  'therefore',
  'nevertheless',
  'although',
  'whereas',
  'in addition',
  'on the other hand',
  'for instance',
  'for example',
  'in conclusion',
  'overall',
  'firstly',
  'secondly',
  'additionally',
  'meanwhile',
  'despite',
  'conversely',
  'specifically',
  'personally',
  'in my opinion',
];

const COMPLEX_GRAMMAR_TOKENS = [
  'which',
  'although',
  'whereas',
  'unless',
  'despite',
  'whether',
  'because',
  'since',
  'while',
  'who',
  'whose',
  'where',
  'could',
  'would',
  'should',
  'not only',
  'rather than',
  'in order to',
];

function computeDaysUntilExam(examDate?: string): {
  daysLeft: number;
  formattedDate: string;
} | null {
  if (!examDate) return null;
  const parts = examDate.split('-').map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
  const [y, m, d] = parts;
  const target = new Date(y, m - 1, d);
  if (Number.isNaN(target.getTime())) return null;
  target.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysLeft = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const formattedDate = `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
  return { daysLeft, formattedDate };
}

function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function mapPercentToExamOutputScore(
  examType: ExamType,
  mode: 'writing' | 'speaking',
  percent: number
): string {
  if (examType === 'ielts') {
    const rawBand = 4.0 + (percent / 100) * 4.5;
    const rounded = Math.round(rawBand * 2) / 2;
    return `Band ${Math.max(4.0, Math.min(8.5, rounded)).toFixed(1)}`;
  }
  if (examType === 'toeic') {
    const scaled = Math.round((60 + (percent / 100) * 140) / 10) * 10;
    return `${Math.max(60, Math.min(200, scaled))} / 200 (${mode === 'writing' ? 'Writing' : 'Speaking'})`;
  }
  if (examType === 'vstep') {
    const raw = 3.5 + (percent / 100) * 6.0;
    const rounded = Math.round(raw * 2) / 2;
    const cefr = rounded >= 8.5 ? 'C1' : rounded >= 6.0 ? 'B2' : rounded >= 4.0 ? 'B1' : 'A2';
    return `${Math.max(3.5, Math.min(9.5, rounded)).toFixed(1)} / 10 (${cefr})`;
  }
  if (examType === 'cambridge') {
    const scale = Math.round(115 + (percent / 100) * 70);
    const grade = scale >= 180 ? 'C1' : scale >= 160 ? 'B2 FCE' : scale >= 140 ? 'B1 PET' : 'A2 KET';
    return `${scale} / 190 (${grade})`;
  }
  const toeflSkill = Math.round(10 + (percent / 100) * 20);
  return `${Math.max(10, Math.min(30, toeflSkill))} / 30`;
}

function evaluateOfflineByRubric(
  text: string,
  examType: ExamType,
  mode: 'writing' | 'speaking',
  criteria: ExamRubricCriterion[],
  minWords: number,
  targetKeywords: string[]
): OfflineRubricEvaluation {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const sentences = trimmed
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2);
  const sentenceCount = Math.max(sentences.length, wordCount > 0 ? 1 : 0);
  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  const uniqueWordCount = new Set(
    words.map((w) => w.toLowerCase().replace(/[^a-z']/g, '')).filter(Boolean)
  ).size;
  const lexicalDiversity = wordCount > 0 ? uniqueWordCount / wordCount : 0;

  const matchedKeywords = targetKeywords.filter((kw) => {
    const firstCore = kw.toLowerCase().split('(')[0].trim();
    return firstCore.length > 2 && lower.includes(firstCore);
  });
  const missingKeywords = targetKeywords.filter((kw) => !matchedKeywords.includes(kw));

  const matchedDiscourse = DISCOURSE_MARKERS.filter((m) => lower.includes(m));
  const matchedComplex = COMPLEX_GRAMMAR_TOKENS.filter((t) =>
    new RegExp(`\\b${t.replace(/\s+/g, '\\s+')}\\b`, 'i').test(trimmed)
  );

  const strengths: string[] = [];
  const improvements: string[] = [];
  let grammarPenalty = 0;

  if (/\bi\b/.test(trimmed)) {
    improvements.push('Đại từ nhân xưng "I" phải luôn viết HOA.');
    grammarPenalty += 8;
  }
  if (/\bI\s+(is|are)\b/i.test(trimmed)) {
    improvements.push('Lỗi chia "to be": phải dùng "I am" hoặc "I was", không dùng "I is/are".');
    grammarPenalty += 10;
  }
  if (/\balthough\b[\s\S]{1,80}\bbut\b/i.test(trimmed)) {
    improvements.push('Không dùng đồng thời "although" và "but" trong cùng một câu.');
    grammarPenalty += 10;
  }
  if (/\bbecause\b[\s\S]{1,80}\bso\b/i.test(trimmed)) {
    improvements.push('Không dùng đồng thời "because" và "so" trong cùng một câu.');
    grammarPenalty += 10;
  }
  if (trimmed && !/[.!?]$/.test(trimmed)) {
    improvements.push('Thiếu dấu kết thúc câu (., !, ?) ở cuối bài.');
    grammarPenalty += 4;
  }
  if (trimmed && /^[a-z]/.test(trimmed)) {
    improvements.push('Ký tự mở đầu câu nên viết HOA.');
    grammarPenalty += 4;
  }

  const effectiveTargetWords = mode === 'writing' ? Math.max(80, minWords) : Math.max(45, minWords);
  const lengthRatio = Math.min(1, wordCount / effectiveTargetWords);

  if (wordCount >= effectiveTargetWords) {
    strengths.push(`Đạt chuẩn độ dài mục tiêu (${wordCount} từ / yêu cầu ~${effectiveTargetWords}+ từ).`);
  } else {
    improvements.push(
      `Bài làm còn ngắn (${wordCount} từ). Cần mở rộng thêm ví dụ/lý giải để đạt tối thiểu ~${effectiveTargetWords} từ.`
    );
  }

  if (mode === 'writing') {
    if (paragraphs.length >= 3) {
      strengths.push(`Chia bố cục rõ ràng (${paragraphs.length} đoạn văn tách bạch).`);
    } else if (wordCount >= 80) {
      improvements.push('Nên tách thành 3–4 đoạn rõ ràng (Mở bài – Thân bài – Kết bài) để tăng điểm Coherence/Organisation.');
    }
  }

  if (matchedDiscourse.length >= 3) {
    strengths.push(`Sử dụng tốt từ nối mạch lạc (${matchedDiscourse.slice(0, 4).join(', ')}).`);
  } else {
    improvements.push(
      'Bổ sung thêm từ nối chuyển ý tự nhiên (ví dụ: However, Consequently, Moreover, In contrast).'
    );
  }

  if (matchedKeywords.length > 0) {
    strengths.push(`Áp dụng được ${matchedKeywords.length} cụm từ vựng ăn điểm của chủ đề.`);
  } else if (targetKeywords.length > 0) {
    improvements.push('Thử lồng ghép thêm 2–3 từ khóa chủ đề gợi ý ở trên để nâng điểm Lexical Resource.');
  }

  if (matchedComplex.length >= 3) {
    strengths.push(`Có sử dụng cấu trúc câu phức đa dạng (${matchedComplex.slice(0, 4).join(', ')}).`);
  } else {
    improvements.push('Kết hợp thêm câu phức (mệnh đề quan hệ which/who, câu nhượng bộ although/while, câu điều kiện).');
  }

  const taskScore = Math.max(
    3,
    Math.min(10, Math.round((lengthRatio * 7.5 + (paragraphs.length >= 3 || mode === 'speaking' ? 2.5 : 1.0)) * 10) / 10)
  );
  const orgScore = Math.max(
    3,
    Math.min(
      10,
      Math.round(
        (Math.min(1, matchedDiscourse.length / 4) * 5.0 +
          (mode === 'writing' ? Math.min(1, paragraphs.length / 4) * 3.5 : Math.min(1, sentenceCount / 4) * 3.5) +
          1.5) *
          10
      ) / 10
    )
  );
  const vocabScore = Math.max(
    3,
    Math.min(
      10,
      Math.round(
        (Math.min(1, lexicalDiversity / 0.62) * 5.0 +
          (targetKeywords.length > 0 ? Math.min(1, matchedKeywords.length / Math.min(3, targetKeywords.length)) * 3.2 : 2.0) +
          lengthRatio * 1.8) *
          10
      ) / 10
    )
  );
  const gramScore = Math.max(
    3,
    Math.min(
      10,
      Math.round(
        (Math.min(1, matchedComplex.length / 4) * 4.5 + lengthRatio * 4.5 + 1.0 - grammarPenalty / 12) * 10
      ) / 10
    )
  );

  const relevantCriteria = criteria.filter((c) => c.appliesTo === mode || c.appliesTo === 'both');
  const criteriaScores: OfflineCriterionScore[] = relevantCriteria.map((criterion) => {
    const idLower = `${criterion.id} ${criterion.name}`.toLowerCase();
    if (/task|content|relevance|completeness|fulfillment|topic/.test(idLower)) {
      return {
        criterion,
        scoreTen: taskScore,
        note:
          wordCount >= effectiveTargetWords
            ? 'Đáp ứng tốt độ dài và dung lượng phát triển ý.'
            : `Cần bổ sung thêm ý để đạt khoảng ${effectiveTargetWords}+ từ.`,
      };
    }
    if (/coherence|organisation|organization|discourse|communicative|interactive/.test(idLower)) {
      return {
        criterion,
        scoreTen: orgScore,
        note:
          matchedDiscourse.length >= 3
            ? 'Mạch lạc tốt, có từ nối chuyển ý hợp lý.'
            : 'Nên bổ sung từ nối và tách đoạn mạch lạc hơn.',
      };
    }
    if (/lexical|vocab/.test(idLower)) {
      return {
        criterion,
        scoreTen: vocabScore,
        note:
          matchedKeywords.length >= 2
            ? 'Từ vựng đa dạng, có sử dụng cụm từ chuyên đề.'
            : 'Tăng cường collocations học thuật & từ nối thay cho từ lặp.',
      };
    }
    return {
      criterion,
      scoreTen: gramScore,
      note:
        grammarPenalty === 0 && matchedComplex.length >= 2
          ? 'Kiểm soát ngữ pháp ổn định và có câu phức.'
          : 'Kiểm tra lỗi cơ bản và thêm mệnh đề quan hệ / câu ghép.',
    };
  });

  const avgTen =
    criteriaScores.length > 0
      ? criteriaScores.reduce((sum, item) => sum + item.scoreTen, 0) / criteriaScores.length
      : (taskScore + orgScore + vocabScore + gramScore) / 4;
  const percentScore = Math.max(15, Math.min(96, Math.round(avgTen * 10)));
  const overallExamScore = mapPercentToExamOutputScore(examType, mode, percentScore);

  return {
    overallExamScore,
    percentScore,
    wordCount,
    sentenceCount,
    criteriaScores,
    strengths,
    improvements,
    matchedKeywords,
    missingKeywords,
  };
}

interface SkillLessonPickerItem {
  id: string;
  title: string;
  tag: string;
}

const SkillLessonPicker: React.FC<{
  items: SkillLessonPickerItem[];
  activeIdx: number;
  onSelect: (idx: number) => void;
  unitLabel?: string;
  sourceFilter?: 'all' | 'exam-format' | 'foundation';
  onSourceFilterChange?: (next: 'all' | 'exam-format' | 'foundation') => void;
  examShortLabel?: string;
}> = ({
  items,
  activeIdx,
  onSelect,
  unitLabel = 'bài',
  sourceFilter,
  onSourceFilterChange,
  examShortLabel = 'Đề thi',
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const boxRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items
      .map((it, idx) => ({ ...it, origIdx: idx }))
      .filter((it) => !q || it.title.toLowerCase().includes(q) || it.tag.toLowerCase().includes(q));
  }, [items, search]);

  const pagination = usePagination(filtered, 8, { resetKey: `${items.length}-${search}` });
  const current = items[activeIdx];

  return (
    <div ref={boxRef} className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-extrabold shrink-0">
            Bài {activeIdx + 1}/{items.length}
          </span>
          {current && (
            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold truncate">
              {current.tag}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            disabled={activeIdx <= 0}
            onClick={() => onSelect(Math.max(0, activeIdx - 1))}
            className="min-h-[38px] px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold disabled:opacity-40 inline-flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Trước
          </button>
          <button
            type="button"
            disabled={activeIdx >= items.length - 1}
            onClick={() => onSelect(Math.min(items.length - 1, activeIdx + 1))}
            className="min-h-[38px] px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold disabled:opacity-40 inline-flex items-center gap-1"
          >
            Sau <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="min-h-[38px] px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-extrabold inline-flex items-center gap-1"
          >
            <span>{open ? 'Thu gọn' : `Chọn bài (${items.length})`}</span>
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
          {sourceFilter && onSourceFilterChange && (
            <div className="inline-flex p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 gap-1">
              {(
                [
                  { id: 'all', label: 'Tất cả bài' },
                  { id: 'exam-format', label: `Chuẩn ${examShortLabel}` },
                  { id: 'foundation', label: 'Mở rộng nền tảng' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onSourceFilterChange(f.id)}
                  className={`min-h-[34px] px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    sourceFilter === f.id
                      ? 'bg-rose-600 text-white'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Tìm theo tên ${unitLabel} hoặc chủ đề...`}
              className="w-full min-h-[40px] pl-9 pr-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {pagination.pageItems.map((it) => {
              const active = it.origIdx === activeIdx;
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => {
                    onSelect(it.origIdx);
                    setOpen(false);
                  }}
                  className={`p-3 rounded-xl border text-left transition ${
                    active
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700 hover:border-rose-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-extrabold mb-0.5">
                    <span>Bài {it.origIdx + 1}</span>
                    <span className={active ? 'text-rose-100' : 'text-slate-400'}>{it.tag}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold line-clamp-1">{it.title}</div>
                </button>
              );
            })}
          </div>

          <PaginationBar
            page={pagination.page}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            startIdx={pagination.startIdx}
            endIdx={pagination.endIdx}
            onPageChange={pagination.setPage}
            itemLabel={unitLabel}
            compact
            scrollTargetRef={boxRef}
          />
        </div>
      )}
    </div>
  );
};

export const ExamPrepCenter: React.FC<ExamPrepCenterProps> = ({
  accent,
  geminiApiKey,
  profile,
  onAddXp,
  onSaveWord,
  savedWords = [],
  initialTab,
  initialPracticeSkill,
  initialRubricTask,
  allowAllOptions = false,
  hideHeaderNav = false,
  hideExamBar = false,
  onNavigate,
}) => {
  const [selectedExam, setSelectedExam] = useState<ExamType>(() =>
    getPreferredExam(profile)
  );
  const [targetScoreState, setTargetScoreState] = useState<string>(() =>
    getExamTargetScore(getPreferredExam(profile), profile)
  );
  const [diagSummary, setDiagSummary] = useState<ExamDiagnosticSummary | null>(() =>
    getExamDiagnosticSummary(getPreferredExam(profile))
  );
  const [activeTab, setActiveTab] = useState<ExamCenterTab>(initialTab || 'diagnostic');
  const [lessonSourceFilter, setLessonSourceFilter] = useState<
    'all' | 'exam-format' | 'foundation'
  >('all');
  const [e1Section, setE1Section] = useState<'blueprint' | 'scoring'>('blueprint');
  const [rubricFilterTab, setRubricFilterTab] = useState<'writing' | 'speaking'>('writing');

  // Audio playback speed
  const [ttsRate, setTtsRate] = useState<number>(0.95);

  // Tab 2: Strategies filter
  const [strategySkillFilter, setStrategySkillFilter] = useState<string>('ALL');

  // Tab 3: 4-Skill Practice state
  const [practiceSkill, setPracticeSkill] = useState<PracticeSkill>('listening');
  const [listeningIdx, setListeningIdx] = useState(0);
  const [showListeningTranscript, setShowListeningTranscript] = useState(true);
  const [showListeningSummary, setShowListeningSummary] = useState(false);
  const [showListeningQuiz, setShowListeningQuiz] = useState(false);
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, number>>({});
  const [listeningChecked, setListeningChecked] = useState<Record<string, boolean>>({});

  const [readingIdx, setReadingIdx] = useState(0);
  const [showReadingSummary, setShowReadingSummary] = useState(false);
  const [showReadingQuiz, setShowReadingQuiz] = useState(false);
  const [readingAnswers, setReadingAnswers] = useState<Record<string, number>>({});
  const [readingChecked, setReadingChecked] = useState<Record<string, boolean>>({});

  const [writingIdx, setWritingIdx] = useState(0);
  const [showWritingModel, setShowWritingModel] = useState(false);

  const [speakingIdx, setSpeakingIdx] = useState(0);
  const [showSpeakingSample, setShowSpeakingSample] = useState(false);
  const [speakingClockSec, setSpeakingClockSec] = useState<number | null>(null);
  const [speakingClockLabel, setSpeakingClockLabel] = useState<string>('');

  // Tab 4: Timed Mock Test state
  const [mockTestIdx, setMockTestIdx] = useState(0);
  const [mockBestScores, setMockBestScores] = useState<Record<string, { correct: number; total: number }>>(() => {
    try {
      const raw = localStorage.getItem('myenglish_exam_mock_scores_v1');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [mockPhase, setMockPhase] = useState<'ready' | 'running' | 'submitted'>('ready');
  const [mockCurrentIdx, setMockCurrentIdx] = useState(0);
  const [mockAnswers, setMockAnswers] = useState<Record<string, number>>({});
  const [mockFlagged, setMockFlagged] = useState<Record<string, boolean>>({});
  const [mockSecondsLeft, setMockSecondsLeft] = useState(0);
  const [mockDurationUsedSec, setMockDurationUsedSec] = useState(0);
  const [mockReviewFilter, setMockReviewFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  // Tab 5: Rubric Grader state
  const [rubricMode, setRubricMode] = useState<'writing' | 'speaking'>('writing');
  const [rubricTaskId, setRubricTaskId] = useState<string>('');
  const [customRubricPrompt, setCustomRubricPrompt] = useState<string>('');
  const [rubricDraftText, setRubricDraftText] = useState<string>('');
  const [offlineEvaluation, setOfflineEvaluation] = useState<OfflineRubricEvaluation | null>(null);
  const [aiEvaluation, setAiEvaluation] = useState<string | null>(null);
  const [aiGradingLoading, setAiGradingLoading] = useState(false);
  const [aiGradingError, setAiGradingError] = useState<string | null>(null);

  // Optional Voice Input for Speaking Rubric
  const [isRecordingSpeech, setIsRecordingSpeech] = useState(false);
  const [speechInterim, setSpeechInterim] = useState('');
  const [speechRecError, setSpeechRecError] = useState<string | null>(null);
  const stopMicRef = useRef<((abort?: boolean) => void) | null>(null);

  // Sync initialTab prop changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Sync initialPracticeSkill prop changes
  useEffect(() => {
    if (initialPracticeSkill) {
      setPracticeSkill(initialPracticeSkill);
    }
  }, [initialPracticeSkill]);

  // Sync initialRubricTask prop changes
  useEffect(() => {
    if (initialRubricTask) {
      setRubricMode(initialRubricTask.mode);
      if (initialRubricTask.taskId) {
        setRubricTaskId(initialRubricTask.taskId);
      }
      setOfflineEvaluation(null);
      setAiEvaluation(null);
      setAiGradingError(null);
    }
  }, [initialRubricTask?.mode, initialRubricTask?.taskId]);

  // Sync exam selection & diagnostic summary from examPreferences
  useEffect(() => {
    const syncPrefs = () => {
      const ex = getPreferredExam(profile);
      setSelectedExam(ex);
      setTargetScoreState(getExamTargetScore(ex, profile));
      setDiagSummary(getExamDiagnosticSummary(ex));
    };
    syncPrefs();
    window.addEventListener(EXAM_PREF_EVENT, syncPrefs);
    return () => window.removeEventListener(EXAM_PREF_EVENT, syncPrefs);
  }, [profile?.exam?.examType, profile?.exam?.targetScore, profile?.university?.graduationExam]);

  const handleSelectExam = (nextExam: ExamType) => {
    setSelectedExam(nextExam);
    setPreferredExam(nextExam);
    setTargetScoreState(getExamTargetScore(nextExam, profile));
    setDiagSummary(getExamDiagnosticSummary(nextExam));
  };

  const handleSelectTargetScore = (nextTarget: string) => {
    setTargetScoreState(nextTarget);
    setExamTargetScore(selectedExam, nextTarget);
  };

  // Cleanup speech synthesis & mic on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      stopMicRef.current?.(true);
    };
  }, []);

  const examData = EXAM_PREP_DATA[selectedExam];
  const availableMockTests = examData.mockTests && examData.mockTests.length > 0 ? examData.mockTests : [examData.mockTest];
  const activeMockTest = availableMockTests[mockTestIdx] || availableMockTests[0];
  const examMeta = getExamMeta(selectedExam);

  // Reset per-exam volatile sub-views when switching exam
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    stopMicRef.current?.(true);
    setIsRecordingSpeech(false);
    setStrategySkillFilter('ALL');
    setListeningIdx(0);
    setShowListeningTranscript(true);
    setShowListeningSummary(false);
    setShowListeningQuiz(false);
    setReadingIdx(0);
    setShowReadingSummary(false);
    setShowReadingQuiz(false);
    setWritingIdx(0);
    setShowWritingModel(false);
    setSpeakingIdx(0);
    setShowSpeakingSample(false);
    setSpeakingClockSec(null);

    // Reset mock test safely
    setMockTestIdx(0);
    setMockPhase('ready');
    setMockCurrentIdx(0);
    setMockAnswers({});
    setMockFlagged({});
    setMockSecondsLeft((EXAM_PREP_DATA[selectedExam].mockTests?.[0] || EXAM_PREP_DATA[selectedExam].mockTest).durationMinutes * 60);
    setMockDurationUsedSec(0);
    setMockReviewFilter('all');

    // Sync default rubric task
    const firstW = EXAM_PREP_DATA[selectedExam].skillPractice.writing[0];
    setRubricTaskId(firstW ? firstW.id : 'custom');
    setOfflineEvaluation(null);
    setAiEvaluation(null);
    setAiGradingError(null);
  }, [selectedExam]);

  // Speaking practice countdown effect
  useEffect(() => {
    if (speakingClockSec === null || speakingClockSec <= 0) return;
    const timer = setInterval(() => {
      setSpeakingClockSec((prev) => {
        if (prev === null || prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [speakingClockSec]);

  // Mock test countdown effect
  useEffect(() => {
    if (mockPhase !== 'running') return;
    const totalSec = activeMockTest.durationMinutes * 60;
    const timer = setInterval(() => {
      setMockSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setMockDurationUsedSec(totalSec);
          setMockPhase('submitted');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mockPhase, activeMockTest.durationMinutes]);

  const stopAllAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Profile Goal Summary
  const isUsersPrimaryExam =
    profile?.exam?.examType === selectedExam ||
    (!profile?.exam?.examType && profile?.university?.graduationExam === selectedExam);

  const activeTargetScore = targetScoreState || examMeta.defaultScore;

  const countdown = isUsersPrimaryExam ? computeDaysUntilExam(profile?.exam?.examDate) : null;

  const savedWordSet = useMemo(
    () => new Set(savedWords.map((w) => w.word.trim().toLowerCase())),
    [savedWords]
  );

  const handleSaveExamPhrase = (opts: {
    phrase: string;
    meaningVi: string;
    level?: CefrLevel;
    note?: string;
  }) => {
    if (!onSaveWord) return;
    onSaveWord(
      buildExamWordEntry({
        phrase: opts.phrase,
        meaningVi: opts.meaningVi,
        examType: selectedExam,
        level: opts.level,
        note: opts.note,
      })
    );
  };

  // Strategies filtered
  const availableStrategySkills = useMemo(() => {
    const set = new Set(examData.sections.map((s) => s.skill));
    return ['ALL', ...Array.from(set)];
  }, [examData.sections]);

  const filteredSections = useMemo(() => {
    if (strategySkillFilter === 'ALL') return examData.sections;
    return examData.sections.filter((s) => s.skill === strategySkillFilter);
  }, [examData.sections, strategySkillFilter]);

  // Practice current items (expanded with rich learning lessons from repo banks)
  const allListeningTracks = useMemo(
    () => getExpandedListeningLessons(selectedExam, examData.skillPractice.listening),
    [selectedExam, examData.skillPractice.listening]
  );
  const allReadingPassages = useMemo(
    () => getExpandedReadingLessons(selectedExam, examData.skillPractice.reading),
    [selectedExam, examData.skillPractice.reading]
  );
  const allWritingTasks = useMemo(
    () => getExpandedWritingLessons(selectedExam, examData.skillPractice.writing),
    [selectedExam, examData.skillPractice.writing]
  );
  const allSpeakingTasks = useMemo(
    () => getExpandedSpeakingLessons(selectedExam, examData.skillPractice.speaking),
    [selectedExam, examData.skillPractice.speaking]
  );

  const filterBySourceGroup = <T extends { sourceGroup?: 'exam-format' | 'foundation' }>(
    list: T[]
  ): T[] => {
    if (lessonSourceFilter === 'all') return list;
    return list.filter((it) => (it.sourceGroup || 'exam-format') === lessonSourceFilter);
  };

  const listeningTracks = useMemo(
    () => filterBySourceGroup(allListeningTracks),
    [allListeningTracks, lessonSourceFilter]
  );
  const readingPassages = useMemo(
    () => filterBySourceGroup(allReadingPassages),
    [allReadingPassages, lessonSourceFilter]
  );
  const writingTasks = useMemo(
    () => filterBySourceGroup(allWritingTasks),
    [allWritingTasks, lessonSourceFilter]
  );
  const speakingTasks = useMemo(
    () => filterBySourceGroup(allSpeakingTasks),
    [allSpeakingTasks, lessonSourceFilter]
  );

  const currentListening = listeningTracks[listeningIdx % Math.max(1, listeningTracks.length)];
  const currentReading = readingPassages[readingIdx % Math.max(1, readingPassages.length)];
  const currentWriting = writingTasks[writingIdx % Math.max(1, writingTasks.length)];
  const currentSpeaking = speakingTasks[speakingIdx % Math.max(1, speakingTasks.length)];

  const handleCheckListeningSet = () => {
    if (!currentListening) return;
    const alreadyChecked = listeningChecked[currentListening.id];
    setListeningChecked((prev) => ({ ...prev, [currentListening.id]: true }));
    if (!alreadyChecked) {
      onAddXp(20);
    }
  };

  const handleCheckReadingSet = () => {
    if (!currentReading) return;
    const alreadyChecked = readingChecked[currentReading.id];
    setReadingChecked((prev) => ({ ...prev, [currentReading.id]: true }));
    if (!alreadyChecked) {
      onAddXp(20);
    }
  };

  const jumpToRubricWithTask = (mode: 'writing' | 'speaking', taskId: string) => {
    if (hideHeaderNav && onNavigate) {
      onNavigate({ tab: 'practice', stepCode: 'rubric', sub: `${mode}:${taskId}` });
      return;
    }
    setRubricMode(mode);
    setRubricTaskId(taskId);
    setRubricDraftText('');
    setOfflineEvaluation(null);
    setAiEvaluation(null);
    setAiGradingError(null);
    setActiveTab('rubric');
  };

  const handleSourceFilterChange = (next: 'all' | 'exam-format' | 'foundation') => {
    setLessonSourceFilter(next);
    setListeningIdx(0);
    setReadingIdx(0);
    setWritingIdx(0);
    setSpeakingIdx(0);
  };

  // Mock Test handlers
  const mockQuestions = activeMockTest.questions;
  const safeMockIdx = Math.min(mockCurrentIdx, Math.max(0, mockQuestions.length - 1));
  const currentMockQ: ExamMcqQuestion | undefined = mockQuestions[safeMockIdx];

  const handleStartMockTest = () => {
    stopAllAudio();
    setMockAnswers({});
    setMockFlagged({});
    setMockCurrentIdx(0);
    setMockSecondsLeft(activeMockTest.durationMinutes * 60);
    setMockDurationUsedSec(0);
    setMockReviewFilter('all');
    setMockPhase('running');
  };

  const handleSubmitMockTest = () => {
    stopAllAudio();
    const totalSec = activeMockTest.durationMinutes * 60;
    setMockDurationUsedSec(Math.max(1, totalSec - mockSecondsLeft));
    setMockPhase('submitted');
    const correct = mockQuestions.reduce(
      (acc, q) => (mockAnswers[q.id] === q.correctIdx ? acc + 1 : acc),
      0
    );
    const scoreKey = `${selectedExam}-${mockTestIdx}`;
    setMockBestScores((prev) => {
      const existing = prev[scoreKey];
      const next =
        !existing || correct > existing.correct
          ? { ...prev, [scoreKey]: { correct, total: mockQuestions.length } }
          : prev;
      try {
        localStorage.setItem('myenglish_exam_mock_scores_v1', JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
    const accuracy = mockQuestions.length > 0 ? correct / mockQuestions.length : 0;
    onAddXp(accuracy >= 0.75 ? 50 : 35);
  };

  const mockSummary = useMemo(() => {
    const total = mockQuestions.length;
    const correct = mockQuestions.reduce(
      (acc, q) => (mockAnswers[q.id] === q.correctIdx ? acc + 1 : acc),
      0
    );
    const listeningQs = mockQuestions.filter((q) => q.skill === 'listening');
    const listeningCorrect = listeningQs.filter((q) => mockAnswers[q.id] === q.correctIdx).length;
    const readingQs = mockQuestions.filter((q) => q.skill !== 'listening');
    const readingCorrect = readingQs.filter((q) => mockAnswers[q.id] === q.correctIdx).length;

    return {
      total,
      correct,
      listeningTotal: listeningQs.length,
      listeningCorrect,
      readingTotal: readingQs.length,
      readingCorrect,
      estimation: estimateExamScore(selectedExam, correct, total),
    };
  }, [mockQuestions, mockAnswers, selectedExam]);

  // Rubric active task lookup
  const activeRubricWritingTask: ExamWritingTask | undefined = useMemo(
    () =>
      rubricMode === 'writing'
        ? allWritingTasks.find((t) => t.id === rubricTaskId) || allWritingTasks[0]
        : undefined,
    [rubricMode, rubricTaskId, allWritingTasks]
  );

  const activeRubricSpeakingTask: ExamSpeakingTask | undefined = useMemo(
    () =>
      rubricMode === 'speaking'
        ? allSpeakingTasks.find((t) => t.id === rubricTaskId) || allSpeakingTasks[0]
        : undefined,
    [rubricMode, rubricTaskId, allSpeakingTasks]
  );

  const isCustomRubricPrompt = rubricTaskId === 'custom';

  const currentRubricKeywords = useMemo(() => {
    if (isCustomRubricPrompt) return [];
    if (rubricMode === 'writing' && activeRubricWritingTask) {
      return activeRubricWritingTask.highBandKeywords.map((k) => k.phrase);
    }
    if (rubricMode === 'speaking' && activeRubricSpeakingTask) {
      return activeRubricSpeakingTask.highScoreVocab.map((k) => k.phrase);
    }
    return [];
  }, [isCustomRubricPrompt, rubricMode, activeRubricWritingTask, activeRubricSpeakingTask]);

  const currentRubricPromptText = useMemo(() => {
    if (isCustomRubricPrompt) {
      return customRubricPrompt.trim() || 'Custom exam topic / prompt provided by learner.';
    }
    if (rubricMode === 'writing' && activeRubricWritingTask) {
      return activeRubricWritingTask.prompt;
    }
    if (rubricMode === 'speaking' && activeRubricSpeakingTask) {
      const cues = activeRubricSpeakingTask.cuePoints?.length
        ? `\nCue points: ${activeRubricSpeakingTask.cuePoints.join('; ')}`
        : '';
      return `${activeRubricSpeakingTask.prompt}${cues}`;
    }
    return '';
  }, [isCustomRubricPrompt, customRubricPrompt, rubricMode, activeRubricWritingTask, activeRubricSpeakingTask]);

  const currentMinWords = useMemo(() => {
    if (isCustomRubricPrompt) return rubricMode === 'writing' ? 150 : 60;
    if (rubricMode === 'writing' && activeRubricWritingTask) {
      return activeRubricWritingTask.minWords;
    }
    return 65;
  }, [isCustomRubricPrompt, rubricMode, activeRubricWritingTask]);

  const handleSwitchRubricMode = (nextMode: 'writing' | 'speaking') => {
    setRubricMode(nextMode);
    if (nextMode === 'writing') {
      setRubricTaskId(writingTasks[0]?.id || 'custom');
    } else {
      setRubricTaskId(speakingTasks[0]?.id || 'custom');
    }
    setOfflineEvaluation(null);
    setAiEvaluation(null);
    setAiGradingError(null);
  };

  const handleGradeOffline = () => {
    if (!rubricDraftText.trim()) return;
    const result = evaluateOfflineByRubric(
      rubricDraftText,
      selectedExam,
      rubricMode,
      examData.rubricCriteria,
      currentMinWords,
      currentRubricKeywords
    );
    setOfflineEvaluation(result);
    onAddXp(20);
  };

  const handleGradeWithGemini = async () => {
    const key = (geminiApiKey || '').trim();
    if (!key) {
      setAiGradingError(
        'Tính năng AI chưa được Admin cấu hình Gemini API Key. Bạn hãy dùng nút "Chấm Offline Theo Rubric" miễn phí bên cạnh nhé!'
      );
      return;
    }
    if (!rubricDraftText.trim()) return;

    setAiGradingError(null);
    setAiGradingLoading(true);
    try {
      const relevantRubric = examData.rubricCriteria
        .filter((c) => c.appliesTo === rubricMode || c.appliesTo === 'both')
        .map((c) => `- ${c.name} (${c.weightText}): ${c.description}`)
        .join('\n');

      const prompt = `Bạn là giám khảo chấm thi chính thức của kỳ thi ${examData.title} (thang điểm: ${examData.scoreScale}).
Hãy chấm điểm và nhận xét chi tiết bằng TIẾNG VIỆT (giữ nguyên trích dẫn lỗi và bản sửa bằng tiếng Anh) cho bài làm ${
        rubricMode === 'writing' ? 'WRITING' : 'SPEAKING (transcript)'
      } sau đây.

ĐỀ BÀI:
${currentRubricPromptText}

TIÊU CHÍ RUBRIC CHÍNH THỨC CẦN CHẤM:
${relevantRubric}

BÀI LÀM CỦA THÍ SINH (${rubricDraftText.trim().split(/\s+/).filter(Boolean).length} từ):
"""
${rubricDraftText.trim()}
"""

Hãy trình bày ngắn gọn, rõ ràng theo 4 mục:
1. ĐIỂM ƯỚC LƯỢNG THEO TỪNG TIÊU CHÍ RUBRIC & TỔNG ĐIỂM (${examData.scoreScale})
2. ĐIỂM MẠNH ĐÁNG KHEN
3. LỖI CẦN SỬA (trích dẫn câu sai -> gợi ý sửa chuẩn)
4. PHIÊN BẢN NÂNG CẤP BAND/ĐIỂM CAO HƠN (viết lại mượt mà dựa trên chính ý của thí sinh).`;

      const reply = await callGeminiText(key, prompt);
      setAiEvaluation(reply);
      onAddXp(35);
    } catch (err: any) {
      setAiGradingError(
        `Lỗi kết nối Gemini AI: ${err?.message || 'Vui lòng dùng nút Chấm Offline Theo Rubric bên cạnh.'}`
      );
    } finally {
      setAiGradingLoading(false);
    }
  };

  const handleToggleSpeechInput = () => {
    if (isRecordingSpeech) {
      stopMicRef.current?.(false);
      return;
    }
    if (!isSpeechRecognitionSupported()) {
      setSpeechRecError('Trình duyệt của bạn không hỗ trợ thu âm Micro. Bạn có thể gõ hoặc dán câu trả lời trực tiếp.');
      return;
    }
    setSpeechRecError(null);
    setSpeechInterim('Đang lắng nghe câu trả lời Speaking của bạn...');
    setIsRecordingSpeech(true);

    stopMicRef.current = startSpeechRecognition(
      accent,
      (transcript) => {
        const cleaned = transcript.trim();
        if (cleaned) {
          setRubricDraftText((prev) => (prev.trim() ? `${prev.trim()} ${cleaned}` : cleaned));
        }
        setSpeechInterim('');
      },
      (errMsg) => {
        setSpeechRecError(errMsg);
        setSpeechInterim('');
      },
      () => {
        setIsRecordingSpeech(false);
        setSpeechInterim('');
        stopMicRef.current = null;
      },
      {
        continuous: true,
        maxDurationMs: 60000,
        onInterim: (interim) => setSpeechInterim(interim),
      }
    );
  };

  const draftWordCount = useMemo(
    () => rubricDraftText.trim().split(/\s+/).filter(Boolean).length,
    [rubricDraftText]
  );

  const currentTab: ExamCenterTab =
    hideHeaderNav && initialTab ? initialTab : activeTab;

  const tabsConfig: { id: ExamCenterTab; icon: string; label: string }[] = [
    { id: 'diagnostic', icon: '🗺️', label: 'Bản đồ đề & Tiêu chí' },
    { id: 'strategies', icon: '🧭', label: 'Chiến Thuật & Bẫy' },
    { id: 'practice', icon: '📝', label: 'Luyện 4 Kỹ Năng' },
    { id: 'mock', icon: '⏱️', label: 'Thi Thử Bấm Giờ' },
    { id: 'rubric', icon: '🤖', label: 'Chấm Rubric W&S' },
  ];

  return (
    <div className="space-y-4">
      {hideHeaderNav ? (
        !hideExamBar && (
          /* Clean Mobile-First Exam Profile Bar (all learners can switch exam & target) */
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-wrap">
              <img
                src={EXAM_IMAGE_MAP[selectedExam] || '/img/art/exam-ielts.webp'}
                alt={examData.title}
                className="w-8 h-8 rounded-lg bg-slate-50 p-0.5 object-contain shrink-0"
              />
              <select
                value={selectedExam}
                onChange={(e) => handleSelectExam(e.target.value as ExamType)}
                aria-label="Chọn kỳ thi chứng chỉ"
                className="min-h-[40px] px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs sm:text-sm font-extrabold text-rose-700 dark:text-rose-300 outline-none cursor-pointer"
              >
                {EXAM_ORDER.map((exId) => (
                  <option key={exId} value={exId}>
                    {getExamMeta(exId).shortLabel}
                  </option>
                ))}
              </select>

              <select
                value={activeTargetScore}
                onChange={(e) => handleSelectTargetScore(e.target.value)}
                aria-label="Chọn mục tiêu điểm"
                className="min-h-[38px] px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
              >
                {Array.from(
                  new Set([activeTargetScore, ...(EXAM_TARGET_PRESETS[selectedExam] || [])])
                ).map((sc) => (
                  <option key={sc} value={sc}>
                    Mục tiêu {sc}
                  </option>
                ))}
              </select>
            </div>

            {currentTab === 'diagnostic' && (
              <div className="flex items-center gap-2 flex-wrap">
                {diagSummary && (
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold">
                    Chẩn đoán: {diagSummary.estimatedScore} ({diagSummary.cefr})
                  </span>
                )}
                {countdown && (
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {countdown.daysLeft >= 0 ? `Còn ${countdown.daysLeft} ngày` : countdown.formattedDate}
                  </span>
                )}
              </div>
            )}
          </div>
        )
      ) : (
      <>
      {/* Top Hero & Target Goal Banner */}
      <div className="bg-gradient-to-br from-rose-600 via-pink-600 to-indigo-700 text-white rounded-3xl p-5 sm:p-6 shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-[11px] font-extrabold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Trung Tâm Luyện Thi 5 Chứng Chỉ Quốc Tế & VSTEP
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2.5">
              <img
                src={EXAM_IMAGE_MAP[selectedExam] || '/img/art/exam-ielts.webp'}
                alt={examData.title}
                className="w-10 h-10 rounded-xl bg-white p-1 object-contain shadow-sm shrink-0"
              />
              <span>{examData.title}</span>
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">{examData.subtitle}</p>
          </div>

          {/* Goal + Countdown Widget */}
          <div className="flex flex-wrap sm:flex-col items-stretch sm:items-end gap-2">
            <div className="px-3.5 py-2 rounded-2xl bg-white/15 backdrop-blur border border-white/20 flex items-center gap-2.5">
              <Target className="w-4 h-4 text-amber-300 shrink-0" />
              <div className="text-left sm:text-right">
                <div className="text-[10px] uppercase font-bold text-rose-100">
                  {isUsersPrimaryExam ? 'Mục tiêu của bạn' : 'Mục tiêu tham khảo'}
                </div>
                <div className="text-sm font-black text-white">
                  {activeTargetScore}
                  {selectedExam === 'cambridge' && isUsersPrimaryExam && profile?.exam?.cambridgeLevel
                    ? ` (${profile.exam.cambridgeLevel.toUpperCase()})`
                    : ''}
                </div>
              </div>
            </div>

            {countdown && (
              <div className="px-3.5 py-2 rounded-2xl bg-slate-950/35 border border-white/15 flex items-center gap-2 text-xs font-bold">
                <Calendar className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>
                  {countdown.daysLeft > 0
                    ? `Còn ${countdown.daysLeft} ngày (${countdown.formattedDate})`
                    : countdown.daysLeft === 0
                    ? `Hôm nay thi! (${countdown.formattedDate})`
                    : `Đã qua ${Math.abs(countdown.daysLeft)} ngày (${countdown.formattedDate})`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Exam Switcher Bar (Admin sees all 5 exams; regular learner sees ONLY their registered exam) */}
        {allowAllOptions && (
          <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap gap-2">
            {EXAM_ORDER.map((exId) => {
              const meta = getExamMeta(exId);
              const active = selectedExam === exId;
              const isProfileTarget =
                profile?.exam?.examType === exId || profile?.university?.graduationExam === exId;
              return (
                <button
                  key={exId}
                  type="button"
                  onClick={() => setSelectedExam(exId)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 border ${
                    active
                      ? 'bg-white text-rose-700 border-white shadow-md'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <img
                    src={EXAM_IMAGE_MAP[exId] || '/img/art/exam-ielts.webp'}
                    alt={meta.shortLabel}
                    className="w-5 h-5 rounded-md bg-white p-0.5 object-contain shrink-0"
                  />
                  <span>{meta.shortLabel}</span>
                  {isProfileTarget && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        active ? 'bg-rose-100 text-rose-700' : 'bg-amber-400 text-slate-900'
                      }`}
                    >
                      Mục tiêu
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Original Content Disclaimer */}
      <div className="px-4 py-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
        <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
        <span>{examData.disclaimerNote}</span>
      </div>

      {/* 5 Main Functional Tabs */}
      <div className="flex flex-wrap gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
        {tabsConfig.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                active
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      </>
      )}

      {/* ================= TAB 1: EXAM BLUEPRINT, CEFR & RUBRIC CRITERIA (E1) ================= */}
      {currentTab === 'diagnostic' && (
        <div className="space-y-4">
          {/* Compact Overview Strip + Section Switch */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>
                  ⏱️ <strong className="text-slate-900 dark:text-white">{examData.totalDurationText}</strong>
                </span>
                <span>
                  📊 <strong className="text-slate-900 dark:text-white">{examData.scoreScale}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  onNavigate
                    ? onNavigate({ tab: 'learn', stepCode: 'E3' })
                    : setActiveTab('practice')
                }
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-extrabold inline-flex items-center gap-1 shrink-0"
              >
                Vào học 4 kỹ năng (E3) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              {(
                [
                  { id: 'blueprint', label: `Cấu trúc đề (${examData.sections.length} phần)` },
                  { id: 'scoring', label: 'Thang điểm CEFR & Tiêu chí chấm' },
                ] as const
              ).map((tb) => (
                <button
                  key={tb.id}
                  type="button"
                  onClick={() => setE1Section(tb.id)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition ${
                    e1Section === tb.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {tb.label}
                </button>
              ))}
            </div>
          </div>

          {e1Section === 'blueprint' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-rose-600" />
              Sơ đồ cấu trúc đề thi {examMeta.shortLabel}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {examData.sections.map((sec) => {
                const skillSlug = sec.skill.toLowerCase();
                const isFourSkill =
                  skillSlug === 'listening' ||
                  skillSlug === 'reading' ||
                  skillSlug === 'writing' ||
                  skillSlug === 'speaking';
                return (
                  <div
                    key={sec.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-extrabold">
                          {sec.skill}
                        </span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          ⏱️ {sec.duration}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                        {sec.partName}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                        {sec.tasksOrQuestions}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/70 dark:border-slate-700/70">
                      {isFourSkill ? (
                        <button
                          type="button"
                          onClick={() => {
                            const sk = skillSlug as PracticeSkill;
                            setPracticeSkill(sk);
                            if (onNavigate) {
                              onNavigate({ tab: 'learn', stepCode: 'E3', sub: sk });
                            } else {
                              setActiveTab('practice');
                            }
                          }}
                          className="min-h-[36px] px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-xs font-extrabold text-indigo-700 dark:text-indigo-300"
                        >
                          Bài học {sec.skill} →
                        </button>
                      ) : (
                        onNavigate && (
                          <button
                            type="button"
                            onClick={() =>
                              onNavigate({ tab: 'learn', stepCode: 'E6', sub: 'grammar' })
                            }
                            className="min-h-[36px] px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-xs font-extrabold text-indigo-700 dark:text-indigo-300"
                          >
                            Ngữ pháp trọng tâm →
                          </button>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          )}

          {e1Section === 'scoring' && (
          <>
          {/* CEFR Equivalence Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Bảng Quy Đổi Điểm {examMeta.shortLabel} Sang Khung CEFR (A2 – C1)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {examData.cefrMapping.map((row) => (
                <div
                  key={row.cefr}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-xs font-black">
                      {row.cefr}
                    </span>
                    <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">
                      {row.scoreRange}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                    {row.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Rubric Reference Guide (Learn what examiners grade) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Tiêu chí giám khảo chấm điểm ({examMeta.shortLabel})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Hiểu rõ cách tính điểm Writing & Speaking để luyện đúng trọng tâm.
                </p>
              </div>
              <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 gap-1">
                {(
                  [
                    { id: 'writing', label: 'Writing' },
                    { id: 'speaking', label: 'Speaking' },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setRubricFilterTab(t.id)}
                    className={`min-h-[34px] px-3 py-1 rounded-lg text-xs font-extrabold transition ${
                      rubricFilterTab === t.id
                        ? 'bg-white dark:bg-slate-900 text-rose-600 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {examData.rubricCriteria
                .filter((c) => c.appliesTo === rubricFilterTab || c.appliesTo === 'both')
                .map((crit) => (
                  <div
                    key={crit.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-black text-slate-900 dark:text-white">
                          {crit.name}
                        </div>
                        <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          {crit.nameVi}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-extrabold">
                        {crit.weightText}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {crit.description}
                    </p>
                    <ul className="space-y-1 text-xs text-emerald-700 dark:text-emerald-300 list-disc pl-4">
                      {crit.highScoreBenchmarks.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
          </>
          )}

          {/* Compact link to Diagnostic Test inside Bài tập */}
          <div className="px-4 py-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {diagSummary
                ? `Band chẩn đoán gần nhất: ${diagSummary.estimatedScore} (${diagSummary.cefr}) · Đúng ${diagSummary.accuracyPercent}%`
                : `Muốn đo trình độ ${examMeta.shortLabel} hiện tại? Làm Test Chẩn đoán ${examData.diagnosticQuestions.length} câu bên Bài tập.`}
            </span>
            <button
              type="button"
              onClick={() =>
                onNavigate
                  ? onNavigate({ tab: 'practice', stepCode: 'diagnostic' })
                  : setActiveTab('mock')
              }
              className="min-h-[36px] px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shrink-0"
            >
              {diagSummary ? 'Làm lại Test chẩn đoán' : 'Làm Test chẩn đoán →'}
            </button>
          </div>
        </div>
      )}

      {/* ================= TAB 2: STRATEGIES & TRAPS (E2) ================= */}
      {currentTab === 'strategies' && (
        <div className="space-y-5">
          {/* Skill Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {availableStrategySkills.map((sk) => (
              <button
                key={sk}
                type="button"
                onClick={() => setStrategySkillFilter(sk)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                  strategySkillFilter === sk
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                {sk === 'ALL' ? 'Tất cả phần thi' : sk}
              </button>
            ))}
          </div>

          {/* Section Strategy Cards */}
          <div className="space-y-4">
            {filteredSections.map((sec) => {
              const skLower = sec.skill.toLowerCase();
              const isFourSkill =
                skLower === 'listening' ||
                skLower === 'reading' ||
                skLower === 'writing' ||
                skLower === 'speaking';
              const practiceStepSub =
                skLower === 'listening' || skLower === 'reading'
                  ? skLower
                  : skLower === 'use of english'
                  ? 'grammar'
                  : undefined;

              return (
                <div
                  key={sec.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-extrabold uppercase">
                        {sec.skill}
                      </span>
                      <h4 className="text-base font-black text-slate-900 dark:text-white mt-1">
                        {sec.partName}
                      </h4>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 text-left sm:text-right">
                      <div className="font-bold text-slate-700 dark:text-slate-200">⏱️ {sec.duration}</div>
                      <div>{sec.tasksOrQuestions}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-2.5">
                      <div className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Quy trình & Chiến thuật làm bài
                      </div>
                      <ol className="space-y-2 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                        {sec.strategies.map((st, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[11px] font-black shrink-0 mt-0.5">
                              B{i + 1}
                            </span>
                            <span>{st}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-2.5">
                      <div className="text-xs font-extrabold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4" /> Bẫy thường gặp & Cách né
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200 leading-relaxed list-disc pl-4">
                        {sec.commonTraps.map((trap, i) => (
                          <li key={i}>{trap}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Direct Action Bar: Apply immediately */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Áp dụng ngay chiến thuật phần {sec.skill}:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {isFourSkill && (
                        <button
                          type="button"
                          onClick={() => {
                            const sk = skLower as PracticeSkill;
                            setPracticeSkill(sk);
                            if (onNavigate) {
                              onNavigate({ tab: 'learn', stepCode: 'E3', sub: sk });
                            } else {
                              setActiveTab('practice');
                            }
                          }}
                          className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold inline-flex items-center gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5" /> Học bài mẫu {sec.skill} (E3)
                        </button>
                      )}
                      {onNavigate && (
                        <button
                          type="button"
                          onClick={() => {
                            if (skLower === 'writing' || skLower === 'speaking') {
                              onNavigate({ tab: 'practice', stepCode: 'rubric', sub: skLower });
                            } else if (practiceStepSub === 'grammar') {
                              onNavigate({ tab: 'practice', stepCode: 'skills', sub: 'grammar' });
                            } else {
                              onNavigate({
                                tab: 'practice',
                                stepCode: 'skills',
                                sub: practiceStepSub,
                              });
                            }
                          }}
                          className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-extrabold inline-flex items-center gap-1.5"
                        >
                          <span>
                            {skLower === 'writing' || skLower === 'speaking'
                              ? `Thực hành & Chấm Rubric ${sec.skill} →`
                              : 'Làm bài tập áp dụng →'}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 3: 4-SKILL PRACTICE ================= */}
      {currentTab === 'practice' && (
        <div className="space-y-4">
          {/* Single sleek 4-Skill Sub-Tab Row */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
            {(
              [
                { id: 'listening', label: `Listening (${listeningTracks.length})`, icon: Headphones },
                { id: 'reading', label: `Reading (${readingPassages.length})`, icon: BookOpen },
                { id: 'writing', label: `Writing (${writingTasks.length})`, icon: PenTool },
                { id: 'speaking', label: `Speaking (${speakingTasks.length})`, icon: Mic },
              ] as const
            ).map((sk) => {
              const Icon = sk.icon;
              const active = practiceSkill === sk.id;
              return (
                <button
                  key={sk.id}
                  type="button"
                  onClick={() => setPracticeSkill(sk.id)}
                  className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-extrabold border inline-flex items-center gap-1.5 shrink-0 transition ${
                    active
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{sk.label}</span>
                </button>
              );
            })}
          </div>

          {/* 3A: LISTENING */}
          {practiceSkill === 'listening' && currentListening && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-4">
              <SkillLessonPicker
                items={listeningTracks.map((tr) => ({
                  id: tr.id,
                  title: tr.title,
                  tag: `${tr.partLabel} · ${tr.level}`,
                }))}
                activeIdx={listeningIdx}
                onSelect={(idx) => {
                  stopAllAudio();
                  setListeningIdx(idx);
                  setShowListeningQuiz(false);
                }}
                unitLabel="bài nghe"
                sourceFilter={lessonSourceFilter}
                onSourceFilterChange={handleSourceFilterChange}
                examShortLabel={examMeta.shortLabel}
              />

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    {currentListening.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {currentListening.speakerContext}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => speakText(currentListening.audioScript, accent, ttsRate)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold inline-flex items-center gap-1.5"
                  >
                    <Play className="w-4 h-4" /> Phát Audio ({accent === 'en-GB' ? 'UK' : 'US'} • {ttsRate}x)
                  </button>
                  <button
                    type="button"
                    onClick={stopAllAudio}
                    className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold inline-flex items-center gap-1"
                  >
                    <Square className="w-3.5 h-3.5" /> Dừng
                  </button>

                  <div className="flex items-center gap-1 ml-auto">
                    {[0.75, 0.85, 1.0, 1.15].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setTtsRate(r)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold border ${
                          ttsRate === r
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {r}x
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setShowListeningTranscript((v) => !v)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs font-bold inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200"
                  >
                    {showListeningTranscript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showListeningTranscript ? 'Ẩn Transcript' : 'Hiện Transcript'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowListeningSummary((v) => !v)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200"
                  >
                    {showListeningSummary ? 'Ẩn tóm tắt tiếng Việt' : 'Xem tóm tắt tiếng Việt'}
                  </button>
                </div>

                {showListeningTranscript && (
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    <div className="text-[11px] font-extrabold uppercase text-indigo-600 mb-1">Transcript</div>
                    {currentListening.audioScript}
                  </div>
                )}

                {showListeningSummary && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                    <strong>Bản dịch / Tóm tắt:</strong> {currentListening.viSummary}
                  </div>
                )}

                {currentListening.keyPhrases && currentListening.keyPhrases.length > 0 && (
                  <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80 space-y-2">
                    <div className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
                      💎 Cụm từ cần học trong bài (bấm loa nghe hoặc lưu SRS):
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentListening.keyPhrases.map((kp, ki) => {
                        const saved = savedWordSet.has(kp.en.trim().toLowerCase());
                        return (
                          <div
                            key={ki}
                            className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs inline-flex items-center gap-2"
                          >
                            <button
                              type="button"
                              onClick={() => speakText(kp.en, accent, 0.9)}
                              className="inline-flex items-center gap-1.5 text-left hover:text-indigo-600 transition"
                            >
                              <Volume2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                              <span>
                                <strong className="text-slate-900 dark:text-white">{kp.en}</strong>
                                <span className="text-slate-500 dark:text-slate-400"> — {kp.vi}</span>
                              </span>
                            </button>
                            {onSaveWord && (
                              <button
                                type="button"
                                disabled={saved}
                                onClick={() =>
                                  handleSaveExamPhrase({
                                    phrase: kp.en,
                                    meaningVi: kp.vi,
                                    level: currentListening.level,
                                    note: currentListening.title,
                                  })
                                }
                                title={saved ? 'Đã lưu vào Sổ từ SRS' : 'Lưu vào Sổ từ SRS'}
                                className={`px-2 py-0.5 rounded-lg text-[11px] font-extrabold inline-flex items-center gap-1 shrink-0 ${
                                  saved
                                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
                                }`}
                              >
                                {saved ? (
                                  <>
                                    <BookmarkCheck className="w-3 h-3" /> Đã lưu
                                  </>
                                ) : (
                                  <>
                                    <BookmarkPlus className="w-3 h-3" /> Lưu
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Optional quick comprehension check (collapsed by default so learner focuses on learning) */}
              {currentListening.questions.length > 0 && (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setShowListeningQuiz((v) => !v)}
                    className="min-h-[42px] px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold inline-flex items-center gap-2"
                  >
                    <ListChecks className="w-4 h-4" />
                    <span>
                      {showListeningQuiz
                        ? 'Ẩn câu hỏi kiểm tra hiểu bài'
                        : `Kiểm tra nhanh đã hiểu bài (${currentListening.questions.length} câu)`}
                    </span>
                  </button>

                  {showListeningQuiz && (
              <div className="space-y-4">
                {currentListening.questions.map((q, qIdx) => {
                  const chosen = listeningAnswers[q.id];
                  const checked = Boolean(listeningChecked[currentListening.id]);
                  const isRight = chosen === q.correctIdx;

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5"
                    >
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        Câu {qIdx + 1}: {q.question}
                      </div>
                      <div className="space-y-1.5">
                        {q.options.map((opt, optIdx) => {
                          const picked = chosen === optIdx;
                          const rightOpt = q.correctIdx === optIdx;
                          let cls =
                            'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200';
                          if (!checked && picked) {
                            cls = 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200';
                          } else if (checked) {
                            if (rightOpt) {
                              cls = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200';
                            } else if (picked) {
                              cls = 'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                            }
                          }
                          return (
                            <button
                              key={optIdx}
                              type="button"
                              disabled={checked}
                              onClick={() =>
                                setListeningAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                              }
                              className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold transition flex items-center gap-2 ${cls}`}
                            >
                              <span className="font-black">{String.fromCharCode(65 + optIdx)}.</span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                      {checked && (
                        <div
                          className={`p-2.5 rounded-lg text-xs ${
                            isRight
                              ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200'
                              : 'bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200'
                          }`}
                        >
                          <strong>{isRight ? '✅ Chính xác:' : '❌ Chưa đúng:'}</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCheckListeningSet}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold"
                  >
                    {listeningChecked[currentListening.id]
                      ? 'Đã kiểm tra đáp án (+20 XP)'
                      : 'Kiểm tra đáp án & Xem giải thích'}
                  </button>
                </div>
              </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 3B: READING */}
          {practiceSkill === 'reading' && currentReading && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-4">
              <SkillLessonPicker
                items={readingPassages.map((rd) => ({
                  id: rd.id,
                  title: rd.title,
                  tag: `${rd.partLabel} · ${rd.level}`,
                }))}
                activeIdx={readingIdx}
                onSelect={(idx) => {
                  setReadingIdx(idx);
                  setShowReadingQuiz(false);
                }}
                unitLabel="bài đọc"
                sourceFilter={lessonSourceFilter}
                onSourceFilterChange={handleSourceFilterChange}
                examShortLabel={examMeta.shortLabel}
              />

              <div className="space-y-4">
                {/* Passage & Key Vocab Learning Area */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-black text-slate-900 dark:text-white">
                      {currentReading.title}
                    </h4>
                    <button
                      type="button"
                      onClick={() => speakText(currentReading.passage, accent, ttsRate)}
                      className="min-h-[38px] px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-indigo-600 text-xs font-extrabold inline-flex items-center gap-1.5 shrink-0 hover:bg-indigo-50"
                      title="Đọc to đoạn văn"
                    >
                      <Volume2 className="w-4 h-4" /> Nghe đọc
                    </button>
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                    {currentReading.passage}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowReadingSummary((v) => !v)}
                    className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 underline"
                  >
                    {showReadingSummary ? 'Ẩn bản dịch / tóm tắt tiếng Việt' : 'Xem bản dịch / tóm tắt tiếng Việt'}
                  </button>
                  {showReadingSummary && (
                    <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                      {currentReading.viSummary}
                    </div>
                  )}

                  {currentReading.keyPhrases && currentReading.keyPhrases.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80 space-y-2">
                      <div className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
                        💎 Từ khóa & Thuật ngữ cần học (bấm loa nghe hoặc lưu SRS):
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentReading.keyPhrases.map((kp, ki) => {
                          const saved = savedWordSet.has(kp.en.trim().toLowerCase());
                          return (
                            <div
                              key={ki}
                              className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs inline-flex items-center gap-2"
                            >
                              <button
                                type="button"
                                onClick={() => speakText(kp.en, accent, 0.9)}
                                className="inline-flex items-center gap-1.5 text-left hover:text-indigo-600 transition"
                              >
                                <Volume2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                                <span>
                                  <strong className="text-slate-900 dark:text-white">{kp.en}</strong>
                                  {kp.vi !== 'Thuật ngữ trọng tâm' && (
                                    <span className="text-slate-500 dark:text-slate-400"> — {kp.vi}</span>
                                  )}
                                </span>
                              </button>
                              {onSaveWord && (
                                <button
                                  type="button"
                                  disabled={saved}
                                  onClick={() =>
                                    handleSaveExamPhrase({
                                      phrase: kp.en,
                                      meaningVi: kp.vi,
                                      level: currentReading.level,
                                      note: currentReading.title,
                                    })
                                  }
                                  title={saved ? 'Đã lưu vào Sổ từ SRS' : 'Lưu vào Sổ từ SRS'}
                                  className={`px-2 py-0.5 rounded-lg text-[11px] font-extrabold inline-flex items-center gap-1 shrink-0 ${
                                    saved
                                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
                                  }`}
                                >
                                  {saved ? (
                                    <>
                                      <BookmarkCheck className="w-3 h-3" /> Đã lưu
                                    </>
                                  ) : (
                                    <>
                                      <BookmarkPlus className="w-3 h-3" /> Lưu
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Collapsible Comprehension Check */}
                {currentReading.questions.length > 0 && (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setShowReadingQuiz((v) => !v)}
                      className="min-h-[42px] px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold inline-flex items-center gap-2"
                    >
                      <ListChecks className="w-4 h-4" />
                      <span>
                        {showReadingQuiz
                          ? 'Ẩn câu hỏi kiểm tra hiểu bài'
                          : `Kiểm tra nhanh đã hiểu bài (${currentReading.questions.length} câu)`}
                      </span>
                    </button>

                    {showReadingQuiz && (
                <div className="space-y-4">
                  {currentReading.questions.map((q, qIdx) => {
                    const chosen = readingAnswers[q.id];
                    const checked = Boolean(readingChecked[currentReading.id]);
                    const isRight = chosen === q.correctIdx;

                    return (
                      <div
                        key={q.id}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {q.questionType}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          Câu {qIdx + 1}: {q.question}
                        </div>
                        <div className="space-y-1.5">
                          {q.options.map((opt, optIdx) => {
                            const picked = chosen === optIdx;
                            const rightOpt = q.correctIdx === optIdx;
                            let cls =
                              'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200';
                            if (!checked && picked) {
                              cls = 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200';
                            } else if (checked) {
                              if (rightOpt) {
                                cls = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200';
                              } else if (picked) {
                                cls = 'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                              }
                            }
                            return (
                              <button
                                key={optIdx}
                                type="button"
                                disabled={checked}
                                onClick={() =>
                                  setReadingAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                                }
                                className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold transition flex items-start gap-2 ${cls}`}
                              >
                                <span className="font-black">{String.fromCharCode(65 + optIdx)}.</span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                        {checked && (
                          <div
                            className={`p-2.5 rounded-lg text-xs ${
                              isRight
                                ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200'
                                : 'bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200'
                            }`}
                          >
                            <strong>{isRight ? '✅ Chính xác:' : '❌ Chưa đúng:'}</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={handleCheckReadingSet}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold"
                  >
                    {readingChecked[currentReading.id]
                      ? 'Đã kiểm tra đáp án (+20 XP)'
                      : 'Kiểm tra đáp án & Xem giải thích'}
                  </button>
                </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3C: WRITING */}
          {practiceSkill === 'writing' && currentWriting && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-4">
              <SkillLessonPicker
                items={writingTasks.map((wt) => ({
                  id: wt.id,
                  title: wt.title,
                  tag: wt.taskLabel,
                }))}
                activeIdx={writingIdx}
                onSelect={(idx) => {
                  setWritingIdx(idx);
                  setShowWritingModel(false);
                }}
                unitLabel="bài viết"
                sourceFilter={lessonSourceFilter}
                onSourceFilterChange={handleSourceFilterChange}
                examShortLabel={examMeta.shortLabel}
              />
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span>⏱️ {currentWriting.recommendedMinutes} phút</span>
                <span>•</span>
                <span>📝 {currentWriting.wordCountRange}</span>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2">
                <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  {currentWriting.title}
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 whitespace-pre-line leading-relaxed">
                  {currentWriting.prompt}
                </p>
                <p className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">
                  💡 Yêu cầu tiếng Việt: {currentWriting.promptVi}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Outline + Criteria */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="text-xs font-extrabold uppercase text-slate-700 dark:text-slate-200">
                    📋 Dàn ý gợi ý (Outline)
                  </div>
                  <ol className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-decimal pl-4 leading-relaxed">
                    {currentWriting.outline.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-xs font-extrabold uppercase text-rose-600 dark:text-rose-400 mb-1">
                      🎯 Trọng tâm tiêu chí chấm
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 list-disc pl-4">
                      {currentWriting.scoringCriteriaFocus.map((cr, i) => (
                        <li key={i}>{cr}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* High-band Keywords */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2.5">
                  <div className="text-xs font-extrabold uppercase text-emerald-700 dark:text-emerald-300">
                    💎 Từ khóa & Cụm ăn điểm cao (Bấm loa để nghe)
                  </div>
                  <div className="space-y-2">
                    {currentWriting.highBandKeywords.map((kw, i) => {
                      const saved = savedWordSet.has(kw.phrase.trim().toLowerCase());
                      return (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-extrabold text-indigo-700 dark:text-indigo-300">
                              {kw.phrase}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-300">
                              {kw.meaningVi}
                            </div>
                            {kw.usageTip && (
                              <div className="text-xs text-slate-400 italic mt-0.5">{kw.usageTip}</div>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => speakText(kw.phrase, accent, 0.9)}
                              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600"
                              title="Nghe phát âm"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            {onSaveWord && (
                              <button
                                type="button"
                                disabled={saved}
                                onClick={() =>
                                  handleSaveExamPhrase({
                                    phrase: kw.phrase,
                                    meaningVi: kw.meaningVi,
                                    level: 'B2',
                                    note: kw.usageTip || currentWriting.title,
                                  })
                                }
                                className={`px-2 py-1 rounded-lg text-[11px] font-extrabold inline-flex items-center gap-1 ${
                                  saved
                                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
                                }`}
                              >
                                {saved ? <BookmarkCheck className="w-3 h-3" /> : <BookmarkPlus className="w-3 h-3" />}
                                <span>{saved ? 'Đã lưu' : 'Lưu'}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Model Answer & Action */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowWritingModel((v) => !v)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-extrabold inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200"
                >
                  {showWritingModel ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showWritingModel ? 'Ẩn bài mẫu band cao' : 'Xem bài mẫu band cao & Giải thích'}
                </button>

                <button
                  type="button"
                  onClick={() => jumpToRubricWithTask('writing', currentWriting.id)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold inline-flex items-center gap-1.5"
                >
                  <Bot className="w-4 h-4" /> Viết bài này & Chấm theo Rubric →
                </button>
              </div>

              {showWritingModel && (
                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-emerald-800 dark:text-emerald-300">
                      Bài mẫu tham khảo
                    </span>
                    <button
                      type="button"
                      onClick={() => speakText(currentWriting.modelAnswer, accent, ttsRate)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold inline-flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe đọc mẫu
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 whitespace-pre-line leading-relaxed">
                    {currentWriting.modelAnswer}
                  </p>
                  <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/70 text-xs text-slate-600 dark:text-slate-300">
                    <strong>Phân tích điểm mạnh:</strong> {currentWriting.modelNotesVi}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3D: SPEAKING */}
          {practiceSkill === 'speaking' && currentSpeaking && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-4">
              <SkillLessonPicker
                items={speakingTasks.map((sp) => ({
                  id: sp.id,
                  title: sp.title,
                  tag: sp.partLabel,
                }))}
                activeIdx={speakingIdx}
                onSelect={(idx) => {
                  stopAllAudio();
                  setSpeakingIdx(idx);
                  setShowSpeakingSample(false);
                  setSpeakingClockSec(null);
                }}
                unitLabel="bài nói"
                sourceFilter={lessonSourceFilter}
                onSourceFilterChange={handleSourceFilterChange}
                examShortLabel={examMeta.shortLabel}
              />
              <div className="text-xs font-bold text-slate-500">
                Chuẩn bị: {currentSpeaking.prepTimeText} • Nói: {currentSpeaking.speakTimeText}
              </div>

              {/* Prompt + Cue Card */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2.5">
                <div className="text-base font-black text-slate-900 dark:text-white">
                  {currentSpeaking.title}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 whitespace-pre-line leading-relaxed">
                  {currentSpeaking.prompt}
                </p>
                {currentSpeaking.cuePoints && currentSpeaking.cuePoints.length > 0 && (
                  <ul className="pl-5 list-disc text-xs text-slate-700 dark:text-slate-200 space-y-1">
                    {currentSpeaking.cuePoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                )}
                <p className="text-xs text-indigo-700 dark:text-indigo-300">
                  💡 Hướng dẫn: {currentSpeaking.promptVi}
                </p>
              </div>

              {/* Mini Speaking Pacing Timer */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <Timer className="w-4 h-4 text-rose-600" />
                  <span>Đồng hồ bấm giờ tập nói:</span>
                  {speakingClockSec !== null && (
                    <span
                      className={`px-2.5 py-0.5 rounded-lg font-mono text-sm font-black ${
                        speakingClockSec === 0
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-900 dark:bg-slate-700 text-white'
                      }`}
                    >
                      {speakingClockLabel}: {formatClock(speakingClockSec)}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Chuẩn bị 15s', sec: 15 },
                    { label: 'Chuẩn bị 60s', sec: 60 },
                    { label: 'Nói 45s', sec: 45 },
                    { label: 'Nói 60s', sec: 60 },
                    { label: 'Nói 2 phút', sec: 120 },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      type="button"
                      onClick={() => {
                        setSpeakingClockLabel(btn.label);
                        setSpeakingClockSec(btn.sec);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-bold hover:border-rose-400"
                    >
                      {btn.label}
                    </button>
                  ))}
                  {speakingClockSec !== null && (
                    <button
                      type="button"
                      onClick={() => setSpeakingClockSec(null)}
                      className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-[11px] font-bold"
                    >
                      Tắt
                    </button>
                  )}
                </div>
              </div>

              {/* High Score Vocab & Delivery Tips */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="text-xs font-extrabold uppercase text-emerald-700 dark:text-emerald-300">
                    💎 Từ vựng & Cụm ăn điểm Speaking
                  </div>
                  <div className="space-y-2">
                    {currentSpeaking.highScoreVocab.map((v, i) => {
                      const saved = savedWordSet.has(v.phrase.trim().toLowerCase());
                      return (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-extrabold text-indigo-700 dark:text-indigo-300">
                              {v.phrase}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-300">{v.meaningVi}</div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => speakText(v.phrase, accent, 0.9)}
                              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600"
                              title="Nghe phát âm"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            {onSaveWord && (
                              <button
                                type="button"
                                disabled={saved}
                                onClick={() =>
                                  handleSaveExamPhrase({
                                    phrase: v.phrase,
                                    meaningVi: v.meaningVi,
                                    level: 'B2',
                                    note: currentSpeaking.title,
                                  })
                                }
                                className={`px-2 py-1 rounded-lg text-[11px] font-extrabold inline-flex items-center gap-1 ${
                                  saved
                                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
                                }`}
                              >
                                {saved ? <BookmarkCheck className="w-3 h-3" /> : <BookmarkPlus className="w-3 h-3" />}
                                <span>{saved ? 'Đã lưu' : 'Lưu'}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="text-xs font-extrabold uppercase text-amber-700 dark:text-amber-300">
                    🎙️ Mẹo triển khai & Ngữ điệu
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc pl-4 leading-relaxed">
                    {currentSpeaking.deliveryTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowSpeakingSample((v) => !v)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-extrabold inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200"
                >
                  {showSpeakingSample ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showSpeakingSample ? 'Ẩn câu trả lời mẫu' : 'Xem & Nghe câu trả lời mẫu'}
                </button>

                <button
                  type="button"
                  onClick={() => jumpToRubricWithTask('speaking', currentSpeaking.id)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold inline-flex items-center gap-1.5"
                >
                  <Bot className="w-4 h-4" /> Thu âm / Nhập câu trả lời & Chấm Rubric →
                </button>
              </div>

              {showSpeakingSample && (
                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-black uppercase text-emerald-800 dark:text-emerald-300">
                      Câu trả lời mẫu chuẩn format
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => speakText(currentSpeaking.sampleAnswer, accent, ttsRate)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5" /> Nghe đọc mẫu ({ttsRate}x)
                      </button>
                      <button
                        type="button"
                        onClick={stopAllAudio}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold"
                      >
                        Dừng
                      </button>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed whitespace-pre-line">
                    {currentSpeaking.sampleAnswer}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 4: TIMED MINI MOCK TEST ================= */}
      {currentTab === 'mock' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-5">
          {mockPhase === 'ready' && (
            <div className="max-w-2xl mx-auto py-6 text-center space-y-4">
              {availableMockTests.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-left pb-2">
                  {availableMockTests.map((mt, idx) => {
                    const isPicked = idx === mockTestIdx;
                    const best = mockBestScores[`${selectedExam}-${idx}`];
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setMockTestIdx(idx);
                          setMockSecondsLeft(mt.durationMinutes * 60);
                        }}
                        className={`p-2.5 rounded-xl border transition ${
                          isPicked
                            ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-rose-400'
                        }`}
                      >
                        <div className="text-xs font-extrabold">Đề #{idx + 1}</div>
                        <div className={`text-[10px] ${isPicked ? 'text-rose-100' : 'text-slate-500'}`}>
                          {mt.questions.length} câu • {mt.durationMinutes}p
                        </div>
                        {best && (
                          <div className={`text-[10px] font-bold mt-0.5 ${isPicked ? 'text-white' : 'text-emerald-600'}`}>
                            ✓ {best.correct}/{best.total}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
                <Timer className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {activeMockTest.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeMockTest.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-md mx-auto pt-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-[11px] text-slate-400 font-bold">Số câu</div>
                  <div className="text-base font-black text-slate-900 dark:text-white">
                    {mockQuestions.length} câu
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-[11px] text-slate-400 font-bold">Thời gian</div>
                  <div className="text-base font-black text-rose-600">
                    {activeMockTest.durationMinutes} phút
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-[11px] text-slate-400 font-bold">Thưởng XP</div>
                  <div className="text-base font-black text-amber-600">+35–50 XP</div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartMockTest}
                className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-black shadow-md inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" /> Bắt Đầu Thi Thử Bấm Giờ
              </button>
            </div>
          )}

          {mockPhase === 'running' && currentMockQ && (
            <div className="space-y-5">
              {/* Top Exam Timer Bar */}
              <div className="p-3.5 rounded-2xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1.5 rounded-xl font-mono text-base font-black flex items-center gap-1.5 ${
                      mockSecondsLeft <= 90
                        ? 'bg-rose-600 animate-pulse'
                        : mockSecondsLeft <= 180
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-emerald-400'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    {formatClock(mockSecondsLeft)}
                  </span>
                  <div className="text-xs">
                    <div className="font-extrabold">{activeMockTest.title}</div>
                    <div className="text-slate-400">
                      Đã làm {Object.keys(mockAnswers).length}/{mockQuestions.length} câu
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmitMockTest}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black"
                >
                  Nộp Bài & Chấm Điểm
                </button>
              </div>

              {/* Question Navigator Pills */}
              <div className="flex flex-wrap gap-1.5">
                {mockQuestions.map((q, idx) => {
                  const answered = mockAnswers[q.id] !== undefined;
                  const flagged = Boolean(mockFlagged[q.id]);
                  const active = idx === safeMockIdx;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        stopAllAudio();
                        setMockCurrentIdx(idx);
                      }}
                      className={`relative w-9 h-9 rounded-xl text-xs font-black border transition ${
                        active
                          ? 'bg-rose-600 text-white border-rose-600 ring-2 ring-rose-300'
                          : answered
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border-emerald-400'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {idx + 1}
                      {flagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border border-white" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Question Card */}
              <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 dark:bg-slate-700 text-white text-xs font-extrabold">
                      Câu {safeMockIdx + 1}/{mockQuestions.length}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                      {currentMockQ.partLabel}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setMockFlagged((prev) => ({
                        ...prev,
                        [currentMockQ.id]: !prev[currentMockQ.id],
                      }))
                    }
                    className={`px-3 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1 border ${
                      mockFlagged[currentMockQ.id]
                        ? 'bg-amber-100 border-amber-400 text-amber-800'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    {mockFlagged[currentMockQ.id] ? 'Đã đánh dấu xem lại' : 'Đánh dấu xem lại'}
                  </button>
                </div>

                {currentMockQ.audioScript && (
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                      <Headphones className="w-4 h-4 text-rose-600" />
                      <span>Nghe Audio câu {safeMockIdx + 1} (Transcript sẽ mở sau khi nộp bài)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => speakText(currentMockQ.audioScript!, accent, ttsRate)}
                        className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5" /> Phát Audio ({ttsRate}x)
                      </button>
                      <button
                        type="button"
                        onClick={stopAllAudio}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs font-bold"
                      >
                        Dừng
                      </button>
                    </div>
                  </div>
                )}

                {currentMockQ.passage && (
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto">
                    {currentMockQ.passage}
                  </div>
                )}

                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {currentMockQ.question}
                </p>

                <div className="space-y-2">
                  {currentMockQ.options.map((opt, optIdx) => {
                    const picked = mockAnswers[currentMockQ.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() =>
                          setMockAnswers((prev) => ({ ...prev, [currentMockQ.id]: optIdx }))
                        }
                        className={`w-full p-3.5 rounded-xl border-2 text-left text-xs sm:text-sm font-semibold transition flex items-start gap-2.5 ${
                          picked
                            ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-rose-300'
                        }`}
                      >
                        <span className="font-black">{String.fromCharCode(65 + optIdx)}.</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Prev / Next */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    disabled={safeMockIdx === 0}
                    onClick={() => {
                      stopAllAudio();
                      setMockCurrentIdx((i) => Math.max(0, i - 1));
                    }}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 disabled:opacity-40 text-xs font-bold inline-flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Câu trước
                  </button>

                  {safeMockIdx < mockQuestions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        stopAllAudio();
                        setMockCurrentIdx((i) => Math.min(mockQuestions.length - 1, i + 1));
                      }}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold inline-flex items-center gap-1"
                    >
                      Câu tiếp theo <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmitMockTest}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold"
                    >
                      Hoàn thành & Nộp bài
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {mockPhase === 'submitted' && (
            <div className="space-y-5">
              {/* Mock Result Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-rose-950 text-white space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase text-rose-300">
                      Kết quả Mini Mock Test • {examMeta.shortLabel}
                    </div>
                    <div className="text-2xl sm:text-3xl font-black mt-1">
                      {mockSummary.estimation.estimatedScore}
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      Quy đổi CEFR: <strong>{mockSummary.estimation.cefr}</strong> • Mục tiêu của bạn:{' '}
                      <strong className="text-amber-300">{activeTargetScore}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
                    <div className="px-3 py-2 rounded-xl bg-white/10">
                      <div className="text-[10px] text-slate-300 uppercase">Tổng đúng</div>
                      <div className="text-base font-black text-emerald-300">
                        {mockSummary.correct}/{mockSummary.total}
                      </div>
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-white/10">
                      <div className="text-[10px] text-slate-300 uppercase">Listening</div>
                      <div className="text-base font-black text-sky-300">
                        {mockSummary.listeningCorrect}/{mockSummary.listeningTotal}
                      </div>
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-white/10">
                      <div className="text-[10px] text-slate-300 uppercase">Reading</div>
                      <div className="text-base font-black text-amber-300">
                        {mockSummary.readingCorrect}/{mockSummary.readingTotal}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  ⏱️ Thời gian làm bài: <strong>{formatClock(mockDurationUsedSec)}</strong> —{' '}
                  {mockSummary.estimation.commentVi}
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleStartMockTest}
                    className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-black inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Thi lại đề này
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('rubric')}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold inline-flex items-center gap-1.5"
                  >
                    <Bot className="w-3.5 h-3.5" /> Chuyển sang Chấm Rubric Writing & Speaking →
                  </button>
                </div>
              </div>

              {/* Filter Review */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  Chi tiết đáp án & Giải thích từng câu
                </h4>
                <div className="flex gap-1.5">
                  {[
                    { id: 'all' as const, label: `Tất cả (${mockQuestions.length})` },
                    {
                      id: 'wrong' as const,
                      label: `Câu sai (${mockQuestions.length - mockSummary.correct})`,
                    },
                    { id: 'correct' as const, label: `Câu đúng (${mockSummary.correct})` },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setMockReviewFilter(f.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                        mockReviewFilter === f.id
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {mockQuestions
                  .map((q, idx) => ({ q, idx }))
                  .filter(({ q }) => {
                    const right = mockAnswers[q.id] === q.correctIdx;
                    if (mockReviewFilter === 'wrong') return !right;
                    if (mockReviewFilter === 'correct') return right;
                    return true;
                  })
                  .map(({ q, idx }) => {
                    const picked = mockAnswers[q.id];
                    const right = picked === q.correctIdx;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border space-y-2 ${
                          right
                            ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-800 dark:bg-emerald-950/15'
                            : 'border-rose-200 bg-rose-50/40 dark:border-rose-800 dark:bg-rose-950/15'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                            Câu {idx + 1} • {q.partLabel}
                          </span>
                          <span
                            className={`text-xs font-extrabold ${
                              right ? 'text-emerald-600' : 'text-rose-600'
                            }`}
                          >
                            {right ? '✅ Đúng' : picked === undefined ? '⚠️ Bỏ trống' : '❌ Sai'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {q.question}
                        </p>
                        <div className="text-xs space-y-1">
                          <div>
                            Bạn chọn:{' '}
                            <strong className={right ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-600'}>
                              {picked !== undefined
                                ? `${String.fromCharCode(65 + picked)}. ${q.options[picked]}`
                                : 'Chưa chọn'}
                            </strong>
                          </div>
                          {!right && (
                            <div>
                              Đáp án đúng:{' '}
                              <strong className="text-emerald-700 dark:text-emerald-300">
                                {String.fromCharCode(65 + q.correctIdx)}. {q.options[q.correctIdx]}
                              </strong>
                            </div>
                          )}
                        </div>
                        {q.audioScript && (
                          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/70 text-xs text-slate-600 dark:text-slate-300">
                            <strong>Audio Script:</strong> {q.audioScript}
                          </div>
                        )}
                        <div className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                          <strong className="text-indigo-600 dark:text-indigo-400">Giải thích:</strong>{' '}
                          {q.explanation}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 5: WRITING & SPEAKING RUBRIC GRADER ================= */}
      {currentTab === 'rubric' && (
        <div className="space-y-5">
          {/* Mode Switch & Task Picker */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-rose-600" />
                  Chấm Bài Writing & Speaking Theo Rubric {examMeta.shortLabel}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Hỗ trợ chấm nhanh Offline miễn phí theo tiêu chí từ khóa/độ dài/ngữ pháp và chấm sâu bằng Gemini AI theo đúng Rubric kỳ thi.
                </p>
              </div>

              <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 gap-1">
                <button
                  type="button"
                  onClick={() => handleSwitchRubricMode('writing')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold inline-flex items-center gap-1.5 transition ${
                    rubricMode === 'writing'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" /> Chấm Writing
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchRubricMode('speaking')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold inline-flex items-center gap-1.5 transition ${
                    rubricMode === 'speaking'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" /> Chấm Speaking
                </button>
              </div>
            </div>

            {/* Select Prompt (compact dropdown + custom toggle so 46/37 prompts stay tidy on mobile) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <select
                value={isCustomRubricPrompt ? 'custom' : rubricTaskId}
                onChange={(e) => {
                  setRubricTaskId(e.target.value);
                  setOfflineEvaluation(null);
                  setAiEvaluation(null);
                }}
                aria-label="Chọn đề bài chấm Rubric"
                className="flex-1 min-h-[42px] px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {(rubricMode === 'writing' ? allWritingTasks : allSpeakingTasks).map((item, idx) => {
                  const tag = 'taskLabel' in item ? item.taskLabel : item.partLabel;
                  return (
                    <option key={item.id} value={item.id}>
                      Bài {idx + 1}: [{tag}] {item.title}
                    </option>
                  );
                })}
                <option value="custom">✍️ Tự nhập đề bài riêng</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  setRubricTaskId(isCustomRubricPrompt ? (rubricMode === 'writing' ? allWritingTasks[0]?.id || 'custom' : allSpeakingTasks[0]?.id || 'custom') : 'custom');
                  setOfflineEvaluation(null);
                  setAiEvaluation(null);
                }}
                className={`min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-extrabold border shrink-0 ${
                  isCustomRubricPrompt
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                {isCustomRubricPrompt ? 'Chọn đề có sẵn' : '✍️ Tự nhập đề riêng'}
              </button>
            </div>

            {/* Active Prompt Display or Custom Input */}
            {isCustomRubricPrompt ? (
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Nhập đề bài {rubricMode === 'writing' ? 'Writing' : 'Speaking'} của riêng bạn:
                </label>
                <textarea
                  rows={3}
                  value={customRubricPrompt}
                  onChange={(e) => setCustomRubricPrompt(e.target.value)}
                  placeholder="Ví dụ: Some people think governments should invest more in railways than roads. Do you agree or disagree?"
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-extrabold uppercase text-indigo-600 dark:text-indigo-400">
                  Đề bài đang chọn • Độ dài gợi ý: {currentMinWords}+ từ
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 whitespace-pre-line leading-relaxed">
                  {currentRubricPromptText}
                </p>
                {currentRubricKeywords.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-500">Từ khóa ăn điểm:</span>
                    {currentRubricKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Answer Editor + Optional Voice Recording */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                  {rubricMode === 'writing'
                    ? 'Bài viết tiếng Anh của bạn:'
                    : 'Câu trả lời Speaking (gõ trực tiếp hoặc bấm Micro để nói thành văn bản):'}
                </label>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span
                    className={`px-2.5 py-0.5 rounded-full ${
                      draftWordCount >= currentMinWords
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {draftWordCount} từ {!isCustomRubricPrompt ? `(Mục tiêu ≥${currentMinWords} từ)` : ''}
                  </span>
                </div>
              </div>

              {rubricMode === 'speaking' && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleSpeechInput}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 transition ${
                      isRecordingSpeech
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100'
                    }`}
                  >
                    {isRecordingSpeech ? <Square className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    {isRecordingSpeech ? 'Dừng thu âm & Chèn vào bài' : 'Bật Micro nói câu trả lời'}
                  </button>
                  {speechInterim && (
                    <span className="text-xs italic text-indigo-600 dark:text-indigo-300">
                      {speechInterim}
                    </span>
                  )}
                  {speechRecError && (
                    <span className="text-xs text-rose-600 font-semibold">{speechRecError}</span>
                  )}
                </div>
              )}

              <textarea
                rows={8}
                value={rubricDraftText}
                onChange={(e) => setRubricDraftText(e.target.value)}
                placeholder={
                  rubricMode === 'writing'
                    ? 'Nhập bài viết tiếng Anh của bạn tại đây (nên chia đoạn bằng phím Enter)...'
                    : 'Nói vào Micro ở trên hoặc gõ câu trả lời Speaking tiếng Anh của bạn tại đây...'
                }
                className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-rose-500"
              />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  {!isCustomRubricPrompt && (
                    <button
                      type="button"
                      onClick={() => {
                        const sample =
                          rubricMode === 'writing'
                            ? activeRubricWritingTask?.modelAnswer || ''
                            : activeRubricSpeakingTask?.sampleAnswer || '';
                        setRubricDraftText(sample);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-200"
                    >
                      Dán thử bài mẫu để kiểm tra
                    </button>
                  )}
                  {rubricDraftText && (
                    <button
                      type="button"
                      onClick={() => {
                        setRubricDraftText('');
                        setOfflineEvaluation(null);
                        setAiEvaluation(null);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500"
                    >
                      Xóa nháp
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={!rubricDraftText.trim()}
                    onClick={handleGradeOffline}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-extrabold inline-flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" /> Chấm Offline Theo Rubric (Miễn phí)
                  </button>

                  <button
                    type="button"
                    disabled={!rubricDraftText.trim() || aiGradingLoading}
                    onClick={handleGradeWithGemini}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 disabled:opacity-50 text-white text-xs font-extrabold inline-flex items-center gap-1.5 shadow-sm"
                  >
                    {aiGradingLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    {aiGradingLoading ? 'AI đang chấm theo Rubric...' : 'Chấm Sâu Bằng AI Gemini'}
                  </button>
                </div>
              </div>
            </div>

            {aiGradingError && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{aiGradingError}</span>
              </div>
            )}
          </div>

          {/* Offline Evaluation Result */}
          {offlineEvaluation && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase text-indigo-600 dark:text-indigo-400">
                    Kết quả chấm Offline theo Rubric {examMeta.shortLabel}
                  </span>
                  <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                    Ước lượng: {offlineEvaluation.overallExamScore}
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-500">
                  {offlineEvaluation.wordCount} từ • {offlineEvaluation.sentenceCount} câu • Tổng đạt{' '}
                  <strong className="text-indigo-600">{offlineEvaluation.percentScore}/100</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {offlineEvaluation.criteriaScores.map((item) => (
                  <div
                    key={item.criterion.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {item.criterion.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-xs font-black">
                        {item.scoreTen.toFixed(1)}/10
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">{item.note}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-1.5">
                  <div className="font-extrabold text-emerald-800 dark:text-emerald-300">✅ Điểm mạnh</div>
                  {offlineEvaluation.strengths.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-200">
                      {offlineEvaluation.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500">Hãy viết thêm câu hoàn chỉnh để hệ thống ghi nhận điểm mạnh.</p>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-1.5">
                  <div className="font-extrabold text-amber-800 dark:text-amber-300">💡 Gợi ý nâng điểm</div>
                  {offlineEvaluation.improvements.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-200">
                      {offlineEvaluation.improvements.map((imp, i) => (
                        <li key={i}>{imp}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-emerald-700 dark:text-emerald-300">
                      Không phát hiện lỗi ngữ pháp phổ biến! Hãy thử chấm thêm bằng AI Gemini để tinh chỉnh diễn đạt tự nhiên.
                    </p>
                  )}
                </div>
              </div>

              {offlineEvaluation.missingKeywords.length > 0 && (
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <strong>Từ khóa chủ đề nên chèn thêm:</strong>{' '}
                  {offlineEvaluation.missingKeywords.join(', ')}
                </div>
              )}
            </div>
          )}

          {/* Gemini AI Detailed Review */}
          {aiEvaluation && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-rose-200 dark:border-rose-800 p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-black text-rose-700 dark:text-rose-300">
                <Sparkles className="w-4 h-4" />
                Nhận Xét Chuyên Sâu Từ Giám Khảo AI Gemini (Theo Rubric {examMeta.shortLabel})
              </div>
              <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 whitespace-pre-wrap leading-relaxed">
                {aiEvaluation}
              </div>
            </div>
          )}

          {/* Official Rubric Reference Cards */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3">
            <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Bảng Tiêu Chí Chấm Chính Thức — {examMeta.shortLabel} ({rubricMode === 'writing' ? 'Writing' : 'Speaking'})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {examData.rubricCriteria
                .filter((c) => c.appliesTo === rubricMode || c.appliesTo === 'both')
                .map((crit) => (
                  <div
                    key={crit.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-black text-slate-900 dark:text-white">
                          {crit.name}
                        </div>
                        <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                          {crit.nameVi}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-[11px] font-extrabold">
                        {crit.weightText}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {crit.description}
                    </p>
                    <ul className="space-y-1 text-[11px] text-emerald-700 dark:text-emerald-300 list-disc pl-4">
                      {crit.highScoreBenchmarks.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPrepCenter;
