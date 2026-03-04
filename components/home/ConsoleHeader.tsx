'use client'

import { useState, useEffect } from 'react'

interface Props {
  alertMode: boolean
}

export default function ConsoleHeader({ alertMode }: Props) {
  const [stardate, setStardate] = useState('')

  useEffect(() => {
    const now = new Date()
    const sd = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}.${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`
    setStardate(sd)
  }, [])

  const textColor = alertMode ? 'text-console-red' : 'text-console-phosphor'
  const borderColor = alertMode ? 'border-console-red' : 'border-console-border'

  return (
    <header
      className={`h-12 flex items-center justify-between px-4 border-b ${borderColor} font-console text-sm transition-colors duration-300 ${alertMode ? 'alert-pulse' : ''}`}
    >
      <div className={`flex items-center gap-4 ${textColor}`}>
        <span className="text-console-phosphor-dim text-xs">USS</span>
        <span>MU-TH-UR 6000</span>
        <span className="text-console-phosphor-dim">■</span>
        <span>USCSS NOSTROMO</span>
        <span className="text-console-phosphor-dim">■</span>
        <span>WEYLAND-YUTANI CORP</span>
      </div>

      <div className={`flex items-center gap-4 ${textColor}`}>
        {alertMode && (
          <span className="text-console-red text-xs tracking-widest alert-pulse">
            ⚠ XENOMORPH CONFIRMED ⚠
          </span>
        )}
        <span className="text-console-phosphor-dim text-xs">STARDATE</span>
        <span className="text-xs">{stardate || '-----.------'}</span>
      </div>
    </header>
  )
}
