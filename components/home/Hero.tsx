'use client'

import AnimatedSection from '@/components/shared/AnimatedSection'
import HeroKeyboard from '@/components/home/HeroKeyboard'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-container-sm md:px-container-md lg:px-container pt-24">
      <AnimatedSection variant="fadeInScale" delay={0.2}>
        <HeroKeyboard />
      </AnimatedSection>
    </section>
  )
}
