'use client'

import React, { useState } from 'react'
import { VscVscode } from 'react-icons/vsc'
import { SiGithub, SiFigma, SiNpm, SiVite, SiReactrouter, SiVercel, SiNextdotjs, SiReact, SiExpress, SiNodedotjs, SiMongodb, SiTypescript, SiTailwindcss, SiJavascript, SiHtml5, SiCss, SiPostgresql, SiPrisma } from 'react-icons/si'
import { MdOutlineDeveloperMode } from 'react-icons/md'

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
      className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 space-y-16 sm:space-y-24 overflow-hidden"
    >
      {/* Editorial Header — Refined & Balanced */}
      <div className="space-y-4 border-b border-white/[0.08] pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p
            className="text-xs tracking-[0.25em] uppercase text-[#82828e]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            INDEX // 03 — CAPABILITIES & STACK
          </p>
          <p
            className="text-xs tracking-[0.2em] uppercase text-white/50"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            ENGINEERED TOOLS
          </p>
        </div>

        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase"
          style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
        >
          TECHNICAL <span className="text-[#8a8a96]">REPERTOIRE.</span>
        </h1>

        <p
          className="text-sm sm:text-base text-[#a0a0ae] max-w-2xl font-light leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          An intentional arsenal of modern web technologies, runtime frameworks,
          and architectural tools deployed across high-scale applications.
        </p>
      </div>

      {/* Kinetic Typography Marquee Strips */}
      <div className="space-y-4 overflow-hidden border-y border-white/[0.08] py-8 select-none pointer-events-none">
        {/* Row 1 */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="marquee-row-1 flex items-center gap-10 text-3xl sm:text-5xl font-black text-white/20 uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
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
          <div className="marquee-row-2 flex items-center gap-10 text-3xl sm:text-5xl font-black text-white/10 uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            <span>GIT & GITHUB</span>
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
            <span>GIT & GITHUB</span>
            <span className="text-white/5">•</span>
            <span>POSTGRESQL</span>
            <span className="text-white/5">•</span>
            <span>PRISMA</span>
            <span className="text-white/5">•</span>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
            activeCategory === 'all'
              ? 'bg-white text-black font-bold'
              : 'bg-white/[0.04] text-white/70 hover:text-white border border-white/10'
          }`}
        >
          ALL CAPABILITIES
        </button>
        <button
          onClick={() => setActiveCategory('frontend')}
          className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
            activeCategory === 'frontend'
              ? 'bg-white text-black font-bold'
              : 'bg-white/[0.04] text-white/70 hover:text-white border border-white/10'
          }`}
        >
          FRONTEND
        </button>
        <button
          onClick={() => setActiveCategory('backend')}
          className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
            activeCategory === 'backend'
              ? 'bg-white text-black font-bold'
              : 'bg-white/[0.04] text-white/70 hover:text-white border border-white/10'
          }`}
        >
          BACKEND
        </button>
        <button
          onClick={() => setActiveCategory('tools')}
          className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
            activeCategory === 'tools'
              ? 'bg-white text-black font-bold'
              : 'bg-white/[0.04] text-white/70 hover:text-white border border-white/10'
          }`}
        >
          TOOLING
        </button>
        <button
          onClick={() => setActiveCategory('learning')}
          className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
            activeCategory === 'learning'
              ? 'bg-white text-black font-bold'
              : 'bg-white/[0.04] text-white/70 hover:text-white border border-white/10'
          }`}
        >
          RESEARCH & EXPANSION
        </button>
      </div>

      {/* Editorial Grouped Typographic Roster */}
      <div className="space-y-16">
        {filteredCategories.map((group, gIdx) => (
          <div key={group.category} className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <span
                className="text-xs font-mono uppercase tracking-[0.25em] text-[#82828e]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                0{gIdx + 1} // {group.category}
              </span>
              <span
                className="text-xs font-mono text-white/40"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                [{group.items.length} TECHNOLOGIES]
              </span>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.name}
                    className="group py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 hover:pl-2 sm:hover:pl-3 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="w-8 h-8 shrink-0 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-white/30 transition-all">
                        <Icon className="text-base" />
                      </div>
                      <span
                        className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-white group-hover:text-white transition-colors truncate"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {item.name}
                      </span>
                    </div>

                    <span
                      className="text-xs sm:text-sm font-mono text-[#82828e] group-hover:text-white/80 transition-colors uppercase tracking-wider sm:text-right shrink-0"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {item.role}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
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
        }
        .marquee-row-2 {
          display: flex;
          animation: marqueeScroll2 35s linear infinite;
        }
      `}</style>
    </section>
  )
}
