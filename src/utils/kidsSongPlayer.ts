export type KidsMelodyId =
  | 'colors'
  | 'numbers'
  | 'animals'
  | 'family'
  | 'body-parts'
  | 'food-drinks'
  | 'toys'
  | 'school-things'
  | 'weather'
  | 'clothes'
  | 'my-home'
  | 'feelings';

interface NoteEvent {
  midi: number | null; // null = rest
  beats: number;
  chordRoot?: number; // optional bass/chord root MIDI for beat accompaniment
}

interface SongLineScore {
  notes: NoteEvent[];
}

interface KidsMelodyScore {
  bpm: number;
  lines: SongLineScore[];
}

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// MIDI constants (C4 = 60)
const R = null;
const G3 = 55;
const A3 = 57;
const B3 = 59;
const C4 = 60;
const D4 = 62;
const E4 = 64;
const F4 = 65;
const G4 = 67;
const A4 = 69;
const B4 = 71;
const C5 = 72;
const D5 = 74;
const E5 = 76;
const F5 = 77;
const G5 = 79;

const n = (midi: number | null, beats: number, chordRoot?: number): NoteEvent => ({
  midi,
  beats,
  chordRoot,
});

export const KIDS_MELODY_SCORES: Record<KidsMelodyId, KidsMelodyScore> = {
  // 1. Twinkle, Twinkle, Little Star
  colors: {
    bpm: 108,
    lines: [
      {
        notes: [n(C4, 1, C4), n(C4, 1), n(G4, 1), n(G4, 1), n(A4, 1, F4), n(A4, 1), n(G4, 2, C4)],
      },
      {
        notes: [n(F4, 1, F4), n(F4, 1), n(E4, 1, C4), n(E4, 1), n(D4, 1, G3), n(D4, 1), n(C4, 2, C4)],
      },
      {
        notes: [n(G4, 1, C4), n(G4, 1), n(F4, 1, F4), n(F4, 1), n(E4, 1, C4), n(E4, 1), n(D4, 2, G3)],
      },
      {
        notes: [n(G4, 1, C4), n(G4, 1), n(F4, 1, F4), n(F4, 1), n(E4, 1, C4), n(E4, 1), n(D4, 2, G3)],
      },
      {
        notes: [n(C4, 1, C4), n(C4, 1), n(G4, 1), n(G4, 1), n(A4, 1, F4), n(A4, 1), n(G4, 2, C4)],
      },
      {
        notes: [n(F4, 1, F4), n(F4, 1), n(E4, 1, C4), n(E4, 1), n(D4, 1, G3), n(D4, 1), n(C4, 2, C4)],
      },
    ],
  },

  // 2. Ten Little Numbers (Ten Little Indians)
  numbers: {
    bpm: 112,
    lines: [
      {
        notes: [
          n(C4, 1, C4), n(C4, 0.5), n(C4, 0.5),
          n(C4, 1), n(C4, 0.5), n(C4, 0.5),
          n(E4, 1, C4), n(G4, 0.5), n(G4, 0.5),
          n(E4, 1), n(C4, 1),
        ],
      },
      {
        notes: [
          n(D4, 1, G3), n(D4, 0.5), n(D4, 0.5),
          n(D4, 1), n(D4, 0.5), n(D4, 0.5),
          n(D4, 1, G3), n(F4, 0.5), n(F4, 0.5),
          n(D4, 1), n(B3, 1),
        ],
      },
      {
        notes: [
          n(C4, 1, C4), n(C4, 0.5), n(C4, 0.5),
          n(C4, 1), n(C4, 0.5), n(C4, 0.5),
          n(E4, 1, C4), n(G4, 0.5), n(G4, 0.5),
          n(E4, 1), n(C4, 1),
        ],
      },
      {
        notes: [
          n(G4, 1, G3), n(G4, 0.5), n(G4, 0.5),
          n(F4, 1, F4), n(E4, 1, C4),
          n(D4, 1, G3), n(G4, 1),
          n(C4, 2, C4),
        ],
      },
    ],
  },

  // 3. Old MacDonald Had a Farm
  animals: {
    bpm: 116,
    lines: [
      {
        notes: [
          n(G4, 1, C4), n(G4, 1), n(G4, 1), n(D4, 1, G3),
          n(E4, 1, C4), n(E4, 1), n(D4, 2, G3),
        ],
      },
      {
        notes: [
          n(B4, 1, G3), n(B4, 1), n(A4, 1, D4), n(A4, 1),
          n(G4, 3, G3), n(D4, 1),
        ],
      },
      {
        notes: [
          n(G4, 1, C4), n(G4, 1), n(G4, 1), n(D4, 1, G3),
          n(E4, 1, C4), n(E4, 1), n(D4, 2, G3),
        ],
      },
      {
        notes: [
          n(B4, 1, G3), n(B4, 1), n(A4, 1, D4), n(A4, 1),
          n(G4, 3, G3), n(R, 1),
        ],
      },
      {
        notes: [
          n(D4, 0.5, G3), n(D4, 0.5), n(G4, 1), n(G4, 1), n(G4, 1),
          n(D4, 0.5, G3), n(D4, 0.5), n(G4, 1), n(G4, 1), n(G4, 1),
        ],
      },
      {
        notes: [
          n(G4, 1, C4), n(G4, 1), n(G4, 1), n(D4, 1, G3),
          n(B4, 1, G3), n(B4, 1), n(A4, 1, D4), n(A4, 1), n(G4, 3, G3), n(R, 1),
        ],
      },
    ],
  },

  // 4. Frère Jacques (Are You Sleeping) — Happy Family Song
  family: {
    bpm: 108,
    lines: [
      {
        notes: [
          n(C4, 1, C4), n(D4, 1), n(E4, 1), n(C4, 1),
          n(C4, 1, C4), n(D4, 1), n(E4, 1), n(C4, 1),
        ],
      },
      {
        notes: [
          n(E4, 1, C4), n(F4, 1), n(G4, 2, G3),
          n(E4, 1, C4), n(F4, 1), n(G4, 2, G3),
        ],
      },
      {
        notes: [
          n(G4, 0.5, C4), n(A4, 0.5), n(G4, 0.5), n(F4, 0.5), n(E4, 1), n(C4, 1),
          n(G4, 0.5, C4), n(A4, 0.5), n(G4, 0.5), n(F4, 0.5), n(E4, 1), n(C4, 1),
        ],
      },
      {
        notes: [
          n(C4, 1, C4), n(G3, 1, G3), n(C4, 2, C4),
          n(C4, 1, C4), n(G3, 1, G3), n(C4, 2, C4),
        ],
      },
    ],
  },

  // 5. Head, Shoulders, Knees and Toes
  'body-parts': {
    bpm: 112,
    lines: [
      {
        notes: [
          n(C5, 1.5, C4), n(C5, 0.5), n(C5, 1), n(B4, 0.5), n(A4, 0.5),
          n(G4, 1, G3), n(E4, 0.5), n(G4, 0.5), n(C5, 2, C4),
        ],
      },
      {
        notes: [
          n(C5, 1.5, C4), n(C5, 0.5), n(C5, 1), n(B4, 0.5), n(A4, 0.5),
          n(G4, 1, G3), n(E4, 0.5), n(G4, 0.5), n(C5, 2, C4),
        ],
      },
      {
        notes: [
          n(A4, 1, F4), n(A4, 0.5), n(A4, 0.5), n(G4, 1, C4), n(E4, 1),
          n(F4, 1, F4), n(D4, 1, G3), n(G4, 2, G3),
        ],
      },
      {
        notes: [
          n(C5, 1.5, C4), n(C5, 0.5), n(C5, 1), n(B4, 0.5), n(A4, 0.5),
          n(G4, 1, G3), n(E4, 0.5), n(G4, 0.5), n(C5, 2, C4),
        ],
      },
    ],
  },

  // 6. The Muffin Man — Picnic Food Song
  'food-drinks': {
    bpm: 112,
    lines: [
      {
        notes: [
          n(G4, 0.5, G3),
          n(C5, 1, C4), n(C5, 1), n(D5, 1), n(E5, 1),
          n(C5, 1, C4), n(C5, 1), n(A4, 1.5, F4),
        ],
      },
      {
        notes: [
          n(D5, 1, G3), n(D5, 1), n(E5, 1), n(C5, 1),
          n(D5, 1, G3), n(B4, 1), n(G4, 2, G3),
        ],
      },
      {
        notes: [
          n(G4, 0.5, G3),
          n(C5, 1, C4), n(C5, 1), n(D5, 1), n(E5, 1),
          n(C5, 1, C4), n(C5, 1), n(A4, 1.5, F4),
        ],
      },
      {
        notes: [
          n(D5, 1, G3), n(D5, 1), n(G4, 1), n(B4, 1),
          n(C5, 3, C4), n(R, 1),
        ],
      },
    ],
  },

  // 7. The Wheels on the Bus — My Happy Toy Box
  toys: {
    bpm: 110,
    lines: [
      {
        notes: [
          n(G4, 0.5, G3),
          n(C5, 1, C4), n(C5, 0.5), n(C5, 0.5), n(E5, 1), n(G5, 1),
          n(E5, 1, C4), n(C5, 1), n(D5, 1.5, G3),
        ],
      },
      {
        notes: [
          n(D5, 1, G3), n(B4, 1), n(G4, 2, G3),
          n(G5, 1, C4), n(E5, 1), n(C5, 2, C4),
        ],
      },
      {
        notes: [
          n(G4, 0.5, G3),
          n(C5, 1, C4), n(C5, 0.5), n(C5, 0.5), n(E5, 1), n(G5, 1),
          n(E5, 1, C4), n(C5, 1), n(D5, 1.5, G3),
        ],
      },
      {
        notes: [
          n(G4, 1, G3), n(G4, 1), n(E5, 1, C4), n(D5, 1, G3),
          n(C5, 3, C4), n(R, 1),
        ],
      },
    ],
  },

  // 8. ABC Song — The ABC & School Song
  'school-things': {
    bpm: 102,
    lines: [
      {
        notes: [n(C4, 1, C4), n(C4, 1), n(G4, 1), n(G4, 1), n(A4, 1, F4), n(A4, 1), n(G4, 2, C4)],
      },
      {
        notes: [
          n(F4, 1, F4), n(F4, 1), n(E4, 1, C4), n(E4, 1),
          n(D4, 0.5, G3), n(D4, 0.5), n(D4, 0.5), n(D4, 0.5), n(C4, 2, C4),
        ],
      },
      {
        notes: [n(G4, 1, C4), n(G4, 1), n(F4, 2, F4), n(E4, 1, C4), n(E4, 1), n(D4, 2, G3)],
      },
      {
        notes: [n(G4, 1, C4), n(G4, 1), n(F4, 2, F4), n(E4, 1, C4), n(E4, 1), n(D4, 2, G3)],
      },
      {
        notes: [n(C4, 1, C4), n(C4, 1), n(G4, 1), n(G4, 1), n(A4, 1, F4), n(A4, 1), n(G4, 2, C4)],
      },
      {
        notes: [n(F4, 1, F4), n(F4, 1), n(E4, 1, C4), n(E4, 1), n(D4, 1, G3), n(D4, 1), n(C4, 2, C4)],
      },
    ],
  },

  // 9. Rain, Rain, Go Away
  weather: {
    bpm: 104,
    lines: [
      {
        notes: [n(G4, 2, C4), n(E4, 2), n(G4, 1, C4), n(G4, 1), n(E4, 2)],
      },
      {
        notes: [n(G4, 1, C4), n(G4, 1), n(E4, 1), n(A4, 1, F4), n(G4, 1, C4), n(G4, 1), n(E4, 2)],
      },
      {
        notes: [n(G4, 2, C4), n(E4, 2), n(G4, 1, C4), n(G4, 1), n(E4, 2)],
      },
      {
        notes: [n(G4, 1, G3), n(G4, 1), n(E4, 1), n(A4, 1, F4), n(G4, 1, G3), n(F4, 1), n(C4, 2, C4)],
      },
    ],
  },

  // 10. Here We Go Round the Mulberry Bush — Getting Dressed Song
  clothes: {
    bpm: 112,
    lines: [
      {
        notes: [
          n(C4, 1, C4), n(C4, 0.5), n(C4, 0.5), n(E4, 1), n(G4, 1),
          n(E4, 1, C4), n(C4, 1), n(C4, 2),
        ],
      },
      {
        notes: [
          n(D4, 1, G3), n(D4, 1), n(B3, 1), n(G3, 1),
          n(A3, 1, F4), n(B3, 1, G3), n(C4, 2, C4),
        ],
      },
      {
        notes: [
          n(C4, 1, C4), n(C4, 0.5), n(C4, 0.5), n(E4, 1), n(G4, 1),
          n(E4, 1, C4), n(C4, 1), n(C4, 2),
        ],
      },
      {
        notes: [
          n(D4, 1, G3), n(B3, 1), n(G3, 1), n(G4, 1),
          n(E4, 1, C4), n(D4, 1, G3), n(C4, 2, C4),
        ],
      },
    ],
  },

  // 11. London Bridge Is Falling Down — Welcome to My Happy Home
  'my-home': {
    bpm: 112,
    lines: [
      {
        notes: [n(G4, 1.5, C4), n(A4, 0.5), n(G4, 1), n(F4, 1), n(E4, 1, C4), n(F4, 1), n(G4, 2)],
      },
      {
        notes: [n(D4, 1, G3), n(E4, 1), n(F4, 2), n(E4, 1, C4), n(F4, 1), n(G4, 2)],
      },
      {
        notes: [n(G4, 1.5, C4), n(A4, 0.5), n(G4, 1), n(F4, 1), n(E4, 1, C4), n(F4, 1), n(G4, 2)],
      },
      {
        notes: [n(D4, 2, G3), n(G4, 2), n(E4, 1, C4), n(C4, 3)],
      },
    ],
  },

  // 12. If You're Happy and You Know It
  feelings: {
    bpm: 116,
    lines: [
      {
        notes: [
          n(G4, 0.5, G3), n(G4, 0.5),
          n(C5, 1, C4), n(C5, 0.5), n(C5, 0.5), n(C5, 0.5), n(C5, 0.5), n(B4, 0.5), n(C5, 0.5),
          n(D5, 2, G3), n(R, 1),
        ],
      },
      {
        notes: [
          n(G4, 0.5, G3), n(G4, 0.5),
          n(D5, 1, G3), n(D5, 0.5), n(D5, 0.5), n(D5, 0.5), n(D5, 0.5), n(C5, 0.5), n(D5, 0.5),
          n(E5, 2, C4), n(R, 1),
        ],
      },
      {
        notes: [
          n(E5, 0.5, C4), n(E5, 0.5),
          n(F5, 1, F4), n(F5, 1), n(E5, 1, C4), n(D5, 1, G3),
          n(C5, 1, C4), n(A4, 1, F4), n(G4, 2, G3),
        ],
      },
      {
        notes: [
          n(G4, 0.5, G3), n(G4, 0.5),
          n(D5, 1, G3), n(C5, 1), n(B4, 1), n(A4, 1),
          n(G4, 1, G3), n(B4, 1), n(C5, 2, C4),
        ],
      },
    ],
  },
};

