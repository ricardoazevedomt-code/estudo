import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Product } from '@/app/types/product';
import { ProductCarousel } from '../../components/ProductCarousel';
import { VariantSelector } from '../../components/VariantSelector';
import { getProductById } from '@/app/actions/products';

interface Props {
  params: Promise<{ id: string }>;
}

import Link from 'next/link';

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);
  const product: Product | null = await getProductById(productId);

  if (!product) {
    notFound();
    return null;
  }

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no produto *${product.name}* (Ref: ${product.sku || product.id}). Gostaria de verificar a disponibilidade!`
  );
  const whatsappUrl = `https://wa.me/5565981370452?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 pb-16">
      {/* Detail Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-xs px-4 md:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-rose-500 transition-colors">
            <span>←</span> Voltar para Início
          </Link>
          <span className="font-extrabold text-xl tracking-tight text-gray-900">
            eu<span className="text-rose-500">+</span>fitness
          </span>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-10 shadow-xs">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery Column */}
            <div>
              <ProductCarousel images={product.images} />
            </div>

            {/* Info Column */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-xs font-bold text-rose-500 uppercase tracking-widest bg-rose-50 px-2.5 py-1 rounded-full">
                  Coleção 2026
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
                  {product.name}
                </h1>
                <p className="text-xs text-gray-400 mt-1">Ref: {product.sku || `00${product.id}`}</p>
              </div>

              {/* Review Stars Mock */}
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-lg">★★★★★</span>
                <span className="text-xs font-bold text-gray-700">4.9</span>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs text-gray-500 hover:underline cursor-pointer">(85 avaliações)</span>
              </div>

              {/* Prices */}
              <div className="flex items-baseline gap-3 py-1">
                {product.discountPrice && (
                  <span className="text-lg line-through text-gray-400 font-medium">
                    {formatPrice(product.price)}
                  </span>
                )}
                <span className="text-3xl font-black text-rose-600">
                  {formatPrice(product.discountPrice ?? product.price)}
                </span>
              </div>

              {/* Short Description */}
              {product.description && (
                <p className="text-sm leading-relaxed text-gray-600 border-t border-b border-gray-100 py-4">
                  {product.description}
                </p>
              )}

              {/* Variants selectors */}
              <VariantSelector variants={product.variants} />

              {/* CTA and Checkout */}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:from-rose-600 hover:to-pink-700 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-base"
                >
                  💬 Comprar pelo WhatsApp
                </a>
              </div>

              {/* Technical / Info details */}
              {product.technical && (
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
                    Informações Técnicas
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-xl">
                    {product.technical}
                  </p>
                </div>
              )}

              {/* Benefits badge banner */}
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-rose-500 text-lg">🚚</span>
                  <span>Frete Grátis nas compras acima de R$ 199</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-rose-500 text-lg">🔄</span>
                  <span>Troca ou devolução fácil por até 30 dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
