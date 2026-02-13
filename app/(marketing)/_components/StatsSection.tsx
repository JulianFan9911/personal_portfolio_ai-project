"use client"

import Link from "next/link"
import { achievementStats } from "@/data/achievement-stats"

export default function StatsSection() {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Highlights
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievementStats.map((stat, index) => {
            const IconComponent = stat.icon
            const isClickable = stat.href && stat.href.trim() !== ""

            const cardContent = (
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <IconComponent
                    size={20}
                    className="text-accent"
                  />
                </div>

                {/* Content */}
                <div>
                  <div className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    {stat.description}
                  </div>
                </div>
              </div>
            )

            if (isClickable) {
              return (
                <Link
                  key={index}
                  href={stat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-card group hover:border-accent/30"
                >
                  {cardContent}
                </Link>
              )
            }

            return (
              <div
                key={index}
                className="bento-card cursor-default"
              >
                {cardContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
