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
      'A design system for the German publisher Axel Springer, which I initiated to optimize how the company develops and delivers its publications. I work within the brands to ensure understanding and compliance, while my colleague Mario architected the system’s pipeline.',
    meta: 'Design System / Axel Springer · 2026',
    video: `${DS_BASE}/axis-design-system-overview-v2.mp4`,
    posterTime: 5,
  },
  {
    slug: 'axis-overview',
    title: 'Axis Design Tools',
    caption:
      'A Figma plugin built as part of the Axis design system, made to speed up designers’ work and keep every brand consistent. I built it with my colleague Mario — I did the UI and two of its features, and Mario built the rest.',
    meta: 'Figma Plugin Suite · 2026',
    video: `${BASE}/axis-overview.mp4`,
    posterTime: 33,
  },
  {
    slug: 'axis-fetch',
    title: 'Axis: Fetch Content',
    caption: 'Fills designs with real published content instead of placeholder text, so layouts are tested against the real thing. Built by me.',
    meta: 'Figma Plugin / Axis Design Tools · 2026',
    video: `${BASE}/axis-fetch.mp4`,
    posterTime: 20,
  },
  {
    slug: 'axis-inspect',
    title: 'Axis: Inspect Design',
    caption: 'Checks that every value in a design comes from the system, flagging anything off-spec before handoff.',
    meta: 'Figma Plugin / Axis Design Tools · 2026',
    video: `${BASE}/axis-inspect.mp4`,
    posterTime: 17,
  },
  {
    slug: 'axis-annotate',
    title: 'Axis: Annotate',
    caption: 'Adds measurement and spec annotations automatically, in a single pass instead of by hand.',
    meta: 'Figma Plugin / Axis Design Tools · 2026',
    video: `${BASE}/axis-annotate.mp4`,
    posterTime: 14,
  },
  {
    slug: 'axis-access',
    title: 'Axis: Accessibility',
    caption: 'Previews how each design reads for colour-blind users and flags low contrast. Built by me.',
    meta: 'Figma Plugin / Axis Design Tools · 2026',
    video: `${BASE}/axis-access.mp4`,
    posterTime: 17,
  },
  {
    slug: 'axis-contrib',
    title: 'Axis: Contribution',
    caption: 'Lets designers push a missing component back into the shared library, right where they spotted the gap.',
    meta: 'Figma Plugin / Axis Design Tools · 2026',
    video: `${BASE}/axis-contrib.mp4`,
    posterTime: 17,
  },
]
