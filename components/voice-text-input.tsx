"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Mic,
  Send,
  Keyboard,
  AlertCircle,
  Loader2,
  Volume2,
  Square,
  MicOff,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WaveformVisualizer } from "@/components/waveform-visualizer";
import { ConversationHistory } from "@/components/conversation-history";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";

// Accessibility constants
const KEYBOARD_SHORTCUTS = {
  TOGGLE_VOICE: "Alt+V",
  TOGGLE_CONVERSATION: "Alt+C",
  SEND_MESSAGE: "Ctrl+Enter",
  FOCUS_INPUT: "Alt+I",
} as const;

// Accessibility announcements
const getAccessibilityAnnouncement = (
  inputMode: string,
  conversationState: string,
  inputState: string,
  isNaturalConversationEnabled: boolean,
  error: string | null
) => {
  if (error) return `Error: ${error}`;

  if (isNaturalConversationEnabled) {
    switch (conversationState) {
      case "listening":
        return "Natural conversation mode active. Listening for your voice. Speak naturally.";
      case "processing":
        return "Processing your message. Please wait.";
      case "responding":
        return "AI is responding. Please listen.";
      case "paused":
        return "Natural conversation paused. Press Alt+C to resume or click the conversation button.";
      default:
        return "Natural conversation mode ready. Press Alt+C to start or click the conversation button.";
    }
  }

  switch (inputState) {
    case "listening":
      return "Voice input active. Speak now. Press Alt+V to stop or click the stop button.";
    case "processing":
      return "Processing your voice input. Please wait.";
    case "success":
      return "Voice input captured successfully.";
    default:
      return `${
        inputMode === "voice" ? "Voice" : "Text"
      } input mode. Press Alt+V to toggle voice input, Alt+C for conversation mode.`;
  }
};

export interface VoiceTextInputProps {
  placeholder?: string;
  onSubmit: (message: string, inputType: "voice" | "text") => void;
  onConversationMessage?: (message: string, isUser: boolean) => void;
  variant?: "chat" | "search" | "form";
  showSendButton?: boolean;
  multiline?: boolean;
  enableNaturalConversation?: boolean;
  defaultMessage?: string;
  defaultState?: "idle" | "listening" | "processing" | "error" | "success";
  defaultError?: string | null;
  defaultInputMode?: "text" | "voice" | "conversation";
  defaultIsNaturalConversationEnabled?: boolean;
  /** When true, AI responses will be spoken aloud using the browser's speech synthesis */
  defaultVoiceResponsesEnabled?: boolean;
  className?: string;
}

type InputState =
  | "idle"
  | "listening"
  | "processing"
  | "error"
  | "success"
  | "responding";
type ConversationState =
  | "inactive"
  | "listening"
  | "processing"
  | "responding"
  | "paused";

