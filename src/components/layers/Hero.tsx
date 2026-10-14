'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'motion/react'
import { FiArrowUpRight, FiDownload, FiArrowRight } from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const roles = [
  'MERN Stack Developer',
  'Full Stack Web Developer',
  'React & Next.js Specialist',
  'UI/UX & Frontend Lover',
]

// Staggered motion variants for orchestrated editorial reveal
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Fluid, jitter-free typewriter engine — preserved
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-[92vh] flex flex-col justify-between pt-20 sm:pt-24 pb-14 sm:pb-16 px-4 xs:px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Top Editorial Sub-bar */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-white/[0.08] pb-5 sm:pb-6 mb-8 sm:mb-14"
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <span
            className="text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.25em] text-white/90 font-bold"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            AVAILABLE FOR GLOBAL ROLES &amp; WORK // 2026
          </span>
        </div>

        <div
          className="text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[#82828e]"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          DHAKA, BANGLADESH // 23.8103° N, 90.4125° E
        </div>
      </motion.div>

      {/* Main Asymmetric Hero Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-end my-auto">
        {/* Left Column: Monumental Typography & Narrative */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          <div className="space-y-2 sm:space-y-3">
            <motion.p
              variants={itemVariants}
              className="text-[11px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#82828e] font-medium"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              [ ARTISANAL FULL-STACK ENGINEERING ]
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-[2.6rem] xs:text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-extrabold text-white leading-[0.92] sm:leading-[0.88] tracking-[-0.04em] uppercase select-none"
              style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
            >
              <span className="inline-block transition-transform duration-500 hover:translate-x-1">
                NEYAMUL
              </span>
              <br />
              <span className="text-[#a8a8b4] inline-block transition-all duration-500 hover:text-white hover:translate-x-1">
                ISLAM
              </span>
            </motion.h1>
          </div>

          {/* ── MOBILE ONLY: Profile photo between name & typewriter ── */}
          <motion.div
            variants={imageVariants}
            className="lg:hidden flex justify-center sm:justify-end py-2"
          >
            <div className="hero-portrait-frame relative group w-[220px] xs:w-[250px] sm:w-[290px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 bg-[#0a0a0e] shadow-2xl transition-all duration-500 hover:border-white/35">
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
                sizes="(max-width: 640px) 250px, 290px"
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
            variants={itemVariants}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1"
          >
            <span
              className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] text-[#82828e] shrink-0"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              SPECIALIZING IN:
            </span>
            {/* Ghost sizer locks container width — typewriter never shifts layout */}
            <div className="relative inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 transition-colors duration-300 hover:border-white/25">
              <span
                className="invisible select-none pointer-events-none opacity-0 whitespace-nowrap text-xs sm:text-sm md:text-base font-medium"
                aria-hidden="true"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                React &amp; Next.js Specialist
              </span>
              <div className="absolute inset-0 flex items-center px-3 sm:px-4">
                <span
                  className="text-xs sm:text-sm md:text-base text-white font-medium whitespace-nowrap tracking-wide"
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
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[#b5b5c2] leading-relaxed max-w-2xl font-light"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            A passionate developer from Bangladesh, building beautiful and functional
            web experiences. Fan of clean code, rigorous architecture, and great design.
          </motion.p>

          {/* Action CTAs with Refined Micro-interactions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 sm:pt-4"
          >
            <Link
              href="/projects"
              className="btn-editorial-primary group w-full xs:w-auto justify-center"
            >
              <span>View Case Studies</span>
              <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="btn-editorial-ghost w-full xs:w-auto justify-center"
            >
              <span>Get In Touch</span>
            </Link>

            <a
              href="https://drive.google.com/file/d/1qbVFIHhEWMtQ-m-UawTH8NwfVrJbNJoq/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-ghost w-full xs:w-auto justify-center group"
            >
              <FiDownload className="text-sm transition-transform duration-300 group-hover:translate-y-0.5" />
              <span>Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Architectural Portrait Frame — desktop only */}
        <motion.div
          variants={imageVariants}
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
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 border-t border-white/[0.08] pt-6 sm:pt-8 mt-10 sm:mt-16 text-xs text-[#82828e]"
      >
        <div
          className="flex flex-wrap items-center gap-5 sm:gap-6"
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
          className="text-[11px] sm:text-xs tracking-widest uppercase text-[#82828e]"
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

