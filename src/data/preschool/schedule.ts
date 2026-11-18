import type { LearnerProfile } from '../../types/audience';
import { buildUnitLessons } from './lessonBuilder';
import type { PreschoolLesson, PreschoolProgress, PreschoolUnit } from './types';

export type ScheduleItemStatus = 'done' | 'today' | 'upcoming' | 'overdue' | 'review_week';

export interface ScheduleEntry {
  id: string;
  week: number;
  term: 1 | 2 | 3;
  dateStr: string; // YYYY-MM-DD
  weekdayVi: string;
  unitId?: string;
  unitTitle?: string;
  unitTitleVi?: string;
  unitEmoji?: string;
  lesson?: PreschoolLesson;
  isReviewWeek?: boolean;
  status: ScheduleItemStatus;
}

const WEEKDAY_VI = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

function parseIsoDate(iso?: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
  if (!m) {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

function formatIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Generates sequential calendar dates starting from `startDate` matching `studyDays` (0=Sun..6=Sat).
 */
function generateStudyDates(startDate: Date, studyDays: number[], count: number): Date[] {
  const validDays = new Set(studyDays.length ? studyDays : [2, 4]);
  const out: Date[] = [];
  const cursor = new Date(startDate);
  let guard = 0;
  while (out.length < count && guard < 1500) {
    if (validDays.has(cursor.getDay())) {
      out.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
    guard++;
  }
  return out;
}

/**
 * Builds the center-style Term → Week → Unit → Lesson schedule.
 * After every 4 units (end of a Term), inserts 1 Review Week (Tuần ôn tập) of equal session slots.
 * Lessons are unlocked sequentially (completed or next-to-do), never hard-locked by calendar date.
 */
export function buildSchedule(
  profile: LearnerProfile,
  levelUnits: PreschoolUnit[],
  progress?: PreschoolProgress
): ScheduleEntry[] {
  const studyDays = profile.preschool?.studyDays?.length ? profile.preschool.studyDays : [2, 4];
  const slotsPerWeek = Math.max(1, studyDays.length);
  const start = parseIsoDate(profile.preschool?.startDate);
  const completedSet = new Set(progress?.completedLessonIds || []);
  const todayIso = formatIso(new Date());

  // Build logical slots: 4 lessons per unit + 1 review-week block after every 4 units
  interface RawSlot {
    term: 1 | 2 | 3;
    unit?: PreschoolUnit;
    lesson?: PreschoolLesson;
    isReviewWeek?: boolean;
  }
  const rawSlots: RawSlot[] = [];

  levelUnits.forEach((unit, idx) => {
    const prevUnit = idx > 0 ? levelUnits[idx - 1] : undefined;
    const lessons = buildUnitLessons(unit, prevUnit);
    for (const lesson of lessons) {
      rawSlots.push({ term: unit.term, unit, lesson });
    }
    // End of every 4-unit Term → insert a Review Week
    const isEndOfTerm = (idx + 1) % 4 === 0;
    if (isEndOfTerm) {
      for (let r = 0; r < slotsPerWeek; r++) {
        rawSlots.push({ term: unit.term, isReviewWeek: true });
      }
    }
  });

  const dates = generateStudyDates(start, studyDays, rawSlots.length);
  let foundCurrent = false;

  return rawSlots.map((slot, idx) => {
    const d = dates[idx] || new Date();
    const dateStr = formatIso(d);
    const week = Math.floor(idx / slotsPerWeek) + 1;
    const weekdayVi = WEEKDAY_VI[d.getDay()];

    if (slot.isReviewWeek || !slot.lesson || !slot.unit) {
      return {
        id: `review-t${slot.term}-w${week}-${idx}`,
        week,
        term: slot.term,
        dateStr,
        weekdayVi,
        isReviewWeek: true,
        status: 'review_week',
      };
    }

    const done = completedSet.has(slot.lesson.id);
    let status: ScheduleItemStatus = 'upcoming';
    if (done) {
      status = 'done';
    } else if (!foundCurrent) {
      foundCurrent = true;
      status = 'today';
    } else if (dateStr < todayIso) {
      status = 'overdue';
    }

    return {
      id: slot.lesson.id,
      week,
      term: slot.term,
      dateStr,
      weekdayVi,
      unitId: slot.unit.id,
      unitTitle: slot.unit.title,
      unitTitleVi: slot.unit.titleVi,
      unitEmoji: slot.unit.emoji,
      lesson: slot.lesson,
      status,
    };
  });
}
