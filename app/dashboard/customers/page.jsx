export const dynamic = "force-dynamic";
import CustomersComponent from "@/features/dashboard/components/customers-component";
import { getCustomers } from "@/features/orders/actions/order";

const CustomersPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const result = await getCustomers(page, 10);

  return (
    <CustomersComponent
      customers={result.data}
      currentPage={result.currentPage}
      totalPages={result.totalPages}
    />
  );
};

export default CustomersPage;
