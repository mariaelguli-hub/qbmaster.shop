import React from 'react'
import { ShoppingBag, CreditCard, Truck, Home, Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    icon: ShoppingBag,
    title: 'Choose your essentials',
    desc: 'Browse our collection of premium home & garden items built for long-lasting quality.',
    tag: 'Step 1'
  },
  {
    num: '02',
    icon: CreditCard,
    title: 'Secure checkout',
    desc: 'Pay safely with major debit/credit cards or PayPal through end-to-end encryption.',
    tag: 'Step 2'
  },
  {
    num: '03',
    icon: Truck,
    title: 'Fast tracked dispatch',
    desc: 'Your package is inspected, packed carefully, and shipped with live doorstep tracking.',
    tag: 'Shipped'
  },
  {
    num: '04',
    icon: Home,
    title: 'Doorstep delivery & enjoy',
    desc: 'Receive your order safely at your door, backed by our 30-day money-back guarantee.',
    tag: 'Delivered'
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-purple-50/30 via-white to-purple-50/30 relative overflow-hidden">
      
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header Badge & Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/60 text-purple-700 text-xs font-black uppercase tracking-widest mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span>Simple 4-Step Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
            How it works
          </h2>
          
          <p className="text-gray-500 text-base sm:text-lg font-medium leading-relaxed">
            From ordering to doorstep delivery in four simple steps.
          </p>
        </motion.div>

        {/* 🚀 4 Steps Grid with Modern Connecting Stepper */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white p-7 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-2xl hover:shadow-purple-950/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Glowing Number Badge & Icon Header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    
                    {/* Animated Icon Box */}
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative p-3.5 bg-gradient-to-br from-purple-50 to-purple-100/60 text-purple-700 rounded-2xl border border-purple-200/60 shadow-xs group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    </div>

                    {/* Step Big Number */}
                    <span className="text-3xl font-black text-gray-200 group-hover:text-purple-600/30 transition-colors font-mono tracking-tighter">
                      {step.num}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-extrabold text-gray-900 text-lg mb-2 group-hover:text-purple-700 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Step Indicator Footer */}
                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-black text-purple-700 uppercase tracking-wider bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200/40">
                    {step.tag}
                  </span>

                  {idx < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  )}
                </div>

                {/* Bottom Subtle Purple Line Accent */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            )
          })}

        </div>

      </div>
    </section>
  )
}
