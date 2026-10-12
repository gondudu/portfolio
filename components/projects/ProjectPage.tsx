'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ProjectContent, Section, getNextProject } from '@/lib/projects'

interface Props {
  project: ProjectContent
}

/*
 * Image convention: /images/projects/{slug}/{section}
 *   hero.jpg · thumbnail.jpg · intro.jpg · problem.jpg · solution.jpg
 *   feature-01.jpg … feature-0N.jpg
 * Sections reference the filename only; the slug is prefixed here.
 */

const PLACEHOLDER = 'bg-panel'

function Media({
  slug,
  file,
  alt,
  aspectRatio = '16 / 9',
}: {
  slug: string
  file: string
  /** Describes what the image shows. Never empty: case study images are content, not decoration. */
  alt: string
  aspectRatio?: string
}) {
  const [errored, setErrored] = useState(false)
  const src = `/images/projects/${slug}/${file}`
  const isVideo = file.endsWith('.mp4') || file.endsWith('.webm')

  if (errored) {
    return (
      <div className={`w-full ${PLACEHOLDER} flex items-center justify-center`} style={{ aspectRatio }}>
        <span className="text-label uppercase text-muted">{file}</span>
      </div>
    )
  }

  return (
    <div className={`w-full overflow-hidden relative ${PLACEHOLDER}`} style={{ aspectRatio }}>
      {isVideo ? (
        <video
          src={src}
          aria-label={alt}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setErrored(true)}
          className="w-full h-full object-cover block"
        />
      ) : (
        /* Plain <img>: sources include .gif, which next/image would not animate. */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          className="w-full h-full object-cover block"
        />
      )}
    </div>
  )
}

function Caption({ children }: { children: string }) {
  return <p className="text-small text-muted mt-3">{children}</p>
}

/** Side-by-side video pair with optional before/after captions. */
function VideoPair({
  left,
  right,
  caption,
}: {
  left: string
  right: string
  caption?: string
}) {
  const leftRef = useRef<HTMLVideoElement>(null)
  const rightRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const long = leftRef.current
    if (!long) return
    const restart = () => {
      long.currentTime = 0
      void long.play()
      if (rightRef.current) {
        rightRef.current.currentTime = 0
        void rightRef.current.play()
      }
    }
    long.addEventListener('ended', restart)
    return () => long.removeEventListener('ended', restart)
  }, [])

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`aspect-[4/3] ${PLACEHOLDER}`}>
          <video ref={leftRef} src={left} autoPlay muted playsInline className="w-full h-full object-contain" />
        </div>
        <div className={`aspect-[4/3] ${PLACEHOLDER}`}>
          <video ref={rightRef} src={right} autoPlay muted playsInline loop className="w-full h-full object-contain" />
        </div>
      </div>
      {caption && <Caption>{caption}</Caption>}
    </div>
  )
}

function BodyText({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-5 max-w-measure">
      {text.split('\n\n').map((paragraph, i) => (
        <p key={i} className="text-body text-ink">
          {paragraph.trim()}
        </p>
      ))}
    </div>
  )
}

