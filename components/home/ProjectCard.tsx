'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { ProjectContent } from '@/lib/projects'

interface Props {
  project: ProjectContent
  linked?: boolean
}

export default function ProjectCard({ project, linked = true }: Props) {
  const Wrapper = linked
    ? ({ children }: { children: React.ReactNode }) => (
        <Link href={`/projects/${project.slug}`} className="group block">{children}</Link>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <div className="group block cursor-default">{children}</div>
      )

  return (
    <Wrapper>
      <motion.div whileHover="hover" initial="rest" animate="rest">
        <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
          {/* Image with zoom */}
          <motion.div
            className="absolute inset-0"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Black overlay */}
          <motion.div
            className="absolute inset-0 bg-black"
            variants={{ rest: { opacity: 0 }, hover: { opacity: 0.6 } }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Title — desktop hover only */}
          <motion.div
            className="absolute inset-0 hidden md:flex items-start justify-start py-5 px-6"
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-sans font-bold text-white text-xl text-left leading-tight">
              {project.title}
            </h2>
          </motion.div>
        </div>
      </motion.div>
    </Wrapper>
  )
}
