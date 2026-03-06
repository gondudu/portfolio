'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Props {
  color: string
  dim: string
  border: string
  amber: string
}

export default function XenomorphAnim({ color, dim, border, amber }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const tid = setTimeout(() => setVisible(true), 120)
    return () => clearTimeout(tid)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: 0,
          right: 0,
          textAlign: 'center',
          color: amber,
          fontSize: '11px',
          letterSpacing: '0.14em',
          zIndex: 10,
        }}
      >
        ⚠ SPECIMEN IDENTIFIED ⚠
      </div>

      {/* Xenomorph image */}
      <div style={{ position: 'relative', width: '100%', flex: 1 }}>
        <Image
          src="/images/alien.jpg"
          alt="Xenomorph XX121"
          fill
          className="object-contain"
          style={{ filter: `drop-shadow(0 0 12px ${color})` }}
          sizes="400px"
        />
      </div>

      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: `1px solid ${border}`,
          padding: '6px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#050a05',
        }}
      >
        <span style={{ color: dim, fontSize: '10px', letterSpacing: '0.06em' }}>XENOMORPH XX121 / LV-426</span>
        <span style={{ color: amber, fontSize: '10px', letterSpacing: '0.06em' }}>THREAT: CRITICAL</span>
      </div>
    </div>
  )
}
