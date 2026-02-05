"use client"

import Link from "next/link"
import { achievementStats } from "@/data/achievement-stats"

export default function StatsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementStats.map((stat, index) => {
            const IconComponent = stat.icon
            const isClickable = stat.href && stat.href.trim() !== ""

            const cardContent = (
              <>
                {/* Icon */}
                <div className="flex justify-center mb-3">
                  <IconComponent
                    size={24}
                    className={`${stat.color} group-hover:scale-110 transition-all duration-300`}
                  />
                </div>

                {/* Number */}
                <div
                  className={`text-3xl sm:text-4xl font-bold mb-2 ${stat.color} drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300`}
                >
                  {stat.number}
                </div>

                {/* Description */}
                <div className="text-text-secondary text-sm sm:text-base group-hover:text-text-primary transition-colors duration-300">
                  {stat.description}
                </div>
              </>
            )

            if (isClickable) {
              return (
                <Link
                  key={index}
                  href={stat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block bg-regular-button/80 backdrop-blur-sm ${stat.borderColor} border-2 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg ${stat.glowColor} hover:bg-regular-button/90 group cursor-pointer`}
                >
                  {cardContent}
                </Link>
              )
            } else {
              return (
                <div
                  key={index}
                  className={`bg-regular-button/80 backdrop-blur-sm ${stat.borderColor} border-2 rounded-xl p-6 text-center transition-all duration-300 ${stat.glowColor} group`}
                >
                  {cardContent}
                </div>
              )
            }
          })}
        </div>
      </div>
    </section>
  )
}
