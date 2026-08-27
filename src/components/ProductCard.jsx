import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Zap, Minus, Plus, Check, Star, Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  // 🛡️ Safe fallback for Variants (Supports JSON & CSV data)
  const defaultVariants = Array.isArray(product?.variants) && product.variants.length > 0 
    ? product.variants 
    : [
        {
          id: 'standard',
          label: 'Standard Edition',
          price: Number(product?.price || 49.99),
          comparePrice: Number(product?.comparePrice || product?.original_price || (Number(product?.price || 49.99) * 1.4)),
          bestselling: true
        }
      ]

  const [selectedVariant, setSelectedVariant] = useState(defaultVariants[0])
  const [qty, setQty] = useState(1)

  const unitPrice = selectedVariant?.price || Number(product?.price || 49.99)
  const unitComparePrice = selectedVariant?.comparePrice || (unitPrice * 1.4)
  const totalPrice = unitPrice * qty
  const totalComparePrice = unitComparePrice * qty
  const discount = Math.round(((unitComparePrice - unitPrice) / unitComparePrice) * 100)

  const ratingValue = product?.rating || 4.9
  const reviewsCount = product?.reviewsCount || 48
  const tagLabel = product?.tag || 'Best Choice'
  const categoryLabel = product?.category || 'Collection'
  
  // 🛡️ Safe fallback for Features
  const featuresList = Array.isArray(product?.features) && product.features.length > 0
    ? product.features
    : ['Premium high quality guarantee', 'Fast and secure shipping', '24/7 dedicated customer support']

  // 🛒 إضافة المنتج إلى السلة وفتح الـ Drawer مباشرة
  const handleAddToCart = () => {
    addToCart(product, selectedVariant, qty)
  }

  // ⚡ الانتقال المباشر لصفحة تفاصيل المنتج
  const handleViewProduct = () => {
    navigate(`/product/${product?.slug || product?.id}`, {
      state: { selectedVariant, quantity: qty }
    })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative flex flex-col bg-white rounded-3xl border border-gray-200/70 shadow-sm hover:shadow-2xl hover:shadow-purple-900/10 hover:border-purple-500/40 transition-all duration-300 overflow-hidden"
    >
      
      {/* 📸 Top Image Banner */}
      <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        
        {/* Tag Badge */}
        <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-3 py-1 bg-gray-900/80 backdrop-blur-md text-white text-[11px] font-extrabold rounded-full shadow-lg border border-white/20">
          <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
          <span>{tagLabel}</span>
        </div>

        {/* In Stock Pill */}
        <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 px-2.5 py-1 bg-purple-500/10 backdrop-blur-md text-purple-700 text-[10px] font-bold rounded-full border border-purple-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
          <span>In Stock</span>
        </div>

        {/* Image */}
        <img
          src={product?.image || '/images/pro.jpg'}
          alt={product?.name || product?.title || 'Product'}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
          onClick={handleViewProduct}
          onError={(e) => {
            e.target.src = `https://placehold.co/400x400/6d28d9/ffffff?text=${encodeURIComponent(categoryLabel)}`
          }}
        />

        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      {/* 📝 Content Area */}
      <div className="p-5 flex-1 flex flex-col pt-1">
        
        {/* Category & Ratings */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black tracking-widest text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md uppercase border border-purple-200/50">
            {categoryLabel}
          </span>

          <div className="flex items-center gap-1 bg-amber-50/80 px-2 py-0.5 rounded-full border border-amber-200/50">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-black text-gray-900">{ratingValue}</span>
            <span className="text-[10px] font-semibold text-gray-400">({reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={handleViewProduct}
          className="font-extrabold text-gray-900 mb-2 leading-snug text-base group-hover:text-purple-700 transition-colors cursor-pointer line-clamp-2"
        >
          {product?.name || product?.title || 'Untitled Product'}
        </h3>
        
        {/* Description */}
        <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {product?.description || 'High quality selection made for durability, aesthetics, and optimal home performance.'}
        </p>

        {/* Feature List */}
        <ul className="space-y-1.5 mb-5 bg-gray-50/70 p-3 rounded-2xl border border-gray-100">
          {featuresList.map((feat, i) => (
            <li key={i} className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <div className="p-0.5 rounded-full bg-purple-100 text-purple-600 shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="truncate">{feat}</span>
            </li>
          ))}
        </ul>

        {/* Variants Selection */}
        {defaultVariants.length > 1 ? (
          <div className="space-y-2 mb-5">
            {defaultVariants.map((variant) => (
              <label
                key={variant.id}
                className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer text-xs transition-all duration-200 ${
                  selectedVariant?.id === variant.id
                    ? 'border-purple-600 bg-purple-50/50 shadow-xs ring-1 ring-purple-600/20 font-bold text-gray-900'
                    : 'border-gray-200/80 hover:border-gray-300 text-gray-600 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name={`variant-${product?.id || product?.slug}`}
                  className="accent-purple-600 w-3.5 h-3.5 cursor-pointer"
                  checked={selectedVariant?.id === variant.id}
                  onChange={() => setSelectedVariant(variant)}
                />
                <span className="flex-1">{variant.label}</span>
                <span className="font-black text-gray-900">${Number(variant.price).toFixed(2)}</span>
                {variant.bestselling && (
                  <span className="px-2 py-0.5 bg-purple-600 text-white text-[9px] font-black rounded-full uppercase tracking-wider">
                    Popular
                  </span>
                )}
              </label>
            ))}
          </div>
        ) : (
          <div className="mb-4 bg-purple-50/40 p-2.5 rounded-xl border border-purple-100 text-xs flex justify-between items-center text-gray-700 font-semibold">
            <span>Edition</span>
            <span className="text-purple-700 font-extrabold">{defaultVariants[0].label}</span>
          </div>
        )}

        {/* Price & Quantity Controls */}
        <div className="flex items-center justify-between gap-2 mb-4 mt-auto pt-3 border-t border-gray-100">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900 tracking-tight">
                ${totalPrice.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ${totalComparePrice.toFixed(2)}
              </span>
            </div>
            {discount > 0 && (
              <span className="inline-block text-[10px] font-black text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-md mt-0.5">
                SAVE {discount}% OFF
              </span>
            )}
          </div>

          {/* Qty Selector */}
          <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/80 p-0.5 shadow-inner">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="p-1.5 hover:bg-white rounded-lg text-gray-600 hover:shadow-xs transition-all cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2.5 text-xs font-black text-gray-800 w-6 text-center">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="p-1.5 hover:bg-white rounded-lg text-gray-600 hover:shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 🛒 ADD TO CART BUTTON (مع تأثير Glow وتفاعل مباشر) */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-2xl shadow-lg shadow-purple-600/25 group/btn mb-2"
        >
          <button 
            onClick={handleAddToCart}
            className="w-full relative py-3.5 px-5 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform transform skew-x-12" />
            <ShoppingBag className="w-4 h-4 text-white shrink-0" />
            <span>Add to Cart • ${totalPrice.toFixed(2)}</span>
          </button>
        </motion.div>

        {/* View Details Link */}
        <Link
          to={`/product/${product?.slug || product?.id}`}
          state={{ selectedVariant, quantity: qty }}
          className="group/link flex items-center justify-center gap-1 text-xs font-bold text-gray-400 hover:text-purple-700 transition-colors py-1"
        >
          <span>View full details</span>
          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
        </Link>

      </div>
    </motion.div>
  )
}
