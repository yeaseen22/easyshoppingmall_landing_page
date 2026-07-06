export const dynamic = "force-dynamic";
import { getHeroBanner } from "@/features/home/actions/hero-banner";
import Footer from "@/features/home/components/footer";
import Hero from "@/features/home/components/hero";
import Navbar from "@/features/home/components/navbar";
import OrderForm from "@/features/orders/components/order-form";
import { getProducts } from "@/features/products/actions/product";
import FeaturedProducts from "@/features/products/components/featured-products";
import { getReviews } from "@/features/reviews/actions/review";
import Testimonial from "@/features/reviews/components/testimonials";
import { getSaleCountDown } from "@/features/sale-countdown/actions/sale-countdown";
import SaleCountDown from "@/features/sale-countdown/components/sale-countdown";
import { getSiteSettings } from "@/features/site-settings/actions/site-settings";

const Home = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search || "";
  const [productResult, settings, saleCountdown, banner, reviews] =
    await Promise.all([
      getProducts(page, 10, search),
      getSiteSettings(),
      getSaleCountDown(),
      getHeroBanner(),
      getReviews("approved"),
    ]);

  const allProducts = Array.isArray(productResult)
    ? productResult
    : productResult?.data || [];
  const productPagination =
    !Array.isArray(productResult) && productResult?.data
      ? {
          currentPage: productResult.currentPage,
          totalPages: productResult.totalPages,
          total: productResult.total,
        }
      : { currentPage: 1, totalPages: 1, total: allProducts.length };

  return (
    <>
      <Navbar settings={settings} />
      <Hero banner={banner} />
      <SaleCountDown saleCountdown={saleCountdown} />
      <FeaturedProducts products={allProducts} pagination={productPagination} />
      <OrderForm products={allProducts} settings={settings} />
      <Testimonial reviews={reviews} />
      <Footer settings={settings} />
    </>
  );
};

export default Home;
