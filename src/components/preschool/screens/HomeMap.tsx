import { Play, Volume2 } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { buildUnitLessons } from '../../../data/preschool/lessonBuilder';
import type { ScheduleEntry } from '../../../data/preschool/schedule';
import {
  unitCoverUrl,
  type PreschoolLesson,
  type PreschoolProgress,
  type PreschoolUnit,
} from '../../../data/preschool/types';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';

interface HomeMapProps {
  units: PreschoolUnit[];
  schedule: ScheduleEntry[];
  progress: PreschoolProgress;
  levelColor: string;
  levelColorDark: string;
  allowAll?: boolean;
  onStartLesson: (unit: PreschoolUnit, lesson: PreschoolLesson) => void;
  onSpeak: (text: string) => void;
}

export const HomeMap: React.FC<HomeMapProps> = ({
  units,
  schedule,
  progress,
  levelColor,
  levelColorDark,
  allowAll = false,
  onStartLesson,
  onSpeak,
}) => {
  const completedSet = useMemo(() => new Set(progress.completedLessonIds), [progress.completedLessonIds]);

  const allOrdered = useMemo(() => {
    return units.flatMap((u, idx) => {
      const prev = idx > 0 ? units[idx - 1] : undefined;
      return buildUnitLessons(u, prev).map((l) => ({ unit: u, lesson: l }));
    });
  }, [units]);

  // Next uncompleted lesson in sequence
  const nextItem = useMemo(() => {
    return allOrdered.find((item) => !completedSet.has(item.lesson.id)) || allOrdered[0];
  }, [allOrdered, completedSet]);

  const [selectedUnitId, setSelectedUnitId] = useState<string>(nextItem?.unit.id || units[0]?.id);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(nextItem?.lesson.id || '');
  const [coverFailed, setCoverFailed] = useState(false);

  useEffect(() => {
    if (nextItem) {
      setSelectedUnitId(nextItem.unit.id);
      setSelectedLessonId(nextItem.lesson.id);
    }
  }, [nextItem?.lesson.id]);

  const activeUnit = useMemo(
    () => units.find((u) => u.id === selectedUnitId) || nextItem?.unit || units[0],
    [units, selectedUnitId, nextItem]
  );

  const unitLessons = useMemo(() => {
    const idx = units.findIndex((u) => u.id === activeUnit.id);
    return buildUnitLessons(activeUnit, idx > 0 ? units[idx - 1] : undefined);
  }, [units, activeUnit]);

  const activeLesson =
    unitLessons.find((l) => l.id === selectedLessonId) ||
    unitLessons.find((l) => !completedSet.has(l.id)) ||
    unitLessons[0];

  const scheduleInfo = schedule.find((s) => s.lesson?.id === activeLesson?.id);

  useEffect(() => {
    setCoverFailed(false);
  }, [activeUnit.id]);

  // Determine which lessons are unlocked (completed + current nextItem)
  const unlockedIds = useMemo(() => {
    const set = new Set<string>(completedSet);
    if (nextItem) set.add(nextItem.lesson.id);
    return set;
  }, [completedSet, nextItem]);

  return (
    <div className="w-full max-w-[980px] mx-auto px-3 sm:px-4 pb-4 sm:pb-6 pt-1 space-y-3 sm:space-y-5">
      {/* Unit selector strip (horizontal scrollable adventure pills) */}
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1.5 pt-0.5">
        {units.map((u) => {
          const isCurrent = u.id === activeUnit.id;
          const uLessons = buildUnitLessons(u);
          const doneCount = uLessons.filter((l) => completedSet.has(l.id)).length;
          const unitUnlocked = allowAll || uLessons.some((l) => unlockedIds.has(l.id));
          return (
            <button
              key={u.id}
              type="button"
              disabled={!unitUnlocked}
              onClick={() => {
                setSelectedUnitId(u.id);
                const target = uLessons.find((l) => !completedSet.has(l.id)) || uLessons[0];
                setSelectedLessonId(target.id);
                onSpeak(u.title);
              }}
              style={
                isCurrent
                  ? { borderColor: u.color, backgroundColor: '#FFFFFF' }
                  : undefined
              }
              className={`shrink-0 min-h-[54px] sm:min-h-[64px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-[20px] sm:rounded-[22px] border-3 flex items-center gap-2 sm:gap-2.5 transition shadow-sm ${
                isCurrent
                  ? 'border-4 scale-[1.03] shadow-md'
                  : unitUnlocked
                  ? 'bg-white/80 border-white hover:border-amber-200'
                  : 'bg-white/45 border-white/60 opacity-50 cursor-not-allowed'
              }`}
            >
              <img
                src={unitCoverUrl(u.id)}
                alt={u.title}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl object-contain shrink-0"
              />
              <div className="text-left">
                <div className="font-kid font-extrabold text-slate-800 text-xs sm:text-base leading-tight">
                  {u.order}. {u.title}
                </div>
                <div className="text-[11px] font-bold text-slate-400">
                  {doneCount}/4 {progress.stickers.includes(u.id) ? '⭐' : ''}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 4-step lesson path for the selected unit */}
      <div className="bg-white/85 backdrop-blur rounded-[24px] sm:rounded-[28px] border-4 border-white p-3 sm:p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
          <div className="font-kid font-extrabold text-slate-700 text-sm sm:text-lg">
            Term {activeUnit.term} · Unit {activeUnit.order}: {activeUnit.title}
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-400">{activeUnit.titleVi}</span>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4 items-center">
          {unitLessons.map((les) => {
            const done = completedSet.has(les.id);
            const isNext = nextItem?.lesson.id === les.id;
            const unlocked = allowAll || unlockedIds.has(les.id);
            const isSelected = activeLesson?.id === les.id;

            return (
              <button
                key={les.id}
                type="button"
                disabled={!unlocked}
                onClick={() => setSelectedLessonId(les.id)}
                className={`min-h-[60px] sm:min-h-[76px] rounded-[18px] sm:rounded-[22px] p-1.5 sm:p-2 flex flex-col items-center justify-center gap-0.5 sm:gap-1 border-3 transition ${
                  isSelected
                    ? 'border-4 border-amber-400 bg-amber-50 scale-[1.04] shadow-md'
                    : done
                    ? 'border-2 border-emerald-300 bg-emerald-50/70'
                    : unlocked
                    ? 'border-2 border-amber-200 bg-white'
                    : 'border-2 border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed'
                }`}
              >
                <span className="text-xl sm:text-3xl leading-none">
                  {done ? '✅' : isNext ? '🟡' : les.index === 4 ? '🏁' : unlocked ? '🟢' : '🔒'}
                </span>
                <span className="font-kid font-extrabold text-xs sm:text-sm text-slate-700 text-center leading-tight">
                  Bài {les.index}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Play Card */}
      <div
        className="rounded-[28px] sm:rounded-[36px] border-4 border-white p-4 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6"
        style={{ background: `linear-gradient(135deg, #FFFFFF 0%, ${activeUnit.color}22 100%)` }}
      >
        <div className="flex flex-row items-center gap-4 text-left w-full md:w-auto">
          <button
            type="button"
            onClick={() => onSpeak(activeUnit.title)}
            className="w-24 h-24 sm:w-44 sm:h-44 rounded-[22px] sm:rounded-[28px] bg-white border-4 border-white shadow-md flex items-center justify-center overflow-hidden shrink-0 active:scale-95 transition"
          >
            {!coverFailed ? (
              <img
                src={unitCoverUrl(activeUnit.id)}
                alt={activeUnit.title}
                onError={() => setCoverFailed(true)}
                className="w-full h-full object-contain p-1.5 sm:p-2"
              />
            ) : (
              <span className="text-5xl sm:text-7xl">{activeUnit.emoji}</span>
            )}
          </button>

          <div className="space-y-1 sm:space-y-2 min-w-0">
            <button
              type="button"
              onClick={() => onSpeak(activeUnit.title)}
              className="inline-flex items-center gap-1.5 font-kid font-extrabold text-2xl sm:text-4xl text-slate-800 hover:text-amber-600 transition text-left"
            >
              <span>{activeUnit.title}</span>
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 shrink-0" />
            </button>
            <div className="text-xs sm:text-sm font-bold text-slate-500">{activeLesson?.titleVi}</div>
            {scheduleInfo && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/90 border border-amber-200 text-[11px] sm:text-xs font-bold text-slate-600">
                <span>📅</span>
                <span>
                  {scheduleInfo.weekdayVi} ({scheduleInfo.dateStr.slice(5).split('-').reverse().join('/')})
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-3 w-full md:w-auto shrink-0">
          <Mascot
            pose="hello"
            size="sm"
            speechBubble="Let's play!"
            onClick={() => onSpeak("Let's play!")}
            className="md:flex"
          />
          {activeLesson && (
            <BigButton
              color={levelColor}
              shadowColor={levelColorDark}
              size="lg"
              onClick={() => onStartLesson(activeUnit, activeLesson)}
              className="flex-1 md:flex-none md:min-w-[220px] sm:min-h-[88px] sm:text-3xl"
            >
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
              <span>PLAY</span>
            </BigButton>
          )}
        </div>
      </div>
    </div>
  );
};
