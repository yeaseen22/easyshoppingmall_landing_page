"use client";

import { updateFooter } from "@/features/site-settings/actions/site-settings";
import { footerSchema } from "@/features/site-settings/validations/site-settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Clock,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  Share2,
  Twitter,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";

const inputClass =
  "w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color transition-all";

export const FooterForm = ({ data, onUpdated }) => {
  const [isSaving, setIsSaving] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(footerSchema),
    defaultValues: {
      description: "",
      socialLinks: { facebook: "", twitter: "", instagram: "" },
      contactInfo: { email: "", phone: "", address: "" },
      businessHours: { startDate: "", endDate: "", startTime: "", endTime: "" },
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        description: data.description || "",
        socialLinks: {
          facebook: data.socialLinks?.facebook || "",
          twitter: data.socialLinks?.twitter || "",
          instagram: data.socialLinks?.instagram || "",
        },
        contactInfo: {
          email: data.contactInfo?.email || "",
          phone: data.contactInfo?.phone || "",
          address: data.contactInfo?.address || "",
        },
        businessHours: {
          startDate: data.businessHours?.startDate || "",
          endDate: data.businessHours?.endDate || "",
          startTime: data.businessHours?.startTime || "",
          endTime: data.businessHours?.endTime || "",
        },
      });
    }
  }, [data, reset]);

  const onSubmit = async (values) => {
    setIsSaving(true);
    const result = await updateFooter(values);
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
        Footer Settings
      </h2>

      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
            data-invalid={fieldState.invalid}
          >
            Description
            <textarea
              {...field}
              rows={3}
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

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-accent-content">
          <Share2 size={18} className="text-primary-color" />
          Social Links
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Controller
            name="socialLinks.facebook"
            control={control}
            render={({ field, fieldState }) => (
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                data-invalid={fieldState.invalid}
              >
                <Facebook size={16} className="mr-1 inline" /> Facebook URL
                <input
                  {...field}
                  type="url"
                  placeholder="https://facebook.com/your-page"
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
            name="socialLinks.twitter"
            control={control}
            render={({ field, fieldState }) => (
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                data-invalid={fieldState.invalid}
              >
                <Twitter size={16} className="mr-1 inline" /> Twitter URL
                <input
                  {...field}
                  type="url"
                  placeholder="https://twitter.com/your-handle"
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
            name="socialLinks.instagram"
            control={control}
            render={({ field, fieldState }) => (
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                data-invalid={fieldState.invalid}
              >
                <Instagram size={16} className="mr-1 inline" /> Instagram URL
                <input
                  {...field}
                  type="url"
                  placeholder="https://instagram.com/your-profile"
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
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-accent-content">
          <MapPin size={18} className="text-primary-color" />
          Contact Info
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Controller
            name="contactInfo.email"
            control={control}
            render={({ field, fieldState }) => (
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                data-invalid={fieldState.invalid}
              >
                <Mail size={16} className="mr-1 inline" /> Email
                <input
                  {...field}
                  type="email"
                  placeholder="info@example.com"
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
            name="contactInfo.phone"
            control={control}
            render={({ field, fieldState }) => (
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                data-invalid={fieldState.invalid}
              >
                <Phone size={16} className="mr-1 inline" /> Phone
                <input
                  {...field}
                  type="text"
                  placeholder="+880 1234 567890"
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
            name="contactInfo.address"
            control={control}
            render={({ field, fieldState }) => (
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                data-invalid={fieldState.invalid}
              >
                <MapPin size={16} className="mr-1 inline" /> Address
                <input
                  {...field}
                  type="text"
                  placeholder="Dhaka, Bangladesh"
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
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-accent-content">
          <Clock size={18} className="text-primary-color" />
          Business Hours
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="businessHours.startDate"
            control={control}
            render={({ field, fieldState }) => (
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                data-invalid={fieldState.invalid}
              >
                Start Day
                <input
                  {...field}
                  type="text"
                  placeholder="Monday"
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
            name="businessHours.endDate"
            control={control}
            render={({ field, fieldState }) => (
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                data-invalid={fieldState.invalid}
              >
                End Day
                <input
                  {...field}
                  type="text"
                  placeholder="Friday"
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
            name="businessHours.startTime"
            control={control}
            render={({ field, fieldState }) => (
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                data-invalid={fieldState.invalid}
              >
                Start Time
                <input
                  {...field}
                  type="text"
                  placeholder="9:00 AM"
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
            name="businessHours.endTime"
            control={control}
            render={({ field, fieldState }) => (
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                data-invalid={fieldState.invalid}
              >
                End Time
                <input
                  {...field}
                  type="text"
                  placeholder="5:00 PM"
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
          Save Footer
        </button>
      </div>
    </form>
  );
};
