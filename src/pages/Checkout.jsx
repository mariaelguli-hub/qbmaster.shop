import React, { useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, ShieldCheck, Zap, Sparkles, CheckCircle2, ShoppingBag, Mail, Truck, RefreshCw, FileText } from 'lucide-react'
import { useCart } from '../context/CartContext'
import PayPalButton from '../components/PayPalButton'
import productsData from '../data/products.json'
import { fetchCsvProducts } from '../utils/loadHiddenProducts'

export default function Checkout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { cartItems, cartTotal, clearCart } = useCart()

  const productId = searchParams.get('id')
  const variantId = searchParams.get('variant')

  const [directProduct, setDirectProduct] = useState(null)
  const [email, setEmail] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)

  // 🎯 دعم الشراء المباشر عبر روابط Google Shopping و GMC (?id={id})
  useEffect(() => {
    async function loadDirectProduct() {
      if (productId) {
        const csvProducts = await fetchCsvProducts()
        const all = [...productsData, ...csvProducts]
        const found = all.find((p) => String(p.id) === productId || p.slug === productId)
        if (found) {
          const selectedVar = (found.variants || []).find((v) => v.id === variantId) || (found.variants && found.variants[0])
          setDirectProduct({
            ...found,
            selectedVariant: selectedVar,
            price: Number(selectedVar?.price || found.price || 49.99)
          })
        }
      }
    }
    loadDirectProduct()
  }, [productId, variantId])

  // حساب المجموع النهائي وتفاصيل الطلب
  const subtotalAmount = directProduct ? directProduct.price : cartTotal
  const shippingAmount = 0.00 // Free Shipping
  const finalAmount = subtotalAmount + shippingAmount
  const hasItems = directProduct || cartItems.length > 0

  const handlePaymentSuccess = (details) => {
    setOrderDetails(details)
    setIsSuccess(true)
    clearCart()
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
              Thank you <strong className="text-gray-900">{orderDetails?.payer?.name?.given_name || 'Customer'}</strong>. Your payment was completed successfully.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-2xl text-xs text-left space-y-2 border border-gray-100">
            <div className="flex justify-between"><span className="text-gray-500">Order ID:</span> <span className="font-mono font-bold text-gray-900">{orderDetails?.id || 'COMPLETED'}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Amount Paid:</span> <span className="font-black text-purple-700">${finalAmount.toFixed(2)} USD</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Shipping:</span> <span className="font-bold text-emerald-600 uppercase">FREE</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Delivery Email:</span> <span className="font-semibold text-gray-800">{email || orderDetails?.payer?.email_address || 'Provided at Checkout'}</span></div>
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
        <meta name="description" content="Complete your order securely with encrypted checkout." />
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
              <p className="text-xs text-gray-500 font-medium mt-1">Instant processing & transparent delivery</p>
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
              {/* 📦 Order Summary Card with Detailed Transparency */}
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
                            {directProduct.selectedVariant?.label || 'Standard Edition'}
                          </span>
                        </div>
                      </div>
                      <span className="font-black text-gray-900">${directProduct.price.toFixed(2)}</span>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.cartItemId} className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl border border-gray-100" />
                          <div>
                            <h4 className="font-bold text-gray-900 truncate max-w-[220px]">{item.name}</h4>
                            <span className="text-[10px] text-gray-400">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* 🏷️ Itemized Transparent Breakdown (GMC Compliance Requirement) */}
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-bold text-gray-900">${subtotalAmount.toFixed(2)} USD</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-emerald-600" /> Shipping & Handling:
                    </span>
                    <span className="font-extrabold text-emerald-600 uppercase">FREE SHIPPING ($0.00)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Taxes & Duties:</span>
                    <span className="font-semibold text-gray-500">$0.00 (Included)</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-sm">
                    <span className="font-black text-gray-900">Total Price:</span>
                    <span className="text-xl font-black text-purple-700">${finalAmount.toFixed(2)} USD</span>
                  </div>
                </div>
              </motion.div>

              {/* 1️⃣ Contact Information Card */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-7 shadow-xl shadow-purple-950/5 mb-6"
              >
                <h2 className="font-extrabold text-gray-900 text-base mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-600" /> Contact & Delivery Information
                  </span>
                  <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2.5 py-0.5 rounded-md">Step 1 of 2</span>
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address (For Order Confirmation & Delivery Details)
                    </label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 outline-hidden transition-all shadow-2xs" 
                      placeholder="you@example.com" 
                      required
                    />
                    <span className="text-[11px] text-gray-400 font-medium mt-1 inline-block">
                      ⚡ Your purchase confirmation and receipt will be dispatched to this email immediately.
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 2️⃣ Real PayPal & Card Payment Card */}
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
                    Complete your purchase securely via <strong>PayPal</strong>, <strong>Debit Card</strong>, or <strong>Credit Card</strong>:
                  </p>

                  {/* 💳 REAL PAYPAL INTEGRATION */}
                  <div className="pt-2">
                    <PayPalButton
                      amount={finalAmount}
                      onSuccess={handlePaymentSuccess}
                    />
                  </div>
                </div>
              </motion.div>

              {/* 🔒 Bottom Legal & Policy Links (Mandatory for GMC Approval) */}
              <div className="p-5 bg-purple-50/40 rounded-2xl border border-purple-100 mb-6 text-center space-y-3">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-600">
                  <Link to="/refund-policy" className="hover:text-purple-700 underline underline-offset-2 flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5 text-purple-600" /> 30-Day Return & Refund Policy
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
                  By clicking payment above, you agree to our terms of service and refund policies. All transactions are securely processed with 256-bit encryption.
                </p>
              </div>

              {/* 🛡️ Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-extrabold text-gray-500 text-center">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-purple-600" /> Guaranteed Safe Checkout
                </span>
                <span className="flex items-center gap-1.5 text-gray-600">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" /> Instant Order Processing
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
