import { PageHeaderSkeleton, Skeleton } from "@/components/ui/skeleton-loader";

export default function SiteSettingsLoading() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      <PageHeaderSkeleton titleWidth="w-48" subtitleWidth="w-64" />

      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-10 w-28 rounded-xl" />
        ))}
      </div>

      <div className="bg-[#11151c] rounded-2xl border border-accent-content/5 p-6 md:p-8 space-y-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-56" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="w-full h-11 rounded-xl" />
            </div>
          ))}
        </div>
        <div className="flex justify-end pt-4">
          <Skeleton className="h-12 w-36 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
