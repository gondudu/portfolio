'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/shared/AnimatedSection'
import HeroKeyboard from '@/components/home/HeroKeyboard'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-container-sm md:px-container-md lg:px-container pt-24">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">

        {/* Left — text content */}
        <div className="text-left">
          <AnimatedSection variant="fadeIn">
            <motion.h1
              className="font-display font-medium text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-tight"
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
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-0 max-w-xl">
              I design intuitive products that solve real problems and delight users.
              Currently based in Berlin, working with startups and established companies
              to create impactful digital experiences.
            </p>
          </AnimatedSection>
        </div>

        {/* Right — playable keyboard */}
        <AnimatedSection variant="fadeInScale" delay={0.3}>
          <HeroKeyboard />
        </AnimatedSection>

      </div>
    </section>
  )
}
