'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setEnabled(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setEnabled(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
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

    document.body.style.cursor = 'none'

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (!target || !ring || !dot) return
      const tag = target.tagName ? target.tagName.toLowerCase() : ''
      const isClickable =
        ['a', 'button', 'input', 'textarea'].includes(tag) ||
        Boolean(target.closest?.('a, button, [role="button"]'))

      if (isClickable) {
        ring.style.width = '48px'
        ring.style.height = '48px'
        ring.style.borderColor = 'rgba(255, 255, 255, 0.8)'
        ring.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
        dot.style.transform = 'translate(-50%, -50%) scale(0.5)'
      } else {
        ring.style.width = '28px'
        ring.style.height = '28px'
        ring.style.borderColor = 'rgba(255, 255, 255, 0.35)'
        ring.style.backgroundColor = 'transparent'
        dot.style.transform = 'translate(-50%, -50%) scale(1)'
      }
    }

    function onMouseDown() {
      if (ring) ring.style.transform = 'translate(-50%, -50%) scale(0.7)'
    }
    function onMouseUp() {
      if (ring) ring.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    function onMouseLeave() {
      if (dot) dot.style.opacity = '0'
      if (ring) ring.style.opacity = '0'
    }
    function onMouseEnter() {
      if (dot) dot.style.opacity = '1'
      if (ring) ring.style.opacity = '1'
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mousedown', onMouseDown, { passive: true })
    document.addEventListener('mouseup', onMouseUp, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter, { passive: true })

    let animationFrameId: number

    function animate() {
      dotX += (mouseX - dotX) * 0.35
      dotY += (mouseY - dotY) * 0.35
      if (dot) {
        dot.style.left = `${dotX}px`
        dot.style.top = `${dotY}px`
      }

      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ring) {
        ring.style.left = `${ringX}px`
        ring.style.top = `${ringY}px`
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      document.body.style.cursor = 'auto'
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(animationFrameId)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[99999] rounded-full -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color,background-color] duration-300 ease-out"
        style={{
          width: '28px',
          height: '28px',
          border: '1px solid rgba(255, 255, 255, 0.35)',
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[99999] w-1.5 h-1.5 rounded-full bg-white -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
      />
    </>
  )
}
