'use client'

import React, { useEffect, useRef, useState } from 'react'

type CursorState = 'default' | 'link' | 'card' | 'text'

const TEXT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]'
const CARD_SELECTOR =
  '[data-cursor="project-card"], .group\\/img, [href^="/projects/"], [href^="/details/"], .project-card, .editorial-card'
const LINK_SELECTOR =
  'a, button, [role="button"], [role="link"], [role="tab"], select, summary, label[for], .btn-editorial-primary, .btn-editorial-ghost, [data-cursor="interactive"]'

const RING_ID = 'nemo-cursor-ring-path'
const RING_RADIUS = 38
const RING_LENGTH = Math.round(2 * Math.PI * RING_RADIUS) - 2
const RING_CHARS = 38
const TRAIL_COUNT = 9
const GLYPHS = '01<>/{}[]#$%&*+=?;:'
const DEFAULT_RING_UNIT = 'NEYAMUL ISLAM • MERN DEVELOPER • '

const buildRing = (unit: string) => unit.repeat(Math.max(1, Math.round(RING_CHARS / unit.length)))
const DEFAULT_RING = buildRing(DEFAULT_RING_UNIT)

function getLinkLabel(el: HTMLElement): string {
  const custom = el.getAttribute('data-cursor-label')
  if (custom) return custom.toUpperCase()

  if (el instanceof HTMLAnchorElement) {
    if (el.hasAttribute('download')) return 'SAVE ↓'
    const href = el.getAttribute('href') || ''
    if (href.startsWith('mailto:')) return 'MAIL ↗'
    if (href.startsWith('#')) return 'JUMP ↓'
    if (/^https?:/i.test(href) && !href.startsWith(window.location.origin)) return 'OPEN ↗'
    return 'GO →'
  }
  return 'CLICK'
}

function checkTarget(target: HTMLElement | null): { state: CursorState; label: string } {
  if (!target) return { state: 'default', label: '' }

  if (target.closest?.(TEXT_SELECTOR)) return { state: 'text', label: '' }
  if (target.closest?.(CARD_SELECTOR)) return { state: 'card', label: '' }

  const link = target.closest?.(LINK_SELECTOR) as HTMLElement | null
  if (link) return { state: 'link', label: getLinkLabel(link) }

  try {
    if (window.getComputedStyle(target).cursor === 'pointer') return { state: 'link', label: 'CLICK' }
  } catch {
    // ignore
  }
  return { state: 'default', label: '' }
}

const ringFor = (state: CursorState, label: string) => {
  if (state === 'card') return buildRing('VIEW PROJECT • ')
  if (state === 'link') return buildRing(`${label} • `)
  return DEFAULT_RING
}

/**
 * COMET + ORBITING NAMEPLATE CURSOR
 * - Liquid core that stretches/squashes along its movement direction
 * - 9-dot chain tail that follows like a snake
 * - Spinning text ring (speed scales with mouse velocity) that scramble-decodes
 *   into a new label on hover
 * - Link: core becomes an inverting lens | Card: core becomes a VIEW disc
 * - Click: tick-mark burst
 */
