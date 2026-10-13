'use client'

import { useEffect, useRef, useState } from 'react'

export interface ScrollItem {
  slug: string
  title: string
  /** Short description of the role or the piece — stands in for a case-study page. */
  caption: string
  meta?: string
  /** Still image for now; swap for an .mp4/.webm here once the animation is ready — same component. */
  media: string
  /** For videos: timestamp (seconds) of the paused poster frame. See the poster effect below. */
  posterTime?: number
}

const PLACEHOLDER = 'bg-wash'

const pad = (n: number) => String(n).padStart(2, '0')

// Shared across every block on the page: pressing play on one pauses
// whichever other video was playing, so only one ever runs at a time.
let currentlyPlaying: HTMLVideoElement | null = null

/**
 * Self-contained media + caption, no link to a detail page — the image/video
 * is expected to explain the work on its own, the caption just adds role context.
 */
export default function ProjectMediaBlock({
  item,
  index,
  total,
}: {
  item: ScrollItem
  index: number
  total: number
}) {
  const [errored, setErrored] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isVideo = item.media.endsWith('.mp4') || item.media.endsWith('.webm')

  // A failed request can resolve before hydration attaches the onError
  // handler, so an img already `complete` with no pixels on mount is
  // treated as broken too, not just one that errors after the fact.
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth === 0) {
      setErrored(true)
    }
  }, [])

  // Paused videos default to their first frame. These films open on a black
  // title card, so that first frame reads as a dead black rectangle — park on
  // a hand-picked frame from the demo footage instead (item.posterTime, chosen
  // per film). Without one, fall back to ~40% in, past the usual intro cards.
  // Playback itself still starts from 0 — see handlePlay.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const showFrame = () => {
      const duration = video.duration || 0
      const target =
        item.posterTime ?? Math.min(10, duration * 0.4)
      video.currentTime = Math.max(0, Math.min(target, duration - 0.05 || target))
    }
    // HAVE_METADATA (1) can already be true by the time this effect runs —
    // same hydration-timing gap as the image-error check above.
    if (video.readyState >= 1) showFrame()
    video.addEventListener('loadedmetadata', showFrame)
    return () => video.removeEventListener('loadedmetadata', showFrame)
  }, [item.posterTime])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const stop = () => {
      setIsPlaying(false)
      if (currentlyPlaying === video) currentlyPlaying = null
    }
    video.addEventListener('pause', stop)
    video.addEventListener('ended', stop)
    return () => {
      video.removeEventListener('pause', stop)
      video.removeEventListener('ended', stop)
      if (currentlyPlaying === video) currentlyPlaying = null
    }
  }, [])

  function handlePlay() {
    const video = videoRef.current
    if (!video) return
    if (currentlyPlaying && currentlyPlaying !== video) {
      currentlyPlaying.pause()
    }
    currentlyPlaying = video
    video.currentTime = 0
    void video.play()
    setIsPlaying(true)
  }

  return (
    <div>
      <div className={`relative overflow-hidden aspect-[16/9] ${PLACEHOLDER}`}>
        {errored ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="mono-label text-muted">{item.title}</span>
          </div>
        ) : isVideo ? (
          <>
            <video
              ref={videoRef}
              src={item.media}
              playsInline
              preload="metadata"
              controls={isPlaying}
              onError={() => setErrored(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {!isPlaying && (
              <button
                type="button"
                onClick={handlePlay}
                aria-label={`Play ${item.title}`}
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-paper transition-colors duration-200 ease-swiss hover:bg-accent"
              >
                <svg width="18" height="20" viewBox="0 0 9 10" aria-hidden="true" className="ml-1">
                  <path d="M0 0L9 5L0 10Z" fill="currentColor" />
                </svg>
              </button>
            )}
          </>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            ref={imgRef}
            src={item.media}
            alt={item.title}
            loading="lazy"
            onError={() => setErrored(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      {/* Index + role context. The media carries the work; this just labels it. */}
      <div className="grid grid-cols-1 gap-2 px-5 pt-3 md:px-6 lg:grid-cols-[1fr_2fr] lg:gap-6">
        <span className="mono-label text-muted">
          {pad(index + 1)} / {pad(total)}
        </span>
        <p className="max-w-[60ch] text-[15px] leading-[1.4]">{item.caption}</p>
      </div>
    </div>
  )
}
