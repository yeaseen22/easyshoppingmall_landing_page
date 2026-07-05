"use client";

import {
  getHeroBanner,
  updateHeroBanner,
} from "@/features/home/actions/hero-banner";
import { ImageUploader } from "@/features/images/components/image-uploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const heroBannerSchema = z.object({
  tagLine: z
    .string()
    .trim()
    .max(100, "Tag line must be under 100 characters")
    .optional(),
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
  imageUrl: z.string().trim().min(1, "Banner image URL is required"),
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
    rows: 3,
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
    <section className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-[#11151c] rounded-2xl shadow-xl border border-accent-content/5 p-6 md:p-8">
        <h1 className="text-xl md:text-2xl font-bold text-accent-content mb-8">
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

          <Controller
            name="imageUrl"
            control={control}
            render={({ fieldState }) => (
              <div>
                <label className={labelClass}>
                  Banner Image <span className="text-red-500">*</span>
                </label>
                <ImageUploader
                  folder="hero"
                  value={imageUrl}
                  onChange={(url) =>
                    setValue("imageUrl", url, { shouldValidate: true })
                  }
                  onRemove={() =>
                    setValue("imageUrl", "", { shouldValidate: true })
                  }
                  label="Banner"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-primary-color hover:bg-accent-content text-black font-semibold text-sm sm:text-base rounded-xl transition-all shadow-lg ${
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
    </section>
  );
}
