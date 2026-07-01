import AuthProvider from "@/components/provider/auth-provider";
import { getProducts } from "@/features/products/actions/product";
import { ProductStoreProvider } from "@/features/products/store/product-store-provider";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700"],
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});
export const metadata = {
  title: {
    default: "EasyShoppingMallBD - Best Online Shopping in Bangladesh",
    template: "%s | EasyShoppingMallBD",
  },
  description:
    "EasyShoppingMallBD is your premier destination for online shopping in Bangladesh. Find the best products at unbeatable prices with fast delivery.",
  keywords: [
    "e-commerce",
    "online shopping",
    "bangladesh e-commerce",
    "fashion",
    "EasyShoppingMallBD",
    "easy shopping mall ",
    "shopping mall",
    "Online Shopping",
  ],
  authors: [{ name: "EasyShoppingMallBD Team" }],
  creator: "EasyShoppingMallBD",
  publisher: "EasyShoppingMallBD",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://easyshoppingmallbd.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EasyShoppingMallBD - Best Online Shopping in Bangladesh",
    description:
      "Shop the latest electronics, fashion, and home goods at EasyShoppingMallBD. quality products, competitive prices, and fast shipping.",
    url: "https://easyshoppingmallbd.com",
    siteName: "EasyShoppingMallBD",
    images: [
      {
        url: "/icon.png",
        width: 800,
        height: 600,
        alt: "EasyShoppingMallBD Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyShoppingMallBD - Best Online Shopping in Bangladesh",
    description:
      "Your one-stop shop for everything you need. Quality products and fast delivery across Bangladesh.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({ children }) {
  const products = await getProducts();

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${roboto.variable} antialiased scroll-smooth`}
      >
        <AuthProvider>
          <ProductStoreProvider products={products}>
            {children}
          </ProductStoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
