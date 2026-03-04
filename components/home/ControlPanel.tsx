'use client'

import { useRouter } from 'next/navigation'

type ConsolePanel = 'terminal' | 'mission-logs' | 'crew-manifest'

interface Props {
  activePanel: ConsolePanel
  alertMode: boolean
  onPanelChange: (panel: ConsolePanel) => void
  onButtonPress: (id: string) => void
}

interface PanelButton {
  id: string
  label: string
  panel?: ConsolePanel
  action?: () => void
}

export default function ControlPanel({ activePanel, alertMode, onPanelChange, onButtonPress }: Props) {
  const router = useRouter()

  const buttons: PanelButton[] = [
    { id: 'mission-logs', label: 'MISSION LOGS', panel: 'mission-logs' },
    { id: 'crew-manifest', label: 'CREW MANIFEST', panel: 'crew-manifest' },
    { id: 'comm-link', label: 'COMM LINK', action: () => router.push('/contact') },
    { id: 'life-support', label: 'LIFE SUPPORT', panel: 'terminal' },
    { id: 'threat-scan', label: 'THREAT SCAN' },
  ]

  const borderColor = alertMode ? 'border-console-red' : 'border-console-border'
  const dimColor = alertMode ? 'text-console-red opacity-60' : 'text-console-phosphor-dim'

  const handleButton = (btn: PanelButton) => {
    onButtonPress(btn.id)
    if (btn.action) {
      btn.action()
    } else if (btn.panel) {
      onPanelChange(btn.panel)
    }
  }

  const isActive = (btn: PanelButton) =>
    btn.panel && btn.panel === activePanel && btn.panel !== 'terminal'

  return (
    <div
      className={`h-full border-t ${borderColor} bg-console-bg flex items-center px-4 gap-3 transition-colors duration-300`}
    >
      <div className={`${dimColor} font-console text-xs mr-2 whitespace-nowrap`}>
        CONTROL
      </div>

      <div className="flex items-center gap-2 flex-1">
        {buttons.map(btn => (
          <button
            key={btn.id}
            onClick={() => handleButton(btn)}
            className={`
              font-console text-xs px-3 py-2 border transition-all duration-200 tracking-widest
              ${isActive(btn)
                ? alertMode
                  ? 'border-console-red bg-console-red/20 text-console-red'
                  : 'border-console-phosphor bg-console-phosphor/10 text-console-phosphor-bright'
                : alertMode
                ? 'border-console-red/40 text-console-red hover:border-console-red hover:bg-console-red/10'
                : 'border-console-border text-console-phosphor-dim hover:border-console-phosphor-dim hover:text-console-phosphor'
              }
              ${alertMode ? 'alert-pulse' : ''}
            `}
          >
            {btn.label}
          </button>
        ))}

        {(activePanel === 'mission-logs' || activePanel === 'crew-manifest') && (
          <button
            onClick={() => onPanelChange('terminal')}
            className={`font-console text-xs px-3 py-2 border transition-colors tracking-widest ml-auto ${alertMode ? 'border-console-red text-console-red/60 hover:text-console-red' : 'border-console-border text-console-phosphor-dim hover:text-console-phosphor'}`}
          >
            ← MOTHER
          </button>
        )}
      </div>

      <div className={`${dimColor} font-console text-[10px] ml-auto whitespace-nowrap`}>
        USCSS NOSTROMO
      </div>
    </div>
  )
}
