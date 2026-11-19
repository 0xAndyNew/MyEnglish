import { useCallback, useEffect, useRef, useState } from 'react';
import type { AccentMode } from '../../../types/learning';
import { playKidsMelody, type KidsMelodyId } from '../../../utils/kidsSongPlayer';
import {
  getStoredTtsVoicePreset,
  prefetchTtsAudio,
  setStoredTtsVoicePreset,
  speakText,
  stopActiveAudioPlayback,
  type TtsVoicePreset,
} from '../../../utils/speechEngine';

export type KidSfxKind = 'tap' | 'ding' | 'pop' | 'whoosh' | 'celebrate';

export function useKidAudio(accent: AccentMode = 'en-US') {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const stopMelodyRef = useRef<(() => void) | null>(null);
  const [voicePreset, setVoicePresetState] = useState<TtsVoicePreset>(() =>
    getStoredTtsVoicePreset()
  );

  const setVoicePreset = useCallback((next: TtsVoicePreset) => {
    setVoicePresetState(next);
    setStoredTtsVoicePreset(next);
  }, []);

  const getCtx = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new Ctx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  const playSfx = useCallback(
    (kind: KidSfxKind) => {
      try {
        const ctx = getCtx();
        if (!ctx) return;
        const now = ctx.currentTime;

        const playTone = (freq: number, start: number, dur: number, type: OscillatorType = 'sine', vol = 0.14) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = type;
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.001, start);
          gain.gain.exponentialRampToValueAtTime(vol, start + 0.015);
          gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start);
          osc.stop(start + dur + 0.02);
        };

        switch (kind) {
          case 'tap':
            playTone(520, now, 0.08, 'sine', 0.1);
            break;
          case 'pop':
            playTone(380, now, 0.06, 'triangle', 0.12);
            playTone(680, now + 0.03, 0.08, 'sine', 0.12);
            break;
          case 'ding':
            playTone(659.25, now, 0.14, 'triangle', 0.16);
            playTone(880, now + 0.1, 0.24, 'triangle', 0.16);
            break;
          case 'whoosh':
            playTone(320, now, 0.12, 'sine', 0.08);
            playTone(460, now + 0.05, 0.12, 'sine', 0.06);
            break;
          case 'celebrate':
            [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
              playTone(f, now + i * 0.085, 0.22, 'triangle', 0.15);
            });
            break;
        }
      } catch {
        // Ignore WebAudio restrictions before gesture
      }
    },
    [getCtx]
  );

  const speak = useCallback(
    (text: string, rate = 0.85, onEnd?: () => void) => {
      if (!text.trim()) {
        onEnd?.();
        return;
      }
      speakText(text, accent, rate, undefined, {
        voicePreset,
        onEnded: onEnd,
      });
    },
    [accent, voicePreset]
  );

  const prefetchWords = useCallback(
    (texts: string[], rate = 0.85) => {
      prefetchTtsAudio(texts, accent, rate, voicePreset);
    },
    [accent, voicePreset]
  );

  const stopMelody = useCallback(() => {
    if (stopMelodyRef.current) {
      stopMelodyRef.current();
      stopMelodyRef.current = null;
    }
  }, []);

  const startMelody = useCallback(
    (
      melodyId: KidsMelodyId,
      options?: { tempo?: number; onLineChange?: (lineIdx: number) => void; onEnd?: () => void }
    ) => {
      stopMelody();
      const ctrl = playKidsMelody(melodyId, {
        rate: options?.tempo ?? 0.9,
        onLineChange: options?.onLineChange,
        onEnded: () => {
          stopMelodyRef.current = null;
          options?.onEnd?.();
        },
      });
      stopMelodyRef.current = ctrl.stop;
      return ctrl;
    },
    [stopMelody]
  );

  const stopAll = useCallback(() => {
    stopActiveAudioPlayback();
    stopMelody();
  }, [stopMelody]);

  useEffect(() => {
    return () => {
      stopAll();
    };
  }, [stopAll]);

  return {
    speak,
    playSfx,
    startMelody,
    stopMelody,
    stopAll,
    voicePreset,
    setVoicePreset,
    prefetchWords,
  };
}
