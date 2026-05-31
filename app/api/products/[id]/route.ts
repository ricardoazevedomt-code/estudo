import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { updateProduct, deleteProduct } from '@/app/actions/products';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Public GET not needed here; could be used for single product fetch
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  const { id } = await params;
  const productId = Number(id);
  const updated = await updateProduct(productId, request as any);
  return NextResponse.json(updated);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  const { id } = await params;
  const productId = Number(id);
  const result = await deleteProduct(productId);
  return NextResponse.json(result);
}

