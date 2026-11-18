import { CefrLevel } from './learning';

export type AudienceId = 'preschool' | 'kids' | 'teen' | 'university' | 'worker' | 'exam';
export type ExamType = 'ielts' | 'toeic' | 'vstep' | 'cambridge' | 'toefl';

export type PageKey =
  | 'alphabet'
  | 'ipa'
  | 'roadmap'
  | 'vocab'
  | 'srs'
  | 'grammar'
  | 'sentence'
  | 'listenSpeak'
  | 'writing'
  | 'ocr'
  | 'kids'
  | 'preschool'
  | 'school'
  | 'academic'
  | 'workplace'
  | 'exam'
  | 'workbook'
  | 'profile';

export interface LearnerProfile {
  audience: AudienceId;
  startLevel: CefrLevel;
  dailyMinutes: 10 | 20 | 30 | 60;
  preschool?: {
    ageBand: '1-2' | '3-4' | '5-6';
    levelId: 'tiny' | 'explorer' | 'star';
    childName?: string;
    /** 0 = Sunday ... 6 = Saturday */
    studyDays: number[];
    /** ISO date (YYYY-MM-DD) when the course started — used for the weekly schedule */
    startDate: string;
    parentConfirmed?: boolean;
  };
  kids?: {
    ageBand: '6-7' | '8-10';
    goal: 'intro' | 'primary' | 'yle';
    yleLevel?: 'starters' | 'movers' | 'flyers';
    parentConfirmed?: boolean;
  };
  teen?: {
    grade: 6 | 7 | 8 | 9 | 10 | 11 | 12;
    goal: 'school' | 'entrance10' | 'thpt' | 'communication';
  };
  university?: {
    year: 1 | 2 | 3 | 4;
    majorCategories: string[];
    goal: 'graduation' | 'academic' | 'communication';
    graduationExam?: ExamType;
  };
  worker?: {
    industries: string[];
    goal: 'work' | 'email' | 'interview' | 'travel';
  };
  exam?: {
    examType: ExamType;
    targetScore: string;
    examDate?: string;
    cambridgeLevel?: 'ket' | 'pet' | 'fce';
  };
  updatedAt: string;
}

export interface AudienceMetadataItem {
  id: AudienceId;
  label: string;
  shortLabel: string;
  emoji: string;
  ageRange: string;
  description: string;
  badgeColor: string;
  accentGradient: string;
}

export const AUDIENCE_METADATA: AudienceMetadataItem[] = [
  {
    id: 'preschool',
    label: 'Mầm non (1–6 tuổi)',
    shortLabel: 'Mầm non',
    emoji: '🐣',
    ageRange: '1–6 tuổi (Nhà trẻ – Mẫu giáo)',
    description: 'Học như ở trung tâm: lịch Term – Unit – Buổi học, tranh to, giọng đọc, bài hát, truyện & trò chơi chạm-là-học.',
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-950/50 dark:text-yellow-300 dark:border-yellow-800',
    accentGradient: 'from-yellow-400 to-amber-500',
  },
  {
    id: 'kids',
    label: 'Trẻ em (6–10 tuổi)',
    shortLabel: 'Trẻ em',
    emoji: '🧸',
    ageRange: '6–10 tuổi (Tiểu học)',
    description: 'Học qua tranh ảnh, Phonics vui, truyện kể, trò chơi tương tác & Cambridge YLE.',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
    accentGradient: 'from-amber-400 to-orange-500',
  },
  {
    id: 'teen',
    label: 'Học sinh THCS & THPT (11–18 tuổi)',
    shortLabel: 'Học sinh',
    emoji: '🎒',
    ageRange: 'Lớp 6 – Lớp 12',
    description: 'Bám sát SGK Global Success từng lớp, hệ thống ngữ pháp & luyện đề Thi vào 10 / THPT.',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800',
    accentGradient: 'from-sky-500 to-blue-600',
  },
  {
    id: 'university',
    label: 'Sinh viên Đại học (18–24 tuổi)',
    shortLabel: 'Sinh viên ĐH',
    emoji: '🎓',
    ageRange: '18–24 tuổi (Cao đẳng / ĐH)',
    description: 'Từ vựng học thuật AWL, thuyết trình Seminar, viết Email/Essay/CV & chuẩn đầu ra.',
    badgeColor: 'bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-800',
    accentGradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 'worker',
    label: 'Người đi làm (Công sở & Nghề nghiệp)',
    shortLabel: 'Người đi làm',
    emoji: '💼',
    ageRange: '22+ tuổi (Đi làm)',
    description: 'Giao tiếp thực chiến theo 10 ngành nghề, họp hành, viết Email song ngữ & phỏng vấn.',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
    accentGradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'exam',
    label: 'Người luyện thi chứng chỉ',
    shortLabel: 'Luyện thi',
    emoji: '🏆',
    ageRange: '15+ tuổi (Ôn thi mục tiêu)',
    description: 'Lộ trình chiến thuật & đề thi thử cho IELTS, TOEIC, VSTEP, Cambridge & TOEFL iBT.',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800',
    accentGradient: 'from-rose-500 to-pink-600',
  },
];

