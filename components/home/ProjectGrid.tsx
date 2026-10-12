import Image from 'next/image'
import { axisDesignTools } from '@/content/axis-design-tools'
import { type ScrollItem } from './ProjectMediaBlock'
import ResizableSplit from './ResizableSplit'
import WorkIndex from './WorkIndex'

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

// Selected work shown after the plugin films.
items.push(
  {
    slug: 'upday-news-app-redesign',
    title: 'Upday News App Redesign',
    caption: 'Redesign of the Upday news app.',
    media: '/images/projects/upday-news-app-redesign/7.jpg',
  },
  {
    slug: 'project-06',
    title: 'Rhythmus 21 – Sound design',
    caption: 'Reimagined soundtrack for Hans Richter classic.',
    media: '/images/projects/project-06/rythmus.mp4',
  },
  {
    slug: 'project-07',
    title: 'Alliance Artists',
    caption: 'Visual identity for the Brazilian management agency Alliance Artists.',
    media: '/images/projects/project-07/thumbnail.jpg',
  },
  {
    slug: 'project-08',
    title: 'Eli Iwasa DJ',
    caption: 'Visual identity for Brazilian DJ Eli Iwasa.',
    media: '/images/projects/project-08/thumbnail.jpg',
  },
  {
    slug: 'project-09',
    title: 'Discoteca Odara',
    caption: 'Visual identity for Brazilian label Discoteca Odara.',
    media: '/images/projects/project-09/thumbnail.gif',
  },
  {
    slug: 'project-10',
    title: 'Paris de Janeiro',
    caption: 'Key visuals for French-Brazilian swimwear brand.',
    media: '/images/projects/project-10/thumbnail.jpg',
  },
)

const LINK_CLASS = 'underline underline-offset-4 text-ink hover:text-accent transition-colors duration-200 ease-swiss'

/**
 * Brutalist Swiss bio: the name is the poster (sized against the column via
 * container queries), a role row, dense prose with every site link folded in,
 * and a grayscale portrait captioned like a plate. Hard black rules on paper.
 */
function Bio() {
  return (
    <div className="bio-pane h-full overflow-y-auto overscroll-contain no-scrollbar bg-paper text-ink">
      <h1 className="poster-name px-3 pt-2">
        Eduardo
        <br />
        Nogueira
      </h1>

      <div className="mono-label flex justify-between border-b border-ink px-3 pb-1.5 pt-2.5">
        <span>Product Designer</span>
        <span>(BR → DE)</span>
      </div>

      <div className="flex max-w-[54ch] flex-col gap-2.5 px-3 pt-6 text-[15px] leading-[1.35]">
        <p>
          Eduardo is a Brazilian designer who learned to love design by staring at
          record covers in shops he used to go as a teenager. He’s been judging albums
          by their covers ever since, and he’s usually right.
        </p>
        <p>
          These days he works at Axel Springer Tech, somewhere between branding and
          product design, on brands like WELT, Bild, Business Insider and The Telegraph.
          His current obsession is Axis, a design system that lets teams jump between
          brands without the visual equivalent of an identity crisis.
        </p>
        <p>
          He loves the parts of design most people skip: systems, workflows, the
          plumbing behind products.
        </p>
        <p>
          Before all that he studied the social sciences, which explains why he still
          asks the annoying question in meetings: “Okay, but who is this actually for?”
        </p>
        <p>
          He thinks AI is genuinely exciting and uses it to give designers superpowers.
          He’s also seen Idiocracy and has no plans to help make it a documentary.
        </p>
        <p>
          Off the clock he climbs walls, makes music, and digs through crates of vinyl.
          Given a time machine, he’d go straight to a Frank Zappa show in 1973. Priorities.
        </p>
        <p className="text-muted">
          His role in these projects ranges from product design, and branding and strategy. All projects presented here were initiated by Eduardo and done in collaboration with many great colleagues.
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

      <figure className="relative mx-3 mb-3 mt-6">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-wash">
          <Image
            src="/images/bio_pic.jpg"
            alt="Eduardo Nogueira"
            fill
            className="object-cover object-top grayscale contrast-[1.1]"
            sizes="(max-width: 768px) 100vw, 600px"
            priority
          />
        </div>
        <figcaption className="mono-label flex justify-between pt-1.5 text-muted">
          <span>Fig. 01</span>
          <span>Berlin</span>
        </figcaption>
      </figure>
    </div>
  )
}

export default function ProjectGrid() {
  return (
    <div className="md:h-screen md:overflow-hidden">
      <ResizableSplit bio={<Bio />} work={<WorkIndex items={items} />} />
    </div>
  )
}
