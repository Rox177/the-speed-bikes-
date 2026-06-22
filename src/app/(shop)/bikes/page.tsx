"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductSort } from "@/components/products/product-sort"
import { ProductCard } from "@/components/products/product-card"
import { Spinner } from "@/components/ui/spinner"
import { PageWrapper } from "@/components/layout/page-wrapper"

export default function BikesPage() {
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6000])
  const [selectedMotorPower, setSelectedMotorPower] = useState("")
  const [sortBy, setSortBy] = useState("featured")

  useEffect(() => {
    async function loadProducts() {
      try {
        const supabase = createClient()
        // Query only products belonging to E-Bikes category or parent category
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_active", true)

        if (data && data.length > 0) {
          setProducts(data)
        } else {
          // Dynamic offline seed fallback.
          setProducts([
            {
              id: 'p1111111-1111-1111-1111-111111111111',
              name: 'Apex 50',
              slug: 'Apex 50',
              tagline: 'Summit Any Peak. Conquer Any Trail.',
              description: 'Carbon fiber premium E-MTB.',
              price: 1,199.00, 
              compare_price: 5499.00,
              thumbnail_url: 'https://www.andskyebike.com/cdn/shop/files/1_9af77a1c-3b80-4ef5-befb-017b6d563ea3.webp?v=1768888627&width=1344',
              avg_rating: 4.8,
              review_count: 12,
              is_featured: true,
              is_best_seller: true,
              stock_quantity: 5,
              brand_id: 'b1111111-1111-1111-1111-111111111111',
              category_id: 'c1111111-1111-1111-1111-111111111114',
              motor_power_w: 750
            },
            {
              id: 'p1111111-1111-1111-1111-111111111112',
              name: 'UrbanFlow Carbon S',
              slug: 'urbanflow-carbon-s',
              tagline: 'Sleek. Light. City Transit.',
              description: 'Ultra-light commuter belt-drive e-bike.',
              price: 2899.00,
              thumbnail_url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=600&auto=format',
              avg_rating: 5.0,
              review_count: 8,
              is_new_arrival: true,
              stock_quantity: 8,
              brand_id: 'b3333333-3333-3333-3333-333333333333',
              category_id: 'c1111111-1111-1111-1111-111111111113',
              motor_power_w: 250
            },
            {
              id: 'p1111111-1111-1111-1111-111111111113',
              name: 'Nomad Ranger Cargo',
              slug: 'nomad-ranger-cargo',
              tagline: 'Load Up. Go Beyond.',
              description: 'Sturdy modular utility cargo e-bike.',
              price: 3599.00,
              compare_price: 3899.00,
              thumbnail_url: 'https://images.unsplash.com/photo-1605557626697-2e87166d88f9?q=80&w=600&auto=format',
              avg_rating: 4.0,
              review_count: 4,
              is_best_seller: true,
              stock_quantity: 12,
              brand_id: 'b2222222-2222-2222-2222-222222222222',
              category_id: 'c1111111-1111-1111-1111-111111111112',
              motor_power_w: 500
            }
          ])
        }
      } catch (err) {
        console.error("Failed to load products:", err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products]

    // Brand Filter
    if (selectedBrand) {
      // Find brand by slug to match brand_id
      const brandIdMap: Record<string, string> = {
        "apex-mobility": "b1111111-1111-1111-1111-111111111111",
        "nomad-e-bikes": "b2222222-2222-2222-2222-222222222222",
        "urbanflow": "b3333333-3333-3333-3333-333333333333",
        "terratrail": "b4444444-4444-4444-4444-444444444444",
      }
      const targetBrandId = brandIdMap[selectedBrand]
      result = result.filter((p) => p.brand_id === targetBrandId)
    }

    // Category Filter
    if (selectedCategory) {
      const catIdMap: Record<string, string> = {
        "adventure-e-bikes": "c1111111-1111-1111-1111-111111111112",
        "urban-commuter-e-bikes": "c1111111-1111-1111-1111-111111111113",
        "mountain-e-bikes": "c1111111-1111-1111-1111-111111111114",
      }
      const targetCatId = catIdMap[selectedCategory]
      result = result.filter((p) => p.category_id === targetCatId)
    }

    // Price Filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Motor Power Filter
    if (selectedMotorPower) {
      result = result.filter((p) => p.motor_power_w === parseInt(selectedMotorPower))
    }

    // Sort sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.avg_rating || 0) - (a.avg_rating || 0))
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime())
    } else {
      // featured
      result.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0))
    }

    setFilteredProducts(result)
  }, [products, selectedCategory, selectedBrand, priceRange, selectedMotorPower, sortBy])

  const clearAllFilters = () => {
    setSelectedCategory("")
    setSelectedBrand("")
    setPriceRange([0, 6000])
    setSelectedMotorPower("")
    setSortBy("featured")
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 pt-20">
        <Spinner size="lg" />
        <span className="text-sm text-muted-foreground font-semibold">Aligning the frame...</span>
      </div>
    )
  }

  return (
    <PageWrapper className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-8 space-y-10">
      {/* Title Header */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-5xl font-black text-foreground">Premium E-Bikes</h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl font-medium">
          Select from our range of high-performance electric bicycles built with high-torque mid-drives, long-range batteries, and lightweight carbon frames.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filters column */}
        <aside className="lg:col-span-3 lg:sticky lg:top-28">
          <ProductFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedMotorPower={selectedMotorPower}
            setSelectedMotorPower={setSelectedMotorPower}
            clearAll={clearAllFilters}
          />
        </aside>

        {/* Right Products column */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Showing {filteredProducts.length} Models
            </span>
            <ProductSort sortBy={sortBy} setSortBy={setSortBy} />
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border rounded-xl text-muted-foreground font-semibold">
              No e-bikes found matching the current filter configurations. Try clearing filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
