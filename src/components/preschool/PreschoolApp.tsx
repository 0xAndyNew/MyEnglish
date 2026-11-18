import React, { useMemo, useState } from 'react';
import { getUnitsByLevel } from '../../data/preschool';
import { PRESCHOOL_LEVELS } from '../../data/preschool/levels';
import { buildSchedule } from '../../data/preschool/schedule';
import type { PreschoolLesson, PreschoolProgress, PreschoolUnit } from '../../data/preschool/types';
import type { LearnerProfile } from '../../types/audience';
import type { AccentMode } from '../../types/learning';
import { LessonPlayer } from './lesson/LessonPlayer';
import { HomeMap } from './screens/HomeMap';
import { ParentZone } from './screens/ParentZone';
import { SongsCorner } from './screens/SongsCorner';
import { StickerBook } from './screens/StickerBook';
import { StoryCorner } from './screens/StoryCorner';
import { BreakReminder } from './shell/BreakReminder';
import { KidDock, type KidScreenId } from './shell/KidDock';
import { KidTopBar } from './shell/KidTopBar';
import { ParentGate } from './shell/ParentGate';
import { useBreakTimer } from './ui/useBreakTimer';
import { useKidAudio } from './ui/useKidAudio';

interface PreschoolAppProps {
  profile: LearnerProfile;
  progress: PreschoolProgress;
  accent?: AccentMode;
  displayName: string;
  isAdmin?: boolean;
  isPreview?: boolean;
  onProgressChange: (next: PreschoolProgress, gainedXp?: number) => void;
  onSaveProfile: (next: LearnerProfile) => Promise<void> | void;
  onOpenProfileModal: () => void;
  onExitPreview?: () => void;
  onLogout: () => void;
}

export const PreschoolApp: React.FC<PreschoolAppProps> = ({
  profile,
  progress: rawProgress,
  accent = 'en-US',
  displayName,
  isAdmin = false,
  isPreview = false,
  onProgressChange,
  onSaveProfile,
  onOpenProfileModal,
  onExitPreview,
  onLogout,
}) => {
  const progress: PreschoolProgress = useMemo(
    () => ({
      completedLessonIds: Array.isArray(rawProgress?.completedLessonIds) ? rawProgress.completedLessonIds : [],
      stickers: Array.isArray(rawProgress?.stickers) ? rawProgress.stickers : [],
      stars: Number(rawProgress?.stars || 0),
      lastLessonAt: rawProgress?.lastLessonAt,
    }),
    [rawProgress]
  );
  const levelId = profile.preschool?.levelId || 'explorer';
  const levelMeta = PRESCHOOL_LEVELS[levelId];
  const childName = profile.preschool?.childName?.trim() || displayName || 'Bé yêu';
  const units = useMemo(() => getUnitsByLevel(levelId), [levelId]);
  const schedule = useMemo(() => buildSchedule(profile, units, progress), [profile, units, progress]);

  const audio = useKidAudio(accent);

  const [screen, setScreen] = useState<KidScreenId>('home');
  const [activeSession, setActiveSession] = useState<{
    unit: PreschoolUnit;
    lesson: PreschoolLesson;
  } | null>(null);

  const [gateOpen, setGateOpen] = useState(false);
  const [parentMode, setParentMode] = useState(false);

  const { breakDue, dismissBreak } = useBreakTimer(
    levelMeta.breakAfterMinutes,
    parentMode || gateOpen
  );

  const currentScheduleEntry = schedule.find((s) => s.status === 'today') || schedule[0];
  const termUnitLabel = currentScheduleEntry?.unitTitle
    ? `Term ${currentScheduleEntry.term} · ${currentScheduleEntry.unitTitle}`
    : `${levelMeta.emoji} ${levelMeta.name}`;

  const handleLessonComplete = (earnedSticker: boolean) => {
    if (!activeSession) return;
    const { unit, lesson } = activeSession;
    const alreadyDone = progress.completedLessonIds.includes(lesson.id);
    const completedLessonIds = alreadyDone
      ? progress.completedLessonIds
      : [...progress.completedLessonIds, lesson.id];
    const stickers =
      earnedSticker && !progress.stickers.includes(unit.id)
        ? [...progress.stickers, unit.id]
        : progress.stickers;
    const gainedStars = alreadyDone ? 1 : earnedSticker ? 5 : 3;

    onProgressChange(
      {
        completedLessonIds,
        stickers,
        stars: (progress.stars || 0) + gainedStars,
        lastLessonAt: new Date().toISOString(),
      },
      gainedStars * 10
    );

    setActiveSession(null);
    setScreen('home');
  };

  if (parentMode) {
    return (
      <ParentZone
        profile={profile}
        units={units}
        schedule={schedule}
        progress={progress}
        isAdmin={isAdmin}
        isPreview={isPreview}
        onBackToKid={() => setParentMode(false)}
        onSaveProfile={onSaveProfile}
        onOpenProfileModal={onOpenProfileModal}
        onExitPreview={onExitPreview}
        onLogout={onLogout}
      />
    );
  }

  if (activeSession) {
    return (
      <>
        <LessonPlayer
          unit={activeSession.unit}
          lesson={activeSession.lesson}
          level={levelMeta}
          audio={audio}
          onComplete={handleLessonComplete}
          onExit={() => setActiveSession(null)}
        />
        <BreakReminder visible={breakDue} onDone={dismissBreak} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8EC] flex flex-col font-kid">
      <KidTopBar
        childName={childName}
        stars={progress.stars || 0}
        termUnitLabel={termUnitLabel}
        levelColor={levelMeta.color}
        onGreet={() => audio.speak(`Hi ${childName}! Let's play!`, 0.85)}
        onOpenParentGate={() => setGateOpen(true)}
      />

      <main className="flex-1 overflow-y-auto">
        {screen === 'home' && (
          <HomeMap
            units={units}
            schedule={schedule}
            progress={progress}
            levelColor={levelMeta.color}
            levelColorDark={levelMeta.colorDark}
            allowAll={isAdmin}
            onStartLesson={(unit, lesson) => {
              audio.playSfx('whoosh');
              setActiveSession({ unit, lesson });
            }}
            onSpeak={(text) => audio.speak(text, 0.82)}
          />
        )}

        {screen === 'songs' && (
          <SongsCorner
            units={units}
            completedLessonIds={progress.completedLessonIds}
            allowAll={isAdmin}
            onStartMelody={(melodyId, opts) => audio.startMelody(melodyId, opts)}
            onSpeak={(text, rate, onEnd) => audio.speak(text, rate ?? 0.85, onEnd)}
            onStopAll={audio.stopAll}
          />
        )}

        {screen === 'stories' && (
          <StoryCorner
            units={units}
            completedLessonIds={progress.completedLessonIds}
            allowAll={isAdmin}
            onSpeak={(text, rate) => audio.speak(text, rate ?? 0.8)}
          />
        )}

        {screen === 'stickers' && (
          <StickerBook
            units={units}
            earnedStickers={progress.stickers}
            onSpeak={(text) => audio.speak(text, 0.85)}
          />
        )}
      </main>

      <KidDock
        active={screen}
        onSelect={(next, spoken) => {
          audio.stopAll();
          audio.playSfx('tap');
          audio.speak(spoken, 0.85);
          setScreen(next);
        }}
      />

      <ParentGate
        isOpen={gateOpen}
        onClose={() => setGateOpen(false)}
        onUnlock={() => {
          setGateOpen(false);
          setParentMode(true);
        }}
      />

      <BreakReminder visible={breakDue} onDone={dismissBreak} />
    </div>
  );
};
