"use client";

import DataTable from "@/components/ui/data-table";
import Pagination from "@/components/ui/pagination";
import {
  addReview,
  deleteReview,
  updateReview,
} from "@/features/reviews/actions/review";
import { cn } from "@/utils/cn";
import { Edit, Star, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ReviewsComponent({
  reviews,
  currentPage,
  totalPages,
  total,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    approved: false,
    featured: false,
  });

  const router = useRouter();

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this review deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#11151c",
      color: "#fff",
    });

    if (confirm.isConfirmed) {
      const result = await deleteReview(id);
      if (result.success) {
        router.refresh();
        Swal.fire({
          title: "Deleted!",
          text: "Review has been deleted.",
          icon: "success",
          background: "#11151c",
          color: "#fff",
        });
      }
    }
  };

  const handleOpenModal = (review = null) => {
    if (review) {
      setEditingReview(review._id);
      setFormData({
        approved: review.approved || false,
        featured: review.featured || false,
      });
    } else {
      setEditingReview(null);
      setFormData({
        approved: false,
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let result;
    if (editingReview) {
      result = await updateReview(editingReview, formData);
    } else {
      result = await addReview(formData);
    }

    if (result.success) {
      router.refresh();
      handleCloseModal();
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
    setIsSubmitting(false);
  };

  const filteredReviews = reviews.filter(
    (r) =>
      (r.customerName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.comment || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const headers = [
    { label: "Customer" },
    { label: "Rating" },
    { label: "Review" },
    { label: "Approved" },
    { label: "Featured" },
    { label: "Actions", align: "right" },
  ];

  return (
    <div className="w-full flex-1 min-w-0 overflow-hidden space-y-5 px-3 sm:px-4 md:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-accent-content">
            Review <span className="text-primary-color">Management</span>
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Moderate customer reviews - approve, edit, or remove
          </p>
        </div>
      </div>

      <DataTable
        headers={headers}
        data={filteredReviews}
        search={searchTerm}
        onSearch={setSearchTerm}
        searchPlaceholder="Search reviews by name or content..."
        emptyMessage="No reviews found."
        renderRow={(review) => (
          <tr key={review._id} className="hover:bg-accent-content/5">
            <td className="px-6 py-4">
              <p className="text-sm text-accent-content font-semibold">
                {review.customerName}
              </p>
              <p className="text-xs text-gray-400">{review.customerEmail}</p>
            </td>
            <td className="px-6 py-4">
              <div className="flex text-[#d4af37]">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-300">
              <p className="line-clamp-2">{review.comment}</p>
            </td>
            <td className="px-6 py-4 text-xs">
              <span
                className={cn("px-2 py-1 rounded", {
                  "bg-green-500/10 text-green-500": review.approved,
                  "bg-red-500/10 text-red-500": !review.approved,
                })}
              >
                {review.approved ? "Approved" : "Pending"}
              </span>
            </td>
            <td className="px-6 py-4">
              {review.featured ? (
                <span className="bg-green-500/10 text-green-500 px-2 py-1 text-[10px] font-bold rounded uppercase">
                  Yes
                </span>
              ) : (
                <span className="bg-gray-500/10 text-gray-500 px-2 py-1 text-[10px] font-bold rounded uppercase">
                  No
                </span>
              )}
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleOpenModal(review)}
                  className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        )}
        renderMobileCard={(review) => (
          <div
            key={review._id}
            className="bg-[#11151c] border border-accent-content/5 rounded-xl p-4 space-y-2"
          >
            <div className="flex justify-between items-start text-accent-content">
              <div>
                <p className="font-semibold text-sm">{review.customerName}</p>
                <p className="text-[10px] text-gray-400">
                  {review.customerEmail}
                </p>
              </div>
              <div className="flex text-[#d4af37]">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-400 line-clamp-2 italic">
              `&quot;`{review.comment}`&quot;`
            </p>
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-[#d4af37]">
                {review.category || "General"}
              </span>
              {review.featured && (
                <span className="bg-primary-color/20 text-primary-color px-2 py-0.5 rounded">
                  Featured
                </span>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-accent-content/5">
              <button
                onClick={() => handleOpenModal(review)}
                className="p-2 bg-accent-content/5 rounded-lg hover:bg-accent-content/10 text-accent-content"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={() => handleDelete(review._id)}
                className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        )}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-[#11151c] border border-accent-content/10 rounded-2xl shadow-2xl my-8">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-accent-content/10">
              <h3 className="text-lg sm:text-xl font-bold text-accent-content">
                Update Review Status
              </h3>
              <button
                onClick={handleCloseModal}
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
                  onClick={handleCloseModal}
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
      )}
    </div>
  );
}
