// Pure data module — no imports, no side effects, SSR-safe

export type ChordType = 'sus2' | 'sus4' | 'open5' | 'maj9no3'
export type ProgressionName = 'Aurora' | 'Drift' | 'Float'
export type NoteKey = string

export interface ChordDefinition {
  root: NoteKey
  type: ChordType
  frequencies: readonly number[]
  label: string
}

export interface AmbientProgression {
  name: ProgressionName
  bpm: number
  chords: readonly ChordDefinition[]
  description: string
}

// Internal helper: standard equal-temperament tuning (A4 = 440 Hz)
export function midiToFreq(midi: number): number {
  return Math.pow(2, (midi - 69) / 12) * 440
}

// Full chromatic table for octaves 0–8
// C0 = MIDI 12, A4 = MIDI 69 = 440 Hz
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const

function buildNoteFrequencies(): Readonly<Record<string, number>> {
  const table: Record<string, number> = {}
  for (let octave = 0; octave <= 8; octave++) {
    NOTE_NAMES.forEach((note, semitone) => {
      const midi = 12 + octave * 12 + semitone
      table[`${note}${octave}`] = midiToFreq(midi)
    })
  }
  return Object.freeze(table)
}

export const NOTE_FREQUENCIES: Readonly<Record<string, number>> = buildNoteFrequencies()

// Interval offsets in semitones for each chord voicing
export const CHORD_INTERVALS: Record<ChordType, readonly number[]> = {
  sus2:    [0, 2, 7],
  sus4:    [0, 5, 7],
  open5:   [0, 7],
  maj9no3: [0, 7, 14],
}

// Factory: pre-computes the frequency array for a given root + chord type
export function buildChord(
  rootMidi: number,
  type: ChordType,
  label: string,
  rootKey: NoteKey,
): ChordDefinition {
  const intervals = CHORD_INTERVALS[type]
  const frequencies = Object.freeze(intervals.map(interval => midiToFreq(rootMidi + interval)))
  return { root: rootKey, type, frequencies, label }
}

// ---------------------------------------------------------------------------
// Named ambient progressions
//
// MIDI reference (A4 = 69, middle C4 = 60):
//   C3=48  D3=50  E3=52  F3=53  G3=55  A3=57  B3=59
//   C2=36  D2=38  E2=40  F2=41  G2=43  A2=45  B2=47  F#2=42
// ---------------------------------------------------------------------------

export const PROGRESSIONS: Record<ProgressionName, AmbientProgression> = {
  Aurora: {
    name: 'Aurora',
    bpm: 60,
    description: 'Nordic/spacious, D-centric',
    chords: [
      buildChord(50, 'sus2', 'Dsus2', 'D3'),   // D E A
      buildChord(45, 'sus4', 'Asus4', 'A2'),   // A D E
      buildChord(52, 'sus2', 'Esus2', 'E3'),   // E F# B
      buildChord(47, 'sus4', 'Bsus4', 'B2'),   // B E F#
    ],
  },
  Drift: {
    name: 'Drift',
    bpm: 52,
    description: 'Dark/modal, A minor pentatonic',
    chords: [
      buildChord(45, 'sus2',    'Asus2',    'A2'),  // A B E
      buildChord(48, 'sus2',    'Csus2',    'C3'),  // C D G
      buildChord(43, 'sus4',    'Gsus4',    'G2'),  // G C D
      buildChord(41, 'maj9no3', 'Fmaj9no3', 'F2'),  // F C G
    ],
  },
  Float: {
    name: 'Float',
    bpm: 56,
    description: 'Ethereal/Lydian, E-centric',
    chords: [
      buildChord(52, 'sus2', 'Esus2',  'E3'),   // E F# B
      buildChord(57, 'sus2', 'Asus2',  'A3'),   // A B E
      buildChord(47, 'sus2', 'Bsus2',  'B2'),   // B C# F#
      buildChord(42, 'sus4', 'F#sus4', 'F#2'),  // F# B C#
    ],
  },
}
