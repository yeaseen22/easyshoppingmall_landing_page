"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateDeliveryCharge } from "@/features/site-settings/actions/site-settings";
import { deliverySchema } from "@/features/site-settings/validations/site-settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MapPin, Save, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export const DeliveryForm = ({ data, onUpdated }) => {
  const [isSaving, setIsSaving] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(deliverySchema),
    defaultValues: { insideDhaka: 60, outsideDhaka: 120 },
  });

  useEffect(() => {
    if (data)
      reset({
        insideDhaka: data.insideDhaka ?? 60,
        outsideDhaka: data.outsideDhaka ?? 120,
      });
  }, [data, reset]);

  const onSubmit = async (values) => {
    setIsSaving(true);
    const result = await updateDeliveryCharge(values);
    setIsSaving(false);

    toast.success(result.message || "Delivery charge updated successfully.");
    if (result.success && onUpdated) onUpdated();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Charge Settings</CardTitle>
        <p className="text-sm text-muted-foreground">
          Set delivery fees used during checkout. The charge is automatically
          applied based on the customer&apos;s zilla.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="insideDhaka"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <Label htmlFor="insideDhaka">
                    <MapPin size={16} className="mr-1 inline" /> Inside Dhaka
                    (৳) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="insideDhaka"
                    {...field}
                    type="number"
                    min={0}
                    placeholder="60"
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
              name="outsideDhaka"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <Label htmlFor="outsideDhaka">
                    <Truck size={16} className="mr-1 inline" /> Outside Dhaka
                    (৳) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="outsideDhaka"
                    {...field}
                    type="number"
                    min={0}
                    placeholder="120"
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

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}
              Save Delivery Charges
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
