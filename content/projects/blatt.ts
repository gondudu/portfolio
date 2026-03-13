import type { ProjectContent } from '@/lib/projects'

export const blatt: ProjectContent = {
  slug: 'nmt-product-suite-design-system',
  title: "Meet Blatt: Axel Springer's Editorial Design System",
  category: 'Design System / Organisational Transformation',
  year: '2024–2026',
  role: 'Product Designer',
  team: 'Cross-brand product teams',
  skills: ['Design Systems', 'UI Design', 'Design Thinking', 'Cross-functional collaboration'],
  thumbnail: '/images/projects/nmt-product-suite-design-system/thumbnail.jpg',
  heroImage: '/images/projects/nmt-product-suite-design-system/hero.jpg',
  overview:
    "Axel Springer SE is Germany's largest digital publishing house and one of the most significant media conglomerates in Europe.",
  results: [
    'Adopted by 8 teams across the organisation',
    'Migration phase active — WELT and Bild currently refactoring components to the Blatt standard.',
    'Automated Figma-to-production CSS pipeline, reducing design-to-dev handoff friction.',
    'Design tokens structured for LLM consumption — AI-assisted on-brand prototyping now possible.',
    'Internal tooling ecosystem built collectively across the design team, distributed company-wide via the Designers Toolkit.',
    'Design function has strategic input on product decisions across brands that it did not have before.',
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
      body: "Competitive audits, a system audit, and internal interviews. Two findings shaped everything that followed.",
      items: [
        "Designers who don't write code think about systems differently — and that gap was at the root of the Figma/production split. Closing it required more than documentation.",
        "Changing tooling is straightforward. Changing how a company thinks about design is not. The cultural resistance was the real constraint — not the technical one.",
      ],
      image: 'research.jpg',
    },
    {
      id: 'solution',
      title: 'Solution',
      body: "Blatt is a design system — shared foundations, tokens, and components that work across Axel Springer's editorial brands. Built to close the gap between how designers think and how developers build.",
      image: 'solution.jpg',
    },
    {
      id: 'feature-01',
      title: '01. Pattern Library & Styleguide',
      subtitle: 'We start by giving the tools designers need',
      body: "Created an immediate speed-up for the team I knew best — early proof of value before asking anyone else to invest. Buy-in preceded governance.",
      items: [
        'Documented conventions',
        'Brand foundations',
        'Figma Pattern libraries and Variables',
        'AI automations and protocols',
      ],
      imageLayout: 'two-col',
      image: 'feature-01-a.jpg',
      image2: 'feature-01-B.jpg',
    },
    {
      id: 'feature-02',
      title: '02. CodeBridge',
      subtitle: 'Connecting Design & Development',
      body: "We created a Figma plugin that allows designers to push system updates directly to GitHub. From there, developers can feed from design tokens and streamline production.",
      imageLayout: 'two-col',
      image: 'feature-02-a.jpg',
    
    },
  
    {
      id: 'feature-03',
      title: '03. Onboarding & Adoption',
      subtitle: 'A word on company culture',
      body: "Tools don't change culture. People do. We ran workshops to close the mental model gap between designers and developers, and onboarding sessions each time a new team joined the system. The goal was never enforcement: it was shared understanding. Teams that understood why the tokens were structured a certain way stopped working around them. Product teams across brands are now collaborators, not just consumers.",
      image: 'feature-03.jpg',
    },
  ],
}
