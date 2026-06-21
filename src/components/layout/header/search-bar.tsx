"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, X, Loader2, ArrowRight } from "lucide-react"
import { useUIStore } from "@/store/ui-store"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils/format"

export function SearchBar() {
  const router = useRouter()
  const { isSearchOpen, setSearchOpen } = useUIStore()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = "hidden"
    } else {
      setQuery("")
      setResults([])
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isSearchOpen])

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data.products || [])
      } catch (err) {
        console.error("Search failed:", err)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [query])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setSearchOpen(false)
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col justify-start"
          onClick={() => setSearchOpen(false)}
        >
          {/* Search container */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-background border-b border-border p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-4xl mx-auto flex items-center gap-4">
              <form onSubmit={handleSearchSubmit} className="flex-1 relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search our premium e-bikes & accessories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-muted border border-border rounded-xl pl-12 pr-12 py-4 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all text-foreground placeholder:text-muted-foreground/60 font-medium"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-4 p-1 hover:bg-border rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </form>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-3 bg-muted hover:bg-border rounded-xl border border-border text-foreground transition-all cursor-pointer font-medium active:scale-95"
              >
                Cancel
              </button>
            </div>

            {/* Dynamic Results list */}
            <div className="max-w-4xl mx-auto mt-4 overflow-y-auto max-h-[60vh] divide-y divide-border">
              {loading && (
                <div className="flex items-center justify-center py-12 gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Searching the trails...</span>
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="py-4 space-y-3">
                  <div className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-2">Matched Gear</div>
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/bikes/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-4 p-3 hover:bg-muted rounded-xl transition-all group"
                    >
                      <div className="h-16 w-16 bg-muted rounded-lg border border-border overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <img
                          src={product.thumbnail_url || "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=150&auto=format"}
                          alt={product.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-all duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate">{product.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{product.tagline || product.short_description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{formatCurrency(product.price)}</div>
                        <div className="text-[10px] text-muted-foreground flex items-center justify-end gap-1 font-semibold group-hover:text-primary transition-colors mt-1">
                          View details <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {!loading && query.trim().length >= 2 && results.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No gear found matching "<span className="font-semibold">{query}</span>".
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default SearchBar
