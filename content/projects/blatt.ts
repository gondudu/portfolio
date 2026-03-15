import type { ProjectContent } from '@/lib/projects'

export const blatt: ProjectContent = {
  slug: 'nmt-product-suite-design-system',
  title: "Blatt: Axel Springer's Editorial Design System",
  category: 'Design System / Cross-brand Infrastructure',
  year: '2024–2026',
  role: 'Product Designer',
  team: 'Cross-brand product teams',
  skills: ['Design Systems', 'UI Design', 'Design Thinking', 'Cross-functional collaboration'],
  thumbnail: '/images/projects/nmt-product-suite-design-system/thumbnail.jpg',
  heroImage: '/images/projects/nmt-product-suite-design-system/intro.jpg',
  overview:
    "Axel Springer is Germany’s largest digital publishing house. In Berlin, two major editorial brands — WELT and Bild — share the same building and technology department, yet operated with completely separate design and development workflows. I initiated and led Blatt, a cross-brand design system now adopted by 8 teams across the organisation.",
  results: [
    'Design function gained strategic input on product decisions across WELT and Bild — influence it did not have before the system existed.',
    'Adopted by 8 teams across the organisation.',
    'WELT and Bild in active migration — component-by-component refactoring to Blatt standard now underway.',
    'Figma-to-production CSS automated via Style Dictionary — design tokens publish directly to GitHub, eliminating manual export.',
    'Token architecture structured for LLM consumption, enabling AI-assisted on-brand prototyping across any brand in the system.',
    'CodeBridge and the Designers Toolkit built collectively by the design team and distributed company-wide via our organization account.',
  ],
  nextProject: 'figma-content-plugin',
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "My bachelor’s thesis at CODE University mapped the design fragmentation across Axel Springer’s editorial brands — interviews with designers, developers, and product owners, combined with two years of first-hand experience on WELT. That research became the business case. It also gave me the credibility to propose what followed.\n\nWhen I joined full-time, I turned the thesis into a plan, assembled a cross-brand task force across WELT, Bild, and EditorialOne, and started building. I defined the token architecture, conducted the full component audit for WELT, rebuilt all components and variables in Figma, and ran workshops bridging the gap between designers and front-end development. Together, the task force built CodeBridge and the Designers Toolkit — tools none of us had been asked to build.",
    },
    {
      id: 'research',
      title: 'Research',
      body: "Research based on interviews with designers, developers, and product owners — plus two years of first-hand experience — revealed a fragmented product development culture.",
      items: [
        "Almost no documented product principles. Senior knowledge stayed in people’s heads.",
        "Designers recreated components from scratch for every task.",
        "Products were inconsistent and full of usability problems with no logical scalability.",
        "Code mirrored the chaos: on WELT’s web app, every component was styled manually and context-dependent. Changing a button meant finding every instance individually.",
      ],
      image: 'research.jpg',
    },
    {
      id: 'solution',
      title: 'Solution',
      body: "Blatt is built around a shared semantic token layer where token names are consistent across brands but resolve to different values per brand. Each brand keeps its identity; everyone speaks the same language. Theming and responsiveness are handled natively from the start, in Figma and in code. Style Dictionary translates tokens into any development language, making the system platform-agnostic. Governance workflows for component reviews, updates, and version tracking keep the system alive over time.",
      image: 'solution.jpg',
    },
    {
      id: 'feature-01',
      title: 'Phase 01',
      subtitle: 'Pattern library & styleguide',
      body: "We started by auditing each brand’s existing system and establishing shared ground rules. This produced documented conventions for tokens, components, and file structure, along with brand foundations covering colours, typography, iconography, spacing, and scale. We built Figma pattern libraries, a complete variable system, and AI automations for repositories and workflows.",
      imageLayout: 'two-col',
      image: 'feature-01-a.jpg',
      image2: 'feature-01-b.jpg',
    },
    {
      id: 'feature-02',
      title: 'Phase 02',
      subtitle: 'Connecting design & development',
      body: "Fitting migration work into overwhelmed developer roadmaps was the hardest challenge — this had no direct sales impact, and I was doing it on top of my regular WELT responsibilities. So we flipped the question: what if designers could support developers in the migration?",
      imageLayout: 'two-col',
      image: 'feature-02-a.jpg',
      image2: 'feature-02-b.jpg',
      items: [
        "When we struggled to get a Token Studio license, my colleague Mario asked: “How about we build it ourselves?” That became CodeBridge, a Figma plugin that exports tokens directly to GitHub. The Designers Toolkit followed the same logic — built for a specific Bild problem, then extended across brands. Building our own tools meant we understood them completely and could adapt them to our exact workflow.",
        "We mapped migration feasibility with developers, adapted to each front-end system, and created design system repositories where designers made pull requests for the first time at this company. We also coded Style Dictionary functions that are now used in production.",
      ],
    
    },
  
    {
      id: 'feature-03',
      title: 'Phase 03',
      subtitle: 'Adoption',
      body: "There was no resistance, but there was a real learning curve. Most designers hadn’t adopted Figma variables and didn’t know how to code. Understanding system principles felt like homework to them. \n\nEverything changed when teams saw the results: prototypes, instant theming, responsive layouts that just worked. My own relationship with developers improved noticeably — far less friction than colleagues not using the system. The difference in speed was noticeable and my colleagues wanted in.\n\nWe scaled adoption through workshops, onboarding sessions, and by distributing the Designers Toolkit company-wide with repeatable materials so the system could grow without the task force driving every conversation.\n\nThe hardest ongoing challenge isn't adoption — it's time. Management expects measurable results on quarterly cycles. Design systems require 12–18 months before the value is visible in product metrics. Without sustained organisational patience, roadmap space disappears and the migration stalls before it completes. Getting that understanding embedded at leadership level is still active work.",
      image: 'feature-03.jpg',
    },
  ],
}
