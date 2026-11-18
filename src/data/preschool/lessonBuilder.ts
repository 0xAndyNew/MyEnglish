import type { LessonActivity, PreschoolLesson, PreschoolUnit } from './types';

function pickTraceTarget(unit: PreschoolUnit): string {
  if (unit.id === 'ex-u3') return '3';
  if (unit.id === 'ex-u4') return 'circle';
  if (unit.id === 'bs-u2') return '5';
  if (unit.phonics?.letters?.[0]) return unit.phonics.letters[0].toUpperCase();
  if (unit.levelId === 'explorer') {
    const shapes = ['circle', 'square', 'triangle', 'star'];
    return shapes[(unit.order - 1) % shapes.length];
  }
  const firstLetter = unit.words[0]?.word.replace(/[^a-z]/gi, '')[0];
  return (firstLetter || 'A').toUpperCase();
}

/**
 * Generates the 4 center-style lessons for a unit:
 * 1. Khám phá (Discover)
 * 2. Luyện tập (Practice)
 * 3. Kể chuyện (Story & Speak / Phonics)
 * 4. Ôn tập & Sticker (Review & Mini-check)
 */
export function buildUnitLessons(unit: PreschoolUnit, prevUnit?: PreschoolUnit): PreschoolLesson[] {
  const allIds = unit.words.map((w) => w.id);
  const half = Math.ceil(allIds.length / 2);
  const firstHalf = allIds.slice(0, half);
  const secondHalf = allIds.slice(half);
  const prevIds = prevUnit ? prevUnit.words.slice(0, 2).map((w) => w.id) : [];

  const isTiny = unit.levelId === 'tiny';
  const isExplorer = unit.levelId === 'explorer';
  const isCountUnit = unit.words.some((w) => typeof w.count === 'number');
  const traceTarget = pickTraceTarget(unit);

  // Lesson 1: Khám phá (First half of vocabulary + gentle play)
  const l1Activities: LessonActivity[] = [
    { type: 'hello' },
    { type: 'flashcards', wordIds: firstHalf },
    { type: 'song' },
    isTiny
      ? { type: 'peekaboo', wordIds: firstHalf }
      : isCountUnit
      ? { type: 'countTap', wordIds: firstHalf }
      : { type: 'listenTap', wordIds: firstHalf },
    isTiny ? { type: 'bubblePop', wordIds: firstHalf } : { type: 'magicColor', wordIds: firstHalf.slice(0, 2) },
    { type: 'goodbye' },
  ];

  // Lesson 2: Luyện tập (Second half + action / drag game + trace)
  const l2Activities: LessonActivity[] = [
    { type: 'hello' },
    ...(prevIds.length ? [{ type: 'review' as const, wordIds: prevIds }] : []),
    { type: 'flashcards', wordIds: secondHalf.length ? secondHalf : firstHalf },
    { type: 'song' },
    isTiny
      ? { type: 'magicColor', wordIds: allIds.slice(0, 3) }
      : isExplorer
      ? { type: 'feed', wordIds: allIds }
      : { type: 'shadowMatch', wordIds: allIds.slice(0, 4) },
    ...(isTiny ? [{ type: 'bubblePop' as const, wordIds: allIds }] : [{ type: 'trace' as const, target: traceTarget }]),
    { type: 'goodbye' },
  ];

  // Lesson 3: Kể chuyện & Giao tiếp / Phonics
  const l3Activities: LessonActivity[] = [
    { type: 'hello' },
    { type: 'review', wordIds: firstHalf.slice(0, 2) },
    { type: 'story' },
    ...(isTiny
      ? [{ type: 'peekaboo' as const, wordIds: allIds }]
      : [{ type: 'speak' as const, wordIds: allIds.slice(0, 3) }]),
    ...(unit.phonics?.letters?.length
      ? [{ type: 'phonics' as const, letter: unit.phonics.letters[0] }]
      : isExplorer
      ? [{ type: 'shadowMatch' as const, wordIds: allIds.slice(0, 3) }]
      : []),
    ...(unit.phonics?.cvc?.length ? [{ type: 'blending' as const }] : []),
    { type: 'goodbye' },
  ];

  // Lesson 4: Ôn tập tổng hợp & Nhận Sticker
  const l4Activities: LessonActivity[] = [
    { type: 'hello' },
    { type: 'song' },
    isTiny
      ? { type: 'bubblePop', wordIds: allIds }
      : isExplorer
      ? { type: 'listenTap', wordIds: allIds }
      : { type: 'iSpy', wordIds: allIds.slice(0, 4) },
    isTiny
      ? { type: 'magicColor', wordIds: allIds.slice(0, 2) }
      : isCountUnit
      ? { type: 'countTap', wordIds: allIds }
      : { type: 'feed', wordIds: allIds },
    ...(unit.phonics?.letters?.length && unit.phonics.letters.length > 1
      ? [{ type: 'phonics' as const, letter: unit.phonics.letters[1] }]
      : []),
    ...(isTiny ? [] : [{ type: 'miniCheck' as const, wordIds: allIds }]),
    { type: 'goodbye' },
  ];

  return [
    { id: `${unit.id}-l1`, unitId: unit.id, index: 1, kind: 'discover', titleVi: 'Buổi 1 · Khám phá', activities: l1Activities },
    { id: `${unit.id}-l2`, unitId: unit.id, index: 2, kind: 'practice', titleVi: 'Buổi 2 · Luyện tập', activities: l2Activities },
    { id: `${unit.id}-l3`, unitId: unit.id, index: 3, kind: 'story', titleVi: 'Buổi 3 · Kể chuyện', activities: l3Activities },
    { id: `${unit.id}-l4`, unitId: unit.id, index: 4, kind: 'review', titleVi: 'Buổi 4 · Ôn tập & Sticker', activities: l4Activities },
  ];
}
