"use client";

import {
  getHeroBanner,
  updateHeroBanner,
} from "@/features/home/actions/hero-banner";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const heroBannerSchema = z.object({
  tagLine: z.string().trim().optional(),
  title: z
    .string()
    .trim()
    .min(1, "Banner title is required")
    .max(200, "Title must be under 200 characters"),
  description: z
    .string()
    .trim()
    .min(1, "Banner description is required")
    .max(500, "Description must be under 500 characters"),
  imageUrl: z
    .string()
    .trim()
    .min(1, "Banner image URL is required")
    .url("Please enter a valid URL"),
});

const formFields = [
  {
    name: "tagLine",
    label: "Banner TagLine",
    type: "text",
    placeholder: "Enter hero banner tag line...",
    component: "input",
    required: false,
  },
  {
    name: "title",
    label: "Banner Title",
    type: "text",
    placeholder: "Enter hero banner title...",
    component: "input",
    required: true,
  },
  {
    name: "description",
    label: "Banner Description",
    placeholder: "Experience the future of online shopping...",
    component: "textarea",
    required: true,
    rows: 4,
  },
  {
    name: "imageUrl",
    label: "Banner Image URL",
    type: "url",
    placeholder: "https://example.com/image.jpg",
    component: "input",
    required: true,
  },
];

export default function HeroBannerDashboard() {
  const [isLoading, startTransition] = useTransition();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(heroBannerSchema),
    defaultValues: {
      tagLine: "",
      title: "",
      description: "",
      imageUrl: "",
    },
  });

  const imageUrl = useWatch({ name: "imageUrl", control });

  useEffect(() => {
    startTransition(async () => {
      const banner = (await getHeroBanner()) || {};

      setValue("tagLine", banner.tagLine || "", { shouldValidate: true });
      setValue("title", banner.title || "", { shouldValidate: true });
      setValue("description", banner.description || "", {
        shouldValidate: true,
      });
      setValue("imageUrl", banner.imageUrl || "", { shouldValidate: true });
    });
  }, [setValue]);

  const onSubmit = async (data) => {
    const result = await updateHeroBanner(data);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Hero banner updated successfully!",
        background: "#11151c",
        color: "#fff",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update hero banner.",
        background: "#11151c",
        color: "#fff",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center h-48 gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-color" />
        <p className="text-gray-400">Loading banner data...</p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color transition-all";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-[#11151c] rounded-2xl shadow-xl border border-accent-content/5 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-accent-content mb-8">
          Manage Hero Banner
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {formFields.map((field) => (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              render={({ field: formField, fieldState }) => {
                const error = fieldState.error?.message;

                return (
                  <div>
                    <label
                      className={labelClass}
                      htmlFor={field.name}
                      data-invalid={fieldState.invalid}
                    >
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>

                    {field.component === "textarea" ? (
                      <textarea
                        {...formField}
                        id={field.name}
                        rows={field.rows}
                        aria-invalid={fieldState.invalid}
                        className={`${inputClass} resize-y min-h-25`}
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <input
                        {...formField}
                        id={field.name}
                        type={field.type}
                        aria-invalid={fieldState.invalid}
                        className={inputClass}
                        placeholder={field.placeholder}
                      />
                    )}

                    {error && (
                      <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                  </div>
                );
              }}
            />
          ))}

          {imageUrl?.trim() && (
            <div>
              <label className={labelClass}>Image Preview</label>
              <div className="relative w-full h-64 rounded-xl overflow-hidden border border-accent-content/10 mt-2 bg-black/50">
                <Image
                  src={imageUrl}
                  alt="Banner preview"
                  className="w-full h-full object-cover"
                  width={800}
                  height={400}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-primary-color hover:bg-accent-content text-black font-bold rounded-xl transition-all shadow-lg ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
