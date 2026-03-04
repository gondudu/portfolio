'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface QueueItem {
  text: string
  delay: number
}

export function useTerminalQueue() {
  const queueRef = useRef<QueueItem[]>([])
  const [completedLines, setCompletedLines] = useState<string[]>([])
  const [typingState, setTypingState] = useState<{ text: string; charIdx: number; delay: number } | null>(null)
  const [queueVersion, setQueueVersion] = useState(0)

  // Advance typing by one char on each tick
  useEffect(() => {
    if (!typingState) return
    if (typingState.charIdx >= typingState.text.length) {
      // Line complete — add to output and clear
      setCompletedLines(prev => [...prev.slice(-49), typingState.text])
      setTypingState(null)
      return
    }
    const timer = setTimeout(() => {
      setTypingState(prev =>
        prev ? { ...prev, charIdx: prev.charIdx + 1 } : null
      )
    }, typingState.delay)
    return () => clearTimeout(timer)
  }, [typingState])

  // Dequeue next item when typing stops
  useEffect(() => {
    if (typingState) return
    if (queueRef.current.length === 0) return
    const next = queueRef.current.shift()!
    setTypingState({ text: next.text, charIdx: 0, delay: next.delay })
  }, [typingState, queueVersion])

  const enqueue = useCallback((lines: string[], delay = 25) => {
    for (const line of lines) {
      queueRef.current.push({ text: line, delay })
    }
    setQueueVersion(v => v + 1)
  }, [])

  const currentDisplay = typingState ? typingState.text.slice(0, typingState.charIdx) : null

  return { completedLines, currentDisplay, enqueue }
}
