import { Star } from "lucide-react"
import { cn } from "@/lib/utils/cn"

interface ReviewStarsProps {
  rating: number
  className?: string
}

export function ReviewStars({ rating, className }: ReviewStarsProps) {
  const roundedRating = Math.round(rating)
  return (
    <div className={cn("flex gap-0.5", className)}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4 stroke-amber-500", {
            "fill-amber-500": i < roundedRating,
            "fill-transparent": i >= roundedRating,
          })}
        />
      ))}
    </div>
  )
}
export default ReviewStars
