import { projects } from '@/lib/projects'
import AnimatedSection from '@/components/shared/AnimatedSection'
import ProjectCard from './ProjectCard'

export default function ProjectGrid() {
  return (
    <div className="mx-auto px-4 md:px-8 py-section">
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
