"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface SpeechRecognitionOptions {
  continuous?: boolean
  interimResults?: boolean
  lang?: string
}

interface UseSpeechRecognitionReturn {
  transcript: string
  isListening: boolean
  isSupported: boolean
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
  error: string | null
}

export function useSpeechRecognition(options: SpeechRecognitionOptions = {}): UseSpeechRecognitionReturn {
  const { continuous = false, interimResults = false, lang = "en-US" } = options

  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<any>(null)
  const finalTranscriptRef = useRef("")

  // Check if speech recognition is supported
  const isSupported =
    typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)

  useEffect(() => {
    if (!isSupported) return

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    recognitionRef.current = new SpeechRecognition()
    const recognition = recognitionRef.current

    recognition.continuous = continuous
    recognition.interimResults = interimResults
    recognition.lang = lang
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
    }

    recognition.onresult = (event: any) => {
      let interimTranscript = ""
      let finalTranscript = finalTranscriptRef.current

      // Process all results from the last processed index
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript

        if (event.results[i].isFinal) {
          // Add final results to our final transcript
          finalTranscript += transcriptPart + " "
        } else {
          // Collect interim results
          interimTranscript += transcriptPart
        }
      }

      // Update the final transcript reference
      finalTranscriptRef.current = finalTranscript

      // Set the complete transcript (final + interim)
      const completeTranscript = (finalTranscript + interimTranscript).trim()
      setTranscript(completeTranscript)
    }

    recognition.onerror = (event: any) => {
      setError(getErrorMessage(event.error))
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [continuous, interimResults, lang, isSupported])

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError("Speech recognition is not supported in this browser")
      return
    }

    if (recognitionRef.current && !isListening) {
      setError(null)
      try {
        recognitionRef.current.start()
      } catch (err) {
        setError("Failed to start speech recognition")
      }
    }
  }, [isSupported, isListening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }, [isListening])

  const resetTranscript = useCallback(() => {
    setTranscript("")
    finalTranscriptRef.current = ""
    setError(null)
  }, [])

  return {
    transcript: transcript.trim(),
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    error,
  }
}

function getErrorMessage(error: string): string {
  switch (error) {
    case "no-speech":
      return "No speech detected. Please try speaking again."
    case "audio-capture":
      return "Audio capture failed. Please check your microphone."
    case "not-allowed":
      return "Microphone access denied. Please allow microphone access."
    case "network":
      return "Network error occurred. Please check your connection."
    case "aborted":
      return "Speech recognition was aborted."
    case "bad-grammar":
      return "Grammar error in speech recognition."
    case "language-not-supported":
      return "Language not supported for speech recognition."
    default:
      return `Speech recognition error: ${error}`
  }
}
