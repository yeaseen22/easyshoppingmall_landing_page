"use client";

import {
  getSaleCountDown,
  updateSaleCountDown,
} from "@/features/sale-countdown/actions/sale-countdown";
import { saleCountdownSchema } from "@/features/sale-countdown/validations/sale-countdown-schema";
import { TIMEZONES, utcToLocal } from "@/utils/timezone";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SaleCountdownDashboard() {
  const [isLoading, startTransition] = useTransition();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(saleCountdownSchema),
    defaultValues: {
      title: "",
      description: "",
      targetDate: "",
      timezone: "Asia/Dhaka",
    },
    mode: "onChange",
  });

  useEffect(() => {
    startTransition(async () => {
      const data = await getSaleCountDown();

      if (data) {
        setValue("title", data.title || "", { shouldValidate: true });
        setValue("description", data.description || "", {
          shouldValidate: true,
        });
        setValue("timezone", data.timezone || "Asia/Dhaka", {
          shouldValidate: true,
        });

        if (data.targetDate) {
          const tz = data.timezone || "Asia/Dhaka";
          setValue("targetDate", utcToLocal(data.targetDate, tz), {
            shouldValidate: true,
          });
        }
      }
    });
  }, [setValue]);

  const onSubmit = async (formData) => {
    const result = await updateSaleCountDown(
      formData.title,
      formData.description,
      formData.targetDate,
      formData.timezone,
    );

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center h-48 gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-color" />
        <p className="text-gray-400">Loading configuration...</p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color transition-all";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";

  return (
    <section className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-[#11151c] rounded-2xl shadow-xl border border-accent-content/5 p-6 md:p-8">
        <h1 className="text-xl md:text-2xl font-bold text-accent-content mb-2">
          Manage Sale Countdown
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Configure the sale banner countdown timer on the landing page
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => {
              const error = fieldState.error?.message;
              return (
                <div>
                  <label className={labelClass} htmlFor="title">
                    Section Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...field}
                    id="title"
                    type="text"
                    className={`${inputClass} ${error ? "ring-2 ring-red-500" : ""}`}
                    placeholder="Limited Time Offer - Up to 40% Off!"
                  />
                  {error && (
                    <p className="text-red-400 text-xs mt-1">{error}</p>
                  )}
                </div>
              );
            }}
          />

          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => {
              const error = fieldState.error?.message;
              return (
                <div>
                  <label className={labelClass} htmlFor="description">
                    Section Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...field}
                    id="description"
                    rows={3}
                    className={`${inputClass} ${error ? "ring-2 ring-red-500" : ""}`}
                    placeholder="Don't miss out on this exclusive offer..."
                  />
                  {error && (
                    <p className="text-red-400 text-xs mt-1">{error}</p>
                  )}
                </div>
              );
            }}
          />

          <Controller
            name="timezone"
            control={control}
            render={({ field, fieldState }) => {
              const error = fieldState.error?.message;
              return (
                <div>
                  <label className={labelClass} htmlFor="timezone">
                    Timezone <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...field}
                    id="timezone"
                    className={`${inputClass} ${error ? "ring-2 ring-red-500" : ""} scheme-dark`}
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                  {error && (
                    <p className="text-red-400 text-xs mt-1">{error}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-1">
                    The countdown deadline will be relative to this timezone
                  </p>
                </div>
              );
            }}
          />

          <Controller
            name="targetDate"
            control={control}
            render={({ field, fieldState }) => {
              const error = fieldState.error?.message;
              return (
                <div>
                  <label className={labelClass} htmlFor="targetDate">
                    Target End Date/Time (Countdown Deadline){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...field}
                    id="targetDate"
                    type="datetime-local"
                    className={`${inputClass} ${error ? "ring-2 ring-red-500" : ""} scheme-dark`}
                  />
                  {error && (
                    <p className="text-red-400 text-xs mt-1">{error}</p>
                  )}
                </div>
              );
            }}
          />

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-6 py-3 bg-primary-color hover:bg-accent-content text-black font-bold rounded-xl transition-all shadow-lg ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
