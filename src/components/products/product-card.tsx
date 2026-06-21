"use client"

import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { getProductImageUrl } from "@/lib/utils/image-utils"
import { formatCurrency } from "@/lib/utils/format"
import { useState } from "react"
import { motion } from "framer-motion"

export interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    tagline?: string
    price: number
    compare_price?: number
    thumbnail_url?: string
    image_urls?: string[]
    avg_rating?: number
    review_count?: number
    is_new_arrival?: boolean
    is_best_seller?: boolean
    stock_quantity: number
  }
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, hasItem } = useWishlist()
  const [isHovered, setIsHovered] = useState(false)

  const isFavorite = hasItem(product.id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: getProductImageUrl(product.thumbnail_url),
      maxStock: product.stock_quantity,
      sku: product.name.substring(0, 3).toUpperCase(),
    })
  }

  // Get secondary hover image if available
  const hasSecondaryImage = product.image_urls && product.image_urls.length > 0
  const displayImage = isHovered && hasSecondaryImage && product.image_urls
    ? product.image_urls[0]
    : getProductImageUrl(product.thumbnail_url)

  // Sale check
  const isOnSale = !!product.compare_price && product.compare_price > product.price

  return (
    <Link
      href={`/bikes/${product.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex flex-col w-full bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20",
        className
      )}
    >
      {/* Product Image Panel */}
      <div className="relative aspect-[4/3] bg-muted w-full overflow-hidden flex items-center justify-center">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {isOnSale && <Badge variant="accent">Sale</Badge>}
          {product.is_new_arrival && <Badge variant="primary">New</Badge>}
          {product.is_best_seller && <Badge variant="secondary">Best Seller</Badge>}
          {product.stock_quantity === 0 && <Badge variant="destructive">Out of Stock</Badge>}
        </div>

        {/* Favorite heart button */}
        <button
          onClick={handleWishlistToggle}
          className={cn(
            "absolute top-3 right-3 z-10 p-2 rounded-full glass border hover:bg-white/95 text-foreground transition-all duration-200 cursor-pointer active:scale-90",
            isFavorite && "bg-white text-destructive border-transparent"
          )}
          aria-label="Add to wishlist"
        >
          <Heart className={cn("h-4.5 w-4.5 stroke-[2]", isFavorite && "fill-current")} />
        </button>

        {/* Image transition */}
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Add to Cart Overlay Button on Hover */}
        {product.stock_quantity > 0 && (
          <div className="absolute inset-0 bg-black/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <motion.div initial={{ y: 15 }} whileHover={{ y: 0 }} transition={{ duration: 0.2 }}>
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="sm"
                className="gap-2 shadow-lg"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Quick Add</span>
              </Button>
            </motion.div>
          </div>
        )}
      </div>

      {/* Info Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          {product.tagline && (
            <p className="text-xs text-muted-foreground/80 font-medium line-clamp-1">
              {product.tagline}
            </p>
          )}
        </div>

        {/* Ratings & Price */}
        <div className="flex items-center justify-between border-t border-border/60 pt-3">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-500 stroke-amber-500" />
            <span className="text-xs font-bold text-foreground">
              {product.avg_rating || "5.0"}
            </span>
            <span className="text-[10px] text-muted-foreground/80 font-semibold">
              ({product.review_count || 1})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isOnSale && (
              <span className="text-xs text-muted-foreground line-through font-medium">
                {formatCurrency(product.compare_price!)}
              </span>
            )}
            <span className="font-bold text-primary text-sm md:text-base">
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default ProductCard
