import { Check, AlertCircle, FileText, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StaticReaction {
  emoji: string
  count: number
}

interface StaticAttachment {
  type: "file" | "image"
  url?: string
  filename: string
  filesize?: string
}

interface StaticMessageBubbleProps {
  message: string
  isUser: boolean
  timestamp: string
  isSystem?: boolean
  attachments?: StaticAttachment[]
  readReceipt?: string
  deliveryStatus?: "sending" | "sent" | "delivered" | "read" | "failed"
  errorMessage?: string
  reactions?: StaticReaction[]
  sender?: {
    name: string
    avatar?: string
  }
  showAvatar?: boolean
  showName?: boolean
  className?: string
}

export function StaticMessageBubble({
  message,
  isUser,
  timestamp,
  isSystem = false,
  attachments = [],
  readReceipt,
  deliveryStatus,
  errorMessage,
  reactions = [],
  sender,
  showAvatar = false,
  showName = false,
  className,
}: StaticMessageBubbleProps) {
  const getStatusIcon = () => {
    switch (deliveryStatus) {
      case "sending":
        return <div className="w-3 h-3 rounded-full bg-slate-300 animate-pulse" />
      case "sent":
        return <Check className="h-3 w-3 text-slate-400" />
      case "delivered":
        return <Check className="h-3 w-3 text-slate-500" />
      case "read":
        return (
          <div className="flex items-center">
            <Check className="h-3 w-3 text-blue-500" />
            <Check className="h-3 w-3 -ml-1 text-blue-500" />
          </div>
        )
      case "failed":
        return <AlertCircle className="h-3 w-3 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div
      className={cn(
        "flex items-start gap-2",
        isUser ? "justify-end flex-row-reverse text-right" : "justify-start",
        className,
      )}
    >
      {/* Avatar */}
      {(showAvatar || (sender && showAvatar !== false)) && (
        <div className="flex-shrink-0 mt-1">
          <div
            className={cn(
              "w-6 h-6 rounded-full bg-gradient-to-br flex items-center justify-center",
              isUser
                ? "from-blue-500 to-indigo-600"
                : isSystem
                  ? "from-slate-400 to-slate-500"
                  : "from-indigo-500 to-purple-600",
            )}
          >
            {sender && sender.avatar ? (
              <img
                src={sender.avatar || "/placeholder.svg"}
                alt={sender.name || (isUser ? "User" : "AI")}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-xs font-bold text-white">{isUser ? "U" : isSystem ? "S" : "A"}</span>
            )}
          </div>
        </div>
      )}

      <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
        {/* Sender Name */}
        {showName && sender && sender.name && (
          <div className="text-xs text-slate-500 font-medium mb-1">{sender.name}</div>
        )}

        {/* Message Content */}
        <div
          className={cn(
            "max-w-[85%] px-3 py-2 rounded-lg",
            isSystem
              ? "bg-slate-100 text-slate-700 text-xs border border-slate-200"
              : isUser
                ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
                : "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-900 border border-slate-200",
            isUser ? "rounded-br-sm" : "rounded-bl-sm",
          )}
        >
          {message}
        </div>

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="mt-1 space-y-1 max-w-[85%]">
            {attachments.map((attachment, index) => (
              <StaticAttachment key={index} {...attachment} />
            ))}
          </div>
        )}

        {/* Status Row */}
        <div className={cn("flex items-center gap-1 mt-1 text-xs", isUser ? "justify-end" : "justify-start")}>
          <span className="text-slate-400">{timestamp}</span>
          {isUser && deliveryStatus && <span className="flex items-center">{getStatusIcon()}</span>}
          {readReceipt && <span className="text-blue-500 text-xs">{readReceipt}</span>}
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-1 flex items-center gap-1 text-xs text-red-500">
            <AlertCircle className="h-3 w-3" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Reactions */}
        {reactions.length > 0 && (
          <div className="mt-1 flex items-center gap-1 bg-slate-100 rounded-full px-2 py-0.5 border border-slate-200">
            {reactions.map((reaction, index) => (
              <div key={index} className="flex items-center text-xs">
                <span className="mr-1">{reaction.emoji}</span>
                <span className="text-slate-600">{reaction.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StaticAttachment({ type, url, filename, filesize }: StaticAttachment) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-md bg-white border border-slate-200 shadow-sm max-w-full">
      <div className="flex-shrink-0">
        {type === "image" ? (
          <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center">
            <ImageIcon className="h-4 w-4 text-slate-500" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center">
            <FileText className="h-4 w-4 text-slate-500" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        {type === "image" && url ? (
          <div className="relative">
            <img src={url || "/placeholder.svg"} alt={filename} className="max-h-32 rounded object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1">
              <div className="flex justify-between items-center text-xs text-white">
                <span className="truncate">{filename}</span>
                {filesize && <span className="flex-shrink-0">{filesize}</span>}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-sm font-medium truncate">{filename}</span>
            {filesize && <span className="text-xs text-slate-500">{filesize}</span>}
          </div>
        )}
      </div>
    </div>
  )
}
