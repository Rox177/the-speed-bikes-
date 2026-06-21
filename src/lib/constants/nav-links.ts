export interface NavItem {
  title: string
  href: string
  items?: { title: string; href: string; description?: string }[]
}

export const NAV_LINKS: NavItem[] = [
  {
    title: 'E-Bikes',
    href: '/bikes',
    items: [
      { title: 'All E-Bikes', href: '/bikes', description: 'Browse our entire collection of premium electric bikes.' },
      { title: 'Adventure E-Bikes', href: '/categories/adventure-e-bikes', description: 'Rugged e-bikes for wilderness and trail exploration.' },
      { title: 'Urban Commuter E-Bikes', href: '/categories/urban-commuter-e-bikes', description: 'Sleek, lightweight city commuter electric bikes.' },
      { title: 'Mountain E-Bikes', href: '/categories/mountain-e-bikes', description: 'Full suspension E-MTBs for steep ascents and rugged trails.' },
    ],
  },
  {
    title: 'Accessories',
    href: '/accessories',
    items: [
      { title: 'All Accessories', href: '/accessories', description: 'High-quality gears, components, and racks.' },
      { title: 'Safety & Gear', href: '/categories/safety-gear', description: 'Premium helmets, lights, and lock utilities.' },
      { title: 'Bags & Racks', href: '/categories/bags-racks', description: 'Waterproof frame bags, panniers, and utility racks.' },
    ],
  },
  {
    title: 'Brands',
    href: '/brands',
    items: [
      { title: 'Apex Mobility', href: '/brands/apex-mobility', description: 'Alpine-grade electric mountain bikes.' },
      { title: 'Nomad E-Bikes', href: '/brands/nomad-e-bikes', description: 'Long-distance touring and heavy cargo e-bikes.' },
      { title: 'UrbanFlow', href: '/brands/urbanflow', description: 'Ultra-lightweight, smart commuter e-bikes.' },
    ],
  },
  {
    title: 'Sustainability',
    href: '/sustainability',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
]
