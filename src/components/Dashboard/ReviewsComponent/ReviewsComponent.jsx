"use client";
import { useState } from 'react';
import { Search, Edit, Trash2, X, Plus, Star } from 'lucide-react';
import { addReview, updateReview, deleteReview } from '@/action/review';
import DataTable from '@/components/Shared/DataTable';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function ReviewsComponent({ reviews }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        rating: 5,
        category: "",
        review: "",
        featured: false
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
                name: review.name,
                location: review.location,
                rating: review.rating,
                category: review.category || "",
                review: review.review,
                featured: review.featured || false
            });
        } else {
            setEditingReview(null);
            setFormData({ name: "", location: "", rating: 5, category: "", review: "", featured: false });
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
                showConfirmButton: false
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

    const filteredReviews = reviews.filter(r =>
        (r.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.review || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const headers = [
        { label: "Reviewer" },
        { label: "Rating" },
        { label: "Review Content" },
        { label: "Category" },
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
                        Manage customer reviews displayed on the landing page
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-[#d4af37] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#b5952f] transition-colors text-sm"
                >
                    <Plus size={16} /> Add Review
                </button>
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
                            <p className="text-sm text-accent-content font-semibold">{review.name}</p>
                            <p className="text-xs text-gray-400">{review.location}</p>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex text-[#d4af37]">
                                {[...Array(review.rating || 5)].map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" />
                                ))}
                            </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                            <p className="line-clamp-2">{review.review}</p>
                        </td>
                        <td className="px-6 py-4 text-xs">
                            <span className="bg-accent-content/5 text-gray-300 px-2 py-1 rounded">
                                {review.category || "General"}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            {review.featured ? (
                                <span className="bg-green-500/10 text-green-500 px-2 py-1 text-[10px] font-bold rounded uppercase">Yes</span>
                            ) : (
                                <span className="bg-gray-500/10 text-gray-500 px-2 py-1 text-[10px] font-bold rounded uppercase">No</span>
                            )}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                                <button onClick={() => handleOpenModal(review)} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20"><Edit size={16} /></button>
                                <button onClick={() => handleDelete(review._id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"><Trash2 size={16} /></button>
                            </div>
                        </td>
                    </tr>
                )}
                renderMobileCard={(review) => (
                    <div key={review._id} className="bg-[#11151c] border border-accent-content/5 rounded-xl p-4 space-y-2">
                        <div className="flex justify-between items-start text-accent-content">
                            <div>
                                <p className="font-semibold text-sm">{review.name}</p>
                                <p className="text-[10px] text-gray-400">{review.location}</p>
                            </div>
                            <div className="flex text-[#d4af37]">
                                {[...Array(review.rating || 5)].map((_, i) => (
                                    <Star key={i} size={12} fill="currentColor" />
                                ))}
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-2 italic">"{review.review}"</p>
                        <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-[#d4af37]">{review.category || "General"}</span>
                            {review.featured && <span className="bg-primary-color/20 text-primary-color px-2 py-0.5 rounded">Featured</span>}
                        </div>
                        <div className="flex justify-end gap-2 pt-2 border-t border-accent-content/5">
                            <button onClick={() => handleOpenModal(review)} className="p-2 bg-accent-content/5 rounded-lg hover:bg-accent-content/10 text-accent-content"><Edit size={14} /></button>
                            <button onClick={() => handleDelete(review._id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"><Trash2 size={14} /></button>
                        </div>
                    </div>
                )}
            />

            {isModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
                    <div className="w-full max-w-lg bg-[#11151c] border border-accent-content/10 rounded-2xl shadow-2xl my-8">
                        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-accent-content/10">
                            <h3 className="text-lg sm:text-xl font-bold text-accent-content">
                                {editingReview ? "Edit Review" : "Add New Review"}
                            </h3>
                            <button onClick={handleCloseModal} className="p-2 text-gray-400 hover:text-accent-content bg-accent-content/5 rounded-full transition-colors"><X size={18} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Customer Name *</label>
                                    <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-[#080808] border border-accent-content/10 rounded-lg px-3 py-2 text-sm text-accent-content outline-none focus:border-[#d4af37]/50"
                                        placeholder="e.g. Rahim Ahmed" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Location</label>
                                    <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full bg-[#080808] border border-accent-content/10 rounded-lg px-3 py-2 text-sm text-accent-content outline-none focus:border-[#d4af37]/50"
                                        placeholder="e.g. Dhaka, BD" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Rating (1-5) *</label>
                                    <input required type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                        className="w-full bg-[#080808] border border-accent-content/10 rounded-lg px-3 py-2 text-sm text-accent-content outline-none focus:border-[#d4af37]/50" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Category</label>
                                    <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-[#080808] border border-accent-content/10 rounded-lg px-3 py-2 text-sm text-accent-content outline-none focus:border-[#d4af37]/50"
                                        placeholder="e.g. Fashion, Electronics" />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Review Content *</label>
                                <textarea required rows="4" value={formData.review} onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                                    className="w-full bg-[#080808] border border-accent-content/10 rounded-lg px-3 py-2 text-sm text-accent-content outline-none focus:border-[#d4af37]/50 resize-none"
                                    placeholder="Write the customer's review here..."></textarea>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input type="checkbox" id="featured" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-4 h-4 rounded bg-[#080808] border-accent-content/10 accent-[#d4af37]" />
                                <label htmlFor="featured" className="text-sm text-gray-300">Mark as Featured</label>
                            </div>

                            <div className="pt-4 border-t border-accent-content/10 flex justify-end gap-3">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-accent-content transition-colors">Cancel</button>
                                <button type="submit" disabled={isSubmitting}
                                    className={`px-6 py-2 bg-[#d4af37] text-black text-sm font-bold rounded-lg transition-colors ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[#b5952f]"}`}>
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
