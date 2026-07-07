"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/components/ui/data-table";
import Pagination from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deleteReview } from "@/features/reviews/actions/review";
import { format } from "date-fns";
import { PencilIcon, Star, Trash2Icon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useState, useTransition } from "react";
import Swal from "sweetalert2";
import ReviewModal from "./review-modal";

export default function ReviewsComponent({
  reviews = [],
  isLoading,
  tabs = [],
  activeStatus = "all",
  currentPage,
  totalPages,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [dataLoading, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(activeStatus);
  const [editingReview, setEditingReview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    approved: false,
    featured: false,
  });

  const handleEdit = (review) => {
    setFormData({
      approved: review.approved || false,
      featured: review.featured || false,
    });
    setEditingReview(review);
    setModalOpen(true);
  };

  const handleTabChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") params.set("status", value);
    else params.delete("status");

    params.delete("page");

    startTransition(() => {
      setOptimisticStatus(value);
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this review deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "var(--color-card)",
      color: "var(--color-foreground)",
    });
    if (confirm.isConfirmed) {
      const result = await deleteReview(id);
      if (result.success) router.refresh();
    }
  };

  const columns = [
    {
      header: "Name",
      accessor: "customerName",
      className: "text-sm text-foreground",
      cell: (val) => (
        <div className="flex items-center gap-2">
          <div className="bg-primary/15 text-primary size-8 rounded-full flex items-center justify-center text-sm font-bold">
            {val.slice(0, 2).toUpperCase()}
          </div>
          <span className="font-bold truncate max-w-30">{val}</span>
        </div>
      ),
    },
    {
      header: "Email",
      accessor: "customerEmail",
      className: "text-sm text-muted-foreground truncate max-w-40",
    },
    {
      header: "Rating",
      accessor: "rating",
      cell: (val) => (
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={14}
              className={s <= val ? "text-primary" : "text-muted"}
              fill={s <= val ? "currentColor" : "none"}
            />
          ))}
        </div>
      ),
    },
    {
      header: "Approved",
      accessor: "approved",
      cell: (val) => (
        <Checkbox
          checked={val}
          disabled
          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
      ),
    },
    {
      header: "Featured",
      accessor: "featured",
      cell: (val) => (
        <Checkbox
          checked={val}
          disabled
          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
      ),
    },
    {
      header: "Date",
      accessor: "createdAt",
      className: "text-sm text-muted-foreground",
      cell: (val) => format(new Date(val), "MMM dd, yyyy"),
    },
    {
      header: "Comment",
      accessor: "comment",
      mobileHidden: true,
      className: "text-sm text-muted-foreground max-w-50",
      cell: (val) => <span className="truncate block">{val}</span>,
    },
    {
      header: "Actions",
      accessor: "_id",
      mobileHidden: true,
      cell: (_val, row) => (
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" size="icon" onClick={() => handleEdit(row)}>
            <PencilIcon size={14} />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => handleDelete(row._id)}
          >
            <Trash2Icon size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <section className="bg-card border border-border p-4 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">Manage Reviews</h2>
          <p className="text-xs text-muted-foreground">
            Approve or feature customer reviews
          </p>
        </div>
      </div>

      {tabs.length > 0 && (
        <>
          <div className="sm:hidden mb-4">
            <Select value={optimisticStatus} onValueChange={handleTabChange}>
              <SelectTrigger className="w-full bg-card border border-border px-4 py-2 h-auto text-sm font-bold text-foreground">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border">
                {tabs.map((tab) => (
                  <SelectItem
                    key={tab.value}
                    value={tab.value}
                    className="text-sm font-bold text-foreground data-[state=checked]:text-primary"
                  >
                    {tab.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="hidden sm:block mb-4">
            <Tabs value={optimisticStatus} onValueChange={handleTabChange}>
              <TabsList className="bg-card border border-border p-1.5 h-auto gap-0">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="px-4 py-2 text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm text-muted-foreground"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </>
      )}

      <DataTable
        columns={columns}
        data={reviews || []}
        isLoading={dataLoading || isLoading}
        emptyMessage="No reviews yet."
        renderMobileCard={(review) => (
          <div
            key={review._id}
            className="bg-card border border-border p-4 space-y-2"
          >
            <div className="flex items-center gap-2">
              <div className="bg-primary/15 text-primary size-8 rounded-full flex items-center justify-center text-sm font-bold">
                {review.customerName.slice(0, 2).toUpperCase()}
              </div>
              <p className="text-foreground font-bold text-sm truncate">
                {review.customerName}
              </p>
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={12}
                  className={s <= review.rating ? "text-primary" : "text-muted"}
                  fill={s <= review.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <p className="text-muted-foreground text-xs line-clamp-2">
              {review.comment}
            </p>
            <div className="flex items-center gap-3">
              <Checkbox
                checked={review.approved}
                disabled
                className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <span className="text-xs text-muted-foreground">Approved</span>
              <Checkbox
                checked={review.featured}
                disabled
                className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <span className="text-xs text-muted-foreground">Featured</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {format(new Date(review.createdAt), "MMM dd, yyyy")}
            </p>
            <div className="flex gap-2 justify-end pt-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(review)}
              >
                <PencilIcon size={14} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => handleDelete(review._id)}
              >
                <Trash2Icon size={14} />
              </Button>
            </div>
          </div>
        )}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading || dataLoading}
        startTransition={startTransition}
      />

      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editingReview={editingReview}
        formData={formData}
        setFormData={setFormData}
      />
    </section>
  );
}
