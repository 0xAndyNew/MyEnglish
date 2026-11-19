export type LewAgeLevelId = 'level1' | 'level2' | 'level3' | 'level4' | 'level5';

export type LewContentStatus = 'draft' | 'review' | 'published' | 'archived';

export type LewCmsRole = 'admin' | 'editor' | 'viewer' | 'user';

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
  birthMonth?: number;
  birthYear?: number;
  familyLanguage?: string;
  interests?: string[];
  skippedTopicIds?: string[];
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
  customImageUrl?: string;
  customAudioUrl?: string;
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

export interface LewActivityToggle {
  warmup: boolean;
  input: boolean;
  listening: boolean;
  games: boolean;
  parentActivity: boolean;
  story: boolean;
  enabledGameModes?: ('listen' | 'match' | 'missing' | 'sort' | 'story_order' | 'move')[];
}

export interface LewTopic {
  id: string;
  code: string; // '01' .. '36'
  order: number;
  titleEn: string;
  titleVi: string;
  subtitleVi: string;
  color: string;
  softBg: string;
  coverSlug: string; // /preschool/img/units/<coverSlug>.webp or custom URL
  words: LewVocabItem[];
  levels: Record<LewAgeLevelId, LewLevelVariant>;
  parentGuide: LewParentGuide;
  status?: LewContentStatus;
  version?: number;
  estimatedMinutes?: number;
  licenseNote?: string;
  enabledActivities?: LewActivityToggle;
  updatedBy?: string;
  updatedAt?: string;
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

export interface LewLessonProgressRecord {
  id: string;
  childId: string;
  topicId: string;
  levelId: LewAgeLevelId;
  status: 'started' | 'completed' | 'skipped';
  audioReplays: number;
  gameAttempts: number;
  activitiesTried: string[];
  offlineActivityDone?: boolean;
  startedAt: string;
  completedAt?: string;
  updatedAt: string;
}

export interface LewMediaAsset {
  id: string;
  type: 'image' | 'audio' | 'printable';
  title: string;
  storageKey: string;
  url: string;
  mimeType: string;
  licenseNote: string;
  status: 'active' | 'archived';
  createdBy: string;
  createdAt: string;
}

export interface LewAuditLogEntry {
  id: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  summary: string;
  createdAt: string;
}

export interface LewCmsDashboardStats {
  totalParents: number;
  totalChildren: number;
  topicsByStatus: Record<LewContentStatus, number>;
  totalVocabWords: number;
  totalStories: number;
  totalMediaAssets: number;
  totalCompletedLessons: number;
  totalObservations: number;
  popularTopics: { topicId: string; titleEn: string; titleVi: string; count: number }[];
}

export interface LewStoreState {
  children: LewChildProfile[];
  activeChildId: string;
  completedKeys: Record<string, string[]>; // childId -> [`${topicId}:${levelId}`]
  stickersByChild: Record<string, string[]>; // childId -> topicId[]
  observations: LewObservationRecord[];
  lessonProgress?: LewLessonProgressRecord[];
  lastTopicByChild?: Record<string, string>;
}
