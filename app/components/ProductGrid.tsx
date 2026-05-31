import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const router = useRouter();

  const openModal = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <section className="products-section" id="catalog">
      <div className="section">
        <h2 className="section-title">Coleção</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card cursor-pointer"
              onClick={() => openModal(product.id)}
            >
              <div className="product-image-wrapper">
                <Image
                  src={product.images[0]?.url ?? '/logo.png'}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <span className={`product-badge ${product.variantBadgeClass}`}>Novo</span>
              </div>
              <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-footer">
                  <div>
                    {product.discountPrice && (
                      <span className="product-price-old">{product.price}</span>
                    )}
                    <span className="product-price">
                      {product.discountPrice ? product.discountPrice : product.price}
                    </span>
                  </div>
                  <button className="product-buy-btn" aria-label={`Comprar ${product.name}`}>🛒</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
