"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/app/types/product';

interface CarouselProps {
  images: ProductImage[]; // up to 5 images
}

export const ProductCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };
  const prev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };
  const select = (index: number) => setCurrent(index);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="carousel w-full flex flex-col gap-4">
      {/* Main image with zoom on hover */}
      <div className="relative w-full aspect-[3/4] max-h-[550px] overflow-hidden rounded-2xl bg-gray-100 border border-gray-100 shadow-sm group">
        <Image
          src={images[current].url}
          alt={`Imagem ${current + 1}`}
          fill
          priority
          style={{ objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
          className="carousel-image group-hover:scale-105"
        />
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center hover:bg-white text-gray-800 hover:scale-115 active:scale-95 transition-all text-xl font-bold cursor-pointer"
              aria-label="Imagem anterior"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center hover:bg-white text-gray-800 hover:scale-115 active:scale-95 transition-all text-xl font-bold cursor-pointer"
              aria-label="Próxima imagem"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex justify-center gap-3">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => select(idx)}
              className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 hover:opacity-90 ${
                idx === current 
                  ? 'border-rose-500 shadow-md ring-2 ring-rose-500/20' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image 
                src={img.url} 
                alt={`Miniatura ${idx + 1}`} 
                fill 
                sizes="80px"
                style={{ objectFit: 'cover' }} 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
