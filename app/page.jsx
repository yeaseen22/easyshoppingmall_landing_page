export const dynamic = "force-dynamic";
import { getSiteSettings } from "@/features/home/actions/site-settings";
import FeaturedProducts from "@/features/home/components/featured-products/featured-products";
import Footer from "@/features/home/components/footer/footer";
import Hero from "@/features/home/components/hero/hero";
import Navbar from "@/features/home/components/navbar/navbar";
import OrderForm from "@/features/home/components/order/order-form";
import Testimonial from "@/features/home/components/review/testimonials";
import SaleCountDown from "@/features/home/components/sale-countdown/sale-countdown";
import { getProducts } from "@/features/products/actions/product";

const Home = async () => {
  const [products, settings] = await Promise.all([
    getProducts(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Navbar settings={settings} />
      <Hero />
      <SaleCountDown />
      <FeaturedProducts />
      <OrderForm products={products} settings={settings} />
      <Testimonial />
      <Footer settings={settings} />
    </>
  );
};

export default Home;
