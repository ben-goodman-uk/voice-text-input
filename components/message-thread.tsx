"use client"

import { useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBubble, MessageAttachment } from "@/components/message-bubble"
import { cn } from "@/lib/utils"

interface MessageAttachmentData {
  type: "file" | "image" | "audio" | "video"
  url?: string
  filename: string
  filesize?: string
}

interface Message {
  id: string
  message: string
  isUser: boolean
  isSystem?: boolean
  timestamp: Date
  attachments?: MessageAttachmentData[]
  readReceipt?: string
  deliveryStatus?: "sending" | "sent" | "delivered" | "read" | "failed"
  errorMessage?: string
  reactions?: { emoji: string; count: number }[]
  sender?: {
    name: string
    avatar: string
  }
}

interface MessageThreadProps {
  messages: Message[]
  typingIndicator?: {
    isTyping: boolean
    isUser: boolean
  }
  showAvatars?: boolean
  showNames?: boolean
  className?: string
  maxHeight?: string
}

export function MessageThread({
  messages,
  typingIndicator,
  showAvatars = false,
  showNames = false,
  className,
  maxHeight = "300px",
}: MessageThreadProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages, typingIndicator?.isTyping])

  return (
    <div className={cn("border rounded-lg bg-white/50 backdrop-blur-sm", className)}>
      <ScrollArea ref={scrollAreaRef} className={`max-h-[${maxHeight}] p-4 space-y-4`}>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message.message}
            isUser={message.isUser}
            isSystem={message.isSystem}
            timestamp={message.timestamp}
            attachments={message.attachments?.map((attachment, index) => (
              <MessageAttachment
                key={index}
                type={attachment.type}
                url={attachment.url}
                filename={attachment.filename}
                filesize={attachment.filesize}
              />
            ))}
            readReceipt={message.readReceipt}
            deliveryStatus={message.deliveryStatus}
            errorMessage={message.errorMessage}
            reactions={message.reactions}
            sender={message.sender}
            showAvatar={showAvatars}
            showName={showNames}
          />
        ))}

        {/* Typing Indicator */}
        {typingIndicator?.isTyping && (
          <div className="flex items-start gap-2">
            {showAvatars && (
              <div className="flex-shrink-0 mt-1">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full bg-gradient-to-br flex items-center justify-center",
                    typingIndicator.isUser ? "from-blue-500 to-indigo-600" : "from-indigo-500 to-purple-600",
                  )}
                >
                  <span className="text-xs font-bold text-white">{typingIndicator.isUser ? "U" : "A"}</span>
                </div>
              </div>
            )}
            <div className="bg-slate-100 px-3 py-2 rounded-lg flex items-center gap-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce animation-delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce animation-delay-200"></div>
              </div>
              <span className="text-xs text-slate-500 ml-1">
                {typingIndicator.isUser ? "You are" : "AI is"} typing...
              </span>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
