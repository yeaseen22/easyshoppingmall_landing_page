"use client";

import { updateOrderStatus } from "@/features/orders/actions/order";
import { OrderStatus } from "@/features/orders/validations/order-schema";
import {
  Calendar,
  CreditCard,
  DollarSign,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Truck,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { BiCube } from "react-icons/bi";

const paymentLabels = {
  cod: "Cash on Delivery",
  bkash: "bKash",
  nagad: "Nagad",
};

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

  const date = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const time = order.createdAt
    ? new Date(order.createdAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const labelClass =
    "text-[10px] text-gray-500 uppercase tracking-wider mb-1.5";
  const valueClass = "text-sm text-accent-content font-medium";
  const sectionClass =
    "bg-[#080808] rounded-xl border border-accent-content/5 overflow-hidden";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg sm:max-w-2xl bg-[#11151c] border border-accent-content/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-accent-content/10 sticky top-0 bg-[#11151c] z-10">
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
            className="p-2 text-gray-400 hover:text-accent-content bg-accent-content/5 rounded-full transition-colors shrink-0"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5">
          <div className={`${sectionClass} divide-y divide-accent-content/5`}>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag size={14} className="text-primary-color" />
                <h4 className="text-xs font-bold text-accent-content uppercase tracking-wider">
                  Order Info
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={labelClass}>Date</p>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-gray-500 shrink-0" />
                    <p className={valueClass}>
                      {date} {time && `at ${time}`}
                    </p>
                  </div>
                </div>
                <div>
                  <p className={labelClass}>Status</p>
                  <span
                    className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                      order.status === OrderStatus.DELIVERED
                        ? "bg-green-500/15 text-green-400"
                        : order.status === OrderStatus.PROCESSING
                          ? "bg-blue-500/15 text-blue-400"
                          : order.status === OrderStatus.CANCELLED
                            ? "bg-red-500/15 text-red-400"
                            : "bg-yellow-500/15 text-yellow-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className={labelClass}>Payment Method</p>
                  <div className="flex items-center gap-1.5">
                    <CreditCard size={12} className="text-gray-500 shrink-0" />
                    <p className={valueClass}>
                      {paymentLabels[order.paymentMethod] ||
                        order.paymentMethod ||
                        "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${sectionClass} divide-y divide-accent-content/5`}>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <User size={14} className="text-primary-color" />
                <h4 className="text-xs font-bold text-accent-content uppercase tracking-wider">
                  Customer
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className={labelClass}>Name</p>
                  <div className="flex items-center gap-1.5">
                    <User size={12} className="text-gray-500 shrink-0" />
                    <p className={valueClass}>{order.customerName}</p>
                  </div>
                </div>
                <div>
                  <p className={labelClass}>Email</p>
                  <p className={valueClass}>{order.email || "—"}</p>
                </div>
                <div>
                  <p className={labelClass}>Phone</p>
                  <div className="flex items-center gap-1.5">
                    <Phone size={12} className="text-gray-500 shrink-0" />
                    <p className={valueClass}>{order.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${sectionClass} divide-y divide-accent-content/5`}>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} className="text-primary-color" />
                <h4 className="text-xs font-bold text-accent-content uppercase tracking-wider">
                  Delivery Address
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <p className={labelClass}>Full Address</p>
                  <p className={valueClass}>
                    {order.address}, {order.city}, {order.district}
                  </p>
                </div>
                <div>
                  <p className={labelClass}>City</p>
                  <p className={valueClass}>{order.city}</p>
                </div>
                <div>
                  <p className={labelClass}>District</p>
                  <p className={valueClass}>{order.district}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`${sectionClass} divide-y divide-accent-content/5`}>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Package size={14} className="text-primary-color" />
                <h4 className="text-xs font-bold text-accent-content uppercase tracking-wider">
                  Product Details
                </h4>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
                {order.productId?.image && (
                  <div className="relative w-full sm:w-20 h-48 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-[#0c0c12] border border-accent-content/5">
                    <Image
                      src={order.productId.image}
                      alt={order.productId.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-2.5">
                  <div>
                    <p className={valueClass}>
                      {order.productId?.name || "Unknown Product"}
                    </p>
                    {order.productId?.description && (
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                        {order.productId.description}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400">
                    <p>
                      Qty:{" "}
                      <span className="text-accent-content font-semibold">
                        {order.quantity}
                      </span>
                    </p>
                    {order.selectedSize && (
                      <p>
                        Size:{" "}
                        <span className="text-accent-content font-semibold">
                          {order.selectedSize}
                        </span>
                      </p>
                    )}
                    {order.selectedColor && (
                      <p>
                        Color:{" "}
                        <span className="text-accent-content font-semibold">
                          {order.selectedColor}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${sectionClass} divide-y divide-accent-content/5`}>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign size={14} className="text-primary-color" />
                <h4 className="text-xs font-bold text-accent-content uppercase tracking-wider">
                  Payment Summary
                </h4>
              </div>
              <div className="space-y-3">
                {order.transactionId && (
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">Transaction ID</p>
                    <p className="text-xs text-[#d4af37] font-mono max-w-50 truncate">
                      {order.transactionId}
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <BiCube size={12} className="text-gray-500" />
                    <p className="text-xs text-gray-500">
                      Subtotal ({order.quantity} item
                      {order.quantity > 1 ? "s" : ""})
                    </p>
                  </div>
                  <p className="text-xs text-accent-content">
                    ৳{order.totalPrice - order.deliveryCharge}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Truck size={12} className="text-gray-500" />
                    <p className="text-xs text-gray-500">Delivery Charge</p>
                  </div>
                  <p className="text-xs text-accent-content">
                    ৳{order.deliveryCharge}
                  </p>
                </div>
                <div className="pt-3 border-t border-accent-content/5 flex items-center justify-between">
                  <p className="text-sm font-bold text-accent-content">Total</p>
                  <p className="text-lg font-bold text-primary-color">
                    ৳{order.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`${sectionClass}`}>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag size={14} className="text-primary-color" />
                <h4 className="text-xs font-bold text-accent-content uppercase tracking-wider">
                  Update Status
                </h4>
              </div>
              <p className="text-[10px] text-gray-500 mb-3">
                Change the order status to track fulfillment progress.
                {order.status === OrderStatus.DELIVERED && (
                  <span className="text-green-500 ml-1">
                    Order is already delivered.
                  </span>
                )}
                {order.status === OrderStatus.CANCELLED && (
                  <span className="text-red-500 ml-1">
                    Order has been cancelled.
                  </span>
                )}
              </p>
              <select
                value={order.status}
                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                disabled={
                  isUpdating ||
                  order.status === OrderStatus.DELIVERED ||
                  order.status === OrderStatus.CANCELLED
                }
                className="w-full bg-[#080808] border border-accent-content/10 rounded-lg px-3.5 py-2.5 text-sm text-accent-content outline-none focus:border-primary-color/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
};

export default OrderDetailsModal;
