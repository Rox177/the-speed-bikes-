"use client"

import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"

const TESTIMONIALS = [
  {
    name: "Marcus Thorne",
    role: "Backcountry Guide",
    quote: "The Peak-9 completely redefined my trail scouting. I can climb grades that used to require pushing my bike, and the suspension handles rocks like butter.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format"
  },
  {
    name: "Elena Rostova",
    role: "Urban Commuter",
    quote: "My daily commute went from a sweaty chore to the highlight of my day. The Carbon S is incredibly light and looks so clean. Belt drive is a game changer.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format"
  },
  {
    name: "Devon Miller",
    role: "Weekend Explorer",
    quote: "I load up the Ranger Cargo with camping gear, a cooler, and my camera rigs. Even fully loaded, it pulls hills effortlessly. Dual batteries give me peace of mind.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 md:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Rider Testimonials</h2>
        <p className="text-sm md:text-base text-muted-foreground/80 font-medium">
          Hear from the adventurers, commuters, and trail blazers who ride VoltTrail.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 relative flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10 fill-current" />
            <div className="space-y-4">
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500 stroke-amber-500" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed font-medium">"{t.quote}"</p>
            </div>
            <div className="flex items-center gap-3 border-t border-border/60 pt-4">
              <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h4 className="text-sm font-bold text-foreground">{t.name}</h4>
                <p className="text-xs text-muted-foreground font-semibold">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
export default Testimonials
