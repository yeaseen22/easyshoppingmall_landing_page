import ProductForm from "@/features/dashboard/components/product-form";
import ProductTable from "@/features/dashboard/components/product-table";

export default function FeaturedProductsDashboard() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-12">
      <ProductForm />
      <ProductTable />
    </div>
  );
}
