"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductStatus } from "@/features/products/validations/product-schema";
import { format } from "date-fns";
import { X } from "lucide-react";
import Image from "next/image";

const ProductDetailModal = ({ product, open, onOpenChange }) => {
  if (!product) return null;

  const hasDiscount = product.discount > 0;
  const displayPrice = hasDiscount ? product.discountedPrice : product.price;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[75dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-5">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {product.description}
            </p>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  ৳{displayPrice}
                </span>
                {hasDiscount && (
                  <span className="text-muted-foreground line-through text-sm">
                    ৳{product.price}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <Badge variant="destructive" className="mt-1 text-xs">
                  -{product.discount}% off
                </Badge>
              )}
            </div>

            {product.productStatus?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.productStatus.map((status) => (
                  <Badge
                    key={status}
                    className={`text-xs px-3 py-1 ${
                      status === ProductStatus.HOT
                        ? "bg-orange-500 text-white"
                        : "bg-sky-500 text-white"
                    }`}
                  >
                    {status.toUpperCase()}
                  </Badge>
                ))}
              </div>
            )}

            <div>
              {product.stock > 0 ? (
                <div className="flex items-center gap-1.5 text-emerald-500 text-sm font-medium">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  {product.stock} in stock
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-destructive text-sm font-medium">
                  <X size={14} />
                  Out of stock
                </div>
              )}
            </div>

            {product.productSizes?.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wider">
                  Sizes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.productSizes.map((size) => (
                    <span
                      key={size}
                      className="text-xs font-medium px-3 py-1 bg-muted border border-border rounded-md text-muted-foreground"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.productColors?.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wider">
                  Colors
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.productColors.map((color, i) => (
                    <div
                      key={`${color}-${i}`}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground capitalize"
                    >
                      <div
                        className="size-5 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                      {color}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-xs text-muted-foreground pt-2 border-t border-border">
              Added {format(new Date(product.createdAt), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
