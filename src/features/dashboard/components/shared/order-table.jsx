"use client";

import DataTable from "@/components/ui/data-table";
import { getStatusStyle } from "@/features/dashboard/utils/utils";
import { deleteOrder } from "@/features/orders/actions/order";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import OrderDetailsModal from "./order-details-modal";

const OrderTable = ({ orders = [], search, onSearch }) => {
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

  const orderHeaders = [
    { label: "Order ID" },
    { label: "Customer" },
    { label: "Date" },
    { label: "Amount" },
    { label: "Phone" },
    { label: "Status" },
    { label: "Action", align: "right" },
  ];

  return (
    <>
      <DataTable
        headers={orderHeaders}
        data={orders || []}
        search={search}
        onSearch={onSearch}
        emptyMessage="No orders yet."
        renderRow={(order) => (
          <tr key={order._id} className="hover:bg-accent-content/5">
            <td className="px-6 py-4 text-xs text-primary-color font-mono">
              {(order._id || "").slice(0, 8)}
            </td>
            <td className="px-6 py-4 text-sm text-accent-content">
              {order.customerName}
            </td>
            <td className="px-6 py-4 text-sm text-gray-400">
              {new Date(order.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 text-sm text-accent-content font-bold">
              ৳{order.totalPrice}
            </td>
            <td className="px-6 py-4 text-sm text-gray-400">{order.phone}</td>
            <td className="px-6 py-4">
              <span
                className={`px-3 py-1 text-[10px] rounded ${getStatusStyle(order.status)}`}
              >
                {order.status}
              </span>
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="p-2 bg-primary-color rounded-lg"
                >
                  <EyeIcon size={16} />
                </button>
                <button
                  onClick={() => handleDelete(order._id)}
                  className="p-2 bg-secondary rounded-lg"
                >
                  <Trash2Icon size={16} />
                </button>
              </div>
            </td>
          </tr>
        )}
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
