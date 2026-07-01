"use client";

import DataTable from "@/components/ui/data-table";
import {
  deleteOrder,
  updateOrderStatus,
} from "@/features/orders/actions/order";
import { Eye, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { getStatusStyle } from "../utils/utils";

export default function OrdersComponent({ orders }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

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

  const handleStatusUpdate = async (id, newStatus) => {
    setIsUpdating(true);
    const result = await updateOrderStatus(id, newStatus);
    if (result.success) {
      router.refresh();
      setSelectedOrder(null);
    }
    setIsUpdating(false);
  };

  const filteredOrders = orders.filter(
    (o) =>
      (o._id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.customerName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.phone || "").includes(searchTerm) ||
      (o.status || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const headers = [
    { label: "Order ID" },
    { label: "Customer" },
    { label: "Date" },
    { label: "Amount" },
    { label: "Phone" },
    { label: "Status" },
    { label: "Action", align: "right" },
  ];

  return (
    <div className="w-full flex-1 min-w-0 overflow-hidden space-y-5 px-3 sm:px-4 md:px-6">
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-accent-content">
          Order <span className="text-primary-color">Management</span>
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          সব অর্ডার এখান থেকে ম্যানেজ করুন
        </p>
      </div>

      <DataTable
        headers={headers}
        data={filteredOrders}
        search={searchTerm}
        onSearch={setSearchTerm}
        searchPlaceholder="Search..."
        emptyMessage="No orders found."
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
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => handleDelete(order._id)}
                  className="p-2 bg-secondary rounded-lg"
                >
                  <Trash2 size={16} />
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
                className="p-2 bg-accent-content/5 rounded-lg"
              >
                <Eye size={14} />
              </button>
              <button
                onClick={() => handleDelete(order._id)}
                className="p-2 bg-accent-content/5 rounded-lg"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        )}
      />

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg sm:max-w-2xl bg-[#11151c] border border-accent-content/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-accent-content/10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-accent-content">
                  Order Details
                </h3>
                <p className="text-[10px] sm:text-xs font-mono text-gray-400 mt-1 break-all">
                  ID: {selectedOrder._id}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-gray-400 hover:text-accent-content bg-accent-content/5 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#080808] p-4 rounded-xl border border-accent-content/5">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase mb-1">
                    Customer
                  </p>
                  <p className="text-sm text-accent-content">
                    {selectedOrder.customerName}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase mb-1">
                    Phone
                  </p>
                  <p className="text-sm text-accent-content">
                    {selectedOrder.phone}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[10px] text-gray-500 uppercase mb-1">
                    Address
                  </p>
                  <p className="text-sm text-accent-content wrap-break-word">
                    {selectedOrder.address}, {selectedOrder.city},{" "}
                    {selectedOrder.district}
                  </p>
                </div>
                {selectedOrder.transactionId && (
                  <div className="sm:col-span-2">
                    <p className="text-[10px] text-gray-500 uppercase mb-1">
                      Transaction ID
                    </p>
                    <p className="text-sm text-[#d4af37] font-mono break-all">
                      {selectedOrder.transactionId}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-bold text-accent-content mb-3 uppercase">
                  Ordered Item
                </h4>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center bg-[#080808] p-4 rounded-xl border border-accent-content/5">
                  {selectedOrder.productId?.image && (
                    <Image
                      src={selectedOrder.productId.image}
                      alt={selectedOrder.productId.name}
                      width={100}
                      height={100}
                      className="w-full sm:w-16 h-40 sm:h-16 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-accent-content font-semibold text-sm">
                      {selectedOrder.productId?.name || "Unknown Product"}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                      <p>
                        Qty:{" "}
                        <span className="text-accent-content">
                          {selectedOrder.quantity}
                        </span>
                      </p>
                      <p>
                        Price:{" "}
                        <span className="text-[#d4af37]">
                          ৳{selectedOrder.totalPrice}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-accent-content/10 pt-4">
                <h4 className="text-xs sm:text-sm font-bold text-accent-content mb-3 uppercase">
                  Update Status
                </h4>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
                  <div className="flex-1 w-full">
                    <label className="text-xs text-gray-500 mb-1 block">
                      Status
                    </label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          status: e.target.value,
                        })
                      }
                      className="w-full bg-[#080808] border border-accent-content/10 rounded-lg px-3 py-2 text-sm text-accent-content outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <button
                    disabled={isUpdating}
                    onClick={() =>
                      handleStatusUpdate(
                        selectedOrder._id,
                        selectedOrder.status,
                      )
                    }
                    className={`w-full sm:w-auto px-5 py-2 bg-[#d4af37] text-black font-bold rounded-lg text-sm ${isUpdating ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    {isUpdating ? "Updating..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
