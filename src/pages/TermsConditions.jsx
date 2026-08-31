import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, CheckCircle, RotateCcw, Mail, ShoppingBag, Truck, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TermsConditions() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions — QB MASTER</title>
        <meta 
          name="description" 
          content="Terms and Conditions for purchasing home and garden products on QB MASTER. Review our order, shipping, return, and payment terms." 
        />
      </Helmet>

      <section className="py-12 lg:py-20 bg-purple-50/20 font-sans">
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
            
            {/* H1 Heading */}
            <div className="border-b border-gray-100 pb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                Terms & Conditions
              </h1>
              <p className="text-sm text-purple-700 font-semibold">
                Last Updated: August 2026
              </p>
            </div>

            {/* Agreement / Overview */}
            <div>
              <p className="text-base text-gray-600 leading-relaxed">
                Welcome to <strong className="text-gray-900">QB MASTER</strong>. By browsing our website, placing an order, or purchasing physical home and garden goods from our store, you acknowledge that you have read, understood, and agreed to be bound by the terms and conditions outlined below.
              </p>
            </div>

            {/* Orders & Purchases */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-purple-600 shrink-0" />
                Orders & Product Availability
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                All orders placed through our website represent an offer to purchase physical goods subject to acceptance and item availability. We reserve the right to verify, limit, or refuse orders if billing discrepancies or stock shortages occur.
              </p>
              <p className="text-sm text-gray-500">
                Prices and promotional offers are clearly stated in US Dollars (USD) and are subject to change without prior notice.
              </p>
            </div>

            {/* Product Quality & Descriptions */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0" />
                Product Descriptions & Quality
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We make every effort to display the dimensions, specifications, materials, and colors of our home & garden items as accurately as possible. Each item is constructed from durable materials and inspected prior to dispatch to meet our strict quality standards.
              </p>
            </div>

            {/* Shipping & Delivery Terms */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-600 shrink-0" />
                Shipping & Delivery
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Orders are physically dispatched to the shipping address supplied during checkout. Standard order handling takes 1–2 business days, and transit typically takes 3–7 business days via tracked carrier services.
              </p>
              <p className="text-sm text-gray-500">
                Risk of loss transfers to the customer once delivery is confirmed by the carrier tracking service, provided the shipment was fulfilled to the provided address.
              </p>
            </div>

            {/* Refund & Return Policy */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-purple-600 shrink-0" />
                30-Day Return & Refund Policy
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                We stand behind our catalog with a 30-day money-back guarantee. If you are not satisfied with your item or if it arrives defective or damaged during transit, you may request a return, exchange, or full refund within 30 days of parcel delivery.
              </p>
              <p className="text-sm text-gray-500">
                Returned items must include all original parts, hardware, and protective packaging. Damaged transit claims should be accompanied by clear photo documentation for prompt resolution.
              </p>
            </div>

            {/* Secure Payments */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600 shrink-0" />
                Secure Payment Processing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Payments made via credit card, debit card, or PayPal are handled through secure, PCI-compliant payment gateways with 256-bit SSL encryption. We never store or view your full payment credentials.
              </p>
            </div>

            {/* Contact Support */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Questions Regarding Our Terms?
              </h2>
              <p className="mb-3 text-sm text-gray-600">
                If you need clarification on our terms, order policies, or warranty terms, please contact our support team:
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
