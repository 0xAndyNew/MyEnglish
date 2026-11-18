import { SCHOOL_UNITS, SCHOOL_EXAMS, SCHOOL_EXAM_SETS, SCHOOL_REVIEWS } from '../src/data/teen/schoolCurriculumData';
import { KIDS_UNITS, KIDS_SENTENCE_CHUNKS, KIDS_YLE_CHALLENGES, KIDS_YLE_MOCK_TESTS } from '../src/data/kids/kidsCurriculumData';
import {
  AWL_WORDS,
  AWL_DRILLS,
  ACADEMIC_ABSTRACTS,
  ACADEMIC_WRITING_PROMPTS,
  PRESENTATION_PHRASES,
  SEMINAR_PHRASES,
  GRADUATION_QUICK_QUIZ,
} from '../src/data/university/academicCurriculumData';
import {
  WORKPLACE_MEETING_PHRASES,
  WORKPLACE_EMAIL_TEMPLATES,
  WORKPLACE_STAR_QUESTIONS,
  WORKPLACE_CASE_SITUATIONS,
  WORKPLACE_VOCAB_DRILLS,
} from '../src/data/worker/workplaceScenariosData';
import { EXAM_PREP_DATA, EXAM_ORDER } from '../src/data/exam/examPrepData';
import { GRAMMAR_LESSONS } from '../src/data/grammarData';
import { Exercise } from '../src/types/exercise';

let errorCount = 0;
let warningCount = 0;

function error(msg: string) {
  console.error(`❌ [ERROR] ${msg}`);
  errorCount++;
}

function warn(msg: string) {
  console.warn(`⚠️  [WARN]  ${msg}`);
  warningCount++;
}

function checkUniqueIds(label: string, ids: string[]) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (!id || !id.trim()) {
      error(`${label}: empty id found`);
    } else if (seen.has(id)) {
      error(`${label}: duplicate id "${id}"`);
    }
    seen.add(id);
  }
}

function checkMcqDistribution(label: string, indices: number[]) {
  if (indices.length < 20) return;
  const counts = [0, 0, 0, 0];
  for (const i of indices) {
    if (i >= 0 && i < 4) counts[i]++;
  }
  const total = counts.reduce((a, b) => a + b, 0);
  if (total === 0) return;
  const pcts = counts.map((c) => Math.round((c / total) * 100));
  const outOfRange = pcts.some((p) => p < 18 || p > 32);
  const summary = `A=${pcts[0]}% B=${pcts[1]}% C=${pcts[2]}% D=${pcts[3]}% (n=${total})`;
  if (outOfRange) {
    warn(`${label} answer distribution skewed: ${summary}`);
  } else {
    console.log(`✅ ${label} answer distribution: ${summary}`);
  }
}

