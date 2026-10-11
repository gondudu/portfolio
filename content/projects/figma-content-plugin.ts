import type { ProjectContent } from '@/lib/projects'

export const figmaContentPlugin: ProjectContent = {
  slug: 'figma-content-plugin',
  title: 'Figma Content Plugin',
  category: 'Internal Tool / Adopted company-wide',
  year: '2025',
  role: 'Designer + Developer',
  team: 'Solo',
  timeline: 'Built in 2 days',
  skills: ['Product Design', 'AI-assisted development', 'Editorial content', 'Figma Plugin API'],
  thumbnail: '/images/projects/figma-content-plugin/thumbnail.jpg',
  heroImage: '/images/projects/figma-content-plugin/hero.jpg',
  overview:
    "I was building a WELT prototype that needed ten teasers filled with real headlines. Open the site, find an article that fits, copy it across: five minutes a teaser, twenty minutes for a page. I built a plugin that does it in one button press. It took two days, and it ended up shipped to every designer at Axel Springer.",
  results: [
    'Content population went from ~5 minutes per teaser to ~5 seconds — roughly 60× faster (observed estimate, not instrumented).',
    'Real publication content in designs, which removed lorem ipsum from the team’s workflow entirely.',
    'Integrated into the Designers Toolkit and distributed to all Axel Springer employees.',
    'First designer on the team to independently ship working software.',
    'Became part of a wider shift toward designer-built tooling across the department.',
  ],
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "I'd been experimenting with AI-assisted development since early 2025, and this was small enough to be a real test of it: could I take a personal annoyance to working, distributable software without help? Two days from idea to functioning plugin.\n\nWhat started as a shortcut for me was formalised when it was added to the Designers Toolkit — the Blatt team's Figma app for design-to-engineering handover, used across Axel Springer.",
      image: 'intro.png',
      imageAspectRatio: '16 / 9',
    },
    {
      id: 'problem',
      title: '',
      image: 'problem.gif',
    },
    {
      id: 'solution',
      title: '',
      image: 'solution.gif',
    },
  ],
}
