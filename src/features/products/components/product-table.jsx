"use client";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import Pagination from "@/components/ui/pagination";
import { removeProduct } from "@/features/products/store/product-store";
import { useProductStore } from "@/features/products/store/product-store-provider";
import { ProductStatus } from "@/features/products/validations/product-schema";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import Swal from "sweetalert2";
import ProductTableCard from "./product-table-card";

const ProductTable = () => {
  const products = useProductStore((s) => s.products);
  const isLoading = useProductStore((s) => s.isLoading);
  const currentPage = useProductStore((s) => s.currentPage);
  const totalPages = useProductStore((s) => s.totalPages);
  const total = useProductStore((s) => s.total);
  const setEditingProduct = useProductStore((s) => s.setEditingProduct);
  const fetchPage = useProductStore((s) => s.fetchPage);

  useEffect(() => {
    fetchPage(1, 5);
  }, [fetchPage]);

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
      background: "var(--color-card)",
      color: "var(--color-foreground)",
    });

    if (swal.isConfirmed) {
      const result = await removeProduct(id);
      if (result.success) {
        await fetchPage(currentPage, 10);
        Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success",
          background: "var(--color-card)",
          color: "var(--color-foreground)",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
          background: "var(--color-card)",
          color: "var(--color-foreground)",
        });
      }
    }
  };

  const columns = [
    {
      header: "Product",
      accessor: "name",
      cell: (val, row) => (
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
            <Image src={row.image} alt={val} fill className="object-cover" sizes="48px" />
          </div>
          <div>
            <p className="text-foreground font-semibold text-sm">{val}</p>
            <p className="text-muted-foreground text-xs">{row.description?.slice(0, 60)}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      accessor: "discountedPrice",
      className: "text-foreground font-bold text-sm",
      cell: (val, row) => (
        <>
          <p>৳{val || row.price}</p>
          {row.discount > 0 && <p className="text-muted-foreground text-xs line-through">৳{row.price}</p>}
        </>
      ),
    },
    {
      header: "Discount",
      accessor: "discount",
      className: "text-sm text-primary font-bold",
      cell: (val) => (val > 0 ? `${val}%` : "—"),
    },
    {
      header: "Stock",
      accessor: "stock",
      cell: (val) => (
        <span className={`text-xs font-bold px-2 py-1 rounded ${val > 0 ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"}`}>
          {val}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "productStatus",
      cell: (val) => (
        <div className="flex gap-1">
          {val.length === 0 ? (
            <span className="text-muted-foreground text-[10px] font-bold">—</span>
          ) : (
            val.map((s) => (
              <span key={s} className={`uppercase text-[10px] font-bold px-2 py-0.5 rounded-full ${s === ProductStatus.HOT ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>
                {s}
              </span>
            ))
          )}
        </div>
      ),
    },
    {
      header: "Colors",
      accessor: "productColors",
      cell: (val) => (
        <div className="flex gap-1">
          {val.length === 0 ? (
            <span className="text-muted-foreground text-[10px] font-bold">—</span>
          ) : (
            val.map((c) => (
              <span key={c} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 uppercase">{c}</span>
            ))
          )}
        </div>
      ),
    },
    {
      header: "Action",
      accessor: "_id",
      className: "text-right",
      cell: (val, row) => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(row)} className="text-muted-foreground hover:text-blue-500">
            <Pencil size={16} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(row._id)} className="text-muted-foreground hover:text-destructive">
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Manage Existing Products</h2>

      <DataTable
        data={products}
        isLoading={isLoading}
        columns={columns}
        emptyMessage="No featured products found."
        renderMobileCard={(product) => (
          <ProductTableCard key={product._id} product={product} handleEdit={() => handleEdit(product)} handleDelete={() => handleDelete(product._id)} />
        )}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        onPageChange={(p) => fetchPage(p, 5)}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductTable;
