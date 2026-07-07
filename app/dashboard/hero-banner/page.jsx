"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getHeroBanner,
  updateHeroBanner,
} from "@/features/home/actions/hero-banner";
import { ImageUploader } from "@/features/images/components/image-uploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
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
      toast.success(result.message || "Hero banner updated successfully.");
    } else {
      toast.error("Failed to update hero banner.");
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

  const inputClass = "w-full px-2";

  return (
    <section className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-background shadow-xl border border-accent-content/5 p-6 md:p-8">
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
                  <Field>
                    <FieldLabel
                      htmlFor={field.name}
                      data-invalid={fieldState.invalid}
                    >
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </FieldLabel>

                    {field.component === "textarea" ? (
                      <Textarea
                        {...formField}
                        id={field.name}
                        rows={field.rows}
                        aria-invalid={fieldState.invalid}
                        className={`${inputClass} resize-y min-h-25`}
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <Input
                        {...formField}
                        id={field.name}
                        type={field.type}
                        aria-invalid={fieldState.invalid}
                        className={inputClass}
                        placeholder={field.placeholder}
                      />
                    )}

                    {error && <FieldError>{error}</FieldError>}
                  </Field>
                );
              }}
            />
          ))}

          <Controller
            name="imageUrl"
            control={control}
            render={({ fieldState }) => (
              <Field>
                <FieldLabel>
                  Banner Image <span className="text-red-500">*</span>
                </FieldLabel>
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
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
