'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import MUTHURTerminal from './MUTHURTerminal'
import PixelDecorations from './PixelDecorations'
import { useKonamiCode } from '../hooks/useKonamiCode'
import { SECRET_BUTTON_SEQUENCE } from '../lib/console-data'

interface Props {
  ready?: boolean
  embedded?: boolean
  skipBoot?: boolean
  initialView?: string
}

export default function SpaceshipConsole({ ready = false, embedded = false, skipBoot = false, initialView }: Props) {
  const [alertMode, setAlertMode] = useState(false)
  const buttonSequenceRef = useRef<string[]>([])
  const secretRevealedRef = useRef(false)

  const triggerAlert = useCallback(() => {
    setAlertMode(true)
    setTimeout(() => setAlertMode(false), 10000)
  }, [])

  useKonamiCode(triggerAlert)

  // Sonar xenomorph detection triggers alert
  useEffect(() => {
    window.addEventListener('xenomorph-found', triggerAlert)
    return () => window.removeEventListener('xenomorph-found', triggerAlert)
  }, [triggerAlert])

  const handleButtonPress = useCallback((id: string) => {
    buttonSequenceRef.current = [...buttonSequenceRef.current, id].slice(-SECRET_BUTTON_SEQUENCE.length)

    if (
      !secretRevealedRef.current &&
      buttonSequenceRef.current.join(',') === SECRET_BUTTON_SEQUENCE.join(',')
    ) {
      secretRevealedRef.current = true
      buttonSequenceRef.current = []
      window.dispatchEvent(new CustomEvent('mother-secret-sequence'))
    }
  }, [])

  const handleSecretOrder = useCallback(() => {}, [])

  return (
    <div
      className={`${embedded ? 'absolute' : 'fixed'} inset-0 bg-console-bg flex flex-col font-console overflow-hidden`}
      style={{ color: '#e8a000' }}
    >
      <PixelDecorations />

      <div className="flex-1 min-h-0">
        <MUTHURTerminal
          alertMode={alertMode}
          ready={ready}
          skipBoot={skipBoot}
          initialView={initialView}
          onSecretOrder={handleSecretOrder}
          onButtonPress={handleButtonPress}
        />
      </div>
    </div>
  )
}
