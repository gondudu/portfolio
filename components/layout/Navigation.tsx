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
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="flex items-center justify-between">
      <Link href="/" className="group">
        <motion.h1
          className={`font-display font-medium transition-all duration-300 ${
            scrolled ? 'text-xl' : 'text-2xl'
          }`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Eduardo <span className="text-primary">Nogueira</span>
        </motion.h1>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative group"
              >
                <span
                  className={`text-base font-medium transition-colors duration-300 ${
                    isActive ? 'text-foreground' : 'text-gray-500'
                  } group-hover:text-foreground`}
                >
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
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
            className="fixed inset-0 bg-white z-40 md:hidden"
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
                        className={`text-3xl font-medium transition-colors duration-300 ${
                          isActive ? 'text-foreground' : 'text-gray-500'
                        } group-hover:text-foreground`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
