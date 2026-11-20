const EXERCISE_SCORES_KEY = 'myenglish_exercise_scores_v1';

export interface ExerciseScoreRecord {
  bestCorrect: number;
  total: number;
  lastCorrect: number;
  lastAttemptAt: string;
}

export function getExerciseScoreMap(): Record<string, ExerciseScoreRecord> {
  try {
    const raw = localStorage.getItem(EXERCISE_SCORES_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, ExerciseScoreRecord>;
  } catch {
    return {};
  }
}

export function recordExerciseScore(
  setId: string,
  correct: number,
  total: number
): Record<string, ExerciseScoreRecord> {
  const map = getExerciseScoreMap();
  const prev = map[setId];
  const nextBest = prev ? Math.max(prev.bestCorrect, correct) : correct;
  const next: Record<string, ExerciseScoreRecord> = {
    ...map,
    [setId]: {
      bestCorrect: nextBest,
      total,
      lastCorrect: correct,
      lastAttemptAt: new Date().toISOString(),
    },
  };
  try {
    localStorage.setItem(EXERCISE_SCORES_KEY, JSON.stringify(next));
  } catch {
    // ignore storage quota errors
  }
  return next;
}
