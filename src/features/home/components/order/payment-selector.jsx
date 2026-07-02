const methods = [
  { id: "cod", label: "Cash on Delivery", sub: "পণ্য হাতে পেয়ে টাকা দিন" },
  { id: "bkash", label: "bKash Payment", sub: "01626420774 (Send Money)" },
  { id: "nagad", label: "Nagad Payment", sub: "01626420774 (Send Money)" },
];

export default function PaymentSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-3 mb-8">
      {methods.map((method) => (
        <label key={method.id} className={`flex items-center justify-between p-4 py-2 sm:py-4 rounded-xl border cursor-pointer transition-all ${
          value === method.id ? "border-primary-color bg-primary-color/10" : "border-gray-800 bg-[#0a0c12]"
        }`}>
          <div className="flex items-center gap-3">
            <input type="radio" name="payment" value={method.id} checked={value === method.id} onChange={(e) => onChange(e.target.value)} className="accent-primary-color w-4 h-4" />
            <div>
              <p className="font-bold text-sm">{method.label}</p>
              <p className="text-[10px] text-gray-500">{method.sub}</p>
            </div>
          </div>
        </label>
      ))}
    </div>
  );
}
