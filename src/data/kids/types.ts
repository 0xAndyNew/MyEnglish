import { Exercise } from '../../types/exercise';

export type YleLevel = 'starters' | 'movers' | 'flyers';

export interface KidsVocabWord {
  id: string;
  word: string;
  emoji: string;
  phoneticVi: string;
  ipa: string;
  meaningVi: string;
  sampleSentence: string;
  sampleVi: string;
  countNumber?: number;
  countEmoji?: string;
  swatchHex?: string;
  funTip?: string;
}

export interface KidsStoryLine {
  speaker: string;
  avatar: string;
  en: string;
  vi: string;
}

export interface KidsStory {
  title: string;
  titleVi: string;
  lines: KidsStoryLine[];
}

export interface KidsUnit {
  id: string;
  title: string;
  titleVi: string;
  emoji: string;
  color: string;
  cardBg: string;
  badgeClass: string;
  songChantTitle: string;
  songChant: string;
  songChantVi: string;
  words: KidsVocabWord[];
  story: KidsStory;
  exercises?: Exercise[];
}

export interface KidsChunkSwap {
  label: string;
  emoji: string;
  fullEn: string;
  fullVi: string;
}

export interface KidsSentenceChunk {
  id: string;
  category: 'Chào hỏi' | 'Sở thích' | 'Xin phép' | 'Vui chơi';
  emoji: string;
  pattern: string;
  exampleEn: string;
  ipa: string;
  phoneticVi: string;
  meaningVi: string;
  tipForKids: string;
  swaps?: KidsChunkSwap[];
}

export interface KidsYleQuestion {
  id: string;
  level: YleLevel;
  type: 'picture-word' | 'listen-pick' | 'sentence-gap';
  prompt: string;
  emojiHint: string;
  spokenText: string;
  options: string[];
  correctIndex: number;
  funExplain: string;
}

export interface KidsYleMockTest {
  id: string;
  level: YleLevel;
  title: string;
  durationMinutes: number;
  questions: KidsYleQuestion[];
}
