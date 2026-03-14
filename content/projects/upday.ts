import type { ProjectContent } from '@/lib/projects'

export const upday: ProjectContent = {
  slug: 'upday-news-app-redesign',
  title: 'Upday News App Redesign',
  category: 'Mobile App / News Platform',
  year: '2024–Present',
  role: 'Product Designer',
  team: '10-person cross-functional',
  timeline: '~6 months',
  skills: ['UI/UX Design', 'Analytics', 'Typography', 'Accessibility'],
  thumbnail: '/images/projects/upday-news-app-redesign/thumbnail.jpg',
  heroImage: '/images/projects/upday-news-app-redesign/hero.jpg',
  overview:
    "Upday was Samsung’s default news app across Europe — preinstalled on Galaxy devices, rarely downloaded by choice. When Samsung replaced it with Google News around 2022–2023, upday lost the distribution channel that made its scale possible. The product faced the open market for the first time, looking dated and feeling uninviting. I was brought in to lead the visual and UX direction across a cross-functional team of 10.",
  results: [
    '+1 million downloads',
    '500,000 daily active users',
    'Average session duration increased from 4 min to 8 min',
    
  ],
  nextProject: 'media-player-sdk-axel-springer',
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "I defined the visual direction and design system parameters for the new upday. I developed the core user flows across feeds, settings, notifications, bookmarks, and AI summaries, with other designers supporting execution on these tasks. I also led the brand direction, proposing the strategic framing that shaped the product’s tone and personality.",
    },
    {
      id: 'problem',
      title: 'Problem',
      body: "Upday was a joint venture between Axel Springer and Samsung, launched in 2016. Its defining advantage was distribution: it came pre-loaded on Galaxy devices across Europe as a swipe-left panel from the home screen — one of the most coveted pieces of mobile real estate in Android. Users didn’t need to find it or download it. \n\nWhen Samsung ended that deal, the question became existential: without the preinstall, why would anyone choose this over Google News?",
      image: 'problem.jpg',
    },
    {
      id: 'research',
      title: 'Research',
      body: "We went in assuming the app looked too dated to compete and was missing features. The analytics told a different story. 80% of users had never left the top news feed. The personalisation engine, local news, and discovery features the product team treated as differentiators had almost no engaged users. The problem wasn’t missing features — it was that the core use case was simpler than anyone had designed for. \n\n We also found that users had built strong habits around the app, checking it a few times a day either out of routine or triggered by push notifications. Power users relied heavily on those notifications. These were behaviours worth protecting — breaking established habits during the migration risked losing the audience we still had.",
      images: ['research-a.png', 'research-b.png'],
      imageAspectRatio: '23 / 11',
    },
    {
      id: 'solution',
      title: 'Solution',
      body: "The new upday is a free, AI-powered news app — editorially curated, built around the 80% use case: fast, reliable access to the top stories. No longer dependent on hardware distribution, the product competes on content curation and usability.",
      image: 'solution.jpg',
    },
    {
      id: 'feature-01',
      title: 'Brand direction',
      subtitle: 'Redesign of the upday visual identity',
      body: "The previous product used Roboto and had no distinguishable personality. As we were trying to make upday competitive in the open market, having a brand that stands out and that users can identify was crucial. I proposed several strategic directions using my branding background, framing the product against mottos like “Your world. On time. Always,” “For Every Way You Live,” and “What will you do next?” These helped us define the tone we were looking for: accessible, reliable, and fast. This matched how users already described the product during research, and aligned with our go-to-market strategy.",
      image: 'feature-01-a.jpg',
    },
    {
      id: 'feature-02',
      title: 'Design system and UI',
      subtitle: 'Redesign of the upday visual identity',
      body: "The app was built on Flutter, so instead of fighting the system, we opted to reuse existing Material Design components and style them to our needs. This gave us the development speed the timeline demanded. My concern was removing the generic Android-app feeling — I succeeded in the concepts, but implementation proved more difficult than expected. We often faced trade-offs between style and usability, and always favoured usability. \n\nThe new typography was chosen for readability and personality. The new colour system meets WCAG AA standards. The redesigned news card layout reflects the core use case: quick scrolling, short cards, easy to read and scan for users who check the app a few times a day and want to get caught up fast.",
      imageLayout: 'two-col',
      image: 'feature-02-a.jpg',
      image2: 'feature-02-b.jpg',
    },
    {
      id: 'feature-03',
      title: 'User Experience',
      subtitle: 'The Informed Commuter & The Passive Scroller ',
      body: "User research identified two key segments: the Informed Commuter and the Passive Scroller. A significant portion consumes news passively — as entertainment, not obligation — competing directly with social media for the same idle moments. Our goal was to enhance the experience for the habitual check-in use case while increasing time on site. We kept upday’s formula of fast, snackable news and shaped the feature set around the behaviours we observed: concise content, well-tuned push notifications, and a UI built for scanning. Early tests revealed potential in short videos and games for user retention, so we introduced both to validate them in the product.",
      imageLayout: 'two-col',
      image: 'feature-03-a.jpg',
      image2: 'feature-03-b.jpg',
    },
    {
      id: 'feature-04',
      title: 'AI Summaries',
      body: "I placed AI summaries directly on the news cards — the surface users are most aware of — to test interaction and interest without disrupting the natural reading flow. Current numbers show that most users still scan headlines, but the feature is live and we’re actively learning from it. We’re now experimenting with connecting specific AI agents to pieces of content, currently limited to summaries of why a story matters to the reader. \n\n I believe AI can be introduced with purpose in news products — comparisons, small tasks, and analysis that support users on specific topics and upday is a good playground for Axel Springer to explore what AI for consumers actually looks like.",
      image: 'feature-04.jpg',
    }, 
  ],
}
