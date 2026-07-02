import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { getProducts } from "@/features/products/actions/product";
import ProductCard from "./product-card";

export default async function FeaturedProducts() {
  const products = await getProducts();

  return (
    <Section id="products" className="bg-[#080808]">
      <Container>
        <div className="text-center mb-16">
          <span className="inline-block bg-primary-color/10 border border-primary-color/30 text-primary-color px-4 py-1.5 rounded-full uppercase mb-4 text-xs sm:text-sm">
            Our Collection
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent-content mb-4">
            Premium <span className="text-primary-color">Timepieces</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Discover our handpicked selection of luxury apparel, each crafted
            with precision and elegance.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-3xl text-center py-10 text-gray-500">
            No products found!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-7">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
