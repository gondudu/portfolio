'use client'

import React, { useState, useEffect, useRef, memo } from 'react'

const CELL_PX = 20
const GAP_PX = 4

// 4 discrete phosphor brightness states
const OPACITIES = [0.08, 0.22, 0.55, 1.0] as const
const WEIGHTS   = [0.25, 0.35, 0.28, 0.12]

const BLOOM: Record<number, string> = {
  0: 'none',
  1: 'none',
  2: '0 0 3px 0px rgba(232,160,0,0.35)',
  3: '0 0 6px 2px rgba(232,160,0,0.65), 0 0 12px 3px rgba(232,160,0,0.2)',
}

interface CellData {
  level:    0 | 1 | 2 | 3
  decaying: boolean
  nextAt:   number
}

function weightedRandom(): 0 | 1 | 2 | 3 {
  const r = Math.random()
  let cum = 0
  for (let i = 0; i < WEIGHTS.length; i++) {
    cum += WEIGHTS[i]
    if (r < cum) return i as 0 | 1 | 2 | 3
  }
  return 3
}

function cellInterval(fast: boolean): number {
  const [min, max] = fast ? [400, 900] : [1800, 4500]
  const base = min + Math.random() * (max - min)
  return Math.max(150, base * (1 + 0.15 * (Math.random() * 2 - 1)))
}

function buildGrid(cols: number, rows: number): { cells: CellData[]; fast: boolean[] } {
  const total = cols * rows
  let zones = Array.from({ length: total }, () => Math.random())

  // Two spatial blur passes — adjacent cells share similar states,
  // creating the "real system data" clustering feel of Alien 1979 panels
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
    return { level, decaying: false, nextAt: now + Math.random() * 2000 + cellInterval(fast[i]) }
  })

  return { cells, fast }
}

// Memoised — only re-renders when level or decaying actually change
const GridCell = memo(function GridCell({ level, decaying }: { level: 0|1|2|3; decaying: boolean }) {
  const duration = decaying ? 70 : 16   // snap ON, phosphor-decay OFF
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
  color:  string
  dim:    string
  border: string
  amber:  string
}

export default function StatusGrid(_props: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims]   = useState({ cols: 0, rows: 0 })
  const [cells, setCells] = useState<CellData[]>([])
  const cellsRef = useRef<CellData[]>([])
  const fastRef  = useRef<boolean[]>([])

  // Measure container → derive cols/rows
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

  // Rebuild when grid dimensions change
  useEffect(() => {
    if (dims.cols === 0 || dims.rows === 0) return
    const { cells: init, fast } = buildGrid(dims.cols, dims.rows)
    fastRef.current  = fast
    cellsRef.current = init
    setCells(init)
  }, [dims.cols, dims.rows])

  // Poll every 100ms — actual cell changes are rare (every 1.8–4.5s each)
  useEffect(() => {
    const id = setInterval(() => {
      const now  = Date.now()
      let dirty  = false
      const next = cellsRef.current.slice()
      for (let i = 0; i < next.length; i++) {
        if (now >= next[i].nextAt) {
          const lvl = weightedRandom()
          next[i]   = { level: lvl, decaying: lvl < next[i].level, nextAt: now + cellInterval(fastRef.current[i]) }
          dirty = true
        }
      }
      if (dirty) { cellsRef.current = next; setCells([...next]) }
    }, 100)
    return () => clearInterval(id)
  }, [])

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

      {/* CRT horizontal scan-line overlay */}
      <div style={{
        position:       'absolute',
        inset:          0,
        background:     'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(0,0,0,0.07) 10px, rgba(0,0,0,0.07) 11px)',
        pointerEvents:  'none',
      }} />

    </div>
  )
}
