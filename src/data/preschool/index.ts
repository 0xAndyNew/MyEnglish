import { buildUnitLessons } from './lessonBuilder';
import type { PreschoolLesson, PreschoolLevelId, PreschoolUnit } from './types';
import { BRIGHT_STARS_UNITS } from './unitsBrightStars';
import { EXPLORERS_UNITS } from './unitsExplorers';
import { TINY_TOTS_UNITS } from './unitsTinyTots';

export * from './types';
export * from './levels';
export * from './phonics';
export * from './songs';
export * from './lessonBuilder';
export * from './schedule';
export { TINY_TOTS_UNITS, EXPLORERS_UNITS, BRIGHT_STARS_UNITS };

export const ALL_PRESCHOOL_UNITS: PreschoolUnit[] = [
  ...TINY_TOTS_UNITS,
  ...EXPLORERS_UNITS,
  ...BRIGHT_STARS_UNITS,
];

export function getUnitsByLevel(levelId: PreschoolLevelId): PreschoolUnit[] {
  return ALL_PRESCHOOL_UNITS.filter((u) => u.levelId === levelId);
}

export function getUnitById(unitId: string): PreschoolUnit | undefined {
  return ALL_PRESCHOOL_UNITS.find((u) => u.id === unitId);
}

export function getAllLessonsForLevel(levelId: PreschoolLevelId): PreschoolLesson[] {
  const units = getUnitsByLevel(levelId);
  return units.flatMap((u, idx) => buildUnitLessons(u, idx > 0 ? units[idx - 1] : undefined));
}

export function getLessonById(lessonId: string): { unit: PreschoolUnit; lesson: PreschoolLesson } | undefined {
  for (const levelUnits of [TINY_TOTS_UNITS, EXPLORERS_UNITS, BRIGHT_STARS_UNITS]) {
    for (let i = 0; i < levelUnits.length; i++) {
      const unit = levelUnits[i];
      const lessons = buildUnitLessons(unit, i > 0 ? levelUnits[i - 1] : undefined);
      const found = lessons.find((l) => l.id === lessonId);
      if (found) return { unit, lesson: found };
    }
  }
  return undefined;
}
