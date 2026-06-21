import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/client"

export async function POST(request: Request) {
  try {
    const orderData = await request.json()
    const {
      userId,
      email,
      items,
      subtotal,
      discountAmount,
      shippingAmount,
      taxAmount,
      totalAmount,
      couponCode,
      shippingAddress,
      paymentMethod,
    } = orderData

    if (!items || items.length === 0 || !shippingAddress) {
      return NextResponse.json({ message: "Invalid order coordinates." }, { status: 400 })
    }

    const supabase = createClient()

    // 1. Decrement Stock using database functions (RPC)
    for (const item of items) {
      const { error: stockError } = await supabase.rpc("decrement_stock", {
        p_product_id: item.productId,
        p_quantity: item.quantity,
      })

      if (stockError) {
        console.error("Stock decrement failed:", stockError)
        return NextResponse.json({ message: `Insufficient stock for model: ${item.name}` }, { status: 400 })
      }
    }

    // 2. Insert order
    const { data: orderRecord, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId || null,
        guest_email: userId ? null : email,
        status: "confirmed",
        payment_status: "captured",
        subtotal,
        discount_amount: discountAmount,
        shipping_amount: shippingAmount,
        tax_amount: taxAmount,
        total_amount: totalAmount,
        coupon_code: couponCode,
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
        payment_provider: paymentMethod === "stripe" ? "Stripe" : "PayPal",
      })
      .select()
      .single()

    if (orderError) throw orderError

    // 3. Insert order items
    const orderItemsToInsert = items.map((item: any) => ({
      order_id: orderRecord.id,
      product_id: item.productId,
      variant_id: item.variantId || null,
      product_name: item.name,
      product_slug: item.productId, // using productId as placeholder slug
      product_image: item.image,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.totalPrice,
    }))

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsToInsert)

    if (itemsError) throw itemsError

    return NextResponse.json({
      message: "Order finalized successfully!",
      orderId: orderRecord.order_number,
    })
  } catch (err) {
    console.error("Order submission failed:", err)
    return NextResponse.json({ message: "Order checkout failed. Please try again." }, { status: 500 })
  }
}
