
import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    title: 'Apple iPhone 15 Pro, 256GB, Blue Titanium - Fully Unlocked',
    price: 999.00,
    rating: 4.8,
    reviewCount: 12450,
    imageUrl: 'https://picsum.photos/id/160/600/600',
    category: 'Electronics',
    description: 'The iPhone 15 Pro features a strong and light aerospace-grade titanium design with a textured matte-glass back. It also features a Ceramic Shield front that’s tougher than any smartphone glass.',
    brand: 'Apple',
    features: [
      'Forged in Titanium',
      'A17 Pro Chip',
      'Powerful Pro Camera System',
      'Customizable Action Button'
    ],
    isPrime: true,
    stockStatus: 'In Stock'
  },
  {
    id: '2',
    title: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones',
    price: 348.00,
    rating: 4.6,
    reviewCount: 8900,
    imageUrl: 'https://picsum.photos/id/2/600/600',
    category: 'Electronics',
    description: 'The WH-1000XM5 headphones rewrite the rules of distraction-free listening. Two processors control 8 microphones for unprecedented noise cancellation and exceptional call quality.',
    brand: 'Sony',
    features: [
      'Industry-leading noise cancellation',
      'Magnificent Sound',
      'Crystal clear hands-free calling',
      'Up to 30-hour battery life'
    ],
    isPrime: true,
    stockStatus: 'In Stock'
  },
  {
    id: '3',
    title: 'Kindle Paperwhite (16 GB) – Now with a 6.8" display and adjustable warm light',
    price: 149.99,
    rating: 4.7,
    reviewCount: 25000,
    imageUrl: 'https://picsum.photos/id/1/600/600',
    category: 'Devices',
    description: 'Purpose-built for reading with a flush-front design and 300 ppi glare-free display that reads like real paper, even in bright sunlight.',
    brand: 'Amazon',
    features: [
      'Adjustable warm light',
      'Up to 10 weeks of battery life',
      'Waterproof reading',
      'A massive library in your pocket'
    ],
    isPrime: true,
    stockStatus: 'In Stock'
  },
  {
    id: '4',
    title: 'SAMSUNG 32-Inch Class QLED 4K Q60C Series Quantum HDR',
    price: 497.99,
    rating: 4.5,
    reviewCount: 3200,
    imageUrl: 'https://picsum.photos/id/10/600/600',
    category: 'Home Entertainment',
    description: 'Bask in a billion shades of brilliant color at 100% Color Volume. Quantum Processor Lite with 4K Upscaling optimizes content for QLED.',
    brand: 'Samsung',
    features: [
      '100% Color Volume with Quantum Dot',
      'Quantum HDR',
      'Motion Xcelerator',
      'Object Tracking Sound Lite'
    ],
    isPrime: false,
    stockStatus: 'Only 5 left in stock - order soon.'
  },
  {
    id: '5',
    title: 'Echo Dot (5th Gen, 2022 release) | Smart speaker with Alexa | Charcoal',
    price: 49.99,
    rating: 4.7,
    reviewCount: 45000,
    imageUrl: 'https://picsum.photos/id/12/600/600',
    category: 'Smart Home',
    description: 'Our best-sounding Echo Dot yet – Enjoy an improved audio experience compared to any previous Echo Dot with Alexa for clearer vocals, deeper bass and vibrant sound in any room.',
    brand: 'Amazon',
    features: [
      'Vibrant sound',
      'Helpful routines',
      'Privacy controls',
      'Sustainability design'
    ],
    isPrime: true,
    stockStatus: 'In Stock'
  },
  {
    id: '6',
    title: 'Logitech MX Master 3S Wireless Performance Mouse',
    price: 99.00,
    rating: 4.8,
    reviewCount: 15400,
    imageUrl: 'https://picsum.photos/id/20/600/600',
    category: 'Computers',
    description: 'Introducing Logitech MX Master 3S – an iconic mouse remastered. Now with Quiet Clicks and 8K DPI any-surface tracking for more feel and performance than ever before.',
    brand: 'Logitech',
    features: [
      '8K DPI any-surface tracking',
      'Quiet clicks',
      'MagSpeed scrolling',
      'Ergonomic design'
    ],
    isPrime: true,
    stockStatus: 'In Stock'
  }
];
