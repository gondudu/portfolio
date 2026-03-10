'use client'

import React, { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MOTHER_RESPONSES, BOOT_SEQUENCE, MUTHUR_LOGO, MISSION_LOGS, CREW_MANIFEST } from '@/lib/console-data'
import { projects } from '@/lib/projects'
import { useTerminalQueue } from '@/hooks/useTypewriter'
import { useConsoleAudio } from '@/hooks/useConsoleAudio'
import StatusGrid from './StatusGrid'
import SonarScanner from './SonarScanner'
import XenomorphAnim from './XenomorphAnim'

type ActiveView = 'chat' | 'mission-logs' | 'crew' | 'threat'
type LogoPhase = 'hidden' | 'in' | 'out'

const LOGO_DETAILS = [
  '──────────────────────────────────────────────────────────────────────',
  'WEYLAND-YUTANI CORP.  /  BUILD: 2101.06  /  S/N: MU6K-4892-77A',
  'USCSS NOSTROMO  /  CAPTAIN: N. EDUARDO  /  CLASS M COMMERCIAL TOWING VEHICLE',
  'STARDATE 2122.04.12  /  DESTINATION: LV-426  /  CREW: 7 PERSONNEL',
]

interface Props {
  alertMode: boolean
  ready?: boolean
  skipBoot?: boolean
  initialView?: string
  onSecretOrder?: () => void
  onButtonPress?: (id: string) => void
}

const NAV_TABS: { id: ActiveView; label: string; btnId: string; subtitle: string }[] = [
  { id: 'chat', label: 'Terminal', btnId: 'MU-TH-UR', subtitle: '[QUERY TERMINAL]' },
  { id: 'mission-logs', label: 'Missions', btnId: 'mission-logs', subtitle: '[PORTFOLIO]' },
  { id: 'crew', label: 'Profile', btnId: 'crew-manifest', subtitle: '[ABOUT]' },
  
]

const VALID_VIEWS: ActiveView[] = ['chat', 'mission-logs', 'crew', 'threat']

