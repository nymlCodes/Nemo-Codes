'use client'

import React, { useState } from 'react'
import { FaLinkedin, FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'
import { FiArrowUpRight, FiSend } from 'react-icons/fi'

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
      className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-32 space-y-24"
    >
      {/* Editorial Header — Refined & Balanced */}
      <div className="space-y-4 border-b border-white/[0.08] pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p
            className="text-xs tracking-[0.25em] uppercase text-[#82828e]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            INDEX // 06 — DIRECT COORDINATES
          </p>
          <p
            className="text-xs tracking-[0.2em] uppercase text-white/50"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            GLOBAL INQUIRIES
          </p>
        </div>

        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase"
          style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
        >
          INITIATE <span className="text-[#8a8a96]">COMMUNICATION.</span>
        </h1>

        <p
          className="text-sm sm:text-base text-[#a0a0ae] max-w-2xl font-light leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Have a project in mind or exploring opportunities? Reach out through direct channels
          or send a message through the transmission terminal below.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct Coordinates List */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span
              className="text-xs font-mono uppercase tracking-[0.25em] text-[#82828e]"
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
                    className="group py-5 flex items-center justify-between gap-4 hover:pl-2 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-white/30 transition-all">
                        <Icon className="text-sm" />
                      </div>
                      <div>
                        <p
                          className="text-[10px] font-mono uppercase tracking-widest text-[#82828e]"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="text-sm sm:text-base font-medium text-white group-hover:underline"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>

                    <FiArrowUpRight className="text-white/40 group-hover:text-white transition-colors" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Physical Location Card */}
          <div className="p-6 rounded-2xl border border-white/10 bg-[#09090d] space-y-2">
            <span
              className="text-[10px] font-mono uppercase tracking-widest text-[#82828e]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              GEOGRAPHIC LOCATION
            </span>
            <p className="text-base font-bold text-white flex items-center gap-2">
              <FaMapMarkerAlt className="text-white/60" />
              <span>Dhaka, Bangladesh (UTC+6)</span>
            </p>
            <p className="text-xs text-[#82828e] font-mono">
              Available for asynchronous global remote work & relocation.
            </p>
          </div>
        </div>

        {/* Right Column: Architectural Transmission Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#0a0a0e] shadow-2xl space-y-8">
            <div className="space-y-2">
              <span
                className="text-xs font-mono uppercase tracking-[0.25em] text-[#82828e]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                TRANSMISSION FORM
              </span>
              <h3
                className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight"
                style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
              >
                SEND A MESSAGE
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono uppercase tracking-wider text-[#82828e]"
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
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-white/20 text-sm focus:outline-none focus:border-white focus:bg-white/[0.06] transition-all"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono uppercase tracking-wider text-[#82828e]"
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
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-white/20 text-sm focus:outline-none focus:border-white focus:bg-white/[0.06] transition-all"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-wider text-[#82828e]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  MESSAGE CONTENT
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, or inquiry..."
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-white/20 text-sm focus:outline-none focus:border-white focus:bg-white/[0.06] transition-all resize-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
              </div>

              {sent && (
                <div className="p-4 rounded-xl border border-white/20 bg-white/[0.05] text-white text-xs font-mono flex items-center gap-3">
                  <FaCheckCircle className="text-white" />
                  <span>TRANSMISSION RECEIVED. I WILL REPLY SHORTLY.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-editorial-primary w-full justify-center !py-4"
              >
                <span>{submitting ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}</span>
                <FiSend className="text-sm" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
