'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/catalog/ProductCard';
import ProductModal from '@/components/catalog/ProductModal';
import type { Product } from '@/app/actions/products';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Fetch products from API (public endpoint)
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Fetched products:', data);
        setProducts(data);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="p-4">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => openModal(product)}
            className="focus:outline-none"
          >
            <ProductCard product={product} />
          </button>
        ))}
      </div>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={closeModal}
          />
        )}
    </section>
  );
}
