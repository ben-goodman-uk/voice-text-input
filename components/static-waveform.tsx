"use client"

import { cn } from "@/lib/utils"

interface StaticWaveformProps {
  className?: string
  barCount?: number
  barWidth?: number
  barGap?: number
  color?: string
  pattern?: "active" | "moderate" | "low" | "idle"
  style?: "compact" | "full-width"
}

export function StaticWaveform({
  className,
  barCount = 32,
  barWidth = 3,
  barGap = 2,
  color = "#3b82f6",
  pattern = "active",
  style = "full-width",
}: StaticWaveformProps) {
  // Predefined patterns for different states
  const getPatternData = () => {
    const basePattern = Array.from({ length: barCount }, (_, i) => {
      const position = i / (barCount - 1)
      const wave1 = Math.sin(position * Math.PI * 4) * 0.5 + 0.5
      const wave2 = Math.sin(position * Math.PI * 8) * 0.3 + 0.3
      const wave3 = Math.sin(position * Math.PI * 2) * 0.2 + 0.2
      return (wave1 + wave2 + wave3) / 3
    })

    switch (pattern) {
      case "active":
        return basePattern.map((val) => Math.max(val * 0.9 + 0.1, 0.15))
      case "moderate":
        return basePattern.map((val) => Math.max(val * 0.6 + 0.05, 0.08))
      case "low":
        return basePattern.map((val) => Math.max(val * 0.3 + 0.02, 0.04))
      case "idle":
        return Array(barCount).fill(0.02)
      default:
        return basePattern
    }
  }

  const patternData = getPatternData()

  return (
    <div className={cn("flex items-end justify-center gap-1", className)}>
      {patternData.map((height, index) => (
        <div
          key={index}
          className="rounded-full transition-all duration-200"
          style={{
            width: `${barWidth}px`,
            height: `${Math.max(height * (style === "compact" ? 24 : 40), 2)}px`,
            backgroundColor: color,
            opacity: pattern === "idle" ? 0.3 : 0.7 + height * 0.3,
          }}
        />
      ))}
    </div>
  )
}
