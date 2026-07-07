"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Swal from "sweetalert2";
import { addReview, updateReview } from "../actions/review";

const ReviewModal = ({ isOpen, onClose, editingReview, formData, setFormData }) => {
  const router = useRouter();
  const [isSubmitting, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(async () => {
      const result = editingReview ? await updateReview(editingReview, formData) : await addReview(formData);

      if (result.success) {
        router.refresh();
        onClose();
        Swal.fire({ title: "Success!", text: result.message, icon: "success", background: "var(--color-card)", color: "var(--color-foreground)", timer: 1500, showConfirmButton: false });
      } else {
        Swal.fire({ title: "Error!", text: result.message, icon: "error", background: "var(--color-card)", color: "var(--color-foreground)" });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Update Review Status</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-6 pt-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="approved"
                checked={formData.approved}
                onCheckedChange={(checked) => setFormData({ ...formData, approved: checked })}
              />
              <Label htmlFor="approved">Approved</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured">Featured</Label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Review"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
