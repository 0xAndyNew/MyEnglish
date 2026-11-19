import React, { useEffect, useMemo, useState } from 'react';
import {
  LEW_AGE_LEVELS,
  ageBandToLewLevel,
  type LewAgeLevelMeta,
} from '../../data/preschool/lewLevels';
import { LEW_TOPICS } from '../../data/preschool/lewTopics';
import type {
  LewAgeLevelId,
  LewAvatarId,
  LewChildProfile,
  LewCmsRole,
  LewLessonProgressRecord,
  LewObservationCode,
  LewStoreState,
  LewTopic,
} from '../../data/preschool/lewTypes';
import type { LearnerProfile } from '../../types/audience';
import type { AccentMode, UserProgress } from '../../types/learning';
import {
  createLewChildApi,
  deleteLewChildApi,
  fetchLewBootstrap,
  recordLewChildProgressApi,
  updateLewChildApi,
} from '../../utils/lewApiClient';
import { ChildHome } from './ChildHome';
import { KidsSplashScreen } from './KidsSplashScreen';
import { LessonFlow, type LessonSessionMetrics, type LessonStepId } from './LessonFlow';
import { LewAdminCms } from './LewAdminCms';
import { LewParentZone } from './LewParentZone';
import { useKidAudio } from './ui/useKidAudio';

type PreschoolProgressShape = NonNullable<UserProgress['preschool']>;

