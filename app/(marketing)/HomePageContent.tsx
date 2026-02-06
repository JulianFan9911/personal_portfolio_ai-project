"use client"

import { Spotlight } from "@/components/ui/spotlight"
import Hero from "./_components/Hero"
import StatsSection from "./_components/StatsSection"
import ContactSection from "./_components/ContactSection"

export default function HomePageContent() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-inter relative overflow-hidden pt-16">
      {/* Spotlight Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="#00bfff" />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="#87ceeb" />
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Achievement Stats Grid */}
      <StatsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer Spacing */}
      <div className="h-16"></div>
    </div>
  )
}
