'use client'

import React, { useState, useEffect, useRef, memo } from 'react'

const CELL_PX = 20
const GAP_PX  = 4

const OPACITIES = [0.08, 0.22, 0.55, 1.0] as const

const BLOOM: Record<number, string> = {
  0: 'none',
  1: 'none',
  2: '0 0 3px 0px rgba(232,160,0,0.35)',
  3: '0 0 6px 2px rgba(232,160,0,0.65), 0 0 12px 3px rgba(232,160,0,0.2)',
}

// Speed ranges [min, max] ms per active view
const MODE_SPEED: Record<string, [number, number]> = {
  'mission-logs': [2200, 5500],
  'chat':         [1400, 3800],
  'crew':         [3200, 7500],
  'threat':       [300,  1000],
}
const FAST_SPEED: [number, number] = [280, 700]

interface CellData {
  level:    0 | 1 | 2 | 3
  decaying: boolean
  nextAt:   number
}

function weightedRandom(): 0 | 1 | 2 | 3 {
  const r = Math.random()
  let cum = 0
  const weights = [0.25, 0.35, 0.28, 0.12]
  for (let i = 0; i < weights.length; i++) {
    cum += weights[i]
    if (r < cum) return i as 0 | 1 | 2 | 3
  }
  return 3
}

function modeInterval(view: string, fast: boolean): number {
  const [min, max] = fast ? FAST_SPEED : (MODE_SPEED[view] ?? [1800, 4500])
  const base = min + Math.random() * (max - min)
  return Math.max(120, base * (1 + 0.15 * (Math.random() * 2 - 1)))
}

function buildGrid(cols: number, rows: number, view: string): { cells: CellData[]; fast: boolean[] } {
  const total = cols * rows
  let zones = Array.from({ length: total }, () => Math.random())

  for (let pass = 0; pass < 2; pass++) {
    const blurred = zones.slice()
    for (let i = 0; i < total; i++) {
      const row = Math.floor(i / cols), col = i % cols
      let sum = zones[i] * 0.4, w = 0.4
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue
          const nr = row + dr, nc = col + dc
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            sum += zones[nr * cols + nc] * 0.075
            w   += 0.075
          }
        }
      }
      blurred[i] = sum / w
    }
    zones = blurred
  }

  const now  = Date.now()
  const fast = Array.from({ length: total }, () => Math.random() < 0.08)
  const cells: CellData[] = zones.map((z, i) => {
    const level: 0 | 1 | 2 | 3 = z < 0.25 ? 0 : z < 0.60 ? 1 : z < 0.88 ? 2 : 3
    return { level, decaying: false, nextAt: now + Math.random() * 2000 + modeInterval(view, fast[i]) }
  })

  return { cells, fast }
}

const GridCell = memo(function GridCell({ level, decaying }: { level: 0|1|2|3; decaying: boolean }) {
  const duration = decaying ? 70 : 16
  return (
    <div style={{
      width:           CELL_PX,
      height:          CELL_PX,
      backgroundColor: level === 3 ? '#ffc93c' : '#e8a000',
      opacity:         OPACITIES[level],
      boxShadow:       BLOOM[level],
      borderRadius:    2,
      transition: `opacity ${duration}ms ${decaying ? 'ease-out' : 'linear'}, box-shadow ${duration}ms ease-out`,
    }} />
  )
})

interface Props {
  color:      string
  dim:        string
  border:     string
  amber:      string
  activeView?: string
  pulseCount?: number
}

