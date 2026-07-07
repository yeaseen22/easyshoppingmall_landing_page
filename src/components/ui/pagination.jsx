"use client";

import { Button } from "@/components/ui/button";
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

  return (
    <div className="flex items-center justify-end pt-8">
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => goToPage(currentPage - 1)}
          disabled={isLoading || currentPage <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </Button>

        {getPages().map((page, i) =>
          page === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="text-muted-foreground text-xs px-1"
            >
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "ghost"}
              size="icon"
              onClick={() => goToPage(page)}
              disabled={isLoading}
              aria-current={page === currentPage ? "page" : undefined}
              className={
                page === currentPage
                  ? "bg-primary text-primary-foreground hover:bg-primary"
                  : "text-muted-foreground"
              }
            >
              {page}
            </Button>
          ),
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => goToPage(currentPage + 1)}
          disabled={isLoading || currentPage >= totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
