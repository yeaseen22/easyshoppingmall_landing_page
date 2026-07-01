"use client";

import { useProductStore } from "@/features/products/store/product-store-provider";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductSelector() {
  const products = useProductStore((state) => state.products);
  const isLoading = useProductStore((state) => state.isLoading);
  const searchParams = useSearchParams();
  const id = searchParams.get("productId");
  const { push } = useRouter();

  const handleChange = (e) => {
    const selectedProductId = e.target.value?.trim();
    const url = new URLSearchParams(searchParams.toString());

    if (selectedProductId) {
      url.set("productId", selectedProductId);
    } else {
      url.delete("productId");
    }

    push(`/?${url.toString()}#order`);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase text-gray-500">
        Select Product
      </label>
      <select
        disabled={isLoading}
        value={id || ""}
        onChange={handleChange}
        className="w-full bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-3 focus:border-primary-color outline-none"
      >
        <option value="">Select a product</option>
        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name} {p.stock === 0 ? "(Out of stock)" : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
