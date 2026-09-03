import React, { useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, ShieldCheck, Zap, Sparkles, CheckCircle2, ShoppingBag, Mail, Truck, RefreshCw, FileText, MapPin } from 'lucide-react'
import { useCart } from '../context/CartContext'
import PayPalButton from '../components/PayPalButton'
import productsData from '../data/csvProducts.json'

export default function Checkout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { cartItems = [], cartTotal = 0, clearCart } = useCart()

  const productId = searchParams.get('id')
  const directQty = parseInt(searchParams.get('qty') || '1', 10)

  const [directProduct, setDirectProduct] = useState(null)
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  })
  const [isSuccess, setIsSuccess] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)

  // 🎯 دعم الشراء المباشر وقراءة السلع مباشرة من csvProducts.json
  useEffect(() => {
    if (productId && Array.isArray(productsData)) {
      const found = productsData.find(
        (p) => String(p.id) === String(productId) || String(p.slug) === String(productId)
      )
      if (found) {
        setDirectProduct({
          ...found,
          name: found.title || found.name,
          image: found.image_link || found.image,
          price: Number(found.price || 49.99),
          quantity: directQty
        })
      }
    }
  }, [productId, directQty])

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value })
  }

  // حساب المجموع النهائي وتفاصيل الطلب
  const subtotalAmount = directProduct 
    ? directProduct.price * directProduct.quantity 
    : cartTotal
  const shippingAmount = 0.00 // Free Standard US Shipping
  const finalAmount = subtotalAmount + shippingAmount
  const hasItems = directProduct || (cartItems && cartItems.length > 0)

  const handlePaymentSuccess = (details) => {
    setOrderDetails(details)
    setIsSuccess(true)
    if (!directProduct && clearCart) clearCart()
  }

  if (isSuccess) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-purple-50/20 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-8 rounded-3xl border border-purple-100 shadow-2xl text-center space-y-5"
        >
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border border-emerald-100 shadow-inner">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">Order Confirmed!</h2>
            <p className="text-xs text-gray-500 mt-1">
              Thank you <strong className="text-gray-900">{shippingInfo.fullName || orderDetails?.payer?.name?.given_name || 'Customer'}</strong>. Your payment was completed successfully.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-2xl text-xs text-left space-y-2 border border-gray-100">
            <div className="flex justify-between"><span className="text-gray-500">Order ID:</span> <span className="font-mono font-bold text-gray-900">{orderDetails?.id || 'COMPLETED'}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Amount Paid:</span> <span className="font-black text-purple-700">${finalAmount.toFixed(2)} USD</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Shipping:</span> <span className="font-bold text-emerald-600 uppercase">FREE DOMESTIC (USPS)</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Tracking Info:</span> <span className="font-semibold text-gray-800">Dispatched in 24-48h</span></div>
          </div>

          <Link
            to="/shop"
            className="block w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl transition-all shadow-md shadow-purple-600/20"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Secure Checkout — QB MASTER</title>
        <meta name="description" content="Complete your order securely with SSL encrypted checkout and tracked US domestic shipping." />
        <link rel="canonical" href="https://qbmaster.shop/checkout" />
      </Helmet>

      <section className="py-12 lg:py-20 bg-gradient-to-b from-purple-50/40 via-white to-purple-50/20 min-h-[85vh] relative overflow-hidden font-sans">
        
        {/* Decorative Glow */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back Button */}
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-purple-700 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            <span>Back to store</span>
          </Link>

          {/* Title Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-purple-100/80">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Secure Checkout</h1>
              <p className="text-xs text-gray-500 font-medium mt-1">Fast domestic dispatch & tracked US shipping</p>
            </div>
            
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-800 rounded-full border border-purple-200/60 text-xs font-black">
              <Lock className="w-3.5 h-3.5 text-purple-600" />
              <span>256-Bit Encrypted</span>
            </div>
          </div>

          {!hasItems ? (
            <div className="bg-white p-10 rounded-3xl border border-purple-100 text-center shadow-lg space-y-4">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Your Checkout is Empty</h2>
              <p className="text-xs text-gray-500">Please choose an item from our store before proceeding.</p>
              <Link to="/shop" className="inline-block px-6 py-3 bg-purple-600 text-white font-bold text-xs rounded-xl shadow-md">
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              {/* 📦 Order Summary Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-purple-100 p-6 shadow-xl shadow-purple-950/5 mb-6"
              >
                <h2 className="font-extrabold text-gray-900 text-base mb-4 border-b border-gray-100 pb-2">
                  Order Summary
                </h2>

                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {directProduct ? (
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={directProduct.image} alt={directProduct.name} className="w-12 h-12 object-cover rounded-xl border border-gray-100" />
                        <div>
                          <h4 className="font-bold text-gray-900 truncate max-w-[220px]">{directProduct.name}</h4>
                          <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md font-semibold">
                            Qty: {directProduct.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="font-black text-gray-900">${(directProduct.price * directProduct.quantity).toFixed(2)}</span>
                    </div>
                  ) : (
                    cartItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <img src={item.image || item.image_link} alt={item.name || item.title} className="w-12 h-12 object-cover rounded-xl border border-gray-100" />
                          <div>
                            <h4 className="font-bold text-gray-900 truncate max-w-[220px]">{item.name || item.title}</h4>
                            <span className="text-[10px] text-gray-400">Qty: {item.quantity || 1}</span>
                          </div>
                        </div>
                        <span className="font-black text-gray-900">${((item.price || 49.99) * (item.quantity || 1)).toFixed(2)}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* 🏷️ Itemized Transparent Breakdown */}
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-bold text-gray-900">${subtotalAmount.toFixed(2)} USD</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-emerald-600" /> Domestic Shipping (USPS / FedEx):
                    </span>
                    <span className="font-extrabold text-emerald-600 uppercase">FREE SHIPPING ($0.00)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Estimated Sales Tax:</span>
                    <span className="font-semibold text-gray-500">$0.00 (Included)</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-sm">
                    <span className="font-black text-gray-900">Total Due:</span>
                    <span className="text-xl font-black text-purple-700">${finalAmount.toFixed(2)} USD</span>
                  </div>
                </div>
              </motion.div>

              {/* 1️⃣ Shipping & Delivery Address (Essential for GMC Physical Store) */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-7 shadow-xl shadow-purple-950/5 mb-6"
              >
                <h2 className="font-extrabold text-gray-900 text-base mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" /> Shipping Address
                  </span>
                  <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2.5 py-0.5 rounded-md">Step 1 of 2</span>
                </h2>
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1">Full Name</label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-purple-600 outline-hidden transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-purple-600 outline-hidden transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1">Street Address</label>
                    <input 
                      type="text" 
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      placeholder="123 Maple Street, Apt 4B"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-purple-600 outline-hidden transition-all"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1">City</label>
                      <input 
                        type="text" 
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        placeholder="Los Angeles"
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-purple-600 outline-hidden transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1">State</label>
                      <input 
                        type="text" 
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        placeholder="CA"
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-purple-600 outline-hidden transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1">ZIP Code</label>
                      <input 
                        type="text" 
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleInputChange}
                        placeholder="90001"
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-purple-600 outline-hidden transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 2️⃣ Payment Method Card */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-7 shadow-xl shadow-purple-950/5 mb-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
                  <h2 className="font-extrabold text-gray-900 text-base flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-purple-600" /> Payment Method
                  </h2>
                  <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2.5 py-0.5 rounded-md self-start sm:self-auto">
                    Step 2 of 2
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-gray-500">
                    Complete your transaction securely via <strong>PayPal</strong>, <strong>Debit</strong>, or <strong>Credit Card</strong>:
                  </p>

                  <div className="pt-2">
                    <PayPalButton
                      amount={finalAmount}
                      onSuccess={handlePaymentSuccess}
                    />
                  </div>
                </div>
              </motion.div>

              {/* 🔒 Bottom Policy Links */}
              <div className="p-5 bg-purple-50/40 rounded-2xl border border-purple-100 mb-6 text-center space-y-3">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-600">
                  <Link to="/refund-policy" className="hover:text-purple-700 underline underline-offset-2 flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5 text-purple-600" /> 30-Day Return Policy
                  </Link>
                  <Link to="/shipping-delivery" className="hover:text-purple-700 underline underline-offset-2 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-purple-600" /> Shipping & Delivery Terms
                  </Link>
                  <Link to="/terms-conditions" className="hover:text-purple-700 underline underline-offset-2 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-purple-600" /> Terms of Service
                  </Link>
                  <Link to="/privacy-policy" className="hover:text-purple-700 underline underline-offset-2 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-purple-600" /> Privacy Policy
                  </Link>
                </div>

                <p className="text-[11px] text-gray-400">
                  By completing payment, you agree to QB MASTER policies. All transactions are SSL encrypted.
                </p>
              </div>

              {/* 🛡️ Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-extrabold text-gray-500 text-center">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-purple-600" /> 100% Insured Delivery
                </span>
                <span className="flex items-center gap-1.5 text-gray-600">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" /> Fast Domestic Dispatch
                </span>
                <span className="flex items-center gap-1.5 text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" /> 30-Day Money Back
                </span>
              </div>
            </>
          )}

        </div>
      </section>
    </>
  )
}
