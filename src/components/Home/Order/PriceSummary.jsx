export default function PriceSummary({ unitPrice, quantity, deliveryCharge, district }) {
  const subtotal = unitPrice * quantity;
  const total = subtotal + (district ? deliveryCharge : 0);

  return (
    <div className="border-t border-gray-800 pt-6 mt-6 space-y-4">
      <div className="flex justify-between text-gray-400">
        <span>Subtotal</span>
        <span>৳{subtotal}</span>
      </div>
      <div className="flex justify-between text-gray-400">
        <span>Delivery Fee</span>
        <span className={district ? "text-btn-color" : "text-gray-600"}>
          {district ? `৳${deliveryCharge}` : "—"}
        </span>
      </div>
      <div className="flex justify-between text-xl sm:text-2xl font-bold border-t border-gray-800 pt-4">
        <span>Total</span>
        <span className="text-primary-color">৳{total}</span>
      </div>
    </div>
  );
}
