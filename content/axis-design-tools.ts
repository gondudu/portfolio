// ─────────────────────────────────────────────────────────────────────────────
// AXIS DESIGN TOOLS
// Figma plugin suite for Axel Springer's design system (Blatt) — the line of
// work that became the accessibility plugin + Blatt's cross-brand tooling.
// Each feature gets its own film, plus one overview of the suite as a whole.
// ─────────────────────────────────────────────────────────────────────────────

export interface AxisFilm {
  slug: string
  title: string
  caption: string
  meta: string
  video: string
  /**
   * Timestamp (seconds) of the frame shown while the film is paused. These
   * films open on black title cards, so the poster is hand-picked from the
   * demo footage — see ProjectMediaBlock. Playback still starts from 0.
   */
  posterTime?: number
}

const BASE = '/videos/axis-design-tools'
const DS_BASE = '/videos/axis-design-system'

export const axisDesignTools: AxisFilm[] = [
  {
    slug: 'axis-design-system',
    title: 'Axis Design System',
    caption:
      'One token source behind every Axel Springer brand, from Figma variables to shipped code. I help design the system and the guardrails that keep brands on it.',
    meta: 'Design System / Axel Springer · 2026',
    video: `${DS_BASE}/axis-design-system-overview-v2.mp4`,
    posterTime: 5,
  },
  {
    slug: 'axis-overview',
    title: 'Axis Design Tools',
    caption:
      'A Figma plugin suite that keeps every brand on system without leaving the file. I initiated it, directed the UX, and designed and coded two of its five tools.',
    meta: 'Figma Plugin Suite · 2026',
    video: `${BASE}/axis-overview.mp4`,
    posterTime: 33,
  },
  {
    slug: 'axis-fetch',
    title: 'Axis: Fetch Content',
    caption: 'Stress-tests components with live newsroom copy instead of lorem ipsum. Designed and coded by me.',
    meta: 'Figma Plugin / Axis Design Tools · 2026',
    video: `${BASE}/axis-fetch.mp4`,
    posterTime: 20,
  },
  {
    slug: 'axis-inspect',
    title: 'Axis: Inspect Design',
    caption: "Reveals the system token behind every value, so nothing passes as a token that isn't one. Directed by me.",
    meta: 'Figma Plugin / Axis Design Tools · 2026',
    video: `${BASE}/axis-inspect.mp4`,
    posterTime: 17,
  },
  {
    slug: 'axis-annotate',
    title: 'Axis: Annotate',
    caption: 'Measures redlines against the system in one pass instead of by hand. Directed by me.',
    meta: 'Figma Plugin / Axis Design Tools · 2026',
    video: `${BASE}/axis-annotate.mp4`,
    posterTime: 14,
  },
  {
    slug: 'axis-access',
    title: 'Axis: Accessibility',
    caption: 'Checks every component the way colour-blind readers actually see it. Designed and coded by me.',
    meta: 'Figma Plugin / Axis Design Tools · 2026',
    video: `${BASE}/axis-access.mp4`,
    posterTime: 17,
  },
  {
    slug: 'axis-contrib',
    title: 'Axis: Contribution',
    caption: "Feeds a spotted gap back into the library, right where it was found. Directed by me.",
    meta: 'Figma Plugin / Axis Design Tools · 2026',
    video: `${BASE}/axis-contrib.mp4`,
    posterTime: 17,
  },
]
