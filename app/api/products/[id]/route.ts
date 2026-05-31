import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { NextResponse } from 'next/server';
import { updateProduct, deleteProduct } from '@/app/actions/products';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Public GET not needed here; could be used for single product fetch
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  const id = Number(params.id);
  const updated = await updateProduct(id, request as any);
  return NextResponse.json(updated);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  const id = Number(params.id);
  const result = await deleteProduct(id);
  return NextResponse.json(result);
}
