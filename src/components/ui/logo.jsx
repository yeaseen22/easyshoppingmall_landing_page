import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const Logo = ({ brand = {} }) => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="size-8 sm:size-10 bg-linear-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center border border-accent-content/10">
        <ShoppingCart className="size-3.5 sm:size-5 text-primary-color" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs sm:text-base font-bold text-white uppercase">
          {brand.brandName}
        </span>
        {brand.tagline?.trim() && (
          <span className="text-[10px] sm:text-sm text-gray-400">{brand.tagline}</span>
        )}
      </div>
    </Link>
  );
};
