'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Project, projects, getNextProject } from '@/lib/projects'

type ViewMode = 'brief' | 'debrief'

interface Props {
  project: Project
}

const c = {
  text: '#e8a000',
  dim: '#7a4e00',
  bright: '#ffc93c',
  border: '#2a1800',
  amber: '#33ff00',
}

export default function ConsoleProjectPage({ project }: Props) {
  const router = useRouter()
  const [uiVisible, setUiVisible] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [viewMode, setViewMode] = useState<ViewMode>('brief')

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

  useEffect(() => {
    const tid = setTimeout(() => setUiVisible(true), 80)
    return () => clearTimeout(tid)
  }, [])

  const prevImage = () => setActiveImage(i => (i - 1 + allImages.length) % allImages.length)
  const nextImage = () => setActiveImage(i => (i + 1) % allImages.length)

  const fade = (delayMs: number): React.CSSProperties => ({
    opacity: uiVisible ? 1 : 0,
    transition: 'opacity 0.5s ease',
    transitionDelay: uiVisible ? `${delayMs}ms` : '0ms',
  })

  return (
    <div
      className="fixed inset-0 flex flex-col font-console overflow-hidden crt-monitor crt-flicker"
      style={{ backgroundColor: '#020100', color: c.text, fontSize: '32px', lineHeight: '1.5' }}
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
                  style={{ color: c.dim, fontSize: '26px', opacity: 0.7, letterSpacing: '0.06em' }}
                >
                  {'< PREV'}
                </button>
                <span style={{ color: c.border, fontSize: '22px' }}>
                  {String(activeImage + 1).padStart(2, '0')}/{String(allImages.length).padStart(2, '0')}
                </span>
                <button
                  onClick={nextImage}
                  className="transition-opacity hover:opacity-100"
                  style={{ color: c.dim, fontSize: '26px', opacity: 0.7, letterSpacing: '0.06em' }}
                >
                  {'NEXT >'}
                </button>
              </div>
            )}
            {/* Frame label */}
            <div
              className="absolute top-3 left-3 z-20"
              style={{ color: c.dim, fontSize: '22px', letterSpacing: '0.1em' }}
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
          <div className="flex-1 px-6 py-4 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>

            {/* Meta */}
            <div style={{ color: c.bright, marginBottom: '4px' }}>
              {'> '}ACCESSING MISSION LOG {String(frameNumber).padStart(3, '0')}...
            </div>
            <div style={{ color: c.border, marginBottom: '8px' }}>{'─'.repeat(40)}</div>
            <div style={{ color: c.dim, marginBottom: '2px' }}>CLASSIFICATION &nbsp; MISSION LOG {String(frameNumber).padStart(3, '0')}</div>
            <div style={{ color: c.text, marginBottom: '2px' }}>TITLE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {project.title.toUpperCase()}</div>
            <div style={{ color: c.text, marginBottom: '2px' }}>YEAR &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {project.year.toUpperCase()}</div>
            <div style={{ color: c.text, marginBottom: '8px' }}>ROLE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {project.role.toUpperCase()}</div>
            <div style={{ color: c.border, marginBottom: '12px' }}>{'─'.repeat(40)}</div>

            {/* View toggle */}
            {project.caseStudy && (
              <div className="flex items-center gap-4 mb-4">
                {(['brief', 'debrief'] as ViewMode[]).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className="transition-opacity hover:opacity-100"
                    style={{
                      color: viewMode === mode ? c.bright : c.dim,
                      opacity: viewMode === mode ? 1 : 0.6,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {'>'} {mode === 'brief' ? 'BRIEF' : 'FULL DEBRIEF'}
                  </button>
                ))}
              </div>
            )}

            {/* ── BRIEF view ── */}
            {viewMode === 'brief' && (
              <>
                {[
                  { label: '// OVERVIEW', body: project.overview },
                  { label: '// CHALLENGE', body: project.challenge },
                  { label: '// SOLUTION', body: project.solution },
                ].map(({ label, body }) => (
                  <div key={label} style={{ marginBottom: '16px' }}>
                    <div style={{ color: c.amber, letterSpacing: '0.1em', marginBottom: '4px' }}>{label}</div>
                    <div style={{ color: c.text }}>{body}</div>
                  </div>
                ))}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ color: c.amber, letterSpacing: '0.1em', marginBottom: '4px' }}>{"// RESULTS"}</div>
                  {project.results.map((r, i) => (
                    <div key={i} style={{ color: c.bright }}>{'> '}{r.toUpperCase()}</div>
                  ))}
                </div>
              </>
            )}

            {/* ── FULL DEBRIEF view ── */}
            {viewMode === 'debrief' && project.caseStudy && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ color: c.amber, letterSpacing: '0.1em', marginBottom: '4px' }}>{"// MISSION CONTEXT"}</div>
                  <div style={{ color: c.text }}>{project.caseStudy.context}</div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ color: c.amber, letterSpacing: '0.1em', marginBottom: '4px' }}>{"// RECON FINDINGS"}</div>
                  {project.caseStudy.researchFindings.map((f, i) => (
                    <div key={i} style={{ color: c.text, marginBottom: '4px' }}>{'— '}{f}</div>
                  ))}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ color: c.amber, letterSpacing: '0.1em', marginBottom: '4px' }}>{"// KEY DECISIONS"}</div>
                  {project.caseStudy.keyDecisions.map((d, i) => (
                    <div key={i} style={{ marginBottom: '10px' }}>
                      <div style={{ color: c.bright }}>{'> '}{d.decision.toUpperCase()}</div>
                      <div style={{ color: c.dim, paddingLeft: '16px' }}>{d.outcome}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ color: c.amber, letterSpacing: '0.1em', marginBottom: '4px' }}>{"// TRADEOFFS"}</div>
                  {project.caseStudy.tradeoffs.map((t, i) => (
                    <div key={i} style={{ color: c.text, marginBottom: '4px' }}>{'— '}{t}</div>
                  ))}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ color: c.amber, letterSpacing: '0.1em', marginBottom: '4px' }}>{"// RESULTS"}</div>
                  {project.results.map((r, i) => (
                    <div key={i} style={{ color: c.bright }}>{'> '}{r.toUpperCase()}</div>
                  ))}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ color: c.amber, letterSpacing: '0.1em', marginBottom: '4px' }}>{"// RETROSPECTIVE"}</div>
                  <div style={{ color: c.dim, fontStyle: 'italic' }}>{project.caseStudy.retrospective}</div>
                </div>
              </>
            )}

            <div style={{ color: c.border, marginBottom: '8px' }}>{'─'.repeat(40)}</div>
            <div style={{ color: c.dim }}>[END LOG]</div>
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

    </div>
  )
}
