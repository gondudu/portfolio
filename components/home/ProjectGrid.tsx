import { featuredProjects } from '@/lib/projects'
import { moreProjects, moreProjectStyles as s } from '@/content/more-projects'
import AnimatedSection from '@/components/shared/AnimatedSection'
import ProjectCard from './ProjectCard'
import MoreProjectCard from './MoreProjectCard'

export default function ProjectGrid() {
  return (
    <div className="mx-auto px-4 md:px-8 py-24">

      {/* Most recent */}
      <AnimatedSection variant="fadeInUp">
        <p className={`${s.sectionLabel.fontFamily} ${s.sectionLabel.fontSize} ${s.sectionLabel.color} ${s.sectionLabel.tracking} uppercase mb-6`}>
          Most recent
        </p>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {featuredProjects.map((project, i) => (
          <AnimatedSection key={project.slug} variant="fadeInUp" delay={i * 0.08}>
            <ProjectCard project={project} />
          </AnimatedSection>
        ))}
      </div>

      {/* More work */}
      <AnimatedSection variant="fadeInUp">
        <p className={`${s.sectionLabel.fontFamily} ${s.sectionLabel.fontSize} ${s.sectionLabel.color} ${s.sectionLabel.tracking} uppercase mt-20 mb-6`}>
          More work
        </p>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {moreProjects.map((project, i) => (
          <AnimatedSection key={project.slug} variant="fadeInUp" delay={i * 0.08}>
            <MoreProjectCard project={project} />
          </AnimatedSection>
        ))}
      </div>

    </div>
  )
}
