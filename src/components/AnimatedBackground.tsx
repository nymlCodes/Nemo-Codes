'use client'

import React, { useEffect, useRef } from 'react'

/**
 * AnimatedBackground — Smoky Wind Atmosphere
 *
 * Organic smoke/dust carried by wind, drifting diagonally from
 * bottom-left toward top-right. Intentionally sparse and atmospheric —
 * creates depth without competing with content.
 *
 * Particle types:
 * - Soft micro-dots (blurred, low opacity)
 * - Short directional streaks with gradient fade
 * - Translucent wisps (slightly elongated ellipses)
 *
 * Visual hierarchy:
 *   Content (z-10) → NEMO (z-0) → Wind (-z-20) → Base bg (-z-30)
 *
 * Performance: ~28-34 particles, 60fps canvas, respects prefers-reduced-motion.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Pre-render reusable particle sprites on offscreen canvases to eliminate GC overhead
    // Sprite 1: Soft radial glow (used for micro-dots and wisps)
    const radialSprite = document.createElement('canvas')
    radialSprite.width = 64
    radialSprite.height = 64
    const radCtx = radialSprite.getContext('2d')
    if (radCtx) {
      const grad = radCtx.createRadialGradient(32, 32, 0, 32, 32, 32)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)')
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
      radCtx.fillStyle = grad
      radCtx.beginPath()
      radCtx.arc(32, 32, 32, 0, Math.PI * 2)
      radCtx.fill()
    }

    // Sprite 2: Soft directional streak with gradient fade
    const streakSprite = document.createElement('canvas')
    streakSprite.width = 64
    streakSprite.height = 16
    const strkCtx = streakSprite.getContext('2d')
    if (strkCtx) {
      const grad = strkCtx.createLinearGradient(0, 0, 64, 0)
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)')
      grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.5)')
      grad.addColorStop(1, 'rgba(255, 255, 255, 1)')
      strkCtx.fillStyle = grad
      strkCtx.fillRect(0, 6, 64, 4)
    }

    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (!canvas) return
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
      }, 150)
    }
    window.addEventListener('resize', handleResize)

    // Three particle types for organic variety
    type ParticleType = 'dot' | 'streak' | 'wisp'

    interface Particle {
      x: number
      y: number
      speed: number
      angle: number
      type: ParticleType
      size: number
      streakLength: number
      opacity: number
      phase: number
      waveAmp: number
      wispRatio: number
    }

    // Sparse: ~24-28 beautiful particles
    const particleCount = Math.min(Math.max(Math.floor(width / 55), 18), 28)

    const createParticle = (initRandom = true): Particle => {
      const baseAngle = -0.62 + (Math.random() - 0.5) * 0.22
      const speed = 0.45 + Math.random() * 0.6
      const rand = Math.random()
      const type: ParticleType = rand < 0.35 ? 'dot' : rand < 0.70 ? 'streak' : 'wisp'

      let startX: number
      let startY: number

      if (initRandom) {
        startX = Math.random() * (width + 300) - 150
        startY = Math.random() * (height + 300) - 150
      } else {
        if (Math.random() > 0.38) {
          startX = Math.random() * (width * 0.9) - 60
          startY = height + 20 + Math.random() * 30
        } else {
          startX = -30 - Math.random() * 20
          startY = height * 0.25 + Math.random() * (height * 0.75)
        }
      }

      return {
        x: startX,
        y: startY,
        speed,
        angle: baseAngle,
        type,
        size:
          type === 'dot'
            ? 0.9 + Math.random() * 1.3
            : type === 'streak'
            ? 0.5 + Math.random() * 0.6
            : 1.2 + Math.random() * 1.8,
        streakLength: 14 + Math.random() * 22,
        opacity:
          type === 'wisp'
            ? 0.025 + Math.random() * 0.04
            : 0.03 + Math.random() * 0.055,
        phase: Math.random() * Math.PI * 2,
        waveAmp: 0.12 + Math.random() * 0.22,
        wispRatio: 2.5 + Math.random() * 2.5,
      }
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () =>
      createParticle(true)
    )

    let time = 0
    let isPaused = false

    const handleVisibilityChange = () => {
      isPaused = document.hidden
      if (!isPaused) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = requestAnimationFrame(render)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const render = () => {
      if (isPaused) return

      ctx.clearRect(0, 0, width, height)
      time += 0.01

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        const vx = Math.cos(p.angle) * p.speed
        const vy = Math.sin(p.angle) * p.speed

        p.x += vx
        p.y += vy + Math.sin(time * 0.9 + p.phase) * p.waveAmp

        if (p.x > width + 60 || p.y < -60) {
          const fresh = createParticle(false)
          Object.assign(p, fresh)
        }

        ctx.globalAlpha = p.opacity

        if (p.type === 'streak') {
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.angle)
          ctx.drawImage(streakSprite, -p.streakLength, -p.size, p.streakLength, p.size * 2)
          ctx.restore()
        } else if (p.type === 'wisp') {
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.angle)
          const wispW = p.size * p.wispRatio * 2
          const wispH = p.size * 2
          ctx.drawImage(radialSprite, -wispW / 2, -wispH / 2, wispW, wispH)
          ctx.restore()
        } else {
          const d = p.size * 3.6
          ctx.drawImage(radialSprite, p.x - d / 2, p.y - d / 2, d, d)
        }
      }

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 -z-30 pointer-events-none overflow-hidden select-none bg-[#050507]"
      style={{
        maxWidth: '100vw',
        maxHeight: '100vh',
        contain: 'strict',
      }}
      aria-hidden="true"
    >
      {/* Deep tonal vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 15%, rgba(22, 22, 30, 0.45) 0%, rgba(5, 5, 7, 0.95) 75%, #050507 100%)',
        }}
      />

      {/* Subtle architectural horizon light — very soft monochromatic glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[400px] opacity-[0.04] blur-[140px] pointer-events-none rounded-full"
        style={{
          background:
            'radial-gradient(circle, #ffffff 0%, rgba(255, 255, 255, 0.1) 60%, transparent 80%)',
        }}
      />

      {/* Smoky wind canvas (Bottom-Left ↗ Top-Right) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
}
