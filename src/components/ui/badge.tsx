import * as React from "react"
import { cn } from "@/lib/utils/cn"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'success' | 'destructive'
}

function Badge({ className, variant = "primary", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
        {
          "bg-primary border-transparent text-primary-foreground": variant === "primary",
          "bg-secondary border-transparent text-secondary-foreground": variant === "secondary",
          "bg-accent border-transparent text-accent-foreground": variant === "accent",
          "border-border text-foreground bg-transparent": variant === "outline",
          "bg-green-100 dark:bg-green-900/30 border-transparent text-green-800 dark:text-green-300": variant === "success",
          "bg-destructive border-transparent text-destructive-foreground": variant === "destructive",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
