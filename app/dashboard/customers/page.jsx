export const dynamic = "force-dynamic";
import { getCustomers } from "@/features/customers/actions/customer";
import CustomersComponent from "@/features/customers/components/customers-component";

const CustomersPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const result = await getCustomers(page);

  return (
    <CustomersComponent
      customers={result.data}
      currentPage={result.currentPage}
      totalPages={result.totalPages}
    />
  );
};

export default CustomersPage;
