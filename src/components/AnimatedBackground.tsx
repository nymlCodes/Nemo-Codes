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

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
      wispRatio: number // wisp width/height ratio for elongated ellipses
    }

    // Sparse: ~28 beautiful particles rather than 300 obvious ones
    const particleCount = Math.min(Math.max(Math.floor(width / 50), 20), 32)

    const createParticle = (initRandom = true): Particle => {
      // Wind direction: bottom-left → top-right (~-36° from horizontal)
      // baseAngle in radians: cos gives rightward motion, sin gives upward (negative y)
      const baseAngle = -0.62 + (Math.random() - 0.5) * 0.22

      const speed = 0.45 + Math.random() * 0.6

      // Weighted type distribution: more streaks/wisps than plain dots for smoke feel
      const rand = Math.random()
      const type: ParticleType = rand < 0.35 ? 'dot' : rand < 0.70 ? 'streak' : 'wisp'

      let startX: number
      let startY: number

      if (initRandom) {
        // Scatter across entire canvas at start
        startX = Math.random() * (width + 300) - 150
        startY = Math.random() * (height + 300) - 150
      } else {
        // Spawn from bottom or left edge so particles flow into view naturally
        if (Math.random() > 0.38) {
          // Bottom edge
          startX = Math.random() * (width * 0.9) - 60
          startY = height + 20 + Math.random() * 30
        } else {
          // Left edge
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
        size: type === 'dot'
          ? 0.9 + Math.random() * 1.3
          : type === 'streak'
          ? 0.5 + Math.random() * 0.6
          : 1.2 + Math.random() * 1.8,
        streakLength: 14 + Math.random() * 22,
        // Very low opacity — smoke is subtle, almost subconscious
        opacity: type === 'wisp'
          ? 0.025 + Math.random() * 0.04
          : 0.03 + Math.random() * 0.055,
        phase: Math.random() * Math.PI * 2,
        // Gentle sine drift — wind isn't perfectly straight
        waveAmp: 0.12 + Math.random() * 0.22,
        wispRatio: 2.5 + Math.random() * 2.5,
      }
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () =>
      createParticle(true)
    )

    let time = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      time += 0.010

      if (prefersReducedMotion) return

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move diagonally from bottom-left toward top-right
        const vx = Math.cos(p.angle) * p.speed
        const vy = Math.sin(p.angle) * p.speed

        p.x += vx
        // Gentle lateral sine drift for organic feel
        p.y += vy + Math.sin(time * 0.9 + p.phase) * p.waveAmp

        // Recycle when particle exits the top or right edge
        if (p.x > width + 60 || p.y < -60) {
          const fresh = createParticle(false)
          Object.assign(p, fresh)
        }

        ctx.save()

        if (p.type === 'streak') {
          // Directional streak aligned with wind vector, gradient fade at tail
          const tailX = p.x - Math.cos(p.angle) * p.streakLength
          const tailY = p.y - Math.sin(p.angle) * p.streakLength

          const grad = ctx.createLinearGradient(tailX, tailY, p.x, p.y)
          grad.addColorStop(0, 'rgba(255,255,255,0)')
          grad.addColorStop(0.6, `rgba(255,255,255,${p.opacity * 0.5})`)
          grad.addColorStop(1, `rgba(255,255,255,${p.opacity})`)

          ctx.beginPath()
          ctx.strokeStyle = grad
          ctx.lineWidth = p.size
          ctx.lineCap = 'round'
          ctx.moveTo(tailX, tailY)
          ctx.lineTo(p.x, p.y)
          ctx.stroke()

        } else if (p.type === 'wisp') {
          // Translucent elongated ellipse — smoke wisp
          ctx.translate(p.x, p.y)
          ctx.rotate(p.angle)

          const wispW = p.size * p.wispRatio
          const wispH = p.size

          const radGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, wispW)
          radGrad.addColorStop(0, `rgba(255,255,255,${p.opacity})`)
          radGrad.addColorStop(1, 'rgba(255,255,255,0)')

          ctx.beginPath()
          ctx.scale(1, wispH / wispW)
          ctx.arc(0, 0, wispW, 0, Math.PI * 2)
          ctx.fillStyle = radGrad
          ctx.fill()

        } else {
          // Soft atmospheric micro-dot with radial gradient (blurred edges)
          const r = p.size
          const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 1.8)
          radGrad.addColorStop(0, `rgba(255,255,255,${p.opacity})`)
          radGrad.addColorStop(1, 'rgba(255,255,255,0)')

          ctx.beginPath()
          ctx.arc(p.x, p.y, r * 1.8, 0, Math.PI * 2)
          ctx.fillStyle = radGrad
          ctx.fill()
        }

        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
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
