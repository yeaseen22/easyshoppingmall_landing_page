import { cn } from "@/utils/cn";
import { Skeleton } from "@/components/ui/skeleton-loader";

export default function FeaturedProductsLoading() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-12">
      <section className="bg-[#11151c] rounded-2xl border border-accent-content/5 p-6 md:p-8">
        <Skeleton className="h-8 w-56 mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className={i <= 2 ? "md:col-span-2" : "md:col-span-1"}>
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className={cn("w-full h-11 rounded-xl", i === 2 && "h-24")} />
            </div>
          ))}
          <div className="md:col-span-2">
            <Skeleton className="h-4 w-28 mb-2" />
            <Skeleton className="w-full h-36 rounded-xl" />
          </div>
          <div className="md:col-span-2">
            <Skeleton className="h-4 w-24 mb-2" />
            <div className="flex gap-4">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>
          <div className="md:col-span-2 flex justify-end mt-2">
            <Skeleton className="h-12 w-36 rounded-xl" />
          </div>
        </div>
      </section>

      <div className="bg-[#11151c] rounded-2xl border border-accent-content/5 p-6 md:p-8">
        <Skeleton className="h-8 w-64 mb-6" />

        <div className="bg-[#11151c] border border-accent-content/5 rounded-xl overflow-hidden animate-pulse">
          <div className="bg-[#0a0c12] border-b border-accent-content/5 px-6 py-4">
            <div className="flex gap-8">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-20" />
              ))}
            </div>
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-b border-accent-content/5 px-6 py-4">
              <div className="flex gap-8 items-center">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
