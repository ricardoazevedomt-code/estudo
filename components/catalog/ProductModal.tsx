'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Product } from '@/app/actions/products';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  const editor = useEditor({
    extensions: [StarterKit],
    content: product.description ?? '',
    editable: false,
  });

  const handleAddToCart = () => {
    // Placeholder: integrate with cart logic later
    alert(`Added ${product.name} (${selectedColor}, ${selectedSize}) to cart.`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative glassmorphism">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 dark:hover:text-gray-100 transition"
        >
          ✕
        </button>

        {/* Image carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="mb-4"
        >
          {product.images.map((img) => (
            <SwiperSlide key={img.id}>
              <div className="overflow-hidden rounded-md">
                <img
                  src={img.url}
                  alt={product.name}
                  className="w-full h-80 object-cover transition-transform duration-300 ease-in-out hover:scale-150 cursor-zoom-in"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Basic info */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{product.name}</h2>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xl font-semibold text-rose-600">
            ${product.discountPrice ?? product.price}{product.discountPrice ? (
              <span className="line-through text-gray-500 ml-2">${product.price}</span>
            ) : null}
          </span>
          {product.discountPrice && (
            <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded">Desconto</span>
          )}
        </div>

        {/* Variant selectors */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cor</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full rounded border-gray-300 focus:border-rose-500 focus:ring-rose-500"
            >
              <option value="" disabled>Selecione a cor</option>
              {product.variants.map((v) => (
                <option key={v.id} value={v.color}>{v.color}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tamanho</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full rounded border-gray-300 focus:border-rose-500 focus:ring-rose-500"
            >
              <option value="" disabled>Selecione o tamanho</option>
              {product.variants.map((v) => (
                <option key={v.id} value={v.size}>{v.size}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Technical info rendered with tiptap */}
        {product.description && editor && (
          <div className="prose dark:prose-invert max-w-none mb-4">
            <EditorContent editor={editor} />
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedColor || !selectedSize}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-50"
        >
          Comprar Agora
        </button>
      </div>
    </div>
  );
};
