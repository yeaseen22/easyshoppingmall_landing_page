"use client";

import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
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
import PaymentSelector from "./payment-selector";
import PriceSummary from "./price-summary";
import ProductSelector from "./product-selector";
import VariantSelector from "./variant-selector";

const inputClass =
  "w-full mt-2 bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-4 focus:border-primary-color outline-none text-xs sm:text-sm";

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
    formState: { isSubmitting, isValid },
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

          if (!res.success) {
            throw new Error(res.message || "Failed to fetch product details.");
          }
          setProduct(res.product || {});
        } catch (error) {
          console.error("Error fetching product:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch product details.",
            background: "#11151c",
            color: "#fff",
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
        background: "#11151c",
        color: "#fff",
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
        background: "#11151c",
        color: "#fff",
      });
    }
  };

  return (
    <Section id="order" className="bg-[#0a0c12] text-accent-content">
      <Container>
        <div className="w-full text-center mb-12">
          <span className="inline-block bg-primary-color/10 border border-primary-color/30 text-primary-color px-4 py-1.5 rounded-full uppercase mb-4 text-xs sm:text-sm">
            Premium Checkout
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent-content mb-4">
            Complete Your <span className="text-primary-color">Purchase</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
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
            <div className="bg-[#11151c] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                <ImageIcon className="text-primary-color w-5 h-5" /> Product
                Settings
              </h3>

              <ProductSelector startTransition={startTransition} />

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-500">
                    Image URL
                  </label>
                  <input
                    type="text"
                    disabled
                    value={isLoading ? "Loading..." : product.image || ""}
                    className="w-full bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-3 text-gray-400 outline-none text-xs sm:text-sm truncate"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-500">
                    Unit Price (৳)
                  </label>
                  <div className="w-full bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-3 text-primary-color font-bold text-sm sm:text-base">
                    {isLoading ? (
                      <span className="animate-pulse text-gray-400 text-sm font-normal">
                        Loading...
                      </span>
                    ) : (
                      <>
                        ৳{unitPrice}
                        {product?.discount > 0 && (
                          <span className="ml-2 text-xs text-gray-500 line-through font-normal">
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
                    <label className="text-xs font-bold uppercase text-gray-500">
                      Stock
                    </label>
                    <p
                      className={`text-sm font-bold ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}
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
                    <div className="aspect-square w-32 sm:w-40 bg-[#0a0c12] rounded-xl border border-dashed border-gray-700 flex items-center justify-center overflow-hidden">
                      {isLoading ? (
                        <>
                          <div className="w-12 h-12 border-4 border-gray-700 border-t-primary-color rounded-full animate-spin"></div>
                        </>
                      ) : product.image ? (
                        <Image
                          src={product.image}
                          alt="Preview"
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-600 text-xs text-center p-4">
                          No image available
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase text-gray-500">
                        Quantity
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            field.onChange(Math.max(1, (field.value || 1) - 1))
                          }
                          className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed!"
                          disabled={!id || (field.value || 1) <= 1}
                        >
                          <Minus size={18} />
                        </button>
                        <span className="text-2xl sm:text-3xl font-bold w-12 text-center">
                          {field.value || 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            field.onChange(
                              Math.min(
                                product?.stock || 99,
                                (field.value || 1) + 1,
                              ),
                            )
                          }
                          className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition disabled:opacity-40"
                          disabled={
                            !id || (field.value || 1) >= (product?.stock || 99)
                          }
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                      {fieldState.error && (
                        <p className="text-red-400 text-xs">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>

            {id && (
              <div className="bg-[#11151c] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-6">
                  আপনার তথ্য দিন
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                      name="customerName"
                      control={control}
                      render={({ field, fieldState }) => (
                        <label
                          className="text-xs font-bold uppercase text-accent-content"
                          data-invalid={fieldState.invalid}
                        >
                          সম্পুর্ণ নাম
                          <input
                            {...field}
                            type="text"
                            aria-invalid={fieldState.invalid}
                            placeholder="মোঃ রাকিবুল ইসলাম"
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
                      name="phone"
                      control={control}
                      render={({ field, fieldState }) => (
                        <label
                          className="text-xs font-bold uppercase text-accent-content"
                          data-invalid={fieldState.invalid}
                        >
                          ফোন নাম্বার
                          <input
                            {...field}
                            type="tel"
                            aria-invalid={fieldState.invalid}
                            placeholder="01845167412"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                      name="zilla"
                      control={control}
                      render={({ field, fieldState }) => (
                        <label
                          className="text-xs font-bold uppercase text-accent-content"
                          data-invalid={fieldState.invalid}
                        >
                          জেলা
                          <input
                            {...field}
                            type="text"
                            aria-invalid={fieldState.invalid}
                            placeholder="রংপুর"
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
                      name="thana"
                      control={control}
                      render={({ field, fieldState }) => (
                        <label
                          className="text-xs font-bold uppercase text-accent-content"
                          data-invalid={fieldState.invalid}
                        >
                          থানা
                          <input
                            {...field}
                            type="text"
                            aria-invalid={fieldState.invalid}
                            placeholder="তারাগঞ্জ"
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
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <label
                        className="text-xs font-bold uppercase text-accent-content block"
                        data-invalid={fieldState.invalid}
                      >
                        ইমেইল
                        <input
                          {...field}
                          type="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="rakibul.islam@bd.com"
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
                    name="address"
                    control={control}
                    render={({ field, fieldState }) => (
                      <label
                        className="text-xs font-bold uppercase text-accent-content block"
                        data-invalid={fieldState.invalid}
                      >
                        গ্রাম / মহল্লা
                        <textarea
                          {...field}
                          rows={3}
                          aria-invalid={fieldState.invalid}
                          placeholder="কুর্শা কাজী পাড়া"
                          className={`${inputClass} resize-none`}
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
            )}
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#11151c] border border-primary-color/30 rounded-2xl p-6 md:p-8 shadow-2xl sticky top-8">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                <CreditCard className="text-primary-color w-5 h-5" /> Payment
                Method
              </h3>

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
                    <div className="mb-6">
                      <label
                        className="text-xs font-bold uppercase text-primary-color block mb-2"
                        data-invalid={fieldState.invalid}
                      >
                        Transaction ID *
                      </label>
                      <input
                        {...field}
                        type="text"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter TrxID (e.g. 8N7X6W5Q)"
                        className="w-full bg-[#0a0c12] border border-primary-color/50 rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary-color outline-none text-accent-content font-mono"
                      />
                      {fieldState.error && (
                        <p className="text-red-400 text-xs mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
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

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`w-full py-2.5 px-4 font-bold rounded-xl mt-8 transition-transform active:scale-95 shadow-[0_10px_30px_rgba(212,175,55,0.2)] disabled:bg-gray-800 disabled:cursor-not-allowed! disabled:text-gray-500 bg-primary-color hover:bg-primary-color text-black text-sm sm:text-base`}
              >
                {!id
                  ? "SELECT A PRODUCT FIRST"
                  : isSubmitting
                    ? "PROCESSING..."
                    : "CONFIRM ORDER NOW"}
              </button>
            </div>
          </div>
        </form>
      </Container>
    </Section>
  );
}
