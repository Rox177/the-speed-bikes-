export interface Brand {
  id: string
  name: string
  slug: string
  logoUrl: string
  bannerUrl: string
  description: string
  country: string
  websiteUrl: string
  isFeatured: boolean
}

export const BRANDS: Brand[] = [
  {
    id: 'b1111111-1111-1111-1111-111111111111',
    name: 'Apex Mobility',
    slug: 'apex-mobility',
    logoUrl: '/images/brands/apex.svg',
    bannerUrl: '/images/brands/apex-banner.jpg',
    description: 'Rugged, high-end mountain e-bikes built for alpine trails and backcountry exploring.',
    country: 'USA',
    websiteUrl: 'https://apexmobility.com',
    isFeatured: true,
  },
  {
    id: 'b2222222-2222-2222-2222-222222222222',
    name: 'Nomad E-Bikes',
    slug: 'nomad-e-bikes',
    logoUrl: '/images/brands/nomad.svg',
    bannerUrl: '/images/brands/nomad-banner.jpg',
    description: 'Versatile touring and cargo e-bikes designed for long-distance self-supported adventure.',
    country: 'Germany',
    websiteUrl: 'https://nomadebikes.de',
    isFeatured: true,
  },
  {
    id: 'b3333333-3333-3333-3333-333333333333',
    name: 'UrbanFlow',
    slug: 'urbanflow',
    logoUrl: '/images/brands/urbanflow.svg',
    bannerUrl: '/images/brands/urbanflow-banner.jpg',
    description: 'Ultra-sleek, lightweight urban commuter e-bikes with integrated smart technologies.',
    country: 'Netherlands',
    websiteUrl: 'https://urbanflow.nl',
    isFeatured: true,
  },
  {
    id: 'b4444444-4444-4444-4444-444444444444',
    name: 'TerraTrail',
    slug: 'terratrail',
    logoUrl: '/images/brands/terratrail.svg',
    bannerUrl: '/images/brands/terratrail-banner.jpg',
    description: 'Robust all-road and gravel hybrid electric bikes bridging the gap between city streets and gravel paths.',
    country: 'Canada',
    websiteUrl: 'https://terratrail.ca',
    isFeatured: false,
  },
]
