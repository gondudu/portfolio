'use client'

import { useEffect, useRef, useState } from 'react'
import ProjectMediaBlock, { type ScrollItem } from './ProjectMediaBlock'

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * The work pane, after the brutalist proposal: a sticky "Selected work"
 * header with a live counter, entries that wipe up from a hard clip (no
 * fades), and an "End of index" footer.
 *
 * Both observers use the default root (the viewport). On md+ the pane is
 * exactly viewport height and scrolls internally, so entries still cross the
 * viewport's centre band; below md the whole page scrolls and it works the
 * same way — so one set of observers covers both layouts.
 */
export default function WorkIndex({ items }: { items: ScrollItem[] }) {
  const total = items.length
  const rootRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const entries = Array.from(root.querySelectorAll<HTMLElement>('[data-entry]'))

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Hard clip reveal — unobserve each entry once it's shown.
    let reveal: IntersectionObserver | null = null
    if (prefersReduced) {
      entries.forEach((el) => el.classList.add('in'))
    } else {
      reveal = new IntersectionObserver(
        (list) => {
          list.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('in')
              reveal?.unobserve(en.target)
            }
          })
        },
        { rootMargin: '0px 0px -10% 0px' },
      )
      entries.forEach((el) => reveal!.observe(el))
    }

    // Live counter — whichever entry sits in the middle band is "current".
    const track = new IntersectionObserver(
      (list) => {
        list.forEach((en) => {
          if (en.isIntersecting) {
            setCurrent(Number((en.target as HTMLElement).dataset.i) + 1)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    entries.forEach((el) => track.observe(el))

    return () => {
      reveal?.disconnect()
      track.disconnect()
    }
  }, [])

  return (
    <div ref={rootRef} className="no-scrollbar md:h-full md:overflow-y-auto">
      <div className="mono-label sticky top-0 z-[2] flex justify-between border-y border-ink bg-paper px-5 py-2 md:border-t-0 md:px-6">
        <span>Selected work</span>
        <span>
          <b className="font-medium text-accent">{pad(current)}</b> / {pad(total)}
        </span>
      </div>

      {/* Mobile: bottom padding clears the peeking bio drawer. */}
      <div className="px-4 pt-4 pb-[calc(112px+env(safe-area-inset-bottom)+20px)] md:pb-0">
        {items.map((item, i) => (
          <article
            key={item.slug}
            data-entry
            data-i={i}
            aria-label={item.title}
            className="clip-reveal pb-20 last:pb-10 md:pb-32"
          >
            <ProjectMediaBlock item={item} index={i} total={total} />
          </article>
        ))}
      </div>

      <div className="mono-label flex justify-between border-t border-ink px-5 pb-12 pt-2 md:px-6">
        <span>End of index</span>
        <span>© 2026</span>
      </div>
    </div>
  )
}
