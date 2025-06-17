"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Mic,
  Send,
  Keyboard,
  AlertCircle,
  Loader2,
  Volume2,
  Square,
  MessageCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StaticWaveform } from "@/components/static-waveform";

interface StaticVoiceInputProps {
  placeholder?: string;
  variant?: "chat" | "search" | "form";
  showSendButton?: boolean;
  multiline?: boolean;
  enableNaturalConversation?: boolean;
  message?: string;
  state?: "idle" | "listening" | "processing" | "error" | "success";
  error?: string;
  inputMode?: "text" | "voice" | "conversation";
  isNaturalConversationEnabled?: boolean;
  showTranscriptInNaturalMode?: boolean;
  showWaveform?: boolean;
  waveformPattern?: "active" | "moderate" | "low" | "idle";
  className?: string;
  conversationHistory?: Array<{
    message: string;
    isUser: boolean;
    timestamp: string;
  }>;
}

export function StaticVoiceInput({
  placeholder = "Type a message or speak...",
  variant = "chat",
  showSendButton = true,
  multiline = false,
  enableNaturalConversation = false,
  message = "",
  state = "idle",
  error,
  inputMode = "text",
  isNaturalConversationEnabled = false,
  showTranscriptInNaturalMode = false,
  showWaveform = false,
  waveformPattern = "active",
  className,
  conversationHistory = [],
}: StaticVoiceInputProps) {
  const getStateColor = () => {
    if (inputMode === "conversation") {
      switch (state) {
        case "listening":
          return "text-blue-600";
        case "processing":
          return "text-amber-600";
        case "error":
          return "text-red-600";
        default:
          return "text-slate-600";
      }
    }

    switch (state) {
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
      switch (state) {
        case "listening":
          return "border-blue-300 ring-2 ring-blue-100 shadow-lg shadow-blue-100/50";
        case "processing":
          return "border-amber-300 ring-2 ring-amber-100 shadow-lg shadow-amber-100/50";
        case "error":
          return "border-red-300 ring-2 ring-red-100 shadow-lg shadow-red-100/50";
        default:
          return "border-slate-200";
      }
    }

    switch (state) {
      case "listening":
        return "border-blue-300 ring-2 ring-blue-100 shadow-lg shadow-blue-100/50";
      case "processing":
        return "border-amber-300 ring-2 ring-amber-100 shadow-lg shadow-amber-100/50";
      case "error":
        return "border-red-300 ring-2 ring-red-100 shadow-lg shadow-red-100/50";
      case "success":
        return "border-emerald-300 ring-2 ring-emerald-100 shadow-lg shadow-emerald-100/50";
      default:
        return "border-slate-200";
    }
  };

  const getStateBackground = () => {
    if (inputMode === "conversation") {
      switch (state) {
        case "listening":
          return "bg-gradient-to-r from-blue-50/80 to-indigo-50/80";
        case "processing":
          return "bg-gradient-to-r from-amber-50/80 to-orange-50/80";
        case "error":
          return "bg-gradient-to-r from-red-50/80 to-red-50/80";
        default:
          return "";
      }
    }

    if (inputMode === "voice" && state === "listening") {
      return "bg-gradient-to-r from-blue-50/70 to-indigo-50/70";
    }

    return "";
  };

  const InputComponent = multiline ? Textarea : Input;

  const getNaturalModeStatusText = () => {
    switch (state) {
      case "listening":
        return "Listening...";
      case "processing":
        return "Processing...";
      case "error":
        return "Conversation paused";
      default:
        return "Conversation mode";
    }
  };

  const shouldShowWaveform =
    showWaveform && (inputMode === "voice" || inputMode === "conversation");
  const isFullWidthWaveform = inputMode === "conversation";

  return (
    <TooltipProvider delayDuration={300} skipDelayDuration={100}>
      <div className={cn("space-y-4", className)}>
        {/* Conversation History */}
        {conversationHistory.length > 0 && (
          <div className="border rounded-lg bg-white/50 backdrop-blur-sm">
            <div className="p-3 border-b bg-gradient-to-r from-indigo-50/80 to-purple-50/80 rounded-t-lg">
              <h4 className="font-medium text-slate-900 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-indigo-600" />
                Conversation History
                <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Active
                </div>
              </h4>
            </div>
            <div className="p-3 space-y-3 max-h-48 overflow-y-auto">
              {conversationHistory.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex gap-3",
                    msg.isUser ? "justify-end" : "justify-start"
                  )}
                >
                  {!msg.isUser && (
                    <div className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">A</span>
                    </div>
                  )}
                  <div
                    className={cn(
                      "flex flex-col gap-1",
                      msg.isUser ? "items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] px-3 py-2 rounded-lg text-sm",
                        msg.isUser
                          ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-sm"
                          : "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-900 rounded-bl-sm border"
                      )}
                    >
                      {msg.message}
                    </div>
                    <span className="text-xs text-slate-400">
                      {msg.timestamp}
                    </span>
                  </div>
                  {msg.isUser && (
                    <div className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">U</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Container */}
        <div
          className={cn(
            "relative flex flex-col rounded-lg border transition-all duration-300",
            getStateBorder(),
            variant === "search" && "rounded-full",
            variant === "form" && "min-h-[120px]"
          )}
        >
          {/* Status Bar for Natural Mode */}
          {isNaturalConversationEnabled && (
            <div
              className={cn(
                "flex items-center justify-between px-3 py-1.5 border-b",
                getStateBackground(),
                state === "listening" && "animate-pulse"
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    state === "listening" && "bg-blue-500 animate-pulse",
                    state === "processing" && "bg-amber-500",
                    state === "error" && "bg-red-500"
                  )}
                />
                <span className="text-xs font-medium">
                  {getNaturalModeStatusText()}
                </span>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-slate-500 hover:text-indigo-600"
              >
                {showTranscriptInNaturalMode ? (
                  <Eye className="h-3 w-3" />
                ) : (
                  <EyeOff className="h-3 w-3" />
                )}
              </Button>
            </div>
          )}

          {/* Input Area */}
          <div className="relative flex items-center gap-2 p-3">
            {/* Full-width Waveform Background */}
            {shouldShowWaveform && isFullWidthWaveform && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                <div
                  className={cn(
                    "absolute inset-0 transition-all duration-500",
                    getStateBackground()
                  )}
                />
                <div className="absolute inset-0 flex items-center px-4">
                  <StaticWaveform
                    pattern={waveformPattern}
                    color={inputMode === "conversation" ? "#6366f1" : "#3b82f6"}
                    barCount={40}
                    barWidth={2}
                    barGap={3}
                    style="full-width"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
              </div>
            )}

            {/* Compact Waveform */}
            {shouldShowWaveform && !isFullWidthWaveform && (
              <div className="flex-shrink-0 w-12 h-8 rounded-md overflow-hidden border border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 flex items-center justify-center">
                <StaticWaveform
                  pattern={waveformPattern}
                  color="#3b82f6"
                  barCount={12}
                  barWidth={2}
                  barGap={1}
                  style="compact"
                />
              </div>
            )}

            {/* Text Input */}
            <InputComponent
              value={
                isNaturalConversationEnabled && !showTranscriptInNaturalMode
                  ? ""
                  : message
              }
              placeholder={
                isNaturalConversationEnabled && !showTranscriptInNaturalMode
                  ? ""
                  : isNaturalConversationEnabled && showTranscriptInNaturalMode
                  ? "Live transcript..."
                  : inputMode === "voice" && message
                  ? "Processing speech..."
                  : placeholder
              }
              className={cn(
                "flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 resize-none",
                multiline && "min-h-[80px]",
                (inputMode === "voice" || inputMode === "conversation") &&
                  state === "listening" &&
                  "text-blue-900 font-medium",
                isNaturalConversationEnabled &&
                  !showTranscriptInNaturalMode &&
                  "cursor-not-allowed",
                isFullWidthWaveform && state === "listening" && "relative z-10"
              )}
              disabled={
                (inputMode === "voice" || inputMode === "conversation") &&
                state === "listening"
              }
              readOnly={
                isNaturalConversationEnabled && !showTranscriptInNaturalMode
              }
            />

            {/* Controls */}
            <div className="relative z-50 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-md p-1 shadow-sm border border-slate-200/50">
              {/* Natural Conversation Toggle */}
              {enableNaturalConversation && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "shrink-0 h-8 w-8 p-0 transition-all duration-200",
                    isNaturalConversationEnabled
                      ? "bg-indigo-100 text-indigo-700 shadow-sm"
                      : "text-slate-600 hover:text-indigo-600"
                  )}
                >
                  <MessageCircle
                    className={cn(
                      "h-4 w-4",
                      isNaturalConversationEnabled && "animate-pulse"
                    )}
                  />
                </Button>
              )}

              {/* Voice/Text Toggle */}
              {!isNaturalConversationEnabled && (
                <>
                  {inputMode === "voice" && state === "listening" ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="shrink-0 h-8 w-8 p-0 animate-pulse bg-red-100 text-red-600"
                    >
                      <Square className="h-4 w-4 fill-current" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="shrink-0 h-8 w-8 p-0 text-slate-600"
                    >
                      {inputMode === "text" ? (
                        <Mic className="h-4 w-4" />
                      ) : (
                        <Keyboard className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </>
              )}

              {/* Send Button */}
              {showSendButton &&
                (!isNaturalConversationEnabled ||
                  showTranscriptInNaturalMode) && (
                  <Button
                    type="button"
                    size="sm"
                    className={cn(
                      "shrink-0 h-8 w-8 p-0",
                      message.trim()
                        ? isNaturalConversationEnabled
                          ? "bg-indigo-600 text-white"
                          : "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    )}
                  >
                    {state === "processing" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                )}
            </div>
          </div>

          {/* Status Indicator - Only for non-natural mode */}
          {!isNaturalConversationEnabled && (
            <div
              className={cn(
                "flex items-center justify-between text-xs px-3 py-1 border-t",
                state === "listening" && "bg-blue-50/50",
                state === "processing" && "bg-amber-50/50",
                state === "error" && "bg-red-50/50",
                state === "success" && "bg-emerald-50/50"
              )}
            >
              <div className="flex items-center gap-2">
                {state === "listening" && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                    </div>
                    <span className="font-medium">Listening...</span>
                  </div>
                )}
                {state === "processing" && (
                  <div className="flex items-center gap-2 text-amber-600">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Processing...</span>
                  </div>
                )}
                {state === "success" && (
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Volume2 className="w-3 h-3" />
                    <span>Voice captured</span>
                  </div>
                )}
                {state === "idle" && inputMode === "text" && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <Keyboard className="w-3 h-3" />
                    <span>Ready</span>
                  </div>
                )}
                {error && (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <div className="text-slate-400 flex items-center gap-2">
                <span>{message.length} chars</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
