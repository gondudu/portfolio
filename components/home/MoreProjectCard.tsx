'use client'

import { motion } from 'framer-motion'
import type { MoreProject } from '@/content/more-projects'
import { moreProjectStyles as s } from '@/content/more-projects'

interface Props {
  project: MoreProject
}

export default function MoreProjectCard({ project }: Props) {
  return (
    <motion.div whileHover="hover" initial="rest" animate="rest" className="cursor-default">
      <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 3' }}>

        {/* Image with zoom */}
        <motion.div
          className="absolute inset-0"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
          />
        </motion.div>

        {/* Black overlay */}
        <motion.div
          className="absolute inset-0 bg-black"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 0.6 } }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Title + description — desktop hover only */}
        <motion.div
          className="absolute inset-0 hidden md:flex flex-col items-start justify-start py-5 px-6 gap-1"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p style={{
            fontFamily: 'var(--font-jost)',
            fontSize: s.title.fontSize,
            fontWeight: s.title.fontWeight,
            color: '#ffffff',
            lineHeight: s.title.lineHeight,
            margin: 0,
          }}>
            {project.title}
          </p>
          <p style={{
            fontFamily: 'var(--font-jost)',
            fontSize: s.description.fontSize,
            fontWeight: s.description.fontWeight,
            color: 'rgba(255,255,255,0.7)',
            lineHeight: s.description.lineHeight,
            margin: 0,
          }}>
            {project.description}
          </p>
        </motion.div>

      </div>
    </motion.div>
  )
}
