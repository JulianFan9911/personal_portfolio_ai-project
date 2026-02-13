"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, ArrowRight, MessageCircle } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

            {/* Profile Card - Spans 1 column */}
            <div className="bento-card flex flex-col items-center text-center lg:row-span-2">
              {/* Profile Image */}
              <div className="mb-6">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 shadow-lg overflow-hidden">
                  <Image
                    src="/images/profile.png"
                    alt="John Doe Profile Photo"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name and Title */}
              <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">
                John Doe
              </h1>
              <p className="text-accent font-medium mb-4">
                AI Engineer
              </p>

              {/* Social Icons */}
              <div className="flex justify-center space-x-4 mb-6">
                <a
                  href="https://example.com"
                  className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://example.com"
                  className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://example.com"
                  className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  aria-label="Blog"
                >
                  <BookOpen size={20} />
                </a>
              </div>

              {/* Quick Stats */}
              <div className="w-full pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="font-heading text-xl font-bold text-zinc-900 dark:text-zinc-100">10+</div>
                    <div className="text-xs text-zinc-500">Python Libraries</div>
                  </div>
                  <div>
                    <div className="font-heading text-xl font-bold text-zinc-900 dark:text-zinc-100">5</div>
                    <div className="text-xs text-zinc-500">AI Apps</div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Me Card - Spans 2 columns */}
            <div className="bento-card lg:col-span-2">
              <h2 className="font-heading text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
                About Me
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </p>
            </div>

            {/* CTA Card - Chat with AI */}
            <div className="lg:col-span-2">
              <Link
                href="/chat"
                className="bento-card group flex items-center justify-between p-6 bg-gradient-to-r from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 border-accent/20 hover:border-accent/40 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                      Chat with Virtual John Doe
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Explore my experience, projects, and discover what makes me different
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
