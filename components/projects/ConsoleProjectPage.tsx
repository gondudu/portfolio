'use client'

import React, { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Project, projects, getNextProject } from '@/lib/projects'
import { useTerminalQueue } from '@/hooks/useTypewriter'

interface Props {
  project: Project
}

const c = {
  text: '#33ff00',
  dim: '#1a8a00',
  bright: '#66ff33',
  border: '#1a3a1a',
  amber: '#ff8c00',
}

function wrapText(text: string, width = 58): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    if (current.length > 0 && current.length + word.length + 1 > width) {
      lines.push(current)
      current = word
    } else {
      current = current.length > 0 ? current + ' ' + word : word
    }
  }
  if (current) lines.push(current)
  return lines
}

function buildProjectLines(project: Project, frameNumber: number): string[] {
  const sep = '──────────────────────────────────────────────────'
  const lines: string[] = []
  lines.push(`> ACCESSING MISSION LOG ${String(frameNumber).padStart(3, '0')}...`)
  lines.push(sep)
  lines.push(`CLASSIFICATION  MISSION LOG ${String(frameNumber).padStart(3, '0')}`)
  lines.push(`TITLE           ${project.title.toUpperCase()}`)
  lines.push(`YEAR            ${project.year.toUpperCase()}`)
  lines.push(`ROLE            ${project.role.toUpperCase()}`)
  lines.push(sep)
  lines.push(' ')
  lines.push('// OVERVIEW')
  lines.push(...wrapText(project.overview))
  lines.push(' ')
  lines.push('// CHALLENGE')
  lines.push(...wrapText(project.challenge))
  lines.push(' ')
  lines.push('// SOLUTION')
  lines.push(...wrapText(project.solution))
  lines.push(' ')
  lines.push('// RESULTS')
  project.results.forEach(r => lines.push(`> ${r.toUpperCase()}`))
  lines.push(' ')
  lines.push(sep)
  lines.push('[END LOG]')
  return lines
}

