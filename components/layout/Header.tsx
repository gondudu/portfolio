'use client'

import { useState, useEffect } from 'react'
import Navigation from './Navigation'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 py-5 border-b border-gray-800 ${
        scrolled ? 'bg-[#111111]/90 backdrop-blur-sm' : 'bg-[#111111]'
      }`}
    >
      <div className="px-4 md:px-8">
        <Navigation scrolled={scrolled} />
      </div>
    </header>
  )
}
