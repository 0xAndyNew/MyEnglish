import { getExamMeta, type ExamType, type LearnerProfile } from '../../types/audience';
import type { CefrLevel, WordEntry } from '../../types/learning';

export type ExamDiagSkillKey = 'listening' | 'reading' | 'grammar' | 'vocab';

export interface ExamDiagnosticSummary {
  examType: ExamType;
  estimatedScore: string;
  cefr: CefrLevel;
  correctCount: number;
  totalCount: number;
  accuracyPercent: number;
  commentVi: string;
  weakSkills: ExamDiagSkillKey[];
  skillStats: Partial<Record<ExamDiagSkillKey, { correct: number; total: number }>>;
  updatedAt: number;
}

const VALID_EXAMS: ExamType[] = ['ielts', 'toeic', 'vstep', 'cambridge', 'toefl'];
const EXAM_PREF_KEY = 'myenglish_selected_exam_v1';
const EXAM_TARGET_KEY = 'myenglish_exam_targets_v1';
const EXAM_DIAG_KEY = 'myenglish_exam_diag_results_v1';

export const EXAM_PREF_EVENT = 'myenglish:exam-pref-changed';

function emitExamPrefChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EXAM_PREF_EVENT));
  }
}

export function getPreferredExam(profile?: LearnerProfile | null): ExamType {
  try {
    const saved = localStorage.getItem(EXAM_PREF_KEY) as ExamType | null;
    if (saved && VALID_EXAMS.includes(saved)) {
      return saved;
    }
  } catch {
    // ignore storage error
  }
  return profile?.exam?.examType || profile?.university?.graduationExam || 'ielts';
}

export function setPreferredExam(exam: ExamType): void {
  try {
    localStorage.setItem(EXAM_PREF_KEY, exam);
  } catch {
    // ignore
  }
  emitExamPrefChange();
}

export function getExamTargetScore(
  exam: ExamType,
  profile?: LearnerProfile | null
): string {
  try {
    const raw = localStorage.getItem(EXAM_TARGET_KEY);
    if (raw) {
      const map = JSON.parse(raw) as Partial<Record<ExamType, string>>;
      if (map[exam]) return map[exam]!;
    }
  } catch {
    // ignore
  }
  if (profile?.exam?.examType === exam && profile.exam.targetScore) {
    return profile.exam.targetScore;
  }
  return getExamMeta(exam).defaultScore;
}

export function setExamTargetScore(exam: ExamType, score: string): void {
  try {
    const raw = localStorage.getItem(EXAM_TARGET_KEY);
    const map = raw ? (JSON.parse(raw) as Record<string, string>) : {};
    map[exam] = score;
    localStorage.setItem(EXAM_TARGET_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
  emitExamPrefChange();
}

export const EXAM_TARGET_PRESETS: Record<ExamType, string[]> = {
  ielts: ['5.5', '6.0', '6.5', '7.0', '7.5+'],
  toeic: ['500+', '600+', '650+', '750+', '850+'],
  vstep: ['B1 (4.0+)', 'B2 (6.0+)', 'C1 (8.5+)'],
  cambridge: ['B1 Preliminary', 'B2 First', 'C1 Advanced'],
  toefl: ['70+', '80+', '95+', '105+'],
};

export function getExamDiagnosticSummary(
  exam: ExamType
): ExamDiagnosticSummary | null {
  try {
    const raw = localStorage.getItem(EXAM_DIAG_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw) as Partial<Record<ExamType, ExamDiagnosticSummary>>;
    return map[exam] || null;
  } catch {
    return null;
  }
}

export function saveExamDiagnosticSummary(summary: ExamDiagnosticSummary): void {
  try {
    const raw = localStorage.getItem(EXAM_DIAG_KEY);
    const map = raw ? (JSON.parse(raw) as Record<string, ExamDiagnosticSummary>) : {};
    map[summary.examType] = summary;
    localStorage.setItem(EXAM_DIAG_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
  emitExamPrefChange();
}

export function buildExamWordEntry(opts: {
  phrase: string;
  meaningVi: string;
  examType: ExamType;
  level?: CefrLevel;
  note?: string;
}): WordEntry {
  const clean = opts.phrase.trim();
  const slug = clean.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) || 'term';
  const examLabel = getExamMeta(opts.examType).shortLabel;
  return {
    id: `exam-${opts.examType}-${slug}`,
    word: clean,
    syllables: [clean],
    stressIndex: 0,
    ipaUS: '',
    ipaUK: '',
    vietPhonetic: '',
    phonicsRule: `Từ khóa trọng tâm ${examLabel}`,
    pos: clean.includes(' ') ? 'phrase' : 'vocab',
    level: opts.level || 'B2',
    meaningVi: opts.meaningVi,
    mnemonic: opts.note || `Cụm từ ăn điểm cao dùng cho kỳ thi ${examLabel}.`,
    examples: [],
    topicId: `exam-${opts.examType}`,
    audiences: ['exam'],
  };
}
