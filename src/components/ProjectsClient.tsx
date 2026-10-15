'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'motion/react'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaGithub, FaServer } from 'react-icons/fa'
import { Project } from '../types'

interface ProjectsClientProps {
  projects: Project[]
}

const vpRepeat = { once: false, amount: 0.12 }

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, transition: { duration: 0.35, ease: 'easeOut' } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const sceneVariants: Variants = {
  hidden: { opacity: 0, y: 32, transition: { duration: 0.4, ease: 'easeOut' } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const getProjectRoute = (p: Project) => {
    const slug = p._id || p.id || p.title.toLowerCase().replace(/\s+/g, '-')
    return `/details/${slug}`
  }

  // Helper to extract a clean, concise showcase excerpt
  const getShortDescription = (desc: string) => {
    if (!desc) return ''
    const firstSentence = desc.split('. ')[0]
    if (firstSentence && firstSentence.length > 30 && firstSentence.length < 180) {
      return `${firstSentence}.`
    }
    return desc.length > 160 ? `${desc.slice(0, 160)}...` : desc
  }

  // If backend returns empty array or request failed
  if (!projects || projects.length === 0) {
    return (
      <div className="relative w-full max-w-7xl mx-auto px-4 xs:px-6 sm:px-10 lg:px-16 py-16 sm:py-32 space-y-12">
        <div className="space-y-4 border-b border-white/[0.08] pb-10">
          <p
            className="text-[10px] xs:text-xs tracking-[0.16em] xs:tracking-[0.25em] uppercase text-[#82828e]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            INDEX // 05 — SELECTED CASE STUDIES
          </p>
          <h1
            className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase"
            style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
          >
            CURATED <span className="text-[#8a8a96]">WORKS.</span>
          </h1>
        </div>

        <div className="p-6 sm:p-12 rounded-2xl border border-white/10 bg-[#0a0a0e] text-center space-y-4 max-w-xl mx-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block animate-pulse" />
          <p className="font-mono text-xs text-white/50 tracking-widest uppercase">
            SERVER ERROR // DATA UNAVAILABLE
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-sans">
            Unable to connect to backend
          </h3>
          <p className="text-xs sm:text-sm text-[#82828e] font-light leading-relaxed">
            Could not fetch projects from the configured backend server. Please verify that the API server is online.
          </p>
        </div>
      </div>
    )
  }

  // Map incoming projects into the 4 bespoke editorial showcase scenes
  const p0 = projects[0]
  const p1 = projects[1]
  const p2 = projects[2]
  const p3 = projects[3]
  const remaining = projects.slice(4)

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 xs:px-6 sm:px-10 lg:px-16 py-12 xs:py-16 sm:py-24 space-y-16 xs:space-y-28 sm:space-y-36">
      {/* Editorial Header — Refined & Non-Dominant */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={vpRepeat}
        className="space-y-3 sm:space-y-4 border-b border-white/[0.08] pb-6 sm:pb-10"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <p
            className="text-[10px] xs:text-xs tracking-[0.14em] xs:tracking-[0.25em] uppercase text-[#82828e] break-words"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            INDEX // 05 — SELECTED CASE STUDIES
          </p>
          <p
            className="text-[10px] xs:text-xs tracking-[0.14em] xs:tracking-[0.2em] uppercase text-white/50"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            FULL STACK ARCHITECTURE &amp; WEB SYSTEMS
          </p>
        </div>

        <h1
          className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase break-words"
          style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
        >
          CURATED <span className="text-[#8a8a96]">WORKS.</span>
        </h1>

        <p
          className="text-xs xs:text-sm sm:text-base text-[#a0a0ae] max-w-2xl font-light leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          A gallery of full-stack web platforms, distributed APIs, and modern frontends.
          Select any case study to inspect technical specifications, lessons learned, and architecture.
        </p>
      </motion.div>

      {/* =========================================================================
          PROJECT SCENE 01: Asymmetric Monumental Stage
          ========================================================================= */}
      {p0 && (
        <motion.section
          variants={sceneVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vpRepeat}
          className="relative group scroll-mt-24"
        >
          <div className="flex items-center justify-between gap-4 mb-6 text-xs font-mono text-[#82828e]">
            <span className="text-lg sm:text-xl font-bold text-white/50 tracking-wider">
              01 // SHOWCASE
            </span>
            <span className="uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/80">
              {p0.category}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xs:gap-8 lg:gap-12 items-center">
            {/* Visual Canvas — Crisp, colorful, high-contrast */}
            <div className="lg:col-span-7 order-1 lg:order-1">
              <Link
                href={getProjectRoute(p0)}
                className="block relative group/img aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-[#0d0d12] shadow-2xl transition-all duration-300 hover:border-white/30"
              >
                <div className="pointer-events-none absolute top-3 xs:top-4 left-3 xs:left-4 w-3 h-3 border-t border-l border-white/40 z-20" />
                <div className="pointer-events-none absolute top-3 xs:top-4 right-3 xs:right-4 w-3 h-3 border-t border-r border-white/40 z-20" />
                <div className="pointer-events-none absolute bottom-3 xs:bottom-4 left-3 xs:left-4 w-3 h-3 border-b border-l border-white/40 z-20" />
                <div className="pointer-events-none absolute bottom-3 xs:bottom-4 right-3 xs:right-4 w-3 h-3 border-b border-r border-white/40 z-20" />

                <Image
                  src={p0.thumbnail}
                  alt={p0.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 z-10 pointer-events-none" />

                {/* Status indicator */}
                <div className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 z-20">
                  <span className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 rounded-full text-[10px] xs:text-[11px] font-mono tracking-wider uppercase bg-black/70 backdrop-blur-md border border-white/20 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {p0.status || 'Active'}
                  </span>
                </div>

                <div className="absolute top-3 xs:top-4 right-3 xs:right-4 z-20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-1 rounded-full text-[11px] xs:text-xs font-mono bg-black/70 backdrop-blur-md border border-white/20 text-white">
                    <span>View Details</span>
                    <FiArrowUpRight />
                  </span>
                </div>
              </Link>
            </div>

            {/* Typography & Showcase Info */}
            <div className="lg:col-span-5 order-2 lg:order-2 space-y-4 xs:space-y-5 min-w-0">
              <div className="space-y-1.5 xs:space-y-2">
                <span
                  className="text-[10px] xs:text-xs font-mono uppercase tracking-[0.16em] xs:tracking-[0.2em] text-[#82828e] block"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  FEATURED WORK // 01
                </span>

                <h2
                  className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase hover:text-white/90 transition-colors break-words"
                  style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
                >
                  <Link href={getProjectRoute(p0)}>
                    {p0.title}
                  </Link>
                </h2>
              </div>

              <p
                className="text-xs xs:text-sm sm:text-base text-[#b0b0bc] leading-relaxed font-light break-words"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {getShortDescription(p0.fullDescription)}
              </p>

              {/* Minimal Technologies */}
              <div className="flex flex-wrap gap-1.5 xs:gap-2 pt-1">
                {p0.technologies.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-[10px] xs:text-xs font-mono text-[#dcdce4] bg-white/[0.04] border border-white/10"
                  >
                    {t}
                  </span>
                ))}
                {p0.technologies.length > 4 && (
                  <span className="px-2 py-1 rounded-md text-[10px] xs:text-xs font-mono text-white/40">
                    +{p0.technologies.length - 4} more
                  </span>
                )}
              </div>

              {/* Action Buttons — Direct View Details Link */}
              <div className="flex flex-wrap items-center gap-2.5 xs:gap-3 pt-2 xs:pt-3">
                <Link
                  href={getProjectRoute(p0)}
                  className="btn-editorial-primary text-xs !py-2.5 !px-4 xs:!px-5 inline-flex items-center gap-2 min-h-[44px]"
                >
                  <span>View Details</span>
                  <FiArrowUpRight />
                </Link>

                {p0.liveUrl && (
                  <a
                    href={p0.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-editorial-ghost text-xs !py-2.5 !px-3.5 xs:!px-4 min-h-[44px]"
                  >
                    <span>Live Demo</span>
                    <FiArrowUpRight />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* =========================================================================
          PROJECT SCENE 02: Panoramic Full-Bleed Viewport Canvas
          ========================================================================= */}
      {p1 && (
        <motion.section
          variants={sceneVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vpRepeat}
          className="relative group scroll-mt-24 pt-4"
        >
          <div className="flex items-center justify-between gap-4 mb-6 text-xs font-mono text-[#82828e]">
            <span className="text-lg sm:text-xl font-bold text-white/50 tracking-wider">
              02 // SHOWCASE
            </span>
            <span className="uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/80">
              {p1.category}
            </span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0a0a0e] shadow-2xl transition-all duration-300 hover:border-white/30">
            <Link
              href={getProjectRoute(p1)}
              className="block relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden group/pan"
            >
              <Image
                src={p1.thumbnail}
                alt={p1.title}
                fill
                sizes="100vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover/pan:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            </Link>

            {/* Overlaid Editorial Showcase Strip */}
            <div className="p-4 xs:p-6 sm:p-8 bg-[#08080c]/95 backdrop-blur-xl border-t border-white/[0.08]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 xs:gap-6 items-end">
                <div className="lg:col-span-8 space-y-2.5 xs:space-y-3 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 xs:gap-3">
                    <span
                      className="text-[10px] xs:text-xs font-mono uppercase tracking-[0.16em] xs:tracking-[0.2em] text-[#82828e]"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      FEATURED WORK // 02
                    </span>
                    {p1.status && (
                      <span className="px-2 py-0.5 rounded text-[9px] xs:text-[10px] font-mono uppercase bg-white/10 text-white">
                        {p1.status}
                      </span>
                    )}
                  </div>

                  <h2
                    className="text-2xl xs:text-3xl sm:text-4xl font-black text-white tracking-tight uppercase break-words"
                    style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
                  >
                    <Link href={getProjectRoute(p1)}>
                      {p1.title}
                    </Link>
                  </h2>

                  <p
                    className="text-xs xs:text-sm sm:text-base text-[#b0b0bc] max-w-2xl font-light leading-relaxed break-words"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {getShortDescription(p1.fullDescription)}
                  </p>

                  {/* Minimal technologies */}
                  <div className="flex flex-wrap gap-1.5 xs:gap-2 pt-1">
                    {p1.technologies.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded text-[10px] xs:text-xs font-mono text-white/80 bg-white/[0.04] border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-wrap lg:justify-end items-center gap-2.5 xs:gap-3 pt-2 lg:pt-0">
                  <Link
                    href={getProjectRoute(p1)}
                    className="btn-editorial-primary text-xs !py-2.5 !px-4 xs:!px-5 inline-flex items-center gap-2 min-h-[44px]"
                  >
                    <span>View Details</span>
                    <FiArrowUpRight />
                  </Link>

                  {p1.liveUrl && (
                    <a
                      href={p1.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial-ghost text-xs !py-2.5 !px-3.5 xs:!px-4 min-h-[44px]"
                    >
                      <span>Live Demo</span>
                      <FiArrowUpRight />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* =========================================================================
          PROJECT SCENE 03: Split-Schematic Canvas
          ========================================================================= */}
      {p2 && (
        <motion.section
          variants={sceneVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vpRepeat}
          className="relative group scroll-mt-24 pt-4"
        >
          <div className="flex items-center justify-between gap-4 mb-6 text-xs font-mono text-[#82828e]">
            <span className="text-lg sm:text-xl font-bold text-white/50 tracking-wider">
              03 // SHOWCASE
            </span>
            <span className="uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/80">
              {p2.category}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xs:gap-8 lg:gap-12 items-center">
            {/* Visual Canvas (First on mobile, Second on desktop) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Link
                href={getProjectRoute(p2)}
                className="block relative group/img aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-[#0d0d12] shadow-2xl transition-all duration-300 hover:border-white/30"
              >
                <div className="pointer-events-none absolute top-3 xs:top-4 left-3 xs:left-4 w-3 h-3 border-t border-l border-white/40 z-20" />
                <div className="pointer-events-none absolute top-3 xs:top-4 right-3 xs:right-4 w-3 h-3 border-t border-r border-white/40 z-20" />
                <div className="pointer-events-none absolute bottom-3 xs:bottom-4 left-3 xs:left-4 w-3 h-3 border-b border-l border-white/40 z-20" />
                <div className="pointer-events-none absolute bottom-3 xs:bottom-4 right-3 xs:right-4 w-3 h-3 border-b border-r border-white/40 z-20" />

                <Image
                  src={p2.thumbnail}
                  alt={p2.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 z-10 pointer-events-none" />

                <div className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 z-20">
                  <span className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 rounded-full text-[10px] xs:text-[11px] font-mono tracking-wider uppercase bg-black/70 backdrop-blur-md border border-white/20 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {p2.status || 'Active'}
                  </span>
                </div>

                <div className="absolute top-3 xs:top-4 right-3 xs:right-4 z-20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-1 rounded-full text-[11px] xs:text-xs font-mono bg-black/70 backdrop-blur-md border border-white/20 text-white">
                    <span>View Details</span>
                    <FiArrowUpRight />
                  </span>
                </div>
              </Link>
            </div>

            {/* Typography & Showcase Specs (Second on mobile, First on desktop) */}
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-4 xs:space-y-5 min-w-0">
              <div className="space-y-1.5 xs:space-y-2">
                <span
                  className="text-[10px] xs:text-xs font-mono uppercase tracking-[0.16em] xs:tracking-[0.2em] text-[#82828e] block"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  FEATURED WORK // 03
                </span>

                <h2
                  className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase break-words"
                  style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
                >
                  <Link href={getProjectRoute(p2)}>
                    {p2.title}
                  </Link>
                </h2>
              </div>

              <p
                className="text-xs xs:text-sm sm:text-base text-[#b0b0bc] leading-relaxed font-light break-words"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {getShortDescription(p2.fullDescription)}
              </p>

              {/* Minimal Technologies */}
              <div className="flex flex-wrap gap-1.5 xs:gap-2 pt-1">
                {p2.technologies.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded text-[10px] xs:text-xs font-mono text-[#dcdce4] bg-white/[0.04] border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2.5 xs:gap-3 pt-2 xs:pt-3">
                <Link
                  href={getProjectRoute(p2)}
                  className="btn-editorial-primary text-xs !py-2.5 !px-4 xs:!px-5 inline-flex items-center gap-2 min-h-[44px]"
                >
                  <span>View Details</span>
                  <FiArrowUpRight />
                </Link>

                {p2.liveUrl && (
                  <a
                    href={p2.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-editorial-ghost text-xs !py-2.5 !px-3.5 xs:!px-4 min-h-[44px]"
                  >
                    <span>Live Demo</span>
                    <FiArrowUpRight />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* =========================================================================
          PROJECT SCENE 04: Monolith Magazine Canvas
          ========================================================================= */}
      {p3 && (
        <motion.section
          variants={sceneVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vpRepeat}
          className="relative group scroll-mt-24 pt-4"
        >
          <div className="flex items-center justify-between gap-4 mb-6 text-xs font-mono text-[#82828e]">
            <span className="text-lg sm:text-xl font-bold text-white/50 tracking-wider">
              04 // SHOWCASE
            </span>
            <span className="uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/80">
              {p3.category}
            </span>
          </div>

          <div className="relative border border-white/15 rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-10 bg-[#09090d] overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/30">
            {/* Background Big Typographic Monolith */}
            <div
              className="absolute -top-10 -right-10 pointer-events-none select-none text-[8rem] sm:text-[16rem] font-black text-white/[0.03] leading-none uppercase"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              04
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xs:gap-8 items-center relative z-10">
              {/* Left Canvas */}
              <div className="lg:col-span-7">
                <Link
                  href={getProjectRoute(p3)}
                  className="block relative group/img aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-[#0b0b0f] shadow-xl"
                >
                  <Image
                    src={p3.thumbnail}
                    alt={p3.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 z-10 pointer-events-none" />
                </Link>
              </div>

              {/* Right Typography & Narrative */}
              <div className="lg:col-span-5 space-y-4 xs:space-y-5 min-w-0">
                <div className="space-y-1.5 xs:space-y-2">
                  <span
                    className="text-[10px] xs:text-xs font-mono uppercase tracking-[0.16em] xs:tracking-[0.2em] text-[#82828e] block"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    FEATURED WORK // 04
                  </span>

                  <h2
                    className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase break-words"
                    style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
                  >
                    <Link href={getProjectRoute(p3)}>
                      {p3.title}
                    </Link>
                  </h2>
                </div>

                <p
                  className="text-xs xs:text-sm sm:text-base text-[#b0b0bc] leading-relaxed font-light break-words"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {getShortDescription(p3.fullDescription)}
                </p>

                {/* Minimal Technologies */}
                <div className="flex flex-wrap gap-1.5 xs:gap-2 pt-1">
                  {p3.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded text-[10px] xs:text-xs font-mono text-[#dcdce4] bg-white/[0.04] border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2.5 xs:gap-3 pt-2 xs:pt-3">
                  <Link
                    href={getProjectRoute(p3)}
                    className="btn-editorial-primary text-xs !py-2.5 !px-4 xs:!px-5 inline-flex items-center gap-2 min-h-[44px]"
                  >
                    <span>View Details</span>
                    <FiArrowUpRight />
                  </Link>

                  {p3.liveUrl && (
                    <a
                      href={p3.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial-ghost text-xs !py-2.5 !px-3.5 xs:!px-4 min-h-[44px]"
                    >
                      <span>Live Demo</span>
                      <FiArrowUpRight />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Any remaining projects rendered in creative alternate showcase scenes */}
      {remaining.map((p, index) => (
        <motion.section
          variants={sceneVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vpRepeat}
          key={p._id || p.title}
          className="relative group scroll-mt-24 pt-6 border-t border-white/[0.08]"
        >
          <div className="flex items-center justify-between gap-4 mb-6 text-xs font-mono text-[#82828e]">
            <span className="text-lg sm:text-xl font-bold text-white/50 tracking-wider">
              0{index + 5} // SHOWCASE
            </span>
            <span className="uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/80">
              {p.category}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xs:gap-8 items-center">
            <div className="lg:col-span-7">
              <Link
                href={getProjectRoute(p)}
                className="block relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-[#0d0d12] shadow-xl group/rem transition-all duration-300 hover:border-white/30"
              >
                <Image
                  src={p.thumbnail}
                  alt={p.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover/rem:scale-105"
                />
              </Link>
            </div>
            <div className="lg:col-span-5 space-y-3.5 xs:space-y-4 min-w-0">
              <h2
                className="text-xl xs:text-2xl sm:text-3xl font-black text-white tracking-tight uppercase break-words"
                style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
              >
                <Link href={getProjectRoute(p)}>
                  {p.title}
                </Link>
              </h2>
              <p className="text-xs xs:text-sm text-[#b0b0bc] font-light leading-relaxed break-words">
                {getShortDescription(p.fullDescription)}
              </p>
              <div className="flex flex-wrap gap-1.5 xs:gap-2">
                {p.technologies.slice(0, 4).map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded text-[10px] xs:text-xs font-mono text-[#dcdce4] bg-white/[0.04] border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2.5 xs:gap-3 pt-2">
                <Link
                  href={getProjectRoute(p)}
                  className="btn-editorial-primary text-xs !py-2.5 !px-4 xs:!px-5 inline-flex items-center gap-2 min-h-[44px]"
                >
                  <span>View Details</span>
                  <FiArrowUpRight />
                </Link>
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-editorial-ghost text-xs !py-2.5 !px-3.5 xs:!px-4 min-h-[44px]">
                    <span>Live Demo</span>
                    <FiArrowUpRight />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      ))}

      {/* GitHub Callout Footer */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={vpRepeat}
        className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/[0.08] pt-12"
      >
        <div>
          <h3
            className="text-xl sm:text-2xl font-bold text-white uppercase"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            MORE EXPERIMENTS ON GITHUB
          </h3>
          <p className="text-sm text-[#82828e] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Explore repositories, open-source code, and architectural experiments.
          </p>
        </div>

        <a
          href="https://github.com/nymlCodes"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-editorial-ghost"
        >
          <FaGithub className="text-base" />
          <span>github.com/nymlCodes</span>
          <FiArrowUpRight className="text-sm" />
        </a>
      </motion.div>
    </div>
  )
}
