import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Minus, Plus, Check, ArrowRight, Truck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [qty, setQty] = useState(1)

  const unitPrice = Number(product?.price || 49.99)
  const totalPrice = unitPrice * qty
  const categoryLabel = product?.category || 'Home & Garden'
  
  const featuresList = [
    'High durability & premium materials', 
    'Fast & insured standard shipping', 
    '30-day customer satisfaction guarantee'
  ]

  const handleAddToCart = () => {
    addToCart(product, null, qty)
  }

  const handleViewProduct = () => {
    navigate(`/product/${product?.slug || product?.id}`)
  }

  // دعم الرابط الكامل أو النسبي
  const rawImage = product?.image || product?.image_link || '/products/clay-plant-pot.jpg'
  const imageSrc = rawImage.startsWith('http') ? rawImage : `https://qbmaster.shop${rawImage.startsWith('/') ? '' : '/'}${rawImage}`

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative flex flex-col bg-white rounded-3xl border border-gray-200/70 shadow-sm hover:shadow-2xl hover:shadow-purple-900/10 hover:border-purple-500/40 transition-all duration-300 overflow-hidden"
    >
      
      {/* Top Image Banner */}
      <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 px-2.5 py-1 bg-purple-500/10 backdrop-blur-md text-purple-700 text-[10px] font-bold rounded-full border border-purple-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
          <span>In Stock</span>
        </div>

        <img
          src={imageSrc}
          alt={product?.name || product?.title || 'Product'}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
          onClick={handleViewProduct}
          onError={(e) => {
            // كيعرض الصورة الأصلية إيلا وقع خطأ
            e.target.src = `https://qbmaster.shop/products/${product?.slug}.jpg`
          }}
        />

        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col pt-1">
        <div className="mb-2">
          <span className="text-[10px] font-black tracking-widest text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md uppercase border border-purple-200/50">
            {categoryLabel}
          </span>
        </div>

        <h3 
          onClick={handleViewProduct}
          className="font-extrabold text-gray-900 mb-2 leading-snug text-base group-hover:text-purple-700 transition-colors cursor-pointer line-clamp-2"
        >
          {product?.name || product?.title || 'Untitled Product'}
        </h3>
        
        <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {product?.description}
        </p>

        <ul className="space-y-1.5 mb-5 bg-gray-50/70 p-3 rounded-2xl border border-gray-100">
          {featuresList.map((feat, i) => (
            <li key={i} className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <div className="p-0.5 rounded-full bg-purple-100 text-purple-600 shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="truncate">{feat}</span>
            </li>
          ))}
        </ul>

        <div className="mb-4 bg-purple-50/50 p-2.5 rounded-xl border border-purple-100 text-xs flex justify-between items-center text-gray-700 font-semibold">
          <span className="flex items-center gap-1.5 text-gray-700">
            <Truck className="w-3.5 h-3.5 text-purple-600" /> Shipping
          </span>
          <span className="text-purple-700 font-extrabold">Free Standard Delivery</span>
        </div>

        {/* Price & Quantity Controls */}
        <div className="flex items-center justify-between gap-2 mb-4 mt-auto pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/80 p-0.5 shadow-inner">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="p-1.5 hover:bg-white rounded-lg text-gray-600 transition-all cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2.5 text-xs font-black text-gray-800 w-6 text-center">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="p-1.5 hover:bg-white rounded-lg text-gray-600 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-2xl shadow-lg shadow-purple-600/25 group/btn mb-2"
        >
          <button 
            onClick={handleAddToCart}
            className="w-full relative py-3.5 px-5 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-white shrink-0" />
            <span>Add to Cart • ${totalPrice.toFixed(2)}</span>
          </button>
        </motion.div>

        <Link
          to={`/product/${product?.slug || product?.id}`}
          className="group/link flex items-center justify-center gap-1 text-xs font-bold text-gray-400 hover:text-purple-700 transition-colors py-1"
        >
          <span>View full details</span>
          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
        </Link>

      </div>
    </motion.div>
  )
}
