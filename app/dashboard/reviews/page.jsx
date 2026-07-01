export const dynamic = 'force-dynamic';
import ReviewsComponent from '@/features/dashboard/components/reviews-component';
import { getReviews } from '@/features/reviews/actions/review';

const ReviewsPage = async () => {
    const data = await getReviews();
    const reviews = data?.map((review) => ({
        ...review,
        _id: review._id.toString(),
    }));
    return <ReviewsComponent reviews={reviews} />;
}

export default ReviewsPage;
