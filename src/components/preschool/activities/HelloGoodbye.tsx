import { ArrowRight, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { GOODBYE_SONG_LINES, HELLO_SONG_LINES } from '../../../data/preschool/songs';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';
import type { ActivityProps } from './activityTypes';

export const HelloGoodbye: React.FC<ActivityProps> = ({ activity, level, audio, onDone }) => {
  const isBye = activity.type === 'goodbye';
  const lines = isBye ? GOODBYE_SONG_LINES : HELLO_SONG_LINES;
  const [lineIdx, setLineIdx] = useState(0);
  const [clapped, setClapped] = useState(false);

  useEffect(() => {
    audio.speak(lines[0].en, 0.85);
  }, [isBye]);

  const handleHighFive = () => {
    audio.playSfx(isBye ? 'celebrate' : 'ding');
    const nextIdx = (lineIdx + 1) % lines.length;
    setLineIdx(nextIdx);
    setClapped(true);
    audio.speak(lines[nextIdx].en, 0.85);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-4">
      <Mascot
        pose={isBye ? 'wave' : 'hello'}
        size="lg"
        speechBubble={lines[lineIdx].en}
        onClick={() => audio.speak(lines[lineIdx].en, 0.85)}
      />

      <div className="max-w-md space-y-1.5">
        <div className="font-kid font-extrabold text-2xl sm:text-3xl text-slate-800">
          {isBye ? 'Tạm biệt Gấu Bo nhé!' : 'Chào bạn nhỏ đến lớp!'}
        </div>
        <div className="text-sm font-semibold text-slate-500">{lines[lineIdx].vi}</div>
        {level.parentTips && lines[lineIdx].action && (
          <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mt-1">
            💡 Bố mẹ cùng bé: {lines[lineIdx].action}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <BigButton
          color="#FFB84D"
          shadowColor="#E08B1F"
          size="lg"
          onClick={handleHighFive}
        >
          <span className="text-2xl">{isBye ? '👋' : '🙌'}</span>
          <span>{isBye ? 'Vẫy tay!' : 'Đập tay nào!'}</span>
        </BigButton>

        {(clapped || isBye) && (
          <BigButton
            color={level.color}
            shadowColor={level.colorDark}
            size="lg"
            onClick={() => {
              audio.playSfx('whoosh');
              onDone();
            }}
          >
            <span>{isBye ? 'Nhận sao!' : 'Bắt đầu học'}</span>
            {isBye ? <Sparkles className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
          </BigButton>
        )}
      </div>
    </div>
  );
};