export default function ConsoleProjectPage({ project }: Props) {
  const router = useRouter()
  const { completedLines, currentDisplay, enqueue } = useTerminalQueue()
  const [inputValue, setInputValue] = useState('')
  const [uiVisible, setUiVisible] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const outputRef = useRef<HTMLDivElement>(null)
  const bootedRef = useRef(false)

  const allImages = project.images.length > 0 ? project.images : [project.heroImage]
  const frameNumber = projects.findIndex(p => p.slug === project.slug) + 1
  const nextProject = getNextProject(project.slug)

  const getStardate = () => {
    const now = new Date()
    return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}.${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`
  }
  const [stardate, setStardate] = useState('')
  useEffect(() => {
    setStardate(getStardate())
    const interval = setInterval(() => setStardate(getStardate()), 60000)
    return () => clearInterval(interval)
  }, [])

  // Fade in
  useEffect(() => {
    const tid = setTimeout(() => setUiVisible(true), 80)
    return () => clearTimeout(tid)
  }, [])

  // Boot: type project content once
  useEffect(() => {
    if (!uiVisible || bootedRef.current) return
    bootedRef.current = true
    const lines = buildProjectLines(project, frameNumber)
    enqueue(lines, 18)
  }, [uiVisible, project, frameNumber, enqueue])

  // Auto-scroll only if already near the bottom
  useEffect(() => {
    const el = outputRef.current
    if (!el) return
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80
    if (nearBottom) el.scrollTop = el.scrollHeight
  }, [completedLines, currentDisplay])

  const prevImage = () => setActiveImage(i => (i - 1 + allImages.length) % allImages.length)
  const nextImage = () => setActiveImage(i => (i + 1) % allImages.length)

  const handleSubmit = useCallback(() => {
    const q = inputValue.trim()
    if (!q) return
    setInputValue('')
    enqueue([`> ${q.toUpperCase()}`, 'QUERY LOGGED. ACCESS DENIED — MISSION LOG IS READ-ONLY.'], 20)
  }, [inputValue, enqueue])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
  }

  const fade = (delayMs: number): React.CSSProperties => ({
    opacity: uiVisible ? 1 : 0,
    transition: 'opacity 0.5s ease',
    transitionDelay: uiVisible ? `${delayMs}ms` : '0ms',
  })

  return (
    <div
      className="fixed inset-0 flex flex-col font-console overflow-hidden"
      style={{ backgroundColor: '#050a05', color: c.text, fontSize: '16px', lineHeight: '1.5' }}
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-2 px-4 py-2 flex-shrink-0" style={fade(0)}>
        <span style={{ color: c.dim }}>USS</span>
        <span style={{ color: c.bright }}>MU-TH-UR 6000</span>
        <span style={{ color: c.dim }}>=</span>
        <span style={{ color: c.bright }}>USCSS NOSTROMO</span>
        <div className="ml-auto flex items-center gap-2">
          <span style={{ color: c.dim }}>STARDATE</span>
          <span style={{ color: c.bright }}>{stardate || '-----.------'}</span>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${c.border}` }} />

      {/* ── Main area ── */}
      <div className="flex-1 min-h-0 flex flex-col wide:flex-row overflow-hidden" style={fade(150)}>

        {/* ── IMAGE PANEL: top on mobile, right on desktop ── */}
        <div
          className="flex-shrink-0 wide:order-2 h-[40vh] w-full wide:h-full wide:w-[65vw] overflow-hidden relative"
          style={{ borderBottom: `1px solid ${c.border}`, borderLeft: `1px solid ${c.border}` }}
        >
          <div
            className="w-full h-full relative"
            style={{ backgroundColor: '#020603' }}
          >
            {/* Image */}
            {allImages.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={`${project.title} — ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
                style={{
                  opacity: i === activeImage ? 1 : 0,
                  transition: 'opacity 1s ease',
                }}
              />
            ))}
            {/* Prev / Next */}
            {allImages.length > 1 && (
              <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2">
                <button
                  onClick={prevImage}
                  className="transition-opacity hover:opacity-100"
                  style={{ color: c.dim, fontSize: '13px', opacity: 0.7, letterSpacing: '0.06em' }}
                >
                  {'< PREV'}
                </button>
                <span style={{ color: c.border, fontSize: '11px' }}>
                  {String(activeImage + 1).padStart(2, '0')}/{String(allImages.length).padStart(2, '0')}
                </span>
                <button
                  onClick={nextImage}
                  className="transition-opacity hover:opacity-100"
                  style={{ color: c.dim, fontSize: '13px', opacity: 0.7, letterSpacing: '0.06em' }}
                >
                  {'NEXT >'}
                </button>
              </div>
            )}
            {/* Frame label */}
            <div
              className="absolute top-3 left-3 z-20"
              style={{ color: c.dim, fontSize: '11px', letterSpacing: '0.1em' }}
            >
              {`IMG ${String(activeImage + 1).padStart(2, '0')} / ${String(allImages.length).padStart(2, '0')}`}
            </div>
          </div>
        </div>

        {/* ── TERMINAL PANEL: bottom on mobile, left on desktop ── */}
        <div
          className="flex-1 wide:order-1 flex flex-col min-h-0 overflow-hidden"
          style={{ borderRight: `1px solid ${c.border}` }}
        >
          {/* Output */}
          <div
            ref={outputRef}
            className="flex-1 px-6 py-4 overflow-y-auto"
            style={{ scrollbarWidth: 'none' }}
          >
            {completedLines.map((line, i) => (
              <div
                key={i}
                style={{
                  color: line.startsWith('>') ? c.bright : line.startsWith('//') ? c.amber : line.startsWith('──') ? c.border : line.startsWith('[') ? c.dim : c.text,
                  fontSize: line.startsWith('//') ? '13px' : '14px',
                  letterSpacing: line.startsWith('//') ? '0.1em' : '0',
                  marginTop: line.startsWith('//') ? '4px' : '0',
                }}
              >
                {line || '\u00A0'}
              </div>
            ))}
            {currentDisplay !== null && (
              <div className="cursor-blink" style={{ color: c.text, fontSize: '14px' }}>{currentDisplay}</div>
            )}
          </div>
        </div>

      </div>

      <div style={{ borderTop: `1px solid ${c.border}` }} />

      {/* ── Nav ── */}
      <div className="flex items-center gap-4 px-4 py-2 flex-wrap flex-shrink-0" style={fade(320)}>
        <button
          onClick={() => router.push('/?view=mission-logs')}
          className="transition-opacity hover:opacity-100"
          style={{ color: c.dim, opacity: 0.7 }}
        >
          {'>'} Mission logs
        </button>
        {nextProject && (
          <button
            onClick={() => router.push(`/projects/${nextProject.slug}`)}
            className="ml-auto transition-opacity hover:opacity-100"
            style={{ color: c.bright, opacity: 1 }}
          >
            {'>'} Next mission: {nextProject.title}
          </button>
        )}
      </div>

      <div style={{ borderTop: `1px solid ${c.border}` }} />

      {/* ── Input ── */}
      <div className="flex items-center gap-2 px-4 py-2 flex-shrink-0" style={fade(400)}>
        <span style={{ color: c.dim }}>{'>'}</span>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none font-console placeholder-console-phosphor-dim"
          style={{ color: c.text, fontSize: '16px' }}
          placeholder="ENTER QUERY..."
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={handleSubmit}
          className="opacity-60 hover:opacity-100 transition-opacity"
          style={{
            color: c.dim,
            fontSize: '14px',
            border: `1px solid ${c.border}`,
            padding: '0 4px',
          }}
        >
          SEND
        </button>
      </div>
    </div>
  )
}
