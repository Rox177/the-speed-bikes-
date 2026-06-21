"use client"

import { useEffect, useState } from "react"
import { Star, Check, ThumbsUp } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Spinner } from "@/components/ui/spinner"
import { ReviewStars } from "./review-stars"
import { ReviewForm } from "./review-form"
import { formatDate } from "@/lib/utils/format"

interface ProductReviewsProps {
  productId: string
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchReviews() {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          id,
          rating,
          title,
          body,
          pros,
          cons,
          is_verified_purchase,
          helpful_count,
          created_at,
          profiles (
            full_name
          )
        `)
        .eq("product_id", productId)
        .eq("is_approved", true)
        .order("created_at", { ascending: false })

      if (data) {
        setReviews(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const handleHelpfulClick = async (reviewId: string) => {
    try {
      const supabase = createClient()
      const review = reviews.find((r) => r.id === reviewId)
      if (!review) return
      
      const { error } = await supabase
        .from("reviews")
        .update({ helpful_count: (review.helpful_count || 0) + 1 })
        .eq("id", reviewId)
      
      if (!error) {
        setReviews((prev) =>
          prev.map((r) =>
            r.id === reviewId ? { ...r, helpful_count: (r.helpful_count || 0) + 1 } : r
          )
        )
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Calculate stats
  const totalReviews = reviews.length
  const avgRating = totalReviews > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 5.0
  const ratingDistribution = [0, 0, 0, 0, 0] // index 0 = 5-star, 4 = 1-star
  reviews.forEach((r) => {
    const starIdx = 5 - r.rating
    if (starIdx >= 0 && starIdx < 5) ratingDistribution[starIdx]++
  })

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Summary stats left column */}
      <div className="lg:col-span-4 space-y-6 bg-card border border-border p-6 rounded-2xl h-fit">
        <h3 className="text-xl font-bold text-foreground font-display">Rider Feedback</h3>
        <div className="flex items-center gap-3">
          <span className="text-4xl font-extrabold text-foreground">{avgRating.toFixed(1)}</span>
          <div className="space-y-1">
            <ReviewStars rating={avgRating} />
            <div className="text-xs text-muted-foreground font-semibold">Based on {totalReviews} reviews</div>
          </div>
        </div>

        {/* Rating Bars */}
        <div className="space-y-2">
          {ratingDistribution.map((count, idx) => {
            const starNum = 5 - idx
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
            return (
              <div key={starNum} className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                <span className="w-10 whitespace-nowrap">{starNum} Star</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${percentage}%` }} />
                </div>
                <span className="w-8 text-right">{percentage.toFixed(0)}%</span>
              </div>
            )
          })}
        </div>

        <ReviewForm productId={productId} onSuccess={fetchReviews} />
      </div>

      {/* Reviews list right column */}
      <div className="lg:col-span-8 space-y-6">
        {reviews.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground/80 font-medium">
            No reviews yet for this model. Be the first to review!
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-bold text-base text-foreground leading-tight">{review.title}</h4>
                    <div className="flex items-center gap-3">
                      <ReviewStars rating={review.rating} />
                      <span className="text-[10px] text-muted-foreground font-semibold">
                        by {review.profiles?.full_name || "Verified Rider"} on {formatDate(review.created_at)}
                      </span>
                    </div>
                  </div>
                  {review.is_verified_purchase && (
                    <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-700 dark:text-green-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <Check className="h-3 w-3 stroke-[3]" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                <p className="text-sm text-foreground/85 leading-relaxed font-medium">{review.body}</p>

                {/* Pros & Cons */}
                {(review.pros || review.cons) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/40 p-4 rounded-xl text-xs font-semibold">
                    {review.pros && (
                      <div className="space-y-1">
                        <div className="text-green-700 dark:text-green-300 font-extrabold uppercase">Pros</div>
                        <div className="text-foreground/80 font-medium">{review.pros}</div>
                      </div>
                    )}
                    {review.cons && (
                      <div className="space-y-1">
                        <div className="text-red-600 dark:text-red-400 font-extrabold uppercase">Cons</div>
                        <div className="text-foreground/80 font-medium">{review.cons}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Helpful count */}
                <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-muted-foreground">
                  <span>Was this review helpful?</span>
                  <button
                    onClick={() => handleHelpfulClick(review.id)}
                    className="flex items-center gap-1.5 hover:text-primary transition-all cursor-pointer bg-muted hover:bg-muted-foreground/10 px-2.5 py-1 rounded-lg active:scale-95 border border-border"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>{review.helpful_count || 0}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default ProductReviews
