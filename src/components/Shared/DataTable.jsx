"use client";

import { Search } from "lucide-react";

export default function DataTable({
  headers = [],
  data = [],
  search = "",
  onSearch,
  searchPlaceholder = "Search...",
  emptyMessage = "No data found.",
  renderRow,
  renderMobileCard,
  headerExtras,
}) {
  return (
    <div className="space-y-5">
      {onSearch && (
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-[#11151c] border border-accent-content/5 rounded-lg py-2 pl-9 pr-3 text-xs placeholder:text-gray-500 text-accent-content sm:text-sm outline-none focus:border-[#d4af37]/50"
          />
        </div>
      )}

      {headerExtras}

      {data.length === 0 ? (
        <p className="text-gray-500 text-center py-8 text-sm">{emptyMessage}</p>
      ) : (
        <>
          {renderMobileCard && (
            <div className="block xl:hidden space-y-3">{data.map(renderMobileCard)}</div>
          )}

          <div className={`${renderMobileCard ? "hidden xl:block" : ""} bg-[#11151c] border border-accent-content/5 rounded-xl overflow-hidden`}>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#0a0c12] text-gray-500 text-[10px] uppercase border-b border-accent-content/5">
                  <tr>
                    {headers.map((h, i) => (
                      <th key={i} className={`px-6 py-4 ${h.align === "right" ? "text-right" : ""}`}>
                        {h.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-accent-content/5">{data.map(renderRow)}</tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