export default function MUTHURTerminal({ alertMode, ready = false, skipBoot = false, initialView, onSecretOrder, onButtonPress }: Props) {
  const router = useRouter()
  const { completedLines, currentDisplay, enqueue } = useTerminalQueue()
  const { startAmbientHum, playKeyClick, playButtonPress, startAlertAlarm, stopAlertAlarm, playBootBeep } = useConsoleAudio()
  const prevDisplayLenRef = useRef(0)
  const [inputValue, setInputValue] = useState('')
  const [activeView, setActiveView] = useState<ActiveView>(
    VALID_VIEWS.includes(initialView as ActiveView) ? (initialView as ActiveView) : 'chat'
  )
  const [logoPhase, setLogoPhase] = useState<LogoPhase>('hidden')
  const [logoLines, setLogoLines] = useState(0)
  const [uiVisible, setUiVisible] = useState(false)
  const outputRef = useRef<HTMLDivElement>(null)
  const sequenceStartedRef = useRef(false)
  // Tracks if MU-TH-UR terminal has been booted — boot sequence only runs once
  const terminalBootedRef = useRef(skipBoot || initialView === 'chat')
  const [xenomorphDetected, setXenomorphDetected] = useState(false)
  const [statusPulse, setStatusPulse] = useState(0)
  const pulse = () => setStatusPulse(p => p + 1)
  const [selectedCrewId, setSelectedCrewId] = useState<string>('nogueira')
  const [crewDetailOpen, setCrewDetailOpen] = useState(false) // mobile slide-in
  const [crewFading, setCrewFading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  // ── Mission prompt (post-boot interactive options) ──────────
  const [promptState, setPromptState] = useState<'idle' | 'showing' | 'done'>('idle')
  const [selectedOption, setSelectedOption] = useState(0)
  const promptShownRef = useRef(false)
  const promptEnqueuedRef = useRef(false)

  const selectCrew = (id: string) => {
    if (id === selectedCrewId) { setCrewDetailOpen(true); return }
    setCrewFading(true)
    setTimeout(() => { setSelectedCrewId(id); setCrewFading(false) }, 80)
    setCrewDetailOpen(true)
    pulse()
  }

  // Stardate — updates every minute
  const getStardate = () => {
    const now = new Date()
    return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}.${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`
  }
  const [stardate, setStardate] = useState('')
  useEffect(() => {
    setStardate(getStardate())
    const interval = setInterval(() => setStardate(getStardate()), 60000)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll chat output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [completedLines, currentDisplay])

  // Staggered UI fade-in on mount
  useEffect(() => {
    const tid = setTimeout(() => setUiVisible(true), 80)
    return () => clearTimeout(tid)
  }, [])

  // On ready: ambient hum only
  useEffect(() => {
    if (!ready || sequenceStartedRef.current) return
    sequenceStartedRef.current = true
    startAmbientHum()
  }, [ready, startAmbientHum])

  // Boot MU-TH-UR: fires once when activeView first becomes 'chat'.
  // useEffect approach guarantees cleanup and avoids stale-closure issues.
  useEffect(() => {
    if (activeView !== 'chat' || terminalBootedRef.current) return
    terminalBootedRef.current = true

    const tids: ReturnType<typeof setTimeout>[] = []
    const t = (fn: () => void, ms: number) => { const id = setTimeout(fn, ms); tids.push(id) }

    t(() => setLogoPhase('in'), 200)

    let elapsed = 280
    const totalLines = MUTHUR_LOGO.length + LOGO_DETAILS.length
    for (let n = 1; n <= totalLines; n++) {
      const line = n
      t(() => { setLogoLines(line); playBootBeep(line - 1) }, elapsed)
      elapsed += n <= MUTHUR_LOGO.length ? 160 : 120
    }

    t(() => setLogoPhase('out'), elapsed + 2000)
    t(() => { setLogoPhase('hidden'); enqueue(BOOT_SEQUENCE, 12) }, elapsed + 2000 + 800)

    return () => tids.forEach(clearTimeout)
  }, [activeView, playBootBeep, enqueue])

  // Secret button sequence event
  useEffect(() => {
    const handler = () => enqueue(MOTHER_RESPONSES.secret_sequence, 50)
    window.addEventListener('mother-secret-sequence', handler)
    return () => window.removeEventListener('mother-secret-sequence', handler)
  }, [enqueue])

  // Auto-destroy event
  useEffect(() => {
    const handler = () => {
      setActiveView('chat')
      terminalBootedRef.current = true // skip animation for event-driven switches
      enqueue(MOTHER_RESPONSES.auto_destroy, 60)
    }
    window.addEventListener('mother-auto-destroy', handler)
    return () => window.removeEventListener('mother-auto-destroy', handler)
  }, [enqueue])

  // Xenomorph identification event
  useEffect(() => {
    let tid: ReturnType<typeof setTimeout>
    const handler = () => {
      setXenomorphDetected(true)
      setActiveView('chat')
      terminalBootedRef.current = true // skip animation for event-driven switches
      enqueue(MOTHER_RESPONSES.xenomorph_identified, 55)
      // Match the 10s alert window then restore Nostromo panel
      tid = setTimeout(() => setXenomorphDetected(false), 10000)
    }
    window.addEventListener('xenomorph-found', handler)
    return () => {
      window.removeEventListener('xenomorph-found', handler)
      clearTimeout(tid)
    }
  }, [enqueue])

  // Typewriter click — fire on each new character added to currentDisplay
  useEffect(() => {
    const len = currentDisplay?.length ?? 0
    if (len > prevDisplayLenRef.current) {
      playKeyClick()
    }
    prevDisplayLenRef.current = len
  }, [currentDisplay, playKeyClick])

  // Alert alarm sounds
  const prevAlertRef = useRef(false)
  useEffect(() => {
    if (alertMode && !prevAlertRef.current) {
      startAlertAlarm()
      enqueue(
        [
          '⚠ ⚠ ⚠ PROXIMITY ALERT ⚠ ⚠ ⚠',
          'HOSTILE ENTITY DETECTED.',
          'ALL PERSONNEL TO EMERGENCY STATIONS.',
          'INITIATING CONTAINMENT PROTOCOL...',
        ],
        30,
      )
    }
    if (!alertMode && prevAlertRef.current) {
      stopAlertAlarm()
      enqueue(['ALERT MODE CLEARED. RESUMING NORMAL OPERATIONS.'], 25)
    }
    prevAlertRef.current = alertMode
  }, [alertMode, enqueue, startAlertAlarm, stopAlertAlarm])

  // Step 1 — detect boot completion, enqueue prompt lines
  useEffect(() => {
    if (promptShownRef.current) return
    const last = completedLines[completedLines.length - 1]
    if (last !== 'TYPE QUERY TO PROCEED.') return
    if (currentDisplay !== null) return
    promptShownRef.current = true
    setTimeout(() => {
      enqueue([' ', '> MISSION LOGS AVAILABLE.', '> CREW RECORDS AND PROJECT DATA ON FILE.', '> DISPLAY MISSION LOGS?', ' '], 30)
      promptEnqueuedRef.current = true
    }, 400)
  }, [completedLines, currentDisplay, enqueue])

  // Step 2 — show options once prompt lines finish typing
  useEffect(() => {
    if (!promptEnqueuedRef.current) return
    if (promptState !== 'idle') return
    if (currentDisplay !== null) return
    if (completedLines.includes('> DISPLAY MISSION LOGS?')) {
      setPromptState('showing')
    }
  }, [completedLines, currentDisplay, promptState])

  // Arrow key navigation for mission prompt
  useEffect(() => {
    if (promptState !== 'showing') return
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedOption(o => o === 0 ? 1 : 0)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        handleMissionConfirm()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptState])

  const handleMissionConfirm = useCallback(() => {
    setPromptState('done')
    playButtonPress()
    enqueue(['> CONFIRMED. ACCESSING MISSION LOGS...'], 25)
    setTimeout(() => {
      setActiveView('mission-logs')
      pulse()
    }, 1200)
  }, [enqueue, playButtonPress])

  const handleSubmit = useCallback(() => {
    const query = inputValue.trim()
    if (!query) return
    startAmbientHum()
    playButtonPress()
    setInputValue('')
    pulse()
    enqueue([`> ${query.toUpperCase()}`], 0)

    const lower = query.toLowerCase()
    let responseKey = 'default'
    if (lower.includes('special order 937') || lower.includes('order 937')) {
      responseKey = 'special_order_937'
      onSecretOrder?.()
    } else if (
      lower.includes('crew') || lower.includes('manifest') || lower.includes('who') ||
      lower.includes('about') || lower.includes('bio') || lower.includes('eduardo') ||
      lower.includes('yourself') || lower.includes('person')
    ) {
      responseKey = 'crew'
    } else if (
      lower.includes('work') || lower.includes('project') || lower.includes('mission') ||
      lower.includes('portfolio') || lower.includes('show') || lower.includes('case') ||
      lower.includes('built') || lower.includes('made') || lower.includes('app') ||
      lower.includes('product')
    ) {
      responseKey = 'work'
    } else if (
      lower.includes('contact') || lower.includes('hire') || lower.includes('email') ||
      lower.includes('reach') || lower.includes('link') || lower.includes('connect') ||
      lower.includes('message') || lower.includes('available')
    ) {
      responseKey = 'contact'
    } else if (
      lower.includes('skill') || lower.includes('design') || lower.includes('experience') ||
      lower.includes('tool') || lower.includes('figma') || lower.includes('background') ||
      lower.includes('speciali')
    ) {
      responseKey = 'skills'
    } else if (
      lower.includes('hello') || lower.includes('hi') || lower.includes('hey') ||
      lower.includes('morning') || lower.includes('mother') || lower.includes('help') ||
      lower.includes('start') || lower.includes('begin')
    ) {
      responseKey = 'greeting'
    }

    const delay = responseKey === 'special_order_937' ? 70 : 25
    setTimeout(() => enqueue(MOTHER_RESPONSES[responseKey], delay), 150)
  }, [inputValue, enqueue, onSecretOrder, startAmbientHum, playButtonPress])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (promptState === 'showing' && inputValue.trim().toLowerCase().startsWith('y')) {
        handleMissionConfirm()
        setInputValue('')
        return
      }
      handleSubmit()
    }
  }

  const handleNavTab = (tab: (typeof NAV_TABS)[0]) => {
    startAmbientHum()
    playButtonPress()
    onButtonPress?.(tab.btnId)
    setActiveView(tab.id)
    pulse()
  }

  // Color tokens (inline styles — avoids dynamic Tailwind class issues)
  const c = alertMode
    ? {
        text: '#ff2200',
        dim: 'rgba(255,34,0,0.5)',
        bright: '#ff5500',
        border: '#2a0500',
        amber: '#ff2200',
      }
    : {
        text: '#e8a000',
        dim: '#a87000',
        bright: '#ffc93c',
        border: '#2a1800',
        amber: '#e8a000',
      }

  // Staggered fade-in helper
  const fade = (delayMs: number): React.CSSProperties => ({
    opacity: uiVisible ? 1 : 0,
    transition: 'opacity 0.5s ease',
    transitionDelay: uiVisible ? `${delayMs}ms` : '0ms',
  })

  return (
    <div
      className="h-full flex flex-col font-console overflow-hidden crt-monitor crt-flicker"
      style={{ backgroundColor: '#020100', color: c.text, fontSize: '16px', lineHeight: '1.5' }}
    >
      {/* ── Combined Header + Nav ── */}
      <div className="flex" style={{ paddingLeft:'8px', borderBottom: `1px solid ${c.border}`, ...fade(0) }}>
        {/* Left column: title + nav tabs */}
        <div className="flex-1 flex flex-col justify-between" style={{ borderRight: `1px solid ${c.border}` }}>
          <div className="px-3 pt-2 pb-1">
            <span style={{ color: c.dim, fontSize: '16px', letterSpacing: '0.06em' }}>MU-TH-UR 6000 • NOGUEIRA, EDUARDO • PRODUCT DESIGNER </span>
          </div>
          <div className="flex items-center gap-3 md:gap-2/ px-3 pb-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {NAV_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleNavTab(tab)}
                className="transition-opacity hover:opacity-100 flex-shrink-0"
                style={{
                  backgroundColor: activeView === tab.id ? c.bright : 'transparent',
                  color: activeView === tab.id ? '#020100' : c.dim,
                  opacity: activeView === tab.id ? 1 : 0.65,
                  padding: '4px 14px',
                  fontSize: '22px',
                  lineHeight: '1',
                  minHeight: '36px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Right column: operator info (top) + stardate (bottom) */}
        <div className="flex flex-col flex-shrink-0" style={{ minWidth: '200px' }}>
          <div className="px-3 py-2" style={{ borderBottom: `1px solid ${c.border}` }}>
            <div style={{ color: c.text, fontSize: '16px', letterSpacing: '0.06em', lineHeight: '1.3' }}>USS Nostromo.</div>
            <div style={{ color: c.dim, fontSize: '13px', letterSpacing: '0.08em', lineHeight: '1.3' }}>W.Y. Corp</div>
          </div>
          <div className="px-3 py-2">
            <div style={{ color: c.dim, fontSize: '12px', letterSpacing: '0.12em' }}>STARDATE</div>
            <div style={{ color: c.bright, fontSize: '15px', letterSpacing: '0.04em' }}>{stardate || '-----.------'}</div>
          </div>
        </div>
      </div>

      {/* ── Main area: two-column grid ── */}
      <div className="flex-1 flex min-h-0 overflow-hidden" style={fade(150)}>

        {/* ── LEFT: terminal content ── */}
        <div className="flex-1 relative overflow-hidden">

          {/* ── Logo overlay (temporary splash) ── */}
          {logoPhase !== 'hidden' && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center z-20"
              style={{
                backgroundColor: '#020100',
                opacity: logoPhase === 'out' ? 0 : 1,
                transition: logoPhase === 'out' ? 'opacity 0.65s ease-out' : 'opacity 0.2s ease-in',
              }}
            >
              <div className="text-[16px] md:text-[26px]" style={{ lineHeight: '1.5' }}>
                {MUTHUR_LOGO.slice(0, Math.min(logoLines, MUTHUR_LOGO.length)).map((line, i) => (
                  <div key={i} style={{ color: c.bright, whiteSpace: 'pre', overflow: 'hidden' }}>{line}</div>
                ))}
                {logoLines >= MUTHUR_LOGO.length && (
                  <div
                    className="text-center mt-2 mb-3"
                    style={{ color: c.dim, letterSpacing: '0.5em', fontSize: '22px' }}
                  >
                    ·&nbsp;&nbsp;6&nbsp;&nbsp;0&nbsp;&nbsp;0&nbsp;&nbsp;0&nbsp;&nbsp;·
                  </div>
                )}
                {LOGO_DETAILS.slice(0, Math.max(0, logoLines - MUTHUR_LOGO.length)).map((line, i) => (
                  <div
                    key={i}
                    className="text-[13px] md:text-[22px]"
                    style={{
                      color: i === 0 ? c.border : c.dim,
                      letterSpacing: i === 0 ? '0' : '0.04em',
                      marginTop: i === 0 ? '0' : '2px',
                      textAlign: 'center',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scan for threat — only visible on chat tab */}
          {(activeView === 'chat' || activeView === 'threat') && (
          <button
            aria-label="Start life form scan"
            className="absolute top-2 right-3 select-none transition-opacity hover:opacity-100"
            title="Scan for life forms"
            style={{
              color: activeView === 'threat' ? c.bright : c.dim,
              opacity: activeView === 'threat' ? 1 : 0.6,
              fontSize: '20px',
              lineHeight: 1,
              zIndex: 30,
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              ...fade(480),
            }}
            onClick={() => { startAmbientHum(); playButtonPress(); pulse(); handleNavTab({ id: 'threat', label: 'Scan for threat', btnId: 'threat', subtitle: '[SCANNER]' }) }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {/* Radar icon: concentric arcs */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                <path d="M9 9 m-4 0 a4 4 0 1 1 8 0" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M9 9 m-7 0 a7 7 0 1 1 14 0" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
                <line x1="9" y1="9" x2="14.5" y2="3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
              </svg>
              <span className="hidden wide:inline" style={{ fontSize: '20px', letterSpacing: '0.08em' }}>START SCAN</span>
            </span>
          </button>
          )}

          {/* ── CHAT VIEW ── */}
          {activeView === 'chat' && (
            <div className="relative h-full flex flex-col">
              <div ref={outputRef} className="px-3 md:px-6 overflow-y-auto flex-1" style={{ fontSize:'20px', paddingBottom: '96px', scrollbarWidth: 'none' }}>
                {completedLines.map((line, i) => (
                  <div key={i} style={{ fontSize:'20px', color: line.startsWith('>') ? c.bright : c.text }}>
                    {line || '\u00A0'}
                  </div>
                ))}
                {currentDisplay !== null && (
                  <div className="cursor-blink" style={{ color: c.text }}>{currentDisplay}</div>
                )}
              </div>
              {/* ── Mission prompt options ── */}
              {promptState === 'showing' && (
                <div
                  className="absolute bottom-0 left-0 right-0 mx-3 md:mx-4 mb-4 md:mb-8"
                  style={{ ...fade(0) }}
                >
                  <div
                    style={{
                      backgroundColor: '#020100',
                      border: `1px solid ${c.border}`,
                      boxShadow: `0 0 12px rgba(0,0,0,0.6)`,
                      padding: '10px 16px',
                    }}
                  >
                    {['-YES', '-YES, PLEASE'].map((opt, i) => (
                      <div
                        key={opt}
                        onClick={() => { setSelectedOption(i); handleMissionConfirm() }}
                        onMouseEnter={() => setSelectedOption(i)}
                        style={{
                          fontSize: '22px',
                          color: selectedOption === i ? c.bright : c.dim,
                          cursor: 'pointer',
                          padding: '3px 0',
                          letterSpacing: '0.08em',
                          transition: 'color 80ms ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <span style={{ color: selectedOption === i ? c.bright : 'transparent', fontSize: '18px' }}>{'>'}</span>
                        {opt}
                      </div>
                    ))}
                    <div style={{ color: c.dim, fontSize: '14px', letterSpacing: '0.1em', marginTop: '8px', opacity: 0.6 }}>
                      ↑↓ NAVIGATE · ENTER SELECT · TYPE YES
                    </div>
                  </div>
                </div>
              )}

              {/* ── Floating input (hidden while mission prompt is showing) ── */}
              {promptState !== 'showing' && (
              <div
                className="absolute bottom-0 left-0 right-0 mx-3 md:mx-4 mb-4 md:mb-8"
                style={{ ...fade(450) }}
              >
                <div
                  className="flex items-center gap-2 px-3 py-2"
                  style={{
                    backgroundColor: '#020100',
                    border: `1px solid ${isFocused ? c.dim : c.border}`,
                    boxShadow: isFocused ? `0 0 8px rgba(232,160,0,0.2)` : `0 0 12px rgba(0,0,0,0.6)`,
                    transition: 'border-color 120ms ease, box-shadow 120ms ease',
                  }}
                >
                  <span style={{ color: c.dim }}>{'>'}</span>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => { startAmbientHum(); playKeyClick(); setInputValue(e.target.value) }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="flex-1 bg-transparent outline-none font-console placeholder-console-phosphor-dim"
                    style={{ color: c.text, fontSize: '20px', textTransform: 'uppercase' }}
                    placeholder="ENTER QUERY..."
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button
                    onClick={handleSubmit}
                    aria-label="Send query to MU-TH-UR"
                    disabled={currentDisplay !== null}
                    className="transition-opacity"
                    style={{
                      color: currentDisplay !== null ? c.border : c.dim,
                      fontSize: '18px',
                      letterSpacing: '0.06em',
                      opacity: currentDisplay !== null ? 0.35 : 0.8,
                      cursor: currentDisplay !== null ? 'not-allowed' : 'default',
                    }}
                  >
                    {currentDisplay !== null ? '[ ....... ]' : '[ TRANSMIT ]'}
                  </button>
                </div>
              </div>
              )}
            </div>
          )}

          {/* ── MISSION LOGS VIEW ── */}
          {activeView === 'mission-logs' && (
            <div className="px-3 md:px-6 py-3 overflow-y-auto" style={{ height: 'calc(100% - 60px)', scrollbarWidth: 'none' }}>
              <div className="grid grid-cols-1 wide:grid-cols-2 gap-6">
                {MISSION_LOGS.map(log => {
                  const thumb = projects.find(p => p.slug === log.slug)?.thumbnail
                  return (
                    <button
                      key={log.id}
                      aria-label={`Open mission log: ${log.title}`}
                      onClick={() => { pulse(); router.push(`/projects/${log.slug}`) }}
                      className="text-left group"
                      style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
                    >

                      {/* 16:9 image */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '16 / 9',
                          backgroundColor: 'transparent',
                          overflow: 'hidden',
                          border: `0px solid ${c.border}`,
                          borderTop: 'none',
                        }}
                      >
                        {thumb && (
                          <Image
                            src={thumb}
                            alt={log.title}
                            fill
                            className="object-cover transition-opacity duration-300 group-hover:opacity-75"
                            sizes="(max-width: 768px) 90vw, 45vw"
                          />
                        )}
                        {/* Hover overlay — mobile: ACCESS FILE label / desktop: title + category */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(8,5,0,0.65)' }}
                        >
                          {/* Mobile */}
                          <span className="md:hidden" style={{ color: c.bright, fontSize: '26px', letterSpacing: '0.2em' }}>{'> ACCESS FILE'}</span>
                          {/* Desktop */}
                          <div className="hidden md:flex flex-col items-center gap-1" style={{ textAlign: 'center' }}>
                            <div style={{ color: c.bright, fontSize: '30px', lineHeight: '1.0' }}>{log.title}</div>
                            <div style={{ color: c.dim, fontSize: '20px', marginTop: '2px' }}>{log.category}</div>
                          </div>
                        </div>
                      </div>
                      {/* Title + category — mobile only */}
                      <div className="md:hidden pt-2 pb-1">
                        <div style={{ color: c.text, fontSize: '30px', lineHeight: '1.0' }}>{log.title}</div>
                        <div style={{ color: c.dim, fontSize: '22px', marginTop: '2px' }}>{log.category}</div>
                      </div>
      
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── CREW VIEW ── */}
          {activeView === 'crew' && (() => {
            const member = CREW_MANIFEST.find(m => m.id === 'nogueira') ?? CREW_MANIFEST[0]
            const sym = member.status === 'DECEASED' ? '▲' : member.status === 'ATTACHED' ? '●' : '■'
            const col = member.status === 'DECEASED' ? c.dim : c.bright
            const photoBase: React.CSSProperties = {
              width: 300, height: 300, flexShrink: 1,
              border: `1px solid ${c.border}`,
              position: 'relative', overflow: 'hidden',
              backgroundColor: '#0d0700',
            }

            return (
              <div className="h-full overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                <div style={{ padding: '16px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Card with corner brackets */}
                  <div style={{ maxWidth:'760px', position: 'relative', border: `1px solid ${c.border}`, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {/* Corner brackets SVG */}
                    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polyline points="0,6 0,0 6,0" fill="none" stroke={c.dim} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                      <polyline points="94,0 100,0 100,6" fill="none" stroke={c.dim} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                      <polyline points="0,94 0,100 6,100" fill="none" stroke={c.dim} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                      <polyline points="94,100 100,100 100,94" fill="none" stroke={c.dim} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                    </svg>

                    {/* Card header */}
                    <div style={{ padding: '10px 14px 8px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexShrink: 0 }}>
                      <span style={{ color: c.dim, fontSize: '14px', letterSpacing: '0.15em' }}>{'// PERSONNEL FILE'}</span>
                      <span style={{ color: member.clearance.includes('CLASSIFIED') ? c.bright : c.dim, fontSize: '13px', letterSpacing: '0.1em' }}>
                        {member.clearance}
                      </span>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: '16px 14px', display: 'flex', gap: '16px', flexShrink: 0 }}>
                      {/* Left: fields */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <div style={{ color: c.dim, fontSize: '12px', letterSpacing: '0.2em', marginBottom: '2px' }}>NAME</div>
                          <div style={{ color: c.bright, fontSize: '22px', lineHeight: '1.1' }}>{member.name}</div>
                        </div>
                        <div>
                          <div style={{ color: c.dim, fontSize: '12px', letterSpacing: '0.2em', marginBottom: '2px' }}>RANK</div>
                          <div style={{ color: c.text, fontSize: '17px', lineHeight: '1.2' }}>{member.rank}</div>
                        </div>
                        <div>
                          <div style={{ color: c.dim, fontSize: '12px', letterSpacing: '0.2em', marginBottom: '2px' }}>SPECIALITY</div>
                          <div style={{ color: c.text, fontSize: '17px', lineHeight: '1.2' }}>{member.speciality}</div>
                        </div>
                        <div>
                          <div style={{ color: c.dim, fontSize: '12px', letterSpacing: '0.2em', marginBottom: '2px' }}>STATUS</div>
                          <div style={{ color: col, fontSize: '17px' }}>{sym} {member.status}</div>
                        </div>
                        <div>
                          <div style={{ color: c.dim, fontSize: '12px', letterSpacing: '0.2em', marginBottom: '2px' }}>FILE REF</div>
                          <div style={{ color: c.dim, fontSize: '13px', letterSpacing: '0.06em' }}>{member.fileRef}</div>
                        </div>
                      </div>

                      {/* Right: photo */}
                      {member.photo && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                          <div style={photoBase}>
                            <Image
                              src={member.photo} alt={member.name} fill
                              className="object-cover object-top"
                              style={{ filter: 'sepia(1) saturate(0.7) hue-rotate(5deg) brightness(0.82)' }}
                              sizes="130px"
                            />
                            <div style={{
                              position: 'absolute', inset: 0, pointerEvents: 'none',
                              background: 'repeating-linear-gradient(to bottom, transparent, transparent 1px, rgba(0,0,0,0.32) 1px, rgba(0,0,0,0.32) 2px)',
                            }} />
                          </div>
                          <div style={{ color: c.dim, fontSize: '11px', letterSpacing: '0.06em', textAlign: 'center' }}>
                            {member.fileRef}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bio section */}
                    <div style={{ borderTop: `1px solid ${c.border}`, padding: '12px 14px', flex: 1, overflowY: 'auto', scrollbarWidth: 'none' as const }}>
                      <div style={{ color: c.dim, fontSize: '12px', letterSpacing: '0.2em', marginBottom: '8px' }}>BIOGRAPHICAL DATA</div>
                      <div style={{ color: c.text, fontSize: '17px', lineHeight: '1.6' }}>
                        {member.bio ?? member.missionNotes ?? '—'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* ── THREAT SCANNER VIEW ── */}
          {activeView === 'threat' && (
            <div style={{ height: 'calc(100% - 60px)', overflow: 'hidden' }}>
              <SonarScanner
                alertMode={alertMode}
                color={c.text}
                dim={c.dim}
                border={c.border}
                amber={c.amber}
                onXenomorphDetected={() => window.dispatchEvent(new CustomEvent('xenomorph-found'))}
              />
            </div>
          )}
        </div>

        {/* ── RIGHT: Nostromo schematic panel (chat only, lg+ only) ── */}
        {activeView === 'chat' && (
          <div
            className="hidden lg:flex flex-col items-center justify-center flex-shrink-0 overflow-hidden"
            style={{
              width: '20vw',
              borderLeft: `1px solid ${c.border}`,
            }}
          >
            {xenomorphDetected
              ? <XenomorphAnim color={c.text} dim={c.dim} border={c.border} amber={c.amber} />
              : <StatusGrid color={c.text} dim={c.dim} border={c.border} amber={c.amber} activeView={activeView} pulseCount={statusPulse} />
            }
          </div>
        )}

      </div>

      {/* ── COMM ARRAY persistent footer ── */}
      <div style={{ borderTop: `1px solid ${c.border}`, ...fade(480) }}>
        <div className="flex items-center gap-3 px-4 py-1 overflow-x-auto" style={{ scrollbarWidth: 'none', whiteSpace: 'nowrap', fontSize: '18px' }}>
          <span style={{ color: c.dim, flexShrink: 0 }}>COMM ARRAY: ONLINE</span>
          <span style={{ color: c.border }}>·</span>
          <a href="mailto:eduardo.bnogueira@gmail.com" className="hover:opacity-70 transition-opacity" style={{ color: c.text, flexShrink: 0 }}>
            EMAIL
          </a>
          <span style={{ color: c.border }}>·</span>
          <a href="https://www.linkedin.com/in/ebn18/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: c.text, flexShrink: 0 }}>
            LINKEDIN
          </a>
          <span style={{ color: c.border }}>·</span>
          <span style={{ color: c.dim, flexShrink: 0 }}>BERLIN, GER</span>
        </div>
      </div>

    </div>
  )
}
