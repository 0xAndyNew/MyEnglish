export type ExerciseSkill =
  | 'pronunciation'
  | 'vocab'
  | 'grammar'
  | 'reading'
  | 'writing'
  | 'listening';

export interface McqExercise {
  id: string;
  kind: 'mcq';
  skill?: ExerciseSkill;
  question: string;
  passage?: string;
  audioScript?: string;
  options: string[];
  correctIndex: number;
  explanationVi: string;
}

export interface GapFillExercise {
  id: string;
  kind: 'gap-fill';
  skill?: ExerciseSkill;
  /** Use ___ for each blank */
  sentence: string;
  /** Accepted answers for each blank (if 1 blank, multiple synonyms or variants can be provided, or array of pipe-separated variants per blank) */
  answers: string[];
  hintVi?: string;
  explanationVi: string;
}

export interface WordOrderExercise {
  id: string;
  kind: 'word-order';
  skill?: ExerciseSkill;
  promptVi?: string;
  words: string[];
  answer: string;
  explanationVi: string;
}

export interface ErrorFindExercise {
  id: string;
  kind: 'error-find';
  skill?: ExerciseSkill;
  sentence: string;
  parts: string[];
  wrongIndex: number;
  correction: string;
  explanationVi: string;
}

export interface TransformExercise {
  id: string;
  kind: 'transform';
  skill?: ExerciseSkill;
  prompt: string;
  starter: string;
  answers: string[];
  explanationVi: string;
}

export interface MatchingExercise {
  id: string;
  kind: 'matching';
  skill?: ExerciseSkill;
  promptVi?: string;
  pairs: { left: string; right: string }[];
  explanationVi?: string;
}

export interface TrueFalseExercise {
  id: string;
  kind: 'true-false';
  skill?: ExerciseSkill;
  passage?: string;
  statement: string;
  answer: boolean;
  explanationVi: string;
}

export interface PronunciationExercise {
  id: string;
  kind: 'pronunciation';
  skill?: ExerciseSkill;
  question?: string;
  words: string[];
  correctIndex: number;
  focus: 'sound' | 'stress';
  explanationVi: string;
}

export type Exercise =
  | McqExercise
  | GapFillExercise
  | WordOrderExercise
  | ErrorFindExercise
  | TransformExercise
  | MatchingExercise
  | TrueFalseExercise
  | PronunciationExercise;
