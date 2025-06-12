"use client"

import { StaticVoiceInput } from "@/components/static-voice-input"
import { StaticMessageBubble } from "@/components/static-message-bubble"
import { ShowcaseCard } from "@/components/showcase-card"

export default function StaticShowcasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4 pt-8 mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Static Component Documentation</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Static versions of all component states and variations for design documentation and Figma translation. These
            components show exact visual appearance without requiring microphone access or real audio streams.
          </p>
        </div>

        {/* Input States */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Input Component States</h2>

          <div className="grid grid-cols-1 ">
            <ShowcaseCard title="Idle State" description="Default ready state">
              <StaticVoiceInput
                placeholder="Type a message or tap the mic to speak..."
                variant="chat"
                showSendButton
                enableNaturalConversation
                state="idle"
                inputMode="text"
              />
            </ShowcaseCard>

            <ShowcaseCard title="Text Input Active" description="User typing">
              <StaticVoiceInput
                placeholder="Type a message..."
                variant="chat"
                showSendButton
                enableNaturalConversation
                state="idle"
                inputMode="text"
                message="Hello, I'm typing a message"
              />
            </ShowcaseCard>

            <ShowcaseCard title="Voice Dictation - Listening" description="Voice input with compact waveform">
              <StaticVoiceInput
                placeholder="Speak now..."
                variant="chat"
                showSendButton
                enableNaturalConversation
                state="listening"
                inputMode="voice"
                message="I'm speaking into the microphone..."
                showWaveform={true}
                waveformPattern="active"
              />
            </ShowcaseCard>

            <ShowcaseCard title="Voice Dictation - Processing" description="Processing speech input">
              <StaticVoiceInput
                placeholder="Processing..."
                variant="chat"
                showSendButton
                enableNaturalConversation
                state="processing"
                inputMode="voice"
                message="Processing speech input..."
              />
            </ShowcaseCard>

            <ShowcaseCard title="Voice Dictation - Success" description="Successfully captured voice">
              <StaticVoiceInput
                placeholder="Voice captured"
                variant="chat"
                showSendButton
                enableNaturalConversation
                state="success"
                inputMode="voice"
                message="Voice captured successfully"
              />
            </ShowcaseCard>

            <ShowcaseCard title="Error State" description="Error with microphone access">
              <StaticVoiceInput
                placeholder="Type a message..."
                variant="chat"
                showSendButton
                enableNaturalConversation
                state="error"
                inputMode="text"
                error="Microphone access denied"
              />
            </ShowcaseCard>
          </div>
        </section>

        {/* Natural Conversation Mode */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Natural Conversation Mode</h2>

          <div className="grid grid-cols-1">
            <ShowcaseCard title="Natural Mode - Inactive" description="Natural conversation available but not active">
              <StaticVoiceInput
                placeholder="Type a message or tap the mic to speak..."
                variant="chat"
                showSendButton
                enableNaturalConversation
                state="idle"
                inputMode="text"
                isNaturalConversationEnabled={false}
              />
            </ShowcaseCard>

            <ShowcaseCard title="Natural Mode - Active & Listening" description="Full-width waveform, enhanced status">
              <StaticVoiceInput
                placeholder=""
                variant="chat"
                showSendButton
                enableNaturalConversation
                state="listening"
                inputMode="conversation"
                isNaturalConversationEnabled={true}
                showWaveform={true}
                waveformPattern="active"
              />
            </ShowcaseCard>

            <ShowcaseCard title="Natural Mode - With Live Transcript" description="Showing real-time transcript">
              <StaticVoiceInput
                placeholder=""
                variant="chat"
                showSendButton
                enableNaturalConversation
                state="listening"
                inputMode="conversation"
                isNaturalConversationEnabled={true}
                showTranscriptInNaturalMode={true}
                message="I'm speaking naturally and you can see the transcript..."
                showWaveform={true}
                waveformPattern="moderate"
              />
            </ShowcaseCard>

            <ShowcaseCard title="Natural Mode - Processing" description="Processing natural conversation">
              <StaticVoiceInput
                placeholder=""
                variant="chat"
                showSendButton
                enableNaturalConversation
                state="processing"
                inputMode="conversation"
                isNaturalConversationEnabled={true}
              />
            </ShowcaseCard>
          </div>
        </section>

        {/* Waveform Variations */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Waveform Visualizations</h2>

          <div className="grid grid-cols-1">
            <ShowcaseCard title="Compact Waveform - Active" description="Small waveform for voice dictation">
              <StaticVoiceInput
                placeholder="Speak now..."
                variant="chat"
                showSendButton
                state="listening"
                inputMode="voice"
                message="Active voice input with waveform"
                showWaveform={true}
                waveformPattern="active"
              />
            </ShowcaseCard>

            <ShowcaseCard
              title="Full-Width Waveform - Active"
              description="Background waveform for natural conversation"
            >
              <StaticVoiceInput
                placeholder=""
                variant="chat"
                showSendButton
                state="listening"
                inputMode="conversation"
                isNaturalConversationEnabled={true}
                showWaveform={true}
                waveformPattern="active"
              />
            </ShowcaseCard>

            <ShowcaseCard title="Moderate Activity Waveform" description="Medium voice activity level">
              <StaticVoiceInput
                placeholder=""
                variant="chat"
                showSendButton
                state="listening"
                inputMode="conversation"
                isNaturalConversationEnabled={true}
                showWaveform={true}
                waveformPattern="moderate"
              />
            </ShowcaseCard>

            <ShowcaseCard title="Low Activity Waveform" description="Quiet voice input">
              <StaticVoiceInput
                placeholder=""
                variant="chat"
                showSendButton
                state="listening"
                inputMode="conversation"
                isNaturalConversationEnabled={true}
                showWaveform={true}
                waveformPattern="low"
              />
            </ShowcaseCard>
          </div>
        </section>

        {/* Message Bubbles */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Message Bubble Variations</h2>

          <div className="grid grid-cols-1">
            <ShowcaseCard title="User Message" description="Standard user message bubble">
              <StaticMessageBubble message="This is a message from the user" isUser={true} timestamp="2:45 PM" />
            </ShowcaseCard>

            <ShowcaseCard title="AI Message" description="Standard AI response bubble">
              <StaticMessageBubble
                message="This is a message from the AI assistant"
                isUser={false}
                timestamp="2:46 PM"
              />
            </ShowcaseCard>

            <ShowcaseCard title="System Message" description="System notification">
              <StaticMessageBubble
                message="Your message has been delivered"
                isUser={false}
                isSystem={true}
                timestamp="2:47 PM"
              />
            </ShowcaseCard>

            <ShowcaseCard title="Message with Image" description="Message with image attachment">
              <StaticMessageBubble
                message="Check out this image"
                isUser={true}
                timestamp="2:48 PM"
                attachments={[
                  {
                    type: "image",
                    url: "/placeholder.svg?height=200&width=300",
                    filename: "image.jpg",
                    filesize: "120 KB",
                  },
                ]}
              />
            </ShowcaseCard>

            <ShowcaseCard title="Message with File" description="Message with file attachment">
              <StaticMessageBubble
                message="Here's the document"
                isUser={false}
                timestamp="2:49 PM"
                attachments={[
                  {
                    type: "file",
                    filename: "document.pdf",
                    filesize: "2.4 MB",
                  },
                ]}
              />
            </ShowcaseCard>

            <ShowcaseCard title="Message with Read Receipt" description="Message showing read status">
              <StaticMessageBubble
                message="Did you see my previous message?"
                isUser={true}
                timestamp="2:50 PM"
                deliveryStatus="read"
                readReceipt="Read at 2:51 PM"
              />
            </ShowcaseCard>

            <ShowcaseCard title="Message with Reactions" description="Message with emoji reactions">
              <StaticMessageBubble
                message="I think this is a great idea!"
                isUser={false}
                timestamp="2:52 PM"
                reactions={[
                  { emoji: "👍", count: 2 },
                  { emoji: "❤️", count: 1 },
                ]}
              />
            </ShowcaseCard>

            <ShowcaseCard title="Failed Message" description="Message that failed to send">
              <StaticMessageBubble
                message="Can we schedule a meeting for tomorrow?"
                isUser={true}
                timestamp="2:53 PM"
                deliveryStatus="failed"
                errorMessage="Failed to send. Tap to retry."
              />
            </ShowcaseCard>

            <ShowcaseCard title="Multi-participant with Avatars" description="Team chat with avatars">
              <StaticMessageBubble
                message="Hi team, does anyone have the latest specs?"
                isUser={false}
                timestamp="2:54 PM"
                showAvatar={true}
                showName={true}
                sender={{
                  name: "Alex Chen",
                  avatar: "/placeholder.svg?height=40&width=40",
                }}
              />
            </ShowcaseCard>
          </div>
        </section>

        {/* Complete Interface Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Complete Interface Examples</h2>

          <div className="grid grid-cols-1">
            <ShowcaseCard title="Standard Chat Interface" description="Complete chat with history and input">
              <StaticVoiceInput
                variant="chat"
                showSendButton
                enableNaturalConversation
                state="idle"
                inputMode="text"
                message=""
                conversationHistory={[
                  {
                    message: "Hello! How can I help you today?",
                    isUser: false,
                    timestamp: "2:45 PM",
                  },
                  {
                    message: "I need help with my project. Can you provide some guidance?",
                    isUser: true,
                    timestamp: "2:46 PM",
                  },
                  {
                    message:
                      "Of course! I'd be happy to help with your project. Could you tell me more about what you're working on?",
                    isUser: false,
                    timestamp: "2:47 PM",
                  },
                ]}
              />
            </ShowcaseCard>

            <ShowcaseCard title="Natural Conversation Active" description="Hands-free conversation mode">
              <StaticVoiceInput
                variant="chat"
                showSendButton
                enableNaturalConversation
                state="listening"
                inputMode="conversation"
                isNaturalConversationEnabled={true}
                showWaveform={true}
                waveformPattern="active"
                conversationHistory={[
                  {
                    message: "Tell me about artificial intelligence.",
                    isUser: true,
                    timestamp: "2:45 PM",
                  },
                  {
                    message:
                      "Artificial Intelligence refers to computer systems designed to perform tasks that typically require human intelligence...",
                    isUser: false,
                    timestamp: "2:46 PM",
                  },
                ]}
              />
            </ShowcaseCard>
          </div>
        </section>

        {/* Component Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Component Variants</h2>

          <div className="grid grid-cols-1 ">
            <ShowcaseCard title="Chat Variant" description="Optimized for conversations">
              <StaticVoiceInput
                variant="chat"
                showSendButton
                enableNaturalConversation
                placeholder="Type a message..."
              />
            </ShowcaseCard>


            <ShowcaseCard title="Without Send Button" description="Input without send button">
              <StaticVoiceInput
                variant="chat"
                showSendButton={false}
                enableNaturalConversation
                placeholder="Type a message..."
              />
            </ShowcaseCard>

            <ShowcaseCard title="Without Natural Conversation" description="Voice and text only">
              <StaticVoiceInput
                variant="chat"
                showSendButton
                enableNaturalConversation={false}
                placeholder="Type a message or speak..."
              />
            </ShowcaseCard>

            <ShowcaseCard title="Multi-line Input" description="Textarea for longer content">
              <StaticVoiceInput
                variant="form"
                showSendButton
                multiline
                enableNaturalConversation
                placeholder="Enter a longer message..."
                message="This is a longer message that spans multiple lines and shows how the component handles extended text input..."
              />
            </ShowcaseCard>
          </div>
        </section>
      </div>
    </div>
  )
}
