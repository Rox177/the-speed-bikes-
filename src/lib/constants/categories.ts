export interface Category {
  id: string
  parentId: string | null
  name: string
  slug: string
  description: string
  imageUrl: string
  iconName: string
  subcategories?: Category[]
}

export const CATEGORIES: Category[] = [
  {
    id: 'c1111111-1111-1111-1111-111111111111',
    parentId: null,
    name: 'E-Bikes',
    slug: 'e-bikes',
    description: 'Premium electric bicycles for adventure, commuting, and off-road riding.',
    imageUrl: '/images/categories/e-bikes.jpg',
    iconName: 'Bike',
    subcategories: [
      {
        id: 'c1111111-1111-1111-1111-111111111112',
        parentId: 'c1111111-1111-1111-1111-111111111111',
        name: 'Adventure E-Bikes',
        slug: 'adventure-e-bikes',
        description: 'Rugged, dual-sport and utility e-bikes for trail and exploration.',
        imageUrl: '/images/categories/adventure.jpg',
        iconName: 'Compass',
      },
      {
        id: 'c1111111-1111-1111-1111-111111111113',
        parentId: 'c1111111-1111-1111-1111-111111111111',
        name: 'Urban Commuter E-Bikes',
        slug: 'urban-commuter-e-bikes',
        description: 'Fast, lightweight, and stylish electric bikes for city commuting.',
        imageUrl: '/images/categories/urban.jpg',
        iconName: 'Building',
      },
      {
        id: 'c1111111-1111-1111-1111-111111111114',
        parentId: 'c1111111-1111-1111-1111-111111111111',
        name: 'Mountain E-Bikes',
        slug: 'mountain-e-bikes',
        description: 'Full-suspension and hardtail electric mountain bikes for tackling steep ascents and rugged descents.',
        imageUrl: '/images/categories/mountain.jpg',
        iconName: 'Mountain',
      },
    ]
  },
  {
    id: 'c2222222-2222-2222-2222-222222222222',
    parentId: null,
    name: 'Accessories',
    slug: 'accessories',
    description: 'High-quality components, apparel, and utility gear for your ride.',
    imageUrl: '/images/categories/accessories.jpg',
    iconName: 'Wrench',
    subcategories: [
      {
        id: 'c2222222-2222-2222-2222-222222222223',
        parentId: 'c2222222-2222-2222-2222-222222222222',
        name: 'Safety & Gear',
        slug: 'safety-gear',
        description: 'Helmets, lights, and locks to keep you safe.',
        imageUrl: '/images/categories/safety.jpg',
        iconName: 'Shield',
      },
      {
        id: 'c2222222-2222-2222-2222-222222222224',
        parentId: 'c2222222-2222-2222-2222-222222222222',
        name: 'Bags & Racks',
        slug: 'bags-racks',
        description: 'Waterproof panniers, frame packs, and heavy-duty racks.',
        imageUrl: '/images/categories/bags.jpg',
        iconName: 'ShoppingBag',
      },
    ]
  }
]
