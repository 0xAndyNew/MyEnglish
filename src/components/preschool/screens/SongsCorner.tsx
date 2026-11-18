import { Play, Square } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { PreschoolUnit } from '../../../data/preschool/types';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';

interface SongsCornerProps {
  units: PreschoolUnit[];
  completedLessonIds: string[];
  allowAll?: boolean;
  onStartMelody: (
    melodyId: NonNullable<PreschoolUnit['song']['melodyId']>,
    opts: { onLineChange?: (i: number) => void; onEnd?: () => void }
  ) => void;
  onSpeak: (text: string, rate?: number, onEnd?: () => void) => void;
  onStopAll: () => void;
}

export const SongsCorner: React.FC<SongsCornerProps> = ({
  units,
  completedLessonIds,
  allowAll = false,
  onStartMelody,
  onSpeak,
  onStopAll,
}) => {
  const unlockedUnits = units.filter(
    (u, idx) => allowAll || idx === 0 || completedLessonIds.some((id) => id.startsWith(`${u.id}-`))
  );
  const [selectedId, setSelectedId] = useState(unlockedUnits[0]?.id || units[0]?.id);
  const [playing, setPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState<number>(-1);

  const unit = unlockedUnits.find((u) => u.id === selectedId) || unlockedUnits[0] || units[0];

  useEffect(() => {
    return () => {
      onStopAll();
    };
  }, [onStopAll]);

  const stopSong = () => {
    onStopAll();
    setPlaying(false);
    setActiveLine(-1);
  };

  const playSong = () => {
    if (!unit) return;
    stopSong();
    setPlaying(true);

    if (unit.song.melodyId) {
      onStartMelody(unit.song.melodyId, {
        onLineChange: (i) => {
          setActiveLine(i % unit.song.lines.length);
        },
        onEnd: () => {
          setPlaying(false);
          setActiveLine(-1);
        },
      });
      return;
    }

    // Chant mode: read line by line with highlight
    let idx = 0;
    const readNext = () => {
      if (idx >= unit.song.lines.length) {
        setPlaying(false);
        setActiveLine(-1);
        return;
      }
      setActiveLine(idx);
      const line = unit.song.lines[idx];
      idx += 1;
      onSpeak(line.en, 0.85, () => {
        window.setTimeout(readNext, 250);
      });
    };
    readNext();
  };

  return (
    <div className="w-full max-w-[920px] mx-auto px-4 pb-6 pt-1 space-y-5">
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
        {unlockedUnits.map((u) => {
          const active = u.id === unit.id;
          return (
            <button
              key={u.id}
              type="button"
              onClick={() => {
                stopSong();
                setSelectedId(u.id);
              }}
              className={`shrink-0 min-h-[60px] px-4 py-2 rounded-[20px] border-3 flex items-center gap-2 font-kid font-extrabold transition ${
                active
                  ? 'bg-pink-500 text-white border-pink-600 shadow-md scale-[1.03]'
                  : 'bg-white text-slate-700 border-white hover:border-pink-200'
              }`}
            >
              <span className="text-2xl">{u.emoji}</span>
              <span className="text-sm sm:text-base">{u.song.title}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-[32px] border-4 border-pink-100 p-6 sm:p-8 shadow-lg space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Mascot pose={playing ? 'dance' : 'hello'} size="sm" />
            <div>
              <h2 className="font-kid font-extrabold text-2xl sm:text-3xl text-slate-800">
                🎵 {unit.song.title}
              </h2>
              <div className="text-xs font-bold text-slate-400">
                Unit {unit.order}: {unit.title}
              </div>
            </div>
          </div>

          <BigButton
            color={playing ? '#EF4444' : '#EC4899'}
            shadowColor={playing ? '#B91C1C' : '#BE185D'}
            size="lg"
            onClick={playing ? stopSong : playSong}
          >
            {playing ? <Square className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
            <span>{playing ? 'Dừng' : 'Hát cùng Bo'}</span>
          </BigButton>
        </div>

        <div className="space-y-3">
          {unit.song.lines.map((line, i) => {
            const isNow = activeLine === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setActiveLine(i);
                  onSpeak(line.en, 0.8);
                }}
                className={`w-full text-left p-4 rounded-2xl border-2 transition ${
                  isNow
                    ? 'bg-pink-50 border-pink-400 scale-[1.01] shadow-sm'
                    : 'bg-amber-50/40 border-amber-100 hover:border-pink-200'
                }`}
              >
                <div className="font-kid font-extrabold text-xl sm:text-2xl text-slate-800">
                  {line.en}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
                  <span className="text-xs font-semibold text-slate-500">{line.vi}</span>
                  {line.action && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                      👐 {line.action}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
