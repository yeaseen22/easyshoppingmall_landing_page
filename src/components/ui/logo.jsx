import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const Logo = ({ brand = {} }) => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="size-8 sm:size-10 bg-muted rounded-sm flex items-center justify-center border border-border">
        <ShoppingCart className="size-3.5 sm:size-5 text-primary" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs sm:text-base font-bold text-foreground uppercase">
          {brand.brandName}
        </span>
        {brand.tagline?.trim() && (
          <span className="text-[10px] sm:text-sm text-muted-foreground">{brand.tagline}</span>
        )}
      </div>
    </Link>
  );
};
