export default function ProductSelector({ products, selectedProductId, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase text-gray-500">Select Product</label>
      <select
        value={selectedProductId || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-3 focus:border-primary-color outline-none"
      >
        <option disabled value="">Select a product</option>
        {products?.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name} {p.stock === 0 ? "(Out of stock)" : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
