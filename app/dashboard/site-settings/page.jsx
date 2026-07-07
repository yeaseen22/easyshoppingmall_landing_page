"use client";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { getSiteSettings } from "@/features/site-settings/actions/site-settings";
import { DeliveryForm } from "@/features/site-settings/components/delivery-form";
import { FooterForm } from "@/features/site-settings/components/footer-form";
import { NavbarForm } from "@/features/site-settings/components/navbar-form";
import { PaymentMethodsForm } from "@/features/site-settings/components/payment-methods-form";
import { TabButton } from "@/features/site-settings/components/tab-button";
import { useCallback, useEffect, useState, useTransition } from "react";

const tabs = [
  { value: "navbar", label: "Navbar" },
  { value: "footer", label: "Footer" },
  { value: "delivery", label: "Delivery Charge" },
  { value: "payment", label: "Payment Methods" },
];

const formComponents = {
  navbar: NavbarForm,
  footer: FooterForm,
  delivery: DeliveryForm,
  payment: PaymentMethodsForm,
};

const dataKeys = {
  navbar: "navbar",
  footer: "footer",
  delivery: "deliveryCharge",
  payment: "paymentMethods",
};

export default function SiteSettingsDashboard() {
  const [activeTab, setActiveTab] = useState("navbar");
  const [settings, setSettings] = useState(null);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getSiteSettings();
      setSettings(data);
    });
  }, []);

  const handleUpdated = useCallback(async () => {
    const fresh = await getSiteSettings();
    setSettings(fresh);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Loading settings..." />
      </div>
    );
  }

  if (!settings) return null;

  const ActiveForm = formComponents[activeTab];

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-8 space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
          Site <span className="text-primary">Settings</span>
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">
          Manage landing page content and layout
        </p>
      </div>

      <TabButton tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <ActiveForm data={settings[dataKeys[activeTab]]} onUpdated={handleUpdated} />
    </div>
  );
}
