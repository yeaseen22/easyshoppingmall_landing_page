"use client";

import { ProductStatus } from "@/features/products/validations/product-schema";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

const ProductCard = ({ product, handleEdit, handleDelete }) => {
  return (
    <>
      <div key={product._id} className="bg-[#11151c] border border-accent-content/5 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="48px" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-accent-content font-semibold text-sm truncate">{product.name}</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-accent-content font-bold">৳{product.discountedPrice || product.price}</span>
              {product.discount > 0 && <span className="text-gray-500 line-through">৳{product.price}</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Stock: {product.stock}</span>
          {product.productStatus.map((s) => (
            <span key={s} className={`capitalize text-[10px] font-bold px-2 py-0.5 rounded-full ${s === ProductStatus.HOT ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>{s}</span>
          ))}
          {product.productColors.map((c) => (
            <span key={c} className={`capitalize text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400`}>{c}</span>
          ))}
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={handleEdit} className="p-2 text-gray-400 hover:text-blue-500 bg-accent-content/5 rounded-lg"><Pencil size={14} /></button>
          <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-500 bg-accent-content/5 rounded-lg"><Trash2 size={14} /></button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
