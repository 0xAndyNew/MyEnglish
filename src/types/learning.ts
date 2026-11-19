import type { AudienceId, LearnerProfile } from './audience';

export type { AudienceId, ExamType, LearnerProfile, PageKey } from './audience';

export type CefrLevel = 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type AccentMode = 'en-US' | 'en-GB';

export type IpaCategory = 'monophthong' | 'diphthong' | 'voiceless_consonant' | 'voiced_consonant';

export interface PhonemeIPA {
  id: string;
  symbol: string;
  category: IpaCategory;
  nameVi: string;
  vietApprox: string;
  mouthShape: string;
  tonguePos: string;
  vocalCord: 'Rung cổ họng (Hữu thanh)' | 'Không rung (Bật hơi / Vô thanh)';
  spellingPatterns: string[];
  commonMistake: string;
  examples: {
    word: string;
    ipa: string;
    meaning: string;
    highlight: string;
  }[];
  minimalPair?: {
    wordA: string;
    ipaA: string;
    wordB: string;
    ipaB: string;
    note: string;
  };
}

export interface WordExample {
  en: string;
  vi: string;
  ipa?: string;
}

export interface WordMorphology {
  prefix?: string;
  root: string;
  suffix?: string;
  explanation: string;
}

export interface WordEntry {
  id: string;
  word: string;
  syllables: string[];
  stressIndex: number;
  silentIndices?: number[];
  ipaUS: string;
  ipaUK: string;
  vietPhonetic: string;
  phonicsRule: string;
  pos: string;
  level: CefrLevel;
  meaningVi: string;
  extendedMeaning?: string;
  mnemonic: string;
  morphology?: WordMorphology;
  wordFamily?: string[];
  synonyms?: string[];
  antonyms?: string[];
  collocations?: string[];
  examples: WordExample[];
  topicId?: string;
  audioUrl?: string;
  audiences?: AudienceId[];
}

export interface LessonModule {
  id: string;
  stageId: string;
  level: CefrLevel;
  title: string;
  subtitle: string;
  description: string;
  audiences?: AudienceId[];
  grammarNote?: {
    title: string;
    formula: string;
    explanation: string;
    examples: WordExample[];
  };
  words: WordEntry[];
  practiceSentences: WordExample[];
}

export interface LearningStage {
  id: string;
  level: CefrLevel;
  title: string;
  subtitle: string;
  color: string;
  description: string;
}

export interface RoleplayTurn {
  speaker: 'AI' | 'User';
  en: string;
  ipa: string;
  vi: string;
  tip?: string;
  suggestedReplies?: {
    en: string;
    ipa: string;
    vi: string;
  }[];
}

export interface RoleplayScenario {
  id: string;
  title: string;
  level: CefrLevel;
  category?: string;
  context: string;
  turns: RoleplayTurn[];
  audiences?: AudienceId[];
}

export interface ReadingPassage {
  id: string;
  title: string;
  level: CefrLevel;
  topic: string;
  content: string;
  translation: string;
  audiences?: AudienceId[];
}

export interface SrsCardState {
  wordId: string;
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  nextReviewAt: number;
  lastScore?: number;
}

export interface UserAccount {
  email: string;
  displayName: string;
  passwordHash?: string;
  role?: 'admin' | 'user';
  createdAt: string;
  profile?: LearnerProfile | null;
}

export interface UserProgress {
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  unlockedStepIndex: number; // 0: 1A Alphabet -> 1: 1B IPA -> 2: 2A Vocab -> 3: 2B Grammar -> 4: 3 Listening -> 5: 4 Speaking -> 6: 5 Read/Write/SRS
  trackUnlocks?: Partial<Record<AudienceId, number>>;
  passedLetters?: string[];
  passedIpaPairs?: string[];
  completedGrammarIds?: string[];
  completedSentenceIds?: string[];
  completedLessons: string[];
  masteredPhonemes: string[];
  savedWords: WordEntry[];
  srsCards: Record<string, SrsCardState>;
  pronunciationScores: number[];
  accent: AccentMode;
  geminiApiKey?: string;
  preschool?: {
    completedLessonIds: string[];
    stickers: string[];
    stars: number;
    lastLessonAt?: string;
    lew?: {
      children: {
        id: string;
        name: string;
        ageLevelId: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
        avatar: 'benny' | 'toto' | 'bunny' | 'kitty';
      }[];
      activeChildId: string;
      completedKeys: Record<string, string[]>;
      stickersByChild: Record<string, string[]>;
      observations: {
        id: string;
        childId: string;
        topicId: string;
        levelId: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
        observations: (
          | 'recognized'
          | 'understood'
          | 'spoke'
          | 'real_life'
          | 'needs_review'
          | 'not_observed'
        )[];
        parentNote?: string;
        createdAt: string;
      }[];
    };
  };
}
