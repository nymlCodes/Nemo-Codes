import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import HomeClient from '../components/HomeClient'

export const metadata: Metadata = {
  title: 'Neyamul Islam — MERN Stack Developer & Software Architect',
  description:
    'Creative portfolio of Neyamul Islam — MERN Stack Developer from Bangladesh. Building high-performance, sculptural web applications with React, Next.js, Node.js, and MongoDB.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Neyamul Islam — MERN Stack Developer',
    description: 'Creative portfolio of Neyamul Islam — MERN Stack Developer from Bangladesh.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Curated agency-grade typography stack */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050507] text-[#f5f5f7] antialiased selection:bg-white selection:text-black">
        <HomeClient>{children}</HomeClient>
      </body>
    </html>
  )
}