function validateExerciseList(label: string, exercises: Exercise[], mcqDist: number[]) {
  checkUniqueIds(label, exercises.map((e) => e.id));
  for (const ex of exercises) {
    if (ex.kind !== 'matching' && (!ex.explanationVi || !ex.explanationVi.trim())) {
      error(`${label} [${ex.id}]: missing explanationVi`);
    }
    switch (ex.kind) {
      case 'mcq': {
        if (ex.options.length < 2) error(`${label} [${ex.id}]: < 2 options`);
        if (ex.correctIndex < 0 || ex.correctIndex >= ex.options.length) {
          error(`${label} [${ex.id}]: correctIndex ${ex.correctIndex} out of range`);
        }
        const trimmed = ex.options.map((o) => o.trim().toLowerCase());
        if (new Set(trimmed).size !== trimmed.length || trimmed.some((o) => !o)) {
          error(`${label} [${ex.id}]: duplicate or empty options`);
        }
        if (ex.options.length === 4) mcqDist.push(ex.correctIndex);
        break;
      }
      case 'pronunciation': {
        if (ex.words.length !== 4) error(`${label} [${ex.id}]: must have 4 words`);
        if (ex.correctIndex < 0 || ex.correctIndex >= ex.words.length) {
          error(`${label} [${ex.id}]: correctIndex out of range`);
        }
        mcqDist.push(ex.correctIndex);
        break;
      }
      case 'error-find': {
        if (ex.parts.length !== 4) error(`${label} [${ex.id}]: must have 4 parts`);
        if (ex.wrongIndex < 0 || ex.wrongIndex >= ex.parts.length) {
          error(`${label} [${ex.id}]: wrongIndex out of range`);
        }
        mcqDist.push(ex.wrongIndex);
        break;
      }
      case 'gap-fill': {
        const blanks = (ex.sentence.match(/___/g) || []).length;
        if (blanks === 0) error(`${label} [${ex.id}]: gap-fill missing ___`);
        if (blanks > 1 && ex.answers.length !== blanks) {
          error(`${label} [${ex.id}]: ${blanks} blanks but ${ex.answers.length} answers`);
        }
        if (ex.answers.length === 0) error(`${label} [${ex.id}]: empty answers`);
        break;
      }
      case 'word-order': {
        const joined = ex.words.join(' ').replace(/\s+/g, ' ').trim().toLowerCase();
        const ans = ex.answer.replace(/\s+/g, ' ').trim().toLowerCase();
        if (!joined || !ans) error(`${label} [${ex.id}]: empty word-order`);
        if (ex.words.slice().sort().join('|').toLowerCase() !== ex.answer.split(/\s+/).sort().join('|').toLowerCase()) {
          warn(`${label} [${ex.id}]: words set differs slightly from answer ("${ex.answer}")`);
        }
        break;
      }
      case 'transform': {
        if (ex.answers.length === 0 || ex.answers.some((a) => !a.trim())) {
          error(`${label} [${ex.id}]: empty transform answers`);
        }
        break;
      }
      case 'matching': {
        if (ex.pairs.length < 2) error(`${label} [${ex.id}]: < 2 matching pairs`);
        break;
      }
    }
  }
}

console.log('=== MyEnglish Content Validation ===\n');

// 1. TEEN
checkUniqueIds('SCHOOL_UNITS', SCHOOL_UNITS.map((u) => u.id));
const teenQuizIds: string[] = [];
const teenQuizDist: number[] = [];
const teenExDist: number[] = [];
let teenExerciseCount = 0;

for (const u of SCHOOL_UNITS) {
  for (const q of u.practiceQuiz) {
    teenQuizIds.push(q.id);
    if (q.correctIndex < 0 || q.correctIndex >= q.options.length) {
      error(`SCHOOL_UNITS [${q.id}]: correctIndex out of range`);
    }
    if (!q.explanationVi?.trim()) error(`SCHOOL_UNITS [${q.id}]: missing explanationVi`);
    const opts = q.options.map((o) => o.trim().toLowerCase());
    if (new Set(opts).size !== opts.length) error(`SCHOOL_UNITS [${q.id}]: duplicate options`);
    if (q.options.length === 4) teenQuizDist.push(q.correctIndex);
  }
  if (u.exercises && u.exercises.length > 0) {
    validateExerciseList(`Unit ${u.id}`, u.exercises, teenExDist);
    teenExerciseCount += u.exercises.length;
  }
}
checkUniqueIds('Teen practiceQuiz', teenQuizIds);
checkMcqDistribution('Teen practiceQuiz', teenQuizDist);
if (teenExDist.length > 0) checkMcqDistribution('Teen exercises', teenExDist);

const examQIds: string[] = [];
const examDist: number[] = [];
for (const examKey of Object.keys(SCHOOL_EXAM_SETS) as Array<keyof typeof SCHOOL_EXAM_SETS>) {
  for (const exam of SCHOOL_EXAM_SETS[examKey]) {
    for (const q of exam.questions) {
      examQIds.push(q.id);
      if (q.correctIndex < 0 || q.correctIndex >= q.options.length) {
        error(`SCHOOL_EXAM_SETS [${q.id}]: correctIndex out of range`);
      }
      if (q.options.length === 4) examDist.push(q.correctIndex);
    }
  }
}
checkUniqueIds('SCHOOL_EXAM_SETS questions', examQIds);
checkMcqDistribution('SCHOOL_EXAM_SETS', examDist);

