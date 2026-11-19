export type LewAgeLevelId = 'level1' | 'level2' | 'level3' | 'level4' | 'level5';

export type LewObservationCode =
  | 'recognized'
  | 'understood'
  | 'spoke'
  | 'real_life'
  | 'needs_review'
  | 'not_observed';

export type LewAvatarId = 'benny' | 'toto' | 'bunny' | 'kitty';

export interface LewChildProfile {
  id: string;
  name: string;
  ageLevelId: LewAgeLevelId;
  avatar: LewAvatarId;
  birthYear?: number;
  interests?: string[];
}

export type LewCategoryTag =
  | 'family'
  | 'body'
  | 'animal'
  | 'color_shape'
  | 'food'
  | 'toy'
  | 'home'
  | 'school'
  | 'number'
  | 'nature'
  | 'action'
  | 'feeling'
  | 'clothes'
  | 'vehicle'
  | 'sea'
  | 'wild'
  | 'farm'
  | 'drink'
  | 'veggie'
  | 'playground'
  | 'job'
  | 'sky'
  | 'weather'
  | 'party'
  | 'bug'
  | 'garden'
  | 'place'
  | 'sport'
  | 'festival'
  | 'time'
  | 'object'
  | 'play'
  | 'people'
  | 'shape'
  | 'art';

export interface LewVocabItem {
  id: string;
  word: string;
  meaningVi: string;
  ipa: string;
  imageSlug: string;
  category: LewCategoryTag;
  sampleEn: string;
  sampleVi: string;
  soundEffect?: string;
}

export interface LewLevelVariant {
  levelId: LewAgeLevelId;
  objectiveVi: string;
  expectedOutcomeVi: string;
  wordCount: number;
  sampleSentences: { en: string; vi: string }[];
  moveAndSay: { en: string; vi: string; actionVi: string }[];
  storyPages: { imageSlug: string; en: string; vi: string }[];
  phonicsNote?: { letter: string; sound: string; exampleWord: string; imageSlug: string };
}

export interface LewParentGuide {
  targetWordsSummaryVi: string;
  sampleSentences: { en: string; vi: string }[];
  materialsVi: string;
  howToGuideVi: string[];
  offlineGameVi: string;
}

export interface LewTopic {
  id: string;
  code: string; // '01' .. '12'
  order: number;
  titleEn: string;
  titleVi: string;
  subtitleVi: string;
  color: string;
  softBg: string;
  coverSlug: string; // /preschool/img/units/<coverSlug>.webp
  words: LewVocabItem[];
  levels: Record<LewAgeLevelId, LewLevelVariant>;
  parentGuide: LewParentGuide;
}

export interface LewObservationRecord {
  id: string;
  childId: string;
  topicId: string;
  levelId: LewAgeLevelId;
  observations: LewObservationCode[];
  parentNote?: string;
  createdAt: string;
}

export interface LewStoreState {
  children: LewChildProfile[];
  activeChildId: string;
  completedKeys: Record<string, string[]>; // childId -> [`${topicId}:${levelId}`]
  stickersByChild: Record<string, string[]>; // childId -> topicId[]
  observations: LewObservationRecord[];
  lastTopicByChild?: Record<string, string>;
}
