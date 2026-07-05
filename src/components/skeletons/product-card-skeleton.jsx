import { Skeleton } from "@/components/ui/skeleton-loader";

export const ProductCardSkeleton = () => (
  <div className="bg-[#11151c] border border-white/5 rounded-3xl overflow-hidden flex flex-col">
    <div className="relative aspect-3/2 w-full h-28 sm:h-36 md:h-40 bg-[#0a0c12]">
      <Skeleton className="absolute inset-0 rounded-none" />
    </div>
    <div className="p-3 md:p-5 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex items-baseline gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-3 w-12" />
      </div>
      <Skeleton className="h-3 w-12" />
      <div className="flex gap-1.5">
        <Skeleton className="size-4 rounded-xl" />
        <Skeleton className="size-4 rounded-xl" />
        <Skeleton className="size-4 rounded-xl" />
      </div>
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-8 w-full rounded-2xl" />
    </div>
  </div>
);
