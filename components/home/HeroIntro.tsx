'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import SpaceshipConsole from './SpaceshipConsole'
import VHSOverlay from './VHSOverlay'

type Phase = 'gate' | 'playing' | 'transitioning' | 'terminal'

// Start cross-fade 2 seconds before video ends
const TRANSITION_START = 8

export default function HeroIntro() {
  const [phase, setPhase] = useState<Phase>('gate')
  const [consoleReady, setConsoleReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const transitionStartedRef = useRef(false)

  const handleEnter = () => {
    setPhase('playing')
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {
        setPhase('terminal')
        setConsoleReady(true)
      })
    }
  }

  const handleTimeUpdate = () => {
    if (
      !transitionStartedRef.current &&
      videoRef.current &&
      videoRef.current.currentTime >= TRANSITION_START
    ) {
      transitionStartedRef.current = true
      setPhase('transitioning')
      setTimeout(() => {
        setPhase('terminal')
        setConsoleReady(true)
      }, 2200)
    }
  }

  const handleVideoEnd = () => {
    if (!transitionStartedRef.current) {
      transitionStartedRef.current = true
      setPhase('transitioning')
      setTimeout(() => {
        setPhase('terminal')
        setConsoleReady(true)
      }, 2200)
    }
  }

  const isFading = phase === 'transitioning' || phase === 'terminal'
  const showTerminal = phase === 'transitioning' || phase === 'terminal'

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
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handleEnter}
              className="font-console tracking-[0.4em] cursor-pointer select-none transition-opacity duration-200 hover:opacity-60"
              style={{ color: '#33ff00', fontSize: '18px' }}
            >
              ENTER
            </button>
          </div>
        </div>
      )}

      {/* ── Video layer — fades out during transition ── */}
      {phase !== 'terminal' && (
        <div
          className="absolute inset-0"
          style={{
            opacity: isFading ? 0 : 1,
            transition: isFading ? 'opacity 2.2s ease-in-out' : 'none',
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
            onEnded={handleVideoEnd}
            onError={() => { setPhase('terminal'); setConsoleReady(true) }}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* ── Terminal — fades in during transition ── */}
      {showTerminal && (
        <div
          className="absolute inset-0"
          style={{
            animation: phase === 'transitioning' ? 'fadeIn 2.2s ease-in-out forwards' : 'none',
          }}
        >
          <SpaceshipConsole ready={consoleReady} />
          <VHSOverlay />
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
