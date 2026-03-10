'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Project, projects, getNextProject } from '@/lib/projects'

interface Props {
  project: Project
}

const c = {
  text: '#e8a000',
  dim: '#a87000',
  bright: '#ffc93c',
  border: '#2a1800',
}

// Side-by-side video pair: shortSrc left, longSrc right. Both restart when long video ends.
// leftSrc = long video, rightSrc = short video. Both restart when long video ends.
function VideoPair({ leftSrc, rightSrc }: { leftSrc: string; rightSrc: string }) {
  const leftRef = useRef<HTMLVideoElement>(null)
  const rightRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const long = leftRef.current
    if (!long) return
    const restart = () => {
      long.currentTime = 0
      long.play()
      if (rightRef.current) { rightRef.current.currentTime = 0; rightRef.current.play() }
    }
    long.addEventListener('ended', restart)
    return () => long.removeEventListener('ended', restart)
  }, [])

  const wrapStyle: React.CSSProperties = {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  }
  const videoStyle: React.CSSProperties = {
    width: '100%', height: '100%', objectFit: 'contain',
  }

  return (
    <>
    <div style={{
      width: 'min(936px, 100vw)',
      marginLeft: 'calc((min(936px, 100vw) - min(720px, 100%)) / -2)',
      aspectRatio: '16 / 9',
      display: 'flex',
      gap: '2px',
      backgroundColor: '#0d0800',
      marginBottom: '0',
      marginTop: '4px',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={wrapStyle}>
        <video ref={leftRef} src={leftSrc} autoPlay muted playsInline style={videoStyle} />
      </div>
      <div style={{ width: '1px', backgroundColor: '#2a1800', flexShrink: 0 }} />
      <div style={wrapStyle}>
        <video ref={rightRef} src={rightSrc} autoPlay muted playsInline loop style={videoStyle} />
      </div>
      {/* Corner brackets */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points="0,8 0,0 8,0"        fill="none" stroke="#2a1800" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        <polyline points="92,0 100,0 100,8"   fill="none" stroke="#2a1800" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        <polyline points="0,92 0,100 8,100"   fill="none" stroke="#2a1800" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        <polyline points="92,100 100,100 100,92" fill="none" stroke="#2a1800" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
    <div style={{
      width: 'min(936px, 100vw)',
      marginLeft: 'calc((min(936px, 100vw) - min(720px, 100%)) / -2)',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '-20px',
      marginBottom: '28px',
      padding: '0 4px',
    }}>
      <span style={{ color: '#a87000', fontSize: '13px', letterSpacing: '0.12em' }}>BEFORE: AROUND 2 MINUTES</span>
      <span style={{ color: '#a87000', fontSize: '13px', letterSpacing: '0.12em' }}>AFTER: 8 SECONDS</span>
    </div>
    </>
  )
}

// Full-bleed content image with scanline overlay + corner brackets + label
function ContentImage({ src, alt, label, index }: { src: string; alt: string; label: string; index: number }) {
  return (
    <div style={{ position: 'relative', width: 'min(936px, 100vw)', marginLeft: 'calc((min(936px, 100vw) - min(720px, 100%)) / -2)', aspectRatio: '16 / 9', overflow: 'hidden', marginBottom: '28px', marginTop: '4px', backgroundColor: '#0d0800' }}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(min-width: 768px) 720px, 100vw"
        loading="lazy"
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

  const renderMedia = (n: number, label: string) => {
    const src = img(n)
    if (!src) return null
    if (src.startsWith('video-pair::')) {
      const [, leftSrc, rightSrc] = src.split('::')
      return <VideoPair key={n} leftSrc={leftSrc} rightSrc={rightSrc} />
    }
    return <ContentImage key={n} src={src} alt={`${project.title} — ${label}`} label={label} index={n} />
  }

  const SectionLabel = ({ children }: { children: string }) => (
    <div style={{
      color: c.bright,
      fontSize: '16px',
      letterSpacing: '0.2em',
      marginBottom: '10px',
      paddingBottom: '4px',
      borderBottom: `1px dashed ${c.border}`,
      fontFamily: 'var(--font-ibm-plex-mono)',
    }}>
      {children}
    </div>
  )

  return (
    <div
      className="fixed inset-0 flex flex-col font-console overflow-hidden"
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
          {'< BACK TO FOLDER'}
        </button>
        <span style={{ color: c.border }}>·</span>
        <span style={{ color: c.dim }}>LOG</span>
        <span style={{ color: c.bright }}>{String(frameNumber).padStart(3, '0')}</span>
        <span style={{ color: c.border }}>·</span>
        <span style={{ color: c.text, maxWidth: '55vw', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {project.title.toUpperCase()}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span style={{ color: c.dim }}>STARDATE</span>
          <span style={{ color: c.bright }}>{stardate || '-----.------'}</span>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${c.border}` }} />

      {/* ── Main area ── */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden" style={fade(120)}>

        {/* ── CENTER: scrollable content with embedded images ── */}
        <div className="flex-1 min-h-0 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>

          {/* Hero image — full bleed, no padding */}
          {img(0) && (
            <div style={{ position: 'relative', width: '100%', aspectRatio: '21 / 9', overflow: 'hidden', flexShrink: 0, backgroundColor: '#0d0800' }}>
              <Image
                src={img(0)!}
                alt={`${project.title} — hero image`}
                fill
                className="object-cover"
                priority
                sizes="100vw"
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
            </div>
          )}

          {/* Metadata strip — replaces sidebar */}
          <div className="px-3 md:px-6 pt-4" style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0',
              borderTop: `1px solid ${c.border}`,
              borderBottom: `1px solid ${c.border}`,
              marginBottom: '20px',
            }}>
              {/* CLASSIFIED badge + log number */}
              <div style={{
                padding: '10px 16px',
                borderRight: `1px solid ${c.border}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                flexShrink: 0,
              }}>
                <div style={{
                  border: `1px solid ${c.border}`, padding: '1px 6px',
                  fontSize: '11px', letterSpacing: '0.2em', color: c.dim,
                  display: 'inline-block',
                }}>CLASSIFIED</div>
                <div style={{ color: c.bright, fontSize: '36px', lineHeight: '1' }}>{String(frameNumber).padStart(3, '0')}</div>
              </div>
              {/* Metadata fields */}
              {[
                { label: 'FILE ID', value: fileId },
                { label: 'YEAR', value: project.year },
                { label: 'ROLE', value: project.role },
                { label: 'CATEGORY', value: project.category },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  padding: '10px 16px',
                  borderRight: `1px solid ${c.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  flexShrink: 0,
                }}>
                  <div style={{ color: c.dim, fontSize: '11px', letterSpacing: '0.15em' }}>{label}</div>
                  <div style={{ color: c.text, fontSize: '14px', lineHeight: '1.4' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="pb-10">
            <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 16px' }}>

              {/* Log access header */}
              <div style={{ color: c.bright, marginBottom: '4px', fontSize: '18px' }}>
                {'> '}ACCESSING MISSION LOG {String(frameNumber).padStart(3, '0')}...
              </div>
              <div style={{ color: c.border, marginBottom: '20px', fontSize: '16px' }}>{'─'.repeat(48)}</div>

              {/* ── FULL LOG ── */}
              {project.caseStudy && (
                <div style={{ fontSize: '18px' }}>

                  <div style={{ marginBottom: '28px' }}>
                    <SectionLabel>{'// MISSION CONTEXT'}</SectionLabel>
                    <div style={{ color: c.text, lineHeight: '1.8', fontFamily: 'var(--font-ibm-plex-mono)' }}>{project.caseStudy.context}</div>
                  </div>

                  {renderMedia(1, 'MISSION CONTEXT')}

                  <div style={{ marginBottom: '28px' }}>
                    <SectionLabel>{'// RECON FINDINGS'}</SectionLabel>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {project.caseStudy.researchFindings.map((f, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', color: c.text, lineHeight: '1.6' }}>
                          <span style={{ color: c.dim, flexShrink: 0, fontFamily: 'var(--font-ibm-plex-mono)' }}>—</span>
                          <span style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {renderMedia(2, 'PROCESS')}

                  <div style={{ marginBottom: '28px' }}>
                    <SectionLabel>{'// KEY DECISIONS'}</SectionLabel>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {project.caseStudy.keyDecisions.map((d, i) => (
                        <div key={i} style={{ paddingLeft: '10px', borderLeft: `2px solid ${c.border}` }}>
                          <div style={{ color: c.bright, marginBottom: '4px', fontFamily: 'var(--font-ibm-plex-mono)' }}>{'>'} {d.decision.toUpperCase()}</div>
                          <div style={{ color: c.dim, lineHeight: '1.6', fontFamily: 'var(--font-ibm-plex-mono)' }}>{d.outcome}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '28px' }}>
                    <SectionLabel>{'// TRADEOFFS'}</SectionLabel>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {project.caseStudy.tradeoffs.map((t, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', color: c.text, lineHeight: '1.6' }}>
                          <span style={{ color: c.dim, flexShrink: 0, fontFamily: 'var(--font-ibm-plex-mono)' }}>—</span>
                          <span style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {renderMedia(3, 'RESULTS')}

                  <div style={{ marginBottom: '28px' }}>
                    <SectionLabel>{'// RESULTS'}</SectionLabel>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {project.results.map((r, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '10px', paddingLeft: '4px', borderLeft: `2px solid ${c.border}` }}>
                          <span style={{ color: c.bright, flexShrink: 0, fontFamily: 'var(--font-ibm-plex-mono)' }}>{'>'}</span>
                          <span style={{ color: c.bright, fontFamily: 'var(--font-ibm-plex-mono)' }}>{r.toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {renderMedia(4, 'RETROSPECTIVE')}

                  <div style={{ marginBottom: '28px' }}>
                    <SectionLabel>{'// RETROSPECTIVE'}</SectionLabel>
                    <div style={{ color: c.dim, lineHeight: '1.8', fontStyle: 'italic', fontFamily: 'var(--font-ibm-plex-mono)' }}>{project.caseStudy.retrospective}</div>
                  </div>

                </div>
              )}

              {/* End marker */}
              <div style={{ color: c.border, fontSize: '14px', marginTop: '8px' }}>{'── [END LOG] ──'}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Sticky NEXT MISSION button — always visible */}
      {nextProject && (
        <button
          onClick={() => router.push(`/projects/${nextProject.slug}`)}
          className="fixed bottom-6 right-6 transition-opacity hover:opacity-100 font-console"
          style={{
            color: c.bright,
            fontSize: '18px',
            letterSpacing: '0.08em',
            border: `1px solid ${c.border}`,
            backgroundColor: '#020100',
            padding: '8px 16px',
            zIndex: 50,
            ...fade(400),
          }}
        >
          NEXT MISSION {'>'}
        </button>
      )}

    </div>
  )
}
