"use client";

function SkeletonRow({ cols }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-accent-content/5 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-[#11151c] border border-accent-content/5 rounded-xl p-4 space-y-3 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-3 bg-accent-content/5 rounded w-3/4" />
      ))}
      <div className="flex justify-end gap-2 pt-1">
        <div className="h-8 w-8 bg-accent-content/5 rounded-lg" />
        <div className="h-8 w-8 bg-accent-content/5 rounded-lg" />
      </div>
    </div>
  );
}

export default function DataTable({
  columns,
  headers,
  data = [],
  emptyMessage = "No data found.",
  renderRow,
  renderMobileCard,
  isLoading,
}) {
  const colCount = columns?.length || headers?.length || 1;

  return (
    <div className="space-y-5">
      {isLoading ? (
        <>
          {renderMobileCard && (
            <div className="block xl:hidden space-y-3">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}
          <div
            className={`${renderMobileCard ? "hidden xl:block" : ""} bg-[#11151c] border border-accent-content/5 rounded-xl overflow-hidden`}
          >
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#0a0c12] text-gray-500 text-[10px] uppercase border-b border-accent-content/5">
                  <tr>
                    {(columns || headers).map((h, i) => (
                      <th
                        key={i}
                        className={`px-6 py-4 ${h.align === "right" || h.className?.includes("text-right") ? "text-right" : ""}`}
                      >
                        {h.header || h.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-accent-content/5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <SkeletonRow key={i} cols={colCount} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : data.length === 0 ? (
        <p className="text-gray-500 text-center py-8 text-sm">{emptyMessage}</p>
      ) : (
        <>
          {renderMobileCard && (
            <div className="block xl:hidden space-y-3">
              {data.map(renderMobileCard)}
            </div>
          )}

          <div
            className={`${renderMobileCard ? "hidden xl:block" : ""} bg-[#11151c] border border-accent-content/5 rounded-xl overflow-hidden`}
          >
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#0a0c12] text-gray-500 text-[10px] uppercase border-b border-accent-content/5">
                  <tr>
                    {(columns || headers).map((h, i) => (
                      <th
                        key={i}
                        className={`px-6 py-4 ${h.align === "right" || h.className?.includes("text-right") ? "text-right" : ""}`}
                      >
                        {h.header || h.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-accent-content/5">
                  {columns
                    ? data.map((row, rowIndex) => (
                        <tr
                          key={row._id || rowIndex}
                          className="hover:bg-accent-content/5"
                        >
                          {columns.map((col, colIndex) => {
                            const value = row[col.accessor];
                            
                            return (
                              <td
                                key={colIndex}
                                className={`px-6 py-4 ${col.className || ""}`}
                              >
                                {col.cell
                                  ? col.cell(value, row)
                                  : String(value ?? "")}
                              </td>
                            );
                          })}
                        </tr>
                      ))
                    : data.map(renderRow)}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
