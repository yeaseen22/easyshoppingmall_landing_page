export const dynamic = "force-dynamic";
import { getSiteSettings } from "@/features/home/actions/site-settings";
import FeaturedProducts from "@/features/home/components/featured-products/featured-products";
import Footer from "@/features/home/components/footer/footer";
import Hero from "@/features/home/components/hero/hero";
import Navbar from "@/features/home/components/navbar/navbar";
import OrderForm from "@/features/home/components/order/order-form";
import SaleCountDown from "@/features/home/components/sale-countdown/sale-countdown";
import { getProducts } from "@/features/products/actions/product";
import Testimonial from "@/features/reviews/components/testimonials";

const Home = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const [productResult, settings] = await Promise.all([
    getProducts(page),
    getSiteSettings(),
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
      <Hero />
      <SaleCountDown />
      <FeaturedProducts products={allProducts} pagination={productPagination} />
      <OrderForm products={allProducts} settings={settings} />
      <Testimonial />
      <Footer settings={settings} />
    </>
  );
};

export default Home;
