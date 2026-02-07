'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { Project } from '@/lib/projects'

interface ProjectHeroProps {
  project: Project
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3])

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax Image */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative h-full flex items-end pb-20 px-container-sm md:px-container-md lg:px-container"
      >
        <div className="max-w-4xl text-white">
          <motion.p
            className="text-sm md:text-base uppercase tracking-wider mb-4 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {project.category} • {project.year}
          </motion.p>

          <motion.h1
            className="font-display font-medium text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {project.role}
          </motion.p>

          {/* Accent Line */}
          <motion.div
            className="h-1 w-24 bg-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </div>
      </motion.div>
    </div>
  )
}
