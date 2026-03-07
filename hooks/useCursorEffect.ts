'use client'

import { useEffect } from 'react'

const AMBER     = '#e8a000'
const SIZE      = 10   // default square size (px)
const SIZE_HOVER = 15  // square size on button hover
const TRAIL_MAX = 12
const TRAIL_MS  = 260  // how long a trail echo lives

interface TrailPoint { x: number; y: number; t: number }

export function useCursorEffect() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = document.createElement('canvas')
    canvas.style.cssText =
      'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9998;'
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')!

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width  = window.innerWidth  * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()
    window.addEventListener('resize', setSize)

    document.body.style.cursor = 'none'

    let mouseX = -200, mouseY = -200
    let onPage   = false
    let hovering = false
    let currentSize = SIZE  // smoothly interpolated
    const trail: TrailPoint[] = []

    // Hover detection via rect cache
    type El = { el: HTMLElement; rect: DOMRect }
    let els: El[] = []
    const refresh = () => {
      els = Array.from(
        document.querySelectorAll<HTMLElement>('button, a[href], input, [role="button"]')
      ).map(el => ({ el, rect: el.getBoundingClientRect() }))
    }
    refresh()
    const refreshId = setInterval(refresh, 800)

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY; onPage = true
      trail.push({ x: mouseX, y: mouseY, t: Date.now() })
      if (trail.length > TRAIL_MAX) trail.shift()
    }
    const onLeave = () => { onPage = false }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    let rafId: number

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      if (!onPage) return

      const now = Date.now()

      // Hover check
      hovering = els.some(({ rect }) =>
        mouseX >= rect.left && mouseX <= rect.right &&
        mouseY >= rect.top  && mouseY <= rect.bottom
      )

      // Lerp cursor size toward target
      const target = hovering ? SIZE_HOVER : SIZE
      currentSize += (target - currentSize) * 0.18

      // Draw trail echoes (oldest → newest, so live cursor paints on top)
      trail.forEach((pt, i) => {
        const age      = now - pt.t
        if (age > TRAIL_MS) return
        const progress = age / TRAIL_MS                    // 0 (fresh) → 1 (gone)
        const alpha    = (1 - progress) * 0.55            // fade out
        const s        = currentSize * (1 - progress * 0.3) // slightly shrink with age
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle   = AMBER
        ctx.fillRect(
          Math.round(pt.x - s / 2),
          Math.round(pt.y - s / 2),
          Math.round(s),
          Math.round(s),
        )
        ctx.restore()
      })

      // Draw live cursor square
      const s = currentSize
      ctx.fillStyle   = AMBER
      ctx.globalAlpha = 1
      ctx.fillRect(
        Math.round(mouseX - s / 2),
        Math.round(mouseY - s / 2),
        Math.round(s),
        Math.round(s),
      )
    }

    tick()

    return () => {
      cancelAnimationFrame(rafId)
      clearInterval(refreshId)
      window.removeEventListener('resize', setSize)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.body.style.cursor = ''
      canvas.remove()
    }
  }, [])
}
