"use client";

import { updateOrderStatus } from "@/features/orders/actions/order";
import { OrderStatus } from "@/features/orders/validations/order-schema";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const OrderDetailsModal = ({ order, onClose }) => {
  const router = useRouter();
  const [isUpdating, startUpdateTransition] = useTransition();

  if (!order) return null;

  const handleStatusUpdate = (id, newStatus) => {
    startUpdateTransition(async () => {
      const result = await updateOrderStatus(id, newStatus);

      if (result.success) {
        router.refresh();
        onClose();
      }
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
        <div className="w-full max-w-lg sm:max-w-2xl bg-[#11151c] border border-accent-content/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-accent-content/10">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-accent-content">
                Order Details
              </h3>
              <p className="text-[10px] sm:text-xs font-mono text-gray-400 mt-1 break-all">
                ID: {order._id}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-accent-content bg-accent-content/5 rounded-full"
              aria-label="Close"
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
                  {order.customerName}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase mb-1">
                  Phone
                </p>
                <p className="text-sm text-accent-content">{order.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[10px] text-gray-500 uppercase mb-1">
                  Address
                </p>
                <p className="text-sm text-accent-content">
                  {order.address}, {order.city}, {order.district}
                </p>
              </div>
              {order.transactionId && (
                <div className="sm:col-span-2">
                  <p className="text-[10px] text-gray-500 uppercase mb-1">
                    Transaction ID
                  </p>
                  <p className="text-sm text-[#d4af37] font-mono break-all">
                    {order.transactionId}
                  </p>
                </div>
              )}
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-bold text-accent-content mb-3 uppercase">
                Ordered Item
              </h4>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center bg-[#080808] p-4 rounded-xl border border-accent-content/5">
                {order.productId?.image && (
                  <Image
                    src={order.productId.image}
                    alt={order.productId.name}
                    width={100}
                    height={100}
                    className="w-full sm:w-16 h-40 sm:h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <p className="text-accent-content font-semibold text-sm">
                    {order.productId?.name || "Unknown Product"}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                    <p>
                      Qty:{" "}
                      <span className="text-accent-content">
                        {order.quantity}
                      </span>
                    </p>
                    <p>
                      Price:{" "}
                      <span className="text-[#d4af37]">
                        ৳{order.totalPrice}
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
                    value={order.status}
                    onChange={(e) =>
                      handleStatusUpdate(order._id, e.target.value)
                    }
                    disabled={
                      isUpdating ||
                      order.status === OrderStatus.DELIVERED ||
                      order.status === OrderStatus.CANCELLED
                    }
                    className="w-full bg-[#080808] border border-accent-content/10 rounded-lg px-3 py-2 text-sm text-accent-content outline-none"
                  >
                    {Object.values(OrderStatus).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsModal;
