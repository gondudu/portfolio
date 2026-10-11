// ─────────────────────────────────────────────────────────────────────────────
// MORE PROJECTS
// Manage all non-case-study project cards here.
// ─────────────────────────────────────────────────────────────────────────────

export interface MoreProject {
  slug: string
  title: string
  description: string
  thumbnail: string
  thumbnailVideo?: string  // when set, card uses a looping video instead of image
  href?: string            // when set, card links to this page
}

// ─── Project list ─────────────────────────────────────────────────────────────
export const moreProjects: MoreProject[] = [
  {
    slug: 'project-05',
    title: 'UI for AI agent',
    description: 'Concept for an AI agent using Unreal MetaHuman.',
    thumbnail: '/images/projects/project-05/thumbnail.jpg',
  },
  {
    slug: 'project-06',
    title: 'Rhythmus 21 – Sound design',
    description: 'Reimagined soundtrack for Hans Richter classic.',
    thumbnail: '/images/projects/project-06/thumbnail.gif',
    thumbnailVideo: '/images/projects/project-06/thumbnail-video.mp4',
    href: '/projects/project-06',
  },
  {
    slug: 'project-07',
    title: 'Alliance Artists',
    description: 'Visual identity for the Brazilian management agency Alliance Artists.',
    thumbnail: '/images/projects/project-07/thumbnail.jpg',
  },
  {
    slug: 'project-08',
    title: 'Eli Iwasa DJ',
    description: 'Visual identity for Brazilian DJ Eli Iwasa.',
    thumbnail: '/images/projects/project-08/thumbnail.jpg',
  },
  {
    slug: 'project-09',
    title: 'Discoteca Odara',
    description: 'Visual identity for Brazilian label Discoteca Odara.',
    thumbnail: '/images/projects/project-09/thumbnail.gif',
  },
  {
    slug: 'project-10',
    title: 'Paris de Janeiro',
    description: 'Key visuals for French-Brazilian swimwear brand.',
    thumbnail: '/images/projects/project-10/thumbnail.jpg',
  },
]
