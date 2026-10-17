'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(pointer: fine)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateEnabled = () => {
      setEnabled(finePointerQuery.matches && !reducedMotionQuery.matches)
    }

    updateEnabled()

    finePointerQuery.addEventListener('change', updateEnabled)
    reducedMotionQuery.addEventListener('change', updateEnabled)
    return () => {
      finePointerQuery.removeEventListener('change', updateEnabled)
      reducedMotionQuery.removeEventListener('change', updateEnabled)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let dotX = mouseX
    let dotY = mouseY
    let ringX = mouseX
    let ringY = mouseY

    let isHoveringInteractive = false
    let isMouseDown = false
    let isVisible = true
    let isRunning = false
    let animationFrameId: number

    document.body.style.cursor = 'none'

    const checkStartAnimation = () => {
      if (!isRunning) {
        isRunning = true
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) {
        isVisible = true
        if (dot) dot.style.opacity = '1'
        if (ring) ring.style.opacity = '1'
      }
      checkStartAnimation()
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (!target) return
      const tag = target.tagName ? target.tagName.toLowerCase() : ''
      const isClickable =
        ['a', 'button', 'input', 'textarea', 'select'].includes(tag) ||
        Boolean(target.closest?.('a, button, [role="button"], input, textarea, select'))

      if (isClickable !== isHoveringInteractive) {
        isHoveringInteractive = isClickable
        if (ring) {
          if (isHoveringInteractive) {
            ring.style.borderColor = 'rgba(255, 255, 255, 0.8)'
            ring.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
          } else {
            ring.style.borderColor = 'rgba(255, 255, 255, 0.35)'
            ring.style.backgroundColor = 'transparent'
          }
        }
        checkStartAnimation()
      }
    }

    function onMouseDown() {
      isMouseDown = true
      checkStartAnimation()
    }

    function onMouseUp() {
      isMouseDown = false
      checkStartAnimation()
    }

    function onMouseLeave() {
      isVisible = false
      if (dot) dot.style.opacity = '0'
      if (ring) ring.style.opacity = '0'
    }

    function onMouseEnter() {
      isVisible = true
      if (dot) dot.style.opacity = '1'
      if (ring) ring.style.opacity = '1'
      checkStartAnimation()
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', onMouseLeave, { passive: true })
    document.documentElement.addEventListener('mouseenter', onMouseEnter, { passive: true })

    let currentRingScale = 1
    let currentDotScale = 1

    function animate() {
      const targetRingScale = isMouseDown ? 0.75 : isHoveringInteractive ? 1.7 : 1
      const targetDotScale = isMouseDown ? 0.4 : isHoveringInteractive ? 0.5 : 1

      const dDotX = mouseX - dotX
      const dDotY = mouseY - dotY
      const dRingX = mouseX - ringX
      const dRingY = mouseY - ringY

      dotX += dDotX * 0.4
      dotY += dDotY * 0.4
      ringX += dRingX * 0.15
      ringY += dRingY * 0.15

      currentRingScale += (targetRingScale - currentRingScale) * 0.2
      currentDotScale += (targetDotScale - currentDotScale) * 0.25

      if (dot) {
        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${currentDotScale})`
      }

      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${currentRingScale})`
      }

      // Check if cursor is settled enough to sleep rAF loop and save CPU
      const isSettled =
        Math.abs(dDotX) < 0.1 &&
        Math.abs(dDotY) < 0.1 &&
        Math.abs(dRingX) < 0.1 &&
        Math.abs(dRingY) < 0.1 &&
        Math.abs(targetRingScale - currentRingScale) < 0.01

      if (isSettled) {
        isRunning = false
      } else {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    checkStartAnimation()

    return () => {
      document.body.style.cursor = 'auto'
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(animationFrameId)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full will-change-transform transition-[border-color,background-color] duration-200 ease-out"
        style={{
          width: '28px',
          height: '28px',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] w-1.5 h-1.5 rounded-full bg-white will-change-transform"
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        }}
      />
    </>
  )
}

