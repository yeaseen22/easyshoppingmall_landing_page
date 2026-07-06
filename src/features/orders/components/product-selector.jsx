"use client";

import { useProductStore } from "@/features/products/store/product-store-provider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductSelector({ startTransition }) {
  const products = useProductStore((state) => state.products);
  const isLoading = useProductStore((state) => state.isLoading);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("productId");
  const { push } = useRouter();
  const url = new URLSearchParams(searchParams.toString());

  const handleChange = (e) => {
    const value = e.target.value?.trim();

    if (value) {
      url.set("productId", value);
    }

    startTransition(() => {
      push(`${pathname}/?${url.toString()}#order`);
    });
  };

  const handleReset = () => {
    if (!id) return;

    startTransition(() => {
      url.delete("productId");
      push(`${pathname}/?${url.toString()}#order`);
    });
  };

  return (
    <>
      <div className="space-y-2 flex-1">
        <label className="text-xs font-bold uppercase text-gray-500">
          Select a product
        </label>
        <div className="flex items-center justify-center gap-2">
          <select
            disabled={isLoading}
            value={id || ""}
            onChange={handleChange}
            className="w-4/5 bg-[#1c2128] border border-gray-700 rounded-lg px-4 sm:py-3 py-2 focus:border-primary-color outline-none text-xs sm:text-sm"
          >
            <option disabled value="">
              Select a product
            </option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} {p.stock === 0 ? "(Out of stock)" : ""}
              </option>
            ))}
          </select>

          <button
            disabled={!id}
            type="button"
            onClick={handleReset}
            className="w-1/5 bg-red-400 hover:bg-red-500 text-xs sm:text-sm px-4 py-2 sm:py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed h-full flex items-center justify-center font-semibold text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
