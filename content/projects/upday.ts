import type { ProjectContent } from '@/lib/projects'

export const upday: ProjectContent = {
  slug: 'upday-news-app-redesign',
  title: 'Upday News App Redesign',
  category: 'Mobile App / News Platform',
  year: '2024–Present',
  role: 'Lead Product Designer',
  team: '10-person cross-functional',
  timeline: '~6 months',
  skills: ['UI/UX Design', 'Analytics', 'Typography', 'Accessibility'],
  thumbnail: '/images/projects/upday-news-app-redesign/thumbnail.jpg',
  heroImage: '/images/projects/upday-news-app-redesign/hero.jpg',
  overview:
    "Upday was Samsung's default news application across Europe — preinstalled on Galaxy devices, never downloaded by choice. When Samsung replaced it in 2024, the product faced the open market for the first time. A cross-functional team inside Axel Springer had roughly six months to ship a version that could survive without the preinstall. I led UI/UX as part of this team.",
  results: [
    '1 million users migrated',
    '10% increase in user retention',
    '20% increase in time spent in app',
  ],
  nextProject: 'media-player-sdk-axel-springer',
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "Upday was Samsung's default news application across Europe — preinstalled on Galaxy devices, never downloaded by choice. When Samsung replaced it in 2024, the product faced the open market for the first time. A cross-functional team — developers, product owners, business managers, the CTO, and me leading UI/UX — had roughly six months to ship a version that could survive without the preinstall.",
    },
    {
      id: 'problem',
      title: 'Problem',
      body: "We audited the existing product, collected analytics, and mapped user behaviour against four news consumption moments. The data reframed the problem.",
      items: [
        "80% of users had never left the top news feed — personalisation, local news, and discovery features had almost no engaged users",
        "Local news retained a loyal niche (~19%) — I used engagement data from sister publications to argue for keeping it. Timeline and infrastructure cost won.",
        "Accent colour #1DB8DA failed WCAG contrast on buttons and chips against white (~2.7:1) — identified during audit, not flagged externally",
        "Users had built routines around the app — breaking established habits during migration risked backlash",
      ],
      image: 'problem.jpg',
    },
    {
      id: 'research',
      title: 'Research',
      items: [
        "Local news and the aggregator model were cut despite engagement data supporting their retention — timeline and infrastructure cost won",
        "Google Fonts instead of professional typefoundry licences — a reasonable constraint-driven compromise, but a compromise on typographic craft",
        "No documented component standards existed — every component decision had to be made from scratch, adding significant time",
      ],
    },
    {
      id: 'solution',
      title: 'Solution',
      body: "Navigation went from five tabs to four: Top News, My News, Shorts, and Games. Profile moved to the top bar. Discover and Local were cut — despite my advocating for Local's retention with data. Two typefaces replaced Roboto: Freeman for display and Gothic A1 for body — both Google Fonts. Brand colour moved from #1DB8DA to #002BFF.",
      image: 'solution.jpg',
    },
    {
      id: 'feature-01',
      title: 'Feature 01',
      subtitle: 'Rebuild navigation around the 80% use case — four tabs instead of five',
      body: "Discover and Local were cut despite my advocating for Local's retention with data. The decision was driven by infrastructure cost and the shift to an AI-editorial backend. Profile moved to the top bar. The aggregator model ended with this redesign.",
    },
    {
      id: 'feature-02',
      title: 'Feature 02',
      subtitle: 'Introduce Shorts and Games for Time-Filler audiences',
      body: "Persona research showed a significant segment consuming news passively — as entertainment, not obligation. These formats compete directly with social media for the same idle moments. I was genuinely convinced — this was not a compromise.",
    },
    {
      id: 'feature-03',
      title: 'Feature 03',
      subtitle: 'Redesign brand foundation and rebuild component library',
      body: "Freeman and Gothic A1 replaced Roboto — both Google Fonts, avoiding typefoundry costs. Brand colour moved from #1DB8DA to #002BFF, proposed based on colours the brand had used historically. Component library rebuilt from the ground up, validated across seven language editions.",
    },
    {
      id: 'feature-04',
      title: 'Feature 04',
      subtitle: 'Release in parallel with Samsung edition to test assumptions',
      body: "First version launched while the Samsung edition was still active. This let us observe real usage patterns with a smaller user base before full migration — testing persona research assumptions against actual behaviour.",
    },
  ],
}
