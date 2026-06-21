"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

export function FooterNewsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (response.ok) {
        setSubmitted(true)
        setEmail("")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold tracking-wider uppercase text-foreground/90">Ride Wilder. Stay Updated.</h4>
      <p className="text-sm text-muted-foreground leading-relaxed font-medium">
        Subscribe to get trails recommendations, gear tips, and 10% off your first ride.
      </p>
      {submitted ? (
        <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 border border-primary/20 rounded-lg p-3">
          <Check className="h-4.5 w-4.5" />
          <span>You're on the trail! Check your inbox.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-muted border border-input rounded-lg px-3 py-2 text-sm placeholder:text-muted-foreground/75 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-medium"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-olive-600 text-primary-foreground p-2.5 rounded-lg flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 active:scale-95"
          >
            {loading ? "..." : <ArrowRight className="h-4.5 w-4.5" />}
          </button>
        </form>
      )}
    </div>
  )
}
export default FooterNewsletter
