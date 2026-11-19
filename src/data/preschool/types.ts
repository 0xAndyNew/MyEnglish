import type { KidsMelodyId } from '../../utils/kidsSongPlayer';

export type PreschoolLevelId = 'tiny' | 'explorer' | 'star';
export type PreschoolAgeBand = '1-2' | '3-4' | '5-6';

export type ActivityType =
  | 'hello'
  | 'review'
  | 'flashcards'
  | 'song'
  | 'story'
  | 'speak'
  | 'trace'
  | 'magicColor'
  | 'peekaboo'
  | 'bubblePop'
  | 'listenTap'
  | 'feed'
  | 'shadowMatch'
  | 'countTap'
  | 'iSpy'
  | 'phonics'
  | 'blending'
  | 'miniCheck'
  | 'goodbye';

export interface PreschoolWord {
  /** Unique id inside the whole preschool curriculum, e.g. 'ex-u2-red' */
  id: string;
  /** English word or short phrase shown/spoken to the child */
  word: string;
  /** Vietnamese meaning (for parents) */
  meaningVi: string;
  /** Emoji fallback when the illustration is missing */
  emoji: string;
  /**
   * Illustration slug. Image is loaded from /preschool/img/words/<image>.webp.
   * Same slug can be shared by several units (e.g. 'dog').
   */
  image: string;
  /** Optional fun sound / extra line, e.g. 'Woof woof!' */
  sound?: string;
  /** Optional number value (for counting units) */
  count?: number;
  /** Optional hex swatch (for color units) */
  swatch?: string;
}

export interface PreschoolSongLine {
  en: string;
  vi: string;
  /** Short Vietnamese action hint, e.g. 'Vỗ tay' */
  action?: string;
}

export interface PreschoolSong {
  title: string;
  /** Re-use the melody synth from kidsSongPlayer when available */
  melodyId?: KidsMelodyId;
  lines: PreschoolSongLine[];
}

export interface PreschoolStoryPage {
  emoji: string;
  en: string;
  vi: string;
}

export interface PreschoolStory {
  title: string;
  titleVi: string;
  /** Image for page i is /preschool/img/stories/<unitId>-<i+1>.webp */
  pages: PreschoolStoryPage[];
}

export interface PreschoolPattern {
  en: string; // e.g. "It's red."
  vi: string;
  /** Template with ___ placeholder to swap unit words, e.g. "It's ___." */
  template?: string;
}

export interface PreschoolPhonicsFocus {
  /** Letters/sounds taught in this unit, e.g. ['s','a','t'] */
  letters: string[];
  /** CVC words for blending, e.g. ['cat','hat'] */
  cvc?: string[];
}

export interface PreschoolUnit {
  /** e.g. 'tt-u1', 'ex-u2', 'bs-u12' */
  id: string;
  levelId: PreschoolLevelId;
  term: 1 | 2 | 3;
  /** Order inside the level, 1-based */
  order: number;
  title: string;
  titleVi: string;
  emoji: string;
  /** Hex main color of the unit */
  color: string;
  words: PreschoolWord[];
  pattern?: PreschoolPattern;
  phonics?: PreschoolPhonicsFocus;
  song: PreschoolSong;
  story: PreschoolStory;
  /** Tip for parents to practice at home (Vietnamese) */
  parentTipVi: string;
}

export interface LessonActivity {
  type: ActivityType;
  wordIds?: string[];
  letter?: string;
  /** Free target for trace (e.g. 'A', '3', 'circle') */
  target?: string;
}

export type LessonKind = 'discover' | 'practice' | 'story' | 'review';

export interface PreschoolLesson {
  id: string; // `${unitId}-l${index}`
  unitId: string;
  index: 1 | 2 | 3 | 4;
  kind: LessonKind;
  titleVi: string;
  activities: LessonActivity[];
}

export interface PreschoolPhonicsLetter {
  letter: string; // 's' or 'qu'
  sound: string; // spoken approximation for TTS, e.g. 'sss'
  exampleWord: string; // 'sun'
  exampleImage: string; // slug 'sun'
  emoji: string;
  actionVi: string; // 'Uốn tay như con rắn'
  chant: string; // 's-s-s, snake!'
}

export interface PreschoolProgress {
  completedLessonIds: string[];
  stickers: string[];
  stars: number;
  lastLessonAt?: string;
}

export const wordImageUrl = (slug: string) =>
  !slug
    ? '/preschool/img/words/apple.webp'
    : slug.startsWith('/') || slug.startsWith('http') || slug.startsWith('data:')
    ? slug
    : `/preschool/img/words/${slug}.webp`;
export const unitCoverUrl = (unitId: string) =>
  !unitId
    ? '/preschool/img/units/ex-u1.webp'
    : unitId.startsWith('/') || unitId.startsWith('http') || unitId.startsWith('data:')
    ? unitId
    : `/preschool/img/units/${unitId}.webp`;
export const storyPageUrl = (unitId: string, pageIdx: number) =>
  `/preschool/img/stories/${unitId}-${pageIdx + 1}.webp`;
export const mascotUrl = (pose: string) => `/preschool/img/mascot/${pose}.webp`;
