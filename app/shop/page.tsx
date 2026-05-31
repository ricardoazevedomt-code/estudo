import ProductGrid from '@/components/catalog/ProductGrid';

export default function ShopPage() {
  return (
    <section className="min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-foreground">
        Catálogo de Produtos
      </h1>
      <ProductGrid />
    </section>
  );
}
