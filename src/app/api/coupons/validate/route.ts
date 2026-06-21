import { NextResponse } from "next/server"

const MOCK_COUPONS = [
  { code: "WELCOME10", type: "percentage", value: 10, min_order_amount: 0 },
  { code: "RIDEWILD100", type: "fixed", value: 100, min_order_amount: 1000 }
]

export async function POST(request: Request) {
  try {
    const { code, subtotal } = await request.json()

    if (!code) {
      return NextResponse.json({ message: "Coupon code is required." }, { status: 400 })
    }

    const coupon = MOCK_COUPONS.find((c) => c.code === code.toUpperCase())

    if (!coupon) {
      return NextResponse.json({ message: "Invalid promo code." }, { status: 404 })
    }

    if (subtotal < coupon.min_order_amount) {
      return NextResponse.json(
        { message: `Min order amount of $${coupon.min_order_amount} required for this code.` },
        { status: 400 }
      )
    }

    return NextResponse.json({ coupon })
  } catch (err) {
    return NextResponse.json({ message: "Failed to validate coupon." }, { status: 500 })
  }
}
