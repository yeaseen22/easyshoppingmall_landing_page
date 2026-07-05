"use client";

import { updateNavbar } from "@/features/home/actions/site-settings";
import { navbarSchema } from "@/features/site-settings/validations/site-settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";

const inputClass =
  "w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color transition-all";

export const NavbarForm = ({ data, onUpdated }) => {
  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(navbarSchema),
    defaultValues: { brandName: "", tagline: "" },
  });

  useEffect(() => {
    if (data) {
      reset({
        brandName: data.brandName || "",
        tagline: data.tagline || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (values) => {
    setIsSaving(true);
    const result = await updateNavbar(values);
    setIsSaving(false);

    Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Success" : "Error",
      text: result.message,
      background: "#11151c",
      color: "#fff",
      timer: 2000,
      showConfirmButton: false,
    });

    if (result.success && onUpdated) onUpdated();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-[#11151c] rounded-2xl shadow-xl border border-accent-content/5 p-6 md:p-8 space-y-6">
      <h2 className="text-xl font-bold text-accent-content flex items-center gap-2">
        Navbar Settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="brandName"
          control={control}
          render={({ field, fieldState }) => (
            <label
              className="block text-sm font-medium text-gray-300 mb-2"
              data-invalid={fieldState.invalid}
            >
              Brand Name <span className="text-red-500">*</span>
              <input
                {...field}
                type="text"
                aria-invalid={fieldState.invalid}
                className={inputClass}
              />
              {fieldState.error && (
                <p className="text-red-400 text-[10px] mt-1">{fieldState.error.message}</p>
              )}
            </label>
          )}
        />

        <Controller
          name="tagline"
          control={control}
          render={({ field, fieldState }) => (
            <label
              className="block text-sm font-medium text-gray-300 mb-2"
              data-invalid={fieldState.invalid}
            >
              Tagline
              <input
                {...field}
                type="text"
                aria-invalid={fieldState.invalid}
                className={inputClass}
              />
              {fieldState.error && (
                <p className="text-red-400 text-[10px] mt-1">{fieldState.error.message}</p>
              )}
            </label>
          )}
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-primary-color text-black font-bold rounded-xl transition-all hover:bg-primary-color/90 disabled:opacity-70"
        >
          {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          Save Navbar
        </button>
      </div>
    </form>
  );
};
