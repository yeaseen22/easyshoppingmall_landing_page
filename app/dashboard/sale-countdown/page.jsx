"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

  return (
    <section className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-background shadow-xl border border-accent-content/5 p-6 md:p-8">
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
                <Field>
                  <FieldLabel htmlFor="title">
                    Section Title <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    type="text"
                    placeholder="Limited Time Offer - Up to 40% Off!"
                    className="px-2"
                  />
                  {error && <FieldError>{error}</FieldError>}
                </Field>
              );
            }}
          />

          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => {
              const error = fieldState.error?.message;
              return (
                <Field>
                  <FieldLabel htmlFor="description">
                    Section Description <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    rows={3}
                    placeholder="Don't miss out on this exclusive offer..."
                    className="px-2"
                  />
                  {error && (
                    <p className="text-red-400 text-xs mt-1">{error}</p>
                  )}
                </Field>
              );
            }}
          />

          <Controller
            name="timezone"
            control={control}
            render={({ field, fieldState }) => {
              const error = fieldState.error?.message;
              return (
                <Field>
                  <FieldLabel htmlFor="timezone">
                    Timezone <span className="text-red-500">*</span>
                  </FieldLabel>
                  <select {...field} id="timezone" className="px-2 text-foreground bg-background">
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                  {error && <FieldError>{error}</FieldError>}
                  <p className="text-gray-500 text-xs mt-1">
                    The countdown deadline will be relative to this timezone
                  </p>
                </Field>
              );
            }}
          />

          <Controller
            name="targetDate"
            control={control}
            render={({ field, fieldState }) => {
              const error = fieldState.error?.message;
              return (
                <Field>
                  <FieldLabel htmlFor="targetDate">
                    Target End Date/Time (Countdown Deadline){" "}
                    <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="targetDate"
                    type="datetime-local"
                    className="px-2"
                  />
                  {error && <FieldError>{error}</FieldError>}
                </Field>
              );
            }}
          />

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`shadow-lg ${
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
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