export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const spinRef = useRef<HTMLDivElement | null>(null)
  const ringTextRef = useRef<SVGTextPathElement | null>(null)
  const trailGroupRef = useRef<HTMLDivElement | null>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const coreRef = useRef<HTMLDivElement | null>(null)
  const discRef = useRef<HTMLDivElement | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const queries = [
      window.matchMedia('(pointer: fine)'),
      window.matchMedia('(hover: hover)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
    ]
    const check = () => setEnabled(queries[0].matches && queries[1].matches && !queries[2].matches)
    check()
    queries.forEach((q) => q.addEventListener('change', check))
    return () => queries.forEach((q) => q.removeEventListener('change', check))
  }, [])

  useEffect(() => {
    if (!enabled) return

    const root = rootRef.current
    const ring = ringRef.current
    const spinEl = spinRef.current
    const ringText = ringTextRef.current
    const trailGroup = trailGroupRef.current
    const core = coreRef.current
    const disc = discRef.current
    const trail = trailRefs.current.filter((el): el is HTMLDivElement => el !== null)
    if (!root || !ring || !spinEl || !ringText || !trailGroup || !core || !disc || trail.length === 0) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let coreX = mouseX
    let coreY = mouseY
    let ringX = mouseX
    let ringY = mouseY
    const trailPos = trail.map(() => ({ x: mouseX, y: mouseY }))

    let coreScale = 1
    let ringScale = 1
    let discScale = 0
    let spinRate = 1

    let activeState: CursorState = 'default'
    let linkLabel = ''
    let ringTarget = DEFAULT_RING
    let scrambleTimer: number | undefined
    let isMouseDown = false
    let isVisible = false
    let hasMoved = false
    let isRunning = false
    let rafId = 0

    // Constant spin runs on the compositor; JS only changes its playbackRate
    const spin = spinEl.animate(
      [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
      { duration: 16000, iterations: Infinity }
    )

    const animate = () => {
      let tCore = 1
      let tRing = 1
      let tDisc = 0
      let tRate = 1

      if (activeState === 'card') {
        tCore = 0
        tRing = isMouseDown ? 1.4 : 1.6
        tDisc = isMouseDown ? 0.9 : 1
        tRate = 1.6
      } else if (activeState === 'link') {
        tCore = isMouseDown ? 1.6 : 3.2
        tRing = isMouseDown ? 1 : 1.2
        tRate = 2.4
      } else {
        tCore = isMouseDown ? 0.6 : 1
        tRing = isMouseDown ? 0.85 : 1
      }

      // Liquid core: stretch along the lag vector between pointer and core
      const dCoreX = mouseX - coreX
      const dCoreY = mouseY - coreY
      const lag = Math.hypot(dCoreX, dCoreY)
      const stretch = 1 + Math.min(lag * 0.05, 1.4)
      const squash = 1 / Math.sqrt(stretch)
      const angle = Math.atan2(dCoreY, dCoreX)
      coreX += dCoreX * 0.38
      coreY += dCoreY * 0.38

      // Chain tail
      let trailMoving = false
      let prevX = coreX
      let prevY = coreY
      for (let i = 0; i < trail.length; i++) {
        const p = trailPos[i]
        const dx = prevX - p.x
        const dy = prevY - p.y
        p.x += dx * 0.34
        p.y += dy * 0.34
        if (Math.abs(dx) > 0.08 || Math.abs(dy) > 0.08) trailMoving = true
        trail[i].style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) translate(-50%, -50%)`
        prevX = p.x
        prevY = p.y
      }

      // Ring floats with a softer follow
      const dRingX = mouseX - ringX
      const dRingY = mouseY - ringY
      ringX += dRingX * 0.12
      ringY += dRingY * 0.12

      const dCoreS = tCore - coreScale
      const dRingS = tRing - ringScale
      const dDiscS = tDisc - discScale
      const rateTarget = tRate + Math.min(lag * 0.06, 3)
      const dRate = rateTarget - spinRate

      coreScale += dCoreS * 0.25
      ringScale += dRingS * 0.18
      discScale += dDiscS * 0.22
      spinRate += dRate * 0.08
      spin.playbackRate = spinRate

      core.style.transform = `translate3d(${coreX.toFixed(2)}px, ${coreY.toFixed(2)}px, 0) translate(-50%, -50%) rotate(${angle.toFixed(3)}rad) scale(${(coreScale * stretch).toFixed(3)}, ${(coreScale * squash).toFixed(3)})`
      ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${ringScale.toFixed(3)})`
      disc.style.transform = `translate3d(${coreX.toFixed(2)}px, ${coreY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${discScale.toFixed(3)})`

      const settled =
        !trailMoving &&
        lag < 0.08 &&
        Math.abs(dRingX) < 0.08 &&
        Math.abs(dRingY) < 0.08 &&
        Math.abs(dCoreS) < 0.003 &&
        Math.abs(dRingS) < 0.003 &&
        Math.abs(dDiscS) < 0.003 &&
        Math.abs(dRate) < 0.01

      if (settled) {
        isRunning = false
      } else {
        rafId = requestAnimationFrame(animate)
      }
    }

    const start = () => {
      if (!isRunning) {
        isRunning = true
        rafId = requestAnimationFrame(animate)
      }
    }

    // Scramble-decode the ring text into a new label
    const setRingText = (target: string) => {
      if (target === ringTarget) return
      ringTarget = target
      if (scrambleTimer) window.clearInterval(scrambleTimer)

      let frame = 0
      const total = 10
      scrambleTimer = window.setInterval(() => {
        frame++
        const reveal = Math.floor((frame / total) * target.length)
        let out = ''
        for (let i = 0; i < target.length; i++) {
          const ch = target[i]
          out += i < reveal || ch === ' ' || ch === '•' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }
        ringText.textContent = out
        if (frame >= total) {
          window.clearInterval(scrambleTimer)
          ringText.textContent = target
        }
      }, 32)
    }

    const applyVisibility = () => {
      const live = isVisible && hasMoved
      const hidden = !live || activeState === 'text'
      const isCard = activeState === 'card'
      const isLink = activeState === 'link'

      core.style.opacity = hidden ? '0' : '1'
      ring.style.opacity = hidden ? '0' : '1'
      trailGroup.style.opacity = hidden || isCard ? '0' : isLink ? '0.35' : '1'
      disc.style.opacity = hidden || !isCard ? '0' : '1'
    }

    const updateState = (target: HTMLElement | null) => {
      const next = checkTarget(target)
      if (next.state !== activeState || next.label !== linkLabel) {
        activeState = next.state
        linkLabel = next.label
        setRingText(ringFor(activeState, linkLabel))
        applyVisibility()
        start()
      }
    }

    const burst = (x: number, y: number) => {
      const count = 10
      for (let i = 0; i < count; i++) {
        const p = document.createElement('span')
        p.style.cssText =
          'position:absolute;top:0;left:0;width:8px;height:1px;background:#fff;will-change:transform,opacity;'
        root.appendChild(p)

        const a = (i / count) * Math.PI * 2 + Math.random() * 0.4
        const dist = 28 + Math.random() * 28
        const rot = `${((a * 180) / Math.PI).toFixed(1)}deg`
        const at = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rot})`

        const anim = p.animate(
          [
            { transform: `${at} translateX(8px) scaleX(1)`, opacity: 1 },
            { transform: `${at} translateX(${dist.toFixed(1)}px) scaleX(0.2)`, opacity: 0 },
          ],
          { duration: 480 + Math.random() * 240, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
        )
        anim.onfinish = () => p.remove()
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!hasMoved) {
        hasMoved = true
        coreX = mouseX
        coreY = mouseY
        ringX = mouseX
        ringY = mouseY
        trailPos.forEach((p) => {
          p.x = mouseX
          p.y = mouseY
        })
        document.body.classList.add('custom-cursor-active')
      }
      isVisible = true

      applyVisibility()
      start()
    }

    const onMouseOver = (e: MouseEvent) => {
      updateState(e.target as HTMLElement | null)
    }

    const onMouseDown = () => {
      isMouseDown = true
      start()
    }

    const onMouseUp = () => {
      isMouseDown = false
      start()
    }

    const onClick = (e: MouseEvent) => {
      if (activeState === 'text') return
      burst(e.clientX, e.clientY)
    }

    const onLeave = () => {
      isVisible = false
      applyVisibility()
    }

    const onEnter = () => {
      isVisible = true
      applyVisibility()
      start()
    }

    const onScroll = () => {
      updateState(document.elementFromPoint(mouseX, mouseY) as HTMLElement | null)
      start()
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })
    window.addEventListener('click', onClick, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave, { passive: true })
    document.documentElement.addEventListener('mouseenter', onEnter, { passive: true })
    window.addEventListener('blur', onLeave, { passive: true })
    window.addEventListener('focus', onEnter, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      document.body.classList.remove('custom-cursor-active')
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('click', onClick)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('blur', onLeave)
      window.removeEventListener('focus', onEnter)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
      if (scrambleTimer) window.clearInterval(scrambleTimer)
      spin.cancel()
    }
  }, [enabled])

  if (!enabled) return null

  const base = 'absolute top-0 left-0 will-change-transform select-none'
  const offscreen = 'translate3d(-100px, -100px, 0) translate(-50%, -50%)'
  const mono = { fontFamily: "'Space Mono', monospace" }

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99999] mix-blend-difference"
    >
      {/* Spinning text ring */}
      <div
        ref={ringRef}
        className={base}
        style={{ opacity: 0, transform: offscreen, transition: 'opacity 0.25s ease' }}
      >
        <div ref={spinRef}>
          <svg width="92" height="92" viewBox="0 0 100 100" fill="none" className="block">
            <defs>
              <path
                id={RING_ID}
                d={`M 50,50 m -${RING_RADIUS},0 a ${RING_RADIUS},${RING_RADIUS} 0 1,1 ${RING_RADIUS * 2},0 a ${RING_RADIUS},${RING_RADIUS} 0 1,1 -${RING_RADIUS * 2},0`}
              />
            </defs>
            <text fill="white" fillOpacity="0.85" fontSize="9" fontWeight="700" style={mono}>
              <textPath
                ref={ringTextRef}
                href={`#${RING_ID}`}
                startOffset="0"
                textLength={RING_LENGTH}
                lengthAdjust="spacing"
              >
                {DEFAULT_RING}
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* Chain tail */}
      <div
        ref={trailGroupRef}
        className="absolute inset-0"
        style={{ opacity: 0, transition: 'opacity 0.25s ease' }}
      >
        {Array.from({ length: TRAIL_COUNT }).map((_, i) => {
          const size = 8 - i * 0.75
          return (
            <div
              key={i}
              ref={(el) => {
                trailRefs.current[i] = el
              }}
              className={base}
              style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: '#fff',
                opacity: 0.8 - i * 0.07,
                transform: offscreen,
              }}
            />
          )
        })}
      </div>

      {/* Liquid core */}
      <div
        ref={coreRef}
        className={base}
        style={{ opacity: 0, transform: offscreen, transition: 'opacity 0.2s ease' }}
      >
        <div className="h-[10px] w-[10px] rounded-full bg-white" />
      </div>

      {/* VIEW disc for project cards */}
      <div
        ref={discRef}
        className={`${base} flex items-center justify-center rounded-full bg-white`}
        style={{
          width: 64,
          height: 64,
          opacity: 0,
          transform: `${offscreen} scale(0)`,
          transition: 'opacity 0.2s ease',
        }}
      >
        <span className="pl-[0.22em] text-[9px] font-bold uppercase tracking-[0.22em] text-black" style={mono}>
          VIEW
        </span>
      </div>
    </div>
  )
}





