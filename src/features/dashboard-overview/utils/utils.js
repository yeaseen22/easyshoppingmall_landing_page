import { OrderStatus } from "@/features/orders/validations/order-schema";

export function getStatusStyle(status) {
  switch (status) {
    case OrderStatus.DELIVERED:
      return "bg-green-500/10 text-green-500";
    case OrderStatus.PENDING:
      return "bg-yellow-500/10 text-yellow-500";
    case OrderStatus.PROCESSING:
      return "bg-blue-500/10 text-blue-500";
    case OrderStatus.CANCELLED:
      return "bg-red-500/10 text-red-500";
    default:
      return "bg-gray-500/10 text-gray-500";
  }
}
