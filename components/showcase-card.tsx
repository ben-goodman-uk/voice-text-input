import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ShowcaseCardProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  contentClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function ShowcaseCard({
  title,
  description,
  children,
  className,
  contentClassName,
  titleClassName,
  descriptionClassName,
}: ShowcaseCardProps) {
  return (
    <Card className={cn("shadow-sm bg-white/80 backdrop-blur-sm", className)}>
      <CardHeader className="pb-2">
        <CardTitle className={cn("text-base font-medium", titleClassName)}>{title}</CardTitle>
        {description && (
          <CardDescription className={cn("text-xs", descriptionClassName)}>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className={cn("", contentClassName)}>{children}</CardContent>
    </Card>
  )
}