// 'use client'

// import React, { useEffect, useRef, useState } from 'react'

// type CursorState = 'default' | 'link' | 'card' | 'text'

// const TEXT_SELECTOR =
//   'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]'
// const CARD_SELECTOR =
//   '[data-cursor="project-card"], .group\\/img, [href^="/projects/"], [href^="/details/"], .project-card, .editorial-card'
// const LINK_SELECTOR =
//   'a, button, [role="button"], [role="link"], [role="tab"], select, summary, label[for], .btn-editorial-primary, .btn-editorial-ghost, [data-cursor="interactive"]'

// const RING_ID = 'nemo-cursor-ring-path'
// const RING_RADIUS = 36
// const RING_LENGTH = Math.round(2 * Math.PI * RING_RADIUS) - 2
// const RING_CHARS = 34
// const TRAIL_COUNT = 9
// const GLYPHS = '01<>/{}[]#$%&*+=?;:'
// const DEFAULT_RING_UNIT = 'NEYAMUL ISLAM • MERN DEVELOPER • '

// const buildRing = (unit: string) => unit.repeat(Math.max(1, Math.round(RING_CHARS / unit.length)))
// const DEFAULT_RING = buildRing(DEFAULT_RING_UNIT)

// function getLinkLabel(el: HTMLElement): string {
//   const custom = el.getAttribute('data-cursor-label')
//   if (custom) return custom.toUpperCase()

