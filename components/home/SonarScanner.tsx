'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useConsoleAudio } from '@/hooks/useConsoleAudio'

// Small radar constants
const CX = 55
const CY = 55
const R  = 46
const SWEEP_MS = 3800
const TOTAL_MS = 38000

type Phase = 0 | 1 | 2 | 3 | 4

interface BlipDef { angle: number; radius: number; size: 'sm' | 'lg' }
interface ContactRow {
  id: string; brg: string; range: string; deltaR: string
  motion: string; signal: string
  closing?: boolean; critical?: boolean; accel?: boolean; isNew?: boolean
}

const PHASE_BLIPS: BlipDef[][] = [
  [],
  [{ angle: 247, radius: 0.84, size: 'sm' }, { angle: 118, radius: 0.91, size: 'sm' }],
  [{ angle: 247, radius: 0.67, size: 'sm' }, { angle: 118, radius: 0.80, size: 'sm' }, { angle: 320, radius: 0.74, size: 'sm' }],
  [{ angle: 247, radius: 0.41, size: 'lg' }, { angle: 130, radius: 0.72, size: 'sm' }, { angle: 320, radius: 0.55, size: 'sm' }],
  [{ angle: 247, radius: 0.10, size: 'lg' }, { angle: 135, radius: 0.62, size: 'sm' }, { angle: 320, radius: 0.46, size: 'sm' }],
]

const PHASE_CONTACTS: ContactRow[][] = [
  [],
  [
    { id: 'BIO-1', brg: '247°', range: '082M', deltaR: ' --   ', motion: 'FAINT',    signal: 'ORGANIC' },
    { id: 'BIO-2', brg: '118°', range: '091M', deltaR: ' --   ', motion: 'FAINT',    signal: 'ORGANIC' },
  ],
  [
    { id: 'BIO-1', brg: '247°', range: '065M', deltaR: '-17M  ', motion: 'MODERATE', signal: 'ORGANIC', closing: true },
    { id: 'BIO-2', brg: '118°', range: '080M', deltaR: '-11M  ', motion: 'LOW',      signal: 'ORGANIC', closing: true },
    { id: 'BIO-3', brg: '320°', range: '074M', deltaR: ' --   ', motion: 'FAINT',    signal: 'ORGANIC', isNew: true },
  ],
  [
    { id: 'BIO-1', brg: '247°', range: '041M', deltaR: '-24M ▲', motion: 'HIGH',     signal: 'ORGANIC', closing: true, accel: true },
    { id: 'BIO-2', brg: '130°', range: '072M', deltaR: ' -8M  ', motion: 'LOW',      signal: 'ORGANIC', closing: true },
    { id: 'BIO-3', brg: '320°', range: '055M', deltaR: '-19M  ', motion: 'MODERATE', signal: 'ORGANIC', closing: true },
  ],
  [
    { id: 'BIO-1', brg: '247°', range: '010M', deltaR: '-31M▲▲', motion: 'EXTREME',  signal: 'XENOMORPH XX121', closing: true, critical: true },
    { id: 'BIO-2', brg: '135°', range: '062M', deltaR: '-10M  ', motion: 'MODERATE', signal: 'ORGANIC', closing: true },
    { id: 'BIO-3', brg: '320°', range: '046M', deltaR: ' -9M  ', motion: 'MODERATE', signal: 'ORGANIC', closing: true },
  ],
]

const PHASE_CONDITION = ['NOMINAL', 'ELEVATED', 'ELEVATED', 'CRITICAL', 'EXTREME']
const PHASE_CLOSEST   = ['---', '082M', '065M', '041M', '010M']
const PHASE_TIMES     = [0, 4500, 12000, 22000, 33000]

function toXY(angle: number, radius: number): { x: number; y: number } {
  const rad = ((angle - 90) * Math.PI) / 180
  return { x: CX + R * radius * Math.cos(rad), y: CY + R * radius * Math.sin(rad) }
}

function sweepPath(angle: number, trail = 55): string {
  const s = toXY(angle, 1)
  const t = toXY((angle - trail + 360) % 360, 1)
  return `M ${CX} ${CY} L ${s.x} ${s.y} A ${R} ${R} 0 0 0 ${t.x} ${t.y} Z`
}

interface Props {
  alertMode: boolean
  color: string; dim: string; border: string; amber: string
  onXenomorphDetected?: () => void
}

