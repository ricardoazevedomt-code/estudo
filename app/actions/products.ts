import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';
import type { NextRequest } from 'next/server';


import { promises as fs } from 'fs';
import path from 'path';

// Helper to ensure the public/products directory exists
async function ensureProductDir() {
  const dir = path.join(process.cwd(), 'public', 'products');
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

// Type definitions
export type ProductVariant = {
  id: number;
  color: string;
  size: string;
  stock: number;
};

export type ProductImage = {
  id: number;
  url: string; // relative URL, e.g. /products/abc123.jpg
  order: number;
};

export type Product = {
  id: number;
  name: string;
  sku: string;
  price: number;
  discountPrice?: number | null;
  description?: string | null; // tiptap HTML
  images: ProductImage[];
  variants: ProductVariant[];
};

/** Get all products with images and variants (public) */
export async function getAllProducts(): Promise<Product[]> {
  try {
    return await prisma.product.findMany({
      include: { images: { orderBy: { order: 'asc' } }, variants: true },
    });
  } catch (e) {
    console.error('Failed to fetch products from DB, returning mock data', e);
    // Minimal mock product for UI preview
    return [
      {
        id: 0,
        name: 'Produto Exemplo',
        sku: 'EXEMPLO-001',
        price: 99.99,
        discountPrice: null,
        description: '<p>Descrição de exemplo.</p>',
        images: [{ id: 0, url: 'https://via.placeholder.com/400x300', order: 0 }],
        variants: [{ id: 0, color: 'Preto', size: 'M', stock: 10 }],
      },
    ];
  }
}

/** Create a product – expects multipart/form-data */
export async function createProduct(req: NextRequest) {
  const dir = await ensureProductDir();

  const form = await req.formData();
  const name = form.get('name') as string;
  const sku = form.get('sku') as string;
  const price = Number(form.get('price'));
  const discountPrice = form.get('discountPrice') ? Number(form.get('discountPrice')) : null;
  const description = form.get('description') as string | null;

  // Variants JSON string
  const variantsJson = form.get('variants') as string;
  const variants: { color: string; size: string; stock: number }[] = JSON.parse(variantsJson);

  // Images handling – up to 5 files with field name 'images'
  const files = form.getAll('images') as File[];
  const imageRecords: { url: string; order: number }[] = [];
  for (let i = 0; i < files.length && i < 5; i++) {
    const file = files[i];
    const arrayBuf = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);
    const ext = path.extname(file.name) || '.jpg';
    const fileName = `${Date.now()}_${i}${ext}`;
    const filePath = path.join(dir, fileName);
    await fs.writeFile(filePath, buffer);
    imageRecords.push({ url: `/products/${fileName}`, order: i });
  }

  const product = await prisma.product.create({
    data: {
      name,
      sku,
      price,
      discountPrice,
      description,
      images: { create: imageRecords },
      variants: { create: variants },
    },
    include: { images: true, variants: true },
  });

  return product;
}

/** Update a product – expects multipart/form-data */
export async function updateProduct(id: number, req: NextRequest) {

  const form = await req.formData();
  const name = form.get('name') as string | undefined;
  const price = form.get('price') ? Number(form.get('price')) : undefined;
  const discountPrice = form.get('discountPrice') ? Number(form.get('discountPrice')) : undefined;
  const description = form.get('description') as string | undefined;
  const variantsJson = form.get('variants') as string | undefined;
  const variants = variantsJson ? JSON.parse(variantsJson) : undefined;

  // Image replace – optional new files, will delete existing ones not kept
  const files = form.getAll('images') as File[];
  const dir = await ensureProductDir();
  const imageUpdates: { url: string; order: number }[] = [];
  if (files.length) {
    // Delete old images on disk
    const oldImages = await prisma.productImage.findMany({ where: { productId: id } });
    for (const img of oldImages) {
      const oldPath = path.join(process.cwd(), 'public', img.url);
      try { await fs.unlink(oldPath); } catch (_) {}
    }
    // Remove from DB via cascade on delete/recreate below
    await prisma.productImage.deleteMany({ where: { productId: id } });
    // Add new images
    for (let i = 0; i < files.length && i < 5; i++) {
      const file = files[i];
      const buf = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name) || '.jpg';
      const fileName = `${Date.now()}_${i}${ext}`;
      await fs.writeFile(path.join(dir, fileName), buf);
      imageUpdates.push({ url: `/products/${fileName}`, order: i });
    }
  }

  const data: any = {};
  if (name) data.name = name;
  if (price !== undefined) data.price = price;
  if (discountPrice !== undefined) data.discountPrice = discountPrice;
  if (description !== undefined) data.description = description;
  if (variants) data.variants = { deleteMany: {}, create: variants };
  if (imageUpdates.length) data.images = { create: imageUpdates };

  const updated = await prisma.product.update({
    where: { id },
    data,
    include: { images: true, variants: true },
  });
  return updated;
}

/** Delete product – cascades images and variants */
export async function deleteProduct(id: number) {

  // Remove image files from disk
  const images = await prisma.productImage.findMany({ where: { productId: id } });
  for (const img of images) {
    const imgPath = path.join(process.cwd(), 'public', img.url);
    try { await fs.unlink(imgPath); } catch (_) {}
  }
  await prisma.product.delete({ where: { id } });
  return { success: true };
}
