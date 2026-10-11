import type { ProjectContent } from '@/lib/projects'

export const upday: ProjectContent = {
  slug: 'upday-news-app-redesign',
  title: 'Upday News App Redesign',
  category: 'Consumer Product / Analytics-led redesign',
  year: '2024–Present',
  role: 'Product Designer — visual and UX direction',
  team: '10-person cross-functional',
  timeline: '~6 months',
  skills: ['Product Design', 'Analytics', 'Brand direction', 'Typography', 'Accessibility'],
  thumbnail: '/images/projects/upday-news-app-redesign/7.jpg',
  heroImage: '/images/projects/upday-news-app-redesign/hero.jpg',
  overview:
    "Upday was Samsung's default news app across Europe — preinstalled on Galaxy devices, rarely chosen. When Samsung replaced it with Google News, upday lost the distribution that made its scale possible and faced the open market for the first time. I led visual and UX direction across a cross-functional team of 10. The analytics we pulled at the start changed what we were designing.",
  results: [
    '+1 million downloads.',
    '500,000 daily active users.',
    'Average session duration doubled: 4 minutes → 8 minutes.',
  ],
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "I set the visual direction and the design system parameters for the new upday, and developed the core flows across feeds, settings, notifications, bookmarks, and AI summaries, with other designers supporting execution. I also led brand direction, proposing the strategic framing that shaped the product's tone.",
    },
    {
      id: 'problem',
      title: '',
      image: 'problem.jpg',
    },
    {
      id: 'research',
      title: '',
      images: ['research-a.png', 'research-b.png'],
      imageAspectRatio: '23 / 11',
    },
    {
      id: 'solution',
      title: '',
      image: 'solution.jpg',
    },
    {
      id: 'feature-01',
      title: '',
      image: 'feature-01-a.jpg',
    },
    {
      id: 'feature-02',
      title: '',
      imageLayout: 'two-col',
      image: 'feature-02-a.jpg',
      image2: 'feature-02-b.jpg',
    },
    {
      id: 'feature-04',
      title: '',
      image: 'feature-04.jpg',
    },
  ],
}
