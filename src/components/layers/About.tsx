'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { SiNextdotjs, SiExpress, SiNodedotjs, SiMongodb } from 'react-icons/si'
import { FaMapMarkerAlt } from 'react-icons/fa'
import neyamul from '../../../public/neyamul.png'

// Simple transition helper
const t = (delay: number, duration = 0.7) => ({
  duration,
  delay,
  ease: 'easeOut' as const,
})

// Viewport trigger — animate once when section scrolls into view
const vp = { once: true, margin: '-80px' }

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-32 space-y-24"
    >
      {/* ── Editorial Header ── */}
      <motion.div
        className="space-y-4 border-b border-white/[0.08] pb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={t(0)}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p
            className="text-xs tracking-[0.25em] uppercase text-[#82828e]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            INDEX // 02 — BIOGRAPHY &amp; PERSPECTIVE
          </p>
          <p
            className="text-xs tracking-[0.2em] uppercase text-white/50"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            DISCIPLINE &amp; CRAFT
          </p>
        </div>

        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase"
          style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
        >
          ABOUT <span className="text-[#8a8a96]">NEYAMUL.</span>
        </h1>

        <p
          className="text-sm sm:text-base md:text-lg text-[#b0b0bc] font-light leading-relaxed max-w-3xl"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Turning complex backend logic and user interactions into sculptural,
          high-performance digital platforms.
        </p>
      </motion.div>

      {/* ── Main Asymmetric Composition ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* ── Left Column: Portrait & Stack Panel ── */}
        <motion.div
          className="lg:col-span-5 space-y-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={t(0.1)}
        >
          {/* Portrait frame */}
          <div className="relative group rounded-2xl overflow-hidden border border-white/15 bg-[#0a0a0e] shadow-2xl">
            {/* Corner architectural crosshairs */}
            <div className="pointer-events-none absolute top-4 left-4 w-3 h-3 border-t border-l border-white/40 z-20" />
            <div className="pointer-events-none absolute top-4 right-4 w-3 h-3 border-t border-r border-white/40 z-20" />
            <div className="pointer-events-none absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/40 z-20" />
            <div className="pointer-events-none absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/40 z-20" />

            <div className="relative aspect-[4/5] w-full">
              <Image
                src={neyamul}
                alt="Neyamul Islam"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-top transition-all duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bottom Status Tag */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs font-mono">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                OPEN TO OPPORTUNITIES
              </span>
              <span className="text-white/60">DHAKA, BD</span>
            </div>
          </div>

          {/* Core Stack Panel */}
          <div className="p-6 rounded-2xl border border-white/10 bg-[#09090d] space-y-4">
            <p
              className="text-xs uppercase tracking-[0.2em] text-[#82828e]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              CORE ARCHITECTURAL STACK
            </p>
            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2 text-white text-xs font-mono">
                <SiNextdotjs className="text-lg" />
                <span>Next.js</span>
              </div>
              <div className="flex items-center gap-2 text-white text-xs font-mono">
                <SiExpress className="text-lg" />
                <span>Express.js</span>
              </div>
              <div className="flex items-center gap-2 text-white text-xs font-mono">
                <SiNodedotjs className="text-lg" />
                <span>Node.js</span>
              </div>
              <div className="flex items-center gap-2 text-white text-xs font-mono">
                <SiMongodb className="text-lg" />
                <span>MongoDB</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Right Column: Editorial Bio & Specs ── */}
        <motion.div
          className="lg:col-span-7 space-y-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={t(0.2)}
        >
          {/* Bio */}
          <div className="space-y-6">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase"
              style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
            >
              Hi! I&apos;m{' '}
              <span className="text-[#a8a8b4]">Neyamul Islam</span>
            </h2>

            <div
              className="space-y-5 text-base sm:text-lg text-[#b0b0bc] font-light leading-relaxed"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <p>
                I&apos;m a MERN Stack developer from Bangladesh with a passion for building
                beautiful, functional web experiences. I love turning ideas into reality
                using code and design.
              </p>

              <p>
                I work with JavaScript, TypeScript, NextJS, TailwindCSS, ExpressJS and MongoDB
                to create responsive and visually appealing websites. I&apos;m always learning
                new technologies to level up my skills.
              </p>

              {/* Editorial pull-quote */}
              <blockquote className="pl-5 py-1 border-l-2 border-white/20 italic text-white font-normal">
                &ldquo;When I&apos;m not coding, I&apos;m a big anime fan — you might have
                noticed my Attack on Titan shirt!&rdquo;
              </blockquote>
            </div>
          </div>

          {/* ── Specs Matrix ── */}
          <div className="space-y-4 pt-4 border-t border-white/[0.08]">
            <p
              className="text-xs uppercase tracking-[0.2em] text-[#82828e]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              SPECIFICATIONS &amp; PROFILE DATA
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c0c10] space-y-1 transition-colors duration-300 hover:border-white/20">
                <span
                  className="text-[11px] font-mono uppercase tracking-wider text-[#82828e]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  FULL NAME
                </span>
                <p className="text-sm font-semibold text-white">Neyamul Islam</p>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c0c10] space-y-1 transition-colors duration-300 hover:border-white/20">
                <span
                  className="text-[11px] font-mono uppercase tracking-wider text-[#82828e]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  LOCATION
                </span>
                <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <span>Bangladesh</span>
                  <FaMapMarkerAlt className="text-xs text-white/50" />
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c0c10] space-y-1 transition-colors duration-300 hover:border-white/20">
                <span
                  className="text-[11px] font-mono uppercase tracking-wider text-[#82828e]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  CORE FOCUS
                </span>
                <p className="text-sm font-semibold text-white">Full Stack Engineering (MERN)</p>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c0c10] space-y-1 transition-colors duration-300 hover:border-white/20">
                <span
                  className="text-[11px] font-mono uppercase tracking-wider text-[#82828e]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  INTERESTS &amp; ETHIC
                </span>
                <p className="text-sm font-semibold text-white">Anime &amp; Self-Discipline</p>
              </div>
            </div>
          </div>

          {/* ── Quick Fact Tags ── */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-white/[0.05] border border-white/15 transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.08]">
              🇧🇩 Based in Bangladesh
            </span>
            <span className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-white/[0.05] border border-white/15 transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.08]">
              ⚡ Full MERN Stack
            </span>
            <span className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-white/[0.05] border border-white/15 transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.08]">
              ⚔️ Anime &amp; Discipline
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
