"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Mic, Square, Pause, Play, AlertCircle, MicOff, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { WaveformVisualizer } from "@/components/waveform-visualizer"

interface ConversationMessage {
  message: string
  isUser: boolean
}

interface ConversationInterfaceProps {
  conversationHistory: ConversationMessage[]
  conversationState: "inactive" | "listening" | "processing" | "responding" | "paused"
  currentMessage: string
  audioStream: MediaStream | null
  isListening: boolean
  onStartConversation: () => void
  onStopConversation: () => void
  onPauseConversation: () => void
  onResumeConversation: () => void
  error: string | null
  isSupported: boolean
  className?: string
}

export function ConversationInterface({
  conversationHistory,
  conversationState,
  currentMessage,
  audioStream,
  isListening,
  onStartConversation,
  onStopConversation,
  onPauseConversation,
  onResumeConversation,
  error,
  isSupported,
  className,
}: ConversationInterfaceProps) {
  const getStateColor = () => {
    switch (conversationState) {
      case "listening":
        return "from-blue-500 to-indigo-600"
      case "processing":
        return "from-amber-500 to-orange-600"
      case "responding":
        return "from-purple-500 to-pink-600"
      case "paused":
        return "from-orange-500 to-red-600"
      default:
        return "from-slate-500 to-slate-600"
    }
  }

  const getStateText = () => {
    switch (conversationState) {
      case "listening":
        return "Listening..."
      case "processing":
        return "Processing..."
      case "responding":
        return "AI is responding..."
      case "paused":
        return "Conversation paused"
      default:
        return "Ready to start conversation"
    }
  }

  const getStateIcon = () => {
    switch (conversationState) {
      case "listening":
        return <Mic className="h-6 w-6" />
      case "processing":
        return <Loader2 className="h-6 w-6 animate-spin" />
      case "responding":
        return <MessageCircle className="h-6 w-6" />
      case "paused":
        return <Pause className="h-6 w-6" />
      default:
        return <MessageCircle className="h-6 w-6" />
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Conversation Display */}
      <div className="relative">
        {/* Central Orb */}
        <div className="flex justify-center mb-6">
          <div
            className={cn(
              "relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500",
              "bg-gradient-to-br shadow-2xl",
              getStateColor(),
              conversationState === "listening" && "animate-pulse scale-110",
              conversationState === "processing" && "animate-spin",
              conversationState === "responding" && "animate-bounce",
            )}
          >
            {/* Waveform Overlay */}
            {conversationState === "listening" && audioStream && (
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <WaveformVisualizer
                  audioStream={audioStream}
                  isActive={isListening}
                  className="absolute inset-0"
                  color="#ffffff"
                  barCount={16}
                />
              </div>
            )}

            {/* Icon */}
            <div className="relative z-10 text-white">{getStateIcon()}</div>

            {/* Ripple Effect */}
            {conversationState === "listening" && (
              <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
            )}
          </div>
        </div>

        {/* State Text */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-1">{getStateText()}</h3>
          {currentMessage && <p className="text-sm text-slate-600 italic">"{currentMessage}"</p>}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3 mb-6">
          {conversationState === "inactive" ? (
            <Button
              onClick={onStartConversation}
              disabled={!isSupported}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Conversation
            </Button>
          ) : (
            <>
              {conversationState === "paused" ? (
                <Button
                  onClick={onResumeConversation}
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={onPauseConversation}
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              )}
              <Button
                onClick={onStopConversation}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <Square className="h-4 w-4 mr-2" />
                End
              </Button>
            </>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center justify-center gap-2 text-red-600 text-sm mb-4">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Browser Support Warning */}
        {!isSupported && (
          <div className="flex items-center justify-center gap-2 text-amber-600 text-sm mb-4">
            <MicOff className="h-4 w-4" />
            <span>Speech recognition is not supported in this browser</span>
          </div>
        )}
      </div>

      {/* Conversation History */}
      {conversationHistory.length > 0 && (
        <div className="border rounded-lg bg-white/50 backdrop-blur-sm">
          <div className="p-3 border-b bg-slate-50/80 rounded-t-lg">
            <h4 className="font-medium text-slate-900 flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Conversation History
            </h4>
          </div>
          <ScrollArea className="h-64 p-3">
            <div className="space-y-3">
              {conversationHistory.map((msg, index) => (
                <div key={index} className={cn("flex", msg.isUser ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] px-3 py-2 rounded-lg text-sm",
                      msg.isUser ? "bg-blue-600 text-white rounded-br-sm" : "bg-slate-200 text-slate-900 rounded-bl-sm",
                    )}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-xs text-slate-500 space-y-1">
        <p>
          <strong>Natural Conversation Mode:</strong> Speak naturally and the AI will respond automatically
        </p>
        <p>No need to press buttons - just talk and listen for a seamless conversation experience</p>
      </div>

      {/* Accessibility */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {conversationState === "listening" &&
          "Conversation mode active. Speak naturally. The AI will respond automatically."}
        {conversationState === "processing" && "Processing your message. Please wait for the AI response."}
        {conversationState === "responding" && "AI is responding. Listen for the response."}
        {conversationState === "paused" && "Conversation is paused. Click resume to continue."}
        {error && `Conversation error: ${error}`}
      </div>
    </div>
  )
}
