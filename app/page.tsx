"use client"

import { VoiceTextInput } from "@/components/voice-text-input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Eye } from "lucide-react"

export default function Home() {
  const handleSubmit = (message: string, inputType: "voice" | "text") => {
    console.log("Message submitted:", message, "via", inputType)
    // Handle the submitted message here
  }

  const handleConversationMessage = (message: string, isUser: boolean) => {
    console.log(`${isUser ? "User" : "AI"} said:`, message)
    // Handle conversation messages here
    // This would typically integrate with an AI service
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-4xl font-bold text-slate-900">Modern Voice & Text Input</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Experience seamless interaction with integrated natural conversation mode, real speech recognition, waveform
            visualization, and accessible design patterns.
          </p>

          {/* Showcase Link */}
          <div className="pt-4">
            <Link href="/showcase">
              <Button variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                View All Component Variants & States
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-1">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                Enhanced Chat Interface
              </CardTitle>
              <CardDescription>
                Chat with integrated natural conversation mode toggle - switch seamlessly between manual and continuous
                voice interaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VoiceTextInput
                placeholder="Type a message or tap the mic to speak..."
                onSubmit={handleSubmit}
                onConversationMessage={handleConversationMessage}
                variant="chat"
                showSendButton
                enableNaturalConversation
              />
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-slate-500 space-y-2">
          <p>
            <strong>Key Features:</strong> Integrated natural conversation toggle • Real speech recognition • Live
            waveform visualization • Seamless mode switching • Accessibility support
          </p>
          <p>
            Try the natural conversation toggle in the chat interface for a hands-free, continuous dialogue experience.
          </p>
        </div>
      </div>
    </div>
  )
}
