import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Zap, ShieldCheck, CheckCircle, RefreshCw, Lock, Sparkles, Star, ZoomIn, ShoppingBag, Plus, Minus } from 'lucide-react'
import productsData from '../data/products.json'
import { fetchCsvProducts } from '../utils/loadHiddenProducts'
import { useCart } from '../context/CartContext'
import PayPalButton from '../components/PayPalButton'
import ProductJsonLd from '../components/ProductJsonLd'

const whyUsFeatures = [
  {
    id: 0,
    icon: Zap,
    title: 'High Quality Guarantee',
    desc: 'Tested and verified products made with durable premium materials.',
  },
  {
    id: 1,
    icon: CheckCircle,
    title: 'Fast Tracked Shipping',
    desc: 'Quick packaging and tracked shipping straight to your address.',
  },
  {
    id: 2,
    icon: Check,
    title: 'Verified Authenticity',
    desc: '100% genuine items backed by full customer warranty.',
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: 'Money-Back Guarantee',
    desc: '30-day hassle-free returns and refunds policy.',
  },
]

export default function ProductDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState(0)

  // Zoom States
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const imgRef = useRef(null)

  // 🎯 جلب ودمج المنتجات الأصلية مع منتجات ملف الـ CSV
  useEffect(() => {
    async function loadProduct() {
      setLoading(true)
      const csvProducts = await fetchCsvProducts()
      const allProducts = [...productsData, ...csvProducts]
      
      const found = allProducts.find((p) => p.slug === slug || String(p.id) === slug)
      
      if (found) {
        const validVariants = (found.variants && found.variants.length > 0)
          ? found.variants
          : [
              {
                id: 'default-variant',
                label: 'Standard Edition',
                price: Number(found.price || 49.99),
                comparePrice: Number(found.comparePrice || Number(found.price || 49.99) * 1.4),
                users: 1
              }
            ]
        
        setProduct({ ...found, variants: validVariants })
        setSelectedVariant(validVariants[0])
      } else {
        setProduct(null)
      }
      setLoading(false)
    }
    loadProduct()
  }, [slug])

  const handleMouseMove = (e) => {
    if (!imgRef.current) return
    const { left, top, width, height } = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPos({ x, y })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % whyUsFeatures.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-gray-500 animate-pulse">Loading product details...</h1>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
        <Link to="/shop" className="text-purple-600 font-semibold hover:underline">
          &larr; Back to shop
        </Link>
      </div>
    )
  }

  // 💰 حساب الأسعار والكمية
  const unitPrice = selectedVariant?.price || Number(product.price || 49.99)
  const calculatedTotal = unitPrice * qty
  const unitPriceFormatted = Number(unitPrice).toFixed(2)

  // 🌐 معالجة الروابط والـ Metadata
  const baseUrl = typeof window !== 'undefined' && window.location.origin 
    ? window.location.origin 
    : 'https://qbmaster.shop'
  const canonicalUrl = `${baseUrl}/product/${product.slug || product.id}`
  const rawImage = product.image || '/images/pro.jpg'
  const absoluteImageUrl = rawImage.startsWith('http') 
    ? rawImage 
    : `${baseUrl}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`

  const isOutOfStock = product.inStock === false || product.stock === 0 || product.availability === 'out_of_stock'
  const stockAvailabilityText = isOutOfStock ? 'out of stock' : 'in stock'

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, qty)
  }

  const handlePaymentSuccess = (orderDetails) => {
    alert(`Thank you ${orderDetails?.payer?.name?.given_name || 'Customer'}! Your order was successful.`)
  }

  const ActiveIcon = whyUsFeatures[activeTab].icon
  const ratingValue = product.rating || 4.96
  const reviewsCount = product.reviewsCount || 142

  return (
    <>
      {/* 🎯 طبقة الميتاداتا المتقدمة للـ SEO و Google Shopping */}
      <Helmet>
        {/* Basic SEO */}
        <title>{product.name} — Store</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph / Social & GMC Crawlers */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product.name} — Store`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={absoluteImageUrl} />
        <meta property="og:site_name" content="QB MASTER" />

        {/* Product Specific OpenGraph (مطابقة السعر والتوفر) */}
        <meta property="product:price:amount" content={unitPriceFormatted} />
        <meta property="product:price:currency" content="USD" />
        <meta property="product:availability" content={stockAvailabilityText} />
        <meta property="product:condition" content="new" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} — Store`} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={absoluteImageUrl} />
      </Helmet>

      {/* 🎯 Schema.org Product Structured Data للمطابقة مع Google Shopping */}
      <ProductJsonLd product={product} selectedVariant={selectedVariant} />
      
      <section className="py-12 lg:py-20 bg-purple-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-purple-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to products
          </Link>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Side: Product Image & Features */}
            <div className="lg:col-span-5 space-y-6">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                ref={imgRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                className="bg-white rounded-3xl border border-purple-100 p-3 flex items-center justify-center shadow-sm relative overflow-hidden cursor-crosshair group min-h-[350px]"
              >
                <img
                  src={product.image || '/images/pro.jpg'}
                  alt={product.name}
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isHovered ? 'scale(2.2)' : 'scale(1)',
                  }}
                  className="w-full h-auto max-h-[480px] object-contain rounded-2xl transition-transform duration-200 ease-out"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/400x400/6d28d9/ffffff?text=${encodeURIComponent(product.category || 'Product')}`
                  }}
                />

                <div className={`absolute bottom-3 right-3 bg-gray-900/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-xs transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                  <ZoomIn className="w-3.5 h-3.5" /> Hover to zoom
                </div>
              </motion.div>

              {/* Slider Widget */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-3xl p-6 shadow-xl shadow-purple-950/5 border border-purple-100/80 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <h3 className="font-extrabold text-gray-900 text-base">
                    Why choose us
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                    Verified Store
                  </span>
                </div>

                <div className="relative min-h-[100px] flex items-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="w-full flex items-start gap-4 py-2"
                    >
                      <div className="p-3.5 rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-600/20 shrink-0">
                        <ActiveIcon className="w-6 h-6 stroke-[2]" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-gray-900 text-sm mb-1">
                          {whyUsFeatures[activeTab].title}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{whyUsFeatures[activeTab].desc}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    {whyUsFeatures.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeTab === idx ? 'w-6 bg-purple-600' : 'w-2 bg-gray-200 hover:bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-bold text-gray-400">0{activeTab + 1} / 0{whyUsFeatures.length}</span>
                </div>
              </motion.div>

            </div>

            {/* Right Side: Product Details & Interactive Variant Selection */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">{product.category || 'FEATURED ITEM'}</div>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200/60 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                  In Stock • Fast Shipping
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-black text-gray-900">{ratingValue}</span>
                <span className="text-gray-300">•</span>
                <span className="text-xs font-semibold text-gray-500 underline decoration-gray-300 underline-offset-4 hover:text-purple-700 transition-colors cursor-pointer">
                  ({reviewsCount} verified reviews)
                </span>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                {product.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2.5 mb-8 bg-white p-5 rounded-2xl border border-purple-100">
                {(product.features || []).map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                    <Check className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* VARIANTS SELECTION LIST */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-3 mb-6">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id

                    return (
                      <div
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
                          isSelected
                            ? 'bg-purple-50/40 border-purple-600 shadow-md shadow-purple-600/10'
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                            isSelected ? 'bg-purple-600 text-white' : 'border border-gray-300'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div>
                            <div className={`font-black text-sm sm:text-base transition-colors ${
                              isSelected ? 'text-purple-950' : 'text-gray-900'
                            }`}>
                              {variant.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5 font-medium">
                              {variant.users || 1} item package
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-xl font-black ${
                            isSelected ? 'text-purple-700' : 'text-gray-900'
                          }`}>
                            ${Number(variant.price).toFixed(2)}
                          </div>
                          {variant.comparePrice && (
                            <div className="text-xs text-gray-400 line-through">
                              ${Number(variant.comparePrice).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Quantity Controls */}
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 mb-6">
                <span className="text-xs font-bold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-1.5 hover:bg-white rounded-lg text-gray-600 transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-black text-gray-800">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-1.5 hover:bg-white rounded-lg text-gray-600 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 🛒 ADD TO CART BUTTON */}
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={handleAddToCart}
                className="w-full py-4 px-6 mb-4 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-purple-600/25 flex items-center justify-center gap-3 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart (${calculatedTotal.toFixed(2)})</span>
              </motion.button>

              {/* 💳 PAYPAL INTEGRATION CHECKOUT SECTION */}
              <div id="paypal-button-container" className="bg-white p-5 rounded-3xl border border-purple-100 shadow-lg shadow-purple-900/5 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-700">Instant Checkout (PayPal):</span>
                  <span className="text-2xl font-black text-purple-700">
                    ${calculatedTotal.toFixed(2)}
                  </span>
                </div>

                <PayPalButton 
                  amount={calculatedTotal} 
                  onSuccess={handlePaymentSuccess} 
                />
              </div>

              {/* Payment Badges & Security */}
              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex items-center justify-center gap-1.5 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping"></span>
                    <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">
                      Guaranteed Safe & Secure Checkout
                    </p>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    <div className="h-11 bg-white border border-gray-200/90 rounded-xl flex items-center justify-center shadow-xs hover:border-purple-600 hover:scale-105 transition-all">
                      <span className="font-black italic text-[#1A1F71] text-sm tracking-tighter select-none font-sans">
                        VISA
                      </span>
                    </div>

                    <div className="h-11 bg-white border border-gray-200/90 rounded-xl flex items-center justify-center shadow-xs hover:border-purple-600 hover:scale-105 transition-all">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                        alt="Mastercard" 
                        className="h-5 w-auto object-contain"
                      />
                    </div>

                    <div className="h-11 bg-white border border-gray-200/90 rounded-xl flex items-center justify-center shadow-xs hover:border-purple-600 hover:scale-105 transition-all">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
                        alt="PayPal" 
                        className="h-4 w-auto object-contain"
                      />
                    </div>

                    <div className="h-11 bg-white border border-gray-200/90 rounded-xl flex items-center justify-center shadow-xs hover:border-purple-600 hover:scale-105 transition-all">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" 
                        alt="Apple Pay" 
                        className="h-4 w-auto object-contain"
                      />
                    </div>

                    <div className="h-11 bg-white border border-gray-200/90 rounded-xl flex items-center justify-center shadow-xs hover:border-purple-600 hover:scale-105 transition-all">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" 
                        alt="Google Pay" 
                        className="h-4 w-auto object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Guarantee Box */}
                <div className="relative overflow-hidden bg-gradient-to-br from-purple-50/90 via-white to-purple-50/40 border border-purple-200/80 rounded-2xl p-5 shadow-lg shadow-purple-900/5 backdrop-blur-md">
                  <div className="absolute -right-12 -top-12 w-36 h-36 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                  
                  <div className="relative z-10 flex items-center justify-between mb-4 pb-3 border-b border-purple-100">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-purple-600 text-white rounded-xl shadow-md shadow-purple-600/30">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider">
                        100% Safe & Secure Purchase Guarantee
                      </h4>
                    </div>
                    <Sparkles className="w-4 h-4 text-purple-600 animate-bounce" />
                  </div>

                  <div className="relative z-10 space-y-3 text-xs text-gray-700">
                    <div className="flex items-start gap-3 group bg-white/60 p-2.5 rounded-xl border border-purple-100/60 hover:bg-white hover:shadow-sm transition-all">
                      <div className="mt-0.5 text-purple-600 font-bold bg-purple-100 rounded-full p-1 group-hover:scale-110 transition-transform shadow-xs">
                        <Zap className="w-3 h-3" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">100% Guaranteed Quality</span> — Premium tested items delivered directly to your doorstep.
                      </div>
                    </div>

                    <div className="flex items-start gap-3 group bg-white/60 p-2.5 rounded-xl border border-purple-100/60 hover:bg-white hover:shadow-sm transition-all">
                      <div className="mt-0.5 text-purple-600 font-bold bg-purple-100 rounded-full p-1 group-hover:scale-110 transition-transform shadow-xs">
                        <ShieldCheck className="w-3 h-3" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">30-Day Money-Back Guarantee</span> — Full support and refund if any issues arise.
                      </div>
                    </div>

                    <div className="flex items-start gap-3 group bg-white/60 p-2.5 rounded-xl border border-purple-100/60 hover:bg-white hover:shadow-sm transition-all">
                      <div className="mt-0.5 text-purple-600 font-bold bg-purple-100 rounded-full p-1 group-hover:scale-110 transition-transform shadow-xs">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">Dedicated Customer Support</span> — 24/7 assistance for order tracking and inquiries.
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 mt-4 pt-3 border-t border-purple-100/80 flex items-center justify-center gap-1.5 text-[11px] text-gray-500 font-semibold">
                    <Lock className="w-3.5 h-3.5 text-purple-600" />
                    <span>Secure checkout</span>
                    <span className="text-purple-400">•</span>
                    <span>Encrypted payments</span>
                    <span className="text-purple-400">•</span>
                    <span>Trusted by thousands</span>
                  </div>
                </div>

              </div>

            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
