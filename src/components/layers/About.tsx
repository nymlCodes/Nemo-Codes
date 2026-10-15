'use client'

import React from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'motion/react'
import { SiNextdotjs, SiExpress, SiNodedotjs, SiMongodb } from 'react-icons/si'
import { FaMapMarkerAlt } from 'react-icons/fa'
import neyamul from '../../../public/neyamul.png'

// Viewport trigger — repeatable scroll-reveal in both directions
const vpRepeat = { once: false, amount: 0.15 }

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
    y: 12,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: 24,
    y: 12,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}

const specItem: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full max-w-7xl mx-auto px-4 xs:px-6 sm:px-10 lg:px-16 py-12 xs:py-16 sm:py-24 lg:py-32 space-y-12 xs:space-y-16 sm:space-y-24"
    >
      {/* ── Editorial Header ── */}
      <motion.div
        className="space-y-3 sm:space-y-4 border-b border-white/[0.08] pb-6 sm:pb-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={vpRepeat}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <p
            className="text-[10px] xs:text-[11px] sm:text-xs tracking-[0.12em] xs:tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#82828e] break-words"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            INDEX // 02 — BIOGRAPHY &amp; PERSPECTIVE
          </p>
          <p
            className="text-[10px] xs:text-[11px] sm:text-xs tracking-[0.12em] xs:tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/50"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            DISCIPLINE &amp; CRAFT
          </p>
        </div>

        <h1
          className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase break-words"
          style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
        >
          ABOUT <span className="text-[#8a8a96]">NEYAMUL.</span>
        </h1>

        <p
          className="text-xs xs:text-sm sm:text-base md:text-lg text-[#b0b0bc] font-light leading-relaxed max-w-3xl"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Turning complex backend logic and user interactions into sculptural,
          high-performance digital platforms.
        </p>
      </motion.div>

      {/* ── Main Asymmetric Composition ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">

        {/* ── Left Column: Portrait & Stack Panel ── */}
        <motion.div
          className="md:col-span-5 w-full max-w-md mx-auto md:max-w-none space-y-5 sm:space-y-8"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={vpRepeat}
        >
          {/* Portrait frame */}
          <div className="relative group rounded-2xl overflow-hidden border border-white/15 bg-[#0a0a0e] shadow-2xl transition-all duration-500 hover:border-white/30 w-full">
            {/* Corner architectural crosshairs */}
            <div className="pointer-events-none absolute top-3 xs:top-4 left-3 xs:left-4 w-3 h-3 border-t border-l border-white/40 z-20 transition-all duration-300 group-hover:border-white" />
            <div className="pointer-events-none absolute top-3 xs:top-4 right-3 xs:right-4 w-3 h-3 border-t border-r border-white/40 z-20 transition-all duration-300 group-hover:border-white" />
            <div className="pointer-events-none absolute bottom-3 xs:bottom-4 left-3 xs:left-4 w-3 h-3 border-b border-l border-white/40 z-20 transition-all duration-300 group-hover:border-white" />
            <div className="pointer-events-none absolute bottom-3 xs:bottom-4 right-3 xs:right-4 w-3 h-3 border-b border-r border-white/40 z-20 transition-all duration-300 group-hover:border-white" />

            <div className="relative aspect-[4/5] w-full">
              <Image
                src={neyamul}
                alt="Neyamul Islam"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 420px"
                className="object-cover object-top transition-all duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bottom Status Tag */}
            <div className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 right-3 xs:right-4 z-20 flex flex-wrap items-center justify-between gap-1.5 xs:gap-2 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] xs:text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                OPEN TO OPPORTUNITIES
              </span>
              <span className="text-white/60 text-[10px] xs:text-[11px] px-2 py-1 rounded bg-black/40 backdrop-blur-sm shrink-0">
                DHAKA, BD
              </span>
            </div>
          </div>

          {/* Core Stack Panel */}
          <div className="p-4 xs:p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#09090d] space-y-3 xs:space-y-4">
            <p
              className="text-[10px] xs:text-[11px] sm:text-xs uppercase tracking-[0.16em] xs:tracking-[0.2em] text-[#82828e]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              CORE ARCHITECTURAL STACK
            </p>
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-3 sm:gap-4">
              {[
                { Icon: SiNextdotjs, label: 'Next.js' },
                { Icon: SiExpress, label: 'Express.js' },
                { Icon: SiNodedotjs, label: 'Node.js' },
                { Icon: SiMongodb, label: 'MongoDB' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white text-xs font-mono hover:text-white/80 transition-colors min-w-0">
                  <Icon className="text-base sm:text-lg shrink-0" />
                  <span className="truncate">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Right Column: Editorial Bio & Specs ── */}
        <motion.div
          className="md:col-span-7 w-full min-w-0 space-y-6 sm:space-y-10"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={vpRepeat}
        >
          {/* Bio */}
          <div className="space-y-4 sm:space-y-6">
            <h2
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase break-words"
              style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
            >
              Hi! I&apos;m{' '}
              <span className="text-[#a8a8b4]">Neyamul Islam</span>
            </h2>

            <div
              className="space-y-3 xs:space-y-4 sm:space-y-5 text-xs xs:text-sm sm:text-base md:text-lg text-[#b0b0bc] font-light leading-relaxed"
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
              <blockquote className="pl-3 xs:pl-4 sm:pl-5 py-1 border-l-2 border-white/20 italic text-white font-normal text-xs xs:text-sm sm:text-base">
                &ldquo;When I&apos;m not coding, I&apos;m a big anime fan — you might have
                noticed my Attack on Titan shirt!&rdquo;
              </blockquote>
            </div>
          </div>

          {/* ── Specs Matrix ── */}
          <motion.div
            className="space-y-3 xs:space-y-4 pt-3 sm:pt-4 border-t border-white/[0.08]"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={vpRepeat}
          >
            <p
              className="text-[10px] xs:text-[11px] sm:text-xs uppercase tracking-[0.16em] xs:tracking-[0.2em] text-[#82828e]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              SPECIFICATIONS &amp; PROFILE DATA
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4">
              {[
                { label: 'FULL NAME', value: 'Neyamul Islam' },
                { label: 'LOCATION', value: 'Bangladesh', withIcon: true },
                { label: 'CORE FOCUS', value: 'Full Stack Engineering (MERN)' },
                { label: 'INTERESTS & ETHIC', value: 'Anime & Self-Discipline' },
              ].map(({ label, value, withIcon }) => (
                <motion.div
                  key={label}
                  variants={specItem}
                  className="p-3 xs:p-3.5 sm:p-4 rounded-xl border border-white/[0.08] bg-[#0c0c10] space-y-1 transition-colors duration-300 hover:border-white/20 min-w-0"
                >
                  <span
                    className="text-[9px] xs:text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#82828e] block"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {label}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5 break-words">
                    <span>{value}</span>
                    {withIcon && <FaMapMarkerAlt className="text-xs text-white/50 shrink-0" />}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Quick Fact Tags ── */}
          <div className="flex flex-wrap gap-1.5 xs:gap-2 pt-1">
            {['🇧🇩 Based in Bangladesh', '⚡ Full MERN Stack', '⚔️ Anime & Discipline'].map((tag) => (
              <span
                key={tag}
                className="px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-full text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white bg-white/[0.05] border border-white/15 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:translate-y-[-1px] cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


