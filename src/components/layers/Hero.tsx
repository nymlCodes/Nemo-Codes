'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { FiArrowUpRight, FiDownload, FiArrowRight } from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const roles = [
  'MERN Stack Developer',
  'Full Stack Web Developer',
  'React & Next.js Specialist',
  'UI/UX & Frontend Lover',
]

// Simple transition helper — avoids repeating boilerplate
const transition = (delay: number, duration = 0.65) => ({
  duration,
  delay,
  ease: 'easeOut' as const,
})

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Fluid, jitter-free typewriter engine — unchanged
  useEffect(() => {
    let timer: NodeJS.Timeout
    const currentFullText = roles[roleIndex]

    if (isDeleting) {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText((prev) => currentFullText.substring(0, prev.length - 1))
        }, 35)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
        }, 350)
      }
    } else {
      if (displayText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayText((prev) => currentFullText.substring(0, prev.length + 1))
        }, 75)
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2200)
      }
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Top Editorial Sub-bar */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-12 sm:mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition(0.1, 0.7)}
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span
            className="text-xs uppercase tracking-[0.25em] text-white/90 font-bold"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            AVAILABLE FOR GLOBAL ROLES &amp; WORK // 2026
          </span>
        </div>

        <div
          className="text-xs uppercase tracking-[0.2em] text-[#82828e]"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          DHAKA, BANGLADESH // 23.8103° N, 90.4125° E
        </div>
      </motion.div>

      {/* Main Asymmetric Hero Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end my-auto">
        {/* Left Column: Oversized Monumental Typography */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-2">
            <motion.p
              className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#82828e] font-medium"
              style={{ fontFamily: "'Space Mono', monospace" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.18)}
            >
              [ ARTISANAL FULL-STACK ENGINEERING ]
            </motion.p>

            <motion.h1
              className="text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-extrabold text-white leading-[0.88] tracking-[-0.04em] uppercase"
              style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.28)}
            >
              NEYAMUL
              <br />
              <span className="text-[#a8a8b4]">ISLAM</span>
            </motion.h1>
          </div>

          {/* ── MOBILE ONLY: Profile photo between name & typewriter ── */}
          {/* On desktop this image is in the right column below */}
          <motion.div
            className="lg:hidden flex justify-end"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.38)}
          >
            <div className="relative group w-[260px] sm:w-[300px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 bg-[#0a0a0e] shadow-2xl">
              <div className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40 z-20" />
              <div className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t border-r border-white/40 z-20" />
              <div className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/40 z-20" />
              <div className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/40 z-20" />

              <Image
                src="/profile.png"
                alt="Neyamul Islam"
                fill
                priority
                sizes="(max-width: 640px) 260px, 300px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-xs">
                <span
                  className="font-mono text-[10px] text-white/90 uppercase tracking-widest"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  🇧🇩 BD
                </span>
                <span
                  className="font-mono text-[9px] text-white/50 tracking-wider"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  EST. 2024
                </span>
              </div>
            </div>
          </motion.div>

          {/* Layout-Stable Typewriter Role Pill */}
          <motion.div
            className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.44)}
          >
            <span
              className="text-xs font-mono uppercase tracking-[0.15em] text-[#82828e] shrink-0"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              SPECIALIZING IN:
            </span>
            {/* Ghost sizer locks container width — typewriter never shifts layout */}
            <div className="relative inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shrink-0">
              <span
                className="invisible select-none pointer-events-none opacity-0 whitespace-nowrap text-sm sm:text-base font-medium"
                aria-hidden="true"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                React &amp; Next.js Specialist
              </span>
              <div className="absolute inset-0 flex items-center px-4">
                <span
                  className="text-sm sm:text-base text-white font-medium whitespace-nowrap"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {displayText}
                </span>
                <span className="w-1.5 h-4 ml-1.5 bg-white animate-pulse shrink-0" aria-hidden="true" />
              </div>
            </div>
          </motion.div>

          {/* Statement Bio */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-[#b5b5c2] leading-relaxed max-w-2xl font-light"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.54)}
          >
            A passionate developer from Bangladesh, building beautiful and functional
            web experiences. Fan of clean code, rigorous architecture, and great design.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4 pt-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.64)}
          >
            <Link href="/projects" className="btn-editorial-primary">
              <span>View Case Studies</span>
              <FiArrowRight className="text-sm" />
            </Link>

            <Link href="/contact" className="btn-editorial-ghost">
              <span>Get In Touch</span>
            </Link>

            <a
              href="https://drive.google.com/file/d/1qbVFIHhEWMtQ-m-UawTH8NwfVrJbNJoq/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-ghost"
            >
              <FiDownload className="text-sm" />
              <span>Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Architectural Portrait Frame — desktop only */}
        <motion.div
          className="lg:col-span-4 hidden lg:flex flex-col items-start lg:items-end justify-end"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.36)}
        >
          <div className="relative group w-full max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 bg-[#0a0a0e] shadow-2xl">
            <div className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40 z-20" />
            <div className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t border-r border-white/40 z-20" />
            <div className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/40 z-20" />
            <div className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/40 z-20" />

            <Image
              src="/profile.png"
              alt="Neyamul Islam"
              fill
              priority
              sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 340px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs">
              <span
                className="font-mono text-[11px] text-white/90 uppercase tracking-widest"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                🇧🇩 BANGLADESH
              </span>
              <span
                className="font-mono text-[10px] text-white/50 tracking-wider"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                EST. 2024
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Coordinates & Socials */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-6 border-t border-white/[0.08] pt-8 mt-16 text-xs text-[#82828e]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition(0.74, 0.8)}
      >
        <div
          className="flex items-center gap-6"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <a
            href="https://github.com/nymlCodes"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200 inline-flex items-center gap-2"
          >
            <FaGithub className="text-sm" />
            <span>GITHUB</span>
            <FiArrowUpRight className="text-xs opacity-50" />
          </a>

          <a
            href="https://www.linkedin.com/in/neya-mul/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200 inline-flex items-center gap-2"
          >
            <FaLinkedin className="text-sm" />
            <span>LINKEDIN</span>
            <FiArrowUpRight className="text-xs opacity-50" />
          </a>
        </div>

        <div
          className="text-xs tracking-widest uppercase text-[#82828e]"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          SCROLL TO EXPLORE ↓
        </div>
      </motion.div>
    </section>
  )
}
