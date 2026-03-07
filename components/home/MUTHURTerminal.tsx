'use client'

import React, { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MOTHER_RESPONSES, BOOT_SEQUENCE, MUTHUR_LOGO, MISSION_LOGS, CREW_MANIFEST } from '@/lib/console-data'
import { projects } from '@/lib/projects'
import { useTerminalQueue } from '@/hooks/useTypewriter'
import { useConsoleAudio } from '@/hooks/useConsoleAudio'
import NostromoAnim from './NostromoAnim'
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
  { id: 'mission-logs', label: 'Missions', btnId: 'mission-logs', subtitle: '[PORTFOLIO]' },
  { id: 'chat', label: 'MU-TH-UR', btnId: 'MU-TH-UR', subtitle: '[QUERY TERMINAL]' },
  { id: 'crew', label: 'Crew', btnId: 'crew-manifest', subtitle: '[ABOUT]' },
]

const VALID_VIEWS: ActiveView[] = ['chat', 'mission-logs', 'crew', 'threat']

export default function MUTHURTerminal({ alertMode, ready = false, skipBoot = false, initialView, onSecretOrder, onButtonPress }: Props) {
  const router = useRouter()
  const { completedLines, currentDisplay, enqueue } = useTerminalQueue()
  const { startAmbientHum, playKeyClick, playButtonPress, startAlertAlarm, stopAlertAlarm, playBootBeep } = useConsoleAudio()
  const prevDisplayLenRef = useRef(0)
  const [inputValue, setInputValue] = useState('')
  const [activeView, setActiveView] = useState<ActiveView>(
    VALID_VIEWS.includes(initialView as ActiveView) ? (initialView as ActiveView) : 'mission-logs'
  )
  const [logoPhase, setLogoPhase] = useState<LogoPhase>('hidden')
  const [logoLines, setLogoLines] = useState(0)
  const [uiVisible, setUiVisible] = useState(false)
  const outputRef = useRef<HTMLDivElement>(null)
  const sequenceStartedRef = useRef(false)
  // Tracks if MU-TH-UR terminal has been booted — boot sequence only runs once
  const terminalBootedRef = useRef(skipBoot || initialView === 'chat')
  const [xenomorphDetected, setXenomorphDetected] = useState(false)

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

  // On ready: ambient hum only (boot sequence now triggered by MU-TH-UR tab click)
  useEffect(() => {
    if (!ready || sequenceStartedRef.current) return
    sequenceStartedRef.current = true
    startAmbientHum()
  }, [ready, startAmbientHum])

  // Boot MU-TH-UR: logo splash → boot sequence. Runs once on first tab access.
  const bootTerminal = useCallback(() => {
    if (terminalBootedRef.current) return
    terminalBootedRef.current = true

    const tids: ReturnType<typeof setTimeout>[] = []
    const t = (fn: () => void, ms: number) => { const id = setTimeout(fn, ms); tids.push(id) }

    t(() => setLogoPhase('in'), 200)

    let elapsed = 280
    const totalLines = MUTHUR_LOGO.length + LOGO_DETAILS.length
    for (let n = 1; n <= totalLines; n++) {
      const line = n
      t(() => {
        setLogoLines(line)
        playBootBeep(line - 1)
      }, elapsed)
      elapsed += n <= MUTHUR_LOGO.length ? 160 : 120
    }

    t(() => setLogoPhase('out'), elapsed + 2000)
    t(() => {
      setLogoPhase('hidden')
      enqueue(BOOT_SEQUENCE, 12)
    }, elapsed + 2000 + 800)
  }, [enqueue, playBootBeep])

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

  const handleSubmit = useCallback(() => {
    const query = inputValue.trim()
    if (!query) return
    startAmbientHum()
    playButtonPress()
    setInputValue('')
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
    if (e.key === 'Enter') handleSubmit()
  }

  const handleNavTab = (tab: (typeof NAV_TABS)[0]) => {
    startAmbientHum()
    playButtonPress()
    onButtonPress?.(tab.btnId)
    setActiveView(tab.id)
    if (tab.id === 'chat') bootTerminal()
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
        dim: '#7a4e00',
        bright: '#ffc93c',
        border: '#2a1800',
        amber: '#33ff00',
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
      style={{ backgroundColor: '#020100', color: c.text, fontSize: '32px', lineHeight: '1.5' }}
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-2 px-4 py-2 flex-wrap" style={fade(0)}>
        <span style={{ color: c.dim }}>USS</span>
        <span style={{ color: c.bright }}>MU-TH-UR 6000</span>
        <span style={{ color: c.dim }}>·</span>
        <span style={{ color: c.text }}>NOGUEIRA, E.</span>
        <span style={{ color: c.dim }}>·</span>
        <span style={{ color: c.dim }}>PRODUCT DESIGNER</span>
        <span style={{ color: c.dim }}>·</span>
        <span style={{ color: c.dim }}>BERLIN</span>
        <div className="ml-auto flex items-center gap-2">
          <span style={{ color: c.dim }}>STARDATE</span>
          <span style={{ color: c.bright }}>{stardate || '-----.------'}</span>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${c.border}`, ...fade(80) }} />

      {/* ── Nav tabs ── */}
      <div className="flex items-center gap-6 px-4 py-2" style={fade(320)}>
        {NAV_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleNavTab(tab)}
            className="transition-opacity hover:opacity-100 flex flex-col items-start"
            style={{
              color: activeView === tab.id ? c.bright : c.dim,
              opacity: activeView === tab.id ? 1 : 0.7,
            }}
          >
            <span>{'>'} {tab.label}</span>
            <span style={{ fontSize: '20px', color: c.dim, opacity: 0.55 }}>{tab.subtitle}</span>
          </button>
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${c.border}`, ...fade(120) }} />

      {/* ── Mobile status ticker (hidden on desktop) ── */}
      <div className="block md:hidden overflow-hidden" style={{ borderBottom: `1px solid ${c.border}`, ...fade(200) }}>
        <div className="ticker-track py-1" style={{ color: c.dim, fontSize: '20px', letterSpacing: '0.05em' }}>
          <span>LIFE SUPPORT: 97% &nbsp;·&nbsp; HULL INTEGRITY: 94% &nbsp;·&nbsp; HYPERSLEEP: ONLINE &nbsp;·&nbsp; NAV: ONLINE &nbsp;·&nbsp; COMM ARRAY: ONLINE &nbsp;·&nbsp; POWER CORE: 88% &nbsp;·&nbsp;&nbsp;&nbsp;</span>
          <span>LIFE SUPPORT: 97% &nbsp;·&nbsp; HULL INTEGRITY: 94% &nbsp;·&nbsp; HYPERSLEEP: ONLINE &nbsp;·&nbsp; NAV: ONLINE &nbsp;·&nbsp; COMM ARRAY: ONLINE &nbsp;·&nbsp; POWER CORE: 88% &nbsp;·&nbsp;&nbsp;&nbsp;</span>
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
              <div style={{ fontSize: '26px', lineHeight: '1.5' }}>
                {MUTHUR_LOGO.slice(0, Math.min(logoLines, MUTHUR_LOGO.length)).map((line, i) => (
                  <div key={i} style={{ color: c.bright, whiteSpace: 'pre' }}>{line}</div>
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
                    style={{
                      color: i === 0 ? c.border : c.dim,
                      fontSize: '22px',
                      letterSpacing: i === 0 ? '0' : '0.04em',
                      marginTop: i === 0 ? '0' : '2px',
                      textAlign: 'center',
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scan for threat — top right */}
          <button
            className="absolute top-3 right-4 select-none transition-opacity hover:opacity-100"
            title="Scan for life forms"
            style={{
              color: activeView === 'threat' ? c.bright : c.dim,
              opacity: activeView === 'threat' ? 1 : 0.6,
              fontSize: '36px',
              lineHeight: 1,
              ...fade(480),
            }}
            onClick={() => { startAmbientHum(); playButtonPress(); handleNavTab({ id: 'threat', label: 'Scan for threat', btnId: 'threat', subtitle: '[SCANNER]' }) }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {/* Radar icon: concentric arcs */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                <path d="M9 9 m-4 0 a4 4 0 1 1 8 0" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M9 9 m-7 0 a7 7 0 1 1 14 0" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
                <line x1="9" y1="9" x2="14.5" y2="3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
              </svg>
              <span style={{ fontSize: '24px', letterSpacing: '0.08em' }}>START SCAN</span>
            </span>
          </button>

      

          {/* ── CHAT VIEW ── */}
          {activeView === 'chat' && (
            <div className="relative h-full flex flex-col">
              <div ref={outputRef} className="px-6 overflow-y-auto flex-1" style={{ paddingBottom: '72px', scrollbarWidth: 'none' }}>
                {completedLines.map((line, i) => (
                  <div key={i} style={{ color: line.startsWith('>') ? c.bright : c.text }}>
                    {line || '\u00A0'}
                  </div>
                ))}
                {currentDisplay !== null && (
                  <div className="cursor-blink" style={{ color: c.text }}>{currentDisplay}</div>
                )}
              </div>
              {/* ── Floating input ── */}
              <div
                className="absolute bottom-0 left-0 right-0 mx-4 mb-8"
                style={{ ...fade(450) }}
              >
                <div
                  className="flex items-center gap-2 px-3 py-2"
                  style={{
                    backgroundColor: '#020100',
                    border: `1px solid ${c.border}`,
                    boxShadow: `0 0 12px rgba(0,0,0,0.6)`,
                  }}
                >
                  <span style={{ color: c.dim }}>{'>'}</span>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => { startAmbientHum(); playKeyClick(); setInputValue(e.target.value) }}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none font-console placeholder-console-phosphor-dim"
                    style={{ color: c.text, fontSize: '32px', textTransform: 'uppercase' }}
                    placeholder="ENTER QUERY..."
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button
                    onClick={handleSubmit}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                    style={{
                      color: c.dim,
                      fontSize: '28px',
                      border: `1px solid ${c.border}`,
                      padding: '0 4px',
                    }}
                  >
                    SEND
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── MISSION LOGS VIEW ── */}
          {activeView === 'mission-logs' && (
            <div className="px-6 py-3 overflow-y-auto" style={{ height: 'calc(100% - 60px)', scrollbarWidth: 'none' }}>
              <div className="flex items-baseline gap-4 mb-4" style={{ borderBottom: `1px solid ${c.border}`, paddingBottom: '8px' }}>
                <span style={{ color: c.bright, fontSize: '30px', letterSpacing: '0.08em' }}>MISSION ARCHIVE</span>
                <span style={{ color: c.dim, fontSize: '22px' }}>{MISSION_LOGS.length} RECORDS // CLASSIFIED</span>
              </div>
              <div className="grid grid-cols-1 wide:grid-cols-2 gap-6">
                {MISSION_LOGS.map(log => {
                  const thumb = projects.find(p => p.slug === log.slug)?.thumbnail
                  return (
                    <button
                      key={log.id}
                      onClick={() => router.push(`/projects/${log.slug}`)}
                      className="text-left group"
                      style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
                    >
                      {/* Classification strip */}
                      <div
                        className="flex items-center justify-between px-2 py-1"
                        style={{
                          backgroundColor: c.border,
                          fontSize: '20px',
                          letterSpacing: '0.1em',
                        }}
                      >
                        <span style={{ color: c.dim }}>{log.classification}</span>
                        <span style={{ color: c.dim }}>{log.year}</span>
                      </div>
                      {/* 16:9 image */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '16 / 9',
                          backgroundColor: '#080400',
                          overflow: 'hidden',
                          border: `1px solid ${c.border}`,
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
                        {/* Hover overlay */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(8,5,0,0.65)' }}
                        >
                          <span style={{ color: c.bright, fontSize: '26px', letterSpacing: '0.2em' }}>{'> ACCESS FILE'}</span>
                        </div>
                      </div>
                      {/* Title + category */}
                      <div className="pt-2 pb-1">
                        <div style={{ color: c.text, fontSize: '30px', lineHeight: '1.2' }}>{log.title}</div>
                        <div style={{ color: c.dim, fontSize: '22px', marginTop: '2px' }}>{log.category}</div>
                      </div>
                      {/* Results row */}
                      <div className="flex flex-wrap gap-2 mt-1">
                        {log.results.map((r, i) => (
                          <span
                            key={i}
                            style={{
                              color: c.amber,
                              fontSize: '20px',
                              border: `1px solid ${c.border}`,
                              padding: '0 6px',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── CREW VIEW ── */}
          {activeView === 'crew' && (
            <div className="px-6 overflow-y-auto" style={{ height: 'calc(100%)', scrollbarWidth: 'none' }}>
              <div style={{ color: c.dim }} className="mb-3">CREW MANIFEST // {CREW_MANIFEST.length} PERSONNEL</div>
              {CREW_MANIFEST.map(member => (
                <div key={member.id} className="mb-1 flex items-baseline gap-2">
                  <span style={{ color: member.deceased ? c.dim : c.text }}>{member.name}</span>
                  <span style={{ color: c.dim, fontSize: '26px' }}>{member.rank}</span>
                  <span style={{ fontSize: '26px', color: member.status === 'DECEASED' ? 'rgba(255,34,0,0.7)' : member.isEduardo ? c.amber : c.dim }}>
                    [{member.status}]
                  </span>
                </div>
              ))}
            </div>
          )}

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

        {/* ── RIGHT: Nostromo schematic panel (lg+ only) ── */}
        <div
          className="hidden lg:flex flex-col items-center justify-center flex-shrink-0 overflow-hidden"
          style={{
            width: '20vw',
            borderLeft: `1px solid ${c.border}`,
          }}
        >
          {xenomorphDetected
            ? <XenomorphAnim color={c.text} dim={c.dim} border={c.border} amber={c.amber} />
            : <NostromoAnim color={c.text} dim={c.dim} border={c.border} amber={c.amber} />
          }
        </div>

      </div>

      {/* ── COMM ARRAY persistent footer ── */}
      <div style={{ borderTop: `1px solid ${c.border}`, ...fade(480) }}>
        <div className="flex items-center gap-3 px-4 py-1 overflow-x-auto" style={{ scrollbarWidth: 'none', whiteSpace: 'nowrap', fontSize: '22px' }}>
          <span style={{ color: c.dim, flexShrink: 0 }}>COMM ARRAY: ONLINE</span>
          <span style={{ color: c.border }}>·</span>
          <a href="mailto:eduardo.nogueira@example.com" className="hover:opacity-70 transition-opacity" style={{ color: c.text, flexShrink: 0 }}>
            EDUARDO.NOGUEIRA@EXAMPLE.COM
          </a>
          <span style={{ color: c.border }}>·</span>
          <a href="https://linkedin.com/in/eduardo-nogueira" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: c.text, flexShrink: 0 }}>
            LINKEDIN: /IN/EDUARDO-NOGUEIRA
          </a>
          <span style={{ color: c.border }}>·</span>
          <span style={{ color: c.dim, flexShrink: 0 }}>BERLIN, GER</span>
        </div>
      </div>

    </div>
  )
}
