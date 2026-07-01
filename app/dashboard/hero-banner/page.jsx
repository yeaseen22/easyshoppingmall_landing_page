"use client";

import {
  getHeroBanner,
  updateHeroBanner,
} from "@/features/home/actions/hero-banner";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function HeroBannerDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadBanner() {
      const banner = await getHeroBanner();
      if (banner) {
        setTitle(banner.title || "");
        setDescription(banner.description || "");
        setImageUrl(banner.imageUrl || "");
      }
      setIsLoading(false);
    }
    loadBanner();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const result = await updateHeroBanner(title, description, imageUrl);
    setIsSaving(false);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Hero banner updated successfully!",
        background: "#11151c",
        color: "#fff",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update hero banner.",
        background: "#11151c",
        color: "#fff",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center h-48 gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-color" />
        <p className="text-gray-400">Loading banner data...</p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color transition-all";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-[#11151c] rounded-2xl shadow-xl border border-accent-content/5 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-accent-content mb-8">
          Manage Hero Banner
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelClass}>Banner Title</label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={4}
              className={inputClass}
              placeholder="Enter hero banner title..."
              required
            />
          </div>

          <div>
            <label className={labelClass}>Banner Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="Experience the future of online shopping..."
              required
            />
          </div>

          <div>
            <label className={labelClass}>Banner Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={inputClass}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {imageUrl && (
            <div>
              <label className={labelClass}>Image Preview</label>
              <div className="relative w-full h-64 rounded-xl overflow-hidden border border-accent-content/10 mt-2 bg-black/50">
                <Image
                  src={imageUrl}
                  alt="Banner preview"
                  className="w-full h-full object-cover"
                  width={800}
                  height={400}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className={`px-6 py-3 bg-primary-color hover:bg-accent-content text-black font-bold rounded-xl transition-all shadow-lg ${isSaving ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"}`}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
