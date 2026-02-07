import { notFound } from 'next/navigation'
import { getProjectBySlug, projects } from '@/lib/projects'
import ProjectHero from '@/components/projects/ProjectHero'
import ProjectContent from '@/components/projects/ProjectContent'
import ProjectNavigation from '@/components/projects/ProjectNavigation'

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Eduardo Nogueira`,
    description: project.overview,
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <ProjectHero project={project} />
      <ProjectContent project={project} />
      <ProjectNavigation currentSlug={params.slug} />
    </>
  )
}
