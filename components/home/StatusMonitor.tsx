'use client'

import { useState, useEffect } from 'react'
import { INITIAL_SHIP_SYSTEMS, ShipSystem } from '@/lib/console-data'

interface Props {
  alertMode: boolean
}

function renderBar(value: number, alertMode: boolean): string {
  const filled = Math.round(value / 10)
  const empty = 10 - filled
  if (alertMode) return '█'.repeat(filled) + '░'.repeat(empty)
  return '█'.repeat(filled) + '░'.repeat(empty)
}

export default function StatusMonitor({ alertMode }: Props) {
  const [systems, setSystems] = useState<ShipSystem[]>(INITIAL_SHIP_SYSTEMS)

  // Drift values slowly over time
  useEffect(() => {
    if (alertMode) {
      setSystems(prev =>
        prev.map(s => ({ ...s, value: Math.max(30, s.value - Math.random() * 20), status: 'WARNING' as const }))
      )
      return
    }

    const timer = setInterval(() => {
      setSystems(prev =>
        prev.map(s => {
          const drift = (Math.random() - 0.5) * 4
          const newVal = Math.max(s.min + 5, Math.min(s.max, s.value + drift))
          const status: ShipSystem['status'] =
            newVal < 30 ? 'CRITICAL' : newVal < 60 ? 'WARNING' : 'NOMINAL'
          return { ...s, value: Math.round(newVal), status }
        })
      )
    }, 3500 + Math.random() * 1500)

    return () => clearInterval(timer)
  }, [alertMode])

  const labelColor = alertMode ? 'text-console-red' : 'text-console-phosphor-dim'
  const borderColor = alertMode ? 'border-console-red' : 'border-console-border'

  const statusColor = (status: ShipSystem['status']) => {
    if (alertMode) return 'text-console-red'
    if (status === 'CRITICAL') return 'text-console-red'
    if (status === 'WARNING') return 'text-console-amber'
    return 'text-console-phosphor'
  }

  return (
    <div
      className={`crt-monitor crt-screen-glow crt-flicker h-full border ${borderColor} bg-console-panel flex flex-col p-3 gap-1 transition-colors duration-300`}
    >
      <div className={`${labelColor} font-console text-xs mb-2 tracking-widest`}>
        ── SHIP STATUS ──
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {systems.map(system => (
          <div key={system.id} className="font-console text-xs">
            <div className={`${labelColor} mb-0.5 text-[10px]`}>{system.name}</div>
            <div className={`${statusColor(system.status)}`}>
              {renderBar(system.value, alertMode)}
            </div>
            <div className="flex justify-between mt-0.5">
              <span className={statusColor(system.status)}>{system.value}{system.unit}</span>
              <span className={`text-[10px] ${statusColor(system.status)}`}>{alertMode ? 'WARNING' : system.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-auto pt-2 border-t ${borderColor} ${labelColor} font-console text-[10px]`}>
        <div>USCSS NOSTROMO</div>
        <div>REG: 1809246(09)</div>
        <div className={alertMode ? 'text-console-red alert-pulse' : 'text-console-phosphor'}>
          {alertMode ? '⚠ ALERT MODE' : 'STATUS: NOMINAL'}
        </div>
      </div>
    </div>
  )
}
