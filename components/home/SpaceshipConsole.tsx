'use client'

import { useState, useCallback, useRef } from 'react'
import ConsoleHeader from './ConsoleHeader'
import StatusMonitor from './StatusMonitor'
import ThreatScanner from './ThreatScanner'
import MUTHURTerminal from './MUTHURTerminal'
import ProjectMonitor from './ProjectMonitor'
import CrewManifest from './CrewManifest'
import ControlPanel from './ControlPanel'
import PixelDecorations from './PixelDecorations'
import { useKonamiCode } from '@/hooks/useKonamiCode'
import { SECRET_BUTTON_SEQUENCE } from '@/lib/console-data'

type ConsolePanel = 'terminal' | 'mission-logs' | 'crew-manifest'

export default function SpaceshipConsole() {
  const [activePanel, setActivePanel] = useState<ConsolePanel>('terminal')
  const [alertMode, setAlertMode] = useState(false)
  const buttonSequenceRef = useRef<string[]>([])
  const secretRevealedRef = useRef(false)

  // MOTHER terminal ref to trigger messages
  const motherRef = useRef<{ enqueueSecret: () => void } | null>(null)

  const triggerAlert = useCallback(() => {
    setAlertMode(true)
    setTimeout(() => setAlertMode(false), 10000)
  }, [])

  useKonamiCode(triggerAlert)

  const handleButtonPress = useCallback((id: string) => {
    buttonSequenceRef.current = [...buttonSequenceRef.current, id].slice(-SECRET_BUTTON_SEQUENCE.length)

    if (
      !secretRevealedRef.current &&
      buttonSequenceRef.current.join(',') === SECRET_BUTTON_SEQUENCE.join(',')
    ) {
      secretRevealedRef.current = true
      buttonSequenceRef.current = []
      // Trigger via panel switch to terminal + enqueue message
      setActivePanel('terminal')
      // The message will be enqueued via the terminal's ref - we use a custom event instead
      window.dispatchEvent(new CustomEvent('mother-secret-sequence'))
    }
  }, [])

  const handleSecretOrder = useCallback(() => {
    // Already handled inside MUTHURTerminal via prop
  }, [])

  return (
    <div
      className="fixed inset-0 bg-console-bg flex flex-col font-console overflow-hidden"
      style={{ color: '#33ff00' }}
    >
      <PixelDecorations />

      {/* Header bar — 48px */}
      <ConsoleHeader alertMode={alertMode} />

      {/* Main content area */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr_240px] gap-2 p-2 min-h-0">
        {/* Left monitor — Status */}
        <div className="hidden md:block min-h-0">
          <StatusMonitor alertMode={alertMode} />
        </div>

        {/* Center monitor — main panel */}
        <div className="min-h-0 relative">
          <div className={activePanel === 'terminal' ? 'h-full' : 'hidden'}>
            <MUTHURTerminal alertMode={alertMode} onSecretOrder={handleSecretOrder} />
          </div>
          <div className={activePanel === 'mission-logs' ? 'h-full' : 'hidden'}>
            <ProjectMonitor alertMode={alertMode} />
          </div>
          <div className={activePanel === 'crew-manifest' ? 'h-full' : 'hidden'}>
            <CrewManifest alertMode={alertMode} />
          </div>
        </div>

        {/* Right monitor — Threat scanner */}
        <div className="hidden md:block min-h-0">
          <ThreatScanner alertMode={alertMode} />
        </div>
      </div>

      {/* Control panel — 80px */}
      <div className="h-20">
        <ControlPanel
          activePanel={activePanel}
          alertMode={alertMode}
          onPanelChange={setActivePanel}
          onButtonPress={handleButtonPress}
        />
      </div>
    </div>
  )
}