function scheduleMelodyNote(
  ctx: AudioContext,
  dest: AudioNode,
  midi: number,
  when: number,
  durationSec: number
): void {
  const freq = midiToFreq(midi);

  // Warm bell/xylophone timbre: sine fundamental + soft 2nd & 3rd harmonics
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, when);

  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 2, when);

  const subGain = ctx.createGain();
  subGain.gain.setValueAtTime(0.18, when);

  osc1.connect(gain);
  osc2.connect(subGain);
  subGain.connect(gain);
  gain.connect(dest);

  const envDur = Math.max(0.14, durationSec * 0.95);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.linearRampToValueAtTime(0.38, when + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, when + envDur);

  osc1.start(when);
  osc2.start(when);
  osc1.stop(when + envDur + 0.03);
  osc2.stop(when + envDur + 0.03);
}

function scheduleChordPulse(
  ctx: AudioContext,
  dest: AudioNode,
  rootMidi: number,
  when: number,
  durationSec: number
): void {
  const chordIntervals = [0, 4, 7];
  const bassOsc = ctx.createOscillator();
  const bassGain = ctx.createGain();
  bassOsc.type = 'triangle';
  bassOsc.frequency.setValueAtTime(midiToFreq(rootMidi - 12), when);
  bassOsc.connect(bassGain);
  bassGain.connect(dest);

  bassGain.gain.setValueAtTime(0.0001, when);
  bassGain.gain.linearRampToValueAtTime(0.16, when + 0.02);
  bassGain.gain.exponentialRampToValueAtTime(0.001, when + Math.min(0.6, durationSec * 1.4));
  bassOsc.start(when);
  bassOsc.stop(when + 0.65);

  for (const iv of chordIntervals) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(midiToFreq(rootMidi + iv), when);
    osc.connect(g);
    g.connect(dest);

    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(0.06, when + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, when + Math.min(0.45, durationSec));
    osc.start(when);
    osc.stop(when + 0.5);
  }
}

