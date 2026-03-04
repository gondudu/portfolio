'use client'

import { useState, useEffect } from 'react'

const FALLBACK_FRAMES: readonly string[][] = [['Loading Nostromo feed...']]
const FRAME_INTERVAL_MS = 90

function parseAsciiFrames(text: string): string[][] {
  const lines = text.replace(/\r/g, '').split('\n')
  if (lines.length === 0) return []

  const firstLine = lines[0]
  let frameHeight = 0
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] === firstLine) {
      frameHeight = i
      break
    }
  }

  if (frameHeight === 0) return [lines]

  const frames: string[][] = []
  for (let i = 0; i + frameHeight <= lines.length; i += frameHeight) {
    const chunk = lines.slice(i, i + frameHeight)
    if (chunk.length === frameHeight) frames.push(chunk)
  }

  return frames
}

function lineRole(line: string): 'hull' | 'body' | 'engine' {
  const visible = line.replace(/\s/g, '')
  if (visible.length === 0) return 'engine'
  const density = visible.length / Math.max(line.length, 1)
  if (density < 0.08) return 'engine'
  if (/[#=]/.test(line)) return 'hull'
  return 'body'
}

interface Props {
  color: string
  dim: string
  border: string
  amber?: string
}

export default function NostromoAnim({ color, dim, border, amber }: Props) {
  const [frames, setFrames] = useState<string[][]>(FALLBACK_FRAMES)
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    let active = true

    fetch('/ascii-animation-2.txt')
      .then(res => (res.ok ? res.text() : Promise.reject(new Error('Failed to load ASCII animation'))))
      .then(text => {
        if (!active) return
        const parsed = parseAsciiFrames(text)
        if (parsed.length > 0) {
          setFrames(parsed)
          setFrame(0)
        }
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (frames.length <= 1) return
    const id = setInterval(() => setFrame(f => (f + 1) % frames.length), FRAME_INTERVAL_MS)
    return () => clearInterval(id)
  }, [frames.length])

  const f = frames[frame] ?? []
  const footerColor = amber ?? dim

  return (
    <div
      style={{
        marginTop: '20px',
        fontFamily: 'monospace',
        fontSize: '11px',
        lineHeight: '1.45',
        letterSpacing: '0',
      }}
    >
      {f.map((line, i) => {
        const role = lineRole(line)
        const lineColor = role === 'engine' ? dim : role === 'hull' ? border : color
        return (
          <div
            key={i}
            style={{
              whiteSpace: 'pre',
              textAlign: 'left',
              color: lineColor,
            }}
          >
            {line}
          </div>
        )
      })}
      <div
        style={{
          marginTop: '6px',
          color: footerColor,
          fontSize: '10px',
          letterSpacing: '0.12em',
          textAlign: 'center',
        }}
      >
        USCSS NOSTROMO  ·  CLASS M  ·  FRAME {Math.min(frame + 1, frames.length)}/{frames.length}
      </div>
    </div>
  )
}
