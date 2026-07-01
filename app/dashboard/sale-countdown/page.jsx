"use client";

import { useState, useEffect } from "react";
import { getSaleCountDown, updateSaleCountDown } from "@/action/saleCountDown";
import { isPast, parseISO } from "date-fns";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";

export default function SaleCountdownDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dateError, setDateError] = useState("");

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

  const validateDate = (value) => {
    setTargetDate(value);
    setDateError("");
    if (!value) {
      setDateError("Target date is required.");
      return;
    }
    try {
      const parsed = parseISO(value);
      if (isNaN(parsed.getTime())) {
        setDateError("Invalid date format.");
        return;
      }
      if (isPast(parsed)) {
        setDateError("Target date must be in the future. Please select a future date and time.");
      }
    } catch {
      setDateError("Invalid date.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!targetDate) {
      setDateError("Target date is required.");
      return;
    }

    const parsed = parseISO(targetDate);
    if (isNaN(parsed.getTime())) {
      setDateError("Invalid date format.");
      return;
    }

    if (isPast(parsed)) {
      setDateError("Target date must be in the future.");
      return;
    }

    setIsSaving(true);
    const isoTargetDate = new Date(targetDate).toISOString();
    const result = await updateSaleCountDown(title, description, isoTargetDate);
    setIsSaving(false);

    Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Success" : "Error",
      text: result.message,
      background: "#11151c",
      color: "#fff",
    });
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
        <h1 className="text-2xl font-bold text-accent-content mb-2">Manage Sale Countdown</h1>
        <p className="text-gray-400 text-sm mb-8">Configure the sale banner countdown timer on the landing page</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelClass}>Section Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="Limited Time Offer - Up to 40% Off!"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Section Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="Don&apos;t miss out on this exclusive offer..."
              required
            />
          </div>

          <div>
            <label className={labelClass}>Target End Date/Time (Countdown Deadline)</label>
            <input
              type="datetime-local"
              value={targetDate}
              onChange={(e) => validateDate(e.target.value)}
              className={`${inputClass} ${dateError ? "ring-2 ring-red-500" : ""} scheme-dark`}
              required
            />
            {dateError && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                <span>⚠</span> {dateError}
              </p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving || !!dateError}
              className={`flex items-center gap-2 px-6 py-3 bg-primary-color hover:bg-accent-content text-black font-bold rounded-xl transition-all shadow-lg ${
                isSaving || dateError ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"
              }`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
