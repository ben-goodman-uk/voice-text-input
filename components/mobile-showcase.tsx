"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VoiceTextInput } from "@/components/voice-text-input";
import { MessageThread } from "@/components/message-thread";

export function MobileShowcase() {
  // No-op handlers
  const handleSubmit = () => {};
  const handleConversationMessage = () => {};

  // Create timestamps for messages
  const now = new Date();
  const oneMinAgo = new Date(now.getTime() - 60000);
  const twoMinAgo = new Date(now.getTime() - 120000);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-slate-900">
        Mobile Responsive Design
      </h2>
      <p className="text-slate-600 text-lg">
        Experience the component in realistic mobile viewport frames with proper
        device proportions.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* iPhone 14 Pro Frame */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>iPhone 14 Pro (390×844)</CardTitle>
            <CardDescription>
              Standard chat interface with optimized touch targets
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="relative">
              {/* Device Frame */}
              <div className="w-[390px] h-[700px] bg-black rounded-[55px] p-2 shadow-2xl">
                {/* Screen */}
                <div className="w-full h-full bg-white rounded-[45px] overflow-hidden relative">
                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-10"></div>

                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-6 pt-2 text-sm font-medium z-20">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 bg-slate-600 rounded-sm"></div>
                      <div className="w-4 h-2 bg-slate-600 rounded-sm"></div>
                      <div className="w-6 h-3 border border-slate-600 rounded-sm">
                        <div className="w-4 h-full bg-green-500 rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="pt-12 pb-6 px-4 h-full flex flex-col">
                    <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
                      <MessageThread
                        messages={[
                          {
                            id: "1",
                            message:
                              "Hi! This is optimized for mobile with larger touch targets.",
                            isUser: false,
                            timestamp: twoMinAgo,
                          },
                          {
                            id: "2",
                            message: "The buttons are much easier to tap!",
                            isUser: true,
                            timestamp: oneMinAgo,
                          },
                        ]}
                        maxHeight="400px"
                      />
                      <VoiceTextInput
                        placeholder="Type or tap mic..."
                        onSubmit={handleSubmit}
                        onConversationMessage={handleConversationMessage}
                        variant="chat"
                        showSendButton
                        enableNaturalConversation
                      />
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-full opacity-60"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Galaxy S22 Frame */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Samsung Galaxy S22 (360×800)</CardTitle>
            <CardDescription>
              Compact screen with efficient space usage
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="relative">
              {/* Device Frame */}
              <div className="w-[360px] h-[650px] bg-gray-900 rounded-[35px] p-2 shadow-2xl">
                {/* Screen */}
                <div className="w-full h-full bg-white rounded-[25px] overflow-hidden relative">
                  {/* Punch Hole Camera */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-10"></div>

                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-4 pt-1 text-xs font-medium z-20">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-1.5 bg-slate-600 rounded-sm"></div>
                      <div className="w-3 h-1.5 bg-slate-600 rounded-sm"></div>
                      <div className="w-4 h-2 border border-slate-600 rounded-sm">
                        <div className="w-3 h-full bg-green-500 rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="pt-10 pb-4 px-3 h-full flex flex-col">
                    <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
                      <MessageThread
                        messages={[
                          {
                            id: "1",
                            message:
                              "Compact design works great on smaller screens too!",
                            isUser: false,
                            timestamp: twoMinAgo,
                          },
                          {
                            id: "2",
                            message: "Perfect size for one-handed use",
                            isUser: true,
                            timestamp: oneMinAgo,
                          },
                        ]}
                        maxHeight="350px"
                      />
                      <VoiceTextInput
                        placeholder="Type or speak..."
                        onSubmit={handleSubmit}
                        onConversationMessage={handleConversationMessage}
                        variant="chat"
                        showSendButton
                        enableNaturalConversation
                      />
                    </div>
                  </div>

                  {/* Navigation Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-100 flex items-center justify-center space-x-6">
                    <div className="w-4 h-4 bg-gray-600 rounded"></div>
                    <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                    <div className="w-4 h-4 bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tablet Frame - iPad Mini */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>iPad Mini (768×1024) - Portrait</CardTitle>
            <CardDescription>
              Tablet view showing how the component adapts to larger screens
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="relative">
              {/* Device Frame */}
              <div className="w-[500px] h-[650px] bg-gray-800 rounded-[25px] p-3 shadow-2xl">
                {/* Screen */}
                <div className="w-full h-full bg-white rounded-[15px] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-6 text-sm font-medium z-20 bg-gray-50">
                    <span>9:41 AM</span>
                    <div className="flex items-center gap-2">
                      <span>100%</span>
                      <div className="w-6 h-3 border border-slate-600 rounded-sm">
                        <div className="w-5 h-full bg-green-500 rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="pt-8 pb-4 px-6 h-full flex flex-col">
                    <div className="flex-1 flex flex-col space-y-6 overflow-hidden">
                      <MessageThread
                        messages={[
                          {
                            id: "1",
                            message:
                              "The component scales beautifully on tablets with more breathing room and larger touch targets.",
                            isUser: false,
                            timestamp: twoMinAgo,
                          },
                          {
                            id: "2",
                            message:
                              "Great for productivity and longer conversations!",
                            isUser: true,
                            timestamp: oneMinAgo,
                          },
                        ]}
                        maxHeight="400px"
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
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Design Principles */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Mobile Design Principles</CardTitle>
          <CardDescription>
            Key mobile optimizations implemented in the component
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Touch Targets
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 pl-4">
                <li>• Minimum 44×44px touch targets on mobile</li>
                <li>• Larger spacing between interactive elements</li>
                <li>• Touch-friendly button sizing and padding</li>
                <li>• Easy thumb-reach button placement</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Typography
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 pl-4">
                <li>• 16px minimum text size for readability</li>
                <li>• Sufficient line height and contrast</li>
                <li>• Responsive text scaling</li>
                <li>• Clear visual hierarchy</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Interaction
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 pl-4">
                <li>• Optimized for one-handed use</li>
                <li>• Clear visual feedback on touch</li>
                <li>• Reduced cognitive load</li>
                <li>• Voice-first mobile experience</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
