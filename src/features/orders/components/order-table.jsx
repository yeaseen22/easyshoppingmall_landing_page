"use client";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { getStatusStyle } from "@/features/dashboard-overview/utils/utils";
import { deleteOrder } from "@/features/orders/actions/order";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import OrderDetailsModal from "./order-details-modal";

const OrderTable = ({ orders = [], isLoading }) => {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this order deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "var(--color-card)",
      color: "var(--color-foreground)",
    });

    if (confirm.isConfirmed) {
      const result = await deleteOrder(id);
      if (result.success) router.refresh();
    }
  };

  const orderColumns = [
    {
      header: "Order ID",
      accessor: "_id",
      className: "text-xs text-primary font-mono",
      cell: (val) => (val || "").slice(0, 8),
    },
    { header: "Customer", accessor: "customerName", className: "text-sm text-foreground" },
    {
      header: "Date",
      accessor: "createdAt",
      className: "text-sm text-muted-foreground",
      cell: (val) => new Date(val).toLocaleDateString(),
    },
    { header: "Amount", accessor: "totalPrice", className: "text-sm text-foreground font-bold", cell: (val) => `৳${val}` },
    { header: "Phone", accessor: "phone", className: "text-sm text-muted-foreground" },
    {
      header: "Status",
      accessor: "status",
      cell: (val) => <span className={`px-3 py-1 text-[10px] rounded ${getStatusStyle(val)}`}>{val}</span>,
    },
    {
      header: "Action",
      accessor: "_id",
      className: "text-right",
      mobileHidden: true,
      cell: (_val, row) => (
        <div className="flex justify-end gap-2">
          <Button variant="default" size="icon" onClick={() => setSelectedOrder(row)} className="bg-primary text-primary-foreground">
            <EyeIcon size={16} />
          </Button>
          <Button variant="secondary" size="icon" onClick={() => handleDelete(row._id)}>
            <Trash2Icon size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={orderColumns}
        data={orders || []}
        isLoading={isLoading}
        emptyMessage="No orders yet."
        renderMobileCard={(order) => (
          <div key={order._id} className="bg-card border border-border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-xs text-primary font-mono">{(order._id || "").slice(0, 8)}</p>
              <span className={`px-2 py-1 text-[10px] rounded ${getStatusStyle(order.status)}`}>{order.status}</span>
            </div>
            <p className="text-foreground font-semibold text-sm">{order.customerName}</p>
            <p className="text-xs text-muted-foreground">📞 {order.phone}</p>
            <p className="text-xs text-muted-foreground">📅 {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="text-sm text-foreground font-bold">৳{order.totalPrice}</p>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="default" size="icon" onClick={() => setSelectedOrder(order)} className="bg-primary text-primary-foreground">
                <EyeIcon size={14} />
              </Button>
              <Button variant="secondary" size="icon" onClick={() => handleDelete(order._id)}>
                <Trash2Icon size={14} />
              </Button>
            </div>
          </div>
        )}
      />

      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  );
};

export default OrderTable;
