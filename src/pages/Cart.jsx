import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowRight, Sparkles } from 'lucide-react'

export default function Cart() {
  return (
    <>
      <Helmet>
        <title>Your Cart — QB MASTER</title>
        <meta name="description" content="View your cart and proceed to secure checkout for your QuickBooks Desktop license." />
      </Helmet>

      <section className="py-16 lg:py-24 bg-purple-50/20 min-h-[65vh] flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-100 shadow-xl shadow-purple-950/5 max-w-lg mx-auto">
            
            {/* Animated Shopping Cart Circle */}
            <div className="relative w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-100/80 shadow-inner">
              <ShoppingCart className="w-9 h-9 text-purple-600" />
              <span className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 tracking-tight">
              Your cart is empty
            </h1>
            
            <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed">
              Looks like you haven't added any QuickBooks licenses yet. Explore our genuine 2024 editions with instant email delivery.
            </p>

            <Link 
              to="/shop" 
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
            >
              <span>Browse Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>

        </div>
      </section>
    </>
  )
}
