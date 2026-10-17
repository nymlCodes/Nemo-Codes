'use client'

import React from 'react'
import { motion, type Variants } from 'motion/react'
import { GraduationCap, Award, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react'
import { FaLaptopCode } from 'react-icons/fa'
import { SiNextdotjs, SiExpress, SiNodedotjs, SiTailwindcss, SiJavascript, SiReact } from 'react-icons/si'
import { EducationItem, CourseData, CertificateItem, GoalItemData } from '../../types'

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

const staggerCards: Variants = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const cardItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const educationData: EducationItem[] = [
  {
    degree: 'Bachelors of Business Administration (BBA)',
    institution: 'Govt. Haraganga College, Munshiganj',
    year: '2025 - 2026',
    description: 'Currently pursuing my Bachelors degree with a major in Accounting.',
    grade: 'Ongoing',
    ongoing: true,
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Govt. Haraganga College, Munshiganj',
    year: '2023 - 2025',
    description: 'Business Studies group. Focused on Accounting, Management, and Finance.',
    grade: 'GPA : 4.42 / 5.00',
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Kazi Kamoruddin Govt. Institution, Munshiganj',
    year: '2021 - 2023',
    description: 'Business Studies group. Achieved good results with strong foundation in Accounting and Finance.',
    grade: 'GPA : 4.22 / 5.00',
  },
]

const courseData: CourseData = {
  name: 'Complete Web Development',
  platform: 'Programming Hero',
  batch: 'Batch-13',
  year: '2026',
  skills: [
    { name: 'JavaScript ES6+' },
    { name: 'React.js' },
    { name: 'Next.js' },
    { name: 'Tailwind CSS' },
    { name: 'Node.js' },
    { name: 'Express.js' },
  ],
}

const certificatesData: CertificateItem[] = [
  {
    title: 'Complete Web Development Certificate',
    issuer: 'Programming Hero',
    type: 'Main Credential',
    link: 'https://drive.google.com/file/d/1YEQQXqg_0QGOXrJtrJ53nZ2seQHY3838/view?usp=drive_link',
    description:
      'Successfully completed the Programming Hero Web Development course, gaining hands-on experience in modern web development with HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, and related technologies.',
  },
  {
    title: 'Programming Hero Black Belt',
    issuer: 'Programming Hero',
    type: 'Honorary Recognition',
    link: 'https://drive.google.com/file/d/14qtUbABw949PCnx8ghlpSpue9grgMZtL/view?usp=drive_link',
    description:
      'A recognition awarded for successfully completing the Programming Hero Web Development journey with strong performance, consistency, and dedication across assignments, projects, and assessments.',
  },
]

const goals: GoalItemData[] = [
  { label: 'TypeScript', active: true },
  { label: 'PostgreSQL', active: true },
  { label: 'Prisma', active: true },
]

export default function Education() {
  return (
    <section
      id="education"
      className="relative z-10 w-full max-w-7xl mx-auto px-4 xs:px-6 sm:px-10 lg:px-16 py-12 xs:py-16 sm:py-24 space-y-12 xs:space-y-14 sm:space-y-20"
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
            INDEX // 04 — PEDAGOGY &amp; CREDENTIALS
          </p>
          <p
            className="text-[10px] xs:text-[11px] sm:text-xs tracking-[0.12em] xs:tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/50"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            ACADEMIC RIGOR &amp; CERTIFICATIONS
          </p>
        </div>

        <h1
          className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase break-words"
          style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
        >
          EDUCATION &amp; <span className="text-[#8a8a96]">CREDENTIALS.</span>
        </h1>

        <p
          className="text-xs xs:text-sm sm:text-base text-[#a0a0ae] max-w-2xl font-light leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          A dual foundation of rigorous business administration analysis and
          high-intensity full-stack web software engineering.
        </p>
      </motion.div>

      {/* Part 1: Academic Milestones Chronology */}
      <motion.div
        className="space-y-4 sm:space-y-6"
        variants={staggerCards}
        initial="hidden"
        whileInView="visible"
        viewport={vpOnce}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3 sm:pb-4">
          <span
            className="text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] xs:tracking-[0.2em] sm:tracking-[0.25em] text-[#82828e]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            01 // ACADEMIC FOUNDATIONS
          </span>
          <span
            className="text-[10px] xs:text-[11px] sm:text-xs font-mono text-white/40"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            [GOVT. INSTITUTIONS]
          </span>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {educationData.map((item, idx) => (
            <motion.div
              key={item.degree}
              variants={cardItem}
              className="p-4 xs:p-5 sm:p-6 lg:p-8 rounded-2xl border border-white/10 bg-[#09090d]/95 backdrop-blur-md shadow-xl grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 items-start hover:border-white/25 transition-all duration-300"
            >
              {/* Year & Index */}
              <div className="md:col-span-3 space-y-1 font-mono">
                <span className="text-[10px] xs:text-[11px] sm:text-xs text-[#82828e]">MILESTONE 0{idx + 1}</span>
                <p className="text-xs xs:text-sm font-bold text-white tracking-wider">{item.year}</p>
                {item.ongoing && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] xs:text-[10px] uppercase bg-white/10 text-white font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    CURRENT DEGREE
                  </span>
                )}
              </div>

              {/* Degree & Institution */}
              <div className="md:col-span-6 space-y-1.5 sm:space-y-2 min-w-0">
                <h3
                  className="text-base xs:text-lg sm:text-xl font-extrabold text-white tracking-tight uppercase leading-snug break-words"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {item.degree}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-mono break-words" style={{ fontFamily: "'Space Mono', monospace" }}>
                  {item.institution}
                </p>
                <p
                  className="text-xs sm:text-sm text-[#a0a0ae] font-light leading-relaxed"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.description}
                </p>
              </div>

              {/* Grade */}
              <div className="md:col-span-3 flex md:justify-end self-start md:self-auto">
                <span className="px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase bg-white/[0.05] border border-white/15 text-white shrink-0">
                  {item.grade}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Part 2: Intensive Engineering Course */}
      <motion.div
        className="space-y-4 sm:space-y-6 lg:space-y-8"
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
            02 // PROFESSIONAL BOOTCAMP
          </span>
          <span
            className="text-[10px] xs:text-[11px] sm:text-xs font-mono text-white/40"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            [{courseData.batch}]
          </span>
        </div>

        <div className="p-4 xs:p-6 sm:p-8 lg:p-12 rounded-2xl border border-white/10 bg-[#09090d] space-y-4 sm:space-y-6">
          <div className="flex flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="min-w-0">
              <span className="text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] xs:tracking-[0.2em] text-[#82828e]">
                {courseData.platform} • {courseData.year}
              </span>
              <h3
                className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight mt-1 break-words"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {courseData.name}
              </h3>
            </div>
            <span className="px-3 xs:px-4 py-1.5 rounded-full text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase bg-white text-black font-bold shrink-0 self-start sm:self-auto">
              {courseData.batch} COMPLETED
            </span>
          </div>

          <p
            className="text-xs xs:text-sm sm:text-base text-[#b0b0bc] font-light leading-relaxed max-w-3xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Intensive immersion covering modern full-stack engineering standards: component lifecycle,
            server-side rendering, asynchronous REST APIs, secure token auth, and MongoDB schema architecture.
          </p>

          <div className="flex flex-wrap gap-1.5 xs:gap-2 pt-1">
            {courseData.skills?.map((s) => (
              <span
                key={s.name}
                className="px-2 xs:px-2.5 sm:px-3 py-1 rounded text-[10px] xs:text-[11px] sm:text-xs font-mono text-white bg-white/[0.04] border border-white/10"
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Part 3: Verified Certificates */}
      <motion.div
        className="space-y-4 sm:space-y-6 lg:space-y-8"
        variants={staggerCards}
        initial="hidden"
        whileInView="visible"
        viewport={vpOnce}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3 sm:pb-4">
          <span
            className="text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] xs:tracking-[0.2em] sm:tracking-[0.25em] text-[#82828e]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            03 // VERIFIED CREDENTIALS
          </span>
          <span
            className="text-[10px] xs:text-[11px] sm:text-xs font-mono text-white/40"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            [GOOGLE DRIVE VERIFIED]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {certificatesData.map((cert) => (
            <motion.div
              key={cert.title}
              variants={cardItem}
              className="p-4 xs:p-5 sm:p-6 lg:p-8 rounded-2xl border border-white/10 bg-[#0c0c10] space-y-4 sm:space-y-5 flex flex-col justify-between hover:border-white/25 transition-all duration-300 min-w-0"
            >
              <div className="space-y-2 sm:space-y-3 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#82828e]">
                  <span>{cert.issuer}</span>
                  <span className="px-2 xs:px-2.5 py-0.5 rounded text-[9px] xs:text-[10px] uppercase bg-white/10 text-white font-mono">
                    {cert.type}
                  </span>
                </div>

                <h4
                  className="text-base xs:text-lg sm:text-xl font-bold text-white uppercase tracking-tight break-words"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {cert.title}
                </h4>

                <p
                  className="text-xs sm:text-sm text-[#a0a0ae] leading-relaxed font-light"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {cert.description}
                </p>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-white/[0.08]">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white hover:underline min-h-[44px] break-words"
                >
                  <span>Verify Credential Document</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Part 4: Active Technical Goals */}
      <motion.div
        className="space-y-4 sm:space-y-6 border-t border-white/[0.08] pt-6 sm:pt-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={vpOnce}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className="text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] xs:tracking-[0.2em] sm:tracking-[0.25em] text-[#82828e]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            04 // ACTIVE CURRICULUM ROADMAP
          </span>
          <span
            className="text-[10px] xs:text-[11px] sm:text-xs font-mono text-white/40"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            [IN-PROGRESS]
          </span>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2.5 xs:gap-3 sm:gap-4">
          {goals.map((g) => (
            <div
              key={g.label}
              className="p-3 xs:p-3.5 sm:p-4 rounded-xl border border-white/10 bg-[#09090d] flex items-center justify-between text-xs sm:text-sm font-mono text-white hover:border-white/25 transition-all duration-300 min-w-0"
            >
              <span className="truncate">{g.label}</span>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
