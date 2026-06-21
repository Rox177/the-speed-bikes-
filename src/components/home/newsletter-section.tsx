"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Mail } from "lucide-react"

export function NewsletterSection() {
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
    <section className="py-20 bg-secondary text-secondary-foreground overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-500/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-8 flex flex-col items-center">
        <div className="p-3.5 bg-primary/20 rounded-full text-primary-foreground border border-primary/20">
          <Mail className="h-6 w-6" />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Join the VoltTrail Community</h2>
          <p className="text-sm md:text-base text-secondary-foreground/80 font-medium max-w-xl mx-auto">
            Get early access to new e-bike drops, sustainable trail guides, and exclusive rider events.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 bg-primary/25 border border-primary/30 p-4 rounded-xl text-primary-foreground font-bold text-sm max-w-md mx-auto"
          >
            <Check className="h-5 w-5" />
            <span>Success! Check your email for your 10% welcome coupon.</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-forest-700/50 border border-forest-600 rounded-xl px-4 py-3 text-sm placeholder:text-secondary-foreground/45 text-white focus:outline-none focus:ring-2 focus:ring-primary font-medium"
            />
            <button
              type="submit"
              disabled={loading}
              className="h-12 bg-primary hover:bg-olive-600 text-primary-foreground font-bold px-6 rounded-xl transition-all cursor-pointer disabled:opacity-50 active:scale-[0.98] shadow-md flex items-center justify-center whitespace-nowrap"
            >
              {loading ? "Joining..." : "Subscribe Now"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
export default NewsletterSection
