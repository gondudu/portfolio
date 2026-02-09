'use client'

import Image from 'next/image'
import { Project } from '@/lib/projects'
import AnimatedSection from '@/components/shared/AnimatedSection'

interface ProjectContentProps {
  project: Project
}

export default function ProjectContent({ project }: ProjectContentProps) {
  return (
    <div className="py-section-sm md:py-section-md lg:py-section px-container-sm md:px-container-md lg:px-container">
      <div className="max-w-4xl mx-auto">
        {/* Overview */}
        <AnimatedSection variant="fadeInUp" className="mb-20">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Overview</h2>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-800">
            {project.overview}
          </p>
        </AnimatedSection>

        {/* Challenge */}
        <AnimatedSection variant="fadeInUp" className="mb-20">
          <h2 className="text-2xl md:text-3xl font-display font-medium mb-6">
            The Challenge
          </h2>
          <p className="text-lg leading-loose text-gray-700">
            {project.challenge}
          </p>
        </AnimatedSection>

        {/* Image Gallery */}
        {project.images.length > 0 && (
          <AnimatedSection variant="fadeInScale" className="mb-20">
            <div className="grid grid-cols-1 gap-8">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video overflow-hidden bg-gray-100"
                >
                  <Image
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Solution */}
        <AnimatedSection variant="fadeInUp" className="mb-20">
          <h2 className="text-2xl md:text-3xl font-display font-medium mb-6">
            The Solution
          </h2>
          <p className="text-lg leading-loose text-gray-700">
            {project.solution}
          </p>
        </AnimatedSection>

        {/* Results */}
        <AnimatedSection variant="fadeInUp" className="mb-20">
          <h2 className="text-2xl md:text-3xl font-display font-medium mb-8">
            Results & Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.results.map((result, index) => (
              <div
                key={index}
                className="md:aspect-square p-4 bg-gray-50 hover:border-gray-300 transition-colors duration-300"
              >
                <p className="text-2xl md:text-2xl font-display font-medium leading-tight text-primary">
                  {result}

                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
