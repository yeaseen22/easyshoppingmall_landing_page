import {
  PageHeaderSkeleton,
  TableSkeleton,
  PaginationSkeleton,
} from "@/components/ui/skeleton-loader";

export default function ReviewsLoading() {
  return (
    <section className="w-full flex-1 min-w-0 overflow-hidden space-y-5 px-3 sm:px-4 md:px-6">
      <PageHeaderSkeleton titleWidth="w-64" subtitleWidth="w-72" />

      <TableSkeleton rows={6} cols={6} />

      <PaginationSkeleton />
    </section>
  );
}
