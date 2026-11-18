import { GRADE_6_UNITS } from './grades/grade6';
import { GRADE_7_UNITS } from './grades/grade7';
import { GRADE_8_UNITS } from './grades/grade8';
import { GRADE_9_UNITS } from './grades/grade9';
import { GRADE_10_UNITS } from './grades/grade10';
import { GRADE_11_UNITS } from './grades/grade11';
import { GRADE_12_UNITS } from './grades/grade12';
import { DEFAULT_SCHOOL_EXAMS } from './exams/defaultExams';
import { ENTRANCE10_EXTRA_EXAMS } from './exams/entrance10Exams';
import { THPT_2025_EXTRA_EXAMS } from './exams/thpt2025Exams';
import { THCS_REVIEWS } from './exams/reviewsTHCS';
import { THPT_REVIEWS } from './exams/reviewsTHPT';
import { SchoolExamId, SchoolExamSet, SchoolGrade, SchoolReviewSet, SchoolUnit } from './types';

export * from './types';

export const SCHOOL_UNITS: SchoolUnit[] = [
  ...GRADE_6_UNITS,
  ...GRADE_7_UNITS,
  ...GRADE_8_UNITS,
  ...GRADE_9_UNITS,
  ...GRADE_10_UNITS,
  ...GRADE_11_UNITS,
  ...GRADE_12_UNITS,
];

export function getUnitsByGrade(grade: SchoolGrade): SchoolUnit[] {
  return SCHOOL_UNITS.filter((unit) => unit.grade === grade);
}

export const SCHOOL_REVIEWS: SchoolReviewSet[] = [...THCS_REVIEWS, ...THPT_REVIEWS];

export function getReviewsByGrade(grade: SchoolGrade): SchoolReviewSet[] {
  return SCHOOL_REVIEWS.filter((r) => r.grade === grade);
}

export const SCHOOL_EXAMS = DEFAULT_SCHOOL_EXAMS;

export const SCHOOL_EXAM_SETS: Record<SchoolExamId, SchoolExamSet[]> = {
  entrance10: [
    { ...DEFAULT_SCHOOL_EXAMS.entrance10, setKey: 'entrance10-1' },
    ...ENTRANCE10_EXTRA_EXAMS,
  ],
  thpt: [
    { ...DEFAULT_SCHOOL_EXAMS.thpt, setKey: 'thpt-1' },
    ...THPT_2025_EXTRA_EXAMS,
  ],
};
