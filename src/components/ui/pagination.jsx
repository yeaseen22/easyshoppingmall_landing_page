"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  startTransition,
  isLoading,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (page) => {
    if (onPageChange) {
      onPageChange(page);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    if (typeof startTransition === "function") {
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });

      return;
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const delta = 1;
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) pages.push("...");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const btnBase =
    "flex items-center justify-center w-9 h-9 rounded-lg text-xs font-bold transition-all duration-200";

  return (
    <div className="flex items-center justify-end pt-6 border-t border-accent-content/5">
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={isLoading || currentPage <= 1}
          className={`${btnBase} text-gray-500 hover:bg-accent-content/5 hover:text-accent-content disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {getPages().map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="text-gray-600 text-xs px-1">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page)}
              disabled={isLoading}
              className={`${btnBase} ${
                page === currentPage
                  ? "bg-primary-color text-black"
                  : "text-gray-500 hover:bg-accent-content/5 hover:text-accent-content"
              }`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={isLoading || currentPage >= totalPages}
          className={`${btnBase} text-gray-500 hover:bg-accent-content/5 hover:text-accent-content disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
