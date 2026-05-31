"use client";

import React, { useState } from 'react';
import { Product } from '@/app/types/product';

interface VariantSelectorProps {
  variants: Product['variants'];
}

const colorMap: Record<string, string> = {
  'Preto': '#111827',
  'Pink': '#ec4899',
  'Roxo': '#7c3aed',
  'Azul': '#3b82f6',
  'Verde': '#10b981',
  'Amarelo': '#f59e0b',
  'Cinza': '#6b7280',
  'Branco': '#ffffff'
};

export const VariantSelector: React.FC<VariantSelectorProps> = ({ variants }) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  const colors = Array.from(new Set(variants.map((v) => v.color)));
  const sizes = Array.from(new Set(variants.map((v) => v.size)));

  if (variants.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic mt-2">
        Sem variações disponíveis no momento.
      </div>
    );
  }

  return (
    <div className="variant-selectors space-y-4 py-2">
      {colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">
            Cor: <span className="font-normal text-gray-900">{selectedColor || 'Selecione'}</span>
          </span>
          <div className="flex items-center gap-3">
            {colors.map((color) => {
              const isSelected = selectedColor === color;
              const colorHex = colorMap[color] || '#ccc';
              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border border-gray-300/60 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${
                    isSelected 
                      ? 'ring-2 ring-rose-500 ring-offset-2 scale-110 shadow-sm' 
                      : 'hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: colorHex }}
                  aria-label={`Cor ${color}`}
                  title={color}
                />
              );
            })}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">
            Tamanho: <span className="font-normal text-gray-900">{selectedSize || 'Selecione'}</span>
          </span>
          <div className="flex items-center gap-2">
            {sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-10 h-10 px-3 rounded-lg border text-sm font-semibold cursor-pointer transition-all duration-200 hover:scale-102 active:scale-98 ${
                    isSelected 
                      ? 'bg-rose-500 border-rose-500 text-white shadow-sm' 
                      : 'bg-white border-gray-200 text-gray-800 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

