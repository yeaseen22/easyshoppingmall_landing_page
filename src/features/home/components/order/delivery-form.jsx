export default function DeliveryForm({ customer, onChange, errors }) {
  const inputClass =
    "w-full mt-2 bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-4 focus:border-primary-color outline-none text-sm";

  return (
    <div className="bg-[#11151c] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
      <h3 className="text-xl font-semibold mb-6">Delivery Details</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="text-xs font-bold uppercase text-accent-content">
            Full Name
            <input type="text" name="customerName" value={customer.customerName} onChange={onChange} placeholder="Full Name" className={inputClass} />
            {errors.customerName && <p className="text-red-400 text-[10px] mt-1">{errors.customerName}</p>}
          </label>
          <label className="text-xs font-bold uppercase text-accent-content">
            Phone Number
            <input type="tel" name="phone" value={customer.phone} onChange={onChange} placeholder="Phone Number" className={inputClass} />
            {errors.phone && <p className="text-red-400 text-[10px] mt-1">{errors.phone}</p>}
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="text-xs font-bold uppercase text-accent-content">
            Zilla
            <input type="text" name="zilla" value={customer.zilla} onChange={onChange} placeholder="Zilla (e.g. Dhaka)" className={inputClass} />
            {errors.zilla && <p className="text-red-400 text-[10px] mt-1">{errors.zilla}</p>}
          </label>
          <label className="text-xs font-bold uppercase text-accent-content">
            Thana
            <input type="text" name="thana" value={customer.thana} onChange={onChange} placeholder="Thana (e.g. Mirpur)" className={inputClass} />
            {errors.thana && <p className="text-red-400 text-[10px] mt-1">{errors.thana}</p>}
          </label>
        </div>
        <label className="text-xs font-bold uppercase text-accent-content block">
          Email
          <input type="email" name="email" value={customer.email} onChange={onChange} placeholder="Email" className={inputClass} />
          {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
        </label>
        <label className="text-xs font-bold uppercase text-accent-content block">
          Full Address (Area, Thana, House No)
          <textarea name="address" rows={3} value={customer.address} onChange={onChange} placeholder="Full Address (Area, Thana, House No)" className={`${inputClass} resize-none`} />
          {errors.address && <p className="text-red-400 text-[10px] mt-1">{errors.address}</p>}
        </label>
      </div>
    </div>
  );
}
