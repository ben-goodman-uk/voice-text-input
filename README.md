# VoiceTextInput - Modern Voice & Text Interface

_A sophisticated React component combining text input, voice dictation, and natural conversation capabilities_

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/bengoodmanuks-projects/v0-microphone-and-text-redesign)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/H5E1XTpqbJM)

## Overview

The VoiceTextInput component is a comprehensive React solution for modern voice and text interaction. It seamlessly combines traditional text input with advanced voice recognition capabilities, including natural conversation mode with AI integration.

## 🚀 Features

- **📝 Text Input** - Standard keyboard input with customizable placeholders
- **🎤 Voice Dictation** - Speech-to-text conversion with visual feedback
- **🤖 Natural Conversation** - Continuous AI conversation with voice responses
- **📊 Real-time Waveform** - Visual audio feedback during voice input
- **🎨 Multiple Variants** - Chat, search, and form interface styles
- **♿ Accessibility** - Full screen reader and keyboard navigation support
- **🎯 Showcase Mode** - Demo mode for documentation and presentations
- **📱 Mobile Friendly** - Optimized for touch interactions

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📖 Documentation

Visit the comprehensive developer documentation at `/docs` or [view online](https://vercel.com/bengoodmanuks-projects/v0-microphone-and-text-redesign/docs).

The documentation includes:

- **API Reference** - Complete props interface and usage examples
- **States & Modes** - Understanding component states and input modes
- **Architecture** - Component structure and data flow
- **Showcase Mode** - Implementation guide for demos
- **Troubleshooting** - Common issues and solutions
- **Recent Updates** - Latest improvements and fixes

## 🎯 Usage Example

```tsx
import { VoiceTextInput } from "@/components/voice-text-input";

function ChatInterface() {
  const handleSubmit = (message: string, inputType: "voice" | "text") => {
    // Handle submitted message
    console.log(`Received ${inputType} message:`, message);
  };

  const handleConversation = (message: string, isUser: boolean) => {
    // Handle conversation messages
    console.log(`${isUser ? "User" : "AI"}:`, message);
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
}
```

## 🎪 Live Demo

- **Main Interface**: [https://vercel.com/bengoodmanuks-projects/v0-microphone-and-text-redesign](https://vercel.com/bengoodmanuks-projects/v0-microphone-and-text-redesign)
- **Component Showcase**: `/showcase` - View all variants and states
- **Developer Docs**: `/docs` - Comprehensive documentation

## 🏗️ Project Structure

```
├── components/
│   ├── voice-text-input.tsx           # Main component
│   ├── waveform-visualizer.tsx        # Real-time audio visualization
│   ├── static-waveform.tsx            # Static demo waveforms
│   ├── conversation-history.tsx       # Message history
│   └── ui/                            # Shared UI components
├── hooks/
│   └── use-speech-recognition.ts      # Speech recognition hook
├── app/
│   ├── page.tsx                       # Main demo page
│   ├── showcase/                      # Component showcase
│   └── docs/                          # Developer documentation
└── styles/
    └── globals.css                    # Global styles
```

## 🔧 Key Technologies

- **React 18** - Modern React with hooks
- **Next.js 15** - Full-stack React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Web Speech API** - Browser speech recognition
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible UI primitives

## 🌟 Recent Updates

- ✅ Fixed hydration errors in StaticWaveform component
- 🎯 Enhanced showcase mode with proper state handling
- 🔧 Improved voice dictation workflow states
- 📚 Added comprehensive developer documentation
- ⚡ Performance optimizations for waveform rendering

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Run type checking: `npx tsc --noEmit`
5. Submit a pull request

## 📝 License

This project is built with [v0.dev](https://v0.dev) and deployed on Vercel.

## 🔗 Links

- **Live Demo**: [https://vercel.com/bengoodmanuks-projects/v0-microphone-and-text-redesign](https://vercel.com/bengoodmanuks-projects/v0-microphone-and-text-redesign)
- **v0.dev Project**: [https://v0.dev/chat/projects/H5E1XTpqbJM](https://v0.dev/chat/projects/H5E1XTpqbJM)
- **Documentation**: Visit `/docs` for comprehensive developer guide
