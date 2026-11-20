import { isStepAutoPassed, type TrackStep } from '../../config/audienceTracks';
import type { AudienceId, LearnerProfile } from '../../types/audience';
import type { UserProgress } from '../../types/learning';

const LAST_STEP_KEY = 'myenglish_last_step_v1';
const VISITED_STEPS_KEY = 'myenglish_visited_steps_v1';
const STUDY_MINUTES_KEY = 'myenglish_daily_study_v1';

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getLastStepCode(audience: AudienceId): string | null {
  try {
    const raw = localStorage.getItem(LAST_STEP_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw) as Record<string, string>;
    return map[audience] || null;
  } catch {
    return null;
  }
}

export function setLastStepCode(audience: AudienceId, stepCode: string): void {
  try {
    const raw = localStorage.getItem(LAST_STEP_KEY);
    const map = raw ? (JSON.parse(raw) as Record<string, string>) : {};
    map[audience] = stepCode;
    localStorage.setItem(LAST_STEP_KEY, JSON.stringify(map));
  } catch {
    // ignore storage errors
  }
}

export function getVisitedStepCodes(audience: AudienceId): string[] {
  try {
    const raw = localStorage.getItem(VISITED_STEPS_KEY);
    if (!raw) return [];
    const map = JSON.parse(raw) as Record<string, string[]>;
    return Array.isArray(map[audience]) ? map[audience] : [];
  } catch {
    return [];
  }
}

export function markStepVisited(audience: AudienceId, stepCode: string): string[] {
  try {
    const raw = localStorage.getItem(VISITED_STEPS_KEY);
    const map = raw ? (JSON.parse(raw) as Record<string, string[]>) : {};
    const prev = Array.isArray(map[audience]) ? map[audience] : [];
    if (prev.includes(stepCode)) return prev;
    const next = [...prev, stepCode];
    map[audience] = next;
    localStorage.setItem(VISITED_STEPS_KEY, JSON.stringify(map));
    return next;
  } catch {
    return [];
  }
}

export function isTrackStepDone(
  step: TrackStep,
  profile: LearnerProfile,
  progress: UserProgress,
  visitedCodes: string[]
): boolean {
  if (isStepAutoPassed(step, profile)) return true;
  if (visitedCodes.includes(step.code)) return true;
  if (step.page === 'alphabet' && (progress.passedLetters?.length ?? 0) > 0) return true;
  if (step.page === 'ipa' && (progress.masteredPhonemes?.length ?? 0) > 0) return true;
  if (step.page === 'grammar' && (progress.completedGrammarIds?.length ?? 0) > 0) return true;
  if (step.page === 'sentence' && (progress.completedSentenceIds?.length ?? 0) > 0) return true;
  if (step.page === 'roadmap' && (progress.completedLessons?.length ?? 0) > 0) return true;
  return false;
}

interface DailyStudyRecord {
  date: string;
  seconds: number;
}

export function getTodayStudyMinutes(): number {
  try {
    const raw = localStorage.getItem(STUDY_MINUTES_KEY);
    if (!raw) return 0;
    const rec = JSON.parse(raw) as DailyStudyRecord;
    if (rec.date !== todayIso()) return 0;
    return Math.floor((rec.seconds || 0) / 60);
  } catch {
    return 0;
  }
}

export function addTodayStudySeconds(deltaSeconds: number): number {
  try {
    const today = todayIso();
    const raw = localStorage.getItem(STUDY_MINUTES_KEY);
    const rec: DailyStudyRecord = raw ? JSON.parse(raw) : { date: today, seconds: 0 };
    const nextSeconds = (rec.date === today ? rec.seconds : 0) + Math.max(0, deltaSeconds);
    localStorage.setItem(
      STUDY_MINUTES_KEY,
      JSON.stringify({ date: today, seconds: nextSeconds })
    );
    return Math.floor(nextSeconds / 60);
  } catch {
    return 0;
  }
}
