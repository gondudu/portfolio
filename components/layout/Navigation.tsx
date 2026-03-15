'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface NavigationProps {
  scrolled: boolean
}

export default function Navigation({ scrolled }: NavigationProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const links = [
    { href: '/', label: 'Work' },
    { href: '/about', label: 'About' },
  ]

  const contactHref = 'mailto:eduardobnog@gmail.com'

  return (
    <nav className="flex items-center justify-between">
      <Link href="/">
        <h1 className="font-body uppercase tracking-widest text-xs text-foreground">
          Eduardo Nogueira • Product Designer
        </h1>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 items-center">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative group"
              >
                <span
                  className={`font-sans text-xs font-medium transition-colors duration-300 ${
                    isActive ? 'text-foreground' : 'text-gray-300'
                  } group-hover:text-foreground`}
                >
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ffb731]"
                    layoutId="activeLink"
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  />
                )}
              </Link>
            </li>
          )
        })}
        <li>
          <a
            href={contactHref}
            className="font-sans text-xs font-medium text-black bg-[#ffb731] hover:bg-[#e6a520] transition-colors duration-300 rounded-full px-4 py-1 inline-flex items-center gap-1.5"
          >
            Get in touch
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.52002 9.57605C2.52002 9.12005 2.80802 8.73605 3.38402 8.59205L19.32 4.36805C19.536 4.32005 19.896 4.24805 20.088 4.24805C21.048 4.24805 21.48 4.82405 21.48 5.52005C21.48 5.78405 21.36 6.16805 21.216 6.45605L14.88 19.104C14.664 19.536 14.256 19.776 13.8 19.776C13.416 19.776 13.128 19.608 12.864 19.368L10.56 17.28L8.35202 19.344C7.53602 20.088 6.48002 19.656 6.48002 18.576V13.608L2.92802 10.44C2.66402 10.2 2.52002 9.88805 2.52002 9.57605ZM11.5608 15.9474C12.2321 16.5416 12.9178 17.1486 13.656 17.808L19.08 7.10405L8.64002 13.344C9.65934 14.2643 10.5952 15.0926 11.5608 15.9474ZM4.84802 9.93605L16.92 6.62405L7.34402 12.192L4.84802 9.93605ZM8.08802 17.376L9.40802 16.176L8.08802 14.976V17.376Z" fill="currentColor"/>
            </svg>
          </a>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-50"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <motion.span
          className="w-6 h-0.5 bg-foreground transition-all"
          animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-foreground transition-all"
          animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-foreground transition-all"
          animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#111111] z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {links.map((link) => {
                const isActive = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="relative group"
                    >
                      <span
                        className={`font-sans text-xl font-medium transition-colors duration-300 ${
                          isActive ? 'text-foreground' : 'text-gray-300'
                        } group-hover:text-foreground`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href={contactHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-sans text-xl font-medium text-gray-300 hover:text-foreground transition-colors duration-300"
                >
                  Contact
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