export default function SonarScanner({ alertMode, color, dim, border, amber, onXenomorphDetected }: Props) {
  const [phase, setPhase]               = useState<Phase>(0)
  const [sweepAngle, setSweepAngle]     = useState(0)
  const [scanProg, setScanProg]         = useState(0)
  const [elapsed, setElapsed]           = useState(0)
  const [blink, setBlink]               = useState(true)
  const [fastBlink, setFastBlink]       = useState(true)
  const [litMap, setLitMap]             = useState<Record<number, number>>({})
  const [flashMsg, setFlashMsg]         = useState('')

  const startRef    = useRef(Date.now())
  const rafRef      = useRef<number>()
  const phaseRef    = useRef<Phase>(0)
  const prevLitRef  = useRef<Record<number, number>>({})
  const xenoFired   = useRef(false)
  phaseRef.current  = phase

  const { playSonarPing } = useConsoleAudio()

  const c          = alertMode ? '#ff2200' : color
  const cd         = alertMode ? 'rgba(255,34,0,0.35)' : dim
  const trailRgb   = alertMode ? '255,34,0' : '232,160,0'
  const FONT       = "'VT323', monospace"

  const isCritical = phase === 4
  const isWarning  = phase === 3
  const condColor  = isCritical ? '#ff2200' : isWarning ? amber : c
  const closeColor = isCritical ? '#ff2200' : phase >= 3 ? amber : c

  // Blink intervals
  useEffect(() => {
    const a = setInterval(() => setBlink(b => !b), 530)
    const b = setInterval(() => setFastBlink(f => !f), 300)
    return () => { clearInterval(a); clearInterval(b) }
  }, [])

  // RAF — sweep + progress + blip lighting
  useEffect(() => {
    const animate = () => {
      const now = Date.now()
      const el  = now - startRef.current
      const angle = ((el / SWEEP_MS) * 360) % 360
      setSweepAngle(angle)
      setElapsed(el)
      setScanProg(Math.sin(el / 4000) * 0.5 + 0.5)

      const currentBlips = PHASE_BLIPS[phaseRef.current]
      const next: Record<number, number> = {}
      currentBlips.forEach((blip, i) => {
        const diff = (angle - blip.angle + 360) % 360
        const lit  = diff <= 5 ? 1 : Math.max(0, 1 - (diff - 5) / 195)
        const prev = prevLitRef.current[i] ?? 0
        if (lit > 0.9 && prev < 0.5) playSonarPing(blip.size === 'lg')
        prevLitRef.current[i] = lit
        next[i] = lit
      })
      setLitMap(next)

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Scenario timeline
  useEffect(() => {
    const tids: ReturnType<typeof setTimeout>[] = []
    for (let p = 1; p <= 4; p++) {
      const pp = p as Phase
      tids.push(setTimeout(() => {
        setPhase(pp)
        if (pp === 1) {
          setFlashMsg('[!] NEW CONTACT ×2 — BEARING 247 / 118')
          setTimeout(() => setFlashMsg(''), 2200)
        }
        if (pp === 2) {
          setFlashMsg('[!] NEW CONTACT — BEARING 320')
          setTimeout(() => setFlashMsg(''), 2200)
        }
        if (pp === 4 && !xenoFired.current) {
          xenoFired.current = true
          setTimeout(() => onXenomorphDetected?.(), 3500)
        }
      }, PHASE_TIMES[p]))
    }
    return () => tids.forEach(clearTimeout)
  }, [onXenomorphDetected]) // eslint-disable-line react-hooks/exhaustive-deps

  const contacts    = PHASE_CONTACTS[phase]
  const condition   = PHASE_CONDITION[phase]
  const closest     = PHASE_CLOSEST[phase]

  // Progress / elapsed bar strings
  const barFilled   = Math.floor(scanProg * 14)
  const barStr      = '█'.repeat(barFilled) + '░'.repeat(14 - barFilled)
  const elFrac      = Math.min(1, elapsed / TOTAL_MS)
  const elFilled    = Math.floor(elFrac * 16)
  const elStr       = '█'.repeat(elFilled) + '░'.repeat(16 - elFilled)
  const elSec       = Math.floor(elapsed / 1000)
  const elDisplay   = `${String(Math.floor(elSec / 60)).padStart(2, '0')}:${String(elSec % 60).padStart(2, '0')}`

  const sysIndicators = [
    { label: 'HULL SENSORS',    value: 'ONLINE' },
    { label: 'NEURAL NET',      value: 'LINKED' },
    { label: 'ATMOSPHERE MON',  value: 'NOMINAL' },
    { label: 'XENOBIO DATABASE', value: phase === 4 ? 'MATCH FOUND' : 'QUERIED' },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: FONT }}>

      {/* ── A: Header ── */}
      <div style={{
        padding: '6px 14px',
        borderBottom: `1px solid ${border}`,
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ color: cd, fontSize: '14px', letterSpacing: '0.12em' }}>
          BIO-SENSOR ARRAY &nbsp;·&nbsp; SECTOR LV-426
        </span>
        <span style={{ color: c, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ opacity: blink ? 1 : 0.1, transition: 'opacity 0.08s' }}>●</span>
          SWEEP ACTIVE
        </span>
      </div>

      {/* ── B: Contact feed ── */}
      <div style={{
        flexShrink: 0,
        borderBottom: `1px solid ${border}`,
        padding: '8px 14px',
        minHeight: '136px',
      }}>
        {/* Column headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '52px 44px 52px 64px 76px 1fr',
          color: cd,
          fontSize: '13px',
          letterSpacing: '0.06em',
          marginBottom: '1px',
        }}>
          <span>ID</span><span>BRG</span><span>RANGE</span>
          <span>DELTA-R</span><span>MOTION</span><span>SIGNAL</span>
        </div>
        <div style={{ color: cd, fontSize: '12px', marginBottom: '4px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          {'──────────────────────────────────────────────────────────────────────'}
        </div>

        {/* Flash message */}
        {flashMsg && (
          <div style={{ color: amber, fontSize: '13px', letterSpacing: '0.06em', marginBottom: '3px' }}>
            {flashMsg}
          </div>
        )}

        {contacts.length === 0 ? (
          <div>
            <div style={{ color: cd, fontSize: '14px', marginBottom: '3px' }}>NO CONTACT LOGGED</div>
            <div style={{ color: cd, fontSize: '14px' }}>
              {'SCANNING... ['}{barStr}{'] '}{Math.round(scanProg * 100)}{'%'}
            </div>
          </div>
        ) : (
          contacts.map(row => {
            const rowColor = row.critical
              ? (fastBlink ? '#ff2200' : 'rgba(255,34,0,0.25)')
              : row.accel ? amber
              : c
            const deltaColor = row.critical
              ? (fastBlink ? '#ff2200' : 'rgba(255,34,0,0.25)')
              : row.closing ? amber
              : cd
            return (
              <div key={row.id} style={{
                display: 'grid',
                gridTemplateColumns: '52px 44px 52px 64px 76px 1fr',
                color: rowColor,
                fontSize: '14px',
                lineHeight: '19px',
                transition: 'color 0.2s',
              }}>
                <span>{row.id}</span>
                <span>{row.brg}</span>
                <span style={{ color: row.critical ? (fastBlink ? '#ff2200' : 'rgba(255,34,0,0.3)') : c }}>{row.range}</span>
                <span style={{ color: deltaColor, transition: 'color 0.2s' }}>{row.deltaR}</span>
                <span>{row.motion}</span>
                <span style={{ color: row.critical ? (fastBlink ? '#ff2200' : 'rgba(255,34,0,0.3)') : c }}>
                  {row.signal}
                  {row.isNew && (
                    <span style={{ color: amber, marginLeft: '6px', opacity: blink ? 1 : 0.1, transition: 'opacity 0.1s' }}>
                      [!NEW]
                    </span>
                  )}
                </span>
              </div>
            )
          })
        )}

        {/* Critical alert line */}
        {phase === 4 && (
          <div style={{
            color: fastBlink ? '#ff2200' : 'rgba(255,34,0,0.2)',
            fontSize: '13px',
            marginTop: '3px',
            letterSpacing: '0.05em',
            transition: 'color 0.08s',
          }}>
            {'!! SPECIMEN IDENTIFIED — CONTAINMENT PROTOCOL INITIATED'}
          </div>
        )}
      </div>

      {/* ── C: Radar + stats ── */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0, borderBottom: `1px solid ${border}` }}>

        {/* Left: small radar */}
        <div style={{
          width: '130px',
          flexShrink: 0,
          borderRight: `1px solid ${border}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px',
          gap: '4px',
        }}>
          <div style={{ color: cd, fontSize: '11px', letterSpacing: '0.08em', textAlign: 'center' }}>
            MOTION TRACK / 130M
          </div>
          <svg viewBox="0 0 110 110" style={{ width: '110px', height: '110px' }}>
            <defs>
              <filter id="rsg" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="rsb" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <circle cx={CX} cy={CY} r={R} fill="rgba(6,4,0,0.95)" />
            {[0.33, 0.66, 1].map((ratio, i) => (
              <circle key={i} cx={CX} cy={CY} r={R * ratio} fill="none"
                stroke={border} strokeWidth={i === 2 ? 0.8 : 0.4}
                strokeDasharray={i < 2 ? '2 4' : '0'} />
            ))}
            <line x1={CX} y1={CY - R} x2={CX} y2={CY + R} stroke={border} strokeWidth="0.4" />
            <line x1={CX - R} y1={CY} x2={CX + R} y2={CY} stroke={border} strokeWidth="0.4" />
            <path d={sweepPath(sweepAngle, 55)} fill={`rgba(${trailRgb}, 0.09)`} />
            <path d={sweepPath(sweepAngle, 22)} fill={`rgba(${trailRgb}, 0.09)`} />
            <line x1={CX} y1={CY}
              x2={toXY(sweepAngle, 1).x} y2={toXY(sweepAngle, 1).y}
              stroke={c} strokeWidth="1.2" opacity="0.85" filter="url(#rsg)" />
            <circle cx={CX} cy={CY} r={R} fill="none" stroke={c} strokeWidth="0.8" opacity="0.45" />
            {PHASE_BLIPS[phase].map((blip, i) => {
              const pos = toXY(blip.angle, blip.radius)
              const br  = blip.size === 'lg' ? 3 : 2
              const lit = litMap[i] ?? 0
              if (lit < 0.01) return null
              const bc  = blip.size === 'lg' && phase === 4 ? '#ff2200' : c
              return (
                <g key={i} filter="url(#rsb)">
                  <circle cx={pos.x} cy={pos.y} r={br + 3} fill="none" stroke={bc} strokeWidth="0.4" opacity={lit * 0.3} />
                  <circle cx={pos.x} cy={pos.y} r={br} fill={bc} opacity={lit * 0.95} />
                </g>
              )
            })}
            <circle cx={CX} cy={CY} r={2} fill={c} opacity="0.9" filter="url(#rsg)" />
          </svg>
        </div>

        {/* Right: stats */}
        <div style={{ flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '5px', overflow: 'hidden' }}>
          {[
            { label: 'CONTACTS', value: contacts.length > 0 ? String(contacts.length).padStart(3, '0') : '---', color: contacts.length > 0 ? (contacts.length > 2 ? amber : c) : cd },
            { label: 'CLOSEST',  value: closest,   color: closeColor },
            { label: 'SWEEP RT', value: '15.8 RPM', color: c },
            { label: 'SECTOR',   value: 'LV-426',   color: c },
          ].map(({ label, value, color: vc }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ color: cd, fontSize: '13px' }}>{label}</span>
              <span style={{ color: vc, fontSize: '18px', transition: 'color 0.3s' }}>{value}</span>
            </div>
          ))}

          <div style={{
            marginTop: '3px',
            paddingTop: '5px',
            borderTop: `1px solid ${border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}>
            <span style={{ color: cd, fontSize: '13px' }}>CONDITION</span>
            <span style={{ color: condColor, fontSize: '18px', transition: 'color 0.3s' }}>{condition}</span>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <div style={{ color: cd, fontSize: '11px', marginBottom: '1px' }}>SCAN TIME</div>
            <div style={{ color: cd, fontSize: '12px' }}>
              {'['}{elStr}{'] '}{elDisplay}
            </div>
          </div>
        </div>
      </div>

      {/* ── D: System status bar ── */}
      <div style={{
        flexShrink: 0,
        padding: '5px 14px 7px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2px 12px',
      }}>
        {sysIndicators.map((ind, i) => {
          const indBlink = i % 2 === 0 ? blink : fastBlink
          const indDot   = alertMode ? (fastBlink ? 1 : 0.15)
            : (indBlink ? 0.9 : 0.2)
          const indColor = alertMode ? '#ff2200'
            : ind.value === 'MATCH FOUND' ? amber
            : c
          return (
            <div key={ind.label} style={{ display: 'flex', gap: '5px', alignItems: 'baseline' }}>
              <span style={{ color: indColor, fontSize: '10px', opacity: indDot, transition: 'opacity 0.08s', flexShrink: 0 }}>●</span>
              <span style={{ color: cd, fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden' }}>{ind.label}</span>
              <span style={{ color: indColor, fontSize: '11px', marginLeft: 'auto', whiteSpace: 'nowrap', transition: 'color 0.4s', flexShrink: 0 }}>{ind.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
