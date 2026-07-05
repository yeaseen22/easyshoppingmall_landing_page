import { OrderTableCardSkeleton } from "@/components/skeletons/order-table-card-skeleton";
import { OrderTableRowSkeleton } from "@/components/skeletons/order-table-row-skeleton";
import { Search } from "lucide-react";

const loading = () => {
  return (
    <div className="space-y-5 animate-pulse">
      {/* ================= HEADER ================= */}
      <div>
        <div className="h-6 sm:h-7 md:h-8 w-56 bg-gray-700 rounded"></div>
        <div className="h-3 w-40 bg-gray-700 rounded mt-2"></div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="w-full">
        <div className="relative w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
            size={16}
          />
          <div className="w-full h-9 sm:h-10 bg-[#11151c] border border-accent-content/5 rounded-lg"></div>
        </div>
      </div>

      {/* ================= MOBILE SKELETON ================= */}
      <div className="block xl:hidden space-y-3">
        {[...Array(5)].map((_, i) => (
          <OrderTableCardSkeleton key={i} count={5} />
        ))}
      </div>

      {/* ================= DESKTOP TABLE SKELETON ================= */}
      <div className="hidden xl:block bg-[#11151c] border border-accent-content/5 rounded-xl overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0a0c12] border-b border-accent-content/5">
              <tr>
                {[...Array(7)].map((_, i) => (
                  <th key={i} className="px-6 py-4">
                    <div className="h-3 w-20 bg-gray-700 rounded"></div>
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
