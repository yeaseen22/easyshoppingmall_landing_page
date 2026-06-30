export const dynamic = 'force-dynamic';
import FeaturedProducts from "../src/components/Home/FeaturedProducts/FeaturedProducts"
import OrderForm from "../src/components/Home/Order/OrderForm"
import Testimonial from "../src/components/Home/testimonial/testimonial"
import Footer from "../src/components/Home/footer/footer"
import Navbar from "../src/components/Home/Navbar/Navbar"
import Hero from "@/components/Home/Hero/Hero"
import SaleCountDown from "../src/components/Home/SaleCountDown/SaleCountDown"
import { getProducts } from "@/action/product"

const Home = async () => {
  const productsFromDb = await getProducts();
  const products = productsFromDb?.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));
  
  return (
    <div>
      <Navbar />
      <Hero />
      <SaleCountDown />
      <FeaturedProducts />
      <OrderForm products={products} />
      <Testimonial />
      <Footer />
    </div>
  )
}

export default Home
