'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { PROGRESSIONS } from '@/lib/synth/notes'
import type { ProgressionName } from '@/lib/synth/notes'

// Engine type imported only for type-checking; the actual module is loaded lazily
import type { SynthEngine } from '@/lib/synth/engine'

interface SynthState {
  isReady: boolean
  isPlaying: boolean
  activeChord: number | null
  activeProgression: ProgressionName | null
  error: string | null
}

export interface UseSynthReturn {
  state: SynthState
  initialize: () => Promise<void>
  playChord: (progression: ProgressionName, chordIndex: number) => void
  stopChord: () => void
  playProgression: (progression: ProgressionName) => void
  stopProgression: () => void
}

const BEATS_PER_CHORD = 4 // how many quarter-note beats each chord is held

export function useSynth(): UseSynthReturn {
  // Engine lives in a ref to avoid spurious re-renders on audio state changes
  const engineRef = useRef<SynthEngine | null>(null)

  const [state, setState] = useState<SynthState>({
    isReady: false,
    isPlaying: false,
    activeChord: null,
    activeProgression: null,
    error: null,
  })

  // Progression stepping state — refs to avoid stale closures in setTimeout
  const progressionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeProgressionRef = useRef<ProgressionName | null>(null)
  const progressionIndexRef = useRef<number>(0)

  // Cleanup ref for event listeners added during initialize()
  const visibilityCleanupRef = useRef<(() => void) | null>(null)

  // Teardown on unmount
  useEffect(() => {
    return () => {
      if (progressionTimerRef.current !== null) {
        clearTimeout(progressionTimerRef.current)
      }
      visibilityCleanupRef.current?.()
      engineRef.current?.dispose()
    }
  }, [])

  // Idempotent: safe to call multiple times; only initializes once.
  // Must be called from a user-gesture handler (click/keydown) so browsers
  // allow AudioContext creation.
  const initialize = useCallback(async () => {
    if (engineRef.current?.isReady) return

    try {
      const { SynthEngine } = await import('@/lib/synth/engine')
      const engine = new SynthEngine()
      await engine.initialize()
      engineRef.current = engine

      // Safari tab-switch recovery: resume the AudioContext when the tab
      // becomes visible again, since browsers may suspend it on hide
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          engine.resume()
        }
      }
      document.addEventListener('visibilitychange', handleVisibilityChange)
      visibilityCleanupRef.current = () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }

      setState(prev => ({ ...prev, isReady: true, error: null }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to initialize audio'
      setState(prev => ({ ...prev, error: message }))
    }
  }, [])

  const playChord = useCallback((progression: ProgressionName, chordIndex: number) => {
    const engine = engineRef.current
    if (!engine?.isReady) return

    const prog = PROGRESSIONS[progression]
    if (!prog || chordIndex < 0 || chordIndex >= prog.chords.length) return

    engine.playChord(prog.chords[chordIndex].frequencies)

    setState(prev => ({
      ...prev,
      isPlaying: true,
      activeChord: chordIndex,
      activeProgression: progression,
    }))
  }, [])

  const stopChord = useCallback(() => {
    const engine = engineRef.current
    if (!engine?.isReady) return

    engine.stopAll()
    setState(prev => ({ ...prev, isPlaying: false, activeChord: null }))
  }, [])

  const stopProgression = useCallback(() => {
    if (progressionTimerRef.current !== null) {
      clearTimeout(progressionTimerRef.current)
      progressionTimerRef.current = null
    }
    activeProgressionRef.current = null

    const engine = engineRef.current
    if (engine?.isReady) {
      engine.stopAll()
    }

    setState(prev => ({
      ...prev,
      isPlaying: false,
      activeChord: null,
      activeProgression: null,
    }))
  }, [])

  const playProgression = useCallback((progression: ProgressionName) => {
    const engine = engineRef.current
    if (!engine?.isReady) return

    // Stop any currently-running progression first
    if (progressionTimerRef.current !== null) {
      clearTimeout(progressionTimerRef.current)
      progressionTimerRef.current = null
    }

    const prog = PROGRESSIONS[progression]
    if (!prog) return

    activeProgressionRef.current = progression
    progressionIndexRef.current = 0

    // Duration each chord plays: BEATS_PER_CHORD quarter-notes at the progression's BPM
    const chordDurationMs = (BEATS_PER_CHORD * 60 / prog.bpm) * 1000

    const step = () => {
      // Guard: bail if progression was stopped or changed between timer fires
      if (activeProgressionRef.current !== progression) return

      const index = progressionIndexRef.current
      const chord = prog.chords[index]

      engine.playChord(chord.frequencies)

      setState(prev => ({
        ...prev,
        isPlaying: true,
        activeChord: index,
        activeProgression: progression,
      }))

      progressionIndexRef.current = (index + 1) % prog.chords.length
      progressionTimerRef.current = setTimeout(step, chordDurationMs)
    }

    step()
  }, [])

  return {
    state,
    initialize,
    playChord,
    stopChord,
    playProgression,
    stopProgression,
  }
}