export interface ExamMetadataItem {
  id: ExamType;
  label: string;
  shortLabel: string;
  emoji: string;
  scoreOptions: string[];
  defaultScore: string;
  description: string;
}

export const EXAM_METADATA: ExamMetadataItem[] = [
  {
    id: 'ielts',
    label: 'IELTS (Academic / General)',
    shortLabel: 'IELTS',
    emoji: '🇬🇧',
    scoreOptions: ['4.5', '5.5', '6.0', '6.5', '7.0', '7.5+'],
    defaultScore: '6.5',
    description: '4 kỹ năng Nghe – Đọc – Viết – Nói chuẩn học thuật & du học, định cư.',
  },
  {
    id: 'toeic',
    label: 'TOEIC (L&R / S&W)',
    shortLabel: 'TOEIC',
    emoji: '💼',
    scoreOptions: ['450+', '550+', '650+', '750+', '850+', '900+'],
    defaultScore: '650+',
    description: 'Tiếng Anh môi trường làm việc quốc tế & chuẩn đầu ra các trường ĐH.',
  },
  {
    id: 'vstep',
    label: 'VSTEP (B1 – B2 – C1 Việt Nam)',
    shortLabel: 'VSTEP',
    emoji: '🇻🇳',
    scoreOptions: ['B1 (4.0+)', 'B2 (6.0+)', 'C1 (8.5+)'],
    defaultScore: 'B1 (4.0+)',
    description: 'Chứng chỉ khung 6 bậc Việt Nam dành cho sinh viên, cao học & viên chức.',
  },
  {
    id: 'cambridge',
    label: 'Cambridge (KET / PET / FCE)',
    shortLabel: 'Cambridge',
    emoji: '📘',
    scoreOptions: ['A2 Key (KET)', 'B1 Preliminary (PET)', 'B2 First (FCE)'],
    defaultScore: 'B1 Preliminary (PET)',
    description: 'Chứng chỉ quốc tế có giá trị trọn đời từ Cambridge Assessment English.',
  },
  {
    id: 'toefl',
    label: 'TOEFL iBT',
    shortLabel: 'TOEFL iBT',
    emoji: '🎓',
    scoreOptions: ['60+', '75+', '85+', '95+', '105+'],
    defaultScore: '85+',
    description: 'Đánh giá năng lực tiếng Anh học thuật chuẩn Bắc Mỹ cho du học đại học.',
  },
];

export function getAudienceMeta(audience: AudienceId): AudienceMetadataItem {
  return AUDIENCE_METADATA.find((item) => item.id === audience) || AUDIENCE_METADATA.find((item) => item.id === 'worker')!;
}

export function getExamMeta(examType: ExamType): ExamMetadataItem {
  return EXAM_METADATA.find((item) => item.id === examType) || EXAM_METADATA[0];
}

export function createDefaultProfile(audience: AudienceId = 'worker'): LearnerProfile {
  const now = new Date().toISOString();
  switch (audience) {
    case 'preschool':
      return {
        audience: 'preschool',
        startLevel: 'A0',
        dailyMinutes: 10,
        preschool: {
          ageBand: '3-4',
          levelId: 'explorer',
          studyDays: [2, 4],
          startDate: now.slice(0, 10),
          parentConfirmed: true,
        },
        updatedAt: now,
      };
    case 'kids':
      return {
        audience: 'kids',
        startLevel: 'A0',
        dailyMinutes: 10,
        kids: { ageBand: '6-7', goal: 'intro', yleLevel: 'starters', parentConfirmed: true },
        updatedAt: now,
      };
    case 'teen':
      return {
        audience: 'teen',
        startLevel: 'A1',
        dailyMinutes: 20,
        teen: { grade: 9, goal: 'entrance10' },
        updatedAt: now,
      };
    case 'university':
      return {
        audience: 'university',
        startLevel: 'A2',
        dailyMinutes: 30,
        university: {
          year: 2,
          majorCategories: ['IT / Kỹ thuật', 'Giáo dục & Xã hội'],
          goal: 'graduation',
          graduationExam: 'vstep',
        },
        updatedAt: now,
      };
    case 'exam':
      return {
        audience: 'exam',
        startLevel: 'B1',
        dailyMinutes: 30,
        exam: {
          examType: 'ielts',
          targetScore: '6.5',
          cambridgeLevel: 'pet',
        },
        updatedAt: now,
      };
    case 'worker':
    default:
      return {
        audience: 'worker',
        startLevel: 'A0',
        dailyMinutes: 20,
        worker: {
          industries: ['Văn phòng & Email', 'Đời sống & Giao tiếp'],
          goal: 'work',
        },
        updatedAt: now,
      };
  }
}
