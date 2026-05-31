import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';
import type { NextRequest } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Product, ProductImage, ProductVariant } from '@/app/types/product';
export type { Product, ProductImage, ProductVariant };

// Helper to ensure the public/products directory exists
async function ensureProductDir() {
  const dir = path.join(process.cwd(), 'public', 'products');
  await fs.mkdir(dir, { recursive: true });
  return dir;
}


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

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { order: 'asc' } }, variants: true },
    });
    if (product) return product;
  } catch (e) {
    console.error('Error fetching product by ID', e);
  }

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Legging Power Fit',
      sku: 'LPF-001',
      price: 189.90,
      discountPrice: null,
      description: 'A Legging Power Fit foi desenvolvida para oferecer máxima performance e conforto. Com tecido de alta compressão, cós alto anatômico e zero transparência, é a parceira ideal para seus treinos mais intensos.',
      images: [
        { id: 1, url: '/product_leggings.png', order: 0 },
        { id: 11, url: '/product_leggings.png', order: 1 }
      ],
      variants: [
        { id: 101, color: 'Preto', size: 'P', stock: 10 },
        { id: 102, color: 'Preto', size: 'M', stock: 15 },
        { id: 103, color: 'Preto', size: 'G', stock: 8 },
        { id: 104, color: 'Pink', size: 'P', stock: 5 },
        { id: 105, color: 'Pink', size: 'M', stock: 12 },
        { id: 106, color: 'Pink', size: 'G', stock: 7 }
      ],
    },
    {
      id: 2,
      name: 'Top Essence Pro',
      sku: 'TEP-001',
      price: 129.90,
      discountPrice: null,
      description: 'O Top Essence Pro garante sustentação e estilo para qualquer atividade. Conta com bojo removível, alças médias confortáveis e tecido respirável que mantém sua pele seca e fresca.',
      images: [
        { id: 2, url: '/product_top.png', order: 0 },
        { id: 21, url: '/product_top.png', order: 1 }
      ],
      variants: [
        { id: 201, color: 'Roxo', size: 'P', stock: 8 },
        { id: 202, color: 'Roxo', size: 'M', stock: 14 },
        { id: 203, color: 'Roxo', size: 'G', stock: 10 }
      ],
    },
    {
      id: 3,
      name: 'Shorts Active Run',
      sku: 'SAR-001',
      price: 109.90,
      discountPrice: null,
      description: 'Leveza e liberdade de movimento definem o Shorts Active Run. Possui short interno de alta compressão para evitar atrito, cós elástico confortável e bolso lateral funcional.',
      images: [
        { id: 3, url: '/product_shorts.png', order: 0 },
        { id: 31, url: '/product_shorts.png', order: 1 }
      ],
      variants: [
        { id: 301, color: 'Preto', size: 'P', stock: 12 },
        { id: 302, color: 'Preto', size: 'M', stock: 18 },
        { id: 303, color: 'Preto', size: 'G', stock: 9 },
        { id: 304, color: 'Verde', size: 'P', stock: 6 },
        { id: 305, color: 'Verde', size: 'M', stock: 10 },
        { id: 306, color: 'Verde', size: 'G', stock: 5 }
      ],
    },
  ];
  return mockProducts.find(p => p.id === id) || null;
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