//   if (el instanceof HTMLAnchorElement) {
//     if (el.hasAttribute('download')) return 'SAVE ↓'
//     const href = el.getAttribute('href') || ''
//     if (href.startsWith('mailto:')) return 'MAIL ↗'
//     if (href.startsWith('#')) return 'JUMP ↓'
//     if (/^https?:/i.test(href) && !href.startsWith(window.location.origin)) return 'OPEN ↗'
//     return 'GO →'
//   }
//   return 'CLICK'
// }

// function checkTarget(target: HTMLElement | null): { state: CursorState; label: string } {
//   if (!target) return { state: 'default', label: '' }

//   if (target.closest?.(TEXT_SELECTOR)) return { state: 'text', label: '' }
//   if (target.closest?.(CARD_SELECTOR)) return { state: 'card', label: '' }

//   const link = target.closest?.(LINK_SELECTOR) as HTMLElement | null
//   if (link) return { state: 'link', label: getLinkLabel(link) }

//   try {
//     if (window.getComputedStyle(target).cursor === 'pointer') return { state: 'link', label: 'CLICK' }
//   } catch {
//     // ignore
//   }
//   return { state: 'default', label: '' }
// }

// const ringFor = (state: CursorState, label: string) => {
//   if (state === 'card') return buildRing('VIEW PROJECT • ')
//   if (state === 'link') return buildRing(`${label} • `)
//   return DEFAULT_RING
// }