interface ConversationMessage {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export function VoiceTextInput({
  placeholder = "Type a message or speak...",
  onSubmit,
  onConversationMessage,
  variant = "chat",
  showSendButton = true,
  multiline = false,
  enableNaturalConversation = false,
  defaultMessage = "",
  defaultState = "idle",
  defaultError = null,
  defaultInputMode = "text",
  defaultIsNaturalConversationEnabled = false,
  defaultVoiceResponsesEnabled = false,
  className,
}: VoiceTextInputProps) {
  const [message, setMessage] = useState(defaultMessage);
  const [inputState, setInputState] = useState<InputState>(defaultState);
  const [conversationState, setConversationState] = useState<ConversationState>(
    defaultIsNaturalConversationEnabled ? "listening" : "inactive"
  );
  const [inputMode, setInputMode] = useState<"text" | "voice" | "conversation">(
    defaultInputMode
  );
  const [isNaturalConversationEnabled, setIsNaturalConversationEnabled] =
    useState(defaultIsNaturalConversationEnabled);

  const [error, setError] = useState<string | null>(defaultError);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [conversationHistory, setConversationHistory] = useState<
    ConversationMessage[]
  >([]);
  const [lastProcessedTranscript, setLastProcessedTranscript] = useState("");
  const [silenceTimer, setSilenceTimer] = useState<NodeJS.Timeout | null>(null);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isVoiceResponsesEnabled, setIsVoiceResponsesEnabled] = useState(
    defaultVoiceResponsesEnabled
  );

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const conversationTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const responseTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    error: speechError,
  } = useSpeechRecognition({
    continuous: inputMode === "conversation",
    interimResults: true,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Audio stream management
  const startAudioStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      setAudioStream(stream);
      return stream;
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError(
        "Microphone access denied. Please allow microphone access and try again."
      );
      setInputState("error");
      setIsNaturalConversationEnabled(false);
      return null;
    }
  }, []);

  const stopAudioStream = useCallback(() => {
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
      setAudioStream(null);
    }
  }, [audioStream]);

  // Enhanced conversation responses based on context
  const generateContextualResponse = useCallback(
    (userMessage: string, context: string[]): string => {
      const lowerMessage = userMessage.toLowerCase();

      // Greeting responses
      if (
        lowerMessage.includes("hello") ||
        lowerMessage.includes("hi") ||
        lowerMessage.includes("hey")
      ) {
        const greetings = [
          "Hello! It's great to meet you. What would you like to talk about today?",
          "Hi there! I'm excited to have a conversation with you. What's on your mind?",
          "Hey! Thanks for starting a conversation. How can I help you today?",
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
      }

      // Question responses
      if (
        lowerMessage.includes("how are you") ||
        lowerMessage.includes("how do you feel")
      ) {
        return "I'm doing well, thank you for asking! I'm here and ready to help with whatever you need. How are you doing today?";
      }

      // Help requests
      if (
        lowerMessage.includes("help") ||
        lowerMessage.includes("assist") ||
        lowerMessage.includes("support")
      ) {
        return "I'd be happy to help! I can assist with answering questions, having conversations, brainstorming ideas, or just chatting. What specifically would you like help with?";
      }

      // Technology questions
      if (
        lowerMessage.includes("technology") ||
        lowerMessage.includes("ai") ||
        lowerMessage.includes("artificial intelligence")
      ) {
        return "Technology is fascinating! AI and machine learning are rapidly evolving fields. Are you interested in learning about a specific aspect of technology, or do you have questions about how AI works?";
      }

      // Weather mentions
      if (
        lowerMessage.includes("weather") ||
        lowerMessage.includes("rain") ||
        lowerMessage.includes("sunny") ||
        lowerMessage.includes("cold") ||
        lowerMessage.includes("hot")
      ) {
        return "Weather can really affect our mood and plans! I don't have access to current weather data, but I'd love to hear about what the weather is like where you are. How's it affecting your day?";
      }

      // Work/career topics
      if (
        lowerMessage.includes("work") ||
        lowerMessage.includes("job") ||
        lowerMessage.includes("career") ||
        lowerMessage.includes("office")
      ) {
        return "Work and career topics are always interesting to discuss. Whether you're looking for advice, want to share experiences, or need to brainstorm solutions, I'm here to listen and help. What's going on with work?";
      }

      // Hobbies and interests
      if (
        lowerMessage.includes("hobby") ||
        lowerMessage.includes("interest") ||
        lowerMessage.includes("passion") ||
        lowerMessage.includes("love doing")
      ) {
        return "I love hearing about people's hobbies and passions! They say so much about who we are. What activities bring you joy and fulfillment? I'd love to learn more about what you're passionate about.";
      }

      // Context-aware responses
      if (context.length > 0) {
        const lastTopic = context[context.length - 1];
        if (lastTopic.includes("technology")) {
          return "That's a great point about technology! It's amazing how it continues to shape our daily lives. What aspect interests you most?";
        }
        if (lastTopic.includes("work")) {
          return "Work-life balance is so important. It sounds like you have some interesting perspectives on this. How do you manage it all?";
        }
      }

      // General conversational responses
      const responses = [
        "That's really interesting! Can you tell me more about your thoughts on that?",
        "I appreciate you sharing that with me. What led you to that perspective?",
        "That's a fascinating point. How do you think that impacts other areas of your life?",
        "Thanks for bringing that up! It's something I find quite thought-provoking. What's your experience been like?",
        "That's a great observation. I'm curious - what made you think about that today?",
        "I find that really compelling. Have you always felt that way, or has your perspective evolved?",
        "That's such an insightful way to look at it. What do you think others might think about this topic?",
        "I love how you've framed that. It makes me wonder - what would you say to someone who disagreed?",
        "That's a wonderful point to consider. How do you think this might change in the future?",
        "Thank you for sharing that perspective. What advice would you give to someone dealing with something similar?",
      ];

      return responses[Math.floor(Math.random() * responses.length)];
    },
    []
  );

  // Function to speak AI responses
  const speakResponse = useCallback(
    (text: string) => {
      if (!isVoiceResponsesEnabled || !isClient) return;

      try {
        // Cancel any ongoing speech
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Use a more natural voice if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(
          (voice) =>
            voice.name.includes("Google") ||
            voice.name.includes("Natural") ||
            voice.name.includes("Female") ||
            voice.name.includes("Samantha")
        );

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error("Error using speech synthesis:", err);
      }
    },
    [isVoiceResponsesEnabled, isClient]
  );

  // Toggle voice responses
  const toggleVoiceResponses = useCallback(() => {
    setIsVoiceResponsesEnabled((prev) => !prev);
  }, []);

  // Modified onConversationMessage handler to include speech
  const handleConversationMessage = useCallback(
    (message: string, isUser: boolean) => {
      if (onConversationMessage) {
        onConversationMessage(message, isUser);
      }

      // Add to conversation history
      setConversationHistory((prev) => [
        ...prev,
        { message, isUser, timestamp: new Date() },
      ]);

      // Speak AI responses
      if (!isUser) {
        speakResponse(message);
      }
    },
    [onConversationMessage, speakResponse]
  );

  // Update to handle speaking AI responses when received
  useEffect(() => {
    if (conversationHistory.length > 0) {
      const lastMessage = conversationHistory[conversationHistory.length - 1];
      if (!lastMessage.isUser) {
        speakResponse(lastMessage.message);
      }
    }
  }, [conversationHistory, speakResponse]);

  // Handle natural conversation toggle
  const handleNaturalConversationToggle = useCallback(async () => {
    const newState = !isNaturalConversationEnabled;
    setIsNaturalConversationEnabled(newState);

    if (newState) {
      // Switch to conversation mode
      if (!isSupported) {
        setError("Speech recognition is not supported in this browser");
        setIsNaturalConversationEnabled(false);
        return;
      }

      setInputMode("conversation");
      setConversationState("listening");
      resetTranscript();
      setMessage("");
      setLastProcessedTranscript("");
      setError(null);
      setConversationContext([]);

      const stream = await startAudioStream();
      if (stream) {
        startListening();
      }
    } else {
      // Switch back to text mode
      setInputMode("text");
      setConversationState("inactive");
      stopListening();
      stopAudioStream();
      setMessage("");
      resetTranscript();
      setLastProcessedTranscript("");

      if (conversationTimeoutRef.current) {
        clearTimeout(conversationTimeoutRef.current);
      }
      if (responseTimeoutRef.current) {
        clearTimeout(responseTimeoutRef.current);
      }
      if (silenceTimer) {
        clearTimeout(silenceTimer);
      }
    }
  }, [
    isNaturalConversationEnabled,
    isSupported,
    startListening,
    resetTranscript,
    stopListening,
    stopAudioStream,
    startAudioStream,
  ]);

  const handleStartListening = useCallback(async () => {
    if (!isSupported) {
      setError("Speech recognition is not supported in this browser");
      setInputState("error");
      return;
    }

    setInputMode("voice");
    resetTranscript();
    setMessage("");
    setLastProcessedTranscript("");
    setError(null);

    const stream = await startAudioStream();
    if (stream) {
      startListening();
    }
  }, [isSupported, startListening, resetTranscript, startAudioStream]);

  const handleStopListening = useCallback(() => {
    stopListening();
    stopAudioStream();

    if (transcript && inputMode !== "conversation") {
      setInputState("processing");
      // Simulate processing time for better UX
      setTimeout(() => {
        setInputState("success");
        setTimeout(() => setInputState("idle"), 1000);
      }, 500);
    }
  }, [stopListening, stopAudioStream, transcript, inputMode]);

  const handleConversationInput = useCallback(
    (userMessage: string) => {
      if (!userMessage.trim() || userMessage === lastProcessedTranscript)
        return;

      setConversationState("processing");
      setLastProcessedTranscript(userMessage);

      // Use our modified handler for the user message
      handleConversationMessage(userMessage, true);

      // Add to conversation context
      setConversationContext((prev) => [...prev.slice(-4), userMessage]); // Keep last 5 messages for context

      // Reset transcript and message
      resetTranscript();
      setMessage("");

      // Generate contextual AI response
      responseTimeoutRef.current = setTimeout(() => {
        setConversationState("responding");
        const aiResponse = generateContextualResponse(
          userMessage,
          conversationContext
        );

        // Use our handler for the AI response
        handleConversationMessage(aiResponse, false);

        // Add AI response to context
        setConversationContext((prev) => [...prev.slice(-4), aiResponse]);

        // Resume listening after AI response
        setTimeout(() => {
          if (inputMode === "conversation" && isNaturalConversationEnabled) {
            setConversationState("listening");
            setLastProcessedTranscript("");
            // Continue listening without restarting audio stream
            if (!isListening) {
              startListening();
            }
          }
        }, 2500); // Slightly longer pause for AI response
      }, Math.random() * 1000 + 1000); // Random delay between 1-2 seconds for more natural feel
    },
    [
      handleConversationMessage,
      resetTranscript,
      inputMode,
      isNaturalConversationEnabled,
      isListening,
      startListening,
      lastProcessedTranscript,
      conversationContext,
      generateContextualResponse,
    ]
  );

  const handleSubmit = useCallback(() => {
    if (message.trim()) {
      if (inputMode === "conversation") {
        // Use our handler for the user message
        handleConversationMessage(message.trim(), true);

        // Generate AI response for manual conversation input
        setTimeout(() => {
          const aiResponse = generateContextualResponse(
            message.trim(),
            conversationContext
          );

          // Use our handler for the AI response
          handleConversationMessage(aiResponse, false);
        }, 1500);
      } else {
        // Normal submit - also generate a response for demo
        onSubmit(message.trim(), inputMode === "voice" ? "voice" : "text");

        // Use our handler for the user message
        handleConversationMessage(message.trim(), true);

        // Generate AI response
        setTimeout(() => {
          const aiResponse = generateContextualResponse(
            message.trim(),
            conversationContext
          );

          // Use our handler for the AI response
          handleConversationMessage(aiResponse, false);
        }, 1200);
      }

      setMessage("");
      resetTranscript();
      setLastProcessedTranscript("");
      setInputState("idle");

      if (inputMode !== "conversation") {
        setInputMode("text");
        stopAudioStream();
      }
    }
  }, [
    message,
    inputMode,
    onSubmit,
    handleConversationMessage,
    resetTranscript,
    stopAudioStream,
    conversationContext,
    generateContextualResponse,
  ]);

  const switchToTextMode = useCallback(() => {
    if (isListening) {
      handleStopListening();
    }
    if (isNaturalConversationEnabled) {
      setIsNaturalConversationEnabled(false);
      setConversationState("inactive");
    }
    setInputMode("text");
    setInputState("idle");
    setLastProcessedTranscript("");
    inputRef.current?.focus();
  }, [isListening, handleStopListening, isNaturalConversationEnabled]);

  // Enhanced speech detection for natural mode
  useEffect(() => {
    if (inputMode === "conversation" && transcript) {
      // Clear existing silence timer
      if (silenceTimer) {
        clearTimeout(silenceTimer);
      }

      // Set new silence timer - shorter for more responsive conversation
      const timer = setTimeout(() => {
        if (transcript.trim() && transcript !== lastProcessedTranscript) {
          handleConversationInput(transcript.trim());
        }
      }, 1500); // Reduced from 2000ms for more responsive conversation

      setSilenceTimer(timer);
    }

    return () => {
      if (silenceTimer) {
        clearTimeout(silenceTimer);
      }
    };
  }, [transcript, inputMode, lastProcessedTranscript, handleConversationInput]);

  // Update message when transcript changes (prevent duplication)
  useEffect(() => {
    if (transcript && inputMode === "voice") {
      if (transcript !== lastProcessedTranscript) {
        setMessage(transcript);
      }
    }
  }, [transcript, inputMode, lastProcessedTranscript]);

  // Handle speech recognition errors
  useEffect(() => {
    if (speechError) {
      setError(speechError);
      setInputState("error");
      if (inputMode === "conversation") {
        setConversationState("paused");
      }
      stopAudioStream();
    }
  }, [speechError, inputMode, stopAudioStream]);

  // Update input state based on listening status
  useEffect(() => {
    if (inputMode !== "conversation") {
      if (isListening) {
        setInputState("listening");
        setError(null);
      } else if (inputState === "listening") {
        setInputState("idle");
      }
    }
  }, [isListening, inputState, inputMode]);

  // Add a useEffect to ensure initial values match between server and client
  useEffect(() => {
    // This ensures we only set these values on the client side
    if (typeof window !== "undefined") {
      // Reset to initial state to ensure hydration consistency
      setInputState(defaultState);
      setInputMode(defaultInputMode);
      setIsNaturalConversationEnabled(defaultIsNaturalConversationEnabled);
      setConversationState(
        defaultIsNaturalConversationEnabled ? "listening" : "inactive"
      );
    }
  }, [defaultState, defaultInputMode, defaultIsNaturalConversationEnabled]);

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        // Only allow Ctrl+Enter for sending
        if (e.ctrlKey && e.key === "Enter") {
          e.preventDefault();
          handleSubmit();
        }
        return;
      }

      if (e.altKey && e.key.toLowerCase() === "v") {
        e.preventDefault();
        if (inputMode === "text") {
          handleStartListening();
        } else if (inputMode === "voice") {
          handleStopListening();
        }
      }

      if (
        e.altKey &&
        e.key.toLowerCase() === "c" &&
        enableNaturalConversation
      ) {
        e.preventDefault();
        handleNaturalConversationToggle();
      }

      if (e.altKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    inputMode,
    handleStartListening,
    handleStopListening,
    handleNaturalConversationToggle,
    handleSubmit,
    enableNaturalConversation,
  ]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !multiline) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const getStateColor = () => {
    if (inputMode === "conversation") {
      switch (conversationState) {
        case "listening":
          return "text-blue-600";
        case "processing":
          return "text-amber-600";
        case "responding":
          return "text-purple-600";
        case "paused":
          return "text-orange-600";
        default:
          return "text-slate-600";
      }
    }

    switch (inputState) {
      case "listening":
        return "text-blue-600";
      case "processing":
        return "text-amber-600";
      case "error":
        return "text-red-600";
      case "success":
        return "text-emerald-600";
      default:
        return "text-slate-600";
    }
  };

  const getStateBorder = () => {
    if (inputMode === "conversation") {
      switch (conversationState) {
        case "listening":
          return "border-blue-300 ring-2 ring-blue-100 shadow-lg shadow-blue-100/50";
        case "processing":
          return "border-amber-300 ring-2 ring-amber-100 shadow-lg shadow-amber-100/50";
        case "responding":
          return "border-purple-300 ring-2 ring-purple-100 shadow-lg shadow-purple-100/50";
        case "paused":
          return "border-orange-300 ring-2 ring-orange-100 shadow-lg shadow-orange-100/50";
        default:
          return "border-slate-200";
      }
    }

    switch (inputState) {
      case "listening":
        return "border-blue-300 ring-2 ring-blue-100 shadow-lg shadow-blue-100/50";
      case "processing":
        return "border-amber-300 ring-2 ring-amber-100 shadow-lg shadow-amber-100/50";
      case "error":
        return "border-red-300 ring-2 ring-red-100 shadow-lg shadow-red-100/50";
      case "success":
        return "border-emerald-300 ring-2 ring-emerald-100 shadow-lg shadow-emerald-100/50";
      default:
        return "border-slate-200 focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-slate-100";
    }
  };

  const getStateBackground = () => {
    if (inputMode === "conversation") {
      switch (conversationState) {
        case "listening":
          return "bg-gradient-to-r from-blue-50/80 to-indigo-50/80";
        case "processing":
          return "bg-gradient-to-r from-amber-50/80 to-orange-50/80";
        case "responding":
          return "bg-gradient-to-r from-purple-50/80 to-pink-50/80";
        case "paused":
          return "bg-gradient-to-r from-orange-50/80 to-red-50/80";
        default:
          return "";
      }
    }

    if (inputMode === "voice" && isListening) {
      return "bg-gradient-to-r from-blue-50/70 to-indigo-50/70";
    }

    return "";
  };

  const InputComponent = multiline ? Textarea : Input;

  // Get status text for natural mode
  const getNaturalModeStatusText = () => {
    switch (conversationState) {
      case "listening":
        return "Listening... Speak naturally";
      case "processing":
        return "Processing your message...";
      case "responding":
        return "AI is responding...";
      case "paused":
        return "Conversation paused";
      default:
        return "Natural conversation mode";
    }
  };

  // Check if we should show waveform
  const shouldShowWaveform =
    ((inputMode === "voice" && isListening) ||
      (inputMode === "conversation" && isListening)) &&
    audioStream;

  // Determine if we should show full-width waveform (natural mode) or compact waveform (dictation mode)
  const isFullWidthWaveform = inputMode === "conversation";

  return (
    <TooltipProvider delayDuration={300} skipDelayDuration={100}>
      <div
        className={cn("space-y-4", className)}
        role="region"
        aria-label="Voice and text input interface"
      >
        {/* Conversation History - Always show if there are messages */}
        {conversationHistory.length > 0 && (
          <ConversationHistory
            messages={conversationHistory}
            conversationState={conversationState}
            className="mb-4"
            aria-label="Conversation history"
          />
        )}

        {/* Streamlined Input Container */}
        <div
          className={cn(
            "relative flex flex-col rounded-lg border transition-all duration-300",
            getStateBorder(),
            variant === "search" && "rounded-full",
            variant === "form" && "min-h-[120px]"
          )}
          role="group"
          aria-label="Message input area"
        >
          {/* Status Bar for Natural Mode - Only visible in natural mode */}
          {isNaturalConversationEnabled && (
            <div
              className={cn(
                "flex items-center justify-between px-3 py-2 sm:py-1.5 border-b",
                getStateBackground(),
                conversationState === "listening" && "animate-pulse"
              )}
              role="status"
              aria-live="polite"
              aria-label="Natural conversation status"
            >
              <div className="flex items-center gap-2">
                {/* Status Indicator */}
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    conversationState === "listening" &&
                      "bg-blue-500 animate-pulse",
                    conversationState === "processing" && "bg-amber-500",
                    conversationState === "responding" && "bg-purple-500",
                    conversationState === "paused" && "bg-orange-500"
                  )}
                  aria-hidden="true"
                />
                <span
                  className="text-sm sm:text-xs font-medium"
                  id="conversation-status"
                >
                  {getNaturalModeStatusText()}
                </span>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="relative flex items-center gap-2 p-3 sm:gap-2 sm:p-3">
            {/* Full-width Waveform Background for Natural Mode */}
            {shouldShowWaveform && isFullWidthWaveform && (
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
                aria-hidden="true"
                role="img"
                aria-label="Audio waveform visualization showing voice activity"
              >
                <div
                  className={cn(
                    "absolute inset-0 transition-all duration-500",
                    getStateBackground()
                  )}
                />
                <WaveformVisualizer
                  audioStream={audioStream}
                  isActive={isListening}
                  className="absolute inset-0"
                  color={
                    inputMode === "conversation"
                      ? conversationState === "listening"
                        ? "#6366f1"
                        : "#9333ea"
                      : "#3b82f6"
                  }
                  barCount={40}
                  barWidth={2}
                  barGap={3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
              </div>
            )}

            {/* Compact Waveform for Voice Dictation Mode */}
            {shouldShowWaveform && !isFullWidthWaveform && (
              <div
                className="flex-shrink-0 w-12 h-8 rounded-md overflow-hidden border border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100"
                aria-hidden="true"
                role="img"
                aria-label="Compact audio waveform showing voice input activity"
              >
                <WaveformVisualizer
                  audioStream={audioStream}
                  isActive={isListening}
                  className="w-full h-full"
                  color="#3b82f6"
                  barCount={12}
                  barWidth={2}
                  barGap={1}
                />
              </div>
            )}

            {/* Text Input */}
            <InputComponent
              ref={inputRef as any}
              value={isNaturalConversationEnabled ? "" : message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (inputMode === "voice") setInputMode("text");
              }}
              onKeyDown={handleKeyPress}
              placeholder={
                isNaturalConversationEnabled
                  ? "" // No placeholder in natural mode
                  : inputMode === "voice" && transcript
                  ? "Processing speech..."
                  : placeholder
              }
              className={cn(
                "flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 resize-none text-base sm:text-sm",
                multiline && "min-h-[80px]",
                (inputMode === "voice" || inputMode === "conversation") &&
                  isListening &&
                  "text-blue-900 font-medium",
                isNaturalConversationEnabled && "cursor-not-allowed",
                isFullWidthWaveform && isListening && "relative z-10"
              )}
              disabled={
                (inputMode === "voice" || inputMode === "conversation") &&
                isListening
              }
              readOnly={isNaturalConversationEnabled}
              aria-label="Message input field"
              aria-describedby="input-help input-status"
              aria-invalid={error ? "true" : "false"}
              role="textbox"
              aria-multiline={multiline}
            />

            {/* Controls */}
            <div
              className="relative z-50 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-md p-1 shadow-sm border border-slate-200/50 shrink-0"
              role="toolbar"
              aria-label="Input controls"
            >
              {/* Natural Conversation Toggle */}
              {enableNaturalConversation && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleNaturalConversationToggle}
                      className={cn(
                        "shrink-0 h-9 w-9 sm:h-8 sm:w-8 p-0 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 touch-manipulation",
                        isNaturalConversationEnabled
                          ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 shadow-sm"
                          : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50",
                        !isSupported &&
                          isClient &&
                          "opacity-50 cursor-not-allowed"
                      )}
                      disabled={isClient && !isSupported}
                      aria-label={`${
                        isNaturalConversationEnabled ? "Disable" : "Enable"
                      } natural conversation mode`}
                      aria-pressed={isNaturalConversationEnabled}
                    >
                      <MessageCircle
                        className={cn(
                          "h-4 w-4 transition-all duration-200",
                          isNaturalConversationEnabled && "animate-pulse"
                        )}
                        aria-hidden="true"
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="z-[9999] bg-gray-900 text-white shadow-xl">
                    <div className="text-center">
                      <p className="font-medium">
                        {isNaturalConversationEnabled
                          ? "Natural Conversation Active"
                          : "Natural Conversation"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isNaturalConversationEnabled
                          ? "Currently in hands-free conversation mode. Click to disable and return to manual input."
                          : "Enable continuous voice conversation. Speak naturally and the AI will respond automatically without needing to press buttons."}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}

              {/* Voice/Text Toggle (only show if not in natural conversation mode) */}
              {!isNaturalConversationEnabled && (
                <>
                  {inputMode === "voice" && isListening ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleStopListening}
                          className={cn(
                            "shrink-0 h-9 w-9 sm:h-8 sm:w-8 p-0 animate-pulse focus:ring-2 focus:ring-red-500 focus:ring-offset-1 touch-manipulation",
                            "bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700"
                          )}
                          aria-label="Stop voice input and process speech"
                        >
                          <Square
                            className="h-4 w-4 fill-current"
                            aria-hidden="true"
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="z-[9999] bg-gray-900 text-white shadow-xl">
                        <div className="text-center">
                          <p className="font-medium">Stop Voice Input</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Stop listening and process the speech you've
                            recorded. Your speech will be converted to text.
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={
                            inputMode === "text"
                              ? handleStartListening
                              : switchToTextMode
                          }
                          className={cn(
                            "shrink-0 h-9 w-9 sm:h-8 sm:w-8 p-0 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 touch-manipulation",
                            inputMode === "voice"
                              ? "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                              : "text-slate-600 hover:text-blue-600 hover:bg-blue-50",
                            !isSupported &&
                              isClient &&
                              "opacity-50 cursor-not-allowed"
                          )}
                          aria-label={
                            inputMode === "text"
                              ? "Start voice input"
                              : "Switch to text input"
                          }
                          disabled={isClient && !isSupported}
                        >
                          {inputMode === "text" ? (
                            <Mic className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <Keyboard className="h-4 w-4" aria-hidden="true" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="z-[9999] bg-gray-900 text-white shadow-xl">
                        <div className="text-center">
                          <p className="font-medium">
                            {inputMode === "text"
                              ? "Voice Input"
                              : "Switch to Text"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {inputMode === "text"
                              ? "Click and speak to dictate your message. Your speech will be converted to text in real-time."
                              : "Switch back to keyboard typing mode for manual text input."}
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </>
              )}

              {/* Send Button */}
              {showSendButton && !isNaturalConversationEnabled && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={
                        isClient
                          ? !message.trim() ||
                            inputState === "processing" ||
                            conversationState === "processing"
                          : undefined
                      }
                      size="sm"
                      className={cn(
                        "shrink-0 h-9 w-9 sm:h-8 sm:w-8 p-0 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 touch-manipulation",
                        message.trim()
                          ? isNaturalConversationEnabled
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-slate-100 text-slate-400"
                      )}
                      aria-label="Send message"
                    >
                      {isClient &&
                      (inputState === "processing" ||
                        conversationState === "processing") ? (
                        <Loader2
                          className="h-4 w-4 animate-spin"
                          aria-hidden="true"
                        />
                      ) : (
                        <Send className="h-4 w-4" aria-hidden="true" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="z-[9999] bg-gray-900 text-white shadow-xl">
                    <div className="text-center">
                      <p className="font-medium">Send Message</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.trim()
                          ? "Send your message to start or continue the conversation"
                          : "Type or speak a message first before sending"}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          {/* Compact Status Indicator - Only for non-natural mode */}
          {!isNaturalConversationEnabled && (
            <div
              className="flex items-center justify-between text-sm sm:text-xs px-3 py-2 sm:py-1 border-t"
              role="status"
              aria-live="polite"
            >
              <div className="flex items-center gap-2">
                {/* Make sure we use the same structure during hydration by checking
                    if we're on the client */}
                {isClient ? (
                  <>
                    {inputState === "listening" && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <div className="flex items-center gap-1">
                          <div
                            className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"
                            aria-hidden="true"
                          />
                          <div
                            className="w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-100"
                            aria-hidden="true"
                          />
                        </div>
                        <span className="font-medium">
                          Listening... Speak now
                        </span>
                      </div>
                    )}
                    {inputState === "processing" && (
                      <div className="flex items-center gap-2 text-amber-600">
                        <Loader2
                          className="w-3 h-3 animate-spin"
                          aria-hidden="true"
                        />
                        <span>Processing speech...</span>
                      </div>
                    )}
                    {inputState === "success" && (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <Volume2 className="w-3 h-3" aria-hidden="true" />
                        <span>Voice captured successfully</span>
                      </div>
                    )}
                    {inputState === "idle" && inputMode === "text" && (
                      <div className="flex items-center gap-2 text-slate-500">
                        <Keyboard className="w-3 h-3" aria-hidden="true" />
                        <span>Ready to type or speak</span>
                      </div>
                    )}
                    {error && (
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-3 h-3" aria-hidden="true" />
                        <span className="truncate max-w-xs">{error}</span>
                      </div>
                    )}
                    {!isSupported && (
                      <div className="flex items-center gap-2 text-amber-600">
                        <MicOff className="w-3 h-3" aria-hidden="true" />
                        <span>Speech recognition not supported</span>
                      </div>
                    )}
                  </>
                ) : (
                  // Static placeholder for server-side rendering
                  <div className="flex items-center gap-2 text-slate-500">
                    <Keyboard className="w-3 h-3" aria-hidden="true" />
                    <span>Ready to type or speak</span>
                  </div>
                )}
              </div>

              <div className="text-slate-400 flex items-center gap-2">
                <button
                  onClick={toggleVoiceResponses}
                  className="text-slate-600 hover:text-indigo-600 hover:underline"
                  aria-label={`${
                    isVoiceResponsesEnabled ? "Turn off" : "Turn on"
                  } voice responses`}
                >
                  {isVoiceResponsesEnabled ? "Turn off" : "Turn on"} voice
                  responses
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Accessibility Instructions */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {getAccessibilityAnnouncement(
            inputMode,
            conversationState,
            inputState,
            isNaturalConversationEnabled,
            error
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}

// Make sure to export the component properly
export default VoiceTextInput;
