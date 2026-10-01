'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, type Variants } from 'motion/react'
import {
  FaGithub,
  FaClock,
  FaUsers,
  FaCheckCircle,
  FaLightbulb,
  FaBug,
  FaTools,
  FaRocket,
  FaArrowLeft,
  FaServer,
  FaCode,
  FaLayerGroup,
} from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import { Project } from '../types'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

interface ProjectDetailsClientProps {
  project: Project | null
}

export default function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  if (!project) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full p-8 rounded-2xl border border-white/10 bg-[#0a0a0e] text-center space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-[#82828e]">
            404 // NOT FOUND
          </p>
          <h1
            className="text-3xl font-extrabold text-white uppercase"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Project Not Found
          </h1>
          <p
            className="text-[#a0a0ae] text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            The requested project details could not be located.
          </p>
          <Link href="/projects" className="btn-editorial-primary text-xs !py-2.5 !px-5 inline-flex">
            <FaArrowLeft className="text-[10px]" /> Back to Case Studies
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-16">
        {/* Navigation Breadcrumb */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#82828e] hover:text-white transition-colors duration-200"
          >
            <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03] group-hover:border-white/40 group-hover:text-white transition-all duration-300">
              <FaArrowLeft className="text-[10px] transition-transform duration-300 group-hover:-translate-x-0.5" />
            </span>
            <span>BACK TO CASE STUDIES</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase border border-white/10 bg-white/[0.03] text-white/80">
              {project.category}
            </span>
            {project.status && (
              <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase border border-white/15 bg-white/[0.05] text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {project.status}
              </span>
            )}
          </div>
        </motion.div>

        {/* Hero Title & Description */}
        <motion.div variants={fadeUp} className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#82828e]">
            <span>// ARCHITECTURE & TECHNICAL SPECIFICATIONS</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase"
            style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
          >
            {project.title}
          </h1>

          <p
            className="text-[#b5b5c2] text-sm sm:text-lg leading-relaxed max-w-3xl font-light"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {project.fullDescription || (project as any).description}
          </p>

          {/* Quick Meta Row */}
          {(project.duration || project.team) && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.duration && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-white/80">
                  <FaClock className="text-white/50" />
                  <span>TIMELINE: {project.duration}</span>
                </div>
              )}
              {project.team && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-white/80">
                  <FaUsers className="text-white/50" />
                  <span>STRUCTURE: {project.team}</span>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Cinematic Preview & Action Banner — Crisp Colorful Image */}
        <motion.div variants={fadeUp} className="space-y-6">
          <div className="group relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/15 bg-[#0a0a0e] shadow-2xl">
            {/* Corner architectural brackets */}
            <div className="pointer-events-none absolute top-4 left-4 w-3 h-3 border-t border-l border-white/40 z-20" />
            <div className="pointer-events-none absolute top-4 right-4 w-3 h-3 border-t border-r border-white/40 z-20" />
            <div className="pointer-events-none absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/40 z-20" />
            <div className="pointer-events-none absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/40 z-20" />

            <Image
              src={project.thumbnail || (project as any).image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 z-10" />
          </div>

          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {(project.liveUrl || (project as any).liveLink) && (
              <a
                href={project.liveUrl || (project as any).liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-primary text-xs"
              >
                <span>Launch Live System</span>
                <FiArrowUpRight className="text-sm" />
              </a>
            )}

            {(project.githubUrl || (project as any).githubLink || (project as any).github) && (
              <a
                href={project.githubUrl || (project as any).githubLink || (project as any).github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-ghost text-xs"
              >
                <FaGithub />
                <span>Client Repository</span>
              </a>
            )}

            {project.server && (
              <a
                href={project.server}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-ghost text-xs"
              >
                <FaServer />
                <span>Server Repository</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Technologies Grid */}
        {project.technologies && project.technologies.length > 0 && (
          <motion.section variants={fadeUp} className="space-y-4 pt-8 border-t border-white/[0.08]">
            <span
              className="text-xs font-mono uppercase tracking-[0.25em] text-[#82828e]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              FRAMEWORKS & STACK
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-lg border border-white/[0.09] bg-white/[0.02] text-xs font-mono text-[#dcdce4]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <motion.section variants={fadeUp} className="space-y-4 pt-8 border-t border-white/[0.08]">
            <span
              className="text-xs font-mono uppercase tracking-[0.25em] text-[#82828e]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              ENGINEERING HIGHLIGHTS
            </span>
            <div className="grid sm:grid-cols-2 gap-3.5 pt-1">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-white/[0.08] bg-[#0c0c10] flex items-start gap-3"
                >
                  <FaCheckCircle className="text-white/60 text-xs mt-1 shrink-0" />
                  <p
                    className="text-xs sm:text-sm text-[#c8c5dc] leading-relaxed"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Challenges & Solutions */}
        {project.errors && project.errors.length > 0 && (
          <motion.section variants={fadeUp} className="space-y-6 pt-8 border-t border-white/[0.08]">
            <span
              className="text-xs font-mono uppercase tracking-[0.25em] text-[#82828e]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              TECHNICAL CHALLENGES & RESOLUTIONS
            </span>
            <div className="space-y-4 pt-1">
              {project.errors.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-white/[0.08] bg-[#0a0a0e] space-y-4"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/10 text-white border border-white/20">
                      CHALLENGE 0{idx + 1}
                    </span>
                    <h3
                      className="text-base font-bold text-white uppercase"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-1 font-mono text-xs">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                      <p className="text-[10px] uppercase text-[#82828e] flex items-center gap-1.5">
                        <FaBug className="text-white/40" /> PROBLEM DIAGNOSIS
                      </p>
                      <p
                        className="text-xs text-[#c0c0cc] leading-relaxed font-sans"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {item.problem}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                      <p className="text-[10px] uppercase text-white/80 flex items-center gap-1.5">
                        <FaTools className="text-white/60" /> ARCHITECTURAL RESOLUTION
                      </p>
                      <p
                        className="text-xs text-[#c0c0cc] leading-relaxed font-sans"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Lessons Learned */}
        {project.lessonsLearned && project.lessonsLearned.length > 0 && (
          <motion.section variants={fadeUp} className="space-y-4 pt-8 border-t border-white/[0.08]">
            <span
              className="text-xs font-mono uppercase tracking-[0.25em] text-[#82828e]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              KEY LEARNINGS & RETROSPECTIVE
            </span>
            <div className="space-y-3 pt-1">
              {project.lessonsLearned.map((lesson, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-white/[0.08] bg-[#0c0c10] flex items-start gap-3"
                >
                  <FaLightbulb className="text-white/50 text-xs mt-1 shrink-0" />
                  <p
                    className="text-xs sm:text-sm text-[#c8c5dc] leading-relaxed"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {lesson}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Future Plans */}
        {project.futurePlans && project.futurePlans.length > 0 && (
          <motion.section variants={fadeUp} className="space-y-4 pt-8 border-t border-white/[0.08]">
            <span
              className="text-xs font-mono uppercase tracking-[0.25em] text-[#82828e]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              PLANNED ROADMAP & ENHANCEMENTS
            </span>
            <div className="space-y-3 pt-1">
              {project.futurePlans.map((plan, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-white/[0.08] bg-[#0c0c10] flex items-start gap-3"
                >
                  <FaRocket className="text-white/50 text-xs mt-1 shrink-0" />
                  <p
                    className="text-xs sm:text-sm text-[#c8c5dc] leading-relaxed"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {plan}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Bottom Navigation */}
        <motion.div
          variants={fadeUp}
          className="pt-8 border-t border-white/[0.08] flex items-center justify-between"
        >
          <Link href="/projects" className="btn-editorial-ghost text-xs">
            <FaArrowLeft className="text-[10px]" />
            <span>All Case Studies</span>
          </Link>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white hover:underline"
            >
              <span>Visit Live Application</span>
              <FiArrowUpRight className="text-sm" />
            </a>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
