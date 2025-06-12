"use client"

import { MessageBubble } from "@/components/message-bubble"
import { ShowcaseCard } from "@/components/showcase-card"
import { MessageAttachment } from "@/components/message-bubble"

export function MessageTypesShowcase() {
  const timestamp = new Date()

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-slate-900">Message Types</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Basic Message Types */}
        <ShowcaseCard title="User Text Message" description="Standard user message bubble">
          <MessageBubble message="This is a message from the user" isUser={true} timestamp={timestamp} />
        </ShowcaseCard>

        <ShowcaseCard title="AI Text Message" description="Standard AI/bot message bubble">
          <MessageBubble message="This is a message from the AI assistant" isUser={false} timestamp={timestamp} />
        </ShowcaseCard>

        <ShowcaseCard title="System Text Message" description="System notification or information">
          <MessageBubble
            message="Your message has been delivered"
            isUser={false}
            isSystem={true}
            timestamp={timestamp}
          />
        </ShowcaseCard>

        <ShowcaseCard title="User Message with Image" description="User message with image attachment">
          <MessageBubble
            message="Check out this image"
            isUser={true}
            timestamp={timestamp}
            attachments={[
              <MessageAttachment
                key="image1"
                type="image"
                url="/placeholder.svg?height=200&width=300"
                filename="image.jpg"
                filesize="120 KB"
              />,
            ]}
          />
        </ShowcaseCard>

        <ShowcaseCard title="AI Message with Image" description="AI message with image attachment">
          <MessageBubble
            message="Here's the image you requested"
            isUser={false}
            timestamp={timestamp}
            attachments={[
              <MessageAttachment
                key="image2"
                type="image"
                url="/placeholder.svg?height=200&width=300"
                filename="response.jpg"
                filesize="150 KB"
              />,
            ]}
          />
        </ShowcaseCard>

        <ShowcaseCard title="User Message with File" description="User message with file attachment">
          <MessageBubble
            message="Here's the document"
            isUser={true}
            timestamp={timestamp}
            attachments={[<MessageAttachment key="file1" type="file" filename="document.pdf" filesize="2.4 MB" />]}
          />
        </ShowcaseCard>

        <ShowcaseCard title="Message with Multiple Attachments" description="Message containing multiple files">
          <MessageBubble
            message="Here are the requested files"
            isUser={false}
            timestamp={timestamp}
            attachments={[
              <MessageAttachment key="file2" type="file" filename="report.pdf" filesize="3.1 MB" />,
              <MessageAttachment key="file3" type="file" filename="data.xlsx" filesize="1.7 MB" />,
            ]}
          />
        </ShowcaseCard>

        <ShowcaseCard title="Message with Read Receipt" description="Message showing read status">
          <MessageBubble
            message="Did you see my previous message?"
            isUser={true}
            timestamp={timestamp}
            readReceipt="Read at 2:45 PM"
          />
        </ShowcaseCard>

        <ShowcaseCard title="Message with Delivery Status" description="Message showing delivery status">
          <MessageBubble
            message="Let me know when you're available"
            isUser={true}
            timestamp={timestamp}
            deliveryStatus="delivered"
          />
        </ShowcaseCard>

        <ShowcaseCard title="Message with Error" description="Message that failed to send">
          <MessageBubble
            message="Can we schedule a meeting for tomorrow?"
            isUser={true}
            timestamp={timestamp}
            deliveryStatus="failed"
            errorMessage="Failed to send. Tap to retry."
          />
        </ShowcaseCard>

        <ShowcaseCard title="Message with Reactions" description="Message with emoji reactions">
          <MessageBubble
            message="I think this is a great idea!"
            isUser={false}
            timestamp={timestamp}
            reactions={[
              { emoji: "👍", count: 2 },
              { emoji: "❤️", count: 1 },
            ]}
          />
        </ShowcaseCard>
      </div>
    </div>
  )
}
