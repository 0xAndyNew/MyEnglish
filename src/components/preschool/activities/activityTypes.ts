import type { PreschoolLevelMeta } from '../../../data/preschool/levels';
import type { LessonActivity, PreschoolUnit, PreschoolWord } from '../../../data/preschool/types';
import type { useKidAudio } from '../ui/useKidAudio';

export interface ActivityProps {
  unit: PreschoolUnit;
  words: PreschoolWord[];
  level: PreschoolLevelMeta;
  activity: LessonActivity;
  audio: ReturnType<typeof useKidAudio>;
  onDone: () => void;
}
