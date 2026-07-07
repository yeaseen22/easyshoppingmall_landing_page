"use client";

import { Card } from "@/components/ui/card";
import DataTable from "@/components/ui/data-table";
import { getStatusStyle } from "../utils/utils";

export default function RecentOrdersSection({ orders = [] }) {
  const columns = [
    {
      header: "Order ID",
      accessor: "_id",
      className: "text-xs text-primary font-mono",
      cell: (val) => (val || "").slice(0, 8),
    },
    {
      header: "Customer",
      accessor: "customerName",
      className: "text-sm text-foreground",
    },
    {
      header: "Amount",
      accessor: "totalPrice",
      className: "text-sm text-foreground font-bold",
      cell: (val) => `৳${val}`,
    },
    {
      header: "Date",
      accessor: "createdAt",
      className: "text-sm text-muted-foreground",
      cell: (val) => new Date(val).toLocaleDateString(),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (val) => (
        <span
          className={`px-2.5 py-1 text-[10px] rounded-lg font-medium ${getStatusStyle(val)}`}
        >
          {val}
        </span>
      ),
    },
  ];

  return (
    <Card className="p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold text-foreground mb-4">
        Recent Orders
      </h3>
      <DataTable
        columns={columns}
        data={orders || []}
        emptyMessage="No orders yet."
      />
    </Card>
  );
}
