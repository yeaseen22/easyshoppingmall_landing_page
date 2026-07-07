"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateNavbar } from "@/features/site-settings/actions/site-settings";
import { navbarSchema } from "@/features/site-settings/validations/site-settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";

export const NavbarForm = ({ data, onUpdated }) => {
  const [isSaving, setIsSaving] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(navbarSchema),
    defaultValues: { brandName: "", tagline: "" },
  });

  useEffect(() => {
    if (data)
      reset({ brandName: data.brandName || "", tagline: data.tagline || "" });
  }, [data, reset]);

  const onSubmit = async (values) => {
    setIsSaving(true);
    const result = await updateNavbar(values);
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
        <CardTitle>Navbar Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="brandName"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <Label htmlFor="brandName">
                    Brand Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="brandName"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="EasyShoppingMall"
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
              name="tagline"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Your trusted shop"
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

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}
              Save Navbar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
