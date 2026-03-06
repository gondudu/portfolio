'use client'

import { useEffect, useRef } from 'react'
import { KONAMI_CODE } from '@/lib/console-data'

export function useKonamiCode(onActivate: () => void) {
  const sequenceRef = useRef<string[]>([])
  const onActivateRef = useRef(onActivate)
  onActivateRef.current = onActivate

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      sequenceRef.current = [...sequenceRef.current, e.key].slice(-KONAMI_CODE.length)
      if (sequenceRef.current.join(',') === KONAMI_CODE.join(',')) {
        sequenceRef.current = []
        onActivateRef.current()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}
