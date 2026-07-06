import { cn } from "@/utils/cn";
import { Skeleton } from "@/components/ui/skeleton-loader";

export default function SaleCountdownLoading() {
  return (
    <section className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-[#11151c] rounded-2xl shadow-xl border border-accent-content/5 p-6 md:p-8">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-72 mb-8" />

        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className={cn("w-full h-11 rounded-xl", i === 2 && "h-24")} />
            </div>
          ))}
          <div className="flex justify-end pt-4">
            <Skeleton className="h-12 w-36 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
