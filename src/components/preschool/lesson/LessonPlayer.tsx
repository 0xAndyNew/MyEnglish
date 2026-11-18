import { Home } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { ALL_PRESCHOOL_UNITS } from '../../../data/preschool';
import type { PreschoolLevelMeta } from '../../../data/preschool/levels';
import {
  unitCoverUrl,
  type ActivityType,
  type PreschoolLesson,
  type PreschoolUnit,
  type PreschoolWord,
} from '../../../data/preschool/types';
import { BlendingGame } from '../activities/BlendingGame';
import { BubblePop } from '../activities/BubblePop';
import { CountTap } from '../activities/CountTap';
import { FeedAnimal } from '../activities/FeedAnimal';
import { FlashcardActivity } from '../activities/FlashcardActivity';
import { HelloGoodbye } from '../activities/HelloGoodbye';
import { ISpy } from '../activities/ISpy';
import { ListenTap } from '../activities/ListenTap';
import { MagicColor } from '../activities/MagicColor';
import { MiniCheck } from '../activities/MiniCheck';
import { Peekaboo } from '../activities/Peekaboo';
import { PhonicsLetter } from '../activities/PhonicsLetter';
import { ShadowMatch } from '../activities/ShadowMatch';
import { SongActivity } from '../activities/SongActivity';
import { SpeakRepeat } from '../activities/SpeakRepeat';
import { StoryActivity } from '../activities/StoryActivity';
import { TraceActivity } from '../activities/TraceActivity';
import type { ActivityProps } from '../activities/activityTypes';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';
import { ProgressCaterpillar } from '../ui/ProgressCaterpillar';
import { RewardBurst } from '../ui/RewardBurst';
import type { useKidAudio } from '../ui/useKidAudio';

const ACTIVITY_REGISTRY: Record<ActivityType, React.FC<ActivityProps>> = {
  hello: HelloGoodbye,
  goodbye: HelloGoodbye,
  review: FlashcardActivity,
  flashcards: FlashcardActivity,
  song: SongActivity,
  story: StoryActivity,
  speak: SpeakRepeat,
  trace: TraceActivity,
  magicColor: MagicColor,
  peekaboo: Peekaboo,
  bubblePop: BubblePop,
  listenTap: ListenTap,
  feed: FeedAnimal,
  shadowMatch: ShadowMatch,
  countTap: CountTap,
  iSpy: ISpy,
  phonics: PhonicsLetter,
  blending: BlendingGame,
  miniCheck: MiniCheck,
};

interface LessonPlayerProps {
  unit: PreschoolUnit;
  lesson: PreschoolLesson;
  level: PreschoolLevelMeta;
  audio: ReturnType<typeof useKidAudio>;
  onComplete: (earnedSticker: boolean) => void;
  onExit: () => void;
}

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  unit,
  lesson,
  level,
  audio,
  onComplete,
  onExit,
}) => {
  const [actIdx, setActIdx] = useState(0);
  const [finished, setFinished] = useState(false);
  const [stickerImgFailed, setStickerImgFailed] = useState(false);

  const wordLookup = useMemo(() => {
    const map = new Map<string, PreschoolWord>();
    for (const u of ALL_PRESCHOOL_UNITS) {
      for (const w of u.words) map.set(w.id, w);
    }
    return map;
  }, []);

  const currentActivity = lesson.activities[actIdx];

  const resolvedWords = useMemo(() => {
    if (!currentActivity?.wordIds?.length) return unit.words;
    const found = currentActivity.wordIds
      .map((id) => wordLookup.get(id))
      .filter((w): w is PreschoolWord => Boolean(w));
    return found.length ? found : unit.words;
  }, [currentActivity, unit.words, wordLookup]);

  const earnedSticker = lesson.index === 4;

  const handleActivityDone = () => {
    audio.stopAll();
    if (actIdx < lesson.activities.length - 1) {
      setActIdx((i) => i + 1);
    } else {
      setFinished(true);
      audio.playSfx('celebrate');
      audio.speak(
        earnedSticker ? `Awesome! You got the ${unit.title} sticker!` : 'Great job today! Hooray!',
        0.85
      );
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-[#FFF8EC] flex flex-col items-center justify-center p-6 text-center">
        <RewardBurst
          visible
          message={earnedSticker ? `Sticker ${unit.title}!` : 'Hoàn thành buổi học!'}
        />

        <div className="max-w-md w-full bg-white rounded-[36px] border-4 border-amber-200 p-8 shadow-xl space-y-5 animate-kid-pop">
          <div className="flex justify-center">
            <Mascot pose="cheer" size="lg" />
          </div>

          <h2 className="font-kid font-extrabold text-3xl text-slate-800">
            🎉 Bé giỏi quá đi!
          </h2>
          <p className="text-sm font-bold text-slate-500">
            Bé vừa xong <strong>{unit.title}</strong> · {lesson.titleVi}
          </p>

          {earnedSticker ? (
            <div className="mx-auto w-36 h-36 rounded-full border-4 border-amber-400 bg-amber-50 flex items-center justify-center overflow-hidden shadow-inner">
              {!stickerImgFailed ? (
                <img
                  src={unitCoverUrl(unit.id)}
                  alt={unit.title}
                  onError={() => setStickerImgFailed(true)}
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <span className="text-6xl">{unit.emoji}</span>
              )}
            </div>
          ) : (
            <div className="text-5xl">⭐⭐⭐</div>
          )}

          <div className="pt-2">
            <BigButton
              color={level.color}
              shadowColor={level.colorDark}
              size="xl"
              onClick={() => onComplete(earnedSticker)}
            >
              <span>Nhận {earnedSticker ? 'Sticker' : '+3 Sao'}!</span>
            </BigButton>
          </div>
        </div>
      </div>
    );
  }

  const ActiveComponent = currentActivity ? ACTIVITY_REGISTRY[currentActivity.type] : null;

  return (
    <div className="min-h-screen bg-[#FFF8EC] flex flex-col">
      {/* Top Lesson Bar */}
      <header className="w-full max-w-[1000px] mx-auto px-4 pt-3 pb-2 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            audio.stopAll();
            onExit();
          }}
          className="w-14 h-14 rounded-full bg-white border-3 border-amber-200 text-slate-700 hover:bg-amber-50 flex items-center justify-center shadow-sm active:scale-95 transition"
          aria-label="Về trang chính"
        >
          <Home className="w-7 h-7" />
        </button>

        <ProgressCaterpillar
          total={lesson.activities.length}
          current={actIdx}
          accentColor={level.color}
        />

        <div className="px-3.5 py-1.5 rounded-full bg-white border-2 border-amber-200 font-kid font-extrabold text-sm text-slate-700 hidden sm:block">
          {unit.emoji} {unit.title}
        </div>
      </header>

      {/* Main Centered Activity Canvas */}
      <main className="flex-1 w-full max-w-[960px] mx-auto px-4 py-3 flex flex-col justify-center">
        {ActiveComponent && currentActivity && (
          <ActiveComponent
            key={`${lesson.id}-${actIdx}-${currentActivity.type}`}
            unit={unit}
            words={resolvedWords}
            level={level}
            activity={currentActivity}
            audio={audio}
            onDone={handleActivityDone}
          />
        )}
      </main>
    </div>
  );
};
