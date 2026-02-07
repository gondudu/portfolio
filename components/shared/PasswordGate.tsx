'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(false)

  // Set your password here
  const CORRECT_PASSWORD = 'portfolio2024'

  useEffect(() => {
    // Check if already authenticated in session
    const auth = sessionStorage.getItem('portfolio-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('portfolio-auth', 'true')
      setError(false)
    } else {
      setError(true)
      setPassword('')
    }
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary/5 to-accent1/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="font-display font-bold text-3xl mb-2 text-center">
            Protected Portfolio
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Please enter the password to view this portfolio
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                  error
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-200 focus:border-primary'
                }`}
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2"
                >
                  Incorrect password. Please try again.
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Enter Portfolio
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have the password? Contact me for access.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
