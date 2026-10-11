import type { ProjectContent } from '@/lib/projects'

export const mediaPlayerSdk: ProjectContent = {
  slug: 'media-player-sdk-axel-springer',
  title: 'Unifying the media experience on Axel Springer products',
  category: 'Platform Architecture / Cross-brand SDK',
  year: '2024',
  role: 'Lead Product Designer — owned the UX architecture',
  team: '3 product designers • 2 developers • 1 UX researcher',
  skills: ['Platform Architecture', 'Design Systems', 'Design leadership', 'UX Research'],
  thumbnail: '/images/projects/media-player-sdk-axel-springer/thumbnail.jpg',
  heroImage: '/images/projects/media-player-sdk-axel-springer/hero.jpg',
  overview:
    "WELT and Bild each ran their own media playback contracts for audio and video, with engineers at both brands independently solving identical problems on top of third-party systems. Management formed a small team to replace both with one player. I had owned the media experience at WELT for over a year, so I arrived with the data, the research, and a map of the failure points already in hand — and turned a picture-in-picture request into a platform SDK.",
  results: [
    '8% improvement in media retention.',
    '15% increase in audio consumption.',
    'Shipped to the WELT and Bild iOS apps within 6 months.',
    'Eliminated duplicate media infrastructure contracts across both brands.',
    'One SDK foundation now underpinning all future Axel Springer media products.',
  ],
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: "I defined the UX architecture for the new player and led design direction across a team of two other product designers (from the WELT and Bild apps), two developers, and a UX researcher. I set the architecture; they executed screens against it — my job was to make those decisions legible enough that they could.\n\nThe shared question we had to answer first was what a brand-agnostic player actually is: a neutral base each brand could override in specific places, without either one reading as a reskin of the other.",
    },
    {
      id: 'problem',
      title: '',
      image: 'problem.png',
    },
    {
      id: 'research',
      title: 'Research',
      subtitle: 'What we already agreed on, and what we had wrong',
      body: "The team went in aligned: the UX was broken. Everyone knew that. What interviews and analytics gave us wasn't confirmation — it was the location of the damage, and one finding that moved the project somewhere none of us had planned.",
      items: [
        'Users felt they lost control when a video started. Ad loads were heavy enough to break trust — ad strategy sat outside my scope, but that finding shaped how carefully I treated every interaction in the player. People often didn’t know how long a video would run or how much time they were committing.',
        'Then the finding that reframed it: 10% said the format itself didn’t resonate — too long, too broadcast-TV. The best-performing news media today is the material that brings a viewer close to the story: an explainer where a reporter talks straight to camera, a podcast where the interviewee makes a subject feel reachable. The gap wasn’t only the player. It was the distance between broadcast tone and digital tone, and no amount of interface work fixes that on its own.',
        'That is why the visual direction pushes toward what people already expect from the platforms they use daily. We could not change the editorial formats, but we could stop the container from making them feel further away.',
      ],
    },
    {
      id: 'solution',
      title: '',
      image: 'solution.jpg',
    },
    {
      id: 'feature-01',
      title: '',
      imageLayout: 'two-col',
      image: 'feature-01-b.mp4',
      image2: 'solution-a.mp4',
    },
    {
      id: 'feature-02',
      title: '',
      imageLayout: 'two-col',
      image: 'feature-02-a.mp4',
    },
    {
      id: 'feature-03',
      title: '',
      imageLayout: 'two-col',
      image: 'feature-03.jpg',
    },
  ],
}
