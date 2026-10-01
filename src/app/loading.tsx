import React from 'react'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050507] overflow-hidden select-none">
      {/* Subtle deep horizon vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(20, 20, 28, 0.4) 0%, #050507 80%)',
        }}
      />

      {/* Core Architectural Loader */}
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Static outer ring */}
          <div className="absolute inset-0 rounded-full border border-white/10" />

          {/* Spinning stark white hairline ring */}
          <svg className="absolute inset-0 w-full h-full animate-spin" viewBox="0 0 100 100" style={{ animationDuration: '3s' }}>
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="60 220"
            />
          </svg>

          {/* Counter-rotating hairline ring */}
          <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-spin" viewBox="0 0 100 100" style={{ animationDuration: '5s', animationDirection: 'reverse' }}>
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="40 240"
            />
          </svg>

          {/* Center Monogram */}
          <span
            className="relative text-4xl font-extrabold text-white tracking-tighter"
            style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
          >
            N
          </span>
        </div>

        {/* Name & Status */}
        <div className="text-center space-y-1">
          <p
            className="text-white text-xs font-mono font-bold tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            NEYAMUL ISLAM
          </p>
          <p
            className="text-[#686874] text-[10px] tracking-[0.25em] uppercase font-mono"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            INITIALIZING ARCHITECTURE...
          </p>
        </div>
      </div>
    </div>
  )
}
