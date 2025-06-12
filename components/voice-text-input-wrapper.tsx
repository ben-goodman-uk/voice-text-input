"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Import types for props
import type { VoiceTextInputProps } from "./voice-text-input";

// Dynamically import the component with SSR disabled
const VoiceTextInput = dynamic(() => import("./voice-text-input"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-16 border rounded-lg bg-slate-50">
      <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
      <span className="ml-2 text-slate-500">Loading voice input...</span>
    </div>
  ),
});

// Create a wrapper component that passes props through
export function VoiceTextInputWrapper(props: VoiceTextInputProps) {
  return <VoiceTextInput {...props} />;
}
