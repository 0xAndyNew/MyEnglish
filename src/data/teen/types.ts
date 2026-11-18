import { CefrLevel } from '../../types/learning';
import { Exercise } from '../../types/exercise';

export type SchoolGrade = 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface SchoolGradeMeta {
  grade: SchoolGrade;
  label: string;
  stage: 'THCS' | 'THPT';
  bookTitle: string;
  cefrRange: string;
  focusVi: string;
}

export interface TeenVocabItem {
  word: string;
  pos: string;
  ipa: string;
  meaningVi: string;
  exampleEn: string;
  exampleVi: string;
}

export interface TeenGrammarPoint {
  title: string;
  formula: string;
  explanationVi: string;
  examples: { en: string; vi: string }[];
  examTrap: string;
}

export interface TeenQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanationVi: string;
}

export interface SchoolUnit {
  id: string;
  grade: SchoolGrade;
  unitNumber: number;
  title: string;
  titleVi: string;
  level: CefrLevel;
  objectives: string[];
  vocabulary: TeenVocabItem[];
  grammar: TeenGrammarPoint;
  practiceQuiz: TeenQuizQuestion[];
  exercises?: Exercise[];
}

export type SchoolExamId = 'entrance10' | 'thpt';

export interface SchoolExamQuestion {
  id: string;
  section: string;
  passageTitle?: string;
  passage?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanationVi: string;
}

export interface SchoolExamSet {
  id: SchoolExamId;
  setKey?: string;
  title: string;
  subtitle: string;
  badge: string;
  durationMinutes: number;
  targetDescription: string;
  questions: SchoolExamQuestion[];
}

export interface SchoolReviewSet {
  id: string;
  grade: SchoolGrade;
  reviewNumber: 1 | 2 | 3 | 4;
  title: string;
  unitRange: string;
  exercises: Exercise[];
}

export const SCHOOL_GRADES: SchoolGradeMeta[] = [
  {
    grade: 6,
    label: 'Lớp 6',
    stage: 'THCS',
    bookTitle: 'Global Success 6',
    cefrRange: 'A1',
    focusVi: 'Làm quen thì Hiện tại đơn, Hiện tại tiếp diễn, So sánh hơn & Từ vựng đời sống.',
  },
  {
    grade: 7,
    label: 'Lớp 7',
    stage: 'THCS',
    bookTitle: 'Global Success 7',
    cefrRange: 'A1+ – A2',
    focusVi: 'Quá khứ đơn, Sở thích + V-ing, So sánh ngang bằng & Lượng từ.',
  },
  {
    grade: 8,
    label: 'Lớp 8',
    stage: 'THCS',
    bookTitle: 'Global Success 8',
    cefrRange: 'A2',
    focusVi: 'Câu ghép, So sánh hơn trạng từ, Mạo từ & Quá khứ tiếp diễn.',
  },
  {
    grade: 9,
    label: 'Lớp 9',
    stage: 'THCS',
    bookTitle: 'Global Success 9',
    cefrRange: 'A2+ – B1',
    focusVi: 'Cụm động từ, Câu ước Wish, Hiện tại hoàn thành & Mệnh đề quan hệ — trọng tâm Thi vào 10.',
  },
  {
    grade: 10,
    label: 'Lớp 10',
    stage: 'THPT',
    bookTitle: 'Global Success 10',
    cefrRange: 'B1',
    focusVi: 'Câu bị động, Phối hợp thì, To-infinitive / Bare infinitive & Chủ đề môi trường, cộng đồng.',
  },
  {
    grade: 11,
    label: 'Lớp 11',
    stage: 'THPT',
    bookTitle: 'Global Success 11',
    cefrRange: 'B1+ – B2',
    focusVi: 'Modal verbs, Stative verbs, Mệnh đề phân từ (V-ing / V3-ed) & Di sản, Khí hậu.',
  },
  {
    grade: 12,
    label: 'Lớp 12',
    stage: 'THPT',
    bookTitle: 'Global Success 12',
    cefrRange: 'B2',
    focusVi: 'Mạo từ nâng cao, Mệnh đề quan hệ nối tiếp, Câu phức & Luyện đề Tốt nghiệp THPT.',
  },
];
