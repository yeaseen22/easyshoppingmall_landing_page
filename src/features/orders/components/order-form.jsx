"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Section from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import { placeNewOrder } from "@/features/orders/store/order-store";
import { createOrderSchema } from "@/features/orders/validations/order-schema";
import { getProductById } from "@/features/products/actions/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, ImageIcon, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import CustomerDetailsForm from "./customer-details-form";
import PaymentSelector from "./payment-selector";
import PriceSummary from "./price-summary";
import ProductSelector from "./product-selector";
import VariantSelector from "./variant-selector";

export default function OrderForm({ settings = {} }) {
  const params = useSearchParams();
  const id = params.get("productId");
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [product, setProduct] = useState({});
  const [isLoading, startTransition] = useTransition();

  const schema = useMemo(
    () => createOrderSchema({ product, paymentMethod }),
    [product, paymentMethod],
  );

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      customerName: "",
      phone: "",
      zilla: "",
      thana: "",
      address: "",
      email: "",
      transactionId: "",
      paymentMethod: "cod",
      quantity: 1,
      selectedSize: "",
      selectedColor: "",
      selectedStatus: "",
    },
  });

  const watchedQuantity = useWatch({ control, name: "quantity" });
  const watchedZilla = useWatch({ control, name: "zilla" });
  const watchedPaymentMethod = useWatch({ control, name: "paymentMethod" });

  useEffect(() => {
    if (id) {
      startTransition(async () => {
        try {
          const res = await getProductById(id);
          if (!res.success)
            throw new Error(res.message || "Failed to fetch product details.");
          setProduct(res.product || {});
        } catch (error) {
          console.error("Error fetching product:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch product details.",
            background: "var(--color-card)",
            color: "var(--color-foreground)",
          });
          setProduct({});
        }
      });
    } else {
      setProduct({});
    }
  }, [id]);

  useEffect(() => {
    setPaymentMethod(watchedPaymentMethod);
  }, [watchedPaymentMethod]);

  useEffect(() => {
    if (id) {
      reset({
        customerName: "",
        phone: "",
        zilla: "",
        thana: "",
        address: "",
        email: "",
        transactionId: "",
        paymentMethod: "cod",
        quantity: 1,
        selectedSize: "",
        selectedColor: "",
        selectedStatus: "",
      });
    }
  }, [id, reset]);

  const dc = settings?.deliveryCharge || {};
  const deliveryCharge =
    watchedPaymentMethod === "cod"
      ? watchedZilla?.toLowerCase() === "dhaka"
        ? dc.insideDhaka || 60
        : dc.outsideDhaka || 120
      : 0;
  const unitPrice =
    product?.discount > 0
      ? product.discountedPrice || product.price
      : product?.price || 0;

  const onSubmit = async (data) => {
    const orderData = {
      ...data,
      productId: product?._id,
      deliveryCharge,
      totalPrice: unitPrice * (data.quantity || 1) + deliveryCharge,
    };

    const res = await placeNewOrder(orderData);
    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "অর্ডার সফলভাবে গ্রহণ করা হয়েছে!",
        background: "var(--color-card)",
        color: "var(--color-foreground)",
      });
      reset();
      setProduct({});
      const url = new URLSearchParams(searchParams.toString());
      url.delete("productId");
      push(`/?${url.toString()}#order`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: res.message,
        background: "var(--color-card)",
        color: "var(--color-foreground)",
      });
    }
  };

  return (
    <Section id="order" className="bg-background text-foreground">
      <Container>
        <div className="w-full text-center mb-12">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary px-4 py-1.5 rounded-full uppercase mb-4 text-xs sm:text-sm bg-primary/10"
          >
            Premium Checkout
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Complete Your <span className="text-primary">Purchase</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            আপনার পছন্দের ঘড়িটি অর্ডার করতে নিচের ফর্মটি সঠিক তথ্য দিয়ে পূরণ
            করুন।
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-400 mx-auto"
          noValidate
        >
          <div className="lg:col-span-7 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                  <ImageIcon className="text-primary w-5 h-5" /> Product
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProductSelector startTransition={startTransition} />

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      type="text"
                      disabled
                      value={isLoading ? "Loading..." : product.image || ""}
                      className="bg-muted border-border truncate px-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Unit Price (৳)</Label>
                    <div className="w-full bg-muted border border-border p-2 text-primary font-semibold text-sm">
                      {isLoading ? (
                        <Skeleton className="h-4 w-16" />
                      ) : (
                        <>
                          ৳{unitPrice}
                          {product?.discount > 0 && (
                            <span className="ml-2 text-xs text-muted-foreground line-through font-normal">
                              ৳{product.price}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {!isLoading && (
                    <Controller
                      name="selectedSize"
                      control={control}
                      render={({ field, fieldState }) => (
                        <VariantSelector
                          label="Sizes"
                          options={product?.productSizes}
                          selected={field.value}
                          onSelect={field.onChange}
                          error={fieldState.error?.message}
                        />
                      )}
                    />
                  )}

                  {!isLoading && (
                    <Controller
                      name="selectedColor"
                      control={control}
                      render={({ field, fieldState }) => (
                        <VariantSelector
                          label="Colors"
                          options={product?.productColors}
                          selected={field.value}
                          onSelect={field.onChange}
                          error={fieldState.error?.message}
                          colorPicker
                        />
                      )}
                    />
                  )}

                  {!isLoading && (
                    <Controller
                      name="selectedStatus"
                      control={control}
                      render={({ field, fieldState }) => (
                        <VariantSelector
                          label="Product Status"
                          options={product?.productStatus}
                          selected={field.value}
                          onSelect={field.onChange}
                          error={fieldState.error?.message}
                          badge
                        />
                      )}
                    />
                  )}

                  {product.stock && (
                    <div className="space-y-2">
                      <Label>Stock</Label>
                      <p
                        className={`text-sm font-bold ${product.stock > 0 ? "text-green-400" : "text-destructive"}`}
                      >
                        {product.stock > 0
                          ? `✓ ${product.stock} available`
                          : "✕ Out of stock"}
                      </p>
                    </div>
                  )}
                </div>

                <Controller
                  name="quantity"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                      <div className="aspect-square w-32 sm:w-40 bg-muted rounded-xl border border-dashed border-border flex items-center justify-center overflow-hidden">
                        {isLoading ? (
                          <LoadingSpinner className="w-10 h-10" />
                        ) : product.image ? (
                          <Image
                            src={product.image}
                            alt="Preview"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-muted-foreground text-xs text-center p-4">
                            No image available
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Label>Quantity</Label>
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            onClick={() =>
                              field.onChange(
                                Math.max(1, (field.value || 1) - 1),
                              )
                            }
                            disabled={!id || (field.value || 1) <= 1}
                            className="rounded-full"
                          >
                            <Minus size={18} />
                          </Button>
                          <span className="text-2xl sm:text-3xl font-bold w-12 text-center text-foreground">
                            {field.value || 1}
                          </span>
                          <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            onClick={() =>
                              field.onChange(
                                Math.min(
                                  product?.stock || 99,
                                  (field.value || 1) + 1,
                                ),
                              )
                            }
                            disabled={
                              !id ||
                              (field.value || 1) >= (product?.stock || 99)
                            }
                            className="rounded-full"
                          >
                            <Plus size={18} />
                          </Button>
                        </div>
                        {fieldState.error && (
                          <p className="text-destructive text-xs">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                />
              </CardContent>
            </Card>

            {id && <CustomerDetailsForm control={control} />}
          </div>

          <div className="lg:col-span-5 space-y-8">
            <Card className="border-primary/30 sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                  <CreditCard className="text-primary w-5 h-5" /> Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="paymentMethod"
                  control={control}
                  render={({ field }) => (
                    <PaymentSelector
                      value={field.value}
                      onChange={field.onChange}
                      paymentMethods={settings?.paymentMethods}
                    />
                  )}
                />

                {watchedPaymentMethod !== "cod" && (
                  <Controller
                    name="transactionId"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field className="mb-6">
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-primary"
                          data-invalid={fieldState.invalid}
                        >
                          Transaction ID *
                        </FieldLabel>
                        <Input
                          {...field}
                          type="text"
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter TrxID (e.g. 8N7X6W5Q)"
                          className="bg-muted px-2"
                        />
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                )}

                <PriceSummary
                  unitPrice={unitPrice}
                  quantity={watchedQuantity || 1}
                  deliveryCharge={deliveryCharge}
                  zilla={watchedZilla}
                  isLoading={isLoading}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-8"
                >
                  {!id
                    ? "SELECT A PRODUCT FIRST"
                    : isSubmitting
                      ? "PROCESSING..."
                      : "CONFIRM ORDER NOW"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Container>
    </Section>
  );
}
