import { blatt } from '@/content/projects/blatt'
import { upday } from '@/content/projects/upday'
import { mediaPlayerSdk } from '@/content/projects/media-player-sdk'
import { figmaContentPlugin } from '@/content/projects/figma-content-plugin'

export interface Section {
  id: string
  title: string
  subtitle?: string
  body?: string
  items?: string[]
  image?: string        // full filename e.g. 'problem.jpg' — if absent, section is imageless (80vh desktop)
  image2?: string       // second image for two-col layout
  images?: string[]     // multiple images — stacked vertically by default, or two-col when imageLayout='two-col'
  imageLayout?: 'full' | 'two-col'  // defaults to 'full' when absent
  imageAspectRatio?: string         // CSS aspect-ratio e.g. '16 / 9', '4 / 3', '1 / 1' — defaults to '16 / 9'
  imageCaption?: string
  video?: { left: string; right: string }  // video pair, mutually exclusive with image
}

export interface ProjectContent {
  slug: string
  title: string
  category: string
  year: string
  role: string
  team?: string
  timeline?: string
  skills?: string[]
  thumbnail: string
  heroImage: string
  overview: string
  tagline?: string
  results: string[]
  nextProject?: string
  sections: Section[]
}

export const projects: ProjectContent[] = [blatt, upday, mediaPlayerSdk, figmaContentPlugin]

export function getProjectBySlug(slug: string): ProjectContent | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getNextProject(currentSlug: string): ProjectContent | undefined {
  const current = projects.find(p => p.slug === currentSlug)
  if (!current) return undefined
  if (current.nextProject) return projects.find(p => p.slug === current.nextProject)
  const idx = projects.findIndex(p => p.slug === currentSlug)
  return projects[(idx + 1) % projects.length]
}