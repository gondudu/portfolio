import type { ProjectContent } from '@/lib/projects'

export const mediaPlayerSdk: ProjectContent = {
  slug: 'media-player-sdk-axel-springer',
  title: 'Unifying the media experience on Axel Springer products',
  category: 'Platform Design / Consumer Media',
  year: '2024',
  role: 'Lead Product Designer',
  team: '2 developers • 3 product designers • UX researcher',
  skills: ['UI Design', 'UX Design', 'Design System'],
  thumbnail: '/images/projects/media-player-sdk-axel-springer/thumbnail.jpg',
  heroImage: '/images/projects/media-player-sdk-axel-springer/hero.jpg',
  overview:
    "WELT and Bild — Axel Springer’s two largest news brands — each ran separate media playback infrastructure contracts for audio and video, with engineers at both brands independently solving identical problems and relying on third-party systems. Management formed a small team to develop a single player to replace these separate systems. I had been owning the media experience at WELT for over a year, which meant I already had the data, the research, and a clear map of the failure points before the brief arrived.",
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
      body: "I defined the UX architecture for the new player and led the design direction across a team of two product designers (from Bild and WELT apps), two developers, and a UX researcher. The other designers executed screens based on the architecture I set. In collaboration with the design teams, we shaped what a brand-agnostic player would need to be — designing a neutral base where each brand could override specific elements without one feeling like a reskin of the other.",
    },
    {
      id: 'problem',
      title: 'Problem',
      body: "Numbers show that our media performs better on YouTube and Spotify than in our own products. This tells us something about the current experience. Users who arrived at the home page faced the same sequence: navigate the home, find a news card, navigate to the article, locate the video container, press play, and lose the content the moment they left the page.",
      items: [
        "There was no picture-in-picture on iOS, no playlists, no meaningful content discovery after a piece ended. Audio was particularly harder to find — users had to locate inline widgets buried in articles and listen to episodes one by one.",
        "In addition, the current user groups are not tech-savvy multitasking millennials. A solution had to find a sweet spot that would be understandable by the older generation and inviting to the younger ones.",
      ],
      image:'problem.png',

    },
    {
      id: 'research',
      title: 'Research',
      body: "The team was aligned going in: the UX was broken. What user interviews and analytics gave us was specificity — not “the experience feels bad” but exactly where trust broke down and why.",
      items: [
        "Users felt they lost control when playing a video. Ad loads were too heavy and broke trust — though ad strategy was outside my scope, this finding shaped how carefully I treated every interaction in the player. Users didn’t always know how long a video would last or how much time they’d need to invest. 10% said the format itself didn’t resonate: too long, too broadcast-TV. On the other hand, users who watched regularly valued the documentaries and long-form TV coverage; however, these numbers were unexpressive.",
        "The biggest insight I took away was about the gap between broadcast media and digital media tone. The best-performing news content today — and they seem reluctant to accept it — is content that brings users close to the story: video explainers where a reporter speaks directly to camera, podcasts with interviewees who make a subject feel accessible. News brands need to learn the tone and formats of digital media, or they will lose this audience entirely. A lot of my visual direction was shaped by this belief: bringing the product to a standard users already expect from the platforms they use daily.",
      ],
    },
    {
      id: 'solution',
      title: 'Solution',
      body: "What started as a simple picture-in-picture integration grew into a full media player SDK — a single foundation for Bild and WELT’s apps.",
      image: 'solution.jpg',
    },
    {
      id: 'feature-01',
      title: 'Flexibility',
      subtitle: 'Follows you whenever you need',
      body: "The player follows users throughout the product and device OS, enabling continuous playback that doesn’t die when you navigate away. The biggest challenge was placing an overlay on top of already busy news pages — home and section pages are dense with headlines and images, while article pages are calmer. On top of that, an existing advertising contract prohibited overlaying certain parts of the product. I was firmly against this constraint and surprised by the organisation’s unwillingness to push back, but it’s the reality of news media: advertisers often have more power than internal teams. We had to break established UX patterns and develop a custom solution that respected both the ad contract and the user experience.",
      imageLayout:'two-col',
      image:'feature-01-b.mp4',
      image2:'solution-a.mp4',
    },
    {
      id: 'feature-02',
      title: 'Scalability',
      subtitle: 'Dive into the product',
      body: "The core idea was a scrollable, overlay-based player — closer to Spotify than to a traditional embedded player. When you open a piece of media, the player unfolds a library in front of you: more like this, more episodes, show notes, and whatever else supports discovery and editorial curation.",
      items: [
        "This meant we could wrap content in new ways without interfering with existing product pages and layouts.",
        "A critical design decision was to separate audio and video flows. Research showed that mixing formats in a single stream was disorienting — when users enter a video flow, they expect more videos to follow. Blending in audio content would break that expectation and, combined with preroll ads on every media insertion, would erode trust further.",
        "Keeping the formats distinct preserved user confidence in what would happen next. However, if users want to build mixed audio and video playlists, the player allows them to do so.",
      ],
      imageLayout:'two-col',
      image:'feature-02-a.mp4'
    },
    {
      id: 'feature-03',
      title: 'Brand agnostic',
      subtitle: 'Built for quick implementation & full expression',
      body: "Colours, typography, iconography, and spacing are brand-specific. Everything else is shared. We designed a neutral base and let each brand override specific elements, so the player feels native to WELT and native to Bild without one reading as a reskin of the other. The risk of a less considered abstraction was exactly that — a system where one brand felt like the other with different paint. That was avoided.",
      imageLayout: 'two-col',
      image:'feature-03.jpg',
    },
  ],
}
