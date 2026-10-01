'use client'

import React from 'react'
import { GraduationCap, Award, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react'
import { FaLaptopCode } from 'react-icons/fa'
import { SiNextdotjs, SiExpress, SiNodedotjs, SiTailwindcss, SiJavascript, SiReact } from 'react-icons/si'
import { EducationItem, CourseData, CertificateItem, GoalItemData } from '../../types'

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
      className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 space-y-16 sm:space-y-24"
    >
      {/* Editorial Header — Refined & Balanced */}
      <div className="space-y-4 border-b border-white/[0.08] pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p
            className="text-xs tracking-[0.25em] uppercase text-[#82828e]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            INDEX // 04 — PEDAGOGY & CREDENTIALS
          </p>
          <p
            className="text-xs tracking-[0.2em] uppercase text-white/50"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            ACADEMIC RIGOR & CERTIFICATIONS
          </p>
        </div>

        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase"
          style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
        >
          EDUCATION & <span className="text-[#8a8a96]">CREDENTIALS.</span>
        </h1>

        <p
          className="text-sm sm:text-base text-[#a0a0ae] max-w-2xl font-light leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          A dual foundation of rigorous business administration analysis and
          high-intensity full-stack web software engineering.
        </p>
      </div>

      {/* Part 1: Academic Milestones Chronology */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <span
            className="text-xs font-mono uppercase tracking-[0.25em] text-[#82828e]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            01 // ACADEMIC FOUNDATIONS
          </span>
          <span
            className="text-xs font-mono text-white/40"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            [GOVT. INSTITUTIONS]
          </span>
        </div>

        <div className="space-y-4">
          {educationData.map((item, idx) => (
            <div
              key={item.degree}
              className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#09090d]/95 backdrop-blur-md shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center hover:border-white/25 transition-all duration-300"
            >
              {/* Year & Index */}
              <div className="lg:col-span-3 space-y-1 font-mono">
                <span className="text-xs text-[#82828e]">MILESTONE 0{idx + 1}</span>
                <p className="text-sm font-bold text-white tracking-wider">{item.year}</p>
                {item.ongoing && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase bg-white/10 text-white font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    CURRENT DEGREE
                  </span>
                )}
              </div>

              {/* Degree & Institution */}
              <div className="lg:col-span-6 space-y-2">
                <h3
                  className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {item.degree}
                </h3>
                <p className="text-sm text-white/70 font-mono" style={{ fontFamily: "'Space Mono', monospace" }}>
                  {item.institution}
                </p>
                <p
                  className="text-sm text-[#a0a0ae] font-light leading-relaxed pt-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.description}
                </p>
              </div>

              {/* Grade */}
              <div className="lg:col-span-3 flex lg:justify-end">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase bg-white/[0.05] border border-white/15 text-white">
                  {item.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Intensive Engineering Course */}
      <div className="space-y-8 pt-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <span
            className="text-xs font-mono uppercase tracking-[0.25em] text-[#82828e]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            02 // PROFESSIONAL BOOTCAMP
          </span>
          <span
            className="text-xs font-mono text-white/40"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            [{courseData.batch}]
          </span>
        </div>

        <div className="p-8 sm:p-12 rounded-2xl border border-white/10 bg-[#09090d] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#82828e]">
                {courseData.platform} • {courseData.year}
              </span>
              <h3
                className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mt-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {courseData.name}
              </h3>
            </div>
            <span className="px-4 py-1.5 rounded-full text-xs font-mono uppercase bg-white text-black font-bold">
              {courseData.batch} COMPLETED
            </span>
          </div>

          <p
            className="text-sm sm:text-base text-[#b0b0bc] font-light leading-relaxed max-w-3xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Intensive immersion covering modern full-stack engineering standards: component lifecycle,
            server-side rendering, asynchronous REST APIs, secure token auth, and MongoDB schema architecture.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {courseData.skills?.map((s) => (
              <span
                key={s.name}
                className="px-3 py-1 rounded text-xs font-mono text-white bg-white/[0.04] border border-white/10"
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Part 3: Verified Certificates */}
      <div className="space-y-8 pt-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <span
            className="text-xs font-mono uppercase tracking-[0.25em] text-[#82828e]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            03 // VERIFIED CREDENTIALS
          </span>
          <span
            className="text-xs font-mono text-white/40"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            [GOOGLE DRIVE VERIFIED]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificatesData.map((cert) => (
            <div
              key={cert.title}
              className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0c0c10] space-y-5 flex flex-col justify-between hover:border-white/25 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#82828e]">
                  <span>{cert.issuer}</span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] uppercase bg-white/10 text-white font-mono">
                    {cert.type}
                  </span>
                </div>

                <h4
                  className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight"
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

              <div className="pt-4 border-t border-white/[0.08]">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:underline"
                >
                  <span>Verify Credential Document</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 4: Active Technical Goals */}
      <div className="space-y-6 pt-6 border-t border-white/[0.08]">
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-mono uppercase tracking-[0.25em] text-[#82828e]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            04 // ACTIVE CURRICULUM ROADMAP
          </span>
          <span
            className="text-xs font-mono text-white/40"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            [IN-PROGRESS]
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {goals.map((g) => (
            <div
              key={g.label}
              className="p-4 rounded-xl border border-white/10 bg-[#09090d] flex items-center justify-between text-sm font-mono text-white"
            >
              <span>{g.label}</span>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
