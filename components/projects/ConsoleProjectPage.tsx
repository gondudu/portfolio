'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ProjectContent, projects, getNextProject } from '@/lib/projects'
import AnimatedSection from '@/components/shared/AnimatedSection'

interface Props {
  project: ProjectContent
}

// Dark CRT colors — only used in sticky header
const crt = {
  text: '#e8a000',
  dim: '#a87000',
  bright: '#ffc93c',
  border: '#2a1800',
  bg: '#020100',
}

// Light editorial colors — used in content area
const lt = {
  bg: '#dadada',
  text: '#030303',
  secondary: '#818181',
  border: '#c5c5c5',
  caption: '#666666',
  tagBg: '#a87000',
  tagText: '#030303',
  labelAmber: '#a87000',
}

/*
 * Image convention:
 *   /images/projects/{slug}/{section}.jpg
 *
 * Section keys per project:
 *   hero.jpg        — hero banner (21:9)
 *   thumbnail.jpg   — project card on home (16:9)
 *   intro.jpg       — after intro section
 *   problem.jpg     — after problem section
 *   solution.jpg    — after solution section
 *   feature-01.jpg  — after feature 01
 *   feature-02.jpg  — after feature 02
 *   feature-03.jpg  — (if project has 3+ features)
 *   impact.jpg      — after impact section (optional)
 */

// Placeholder rectangle shown until real images are placed
function PlaceholderImage({ label, aspectRatio = '16 / 9' }: { label: string; aspectRatio?: string }) {
  return (
    <div style={{
      width: '100%',
      aspectRatio,
      backgroundColor: '#b8b8b8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Diagonal lines pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.08,
        backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 20px)',
      }} />
      <div style={{
        fontFamily: 'var(--font-jost)',
        fontWeight: 700,
        fontSize: '14px',
        letterSpacing: '0.15em',
        color: '#888',
        textTransform: 'uppercase',
        padding: '8px 16px',
        border: '2px dashed #aaa',
        borderRadius: '4px',
        backgroundColor: 'rgba(218,218,218,0.7)',
        zIndex: 1,
      }}>
        {label}
      </div>
    </div>
  )
}

function ContentImageOrPlaceholder({ slug, section, caption, aspectRatio = '16 / 9' }: { slug: string; section: string; caption?: string; aspectRatio?: string }) {
  const [errored, setErrored] = React.useState(false)
  const src = `/images/projects/${slug}/${section}`

  return (
    <div>
      {errored ? (
        <PlaceholderImage label={section} aspectRatio={aspectRatio} />
      ) : (
        <div style={{ width: '100%', aspectRatio, overflow: 'hidden', position: 'relative', backgroundColor: '#b8b8b8' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={caption || section}
            onError={() => setErrored(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}
      {caption && (
        <div style={{
          color: lt.caption,
          fontSize: '16px',
          fontFamily: 'var(--font-jost)',
          marginTop: '12px',
          paddingLeft: '4px',
        }}>
          {caption}
        </div>
      )}
    </div>
  )
}

// Side-by-side video pair (kept for figma-content-plugin)
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

  return (
    <>
      <div style={{
        width: '100%',
        aspectRatio: '16 / 9',
        display: 'flex',
        gap: '2px',
        backgroundColor: '#000',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <video ref={leftRef} src={leftSrc} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div style={{ width: '1px', backgroundColor: '#333', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <video ref={rightRef} src={rightSrc} autoPlay muted playsInline loop style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '12px',
        padding: '0 4px',
      }}>
        <span style={{ color: lt.caption, fontSize: '16px', fontFamily: 'var(--font-jost)' }}>Before: around 2 minutes</span>
        <span style={{ color: lt.caption, fontSize: '16px', fontFamily: 'var(--font-jost)' }}>After: 8 seconds</span>
      </div>
    </>
  )
}

function TwoColSection({ title, subtitle, children }: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row" style={{ gap: '64px' }}>
      {/* Left column */}
      <div className="flex-1" style={{ borderTop: `1px solid ${lt.border}`, paddingTop: '24px' }}>
        <AnimatedSection variant="fadeInUp">
          <h2 style={{
            fontFamily: 'var(--font-jost)',
            fontWeight: 400,
            fontSize: '48px',
            lineHeight: 1.1,
            color: lt.text,
            margin: 0,
          }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{
              fontFamily: 'var(--font-jost)',
              fontWeight: 400,
              fontSize: '48px',
              lineHeight: 1.1,
              color: lt.secondary,
              margin: '16px 0 0 0',
            }}>
              {subtitle}
            </p>
          )}
        </AnimatedSection>
      </div>
      {/* Right column */}
      <div className="flex-1" style={{ borderTop: `1px solid ${lt.border}`, paddingTop: '24px' }}>
        <AnimatedSection variant="fadeInUp" delay={0.1}>
          {children}
        </AnimatedSection>
      </div>
    </div>
  )
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-jost)',
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: 1.6,
      color: lt.text,
    }}>
      {children}
    </div>
  )
}

