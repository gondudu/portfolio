'use client'

import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects } from '@/lib/projects'
import AnimatedSection from '@/components/shared/AnimatedSection'

export default function ProjectGrid() {
  return (
    <section className="py-section-sm md:py-section-md lg:py-section px-container-sm md:px-container-md lg:px-container">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection variant="fadeInUp" className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-4">
            Selected Work
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
            A collection of projects where I've helped teams ship products that users love.
          </p>
        </AnimatedSection>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
