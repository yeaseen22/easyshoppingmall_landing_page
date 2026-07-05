"use client";

import {
  createProduct,
  editProduct,
} from "@/features/products/store/product-store";
import { useProductStore } from "@/features/products/store/product-store-provider";
import { productSchema } from "@/features/products/validations/product-schema";
import { ImageUploader } from "@/features/images/components/image-uploader";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

const formFields = [
  {
    name: "name",
    label: "Product Name",
    type: "text",
    placeholder: "E.g. Royal Oxford Timepiece",
    required: true,
    colSpan: 2,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Short description of the product...",
    required: true,
    rows: 3,
    colSpan: 2,
  },
  {
    name: "price",
    label: "Price (৳)",
    type: "number",
    placeholder: "E.g. 15000",
    required: true,
  },
  {
    name: "discount",
    label: "Discount (%)",
    type: "number",
    placeholder: "E.g. 40",
  },
  {
    name: "stock",
    label: "Stock",
    type: "number",
    placeholder: "E.g. 50",
    required: true,
  },
  {
    name: "productSizes",
    label: "Sizes (comma separated)",
    type: "text",
    placeholder: "E.g. S, M, L, XL",
  },
  {
    name: "productColors",
    label: "Colors (comma separated)",
    type: "text",
    placeholder: "E.g. Red, Blue, Black",
  },
];

export default function ProductForm() {
  const editingProduct = useProductStore((s) => s.editingProduct);
  const clearEditing = useProductStore((s) => s.clearEditing);
  const refetch = useProductStore((s) => s.refetch);
  const setEditingProduct = useProductStore((s) => s.setEditingProduct);

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discount: "",
      image: "",
      productSizes: "",
      productColors: "",
      stock: 0,
      productStatus: [],
    },
  });

  useEffect(() => {
    if (editingProduct) {
      reset({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        price: editingProduct.price || 0,
        discount: editingProduct.discount || "",
        image: editingProduct.image || "",
        stock: editingProduct.stock || 0,
        productSizes: Array.isArray(editingProduct.productSizes)
          ? editingProduct.productSizes.join(", ")
          : "",
        productColors: Array.isArray(editingProduct.productColors)
          ? editingProduct.productColors.join(", ")
          : "",
        productStatus: editingProduct.productStatus || [],
      });
    } else {
      reset({
        name: "",
        description: "",
        price: 0,
        discount: "",
        image: "",
        productSizes: "",
        productColors: "",
        stock: 0,
        productStatus: [],
      });
    }
  }, [editingProduct, reset]);

  const onSubmit = async (data) => {
    const result = editingProduct
      ? await editProduct(editingProduct._id, data)
      : await createProduct(data);

    if (result.success) {
      await refetch();
      setEditingProduct(null);
      Swal.fire({
        icon: "success",
        title: editingProduct ? "Updated" : "Added",
        text: result.message,
        background: "#11151c",
        color: "#fff",
      });

      if (!editingProduct) reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.message,
        background: "#11151c",
        color: "#fff",
      });
    }
  };

  const inputClass =
    "w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <section className="bg-[#11151c] rounded-2xl shadow-xl border border-accent-content/5 p-6 md:p-8">
      <h1 className="text-xl md:text-2xl font-bold text-accent-content mb-6">
        {editingProduct ? "Edit Featured Product" : "Add Featured Product"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {formFields.map((field) => {
          const isRequired = field.required;

          return (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              render={({ field: rhfField, fieldState }) => (
                <div
                  className={cn(
                    "md:col-span-1",
                    field.colSpan && "md:col-span-2",
                  )}
                >
                  <label
                    htmlFor={rhfField.name}
                    data-invalid={fieldState.invalid}
                    className={cn(labelClass)}
                  >
                    {field.label}{" "}
                    {isRequired && <span className="text-red-400">*</span>}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      {...rhfField}
                      id={rhfField.name}
                      aria-invalid={fieldState.invalid}
                      rows={field.rows || 2}
                      className={cn(inputClass)}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      {...rhfField}
                      type={field.type}
                      id={rhfField.name}
                      aria-invalid={fieldState.invalid}
                      className={cn(inputClass)}
                      placeholder={field.placeholder}
                    />
                  )}

                  {fieldState.error && (
                    <p className={errorClass}>{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          );
        })}

        <Controller
          name="image"
          control={control}
          render={({ field: rhfField, fieldState }) => (
            <div className="md:col-span-2">
              <label className={labelClass}>
                Product Image <span className="text-red-400">*</span>
              </label>
              <ImageUploader
                folder="product"
                value={rhfField.value}
                onChange={rhfField.onChange}
                onRemove={() => rhfField.onChange("")}
                label="Product"
              />
              {fieldState.error && (
                <p className={errorClass}>{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          name="productStatus"
          control={control}
          render={({ field: rhfField, fieldState }) => (
            <div>
              <label className={labelClass} data-invalid={fieldState.invalid}>
                Product Status
              </label>
              <div className="flex gap-4 mt-2">
                {["hot", "cold"].map((status) => (
                  <label
                    key={status}
                    htmlFor={status}
                    className="flex items-center gap-2 text-gray-300 cursor-pointer"
                  >
                    <input
                      id={status}
                      type="checkbox"
                      checked={rhfField.value?.includes(status)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          rhfField.onChange([
                            ...(rhfField.value || []),
                            status,
                          ]);
                        } else {
                          rhfField.onChange(
                            (rhfField.value || []).filter((s) => s !== status),
                          );
                        }
                      }}
                      className="w-4 h-4 accent-primary-color"
                    />
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </label>
                ))}
              </div>
              {fieldState.error && (
                <p className={errorClass}>{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <div className="md:col-span-2 flex justify-end mt-2 gap-4">
          {editingProduct && (
            <button
              type="button"
              onClick={clearEditing}
              disabled={isSubmitting}
              className="px-8 py-3 bg-gray-600 hover:bg-gray-500 text-accent-content font-bold rounded-xl transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="px-8 py-3 bg-primary-color hover:bg-accent-content text-black font-bold rounded-xl transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5"
          >
            {isSubmitting
              ? "Saving..."
              : editingProduct
                ? "Update Product"
                : "Add Product"}
          </button>
        </div>
      </form>
    </section>
  );
}
