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
}

// Full-bleed content image with scanline overlay + corner brackets + label
function ContentImage({ src, alt, label, index }: { src: string; alt: string; label: string; index: number }) {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', marginBottom: '28px', marginTop: '4px' }}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) calc(100vw - 210px), 100vw"
      />
      {/* Scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,0,0,0.09) 3px, rgba(0,0,0,0.09) 4px)',
      }} />
      {/* Corner brackets */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points="0,8 0,0 8,0"   fill="none" stroke={c.border} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        <polyline points="92,0 100,0 100,8"  fill="none" stroke={c.border} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        <polyline points="0,92 0,100 8,100"  fill="none" stroke={c.border} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        <polyline points="92,100 100,100 100,92" fill="none" stroke={c.border} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* Label */}
      <div style={{
        position: 'absolute', bottom: 10, left: 12,
        color: c.dim, fontSize: '13px', letterSpacing: '0.12em',
        textShadow: 'none',
      }}>
        {`IMG ${String(index + 1).padStart(2, '0')} — ${label}`}
      </div>
    </div>
  )
}

export default function ConsoleProjectPage({ project }: Props) {
  const router = useRouter()
  const [uiVisible, setUiVisible] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('brief')

  const allImages = project.images.length > 0 ? project.images : [project.heroImage]
  const img = (n: number) => allImages[n] ?? null
  const frameNumber = projects.findIndex(p => p.slug === project.slug) + 1
  const nextProject = getNextProject(project.slug)

  const [stardate, setStardate] = useState('')
  useEffect(() => {
    const get = () => {
      const now = new Date()
      return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}.${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`
    }
    setStardate(get())
    const id = setInterval(() => setStardate(get()), 60000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const tid = setTimeout(() => setUiVisible(true), 80)
    return () => clearTimeout(tid)
  }, [])

  const fade = (delayMs: number): React.CSSProperties => ({
    opacity: uiVisible ? 1 : 0,
    transition: 'opacity 0.5s ease',
    transitionDelay: uiVisible ? `${delayMs}ms` : '0ms',
  })

  const fileId = `MX-${String(frameNumber).padStart(3, '0')}-LV426`

  const SectionLabel = ({ children }: { children: string }) => (
    <div style={{
      color: c.bright,
      fontSize: '14px',
      letterSpacing: '0.2em',
      marginBottom: '10px',
      paddingBottom: '4px',
      borderBottom: `1px dashed ${c.border}`,
    }}>
      {children}
    </div>
  )

  return (
    <div
      className="fixed inset-0 flex flex-col font-console overflow-hidden crt-monitor crt-flicker"
      style={{ backgroundColor: '#020100', color: c.text, lineHeight: '1.5' }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center gap-3 px-4 py-2 flex-shrink-0 flex-wrap"
        style={{ fontSize: '20px', ...fade(0) }}
      >
        <button
          onClick={() => router.push('/?view=mission-logs')}
          className="transition-opacity hover:opacity-100"
          style={{ color: c.dim, opacity: 0.7 }}
        >
          {'< MISSION LOGS'}
        </button>
        <span style={{ color: c.border }}>·</span>
        <span style={{ color: c.dim }}>LOG</span>
        <span style={{ color: c.bright }}>{String(frameNumber).padStart(3, '0')}</span>
        <span style={{ color: c.border }}>·</span>
        <span style={{ color: c.text, maxWidth: '40vw', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {project.title.toUpperCase()}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span style={{ color: c.dim }}>STARDATE</span>
          <span style={{ color: c.bright }}>{stardate || '-----.------'}</span>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${c.border}` }} />

      {/* ── Main area ── */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden" style={fade(120)}>

        {/* ── LEFT SIDEBAR (desktop only) ── */}
        <div
          className="hidden lg:flex flex-col flex-shrink-0 overflow-y-auto"
          style={{ width: '210px', borderRight: `1px solid ${c.border}`, scrollbarWidth: 'none' }}
        >
          <div className="px-4 pt-5 pb-4">
            <div style={{
              border: `1px solid ${c.border}`, padding: '3px 8px',
              fontSize: '11px', letterSpacing: '0.2em', color: c.dim,
              display: 'inline-block', marginBottom: '14px',
            }}>
              CLASSIFIED
            </div>
            <div style={{ color: c.dim, fontSize: '12px', letterSpacing: '0.12em', marginBottom: '2px' }}>MISSION LOG</div>
            <div style={{ color: c.bright, fontSize: '48px', lineHeight: '1' }}>{String(frameNumber).padStart(3, '0')}</div>
          </div>

          <div style={{ borderTop: `1px solid ${c.border}` }} />

          <div className="px-4 py-4 flex flex-col gap-4">
            {[
              { label: 'FILE ID', value: fileId },
              { label: 'YEAR', value: project.year },
              { label: 'ROLE', value: project.role },
              { label: 'CATEGORY', value: project.category },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ color: c.dim, fontSize: '11px', letterSpacing: '0.15em', marginBottom: '2px' }}>{label}</div>
                <div style={{ color: c.text, fontSize: '14px', lineHeight: '1.4' }}>{value}</div>
              </div>
            ))}
          </div>

          <div className="px-4 py-4 flex flex-col gap-3 mt-auto" style={{ borderTop: `1px solid ${c.border}` }}>
            <button
              onClick={() => router.push('/?view=mission-logs')}
              className="text-left transition-opacity hover:opacity-100"
              style={{ color: c.dim, opacity: 0.7, fontSize: '14px', letterSpacing: '0.06em' }}
            >
              {'< MISSION LOGS'}
            </button>
            {nextProject && (
              <button
                onClick={() => router.push(`/projects/${nextProject.slug}`)}
                className="text-left transition-opacity hover:opacity-100"
                style={{ color: c.bright, fontSize: '14px', letterSpacing: '0.06em' }}
              >
                NEXT LOG {'>'}
              </button>
            )}
          </div>
        </div>

        {/* ── CENTER: scrollable content with embedded images ── */}
        <div className="flex-1 min-h-0 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>

          {/* Hero image — full bleed, no padding */}
          {img(0) && (
            <div style={{ position: 'relative', width: '100%', aspectRatio: '21 / 9', overflow: 'hidden', flexShrink: 0 }}>
              <Image
                src={img(0)!}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) calc(100vw - 210px), 100vw"
              />
              {/* Scanline */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,0,0,0.09) 3px, rgba(0,0,0,0.09) 4px)',
              }} />
              {/* Gradient fade to background at bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', pointerEvents: 'none',
                background: 'linear-gradient(to bottom, transparent, #020100)',
              }} />
              {/* Hero label */}
              <div style={{
                position: 'absolute', bottom: 16, left: 24,
                color: c.dim, fontSize: '13px', letterSpacing: '0.15em',
              }}>
                {`MISSION LOG ${String(frameNumber).padStart(3, '0')} — ${project.title.toUpperCase()}`}
              </div>
            </div>
          )}

          {/* Content area */}
          <div className="px-6 pt-5 pb-10">

            {/* Log access header */}
            <div style={{ color: c.bright, marginBottom: '4px', fontSize: '18px' }}>
              {'> '}ACCESSING MISSION LOG {String(frameNumber).padStart(3, '0')}...
            </div>
            <div style={{ color: c.border, marginBottom: '20px', fontSize: '16px' }}>{'─'.repeat(48)}</div>

            {/* View mode toggle */}
            {project.caseStudy && (
              <div className="flex items-center gap-3 mb-6">
                {(['brief', 'debrief'] as ViewMode[]).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    style={{
                      fontSize: '14px', letterSpacing: '0.1em', padding: '4px 12px',
                      border: `1px solid ${viewMode === mode ? c.text : c.border}`,
                      color: viewMode === mode ? c.bright : c.dim,
                      backgroundColor: viewMode === mode ? 'rgba(232,160,0,0.06)' : 'transparent',
                      opacity: viewMode === mode ? 1 : 0.6,
                    }}
                  >
                    {mode === 'brief' ? 'BRIEF' : 'FULL LOG'}
                  </button>
                ))}
              </div>
            )}

            {/* ── BRIEF ── */}
            {viewMode === 'brief' && (
              <div style={{ fontSize: '20px' }}>

                <div style={{ marginBottom: '28px' }}>
                  <SectionLabel>{'// OVERVIEW'}</SectionLabel>
                  <div style={{ color: c.text, lineHeight: '1.7' }}>{project.overview}</div>
                </div>

                {img(1) && (
                  <ContentImage src={img(1)!} alt={`${project.title} — detail`} label={project.title.toUpperCase()} index={1} />
                )}

                <div style={{ marginBottom: '28px' }}>
                  <SectionLabel>{'// CHALLENGE'}</SectionLabel>
                  <div style={{ color: c.text, lineHeight: '1.7' }}>{project.challenge}</div>
                </div>

                {img(2) && (
                  <ContentImage src={img(2)!} alt={`${project.title} — process`} label={project.category.toUpperCase()} index={2} />
                )}

                <div style={{ marginBottom: '28px' }}>
                  <SectionLabel>{'// SOLUTION'}</SectionLabel>
                  <div style={{ color: c.text, lineHeight: '1.7' }}>{project.solution}</div>
                </div>

                {img(3) && (
                  <ContentImage src={img(3)!} alt={`${project.title} — outcome`} label="OUTCOME" index={3} />
                )}

                <div style={{ marginBottom: '28px' }}>
                  <SectionLabel>{'// RESULTS'}</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {project.results.map((r, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '10px', paddingLeft: '4px', borderLeft: `2px solid ${c.border}` }}>
                        <span style={{ color: c.bright, flexShrink: 0 }}>{'>'}</span>
                        <span style={{ color: c.bright }}>{r.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ── FULL LOG (debrief) ── */}
            {viewMode === 'debrief' && project.caseStudy && (
              <div style={{ fontSize: '20px' }}>

                <div style={{ marginBottom: '28px' }}>
                  <SectionLabel>{'// MISSION CONTEXT'}</SectionLabel>
                  <div style={{ color: c.text, lineHeight: '1.7' }}>{project.caseStudy.context}</div>
                </div>

                {img(1) && (
                  <ContentImage src={img(1)!} alt={`${project.title} — context`} label="MISSION CONTEXT" index={1} />
                )}

                <div style={{ marginBottom: '28px' }}>
                  <SectionLabel>{'// RECON FINDINGS'}</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {project.caseStudy.researchFindings.map((f, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', color: c.text, lineHeight: '1.6' }}>
                        <span style={{ color: c.dim, flexShrink: 0 }}>—</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {img(2) && (
                  <ContentImage src={img(2)!} alt={`${project.title} — process`} label="PROCESS" index={2} />
                )}

                <div style={{ marginBottom: '28px' }}>
                  <SectionLabel>{'// KEY DECISIONS'}</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {project.caseStudy.keyDecisions.map((d, i) => (
                      <div key={i} style={{ paddingLeft: '10px', borderLeft: `2px solid ${c.border}` }}>
                        <div style={{ color: c.bright, marginBottom: '4px' }}>{'>'} {d.decision.toUpperCase()}</div>
                        <div style={{ color: c.dim, lineHeight: '1.6' }}>{d.outcome}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <SectionLabel>{'// TRADEOFFS'}</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {project.caseStudy.tradeoffs.map((t, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', color: c.text, lineHeight: '1.6' }}>
                        <span style={{ color: c.dim, flexShrink: 0 }}>—</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {img(3) && (
                  <ContentImage src={img(3)!} alt={`${project.title} — results`} label="RESULTS" index={3} />
                )}

                <div style={{ marginBottom: '28px' }}>
                  <SectionLabel>{'// RESULTS'}</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {project.results.map((r, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '10px', paddingLeft: '4px', borderLeft: `2px solid ${c.border}` }}>
                        <span style={{ color: c.bright, flexShrink: 0 }}>{'>'}</span>
                        <span style={{ color: c.bright }}>{r.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {img(4) && (
                  <ContentImage src={img(4)!} alt={`${project.title} — retrospective`} label="RETROSPECTIVE" index={4} />
                )}

                <div style={{ marginBottom: '28px' }}>
                  <SectionLabel>{'// RETROSPECTIVE'}</SectionLabel>
                  <div style={{ color: c.dim, lineHeight: '1.7', fontStyle: 'italic' }}>{project.caseStudy.retrospective}</div>
                </div>

              </div>
            )}

            {/* End marker */}
            <div style={{ color: c.border, fontSize: '14px', marginTop: '8px' }}>{'── [END LOG] ──'}</div>
          </div>
        </div>

      </div>

      {/* ── Footer ── */}
      <div style={{ borderTop: `1px solid ${c.border}` }}>
        {/* Mobile nav */}
        <div
          className="lg:hidden flex items-center gap-4 px-4 py-2 flex-wrap"
          style={{ fontSize: '20px', ...fade(320) }}
        >
          <button
            onClick={() => router.push('/?view=mission-logs')}
            className="transition-opacity hover:opacity-100"
            style={{ color: c.dim, opacity: 0.7 }}
          >
            {'< Mission logs'}
          </button>
          {nextProject && (
            <button
              onClick={() => router.push(`/projects/${nextProject.slug}`)}
              className="ml-auto transition-opacity hover:opacity-100"
              style={{ color: c.bright }}
            >
              {'Next: '}{nextProject.title}{' >'}
            </button>
          )}
        </div>

        {/* Desktop status bar */}
        <div
          className="hidden lg:flex items-center gap-3 px-4 py-1 overflow-x-auto"
          style={{ scrollbarWidth: 'none', whiteSpace: 'nowrap', fontSize: '13px', ...fade(400) }}
        >
          <span style={{ color: c.dim }}>COMM ARRAY: ONLINE</span>
          <span style={{ color: c.border }}>·</span>
          <span style={{ color: c.dim }}>FILE {fileId}</span>
          <span style={{ color: c.border }}>·</span>
          <span style={{ color: c.dim }}>{project.category.toUpperCase()}</span>
          <span style={{ color: c.border }}>·</span>
          <span style={{ color: c.dim }}>{project.year}</span>
          {nextProject && (
            <>
              <span style={{ color: c.border }} className="ml-auto">·</span>
              <button
                onClick={() => router.push(`/projects/${nextProject.slug}`)}
                className="transition-opacity hover:opacity-100"
                style={{ color: c.bright }}
              >
                NEXT LOG: {nextProject.title.toUpperCase()} {'>'}
              </button>
            </>
          )}
        </div>
      </div>

    </div>
  )
}
