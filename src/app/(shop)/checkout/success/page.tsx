"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Spinner } from "@/components/ui/spinner"
import { Suspense } from "react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("orderId") || "VT-10001"

  return (
    <div className="max-w-md mx-auto text-center space-y-6 py-12">
      <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-foreground font-display">Order Confirmed!</h1>
        <p className="text-sm text-muted-foreground/80 font-medium leading-relaxed">
          Your payment was processed successfully. We are preparing your bike for delivery.
        </p>
      </div>

      <div className="bg-muted/40 p-4 border border-border rounded-xl space-y-1 text-sm font-semibold">
        <div className="text-muted-foreground/85">Order Number</div>
        <div className="text-foreground text-base font-bold">{orderId}</div>
      </div>

      <div className="flex flex-col gap-2 pt-4">
        <Button onClick={() => router.push("/account/orders")} variant="primary" className="h-12 shadow-sm text-sm gap-2 w-full">
          <span>View Order Status</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <button
          onClick={() => router.push("/bikes")}
          className="h-12 border border-border hover:bg-muted font-bold text-sm rounded-lg transition-all cursor-pointer w-full"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <PageWrapper className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-8">
      <Suspense fallback={
        <div className="text-center py-20 flex justify-center">
          <Spinner />
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </PageWrapper>
  )
}
