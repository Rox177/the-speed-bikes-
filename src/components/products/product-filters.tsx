"use client"

import { CATEGORIES } from "@/lib/constants/categories"
import { BRANDS } from "@/lib/constants/brands"
import { formatCurrency } from "@/lib/utils/format"

interface ProductFiltersProps {
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  selectedBrand: string
  setSelectedBrand: (brand: string) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  selectedMotorPower: string
  setSelectedMotorPower: (power: string) => void
  clearAll: () => void
}

export function ProductFilters({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  selectedMotorPower,
  setSelectedMotorPower,
  clearAll,
}: ProductFiltersProps) {
  return (
    <div className="space-y-8 bg-card p-6 border border-border rounded-xl">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h3 className="font-bold text-lg text-foreground">Filters</h3>
        <button
          onClick={clearAll}
          className="text-xs font-semibold text-primary hover:text-olive-600 transition-colors cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* Category filters */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold tracking-wider uppercase text-foreground">Categories</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-sm font-semibold text-muted-foreground/90 hover:text-foreground cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === ""}
              onChange={() => setSelectedCategory("")}
              className="accent-primary h-4 w-4"
            />
            <span>All Categories</span>
          </label>
          {CATEGORIES[0]?.subcategories?.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2.5 text-sm font-semibold text-muted-foreground/90 hover:text-foreground cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.slug}
                onChange={() => setSelectedCategory(cat.slug)}
                className="accent-primary h-4 w-4"
              />
              <span>{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand filters */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold tracking-wider uppercase text-foreground">Brands</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-sm font-semibold text-muted-foreground/90 hover:text-foreground cursor-pointer">
            <input
              type="radio"
              name="brand"
              checked={selectedBrand === ""}
              onChange={() => setSelectedBrand("")}
              className="accent-primary h-4 w-4"
            />
            <span>All Brands</span>
          </label>
          {BRANDS.map((brand) => (
            <label
              key={brand.id}
              className="flex items-center gap-2.5 text-sm font-semibold text-muted-foreground/90 hover:text-foreground cursor-pointer"
            >
              <input
                type="radio"
                name="brand"
                checked={selectedBrand === brand.slug}
                onChange={() => setSelectedBrand(brand.slug)}
                className="accent-primary h-4 w-4"
              />
              <span>{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold tracking-wider uppercase text-foreground">Price Limit</h4>
        <div className="space-y-2">
          <input
            type="range"
            min={100}
            max={6000}
            step={100}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-primary h-1.5 bg-white dark:bg-muted rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center text-xs font-bold text-muted-foreground">
            <span>{formatCurrency(priceRange[0])}</span>
            <span>Up to {formatCurrency(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Motor Power Rating */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold tracking-wider uppercase text-foreground">Motor Performance</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-sm font-semibold text-muted-foreground/90 hover:text-foreground cursor-pointer">
            <input
              type="radio"
              name="motorPower"
              checked={selectedMotorPower === ""}
              onChange={() => setSelectedMotorPower("")}
              className="accent-primary h-4 w-4"
            />
            <span>Any Power</span>
          </label>
          {["250W", "500W", "750W"].map((power) => (
            <label
              key={power}
              className="flex items-center gap-2.5 text-sm font-semibold text-muted-foreground/90 hover:text-foreground cursor-pointer"
            >
              <input
                type="radio"
                name="motorPower"
                checked={selectedMotorPower === power.replace("W", "")}
                onChange={() => setSelectedMotorPower(power.replace("W", ""))}
                className="accent-primary h-4 w-4"
              />
              <span>{power} Mid-Drive/Hub</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ProductFilters
