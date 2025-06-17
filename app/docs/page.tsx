"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">
            VoiceTextInput Developer Documentation
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive guide for developers working with the VoiceTextInput
            component - a sophisticated React component that combines text
            input, voice dictation, and natural conversation capabilities.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="states">States & Modes</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="showcase">Showcase Mode</TabsTrigger>
            <TabsTrigger value="recent">Recent Updates</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Component Overview</CardTitle>
                <CardDescription>
                  Understanding the VoiceTextInput component's core
                  functionality and use cases
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    What is VoiceTextInput?
                  </h3>
                  <p className="text-slate-600 mb-4">
                    VoiceTextInput is a React component that provides a unified
                    interface for text and voice input. It supports three main
                    interaction modes: standard text input, voice dictation, and
                    natural conversation with AI.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>
                      • <strong>Text Input:</strong> Standard keyboard input
                      with customizable placeholders
                    </li>
                    <li>
                      • <strong>Voice Dictation:</strong> Speech-to-text
                      conversion with visual feedback
                    </li>
                    <li>
                      • <strong>Natural Conversation:</strong> Continuous AI
                      conversation with voice responses
                    </li>
                    <li>
                      • <strong>Real-time Waveform:</strong> Visual audio
                      feedback during voice input
                    </li>
                    <li>
                      • <strong>Multiple Variants:</strong> Chat, search, and
                      form interface styles
                    </li>
                    <li>
                      • <strong>Accessibility:</strong> Full screen reader and
                      keyboard navigation support
                    </li>
                    <li>
                      • <strong>Showcase Mode:</strong> Demo mode for
                      documentation and presentations
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Core Dependencies
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Required Hooks</h4>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>
                          • <code>useSpeechRecognition</code> - Voice input
                          handling
                        </li>
                        <li>
                          • <code>useState/useEffect</code> - React state
                          management
                        </li>
                        <li>
                          • <code>useCallback/useRef</code> - Performance
                          optimization
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">UI Components</h4>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>
                          • <code>WaveformVisualizer</code> - Real-time audio
                          visualization
                        </li>
                        <li>
                          • <code>StaticWaveform</code> - Static demo waveforms
                        </li>
                        <li>
                          • <code>Button, Input, Tooltip</code> - UI primitives
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    {`import { VoiceTextInput } from "@/components/voice-text-input";

function ChatInterface() {
  const handleSubmit = (message: string, inputType: "voice" | "text") => {
    console.log(\`Received \${inputType} message: \${message}\`);
  };

  const handleConversation = (message: string, isUser: boolean) => {
    console.log(\`\${isUser ? 'User' : 'AI'}: \${message}\`);
  };

  return (
    <VoiceTextInput
      placeholder="Type a message or speak..."
      onSubmit={handleSubmit}
      onConversationMessage={handleConversation}
      variant="chat"
      showSendButton
      enableNaturalConversation
    />
  );
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Reference Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Props Interface</CardTitle>
                <CardDescription>
                  Complete reference for all VoiceTextInput props and their
                  usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Required Props
                    </h3>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <code className="bg-slate-100 px-2 py-1 rounded text-sm">
                            onSubmit
                          </code>
                          <Badge variant="destructive">Required</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          <strong>Type:</strong>{" "}
                          <code>
                            (message: string, inputType: "voice" | "text") =&gt;
                            void
                          </code>
                        </p>
                        <p className="text-sm text-slate-600">
                          Callback fired when user submits a message. Receives
                          the message content and input method.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Optional Props
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: "placeholder",
                          type: "string",
                          default: '"Type a message or speak..."',
                          description:
                            "Placeholder text shown in the input field",
                        },
                        {
                          name: "onConversationMessage",
                          type: "(message: string, isUser: boolean) => void",
                          default: "undefined",
                          description:
                            "Callback for natural conversation mode messages",
                        },
                        {
                          name: "variant",
                          type: '"chat" | "search" | "form"',
                          default: '"chat"',
                          description:
                            "UI variant affecting styling and behavior",
                        },
                        {
                          name: "showSendButton",
                          type: "boolean",
                          default: "true",
                          description: "Whether to show the send button",
                        },
                        {
                          name: "multiline",
                          type: "boolean",
                          default: "false",
                          description:
                            "Enable multiline text input (textarea vs input)",
                        },
                        {
                          name: "enableNaturalConversation",
                          type: "boolean",
                          default: "false",
                          description:
                            "Enable natural conversation mode toggle",
                        },
                        {
                          name: "showcaseMode",
                          type: "boolean",
                          default: "false",
                          description:
                            "Enable showcase/demo mode with static waveforms",
                        },
                      ].map((prop) => (
                        <div key={prop.name} className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <code className="bg-slate-100 px-2 py-1 rounded text-sm">
                              {prop.name}
                            </code>
                            <Badge variant="secondary">Optional</Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-1">
                            <strong>Type:</strong> <code>{prop.type}</code>
                          </p>
                          <p className="text-sm text-slate-600 mb-1">
                            <strong>Default:</strong>{" "}
                            <code>{prop.default}</code>
                          </p>
                          <p className="text-sm text-slate-600">
                            {prop.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Showcase/Demo Props
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: "defaultMessage",
                          type: "string",
                          description: "Pre-filled message content for demos",
                        },
                        {
                          name: "defaultState",
                          type: '"idle" | "listening" | "processing" | "error" | "success"',
                          description: "Initial state for showcase mode",
                        },
                        {
                          name: "defaultInputMode",
                          type: '"text" | "voice" | "conversation"',
                          description: "Initial input mode for showcase",
                        },
                        {
                          name: "defaultError",
                          type: "string | null",
                          description: "Error message to display in showcase",
                        },
                      ].map((prop) => (
                        <div key={prop.name} className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <code className="bg-slate-100 px-2 py-1 rounded text-sm">
                              {prop.name}
                            </code>
                            <Badge variant="outline">Showcase</Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-1">
                            <strong>Type:</strong> <code>{prop.type}</code>
                          </p>
                          <p className="text-sm text-slate-600">
                            {prop.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* States & Modes Tab */}
          <TabsContent value="states" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Component States</CardTitle>
                <CardDescription>
                  Understanding the different states and modes of the
                  VoiceTextInput component
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Input States</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        state: "idle",
                        description: "Default state, ready for input",
                        color: "bg-slate-100",
                      },
                      {
                        state: "listening",
                        description: "Recording voice input",
                        color: "bg-blue-100",
                      },
                      {
                        state: "processing",
                        description: "Processing speech or input",
                        color: "bg-amber-100",
                      },
                      {
                        state: "success",
                        description: "Input successfully processed",
                        color: "bg-green-100",
                      },
                      {
                        state: "error",
                        description: "Error occurred during input",
                        color: "bg-red-100",
                      },
                    ].map((item) => (
                      <div
                        key={item.state}
                        className={`${item.color} p-4 rounded-lg`}
                      >
                        <h4 className="font-medium capitalize">{item.state}</h4>
                        <p className="text-sm text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Input Modes</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Text Mode</h4>
                      <p className="text-sm text-slate-600 mb-2">
                        Standard keyboard input. Shows mic icon to start voice
                        input.
                      </p>
                      <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                        defaultInputMode="text"
                      </code>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Voice Mode</h4>
                      <p className="text-sm text-slate-600 mb-2">
                        Voice dictation mode with compact waveform. Shows stop
                        button when listening, keyboard icon when idle.
                      </p>
                      <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                        defaultInputMode="voice"
                      </code>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Conversation Mode</h4>
                      <p className="text-sm text-slate-600 mb-2">
                        Natural conversation with AI. Full-width waveform,
                        continuous listening, automatic responses.
                      </p>
                      <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                        defaultInputMode="conversation"
                      </code>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    State Transitions
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Voice Dictation Flow</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-slate-200 px-2 py-1 rounded">
                        idle (text)
                      </span>
                      <span>→</span>
                      <span className="bg-blue-200 px-2 py-1 rounded">
                        listening (voice)
                      </span>
                      <span>→</span>
                      <span className="bg-amber-200 px-2 py-1 rounded">
                        processing (text)
                      </span>
                      <span>→</span>
                      <span className="bg-green-200 px-2 py-1 rounded">
                        success (text)
                      </span>
                      <span>→</span>
                      <span className="bg-slate-200 px-2 py-1 rounded">
                        idle (text)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Architecture Tab */}
          <TabsContent value="architecture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Component Architecture</CardTitle>
                <CardDescription>
                  Deep dive into the component's internal structure and data
                  flow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">File Structure</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm">
                    <pre>
                      {`components/
├── voice-text-input.tsx           # Main component
├── voice-text-input-wrapper.tsx   # Wrapper with providers
├── waveform-visualizer.tsx        # Real-time waveform
├── static-waveform.tsx            # Static demo waveform
├── conversation-history.tsx       # Message history
├── message-bubble.tsx             # Individual messages
└── ui/                            # Shared UI components
    ├── button.tsx
    ├── input.tsx
    ├── textarea.tsx
    └── tooltip.tsx

hooks/
└── use-speech-recognition.ts      # Speech recognition hook`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    State Management
                  </h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Core State Variables</h4>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>
                          • <code>inputState</code> - Current component state
                          (idle, listening, processing, etc.)
                        </li>
                        <li>
                          • <code>inputMode</code> - Input method (text, voice,
                          conversation)
                        </li>
                        <li>
                          • <code>message</code> - Current input field content
                        </li>
                        <li>
                          • <code>isNaturalConversationEnabled</code> -
                          Conversation mode toggle
                        </li>
                        <li>
                          • <code>conversationHistory</code> - Message history
                          for conversation mode
                        </li>
                        <li>
                          • <code>error</code> - Current error message
                        </li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">
                        Speech Recognition State
                      </h4>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>
                          • <code>transcript</code> - Live speech transcription
                        </li>
                        <li>
                          • <code>isListening</code> - Recording status
                        </li>
                        <li>
                          • <code>isSupported</code> - Browser support check
                        </li>
                        <li>
                          • <code>audioStream</code> - MediaStream for
                          visualization
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Event Handling</h3>
                  <div className="space-y-4">
                    {[
                      {
                        name: "handleSubmit",
                        description:
                          "Processes form submission, validates input, calls onSubmit callback",
                      },
                      {
                        name: "handleStartListening",
                        description:
                          "Initiates voice recording, requests microphone permission, starts audio stream",
                      },
                      {
                        name: "handleStopListening",
                        description:
                          "Stops voice recording, processes transcript, transitions to processing state",
                      },
                      {
                        name: "handleNaturalConversationToggle",
                        description:
                          "Toggles conversation mode, manages continuous listening, handles AI responses",
                      },
                    ].map((handler) => (
                      <div key={handler.name} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-1">{handler.name}</h4>
                        <p className="text-sm text-slate-600">
                          {handler.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Performance Optimizations
                  </h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>
                      • <strong>useCallback:</strong> Memoized event handlers
                      prevent unnecessary re-renders
                    </li>
                    <li>
                      • <strong>useRef:</strong> Direct DOM access for audio
                      streams and timers
                    </li>
                    <li>
                      • <strong>useMemo:</strong> Expensive calculations cached
                      (waveform data, AI responses)
                    </li>
                    <li>
                      • <strong>Lazy Loading:</strong> Speech synthesis only
                      loaded when needed
                    </li>
                    <li>
                      • <strong>Debouncing:</strong> Transcript processing
                      debounced to reduce API calls
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Showcase Mode Tab */}
          <TabsContent value="showcase" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Showcase Mode</CardTitle>
                <CardDescription>
                  Understanding and implementing showcase mode for demos and
                  documentation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    What is Showcase Mode?
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Showcase mode allows the component to display specific
                    states and behaviors without requiring actual user
                    interaction or microphone access. It's perfect for
                    documentation, demos, and testing.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Key Differences in Showcase Mode
                  </h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Static Waveforms</h4>
                      <p className="text-sm text-slate-600">
                        Uses StaticWaveform component instead of
                        WaveformVisualizer. No microphone access required.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">State Override</h4>
                      <p className="text-sm text-slate-600">
                        Component respects default state props (defaultState,
                        defaultInputMode) instead of internal state changes.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Button Behavior</h4>
                      <p className="text-sm text-slate-600">
                        Uses inputState for button display logic instead of
                        speech recognition hook states.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Implementation Examples
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg">
                      <h4 className="text-slate-300 mb-2">
                        Voice Recording State
                      </h4>
                      <pre className="text-sm">
                        {`<VoiceTextInput
  placeholder="Speak now..."
  defaultState="listening"
  defaultInputMode="voice"
  showcaseMode
  onSubmit={() => {}}
/>`}
                      </pre>
                    </div>
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg">
                      <h4 className="text-slate-300 mb-2">Processing State</h4>
                      <pre className="text-sm">
                        {`<VoiceTextInput
  placeholder="Processing..."
  defaultState="processing"
  defaultInputMode="text"
  defaultMessage="Processing voice input..."
  showcaseMode
  onSubmit={() => {}}
/>`}
                      </pre>
                    </div>
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg">
                      <h4 className="text-slate-300 mb-2">Error State</h4>
                      <pre className="text-sm">
                        {`<VoiceTextInput
  placeholder="Type a message..."
  defaultState="error"
  defaultError="Microphone access denied"
  showcaseMode
  onSubmit={() => {}}
/>`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    StaticWaveform Configuration
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 mb-3">
                      The StaticWaveform component provides consistent visual
                      demonstrations without audio processing:
                    </p>
                    <ul className="space-y-1 text-sm text-slate-600">
                      <li>
                        • <strong>Patterns:</strong> "active", "moderate",
                        "low", "idle" for different states
                      </li>
                      <li>
                        • <strong>Styles:</strong> "compact" for voice
                        dictation, "full-width" for conversation
                      </li>
                      <li>
                        • <strong>Deterministic:</strong> Same visual output
                        every time for consistent demos
                      </li>
                      <li>
                        • <strong>Server-safe:</strong> No hydration issues,
                        works in SSR environments
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Updates Tab */}
          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Updates & Improvements</CardTitle>
                <CardDescription>
                  Latest fixes, enhancements, and improvements to the
                  VoiceTextInput component
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Latest Changes</h3>
                  <div className="space-y-4">
                    <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-2">
                        ✅ Hydration Error Fixes
                      </h4>
                      <p className="text-sm text-green-700 mb-2">
                        Fixed server/client hydration mismatches in
                        StaticWaveform component.
                      </p>
                      <ul className="text-sm text-green-600 ml-4 space-y-1">
                        <li>
                          • Rounded mathematical calculations to ensure
                          consistent floating-point results
                        </li>
                        <li>
                          • Added deterministic waveform generation for
                          server-side rendering
                        </li>
                        <li>
                          • Implemented proper client-side hydration handling
                        </li>
                      </ul>
                    </div>

                    <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">
                        🎯 Showcase Mode Enhancements
                      </h4>
                      <p className="text-sm text-blue-700 mb-2">
                        Improved showcase mode for better demonstrations and
                        documentation.
                      </p>
                      <ul className="text-sm text-blue-600 ml-4 space-y-1">
                        <li>
                          • Fixed stop button visibility in voice recording
                          states
                        </li>
                        <li>
                          • Corrected icon displays for different input modes
                        </li>
                        <li>
                          • Enhanced state transitions in showcase examples
                        </li>
                        <li>
                          • Added proper waveform visualization for compact and
                          full-width modes
                        </li>
                      </ul>
                    </div>

                    <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                      <h4 className="font-medium text-purple-800 mb-2">
                        🔧 State Management Improvements
                      </h4>
                      <p className="text-sm text-purple-700 mb-2">
                        Enhanced component state handling for better
                        reliability.
                      </p>
                      <ul className="text-sm text-purple-600 ml-4 space-y-1">
                        <li>
                          • Fixed voice dictation workflow states (Ready →
                          Active → Processing)
                        </li>
                        <li>
                          • Improved natural conversation mode toggle behavior
                        </li>
                        <li>• Enhanced input mode switching logic</li>
                        <li>• Better error state handling and display</li>
                      </ul>
                    </div>

                    <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                      <h4 className="font-medium text-orange-800 mb-2">
                        📚 Documentation Updates
                      </h4>
                      <p className="text-sm text-orange-700 mb-2">
                        Comprehensive developer documentation and examples.
                      </p>
                      <ul className="text-sm text-orange-600 ml-4 space-y-1">
                        <li>• Added complete API reference with all props</li>
                        <li>
                          • Enhanced troubleshooting guide with common issues
                        </li>
                        <li>• Detailed architecture documentation</li>
                        <li>• Showcase mode implementation examples</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Migration Notes
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Breaking Changes</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      No breaking changes in recent updates. All existing
                      implementations should continue to work.
                    </p>

                    <h4 className="font-medium mb-2">Recommended Updates</h4>
                    <ul className="space-y-1 text-sm text-slate-600">
                      <li>
                        • Update showcase examples to use the new state
                        configurations
                      </li>
                      <li>
                        • Consider using the enhanced StaticWaveform for demo
                        purposes
                      </li>
                      <li>
                        • Test hydration in your SSR applications with the new
                        deterministic calculations
                      </li>
                      <li>
                        • Review error handling patterns with the improved state
                        management
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Performance Improvements
                  </h3>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Waveform Rendering</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>
                          • Optimized SVG rendering for better performance
                        </li>
                        <li>
                          • Reduced computational overhead in showcase mode
                        </li>
                        <li>• Improved gradient and filter efficiency</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">State Updates</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Better memoization of expensive calculations</li>
                        <li>• Reduced unnecessary re-renders</li>
                        <li>• Optimized event handler callbacks</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Upcoming Features
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm text-blue-700 mb-3">
                      <strong>Planned Enhancements:</strong>
                    </p>
                    <ul className="space-y-1 text-sm text-blue-600">
                      <li>
                        🔮 Enhanced voice language detection and switching
                      </li>
                      <li>🎨 Additional waveform visualization styles</li>
                      <li>⚡ WebRTC integration for better audio quality</li>
                      <li>🌐 Improved internationalization support</li>
                      <li>📱 Enhanced mobile experience optimizations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Troubleshooting Tab */}
          <TabsContent value="troubleshooting" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Issues & Solutions</CardTitle>
                <CardDescription>
                  Troubleshooting guide for common problems and their solutions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Browser Compatibility
                  </h3>
                  <div className="space-y-4">
                    <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                      <h4 className="font-medium text-red-800 mb-2">
                        Speech Recognition Not Supported
                      </h4>
                      <p className="text-sm text-red-700 mb-2">
                        Component shows "Voice not supported" when browser
                        doesn't support Web Speech API.
                      </p>
                      <p className="text-sm text-red-600">
                        <strong>Solution:</strong> Check browser compatibility,
                        provide fallback UI, or use polyfills.
                      </p>
                    </div>
                    <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
                      <h4 className="font-medium text-amber-800 mb-2">
                        Microphone Permission Denied
                      </h4>
                      <p className="text-sm text-amber-700 mb-2">
                        User denies microphone access or browser blocks it due
                        to insecure context.
                      </p>
                      <p className="text-sm text-amber-600">
                        <strong>Solution:</strong> Ensure HTTPS in production,
                        provide clear permission instructions.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Performance Issues
                  </h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">
                        Waveform Rendering Lag
                      </h4>
                      <p className="text-sm text-slate-600 mb-2">
                        Real-time waveform updates causing performance issues on
                        lower-end devices.
                      </p>
                      <p className="text-sm text-slate-700">
                        <strong>Solutions:</strong>
                      </p>
                      <ul className="text-sm text-slate-600 ml-4 mt-1">
                        <li>• Reduce bar count in WaveformVisualizer</li>
                        <li>• Throttle animation frame updates</li>
                        <li>
                          • Use CSS transforms instead of direct DOM
                          manipulation
                        </li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Memory Leaks</h4>
                      <p className="text-sm text-slate-600 mb-2">
                        Audio streams or event listeners not properly cleaned
                        up.
                      </p>
                      <p className="text-sm text-slate-700">
                        <strong>Solutions:</strong>
                      </p>
                      <ul className="text-sm text-slate-600 ml-4 mt-1">
                        <li>
                          • Ensure useEffect cleanup functions stop audio
                          streams
                        </li>
                        <li>• Clear timeouts and intervals on unmount</li>
                        <li>• Remove event listeners in cleanup</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Hydration Issues
                  </h3>
                  <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">
                      Server/Client Mismatch
                    </h4>
                    <p className="text-sm text-blue-700 mb-2">
                      Component renders differently on server vs client, causing
                      hydration errors.
                    </p>
                    <p className="text-sm text-blue-600">
                      <strong>Solutions:</strong>
                    </p>
                    <ul className="text-sm text-blue-600 ml-4 mt-1">
                      <li>
                        • Use isClient state to conditionally render client-only
                        features
                      </li>
                      <li>
                        • Ensure StaticWaveform calculations are deterministic
                      </li>
                      <li>
                        • Use suppressHydrationWarning sparingly for unavoidable
                        differences
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Development Tips
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>
                        • <strong>Testing:</strong> Use showcase mode for
                        consistent automated testing
                      </li>
                      <li>
                        • <strong>Debugging:</strong> Check browser dev tools
                        for microphone permissions
                      </li>
                      <li>
                        • <strong>Performance:</strong> Monitor audio context
                        creation/destruction
                      </li>
                      <li>
                        • <strong>Accessibility:</strong> Test with screen
                        readers and keyboard navigation
                      </li>
                      <li>
                        • <strong>Mobile:</strong> Test touch interactions and
                        mobile browser quirks
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Debug Checklist
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Is the component in showcase mode when it should be interactive?",
                      "Are speech recognition permissions granted?",
                      "Is the site served over HTTPS in production?",
                      "Are all required props provided?",
                      "Is the browser supported for Web Speech API?",
                      "Are there any console errors related to audio context?",
                      "Is the microphone being used by another application?",
                      "Are the correct input modes and states being set?",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span className="text-sm text-slate-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
