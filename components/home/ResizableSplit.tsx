'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

const MIN_WIDTH = 280
const MAX_WIDTH = 600
const DEFAULT_WIDTH = 420
const STORAGE_KEY = 'bio-column-width'

function clamp(n: number) {
  return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, n))
}

/**
 * Fixed-width bio pane + flexible work pane, after tee.works — but here the
 * bio's width is user-draggable via the hairline between them. Width is
 * remembered per-browser (localStorage); only engages at md+, mobile stays
 * a plain stacked column.
 */
export default function ResizableSplit({ bio, work }: { bio: ReactNode; work: ReactNode }) {
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const dragState = useRef<{ startX: number; startWidth: number } | null>(null)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) setWidth(clamp(Number(stored)))
    } catch {
      // Private browsing / storage disabled — fall back to the default width.
    }
  }, [])

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!dragState.current) return
    const { startX, startWidth } = dragState.current
    setWidth(clamp(startWidth + (e.clientX - startX)))
  }, [])

  const stopDrag = useCallback(() => {
    dragState.current = null
    document.body.style.cursor = ''
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', stopDrag)
    setWidth((w) => {
      try {
        window.localStorage.setItem(STORAGE_KEY, String(w))
      } catch {
        // Nothing to persist to — the width still holds for this session.
      }
      return w
    })
  }, [onPointerMove])

  function startDrag(e: React.PointerEvent) {
    e.preventDefault()
    dragState.current = { startX: e.clientX, startWidth: width }
    document.body.style.cursor = 'col-resize'
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', stopDrag)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') setWidth((w) => clamp(w - 16))
    if (e.key === 'ArrowRight') setWidth((w) => clamp(w + 16))
  }

  return (
    <div className="flex flex-col md:flex-row md:h-full" style={{ '--bio-width': `${width}px` } as CSSProperties}>
      <div className="w-full md:w-[var(--bio-width)] md:h-full md:shrink-0">{bio}</div>

      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize bio column"
        aria-valuemin={MIN_WIDTH}
        aria-valuemax={MAX_WIDTH}
        aria-valuenow={Math.round(width)}
        tabIndex={0}
        onPointerDown={startDrag}
        onKeyDown={onKeyDown}
        className="relative hidden md:block w-px shrink-0 cursor-col-resize bg-rule outline-none focus-visible:bg-accent hover:bg-accent transition-colors duration-200 ease-swiss"
      >
        <span className="absolute inset-y-0 -left-2 -right-2" />
      </div>

      <div className="flex-1 min-w-0 md:h-full">{work}</div>
    </div>
  )
}
