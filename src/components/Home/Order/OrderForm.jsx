"use client";
import { useEffect, useState } from 'react';
import { Minus, Plus, CreditCard, ImageIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { placeOrder } from '@/action/order';
import Swal from 'sweetalert2';

export default function OrderForm({ products }) {
  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    district: "",
    city: "",
    address: "",
    transactionId: "",
    email: ""
  })
  const params = useSearchParams()
  const id = params.get("productId")
  const productObj = products?.find((product) => product._id === id)
  let initalProduct = productObj ? JSON.stringify(productObj) : null
  const [selectedProduct, setSelectedProduct] = useState(initalProduct);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const parsedProduct = selectedProduct ? JSON.parse(selectedProduct) : null;

  useEffect(() => {
    if (id) {
      const pObj = products.find((p) => p._id === id);
      if (pObj) {
        setSelectedProduct(JSON.stringify(pObj));
      }
    }
  }, [id]);

  useEffect(() => {
    setSelectedSize("");
    setSelectedColor("");
  }, [selectedProduct]);

  let deliveryCharge;
  if (form.district.toLocaleLowerCase() === "dhaka") {
    deliveryCharge = 60;
  } else {
    deliveryCharge = 120;
  }

  const pricePerUnit = parsedProduct?.discountedPrice || parsedProduct?.price || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.district === "" || form.email === "" || form.city === "" || form.address === "" || form.customerName === "" || form.phone === "" || selectedProduct == null) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill all the fields",
        background: "#11151c",
        color: "#fff",
      });
    }

    const product = {
      name: parsedProduct?.name,
      discount: parsedProduct?.discount,
      deliveryCharge,
      image: parsedProduct?.image,
      sellerPrice: parsedProduct?.price,
      totalPrice: pricePerUnit,
      productId: parsedProduct?._id,
    }

    const orderData = {
      ...form,
      ...product,
      quantity,
      paymentMethod,
      selectedSize: parsedProduct?.productSizes?.length > 0 ? selectedSize : undefined,
      selectedColor: parsedProduct?.productColors?.length > 0 ? selectedColor : undefined,
    };

    const result = await placeOrder(orderData);
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "অর্ডার সফলভাবে গ্রহণ করা হয়েছে!",
        background: "#11151c",
        color: "#fff",
      });
      setForm({ customerName: "", phone: "", district: "", city: "", address: "", transactionId: "", email: "" });
      setQuantity(1);
      setPaymentMethod("cod");
      setSelectedSize("");
      setSelectedColor("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "অর্ডার করতে সমস্যা হয়েছে।",
        background: "#11151c",
        color: "#fff",
      });
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <section id={`order`} className="w-full min-h-screen bg-[#0a0c12] text-accent-content py-12 px-4 md:px-10 lg:px-20">

        <div className="w-full text-center mb-12">
          <span className="border border-primary-color text-primary-color px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em]">
            Premium Checkout
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mt-6 mb-4">
            Complete Your <span className="text-primary-color">Purchase</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto italic">
            আপনার পছন্দের ঘড়িটি অর্ডার করতে নিচের ফর্মটি সঠিক তথ্য দিয়ে পূরণ করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-400 mx-auto">

          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#11151c] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <ImageIcon className="text-primary-color w-5 h-5" /> Product Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-500">Product Image URL</label>
                  <input
                    type="text"
                    name='image'
                    disabled={true}
                    value={parsedProduct?.image || ''}
                    className="w-full bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-3 focus:border-primary-color outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-500">Unit Price (৳)</label>
                  <input
                    type="number"
                    disabled
                    value={pricePerUnit || ''}
                    className="w-full bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-3 focus:border-primary-color outline-none text-primary-color font-bold"
                  />
                </div>

                {parsedProduct?.productSizes?.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Available Sizes</label>
                    <div className="flex flex-wrap gap-2">
                      {parsedProduct.productSizes.map((size) => (
                        <button
                          type="button"
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-md border transition-all ${selectedSize === size ? "border-primary-color bg-primary-color/20 text-primary-color" : "border-gray-700 bg-[#1c2128] text-gray-300 hover:border-gray-500"}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {parsedProduct?.productColors?.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Available Colors</label>
                    <div className="flex flex-wrap gap-2">
                      {parsedProduct.productColors.map((c) => (
                        <button
                          type="button"
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor === c ? "border-primary-color scale-110" : "border-gray-600 hover:border-gray-400"}`}
                          style={{ backgroundColor: c.toLowerCase() }}
                          title={c}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {parsedProduct?.productStatus?.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Status</label>
                    <div className="flex gap-2">
                      {parsedProduct.productStatus.map((s) => (
                        <span key={s} className={`text-[10px] font-bold px-3 py-1 rounded-full ${s === "hot" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>
                          {s.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {parsedProduct && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Stock</label>
                    <p className={`text-sm font-bold ${parsedProduct.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                      {parsedProduct.stock > 0 ? `✓ ${parsedProduct.stock} in stock` : "✕ Out of stock"}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="aspect-square w-full max-w-50 bg-[#0a0c12] rounded-xl border border-dashed border-gray-700 flex items-center justify-center overflow-hidden">
                  {parsedProduct?.image ? (
                    <img src={parsedProduct?.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-600 text-xs text-center p-4">Image Preview</div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-500">Select Product</label>
                  <select
                    value={selectedProduct || ""}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-3 focus:border-primary-color outline-none"
                  >
                    <option disabled value="">Select Product</option>
                    {products?.map((product) => (
                      <option key={product._id} value={JSON.stringify(product)}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase text-gray-500">Select Quantity</label>
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"><Minus size={18} /></button>
                    <span className="text-3xl font-bold w-12 text-center">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(quantity + 1)} className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"><Plus size={18} /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#11151c] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-xl font-semibold mb-6">Delivery Details</h3>
              <div className="space-y-4">
                <div className='flex justify-between'>
                  <label className="text-xs font-bold uppercase text-accent-content">Full Name
                    <input required type="text" value={form.customerName} onChange={handleChange} name="customerName" placeholder="Full Name" className="w-full mt-2 bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-4 focus:border-primary-color outline-none" />
                  </label>
                  <label className="text-xs font-bold uppercase text-accent-content">Phone Number
                    <input required type="tel" value={form.phone} onChange={handleChange} name="phone" placeholder="Phone Number" className="w-full mt-2 bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-4 focus:border-primary-color outline-none" />
                  </label>
                </div>
                <div className='flex justify-between'>
                  <label className="text-xs font-bold uppercase text-accent-content">District
                    <input required type="text" value={form.district} onChange={handleChange} name="district" placeholder="District" className="w-full mt-2 bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-4 focus:border-primary-color outline-none" />
                  </label>
                  <label className="text-xs font-bold uppercase text-accent-content">City
                    <input required type="text" value={form.city} onChange={handleChange} name="city" placeholder="City" className="w-full mt-2 bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-4 focus:border-primary-color outline-none" />
                  </label>
                </div>
                <label className="text-xs font-bold uppercase text-accent-content">Email
                  <input required type="email" value={form.email} onChange={handleChange} name="email" placeholder="Email" className="w-full mt-2 bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-4 focus:border-primary-color outline-none" />
                </label>
                <label htmlFor="address"
                  className="text-xs font-bold uppercase text-accent-content">
                  Full Address (Area, City, House No)</label>
                <textarea
                  required
                  rows={3}
                  value={form.address}
                  onChange={handleChange}
                  name="address"
                  id="address"
                  placeholder="Full Address (Area, City, House No)"
                  className="w-full bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-4 focus:border-primary-color outline-none resize-none"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#11151c] border border-primary-color/30 rounded-2xl p-6 md:p-8 shadow-2xl sticky top-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <CreditCard className="text-primary-color w-5 h-5" /> Payment Method
              </h3>

              <div className="grid grid-cols-1 gap-3 mb-8">
                {[
                  { id: 'cod', label: 'Cash on Delivery', sub: 'পণ্য হাতে পেয়ে টাকা দিন' },
                  { id: 'bkash', label: 'bKash Payment', sub: '01626420774 (Send Money)' },
                  { id: 'nagad', label: 'Nagad Payment', sub: '01626420774 (Send Money)' }
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === method.id ? 'border-primary-color bg-primary-color/10' : 'border-gray-800 bg-[#0a0c12]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-primary-color w-4 h-4"
                      />
                      <div>
                        <p className="font-bold text-sm">{method.label}</p>
                        <p className="text-[10px] text-gray-500">{method.sub}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {paymentMethod !== 'cod' && (
                <div className="mb-6 animate-in fade-in slide-in-from-top-2">
                  <label className="text-xs font-bold uppercase text-primary-color block mb-2">Transaction ID *</label>
                  <input
                    required
                    type="text"
                    onChange={handleChange}
                    name="transactionId"
                    placeholder="Enter TrxID (e.g. 8N7X6W5Q)"
                    className="w-full bg-[#0a0c12] border border-primary-color/50 rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary-color outline-none text-accent-content font-mono"
                  />
                </div>
              )}

              <div className="border-t border-gray-800 pt-6 mt-6 space-y-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>৳{pricePerUnit * quantity}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery Fee</span>
                  <span className="text-btn-color">{form.district ? deliveryCharge : 0}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold border-t border-gray-800 pt-4">
                  <span>Total</span>
                  <span className="text-primary-color">৳{pricePerUnit * quantity + deliveryCharge}</span>
                </div>
              </div>

              <button type="submit" className={`w-full ${form.district === "" || form.city === "" || form.address === "" || form.customerName === "" || form.phone === "" || selectedProduct == null ? "bg-accent/20 cursor-not-allowed text-accent-content/50" : "bg-primary-color hover:bg-primary-color text-accent"} py-5 font-bold rounded-xl mt-8 transition-transform active:scale-95 shadow-[0_10px_30px_rgba(212,175,55,0.2)]`}>
                CONFIRM ORDER NOW
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
