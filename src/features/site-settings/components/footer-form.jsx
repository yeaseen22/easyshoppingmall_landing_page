"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    if (data)
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
  }, [data, reset]);

  const onSubmit = async (values) => {
    setIsSaving(true);
    const result = await updateFooter(values);
    setIsSaving(false);

    Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Success" : "Error",
      text: result.message,
      background: "var(--color-card)",
      color: "var(--color-foreground)",
      timer: 2000,
      showConfirmButton: false,
    });

    if (result.success && onUpdated) onUpdated();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Footer Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...field}
                  rows={3}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && (
                  <p className="text-destructive text-xs mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Share2 size={18} className="text-primary" /> Social Links
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Controller
                name="socialLinks.facebook"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Label htmlFor="facebook">
                      <Facebook size={16} className="mr-1 inline" /> Facebook
                      URL
                    </Label>
                    <Input
                      id="facebook"
                      {...field}
                      type="url"
                      placeholder="https://facebook.com/your-page"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                      <p className="text-destructive text-xs mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="socialLinks.twitter"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Label htmlFor="twitter">
                      <Twitter size={16} className="mr-1 inline" /> Twitter URL
                    </Label>
                    <Input
                      id="twitter"
                      {...field}
                      type="url"
                      placeholder="https://twitter.com/your-handle"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                      <p className="text-destructive text-xs mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="socialLinks.instagram"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Label htmlFor="instagram">
                      <Instagram size={16} className="mr-1 inline" /> Instagram
                      URL
                    </Label>
                    <Input
                      id="instagram"
                      {...field}
                      type="url"
                      placeholder="https://instagram.com/your-profile"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                      <p className="text-destructive text-xs mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <MapPin size={18} className="text-primary" /> Contact Info
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Controller
                name="contactInfo.email"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Label htmlFor="email">
                      <Mail size={16} className="mr-1 inline" /> Email
                    </Label>
                    <Input
                      id="email"
                      {...field}
                      type="email"
                      placeholder="info@example.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                      <p className="text-destructive text-xs mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="contactInfo.phone"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Label htmlFor="phone">
                      <Phone size={16} className="mr-1 inline" /> Phone
                    </Label>
                    <Input
                      id="phone"
                      {...field}
                      type="text"
                      placeholder="+880 1234 567890"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                      <p className="text-destructive text-xs mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="contactInfo.address"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Label htmlFor="address">
                      <MapPin size={16} className="mr-1 inline" /> Address
                    </Label>
                    <Input
                      id="address"
                      {...field}
                      type="text"
                      placeholder="Dhaka, Bangladesh"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                      <p className="text-destructive text-xs mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Clock size={18} className="text-primary" /> Business Hours
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Controller
                name="businessHours.startDate"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Label htmlFor="startDate">Start Day</Label>
                    <Input
                      id="startDate"
                      {...field}
                      placeholder="Monday"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                      <p className="text-destructive text-xs mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="businessHours.endDate"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Label htmlFor="endDate">End Day</Label>
                    <Input
                      id="endDate"
                      {...field}
                      placeholder="Friday"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                      <p className="text-destructive text-xs mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="businessHours.startTime"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      {...field}
                      placeholder="9:00 AM"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                      <p className="text-destructive text-xs mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="businessHours.endTime"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      {...field}
                      placeholder="5:00 PM"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                      <p className="text-destructive text-xs mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}
              Save Footer
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
