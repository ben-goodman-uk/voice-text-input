"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface WaveformVisualizerProps {
  audioStream: MediaStream
  isActive: boolean
  className?: string
  barCount?: number
  barWidth?: number
  barGap?: number
  color?: string
}

export function WaveformVisualizer({
  audioStream,
  isActive,
  className,
  barCount = 32,
  barWidth = 3,
  barGap = 2,
  color = "#3b82f6",
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const audioContextRef = useRef<AudioContext>()
  const analyserRef = useRef<AnalyserNode>()
  const sourceRef = useRef<MediaStreamAudioSourceNode>()
  const [audioData, setAudioData] = useState<number[]>(new Array(barCount).fill(0))

  useEffect(() => {
    if (!audioStream || !isActive) {
      // Clean up and stop animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close()
      }
      setAudioData(new Array(barCount).fill(0))
      return
    }

    const setupAudioContext = async () => {
      try {
        audioContextRef.current = new AudioContext()
        analyserRef.current = audioContextRef.current.createAnalyser()
        sourceRef.current = audioContextRef.current.createMediaStreamSource(audioStream)

        analyserRef.current.fftSize = 512
        analyserRef.current.smoothingTimeConstant = 0.85
        sourceRef.current.connect(analyserRef.current)

        const bufferLength = analyserRef.current.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const updateWaveform = () => {
          if (!analyserRef.current || !isActive) return

          analyserRef.current.getByteFrequencyData(dataArray)

          // Process audio data for visualization with enhanced smoothing
          const newAudioData = []
          const sliceWidth = bufferLength / barCount

          for (let i = 0; i < barCount; i++) {
            const start = Math.floor(i * sliceWidth)
            const end = Math.floor((i + 1) * sliceWidth)
            let sum = 0

            for (let j = start; j < end; j++) {
              sum += dataArray[j]
            }

            const average = sum / (end - start)
            // Enhanced normalization with better baseline and scaling
            const normalized = Math.min(average / 255, 1)
            // Add some baseline activity and apply exponential scaling for better visual effect
            const enhanced = Math.pow(normalized, 0.7) * 0.9 + 0.05
            const smoothed = Math.max(enhanced, 0.02)
            newAudioData.push(smoothed)
          }

          setAudioData(newAudioData)

          if (isActive) {
            animationRef.current = requestAnimationFrame(updateWaveform)
          }
        }

        updateWaveform()
      } catch (error) {
        console.error("Error setting up audio context:", error)
      }
    }

    setupAudioContext()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close()
      }
    }
  }, [audioStream, isActive, barCount])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size with high DPI support
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas with subtle background
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw enhanced waveform bars
    const totalWidth = barCount * barWidth + (barCount - 1) * barGap
    const startX = (rect.width - totalWidth) / 2
    const centerY = rect.height / 2
    const maxBarHeight = rect.height * 0.8

    audioData.forEach((value, index) => {
      const x = startX + index * (barWidth + barGap)
      const barHeight = Math.max(value * maxBarHeight, 1)
      const y = centerY - barHeight / 2

      // Create enhanced gradient for each bar
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight)

      // Parse color and create variations
      const baseColor = color
      gradient.addColorStop(0, baseColor + "40") // Very transparent top
      gradient.addColorStop(0.3, baseColor + "80") // Semi-transparent
      gradient.addColorStop(0.7, baseColor) // Full opacity
      gradient.addColorStop(1, baseColor + "60") // Semi-transparent bottom

      // Draw main bar with rounded corners
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth, barHeight, barWidth / 2)
      ctx.fill()

      // Add glow effect for active bars
      if (value > 0.4) {
        ctx.shadowColor = baseColor
        ctx.shadowBlur = 6
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth, barHeight, barWidth / 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Add subtle reflection effect
      if (value > 0.2) {
        const reflectionGradient = ctx.createLinearGradient(0, centerY + barHeight / 2, 0, centerY + barHeight)
        reflectionGradient.addColorStop(0, baseColor + "20")
        reflectionGradient.addColorStop(1, baseColor + "00")

        ctx.fillStyle = reflectionGradient
        ctx.beginPath()
        ctx.roundRect(x, centerY + barHeight / 2, barWidth, barHeight * 0.3, barWidth / 2)
        ctx.fill()
      }
    })
  }, [audioData, barCount, barWidth, barGap, color])

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full", className)}
      style={{
        background: "transparent",
        pointerEvents: "none",
      }}
    />
  )
}
