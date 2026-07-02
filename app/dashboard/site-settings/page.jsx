"use client";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  getSiteSettings,
  updateDeliveryCharge,
  updateFooter,
  updateNavbar,
} from "@/features/home/actions/site-settings";
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
  Truck,
  Twitter,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const inputClass =
  "w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color transition-all";
const labelClass = "block text-sm font-medium text-gray-300 mb-2";
const sectionClass =
  "bg-[#11151c] rounded-2xl shadow-xl border border-accent-content/5 p-6 md:p-8 space-y-6";
const sectionTitleClass =
  "text-xl font-bold text-accent-content mb-6 flex items-center gap-2";

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
        active
          ? "bg-primary-color text-black shadow-lg shadow-primary-color/20"
          : "bg-card-bg text-gray-400 hover:text-accent-content border border-accent-content/5"
      }`}
    >
      {children}
    </button>
  );
}

export default function SiteSettingsDashboard() {
  const [activeTab, setActiveTab] = useState("navbar");
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: "navbar", label: "Navbar" },
    { id: "footer", label: "Footer" },
    { id: "delivery", label: "Delivery Charge" },
  ];

  useEffect(() => {
    const load = async () => {
      const data = await getSiteSettings();
      setSettings(data);
      setIsLoading(false);
    };
    load();
  }, []);

  const handleSave = useCallback(async (section, data) => {
    setIsSaving(true);
    const updaters = {
      navbar: updateNavbar,
      footer: updateFooter,
      delivery: updateDeliveryCharge,
    };
    const result = await updaters[section](data);
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

    if (result.success) {
      const fresh = await getSiteSettings();
      setSettings(fresh);
    }
  }, []);

  const updateField = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

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
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Navbar Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Brand Name</label>
              <input
                type="text"
                value={settings.navbar?.brandName || ""}
                onChange={(e) =>
                  updateField("navbar", "brandName", e.target.value)
                }
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input
                type="text"
                value={settings.navbar?.tagline || ""}
                onChange={(e) =>
                  updateField("navbar", "tagline", e.target.value)
                }
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              onClick={() => handleSave("navbar", settings.navbar)}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-primary-color text-black font-bold rounded-xl transition-all hover:bg-primary-color/90 disabled:opacity-70"
            >
              {isSaving ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}
              Save Navbar
            </button>
          </div>
        </div>
      )}

      {activeTab === "footer" && (
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Footer Settings</h2>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              rows={3}
              value={settings.footer?.description || ""}
              onChange={(e) =>
                updateField("footer", "description", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-accent-content">
              <Share2 size={18} className="text-primary-color" />
              Social Links
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className={labelClass}>
                  <Facebook size={16} className="mr-1 inline" /> Facebook URL
                </label>
                <input
                  type="url"
                  value={settings.footer?.socialLinks?.facebook || ""}
                  onChange={(e) => {
                    const links = {
                      ...(settings.footer?.socialLinks || {}),
                      facebook: e.target.value,
                    };
                    setSettings((prev) => ({
                      ...prev,
                      footer: { ...prev.footer, socialLinks: links },
                    }));
                  }}
                  placeholder="https://facebook.com/your-page"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <Twitter size={16} className="mr-1 inline" /> Twitter URL
                </label>
                <input
                  type="url"
                  value={settings.footer?.socialLinks?.twitter || ""}
                  onChange={(e) => {
                    const links = {
                      ...(settings.footer?.socialLinks || {}),
                      twitter: e.target.value,
                    };
                    setSettings((prev) => ({
                      ...prev,
                      footer: { ...prev.footer, socialLinks: links },
                    }));
                  }}
                  placeholder="https://twitter.com/your-handle"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <Instagram size={16} className="mr-1 inline" /> Instagram URL
                </label>
                <input
                  type="url"
                  value={settings.footer?.socialLinks?.instagram || ""}
                  onChange={(e) => {
                    const links = {
                      ...(settings.footer?.socialLinks || {}),
                      instagram: e.target.value,
                    };
                    setSettings((prev) => ({
                      ...prev,
                      footer: { ...prev.footer, socialLinks: links },
                    }));
                  }}
                  placeholder="https://instagram.com/your-profile"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-accent-content">
              <MapPin size={18} className="text-primary-color" />
              Contact Info
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className={labelClass}>
                  <Mail size={16} className="mr-1 inline" /> Email
                </label>
                <input
                  type="email"
                  value={settings.footer?.contactInfo?.email || ""}
                  onChange={(e) => {
                    const info = {
                      ...(settings.footer?.contactInfo || {}),
                      email: e.target.value,
                    };
                    setSettings((prev) => ({
                      ...prev,
                      footer: { ...prev.footer, contactInfo: info },
                    }));
                  }}
                  placeholder="info@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <Phone size={16} className="mr-1 inline" /> Phone
                </label>
                <input
                  type="text"
                  value={settings.footer?.contactInfo?.phone || ""}
                  onChange={(e) => {
                    const info = {
                      ...(settings.footer?.contactInfo || {}),
                      phone: e.target.value,
                    };
                    setSettings((prev) => ({
                      ...prev,
                      footer: { ...prev.footer, contactInfo: info },
                    }));
                  }}
                  placeholder="+880 1234 567890"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <MapPin size={16} className="mr-1 inline" /> Address
                </label>
                <input
                  type="text"
                  value={settings.footer?.contactInfo?.address || ""}
                  onChange={(e) => {
                    const info = {
                      ...(settings.footer?.contactInfo || {}),
                      address: e.target.value,
                    };
                    setSettings((prev) => ({
                      ...prev,
                      footer: { ...prev.footer, contactInfo: info },
                    }));
                  }}
                  placeholder="Dhaka, Bangladesh"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-accent-content">
              <Clock size={18} className="text-primary-color" />
              Business Hours
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>Start Day</label>
                <input
                  type="text"
                  value={settings.footer?.businessHours?.startDate || ""}
                  onChange={(e) => {
                    const hours = {
                      ...(settings.footer?.businessHours || {}),
                      startDate: e.target.value,
                    };
                    setSettings((prev) => ({
                      ...prev,
                      footer: { ...prev.footer, businessHours: hours },
                    }));
                  }}
                  placeholder="Monday"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>End Day</label>
                <input
                  type="text"
                  value={settings.footer?.businessHours?.endDate || ""}
                  onChange={(e) => {
                    const hours = {
                      ...(settings.footer?.businessHours || {}),
                      endDate: e.target.value,
                    };
                    setSettings((prev) => ({
                      ...prev,
                      footer: { ...prev.footer, businessHours: hours },
                    }));
                  }}
                  placeholder="Friday"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Start Time</label>
                <input
                  type="text"
                  value={settings.footer?.businessHours?.startTime || ""}
                  onChange={(e) => {
                    const hours = {
                      ...(settings.footer?.businessHours || {}),
                      startTime: e.target.value,
                    };
                    setSettings((prev) => ({
                      ...prev,
                      footer: { ...prev.footer, businessHours: hours },
                    }));
                  }}
                  placeholder="9:00 AM"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>End Time</label>
                <input
                  type="text"
                  value={settings.footer?.businessHours?.endTime || ""}
                  onChange={(e) => {
                    const hours = {
                      ...(settings.footer?.businessHours || {}),
                      endTime: e.target.value,
                    };
                    setSettings((prev) => ({
                      ...prev,
                      footer: { ...prev.footer, businessHours: hours },
                    }));
                  }}
                  placeholder="5:00 PM"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => handleSave("footer", settings.footer)}
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
        </div>
      )}

      {activeTab === "delivery" && (
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>
            <Truck size={24} className="mr-2" />
            Delivery Charge Settings
          </h2>
          <p className="text-sm text-gray-400 -mt-4">
            Set delivery fees used during checkout. The charge is automatically
            applied based on the customer&apos;s district.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>
                <MapPin size={16} className="mr-1 inline" /> Inside Dhaka (৳)
              </label>
              <input
                type="number"
                min={0}
                value={settings.deliveryCharge?.insideDhaka ?? ""}
                onChange={(e) => {
                  const dc = {
                    ...(settings.deliveryCharge || {}),
                    insideDhaka: Number(e.target.value),
                  };
                  setSettings((prev) => ({ ...prev, deliveryCharge: dc }));
                }}
                placeholder="60"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>
                <Truck size={16} className="mr-1 inline" /> Outside Dhaka (৳)
              </label>
              <input
                type="number"
                min={0}
                value={settings.deliveryCharge?.outsideDhaka ?? ""}
                onChange={(e) => {
                  const dc = {
                    ...(settings.deliveryCharge || {}),
                    outsideDhaka: Number(e.target.value),
                  };
                  setSettings((prev) => ({ ...prev, deliveryCharge: dc }));
                }}
                placeholder="120"
                className={inputClass}
                required
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              onClick={() => handleSave("delivery", settings.deliveryCharge)}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-primary-color text-black font-bold rounded-xl transition-all hover:bg-primary-color/90 disabled:opacity-70"
            >
              {isSaving ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}
              Save Delivery Charges
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
