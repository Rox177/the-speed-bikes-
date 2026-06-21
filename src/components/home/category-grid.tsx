"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const CATEGORIES_ITEMS = [
  {
    title: "Mountain E-MTBs",
    slug: "mountain-e-bikes",
    image: "https://images.unsplash.com/photo-1544192240-4a34feb0104a?q=80&w=600&auto=format&fit=crop",
    desc: "Full suspension and quad-piston hydraulic brakes for vertical ascents and rugged singletracks.",
  },
  {
    title: "Urban Commuters",
    slug: "urban-commuter-e-bikes",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=600&auto=format&fit=crop",
    desc: "Lightweight carbon frames, carbon belt drives, and integrated lighting for effortless city transit.",
  },
  {
    title: "Adventure Utility",
    slug: "adventure-e-bikes",
    image: "https://images.unsplash.com/photo-1605557626697-2e87166d88f9?q=80&w=600&auto=format&fit=crop",
    desc: "Heavy-duty cargo capacities, modular rack systems, and dual-battery configurations.",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-20 max-w-[1400px] mx-auto px-6 md:px-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Select Your Terrain</h2>
        <p className="text-sm md:text-base text-muted-foreground/80 font-medium">
          Choose a platform engineered specifically for how and where you ride.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CATEGORIES_ITEMS.map((cat, idx) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="group relative h-[450px] rounded-2xl overflow-hidden border border-border bg-black shadow-md"
          >
            <div className="absolute inset-0 w-full h-full opacity-70 group-hover:scale-105 transition-transform duration-500">
              <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-white space-y-3">
              <h3 className="text-2xl font-bold font-display">{cat.title}</h3>
              <p className="text-xs text-neutral-300 font-medium leading-relaxed">{cat.desc}</p>
              
              <Link
                href={`/categories/${cat.slug}`}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-primary-foreground group-hover:text-accent transition-colors self-start"
              >
                <span>Discover Collection</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
export default CategoryGrid
