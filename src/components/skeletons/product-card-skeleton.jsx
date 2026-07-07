import { Skeleton } from "@/components/ui/skeleton-loader";

export const ProductCardSkeleton = () => (
  <div className="bg-card border border-border/50 overflow-hidden flex flex-col">
    <div className="relative aspect-3/2 w-full bg-muted">
      <Skeleton className="absolute inset-0 rounded-none" />
    </div>
    <div className="p-3 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-baseline gap-1.5">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-3 w-12" />
      </div>
      <Skeleton className="h-3 w-20" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-7 flex-1 rounded" />
        <Skeleton className="size-7 rounded" />
      </div>
    </div>
  </div>
);
