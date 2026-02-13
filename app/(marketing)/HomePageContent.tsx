"use client"

import Hero from "./_components/Hero"
import StatsSection from "./_components/StatsSection"
import ContactSection from "./_components/ContactSection"

export default function HomePageContent() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-body">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 pointer-events-none" />

      {/* Main Content */}
      <div className="relative">
        {/* Hero Section */}
        <Hero />

        {/* Achievement Stats - Bento Grid */}
        <StatsSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer Spacing */}
        <div className="h-16" />
      </div>
    </div>
  )
}