function scheduleBeatClick(ctx: AudioContext, dest: AudioNode, when: number, accent: boolean): void {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(accent ? 165 : 520, when);
  osc.frequency.exponentialRampToValueAtTime(accent ? 65 : 340, when + 0.05);
  osc.connect(g);
  g.connect(dest);

  g.gain.setValueAtTime(0.0001, when);
  g.gain.linearRampToValueAtTime(accent ? 0.14 : 0.04, when + 0.005);
  g.gain.exponentialRampToValueAtTime(0.001, when + 0.07);
  osc.start(when);
  osc.stop(when + 0.09);
}

/**
 * Play the authentic musical melody + chord accompaniment for a kids song unit,
 * syncing Karaoke line highlights accurately to musical beats.
 */
export function playKidsMelody(
  melodyId: KidsMelodyId,
  options: {
    rate?: number;
    onLineChange?: (lineIdx: number) => void;
    onEnded?: () => void;
  } = {}
): { stop: () => void } {
  const score = KIDS_MELODY_SCORES[melodyId];
  const AudioCtx =
    typeof window !== 'undefined'
      ? (window.AudioContext || (window as any).webkitAudioContext)
      : null;

  if (!score || !AudioCtx) {
    options.onEnded?.();
    return { stop: () => {} };
  }

  const ctx = new AudioCtx() as AudioContext;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -14;
  compressor.ratio.value = 3;
  const master = ctx.createGain();
  master.gain.value = 0.9;
  master.connect(compressor);
  compressor.connect(ctx.destination);

  const speed = Math.max(0.5, Math.min(1.5, options.rate ?? 1.0));
  const beatSec = 60 / (score.bpm * speed);

  interface ScheduledNote {
    midi: number | null;
    chordRoot?: number;
    startBeat: number;
    beats: number;
    lineIdx: number;
  }

  const flatNotes: ScheduledNote[] = [];
  const lineStartBeats: number[] = [];
  let cursorBeat = 0;

  score.lines.forEach((line, lineIdx) => {
    lineStartBeats.push(cursorBeat);
    for (const ev of line.notes) {
      flatNotes.push({
        midi: ev.midi,
        chordRoot: ev.chordRoot,
        startBeat: cursorBeat,
        beats: ev.beats,
        lineIdx,
      });
      cursorBeat += ev.beats;
    }
  });

  const totalBeats = cursorBeat;
  const startAudioTime = ctx.currentTime + 0.08;
  let nextNoteIdx = 0;
  let nextBeatClick = 0;
  let lastReportedLine = -1;
  let stopped = false;
  let schedulerTimer: ReturnType<typeof setInterval> | null = null;

  const stop = () => {
    if (stopped) return;
    stopped = true;
    if (schedulerTimer) {
      clearInterval(schedulerTimer);
      schedulerTimer = null;
    }
    if (ctx.state !== 'closed') {
      ctx.close().catch(() => {});
    }
  };

  const tick = () => {
    if (stopped) return;
    const now = ctx.currentTime;
    const currentBeat = Math.max(0, (now - startAudioTime) / beatSec);

    // Update active Karaoke line
    let activeLine = 0;
    for (let i = 0; i < lineStartBeats.length; i++) {
      if (currentBeat >= lineStartBeats[i] - 0.1) {
        activeLine = i;
      }
    }
    if (activeLine !== lastReportedLine && currentBeat < totalBeats) {
      lastReportedLine = activeLine;
      options.onLineChange?.(activeLine);
    }

    // Lookahead schedule notes 180ms ahead
    const horizonTime = now + 0.18;
    while (nextNoteIdx < flatNotes.length) {
      const ev = flatNotes[nextNoteIdx];
      const evTime = startAudioTime + ev.startBeat * beatSec;
      if (evTime > horizonTime) break;

      if (ev.midi !== null) {
        scheduleMelodyNote(ctx, master, ev.midi, evTime, ev.beats * beatSec);
      }
      if (ev.chordRoot !== undefined) {
        scheduleChordPulse(ctx, master, ev.chordRoot, evTime, ev.beats * beatSec);
      }
      nextNoteIdx++;
    }

    // Schedule light percussive beat clicks
    while (nextBeatClick < Math.floor(totalBeats)) {
      const beatTime = startAudioTime + nextBeatClick * beatSec;
      if (beatTime > horizonTime) break;
      scheduleBeatClick(ctx, master, beatTime, nextBeatClick % 2 === 0);
      nextBeatClick++;
    }

    if (now >= startAudioTime + (totalBeats + 0.4) * beatSec) {
      stop();
      options.onEnded?.();
    }
  };

  tick();
  schedulerTimer = setInterval(tick, 45);

  return { stop };
}

