
export interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string;
  description: string;
  brand: string;
  features: string[];
  isPrime: boolean;
  stockStatus: string;
  buyNowUrl?: string; // Optional per-product override
}

export interface AppConfig {
  logoUrl: string;
  heroImageUrl: string;
  globalBuyNowUrl: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}
