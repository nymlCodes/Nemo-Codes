'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'motion/react'
import { FiArrowUpRight, FiDownload, FiArrowRight } from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useSplash } from '../HomeClient'

const roles = [
  'MERN Stack Developer',
  'Full Stack Web Developer',
  'React & Next.js Specialist',
  'UI/UX & Frontend Lover',
]

// ── Hero Section Entrance & Scroll-Reveal Variants ──

const heroSectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const topBarVariants: Variants = {
  hidden: { opacity: 0, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.12,
    },
  },
}

const headingFirstLineVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.18,
    },
  },
}

const headingSecondLineVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.28,
    },
  },
}

const rolePillVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.38,
    },
  },
}

const bioVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.44,
    },
  },
}

const ctaContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.5,
    },
  },
}

const ctaItemVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const heroImageVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 24,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.25,
    },
  },
}

const bottomBarVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.62,
    },
  },
}

export default function Hero() {
  const { splashDone } = useSplash()
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Fluid typewriter engine
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
    <motion.section
      id="home"
      variants={heroSectionVariants}
      initial="hidden"
      animate={splashDone ? 'visible' : 'hidden'}
      className="relative min-h-[92vh] flex flex-col justify-between pt-16 xs:pt-20 sm:pt-24 pb-12 xs:pb-14 sm:pb-16 px-4 xs:px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-x-hidden"
    >
      {/* Subtle Ambient Breathing Background Element (No particles, purely tonal, GPU opacity only) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(500px,90vw)] sm:w-[min(750px,95vw)] lg:w-[900px] h-[280px] sm:h-[400px] rounded-full blur-[140px] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent -z-10 select-none will-change-[opacity]"
        initial={{ opacity: 0 }}
        animate={
          splashDone
            ? {
                opacity: [0.04, 0.09, 0.04],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.8,
                },
              }
            : { opacity: 0 }
        }
      />

      {/* Top Editorial Sub-bar */}
      <motion.div
        variants={topBarVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 border-b border-white/[0.08] pb-4 xs:pb-5 sm:pb-6 mb-6 xs:mb-8 sm:mb-14"
      >
        <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <span
            className="text-[9px] xs:text-[10px] sm:text-xs uppercase tracking-[0.1em] xs:tracking-[0.14em] sm:tracking-[0.25em] text-white/90 font-bold break-words"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            AVAILABLE FOR GLOBAL ROLES &amp; WORK // 2026
          </span>
        </div>

        <div
          className="text-[9px] xs:text-[10px] sm:text-xs uppercase tracking-[0.1em] xs:tracking-[0.12em] sm:tracking-[0.2em] text-[#82828e] break-words"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          DHAKA, BANGLADESH // 23.8103° N, 90.4125° E
        </div>
      </motion.div>

      {/* Main Asymmetric Hero Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-end my-auto">
        {/* Left Column: Monumental Typography & Narrative */}
        <div className="lg:col-span-8 space-y-5 sm:space-y-8 w-full min-w-0">
          <div className="space-y-2 sm:space-y-3">
            <motion.p
              variants={subtitleVariants}
              className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm tracking-[0.16em] xs:tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#82828e] font-medium break-words"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              [ ARTISANAL FULL-STACK ENGINEERING ]
            </motion.p>

            <motion.h1
              className="font-extrabold text-white uppercase select-none leading-[0.9] tracking-[-0.03em]"
              style={{
                fontFamily: "'Syne', 'Outfit', sans-serif",
                fontSize: 'clamp(2.4rem, 11vw, 9rem)',
              }}
            >
              <motion.span
                variants={headingFirstLineVariants}
                className="block transition-transform duration-500 hover:translate-x-1"
              >
                NEYAMUL
              </motion.span>
              <motion.span
                variants={headingSecondLineVariants}
                className="text-[#a8a8b4] block transition-all duration-500 hover:text-white hover:translate-x-1 mt-1"
              >
                ISLAM
              </motion.span>
            </motion.h1>
          </div>

          {/* ── MOBILE/TABLET ONLY: Profile photo between name & typewriter ── */}
          <motion.div
            variants={heroImageVariants}
            className="lg:hidden flex justify-center sm:justify-center py-2"
          >
            <div
              className="hero-portrait-frame relative group aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 bg-[#0a0a0e] shadow-2xl transition-all duration-500 hover:border-white/35"
              style={{ width: 'min(52vw, 260px)' }}
            >
              {/* Corner crosshairs */}
              <div className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40 z-20 transition-all duration-300 group-hover:border-white" />
              <div className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t border-r border-white/40 z-20 transition-all duration-300 group-hover:border-white" />
              <div className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/40 z-20 transition-all duration-300 group-hover:border-white" />
              <div className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/40 z-20 transition-all duration-300 group-hover:border-white" />

              <Image
                src="/profile.png"
                alt="Neyamul Islam"
                fill
                priority
                sizes="(max-width: 640px) 52vw, 290px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-xs">
                <span
                  className="font-mono text-[10px] text-white/90 uppercase tracking-widest px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  🇧🇩 BD
                </span>
                <span
                  className="font-mono text-[9px] text-white/60 tracking-wider px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  EST. 2024
                </span>
              </div>
            </div>
          </motion.div>

          {/* Layout-Stable Typewriter Role Pill */}
          <motion.div
            variants={rolePillVariants}
            className="flex flex-wrap items-center gap-2 xs:gap-2.5 sm:gap-3 pt-1"
          >
            <span
              className="text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] text-[#82828e] shrink-0"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              SPECIALIZING IN:
            </span>

            {/* Ghost sizer locks container width — capped so it never blows out narrow viewports */}
            <div className="relative inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 transition-colors duration-300 hover:border-white/25 max-w-[min(100%,240px)] sm:max-w-none">
              <span
                className="invisible select-none pointer-events-none opacity-0 whitespace-nowrap text-xs sm:text-sm font-medium"
                aria-hidden="true"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                React &amp; Next.js Specialist
              </span>
              <div className="absolute inset-0 flex items-center px-3 sm:px-4 overflow-hidden">
                <span
                  className="text-xs sm:text-sm text-white font-medium whitespace-nowrap tracking-wide"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {displayText}
                </span>
                <span className="w-1.5 h-3.5 sm:h-4 ml-1.5 bg-white animate-pulse shrink-0" aria-hidden="true" />
              </div>
            </div>
          </motion.div>

          {/* Statement Bio */}
          <motion.p
            variants={bioVariants}
            className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-[#b5b5c2] leading-relaxed max-w-2xl font-light"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            A passionate developer from Bangladesh, building beautiful and functional
            web experiences. Fan of clean code, rigorous architecture, and great design.
          </motion.p>

          {/* Action CTAs with Staggered Entrance Micro-interactions */}
          <motion.div
            variants={ctaContainerVariants}
            className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-2.5 xs:gap-3 sm:gap-4 pt-2 xs:pt-3 sm:pt-4"
          >
            <motion.div variants={ctaItemVariants} className="xs:col-span-2 sm:w-auto">
              <Link
                href="/projects"
                className="btn-editorial-primary group w-full sm:w-auto justify-center"
              >
                <span>View Case Studies</span>
                <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div variants={ctaItemVariants} className="sm:w-auto">
              <Link
                href="/contact"
                className="btn-editorial-ghost w-full sm:w-auto justify-center"
              >
                <span>Get In Touch</span>
              </Link>
            </motion.div>

            <motion.div variants={ctaItemVariants} className="sm:w-auto">
              <a
                href="https://drive.google.com/file/d/1qbVFIHhEWMtQ-m-UawTH8NwfVrJbNJoq/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-ghost w-full sm:w-auto justify-center group"
              >
                <FiDownload className="text-sm transition-transform duration-300 group-hover:translate-y-0.5" />
                <span>Resume</span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: Architectural Portrait Frame — desktop only */}
        <motion.div
          variants={heroImageVariants}
          className="lg:col-span-4 hidden lg:flex flex-col items-end justify-end"
        >
          <div className="hero-portrait-frame relative group w-full max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 bg-[#0a0a0e] shadow-2xl transition-all duration-500 hover:border-white/35">
            <div className="pointer-events-none absolute top-3.5 left-3.5 w-3 h-3 border-t border-l border-white/40 z-20 transition-all duration-300 group-hover:border-white" />
            <div className="pointer-events-none absolute top-3.5 right-3.5 w-3 h-3 border-t border-r border-white/40 z-20 transition-all duration-300 group-hover:border-white" />
            <div className="pointer-events-none absolute bottom-3.5 left-3.5 w-3 h-3 border-b border-l border-white/40 z-20 transition-all duration-300 group-hover:border-white" />
            <div className="pointer-events-none absolute bottom-3.5 right-3.5 w-3 h-3 border-b border-r border-white/40 z-20 transition-all duration-300 group-hover:border-white" />

            <Image
              src="/profile.png"
              alt="Neyamul Islam"
              fill
              priority
              sizes="(max-width: 1024px) 320px, 340px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs">
              <span
                className="font-mono text-[11px] text-white/90 uppercase tracking-widest px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm border border-white/15"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                🇧🇩 BANGLADESH
              </span>
              <span
                className="font-mono text-[10px] text-white/60 tracking-wider px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm border border-white/15"
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
        variants={bottomBarVariants}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 xs:gap-4 sm:gap-6 border-t border-white/[0.08] pt-4 xs:pt-6 sm:pt-8 mt-6 xs:mt-8 sm:mt-16 text-xs text-[#82828e]"
      >
        <div
          className="flex flex-wrap items-center gap-4 sm:gap-6"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <a
            href="https://github.com/nymlCodes"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200 inline-flex items-center gap-2 py-1 min-h-[44px]"
            aria-label="Visit GitHub Profile"
          >
            <FaGithub className="text-sm" />
            <span>GITHUB</span>
            <FiArrowUpRight className="text-xs opacity-50" />
          </a>

          <a
            href="https://www.linkedin.com/in/neya-mul/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200 inline-flex items-center gap-2 py-1 min-h-[44px]"
            aria-label="Visit LinkedIn Profile"
          >
            <FaLinkedin className="text-sm" />
            <span>LINKEDIN</span>
            <FiArrowUpRight className="text-xs opacity-50" />
          </a>
        </div>

        <div
          className="text-[10px] xs:text-[11px] sm:text-xs tracking-widest uppercase text-[#82828e]"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          SCROLL TO EXPLORE ↓
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes heroFloat {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
          .hero-portrait-frame {
            animation: heroFloat 8s ease-in-out infinite;
          }
        }
      `}</style>
    </motion.section>
  )
}


