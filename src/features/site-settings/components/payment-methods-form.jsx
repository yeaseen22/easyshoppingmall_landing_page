"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updatePaymentMethods } from "@/features/site-settings/actions/site-settings";
import { paymentMethodsSchema } from "@/features/site-settings/validations/site-settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

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
    if (data)
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
  }, [data, reset]);

  const onSubmit = async (values) => {
    setIsSaving(true);
    const result = await updatePaymentMethods(values);
    setIsSaving(false);

    toast.success(result.message || "Payment methods updated successfully.");

    if (result.success && onUpdated) onUpdated();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure mobile financial service (MFS) accounts for receiving
          customer payments.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 p-5 bg-muted rounded-xl border border-border">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#d4af37]" />
                <h3 className="text-lg font-bold text-foreground">Nagad</h3>
              </div>

              <Controller
                name="nagad.number"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Label htmlFor="nagadNumber">
                      Account Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="nagadNumber"
                      {...field}
                      type="tel"
                      placeholder="01XXXXXXXXX"
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
                name="nagad.type"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Label>
                      Transaction Type{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Send Money">Send Money</SelectItem>
                        <SelectItem value="Cash Out">Cash Out</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.error && (
                      <p className="text-destructive text-xs mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="space-y-4 p-5 bg-muted rounded-xl border border-border">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#e2136e]" />
                <h3 className="text-lg font-bold text-foreground">bKash</h3>
              </div>

              <Controller
                name="bKash.number"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Label htmlFor="bkashNumber">
                      Account Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="bkashNumber"
                      {...field}
                      type="tel"
                      placeholder="01XXXXXXXXX"
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
                name="bKash.type"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Label>
                      Transaction Type{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Send Money">Send Money</SelectItem>
                        <SelectItem value="Cash Out">Cash Out</SelectItem>
                      </SelectContent>
                    </Select>
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
              Save Payment Methods
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
