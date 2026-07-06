"use client";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { getSiteSettings } from "@/features/site-settings/actions/site-settings";
import { DeliveryForm } from "@/features/site-settings/components/delivery-form";
import { FooterForm } from "@/features/site-settings/components/footer-form";
import { NavbarForm } from "@/features/site-settings/components/navbar-form";
import { PaymentMethodsForm } from "@/features/site-settings/components/payment-methods-form";
import { TabButton } from "@/features/site-settings/components/tab-button";
import { useCallback, useEffect, useState, useTransition } from "react";

export default function SiteSettingsDashboard() {
  const [activeTab, setActiveTab] = useState("navbar");
  const [settings, setSettings] = useState(null);
  const [isLoading, startTransition] = useTransition();

  const tabs = [
    { id: "navbar", label: "Navbar" },
    { id: "footer", label: "Footer" },
    { id: "delivery", label: "Delivery Charge" },
    { id: "payment", label: "Payment Methods" },
  ];

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

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-accent-content">
          Site Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage landing page content and layout
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>

      {activeTab === "navbar" && (
        <NavbarForm data={settings.navbar} onUpdated={handleUpdated} />
      )}

      {activeTab === "footer" && (
        <FooterForm data={settings.footer} onUpdated={handleUpdated} />
      )}

      {activeTab === "delivery" && (
        <DeliveryForm
          data={settings.deliveryCharge}
          onUpdated={handleUpdated}
        />
      )}

      {activeTab === "payment" && (
        <PaymentMethodsForm
          data={settings.paymentMethods}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
}
