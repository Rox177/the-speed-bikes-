"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Spinner } from "@/components/ui/spinner"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { ProductGallery } from "@/components/products/product-gallery"
import { ProductInfo } from "@/components/products/product-info"
import { ProductSpecs } from "@/components/products/product-specs"
import { ProductReviews } from "@/components/products/product-reviews"

export default function BikeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [product, setProduct] = useState<any | null>(null)
  const [specs, setSpecs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProductDetails() {
      try {
        const supabase = createClient()
        const { data: prodData, error: prodErr } = await supabase
          .from("products")
          .select("*")
          .eq("slug", slug)
          .single()

        if (prodData) {
          setProduct(prodData)
          
          const { data: specData } = await supabase
            .from("product_specs")
            .select("*")
            .eq("product_id", prodData.id)
            .order("sort_order")
          
          if (specData) setSpecs(specData)
        } else {
          const seedBikes = [
            {
              id: 'p1111111-1111-1111-1111-111111111111',
              name: 'Apex Peak-9',
              slug: 'apex-peak-9',
              tagline: 'Summit Any Peak. Conquer Any Trail.',
              description: 'The Apex Peak-9 represents the pinnacle of electric mountain biking engineering. Built with a full-carbon fiber frame and powered by a high-torque 750W mid-drive motor, it handles vertical climbs effortlessly. Featuring an advanced dual-suspension layout with 160mm travel, this e-bike smoothens the roughest rock gardens and roots. The integrated 720Wh battery ensures you can tackle multiple peaks on a single charge.',
              price: 4999.00,
              compare_price: 5499.00,
              thumbnail_url: 'https://images.unsplash.com/photo-1544192240-4a34feb0104a?q=80&w=600&auto=format',
              image_urls: [
                'https://images.unsplash.com/photo-1544192240-4a34feb0104a?q=80&w=600&auto=format',
                'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=600&auto=format',
              ],
              avg_rating: 4.8,
              review_count: 12,
              stock_quantity: 5,
              color: 'Forest Green',
              frame_sizes: ['S', 'M', 'L'],
              warranty_years: 3,
              weight_kg: 23.5
            },
            {
              id: 'p1111111-1111-1111-1111-111111111112',
              name: 'UrbanFlow Carbon S',
              slug: 'urbanflow-carbon-s',
              tagline: 'Sleek. Light. City Transit.',
              description: 'Designed for the modern urbanite, the UrbanFlow Carbon S weighs in at a remarkable 15.5 kg, making it one of the lightest commuter e-bikes in its class. Featuring an integrated carbon handlebar, invisible internal cable routing, and a clean gates carbon belt drive, it offers near-silent operation and zero maintenance. The rear hub motor delivers a smooth 250W boost that works in perfect harmony with your natural pedaling cadence.',
              price: 2899.00,
              thumbnail_url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=600&auto=format',
              image_urls: [
                'https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=600&auto=format',
                'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=600&auto=format',
              ],
              avg_rating: 5.0,
              review_count: 8,
              stock_quantity: 8,
              color: 'Slate Gray',
              frame_sizes: ['M', 'L'],
              warranty_years: 2,
              weight_kg: 15.5
            },
            {
              id: 'p1111111-1111-1111-1111-111111111113',
              name: 'Nomad Ranger Cargo',
              slug: 'nomad-ranger-cargo',
              tagline: 'Load Up. Go Beyond.',
              description: 'The Nomad Ranger Cargo is built for the long haul. With an extra-sturdy aluminum utility frame, heavy-duty rear cargo rack, and dual-battery capability, this bike carries up to 180kg of payload. The high-performance 500W cargo-optimized mid-drive motor provides stable climbing power even when fully loaded. Ideal for long touring adventures or hauling groceries and children around town.',
              price: 3599.00,
              compare_price: 3899.00,
              thumbnail_url: 'https://images.unsplash.com/photo-1605557626697-2e87166d88f9?q=80&w=600&auto=format',
              image_urls: [
                'https://images.unsplash.com/photo-1605557626697-2e87166d88f9?q=80&w=600&auto=format',
                'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=600&auto=format',
              ],
              avg_rating: 4.0,
              review_count: 4,
              stock_quantity: 12,
              color: 'Safari Sand',
              frame_sizes: ['M'],
              warranty_years: 2,
              weight_kg: 31.0
            }
          ]

          const matchedProd = seedBikes.find((b) => b.slug === slug)
          if (matchedProd) {
            setProduct(matchedProd)
            const mockSpecs = [
              { spec_group: "Electronics", spec_key: "Motor", spec_value: "750W Mid-drive Torque sensor" },
              { spec_group: "Electronics", spec_key: "Battery", spec_value: "48V 15Ah (720Wh) Samsung Cells" },
              { spec_group: "Components", spec_key: "Fork", spec_value: "RockShox Lyric, 160mm travel" },
              { spec_group: "Components", spec_key: "Drivetrain", spec_value: "SRAM GX Eagle 12-Speed" },
            ]
            setSpecs(mockSpecs)
          }
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProductDetails()
  }, [slug])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 pt-20">
        <Spinner size="lg" />
        <span className="text-sm text-muted-foreground font-semibold">Torque sensing...</span>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-28 pb-20 text-center max-w-lg mx-auto space-y-4">
        <h2 className="text-2xl font-bold">Model Not Found</h2>
        <p className="text-sm text-muted-foreground">The premium e-bike you are looking for has ridden off the grid.</p>
        <button onClick={() => router.push("/bikes")} className="text-primary font-bold hover:underline cursor-pointer">
          Back to E-Bikes Shop
        </button>
      </div>
    )
  }

  return (
    <PageWrapper className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-8 space-y-12">
      <button
        onClick={() => router.push("/bikes")}
        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors cursor-pointer group active:scale-95 duration-200"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to E-Bikes Shop</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <ProductGallery images={product.image_urls || []} fallbackImage={product.thumbnail_url} />
        </div>
        <div className="lg:col-span-5">
          <ProductInfo product={product} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-border/85 pt-10">
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-xl font-bold text-foreground font-display">Ride Experience</h3>
          <p className="text-sm text-foreground/80 leading-relaxed font-medium">{product.description}</p>
        </div>
        <div className="lg:col-span-6">
          <ProductSpecs specs={specs} />
        </div>
      </div>

      <div className="border-t border-border/85 pt-10 space-y-6">
        <ProductReviews productId={product.id} />
      </div>
    </PageWrapper>
  )
}
