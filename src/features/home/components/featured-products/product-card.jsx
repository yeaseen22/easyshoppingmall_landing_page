import { ProductStatus } from "@/features/products/validations/product-schema";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const hasDiscount = product.discount > 0;
  const displayPrice = hasDiscount ? product.discountedPrice : product.price;

  return (
    <div className="group bg-[#11151c] border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:border-primary-color/40 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1 flex flex-col">
      <div className="relative flex-1 flex flex-col">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {hasDiscount && (
            <div className="bg-red-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-xl shadow-lg backdrop-blur-md">
              -{product.discount}%
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {product.productStatus?.includes(ProductStatus.HOT) && (
            <div className="bg-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-xl shadow-lg backdrop-blur-md tracking-wider">
              HOT
            </div>
          )}
          {product.productStatus?.includes(ProductStatus.COLD) && (
            <div className="bg-sky-500 text-white text-[10px] font-black px-2.5 py-1 rounded-xl shadow-lg backdrop-blur-md tracking-wider">
              COLD
            </div>
          )}
        </div>

        {/* Image Container */}
        <div className="relative aspect-3/2 w-full h-28 sm:h-32 md:h-40 overflow-hidden bg-[#0a0c12]">
          <Image
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            width={500}
            height={500}
            priority={false}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-[#11151c] via-[#11151c]/60 to-transparent" />

          {/* Stock Indicator Overlay */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute bottom-4 left-4 bg-yellow-500/90 text-black text-[10px] font-bold px-2.5 py-0.5 rounded-xl">
              Only {product.stock} left
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-primary-color transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="text-gray-400 text-xs line-clamp-2 mt-1.5 leading-relaxed">
              {product.description}
            </p>
          </div>
          {/* Pricing */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tighter">
              ৳{displayPrice}
            </span>

            {hasDiscount && (
              <span className="text-gray-500 line-through text-sm">
                ৳{product.price}
              </span>
            )}
          </div>
          {/* Sizes */}
          {product.productSizes?.length > 0 && (
            <div>
              <p className="text-[10px] text-gray-500 mb-1">SIZES</p>
              <div className="flex flex-wrap gap-1">
                {product.productSizes.map((size) => (
                  <span
                    key={size}
                    className="text-[10px] font-medium px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* Colors */}
          {product.productColors?.length > 0 && (
            <div>
              <p className="text-[10px] text-gray-500 mb-1">COLORS</p>
              <div className="flex gap-1.5">
                {product.productColors.slice(0, 5).map((color, index) => (
                  <div
                    key={`${color}-${index}`}
                    className="w-5 h-5 rounded-xl border border-[#11151c] shadow-sm ring-1 ring-white/20"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {product.productColors.length > 5 && (
                  <div className="w-5 h-5 rounded-xl bg-white/10 flex items-center justify-center text-[9px] font-bold text-gray-400">
                    +{product.productColors.length - 5}
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Stock Status */}
          <div className="pt-1">
            {product.stock > 0 ? (
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                {product.stock} in stock
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-red-400 text-xs font-medium">
                <span>✕</span>
                Out of stock
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Button - Smaller */}
      <div className="flex justify-center p-5 pt-0">
        <Link
          href={`/?productId=${product._id}#order`}
          className="mt-auto w-full bg-primary-color/80 hover:bg-primary-color active:bg-primary-color text-neutral-800 py-2 text-sm rounded-2xl text-center transition-all duration-200 active:scale-[0.985] shadow-lg shadow-black/30 uppercase font-bold"
        >
          Order Now
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
