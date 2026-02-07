'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/shared/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-container-sm md:px-container-md lg:px-container">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display font-bold text-8xl md:text-9xl mb-4 text-primary">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Page not found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/">
            <Button variant="primary">Back to home</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
