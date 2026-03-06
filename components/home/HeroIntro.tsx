'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import SpaceshipConsole from './SpaceshipConsole'

type Phase = 'gate' | 'playing' | 'fading' | 'terminal'

// Start fade 8 seconds into the video (or on video end)
const TRANSITION_START = 8

export default function HeroIntro() {
  const searchParams = useSearchParams()
  const initialView = searchParams.get('view') ?? undefined

  const [phase, setPhase] = useState<Phase>(() => initialView ? 'terminal' : 'gate')
  const [consoleReady, setConsoleReady] = useState(false)
  const [skipBoot, setSkipBoot] = useState(() => !!initialView)
  const videoRef = useRef<HTMLVideoElement>(null)
  const transitionStartedRef = useRef(false)

  // When arriving with ?view=..., mount terminal then immediately mark ready
  useEffect(() => {
    if (initialView) {
      const tid = setTimeout(() => setConsoleReady(true), 100)
      return () => clearTimeout(tid)
    }
  }, [initialView])

  // Boot the hardware console: CRT scan-on → terminal boot sequence
  const bootConsole = () => {
    setPhase('terminal')
    // Delay so the terminal mounts with ready=false first, then the effect
    // fires cleanly when ready transitions false→true (avoids React StrictMode
    // double-invoke cancelling the boot sequence on the first mount).
    setTimeout(() => setConsoleReady(true), 100)
  }

  // Begin fading video to black, then boot
  const startFade = () => {
    if (transitionStartedRef.current) return
    transitionStartedRef.current = true
    setPhase('fading')
    setTimeout(bootConsole, 1500)
  }

  const handleEnter = () => {
    setPhase('playing')
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(bootConsole)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= TRANSITION_START) {
      startFade()
    }
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">

      {/* ── Gate: blurred first frame + ENTER ── */}
      {phase === 'gate' && (
        <div className="absolute inset-0">
          <Image
            src="/hero-frames/01.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ filter: 'blur(12px) brightness(0.45)', transform: 'scale(1.05)' }}
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <button
              onClick={handleEnter}
              className="font-console tracking-[0.4em] cursor-pointer select-none transition-opacity duration-200 hover:opacity-60"
              style={{ color: '#33ff00', fontSize: '18px' }}
            >
              ENTER SPACESHIP
            </button>
            <button
              onClick={() => { setSkipBoot(true); bootConsole() }}
              className="font-console cursor-pointer select-none transition-opacity duration-200 hover:opacity-60"
              style={{ color: '#1a8a00', fontSize: '12px', letterSpacing: '0.2em' }}
            >
              SKIP INTRO
            </button>
          </div>
        </div>
      )}

      {/* ── Video: pre-mounted in gate (hidden) so ref is ready on ENTER ── */}
      {phase !== 'terminal' && (
        <div
          className="absolute inset-0"
          style={{
            opacity: phase === 'fading' ? 0 : 1,
            transition: phase === 'fading' ? 'opacity 1.5s ease-in-out' : 'none',
            visibility: phase === 'gate' ? 'hidden' : 'visible',
          }}
        >
          <video
            ref={videoRef}
            src="/seedance1-5-pro_Video_20260304_193612.mp4"
            poster="/hero-frames/01.jpg"
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={startFade}
            onError={bootConsole}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* ── Terminal ── */}
      {phase === 'terminal' && (
        <div className="absolute inset-0">
          <SpaceshipConsole ready={consoleReady} skipBoot={skipBoot} initialView={initialView} />
        </div>
      )}

    </div>
  )
}
