'use client'

import React, { useState, useEffect, useRef } from 'react'

interface Blip {
  id: string
  angle: number   // degrees, 0 = north, clockwise
  radius: number  // 0–1 normalized
  lit: number     // 0–1 brightness (computed each frame)
  size: 'sm' | 'lg'
  label: string
  isNew?: boolean
}

interface ScenarioStep {
  time: number
  blips: Omit<Blip, 'lit'>[]
  status: string
  critical?: boolean
}

interface Props {
  alertMode: boolean
  color: string
  dim: string
  border: string
  amber: string
  onXenomorphDetected?: () => void
}

const CX = 150
const CY = 150
const R = 118
const SWEEP_MS = 3800 // one full revolution

// Tension arc: each step replaces the previous blip set
const SCENARIO: ScenarioStep[] = [
  {
    time: 4500,
    blips: [
      { id: 'c1', angle: 247, radius: 0.84, size: 'sm', label: 'BIO-1' },
      { id: 'c2', angle: 118, radius: 0.91, size: 'sm', label: 'BIO-2' },
    ],
    status: 'FAINT BIO-SIGNATURE DETECTED — BEARING 247 / 118 — RANGE 80–110M',
  },
  {
    time: 12000,
    blips: [
      { id: 'c1', angle: 247, radius: 0.67, size: 'sm', label: 'BIO-1' },
      { id: 'c2', angle: 118, radius: 0.80, size: 'sm', label: 'BIO-2' },
      { id: 'c3', angle: 320, radius: 0.74, size: 'sm', label: 'BIO-3', isNew: true },
    ],
    status: '3 BIO-SIGNATURES CONFIRMED. ORGANISMS. RANGE 65–80M. CLOSING.',
  },
  {
    time: 22000,
    blips: [
      { id: 'c1', angle: 247, radius: 0.41, size: 'lg', label: 'BIO-1' },
      { id: 'c2', angle: 130, radius: 0.72, size: 'sm', label: 'BIO-2' },
      { id: 'c3', angle: 320, radius: 0.55, size: 'sm', label: 'BIO-3' },
    ],
    status: '⚠ LIFE FORM BIO-1 ACCELERATING — RANGE 41M — UNKNOWN ORGANISM',
  },
  {
    time: 33000,
    blips: [
      { id: 'c1', angle: 247, radius: 0.10, size: 'lg', label: 'BIO-1', isNew: true },
      { id: 'c2', angle: 135, radius: 0.62, size: 'sm', label: 'BIO-2' },
      { id: 'c3', angle: 320, radius: 0.46, size: 'sm', label: 'BIO-3' },
    ],
    status: '⚠⚠ LIFE FORM IDENTIFIED — SPECIMEN: XENOMORPH XX121',
    critical: true,
  },
]

function toXY(angle: number, radius: number): { x: number; y: number } {
  const rad = ((angle - 90) * Math.PI) / 180
  return {
    x: CX + R * radius * Math.cos(rad),
    y: CY + R * radius * Math.sin(rad),
  }
}

function sweepPath(sweepAngle: number, trailDeg = 65): string {
  const s = toXY(sweepAngle, 1)
  const t = toXY((sweepAngle - trailDeg + 360) % 360, 1)
  // Arc: from sweep tip back trailDeg degrees counter-clockwise
  return `M ${CX} ${CY} L ${s.x} ${s.y} A ${R} ${R} 0 0 0 ${t.x} ${t.y} Z`
}