// /**
//  * COMET + ORBITING NAMEPLATE CURSOR (thin variant)
//  * - Liquid core that stretches/squashes along its movement direction
//  * - 9-dot chain tail that follows like a snake
//  * - Spinning text ring (speed scales with mouse velocity) that scramble-decodes
//  *   into a new label on hover
//  * - Link: core becomes an inverting lens | Card: core becomes a VIEW disc
//  * - Click: tick-mark burst
//  */
// export default function CustomCursor() {
//   const rootRef = useRef<HTMLDivElement | null>(null)
//   const ringRef = useRef<HTMLDivElement | null>(null)
//   const spinRef = useRef<HTMLDivElement | null>(null)
//   const ringTextRef = useRef<SVGTextPathElement | null>(null)
//   const trailGroupRef = useRef<HTMLDivElement | null>(null)
//   const trailRefs = useRef<(HTMLDivElement | null)[]>([])
//   const coreRef = useRef<HTMLDivElement | null>(null)
//   const discRef = useRef<HTMLDivElement | null>(null)
//   const [enabled, setEnabled] = useState(false)

//   useEffect(() => {
//     const queries = [
//       window.matchMedia('(pointer: fine)'),
//       window.matchMedia('(hover: hover)'),
//       window.matchMedia('(prefers-reduced-motion: reduce)'),
//     ]
//     const check = () => setEnabled(queries[0].matches && queries[1].matches && !queries[2].matches)
//     check()
//     queries.forEach((q) => q.addEventListener('change', check))
//     return () => queries.forEach((q) => q.removeEventListener('change', check))
//   }, [])

//   useEffect(() => {
//     if (!enabled) return

//     const root = rootRef.current
//     const ring = ringRef.current
//     const spinEl = spinRef.current
//     const ringText = ringTextRef.current
//     const trailGroup = trailGroupRef.current
//     const core = coreRef.current
//     const disc = discRef.current
//     const trail = trailRefs.current.filter((el): el is HTMLDivElement => el !== null)
//     if (!root || !ring || !spinEl || !ringText || !trailGroup || !core || !disc || trail.length === 0) return

//     let mouseX = window.innerWidth / 2
//     let mouseY = window.innerHeight / 2
//     let coreX = mouseX
//     let coreY = mouseY
//     let ringX = mouseX
//     let ringY = mouseY
//     const trailPos = trail.map(() => ({ x: mouseX, y: mouseY }))

//     let coreScale = 1
//     let ringScale = 1
//     let discScale = 0
//     let spinRate = 1

//     let activeState: CursorState = 'default'
//     let linkLabel = ''
//     let ringTarget = DEFAULT_RING
//     let scrambleTimer: number | undefined
//     let isMouseDown = false
//     let isVisible = false
//     let hasMoved = false
//     let isRunning = false
//     let rafId = 0

