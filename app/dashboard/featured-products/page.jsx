import ProductForm from "@/components/Dashboard/FeaturedProducts/ProductForm";
import ProductTable from "@/components/Dashboard/FeaturedProducts/ProductTable";

export default function FeaturedProductsDashboard() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-12">
      <ProductForm />
      <ProductTable />
    </div>
  );
}
