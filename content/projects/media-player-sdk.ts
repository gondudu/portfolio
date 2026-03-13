import type { ProjectContent } from '@/lib/projects'

export const mediaPlayerSdk: ProjectContent = {
  slug: 'media-player-sdk-axel-springer',
  title: 'Unifying the media experience on Axel Springer products.',
  category: 'Platform Design / Consumer Media',
  year: '2024',
  role: 'Lead Product Designer',
  team: 'Cross-brand (WELT + Bild)',
  timeline: '2024',
  skills: ['Product Design', 'Co-design', 'Heuristic Evaluation'],
  thumbnail: '/images/projects/media-player-sdk-axel-springer/thumbnail.jpg',
  heroImage: '/images/projects/media-player-sdk-axel-springer/hero.jpg',
  overview:
    "WELT and Bild — Axel Springer's two largest news brands — each ran separate video infrastructure contracts, with engineers at both brands independently solving identical problems.",
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
      body: "Management mandated consolidation — one shared player to replace two separate infrastructure contracts. I had been owning the media experience at WELT, which meant I already knew the failure points before the brief arrived. In collaboration with the Bild design team, we defined what a brand-agnostic player would need to be.",
    },
    {
      id: 'problem',
      title: 'Problem',
      body: "Our videos performed well on YouTube. On our own products, they didn't. Users who arrived at an article page faced the same sequence: find the teaser, navigate to the article, locate the video container, press play — and lose the audio the moment they left the page.",
      items: [
        "Core UX failures: article-locked playback, no PiP on iOS, no playlists, no content discovery after a video ended.",
      ],

    },
    {
      id: 'research',
      title: 'Research',
      body: "The team was aligned going in: the UX was broken. What user interviews and analytics gave us was specificity — not 'the experience feels bad' but exactly where trust broke down and why:",
      items: [
        "Video content had too many ads. Users felt they lost control, or that their trust was broken when playing a video.",
        "Users not always knew how much time the video would last. How much time do I need to invest?",
        "50% Users claimed they were not coming to our products looking for videos.",
        "Not the right format. 10% of users didn't identify with the format of the videos being presented: 'too long'.",
        "Users that visited videos with frequency, exalted the documentaries and TV coverages.",
      ],
    },
    {
      id: 'solution',
      title: 'Solution',
      body: "The NMT Media player, grew from a simple Picture-in-Picture integration to a full fledge media player.",
      image: 'hero.jpg',
    },
    {
      id: 'feature-01',
      title: 'Flexibility',
      subtitle: 'Follows you whenever you need',
      body: "The player is available for continuous playback throughout the product and device OS.",
      imageLayout:'two-col',
      image:'solution.jpg', 
      image2:'feature-01-a.jpg' 
    },
    {
      id: 'feature-02',
      title: 'Scalability',
      subtitle: 'Dive into the product',
      body: "The player allows for creating multiple contexts for media content. This should support users in discovering new content and increase user retention.",
      imageLayout:'two-col',
      image:'feature-02-a.jpg'
    },
    {
      id: 'feature-03',
      title: 'Brand agnostic',
      subtitle: 'Built for quick implementation & full expression',
      body: "Colours, typography, iconography, and spacing are brand-specific. Everything else is shared. The risk of a less carefully considered abstraction was a system where one brand felt like the other with different paint. That was avoided.",
    },
  ],
}
