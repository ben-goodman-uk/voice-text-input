"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VoiceTextInput } from "@/components/voice-text-input";
import { ConversationStatesShowcase } from "@/components/conversation-states-showcase";
import { InputModesShowcase } from "@/components/input-modes-showcase";
import { MessageTypesShowcase } from "@/components/message-types-showcase";
import { MessageCombinationsShowcase } from "@/components/message-combinations-showcase";

export default function ShowcasePage() {
  const handleSubmit = (message: string, inputType: "voice" | "text") => {
    console.log("Message submitted:", message, "via", inputType);
  };

  const handleConversationMessage = (message: string, isUser: boolean) => {
    console.log(`${isUser ? "User" : "AI"} said:`, message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4 pt-8 mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Voice & Text Input Component Showcase
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            A comprehensive showcase of all visual and functional variants of
            the chat component, including different states, message types, and
            combinations.
          </p>
        </div>

        <Tabs defaultValue="states" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="states">Component States</TabsTrigger>
            <TabsTrigger value="input-modes">Input Modes</TabsTrigger>
            <TabsTrigger value="messages">Message Types</TabsTrigger>
            <TabsTrigger value="combinations">Combinations</TabsTrigger>
            <TabsTrigger value="interactive">Interactive Demo</TabsTrigger>
          </TabsList>

          <TabsContent value="states">
            <ConversationStatesShowcase />
          </TabsContent>

          <TabsContent value="input-modes">
            <InputModesShowcase />
          </TabsContent>

          <TabsContent value="messages">
            <MessageTypesShowcase />
          </TabsContent>

          <TabsContent value="combinations">
            <MessageCombinationsShowcase />
          </TabsContent>

          <TabsContent value="interactive">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Interactive Demo</CardTitle>
                <CardDescription>
                  Try out the different features and modes of the voice and text
                  input component
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
