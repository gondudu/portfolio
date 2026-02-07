'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
}

export default function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-block px-8 py-4 rounded-full font-medium text-base transition-all duration-300'

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-opacity-90 hover:scale-105',
    secondary: 'bg-foreground text-white hover:bg-opacity-90 hover:scale-105',
    outline: 'border-2 border-foreground text-foreground hover:bg-foreground hover:text-white hover:scale-105',
  }

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`

  if (href) {
    return (
      <Link href={href}>
        <motion.span
          className={combinedStyles}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {children}
        </motion.span>
      </Link>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={combinedStyles}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}
