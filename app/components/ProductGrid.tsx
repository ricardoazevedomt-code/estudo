"use client";
import React from 'react';
// import Link from 'next/link'; // Removed unused import
import Image from 'next/image';
import { Product } from '@/app/types/product';
import { useRouter } from 'next/navigation';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const router = useRouter();

  const openModal = (id: number) => {
    router.push(`/product/${id}`);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-8 text-gray-800">
        <span className="text-sm font-medium text-gray-500">{products.length} itens</span>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="cursor-pointer hover:text-rose-500 transition-colors">Classificar ▾</span>
          <span className="text-gray-300">|</span>
          <span className="flex gap-1.5 text-gray-400">
            <span className="cursor-pointer hover:text-gray-800 transition-colors text-base">▤</span>
            <span className="cursor-pointer hover:text-gray-800 transition-colors text-base text-gray-800">▦</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
        {products.map((product) => {
          const mainImage = product.images?.[0]?.url ?? '/logo.png';
          // Mock reviews count based on product id to match style
          const mockReviews = product.id === 1 ? 85 : product.id === 2 ? 72 : 40;
          return (
            <div
              key={product.id}
              className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => openModal(product.id)}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50">
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="group-hover:scale-103"
                />
                
                {/* Frete Grátis Badge */}
                <span className="absolute bottom-2.5 left-2.5 bg-emerald-600 text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded flex items-center gap-1.5 shadow-sm">
                  <span className="text-[6px]">●</span> Frete Grátis
                </span>

                {/* Badge (Novo, Sale, etc) */}
                {product.badge && (
                  <span className={`absolute top-2.5 left-2.5 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm text-white ${
                    product.badgeClass === 'badge-new' ? 'bg-rose-500' :
                    product.badgeClass === 'badge-sale' ? 'bg-purple-600' : 'bg-orange-500'
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Info Container */}
              <div className="p-3.5 flex flex-col flex-grow justify-between gap-1">
                <div>
                  <h3 className="text-[12px] font-bold text-gray-800 tracking-tight leading-snug group-hover:text-rose-500 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  {product.category && (
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                      {product.category}
                    </p>
                  )}
                </div>

                <div className="mt-1">
                  {/* Prices */}
                  <div className="flex items-baseline gap-1.5">
                    {product.discountPrice && (
                      <span className="text-[10px] line-through text-gray-400 font-semibold">
                        {formatPrice(product.price)}
                      </span>
                    )}
                    <span className="text-sm font-black text-gray-900">
                      {formatPrice(product.discountPrice ?? product.price)}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-400 text-xs leading-none">★★★★★</span>
                    <span className="text-[9px] text-gray-400 font-medium">({mockReviews})</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
