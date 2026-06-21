"use client"

import { CheckoutForm } from "@/components/checkout/checkout-form"
import { PageWrapper } from "@/components/layout/page-wrapper"

export default function CheckoutPage() {
  return (
    <PageWrapper className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-black text-foreground font-display">Secure Checkout</h1>
        <p className="text-sm text-muted-foreground font-semibold">Complete your delivery and billing coordinates to secure your ride.</p>
      </div>
      <CheckoutForm />
    </PageWrapper>
  )
}
