"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowDown, Zap } from "lucide-react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Parallax transforms
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center text-white"
    >
      {/* Background Video / Image with Parallax */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/30 z-10" />
        
        {/* We can use a high-quality cycling stock video */}
        <img
          src="https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=1920&auto=format&fit=crop"
          alt="Cyclist climbing mountain pass at sunset"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Floating text content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-8 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold tracking-wider uppercase text-primary-foreground"
        >
          <Zap className="h-3.5 w-3.5 fill-current" />
          <span>The Future of Off-Road Mobility</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-display leading-[1.1] tracking-tight max-w-4xl"
        >
          Ride Further.<br className="md:hidden" /> Live Wilder.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-base md:text-xl text-neutral-300 max-w-2xl font-medium leading-relaxed"
        >
          Experience alpine-grade electric performance. Engineered to tackle the steepest mountain peaks and navigate sleek urban streets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link
            href="/bikes"
            className="h-13 px-8 bg-primary text-primary-foreground hover:bg-olive-600 font-bold rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-98"
          >
            Explore E-Bikes
          </Link>
          <Link
            href="/categories/accessories"
            className="h-13 px-8 bg-gray-3 hover:bg-olive-600 border border-black/5 backdrop-blur-sm text-white font-bold rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-98"
          >
            Shop Accessories
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: infinite }}
        style={{ opacity: opacityText }}
        className="absolute bottom-10 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight - 80,
            behavior: "smooth",
          })
        }}
      >
        <span className="text-[10px] tracking-widest uppercase font-bold text-neutral-400">Scroll Down</span>
        <ArrowDown className="h-4 w-4 text-neutral-400" />
      </motion.div>
    </div>
  )
}
const infinite = Infinity
export default HeroSection
