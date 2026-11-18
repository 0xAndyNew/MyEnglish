import { ArrowRight, Mic, Volume2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { isSpeechRecognitionSupported, startSpeechRecognition } from '../../../utils/speechEngine';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';
import { PictureCard } from '../ui/PictureCard';
import type { ActivityProps } from './activityTypes';

export const SpeakRepeat: React.FC<ActivityProps> = ({ unit, words, level, audio, onDone }) => {
  const sample = words[0] || unit.words[0];
  const phrase = unit.pattern?.template && sample
    ? unit.pattern.template.replace('___', sample.word)
    : sample?.word || 'Hello!';

  const [listening, setListening] = useState(false);
  const [spoken, setSpoken] = useState<string | null>(null);
  const [doneSpeak, setDoneSpeak] = useState(false);
  const stopRecRef = useRef<(() => void) | null>(null);
  const micSupported = isSpeechRecognitionSupported();

  useEffect(() => {
    audio.speak(phrase, 0.8);
    return () => {
      stopRecRef.current?.();
    };
  }, [phrase]);

  const handleMic = () => {
    if (listening) {
      stopRecRef.current?.();
      setListening(false);
      return;
    }
    if (!micSupported) {
      setDoneSpeak(true);
      audio.playSfx('ding');
      audio.speak('Great job!', 0.85);
      return;
    }
    setListening(true);
    setSpoken(null);
    const stopFn = startSpeechRecognition(
      'en-US',
      (transcript) => {
        setSpoken(transcript);
        setDoneSpeak(true);
        audio.playSfx('ding');
      },
      () => {
        // Gentle fallback — never punish a child if mic didn't pick up
        setDoneSpeak(true);
        setListening(false);
      },
      () => {
        setListening(false);
        setDoneSpeak(true);
      }
    );
    stopRecRef.current = () => stopFn(true);
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      <div className="flex items-center gap-3">
        <Mascot
          pose={doneSpeak ? 'cheer' : 'hello'}
          size="sm"
          speechBubble={doneSpeak ? 'Awesome voice!' : 'Say it with Bo!'}
        />
        <div className="font-kid font-extrabold text-2xl text-slate-800">
          🎤 Nghe và nói theo Gấu Bo!
        </div>
      </div>

      {sample && (
        <PictureCard
          slug={sample.image}
          emoji={sample.emoji}
          label={phrase}
          subLabelVi={unit.pattern?.vi || sample.meaningVi}
          swatch={sample.swatch}
          size="lg"
          pop={doneSpeak}
          onClick={() => audio.speak(phrase, 0.8)}
        />
      )}

      {spoken && (
        <div className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm">
          🌟 Bé vừa nói: &ldquo;{spoken}&rdquo;
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        <BigButton
          color="#94A3B8"
          shadowColor="#64748B"
          size="md"
          onClick={() => audio.speak(phrase, 0.8)}
        >
          <Volume2 className="w-6 h-6" />
          <span>Nghe mẫu</span>
        </BigButton>

        <BigButton
          color={listening ? '#EF4444' : '#EC4899'}
          shadowColor={listening ? '#B91C1C' : '#BE185D'}
          size="lg"
          onClick={handleMic}
        >
          <Mic className="w-6 h-6" />
          <span>{listening ? 'Đang nghe bé...' : micSupported ? 'Chạm để nói!' : 'Bé đã đọc to!'}</span>
        </BigButton>

        <BigButton
          color={level.color}
          shadowColor={level.colorDark}
          size="lg"
          onClick={() => {
            stopRecRef.current?.();
            audio.playSfx('ding');
            onDone();
          }}
        >
          <span>{doneSpeak ? 'Giỏi quá!' : 'Tiếp tục'}</span>
          <ArrowRight className="w-6 h-6" />
        </BigButton>
      </div>
    </div>
  );
};
