"use client";

import { cn } from "@/lib/utils";

interface StaticWaveformProps {
  className?: string;
  barCount?: number;
  barWidth?: number;
  barGap?: number;
  color?: string;
  pattern?: "active" | "moderate" | "low" | "idle";
  style?: "compact" | "full-width";
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
  // Predefined patterns for different states - matches WaveformVisualizer data processing
  const getPatternData = () => {
    const basePattern = Array.from({ length: barCount }, (_, i) => {
      const position = i / (barCount - 1);
      const wave1 = Math.sin(position * Math.PI * 4) * 0.5 + 0.5;
      const wave2 = Math.sin(position * Math.PI * 8) * 0.3 + 0.3;
      const wave3 = Math.sin(position * Math.PI * 2) * 0.2 + 0.2;
      // Round to 6 decimal places to ensure server/client consistency
      return Math.round(((wave1 + wave2 + wave3) / 3) * 1000000) / 1000000;
    });

    switch (pattern) {
      case "active":
        // Enhanced normalization matching WaveformVisualizer
        return basePattern.map((val) => {
          const enhanced = Math.pow(val, 0.7) * 0.9 + 0.05;
          // Round to 6 decimal places to ensure server/client consistency
          return Math.round(Math.max(enhanced, 0.02) * 1000000) / 1000000;
        });
      case "moderate":
        return basePattern.map(
          (val) =>
            Math.round(Math.max(val * 0.6 + 0.05, 0.08) * 1000000) / 1000000
        );
      case "low":
        return basePattern.map(
          (val) =>
            Math.round(Math.max(val * 0.3 + 0.02, 0.04) * 1000000) / 1000000
        );
      case "idle":
        return Array(barCount).fill(0.02);
      default:
        return basePattern;
    }
  };

  const patternData = getPatternData();

  // Calculate total width needed for all bars
  const totalWidth = barCount * barWidth + (barCount - 1) * barGap;

  // For compact mode, use a tighter viewBox that fits the content
  const viewBoxWidth = style === "compact" ? Math.max(totalWidth + 4, 40) : 100;
  const viewBoxHeight = style === "compact" ? 30 : 100;

  return (
    <div className={cn("w-full h-full relative", className)}>
      <svg
        className="w-full h-full"
        style={{ background: "transparent" }}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradient definition matching WaveformVisualizer */}
          <linearGradient
            id={`waveform-gradient-${pattern}-${style}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="30%" stopColor={color} stopOpacity="0.5" />
            <stop offset="70%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.375" />
          </linearGradient>

          {/* Glow filter for high bars */}
          <filter id={`glow-${pattern}-${style}`}>
            <feGaussianBlur
              stdDeviation={style === "compact" ? "0.5" : "0.8"}
              result="coloredBlur"
            />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Render bars matching WaveformVisualizer logic */}
        {patternData.map((value, index) => {
          // Calculate positioning to match WaveformVisualizer centering
          const startX = (viewBoxWidth - totalWidth) / 2;
          const x = startX + index * (barWidth + barGap);

          // Calculate bar height matching WaveformVisualizer (80% of container height)
          const maxBarHeight =
            style === "compact" ? viewBoxHeight * 0.7 : viewBoxHeight * 0.8;
          const barHeight = Math.max(
            value * maxBarHeight,
            style === "compact" ? 1.5 : 1
          );
          const y = viewBoxHeight / 2 - barHeight / 2; // Center vertically

          // Round all values to prevent hydration mismatches
          const roundedX = Math.round(x * 100) / 100;
          const roundedY = Math.round(y * 100) / 100;
          const roundedBarHeight = Math.round(barHeight * 100) / 100;

          return (
            <g key={index}>
              {/* Main bar */}
              <rect
                x={roundedX}
                y={roundedY}
                width={barWidth}
                height={roundedBarHeight}
                rx={barWidth / 2}
                fill={`url(#waveform-gradient-${pattern}-${style})`}
                filter={
                  value > 0.4 ? `url(#glow-${pattern}-${style})` : undefined
                }
              />

              {/* Reflection effect for larger bars in full-width mode */}
              {value > 0.2 && style === "full-width" && (
                <rect
                  x={roundedX}
                  y={
                    Math.round((viewBoxHeight / 2 + barHeight / 2) * 100) / 100
                  }
                  width={barWidth}
                  height={Math.round(barHeight * 0.3 * 100) / 100}
                  rx={barWidth / 2}
                  fill={color}
                  opacity="0.15"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
