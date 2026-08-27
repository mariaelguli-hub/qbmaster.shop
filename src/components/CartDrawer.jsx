import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Lock } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const navigate = useNavigate()
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    totalItemsCount
  } = useCart()

  const handleProceedToCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          
          {/* Overlay الخلفية المعتمة */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
            >
              
              {/* Header */}
              <div className="p-5 bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-purple-600/50 rounded-xl border border-purple-400/30">
                    <ShoppingBag className="w-5 h-5 text-purple-200" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-base leading-tight">Your Cart</h2>
                    <p className="text-xs text-purple-200/80">
                      {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeCart}
                  className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-4 border border-purple-100 shadow-inner">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>
                    <h3 className="text-base font-extrabold text-gray-900 mb-1">Your cart is empty</h3>
                    <p className="text-xs text-gray-500 max-w-xs mb-6">
                      Explore our products and find the perfect essentials for your home.
                    </p>
                    <button
                      onClick={closeCart}
                      className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-3 px-5 rounded-xl transition-all shadow-md shadow-purple-600/20 cursor-pointer active:scale-95"
                    >
                      <span>Start Shopping</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3.5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl border border-gray-100 bg-gray-50 shrink-0"
                        onError={(e) => {
                          e.target.src = `https://placehold.co/100x100/6d28d9/ffffff?text=${encodeURIComponent(item.category || 'Product')}`
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-xs text-gray-900 truncate mb-0.5">
                          {item.name}
                        </h4>
                        
                        {item.variant?.label && (
                          <span className="inline-block text-[10px] text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100 mb-1.5 truncate max-w-full">
                            {item.variant.label}
                          </span>
                        )}

                        <div className="flex items-center justify-between mt-1">
                          <span className="font-black text-xs text-purple-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>

                          {/* التحكم بالكمية */}
                          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              className="p-1 hover:bg-white rounded text-gray-600 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-gray-800">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="p-1 hover:bg-white rounded text-gray-600 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* زر الحذف */}
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout Section */}
              {cartItems.length > 0 && (
                <div className="p-5 bg-white border-t border-gray-100 shadow-lg space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span className="font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-500">
                      <span>Shipping</span>
                      <span className="font-bold text-emerald-600 uppercase text-[11px]">Free Shipping</span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                      <span className="font-extrabold text-gray-900">Total</span>
                      <span className="font-black text-lg text-purple-900">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* زر Proceed to Checkout */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleProceedToCheckout}
                    className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-purple-600/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
                  >
                    <Lock className="w-4 h-4 text-purple-200" />
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 text-purple-200 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    <span>Guaranteed 256-Bit Secure Checkout</span>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
