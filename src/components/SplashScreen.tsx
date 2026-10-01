'use client'

import React, { useEffect, useState } from 'react'

interface SplashScreenProps {
  onFinished?: () => void
}

export default function SplashScreen({ onFinished }: SplashScreenProps) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in')

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const holdTimer = setTimeout(() => setPhase('hold'), 700)
    const fadeTimer = setTimeout(() => setPhase('out'), 1800)
    const doneTimer = setTimeout(() => onFinished?.(), 2500)

    return () => {
      document.body.style.overflow = ''
      clearTimeout(holdTimer)
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onFinished])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#050507',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'out' ? 0 : 1,
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: phase === 'out' ? 'none' : 'auto',
      }}
    >
      {/* Content */}
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          opacity: phase === 'in' ? 0 : 1,
          transform: phase === 'in' ? 'translateY(16px)' : 'translateY(0)',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            color: '#82828e',
            letterSpacing: '0.3em',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            marginBottom: '18px',
          }}
        >
          STUDIO INDEX // 2026
        </p>

        <h1
          style={{
            fontFamily: "'Syne', 'Outfit', sans-serif",
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            marginBottom: '14px',
          }}
        >
          NEYAMUL ISLAM
        </h1>

        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#a8a8b4',
            fontWeight: 400,
            fontSize: '0.95rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          MERN Stack Developer & Software Architect
        </p>

        {/* Minimal Hairline Progress */}
        <div
          style={{
            width: '80px',
            height: '1px',
            background: 'rgba(255, 255, 255, 0.1)',
            margin: '2rem auto 0',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#ffffff',
              animation: 'splashBar 1.2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes splashBar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