//     // Constant spin runs on the compositor; JS only changes its playbackRate
//     const spin = spinEl.animate(
//       [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
//       { duration: 16000, iterations: Infinity }
//     )

//     const animate = () => {
//       let tCore = 1
//       let tRing = 1
//       let tDisc = 0
//       let tRate = 1

//       if (activeState === 'card') {
//         tCore = 0
//         tRing = isMouseDown ? 1.4 : 1.6
//         tDisc = isMouseDown ? 0.9 : 1
//         tRate = 1.6
//       } else if (activeState === 'link') {
//         tCore = isMouseDown ? 3 : 5
//         tRing = isMouseDown ? 1 : 1.2
//         tRate = 2.4
//       } else {
//         tCore = isMouseDown ? 0.6 : 1
//         tRing = isMouseDown ? 0.85 : 1
//       }

//       // Liquid core: stretch along the lag vector between pointer and core
//       const dCoreX = mouseX - coreX
//       const dCoreY = mouseY - coreY
//       const lag = Math.hypot(dCoreX, dCoreY)
//       const stretch = 1 + Math.min(lag * 0.05, 1.4)
//       const squash = 1 / Math.sqrt(stretch)
//       const angle = Math.atan2(dCoreY, dCoreX)
//       coreX += dCoreX * 0.38
//       coreY += dCoreY * 0.38

//       // Chain tail
//       let trailMoving = false
//       let prevX = coreX
//       let prevY = coreY
//       for (let i = 0; i < trail.length; i++) {
//         const p = trailPos[i]
//         const dx = prevX - p.x
//         const dy = prevY - p.y
//         p.x += dx * 0.34
//         p.y += dy * 0.34
//         if (Math.abs(dx) > 0.08 || Math.abs(dy) > 0.08) trailMoving = true
//         trail[i].style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) translate(-50%, -50%)`
//         prevX = p.x
//         prevY = p.y
//       }

//       // Ring floats with a softer follow
//       const dRingX = mouseX - ringX
//       const dRingY = mouseY - ringY
//       ringX += dRingX * 0.12
//       ringY += dRingY * 0.12

//       const dCoreS = tCore - coreScale
//       const dRingS = tRing - ringScale
//       const dDiscS = tDisc - discScale
//       const rateTarget = tRate + Math.min(lag * 0.06, 3)
//       const dRate = rateTarget - spinRate

//       coreScale += dCoreS * 0.25
//       ringScale += dRingS * 0.18
//       discScale += dDiscS * 0.22
//       spinRate += dRate * 0.08
//       spin.playbackRate = spinRate

//       core.style.transform = `translate3d(${coreX.toFixed(2)}px, ${coreY.toFixed(2)}px, 0) translate(-50%, -50%) rotate(${angle.toFixed(3)}rad) scale(${(coreScale * stretch).toFixed(3)}, ${(coreScale * squash).toFixed(3)})`
//       ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${ringScale.toFixed(3)})`
//       disc.style.transform = `translate3d(${coreX.toFixed(2)}px, ${coreY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${discScale.toFixed(3)})`

//       const settled =
//         !trailMoving &&
//         lag < 0.08 &&
//         Math.abs(dRingX) < 0.08 &&
//         Math.abs(dRingY) < 0.08 &&
//         Math.abs(dCoreS) < 0.003 &&
//         Math.abs(dRingS) < 0.003 &&
//         Math.abs(dDiscS) < 0.003 &&
//         Math.abs(dRate) < 0.01

//       if (settled) {
//         isRunning = false
//       } else {
//         rafId = requestAnimationFrame(animate)
//       }
//     }

//     const start = () => {
//       if (!isRunning) {
//         isRunning = true
//         rafId = requestAnimationFrame(animate)
//       }
//     }

//     // Scramble-decode the ring text into a new label
//     const setRingText = (target: string) => {
//       if (target === ringTarget) return
//       ringTarget = target
//       if (scrambleTimer) window.clearInterval(scrambleTimer)

