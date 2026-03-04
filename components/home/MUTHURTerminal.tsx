'use client'

import { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react'
import { MOTHER_RESPONSES, BOOT_SEQUENCE } from '@/lib/console-data'
import { useTerminalQueue } from '@/hooks/useTypewriter'

interface Props {
  alertMode: boolean
  onSecretOrder?: () => void
}

export default function MUTHURTerminal({ alertMode, onSecretOrder }: Props) {
  const { completedLines, currentDisplay, enqueue } = useTerminalQueue()
  const [inputValue, setInputValue] = useState('')
  const outputRef = useRef<HTMLDivElement>(null)
  const bootedRef = useRef(false)

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [completedLines, currentDisplay])

  // Boot sequence (once)
  useEffect(() => {
    if (bootedRef.current) return
    bootedRef.current = true
    const timer = setTimeout(() => {
      enqueue(BOOT_SEQUENCE, 18)
    }, 400)
    return () => clearTimeout(timer)
  }, [enqueue])

  // Secret button sequence event
  useEffect(() => {
    const handler = () => {
      enqueue(MOTHER_RESPONSES.secret_sequence, 50)
    }
    window.addEventListener('mother-secret-sequence', handler)
    return () => window.removeEventListener('mother-secret-sequence', handler)
  }, [enqueue])

  // Alert mode announcement
  const prevAlertRef = useRef(false)
  useEffect(() => {
    if (alertMode && !prevAlertRef.current) {
      enqueue([
        '⚠ ⚠ ⚠ PROXIMITY ALERT ⚠ ⚠ ⚠',
        'HOSTILE ENTITY DETECTED.',
        'ALL PERSONNEL TO EMERGENCY STATIONS.',
        'INITIATING CONTAINMENT PROTOCOL...',
      ], 30)
    }
    if (!alertMode && prevAlertRef.current) {
      enqueue(['ALERT MODE CLEARED. RESUMING NORMAL OPERATIONS.'], 25)
    }
    prevAlertRef.current = alertMode
  }, [alertMode, enqueue])

  const handleSubmit = useCallback(() => {
    const query = inputValue.trim()
    if (!query) return
    setInputValue('')

    enqueue([`> ${query.toUpperCase()}`], 0)

    const lower = query.toLowerCase()
    let responseKey = 'default'

    if (lower.includes('special order 937') || lower.includes('order 937')) {
      responseKey = 'special_order_937'
      onSecretOrder?.()
    } else if (lower.includes('crew') || lower.includes('manifest') || lower.includes('who')) {
      responseKey = 'crew'
    } else if (
      lower.includes('work') ||
      lower.includes('project') ||
      lower.includes('mission') ||
      lower.includes('portfolio')
    ) {
      responseKey = 'work'
    } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email')) {
      responseKey = 'contact'
    } else if (lower.includes('skill') || lower.includes('design') || lower.includes('experience')) {
      responseKey = 'skills'
    } else if (
      lower.includes('hello') ||
      lower.includes('hi') ||
      lower.includes('hey') ||
      lower.includes('morning') ||
      lower.includes('mother')
    ) {
      responseKey = 'greeting'
    }

    const responses = MOTHER_RESPONSES[responseKey]
    const delay = responseKey === 'special_order_937' ? 70 : 25

    setTimeout(() => {
      enqueue(responses, delay)
    }, 150)
  }, [inputValue, enqueue, onSecretOrder])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
  }

  const borderColor = alertMode ? 'border-console-red' : 'border-console-border'
  const inputBorder = alertMode ? 'border-console-red' : 'border-console-phosphor-dim'
  const textColor = alertMode ? 'text-console-red' : 'text-console-phosphor'
  const dimColor = alertMode ? 'text-console-red opacity-60' : 'text-console-phosphor-dim'

  return (
    <div
      className={`crt-monitor crt-screen-glow crt-flicker h-full border ${borderColor} bg-console-panel flex flex-col transition-colors duration-300`}
    >
      {/* Terminal header */}
      <div className={`flex items-center gap-2 px-3 py-2 border-b ${borderColor} ${dimColor} font-console text-xs`}>
        <span>MU-TH-UR 6000</span>
        <span>■</span>
        <span>MAIN INTERFACE</span>
        <span className="ml-auto">ONLINE</span>
      </div>

      {/* Output area */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto px-3 py-2 font-console text-sm leading-relaxed"
        style={{ scrollbarWidth: 'none' }}
      >
        {completedLines.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-console-phosphor-bright' : textColor}>
            {line || '\u00A0'}
          </div>
        ))}
        {currentDisplay !== null && (
          <div className={`${textColor} cursor-blink`}>{currentDisplay}</div>
        )}
      </div>

      {/* Input area */}
      <div className={`border-t ${inputBorder} px-3 py-2 flex items-center gap-2`}>
        <span className={`font-console text-sm ${textColor}`}>{'>'}</span>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`flex-1 bg-transparent font-console text-sm outline-none ${textColor} placeholder-console-phosphor-dim`}
          placeholder="ENTER QUERY..."
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={handleSubmit}
          className={`font-console text-xs transition-colors px-2 py-0.5 border ${inputBorder} ${alertMode ? 'text-console-red/60 hover:text-console-red' : 'text-console-phosphor-dim hover:text-console-phosphor'}`}
        >
          SEND
        </button>
      </div>
    </div>
  )
}
