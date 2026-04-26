"use client"

import { skills } from "@/data/skills"

export default function SkillsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 bg-gradient-to-r from-primary via-secondary to-highlight bg-clip-text text-transparent text-center">
          Skills & Expertise
        </h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon

            return (
              <div key={index} className="group">
                {/* Skill Header with Icon and Name */}
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent size={24} className="text-primary group-hover:text-highlight transition-colors duration-300" />
                  <div className="flex justify-between flex-1">
                    <span className="text-lg font-semibold text-text-primary">
                      {skill.name}
                    </span>
                    <span className="text-sm text-text-secondary group-hover:text-highlight transition-colors duration-300">
                      {skill.percentage}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                  {/* Animated Progress Bar with Gradient */}
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-highlight shadow-lg shadow-primary/50 group-hover:shadow-xl group-hover:shadow-highlight/50 transition-all duration-300"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
