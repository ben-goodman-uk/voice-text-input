"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, User, Bot, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ConversationMessage {
  message: string
  isUser: boolean
  timestamp: Date
}

interface ConversationHistoryProps {
  messages: ConversationMessage[]
  conversationState: "inactive" | "listening" | "processing" | "responding" | "paused"
  className?: string
}

export function ConversationHistory({ messages, conversationState, className }: ConversationHistoryProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={cn("border rounded-lg bg-white/50 backdrop-blur-sm", className)}>
      <div className="p-3 border-b bg-gradient-to-r from-indigo-50/80 to-purple-50/80 rounded-t-lg">
        <h4 className="font-medium text-slate-900 flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-indigo-600" />
          Natural Conversation
          <div
            className={cn(
              "ml-auto flex items-center gap-1 px-2 py-1 rounded-full text-xs",
              conversationState === "listening" && "bg-blue-100 text-blue-700",
              conversationState === "processing" && "bg-amber-100 text-amber-700",
              conversationState === "responding" && "bg-purple-100 text-purple-700",
              conversationState === "paused" && "bg-orange-100 text-orange-700",
              conversationState === "inactive" && "bg-slate-100 text-slate-600",
            )}
          >
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                conversationState === "listening" && "bg-blue-500 animate-pulse",
                conversationState === "processing" && "bg-amber-500",
                conversationState === "responding" && "bg-purple-500",
                conversationState === "paused" && "bg-orange-500",
                conversationState === "inactive" && "bg-slate-400",
              )}
            />
            {conversationState === "listening" && "Active"}
            {conversationState === "processing" && "Processing"}
            {conversationState === "responding" && "AI Responding"}
            {conversationState === "paused" && "Paused"}
            {conversationState === "inactive" && "Inactive"}
          </div>
        </h4>
      </div>
      <ScrollArea className="h-48 p-3">
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className={cn("flex gap-3", msg.isUser ? "justify-end" : "justify-start")}>
              {!msg.isUser && (
                <div className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Bot className="h-3 w-3 text-white" />
                </div>
              )}
              <div className={cn("flex flex-col gap-1", msg.isUser ? "items-end" : "items-start")}>
                <div
                  className={cn(
                    "max-w-[80%] px-3 py-2 rounded-lg text-sm",
                    msg.isUser
                      ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-sm"
                      : "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-900 rounded-bl-sm border",
                  )}
                >
                  {msg.message}
                </div>
                <span className="text-xs text-slate-400">{formatTime(msg.timestamp)}</span>
              </div>
              {msg.isUser && (
                <div className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <User className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Show processing indicator */}
          {conversationState === "responding" && (
            <div className="flex gap-3 justify-start">
              <div className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Bot className="h-3 w-3 text-white" />
              </div>
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-900 rounded-lg rounded-bl-sm border px-3 py-2 flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
