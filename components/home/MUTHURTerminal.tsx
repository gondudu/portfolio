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
  { id: 'mission-logs', label: 'Missions', btnId: 'mission-logs', subtitle: '[PORTFOLIO]' },
  { id: 'crew', label: 'Crew', btnId: 'crew-manifest', subtitle: '[ABOUT]' },
  { id: 'chat', label: 'MU-TH-UR', btnId: 'MU-TH-UR', subtitle: '[QUERY TERMINAL]' },
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
  const [statusPulse, setStatusPulse] = useState(0)
  const pulse = () => setStatusPulse(p => p + 1)
  const [selectedCrewId, setSelectedCrewId] = useState<string>('nogueira')
  const [crewDetailOpen, setCrewDetailOpen] = useState(false) // mobile slide-in
  const [crewFading, setCrewFading] = useState(false)

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
    if (e.key === 'Enter') handleSubmit()
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
        dim: '#7a4e00',
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
      {/* ── Header ── */}
      <div className="flex items-center gap-2 px-4 py-2 flex-wrap" style={fade(0)}>
        <span style={{ color: c.bright }}>MU-TH-UR 6000</span>
        <span style={{ color: c.dim }}>·</span>
        <span style={{ color: c.text }}>NOGUEIRA, E.</span>
        <span className="hidden wide:inline" style={{ color: c.dim }}>·</span>
        <span className="hidden wide:inline" style={{ color: c.dim }}>PRODUCT DESIGNER</span>
        <div className="ml-auto flex items-center gap-2">
          <span style={{ color: c.dim }}>STARDATE</span>
          <span style={{ color: c.bright }}>{stardate || '-----.------'}</span>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${c.border}`, ...fade(80) }} />

      {/* ── Nav tabs ── */}
      <div className="flex items-center gap-3 md:gap-6 px-3 md:px-4 py-1 md:py-2 overflow-x-auto" style={{ scrollbarWidth: 'none', ...fade(320) }}>
        {NAV_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleNavTab(tab)}
            className="transition-opacity hover:opacity-100 flex flex-col items-start flex-shrink-0"
            style={{
              color: activeView === tab.id ? c.bright : c.dim,
              opacity: activeView === tab.id ? 1 : 0.7,
              fontSize: '22px',
              lineHeight: '1',
              minHeight: '44px',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <span>{'>'} {tab.label}</span>
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
              {/* ── Floating input ── */}
              <div
                className="absolute bottom-0 left-0 right-0 mx-3 md:mx-4 mb-4 md:mb-8"
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
                    style={{ color: c.text, fontSize: '20px', textTransform: 'uppercase' }}
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
            <div className="px-3 md:px-6 py-3 overflow-y-auto" style={{ height: 'calc(100% - 60px)', scrollbarWidth: 'none' }}>
              <div className="grid grid-cols-1 wide:grid-cols-2 gap-6">
                {MISSION_LOGS.map(log => {
                  const thumb = projects.find(p => p.slug === log.slug)?.thumbnail
                  return (
                    <button
                      key={log.id}
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
            const selectedMember = CREW_MANIFEST.find(m => m.id === selectedCrewId) ?? CREW_MANIFEST[0]
            const statusSymbol = (m: typeof CREW_MANIFEST[0]) => {
              if (m.status === 'DECEASED') return { sym: '▲', col: c.dim }
              if (m.status === 'ATTACHED') return { sym: '●', col: m.isEduardo ? c.bright : c.text }
              return { sym: '■', col: c.bright }
            }

            const PhotoSlot = ({ member }: { member: typeof CREW_MANIFEST[0] }) => {
              const size = 130
              const base: React.CSSProperties = {
                width: size, height: size, flexShrink: 0,
                border: `1px solid ${c.border}`,
                position: 'relative', overflow: 'hidden',
                backgroundColor: '#0d0700',
              }
              if (member.photo) {
                return (
                  <div style={base}>
                    <Image
                      src={member.photo} alt={member.name} fill
                      className="object-cover object-top"
                      style={{ filter: 'sepia(1) saturate(0.7) hue-rotate(5deg) brightness(0.82)' }}
                      sizes="130px"
                    />
                    {/* Scanline overlay */}
                    <div style={{
                      position: 'absolute', inset: 0, pointerEvents: 'none',
                      background: 'repeating-linear-gradient(to bottom, transparent, transparent 1px, rgba(0,0,0,0.32) 1px, rgba(0,0,0,0.32) 2px)',
                    }} />
                  </div>
                )
              }
              const isAsh = member.id === 'ash'
              const isRipley = member.id === 'ripley'
              const label = isAsh
                ? ['[SYNTHETIC', 'PERSONNEL', 'RESTRICTED]']
                : isRipley
                  ? ['[PHOTO:', 'CLEARANCE', 'ALPHA REQ.]']
                  : ['[RECORD', 'SEALED]']
              return (
                <div style={{ ...base, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                  {label.map((l, i) => (
                    <div key={i} style={{ color: isAsh ? c.bright : c.dim, fontSize: '14px', letterSpacing: '0.08em', textAlign: 'center' }}>{l}</div>
                  ))}
                </div>
              )
            }

            return (
              <div className="h-full flex overflow-hidden" style={{ position: 'relative' }}>

                {/* ── Left: crew list ── full width on mobile, 240px column on wide+ */}
                <div
                  className="flex-shrink-0 flex flex-col overflow-hidden w-full wide:w-[240px]"
                  style={{ borderRight: `1px solid ${c.border}` }}
                >
                  {/* Header */}
                  <div
                    className="flex-shrink-0 px-3 py-2"
                    style={{ borderBottom: `1px solid ${c.border}`, fontSize: '16px', letterSpacing: '0.12em', color: c.dim }}
                  >
                    CREW MANIFEST {'░'.repeat(3)} {CREW_MANIFEST.length} PERSONNEL
                  </div>
                  {/* Rows */}
                  <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                    {CREW_MANIFEST.map(member => {
                      const { sym, col } = statusSymbol(member)
                      const isSelected = member.id === selectedCrewId
                      return (
                        <button
                          key={member.id}
                          onClick={() => selectCrew(member.id)}
                          className="w-full text-left transition-colors"
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '10px 10px',
                            minHeight: '44px',
                            borderLeft: `2px solid ${isSelected ? c.bright : 'transparent'}`,
                            backgroundColor: isSelected ? '#2a1800' : 'transparent',
                          }}
                        >
                          <div>
                            <div style={{ color: member.deceased ? c.dim : c.text, fontSize: '20px', lineHeight: '1.2' }}>
                              {member.name}
                            </div>
                            <div style={{ color: c.dim, fontSize: '16px', letterSpacing: '0.04em' }}>
                              {member.rank}
                            </div>
                          </div>
                          <span style={{ color: col, fontSize: '18px', flexShrink: 0, marginLeft: '8px' }}>{sym}</span>
                        </button>
                      )
                    })}
                  </div>
                  {/* Legend */}
                  <div
                    className="flex-shrink-0 px-3 py-2 flex flex-col gap-1"
                    style={{ borderTop: `1px solid ${c.border}` }}
                  >
                    {[['■', c.bright, 'ACTIVE'], ['●', c.text, 'ATTACHED'], ['▲', c.dim, 'DECEASED']].map(([sym, col, label]) => (
                      <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: col as string, fontSize: '16px' }}>{sym}</span>
                        <span style={{ color: c.dim, fontSize: '16px', letterSpacing: '0.1em' }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Right: dossier detail (desktop always visible) ── */}
                <div
                  className="flex-1 overflow-y-auto hidden wide:block"
                  style={{
                    scrollbarWidth: 'none',
                    opacity: crewFading ? 0 : 1,
                    transition: 'opacity 0.12s ease',
                  }}
                >
                  {/* File header */}
                  <div
                    className="px-4 py-2 flex items-center justify-between flex-shrink-0 sticky top-0"
                    style={{ borderBottom: `1px solid ${c.border}`, backgroundColor: '#020100', fontSize: '16px', letterSpacing: '0.12em' }}
                  >
                    <span style={{ color: c.dim }}>PERSONNEL FILE {'░'.repeat(4)} {selectedMember.fileRef}</span>
                    <span style={{ color: selectedMember.clearance.includes('CLASSIFIED') ? c.bright : c.dim, fontSize: '14px' }}>
                      CLEARANCE: {selectedMember.clearance}
                    </span>
                  </div>

                  <div className="px-4 py-4">
                    {/* Photo + identity */}
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'flex-start' }}>
                      <PhotoSlot member={selectedMember} />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: c.bright, fontSize: '24px', lineHeight: '1.2', marginBottom: '10px' }}>
                          {selectedMember.name}
                        </div>
                        {[
                          { label: 'RANK', value: selectedMember.rank },
                          { label: 'SPECIALITY', value: selectedMember.speciality },
                          { label: 'STATUS', value: (() => { const { sym, col } = statusSymbol(selectedMember); return { text: `${sym} ${selectedMember.status}`, col } })() },
                        ].map(({ label, value }) => (
                          <div key={label} style={{ marginBottom: '4px', display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                            <span style={{ color: c.dim, fontSize: '14px', letterSpacing: '0.12em', minWidth: '88px' }}>{label}</span>
                            {typeof value === 'string'
                              ? <span style={{ color: c.text, fontSize: '18px' }}>{value}</span>
                              : <span style={{ color: value.col, fontSize: '18px' }}>{value.text}</span>
                            }
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: '14px', marginBottom: '14px' }}>
                      <div style={{ color: c.dim, fontSize: '14px', letterSpacing: '0.2em', marginBottom: '8px' }}>BIOGRAPHICAL DATA</div>
                      <div style={{ color: c.text, fontSize: '20px', lineHeight: '1.7' }}>{selectedMember.bio}</div>
                    </div>

                    {selectedMember.missionNotes && (
                      <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: '14px' }}>
                        <div style={{ color: c.dim, fontSize: '14px', letterSpacing: '0.2em', marginBottom: '8px' }}>MISSION NOTES</div>
                        <div style={{ color: c.dim, fontSize: '16px', lineHeight: '1.7' }}>{selectedMember.missionNotes}</div>
                      </div>
                    )}

                    {/* Blinking cursor */}
                    <div style={{ color: c.dim, marginTop: '12px', fontSize: '20px' }}>
                      <span className="cursor-blink">█</span>
                    </div>
                  </div>
                </div>

                {/* ── Mobile: full-screen dossier slide-in ── */}
                <div
                  className="wide:hidden absolute inset-0 flex flex-col overflow-hidden"
                  style={{
                    backgroundColor: '#020100',
                    transform: crewDetailOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.2s ease-out',
                    opacity: crewFading ? 0 : 1,
                  }}
                >
                  <div
                    className="flex items-center gap-3 px-4 py-2 flex-shrink-0"
                    style={{ borderBottom: `1px solid ${c.border}`, fontSize: '20px' }}
                  >
                    <button
                      onClick={() => setCrewDetailOpen(false)}
                      className="transition-opacity hover:opacity-100"
                      style={{ color: c.dim, opacity: 0.8 }}
                    >
                      {'< MANIFEST'}
                    </button>
                    <span style={{ color: c.border }}>·</span>
                    <span style={{ color: c.dim, fontSize: '16px', letterSpacing: '0.1em' }}>{selectedMember.fileRef}</span>
                  </div>
                  <div className="flex-1 overflow-y-auto px-4 py-4" style={{ scrollbarWidth: 'none' }}>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'flex-start' }}>
                      <PhotoSlot member={selectedMember} />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: c.bright, fontSize: '22px', lineHeight: '1.2', marginBottom: '10px' }}>{selectedMember.name}</div>
                        {[
                          { label: 'RANK', value: selectedMember.rank },
                          { label: 'SPECIALITY', value: selectedMember.speciality },
                        ].map(({ label, value }) => (
                          <div key={label} style={{ marginBottom: '4px' }}>
                            <span style={{ color: c.dim, fontSize: '14px', letterSpacing: '0.12em' }}>{label} </span>
                            <span style={{ color: c.text, fontSize: '18px' }}>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: '14px', marginBottom: '14px' }}>
                      <div style={{ color: c.dim, fontSize: '14px', letterSpacing: '0.2em', marginBottom: '8px' }}>BIOGRAPHICAL DATA</div>
                      <div style={{ color: c.text, fontSize: '20px', lineHeight: '1.7' }}>{selectedMember.bio}</div>
                    </div>
                    {selectedMember.missionNotes && (
                      <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: '14px' }}>
                        <div style={{ color: c.dim, fontSize: '14px', letterSpacing: '0.2em', marginBottom: '8px' }}>MISSION NOTES</div>
                        <div style={{ color: c.dim, fontSize: '16px', lineHeight: '1.7' }}>{selectedMember.missionNotes}</div>
                      </div>
                    )}
                    <div style={{ color: c.dim, marginTop: '12px', fontSize: '20px' }}><span className="cursor-blink">█</span></div>
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
            : <StatusGrid color={c.text} dim={c.dim} border={c.border} amber={c.amber} activeView={activeView} pulseCount={statusPulse} />
          }
        </div>

      </div>

      {/* ── COMM ARRAY persistent footer ── */}
      <div style={{ borderTop: `1px solid ${c.border}`, ...fade(480) }}>
        <div className="flex items-center gap-3 px-4 py-1 overflow-x-auto" style={{ scrollbarWidth: 'none', whiteSpace: 'nowrap', fontSize: '18px' }}>
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
