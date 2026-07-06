"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Swal from "sweetalert2";
import { addReview, updateReview } from "../actions/review";

const ReviewModal = ({
  isOpen,
  onClose,
  editingReview,
  formData,
  setFormData,
}) => {
  const router = useRouter();
  const [isSubmitting, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    startTransition(async () => {
      let result;

      if (editingReview) {
        result = await updateReview(editingReview, formData);
      } else {
        result = await addReview(formData);
      }

      if (result.success) {
        router.refresh();
        onClose();

        Swal.fire({
          title: "Success!",
          text: result.message,
          icon: "success",
          background: "#11151c",
          color: "#fff",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: result.message,
          icon: "error",
          background: "#11151c",
          color: "#fff",
        });
      }
    });
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-lg bg-[#11151c] border border-accent-content/10 rounded-2xl shadow-2xl my-8">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-accent-content/10">
          <h3 className="text-lg sm:text-xl font-bold text-accent-content">
            Update Review Status
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-accent-content bg-accent-content/5 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div className="flex gap-6 pt-2">
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.approved}
                onChange={(e) =>
                  setFormData({ ...formData, approved: e.target.checked })
                }
                className="w-4 h-4 rounded accent-[#d4af37]"
              />
              Approved
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-4 h-4 rounded accent-[#d4af37]"
              />
              Featured
            </label>
          </div>

          <div className="pt-4 border-t border-accent-content/10 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-accent-content transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-[#d4af37] text-black text-sm font-bold rounded-lg transition-colors ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[#b5952f]"}`}
            >
              {isSubmitting ? "Saving..." : "Save Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
