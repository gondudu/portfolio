import type { ProjectContent } from '@/lib/projects'

export const blatt: ProjectContent = {
  slug: 'nmt-product-suite-design-system',
  title: "Meet Blatt: Axel Springer's Editorial Design System",
  category: 'Design System / Organisational Transformation',
  year: '2024–2026',
  role: 'Product Designer',
  team: 'Cross-brand product teams',
  timeline: '2024 – ongoing',
  skills: ['Design Systems', 'Figma', 'Workshops', 'Developer Alignment'],
  thumbnail: '/images/projects/nmt-product-suite-design-system/thumbnail.jpg',
  heroImage: '/images/projects/nmt-product-suite-design-system/hero.jpg',
  overview:
    "Axel Springer SE is Germany's largest digital publishing house and one of the most significant media conglomerates in Europe.",
  results: [
    'Adopted by 8 teams across the organisation',
    'Migration phase active — WELT and Bild currently refactoring components to the Blatt standard',
    'Automated Figma-to-production CSS pipeline, reducing design-to-dev handoff friction',
    'Design tokens structured for LLM consumption — AI-assisted on-brand prototyping now possible',
    'Internal tooling ecosystem built collectively across the design team, distributed company-wide via the Designers Toolkit',
    'Design function has strategic input on product decisions across brands that it did not have before',
  ],
  nextProject: 'figma-content-plugin',
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "When I joined Axel Springer, I quickly noticed legacy structures holding back modern product development. That drove me to write my bachelor's thesis on the company's design culture — interviewing colleagues, mapping workflow fragmentation, and identifying what was slowing teams down. That research gave me the credibility to start building Blatt.",
    },
    {
      id: 'problem',
      title: 'Problem',
      body: "The problem was never technical — it was cultural. Designers without engineering context were building in an aesthetically free but system-hostile way: components that looked right in Figma and often broke in production.",
      items: [
        'Teams across Axel Springer editorial brands built independently',
        'Designers worked often without engineering context',
        'Developers and designers lacked a shared vocabulary',
        'Learnings were not always shared and documented',
      ],
      image: 'problem.jpg',
    },
    {
      id: 'research',
      title: 'Research',
      items: [
        'Understand how other companies solve the same problem',
        'Audit the current system looking for synergies and design debt',
        'Interview product teams to understand pain points and opportunities for design',
        'Understand how technology can support workflows',
      ],
    },
    {
      id: 'solution',
      title: 'Solution',
      body: "I started with a pattern library for WELT — an immediate speed-up that created buy-in before any governance existed. I ran workshops and onboarding sessions early — not to document the system, but to make it feel like something colleagues had helped build. The goal wasn't compliance; it was understanding.",
      image: 'solution.jpg',
    },
    {
      id: 'feature-01',
      title: 'Feature 01',
      subtitle: 'Start with a pattern library for WELT, not a company-wide mandate',
      body: "Created an immediate speed-up for the team I knew best — early proof of value before asking anyone else to invest. Buy-in preceded governance.",
    },
    {
      id: 'feature-02',
      title: 'Feature 02',
      subtitle: 'Education before governance — workshops and onboarding before contribution rules',
      body: "Designers needed to understand why the system worked the way it did before following it. Mandating adoption without that understanding generates resistance. Building it generates allies.",
    },
    {
      id: 'feature-03',
      title: 'Feature 03',
      subtitle: 'Align with developers and build a real pipeline, not just a Figma library',
      body: "Syncing naming conventions and repositories made the system live in production code, not just in design files. The mutual education — developers teaching me about codebases, me teaching them about design decisions — is what made the handoff workflow replicable across teams.",
    },
  ],
}
