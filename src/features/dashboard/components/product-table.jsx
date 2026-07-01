"use client";

import DataTable from "@/components/ui/data-table";
import { removeProduct } from "@/features/products/store/product-store";
import { useProductStore } from "@/features/products/store/product-store-provider";
import { ProductStatus } from "@/features/products/validations/product-schema";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import ProductCard from "./product-card";

const ProductTable = () => {
  const products = useProductStore((s) => s.products);
  const isLoading = useProductStore((s) => s.isLoading);
  const setEditingProduct = useProductStore((s) => s.setEditingProduct);
  const refetch = useProductStore((s) => s.refetch);

  const headers = [
    { label: "Product" },
    { label: "Price" },
    { label: "Discount" },
    { label: "Stock" },
    { label: "Status" },
    { label: "Colors" },
    { label: "Action", align: "right" },
  ];

  const handleEdit = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const swal = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#11151c",
      color: "#fff",
    });

    if (swal.isConfirmed) {
      const result = await removeProduct(id);
      if (result.success) {
        await refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success",
          background: "#11151c",
          color: "#fff",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
          background: "#11151c",
          color: "#fff",
        });
      }
    }
  };

  return (
    <>
      <div className="bg-[#11151c] rounded-2xl shadow-xl border border-accent-content/5 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-accent-content mb-6">
          Manage Existing Products
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color" />
          </div>
        ) : (
          <DataTable
            headers={headers}
            data={products}
            emptyMessage="No featured products found."
            renderRow={(product) => (
              <tr key={product._id} className="hover:bg-accent-content/5">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-accent-content font-semibold text-sm">
                        {product.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {product.description?.slice(0, 60)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-accent-content font-bold text-sm">
                    ৳{product.discountedPrice || product.price}
                  </p>
                  {product.discount > 0 && (
                    <p className="text-gray-500 text-xs line-through">
                      ৳{product.price}
                    </p>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-primary-color font-bold">
                  {product.discount > 0 ? `${product.discount}%` : "—"}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${product.stock > 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {product.productStatus.length === 0 ? (
                      <span className="text-slate-300 text-[10px] font-bold">
                        —
                      </span>
                    ) : (
                      product.productStatus.map((s) => (
                        <span
                          key={s}
                          className={`uppercase text-[10px] font-bold px-2 py-0.5 rounded-full ${s === ProductStatus.HOT ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}
                        >
                          {s}
                        </span>
                      ))
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {product.productColors.length === 0 ? (
                      <span className="text-slate-300 text-[10px] font-bold">
                        —
                      </span>
                    ) : (
                      product.productColors.map((c) => (
                        <span
                          key={c}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 uppercase`}
                        >
                          {c}
                        </span>
                      ))
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all"
                      title="Edit Product"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
            renderMobileCard={(product) => (
              <ProductCard
                product={product}
                handleEdit={() => handleEdit(product)}
                handleDelete={() => handleDelete(product._id)}
              />
            )}
          />
        )}
      </div>
    </>
  );
};

export default ProductTable;
