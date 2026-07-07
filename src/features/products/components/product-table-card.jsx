"use client";

import { Button } from "@/components/ui/button";
import { ProductStatus } from "@/features/products/validations/product-schema";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

const ProductTableCard = ({ product, handleEdit, handleDelete }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-2">
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="48px" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-foreground font-semibold text-sm truncate">{product.name}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-foreground font-bold">৳{product.discountedPrice || product.price}</span>
            {product.discount > 0 && <span className="text-muted-foreground line-through">৳{product.price}</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Stock: {product.stock}</span>
        {product.productStatus.map((s) => (
          <span key={s} className={`capitalize text-[10px] font-bold px-2 py-0.5 rounded-full ${s === ProductStatus.HOT ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>{s}</span>
        ))}
        {product.productColors.map((c) => (
          <span key={c} className="capitalize text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">{c}</span>
        ))}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" size="icon" onClick={handleEdit} className="text-muted-foreground hover:text-blue-500">
          <Pencil size={14} />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleDelete} className="text-muted-foreground hover:text-destructive">
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  );
};

export default ProductTableCard;
