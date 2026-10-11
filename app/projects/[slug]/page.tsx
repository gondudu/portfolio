import { notFound } from 'next/navigation'
import { ProjectContent, getProjectBySlug, projects } from '@/lib/projects'
import ProjectCaseStudy from '@/components/projects/ProjectPage'

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

  return <ProjectCaseStudy project={project} />
}
