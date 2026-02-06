"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { BookOpen } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [apiResponse, setApiResponse] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleApiCall = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/hello")
      const data = await response.json()
      setApiResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setApiResponse("Error fetching API response")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} flex flex-col lg:flex-row gap-8 lg:gap-12 items-start`}
        >
          {/* Left Column - Profile */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            {/* Profile Image */}
            <div className="mb-6 flex justify-center">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-2 border-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 overflow-hidden">
                <Image
                  src="/images/profile.png"
                  alt="John Doe Profile Photo"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name and Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-text-primary via-primary to-highlight bg-clip-text text-transparent drop-shadow-2xl text-center">
              John Doe
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary mb-6 font-medium text-center">
              <span className="text-highlight">AI Engineer</span>
            </p>

            {/* Social Icons */}
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href="https://example.com"
                className="w-8 h-8 text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:shadow-primary/50"
                aria-label="GitHub"
              >
                <FaGithub size={32} className="hover:fill-current filter hover:drop-shadow-lg" />
              </a>
              <a
                href="https://example.com"
                className="w-8 h-8 text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:shadow-primary/50"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={32} className="hover:fill-current filter hover:drop-shadow-lg" />
              </a>
              <a
                href="https://example.com"
                className="w-8 h-8 text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:shadow-primary/50"
                aria-label="Blog"
              >
                <BookOpen size={32} className="hover:fill-current filter hover:drop-shadow-lg" />
              </a>
            </div>
          </div>

          {/* Right Column - About Me */}
          <div className="w-full lg:w-2/3 lg:pl-8">
            {/* About Me Heading */}
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-highlight bg-clip-text text-transparent">
              About Me
            </h2>

            {/* Intro */}
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

            {/* CTA */}
            <button
              onClick={handleApiCall}
              disabled={isLoading}
              className="mt-8 p-5 bg-gradient-to-r from-highlight/20 via-primary/20 to-secondary/20 border-2 border-highlight rounded-lg block w-full hover:from-highlight/30 hover:via-primary/30 hover:to-secondary/30 hover:border-highlight hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-highlight/30 hover:shadow-xl hover:shadow-highlight/50 cursor-pointer group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Animated background shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="relative z-10 text-center">
                <p className="text-2xl text-highlight font-bold group-hover:text-primary transition-colors duration-300 drop-shadow-lg mb-2">
                  {isLoading ? "⏳ Loading..." : "✨ Test API Hello Endpoint"}
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300 ml-2">→</span>
                </p>
                <p className="text-base text-text-primary/90 font-medium group-hover:text-text-primary transition-colors duration-300">
                  Click to test the /api/hello endpoint
                </p>
              </div>
            </button>

            {/* API Response Display */}
            {apiResponse && (
              <div className="mt-6 p-4 bg-[#1a1a1a] border border-primary/30 rounded-lg">
                <h3 className="text-lg font-semibold text-primary mb-2">API Response:</h3>
                <pre className="text-text-secondary text-sm overflow-x-auto">
                  {apiResponse}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
