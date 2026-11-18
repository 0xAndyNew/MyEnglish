import type { PreschoolAgeBand, PreschoolLevelId } from './types';

export interface PreschoolLevelMeta {
  id: PreschoolLevelId;
  name: string;
  nameVi: string;
  emoji: string;
  ageBand: PreschoolAgeBand;
  ageLabel: string;
  color: string;
  colorDark: string;
  colorSoft: string;
  terms: number;
  unitsPerTerm: number;
  wordsPerUnit: number;
  /** Max number of choices shown in a game screen */
  maxChoices: number;
  /** Drag & drop allowed */
  allowDrag: boolean;
  /** Wrong answers are possible (false = every tap is praised) */
  allowWrong: boolean;
  /** Show parent co-play tips in activities */
  parentTips: boolean;
  /** Soft break reminder after N minutes */
  breakAfterMinutes: number;
  lessonMinutes: string;
  focusVi: string;
}

export const PRESCHOOL_LEVELS: Record<PreschoolLevelId, PreschoolLevelMeta> = {
  tiny: {
    id: 'tiny',
    name: 'Tiny Tots',
    nameVi: 'Mầm Bé Xinh',
    emoji: '🐣',
    ageBand: '1-2',
    ageLabel: '1–2 tuổi',
    color: '#FFB84D',
    colorDark: '#E8912A',
    colorSoft: '#FFF1DB',
    terms: 2,
    unitsPerTerm: 4,
    wordsPerUnit: 4,
    maxChoices: 1,
    allowDrag: false,
    allowWrong: false,
    parentTips: true,
    breakAfterMinutes: 7,
    lessonMinutes: '5–7 phút',
    focusVi: 'Nghe – nhận biết tranh – hát vận động cùng bố mẹ',
  },
  explorer: {
    id: 'explorer',
    name: 'Little Explorers',
    nameVi: 'Nhà Thám Hiểm Nhí',
    emoji: '🐥',
    ageBand: '3-4',
    ageLabel: '3–4 tuổi',
    color: '#4CC38A',
    colorDark: '#2E9E68',
    colorSoft: '#E3F7EC',
    terms: 3,
    unitsPerTerm: 4,
    wordsPerUnit: 6,
    maxChoices: 3,
    allowDrag: true,
    allowWrong: true,
    parentTips: true,
    breakAfterMinutes: 12,
    lessonMinutes: '10–12 phút',
    focusVi: 'Từ vựng chủ đề – mẫu câu ngắn – đếm 1–6 – tô hình',
  },
  star: {
    id: 'star',
    name: 'Bright Stars',
    nameVi: 'Ngôi Sao Sáng',
    emoji: '⭐',
    ageBand: '5-6',
    ageLabel: '5–6 tuổi',
    color: '#5B8DEF',
    colorDark: '#3A6AD0',
    colorSoft: '#E6EEFF',
    terms: 3,
    unitsPerTerm: 4,
    wordsPerUnit: 8,
    maxChoices: 4,
    allowDrag: true,
    allowWrong: true,
    parentTips: false,
    breakAfterMinutes: 15,
    lessonMinutes: '12–15 phút',
    focusVi: 'Phonics 26 âm – ghép âm CVC – hỏi đáp – đếm 1–10 – tô chữ',
  },
};

export const PRESCHOOL_LEVEL_ORDER: PreschoolLevelId[] = ['tiny', 'explorer', 'star'];

export function levelForAgeBand(age: PreschoolAgeBand): PreschoolLevelId {
  if (age === '1-2') return 'tiny';
  if (age === '5-6') return 'star';
  return 'explorer';
}

export const WEEKDAY_LABELS_VI = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
