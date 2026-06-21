"use client"

import { cn } from "@/lib/utils/cn"

interface CheckoutStepsProps {
  currentStep: number
}

const STEPS = ["Shipping Details", "Payment Method", "Review Order"]

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-lg mx-auto py-6">
      {STEPS.map((step, idx) => {
        const stepNum = idx + 1
        const isActive = stepNum === currentStep
        const isCompleted = stepNum < currentStep

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 relative">
              <div
                className={cn(
                  "h-8 w-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all",
                  {
                    "border-primary bg-primary text-primary-foreground": isActive || isCompleted,
                    "border-border text-muted-foreground bg-transparent": !isActive && !isCompleted,
                  }
                )}
              >
                {isCompleted ? "✓" : stepNum}
              </div>
              <span
                className={cn("text-[10px] md:text-xs font-bold whitespace-nowrap", {
                  "text-primary": isActive || isCompleted,
                  "text-muted-foreground": !isActive && !isCompleted,
                })}
              >
                {step}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={cn("h-[2px] flex-1 mx-4 transition-all", {
                  "bg-primary": isCompleted,
                  "bg-border": !isCompleted,
                })}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
export default CheckoutSteps