//       let frame = 0
//       const total = 10
//       scrambleTimer = window.setInterval(() => {
//         frame++
//         const reveal = Math.floor((frame / total) * target.length)
//         let out = ''
//         for (let i = 0; i < target.length; i++) {
//           const ch = target[i]
//           out += i < reveal || ch === ' ' || ch === '•' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
//         }
//         ringText.textContent = out
//         if (frame >= total) {
//           window.clearInterval(scrambleTimer)
//           ringText.textContent = target
//         }
//       }, 32)
//     }

//     const applyVisibility = () => {
//       const live = isVisible && hasMoved
//       const hidden = !live || activeState === 'text'
//       const isCard = activeState === 'card'
//       const isLink = activeState === 'link'

//       core.style.opacity = hidden ? '0' : '1'
//       ring.style.opacity = hidden ? '0' : '1'
//       trailGroup.style.opacity = hidden || isCard ? '0' : isLink ? '0.35' : '1'
//       disc.style.opacity = hidden || !isCard ? '0' : '1'
//     }

//     const updateState = (target: HTMLElement | null) => {
//       const next = checkTarget(target)
//       if (next.state !== activeState || next.label !== linkLabel) {
//         activeState = next.state
//         linkLabel = next.label
//         setRingText(ringFor(activeState, linkLabel))
//         applyVisibility()
//         start()
//       }
//     }

//     const burst = (x: number, y: number) => {
//       const count = 10
//       for (let i = 0; i < count; i++) {
//         const p = document.createElement('span')
//         p.style.cssText =
//           'position:absolute;top:0;left:0;width:6px;height:1px;background:#fff;will-change:transform,opacity;'
//         root.appendChild(p)

//         const a = (i / count) * Math.PI * 2 + Math.random() * 0.4
//         const dist = 28 + Math.random() * 28
//         const rot = `${((a * 180) / Math.PI).toFixed(1)}deg`
//         const at = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rot})`

//         const anim = p.animate(
//           [
//             { transform: `${at} translateX(8px) scaleX(1)`, opacity: 1 },
//             { transform: `${at} translateX(${dist.toFixed(1)}px) scaleX(0.2)`, opacity: 0 },
//           ],
//           { duration: 480 + Math.random() * 240, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
//         )
//         anim.onfinish = () => p.remove()
//       }
//     }

//     const onMouseMove = (e: MouseEvent) => {
//       mouseX = e.clientX
//       mouseY = e.clientY

//       if (!hasMoved) {
//         hasMoved = true
//         coreX = mouseX
//         coreY = mouseY
//         ringX = mouseX
//         ringY = mouseY
//         trailPos.forEach((p) => {
//           p.x = mouseX
//           p.y = mouseY
//         })
//         document.body.classList.add('custom-cursor-active')
//       }
//       isVisible = true

//       applyVisibility()
//       start()
//     }

//     const onMouseOver = (e: MouseEvent) => {
//       updateState(e.target as HTMLElement | null)
//     }

//     const onMouseDown = () => {
//       isMouseDown = true
//       start()
//     }

//     const onMouseUp = () => {
//       isMouseDown = false
//       start()
//     }

//     const onClick = (e: MouseEvent) => {
//       if (activeState === 'text') return
//       burst(e.clientX, e.clientY)
//     }

//     const onLeave = () => {
//       isVisible = false
//       applyVisibility()
//     }

//     const onEnter = () => {
//       isVisible = true
//       applyVisibility()
//       start()
//     }

//     const onScroll = () => {
//       updateState(document.elementFromPoint(mouseX, mouseY) as HTMLElement | null)
//       start()
//     }

//     window.addEventListener('mousemove', onMouseMove, { passive: true })
//     document.addEventListener('mouseover', onMouseOver, { passive: true })
//     window.addEventListener('mousedown', onMouseDown, { passive: true })
//     window.addEventListener('mouseup', onMouseUp, { passive: true })
//     window.addEventListener('click', onClick, { passive: true })
//     document.documentElement.addEventListener('mouseleave', onLeave, { passive: true })
//     document.documentElement.addEventListener('mouseenter', onEnter, { passive: true })
//     window.addEventListener('blur', onLeave, { passive: true })
//     window.addEventListener('focus', onEnter, { passive: true })
//     window.addEventListener('scroll', onScroll, { passive: true })