/**
 * Play a real vocal song audio file/URL with rate control and line progress estimation.
 */
export function playRealSongAudio(
  audioUrl: string,
  options: {
    rate?: number;
    lineCount?: number;
    onLineChange?: (lineIdx: number) => void;
    onEnded?: () => void;
    onError?: () => void;
  } = {}
): { stop: () => void } {
  const audio = new Audio(audioUrl);
  audio.playbackRate = Math.max(0.5, Math.min(1.5, options.rate ?? 1.0));
  let stopped = false;

  const stop = () => {
    if (stopped) return;
    stopped = true;
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch {
      // ignore
    }
  };

  audio.ontimeupdate = () => {
    if (stopped || !options.lineCount || !audio.duration || !Number.isFinite(audio.duration)) return;
    const ratio = Math.min(0.999, Math.max(0, audio.currentTime / audio.duration));
    options.onLineChange?.(Math.floor(ratio * options.lineCount));
  };

  audio.onended = () => {
    if (stopped) return;
    stopped = true;
    options.onEnded?.();
  };

  audio.onerror = () => {
    if (stopped) return;
    stopped = true;
    options.onError?.();
  };

  options.onLineChange?.(0);
  audio.play().catch(() => {
    if (!stopped) {
      stopped = true;
      options.onError?.();
    }
  });

  return { stop };
}

/**
 * Extract an 11-character YouTube video ID from a URL or raw ID.
 */
export function extractYouTubeVideoId(raw: string): string {
  const clean = String(raw || '').trim();
  if (!clean) return '';
  if (/^[A-Za-z0-9_-]{11}$/.test(clean)) return clean;
  try {
    const url = new URL(clean);
    if (url.hostname.includes('youtu.be')) {
      const seg = url.pathname.replace(/^\/+/, '').split('/')[0] || '';
      return /^[A-Za-z0-9_-]{11}$/.test(seg) ? seg : '';
    }
    const v = url.searchParams.get('v') || '';
    if (/^[A-Za-z0-9_-]{11}$/.test(v)) return v;
    const parts = url.pathname.split('/').filter(Boolean);
    const idx = parts.findIndex((p) => p === 'embed' || p === 'shorts' || p === 'v');
    if (idx >= 0 && parts[idx + 1] && /^[A-Za-z0-9_-]{11}$/.test(parts[idx + 1])) {
      return parts[idx + 1];
    }
  } catch {
    // not a URL
  }
  return '';
}
