"use client";

import DataTable from "@/components/ui/data-table";
import { getStatusStyle } from "@/features/dashboard-overview/utils/utils";
import { deleteOrder } from "@/features/orders/actions/order";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import OrderDetailsModal from "./order-details-modal";

const OrderTable = ({ orders = [], search, onSearch, isLoading }) => {
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
      background: "#11151c",
      color: "#fff",
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
      className: "text-xs text-primary-color font-mono",
      cell: (val) => (val || "").slice(0, 8),
    },
    {
      header: "Customer",
      accessor: "customerName",
      className: "text-sm text-accent-content",
    },
    {
      header: "Date",
      accessor: "createdAt",
      className: "text-sm text-gray-400",
      cell: (val) => new Date(val).toLocaleDateString(),
    },
    {
      header: "Amount",
      accessor: "totalPrice",
      className: "text-sm text-accent-content font-bold",
      cell: (val) => `৳${val}`,
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "text-sm text-gray-400",
    },
    {
      header: "Status",
      accessor: "status",
      cell: (val) => (
        <span
          className={`px-3 py-1 text-[10px] rounded ${getStatusStyle(val)}`}
        >
          {val}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: "_id",
      className: "text-right",
      mobileHidden: true,
      cell: (_val, row) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setSelectedOrder(row)}
            className="p-2 bg-primary-color rounded-lg"
          >
            <EyeIcon size={16} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="p-2 bg-secondary rounded-lg"
          >
            <Trash2Icon size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={orderColumns}
        data={orders || []}
        search={search}
        onSearch={onSearch}
        isLoading={isLoading}
        emptyMessage="No orders yet."
        renderMobileCard={(order) => (
          <div
            key={order._id}
            className="bg-[#11151c] border border-accent-content/5 rounded-xl p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <p className="text-xs text-[#d4af37] font-mono">
                {(order._id || "").slice(0, 8)}
              </p>
              <span
                className={`px-2 py-1 text-[10px] rounded ${getStatusStyle(order.status)}`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-accent-content font-semibold text-sm">
              {order.customerName}
            </p>
            <p className="text-xs text-gray-400">📞 {order.phone}</p>
            <p className="text-xs text-gray-400">
              📅 {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-accent-content font-bold">
              ৳{order.totalPrice}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedOrder(order)}
                className="p-2 bg-primary-color rounded-lg"
              >
                <EyeIcon size={14} />
              </button>
              <button
                onClick={() => handleDelete(order._id)}
                className="p-2 bg-secondary rounded-lg"
              >
                <Trash2Icon size={14} />
              </button>
            </div>
          </div>
        )}
      />

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrderTable;
