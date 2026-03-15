import { projects } from '@/lib/projects'
import AnimatedSection from '@/components/shared/AnimatedSection'
import ProjectCard from './ProjectCard'

export default function ProjectGrid() {
  return (
    <div className="mx-auto px-4 md:px-8 py-12">
      <AnimatedSection variant="fadeInUp">
        <div className="mb-10">
          <h1 className="font-sans text-2xl md:text-3xl font-bold text-foreground">Eduardo Nogueira</h1>
          <p className="font-body text-sm text-gray-400 mt-1">Product Designer</p>
        </div>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, i) => (
          <AnimatedSection key={project.slug} variant="fadeInUp" delay={i * 0.08}>
            <ProjectCard project={project} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}
