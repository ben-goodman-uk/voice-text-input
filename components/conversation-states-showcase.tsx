"use client";

import { VoiceTextInput } from "@/components/voice-text-input";
import { ShowcaseCard } from "@/components/showcase-card";

export function ConversationStatesShowcase() {
  // No-op handlers
  const handleSubmit = () => {};
  const handleConversationMessage = () => {};

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-slate-900">
        Basic Input States
      </h2>

      <div className="flex flex-col gap-4">
        {/* Basic Input States */}
        <ShowcaseCard
          title="Idle State"
          description="Default state, ready for user input"
        >
          <VoiceTextInput
            placeholder="Type a message or tap the mic to speak..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultState="idle"
            defaultInputMode="text"
            showcaseMode
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Text Input Active"
          description="User is typing a message"
        >
          <VoiceTextInput
            placeholder="Type a message or tap the mic to speak..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultState="idle"
            defaultInputMode="text"
            defaultMessage="Hello, I'm typing a message"
            showcaseMode
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Voice Recording State"
          description="User is speaking - voice input active"
        >
          <VoiceTextInput
            placeholder="Speak now..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultState="listening"
            defaultInputMode="voice"
            showcaseMode
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Processing State"
          description="Processing user input"
        >
          <VoiceTextInput
            placeholder="Processing..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultState="processing"
            defaultInputMode="voice"
            defaultMessage="Processing speech input..."
            showcaseMode
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Success State"
          description="Input successfully processed"
        >
          <VoiceTextInput
            placeholder="Type a message or tap the mic to speak..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultState="success"
            defaultInputMode="voice"
            defaultMessage="Voice captured successfully"
            showcaseMode
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Error State"
          description="Error occurred during input"
        >
          <VoiceTextInput
            placeholder="Type a message or tap the mic to speak..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultState="error"
            defaultInputMode="voice"
            defaultError="Microphone access denied"
            showcaseMode
          />
        </ShowcaseCard>
      </div>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8">
        Natural Conversation Mode States
      </h2>

      <div className="flex flex-col gap-4">
        <ShowcaseCard
          title="Natural Mode - Disabled"
          description="Natural conversation mode not available - only basic voice input"
        >
          <VoiceTextInput
            placeholder="Type a message or tap the mic to speak..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation={false}
            defaultState="idle"
            defaultInputMode="text"
            showcaseMode
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
            defaultState="listening"
            defaultInputMode="conversation"
            defaultIsNaturalConversationEnabled={true}
            showcaseMode
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Natural Mode - With Conversation History"
          description="Natural conversation with message history"
        >
          <div className="space-y-4">
            {/* Mock conversation history */}
            <div className="border rounded-lg bg-white/50 backdrop-blur-sm p-3 space-y-2">
              <div className="text-xs font-medium text-slate-600 mb-2">
                Conversation History
              </div>
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
              defaultState="listening"
              defaultInputMode="conversation"
              defaultIsNaturalConversationEnabled={true}
              showcaseMode
            />
          </div>
        </ShowcaseCard>
      </div>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8">
        Input Mode Variations
      </h2>

      <div className="flex flex-col gap-4">
        <ShowcaseCard
          title="Text Input Mode"
          description="Standard text input with send button"
        >
          <VoiceTextInput
            placeholder="Type your message here..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultState="idle"
            defaultInputMode="text"
            defaultMessage="Example typed message"
            showcaseMode
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Voice Input Mode (Dictation)"
          description="Voice dictation with compact waveform"
        >
          <VoiceTextInput
            placeholder="Speak now..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultState="listening"
            defaultInputMode="voice"
            defaultMessage="Dictating a message with compact waveform..."
            showcaseMode
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Conversation Mode"
          description="Natural conversation with full-width interface"
        >
          <VoiceTextInput
            placeholder=""
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultState="listening"
            defaultInputMode="conversation"
            defaultIsNaturalConversationEnabled={true}
            showcaseMode
          />
        </ShowcaseCard>
      </div>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8">
        Component Variants
      </h2>

      <div className="flex flex-col gap-4">
        <ShowcaseCard
          title="Chat Variant"
          description="Chat interface variant with full features"
        >
          <VoiceTextInput
            placeholder="Type a message or speak..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultState="idle"
            defaultInputMode="text"
            showcaseMode
          />
        </ShowcaseCard>
      </div>

      <h2 className="text-2xl font-semibold text-slate-900 mt-8">
        Special Features
      </h2>

      <div className="flex flex-col gap-4">
        <ShowcaseCard
          title="Custom Placeholder"
          description="Component with custom placeholder text"
        >
          <VoiceTextInput
            placeholder="Ask me anything about voice technology..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultState="idle"
            defaultInputMode="text"
            showcaseMode
          />
        </ShowcaseCard>
      </div>
    </div>
  );
}
