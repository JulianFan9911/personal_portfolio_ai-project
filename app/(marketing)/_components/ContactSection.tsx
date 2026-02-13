"use client"

import { Mail } from "lucide-react"
import { FaLinkedin } from "react-icons/fa"

export default function ContactSection() {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bento-card text-center py-10">
          {/* Section Title */}
          <h2 className="font-heading text-xl sm:text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">
            Let's Connect
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-md mx-auto">
            Ready to collaborate or discuss opportunities?
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="mailto:sanhe@johndoe.me"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-dark transition-colors cursor-pointer"
            >
              <Mail size={18} />
              Send me Email
            </a>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <FaLinkedin size={18} />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