checkUniqueIds('SCHOOL_REVIEWS', SCHOOL_REVIEWS.map((r) => r.id));
const reviewExDist: number[] = [];
let reviewExCount = 0;
for (const rev of SCHOOL_REVIEWS) {
  validateExerciseList(`Review ${rev.id}`, rev.exercises, reviewExDist);
  reviewExCount += rev.exercises.length;
}
if (reviewExDist.length > 0) checkMcqDistribution('SCHOOL_REVIEWS exercises', reviewExDist);

// 2. KIDS
checkUniqueIds('KIDS_UNITS', KIDS_UNITS.map((u) => u.id));
checkUniqueIds('KIDS_SENTENCE_CHUNKS', KIDS_SENTENCE_CHUNKS.map((c) => c.id));
checkUniqueIds('KIDS_YLE_CHALLENGES', KIDS_YLE_CHALLENGES.map((q) => q.id));
const kidsYleDist = KIDS_YLE_CHALLENGES.filter((q) => q.options.length === 4).map((q) => q.correctIndex);
checkMcqDistribution('KIDS_YLE_CHALLENGES', kidsYleDist);

const kidsExDist: number[] = [];
let kidsExCount = 0;
for (const u of KIDS_UNITS) {
  if (u.exercises && u.exercises.length > 0) {
    validateExerciseList(`Kids ${u.id}`, u.exercises, kidsExDist);
    kidsExCount += u.exercises.length;
  }
}
if (kidsExDist.length > 0) checkMcqDistribution('KIDS_UNITS exercises', kidsExDist);

checkUniqueIds('KIDS_YLE_MOCK_TESTS', KIDS_YLE_MOCK_TESTS.map((m) => m.id));
const kidsMockQIds = KIDS_YLE_MOCK_TESTS.flatMap((m) => m.questions.map((q) => q.id));
checkUniqueIds('KIDS_YLE_MOCK_TESTS questions', kidsMockQIds);
checkMcqDistribution(
  'KIDS_YLE_MOCK_TESTS',
  KIDS_YLE_MOCK_TESTS.flatMap((m) => m.questions.map((q) => q.correctIndex))
);

// 3. UNIVERSITY
checkUniqueIds('AWL_WORDS', AWL_WORDS.map((w) => w.id));
checkUniqueIds('ACADEMIC_ABSTRACTS', ACADEMIC_ABSTRACTS.map((a) => a.id));
checkUniqueIds('ACADEMIC_WRITING_PROMPTS', ACADEMIC_WRITING_PROMPTS.map((p) => p.id));
checkUniqueIds('PRESENTATION_PHRASES', PRESENTATION_PHRASES.map((p) => p.id));
checkUniqueIds('SEMINAR_PHRASES', SEMINAR_PHRASES.map((p) => p.id));
checkUniqueIds('GRADUATION_QUICK_QUIZ', GRADUATION_QUICK_QUIZ.map((q) => q.id));
checkMcqDistribution('GRADUATION_QUICK_QUIZ', GRADUATION_QUICK_QUIZ.map((q) => q.correctIndex));
const awlDrillDist: number[] = [];
validateExerciseList('AWL_DRILLS', AWL_DRILLS, awlDrillDist);
checkMcqDistribution('AWL_DRILLS', awlDrillDist);

