import React from 'react';
import Image from 'next/image';
import type { Product } from '@/app/actions/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images?.[0]?.url ?? '/placeholder.png';
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <div className="group relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform transform hover:scale-105">
      <div className="aspect-w-1 aspect-h-1">
        <img
          src={mainImage}
          alt={product.name}
          className="object-cover w-full h-full transition-opacity group-hover:opacity-90"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline space-x-2">
          {hasDiscount ? (
            <>
              <span className="text-xl font-bold text-red-600">
                ${product.discountPrice?.toFixed(2)}
              </span>
              <span className="text-sm line-through text-gray-500">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        <button
          className="mt-3 w-full rounded-md bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-2 text-sm font-medium text-white shadow hover:from-pink-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          Comprar Agora
        </button>
      </div>
    </div>
  );
}
