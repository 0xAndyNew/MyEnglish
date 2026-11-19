import React, { useMemo, useState } from 'react';
import {
  LEW_AGE_LEVELS,
  ageBandToLewLevel,
} from '../../data/preschool/lewLevels';
import { LEW_TOPICS } from '../../data/preschool/lewTopics';
import type {
  LewAgeLevelId,
  LewAvatarId,
  LewChildProfile,
  LewObservationCode,
  LewStoreState,
  LewTopic,
} from '../../data/preschool/lewTypes';
import type { LearnerProfile } from '../../types/audience';
import type { AccentMode, UserProgress } from '../../types/learning';
import { ChildHome } from './ChildHome';
import { LessonFlow, type LessonStepId } from './LessonFlow';
import { LewParentZone } from './LewParentZone';
import { useKidAudio } from './ui/useKidAudio';

type PreschoolProgressShape = NonNullable<UserProgress['preschool']>;

interface PreschoolAppProps {
  profile: LearnerProfile;
  progress: PreschoolProgressShape;
  accent?: AccentMode;
  displayName: string;
  isAdmin?: boolean;
  isPreview?: boolean;
  onProgressChange: (next: PreschoolProgressShape, gainedXp?: number) => void;
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
  isPreview = false,
  onProgressChange,
  onOpenProfileModal,
  onExitPreview,
  onLogout,
}) => {
  const audio = useKidAudio(accent);

  const store: LewStoreState = useMemo(() => {
    const defaultChildId = 'child-1';
    const defaultChild: LewChildProfile = {
      id: defaultChildId,
      name: profile.preschool?.childName?.trim() || displayName || 'Bin',
      ageLevelId: ageBandToLewLevel(profile.preschool?.ageBand),
      avatar: 'benny',
    };

    const rawLew = rawProgress?.lew;
    const children =
      Array.isArray(rawLew?.children) && rawLew.children.length > 0
        ? rawLew.children
        : [defaultChild];
    const activeChildId =
      rawLew?.activeChildId && children.some((c) => c.id === rawLew.activeChildId)
        ? rawLew.activeChildId
        : children[0].id;

    return {
      children,
      activeChildId,
      completedKeys: rawLew?.completedKeys || {},
      stickersByChild: rawLew?.stickersByChild || {},
      observations: Array.isArray(rawLew?.observations) ? rawLew.observations : [],
    };
  }, [rawProgress, profile.preschool?.childName, profile.preschool?.ageBand, displayName]);

  const activeChild =
    store.children.find((c) => c.id === store.activeChildId) || store.children[0];
  const levelMeta = LEW_AGE_LEVELS[activeChild.ageLevelId];
  const childCompleted = store.completedKeys[activeChild.id] || [];
  const childStickers = store.stickersByChild[activeChild.id] || [];

  const recommendedTopic = useMemo(() => {
    const nextUnfinished = LEW_TOPICS.find((t) => !childStickers.includes(t.id));
    return nextUnfinished || LEW_TOPICS[0];
  }, [childStickers]);

  const [activeLesson, setActiveLesson] = useState<{
    topic: LewTopic;
    initialStep?: LessonStepId;
  } | null>(null);
  const [parentZoneOpen, setParentZoneOpen] = useState(false);

  const persistStore = (nextStore: LewStoreState, gainedXp = 0) => {
    const allStickers = Array.from(
      new Set(Object.values(nextStore.stickersByChild).flat())
    );
    const allCompleted = Array.from(
      new Set(Object.values(nextStore.completedKeys).flat())
    );
    onProgressChange(
      {
        completedLessonIds: allCompleted,
        stickers: allStickers,
        stars: allStickers.length * 3,
        lastLessonAt: new Date().toISOString(),
        lew: {
          children: nextStore.children,
          activeChildId: nextStore.activeChildId,
          completedKeys: nextStore.completedKeys,
          stickersByChild: nextStore.stickersByChild,
          observations: nextStore.observations,
        },
      },
      gainedXp
    );
  };

  const handleSelectChild = (childId: string) => {
    persistStore({ ...store, activeChildId: childId });
  };

  const handleChangeLevel = (levelId: LewAgeLevelId) => {
    const updatedChildren = store.children.map((c) =>
      c.id === activeChild.id ? { ...c, ageLevelId: levelId } : c
    );
    persistStore({ ...store, children: updatedChildren });
  };

  const handleCreateChild = (name: string, levelId: LewAgeLevelId, avatar: LewAvatarId) => {
    const newChild: LewChildProfile = {
      id: `child-${Date.now()}`,
      name,
      ageLevelId: levelId,
      avatar,
    };
    persistStore({
      ...store,
      children: [...store.children, newChild],
      activeChildId: newChild.id,
    });
  };

  const handleFinishLesson = (
    topic: LewTopic,
    observations: LewObservationCode[],
    parentNote: string
  ) => {
    const key = `${topic.id}:${activeChild.ageLevelId}`;
    const prevKeys = store.completedKeys[activeChild.id] || [];
    const nextKeys = prevKeys.includes(key) ? prevKeys : [...prevKeys, key];

    const prevStickers = store.stickersByChild[activeChild.id] || [];
    const nextStickers = prevStickers.includes(topic.id)
      ? prevStickers
      : [...prevStickers, topic.id];

    const newObs = {
      id: `obs-${Date.now()}`,
      childId: activeChild.id,
      topicId: topic.id,
      levelId: activeChild.ageLevelId,
      observations: observations.length ? observations : (['recognized'] as LewObservationCode[]),
      parentNote: parentNote.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    persistStore(
      {
        ...store,
        completedKeys: {
          ...store.completedKeys,
          [activeChild.id]: nextKeys,
        },
        stickersByChild: {
          ...store.stickersByChild,
          [activeChild.id]: nextStickers,
        },
        observations: [newObs, ...store.observations],
      },
      30
    );

    setActiveLesson(null);
  };

  if (parentZoneOpen) {
    return (
      <LewParentZone
        childrenList={store.children}
        activeChild={activeChild}
        completedKeys={childCompleted}
        earnedStickers={childStickers}
        observations={store.observations}
        isPreview={isPreview}
        onBackToKid={() => setParentZoneOpen(false)}
        onSelectChild={handleSelectChild}
        onChangeLevel={handleChangeLevel}
        onOpenTopicLesson={(topic) => {
          setParentZoneOpen(false);
          setActiveLesson({ topic, initialStep: 1 });
        }}
        onOpenProfileModal={onOpenProfileModal}
        onExitPreview={onExitPreview}
        onLogout={onLogout}
        onSpeak={(text) => audio.speak(text, 0.85)}
      />
    );
  }

  if (activeLesson) {
    return (
      <LessonFlow
        topic={activeLesson.topic}
        child={activeChild}
        levelMeta={levelMeta}
        initialStep={activeLesson.initialStep}
        audio={audio}
        onFinishLesson={(obs, note) =>
          handleFinishLesson(activeLesson.topic, obs, note)
        }
        onExit={() => setActiveLesson(null)}
      />
    );
  }

  return (
    <ChildHome
      childrenList={store.children}
      activeChild={activeChild}
      earnedStickers={childStickers}
      completedKeys={childCompleted}
      recommendedTopic={recommendedTopic}
      audio={audio}
      onSelectChild={handleSelectChild}
      onChangeLevel={handleChangeLevel}
      onCreateChild={handleCreateChild}
      onOpenTopic={(topic, initialStep) => {
        audio.playSfx('whoosh');
        setActiveLesson({ topic, initialStep });
      }}
      onOpenParentZone={() => {
        audio.stopAll();
        setParentZoneOpen(true);
      }}
      onSpeak={(text) => audio.speak(text, 0.85)}
    />
  );
};
