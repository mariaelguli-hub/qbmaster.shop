import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Zap, ShieldCheck, ZoomIn, ShoppingBag, Plus, Minus, CreditCard, Truck, PackageCheck, Lock, Sparkles } from 'lucide-react'
import productsData from '../data/csvProducts.json'
import { useCart } from '../context/CartContext'
import PayPalButton from '../components/PayPalButton'
import ProductJsonLd from '../components/ProductJsonLd'

const whyUsFeatures = [
  {
    id: 0,
    icon: Zap,
    title: 'Premium Quality Craftsmanship',
    desc: 'Tested and verified products crafted from heavy-duty, weather-resistant materials.',
  },
  {
    id: 1,
    icon: Truck,
    title: 'Fast Domestic US Shipping',
    desc: 'Insured doorstep delivery with real-time tracking updates via USPS / FedEx.',
  },
  {
    id: 2,
    icon: PackageCheck,
    title: 'Reinforced Safe Packaging',
    desc: 'Multi-layer box packaging ensuring your items arrive in pristine condition.',
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: '30-Day Money-Back Guarantee',
    desc: 'Hassle-free 30-day return policy for complete peace of mind.',
  },
]

function findMatchingProduct(list, query) {
  if (!query || !Array.isArray(list)) return null
  const q = String(query).toLowerCase().trim()
  return list.find((p) => {
    const pSlug = String(p.slug || '').toLowerCase()
    const pId = String(p.id || '').toLowerCase()
    const pName = String(p.name || p.title || '').toLowerCase().replace(/[^a-z0-9]/g, '-')
    return pSlug === q || pId === q || pName.includes(q) || q.includes(pId)
  })
}

export default function ProductDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const foundProduct = findMatchingProduct(productsData, slug)

  const [product, setProduct] = useState(() => {
    if (!foundProduct) return null
    return {
      ...foundProduct,
      name: foundProduct.title || foundProduct.name,
      image: foundProduct.image_link || foundProduct.image,
      price: Number(foundProduct.price || 49.99),
      description: foundProduct.description || 'Premium home and garden product crafted for durability and everyday use.'
    }
  })

  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState(0)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const imgRef = useRef(null)

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

  const currentProduct = product || {
    id: slug,
    slug: slug,
    name: (slug || 'Product').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    price: 49.99,
    description: 'High quality home and garden essential with heavy-duty construction.',
    category: 'Home & Garden',
    image: '/images/default.jpg'
  }

  const unitPrice = Number(currentProduct.price || 49.99)
  const calculatedTotal = unitPrice * qty
  const unitPriceFormatted = unitPrice.toFixed(2)

  const canonicalUrl = `https://qbmaster.shop/product/${currentProduct.slug || currentProduct.id || slug}`
  const rawImage = currentProduct.image || '/images/default.jpg'
  const absoluteImageUrl = rawImage.startsWith('http') 
    ? rawImage 
    : `https://qbmaster.shop${rawImage.startsWith('/') ? '' : '/'}${rawImage}`

  const isOutOfStock = currentProduct.availability === 'out_of_stock'
  const stockAvailabilityText = isOutOfStock ? 'out of stock' : 'in stock'

  const handleAddToCart = () => {
    addToCart(currentProduct, null, qty)
  }

  const handleDirectCheckout = () => {
    navigate(`/checkout?id=${currentProduct.slug || currentProduct.id}&qty=${qty}`)
  }

  const handlePaymentSuccess = () => {
    navigate(`/checkout?id=${currentProduct.slug || currentProduct.id}`)
  }

  const ActiveIcon = whyUsFeatures[activeTab]?.icon || Zap

  return (
    <>
      <Helmet>
        <title>{`${currentProduct.name} — QB MASTER`}</title>
        <meta name="description" content={currentProduct.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${currentProduct.name} — QB MASTER`} />
        <meta property="og:description" content={currentProduct.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={absoluteImageUrl} />
        <meta property="og:site_name" content="QB MASTER" />
        <meta property="product:price:amount" content={unitPriceFormatted} />
        <meta property="product:price:currency" content="USD" />
        <meta property="product:availability" content={stockAvailabilityText} />
      </Helmet>

      <ProductJsonLd product={currentProduct} />
      
      <section className="py-12 lg:py-20 bg-purple-50/20 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-purple-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to catalog
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
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isHovered ? 'scale(2.2)' : 'scale(1)',
                  }}
                  className="w-full h-auto max-h-[480px] object-contain rounded-2xl transition-transform duration-200 ease-out"
                />

                <div className={`absolute bottom-3 right-3 bg-gray-900/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-xs transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                  <ZoomIn className="w-3.5 h-3.5" /> Hover to zoom
                </div>
              </motion.div>

              {/* Quality Commitment Widget */}
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-purple-950/5 border border-purple-100/80">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <h3 className="font-extrabold text-gray-900 text-base">Quality Assurance</h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                    US Domestic Shipping
                  </span>
                </div>

                <div className="relative min-h-[90px] flex items-center overflow-hidden">
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
                          {whyUsFeatures[activeTab]?.title}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{whyUsFeatures[activeTab]?.desc}</p>
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
              </div>
            </div>

            {/* Right Side: Details & Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">Home & Garden</div>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200/60 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                  Ready to Ship • Dispatched in 24-48h
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                {currentProduct.name}
              </h1>

              <div className="text-2xl font-black text-purple-700 mb-4">
                ${unitPriceFormatted} USD
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                {currentProduct.description}
              </p>

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

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={handleAddToCart}
                  className="w-full py-4 px-6 bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold text-sm rounded-2xl border border-purple-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={handleDirectCheckout}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-purple-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Buy Now (${calculatedTotal.toFixed(2)})</span>
                </motion.button>
              </div>

              {/* PayPal Button Container */}
              <div id="paypal-button-container" className="bg-white p-5 rounded-3xl border border-purple-100 shadow-lg shadow-purple-900/5 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-700">Secure Checkout (PayPal):</span>
                  <span className="text-2xl font-black text-purple-700">
                    ${calculatedTotal.toFixed(2)} USD
                  </span>
                </div>

                <PayPalButton 
                  amount={calculatedTotal} 
                  onSuccess={handlePaymentSuccess} 
                />
              </div>

              {/* Security & Physical Purchase Guarantee */}
              <div className="mt-6 space-y-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3 text-xs text-gray-700 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-gray-900 pb-2 border-b border-gray-100">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span>Customer Protection & Logistics</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Truck className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900">Tracked US Shipping</span> — Domestic delivery with live tracking number.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900">30-Day Return Policy</span> — Full refund according to our transparent policy.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <PackageCheck className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900">Inspection & Packaging</span> — All hardware carefully boxed for transit.
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-semibold">
                  <Lock className="w-3.5 h-3.5 text-purple-600" />
                  <span>256-bit SSL Encrypted Checkout</span>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