//     return () => {
//       document.body.classList.remove('custom-cursor-active')
//       document.body.style.cursor = ''
//       window.removeEventListener('mousemove', onMouseMove)
//       document.removeEventListener('mouseover', onMouseOver)
//       window.removeEventListener('mousedown', onMouseDown)
//       window.removeEventListener('mouseup', onMouseUp)
//       window.removeEventListener('click', onClick)
//       document.documentElement.removeEventListener('mouseleave', onLeave)
//       document.documentElement.removeEventListener('mouseenter', onEnter)
//       window.removeEventListener('blur', onLeave)
//       window.removeEventListener('focus', onEnter)
//       window.removeEventListener('scroll', onScroll)
//       cancelAnimationFrame(rafId)
//       if (scrambleTimer) window.clearInterval(scrambleTimer)
//       spin.cancel()
//     }
//   }, [enabled])

//   if (!enabled) return null

//   const base = 'absolute top-0 left-0 will-change-transform select-none'
//   const offscreen = 'translate3d(-100px, -100px, 0) translate(-50%, -50%)'
//   const mono = { fontFamily: "'Space Mono', monospace" }

//   return (
//     <div
//       ref={rootRef}
//       aria-hidden="true"
//       className="pointer-events-none fixed inset-0 z-[99999] mix-blend-difference"
//     >
//       {/* Spinning text ring */}
//       <div
//         ref={ringRef}
//         className={base}
//         style={{ opacity: 0, transform: offscreen, transition: 'opacity 0.25s ease' }}
//       >
//         <div ref={spinRef}>
//           <svg width="84" height="84" viewBox="0 0 100 100" fill="none" className="block">
//             <defs>
//               <path
//                 id={RING_ID}
//                 d={`M 50,50 m -${RING_RADIUS},0 a ${RING_RADIUS},${RING_RADIUS} 0 1,1 ${RING_RADIUS * 2},0 a ${RING_RADIUS},${RING_RADIUS} 0 1,1 -${RING_RADIUS * 2},0`}
//               />
//             </defs>
//             <text fill="white" fillOpacity="0.7" fontSize="7.5" fontWeight="400" style={mono}>
//               <textPath
//                 ref={ringTextRef}
//                 href={`#${RING_ID}`}
//                 startOffset="0"
//                 textLength={RING_LENGTH}
//                 lengthAdjust="spacing"
//               >
//                 {DEFAULT_RING}
//               </textPath>
//             </text>
//           </svg>
//         </div>
//       </div>

//       {/* Chain tail */}
//       <div
//         ref={trailGroupRef}
//         className="absolute inset-0"
//         style={{ opacity: 0, transition: 'opacity 0.25s ease' }}
//       >
//         {Array.from({ length: TRAIL_COUNT }).map((_, i) => {
//           const size = Math.max(1.5, 5 - i * 0.45)
//           return (
//             <div
//               key={i}
//               ref={(el) => {
//                 trailRefs.current[i] = el
//               }}
//               className={base}
//               style={{
//                 width: size,
//                 height: size,
//                 borderRadius: '50%',
//                 background: '#fff',
//                 opacity: 0.8 - i * 0.07,
//                 transform: offscreen,
//               }}
//             />
//           )
//         })}
//       </div>

//       {/* Liquid core */}
//       <div
//         ref={coreRef}
//         className={base}
//         style={{ opacity: 0, transform: offscreen, transition: 'opacity 0.2s ease' }}
//       >
//         <div className="h-[6px] w-[6px] rounded-full bg-white" />
//       </div>

//       {/* VIEW disc for project cards */}
//       <div
//         ref={discRef}
//         className={`${base} flex items-center justify-center rounded-full bg-white`}
//         style={{
//           width: 52,
//           height: 52,
//           opacity: 0,
//           transform: `${offscreen} scale(0)`,
//           transition: 'opacity 0.2s ease',
//         }}
//       >
//         <span className="pl-[0.22em] text-[8px] font-medium uppercase tracking-[0.22em] text-black" style={mono}>
//           VIEW
//         </span>
//       </div>
//     </div>
//   )
// }