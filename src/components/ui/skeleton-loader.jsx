import { cn } from "@/utils/cn";

export function Skeleton({ className }) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-gray-700/50", className)}
      aria-hidden="true"
    />
  );
}

export function PageHeaderSkeleton({
  titleWidth = "w-56",
  subtitleWidth = "w-40",
}) {
  return (
    <div className="space-y-2">
      <Skeleton className={cn("h-7 md:h-8", titleWidth)} />
      <Skeleton className={cn("h-3", subtitleWidth)} />
    </div>
  );
}

export function SearchBarSkeleton() {
  return (
    <div className="relative w-full md:w-72">
      <Skeleton className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full" />
      <Skeleton className="w-full h-9 sm:h-10 rounded-lg" />
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="flex justify-center gap-2">
      <Skeleton className="h-10 w-10 rounded-lg" />
      <Skeleton className="h-10 w-10 rounded-lg" />
      <Skeleton className="h-10 w-24 rounded-lg" />
      <Skeleton className="h-10 w-10 rounded-lg" />
      <Skeleton className="h-10 w-10 rounded-lg" />
    </div>
  );
}

export function FormSkeleton({ fields = 3 }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i}>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className={cn("w-full h-11 rounded-xl", i === 1 && "h-24")} />
        </div>
      ))}
      <div className="flex justify-end pt-4">
        <Skeleton className="h-12 w-36 rounded-xl" />
      </div>
    </div>
  );
}

export function MobileCardSkeleton() {
  return (
    <div className="bg-[#11151c] border border-accent-content/5 rounded-xl p-4 space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-3 w-28" />
      <Skeleton className="h-4 w-24" />
      <div className="flex justify-end gap-2 pt-2">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-[#11151c] p-7 rounded-2xl border border-accent-content/5 space-y-4">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 6 }) {
  return (
    <div className="bg-[#11151c] border border-accent-content/5 rounded-xl overflow-hidden animate-pulse">
      <div className="bg-[#0a0c12] border-b border-accent-content/5 px-6 py-4">
        <div className="flex gap-8">
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-20" />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border-b border-accent-content/5 px-6 py-4">
          <div className="flex gap-8 items-center">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatsGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ChartSkeleton({ height = "h-80" }) {
  return (
    <div className="bg-[#11151c] border border-accent-content/5 rounded-2xl p-6">
      <Skeleton className="h-5 w-40 mb-6" />
      <Skeleton className={cn("w-full", height)} />
    </div>
  );
}
