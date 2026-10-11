import type { ProjectContent } from '@/lib/projects'

export const figmaAccessibilityPlugin: ProjectContent = {
  slug: 'figma-accessibility-plugin',
  title: 'Figma Accessibility Plugin',
  category: 'Design Tool / Designed and shipped solo',
  year: '2025',
  role: 'Designer + Developer',
  team: 'Solo',
  timeline: '2025',
  skills: ['Accessibility', 'WCAG', 'Product Design', 'AI-assisted development', 'Figma Plugin API'],
  thumbnail: '/images/projects/figma-accessibility-plugin/thumbnail.jpg',
  heroImage: '/images/projects/figma-accessibility-plugin/hero.jpg',
  overview:
    "Accessibility gets reviewed after handoff — when a developer flags a contrast ratio or a tester tabs through a form and can't escape it. By then the design is production-bound and fixing it costs 10–30× what it would have cost in Figma. I designed and shipped a plugin that moves the check onto the canvas: eight colour vision simulations, contrast, focus rings, and WCAG text spacing, generated as non-destructive layers in one click.",
  results: [
    '8 colour vision simulations generated in one click, covering all major deficiencies (Viénot 1999 matrices).',
    'Real-time WCAG AA/AAA contrast checker — walks the parent hierarchy to detect background colour automatically, so nothing is picked by hand.',
    'Focus ring detection and text spacing override (WCAG SC 1.4.12) built in as non-destructive overlays.',
    'Freemium via Figma’s native payments API — 5 free generations, €2 unlocks unlimited. No backend, no external processor.',
    'v1 feature-complete: 24/24 requirements across 6 development phases, with full unit test coverage on the colour maths.',
    'Designed, built, tested, and shipped solo — my second piece of working software as a designer.',
  ],
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "I build design tools as a way of testing what I can ship alone. This one started from a problem I kept watching happen: accessibility reviews arriving too late to act on cheaply.\n\nThe brief I set myself was narrow — make the check frictionless enough that designers who don't already care about WCAG still run it. That constraint drove every decision that followed, including the ones that cost me features.",
    },
    {
      id: 'problem',
      title: '',
      image: 'problem.jpg',
    },
    {
      id: 'solution',
      title: '',
      image: 'solution.jpg',
    },
    {
      id: 'features',
      title: '',
      imageLayout: 'two-col',
      image: 'feature-01.jpg',
      image2: 'feature-02.jpg',
    },
    {
      id: 'ship',
      title: '',
      image: 'feature-03.jpg',
    },
  ],
}
