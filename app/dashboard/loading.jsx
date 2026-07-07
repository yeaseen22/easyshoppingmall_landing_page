import {
  PageHeaderSkeleton,
  StatsGridSkeleton,
  MobileCardSkeleton,
  TableSkeleton,
} from "@/components/ui/skeleton-loader";

const loading = () => {
  return (
    <div className="space-y-5">
      <PageHeaderSkeleton titleWidth="w-56" subtitleWidth="w-40" />

      <StatsGridSkeleton count={4} />

      <div className="block xl:hidden space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <MobileCardSkeleton key={i} />
        ))}
      </div>

      <div className="hidden xl:block">
        <TableSkeleton rows={6} cols={7} />
      </div>
    </div>
  );
};

export default loading;