function ListItems({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
          <span style={{ color: lt.secondary, flexShrink: 0, fontFamily: 'var(--font-jost)', fontSize: '20px' }}>-</span>
          <span style={{ fontFamily: 'var(--font-jost)', fontSize: '20px', lineHeight: 1.6, color: lt.text }}>{item}</span>
        </div>
      ))}
    </div>
  )
}

export default function ConsoleProjectPage({ project }: Props) {
  const router = useRouter()

  const frameNumber = projects.findIndex(p => p.slug === project.slug) + 1
  const nextProject = getNextProject(project.slug)
  const fileId = `MX-${String(frameNumber).padStart(3, '0')}-LV426`

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

  const metadataFields = [
    { label: 'FILE ID', value: fileId },
    { label: 'YEAR', value: project.year },
    { label: 'ROLE', value: project.role },
    { label: 'CATEGORY', value: project.category },
    ...(project.team ? [{ label: 'TEAM', value: project.team }] : []),
    ...(project.timeline ? [{ label: 'TIMELINE', value: project.timeline }] : []),
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: lt.bg, color: lt.text }}>

      {/* ── Sticky Header (dark CRT — unchanged) ── */}
      <div
        className="sticky top-0 z-40 flex items-center gap-3 px-4 py-2 flex-wrap font-console"
        style={{ backgroundColor: crt.bg, fontSize: '20px', borderBottom: `1px solid ${crt.border}` }}
      >
        <button
          onClick={() => router.push('/?view=mission-logs')}
          className="transition-opacity hover:opacity-100"
          style={{ color: crt.dim, opacity: 0.7 }}
        >
          {'< BACK TO FOLDER'}
        </button>
        <span style={{ color: crt.border }}>·</span>
        <span style={{ color: crt.dim }}>LOG</span>
        <span style={{ color: crt.bright }}>{String(frameNumber).padStart(3, '0')}</span>
        <span style={{ color: crt.border }}>·</span>
        <span style={{ color: crt.text, maxWidth: '55vw', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {project.title.toUpperCase()}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span style={{ color: crt.dim }}>STARDATE</span>
          <span style={{ color: crt.bright }}>{stardate || '-----.------'}</span>
        </div>
      </div>

      {/* ── Hero Image ── */}
      {(() => {
        const heroSrc = `/images/projects/${project.slug}/hero.jpg`
        return (
          <div style={{ width: '100%', aspectRatio: '21 / 9', overflow: 'hidden', position: 'relative', backgroundColor: '#b8b8b8' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroSrc}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
        )
      })()}

      {/* ── Content Container ── */}
      <div style={{ maxWidth: '1320px', margin: '0 auto' }} className="px-4 md:px-24">
        <div style={{ paddingTop: '64px', paddingBottom: '96px' }} className="flex flex-col gap-20">

          {/* ── Intro Section: title left, description right ── */}
          <AnimatedSection variant="fadeInUp">
            <div className="flex flex-col md:flex-row" style={{ gap: '64px' }}>
              <div className="flex-1">
                <h1 style={{
                  fontFamily: 'var(--font-jost)',
                  fontWeight: 700,
                  fontSize: '48px',
                  lineHeight: 1.1,
                  color: lt.text,
                  margin: 0,
                }}>
                  {project.title}
                </h1>
              </div>
              <div className="flex-1">
                <p style={{
                  fontFamily: 'var(--font-jost)',
                  fontWeight: 400,
                  fontSize: '23px',
                  lineHeight: 1.5,
                  color: lt.text,
                  margin: 0,
                }}>
                  {project.overview}
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* ── Content Image: intro ── */}
          <AnimatedSection variant="fadeInScale">
            <ContentImageOrPlaceholder slug={project.slug} section="intro.jpg" />
          </AnimatedSection>

          {/* ── Quote + Metadata ── */}
          <div className="flex flex-col md:flex-row" style={{ gap: '64px' }}>
            {/* Left: large tagline (only shown if tagline is set) */}
            {project.tagline && (
              <div className="flex-1" style={{ borderTop: `1px solid ${lt.border}`, paddingTop: '24px' }}>
                <AnimatedSection variant="fadeInUp">
                  <p style={{
                    fontFamily: 'var(--font-jost)',
                    fontWeight: 400,
                    fontSize: '32px',
                    lineHeight: 1.3,
                    color: lt.text,
                    margin: 0,
                  }}>
                    {project.tagline}
                  </p>
                </AnimatedSection>
              </div>
            )}
            {/* Right: stacked metadata */}
            <div className="flex-1" style={{ borderTop: `1px solid ${lt.border}`, paddingTop: '24px' }}>
              <AnimatedSection variant="fadeInUp" delay={0.1}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {metadataFields.map(({ label, value }) => (
                    <div key={label} style={{ borderBottom: `1px solid ${lt.border}`, padding: '12px 0' }}>
                      <div style={{ color: lt.labelAmber, fontSize: '12px', letterSpacing: '0.15em', marginBottom: '4px', fontFamily: 'var(--font-jost)', fontWeight: 700, textTransform: 'uppercase' }}>{label}</div>
                      <div style={{ color: lt.text, fontSize: '16px', lineHeight: '1.4', fontFamily: 'var(--font-jost)' }}>{value}</div>
                    </div>
                  ))}
                  {project.skills && project.skills.length > 0 && (
                    <div style={{ borderBottom: `1px solid ${lt.border}`, padding: '12px 0' }}>
                      <div style={{ color: lt.labelAmber, fontSize: '12px', letterSpacing: '0.15em', marginBottom: '8px', fontFamily: 'var(--font-jost)', fontWeight: 700, textTransform: 'uppercase' }}>SKILLS</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {project.skills.map(s => (
                          <span key={s} style={{
                            color: lt.tagText,
                            fontSize: '13px',
                            backgroundColor: lt.tagBg,
                            padding: '3px 10px',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-jost)',
                            fontWeight: 700,
                          }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* ── Sections Loop ── */}
          {(project.sections ?? []).map((section) => {
            const hasMedia = Boolean(section.image) || Boolean(section.video)
            return (
              <React.Fragment key={section.id}>
                <div className={!hasMedia ? 'md:min-h-[80vh] md:flex md:flex-col md:justify-center' : ''}>
                  <TwoColSection title={section.title} subtitle={section.subtitle}>
                    <div className="flex flex-col gap-6">
                      {section.body && <BodyText>{section.body}</BodyText>}
                      {section.items && <ListItems items={section.items} />}
                    </div>
                  </TwoColSection>
                </div>

                {section.video && (
                  <AnimatedSection variant="fadeInScale">
                    <VideoPair leftSrc={section.video.left} rightSrc={section.video.right} />
                  </AnimatedSection>
                )}

                {section.image && !section.video && (
                  <AnimatedSection variant="fadeInScale">
                    <ContentImageOrPlaceholder
                      slug={project.slug}
                      section={section.image}
                      caption={section.imageCaption}
                    />
                  </AnimatedSection>
                )}
              </React.Fragment>
            )
          })}

          {/* ── Impact / Results ── */}
          {project.results.length > 0 && (
            <TwoColSection title="Impact">
              <div className="flex flex-col gap-4">
                {project.results.map((r, i) => (
                  <AnimatedSection key={i} variant="fadeInUp" delay={i * 0.05}>
                    <div style={{
                      fontFamily: 'var(--font-jost)',
                      fontSize: '20px',
                      lineHeight: 1.6,
                      color: lt.text,
                      paddingLeft: '16px',
                      borderLeft: `3px solid ${lt.border}`,
                    }}>
                      {r}
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </TwoColSection>
          )}

          {/* ── Next Mission Footer ── */}
          {nextProject && (
            <AnimatedSection variant="fadeInUp">
              <div style={{ borderTop: `1px solid ${lt.border}`, paddingTop: '40px' }}>
                <div className="flex flex-col md:flex-row" style={{ gap: '64px' }}>
                  <div className="flex-1">
                    <div style={{
                      fontFamily: 'var(--font-jost)',
                      fontWeight: 400,
                      fontSize: '16px',
                      color: lt.secondary,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}>
                      Next Project
                    </div>
                  </div>
                  <div className="flex-1">
                    <button
                      onClick={() => router.push(`/projects/${nextProject.slug}`)}
                      className="group text-left w-full"
                      style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                    >
                      <div className="flex items-center gap-6">
                        <div style={{
                          width: '160px',
                          height: '90px',
                          flexShrink: 0,
                          overflow: 'hidden',
                          backgroundColor: '#b8b8b8',
                        }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={nextProject.thumbnail}
                            alt={nextProject.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontFamily: 'var(--font-jost)',
                            fontWeight: 700,
                            fontSize: '28px',
                            color: lt.text,
                          }}>
                            {nextProject.title} &rarr;
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-jost)',
                            fontSize: '16px',
                            color: lt.secondary,
                            marginTop: '4px',
                          }}>
                            {nextProject.category}
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

        </div>
      </div>

      {/* Fixed NEXT MISSION button — dark CRT style */}
      {nextProject && (
        <button
          onClick={() => router.push(`/projects/${nextProject.slug}`)}
          className="fixed bottom-6 right-6 transition-opacity hover:opacity-100 font-console"
          style={{
            color: crt.bright,
            fontSize: '18px',
            letterSpacing: '0.08em',
            border: `1px solid ${crt.border}`,
            backgroundColor: crt.bg,
            padding: '8px 16px',
            zIndex: 50,
          }}
        >
          NEXT MISSION {'>'}
        </button>
      )}
    </div>
  )
}
