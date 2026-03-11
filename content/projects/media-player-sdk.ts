import type { ProjectContent } from '@/lib/projects'

export const mediaPlayerSdk: ProjectContent = {
  slug: 'media-player-sdk-axel-springer',
  title: 'Media Player SDK',
  category: 'Platform Design / Consumer Media',
  year: '2024',
  role: 'Lead Product Designer',
  team: 'Cross-brand (WELT + Bild)',
  timeline: '2024',
  skills: ['Product Design', 'Co-design', 'Heuristic Evaluation'],
  thumbnail: '/images/projects/media-player-sdk-axel-springer/thumbnail.jpg',
  heroImage: '/images/projects/media-player-sdk-axel-springer/hero.jpg',
  overview:
    "WELT and Bild — Axel Springer's two largest news brands — each ran separate video infrastructure contracts, with engineers at both brands independently solving identical problems. I came into this project already knowing WELT's media experience from the inside: I'd mapped its failure points through heuristic evaluation before the brief existed. The cost consolidation mandate gave us the opening to fix what I'd already found.",
  results: [
    '8% improvement in media retention',
    '15% increase in audio consumption',
    'Shipped to WELT and Bild iOS apps within 6 months',
    'Eliminated duplicate infrastructure contracts across brands',
    'Single SDK foundation for all future Axel Springer media products',
  ],
  nextProject: 'nmt-product-suite-design-system',
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "WELT and Bild ran separate contracts with video infrastructure providers. Developers at both brands were independently solving the same problems. Management's goal was consolidation and cost reduction. My goal: use that mandate to fix a user experience that had been falling behind for years. I came in with a head start — having already mapped WELT's media UX through heuristic evaluation before the project brief existed.",
      image: 'intro.jpg',
    },
    {
      id: 'problem',
      title: 'Problem',
      body: "Our videos performed well on YouTube. On our own products, they didn't. Users who arrived at an article page faced the same sequence: find the teaser, navigate to the article, locate the video container, press play — and lose the audio the moment they left the page.",
      items: [
        "Video performed well on YouTube but not on own products — isolating the experience, not the content, as the problem",
        "Core UX failures: article-locked playback, no PiP on iOS, no playlists, no content discovery after a video ended",
        "WELT audience primarily SEO-driven cold-start users; Bild audience direct traffic habitual returners — different behaviours, shared friction",
        "No external user testing conducted — internal stakeholder reviews used to mitigate risk; I would not make this call again",
      ],
      image: 'problem.jpg',
    },
    {
      id: 'research',
      title: 'Research',
      items: [
        "No external user testing — too fast. Internal reviews and stakeholder walkthroughs mitigated risk but left uncertainty about real user behaviour",
        "Brand autonomy over player trigger design — WELT chose teaser-to-PiP without a new page; I disagreed on grounds of visual density",
        "Video discovery still broken post-launch — the player works; the path to it doesn't",
      ],
    },
    {
      id: 'solution',
      title: 'Solution',
      body: "I led the design alongside one designer from WELT and one from Bild, working in shared Figma files. I set the design vision and architecture; brand designers defined how it had to express each brand. The result: a shared behavioural core — persistent PiP, continuous audio, playlist and suggestion patterns — with a flexible visual layer on top.",
      image: 'solution.jpg',
    },
    {
      id: 'feature-01',
      title: 'Feature 01',
      subtitle: 'Scope the MVP to the two highest-impact fixes: persistent PiP and continuous audio',
      body: "Article-locked audio was the clearest drop-off point. Scoping tightly gave the project measurable success criteria and a delivery cycle fast enough to get management support.",
    },
    {
      id: 'feature-02',
      title: 'Feature 02',
      subtitle: 'Co-design with one designer from each brand, not design for them',
      body: "I set the structural vision and component architecture. Brand designers from WELT and Bild defined the visual criteria. The final system reflected real constraints from each product — not assumptions from the outside.",
    },
    {
      id: 'feature-03',
      title: 'Feature 03',
      subtitle: 'Shared behavioural core with a flexible visual layer',
      body: "Colours, typography, iconography, and spacing are brand-specific. Everything else is shared. The risk of a less carefully considered abstraction was a system where one brand felt like the other with different paint. That was avoided.",
    },
  ],
}
