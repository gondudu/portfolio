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
    "Upday was Samsung's default news application across Europe — preinstalled on Galaxy devices, rarely downloaded by choice. When Samsung replaced it in 2024, the product faced the open market for the first time.",
  results: [
    '1 million downloads',
    '10% increase in time on app',
    '4.3 at the Apple Store'
  ],
  nextProject: 'media-player-sdk-axel-springer',
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "The brief was open-ended: upday had just lost its Samsung preinstall deal and needed to migrate its user base to the open market. The product looked dated and felt uninviting — the kind of UI that made sense bundled into a Galaxy device but struggled to justify a voluntary download. I was brought in to lead the UI/UX direction across a cross-functional team of 8.",
    },
    {
      id: 'problem',
      title: 'Problem',
      body: "Upday was a news aggregation app developed as a joint venture between Axel Springer and Samsung, launched in 2016. Its defining feature was a Samsung preinstall deal: it came pre-loaded on Samsung Galaxy devices across Europe, appearing as a swipe-left panel from the home screen — one of the most coveted pieces of mobile real estate in the Android ecosystem. This meant Upday had distribution that most news apps spend years trying to acquire; users didn't need to find it or download it.",
      image: 'problem.jpg',
      items: [
        "Samsung ended the exclusive Upday preinstall partnership around 2022–2023, replacing it with Google News as the default swipe-left news surface on Galaxy devices.",
        "For Upday, this was existential — losing the preinstall meant losing the primary distribution channel that made its scale possible.",
      ],
    },
    {
      id: 'research',
      title: 'Research',
      body: "We went in assuming two things: the app looked too dated to compete, and it was missing features. We pulled the analytics expecting to confirm both. What we found changed the question. 80% of users had never left the top news feed — the personalisation engine, local news, and discovery features the product team treated as differentiators had almost no engaged users. The problem wasn't the missing features. It was: without Samsung as the distribution channel, what reason does anyone have to install this when Google News comes pre-bundled?",
      items: [
        "80% of users had never left the top news feed — personalisation, local news, and discovery features had almost no engaged users",
        "Users had built routines around the app — breaking established habits during migration risked backlash",
        "Power users rely heavily on push notifications",
        "Brand identity was loosely defined and direction",
      ],
      images: ['research-a.png', 'research-b.png'],
      imageAspectRatio: '23 / 11',
    },
    {
      id: 'solution',
      title: 'Solution',
      body: "The new upday is a free, AI-powered news app — editorially curated, built around the 80% use case: fast, reliable access to the top stories. The business model shifted with it: no longer dependent on hardware distribution, the product competes on content curation and usability.",
      image: 'solution.jpg',
    },
    {
      id: 'feature-01',
      title: 'New UI',
      subtitle: 'Redesign of the upday visual identity',
      body: "Introduced new design system for upday, based on Material Design for fast development and brand consistency",
      items: [
        "New Typography – More personality and versatility",
        "New color system — WCAG AA",
        "New news card layout",
        "Marketing collateral",
      ],
      imageLayout: 'two-col',
      image: 'feature-01-a.jpg',
      image2: 'feature-01-b.jpg',
    },
    {
      id: 'feature-02',
      title: 'User Experience',
      subtitle: 'The Informed Commuter & The Passive Scroller ',
      body: "Persona research showed a significant segment consuming news passively — as entertainment, not always as obligation. These formats compete directly with social media for the same idle moments. We mainly kept the upday formula of fast and snackable news, and enhanced the feature set around the identified user behaviours.",
      items: [
        "Optimise for the check-in format: concise bulletpoints, explainer snippets, and well-tuned push notifications.",
        "Focus on short video, visual storytelling, and content designed for sharing.",
      ],
      imageLayout: 'two-col',
      image: 'feature-02-a.jpg',
      image2: 'feature-02-b.jpg',
    },
    {
      id: 'feature-03',
      title: 'AI Summaries',
      subtitle: '',
      body: "We introduced AI summaries and explainers on the natural flow of users, to test users interaction and interest for the feature. Current numbers show that most users still just scan headlines.",
      image: 'feature-03.jpg',
    }, 
  ],
}
