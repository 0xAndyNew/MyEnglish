import { ArrowRight, Play, Square } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';
import type { ActivityProps } from './activityTypes';

export const SongActivity: React.FC<ActivityProps> = ({ unit, level, audio, onDone }) => {
  const [playing, setPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);
  const [playedOnce, setPlayedOnce] = useState(false);

  useEffect(() => {
    return () => {
      audio.stopAll();
    };
  }, [audio]);

  const stop = () => {
    audio.stopAll();
    setPlaying(false);
    setActiveLine(-1);
  };

  const play = () => {
    stop();
    setPlaying(true);
    setPlayedOnce(true);

    if (unit.song.melodyId) {
      audio.startMelody(unit.song.melodyId, {
        onLineChange: (i) => setActiveLine(i % unit.song.lines.length),
        onEnd: () => {
          setPlaying(false);
          setActiveLine(-1);
        },
      });
      return;
    }

    let idx = 0;
    const step = () => {
      if (idx >= unit.song.lines.length) {
        setPlaying(false);
        setActiveLine(-1);
        return;
      }
      setActiveLine(idx);
      const line = unit.song.lines[idx];
      idx += 1;
      audio.speak(line.en, 0.85, () => {
        window.setTimeout(step, 250);
      });
    };
    step();
  };

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="flex items-center gap-3">
        <Mascot pose={playing ? 'dance' : 'hello'} size="sm" />
        <div className="text-left">
          <div className="font-kid font-extrabold text-2xl text-slate-800">
            🎵 {unit.song.title}
          </div>
          <div className="text-xs font-bold text-slate-400">Hát và làm động tác cùng Gấu Bo!</div>
        </div>
      </div>

      <div className="w-full max-w-xl space-y-2.5">
        {unit.song.lines.map((line, i) => {
          const active = activeLine === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                setActiveLine(i);
                setPlayedOnce(true);
                audio.speak(line.en, 0.85);
              }}
              className={`w-full text-left p-3.5 rounded-2xl border-3 transition ${
                active
                  ? 'bg-pink-50 border-pink-400 scale-[1.02] shadow-sm'
                  : 'bg-white border-white hover:border-pink-200'
              }`}
            >
              <div className="font-kid font-extrabold text-lg sm:text-xl text-slate-800">
                {line.en}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mt-0.5">
                <span>{line.vi}</span>
                {line.action && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                    👐 {line.action}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
        <BigButton
          color={playing ? '#EF4444' : '#EC4899'}
          shadowColor={playing ? '#B91C1C' : '#BE185D'}
          size="lg"
          onClick={playing ? stop : play}
        >
          {playing ? <Square className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
          <span>{playing ? 'Dừng nhạc' : 'Hát ngay!'}</span>
        </BigButton>

        <BigButton
          color={level.color}
          shadowColor={level.colorDark}
          size="lg"
          disabled={!playedOnce}
          onClick={() => {
            stop();
            audio.playSfx('ding');
            onDone();
          }}
        >
          <span>Tiếp tục</span>
          <ArrowRight className="w-6 h-6" />
        </BigButton>
      </div>
    </div>
  );
};
