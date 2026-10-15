'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, type Variants } from 'motion/react'
import {
  ChevronUp,
  ChevronDown,
  Home,
  User,
  Code2,
  GraduationCap,
  Briefcase,
  Mail,
  ChevronRight,
  X,
  Compass,
  type LucideIcon,
} from 'lucide-react'
import { IntroStage } from '../../types'

interface RouteItem {
  path: string
  name: string
  icon: LucideIcon
}

const routes: RouteItem[] = [
  { path: '/', name: 'Home', icon: Home },
  { path: '/about', name: 'About', icon: User },
  { path: '/skills', name: 'Skills', icon: Code2 },
  { path: '/education', name: 'Education', icon: GraduationCap },
  { path: '/projects', name: 'Projects', icon: Briefcase },
  { path: '/contact', name: 'Contact', icon: Mail },
]

interface RouteSwitchProps {
  introStage?: IntroStage
}

export default function RouteSwitch({ introStage = 'completed' }: RouteSwitchProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [openKey, setOpenKey] = useState(0)
  const containerRef = useRef<HTMLElement | null>(null)
  const prevExpandedRef = useRef(false)

  // Find current index
  let currentIndex = routes.findIndex((r) => r.path === pathname)
  if (pathname.startsWith('/details/') || (pathname.startsWith('/projects/') && pathname !== '/projects')) {
    currentIndex = 4
  }
  if (currentIndex === -1) {
    currentIndex = 0
  }

  const prevIndex = (currentIndex - 1 + routes.length) % routes.length
  const nextIndex = (currentIndex + 1) % routes.length

  const prevRoute = routes[prevIndex]
  const nextRoute = routes[nextIndex]

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
    setIsHovered(false)
  }, [pathname])

  // Close desktop menu on outside click or touch
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  const isIntroActive = introStage === 'entering' || introStage === 'focus'
  const isExpanded = isIntroActive || isHovered || isOpen

  // Increment openKey each time the panel goes from collapsed → expanded (skip during intro)
  useEffect(() => {
    if (isExpanded && !prevExpandedRef.current && !isIntroActive) {
      setOpenKey((k) => k + 1)
    }
    prevExpandedRef.current = isExpanded
  }, [isExpanded, isIntroActive])

  // ── Unified nav item animation: cascade in from TOP LEFT ──
  const navItemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -55,
      y: -45,
      scale: 0.72,
      rotate: -10,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        delay: i * 0.055,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  // Mobile bottom nav entrance variants
  const mobileNavVariants: Variants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
    },
  }

  const mobileItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <>
      {/* ─────────────────────────────────────────
          DESKTOP NAV — left-side drawer (md and up)
          Restored original side dock tab style
         ───────────────────────────────────────── */}
      <aside
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hidden md:block fixed left-0 top-1/2 -translate-y-1/2 z-50 select-none group"
        aria-label="Side Navigation"
      >
        {/* Outer Motion Wrapper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
        >
          {/* Inner Drawer Panel */}
          <div
            className={`flex items-center transition-all duration-500 ease-out transform ${
              isExpanded
                ? 'translate-x-2 sm:translate-x-4 opacity-100'
                : '-translate-x-[calc(100%-14px)] opacity-95'
            }`}
          >
            {/* Main Glass Dock */}
            <div
              className={`relative bg-[#0c0c12]/95 backdrop-blur-2xl border rounded-r-2xl p-3 flex flex-col items-center gap-2 max-h-[85vh] overflow-y-auto min-w-[170px] transition-all duration-500 shadow-2xl ${
                introStage === 'focus'
                  ? 'border-white/40 shadow-[0_0_65px_rgba(255,255,255,0.25)] scale-[1.03]'
                  : 'border-white/15 hover:border-white/25 shadow-[0_0_40px_rgba(0,0,0,0.8)]'
              }`}
            >
              {/* Minimal Discovery Hint Tooltip (shown during Focus stage) */}
              <AnimatePresence>
                {introStage === 'focus' && (
                  <motion.div
                    initial={{ opacity: 0, x: -15, scale: 0.88 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#0c0c12]/95 border border-white/40 backdrop-blur-2xl text-gray-100 text-xs font-semibold shadow-[0_0_35px_rgba(255,255,255,0.2)] whitespace-nowrap"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <span>Explore the portfolio</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="flex items-center justify-between w-full px-2 pt-1 pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-widest font-mono">
                  <Compass size={14} className="text-white/80 animate-spin-slow" />
                  <span>Navigation</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Route Buttons List with Snake Entrance */}
              <div className="flex flex-col gap-2 w-full">
                {/* Previous / Up Button (Index 0) */}
                <motion.div
                  key={`prev-${openKey}`}
                  custom={0}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={prevRoute.path}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all duration-300 group/btn relative flex items-center justify-center w-full"
                    title={`Previous: ${prevRoute.name}`}
                  >
                    <ChevronUp size={18} className="transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
                    <span className="text-xs text-white/70 ml-1.5 font-medium font-mono">Prev ({prevRoute.name})</span>
                  </Link>
                </motion.div>

                <div className="w-full h-px bg-white/10 my-0.5" />

                {/* ALL 6 Route Buttons (Indices 1 to 6) */}
                <div className="flex flex-col gap-1.5 w-full">
                  {routes.map((route, i) => {
                    const Icon = route.icon
                    const isActive = i === currentIndex

                    return (
                      <motion.div
                        key={`${route.path}-${openKey}`}
                        custom={i + 1}
                        variants={navItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          href={route.path}
                          onClick={() => setIsOpen(false)}
                          className={`group/item flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                            isActive
                              ? 'bg-white text-black shadow-lg shadow-white/20 font-bold scale-[1.02]'
                              : 'text-gray-300 hover:text-white hover:bg-white/[0.08]'
                          }`}
                        >
                          <Icon size={18} className={isActive ? 'text-black' : 'text-white/60 group-hover/item:text-white'} />
                          <span className="text-xs font-medium tracking-wide">
                            {route.name}
                          </span>
                          {isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-black" />
                          )}
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="w-full h-px bg-white/10 my-0.5" />

                {/* Next / Down Button (Index 7) */}
                <motion.div
                  key={`next-${openKey}`}
                  custom={7}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={nextRoute.path}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all duration-300 group/btn relative flex items-center justify-center w-full"
                    title={`Next: ${nextRoute.name}`}
                  >
                    <ChevronDown size={18} className="transition-transform duration-300 group-hover/btn:translate-y-0.5" />
                    <span className="text-xs text-white/70 ml-1.5 font-medium font-mono">Next ({nextRoute.name})</span>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Edge Handle / Tab */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`py-6 px-1.5 bg-[#0c0c12]/95 backdrop-blur-xl border border-l-0 border-white/20 rounded-r-xl text-white shadow-xl cursor-pointer flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:bg-[#151520] hover:border-white/40 ${
                isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              title="Hover or click to open navigation"
              aria-label="Open navigation menu"
            >
              <ChevronRight size={14} className="animate-pulse text-white/80" />
              <div className="w-1 h-8 bg-gradient-to-b from-white via-white/70 to-white/20 rounded-full" />
            </button>
          </div>
        </motion.div>
      </aside>

      {/* ─────────────────────────────────────────
          MOBILE NAV — bottom pill bar (below md)
          Restored original bottom dock style
         ───────────────────────────────────────── */}
      <nav
        className="md:hidden fixed bottom-4 xs:bottom-5 left-1/2 -translate-x-1/2 z-50 select-none max-w-[96%]"
        aria-label="Mobile Navigation"
      >
        <motion.div
          variants={mobileNavVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-0.5 xs:gap-1 px-1.5 xs:px-3 py-1.5 xs:py-2 rounded-2xl bg-[#08080c]/95 backdrop-blur-2xl border border-white/15 shadow-[0_8px_40px_rgba(0,0,0,0.8)]"
        >
          {routes.map((route, i) => {
            const Icon = route.icon
            const isActive = i === currentIndex

            return (
              <motion.div
                key={route.path}
                custom={i}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href={route.path}
                  className={`relative flex flex-col items-center justify-center gap-0.5 px-1.5 xs:px-2.5 py-1 xs:py-1.5 rounded-xl transition-all duration-300 min-w-[39px] xs:min-w-[44px] ${
                    isActive
                      ? 'bg-white text-black shadow-lg shadow-white/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.07] active:scale-95'
                  }`}
                  aria-label={route.name}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    size={18}
                    className={isActive ? 'text-black' : 'text-white/60'}
                  />
                  <span
                    className={`text-[9px] font-semibold tracking-wide leading-none ${
                      isActive ? 'text-black' : 'text-gray-400'
                    }`}
                  >
                    {route.name}
                  </span>
                  {isActive && (
                    <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-black shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </nav>
    </>
  )
}