"use client"

import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { Check, X, Loader2 } from "lucide-react"

export function CartCoupon() {
  const { coupon, applyCoupon, removeCoupon, subtotal } = useCart()
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code) return
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.toUpperCase(), subtotal }),
      })

      const data = await response.json()

      if (response.ok && data.coupon) {
        applyCoupon({
          code: data.coupon.code,
          type: data.coupon.type,
          value: data.coupon.value,
          minOrderAmount: data.coupon.min_order_amount || 0,
        })
        setCode("")
      } else {
        setError(data.message || "Invalid coupon code.")
      }
    } catch (err) {
      setError("Failed to validate coupon.")
    } finally {
      setLoading(false)
    }
  }

  if (coupon) {
    return (
      <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl p-3.5 text-sm">
        <div className="flex items-center gap-2 text-primary font-bold">
          <Check className="h-4.5 w-4.5" />
          <span>Code Applied: {coupon.code}</span>
        </div>
        <button
          onClick={removeCoupon}
          className="text-muted-foreground/80 hover:text-foreground cursor-pointer"
          aria-label="Remove coupon"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleApply} className="flex gap-2">
        <input
          type="text"
          placeholder="Promo code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 bg-muted border border-input rounded-lg px-3 py-2 text-xs placeholder:text-muted-foreground/80 text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-semibold uppercase"
        />
        <button
          type="submit"
          disabled={loading || !code}
          className="bg-primary hover:bg-olive-600 text-primary-foreground font-bold px-4 rounded-lg text-xs transition-all cursor-pointer disabled:opacity-50 active:scale-95"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Apply"}
        </button>
      </form>
      {error && <p className="text-[11px] font-bold text-red-500">{error}</p>}
    </div>
  )
}
export default CartCoupon
