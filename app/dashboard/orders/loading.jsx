import { OrderTableCardSkeleton } from "@/components/skeletons/order-table-card-skeleton";
import { OrderTableRowSkeleton } from "@/components/skeletons/order-table-row-skeleton";
import {
  PageHeaderSkeleton,
  SearchBarSkeleton,
} from "@/components/ui/skeleton-loader";

const loading = () => {
  return (
    <div className="space-y-5">
      <PageHeaderSkeleton titleWidth="w-56" subtitleWidth="w-40" />

      <SearchBarSkeleton />

      <div className="block xl:hidden space-y-3">
        {[...Array(5)].map((_, i) => (
          <OrderTableCardSkeleton key={i} count={5} />
        ))}
      </div>

      <div className="hidden xl:block bg-[#11151c] border border-accent-content/5 rounded-xl overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0a0c12] border-b border-accent-content/5">
              <tr>
                {[...Array(7)].map((_, i) => (
                  <th key={i} className="px-6 py-4">
                    <div className="h-3 w-20 bg-gray-700/50 rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {[...Array(5)].map((_, i) => (
                <OrderTableRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default loading;
