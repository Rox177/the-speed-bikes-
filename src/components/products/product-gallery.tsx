"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getProductImageUrl } from "@/lib/utils/image-utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductGalleryProps {
  images: string[]
  fallbackImage?: string
}

export function ProductGallery({ images = [], fallbackImage }: ProductGalleryProps) {
  const allImages = images.length > 0 ? images : [fallbackImage || ""]
  const [index, setIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] bg-muted border border-border rounded-2xl overflow-hidden flex items-center justify-center group shadow-sm">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={getProductImageUrl(allImages[index])}
            alt="Product view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </AnimatePresence>

        {allImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 p-2 rounded-full glass hover:bg-white text-foreground transition-all z-10 cursor-pointer active:scale-90"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 p-2 rounded-full glass hover:bg-white text-foreground transition-all z-10 cursor-pointer active:scale-90"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIndex(idx)
                setIsZoomed(false)
              }}
              className={`relative h-20 w-20 bg-muted rounded-xl border-2 overflow-hidden flex-shrink-0 cursor-pointer transition-all ${
                idx === index ? "border-primary scale-[0.97]" : "border-transparent opacity-75 hover:opacity-100"
              }`}
            >
              <img src={getProductImageUrl(img)} alt="Thumbnail view" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
export default ProductGallery
