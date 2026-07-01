import { getProducts } from "@/features/products/actions/product";
import ProductCard from "./product-card";

export default async function FeaturedProducts() {
  const products = await getProducts();

  return (
    <section id="products" className="bg-[#080808] px-[4%] py-20 min-h-screen">
      <div className="text-center mb-16">
        <span className="inline-block bg-primary-color/10 border border-primary-color/30 text-primary-color text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
          Our Collection
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-accent-content mb-4">
          Premium <span className="text-primary-color">Timepieces</span>
        </h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
          Discover our handpicked selection of luxury apparel, each crafted with
          precision and elegance.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-3xl text-center py-10 text-gray-500">
          No products found!
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-8 max-w-300 mx-auto">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
