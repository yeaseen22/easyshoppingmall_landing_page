import { cn } from "@/lib/utils";

export function Skeleton({ className }) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-gray-700/50", className)}
      aria-hidden="true"
    />
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