interface PreschoolAppProps {
  profile: LearnerProfile;
  progress: PreschoolProgressShape;
  accent?: AccentMode;
  displayName: string;
  userEmail?: string;
  userRole?: LewCmsRole;
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
  userEmail = 'admin',
  userRole = 'user',
  isAdmin = false,
  isPreview = false,
  onProgressChange,
  onOpenProfileModal,
  onExitPreview,
  onLogout,
}) => {
  const audio = useKidAudio(accent);

  const [dynamicTopics, setDynamicTopics] = useState<LewTopic[]>(LEW_TOPICS);
  const [dynamicAgeLevels, setDynamicAgeLevels] =
    useState<Record<LewAgeLevelId, LewAgeLevelMeta>>(LEW_AGE_LEVELS);
  const [lessonProgressList, setLessonProgressList] = useState<LewLessonProgressRecord[]>(
    () => (Array.isArray(rawProgress?.lew?.lessonProgress) ? rawProgress.lew.lessonProgress : [])
  );

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
      lessonProgress: lessonProgressList,
    };
  }, [
    rawProgress,
    profile.preschool?.childName,
    profile.preschool?.ageBand,
    displayName,
    lessonProgressList,
  ]);

  const activeChild =
    store.children.find((c) => c.id === store.activeChildId) || store.children[0];
  const levelMeta =
    dynamicAgeLevels[activeChild.ageLevelId] || LEW_AGE_LEVELS[activeChild.ageLevelId];
  const childCompleted = store.completedKeys[activeChild.id] || [];
  const childStickers = store.stickersByChild[activeChild.id] || [];

  const recommendedTopic = useMemo(() => {
    const skipped = new Set(activeChild.skippedTopicIds || []);
    const nextUnfinished = dynamicTopics.find(
      (t) => !childStickers.includes(t.id) && !skipped.has(t.id)
    );
    return (
      nextUnfinished ||
      dynamicTopics.find((t) => !childStickers.includes(t.id)) ||
      dynamicTopics[0] ||
      LEW_TOPICS[0]
    );
  }, [childStickers, dynamicTopics, activeChild.skippedTopicIds]);

  const [showSplash, setShowSplash] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('kids_english_splash_seen') !== '1';
    } catch {
      return true;
    }
  });
  const [activeLesson, setActiveLesson] = useState<{
    topic: LewTopic;
    initialStep?: LessonStepId;
  } | null>(null);
  const [parentZoneOpen, setParentZoneOpen] = useState(false);
  const [cmsOpen, setCmsOpen] = useState(false);

  const persistStore = (
    nextStore: LewStoreState,
    gainedXp = 0,
    nextProgRecords = lessonProgressList
  ) => {
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
          lessonProgress: nextProgRecords,
        },
      },
      gainedXp
    );
  };

  const refreshBootstrapFromApi = async () => {
    try {
      const data = await fetchLewBootstrap();
      if (data.ageLevels && Object.keys(data.ageLevels).length > 0) {
        setDynamicAgeLevels(data.ageLevels);
      }
      if (Array.isArray(data.topics) && data.topics.length > 0) {
        setDynamicTopics(data.topics);
      }
      if (Array.isArray(data.lessonProgress)) {
        setLessonProgressList(data.lessonProgress);
      }
      if (Array.isArray(data.children) && data.children.length > 0) {
        persistStore(
          {
            children: data.children,
            activeChildId:
              data.activeChildId && data.children.some((c) => c.id === data.activeChildId)
                ? data.activeChildId
                : data.children[0].id,
            completedKeys: data.completedKeys || store.completedKeys,
            stickersByChild: data.stickersByChild || store.stickersByChild,
            observations: Array.isArray(data.observations)
              ? data.observations
              : store.observations,
          },
          0,
          data.lessonProgress || lessonProgressList
        );
      }
    } catch {
      // Offline or unauthenticated fallback uses local seed data seamlessly
    }
  };

  useEffect(() => {
    refreshBootstrapFromApi();
  }, []);

  const handleSelectChild = (childId: string) => {
    persistStore({ ...store, activeChildId: childId });
  };

  const handleChangeLevel = async (levelId: LewAgeLevelId) => {
    const updatedChildren = store.children.map((c) =>
      c.id === activeChild.id ? { ...c, ageLevelId: levelId } : c
    );
    persistStore({ ...store, children: updatedChildren });
    try {
      await updateLewChildApi(activeChild.id, { ageLevelId: levelId });
    } catch {
      // local state already updated
    }
  };

  const handleCreateChild = async (
    name: string,
    levelId: LewAgeLevelId,
    avatar: LewAvatarId,
    extra?: { birthMonth?: number; birthYear?: number; familyLanguage?: string; interests?: string[] }
  ) => {
    try {
      const res = await createLewChildApi({
        name,
        ageLevelId: levelId,
        avatar,
        ...extra,
      });
      persistStore({
        ...store,
        children: res.children,
        activeChildId: res.activeChildId,
      });
    } catch {
      const newChild: LewChildProfile = {
        id: `child-${Date.now()}`,
        name,
        ageLevelId: levelId,
        avatar,
        ...extra,
      };
      persistStore({
        ...store,
        children: [...store.children, newChild],
        activeChildId: newChild.id,
      });
    }
  };

  const handleUpdateChild = async (childId: string, patch: Partial<LewChildProfile>) => {
    const nextChildren = store.children.map((c) =>
      c.id === childId ? { ...c, ...patch } : c
    );
    persistStore({ ...store, children: nextChildren });
    try {
      const res = await updateLewChildApi(childId, patch);
      persistStore({ ...store, children: res.children });
    } catch {
      // keep local update
    }
  };

  const handleDeleteChild = async (childId: string) => {
    if (store.children.length <= 1) return;
    try {
      const res = await deleteLewChildApi(childId);
      persistStore({
        ...store,
        children: res.children,
        activeChildId: res.activeChildId,
      });
    } catch {
      const next = store.children.filter((c) => c.id !== childId);
      persistStore({
        ...store,
        children: next,
        activeChildId: next[0]?.id || 'child-1',
      });
    }
  };

  const handleStartLesson = async (topic: LewTopic) => {
    try {
      const res = await recordLewChildProgressApi(activeChild.id, {
        topicId: topic.id,
        levelId: activeChild.ageLevelId,
        status: 'started',
        activitiesTried: ['warmup'],
      });
      setLessonProgressList(res.lessonProgress);
    } catch {
      // ignore offline
    }
  };

  const handleSkipLesson = async (topic: LewTopic, metrics: LessonSessionMetrics) => {
    setActiveLesson(null);
    try {
      const res = await recordLewChildProgressApi(activeChild.id, {
        topicId: topic.id,
        levelId: activeChild.ageLevelId,
        status: 'skipped',
        audioReplays: metrics.audioReplays,
        gameAttempts: metrics.gameAttempts,
        activitiesTried: metrics.activitiesTried,
        offlineActivityDone: metrics.offlineActivityDone,
      });
      setLessonProgressList(res.lessonProgress);
    } catch {
      // ignore offline
    }
  };

  const handleFinishLesson = async (
    topic: LewTopic,
    observations: LewObservationCode[],
    parentNote: string,
    metrics: LessonSessionMetrics
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
      observations: observations.length
        ? observations
        : (['recognized'] as LewObservationCode[]),
      parentNote: parentNote.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    const nextStore: LewStoreState = {
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
    };

    persistStore(nextStore, 30);
    setActiveLesson(null);

    try {
      const res = await recordLewChildProgressApi(activeChild.id, {
        topicId: topic.id,
        levelId: activeChild.ageLevelId,
        status: 'completed',
        audioReplays: metrics.audioReplays,
        gameAttempts: metrics.gameAttempts,
        activitiesTried: metrics.activitiesTried,
        offlineActivityDone: metrics.offlineActivityDone,
        observations: newObs.observations,
        parentNote: newObs.parentNote,
      });
      setLessonProgressList(res.lessonProgress);
      persistStore(
        {
          ...nextStore,
          completedKeys: res.completedKeys,
          stickersByChild: res.stickersByChild,
          observations: res.observations,
        },
        0,
        res.lessonProgress
      );
    } catch {
      // local state already saved
    }
  };

  const handleToggleOfflineDone = async (topicId: string) => {
    try {
      const res = await recordLewChildProgressApi(activeChild.id, {
        topicId,
        levelId: activeChild.ageLevelId,
        status: 'started',
        offlineActivityDone: true,
        activitiesTried: ['parentActivity'],
      });
      setLessonProgressList(res.lessonProgress);
    } catch {
      // ignore offline
    }
  };

  const handleSkipRecommendedTopic = async (topicId: string) => {
    const prevSkipped = activeChild.skippedTopicIds || [];
    const nextSkipped = prevSkipped.includes(topicId)
      ? prevSkipped
      : [...prevSkipped, topicId];
    // Reset if all unfinished topics have been skipped
    const unfinished = dynamicTopics.filter((t) => !childStickers.includes(t.id));
    const finalSkipped =
      nextSkipped.length >= unfinished.length ? [] : nextSkipped;
    await handleUpdateChild(activeChild.id, { skippedTopicIds: finalSkipped });
  };

  const canAccessCms =
    isAdmin ||
    userRole === 'admin' ||
    userRole === 'editor' ||
    userRole === 'viewer';

  if (cmsOpen) {
    return (
      <LewAdminCms
        currentUserEmail={userEmail}
        currentUserRole={isAdmin ? 'admin' : userRole}
        onClose={() => {
          setCmsOpen(false);
          refreshBootstrapFromApi();
        }}
        onContentChanged={refreshBootstrapFromApi}
        onPreviewTopic={(previewTopic) => {
          setCmsOpen(false);
          setParentZoneOpen(false);
          setActiveLesson({ topic: previewTopic, initialStep: 1 });
        }}
        onSpeak={(text) => audio.speak(text, 0.85)}
      />
    );
  }

  if (parentZoneOpen) {
    return (
      <LewParentZone
        topics={dynamicTopics}
        ageLevels={dynamicAgeLevels}
        childrenList={store.children}
        activeChild={activeChild}
        completedKeys={childCompleted}
        earnedStickers={childStickers}
        observations={store.observations}
        lessonProgress={lessonProgressList}
        recommendedTopic={recommendedTopic}
        canAccessCms={canAccessCms}
        isPreview={isPreview}
        onBackToKid={() => setParentZoneOpen(false)}
        onSelectChild={handleSelectChild}
        onChangeLevel={handleChangeLevel}
        onCreateChild={handleCreateChild}
        onUpdateChild={handleUpdateChild}
        onDeleteChild={handleDeleteChild}
        onToggleOfflineDone={handleToggleOfflineDone}
        onSkipRecommendedTopic={handleSkipRecommendedTopic}
        onOpenTopicLesson={(topic) => {
          setParentZoneOpen(false);
          setActiveLesson({ topic, initialStep: 1 });
        }}
        onOpenCms={() => setCmsOpen(true)}
        onOpenProfileModal={onOpenProfileModal}
        onExitPreview={onExitPreview}
        onLogout={onLogout}
        onSpeak={(text, rate = 0.85) => audio.speak(text, rate)}
      />
    );
  }

  if (activeLesson) {
    return (
      <LessonFlow
        topic={activeLesson.topic}
        allTopics={dynamicTopics}
        child={activeChild}
        levelMeta={levelMeta}
        initialStep={activeLesson.initialStep}
        audio={audio}
        onStartLesson={() => handleStartLesson(activeLesson.topic)}
        onSkipLesson={(metrics) => handleSkipLesson(activeLesson.topic, metrics)}
        onFinishLesson={(obs, note, metrics) =>
          handleFinishLesson(activeLesson.topic, obs, note, metrics)
        }
        onExit={() => setActiveLesson(null)}
      />
    );
  }

  if (showSplash) {
    return (
      <KidsSplashScreen
        childName={activeChild.name}
        onStart={() => {
          audio.playSfx('celebrate');
          try {
            sessionStorage.setItem('kids_english_splash_seen', '1');
          } catch {
            // ignore
          }
          setShowSplash(false);
        }}
      />
    );
  }

  return (
    <ChildHome
      topics={dynamicTopics}
      ageLevels={dynamicAgeLevels}
      childrenList={store.children}
      activeChild={activeChild}
      earnedStickers={childStickers}
      completedKeys={childCompleted}
      lessonProgress={lessonProgressList}
      observations={store.observations}
      recommendedTopic={recommendedTopic}
      isPreview={isPreview}
      audio={audio}
      onSelectChild={handleSelectChild}
      onChangeLevel={handleChangeLevel}
      onCreateChild={handleCreateChild}
      onOpenTopic={(topic, initialStep = 2) => {
        audio.playSfx('whoosh');
        setActiveLesson({ topic, initialStep });
      }}
      onOpenParentZone={() => {
        audio.stopAll();
        setParentZoneOpen(true);
      }}
      onShowSplash={() => setShowSplash(true)}
      onSpeak={(text) => audio.speak(text, 0.85)}
    />
  );
};
