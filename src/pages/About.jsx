import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, ShieldCheck, Truck, Award, Headphones, Mail, Sparkles, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us — QB MASTER | Premium Home & Garden</title>
        <meta 
          name="description" 
          content="Discover QB MASTER — your premier destination for high-quality home, garden, and outdoor living essentials. Durable craftsmanship, fast insured shipping, and dedicated support." 
        />
      </Helmet>

      <section className="py-12 lg:py-20 bg-purple-50/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-purple-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          {/* Main Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-purple-950/5 border border-purple-100/80 text-gray-700 leading-relaxed space-y-8">
            
            {/* Heading */}
            <div className="border-b border-gray-100 pb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                About QB MASTER
              </h1>
              <p className="text-sm text-purple-700 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Curated Home & Garden Living Essentials
              </p>
            </div>

            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-base text-gray-600 leading-relaxed">
                Welcome to <strong className="text-gray-900">QB MASTER</strong>, your dedicated destination for premium home, garden, and outdoor living solutions. We believe your living space should reflect comfort, style, and long-lasting quality without the inflated retail markups.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                We work directly with vetted manufacturers and craftsmen to curate functional, aesthetically refined, and heavy-duty products engineered for modern everyday life. Every item in our catalog is rigorously checked for durability, safety, and finish before it ever leaves the warehouse.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100">
                <ShieldCheck className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-bold text-gray-900 text-base mb-1">Premium Craftsmanship</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Heavy-duty, weather-resistant, and premium materials designed for long-lasting home use.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100">
                <Truck className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-bold text-gray-900 text-base mb-1">Fast Insured Shipping</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Safe doorstep delivery with live tracking numbers dispatched straight to your inbox.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100">
                <Award className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-bold text-gray-900 text-base mb-1">30-Day Money-Back</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Shop with complete peace of mind backed by our hassle-free satisfaction guarantee.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100">
                <Headphones className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-bold text-gray-900 text-base mb-1">Dedicated Support</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Real human support available 24/7 to assist with orders, tracking, and product inquiries.
                </p>
              </div>

            </div>

            {/* Quality Commitment Box */}
            <div className="bg-purple-50/60 border border-purple-200/70 p-6 rounded-2xl">
              <h2 className="text-base font-bold text-purple-950 mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                Our Quality & Delivery Commitment
              </h2>
              <p className="text-purple-900/90 text-xs sm:text-sm leading-relaxed mt-2">
                Every package is carefully handled with reinforced protective packaging to ensure it arrives at your doorstep in pristine condition. If any product arrives damaged or falls short of your expectations, our support team will promptly arrange a hassle-free replacement or full refund.
              </p>
            </div>

            {/* Contact Support */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Have Questions? We're Here to Help
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                Whether you need tracking assistance, product specifications, or home styling guidance:
              </p>
              <div className="inline-flex items-center gap-2 p-3.5 bg-purple-50 rounded-xl text-purple-900 font-semibold text-sm border border-purple-200/60">
                <Mail className="w-4 h-4 text-purple-600" />
                <span>Email: <a href="mailto:contact@qbmaster.shop" className="underline hover:text-purple-700">contact@qbmaster.shop</a></span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
