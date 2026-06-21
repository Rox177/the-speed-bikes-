"use client"

import { useState } from "react"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PaymentFormProps {
  onBack: () => void
  onSubmit: (paymentDetails: any) => void
}

export function PaymentForm({ onBack, onSubmit }: PaymentFormProps) {
  const [method, setMethod] = useState<"stripe" | "paypal">("stripe")
  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (method === "stripe") {
      const errs: Record<string, string> = {}
      if (!cardName) errs.cardName = "Cardholder name is required."
      if (!cardNumber || cardNumber.length < 16) errs.cardNumber = "Enter a valid card number."
      if (!cardExpiry) errs.cardExpiry = "Expiry is required."
      if (!cardCvc || cardCvc.length < 3) errs.cardCvc = "CVC is required."

      if (Object.keys(errs).length > 0) {
        setErrors(errs)
        return
      }
    }

    onSubmit({
      paymentMethod: method,
      cardDetails: method === "stripe" ? { cardName, cardNumber, cardExpiry } : null,
    })
  }

  return (
    <form onSubmit={handlePaySubmit} className="space-y-6">
      <h3 className="text-lg font-bold text-foreground border-b border-border pb-3 font-display">Payment Method</h3>

      <div className="grid grid-cols-2 gap-4">
        <label
          onClick={() => setMethod("stripe")}
          className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-muted/40 transition-all select-none ${
            method === "stripe" ? "border-primary bg-primary/5" : "border-border"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            checked={method === "stripe"}
            onChange={() => setMethod("stripe")}
            className="accent-primary h-4.5 w-4.5"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">Stripe Card</span>
            <span className="text-[10px] text-muted-foreground/80 font-bold">Credit/Debit Card</span>
          </div>
        </label>

        <label
          onClick={() => setMethod("paypal")}
          className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-muted/40 transition-all select-none ${
            method === "paypal" ? "border-primary bg-primary/5" : "border-border"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            checked={method === "paypal"}
            onChange={() => setMethod("paypal")}
            className="accent-primary h-4.5 w-4.5"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">PayPal</span>
            <span className="text-[10px] text-muted-foreground/80 font-bold">Secure checkout login</span>
          </div>
        </label>
      </div>

      {method === "stripe" ? (
        <div className="space-y-4 border border-border p-5 rounded-xl bg-muted/15">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Cardholder Name</label>
            <Input
              placeholder="John Doe"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            {errors.cardName && <p className="text-xs font-bold text-red-500">{errors.cardName}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Card Number</label>
            <div className="relative flex items-center">
              <CreditCard className="absolute left-3.5 h-4.5 w-4.5 text-muted-foreground" />
              <Input
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\s+/g, ""))}
                className="pl-11"
              />
            </div>
            {errors.cardNumber && <p className="text-xs font-bold text-red-500">{errors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Expiry Date</label>
              <Input
                placeholder="MM/YY"
                maxLength={5}
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
              />
              {errors.cardExpiry && <p className="text-xs font-bold text-red-500">{errors.cardExpiry}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">CVC / CVV</label>
              <Input
                placeholder="123"
                maxLength={4}
                value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value)}
              />
              {errors.cardCvc && <p className="text-xs font-bold text-red-500">{errors.cardCvc}</p>}
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-border p-8 rounded-xl text-center space-y-3 bg-muted/10">
          <p className="text-sm text-muted-foreground font-semibold">
            Upon clicking submit, you will login securely to your PayPal account to finalize payment.
          </p>
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="h-12 border border-border hover:bg-muted font-bold text-sm px-6 rounded-lg transition-all cursor-pointer"
        >
          Go Back
        </button>
        <Button type="submit" variant="primary" className="flex-1 h-12 text-sm shadow-sm cursor-pointer">
          Continue to Review
        </Button>
      </div>
    </form>
  )
}
export default PaymentForm
