"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function SkeletonRow({ cols }) {
  return (
    <TableRow>
      {Array.from({ length: cols }).map((_, i) => (
        <TableCell key={i}>
          <Skeleton className="h-4 w-3/4" />
        </TableCell>
      ))}
    </TableRow>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-card border border-border p-4 space-y-3 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-3 w-3/4" />
      ))}
      <div className="flex justify-end gap-2 pt-1">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-lg" />
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
  const cols = columns || headers;

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
            className={`${renderMobileCard ? "hidden xl:block" : ""} bg-card border border-border overflow-hidden`}
          >
            <Table>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted border-border">
                  {cols.map((h, i) => (
                    <TableHead
                      key={i}
                      className={
                        h.align === "right" ||
                        h.className?.includes("text-right")
                          ? "text-right"
                          : ""
                      }
                    >
                      {h.header || h.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <SkeletonRow key={i} cols={colCount} />
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : data.length === 0 ? (
        <p className="text-muted-foreground text-center py-8 text-sm">
          {emptyMessage}
        </p>
      ) : (
        <>
          {renderMobileCard && (
            <div className="block xl:hidden space-y-3">
              {data.map(renderMobileCard)}
            </div>
          )}

          <div
            className={`${renderMobileCard ? "hidden xl:block" : ""} bg-card border border-border overflow-hidden`}
          >
            <Table>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted border-border">
                  {cols.map((h, i) => (
                    <TableHead
                      key={i}
                      className={
                        h.align === "right" ||
                        h.className?.includes("text-right")
                          ? "text-right"
                          : ""
                      }
                    >
                      {h.header || h.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {columns
                  ? data.map((row, rowIndex) => (
                      <TableRow
                        key={row._id || rowIndex}
                        className="hover:bg-accent/50 border-border"
                      >
                        {columns.map((col, colIndex) => {
                          const value = row[col.accessor];
                          return (
                            <TableCell
                              key={colIndex}
                              className={col.className || ""}
                            >
                              {col.cell
                                ? col.cell(value, row)
                                : String(value ?? "")}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  : data.map(renderRow)}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
