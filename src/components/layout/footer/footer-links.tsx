import Link from "next/link"

const LINKS = [
  {
    title: "Shop Gear",
    items: [
      { name: "All E-Bikes", href: "/bikes" },
      { name: "Adventure E-Bikes", href: "/categories/adventure-e-bikes" },
      { name: "Urban Commuters", href: "/categories/urban-commuter-e-bikes" },
      { name: "Mountain E-MTBs", href: "/categories/mountain-e-bikes" },
      { name: "Safety Accessories", href: "/categories/safety-gear" },
    ],
  },
  {
    title: "Company",
    items: [
      { name: "About Us", href: "/about" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Journal (Blog)", href: "/blog" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "FAQ", href: "/faq" },
      { name: "Shipping & Delivery", href: "/shipping" },
      { name: "Returns & Refunds", href: "/returns" },
      { name: "Warranty Policy", href: "/warranty" },
    ],
  },
]

export function FooterLinks() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
      {LINKS.map((col) => (
        <div key={col.title} className="space-y-4">
          <h4 className="text-sm font-bold tracking-wider uppercase text-foreground/90">{col.title}</h4>
          <ul className="space-y-2.5">
            {col.items.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
export default FooterLinks
