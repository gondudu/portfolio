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
}

const PLACEHOLDER = 'bg-[#1C1C1A]'

// Shared across every block on the page: pressing play on one pauses
// whichever other video was playing, so only one ever runs at a time.
let currentlyPlaying: HTMLVideoElement | null = null

/**
 * Self-contained media + caption, no link to a detail page — the image/video
 * is expected to explain the work on its own, the caption just adds role context.
 */
export default function ProjectMediaBlock({ item }: { item: ScrollItem }) {
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

  // Paused videos default to a black frame. These films open on a black
  // title card too, so parking at t=1s just trades one black frame for
  // another — seek past the title/problem/solution cards into the actual
  // product-demo footage instead.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const showFrame = () => {
      const duration = video.duration || 10
      video.currentTime = Math.min(10, Math.max(1, duration - 0.5))
    }
    // HAVE_METADATA (1) can already be true by the time this effect runs —
    // same hydration-timing gap as the image-error check above.
    if (video.readyState >= 1) showFrame()
    video.addEventListener('loadedmetadata', showFrame)
    return () => video.removeEventListener('loadedmetadata', showFrame)
  }, [])

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
            <span className="text-label uppercase text-muted">{item.title}</span>
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
                className="group absolute inset-0 flex items-center justify-center"
              >
                <span className="flex h-16 w-16 items-center justify-center bg-ink/90 transition-transform duration-200 ease-swiss group-hover:scale-105">
                  <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden="true">
                    <path d="M0 0L20 11L0 22V0Z" fill="#0A0A0A" />
                  </svg>
                </span>
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
    </div>
  )
}
