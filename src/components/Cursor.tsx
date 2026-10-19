'use client'

import React, { useEffect, useRef, useState } from 'react'

type CursorState = 'default' | 'link' | 'card' | 'text'

/**
 * NEMO Shard Signature Cursor
 *
 * An angular, precision-cut asymmetric digital shard paired with a minimal broken-orbit motif.
 * Designed bespoke for the NEMO architectural editorial design system.
 *
 * Features:
 * - Asymmetric Shard Core: Dual-facet geometric crystal (#ffffff stark white + #dcdce4 architectural silver).
 * - Broken Orbit Motif: Segmented radar arc with technical alignment notches and kinetic secondary lag.
 * - Project Card Targeting Frame: Transforms into an architectural viewfinder frame with a monospace 'VIEW' label.
 * - Link / Button Aperture: Subtle rotation and expansion on interactive links and buttons.
 * - Geometric Click Compression: Snappy geometric pulse/contraction on mousedown.
 * - Text Usability: Fades out over inputs/textareas to preserve native I-beam cursor and caret selection.
 * - Hardware Acceleration & Idle Sleep: Zero React re-renders on movement; rAF sleeps completely when idle.
 * - Device & Motion Friendly: Automatically disabled on touch screens and prefers-reduced-motion.
 */
export default function CustomCursor() {
  const shardRef = useRef<HTMLDivElement | null>(null)
  const orbitRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<HTMLDivElement | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(pointer: fine)')
    const hoverQuery = window.matchMedia('(hover: hover)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const checkSupport = () => {
      const isFinePointer = finePointerQuery.matches
      const canHover = hoverQuery.matches
      const prefersReducedMotion = reducedMotionQuery.matches

      setEnabled(isFinePointer && canHover && !prefersReducedMotion)
    }

    checkSupport()

    finePointerQuery.addEventListener('change', checkSupport)
    hoverQuery.addEventListener('change', checkSupport)
    reducedMotionQuery.addEventListener('change', checkSupport)

    return () => {
      finePointerQuery.removeEventListener('change', checkSupport)
      hoverQuery.removeEventListener('change', checkSupport)
      reducedMotionQuery.removeEventListener('change', checkSupport)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const shard = shardRef.current
    const orbit = orbitRef.current
    const frame = frameRef.current
    if (!shard || !orbit || !frame) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let shardX = mouseX
    let shardY = mouseY
    let orbitX = mouseX
    let orbitY = mouseY

    let lastMouseX = mouseX
    let lastMouseY = mouseY
    let velocityX = 0
    let velocityY = 0

    let currentShardScale = 1
    let currentOrbitScale = 1
    let currentOrbitAngle = 0
    let currentFrameScale = 0.8

    let activeState: CursorState = 'default'
    let isMouseDown = false
    let isVisible = false
    let hasMoved = false
    let isRunning = false
    let animationFrameId: number

    const startAnimationLoop = () => {
      if (!isRunning) {
        isRunning = true
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    const applyCursorVisibility = () => {
      if (!shard || !orbit || !frame) return

      if (activeState === 'text') {
        // Over text inputs/textareas: hide custom cursor elements so native I-beam is visible
        shard.style.opacity = '0'
        orbit.style.opacity = '0'
        frame.style.opacity = '0'
      } else if (isVisible && hasMoved) {
        if (activeState === 'card') {
          // Hovering a project card: show geometric targeting frame with VIEW label
          shard.style.opacity = '0'
          orbit.style.opacity = '0'
          frame.style.opacity = '1'
        } else {
          // Default or link state: show shard and broken orbit
          shard.style.opacity = '1'
          orbit.style.opacity = '1'
          frame.style.opacity = '0'
        }
      } else {
        shard.style.opacity = '0'
        orbit.style.opacity = '0'
        frame.style.opacity = '0'
      }
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!hasMoved) {
        hasMoved = true
        shardX = mouseX
        shardY = mouseY
        orbitX = mouseX
        orbitY = mouseY
        lastMouseX = mouseX
        lastMouseY = mouseY
        document.body.classList.add('custom-cursor-active')
      }

      if (!isVisible) {
        isVisible = true
      }

      applyCursorVisibility()
      startAnimationLoop()
    }

    function checkTargetState(target: HTMLElement | null): CursorState {
      if (!target) return 'default'

      // 1. Text input / textarea
      const isText = Boolean(
        target.closest?.(
          'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]'
        )
      )
      if (isText) return 'text'

      // 2. Project Card (Targeting Frame with VIEW label)
      const isProjectCard = Boolean(
        target.closest?.(
          '[data-cursor="project-card"], .group\\/img, [href^="/projects/"], [href^="/details/"], .project-card, .editorial-card'
        )
      )
      if (isProjectCard) return 'card'

      // 3. Links & Buttons
      const isLinkOrButton = Boolean(
        target.closest?.(
          'a, button, [role="button"], [role="link"], [role="tab"], select, summary, label[for], .btn-editorial-primary, .btn-editorial-ghost, [data-cursor="interactive"]'
        )
      )
      if (isLinkOrButton) return 'link'

      // Fallback check: computed style cursor
      try {
        const computed = window.getComputedStyle(target).cursor
        if (computed === 'pointer') return 'link'
      } catch {
        // ignore
      }

      return 'default'
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      const nextState = checkTargetState(target)

      if (nextState !== activeState) {
        activeState = nextState
        applyCursorVisibility()
        startAnimationLoop()
      }
    }

    function onMouseDown() {
      isMouseDown = true
      startAnimationLoop()
    }

    function onMouseUp() {
      isMouseDown = false
      startAnimationLoop()
    }

    function onMouseLeave() {
      isVisible = false
      applyCursorVisibility()
    }

    function onMouseEnter() {
      isVisible = true
      applyCursorVisibility()
      startAnimationLoop()
    }

    function onWindowBlur() {
      isVisible = false
      applyCursorVisibility()
    }

    function onWindowFocus() {
      isVisible = true
      applyCursorVisibility()
      startAnimationLoop()
    }

    function onScroll() {
      startAnimationLoop()
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', onMouseLeave, { passive: true })
    document.documentElement.addEventListener('mouseenter', onMouseEnter, { passive: true })
    window.addEventListener('blur', onWindowBlur, { passive: true })
    window.addEventListener('focus', onWindowFocus, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    function animate() {
      // Determine target geometry scales based on state
      let targetShardScale = 1
      let targetOrbitScale = 1
      let targetOrbitAngle = 0
      let targetFrameScale = 1

      if (activeState === 'card') {
        targetFrameScale = isMouseDown ? 0.9 : 1
        targetShardScale = 0.5
        targetOrbitScale = 0.5
      } else if (activeState === 'link') {
        targetShardScale = isMouseDown ? 0.75 : 1.15
        targetOrbitScale = isMouseDown ? 0.7 : 1.35
        targetOrbitAngle = 25
      } else {
        // Default
        targetShardScale = isMouseDown ? 0.72 : 1
        targetOrbitScale = isMouseDown ? 0.7 : 1
        targetOrbitAngle = 0
      }

      // Calculate instantaneous movement velocity for secondary broken-orbit tilt
      velocityX = (mouseX - lastMouseX) * 0.3
      velocityY = (mouseY - lastMouseY) * 0.3
      lastMouseX = mouseX
      lastMouseY = mouseY

      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY)
      const dynamicTilt = Math.min(Math.max(velocityX * 1.5, -20), 20)
      targetOrbitAngle += dynamicTilt

      // Shard tracks pointer responsively with high precision
      const dShardX = mouseX - shardX
      const dShardY = mouseY - shardY
      shardX += dShardX * 0.55
      shardY += dShardY * 0.55

      // Broken orbit tracks with subtle secondary lag
      const dOrbitX = mouseX - orbitX
      const dOrbitY = mouseY - orbitY
      orbitX += dOrbitX * 0.16
      orbitY += dOrbitY * 0.16

      // Scale & rotation smoothing
      const dShardScale = targetShardScale - currentShardScale
      const dOrbitScale = targetOrbitScale - currentOrbitScale
      const dOrbitAngle = targetOrbitAngle - currentOrbitAngle
      const dFrameScale = targetFrameScale - currentFrameScale

      currentShardScale += dShardScale * 0.25
      currentOrbitScale += dOrbitScale * 0.2
      currentOrbitAngle += dOrbitAngle * 0.15
      currentFrameScale += dFrameScale * 0.22

      // Hardware-accelerated transforms
      if (shard) {
        shard.style.transform = `translate3d(${shardX.toFixed(2)}px, ${shardY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${currentShardScale.toFixed(3)})`
      }

      if (orbit) {
        orbit.style.transform = `translate3d(${orbitX.toFixed(2)}px, ${orbitY.toFixed(2)}px, 0) translate(-50%, -50%) rotate(${currentOrbitAngle.toFixed(1)}deg) scale(${currentOrbitScale.toFixed(3)})`
      }

      if (frame) {
        frame.style.transform = `translate3d(${shardX.toFixed(2)}px, ${shardY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${currentFrameScale.toFixed(3)})`
      }

      // Idle check: cleanly stop rAF loop when motion has settled to save CPU
      const isSettled =
        Math.abs(dShardX) < 0.08 &&
        Math.abs(dShardY) < 0.08 &&
        Math.abs(dOrbitX) < 0.08 &&
        Math.abs(dOrbitY) < 0.08 &&
        Math.abs(dShardScale) < 0.003 &&
        Math.abs(dOrbitScale) < 0.003 &&
        Math.abs(dOrbitAngle) < 0.05 &&
        Math.abs(dFrameScale) < 0.003 &&
        speed < 0.05

      if (isSettled) {
        isRunning = false
      } else {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    return () => {
      document.body.classList.remove('custom-cursor-active')
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      window.removeEventListener('blur', onWindowBlur)
      window.removeEventListener('focus', onWindowFocus)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {/* 1. Minimal Broken Orbit Element */}
      <div
        ref={orbitRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99998] will-change-transform select-none"
        style={{
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          transition: 'opacity 0.18s ease',
        }}
      >
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Segmented broken orbit arc */}
          <circle
            cx="19"
            cy="19"
            r="14"
            stroke="rgba(255, 255, 255, 0.38)"
            strokeWidth="1"
            strokeDasharray="24 14 6 18"
            strokeLinecap="round"
          />
          {/* Top precision alignment notch */}
          <line
            x1="19"
            y1="2"
            x2="19"
            y2="5"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="1"
          />
          {/* Bottom micro tick */}
          <line
            x1="19"
            y1="33"
            x2="19"
            y2="36"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* 2. Asymmetric NEMO Shard Core */}
      <div
        ref={shardRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99999] will-change-transform select-none"
        style={{
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          transition: 'opacity 0.18s ease',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Left Facet: Stark White (#ffffff) */}
          <polygon
            points="12,2 4,18 13,12"
            fill="#ffffff"
          />
          {/* Right Facet: Subtle Architectural Silver (#dcdce4) */}
          <polygon
            points="12,2 13,12 20,13"
            fill="#dcdce4"
          />
          {/* Precision Seam Line between facets */}
          <line
            x1="12"
            y1="2"
            x2="13"
            y2="12"
            stroke="#050507"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
          {/* Crisp Outer Perimeter Contour */}
          <polygon
            points="12,2 20,13 13,12 4,18"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeLinejoin="miter"
            strokeMiterlimit="4"
          />
        </svg>
      </div>

      {/* 3. Architectural Geometric Targeting Frame with VIEW Label */}
      <div
        ref={frameRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99999] will-change-transform select-none flex flex-col items-center justify-center"
        style={{
          width: '64px',
          height: '34px',
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%) scale(0.8)',
          transition: 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Four Technical Corner Brackets on Subtle Editorial Glass */}
        <div className="absolute inset-0 bg-[#0c0c10]/85 border border-white/20 rounded-md backdrop-blur-[2px]">
          {/* Top-Left Bracket */}
          <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-white" />
          {/* Top-Right Bracket */}
          <span className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-white" />
          {/* Bottom-Left Bracket */}
          <span className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-white" />
          {/* Bottom-Right Bracket */}
          <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-white" />
        </div>

        {/* Micro Shard Pip + Monospace VIEW Tag */}
        <div className="relative flex items-center gap-1.5 z-10">
          <svg width="6" height="8" viewBox="0 0 6 8" fill="none" className="shrink-0">
            <polygon points="3,0 0,6 3,4" fill="#ffffff" />
            <polygon points="3,0 3,4 6,5" fill="#dcdce4" />
          </svg>
          <span
            className="text-[9px] font-bold tracking-[0.22em] text-white uppercase"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            VIEW
          </span>
        </div>
      </div>
    </>
  )
}
