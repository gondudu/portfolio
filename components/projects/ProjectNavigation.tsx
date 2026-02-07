'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { getNextProject } from '@/lib/projects'

interface ProjectNavigationProps {
  currentSlug: string
}

export default function ProjectNavigation({ currentSlug }: ProjectNavigationProps) {
  const nextProject = getNextProject(currentSlug)

  return (
    <div className="border-t border-gray-200 py-12 px-container-sm md:px-container-md lg:px-container">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <Link href="/" className="group">
          <motion.div
            className="flex items-center gap-2 text-gray-600 hover:text-foreground transition-colors"
            whileHover={{ x: -8 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 10H1M1 10L10 1M1 10L10 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-medium">Back to all projects</span>
          </motion.div>
        </Link>

        {nextProject && (
          <Link href={`/projects/${nextProject.slug}`} className="group">
            <motion.div
              className="flex items-center gap-2 text-gray-600 hover:text-foreground transition-colors"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-medium">Next project</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 10H19M19 10L10 1M19 10L10 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </Link>
        )}
      </div>
    </div>
  )
}
