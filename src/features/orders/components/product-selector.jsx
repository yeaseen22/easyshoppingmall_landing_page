"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductStore } from "@/features/products/store/product-store-provider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ProductSelector = ({ startTransition }) => {
  const products = useProductStore((state) => state.products);
  const isLoading = useProductStore((state) => state.isLoading);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("productId");
  const { push } = useRouter();
  const url = new URLSearchParams(searchParams.toString());

  const handleChange = (value) => {
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
    <div className="space-y-2 flex-1">
      <Label>Select a product</Label>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-8 sm:col-span-9">
          <Select
            disabled={isLoading}
            value={id || ""}
            onValueChange={handleChange}
          >
            <SelectTrigger
              size="sm"
              className="w-full bg-muted text-xs sm:text-sm px-2 py-3 h-auto"
            >
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((p) => (
                <SelectItem key={p._id} value={p._id}>
                  {p.name} {p.stock === 0 ? "(Out of stock)" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          disabled={!id}
          type="button"
          size="sm"
          variant="destructive"
          onClick={handleReset}
          className="col-span-4 sm:col-span-3"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ProductSelector;
