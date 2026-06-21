import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Authenticate user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ message: "Unauthorized. Please sign in to submit a review." }, { status: 401 })
    }

    const { productId, rating, title, body, pros, cons } = await request.json()

    if (!productId || !rating || !title || !body) {
      return NextResponse.json({ message: "Missing required review fields." }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        product_id: productId,
        user_id: user.id,
        rating: parseInt(rating),
        title,
        body,
        pros: pros || null,
        cons: cons || null,
        is_approved: true, // Auto-approve for demo convenience
        is_verified_purchase: true,
      })
      .select()
      .single()

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ message: "You have already reviewed this product." }, { status: 400 })
      }
      throw error
    }

    return NextResponse.json({ message: "Review submitted successfully!", review: data })
  } catch (err) {
    console.error("Reviews API failed:", err)
    return NextResponse.json({ message: "Failed to submit review. Please try again." }, { status: 500 })
  }
}
