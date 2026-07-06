"use client";

import { updatePaymentMethods } from "@/features/site-settings/actions/site-settings";
import { paymentMethodsSchema } from "@/features/site-settings/validations/site-settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";

const inputClass =
  "w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color transition-all";

const selectClass =
  "w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content focus:outline-none focus:ring-2 focus:ring-primary-color transition-all appearance-none";

export const PaymentMethodsForm = ({ data, onUpdated }) => {
  const [isSaving, setIsSaving] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(paymentMethodsSchema),
    defaultValues: {
      nagad: { number: "", type: "Send Money" },
      bKash: { number: "", type: "Send Money" },
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        nagad: {
          number: data.nagad?.number || "",
          type: data.nagad?.type || "Send Money",
        },
        bKash: {
          number: data.bKash?.number || "",
          type: data.bKash?.type || "Send Money",
        },
      });
    }
  }, [data, reset]);

  const onSubmit = async (values) => {
    setIsSaving(true);
    const result = await updatePaymentMethods(values);
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#11151c] rounded-2xl shadow-xl border border-accent-content/5 p-6 md:p-8 space-y-6"
    >
      <h2 className="text-xl font-bold text-accent-content flex items-center gap-2">
        <Banknote size={24} className="text-primary-color" />
        Payment Methods
      </h2>
      <p className="text-sm text-gray-400 -mt-4">
        Configure mobile financial service (MFS) accounts for receiving customer
        payments.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 p-5 bg-[#0a0c12] rounded-xl border border-accent-content/5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#d4af37]" />
            <h3 className="text-lg font-bold text-accent-content">Nagad</h3>
          </div>

          <Controller
            name="nagad.number"
            control={control}
            render={({ field, fieldState }) => (
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                data-invalid={fieldState.invalid}
              >
                Account Number <span className="text-red-500">*</span>
                <input
                  {...field}
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  aria-invalid={fieldState.invalid}
                  className={inputClass}
                />
                {fieldState.error && (
                  <p className="text-red-400 text-[10px] mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </label>
            )}
          />

          <Controller
            name="nagad.type"
            control={control}
            render={({ field, fieldState }) => (
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                data-invalid={fieldState.invalid}
              >
                Transaction Type <span className="text-red-500">*</span>
                <select
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={selectClass}
                >
                  <option value="Send Money">Send Money</option>
                  <option value="Cash Out">Cash Out</option>
                </select>
                {fieldState.error && (
                  <p className="text-red-400 text-[10px] mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </label>
            )}
          />
        </div>

        <div className="space-y-4 p-5 bg-[#0a0c12] rounded-xl border border-accent-content/5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#e2136e]" />
            <h3 className="text-lg font-bold text-accent-content">bKash</h3>
          </div>

          <Controller
            name="bKash.number"
            control={control}
            render={({ field, fieldState }) => (
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                data-invalid={fieldState.invalid}
              >
                Account Number <span className="text-red-500">*</span>
                <input
                  {...field}
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  aria-invalid={fieldState.invalid}
                  className={inputClass}
                />
                {fieldState.error && (
                  <p className="text-red-400 text-[10px] mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </label>
            )}
          />

          <Controller
            name="bKash.type"
            control={control}
            render={({ field, fieldState }) => (
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                data-invalid={fieldState.invalid}
              >
                Transaction Type <span className="text-red-500">*</span>
                <select
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={selectClass}
                >
                  <option value="Send Money">Send Money</option>
                  <option value="Cash Out">Cash Out</option>
                </select>
                {fieldState.error && (
                  <p className="text-red-400 text-[10px] mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </label>
            )}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-primary-color text-black font-bold rounded-xl transition-all hover:bg-primary-color/90 disabled:opacity-70"
        >
          {isSaving ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Save size={16} />
          )}
          Save Payment Methods
        </button>
      </div>
    </form>
  );
};
