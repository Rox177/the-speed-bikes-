"use client"

import { useState } from "react"
import { Heart, ShoppingBag, Truck, Shield, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { formatCurrency } from "@/lib/utils/format"
import { getProductImageUrl } from "@/lib/utils/image-utils"
import { Button } from "@/components/ui/button"

interface ProductInfoProps {
  product: {
    id: string
    name: string
    slug: string
    tagline?: string
    description?: string
    price: number
    compare_price?: number
    thumbnail_url?: string
    stock_quantity: number
    color?: string
    frame_sizes?: string[]
    warranty_years?: number
  }
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, hasItem } = useWishlist()
  
  const [selectedColor, setSelectedColor] = useState(product.color || "Standard")
  const [selectedSize, setSelectedSize] = useState(product.frame_sizes?.[1] || product.frame_sizes?.[0] || "M")
  const [quantity, setQuantity] = useState(1)

  const isFavorite = hasItem(product.id)

  const handleWishlistToggle = () => {
    if (isFavorite) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: getProductImageUrl(product.thumbnail_url),
        slug: product.slug,
        inStock: product.stock_quantity > 0,
      })
    }
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: getProductImageUrl(product.thumbnail_url),
      color: selectedColor,
      size: selectedSize,
      quantity,
      maxStock: product.stock_quantity,
      sku: `${product.name.substring(0, 3).toUpperCase()}-${selectedSize}`,
    })
  }

  // Stock status styling
  const isOutOfStock = product.stock_quantity === 0
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 5

  return (
    <div className="space-y-6">
      {/* Brand / Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">{product.name}</h1>
        {product.tagline && (
          <p className="text-lg text-muted-foreground font-semibold tracking-tight">{product.tagline}</p>
        )}
      </div>

      {/* Pricing */}
      <div className="flex items-center gap-3 border-b border-border/60 pb-5">
        <span className="text-2xl font-black text-primary">{formatCurrency(product.price)}</span>
        {product.compare_price && product.compare_price > product.price && (
          <>
            <span className="text-sm text-muted-foreground line-through font-semibold">
              {formatCurrency(product.compare_price)}
            </span>
            <span className="text-xs bg-accent/20 text-accent-foreground font-bold px-2.5 py-0.5 rounded-full">
              Save {formatCurrency(product.compare_price - product.price)}
            </span>
          </>
        )}
      </div>

      {/* Stock status indicator */}
      <div className="flex items-center gap-2">
        <div
          className={cn("h-2.5 w-2.5 rounded-full animate-pulse", {
            "bg-green-600": !isOutOfStock && !isLowStock,
            "bg-amber-500": isLowStock,
            "bg-red-500": isOutOfStock,
          })}
        />
        <span className="text-sm font-bold text-foreground">
          {isOutOfStock ? "Out of Stock" : isLowStock ? `Only ${product.stock_quantity} left in stock!` : "In Stock - Ready to Ship"}
        </span>
      </div>

      {/* Sizing selection */}
      {product.frame_sizes && product.frame_sizes.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Frame Size</h4>
          <div className="flex gap-2">
            {product.frame_sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                disabled={isOutOfStock}
                className={cn(
                  "h-11 w-11 rounded-lg border text-sm font-bold transition-all flex items-center justify-center cursor-pointer disabled:opacity-50",
                  selectedSize === size
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-foreground hover:bg-muted"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Actions */}
      {!isOutOfStock && (
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border/60">
          <div className="flex items-center border border-input rounded-lg h-12 w-32 justify-between px-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="text-muted-foreground hover:text-foreground font-bold text-lg p-1 cursor-pointer"
            >
              -
            </button>
            <span className="font-bold text-foreground text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stock_quantity, q + 1))}
              className="text-muted-foreground hover:text-foreground font-bold text-lg p-1 cursor-pointer"
            >
              +
            </button>
          </div>

          <div className="flex-1 flex gap-3">
            <Button
              onClick={handleAddToCart}
              variant="primary"
              className="flex-1 h-12 gap-2 shadow-sm"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Add to Cart</span>
            </Button>
            <button
              onClick={handleWishlistToggle}
              className={cn(
                "h-12 w-12 border border-border rounded-lg flex items-center justify-center transition-all cursor-pointer hover:bg-muted active:scale-95",
                isFavorite && "bg-destructive/10 border-destructive/20 text-destructive hover:bg-destructive/20"
              )}
              aria-label="Add to wishlist"
            >
              <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
            </button>
          </div>
        </div>
      )}

      {/* Trust guarantees */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border/60 text-xs font-bold text-muted-foreground/90">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          <span>Free Premium Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>{product.warranty_years || 2}-Year Full Warranty</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="h-5 w-5 text-primary" />
          <span>30-Day Trail Trial</span>
        </div>
      </div>
    </div>
  )
}
export default ProductInfo
