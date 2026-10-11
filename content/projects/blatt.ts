import type { ProjectContent } from '@/lib/projects'

export const blatt: ProjectContent = {
  slug: 'nmt-product-suite-design-system',
  title: "Blatt: Axel Springer's Editorial Design System",
  category: 'Design System / Cross-brand Infrastructure',
  year: '2024–2026',
  role: 'Senior Product Designer — initiated and led',
  team: 'Cross-brand task force: WELT, Bild, EditorialOne',
  skills: ['Design Systems', 'Design Tokens', 'Governance', 'Cross-functional collaboration', 'Workshop facilitation'],
  thumbnail: '/images/projects/nmt-product-suite-design-system/thumbnail.jpg',
  heroImage: '/images/projects/nmt-product-suite-design-system/intro.jpg',
  overview:
    "Axel Springer SE owns several editorial brands. In Berlin they share a building and a technology department — and ran completely separate design and development workflows. I mapped that fragmentation in my bachelor's thesis, turned the research into a business case, and led the cross-brand design system that came out of it. Blatt is now adopted by 8 teams.",
  results: [
    'Adopted by 8 teams across the organisation.',
    'WELT and Bild in active migration — component-by-component refactoring to the Blatt standard.',
    'Figma-to-production CSS automated via Style Dictionary: tokens publish straight to GitHub, no manual export step.',
    'Token architecture structured for LLM consumption — AI-assisted prototyping now produces on-brand output for any brand in the system.',
    'CodeBridge and the Designers Toolkit built by the design team and distributed company-wide.',
    'Design gained standing in product decisions across WELT and Bild — influence the function did not have before the system existed.',
  ],
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "My bachelor's thesis at CODE University mapped the design fragmentation across Axel Springer's editorial brands — interviews with designers, developers, and product owners, combined with two years of first-hand work on WELT. That research became the business case, and the credibility to propose what followed.\n\nWhen I joined full-time I turned the thesis into a plan, assembled a task force across WELT, Bild, and EditorialOne, and started building. I defined the token architecture, ran the full component audit for WELT, rebuilt every component and variable in Figma, and facilitated the workshops that connected designers to front-end development. The task force built CodeBridge and the Designers Toolkit along the way — tools nobody had asked us for.",
    },
    {
      id: 'research',
      title: 'Research',
      subtitle: 'Where the real problem was',
      body: "The obvious read was that WELT and Bild needed a shared component library. Two brands, two sets of the same buttons — build the library once, done.\n\nInterviews with designers, developers, and product owners said otherwise. The duplication in Figma was the visible half. The expensive half was in the code: on WELT's web app every component was styled manually and context-dependent, so changing a button meant finding every instance individually. A shared Figma library would have sat on top of that and changed nothing.\n\nSo the problem was never the components. It was that nothing resolved — no shared vocabulary between design and code, and no documented principles to appeal to when they diverged. That reframed Blatt from a library into a token architecture with governance attached.",
      items: [
        'Almost no documented product principles — senior knowledge lived in people’s heads.',
        'Designers rebuilt components from scratch for every task.',
        'Products were inconsistent, full of usability problems, and had no path to scale.',
        'Code mirrored the chaos: every component styled manually and context-dependent.',
      ],
      image: 'research.jpg',
    },
    {
      id: 'solution',
      title: 'Solution',
      body: "Blatt is built on a shared semantic token layer: token names are identical across brands, values resolve differently per brand. Each brand keeps its identity; everyone speaks the same language.\n\nWe chose semantic tokens over a component library because a library only fixes what designers see. Tokens fix what ships. Theming and responsiveness are handled natively from the start, in Figma and in code, and Style Dictionary translates tokens into any development language — so the system is platform-agnostic rather than bound to whichever front-end each brand happens to run.\n\nGovernance workflows for component review, updates, and version tracking are what keep it alive after the launch enthusiasm wears off.",
      image: 'solution.jpg',
    },
    {
      id: 'feature-01',
      title: 'Phase 01',
      subtitle: 'Pattern library and ground rules',
      body: "We audited each brand's existing system and agreed shared conventions for tokens, components, and file structure — then documented them, because the research had shown that undocumented principles are the same as no principles.\n\nThat produced brand foundations for colour, typography, iconography, spacing, and scale; Figma pattern libraries; a complete variable system; and AI automations for the repositories and workflows around them.",
      imageLayout: 'two-col',
      image: 'feature-01-a.jpg',
      image2: 'feature-01-b.jpg',
    },
    {
      id: 'feature-02',
      title: 'Phase 02',
      subtitle: 'Connecting design and development',
      body: "The hardest constraint was roadmap space. Migration had no direct sales impact, and I was doing it on top of my regular WELT responsibilities — so asking overwhelmed developer teams to absorb it was never going to work.\n\nWe flipped the question: instead of asking developers for migration time, what could designers do to remove it? That inverted the whole second phase.",
      imageLayout: 'two-col',
      image: 'feature-02-a.jpg',
      image2: 'feature-02-b.jpg',
      items: [
        "When we couldn't get a Token Studio license approved, my colleague Mario asked: how about we build it ourselves? That became CodeBridge, a Figma plugin that exports tokens directly to GitHub. The Designers Toolkit followed the same logic — built for a specific Bild problem, then extended across brands. Building our own meant we understood them completely and could bend them to our workflow instead of the reverse.",
        'We mapped migration feasibility with developers, adapted to each front-end system, and set up design system repositories where designers opened pull requests for the first time at this company. We also wrote Style Dictionary functions that are now running in production.',
      ],
    },
    {
      id: 'feature-03',
      title: 'Phase 03',
      subtitle: 'Adoption, and what it cost',
      body: "There was no resistance, but there was a real learning curve. Most designers hadn't adopted Figma variables and didn't code. System principles felt like homework.\n\nWhat changed minds wasn't the argument — it was the demo. Prototypes, instant theming, responsive layouts that just worked. My own relationship with developers improved noticeably; there was visibly less friction than for colleagues not using the system, and that difference is what made people want in. We scaled from there through workshops, onboarding sessions, and distributing the Designers Toolkit company-wide with repeatable material, so growth didn't depend on the task force being in every conversation.\n\nThe honest problem isn't adoption — it's time. Management measures on quarterly cycles. A design system takes 12–18 months before the value shows up in product metrics. Without sustained organisational patience the roadmap space disappears and the migration stalls before it completes. Getting that understood at leadership level is still unfinished work, and it's the part I'd do differently: I built the system before I built the case for the timeline.",
      image: 'feature-03.jpg',
    },
  ],
}
