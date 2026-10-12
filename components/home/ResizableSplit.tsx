'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

// Bio column width is a fraction of the viewport, so it scales with the
// window instead of being a fixed pixel count. Loads at one third.
const DEFAULT_FRACTION = 1 / 3
const MIN_FRACTION = 0.22
const MAX_FRACTION = 0.5
const KEY_STEP = 0.0125
const STORAGE_KEY = 'bio-column-fraction'

// Mobile sheet: how much of it shows while collapsed (handle + first lines).
const SHEET_PEEK = 112
const HANDLE_HEIGHT = 28
// Dragging past this many px counts as a drag, not a tap on the handle.
const DRAG_THRESHOLD = 6

function clamp(n: number) {
  return Math.min(MAX_FRACTION, Math.max(MIN_FRACTION, n))
}

/**
 * One bio panel, two layouts — after tee.works.
 *
 * md+: a left column that is 1/3 of the viewport by default, user-draggable
 * via the hairline between it and the work. The chosen fraction is remembered
 * per-browser; double-click the hairline to reset.
 *
 * Below md: the same panel becomes a bottom sheet over the work. It peeks at
 * the bottom edge showing a handle and the first lines of the bio; tap or
 * drag the handle to open it, tap the backdrop (or Escape) to close.
 */
export default function ResizableSplit({ bio, work }: { bio: ReactNode; work: ReactNode }) {
  const [fraction, setFraction] = useState(DEFAULT_FRACTION)
  const dragState = useRef<{ startX: number; startFraction: number } | null>(null)

  const [expanded, setExpanded] = useState(false)
  // px the sheet is translated down while a finger is dragging it; null otherwise.
  const [sheetDrag, setSheetDrag] = useState<number | null>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const sheetDragState = useRef<{ startY: number; startOffset: number; moved: boolean } | null>(null)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored && Number.isFinite(Number(stored))) setFraction(clamp(Number(stored)))
    } catch {
      // Private browsing / storage disabled — fall back to the default width.
    }
  }, [])

  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expanded])

  const persist = useCallback((value: number) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(value))
    } catch {
      // Nothing to persist to — the width still holds for this session.
    }
  }, [])

  /* ── Desktop: column resize ─────────────────────────────────── */

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!dragState.current) return
    const { startX, startFraction } = dragState.current
    setFraction(clamp(startFraction + (e.clientX - startX) / window.innerWidth))
  }, [])

  const stopDrag = useCallback(() => {
    dragState.current = null
    document.body.style.cursor = ''
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', stopDrag)
    setFraction((f) => {
      persist(f)
      return f
    })
  }, [onPointerMove, persist])

  function startDrag(e: React.PointerEvent) {
    e.preventDefault()
    dragState.current = { startX: e.clientX, startFraction: fraction }
    document.body.style.cursor = 'col-resize'
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', stopDrag)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      const next = clamp(fraction + (e.key === 'ArrowRight' ? KEY_STEP : -KEY_STEP))
      setFraction(next)
      persist(next)
    }
  }

  function resetWidth() {
    setFraction(DEFAULT_FRACTION)
    persist(DEFAULT_FRACTION)
  }

  /* ── Mobile: bottom sheet ───────────────────────────────────── */

  function collapsedOffset() {
    const height = sheetRef.current?.offsetHeight ?? 0
    return Math.max(0, height - SHEET_PEEK)
  }

  function onHandleDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId)
    sheetDragState.current = {
      startY: e.clientY,
      startOffset: expanded ? 0 : collapsedOffset(),
      moved: false,
    }
  }

  function onHandleMove(e: React.PointerEvent) {
    const s = sheetDragState.current
    if (!s) return
    const dy = e.clientY - s.startY
    if (!s.moved && Math.abs(dy) < DRAG_THRESHOLD) return
    s.moved = true
    setSheetDrag(Math.min(collapsedOffset(), Math.max(0, s.startOffset + dy)))
  }

  function onHandleUp() {
    const s = sheetDragState.current
    sheetDragState.current = null
    if (!s) return
    if (!s.moved) {
      setExpanded((v) => !v)
    } else if (sheetDrag !== null) {
      // Snap to whichever end the sheet is closer to.
      setExpanded(sheetDrag < collapsedOffset() / 2)
    }
    setSheetDrag(null)
  }

  const sheetY =
    sheetDrag !== null
      ? `${sheetDrag}px`
      : expanded
        ? '0px'
        : `calc(100% - ${SHEET_PEEK}px - env(safe-area-inset-bottom))`

  return (
    <div
      className="flex flex-col md:flex-row md:h-full"
      style={
        {
          '--bio-width': `${(fraction * 100).toFixed(3)}vw`,
          '--sheet-y': sheetY,
        } as CSSProperties
      }
    >
      {/* Backdrop — mobile only, only while the sheet is open. */}
      {expanded && (
        <div
          className="fixed inset-0 z-20 bg-ink/30 md:hidden"
          onClick={() => setExpanded(false)}
          aria-hidden="true"
        />
      )}

      <div
        ref={sheetRef}
        className={[
          // mobile: fixed bottom sheet
          'fixed inset-x-0 bottom-0 z-30 h-[85dvh] bg-paper border-t border-ink',
          'max-md:translate-y-[var(--sheet-y)]',
          sheetDrag === null ? 'max-md:transition-transform max-md:duration-300 max-md:ease-swiss' : '',
          // md+: in-flow left column
          'md:static md:z-auto md:h-full md:border-t-0 md:w-[var(--bio-width)] md:shrink-0',
        ].join(' ')}
      >
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={expanded ? 'Close bio' : 'Open bio'}
          onPointerDown={onHandleDown}
          onPointerMove={onHandleMove}
          onPointerUp={onHandleUp}
          onPointerCancel={onHandleUp}
          // Pointer taps/drags are handled above; this covers Enter/Space,
          // which fire a click with no pointer events (detail === 0).
          onClick={(e) => {
            if (e.detail === 0) setExpanded((v) => !v)
          }}
          style={{ height: HANDLE_HEIGHT, touchAction: 'none' }}
          className="md:hidden relative flex w-full items-center justify-center"
        >
          <span className="block h-[3px] w-10 bg-muted" />
        </button>

        <div
          style={{ '--handle': `${HANDLE_HEIGHT}px` } as CSSProperties}
          // Collapsed: taps on the peeking text open the sheet instead of
          // landing on the content underneath.
          className={[
            'h-[calc(100%-var(--handle))] md:h-full',
            expanded ? '' : 'max-md:pointer-events-none',
          ].join(' ')}
        >
          {bio}
        </div>

        {!expanded && (
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setExpanded(true)}
            style={{ top: HANDLE_HEIGHT, height: SHEET_PEEK - HANDLE_HEIGHT }}
            className="md:hidden absolute inset-x-0"
          />
        )}
      </div>

      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize bio column"
        aria-valuemin={Math.round(MIN_FRACTION * 100)}
        aria-valuemax={Math.round(MAX_FRACTION * 100)}
        aria-valuenow={Math.round(fraction * 100)}
        tabIndex={0}
        onPointerDown={startDrag}
        onKeyDown={onKeyDown}
        onDoubleClick={resetWidth}
        className="relative hidden md:block w-px shrink-0 cursor-col-resize bg-ink outline-none focus-visible:bg-accent hover:bg-accent transition-colors duration-200 ease-swiss"
      >
        <span className="absolute inset-y-0 -left-2 -right-2" />
      </div>

      <div className="flex-1 min-w-0 md:h-full">{work}</div>
    </div>
  )
}
