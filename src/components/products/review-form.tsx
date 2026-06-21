"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { reviewSchema } from "@/lib/validations/review"
import { z } from "zod"

type ReviewFormValues = z.infer<typeof reviewSchema>
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Star, Loader2, Check } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useUIStore } from "@/store/ui-store"

interface ReviewFormProps {
  productId: string
  onSuccess: () => void
}

export function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const { user } = useAuth()
  const setAuthModal = useUIStore((state) => state.setAuthModal)
  const [rating, setRating] = useState(5)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      title: "",
      body: "",
      pros: "",
      cons: "",
      imageUrls: [],
    },
  })

  const onSubmit = async (data: any) => {
    if (!user) {
      setAuthModal("login")
      return
    }
    setLoading(true)
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          rating,
          productId,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        reset()
        onSuccess()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="bg-muted/40 p-6 rounded-2xl text-center border border-dashed border-border space-y-4">
        <h4 className="font-bold text-foreground">Verified Rider Reviews</h4>
        <p className="text-xs text-muted-foreground font-semibold max-w-sm mx-auto">
          Only authenticated riders who purchased this model can submit a review. Please sign in.
        </p>
        <Button onClick={() => setAuthModal("login")} variant="outline" size="sm">
          Sign In to Write a Review
        </Button>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="bg-primary/5 p-6 rounded-2xl text-center border border-primary/20 space-y-3">
        <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Check className="h-5 w-5" />
        </div>
        <h4 className="font-bold text-foreground">Review Submitted!</h4>
        <p className="text-xs text-muted-foreground font-semibold">
          Thank you for sharing your experience. Your review is pending moderator approval.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-muted/20 border border-border p-6 rounded-2xl">
      <h3 className="font-bold text-lg text-foreground">Write a Review</h3>

      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Rating</label>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
            >
              <Star className={`h-6 w-6 ${star <= rating ? "fill-current" : "fill-transparent"}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Title</label>
        <Input placeholder="e.g. Best investment I've ever made!" {...register("title")} />
        {errors.title && <p className="text-xs font-bold text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Body</label>
        <Textarea placeholder="Describe your experience with the bike, battery life, climbing ability..." {...register("body")} />
        {errors.body && <p className="text-xs font-bold text-red-500">{errors.body.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pros</label>
          <Input placeholder="What did you like?" {...register("pros")} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cons</label>
          <Input placeholder="What did you dislike?" {...register("cons")} />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full h-11 gap-2 cursor-pointer shadow-sm">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        <span>Submit Review</span>
      </Button>
    </form>
  )
}
export default ReviewForm
