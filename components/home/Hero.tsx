'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/shared/AnimatedSection'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-container-sm md:px-container-md lg:px-container pt-24">
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedSection variant="fadeIn">
          <motion.h1
            className="font-display font-medium text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Product Designer crafting{' '}
            <span className="relative">
              <span className="relative z-10">meaningful</span>
              <motion.span
                className="absolute bottom-2 left-0 right-0 h-3 bg-accent1 -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </span>{' '}
            digital experiences
          </motion.h1>
        </AnimatedSection>

        <AnimatedSection variant="fadeInUp" delay={0.2}>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            I design intuitive products that solve real problems and delight users.
            Currently based in Lisbon, working with startups and established companies
            to create impactful digital experiences.
          </p>
        </AnimatedSection>

        <AnimatedSection variant="fadeInUp" delay={0.4}>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex flex-col items-center gap-2 text-gray-400"
            >
              <span className="text-sm uppercase tracking-wider">Scroll to explore</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M12 19L5 12M12 19L19 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
