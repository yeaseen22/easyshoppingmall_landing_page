import { FormSkeleton, Skeleton } from "@/components/ui/skeleton-loader";

export default function HeroBannerLoading() {
  return (
    <section className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-[#11151c] rounded-2xl shadow-xl border border-accent-content/5 p-6 md:p-8">
        <Skeleton className="h-8 w-56 mb-8" />

        <FormSkeleton fields={3} />
      </div>
    </section>
  );
}
