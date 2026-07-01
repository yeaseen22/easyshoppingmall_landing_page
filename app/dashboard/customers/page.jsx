export const dynamic = 'force-dynamic';
import { getOrders } from "@/features/orders/actions/order";
import CustomersComponent from "@/features/dashboard/components/customers-component";

export default async function CustomersPage() {
  const orders = await getOrders();
  
  const customersMap = {};
  
  orders?.forEach(order => {
    const key = order.email;
    if (!key) return;
    
    if (!customersMap[key]) {
      customersMap[key] = {
        _id: order._id.toString(),
        name: order.customerName || order.name || "Unknown Customer",
        email: order.email || "N/A",
        phone: order.phone,
        location: order.district ? `${order.city || ""}, ${order.district}` : order.address || "Unknown",
        totalOrders: 0,
        spent: 0,
      };
    }
    
    customersMap[key].totalOrders += 1;
    customersMap[key].spent += Number(order.totalPrice) || 0;
    
    if (customersMap[key].email === "N/A" && order.email) {
      customersMap[key].email = order.email;
    }
  });

  const uniqueCustomers = Object.values(customersMap).sort((a, b) => b.spent - a.spent);

  return (
    <CustomersComponent customers={uniqueCustomers} />
  );
}
