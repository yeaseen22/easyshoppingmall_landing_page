"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const paymentLabels = {
  cod: "Cash on Delivery",
  bkash: "bKash",
  nagad: "Nagad",
};

const sectionClass = "bg-muted border border-border overflow-hidden";

const OrderDetailsModal = ({ order, onClose }) => {
  const router = useRouter();
  const [isUpdating, startUpdateTransition] = useTransition();

  if (!order) return null;

  const handleStatusUpdate = (newStatus) => {
    startUpdateTransition(async () => {
      const result = await updateOrderStatus(order._id, newStatus);
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

  return (
    <Dialog open={!!order} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Order Details
          </DialogTitle>
          <p className="text-[10px] sm:text-xs font-mono text-muted-foreground mt-1 break-all">
            ID: {order._id}
          </p>
        </DialogHeader>

        <div className="space-y-5">
          <div className={`${sectionClass}`}>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag size={14} className="text-primary" />
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Order Info
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
                    Date
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Calendar
                      size={12}
                      className="text-muted-foreground shrink-0"
                    />
                    <p className="text-sm text-foreground font-medium">
                      {date} {time && `at ${time}`}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
                    Status
                  </p>
                  <span
                    className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                      order.status === OrderStatus.DELIVERED
                        ? "bg-green-500/15 text-green-400"
                        : order.status === OrderStatus.PROCESSING
                          ? "bg-blue-500/15 text-blue-400"
                          : order.status === OrderStatus.CANCELLED
                            ? "bg-destructive/15 text-destructive"
                            : "bg-yellow-500/15 text-yellow-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
                    Payment Method
                  </p>
                  <div className="flex items-center gap-1.5">
                    <CreditCard
                      size={12}
                      className="text-muted-foreground shrink-0"
                    />
                    <p className="text-sm text-foreground font-medium">
                      {paymentLabels[order.paymentMethod] ||
                        order.paymentMethod ||
                        "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${sectionClass}`}>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <User size={14} className="text-primary" />
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Customer
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
                    Name
                  </p>
                  <div className="flex items-center gap-1.5">
                    <User
                      size={12}
                      className="text-muted-foreground shrink-0"
                    />
                    <p className="text-sm text-foreground font-medium">
                      {order.customerName}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
                    Email
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    {order.email || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
                    Phone
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Phone
                      size={12}
                      className="text-muted-foreground shrink-0"
                    />
                    <p className="text-sm text-foreground font-medium">
                      {order.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${sectionClass}`}>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} className="text-primary" />
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Delivery Address
                </h4>
              </div>
              <p className="text-sm text-foreground font-medium mb-2">
                {order.address}, {order.thana}, {order.zilla}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
                    Thana
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    {order.thana}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
                    Zilla
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    {order.zilla}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`${sectionClass}`}>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Package size={14} className="text-primary" />
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Product Details
                </h4>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
                {order.productId?.image && (
                  <div className="relative w-full sm:w-20 h-48 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-muted border border-border">
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
                    <p className="text-sm text-foreground font-medium">
                      {order.productId?.name || "Unknown Product"}
                    </p>
                    {order.productId?.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {order.productId.description}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
                    <p>
                      Qty:{" "}
                      <span className="text-foreground font-semibold">
                        {order.quantity}
                      </span>
                    </p>
                    {order.selectedSize && (
                      <p>
                        Size:{" "}
                        <span className="text-foreground font-semibold">
                          {order.selectedSize}
                        </span>
                      </p>
                    )}
                    {order.selectedColor && (
                      <p>
                        Color:{" "}
                        <span className="text-foreground font-semibold">
                          {order.selectedColor}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${sectionClass}`}>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign size={14} className="text-primary" />
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Payment Summary
                </h4>
              </div>
              <div className="space-y-3">
                {order.transactionId && (
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Transaction ID
                    </p>
                    <p className="text-xs text-primary font-mono max-w-50 truncate">
                      {order.transactionId}
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Package size={12} className="text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      Subtotal ({order.quantity} item
                      {order.quantity > 1 ? "s" : ""})
                    </p>
                  </div>
                  <p className="text-xs text-foreground">
                    ৳{order.totalPrice - order.deliveryCharge}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Truck size={12} className="text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      Delivery Charge
                    </p>
                  </div>
                  <p className="text-xs text-foreground">
                    ৳{order.deliveryCharge}
                  </p>
                </div>
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <p className="text-sm font-bold text-foreground">Total</p>
                  <p className="text-lg font-bold text-primary">
                    ৳{order.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`${sectionClass}`}>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag size={14} className="text-primary" />
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Update Status
                </h4>
              </div>
              <p className="text-[10px] text-muted-foreground mb-3">
                Change the order status to track fulfillment progress.
                {order.status === OrderStatus.DELIVERED && (
                  <span className="text-green-500 ml-1">
                    Order is already delivered.
                  </span>
                )}
                {order.status === OrderStatus.CANCELLED && (
                  <span className="text-destructive ml-1">
                    Order has been cancelled.
                  </span>
                )}
              </p>
              <Select
                value={order.status}
                onValueChange={handleStatusUpdate}
                disabled={
                  isUpdating ||
                  order.status === OrderStatus.DELIVERED ||
                  order.status === OrderStatus.CANCELLED
                }
              >
                <SelectTrigger className="w-full bg-muted border-border px-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(OrderStatus).map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
