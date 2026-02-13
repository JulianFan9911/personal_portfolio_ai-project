"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, MessageCircle } from "lucide-react"
import { NavItem, NavigationProps } from "@/types"

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Chat", href: "/chat" },
]

export default function Navigation({ items = DEFAULT_NAV_ITEMS }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 glass-nav rounded-2xl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="font-heading font-bold text-lg text-zinc-900 dark:text-zinc-100 hover:text-accent transition-colors"
          >
            JD
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {items.map((item) => {
              const active = isActive(item.href)
              const isChat = item.href === "/chat"

              if (isChat) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-dark transition-colors cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    {item.label}
                  </Link>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-4 py-2 rounded-xl font-medium text-sm transition-colors cursor-pointer
                    ${active
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }
                  `}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-zinc-200/50 dark:border-zinc-700/50 mt-2 pt-4">
            <div className="flex flex-col space-y-1">
              {items.map((item) => {
                const active = isActive(item.href)
                const isChat = item.href === "/chat"

                if (isChat) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent text-white font-medium text-sm cursor-pointer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <MessageCircle size={16} />
                      {item.label}
                    </Link>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      px-4 py-3 rounded-xl font-medium text-sm transition-colors cursor-pointer
                      ${active
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
