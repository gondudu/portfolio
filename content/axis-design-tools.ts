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
}

const BASE = '/videos/axis-design-tools'

export const axisDesignTools: AxisFilm[] = [
  {
    slug: 'axis-overview',
    title: 'Axis Design Tools',
    caption:
      'I initiated this plugin and directed its UI and UX, built in collaboration with Axel Springer’s design team. I designed and coded two of its five tools myself — fetch content and accessibility — in a suite that keeps every brand on system, without leaving Figma.',
    meta: 'Figma Plugin Suite · 2026',
    video: `${BASE}/axis-overview.mp4`,
  },
  {
    slug: 'axis-fetch',
    title: 'Axis: Fetch Content',
    caption: 'Stress-tests components with live newsroom copy instead of lorem ipsum. Designed and coded by me.',
    meta: 'Figma Plugin / Axis Design Tools · 2026',
    video: `${BASE}/axis-fetch.mp4`,
  },
  {
    slug: 'axis-inspect',
    title: 'Axis: Inspect Design',
    caption: "Shows the system token behind every value, so nothing passes as a token that isn't one.",
    meta: 'Figma Plugin / Axis Design Tools · 2026',
    video: `${BASE}/axis-inspect.mp4`,
  },
  {
    slug: 'axis-annotate',
    title: 'Axis: Annotate',
    caption: 'Measures redlines against the system in one pass instead of by hand.',
    meta: 'Figma Plugin / Axis Design Tools · 2026',
    video: `${BASE}/axis-annotate.mp4`,
  },
  {
    slug: 'axis-access',
    title: 'Axis: Accessibility',
    caption: 'Checks every component the way colour-blind readers actually see it. Designed and coded by me.',
    meta: 'Figma Plugin / Axis Design Tools · 2026',
    video: `${BASE}/axis-access.mp4`,
  },
  {
    slug: 'axis-contrib',
    title: 'Axis: Contribution',
    caption: "Feeds a spotted system gap back into the system, right where it was found.",
    meta: 'Figma Plugin / Axis Design Tools · 2026',
    video: `${BASE}/axis-contrib.mp4`,
  },
]
