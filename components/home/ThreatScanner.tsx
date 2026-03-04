'use client'

import { useThreatScanner } from '@/hooks/useThreatScanner'

interface Props {
  alertMode: boolean
}

const GRID_SIZE = 15

export default function ThreatScanner({ alertMode }: Props) {
  const { blips, threatLevel } = useThreatScanner(alertMode)

  const blipMap = new Map(blips.map(b => [b.index, b.intensity]))

  const borderColor = alertMode ? 'border-console-red' : 'border-console-border'
  const labelColor = alertMode ? 'text-console-red' : 'text-console-phosphor-dim'

  const getDotClass = (idx: number) => {
    const intensity = blipMap.get(idx)
    if (alertMode) {
      if (intensity === 3) return 'bg-console-red'
      if (intensity === 2) return 'bg-console-red opacity-70'
      if (intensity === 1) return 'bg-console-red opacity-40'
      return 'bg-console-phosphor-dim opacity-20'
    }
    if (intensity === 3) return 'bg-console-phosphor-bright'
    if (intensity === 2) return 'bg-console-phosphor'
    if (intensity === 1) return 'bg-console-phosphor opacity-50'
    return 'bg-console-border opacity-40'
  }

  const threatColor =
    threatLevel === 'CRITICAL'
      ? 'text-console-red alert-pulse'
      : 'text-console-phosphor'

  return (
    <div
      className={`crt-monitor crt-screen-glow crt-flicker h-full border ${borderColor} bg-console-panel flex flex-col p-3 gap-2 transition-colors duration-300`}
    >
      <div className={`${labelColor} font-console text-xs mb-1 tracking-widest`}>
        ── MOTION TRACKER ──
      </div>

      {/* Dot grid */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="grid gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => (
            <div
              key={i}
              className={`w-[10px] h-[10px] rounded-full transition-all duration-200 ${getDotClass(i)}`}
            />
          ))}
        </div>
      </div>

      {/* Threat readout */}
      <div className={`border-t ${borderColor} pt-2 font-console text-xs`}>
        <div className="flex justify-between mb-1">
          <span className={labelColor}>THREAT LEVEL</span>
          <span className={threatColor}>{threatLevel}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className={labelColor}>CONTACTS</span>
          <span className={alertMode ? 'text-console-red' : 'text-console-phosphor'}>
            {alertMode ? blips.length : blips.filter(b => b.intensity === 3).length}
          </span>
        </div>
        <div className="flex justify-between">
          <span className={labelColor}>RANGE</span>
          <span className="text-console-phosphor">0–100M</span>
        </div>
      </div>
    </div>
  )
}
