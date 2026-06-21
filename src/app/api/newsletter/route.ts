import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/client"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ message: "A valid email address is required." }, { status: 400 })
    }

    const supabase = createClient()
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email: email.toLowerCase(),
        source: "footer_signup",
      })

    if (error) {
      if (error.code === "23505") {
        // Unique violation (email already signed up)
        return NextResponse.json({ message: "You are already subscribed!" })
      }
      throw error
    }

    return NextResponse.json({ message: "Successfully subscribed to the trail journal!" })
  } catch (err) {
    console.error("Newsletter API failed:", err)
    return NextResponse.json({ message: "Failed to subscribe. Please try again." }, { status: 500 })
  }
}
