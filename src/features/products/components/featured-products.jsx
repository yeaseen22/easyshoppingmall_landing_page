"use client";

import { Badge } from "@/components/ui/badge";
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton";
import Container from "@/components/ui/container";
import Pagination from "@/components/ui/pagination";
import SearchBar from "@/components/ui/search-bar";
import Section from "@/components/ui/section";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import ProductCard from "./product-card";

export default function FeaturedProducts({ products = [], pagination }) {
  const [isLoading, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  return (
    <Section id="products" className="bg-background">
      <Container>
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary px-4 py-1.5 rounded-full uppercase mb-4 text-xs sm:text-sm bg-primary/10">
            Our Collection
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Premium <span className="text-primary">Timepieces</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Discover our handpicked selection of luxury apparel, each crafted
            with precision and elegance.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <SearchBar placeholder="Search products..." scroll={false} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 lg:gap-7">
          {isLoading ? (
            [...Array(10)].map((_, i) => <ProductCardSkeleton key={i} />)
          ) : products.length === 0 ? (
            <div className="text-3xl text-center py-10 text-muted-foreground col-span-full">
              No products found!
            </div>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>

        {pagination && (
          <div className="flex justify-center items-center">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              isLoading={isLoading}
              onPageChange={(page) => {
                params.set("page", page);

                startTransition(() => {
                  router.push(`${pathname}?${params.toString()}#products`);
                });
              }}
            />
          </div>
        )}
      </Container>
    </Section>
  );
}
