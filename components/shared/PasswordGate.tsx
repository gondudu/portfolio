'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
}

export default function PasswordGate({ children }: Props) {
  const CORRECT_PASSWORD = 'portfolio2024'

  const [password, setPassword]               = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError]                     = useState(false)
  const [attempts, setAttempts]               = useState(0)
  const [visible, setVisible]                 = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  // ── Check session auth ──────────────────────────────────────
  useEffect(() => {
    const auth = sessionStorage.getItem('portfolio-auth')
    if (auth === 'true') setIsAuthenticated(true)
  }, [])

  // ── Lock body scroll while gate is visible ──────────────────
  useEffect(() => {
    if (!isAuthenticated) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      return () => {
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
      }
    }
  }, [isAuthenticated])

  // ── Fade in and focus input ─────────────────────────────────
  useEffect(() => {
    const tid = setTimeout(() => {
      setVisible(true)
      setTimeout(() => inputRef.current?.focus(), 300)
    }, 80)
    return () => clearTimeout(tid)
  }, [])

  // ── Submit handler ──────────────────────────────────────────
  const handleSubmit = () => {
    if (!password.trim()) return
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('portfolio-auth', 'true')
    } else {
      const next = attempts + 1
      setAttempts(next)
      setError(true)
      setPassword('')
      setTimeout(() => setError(false), 2800)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
  }

  // ── Render: authenticated ───────────────────────────────────
  if (isAuthenticated) return <>{children}</>

  // ── Render: gate ────────────────────────────────────────────
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      aria-label="Portfolio access"
    >

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="border-b border-gray-800 py-5 px-4 md:px-8">
        <p className="font-body uppercase tracking-widest text-xs text-foreground">
          Eduardo Nogueira
        </p>
      </div>

      {/* ── Centered form ──────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="font-sans text-lg font-semibold text-foreground mb-3">
              Access required
            </h1>
            <p className="font-body text-xs text-gray-500 mb-10 leading-relaxed">
              This portfolio is password protected.<br />
              Enter the access code to continue.
            </p>

            {/* Input row */}
            <div
              className={`flex items-center gap-4 border-b pb-3 mb-3 transition-colors duration-200 ${
                error ? 'border-red-500' : 'border-gray-700 focus-within:border-gray-400'
              }`}
            >
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false) }}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none font-sans text-sm text-foreground placeholder-gray-600 caret-primary"
                placeholder="Access code"
                autoComplete="off"
                spellCheck={false}
                aria-label="Access code"
              />
              <button
                onClick={handleSubmit}
                disabled={!password.trim()}
                className="font-body uppercase tracking-widest text-xs text-primary disabled:text-gray-700 transition-colors duration-200 cursor-pointer disabled:cursor-default shrink-0"
                aria-label="Submit access code"
              >
                Enter →
              </button>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  className="font-body text-xs text-red-500"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  role="alert"
                >
                  Incorrect password.{attempts >= 3 ? ` ${attempts} failed attempts logged.` : ` Attempt ${attempts}/3.`}
                </motion.p>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      </div>

    </motion.div>
  )
}
