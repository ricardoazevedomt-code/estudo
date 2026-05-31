import { createProduct, getAllProducts } from '@/app/actions/products';
import { NextResponse } from 'next/server';
// Authentication imports removed

export async function GET(request: Request) {
  const products = await getAllProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  // Authentication disabled for now
  const product = await createProduct(request as any);
  return NextResponse.json(product);
}