export default function StatusGrid({ activeView = 'mission-logs', pulseCount = 0 }: Props) {
  const containerRef    = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ cols: 0, rows: 0 })
  const [cells, setCells] = useState<CellData[]>([])
  const cellsRef        = useRef<CellData[]>([])
  const fastRef         = useRef<boolean[]>([])
  const dimsRef         = useRef({ cols: 0, rows: 0 })
  const viewRef         = useRef(activeView)
  const mountedRef      = useRef(false)
  const reducedMotionRef = useRef(false)

  // Keep refs in sync
  dimsRef.current = dims
  viewRef.current = activeView

  // Check prefers-reduced-motion once on mount
  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Measure container
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => {
      const cols = Math.max(1, Math.floor(el.clientWidth  / (CELL_PX + GAP_PX)))
      const rows = Math.max(1, Math.floor(el.clientHeight / (CELL_PX + GAP_PX)))
      setDims(prev => (prev.cols === cols && prev.rows === rows ? prev : { cols, rows }))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Rebuild on dimension change
  useEffect(() => {
    if (dims.cols === 0 || dims.rows === 0) return
    const { cells: init, fast } = buildGrid(dims.cols, dims.rows, viewRef.current)
    fastRef.current  = fast
    cellsRef.current = init
    setCells(init)
    mountedRef.current = true
  }, [dims.cols, dims.rows])

  // Poll ticker — speed adapts to current view via viewRef (disabled under reduced motion)
  useEffect(() => {
    if (reducedMotionRef.current) return
    const id = setInterval(() => {
      const now   = Date.now()
      let dirty   = false
      const next  = cellsRef.current.slice()
      for (let i = 0; i < next.length; i++) {
        if (now >= next[i].nextAt) {
          const lvl = weightedRandom()
          next[i]   = {
            level:    lvl,
            decaying: lvl < next[i].level,
            nextAt:   now + modeInterval(viewRef.current, fastRef.current[i]),
          }
          dirty = true
        }
      }
      if (dirty) { cellsRef.current = next; setCells([...next]) }
    }, 100)
    return () => clearInterval(id)
  }, [])

  // ── Tab change: left-to-right column sweep (disabled under reduced motion) ─
  useEffect(() => {
    if (!mountedRef.current || reducedMotionRef.current) return
    const { cols, rows } = dimsRef.current
    if (cols === 0 || rows === 0) return

    const tids: ReturnType<typeof setTimeout>[] = []

    for (let col = 0; col < cols; col++) {
      const delay = (col / cols) * 420
      const tid = setTimeout(() => {
        const next = cellsRef.current.slice()
        for (let row = 0; row < rows; row++) {
          const i = row * cols + col
          next[i] = {
            level:    3,
            decaying: false,
            nextAt:   Date.now() + modeInterval(viewRef.current, fastRef.current[i]),
          }
        }
        cellsRef.current = next
        setCells([...next])
      }, delay)
      tids.push(tid)
    }

    return () => tids.forEach(clearTimeout)
  }, [activeView]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Click pulse: radial ripple from centre ───────────────────────────────
  // ── Click pulse: radial ripple (disabled under reduced motion) ─────────────
  useEffect(() => {
    if (pulseCount === 0 || reducedMotionRef.current) return
    const { cols, rows } = dimsRef.current
    if (cols === 0 || rows === 0) return

    const cx = (cols - 1) / 2
    const cy = (rows - 1) / 2
    const maxDist = Math.hypot(cx, cy)

    // Group indices by ring distance from centre
    const rings = new Map<number, number[]>()
    for (let i = 0; i < cols * rows; i++) {
      const row  = Math.floor(i / cols)
      const col  = i % cols
      const ring = Math.round(Math.hypot(col - cx, row - cy))
      if (!rings.has(ring)) rings.set(ring, [])
      rings.get(ring)!.push(i)
    }

    const tids: ReturnType<typeof setTimeout>[] = []
    rings.forEach((indices, ring) => {
      const delay = (ring / maxDist) * 320
      const tid = setTimeout(() => {
        const next = cellsRef.current.slice()
        indices.forEach(i => {
          next[i] = {
            level:    3,
            decaying: false,
            nextAt:   Date.now() + 450 + Math.random() * 350,
          }
        })
        cellsRef.current = next
        setCells([...next])
      }, delay)
      tids.push(tid)
    })

    return () => tids.forEach(clearTimeout)
  }, [pulseCount]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={containerRef} style={{ flex: 1, alignSelf: 'stretch', overflow: 'hidden', userSelect: 'none', position: 'relative' }}>
      {dims.cols > 0 && dims.rows > 0 && (
        <div style={{
          display:             'grid',
          gridTemplateColumns: `repeat(${dims.cols}, ${CELL_PX}px)`,
          gap:                 GAP_PX,
          padding:             GAP_PX,
        }}>
          {cells.map((cell, i) => (
            <GridCell key={i} level={cell.level} decaying={cell.decaying} />
          ))}
        </div>
      )}
      <div style={{
        position:      'absolute',
        inset:         0,
        background:    'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(0,0,0,0.07) 10px, rgba(0,0,0,0.07) 11px)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
