'use client'

import { useEffect, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import { useSynthKeyboard } from '@/hooks/useSynthKeyboard'
import type { KeyboardState } from '@/hooks/useSynthKeyboard'

// --- Key layout constants (module-level, no magic numbers) ---

// Chromatic indices within the octave
const WHITE_INDICES = [0, 2, 4, 5, 7, 9, 11]   // C D E F G A B
const BLACK_INDICES = [1, 3, 6, 8, 10]           // C# D# F# G# A#

const NOTE_LABELS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// Black key horizontal offsets in "white-key pitches" from the container's left edge
// C#=0.55  D#=1.55  F#=3.55  G#=4.55  A#=5.55
const BLACK_OFFSETS: Record<number, number> = { 1: 0.55, 3: 1.55, 6: 3.55, 8: 4.55, 10: 5.55 }

// Number of sequencer steps
const STEPS = 8

// --- Key gap (fixed regardless of key size) ---
const KEY_GAP = 8

// --- Inner component ---

interface KeyButtonProps {
  noteIdx:     number
  size:        number
  style:       CSSProperties
  isPressed:   boolean
  isSeqActive: boolean
  onPointerDown:   (e: PointerEvent<HTMLButtonElement>) => void
  onPointerMove:   (e: PointerEvent<HTMLButtonElement>) => void
  onPointerUp:     (e: PointerEvent<HTMLButtonElement>) => void
  onPointerCancel: (e: PointerEvent<HTMLButtonElement>) => void
}

function KeyButton({
  noteIdx,
  size,
  style,
  isPressed,
  isSeqActive,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}: KeyButtonProps) {
  const colorClass = isPressed
    ? 'bg-primary/15 border-primary'
    : isSeqActive
    ? 'bg-accent1/25 border-accent1'
    : 'bg-gray-100 border-gray-300'

  return (
    <button
      aria-label={NOTE_LABELS[noteIdx]}
      style={{ ...style, width: size, height: size }}
      className={`rounded-full select-none touch-none cursor-pointer border-2 transition-colors duration-75 ${colorClass}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    />
  )
}

// --- Keyboard builder helpers ---

function buildHandlers(
  noteIdx: number,
  pressKey:    (noteIdx: number, cx: number, cy: number, cw: number, ch: number) => void,
  movePointer: (noteIdx: number, cx: number, cy: number, cw: number, ch: number) => void,
  releaseKey:  (noteIdx: number) => void,
  pressedKeys: Set<number>,
) {
  const getLocalCoords = (e: PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    return {
      cx: e.clientX - rect.left,
      cy: e.clientY - rect.top,
      cw: rect.width,
      ch: rect.height,
    }
  }

  return {
    onPointerDown: (e: PointerEvent<HTMLButtonElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      const { cx, cy, cw, ch } = getLocalCoords(e)
      pressKey(noteIdx, cx, cy, cw, ch)
    },
    onPointerMove: (e: PointerEvent<HTMLButtonElement>) => {
      if (!pressedKeys.has(noteIdx)) return
      const { cx, cy, cw, ch } = getLocalCoords(e)
      movePointer(noteIdx, cx, cy, cw, ch)
    },
    onPointerUp: (e: PointerEvent<HTMLButtonElement>) => {
      e.currentTarget.releasePointerCapture(e.pointerId)
      releaseKey(noteIdx)
    },
    onPointerCancel: (e: PointerEvent<HTMLButtonElement>) => {
      e.currentTarget.releasePointerCapture(e.pointerId)
      releaseKey(noteIdx)
    },
  }
}

// --- Sequencer dots ---

interface SeqDotsProps {
  state: KeyboardState
}

function SeqDots({ state }: SeqDotsProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: STEPS }).map((_, i) => {
        const isCurrent = state.isSequencing && i === state.currentStep
        const haNote    = state.steps[i] !== null
        return (
          <div
            key={i}
            className={[
              'w-2 h-2 rounded-full transition-all duration-75',
              haNote ? 'bg-foreground/30' : 'bg-gray-200',
              isCurrent ? 'ring-2 ring-offset-1 ring-primary scale-125' : '',
            ].join(' ')}
          />
        )
      })}
    </div>
  )
}

// --- Main component ---

export default function HeroKeyboard() {
  const { state, pressKey, movePointer, releaseKey, clearSequence } = useSynthKeyboard()

  // Responsive key diameter: 44px desktop, 36px mobile
  const [keySize, setKeySize] = useState<number>(() => {
    if (typeof window === 'undefined') return 44
    return window.innerWidth < 768 ? 36 : 44
  })

  useEffect(() => {
    const update = () => setKeySize(window.innerWidth < 768 ? 36 : 44)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const keyPitch      = keySize + KEY_GAP  // 52 px (desktop) / 44 px (mobile)
  const containerW    = WHITE_INDICES.length * keyPitch - KEY_GAP
  const containerH    = keySize * 2 + 12   // black row + 12 px gap + white row
  const whiteTopOffset = keySize + 12

  // Map each white noteIdx to its horizontal position
  const whitePositionOf = (noteIdx: number): number => {
    const pos = WHITE_INDICES.indexOf(noteIdx)
    return pos * keyPitch
  }

  return (
    <div className="flex flex-col gap-3 items-start">

      {/* Hint label */}
      <p className="text-xs text-gray-400 uppercase tracking-wider">
        tap · drag to shape sound
      </p>

      {/* Keyboard container */}
      <div style={{ position: 'relative', width: containerW, height: containerH }}>

        {/* Black keys — top row */}
        {BLACK_INDICES.map(noteIdx => {
          const handlers = buildHandlers(noteIdx, pressKey, movePointer, releaseKey, state.pressedKeys)
          const isSeqActive = state.isSequencing && state.steps[state.currentStep] === noteIdx
          return (
            <KeyButton
              key={noteIdx}
              noteIdx={noteIdx}
              size={keySize}
              style={{
                position: 'absolute',
                top: 0,
                left: BLACK_OFFSETS[noteIdx] * keyPitch,
              }}
              isPressed={state.pressedKeys.has(noteIdx)}
              isSeqActive={isSeqActive}
              {...handlers}
            />
          )
        })}

        {/* White keys — bottom row */}
        {WHITE_INDICES.map(noteIdx => {
          const handlers = buildHandlers(noteIdx, pressKey, movePointer, releaseKey, state.pressedKeys)
          const isSeqActive = state.isSequencing && state.steps[state.currentStep] === noteIdx
          return (
            <KeyButton
              key={noteIdx}
              noteIdx={noteIdx}
              size={keySize}
              style={{
                position: 'absolute',
                top: whiteTopOffset,
                left: whitePositionOf(noteIdx),
              }}
              isPressed={state.pressedKeys.has(noteIdx)}
              isSeqActive={isSeqActive}
              {...handlers}
            />
          )
        })}

      </div>

      {/* Sequencer step dots */}
      <SeqDots state={state} />

      {/* Clear button */}
      <button
        onClick={clearSequence}
        className="text-xs text-gray-400 hover:text-foreground transition-colors"
      >
        clear
      </button>

    </div>
  )
}
