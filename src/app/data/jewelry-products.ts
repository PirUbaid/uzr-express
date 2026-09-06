export interface JewelryProductImage {
  src: string;
  alt: string;
}

export interface JewelryProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  images: JewelryProductImage[];
  badge?: string;
  material?: string;
  size?: string;
  colour?: string;
  availability?: string;
  description: string;
}

export const JEWELRY_PRODUCTS: JewelryProduct[] = [
  {
    id: 1,
    name: 'Silver/White Jewellery Set',
    price: 498,
    category: 'Jewellery Set',
    badge: 'Rs 498',
    images: [
      {
        src: 'assets/images/jewelry/silver-white-set/main.jpeg',
        alt: 'Silver-tone and white jewellery set with clear stone details',
      },
      {
        src: 'assets/images/jewelry/silver-white-set/view-2.jpeg',
        alt: 'Second view of silver-tone and white jewellery set',
      },
    ],
    material: 'Silver-tone finish with clear stone details',
    colour: 'Silver and white',
    description: 'Silver-tone and white jewellery set with clear stone accents for gifting and event wear.',
  },
  {
    id: 2,
    name: 'Blue Jewellery Set',
    price: 499,
    category: 'Jewellery Set',
    images: [
      {
        src: 'assets/images/jewelry/blue-set/main.jpeg',
        alt: 'Blue jewellery set with blue stone details',
      },
    ],
    material: 'Jewellery set with blue stone details',
    colour: 'Blue',
    description: 'Blue jewellery set with matching stone-style details for a bright coordinated look.',
  },
  {
    id: 7,
    name: 'Black Jewellery Set',
    price: 499,
    category: 'Jewellery Set',
    badge: 'New',
    images: [
      {
        src: 'assets/images/jewelry/black-set/main.jpeg',
        alt: 'Silver-tone jewellery set with polished black centre stones',
      },
    ],
    material: 'Silver-tone finish with black stone details',
    colour: 'Black and silver-tone',
    description: 'Silver-tone geometric necklace and matching earrings with polished black centre stones.',
  },
  {
    id: 3,
    name: 'Mint Green Jewellery Set',
    price: 499,
    category: 'Jewellery Set',
    images: [
      {
        src: 'assets/images/jewelry/mint-green-set/main.jpeg',
        alt: 'Mint-green jewellery set with matching stone details',
      },
      {
        src: 'assets/images/jewelry/mint-green-set/view-2.jpeg',
        alt: 'Second view of mint-green jewellery set',
      },
    ],
    material: 'Jewellery set with mint-green stone details',
    colour: 'Mint green',
    description: 'Mint-green jewellery set with soft stone-style accents for everyday or occasion styling.',
  },
  {
    id: 4,
    name: 'Pink Jewellery Set',
    price: 499,
    category: 'Jewellery Set',
    images: [
      {
        src: 'assets/images/jewelry/pink-set/main.jpeg',
        alt: 'Pink jewellery set with matching stone details',
      },
    ],
    material: 'Jewellery set with pink stone details',
    colour: 'Pink',
    description: 'Pink jewellery set with matching stone-style details for a feminine gift-ready look.',
  },
  {
    id: 5,
    name: 'Golden Pendant',
    price: 499,
    category: 'Pendant',
    images: [
      {
        src: 'assets/images/jewelry/golden-pendant/main.jpeg',
        alt: 'Gold-tone pendant with clear stone detail',
      },
    ],
    material: 'Gold-tone finish with clear stone detail',
    colour: 'Gold-tone',
    description: 'Gold-tone pendant with a clear stone-style detail for a simple polished accessory.',
  },
  {
    id: 6,
    name: 'Golden Watch',
    price: 599,
    category: 'Watch',
    badge: 'Rs 599',
    images: [
      {
        src: 'assets/images/jewelry/golden-watch/main.jpeg',
        alt: 'Gold-tone watch main product view',
      },
      {
        src: 'assets/images/jewelry/golden-watch/view-2.jpeg',
        alt: 'Gold-tone watch light-background wrist view',
      },
      {
        src: 'assets/images/jewelry/golden-watch/view-3.jpeg',
        alt: 'Gold-tone watch dark-background wrist view',
      },
    ],
    material: 'Gold-tone watch finish',
    colour: 'Gold-tone',
    description: 'Gold-tone watch with multiple product and wrist views for easy WhatsApp ordering.',
  },
];
