"use client";

import { useState, useEffect, useCallback } from "react";
import { getSiteSettings, updateNavbar, updateFeatures, updateAbout, updateFooter } from "@/action/site-settings";
import { Plus, Trash2, GripVertical, Save, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const inputClass = "w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color transition-all";
const labelClass = "block text-sm font-medium text-gray-300 mb-2";
const sectionClass = "bg-[#11151c] rounded-2xl shadow-xl border border-accent-content/5 p-6 md:p-8 space-y-6";
const sectionTitleClass = "text-xl font-bold text-accent-content mb-6 flex items-center gap-2";

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
        active
          ? "bg-primary-color text-black shadow-lg shadow-primary-color/20"
          : "bg-[#11151c] text-gray-400 hover:text-accent-content border border-accent-content/5"
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
    { id: "features", label: "Features" },
    { id: "about", label: "About" },
    { id: "footer", label: "Footer" },
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
      features: updateFeatures,
      about: updateAbout,
      footer: updateFooter,
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
        <h1 className="text-2xl md:text-3xl font-bold text-accent-content">Site Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage landing page content and layout</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <TabButton key={tab.id} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>
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
                onChange={(e) => updateField("navbar", "brandName", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input
                type="text"
                value={settings.navbar?.tagline || ""}
                onChange={(e) => updateField("navbar", "tagline", e.target.value)}
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
              {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Save Navbar
            </button>
          </div>
        </div>
      )}

      {activeTab === "features" && (
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Features Section</h2>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="features-enabled"
              checked={settings.features?.enabled ?? true}
              onChange={(e) => updateField("features", "enabled", e.target.checked)}
              className="w-4 h-4 accent-primary-color"
            />
            <label htmlFor="features-enabled" className="text-sm text-gray-300">Enable Features Section</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Section Title</label>
              <input
                type="text"
                value={settings.features?.title || ""}
                onChange={(e) => updateField("features", "title", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Section Subtitle</label>
              <input
                type="text"
                value={settings.features?.subtitle || ""}
                onChange={(e) => updateField("features", "subtitle", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className={labelClass}>Feature Items</label>
              <button
                onClick={() => {
                  const items = [...(settings.features?.items || [])];
                  items.push({ title: "", description: "", icon: "Package" });
                  setSettings((prev) => ({ ...prev, features: { ...prev.features, items } }));
                }}
                className="flex items-center gap-1 text-xs font-bold text-primary-color hover:underline"
              >
                <Plus size={14} /> Add Feature
              </button>
            </div>
            <div className="space-y-3">
              {(settings.features?.items || []).map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#080808] p-4 rounded-xl border border-accent-content/5">
                  <GripVertical className="mt-3 text-gray-600 shrink-0" size={16} />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const items = [...(settings.features?.items || [])];
                        items[i] = { ...items[i], title: e.target.value };
                        setSettings((prev) => ({ ...prev, features: { ...prev.features, items } }));
                      }}
                      placeholder="Feature title"
                      className={inputClass}
                    />
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => {
                        const items = [...(settings.features?.items || [])];
                        items[i] = { ...items[i], description: e.target.value };
                        setSettings((prev) => ({ ...prev, features: { ...prev.features, items } }));
                      }}
                      placeholder="Feature description"
                      className={inputClass}
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => {
                          const items = [...(settings.features?.items || [])];
                          items[i] = { ...items[i], icon: e.target.value };
                          setSettings((prev) => ({ ...prev, features: { ...prev.features, items } }));
                        }}
                        placeholder="Icon name"
                        className={inputClass}
                      />
                      <button
                        onClick={() => {
                          const items = (settings.features?.items || []).filter((_, idx) => idx !== i);
                          setSettings((prev) => ({ ...prev, features: { ...prev.features, items } }));
                        }}
                        className="p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => handleSave("features", settings.features)}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-primary-color text-black font-bold rounded-xl transition-all hover:bg-primary-color/90 disabled:opacity-70"
            >
              {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Save Features
            </button>
          </div>
        </div>
      )}

      {activeTab === "about" && (
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>About Section</h2>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="about-enabled"
              checked={settings.about?.enabled ?? true}
              onChange={(e) => updateField("about", "enabled", e.target.checked)}
              className="w-4 h-4 accent-primary-color"
            />
            <label htmlFor="about-enabled" className="text-sm text-gray-300">Enable About Section</label>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                value={settings.about?.title || ""}
                onChange={(e) => updateField("about", "title", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                rows={4}
                value={settings.about?.description || ""}
                onChange={(e) => updateField("about", "description", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Image URL</label>
              <input
                type="url"
                value={settings.about?.imageUrl || ""}
                onChange={(e) => updateField("about", "imageUrl", e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              onClick={() => handleSave("about", settings.about)}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-primary-color text-black font-bold rounded-xl transition-all hover:bg-primary-color/90 disabled:opacity-70"
            >
              {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Save About
            </button>
          </div>
        </div>
      )}

      {activeTab === "footer" && (
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Footer Settings</h2>
          <div>
            <label className={labelClass}>Copyright Text</label>
            <input
              type="text"
              value={settings.footer?.copyright || ""}
              onChange={(e) => updateField("footer", "copyright", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              rows={3}
              value={settings.footer?.description || ""}
              onChange={(e) => updateField("footer", "description", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className={labelClass}>Social Links</label>
              <button
                onClick={() => {
                  const links = [...(settings.footer?.socialLinks || [])];
                  links.push({ platform: "", label: "", url: "#" });
                  setSettings((prev) => ({ ...prev, footer: { ...prev.footer, socialLinks: links } }));
                }}
                className="flex items-center gap-1 text-xs font-bold text-primary-color hover:underline"
              >
                <Plus size={14} /> Add Social Link
              </button>
            </div>
            <div className="space-y-3">
              {(settings.footer?.socialLinks || []).map((link, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#080808] p-3 rounded-xl border border-accent-content/5">
                  <input
                    type="text"
                    value={link.platform}
                    onChange={(e) => {
                      const links = [...(settings.footer?.socialLinks || [])];
                      links[i] = { ...links[i], platform: e.target.value, label: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) };
                      setSettings((prev) => ({ ...prev, footer: { ...prev.footer, socialLinks: links } }));
                    }}
                    placeholder="Platform (facebook)"
                    className={inputClass}
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => {
                      const links = [...(settings.footer?.socialLinks || [])];
                      links[i] = { ...links[i], url: e.target.value };
                      setSettings((prev) => ({ ...prev, footer: { ...prev.footer, socialLinks: links } }));
                    }}
                    placeholder="URL"
                    className={inputClass}
                  />
                  <button
                    onClick={() => {
                      const links = (settings.footer?.socialLinks || []).filter((_, idx) => idx !== i);
                      setSettings((prev) => ({ ...prev, footer: { ...prev.footer, socialLinks: links } }));
                    }}
                    className="p-3 text-red-400 hover:bg-red-500/10 rounded-xl"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Payment Methods (comma separated)</label>
            <input
              type="text"
              value={(settings.footer?.paymentMethods || []).join(", ")}
              onChange={(e) => updateField("footer", "paymentMethods", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
              className={inputClass}
              placeholder="bKash, Nagad, Visa, MasterCard, COD"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => handleSave("footer", settings.footer)}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-primary-color text-black font-bold rounded-xl transition-all hover:bg-primary-color/90 disabled:opacity-70"
            >
              {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Save Footer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
