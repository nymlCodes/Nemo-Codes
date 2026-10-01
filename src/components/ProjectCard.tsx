import React from 'react'
import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'
import { Project } from '../types'
import Image from 'next/image'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-[#0c0c10] p-6 space-y-5 transition-all duration-300 hover:border-white/25">
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#121218]">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover object-top transition-all duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-[#82828e]">
          <span>0{index + 1} // {project.category}</span>
          <span>{project.duration}</span>
        </div>
        <h3
          className="text-2xl font-bold text-white uppercase tracking-tight"
          style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
        >
          {project.title}
        </h3>
        <p
          className="text-xs text-[#a0a0ae] leading-relaxed line-clamp-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {project.fullDescription}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-0.5 rounded text-[10px] font-mono text-white/70 bg-white/[0.04] border border-white/10"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] text-xs font-mono">
        <Link
          href={`/details/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
          className="inline-flex items-center gap-1 text-white hover:underline uppercase tracking-wider"
        >
          <span>View Specs</span>
          <FiArrowUpRight />
        </Link>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </div>
  )
}
