import {
  PageHeaderSkeleton,
  SearchBarSkeleton,
  TableSkeleton,
  PaginationSkeleton,
} from "@/components/ui/skeleton-loader";

const loading = () => {
  return (
    <div className="space-y-5">
      <PageHeaderSkeleton titleWidth="w-56" subtitleWidth="w-40" />

      <SearchBarSkeleton />

      <div className="block xl:hidden space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-[#11151c] border border-accent-content/5 rounded-xl p-4 space-y-3 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700/50" />
              <div className="space-y-1.5 flex-1">
                <div className="h-4 w-24 bg-gray-700/50 rounded" />
                <div className="h-3 w-16 bg-gray-700/50 rounded" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="h-3 w-40 bg-gray-700/50 rounded" />
              <div className="h-3 w-32 bg-gray-700/50 rounded" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-3 w-16 bg-gray-700/50 rounded" />
              <div className="h-5 w-16 bg-gray-700/50 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      <div className="hidden xl:block">
        <TableSkeleton rows={6} cols={5} />
      </div>

      <PaginationSkeleton />
    </div>
  );
};

export default loading;
