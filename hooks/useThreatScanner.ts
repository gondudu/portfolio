'use client'

import { useState, useEffect } from 'react'

export interface Blip {
  index: number
  intensity: number // 3 = bright, fades each tick
}

export type ThreatLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export function useThreatScanner(alertMode: boolean) {
  const [blips, setBlips] = useState<Blip[]>([])
  const threatLevel: ThreatLevel = alertMode ? 'CRITICAL' : 'LOW'

  useEffect(() => {
    const interval = alertMode ? 150 : 900

    const timer = setInterval(() => {
      setBlips(prev => {
        // Age existing blips
        const aged = prev
          .map(b => ({ ...b, intensity: b.intensity - 1 }))
          .filter(b => b.intensity > 0)

        // Add new blips
        const newBlipCount = alertMode ? 4 : 1
        const newBlips: Blip[] = []
        for (let i = 0; i < newBlipCount; i++) {
          const index = Math.floor(Math.random() * 225) // 15×15
          if (!aged.find(b => b.index === index) && !newBlips.find(b => b.index === index)) {
            newBlips.push({ index, intensity: 3 })
          }
        }

        return [...aged, ...newBlips].slice(-20)
      })
    }, interval)

    return () => clearInterval(timer)
  }, [alertMode])

  return { blips, threatLevel }
}
