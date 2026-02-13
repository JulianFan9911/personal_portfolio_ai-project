"use client"

import ScreenName from "./_components/ScreenName"
import ScreenTitle from "./_components/ScreenTitle"
import ScreenStats from "./_components/ScreenStats"
import ScreenCTA from "./_components/ScreenCTA"

export default function HomePageContent() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white font-body">
      {/* Screen 1: Name Reveal */}
      <ScreenName />

      {/* Screen 2: Title & Description */}
      <ScreenTitle />

      {/* Screen 3: Stats Horizontal Scroll */}
      <ScreenStats />

      {/* Screen 4: Full-Screen Chat CTA */}
      <ScreenCTA />

      {/* Minimal Footer */}
      <footer className="py-6 px-4 border-t-4 border-black dark:border-white">
        <p className="text-center font-display text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} JOHN DOE
        </p>
      </footer>
    </div>
  )
}
