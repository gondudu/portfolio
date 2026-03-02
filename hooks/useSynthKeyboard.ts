'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { midiToFreq } from '@/lib/synth/notes'

// Engine type imported only for type-checking; the actual module is loaded lazily
import type { KeyboardEngine } from '@/lib/synth/keyboard-engine'

// --- Sequencer constants ---
const BPM       = 100
const STEPS     = 8
const STEP_MS   = (60 / BPM / 2) * 1000  // 8th notes @ 100 BPM = 300 ms
const NOTE_DUTY = 0.75                     // note plays 225 ms, silence 75 ms

// C3–B3 (MIDI 48–59)
const OCTAVE_FREQS = Array.from({ length: 12 }, (_, i) => midiToFreq(48 + i))

// --- Types ---
export interface KeyboardState {
  isReady:      boolean
  isSequencing: boolean
  currentStep:  number
  steps:        (number | null)[]
  pressedKeys:  Set<number>
}

export interface UseKeyboardReturn {
  state:         KeyboardState
  initialize:    () => Promise<void>
  pressKey:      (noteIdx: number, cx: number, cy: number, cw: number, ch: number) => void
  movePointer:   (noteIdx: number, cx: number, cy: number, cw: number, ch: number) => void
  releaseKey:    (noteIdx: number) => void
  clearSequence: () => void
}

export function useSynthKeyboard(): UseKeyboardReturn {
  const engineRef            = useRef<KeyboardEngine | null>(null)
  // Maps noteIdx → live noteId currently playing for that key
  const liveNoteRef          = useRef<Record<number, number>>({})
  const stepTimerRef         = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentStepRef       = useRef<number>(0)
  const stepsRef             = useRef<(number | null)[]>(Array(STEPS).fill(null))
  const isSequencingRef      = useRef<boolean>(false)
  const visibilityCleanupRef = useRef<(() => void) | null>(null)

  const [state, setState] = useState<KeyboardState>({
    isReady:      false,
    isSequencing: false,
    currentStep:  0,
    steps:        Array(STEPS).fill(null),
    pressedKeys:  new Set(),
  })

  // Teardown on unmount
  useEffect(() => {
    return () => {
      if (stepTimerRef.current !== null) {
        clearTimeout(stepTimerRef.current)
      }
      visibilityCleanupRef.current?.()
      engineRef.current?.dispose()
    }
  }, [])

  // Idempotent — safe to call on every keypress; only initializes once.
  // Must be called from a user-gesture handler so browsers allow AudioContext creation.
  const initialize = useCallback(async () => {
    if (engineRef.current?.isReady) return

    try {
      const { KeyboardEngine } = await import('@/lib/synth/keyboard-engine')
      const engine = new KeyboardEngine()
      await engine.initialize()
      engineRef.current = engine

      // Safari tab-switch recovery: resume the AudioContext when the tab becomes visible
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          engine.resume()
        }
      }
      document.addEventListener('visibilitychange', handleVisibilityChange)
      visibilityCleanupRef.current = () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }

      setState(prev => ({ ...prev, isReady: true }))
    } catch {
      // Audio initialization failed (e.g., unsupported browser) — fail silently
    }
  }, [])

  // Start the 8-step sequencer loop. Guard prevents double-start.
  const startSequencer = useCallback(() => {
    if (isSequencingRef.current) return
    isSequencingRef.current = true
    setState(prev => ({ ...prev, isSequencing: true }))

    const tick = () => {
      // Advance to next step
      currentStepRef.current = (currentStepRef.current + 1) % STEPS
      const step    = currentStepRef.current
      const noteIdx = stepsRef.current[step]

      // Play the note recorded at this step
      if (noteIdx !== null && engineRef.current?.isReady) {
        const noteId = engineRef.current.playNote(OCTAVE_FREQS[noteIdx], 'seq')
        if (noteId !== -1) {
          setTimeout(() => {
            engineRef.current?.stopNote(noteId, 0.15)
          }, STEP_MS * NOTE_DUTY)
        }
      }

      // Update UI to show current step
      setState(prev => ({ ...prev, currentStep: step }))

      // Schedule next tick
      stepTimerRef.current = setTimeout(tick, STEP_MS)
    }

    stepTimerRef.current = setTimeout(tick, STEP_MS)
  }, [])

  const pressKey = useCallback(
    async (noteIdx: number, cx: number, cy: number, cw: number, ch: number) => {
      await initialize()

      const engine = engineRef.current
      if (!engine?.isReady) return

      // Immediately play live note
      const noteId = engine.playNote(OCTAVE_FREQS[noteIdx], 'live')
      if (noteId === -1) return

      // Apply initial XY parameters
      const pitchBendCents = (cx / cw - 0.5) * 400
      const filterHz       = 300 + (1 - cy / ch) * 7700
      engine.updateNote(noteId, pitchBendCents, filterHz)

      liveNoteRef.current[noteIdx] = noteId

      // Record note into current sequencer step
      stepsRef.current[currentStepRef.current] = noteIdx
      setState(prev => {
        const newSteps   = [...stepsRef.current]
        const newPressed = new Set(Array.from(prev.pressedKeys).concat(noteIdx))
        return { ...prev, steps: newSteps, pressedKeys: newPressed }
      })

      // Start the sequencer loop on first keypress
      startSequencer()
    },
    [initialize, startSequencer],
  )

  const movePointer = useCallback(
    (noteIdx: number, cx: number, cy: number, cw: number, ch: number) => {
      const noteId = liveNoteRef.current[noteIdx]
      if (noteId === undefined || noteId === -1) return

      const pitchBendCents = (cx / cw - 0.5) * 400
      const filterHz       = 300 + (1 - cy / ch) * 7700
      engineRef.current?.updateNote(noteId, pitchBendCents, filterHz)
    },
    [],
  )

  const releaseKey = useCallback((noteIdx: number) => {
    const noteId = liveNoteRef.current[noteIdx]
    if (noteId !== undefined && noteId !== -1) {
      engineRef.current?.stopNote(noteId, 0.5)
      delete liveNoteRef.current[noteIdx]
    }

    setState(prev => {
      const newPressed = new Set(prev.pressedKeys)
      newPressed.delete(noteIdx)
      return { ...prev, pressedKeys: newPressed }
    })
  }, [])

  // Clear all recorded steps and stop the sequencer loop
  const clearSequence = useCallback(() => {
    if (stepTimerRef.current !== null) {
      clearTimeout(stepTimerRef.current)
      stepTimerRef.current = null
    }
    isSequencingRef.current = false
    currentStepRef.current  = 0
    stepsRef.current.fill(null)

    setState(prev => ({
      ...prev,
      isSequencing: false,
      currentStep:  0,
      steps:        Array(STEPS).fill(null),
    }))
  }, [])

  return { state, initialize, pressKey, movePointer, releaseKey, clearSequence }
}
