"use client";

import DataTable from "@/components/ui/data-table";
import Pagination from "@/components/ui/pagination";
import { deleteReview } from "@/features/reviews/actions/review";
import ReviewModal from "@/features/reviews/components/review-modal";
import { cn } from "@/utils/cn";
import { Edit, Star, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Swal from "sweetalert2";

export default function ReviewsComponent({ reviews, currentPage, totalPages }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [isLoading, startTransition] = useTransition();
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

  const filteredReviews = reviews.filter(
    (r) =>
      (r.customerName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.comment || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const reviewColumns = [
    {
      header: "Customer",
      accessor: "customerName",
      cell: (val, row) => (
        <>
          <p className="text-sm text-accent-content font-semibold">{val}</p>
          <p className="text-xs text-gray-400">{row.customerEmail}</p>
        </>
      ),
    },
    {
      header: "Rating",
      accessor: "rating",
      cell: (val) => (
        <div className="flex text-[#d4af37]">
          {[...Array(val || 5)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" />
          ))}
        </div>
      ),
    },
    {
      header: "Review",
      accessor: "comment",
      className: "text-sm text-gray-300",
      cell: (val) => <p className="line-clamp-2">{val}</p>,
    },
    {
      header: "Approved",
      accessor: "approved",
      cell: (val) => (
        <span
          className={cn("px-2 py-1 rounded text-xs", {
            "bg-green-500/10 text-green-500": val,
            "bg-red-500/10 text-red-500": !val,
          })}
        >
          {val ? "Approved" : "Pending"}
        </span>
      ),
    },
    {
      header: "Featured",
      accessor: "featured",
      cell: (val) =>
        val ? (
          <span className="bg-green-500/10 text-green-500 px-2 py-1 text-[10px] font-bold rounded uppercase">
            Yes
          </span>
        ) : (
          <span className="bg-gray-500/10 text-gray-500 px-2 py-1 text-[10px] font-bold rounded uppercase">
            No
          </span>
        ),
    },
    {
      header: "Actions",
      accessor: "_id",
      className: "text-right",
      cell: (val, row) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleOpenModal(row)}
            className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full flex-1 min-w-0 overflow-hidden space-y-5 px-3 sm:px-4 md:px-6">
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
        columns={reviewColumns}
        data={filteredReviews}
        search={searchTerm}
        onSearch={setSearchTerm}
        searchPlaceholder="Search reviews by name or content..."
        emptyMessage="No reviews found."
        isLoading={isLoading}
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
        startTransition={startTransition}
        isLoading={isLoading}
      />

      <ReviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingReview={editingReview}
        formData={formData}
        setFormData={setFormData}
      />
    </section>
  );
}
