'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react'

// ─── Color tokens (amber phosphor) ────────────────────────────
const C = {
  bg:     '#020100',
  panel:  '#080400',
  border: '#2a1800',
  text:   '#e8a000',
  dim:    '#7a4e00',
  bright: '#ffc93c',
  red:    '#ff2200',
  dimRed: 'rgba(255,34,0,0.5)',
}

// ─── Boot lines displayed before the input appears ────────────
const BOOT_LINES = [
  'WEYLAND-YUTANI CORP. — MU-TH-UR 6000 INTERFACE',
  '──────────────────────────────────────────────────',
  'SECURE TERMINAL HANDSHAKE: ESTABLISHED',
  'ENCRYPTION LAYER: ACTIVE  /  PROTOCOL: CIPHER-7',
  'SESSION ID: WY-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
  '──────────────────────────────────────────────────',
  'CREW AUTHENTICATION REQUIRED.',
  'ALL ACCESS IS LOGGED AND MONITORED.',
  'UNAUTHORISED ENTRY WILL TRIGGER LOCKDOWN.',
  '',
  '> ENTER ACCESS CODE TO PROCEED:',
]

const BOOT_DELAY_MS = 60   // ms per line

interface Props {
  children: React.ReactNode
}

export default function PasswordGate({ children }: Props) {
  const CORRECT_PASSWORD = 'portfolio2024'

  const [password, setPassword]               = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError]                     = useState(false)
  const [errorMsg, setErrorMsg]               = useState('')
  const [bootLines, setBootLines]             = useState<string[]>([])
  const [bootDone, setBootDone]               = useState(false)
  const [attempts, setAttempts]               = useState(0)
  const [uiVisible, setUiVisible]             = useState(false)

  const inputRef   = useRef<HTMLInputElement>(null)
  const outputRef  = useRef<HTMLDivElement>(null)

  // ── Check session auth ──────────────────────────────────────
  useEffect(() => {
    const auth = sessionStorage.getItem('portfolio-auth')
    if (auth === 'true') setIsAuthenticated(true)
  }, [])

  // ── Lock body scroll while gate is visible ───────────────
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

  // ── Fade-in the whole screen ────────────────────────────────
  useEffect(() => {
    const tid = setTimeout(() => setUiVisible(true), 60)
    return () => clearTimeout(tid)
  }, [])

  // ── Typewriter boot sequence ────────────────────────────────
  useEffect(() => {
    if (isAuthenticated) return
    const tids: ReturnType<typeof setTimeout>[] = []
    BOOT_LINES.forEach((line, i) => {
      const tid = setTimeout(() => {
        setBootLines(prev => [...prev, line])
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => {
            setBootDone(true)
            setTimeout(() => inputRef.current?.focus(), 80)
          }, 200)
        }
      }, i * BOOT_DELAY_MS)
      tids.push(tid)
    })
    return () => tids.forEach(clearTimeout)
  }, [isAuthenticated])

  // ── Auto-scroll output ──────────────────────────────────────
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [bootLines, error])

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
      if (next >= 3) {
        setErrorMsg(`ACCESS DENIED. ${next} FAILED ATTEMPT${next > 1 ? 'S' : ''}. SECURITY ALERT LOGGED.`)
      } else {
        setErrorMsg(`ACCESS DENIED. INVALID CODE. ATTEMPT ${next}/3.`)
      }
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
    <div
      className="fixed inset-0 font-console crt-monitor crt-flicker"
      style={{
        backgroundColor: C.bg,
        color: C.text,
        fontSize: '18px',
        lineHeight: '1.6',
        opacity: uiVisible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9999,
      }}
      aria-label="Crew authentication terminal"
    >

      {/* ── Top bar ──────────────────────────────────────────── */}
      <div
        style={{
          borderBottom: `1px solid ${C.border}`,
          padding: '8px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ color: C.bright, fontSize: '22px', letterSpacing: '0.12em' }}>
          MU-TH-UR 6000
        </span>
        <span style={{ color: C.dim, fontSize: '16px', letterSpacing: '0.1em' }}>
          SECURE ACCESS TERMINAL
        </span>
        <span style={{ color: C.dim, fontSize: '16px', letterSpacing: '0.06em' }}>
          USCSS NOSTROMO / SYS AUTH
        </span>
      </div>

      {/* ── Main layout ──────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px',
          minHeight: '90vh',
          height:'90vh',
        }}
      >

        {/* ── Terminal panel ───────────────────────────────── */}
        <div
          style={{
            width: '100%',
            maxWidth: '660px',
            border: `1px solid ${C.border}`,
            backgroundColor: C.panel,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
          }}
          role="main"
        >

          {/* Corner bracket SVG overlay */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polyline points="0,8 0,0 8,0"    fill="none" stroke={C.dim} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            <polyline points="92,0 100,0 100,8"  fill="none" stroke={C.dim} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            <polyline points="0,92 0,100 8,100"  fill="none" stroke={C.dim} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            <polyline points="92,100 100,100 100,92" fill="none" stroke={C.dim} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
          </svg>

          {/* Panel header */}
          <div
            style={{
              padding: '10px 20px',
              borderBottom: `1px solid ${C.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexShrink: 0,
            }}
          >
            <span style={{ color: C.dim, fontSize: '13px', letterSpacing: '0.18em' }}>
              {'// CREW AUTHENTICATION REQUIRED'}
            </span>
            <span style={{ color: C.dim, fontSize: '13px', letterSpacing: '0.1em' }}>
              CLEARANCE: RESTRICTED
            </span>
          </div>

          {/* ── Boot output ────────────────────────────────── */}
          <div
            ref={outputRef}
            style={{
              padding: '20px 20px 12px',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              minHeight: '200px',
              maxHeight: '340px',
            }}
            aria-live="polite"
            aria-label="Terminal output"
          >
            {bootLines.map((line, i) => (
              <div
                key={i}
                style={{
                  fontSize: '18px',
                  letterSpacing: '0.04em',
                  color: line.startsWith('>') ? C.bright
                       : line.startsWith('─') ? C.border
                       : line === '' ? 'transparent'
                       : C.text,
                  marginBottom: '1px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {line || '\u00A0'}
              </div>
            ))}

            {/* Animated typing cursor while boot runs */}
            {!bootDone && (
              <div className="cursor-blink" style={{ color: C.dim, fontSize: '18px' }} />
            )}

            {/* Error message block */}
            {error && errorMsg && (
              <div
                style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  border: `1px solid ${C.red}`,
                  backgroundColor: 'rgba(255,34,0,0.07)',
                  color: C.red,
                  fontSize: '17px',
                  letterSpacing: '0.06em',
                  lineHeight: '1.5',
                  animation: 'alert-pulse 0.6s ease-in-out infinite',
                }}
                role="alert"
              >
                {'> '}{errorMsg}
              </div>
            )}
          </div>

          {/* ── Input area ─────────────────────────────────── */}
          {bootDone && (
            <div style={{ borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
              {/* Separator label */}
              <div
                style={{
                  padding: '6px 20px',
                  borderBottom: `1px solid ${C.border}`,
                  color: C.dim,
                  fontSize: '13px',
                  letterSpacing: '0.16em',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>INPUT FIELD — ALPHA-NUMERIC ACCEPTED</span>
                <span>PRESS ENTER TO AUTHENTICATE</span>
              </div>

              {/* Input row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                }}
              >
                <span style={{ color: error ? C.red : C.bright, fontSize: '22px', flexShrink: 0 }}>
                  {'>'}
                </span>
                <input
                  ref={inputRef}
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(false) }}
                  onKeyDown={handleKeyDown}
                  className="font-console"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: error ? C.red : C.text,
                    fontSize: '22px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    caretColor: C.bright,
                  }}
                  placeholder="ENTER ACCESS CODE"
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Access code input"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!password.trim()}
                  className="cursor-pointer transition-opacity hover:opacity-100"
                  style={{
                    color: password.trim() ? C.dim : C.border,
                    fontSize: '18px',
                    letterSpacing: '0.1em',
                    border: `1px solid ${password.trim() ? C.border : 'transparent'}`,
                    padding: '2px 8px',
                    opacity: password.trim() ? 0.75 : 0.3,
                    flexShrink: 0,
                    transition: 'opacity 200ms',
                    cursor: password.trim() ? 'pointer' : 'default',
                  }}
                  aria-label="Submit access code"
                >
                  AUTH
                </button>
              </div>
            </div>
          )}

          {/* Panel footer */}
          <div
            style={{
              borderTop: `1px solid ${C.border}`,
              padding: '6px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <span style={{ color: C.dim, fontSize: '13px', letterSpacing: '0.1em' }}>
              WEYLAND-YUTANI CORP. — ALL RIGHTS RESERVED
            </span>
            <span style={{ color: C.dim, fontSize: '13px', letterSpacing: '0.1em' }}>
              BUILD 2101.06
            </span>
          </div>

        </div>
      </div>

      {/* ── Bottom status bar ────────────────────────────────── */}
      <div
        style={{
          borderTop: `1px solid ${C.border}`,
          padding: '6px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <span style={{ color: C.dim, fontSize: '15px', letterSpacing: '0.08em', flexShrink: 0 }}>
          HULL INTEGRITY: 94%
        </span>
        <span style={{ color: C.border, flexShrink: 0 }}>·</span>
        <span style={{ color: C.dim, fontSize: '15px', letterSpacing: '0.08em', flexShrink: 0 }}>
          LIFE SUPPORT: ONLINE
        </span>
        <span style={{ color: C.border, flexShrink: 0 }}>·</span>
        <span style={{ color: C.dim, fontSize: '15px', letterSpacing: '0.08em', flexShrink: 0 }}>
          HYPERSLEEP: READY
        </span>
        <span style={{ color: C.border, flexShrink: 0 }}>·</span>
        <span
          style={{
            color: attempts > 0 ? C.red : C.dim,
            fontSize: '15px',
            letterSpacing: '0.08em',
            flexShrink: 0,
          }}
        >
          AUTH ATTEMPTS: {attempts}/3
        </span>
      </div>

    </div>
  )
}
