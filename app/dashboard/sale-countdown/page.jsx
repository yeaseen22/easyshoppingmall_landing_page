"use client";

import { useState, useEffect } from "react";
import { getSaleCountDown, updateSaleCountDown } from "@/action/saleCountDown";
import Swal from "sweetalert2";

export default function SaleCountdownDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await getSaleCountDown();
      if (data) {
        setTitle(data.title || "");
        setDescription(data.description || "");
        if (data.targetDate) {
          setTargetDate(new Date(data.targetDate).toISOString().slice(0, 16));
        }
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const isoTargetDate = new Date(targetDate).toISOString();
    const result = await updateSaleCountDown(title, description, isoTargetDate);
    setIsSaving(false);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Sale Countdown updated successfully!",
        background: "#11151c",
        color: "#fff",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update sale countdown.",
        background: "#11151c",
        color: "#fff",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center h-48 gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-color" />
        <p className="text-gray-400">Loading configuration...</p>
      </div>
    );
  }

  const inputClass = "w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color transition-all";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-[#11151c] rounded-2xl shadow-xl border border-accent-content/5 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-accent-content mb-8">Manage Sale Countdown</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelClass}>Section Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="Limited Time Offer - Up to 40% Off!" required />
          </div>

          <div>
            <label className={labelClass}>Section Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={inputClass} placeholder="Don't miss out on this exclusive offer..." required />
          </div>

          <div>
            <label className={labelClass}>Target End Date/Time (Countdown Deadline)</label>
            <input type="datetime-local" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className={inputClass + " scheme-dark"} required />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className={`px-6 py-3 bg-primary-color hover:bg-accent-content text-black font-bold rounded-xl transition-all shadow-lg ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
