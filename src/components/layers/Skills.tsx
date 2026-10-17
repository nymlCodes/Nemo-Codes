'use client'

import React, { useState } from 'react'
import { motion, type Variants } from 'motion/react'
import { VscVscode } from 'react-icons/vsc'
import { SiGithub, SiFigma, SiNpm, SiVite, SiReactrouter, SiVercel, SiNextdotjs, SiReact, SiExpress, SiNodedotjs, SiMongodb, SiTypescript, SiTailwindcss, SiJavascript, SiHtml5, SiCss, SiPostgresql, SiPrisma } from 'react-icons/si'
import { MdOutlineDeveloperMode } from 'react-icons/md'

const vpOnce = { once: true, amount: 0.1 }

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerList: Variants = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.05 },
  },
}

const rowItem: Variants = {
  hidden: {
    opacity: 0,
    x: -16,
    y: 10,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'tools' | 'learning'>('all')

  const capabilities = [
    {
      category: 'FRONTEND ARCHITECTURE',
      id: 'frontend',
      items: [
        { name: 'Next.js', role: 'Full-stack React Framework & SSR', icon: SiNextdotjs },
        { name: 'React.js', role: 'Component Architecture & State', icon: SiReact },
        { name: 'TypeScript', role: 'Type Safety & Scalable Systems', icon: SiTypescript },
        { name: 'JavaScript-ES6', role: 'Asynchronous Logic & DOM', icon: SiJavascript },
        { name: 'Tailwind CSS', role: 'Utility Design & Responsive Layouts', icon: SiTailwindcss },
        { name: 'CSS3', role: 'Animations, Grid & Flexbox Systems', icon: SiCss },
        { name: 'HTML5', role: 'Semantic & Accessible Structure', icon: SiHtml5 },
      ],
    },
    {
      category: 'BACKEND & DATA LAYER',
      id: 'backend',
      items: [
        { name: 'Node.js', role: 'Event-driven Server Runtime', icon: SiNodedotjs },
        { name: 'Express.js', role: 'RESTful API Engineering & Middleware', icon: SiExpress },
        { name: 'MongoDB', role: 'Document Database & Aggregations', icon: SiMongodb },
      ],
    },
    {
      category: 'WORKFLOW & DEVELOPMENT TOOLS',
      id: 'tools',
      items: [
        { name: 'Git & GitHub', role: 'Version Control & Team Collaboration', icon: SiGithub },
        { name: 'VS Code', role: 'Primary Development Environment', icon: VscVscode },
        { name: 'Figma', role: 'Interface Design & Asset Prototyping', icon: SiFigma },
        { name: 'Chrome DevTools', role: 'Profiling, Network & Diagnostics', icon: MdOutlineDeveloperMode },
        { name: 'npm', role: 'Package Lifecycle Management', icon: SiNpm },
        { name: 'Vite', role: 'Next-Gen Frontend Tooling', icon: SiVite },
        { name: 'React Router', role: 'Client-side Declarative Routing', icon: SiReactrouter },
        { name: 'Vercel', role: 'Cloud Deployment & Serverless Functions', icon: SiVercel },
      ],
    },
    {
      category: 'ACTIVE EXPANSION & RESEARCH',
      id: 'learning',
      items: [
        { name: 'TypeScript', role: 'Advanced Generics & Design Patterns', icon: SiTypescript },
        { name: 'PostgreSQL', role: 'Relational Database Design & SQL', icon: SiPostgresql },
        { name: 'Prisma', role: 'Type-safe Next-generation ORM', icon: SiPrisma },
      ],
    },
  ]

  const filteredCategories = activeCategory === 'all'
    ? capabilities
    : capabilities.filter((c) => c.id === activeCategory)

  return (
    <section
      id="skills"
      className="relative w-full max-w-7xl mx-auto px-4 xs:px-6 sm:px-10 lg:px-16 py-12 xs:py-16 sm:py-24 space-y-12 xs:space-y-16 sm:space-y-24 overflow-hidden"
    >
      {/* Editorial Header — Refined & Balanced */}
      <motion.div
        className="space-y-3 sm:space-y-4 border-b border-white/[0.08] pb-6 sm:pb-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={vpOnce}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <p
            className="text-[10px] xs:text-[11px] sm:text-xs tracking-[0.12em] xs:tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#82828e] break-words"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            INDEX // 03 — CAPABILITIES &amp; STACK
          </p>
          <p
            className="text-[10px] xs:text-[11px] sm:text-xs tracking-[0.12em] xs:tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/50"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            ENGINEERED TOOLS
          </p>
        </div>

        <h1
          className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase break-words"
          style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
        >
          TECHNICAL <span className="text-[#8a8a96]">REPERTOIRE.</span>
        </h1>

        <p
          className="text-xs xs:text-sm sm:text-base text-[#a0a0ae] max-w-2xl font-light leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          An intentional arsenal of modern web technologies, runtime frameworks,
          and architectural tools deployed across high-scale applications.
        </p>
      </motion.div>

      {/* Kinetic Typography Marquee Strips */}
      <motion.div
        className="space-y-3 sm:space-y-4 overflow-hidden border-y border-white/[0.08] py-4 xs:py-6 sm:py-8 select-none pointer-events-none"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={vpOnce}
      >
        {/* Row 1 */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="marquee-row-1 flex items-center gap-6 sm:gap-10 text-2xl sm:text-4xl lg:text-5xl font-black text-white/20 uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            <span>NEXT.JS</span>
            <span className="text-white/10">•</span>
            <span>TYPESCRIPT</span>
            <span className="text-white/10">•</span>
            <span>EXPRESS.JS</span>
            <span className="text-white/10">•</span>
            <span>MONGODB</span>
            <span className="text-white/10">•</span>
            <span>TAILWIND CSS</span>
            <span className="text-white/10">•</span>
            <span>REACT.JS</span>
            <span className="text-white/10">•</span>
            <span>NODE.JS</span>
            <span className="text-white/10">•</span>
            <span>NEXT.JS</span>
            <span className="text-white/10">•</span>
            <span>TYPESCRIPT</span>
            <span className="text-white/10">•</span>
            <span>EXPRESS.JS</span>
            <span className="text-white/10">•</span>
            <span>MONGODB</span>
            <span className="text-white/10">•</span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="marquee-row-2 flex items-center gap-6 sm:gap-10 text-2xl sm:text-4xl lg:text-5xl font-black text-white/10 uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            <span>GIT &amp; GITHUB</span>
            <span className="text-white/5">•</span>
            <span>POSTGRESQL</span>
            <span className="text-white/5">•</span>
            <span>PRISMA</span>
            <span className="text-white/5">•</span>
            <span>VERCEL</span>
            <span className="text-white/5">•</span>
            <span>FIGMA</span>
            <span className="text-white/5">•</span>
            <span>CHROME DEVTOOLS</span>
            <span className="text-white/5">•</span>
            <span>GIT &amp; GITHUB</span>
            <span className="text-white/5">•</span>
            <span>POSTGRESQL</span>
            <span className="text-white/5">•</span>
            <span>PRISMA</span>
            <span className="text-white/5">•</span>
          </div>
        </div>
      </motion.div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5 xs:gap-2">
        {([
          { id: 'all', label: 'ALL CAPABILITIES' },
          { id: 'frontend', label: 'FRONTEND' },
          { id: 'backend', label: 'BACKEND' },
          { id: 'tools', label: 'TOOLING' },
          { id: 'learning', label: 'RESEARCH' },
        ] as const).map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveCategory(id)}
            className={`px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-full text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 min-h-[44px] ${
              activeCategory === id
                ? 'bg-white text-black font-bold'
                : 'bg-white/[0.04] text-white/70 hover:text-white border border-white/10 hover:border-white/25'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Editorial Grouped Typographic Roster */}
      <div className="space-y-10 sm:space-y-16">
        {filteredCategories.map((group, gIdx) => (
          <motion.div
            key={group.category}
            className="space-y-4 sm:space-y-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vpOnce}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3 sm:pb-4">
              <span
                className="text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] xs:tracking-[0.2em] sm:tracking-[0.25em] text-[#82828e]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                0{gIdx + 1} // {group.category}
              </span>
              <span
                className="text-[10px] xs:text-[11px] sm:text-xs font-mono text-white/40"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                [{group.items.length} TECH]
              </span>
            </div>

            <motion.div
              className="divide-y divide-white/[0.06]"
              variants={staggerList}
              initial="hidden"
              whileInView="visible"
              viewport={vpOnce}
            >
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.name}
                    variants={rowItem}
                    className="group py-3 xs:py-3.5 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 hover:pl-1.5 xs:hover:pl-2 sm:hover:pl-3 transition-all duration-300 min-w-0"
                  >
                    <div className="flex items-center gap-2.5 xs:gap-3 sm:gap-4 min-w-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-white/30 transition-all duration-300">
                        <Icon className="text-sm sm:text-base" />
                      </div>
                      <span
                        className="text-sm xs:text-base sm:text-xl lg:text-2xl xl:text-3xl font-extrabold text-white group-hover:text-white transition-colors truncate"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {item.name}
                      </span>
                    </div>

                    <span
                      className="text-[10px] xs:text-[11px] sm:text-xs font-mono text-[#82828e] group-hover:text-white/80 transition-colors uppercase tracking-wider sm:text-right shrink-0 ml-9 sm:ml-0 break-words"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {item.role}
                    </span>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll1 {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeScroll2 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .marquee-row-1 {
          display: flex;
          animation: marqueeScroll1 30s linear infinite;
          will-change: transform;
          contain: content;
        }
        .marquee-row-2 {
          display: flex;
          animation: marqueeScroll2 35s linear infinite;
          will-change: transform;
          contain: content;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-row-1, .marquee-row-2 {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
