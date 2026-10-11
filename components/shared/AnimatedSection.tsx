'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

/**
 * Scroll-triggered reveal. Deliberately minimal — Swiss layouts are static,
 * so this is a short fade with an 8px rise and nothing else.
 */
interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'fadeIn' | 'fadeInUp'
}

const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  },
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  variant = 'fadeInUp',
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants[variant]}
      transition={{ duration: 0.3, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
