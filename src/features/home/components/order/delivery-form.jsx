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
            District
            <input type="text" name="district" value={customer.district} onChange={onChange} placeholder="District" className={inputClass} />
            {errors.district && <p className="text-red-400 text-[10px] mt-1">{errors.district}</p>}
          </label>
          <label className="text-xs font-bold uppercase text-accent-content">
            City
            <input type="text" name="city" value={customer.city} onChange={onChange} placeholder="City" className={inputClass} />
            {errors.city && <p className="text-red-400 text-[10px] mt-1">{errors.city}</p>}
          </label>
        </div>
        <label className="text-xs font-bold uppercase text-accent-content block">
          Email
          <input type="email" name="email" value={customer.email} onChange={onChange} placeholder="Email" className={inputClass} />
          {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
        </label>
        <label className="text-xs font-bold uppercase text-accent-content block">
          Full Address (Area, City, House No)
          <textarea name="address" rows={3} value={customer.address} onChange={onChange} placeholder="Full Address (Area, City, House No)" className={`${inputClass} resize-none`} />
          {errors.address && <p className="text-red-400 text-[10px] mt-1">{errors.address}</p>}
        </label>
      </div>
    </div>
  );
}
