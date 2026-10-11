import Image from 'next/image'
import { axisDesignTools } from '@/content/axis-design-tools'
import AnimatedSection from '@/components/shared/AnimatedSection'
import ProjectMediaBlock, { type ScrollItem } from './ProjectMediaBlock'
import ResizableSplit from './ResizableSplit'

/**
 * Split layout, after tee.works: bio pinned left as its own scrollable,
 * tinted panel, work scrolling right. One text style for the whole bio (no
 * display/lead/label mixing) and every site link folded into it instead of
 * a separate header or footer. The split between them is user-resizable —
 * see ResizableSplit.
 *
 * At `md+` the outer frame is locked to `h-screen`/`overflow-hidden` and
 * each pane scrolls independently inside it (`h-full overflow-y-auto`,
 * scrollbar hidden) — true two-pane scrolling like the reference, so the
 * bio panel is always exactly full height with no sticky/unstick seam at
 * the bottom of the page. Below `md` the lock lifts and it's a normal
 * stacked, body-scrolling single column.
 *
 * Only Axis Design Tools is shown for now — the rest of the case-study
 * copy in content/projects/*.ts, content/more-projects.ts, and the
 * /projects/[slug] route stay in the codebase, unlinked, for a later step.
 */
const items: ScrollItem[] = axisDesignTools.map((f): ScrollItem => ({
  slug: f.slug,
  title: f.title,
  caption: f.caption,
  meta: f.meta,
  media: f.video,
}))

const LINK_CLASS = 'underline underline-offset-4 text-ink hover:text-accent transition-colors duration-200 ease-swiss'

function Bio() {
  return (
    <div className="md:h-full md:overflow-y-auto no-scrollbar bg-[#1C1C1A] px-6 py-10 md:py-16 flex flex-col gap-5 text-[16px] leading-[1.7] text-ink">
      <div className="relative w-full shrink-0 aspect-[4/5] overflow-hidden bg-[#2A2A28]">
        <Image
          src="/images/bio_pic.jpg"
          alt="Eduardo Nogueira"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 600px"
          priority
        />
      </div>
      <p>
        I&apos;m Eduardo — a Brazilian designer living in Berlin, working at the
        intersection of branding and product. I came up through graphic design,
        which still shows in how I think about structure and type, before moving
        into the kind of product work that actually ships.
      </p>
      <p>
        Currently at Axel Springer, across brands like Bild, WELT, Business Insider,
        and the Telegraph — design systems, internal tools, product work, whatever
        the brand needs.
      </p>
      <p>
        I like finding the systems that don&apos;t serve the people using them, and
        then building what should replace them. Increasingly that means writing the
        software myself — two of the tools on the right are ones I designed and
        coded end to end.
      </p>
      <p>
        Outside of work I climb, play music, and collect records. Lately I&apos;m
        interested in where AI actually helps people work, and where it&apos;s just
        an expensive guess.
      </p>
      <p className="text-muted">
        This site is being rebuilt right now — the work on the right is stills; the
        real motion is on its way.
      </p>
      <p>
        Get in touch:{' '}
        <a href="mailto:eduardobnog@gmail.com" className={LINK_CLASS}>
          Email
        </a>{' '}
        ·{' '}
        <a
          href="https://www.linkedin.com/in/ebn18/"
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          LinkedIn
        </a>{' '}
        ·{' '}
        <a
          href="/images/eduardo_nogueira_cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          CV
        </a>{' '}
        ·{' '}
        <a href="/about" className={LINK_CLASS}>
          About
        </a>
      </p>
    </div>
  )
}

function Work() {
  return (
    <div className="md:h-full md:overflow-y-auto no-scrollbar">
      <div className="md:pl-10 py-section-md">
        <div className="flex flex-col gap-section">
          {items.map((item, i) => (
            <AnimatedSection key={item.slug} variant="fadeInUp" delay={i === 0 ? 0 : 0.04}>
              <ProjectMediaBlock item={item} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProjectGrid() {
  return (
    <div className="pr-5 md:pr-12 md:h-screen md:overflow-hidden">
      <ResizableSplit
        bio={
          <AnimatedSection variant="fadeIn" className="md:h-full">
            <Bio />
          </AnimatedSection>
        }
        work={<Work />}
      />
    </div>
  )
}
