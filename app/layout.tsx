import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Outfit, Work_Sans } from "next/font/google"
import { generateSEOMetadata } from "@/lib/seo/generateMetadata"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" })

// 根布局的默认元数据（会被页面级元数据覆盖）
export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "John Doe - Solution Architect & Builder",
    description: "Personal portfolio of John Doe, a Data/AI Architect specializing in open source solutions and enterprise architecture.",
    keywords: ["Data Architect", "AI Architect", "Open Source", "Enterprise"],
  }),
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${workSans.variable}`}>
      <body className={`${workSans.className} antialiased`}>{children}</body>
    </html>
  )
}
