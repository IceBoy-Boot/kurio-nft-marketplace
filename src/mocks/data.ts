
export interface NFT {
  id: number
  name: string
  price: string
  image: string
  category: string
  available: number
}

export const nfts: NFT[] = [
  {
    id: 1,
    name: 'Original Ape #001',
    price: '1.18',
    image: '/images/hero-ape.png',
    category: 'Arte digital',
    available: 5,
  },
  {
    id: 2,
    name: 'Royal Ape #002',
    price: '1.45',
    image: '/images/hero-ape.png',
    category: 'Avatares',
    available: 3,
  },
  {
    id: 3,
    name: 'Rare Vision #003',
    price: '1.30',
    image: '/images/hero-ape.png',
    category: 'Colecionáveis',
    available: 8,
  },
  {
    id: 4,
    name: 'Classic Ape #004',
    price: '1.25',
    image: '/images/hero-ape.png',
    category: 'Arte digital',
    available: 2,
  },
  {
    id: 5,
    name: 'Urban Ape #005',
    price: '1.32',
    image: '/images/hero-ape.png',
    category: 'Avatares',
    available: 6,
  },
  {
    id: 6,
    name: 'Golden Ape #006',
    price: '2.10',
    image: '/images/hero-ape.png',
    category: 'Colecionáveis',
    available: 1,
  },
]
