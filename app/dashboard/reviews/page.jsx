export const dynamic = "force-dynamic";
import ReviewsComponent from "@/features/dashboard/components/reviews-component";
import { getReviews } from "@/features/reviews/actions/review";

const ReviewsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const result = await getReviews(false, page, 10);

  if (!result?.data) {
    return (
      <ReviewsComponent reviews={[]} currentPage={1} totalPages={1} total={0} />
    );
  }

  return (
    <ReviewsComponent
      reviews={result.data}
      currentPage={result.currentPage}
      totalPages={result.totalPages}
      total={result.total}
    />
  );
};

export default ReviewsPage;
