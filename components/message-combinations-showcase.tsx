"use client"

import { MessageThread } from "@/components/message-thread"
import { ShowcaseCard } from "@/components/showcase-card"
import { VoiceTextInput } from "@/components/voice-text-input"

export function MessageCombinationsShowcase() {
  // No-op handlers
  const handleSubmit = () => {}
  const handleConversationMessage = () => {}

  // Create timestamps for messages
  const now = new Date()
  const oneMinAgo = new Date(now.getTime() - 60000)
  const twoMinAgo = new Date(now.getTime() - 120000)
  const threeMinAgo = new Date(now.getTime() - 180000)

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-slate-900">Message Combinations & Complete Interfaces</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Complete Chat Interfaces */}
        <ShowcaseCard
          title="Standard Chat Interface"
          description="Basic text-based chat with user and AI messages"
          className="col-span-1 md:col-span-2"
        >
          <div className="space-y-4">
            <MessageThread
              messages={[
                {
                  id: "1",
                  message: "Hello! How can I help you today?",
                  isUser: false,
                  timestamp: threeMinAgo,
                  deliveryStatus: "delivered",
                },
                {
                  id: "2",
                  message: "I need help with my project. Can you provide some guidance?",
                  isUser: true,
                  timestamp: twoMinAgo,
                  deliveryStatus: "read",
                  readReceipt: "Read at 2:45 PM",
                },
                {
                  id: "3",
                  message:
                    "Of course! I'd be happy to help with your project. Could you tell me more about what you're working on?",
                  isUser: false,
                  timestamp: oneMinAgo,
                  deliveryStatus: "delivered",
                  reactions: [{ emoji: "👍", count: 1 }],
                },
              ]}
              typingIndicator={{ isTyping: false, isUser: false }}
            />
            <VoiceTextInput
              placeholder="Type a message or tap the mic to speak..."
              onSubmit={handleSubmit}
              onConversationMessage={handleConversationMessage}
              variant="chat"
              showSendButton
              enableNaturalConversation
            />
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Rich Media Chat" description="Chat with various attachment types and statuses">
          <div className="space-y-4">
            <MessageThread
              messages={[
                {
                  id: "1",
                  message: "I've prepared some mockups for the new design",
                  isUser: true,
                  timestamp: threeMinAgo,
                  attachments: [
                    {
                      type: "image",
                      url: "/placeholder.svg?height=200&width=300",
                      filename: "mockup1.jpg",
                      filesize: "1.4 MB",
                    },
                  ],
                  deliveryStatus: "read",
                },
                {
                  id: "2",
                  message: "These look great! I've made some notes in this document.",
                  isUser: false,
                  timestamp: twoMinAgo,
                  attachments: [
                    {
                      type: "file",
                      filename: "feedback.pdf",
                      filesize: "2.8 MB",
                    },
                  ],
                },
              ]}
              typingIndicator={{ isTyping: true, isUser: false }}
            />
            <VoiceTextInput
              placeholder="Type a message or tap the mic to speak..."
              onSubmit={handleSubmit}
              onConversationMessage={handleConversationMessage}
              variant="chat"
              showSendButton
            />
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          title="Voice Input Active With Chat History"
          description="Voice dictation mode with existing conversation"
        >
          <div className="space-y-4">
            <MessageThread
              messages={[
                {
                  id: "1",
                  message: "What information do you need for the report?",
                  isUser: true,
                  timestamp: twoMinAgo,
                },
                {
                  id: "2",
                  message: "We need the quarterly figures and the market analysis.",
                  isUser: false,
                  timestamp: oneMinAgo,
                },
              ]}
            />
            <VoiceTextInput
              placeholder="Speak now..."
              onSubmit={handleSubmit}
              onConversationMessage={handleConversationMessage}
              variant="chat"
              showSendButton
              defaultInputMode="voice"
              defaultState="listening"
              defaultMessage="I'll gather those figures and send them by..."
            />
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Natural Conversation Mode Active" description="Hands-free conversation mode with AI">
          <div className="space-y-4">
            <MessageThread
              messages={[
                {
                  id: "1",
                  message: "Tell me about artificial intelligence.",
                  isUser: true,
                  timestamp: twoMinAgo,
                },
                {
                  id: "2",
                  message:
                    "Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence. These include learning, reasoning, problem-solving, perception, and language understanding.",
                  isUser: false,
                  timestamp: oneMinAgo,
                },
              ]}
            />
            <VoiceTextInput
              placeholder=""
              onSubmit={handleSubmit}
              onConversationMessage={handleConversationMessage}
              variant="chat"
              showSendButton
              enableNaturalConversation
              defaultInputMode="conversation"
              defaultIsNaturalConversationEnabled={true}
              defaultState="listening"
            />
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          title="Multi-participant Chat"
          description="Conversation with multiple participants"
          className="col-span-1 md:col-span-2"
        >
          <div className="space-y-4">
            <MessageThread
              messages={[
                {
                  id: "1",
                  message: "Hi team, does anyone have the latest product specs?",
                  isUser: true,
                  timestamp: threeMinAgo,
                  sender: { name: "Alex", avatar: "/placeholder.svg?height=40&width=40" },
                },
                {
                  id: "2",
                  message: "I shared them yesterday in the product channel.",
                  isUser: false,
                  timestamp: twoMinAgo,
                  sender: { name: "Taylor", avatar: "/placeholder.svg?height=40&width=40" },
                },
                {
                  id: "3",
                  message: "Here they are again for reference",
                  isUser: false,
                  timestamp: oneMinAgo,
                  sender: { name: "Taylor", avatar: "/placeholder.svg?height=40&width=40" },
                  attachments: [
                    {
                      type: "file",
                      filename: "product_specs_v2.pdf",
                      filesize: "4.2 MB",
                    },
                  ],
                },
                {
                  id: "4",
                  message: "Thanks Taylor! Does everyone have access to the file?",
                  isUser: true,
                  timestamp: now,
                  sender: { name: "Alex", avatar: "/placeholder.svg?height=40&width=40" },
                },
              ]}
              showAvatars={true}
              showNames={true}
            />
            <VoiceTextInput
              placeholder="Type a message or tap the mic to speak..."
              onSubmit={handleSubmit}
              onConversationMessage={handleConversationMessage}
              variant="chat"
              showSendButton
              enableNaturalConversation
            />
          </div>
        </ShowcaseCard>
      </div>
    </div>
  )
}
