"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { CheckoutSteps } from "./checkout-steps"
import { ShippingForm } from "./shipping-form"
import { PaymentForm } from "./payment-form"
import { OrderSummary } from "./order-summary"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils/format"

export function CheckoutForm() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, subtotal, discount, total, clearCart, coupon } = useCart()

  const [step, setStep] = useState(1)
  const [shippingAddress, setShippingAddress] = useState<any | null>(null)
  const [paymentDetails, setPaymentDetails] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleShippingSubmit = (values: any) => {
    setShippingAddress(values)
    setStep(2)
  }

  const handlePaymentSubmit = (values: any) => {
    setPaymentDetails(values)
    setStep(3)
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    setError(null)
    try {
      const orderData = {
        userId: user?.id || null,
        email: user?.email || shippingAddress.email || "guest@volttrail.com",
        items: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId || null,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity,
          image: item.image,
          color: item.color || null,
          size: item.size || null,
        })),
        subtotal,
        discountAmount: discount,
        shippingAmount: subtotal > 150 ? 0 : 15,
        taxAmount: (subtotal - discount) * 0.085,
        totalAmount: total,
        couponCode: coupon?.code || null,
        shippingAddress,
        paymentMethod: paymentDetails.paymentMethod,
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()

      if (response.ok && data.orderId) {
        clearCart()
        router.push(`/checkout/success?orderId=${data.orderId}`)
      } else {
        setError(data.message || "Failed to place order. Please try again.")
      }
    } catch (err) {
      setError("An error occurred during checkout. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <h3 className="text-xl font-bold">Your cart is empty</h3>
        <p className="text-sm text-muted-foreground">Add some e-bikes or accessories to checkout.</p>
        <Button onClick={() => router.push("/bikes")}>Explore E-Bikes</Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Steps form left column */}
      <div className="lg:col-span-8 space-y-6">
        <CheckoutSteps currentStep={step} />

        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          {step === 1 && (
            <ShippingForm initialValues={shippingAddress} onSubmit={handleShippingSubmit} />
          )}

          {step === 2 && (
            <PaymentForm onBack={() => setStep(1)} onSubmit={handlePaymentSubmit} />
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-foreground border-b border-border pb-3 font-display">Review Your Order</h3>

              {error && (
                <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold rounded-lg">
                  <AlertCircle className="h-4.5 w-4.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-medium text-muted-foreground/80">
                <div className="border border-border p-4 rounded-xl space-y-2">
                  <h4 className="font-extrabold text-foreground text-xs uppercase tracking-wider">Shipping Address</h4>
                  <div className="text-foreground font-bold">{shippingAddress.fullName}</div>
                  <div>{shippingAddress.line1}</div>
                  {shippingAddress.line2 && <div>{shippingAddress.line2}</div>}
                  <div>
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                  </div>
                  <div>{shippingAddress.phone}</div>
                </div>

                <div className="border border-border p-4 rounded-xl space-y-2">
                  <h4 className="font-extrabold text-foreground text-xs uppercase tracking-wider">Payment Details</h4>
                  <div>Method: <span className="text-foreground font-bold capitalize">{paymentDetails.paymentMethod}</span></div>
                  {paymentDetails.paymentMethod === "stripe" && (
                    <div>Cardholder: <span className="text-foreground font-semibold">{paymentDetails.cardDetails.cardName}</span></div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-border/80">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={loading}
                  className="h-12 border border-border hover:bg-muted font-bold text-sm px-6 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  Go Back
                </button>
                <Button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  variant="primary"
                  className="flex-1 h-12 text-sm shadow-sm cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin mr-2" />
                      <span>Securing Order...</span>
                    </>
                  ) : (
                    <span>Place Order ({formatCurrency(total)})</span>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary right column */}
      <div className="lg:col-span-4 lg:sticky lg:top-28">
        <OrderSummary />
      </div>
    </div>
  )
}
export default CheckoutForm
