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
            placeholder="Type or use microphone icon ..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            defaultInputMode="text"
          />
        </ShowcaseCard>

        <ShowcaseCard title="Voice Input Mode" description="Speech recognition">
          <VoiceTextInput
            placeholder="Type a message..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            defaultInputMode="text"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Conversation Mode"
          description="Natural two-way conversation"
        >
          <VoiceTextInput
            placeholder="Natural conversation active..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation
            defaultInputMode="conversation"
            defaultIsNaturalConversationEnabled={true}
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
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="With Send Button"
          description="Input with visible send button"
        >
          <VoiceTextInput
            placeholder="Type a message..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Single Line Input"
          description="For short, concise messages"
        >
          <VoiceTextInput
            placeholder="Type a short message..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            multiline={false}
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
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Without Natural Conversation Toggle"
          description="No natural conversation capability"
        >
          <VoiceTextInput
            placeholder="Type a message or speak..."
            onSubmit={handleSubmit}
            onConversationMessage={handleConversationMessage}
            variant="chat"
            showSendButton
            enableNaturalConversation={false}
          />
        </ShowcaseCard>
      </div>
    </div>
  );
}
