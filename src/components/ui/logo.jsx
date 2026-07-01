import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const Logo = ({ brand = {} }) => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-10 h-10 bg-linear-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center border border-accent-content/10">
        <ShoppingCart className="w-5 h-5 text-primary-color" />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-bold text-white uppercase">
          {brand.brandName}
        </span>
        {brand.tagline?.trim() && (
          <span className="text-sm text-gray-400">{brand.tagline}</span>
        )}
      </div>
    </Link>
  );
};
