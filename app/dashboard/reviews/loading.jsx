import { Skeleton, TableSkeleton } from "@/components/ui/skeleton-loader";

export default function ReviewsLoading() {
  return (
    <section className="w-full flex-1 min-w-0 overflow-hidden space-y-5 px-3 sm:px-4 md:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-72" />
        </div>
      </div>

      <TableSkeleton rows={6} cols={6} />

      <div className="flex justify-center gap-2 animate-pulse">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
    </section>
  );
}
