import type { ExamType } from '../../types/audience';
import { LISTENING_READING_LESSONS } from '../listeningReadingLessons';
import { ROLEPLAY_BANK_PART1 } from '../roleplayBankPart1';
import { ROLEPLAY_BANK_PART2 } from '../roleplayBankPart2';
import {
  ACADEMIC_ABSTRACTS,
  ACADEMIC_WRITING_PROMPTS,
} from '../university/academicCurriculumData';
import type {
  ExamListeningSet,
  ExamReadingSet,
  ExamSpeakingTask,
  ExamWritingTask,
} from './examPrepData';

function isPracticalExam(examType: ExamType): boolean {
  return examType === 'toeic' || examType === 'cambridge';
}

export function getExpandedListeningLessons(
  examType: ExamType,
  base: ExamListeningSet[]
): ExamListeningSet[] {
  const preferredLevels = isPracticalExam(examType)
    ? new Set(['A2', 'B1', 'B2'])
    : new Set(['B1', 'B2', 'C1']);

  const pool = [
    ...LISTENING_READING_LESSONS.filter((l) => preferredLevels.has(l.level)),
    ...LISTENING_READING_LESSONS.filter((l) => !preferredLevels.has(l.level)),
  ].slice(0, 40);

  const extra: ExamListeningSet[] = pool.map((l, idx) => ({
    id: `${examType}-ext-listen-${l.id}`,
    partLabel: `${l.category} (${l.level})`,
    title: l.title.replace(/^Bài\s+\d+:\s*/i, ''),
    level: l.level,
    sourceGroup: 'foundation',
    speakerContext: `${l.sourceStyle} • Bài học nghe hiểu #${base.length + idx + 1}`,
    audioScript: l.transcript,
    viSummary: l.translation,
    keyPhrases: l.keyPhrases,
    questions: [
      {
        id: `${examType}-ext-lq-${l.id}`,
        question: l.question.q,
        options: l.question.options,
        correctIdx: l.question.correctIdx,
        explanation: `Đáp án đúng là "${l.question.options[l.question.correctIdx]}". Xem bản dịch và cụm từ khóa phía trên để nắm chắc nội dung.`,
      },
    ],
  }));

  return [...base, ...extra];
}

export function getExpandedReadingLessons(
  examType: ExamType,
  base: ExamReadingSet[]
): ExamReadingSet[] {
  const abstractLessons: ExamReadingSet[] = ACADEMIC_ABSTRACTS.map((abs, idx) => ({
    id: `${examType}-ext-abs-${abs.id}`,
    partLabel: abs.domain,
    title: abs.title,
    level: abs.level,
    sourceGroup: 'foundation',
    passage: abs.abstractEn,
    viSummary: abs.translationVi,
    keyPhrases: abs.keyTerms.map((term) => ({ en: term, vi: 'Thuật ngữ trọng tâm' })),
    questions: abs.questions.map((q) => ({
      id: `${examType}-ext-aq-${abs.id}-${q.id}`,
      questionType: q.focusSkill,
      question: q.questionEn,
      options: q.options,
      correctIdx: q.correctIndex,
      explanation: q.explanationVi,
    })),
  }));

  const readingBank = LISTENING_READING_LESSONS.filter(
    (l) => l.category === 'Bài đọc cơ bản' || l.level === 'B1' || l.level === 'B2'
  ).slice(0, 10);

  const extraBank: ExamReadingSet[] = readingBank.map((l) => ({
    id: `${examType}-ext-read-${l.id}`,
    partLabel: `${l.category} (${l.level})`,
    title: l.title.replace(/^Bài\s+\d+:\s*/i, ''),
    level: l.level,
    sourceGroup: 'foundation',
    passage: l.transcript,
    viSummary: l.translation,
    keyPhrases: l.keyPhrases,
    questions: [
      {
        id: `${examType}-ext-rq-${l.id}`,
        questionType: 'Đọc hiểu ý chính',
        question: l.question.q,
        options: l.question.options,
        correctIdx: l.question.correctIdx,
        explanation: `Đáp án đúng: "${l.question.options[l.question.correctIdx]}".`,
      },
    ],
  }));

  return [...base, ...abstractLessons, ...extraBank];
}

export function getExpandedWritingLessons(
  examType: ExamType,
  base: ExamWritingTask[]
): ExamWritingTask[] {
  const extra: ExamWritingTask[] = ACADEMIC_WRITING_PROMPTS.map((w) => ({
    id: `${examType}-ext-write-${w.id}`,
    taskLabel: `${w.type} (${w.level})`,
    title: w.title,
    sourceGroup: 'foundation',
    recommendedMinutes: w.recommendedWords >= 220 ? 35 : 20,
    wordCountRange: `${w.recommendedWords}+ từ`,
    minWords: Math.max(80, Math.round(w.recommendedWords * 0.7)),
    prompt: w.promptEn,
    promptVi: w.promptVi,
    outline: w.structureOutline,
    scoringCriteriaFocus: w.gradingChecklistVi,
    highBandKeywords: w.keywordsEn.map((kw) => ({
      phrase: kw,
      meaningVi: 'Từ khóa học thuật ghi điểm cao',
    })),
    modelAnswer: w.sampleBandHigh,
    modelNotesVi: `Bài mẫu trình độ ${w.level} bám sát dàn ý ${w.structureOutline.length} phần và tích hợp các từ khóa mục tiêu.`,
  }));

  return [...base, ...extra];
}

export function getExpandedSpeakingLessons(
  examType: ExamType,
  base: ExamSpeakingTask[]
): ExamSpeakingTask[] {
  const allScenarios = [...ROLEPLAY_BANK_PART1, ...ROLEPLAY_BANK_PART2];
  const preferredLevels = isPracticalExam(examType)
    ? new Set(['A2', 'B1', 'B2'])
    : new Set(['B1', 'B2', 'C1']);

  const selected = [
    ...allScenarios.filter((s) => preferredLevels.has(s.level)),
    ...allScenarios.filter((s) => !preferredLevels.has(s.level)),
  ].slice(0, 30);

  const extra: ExamSpeakingTask[] = selected.map((sc) => {
    const aiTurns = sc.turns.filter((t) => t.speaker === 'AI');
    const suggestedReplies = sc.turns.flatMap((t) => t.suggestedReplies || []);
    const sampleAnswer =
      suggestedReplies.map((r) => r.en).join(' ') ||
      aiTurns.map((t) => t.en).join(' ');

    return {
      id: `${examType}-ext-speak-${sc.id}`,
      partLabel: `${sc.category || 'Hội thoại'} (${sc.level})`,
      title: sc.title,
      sourceGroup: 'foundation',
      prepTimeText: '15–30 giây',
      speakTimeText: '45–90 giây',
      prompt: aiTurns[0]?.en || sc.context,
      cuePoints: aiTurns.map((t) => `${t.en} (${t.vi})`),
      promptVi: sc.context,
      sampleAnswer,
      highScoreVocab: suggestedReplies.slice(0, 4).map((r) => ({
        phrase: r.en,
        meaningVi: r.vi,
      })),
      deliveryTips: sc.turns
        .map((t) => t.tip)
        .filter((tip): tip is string => Boolean(tip))
        .concat(['Nói rõ từng cụm ý, ngắt nghỉ tự nhiên và nhấn trọng âm từ khóa.'])
        .slice(0, 3),
    };
  });

  return [...base, ...extra];
}
