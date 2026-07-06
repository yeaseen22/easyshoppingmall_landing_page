"use client";

import { Loader2, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

const SearchBar = ({
  placeholder = "Search...",
  paramName = "search",
  scroll = true,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, startTransition] = useTransition();
  const [value, setValue] = useState(searchParams.get(paramName) || "");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const currentUrlValue = searchParams.get(paramName) || "";
    if (value === currentUrlValue) return;

    timeoutRef.current = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set(paramName, value);
        } else {
          params.delete(paramName);
        }
        params.delete("page");
        router.push(`${pathname}?${params.toString()}`, { scroll });
      });
    }, 400);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, paramName, pathname, router, searchParams, scroll]);

  return (
    <div className="relative w-full md:w-72">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        size={16}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-[#11151c] border border-accent-content/5 rounded-lg py-2 pl-9 pr-10 text-xs placeholder:text-gray-500 text-accent-content sm:text-sm outline-none focus:border-[#d4af37]/50"
      />
      {isLoading && (
        <Loader2
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d4af37] animate-spin"
        />
      )}
    </div>
  );
};

export default SearchBar;