// 4. WORKPLACE
checkUniqueIds('WORKPLACE_MEETING_PHRASES', WORKPLACE_MEETING_PHRASES.map((m) => m.id));
checkUniqueIds('WORKPLACE_EMAIL_TEMPLATES', WORKPLACE_EMAIL_TEMPLATES.map((e) => e.id));
checkUniqueIds('WORKPLACE_STAR_QUESTIONS', WORKPLACE_STAR_QUESTIONS.map((s) => s.id));
checkUniqueIds('WORKPLACE_CASE_SITUATIONS', WORKPLACE_CASE_SITUATIONS.map((c) => c.id));
const wpDrillDist: number[] = [];
validateExerciseList('WORKPLACE_VOCAB_DRILLS', WORKPLACE_VOCAB_DRILLS, wpDrillDist);
checkMcqDistribution('WORKPLACE_VOCAB_DRILLS', wpDrillDist);

// 5. EXAM PREP
let examPrepMcqCount = 0;
for (const key of EXAM_ORDER) {
  const p = EXAM_PREP_DATA[key];
  const ids = [
    ...p.diagnosticQuestions.map((q) => q.id),
    ...p.skillPractice.reading.flatMap((r) => [r.id, ...r.questions.map((q) => q.id)]),
    ...p.skillPractice.listening.flatMap((l) => [l.id, ...l.questions.map((q) => q.id)]),
    ...p.skillPractice.writing.map((w) => w.id),
    ...p.skillPractice.speaking.map((s) => s.id),
    ...p.mockTest.questions.map((q) => q.id),
  ];
  checkUniqueIds(`EXAM_PREP[${key}]`, ids);
  examPrepMcqCount +=
    p.diagnosticQuestions.length +
    p.skillPractice.reading.reduce((acc, r) => acc + r.questions.length, 0) +
    p.skillPractice.listening.reduce((acc, l) => acc + l.questions.length, 0) +
    p.mockTest.questions.length;
}

// 6. GRAMMAR
checkUniqueIds('GRAMMAR_LESSONS', GRAMMAR_LESSONS.map((g) => g.id));

console.log('\n=== Inventory Summary ===');
console.log(`• Teen: ${SCHOOL_UNITS.length} units, ${teenQuizIds.length} practiceQuiz, ${teenExerciseCount} exercises, ${SCHOOL_REVIEWS.length} reviews (${reviewExCount} ex), ${examQIds.length} school exam Qs (${SCHOOL_EXAM_SETS.entrance10.length}+${SCHOOL_EXAM_SETS.thpt.length} sets)`);
console.log(`• Kids: ${KIDS_UNITS.length} units (${KIDS_UNITS.reduce((a, u) => a + u.words.length, 0)} words, ${kidsExCount} ex), ${KIDS_SENTENCE_CHUNKS.length} chunks, ${KIDS_YLE_CHALLENGES.length} YLE Qs, ${KIDS_YLE_MOCK_TESTS.length} YLE mocks (${kidsMockQIds.length} Qs)`);
console.log(`• University: ${AWL_WORDS.length} AWL words, ${AWL_DRILLS.length} AWL drills, ${ACADEMIC_ABSTRACTS.length} abstracts (${ACADEMIC_ABSTRACTS.reduce((a, x) => a + x.questions.length, 0)} Qs), ${ACADEMIC_WRITING_PROMPTS.length} writing prompts, ${PRESENTATION_PHRASES.length + SEMINAR_PHRASES.length} pres/sem phrases, ${GRADUATION_QUICK_QUIZ.length} grad quiz`);
console.log(`• Workplace: ${WORKPLACE_MEETING_PHRASES.length} meetings, ${WORKPLACE_EMAIL_TEMPLATES.length} emails, ${WORKPLACE_STAR_QUESTIONS.length} STAR, ${WORKPLACE_CASE_SITUATIONS.length} cases, ${WORKPLACE_VOCAB_DRILLS.length} industry drills`);
console.log(`• Exam Prep: ${EXAM_ORDER.length} exams, ${examPrepMcqCount} MCQ Qs`);
console.log(`• Grammar: ${GRAMMAR_LESSONS.length} lessons (${GRAMMAR_LESSONS.reduce((a, g) => a + g.quiz.length, 0)} quiz Qs)`);
console.log(`\nResult: ${errorCount} errors, ${warningCount} warnings.`);

if (errorCount > 0) process.exit(1);
