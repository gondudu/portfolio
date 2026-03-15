'use client'

import Link from 'next/link'

export default function Rhythmus21Page() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#141414', color: '#e0e0e0' }}>

      {/* Top padding for fixed global header */}
      <div className="pt-[64px]" />

      {/* Back button */}
      <div className="px-6 pt-8 pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
          style={{ fontFamily: 'var(--font-jost)', color: '#888' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Work
        </Link>
      </div>

      {/* Video container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 pb-16">
        <div style={{ width: '100%', maxWidth: '960px' }}>
          <video
            controls
            style={{
              width: '100%',
              display: 'block',
              backgroundColor: '#000',
            }}
          >
            <source src="/images/projects/project-06/rythmus.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

    </div>
  )
}
