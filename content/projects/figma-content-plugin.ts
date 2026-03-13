import type { ProjectContent } from '@/lib/projects'

export const figmaContentPlugin: ProjectContent = {
  slug: 'figma-content-plugin',
  title: 'Figma Content Plugin',
  category: 'Internal Tool / Side Project',
  year: '2025',
  role: 'Designer + Developer',
  team: 'Solo',
  timeline: '2025',
  skills: ['UX Design', 'Claude Code', 'Figma'],
  thumbnail: '/images/projects/figma-content-plugin/thumbnail.jpg',
  heroImage: '/images/projects/figma-content-plugin/hero.jpg',
  overview:
    "While working for WELT, I was creating a prototype that needed real news content — ten teasers, populated with actual headlines and text. The manual process: open the website, find an article that fits, copy it in. Five minutes per teaser, twenty minutes minimum for a full page.",
  results: [
    '60x faster content population: ~5 minutes per teaser → ~5 seconds (observed estimate).',
    'Real publication content in designs, eliminating lorem ipsum entirely.',
    'Integrated into the Designers Toolkit — distributed to all Axel Springer employees.',
    'First designer on the team to independently ship working software.',
    'Contributed to a wider movement of designer-built tooling.',
  ],
  nextProject: 'upday-news-app-redesign',
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "I had been experimenting with vibe coding since 2025 — this was a chance to test what was possible. I built the concept in two days. What started as a personal shortcut was formalised when it was added as a feature to the Designers Toolkit — the Blatt team's Figma app for R&D handover, used across Axel Springer.",
      video: {
        left: '/images/Screen Recording 2026-03-09 at 20.37.53.mov',
        right: '/images/2.Screen Recording 2026-03-09 at 20.37.53.mov',
      },
    },
    {
      id: 'problem',
      title: 'Problem',
      body: "Our multilingual team populated mockups with placeholder text by default — hunting through live publications when they needed something real, guessing how German character counts would behave, discovering that designs broke in production when the real content arrived. It was a daily friction point that compounded across every designer, every project.",
      items: [
        "Every designer on the team encountered the same friction daily — populating mockups with real content was a manual process with no shortcut",
        "German character counts, line breaks, and typographic behaviour were unpredictable with placeholder text — designs regularly broke in production",
        "Colleagues validated the problem before the tool existed — I knew this was a shared pain, not a personal one",
      ],
      image: 'problem.gif'
    },
    {
      id: 'solution',
      title: 'Solution',
      body: "A Figma plugin with a single button. Press it: selected text layers populate with live content from the publication's RSS feed. No configuration, no field mapping, no options. The interface is terminal-style — less intrusive than the original keygen concept, and consistent with the toolkit's design language. V1 scraped the website directly, but switching to RSS made the plugin stable and distributable — a requirement once colleagues wanted to use it too.",
      image: 'solution.gif',
    },
  ],
}
