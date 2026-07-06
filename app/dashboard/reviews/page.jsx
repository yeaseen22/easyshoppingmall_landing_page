export const dynamic = "force-dynamic";
import ReviewsComponent from "@/features/reviews/components/reviews-component";
import { getReviews } from "@/features/reviews/actions/review";

const ReviewsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search || "";
  const result = await getReviews(false, page, 10, search);

  if (!result?.data) {
    return (
      <ReviewsComponent reviews={[]} currentPage={1} totalPages={1} />
    );
  }

  return (
    <ReviewsComponent
      reviews={result.data}
      currentPage={result.currentPage}
      totalPages={result.totalPages}
    />
  );
};

export default ReviewsPage;
