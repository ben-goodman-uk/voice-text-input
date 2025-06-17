"use client";

import { VoiceTextInput } from "@/components/voice-text-input";
import { ShowcaseCard } from "@/components/showcase-card";

export function InputModesShowcase() {
  // No-op handlers
  const handleSubmit = () => {};
  const handleConversationMessage = () => {};

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-slate-900">
        Input Modes & Variants
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {/* Input Modes */}
        <ShowcaseCard
          title="Text Input Mode"
          description="Standard text input with keyboard"
        >
          <VoiceTextInput
            placeholder="Type or use microphone icon..."
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
          title="Voice Dictation - Ready"
          description="Ready to start voice dictation (click mic to begin)"
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
          title="Voice Dictation - Active"
          description="Currently listening with compact waveform visualization"
        >
          <VoiceTextInput
            placeholder="Speak now..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation={false}
            defaultState="listening"
            defaultInputMode="voice"
            defaultMessage="This is what appears as you speak into the microphone"
            showcaseMode
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Voice Dictation - Processing"
          description="Processing the recorded speech input"
        >
          <VoiceTextInput
            placeholder="Processing the voice input..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation={false}
            defaultState="processing"
            defaultInputMode="text"
            defaultMessage="Processing the recorded speech input"
            showcaseMode
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Conversation Mode"
          description="Natural two-way conversation with full-width waveform"
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

      <div className="grid grid-cols-1 gap-4">
        {/* Component Variants */}
        <ShowcaseCard
          title="Chat Variant"
          description="Optimized for conversational interfaces"
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

        <ShowcaseCard
          title="With Natural Conversation Toggle"
          description="Toggleable natural conversation mode"
        >
          <VoiceTextInput
            placeholder="Type a message or speak naturally..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultState="idle"
            defaultInputMode="text"
            defaultIsNaturalConversationEnabled={false}
            showcaseMode
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Without Natural Conversation"
          description="No natural conversation capability"
        >
          <VoiceTextInput
            placeholder="Type a message or use voice input..."
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
      </div>
    </div>
  );
}
