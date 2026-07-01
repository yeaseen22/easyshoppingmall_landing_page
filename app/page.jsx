export const dynamic = 'force-dynamic';
import FeaturedProducts from "../src/components/Home/FeaturedProducts/FeaturedProducts";
import OrderForm from "../src/components/Home/Order/OrderForm";
import Testimonial from "../src/components/Home/testimonial/testimonial";
import Footer from "../src/components/Home/footer/footer";
import Navbar from "../src/components/Home/Navbar/Navbar";
import Hero from "@/components/Home/Hero/Hero";
import SaleCountDown from "../src/components/Home/SaleCountDown/SaleCountDown";
import Features from "@/components/Home/Features/Features";
import About from "@/components/Home/About/About";
import { getProducts } from "@/action/product";
import { getSiteSettings } from "@/action/site-settings";

const Home = async () => {
  const [productsFromDb, settings] = await Promise.all([
    getProducts(),
    getSiteSettings(),
  ]);
  const products = productsFromDb?.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));

  return (
    <div>
      <Navbar />
      <Hero />
      {settings.features?.enabled !== false && <Features features={settings.features} />}
      <SaleCountDown />
      <FeaturedProducts />
      {settings.about?.enabled !== false && <About about={settings.about} />}
      <OrderForm products={products} />
      <Testimonial />
      <Footer settings={settings} />
    </div>
  );
};

export default Home;