export default function SonarScanner({ alertMode, color, dim, border, amber, onXenomorphDetected }: Props) {
  const [sweepAngle, setSweepAngle] = useState(0)
  const [blips, setBlips] = useState<Blip[]>([])
  const [status, setStatus] = useState('INITIATING LIFE FORM SCANNER...')
  const [pings, setPings] = useState<{ id: string; x: number; y: number; key: number }[]>([])
  const startRef = useRef(Date.now())
  const rafRef = useRef<number>()
  const xenoFiredRef = useRef(false)
  const pingKeyRef = useRef(0)

  const c = alertMode ? '#ff2200' : color
  const cd = alertMode ? 'rgba(255,34,0,0.4)' : dim
  const trailColor = alertMode ? '255,34,0' : '51,255,0'

  // RAF sweep animation + blip lighting
  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() - startRef.current
      const angle = ((elapsed / SWEEP_MS) * 360) % 360
      setSweepAngle(angle)

      setBlips(prev =>
        prev.map(blip => {
          // degrees since sweep last passed this blip
          const diff = (angle - blip.angle + 360) % 360
          // bright right after sweep, fade over 200°
          const lit = diff <= 5 ? 1 : Math.max(0, 1 - (diff - 5) / 195)
          return { ...blip, lit }
        })
      )

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  // Scenario timeline
  useEffect(() => {
    const tids: ReturnType<typeof setTimeout>[] = []

    // "All clear" after 1.5s
    tids.push(setTimeout(() => setStatus('NO LIFE FORMS DETECTED. SCANNING SECTOR LV-426...'), 1500))

    SCENARIO.forEach(step => {
      tids.push(setTimeout(() => {
        const newOnes = step.blips.filter(b => b.isNew)
        setBlips(step.blips.map(b => ({ ...b, lit: 0 })))
        setStatus(step.status)

        // Spawn pings for new blips
        if (newOnes.length > 0) {
          const newPings = newOnes.map(b => {
            const pos = toXY(b.angle, b.radius)
            return { id: b.id, x: pos.x, y: pos.y, key: pingKeyRef.current++ }
          })
          setPings(prev => [...prev, ...newPings])
          setTimeout(() => setPings(prev => prev.filter(p => !newPings.find(n => n.key === p.key))), 2000)
        }

        if (step.critical && !xenoFiredRef.current) {
          xenoFiredRef.current = true
          setTimeout(() => onXenomorphDetected?.(), 3500)
        }
      }, step.time))
    })

    return () => tids.forEach(clearTimeout)
  }, [onXenomorphDetected])

  const isCritical = status.startsWith('⚠⚠')
  const isWarning = status.startsWith('⚠') && !isCritical
  const statusColor = isCritical ? '#ff2200' : isWarning ? amber : c

  return (
    <div
      style={{
        padding: '12px 16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        overflow: 'hidden',
      }}
    >
      <div style={{ color: cd, fontSize: '12px', letterSpacing: '0.12em' }}>── MOTION TRACKER ──</div>

      {/* Radar */}
      <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
        <svg
          viewBox="0 0 300 300"
          style={{ width: '220px', height: '220px' }}
        >
          <defs>
            <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={`rgba(${trailColor}, 0.04)`} />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="blipGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background fill */}
          <circle cx={CX} cy={CY} r={R} fill="rgba(0,12,0,0.85)" />
          <circle cx={CX} cy={CY} r={R} fill="url(#radarBg)" />

          {/* Range rings */}
          {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <circle
              key={i}
              cx={CX} cy={CY} r={R * ratio}
              fill="none"
              stroke={border}
              strokeWidth={i === 3 ? 1 : 0.5}
              strokeDasharray={i < 3 ? '3 5' : '0'}
            />
          ))}

          {/* Crosshairs */}
          <line x1={CX} y1={CY - R} x2={CX} y2={CY + R} stroke={border} strokeWidth="0.5" />
          <line x1={CX - R} y1={CY} x2={CX + R} y2={CY} stroke={border} strokeWidth="0.5" />

          {/* Diagonal guides */}
          {[45, 135].map(a => {
            const p1 = toXY(a, 0.9)
            const p2 = toXY(a + 180, 0.9)
            return <line key={a} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={border} strokeWidth="0.3" strokeDasharray="2 6" />
          })}

          {/* Bearing ticks */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
            const inner = toXY(a, 0.91)
            const outer = toXY(a, 1)
            return <line key={a} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke={border} strokeWidth="1" />
          })}

          {/* Sweep trail (filled arc) */}
          <path
            d={sweepPath(sweepAngle, 65)}
            fill={`rgba(${trailColor}, 0.07)`}
          />
          <path
            d={sweepPath(sweepAngle, 25)}
            fill={`rgba(${trailColor}, 0.07)`}
          />

          {/* Sweep arm */}
          <line
            x1={CX} y1={CY}
            x2={toXY(sweepAngle, 1).x}
            y2={toXY(sweepAngle, 1).y}
            stroke={c}
            strokeWidth="1.5"
            opacity="0.85"
            filter="url(#glow)"
          />

          {/* Clip boundary */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke={border} strokeWidth="1" />

          {/* Ping animations */}
          {pings.map(ping => (
            <g key={ping.key}>
              <circle cx={ping.x} cy={ping.y} r="4" fill="none" stroke={c} strokeWidth="1" opacity="0">
                <animate attributeName="r" values="4;22" dur="1.8s" fill="freeze" />
                <animate attributeName="opacity" values="0.9;0" dur="1.8s" fill="freeze" />
              </circle>
            </g>
          ))}

          {/* Blips */}
          {blips.map(blip => {
            const pos = toXY(blip.angle, blip.radius)
            const r = blip.size === 'lg' ? 5 : 3.5
            const lit = blip.lit
            if (lit < 0.01) return null
            return (
              <g key={blip.id} filter="url(#blipGlow)">
                {/* Outer ring */}
                <circle
                  cx={pos.x} cy={pos.y}
                  r={r + 5}
                  fill="none"
                  stroke={c}
                  strokeWidth="0.5"
                  opacity={lit * 0.3}
                />
                {/* Main dot */}
                <circle
                  cx={pos.x} cy={pos.y}
                  r={r}
                  fill={c}
                  opacity={lit * 0.95}
                />
                {/* Label */}
                {lit > 0.25 && (
                  <text
                    x={pos.x + r + 4}
                    y={pos.y + 3}
                    fill={c}
                    fontSize="8"
                    fontFamily="monospace"
                    opacity={lit * 0.85}
                  >
                    {blip.label}
                  </text>
                )}
              </g>
            )
          })}

          {/* Center */}
          <circle cx={CX} cy={CY} r={3} fill={c} opacity="0.9" filter="url(#glow)" />

          {/* Compass labels */}
          {[
            { label: 'N', angle: 0, dx: -3, dy: -6 },
            { label: 'E', angle: 90, dx: 6, dy: 4 },
            { label: 'S', angle: 180, dx: -3, dy: 14 },
            { label: 'W', angle: 270, dx: -16, dy: 4 },
          ].map(({ label, angle, dx, dy }) => {
            const p = toXY(angle, 1.08)
            return (
              <text key={label} x={p.x + dx} y={p.y + dy} fill={cd} fontSize="9" fontFamily="monospace">
                {label}
              </text>
            )
          })}
        </svg>
      </div>

      {/* Status */}
      <div
        style={{
          color: statusColor,
          fontSize: '12px',
          letterSpacing: '0.04em',
          minHeight: '16px',
          transition: 'color 0.3s ease',
        }}
      >
        {status}
      </div>

      {/* Stats */}
      <div
        style={{
          borderTop: `1px solid ${border}`,
          paddingTop: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
        }}
      >
        {[
          { label: 'CONTACTS', value: blips.length > 0 ? String(blips.length) : '—', warn: blips.length > 2 },
          { label: 'SWEEP RATE', value: '15.8 RPM', warn: false },
          { label: 'RANGE MAX', value: '130M', warn: false },
          { label: 'SECTOR', value: 'LV-426', warn: false },
        ].map(({ label, value, warn }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: cd, fontSize: '12px' }}>{label}</span>
            <span style={{ color: warn ? amber : c, fontSize: '12px' }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
