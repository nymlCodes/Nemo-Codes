'use client'

import React, { useEffect, useState } from 'react'

/**
 * NemoBackground — Global Typographic Watermark
 *
 * Responsive orientation:
 * - Desktop (≥ 768px): NEMO horizontal — centered large typographic watermark
 * - Mobile / Tablet (< 768px): N E M O stacked vertically, centered
 *
 * Zero horizontal overflow guaranteed via overflow:hidden + contain:strict.
 * CSS media queries drive the switch — no JS screen detection needed.
 */
export default function NemoBackground() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Subtle mouse parallax on desktop fine-pointer devices only
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return
      const xNorm = (e.clientX / window.innerWidth - 0.5) * 10
      const yNorm = (e.clientY / window.innerHeight - 0.5) * 7
      setOffset({ x: xNorm, y: yNorm })
    }

    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none select-none overflow-hidden z-0"
      style={{ maxWidth: '100vw', maxHeight: '100vh', contain: 'strict' }}
      aria-hidden="true"
      role="presentation"
    >
      {/* ══════════════════════════════════════════
          DESKTOP (≥ 768px): Centered horizontal NEMO
          ══════════════════════════════════════════ */}
      <div
        className="nemo-desktop-wrapper hidden md:flex flex-col items-center justify-center w-full h-full max-w-full overflow-hidden"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="nemo-h-group flex flex-col items-center px-2">
          <span
            className="nemo-h-text font-bold tracking-[0.08em] text-white select-none whitespace-nowrap leading-none"
            style={{
              fontFamily: "'Syne', 'Outfit', sans-serif",
              fontSize: 'clamp(4.5rem, 18vw, 22rem)',
              textShadow: '0 0 80px rgba(255,255,255,0.05)',
            }}
          >
            NEMO
          </span>

          {/* Sub-label coordinates */}
          <div
            className="flex items-center gap-4 mt-2 opacity-20 text-[9px] font-mono tracking-[0.3em] text-white uppercase select-none"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span>// ARCHITECTURE</span>
            <span className="w-1 h-1 rounded-full bg-white opacity-50" />
            <span>IDENTITY</span>
            <span className="w-1 h-1 rounded-full bg-white opacity-50" />
            <span>2026 //</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE / TABLET (< 768px): Vertical stacked NEMO — centered
          Outer div = static position anchor (never animated).
          Inner div = float animation only — no position transform conflict.
          ══════════════════════════════════════════ */}
      <div
        className="flex md:hidden"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Inner handles the float animation */}
        <div className="nemo-vertical-wrapper flex flex-col items-center gap-[9vh] select-none">
          {(['N', 'E', 'M', 'O'] as const).map((letter) => (
            <span
              key={letter}
              className="nemo-v-letter font-bold text-white leading-none"
              style={{
                fontFamily: "'Syne', 'Outfit', sans-serif",
                fontSize: 'clamp(3rem, 18vw, 7rem)',
                textShadow: '0 0 60px rgba(255,255,255,0.08)',
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* ── Desktop: float + opacity pulse ── */
        .nemo-h-group {
          animation: nemoFloat 24s ease-in-out infinite alternate;
          will-change: transform;
        }

        .nemo-h-text {
          opacity: 0.062;
          animation: nemoPulse 16s ease-in-out infinite alternate;
        }

        /* ── Mobile vertical: gentle float + stronger opacity pulse ── */
        .nemo-vertical-wrapper {
          animation: nemoVertFloat 24s ease-in-out infinite alternate;
          will-change: transform;
        }

        .nemo-v-letter {
          opacity: 0.11;
          animation: nemoPulseMobile 16s ease-in-out infinite alternate;
        }

        @keyframes nemoFloat {
          0%   { transform: translateY(-5px) scale(0.993); }
          50%  { transform: translateY(4px)  scale(1.004); }
          100% { transform: translateY(-5px) scale(0.993); }
        }

        @keyframes nemoVertFloat {
          0%   { transform: translateY(-5px); }
          50%  { transform: translateY(4px); }
          100% { transform: translateY(-5px); }
        }

        /* Desktop pulse */
        @keyframes nemoPulse {
          0%   { opacity: 0.048; }
          50%  { opacity: 0.068; }
          100% { opacity: 0.048; }
        }

        /* Mobile pulse (brighter) */
        @keyframes nemoPulseMobile {
          0%   { opacity: 0.09; }
          50%  { opacity: 0.13; }
          100% { opacity: 0.09; }
        }

        @media (prefers-reduced-motion: reduce) {
          .nemo-h-group,
          .nemo-vertical-wrapper,
          .nemo-h-text,
          .nemo-v-letter {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}