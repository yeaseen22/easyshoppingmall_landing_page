export const dynamic = "force-dynamic";
import ReviewsComponent from "@/features/reviews/components/reviews-component";
import { getReviews } from "@/features/reviews/actions/review";

const reviewTabs = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Featured", value: "featured" },
];

const ReviewsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const status = params?.status || "all";
  const search = params?.search || "";
  const result = await getReviews({ status, page, limit: 10, search });

  if (!result?.data) {
    return (
      <ReviewsComponent
        reviews={[]}
        currentPage={1}
        totalPages={1}
        activeStatus={status}
        tabs={reviewTabs}
      />
    );
  }

  return (
    <ReviewsComponent
      reviews={result.data}
      currentPage={result.currentPage}
      totalPages={result.totalPages}
      activeStatus={status}
      tabs={reviewTabs}
    />
  );
};

export default ReviewsPage;
