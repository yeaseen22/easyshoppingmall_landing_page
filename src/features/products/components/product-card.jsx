import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductStatus } from "@/features/products/validations/product-schema";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const hasDiscount = product.discount > 0;
  const displayPrice = hasDiscount ? product.discountedPrice : product.price;

  return (
    <Card className="group bg-card border border-border/50 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1 flex flex-col gap-0 [--card-spacing:--spacing(0)]">
      <div className="relative flex-1 flex flex-col">
        <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-2">
          {hasDiscount && (
            <Badge
              variant="destructive"
              className="bg-destructive/90 text-destructive-foreground text-[8px] sm:text-[10px] px-2 py-1 shadow-lg backdrop-blur-md rounded-xl"
            >
              -{product.discount}%
            </Badge>
          )}
        </div>

        <div className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-2">
          {product.productStatus?.includes(ProductStatus.HOT) && (
            <Badge className="bg-orange-500 text-white text-[8px] sm:text-[10px] px-2 py-1 shadow-lg backdrop-blur-md tracking-wider rounded-xl">
              HOT
            </Badge>
          )}
          {product.productStatus?.includes(ProductStatus.COLD) && (
            <Badge className="bg-sky-500 text-white text-[8px] sm:text-[10px] px-2 py-1 shadow-lg backdrop-blur-md tracking-wider rounded-xl">
              COLD
            </Badge>
          )}
        </div>

        <div className="relative aspect-3/2 w-full h-28 sm:h-36 md:h-40 overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            width={500}
            height={500}
            priority={false}
          />
          <div className="absolute inset-0 bg-linear-to-t from-card via-card/60 to-transparent" />
          {product.stock <= 5 && product.stock > 0 && (
            <Badge className="absolute bottom-2.5 left-2.5 bg-yellow-500/90 text-black text-[8px] sm:text-[10px] px-2 py-0.5 rounded-xl">
              Only {product.stock} left
            </Badge>
          )}
        </div>

        <CardContent className="p-3 md:p-5 space-y-3">
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="text-muted-foreground text-[10px] sm:text-xs line-clamp-3 mt-1.5 leading-relaxed">
              {product.description}
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-semibold text-foreground tracking-tighter">
              ৳{displayPrice}
            </span>
            {hasDiscount && (
              <span className="text-muted-foreground line-through text-[10px] sm:text-xs">
                ৳{product.price}
              </span>
            )}
          </div>
          {product.productSizes?.length > 0 && (
            <div>
              <p className="text-[10px] text-muted-foreground mb-1">SIZES</p>
              <div className="flex flex-wrap gap-1">
                {product.productSizes.map((size) => (
                  <span
                    key={size}
                    className="text-[8px] sm:text-[10px] font-medium px-2.5 py-0.5 bg-muted border border-border rounded-lg text-muted-foreground hover:bg-accent transition-colors"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}
          {product.productColors?.length > 0 && (
            <div>
              <p className="text-[10px] text-muted-foreground mb-1">COLORS</p>
              <div className="flex gap-1.5">
                {product.productColors.slice(0, 3).map((color, index) => (
                  <div
                    key={`${color}-${index}`}
                    className="size-4 rounded-xl border border-card shadow-sm ring-1 ring-border"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {product.productColors.length > 3 && (
                  <div className="size-4 rounded-xl bg-accent flex items-center justify-center text-[9px] font-bold text-muted-foreground">
                    +{product.productColors.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="pt-1">
            {product.stock > 0 ? (
              <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] sm:text-xs font-medium">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                {product.stock} in stock
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-destructive text-[10px] sm:text-xs font-medium">
                <span>✕</span>
                Out of stock
              </div>
            )}
          </div>
        </CardContent>
      </div>

      <div className="p-3 md:p-5 pt-0!">
        <Button asChild size={"xs"} className="w-full">
          <Link href={`/?productId=${product._id}#order`}>Order Now</Link>
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
