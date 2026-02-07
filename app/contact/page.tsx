'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/shared/AnimatedSection'

export default function ContactPage() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/eduardo-nogueira',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: 'Dribbble',
      url: 'https://dribbble.com/eduardo-nogueira',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path
            d="M19.5 8.5C17 11 13 12 9 12s-5-1-5-3M7 19.5c1-3 3.5-7 8-7s6 3 8 5.5M14 4.5C13 8 12 12 12 16s1 5 2 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: 'Behance',
      url: 'https://behance.net/eduardo-nogueira',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 8h6a3 3 0 1 1 0 6H3V8zm0 6h6a3 3 0 1 1 0 6H3v-6zM14 7h6M18 14a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen pt-32 pb-20 px-container-sm md:px-container-md lg:px-container">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection variant="fadeIn">
          <motion.h1
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Let&apos;s work together
          </motion.h1>
        </AnimatedSection>

        <AnimatedSection variant="fadeInUp" delay={0.2}>
          <p className="text-xl md:text-2xl text-gray-600 mb-16 max-w-2xl">
            I&apos;m always interested in hearing about new projects and opportunities.
            Feel free to reach out!
          </p>
        </AnimatedSection>

        {/* Contact Information */}
        <AnimatedSection variant="fadeInUp" delay={0.3}>
          <div className="mb-16">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-6">
              Get in touch
            </h2>

            <div className="space-y-6">
              <motion.a
                href="mailto:eduardo.nogueira@example.com"
                className="group block"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-primary"
                    >
                      <path
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-lg font-medium group-hover:text-primary transition-colors">
                      eduardo.nogueira@example.com
                    </p>
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="https://calendly.com/eduardo-nogueira"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent1/10 flex items-center justify-center group-hover:bg-accent1/20 transition-colors">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-accent1"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M16 2v4M8 2v4M3 10h18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Schedule a call</p>
                    <p className="text-lg font-medium group-hover:text-accent1 transition-colors">
                      Book a 30-minute call
                    </p>
                  </div>
                </div>
              </motion.a>
            </div>
          </div>
        </AnimatedSection>

        {/* Social Links */}
        <AnimatedSection variant="fadeInUp" delay={0.4}>
          <div>
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-6">
              Connect with me
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-xl border-2 border-gray-200 hover:border-primary transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="text-gray-600 group-hover:text-primary transition-colors">
                      {link.icon}
                    </div>
                    <span className="font-medium">{link.name}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Location */}
        <AnimatedSection variant="fadeInUp" delay={0.5}>
          <div className="mt-16 p-8 rounded-2xl bg-gray-50">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent4/20 flex items-center justify-center flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-accent4"
                >
                  <path
                    d="M10 10.625C11.0355 10.625 11.875 9.78553 11.875 8.75C11.875 7.71447 11.0355 6.875 10 6.875C8.96447 6.875 8.125 7.71447 8.125 8.75C8.125 9.78553 8.96447 10.625 10 10.625Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M10 17.5C10 17.5 16.25 12.5 16.25 8.75C16.25 5.29822 13.4518 2.5 10 2.5C6.54822 2.5 3.75 5.29822 3.75 8.75C3.75 12.5 10 17.5 10 17.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl mb-2">Based in Berlin</h3>
                <p className="text-gray-600">
                  Currently working with clients worldwide, but always happy to meet in
                  person if you&apos;re in the area.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
