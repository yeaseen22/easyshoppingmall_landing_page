export const dynamic = "force-dynamic";
import { getSiteSettings } from "@/features/home/actions/site-settings";
import Footer from "@/features/home/components/footer";
import Hero from "@/features/home/components/hero";
import Navbar from "@/features/home/components/navbar";
import SaleCountDown from "@/features/sale-countdown/components/sale-countdown";
import OrderForm from "@/features/orders/components/order-form";
import { getProducts } from "@/features/products/actions/product";
import FeaturedProducts from "@/features/products/components/featured-products";
import Testimonial from "@/features/reviews/components/testimonials";

const Home = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search || "";
  const [productResult, settings] = await Promise.all([
    getProducts(page, 10, search),
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
