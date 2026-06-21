"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/products/product-card"
import { createClient } from "@/lib/supabase/client"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"

export function FeaturedBikes() {
  const [bikes, setBikes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBikes() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .eq("is_featured", true)
          .limit(3)
        
        if (data && data.length > 0) {
          setBikes(data)
        } else {
          setBikes([
            {
              id: 'p1111111-1111-1111-1111-111111111111',
              name: 'Apex Peak-9',
              slug: 'apex-peak-9',
              tagline: 'Conquer Any Trail.',
              price: 4999.00,
              compare_price: 5499.00,
              thumbnail_url: 'https://images.unsplash.com/photo-1544192240-4a34feb0104a?q=80&w=1200&auto=format&fit=crop',
              image_urls: ['https://images.unsplash.com/photo-1544192240-4a34feb0104a?q=80&w=1200&auto=format&fit=crop'],
              avg_rating: 4.8,
              review_count: 12,
              is_featured: true,
              stock_quantity: 5
            },
            {
              id: 'p1111111-1111-1111-1111-111111111112',
              name: 'UrbanFlow Carbon S',
              slug: 'urbanflow-carbon-s',
              tagline: 'Sleek. Light. City Commute.',
              price: 2899.00,
              thumbnail_url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop',
              image_urls: ['https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop'],
              avg_rating: 5.0,
              review_count: 8,
              is_new_arrival: true,
              stock_quantity: 8
            },
            {
              id: 'p1111111-1111-1111-1111-111111111113',
              name: 'Nomad Ranger Cargo',
              slug: 'nomad-ranger-cargo',
              tagline: 'Load Up. Go Beyond.',
              price: 3599.00,
              compare_price: 3899.00,
              thumbnail_url: 'https://images.unsplash.com/photo-1605557626697-2e87166d88f9?q=80&w=1200&auto=format&fit=crop',
              image_urls: ['https://images.unsplash.com/photo-1605557626697-2e87166d88f9?q=80&w=1200&auto=format&fit=crop'],
              avg_rating: 4.0,
              review_count: 4,
              is_best_seller: true,
              stock_quantity: 12
            }
          ])
        }
      } catch (err) {
        console.error("Failed to load featured bikes:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBikes()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Spinner size="lg" />
        <span className="text-sm text-muted-foreground font-semibold">Tuning the suspension...</span>
      </div>
    )
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Featured Performance</h2>
            <p className="text-sm md:text-base text-muted-foreground/80 font-medium">
              Explore our hand-picked selection of premium electric bikes designed to push the boundaries of performance.
            </p>
          </div>
          <Link
            href="/bikes"
            className="text-sm font-bold text-primary hover:text-olive-600 transition-colors flex items-center gap-1 active:scale-95 duration-200"
          >
            <span>View All Models</span>
            <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bikes.map((bike) => (
            <ProductCard key={bike.id} product={bike} />
          ))}
        </div>
      </div>
    </section>
  )
}
export default FeaturedBikes
