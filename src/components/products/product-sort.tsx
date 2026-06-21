"use client"

import { Select } from "@/components/ui/select"

interface ProductSortProps {
  sortBy: string
  setSortBy: (sort: string) => void
}

export function ProductSort({ sortBy, setSortBy }: ProductSortProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 whitespace-nowrap">
        Sort By
      </span>
      <Select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-44 text-xs font-semibold h-9 py-1"
      >
        <option value="featured">Featured Gear</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Rider Rating</option>
        <option value="newest">Newest Arrivals</option>
      </Select>
    </div>
  )
}
export default ProductSort
