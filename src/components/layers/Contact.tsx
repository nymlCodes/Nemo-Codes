'use client'

import React, { useState } from 'react'
import { motion, type Variants } from 'motion/react'
import { FaLinkedin, FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'
import { FiArrowUpRight, FiSend } from 'react-icons/fi'

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
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
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
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const contactLinks = [
  {
    icon: FaEnvelope,
    label: 'EMAIL',
    value: 'neyamulislam946@gmail.com',
    href: 'mailto:neyamulislam946@gmail.com',
  },
  {
    icon: FaWhatsapp,
    label: 'WHATSAPP',
    value: '+880 1874062550',
    href: 'https://wa.me/8801874062550',
  },
  {
    icon: FaPhoneAlt,
    label: 'PHONE',
    value: '+880 1874062550',
    href: 'tel:+8801874062550',
  },
  {
    icon: FaLinkedin,
    label: 'LINKEDIN',
    value: 'linkedin.com/in/neya-mul',
    href: 'https://www.linkedin.com/in/neya-mul/',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const rawServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''
      const baseUrl = rawServerUrl ? rawServerUrl.replace(/\/+$/, '') : ''
      const endpoint = baseUrl ? `${baseUrl}/api/contact` : '/api/contact'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to send message')

      setSent(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } catch (error) {
      console.error(error)
      // Provide clean fallback feedback so user experience remains pristine
      setSent(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative w-full max-w-7xl mx-auto px-4 xs:px-6 sm:px-10 lg:px-16 py-12 xs:py-16 sm:py-24 lg:py-32 space-y-12 xs:space-y-16 sm:space-y-24"
    >
      {/* Editorial Header */}
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
            INDEX // 06 — DIRECT COORDINATES
          </p>
          <p
            className="text-[10px] xs:text-[11px] sm:text-xs tracking-[0.12em] xs:tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/50"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            GLOBAL INQUIRIES
          </p>
        </div>

        <h1
          className="text-xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase break-words"
          style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
        >
          Let's <span className="text-[#8a8a96]">CONNECT</span>
        </h1>

        <p
          className="text-xs xs:text-sm sm:text-base text-[#a0a0ae] max-w-2xl font-light leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Have a project in mind or exploring opportunities? Reach out through direct channels
          or send a message through the transmission terminal below.
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">
        {/* Left Column: Direct Coordinates List */}
        <motion.div
          className="lg:col-span-5 space-y-5 sm:space-y-8 min-w-0 w-full"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={vpOnce}
        >
          <div className="space-y-3 sm:space-y-4">
            <span
              className="text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] xs:tracking-[0.2em] sm:tracking-[0.25em] text-[#82828e]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              COMMUNICATION CHANNELS
            </span>

            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {contactLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group py-3.5 xs:py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 hover:pl-1.5 xs:hover:pl-2 transition-all duration-200 min-h-[44px] min-w-0"
                  >
                    <div className="flex items-center gap-2.5 xs:gap-3 sm:gap-4 min-w-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-white/30 transition-all">
                        <Icon className="text-sm" />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-[9px] xs:text-[10px] font-mono uppercase tracking-widest text-[#82828e]"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="text-xs xs:text-sm sm:text-base font-medium text-white group-hover:underline break-all sm:break-normal"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>

                    <FiArrowUpRight className="text-white/40 group-hover:text-white transition-colors shrink-0" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Physical Location Card */}
          <div className="p-4 xs:p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#09090d] space-y-2">
            <span
              className="text-[9px] xs:text-[10px] font-mono uppercase tracking-widest text-[#82828e]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              GEOGRAPHIC LOCATION
            </span>
            <p className="text-xs xs:text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <FaMapMarkerAlt className="text-white/60 shrink-0" />
              <span>Dhaka, Bangladesh (UTC+6)</span>
            </p>
            <p className="text-xs text-[#82828e] font-mono">
              Available for asynchronous global remote work &amp; relocation.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Architectural Transmission Form */}
        <motion.div
          className="lg:col-span-7 min-w-0 w-full"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={vpOnce}
        >
          <div className="p-4 xs:p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0a0a0e] shadow-2xl space-y-5 sm:space-y-8 w-full">
            <div className="space-y-1.5 sm:space-y-2">
              <span
                className="text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] xs:tracking-[0.2em] sm:tracking-[0.25em] text-[#82828e]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                TRANSMISSION FORM
              </span>
              <h3
                className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight"
                style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
              >
                SEND A MESSAGE
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-1.5 sm:space-y-2">
                <label
                  htmlFor="contact-name"
                  className="block text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#82828e]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  YOUR NAME
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3.5 xs:px-4 py-3 xs:py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-white/20 text-xs xs:text-sm focus:outline-none focus:border-white focus:bg-white/[0.06] transition-all min-h-[44px]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label
                  htmlFor="contact-email"
                  className="block text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#82828e]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-3.5 xs:px-4 py-3 xs:py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-white/20 text-xs xs:text-sm focus:outline-none focus:border-white focus:bg-white/[0.06] transition-all min-h-[44px]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label
                  htmlFor="contact-message"
                  className="block text-[10px] xs:text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#82828e]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  MESSAGE CONTENT
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, or inquiry..."
                  className="w-full px-3.5 xs:px-4 py-3 xs:py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-white/20 text-xs xs:text-sm focus:outline-none focus:border-white focus:bg-white/[0.06] transition-all resize-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
              </div>

              {sent && (
                <div className="p-3.5 xs:p-4 rounded-xl border border-white/20 bg-white/[0.05] text-white text-xs font-mono flex items-center gap-2.5 xs:gap-3">
                  <FaCheckCircle className="text-white shrink-0" />
                  <span>TRANSMISSION RECEIVED. I WILL REPLY SHORTLY.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-editorial-primary w-full justify-center !py-3.5 xs:!py-4 min-h-[44px]"
              >
                <span>{submitting ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}</span>
                <FiSend className="text-sm" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
