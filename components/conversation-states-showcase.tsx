"use client"

import { VoiceTextInput } from "@/components/voice-text-input"
import { ShowcaseCard } from "@/components/showcase-card"

export function ConversationStatesShowcase() {
  // No-op handlers
  const handleSubmit = () => {}
  const handleConversationMessage = () => {}

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-slate-900">Component States</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Basic Input States */}
        <ShowcaseCard title="Idle State" description="Default state, ready for user input">
          <VoiceTextInput
            placeholder="Type a message or tap the mic to speak..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
          />
        </ShowcaseCard>

        <ShowcaseCard title="Text Input Active" description="User is typing a message">
          <VoiceTextInput
            placeholder="Type a message or tap the mic to speak..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultMessage="Hello, I'm typing a message"
          />
        </ShowcaseCard>

        <ShowcaseCard title="Voice Input Active" description="User is speaking (dictation mode)">
          <VoiceTextInput
            placeholder="Speak now..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultInputMode="voice"
            defaultState="listening"
            defaultMessage="I'm speaking into the microphone..."
          />
        </ShowcaseCard>

        <ShowcaseCard title="Processing State" description="Processing user input">
          <VoiceTextInput
            placeholder="Processing..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultState="processing"
            defaultMessage="Processing speech input..."
          />
        </ShowcaseCard>

        <ShowcaseCard title="Error State" description="Error occurred during input">
          <VoiceTextInput
            placeholder="Type a message or tap the mic to speak..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultState="error"
            defaultError="Microphone access denied"
          />
        </ShowcaseCard>

        <ShowcaseCard title="Success State" description="Input successfully processed">
          <VoiceTextInput
            placeholder="Type a message or tap the mic to speak..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultState="success"
            defaultMessage="Voice captured successfully"
          />
        </ShowcaseCard>
      </div>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8">Natural Conversation Mode States</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ShowcaseCard title="Natural Mode - Inactive" description="Natural conversation mode available but not active">
          <VoiceTextInput
            placeholder="Type a message or tap the mic to speak..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultInputMode="text"
            defaultIsNaturalConversationEnabled={false}
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Natural Mode - Active & Listening"
          description="Natural conversation mode active, listening for speech"
        >
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
        </ShowcaseCard>

        <ShowcaseCard
          title="Natural Mode - With Live Transcript"
          description="Natural conversation with visible transcript"
        >
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
            defaultMessage="I'm speaking naturally and you can see the transcript..."
          />
        </ShowcaseCard>

        <ShowcaseCard title="Natural Mode - Processing" description="Processing natural conversation input">
          <VoiceTextInput
            placeholder=""
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultInputMode="conversation"
            defaultIsNaturalConversationEnabled={true}
            defaultState="processing"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Natural Mode - With Conversation History"
          description="Natural conversation with message history"
        >
          <div className="space-y-4">
            {/* Mock conversation history */}
            <div className="border rounded-lg bg-white/50 backdrop-blur-sm p-3 space-y-2">
              <div className="text-xs font-medium text-slate-600 mb-2">Conversation History</div>
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm max-w-[80%]">
                  Hello! How can you help me today?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-slate-200 text-slate-900 px-3 py-1 rounded-lg text-sm max-w-[80%]">
                  I'd be happy to help! What would you like to know about?
                </div>
              </div>
            </div>
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

        <ShowcaseCard title="Natural Mode - Error State" description="Error in natural conversation mode">
          <VoiceTextInput
            placeholder=""
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultInputMode="conversation"
            defaultIsNaturalConversationEnabled={true}
            defaultState="error"
            defaultError="Speech recognition error: no speech detected"
          />
        </ShowcaseCard>
      </div>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8">Waveform Visualization States</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ShowcaseCard title="Compact Waveform (Voice Mode)" description="Compact waveform for dictation mode">
          <VoiceTextInput
            placeholder="Speak now..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultInputMode="voice"
            defaultState="listening"
            defaultMessage="Dictating a message with compact waveform..."
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Full-Width Waveform (Natural Mode)"
          description="Full-width waveform for natural conversation"
        >
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
        </ShowcaseCard>
      </div>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8">Status Bar Variations</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ShowcaseCard title="Compact Status (Manual Mode)" description="Compact status bar for manual input modes">
          <VoiceTextInput
            placeholder="Type a message or speak..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultInputMode="voice"
            defaultState="listening"
            defaultMessage="Voice input with compact status..."
          />
        </ShowcaseCard>

        <ShowcaseCard title="Enhanced Status (Natural Mode)" description="Enhanced status bar for natural conversation">
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
        </ShowcaseCard>
      </div>
    </div>
  )
}