function ListItems({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col max-w-measure">
      {items.map((item, i) => (
        <li key={i} className="rule-t py-4 flex gap-5">
          <span className="text-label uppercase text-muted shrink-0 pt-1.5">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-body text-ink">{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Section title left, content right — the page's underlying two-column rhythm. */
function SectionBlock({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid-12 rule-t pt-6">
      <div className="col-span-12 md:col-span-3">
        <h2 className="text-title text-ink">{title}</h2>
        {subtitle && <p className="text-body text-muted mt-2">{subtitle}</p>}
      </div>
      <div className="col-span-12 md:col-span-7 md:col-start-6 mt-6 md:mt-0">{children}</div>
    </div>
  )
}

/** Renders the media attached to a section, honouring every layout prop. */
function SectionMedia({
  slug,
  section,
  projectTitle,
}: {
  slug: string
  section: Section
  projectTitle: string
}) {
  if (section.video) {
    return <VideoPair left={section.video.left} right={section.video.right} caption={section.imageCaption} />
  }

  // Falls back to section + project context so no image is ever unlabelled.
  // Set `imageAlt` on the section to describe what the image actually shows.
  const alt = section.imageAlt ?? `${section.title} — ${projectTitle}`

  const files =
    section.images && section.images.length > 0
      ? section.images
      : section.image
        ? [section.image, ...(section.image2 ? [section.image2] : [])]
        : []

  if (files.length === 0) return null

  if (section.imageLayout === 'two-col') {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {files.slice(0, 2).map((file) => (
            <Media key={file} slug={slug} file={file} alt={alt} aspectRatio={section.imageAspectRatio ?? '1 / 1'} />
          ))}
        </div>
        {section.imageCaption && <Caption>{section.imageCaption}</Caption>}
      </>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {files.map((file) => (
          <Media key={file} slug={slug} file={file} alt={alt} aspectRatio={section.imageAspectRatio} />
        ))}
      </div>
      {section.imageCaption && <Caption>{section.imageCaption}</Caption>}
    </>
  )
}

export default function ProjectPage({ project }: Props) {
  const nextProject = getNextProject(project.slug)

  const metadata = [
    { label: 'Year', value: project.year },
    { label: 'Role', value: project.role },
    { label: 'Category', value: project.category },
    ...(project.team ? [{ label: 'Team', value: project.team }] : []),
    ...(project.timeline ? [{ label: 'Timeline', value: project.timeline }] : []),
    ...(project.skills?.length ? [{ label: 'Skills', value: project.skills.join(', ') }] : []),
  ]

  const [contextSection, ...bodySections] = project.sections ?? []

  return (
    <article className="page-x max-w-page mx-auto py-section-md">
      {/* ── Title ─────────────────────────────────────────────── */}
      <header className="grid-12 mb-section-md">
        <div className="col-span-12">
          <Link
            href="/"
            className="text-label uppercase text-muted hover:text-ink transition-colors duration-200 ease-swiss"
          >
            ← Work
          </Link>
        </div>
        <h1 className="col-span-12 md:col-span-10 text-display-xl text-ink text-balance mt-6">
          {project.title}
        </h1>
      </header>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="mb-section-md">
        <Media
          slug={project.slug}
          file="hero.jpg"
          alt={`${project.title} — project overview`}
          aspectRatio="21 / 9"
        />
      </div>

      {/* ── Overview + metadata ───────────────────────────────── */}
      <div className="grid-12 mb-section">
        <div className="col-span-12 md:col-span-7 rule-t pt-6">
          <p className="text-lead text-ink max-w-measure">{project.overview}</p>
          {contextSection?.body && (
            <div className="mt-8">
              <BodyText text={contextSection.body} />
            </div>
          )}
          {contextSection?.items && (
            <div className="mt-8">
              <ListItems items={contextSection.items} />
            </div>
          )}
        </div>

        <dl className="col-span-12 md:col-span-4 md:col-start-9 rule-t mt-section-sm md:mt-0">
          {metadata.map(({ label, value }) => (
            <div key={label} className="rule-b py-3">
              <dt className="text-label uppercase text-muted">{label}</dt>
              <dd className="text-small text-ink mt-1">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── Sections ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-section">
        {bodySections.map((section) => {
          const hasText = section.title || section.subtitle || section.body || section.items?.length

          // Image-only section: no title/body/items — skip the divider and title column entirely.
          if (!hasText) {
            return (
              <div key={section.id}>
                <SectionMedia slug={project.slug} section={section} projectTitle={project.title} />
              </div>
            )
          }

          return (
            <div key={section.id} className="flex flex-col gap-10">
              <SectionBlock title={section.title} subtitle={section.subtitle}>
                <div className="flex flex-col gap-8">
                  {section.body && <BodyText text={section.body} />}
                  {section.items && <ListItems items={section.items} />}
                </div>
              </SectionBlock>
              <SectionMedia slug={project.slug} section={section} projectTitle={project.title} />
            </div>
          )
        })}

        {/* ── Impact ──────────────────────────────────────────── */}
        {project.results.length > 0 && (
          <SectionBlock title="Impact">
            <ListItems items={project.results} />
          </SectionBlock>
        )}
      </div>

      {/* ── Next project ──────────────────────────────────────── */}
      {nextProject && (
        <div className="grid-12 rule-t pt-6 mt-section">
          <p className="col-span-12 md:col-span-3 text-label uppercase text-muted">Next project</p>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="col-span-12 md:col-span-7 md:col-start-6 group flex items-start gap-6 mt-6 md:mt-0"
          >
            <div className={`w-[120px] shrink-0 aspect-[4/3] overflow-hidden ${PLACEHOLDER}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={nextProject.thumbnail}
                alt=""
                className="w-full h-full object-cover block"
              />
            </div>
            <div>
              <h2 className="text-title text-ink group-hover:text-accent transition-colors duration-200 ease-swiss">
                {nextProject.title}
              </h2>
              <p className="text-small text-muted mt-1">{nextProject.category}</p>
            </div>
          </Link>
        </div>
      )}
    </article>
  )
}
