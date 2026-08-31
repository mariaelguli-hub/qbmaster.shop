import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, Lock, RotateCcw, Truck } from 'lucide-react'

// 🔢 Component لحساب الأرقام بـ Smooth Animation
function AnimatedNumber({ target, decimals = 0, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    let animationFrameId

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / 2000, 1) // مدة الأنيميشن: 2 ثواني
      
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(easeOut * target)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default function TrustBadges() {
  return (
    <section className="py-12 bg-gradient-to-b from-white via-purple-50/20 to-white border-y border-purple-100/60 relative overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[150px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 🔢 4 Big Numbers Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
          
          {/* Card 1: 100% Quality */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0 }}
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:shadow-xl hover:shadow-purple-950/5 hover:border-purple-500/30 transition-all duration-300 text-center group"
          >
            <div className="text-3xl sm:text-4xl font-black text-purple-600 group-hover:scale-105 transition-transform font-mono tracking-tight mb-1">
              <AnimatedNumber target={100} suffix="%" />
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-gray-600 group-hover:text-purple-900 transition-colors">
              Premium Quality
            </div>
          </motion.div>

          {/* Card 2: 4.9★ Rating */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:shadow-xl hover:shadow-purple-950/5 hover:border-purple-500/30 transition-all duration-300 text-center group"
          >
            <div className="text-3xl sm:text-4xl font-black text-purple-600 group-hover:scale-105 transition-transform font-mono tracking-tight mb-1">
              <AnimatedNumber target={4.9} decimals={1} suffix="★" />
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-gray-600 group-hover:text-purple-900 transition-colors">
              Customer Rating
            </div>
          </motion.div>

          {/* Card 3: 1,500+ Happy Homes */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:shadow-xl hover:shadow-purple-950/5 hover:border-purple-500/30 transition-all duration-300 text-center group"
          >
            <div className="text-3xl sm:text-4xl font-black text-purple-600 group-hover:scale-105 transition-transform font-mono tracking-tight mb-1">
              <AnimatedNumber target={1500} suffix="+" />
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-gray-600 group-hover:text-purple-900 transition-colors">
              Happy Homes
            </div>
          </motion.div>

          {/* Card 4: 24/7 Support */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:shadow-xl hover:shadow-purple-950/5 hover:border-purple-500/30 transition-all duration-300 text-center group"
          >
            <div className="text-3xl sm:text-4xl font-black text-purple-600 group-hover:scale-105 transition-transform font-mono tracking-tight mb-1">
              24/7
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-gray-600 group-hover:text-purple-900 transition-colors">
              Dedicated Support
            </div>
          </motion.div>

        </div>

        {/* 🛡️ Middle Bar: Security Badges + Authentic Payment Logos */}
        <div className="pt-6 border-t border-gray-200/60 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-bold text-gray-700">
            <span className="flex items-center gap-1.5 hover:text-purple-700 transition-colors">
              <Lock className="w-4 h-4 text-purple-600 shrink-0" /> SSL Secured
            </span>
            <span className="flex items-center gap-1.5 hover:text-purple-700 transition-colors">
              <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" /> Secure Payment
            </span>
            <span className="flex items-center gap-1.5 hover:text-purple-700 transition-colors">
              <RotateCcw className="w-4 h-4 text-purple-600 shrink-0" /> 30-Day Money-Back
            </span>
            <span className="flex items-center gap-1.5 hover:text-purple-700 transition-colors">
              <Truck className="w-4 h-4 text-purple-600 shrink-0" /> Fast Insured Shipping
            </span>
          </div>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-xs font-bold text-gray-400 mr-1 hidden sm:inline">We accept:</span>
            
            {/* VISA */}
            <div className="h-8 px-3 bg-white border border-gray-200/80 rounded-xl flex items-center justify-center shadow-2xs">
              <span className="font-black italic text-[#1A1F71] text-xs sm:text-sm tracking-tighter select-none font-sans">
                VISA
              </span>
            </div>

            {/* Mastercard */}
            <div className="h-8 px-3 bg-white border border-gray-200/80 rounded-xl flex items-center justify-center shadow-2xs">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                alt="Mastercard" 
                className="h-4 w-auto object-contain"
              />
            </div>

            {/* PayPal */}
            <div className="h-8 px-3 bg-white border border-gray-200/80 rounded-xl flex items-center justify-center shadow-2xs">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
                alt="PayPal" 
                className="h-3.5 w-auto object-contain"
              />
            </div>

            {/* Apple Pay */}
            <div className="h-8 px-3 bg-white border border-gray-200/80 rounded-xl flex items-center justify-center shadow-2xs">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" 
                alt="Apple Pay" 
                className="h-3.5 w-auto object-contain"
              />
            </div>

            {/* Google Pay */}
            <div className="h-8 px-3 bg-white border border-gray-200/80 rounded-xl flex items-center justify-center shadow-2xs">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" 
                alt="Google Pay" 
                className="h-3.5 w-auto object-contain"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
