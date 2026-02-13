import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New Minimalist + Portfolio Color Palette
        primary: {
          DEFAULT: "#18181B", // zinc-900
          foreground: "#FAFAFA",
        },
        secondary: {
          DEFAULT: "#3F3F46", // zinc-700
          foreground: "#FAFAFA",
        },
        accent: {
          DEFAULT: "#2563EB", // blue-600 (CTA/AI accent)
          foreground: "#FFFFFF",
          light: "#3B82F6", // blue-500
          dark: "#1D4ED8", // blue-700
        },
        background: {
          DEFAULT: "#FAFAFA", // zinc-50 (light mode)
          dark: "#09090B", // zinc-950 (dark mode)
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#18181B",
        },
        muted: {
          DEFAULT: "#F4F4F5", // zinc-100
          foreground: "#71717A", // zinc-500
          dark: "#27272A", // zinc-800
        },
        border: {
          DEFAULT: "#E4E4E7", // zinc-200
          dark: "#3F3F46", // zinc-700
        },
        // Legacy colors for compatibility
        "text-primary": "#09090B",
        "text-secondary": "#52525B", // zinc-600
        highlight: "#2563EB",
        "cta-button": "#2563EB",
        "regular-button": "#18181B",
        contrast: "#2563EB",
        // shadcn/ui compatibility
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-work-sans)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(0, 0, 0, 0.08)",
        "glass-dark": "0 8px 32px rgba(0, 0, 0, 0.4)",
        "bento": "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
        "bento-hover": "0 10px 40px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
