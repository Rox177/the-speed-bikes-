import * as React from "react"
import { cn } from "@/lib/utils/cn"

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'accent' | 'current'
}

export function Spinner({ className, size = 'md', variant = 'primary', ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-t-transparent",
        {
          "h-4 w-4 border-2": size === "sm",
          "h-8 w-8 border-[3px]": size === "md",
          "h-12 w-12 border-4": size === "lg",
        },
        {
          "border-primary": variant === "primary",
          "border-secondary": variant === "secondary",
          "border-accent": variant === "accent",
          "border-current": variant === "current",
        },
        className
      )}
      {...props}
    />
  )
}
