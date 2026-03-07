'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import SpaceshipConsole from './SpaceshipConsole'

export default function HeroIntro() {
  const searchParams = useSearchParams()
  const initialView = searchParams.get('view') ?? undefined

  const [consoleReady, setConsoleReady] = useState(false)
  const skipBoot = !!initialView

  // Mount terminal then mark ready (small delay lets component settle)
  useEffect(() => {
    const tid = setTimeout(() => setConsoleReady(true), 100)
    return () => clearTimeout(tid)
  }, [])

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <SpaceshipConsole ready={consoleReady} skipBoot={skipBoot} initialView={initialView} />
      </div>
    </div>
  )
}
