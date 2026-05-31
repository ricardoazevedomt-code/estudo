export interface ProductImage {
  id: number;
  url: string;
  order: number;
}

export interface ProductVariant {
  id: number;
  color: string;
  size: string;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  discountPrice?: number | null;
  description?: string | null;
  technical?: string | null;
  images: ProductImage[];
  variants: ProductVariant[];
}
