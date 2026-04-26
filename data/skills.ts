import { Code2, Zap, Brain, Server } from "lucide-react"

export interface Skill {
  name: string
  percentage: number
  icon: any
}

export const skills: Skill[] = [
  {
    name: "React & Next.js",
    percentage: 90,
    icon: Code2,
  },
  {
    name: "Python & AI",
    percentage: 85,
    icon: Brain,
  },
  {
    name: "TypeScript",
    percentage: 88,
    icon: Zap,
  },
  {
    name: "Backend & APIs",
    percentage: 82,
    icon: Server,
  },
]
