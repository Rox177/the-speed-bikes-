"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { NAV_LINKS } from "@/lib/constants/nav-links"
import { AnimatePresence, motion } from "framer-motion"

export function NavMenu({ isDarkHeader }: { isDarkHeader: boolean }) {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null)

  return (
    <ul className="hidden lg:flex items-center gap-6" onMouseLeave={() => setActiveMenu(null)}>
      {NAV_LINKS.map((link) => {
        const hasItems = !!link.items?.length
        const isMenuOpen = activeMenu === link.title

        return (
          <li
            key={link.title}
            className="relative"
            onMouseEnter={() => {
              if (hasItems) {
                setActiveMenu(link.title)
              } else {
                setActiveMenu(null)
              }
            }}
          >
            <Link
              href={link.href}
              className={cn(
                "flex items-center gap-1 py-2 px-2 text-sm font-semibold tracking-wide transition-colors rounded-md cursor-pointer",
                isDarkHeader
                  ? "text-white hover:bg-gray-800 hover:text-olive-400"
                  : "text-black hover:bg-gray-100 hover:text-olive-600",
                isMenuOpen && (isDarkHeader ? "text-olive-400" : "text-olive-600")
              )}
            >
              <span>{link.title}</span>
              {hasItems && <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isMenuOpen && "rotate-180")} />}
            </Link>

            {hasItems && (
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-[50%] -translate-x-[50%] top-full z-50 w-[500px] bg-white text-foreground dark:bg-card border border-border rounded-xl shadow-xl p-5 grid grid-cols-2 gap-4"
                  >
                    {link.items?.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        className="flex flex-col gap-1 p-3 hover:bg-white dark:hover:bg-card rounded-lg transition-all group"
                      >
                        <div className="text-sm font-bold text-olive-500 group-hover:text-olive-600 transition-colors">
                          {item.title}
                        </div>
                        {item.description && (
                          <div className="text-xs text-black dark:text-muted-foreground/80 leading-normal font-medium">
                            {item.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </li>
        )
      })}
    </ul>
  )
}
