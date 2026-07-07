"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductStatus } from "@/features/products/validations/product-schema";
import { cn } from "@/utils/utils";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductDetailModal from "./product-detail-modal";

const EyeButton = ({ onClick, className, ...props }) => {
  return (
    <Button
      variant="outline"
      size="icon-xs"
      onClick={onClick}
      className={cn(className)}
      {...props}
    >
      <Eye size={14} />
    </Button>
  );
};

const ProductCard = ({ product }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const hasDiscount = product.discount > 0;
  const displayPrice = hasDiscount ? product.discountedPrice : product.price;

  return (
    <>
      <Card className="group bg-card border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-0 [--card-spacing:--spacing(0)]">
        <div className="relative aspect-3/2 w-full overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />

          <div className="absolute top-2 right-2 sm:hidden">
            <EyeButton
              onClick={() => setModalOpen(true)}
              className="bg-background/70"
            />
          </div>

          {hasDiscount && (
            <Badge
              variant="destructive"
              className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-xl shadow-lg"
            >
              -{product.discount}%
            </Badge>
          )}

          {product.productStatus?.map((status) => (
            <Badge
              key={status}
              className={`absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-xl shadow-lg tracking-wider ${
                status === ProductStatus.HOT
                  ? "bg-orange-500 text-white"
                  : "bg-sky-500 text-white"
              }`}
            >
              {status.toUpperCase()}
            </Badge>
          ))}

          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm text-foreground text-[10px] px-2 py-0.5 rounded-xl">
              Only {product.stock} left
            </div>
          )}

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="text-destructive font-bold text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <CardContent className="p-3 space-y-2 flex-1 flex flex-col">
          <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-foreground">
              ৳{displayPrice}
            </span>
            {hasDiscount && (
              <span className="text-muted-foreground line-through text-xs">
                ৳{product.price}
              </span>
            )}
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-1.5 text-[10px] font-medium">
            {product.stock > 0 ? (
              <>
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-500">
                  {product.stock} in stock
                </span>
              </>
            ) : (
              <span className="text-destructive">Out of stock</span>
            )}
          </div>

          <div className="flex gap-2 pt-1">
            <Button asChild size="xs" className="flex-1">
              <Link href={`/?productId=${product._id}#order`}>Order Now</Link>
            </Button>

            <EyeButton
              onClick={() => setModalOpen(true)}
              className="hidden sm:inline-flex shrink-0"
            />
          </div>
        </CardContent>
      </Card>

      <ProductDetailModal
        product={product}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
};

export default ProductCard;
