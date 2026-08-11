import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, FileText, CheckCircle, RotateCcw, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TermsConditions() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions — QB MASTER</title>
        <meta name="description" content="Terms and Conditions for purchasing software licenses on QB MASTER." />
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

          {/* Main Card / Cadre */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-purple-950/5 border border-purple-100/80 text-gray-700 leading-relaxed space-y-8">
            
            {/* H1 Heading */}
            <div className="border-b border-gray-100 pb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                Terms & Conditions
              </h1>
              <p className="text-sm text-purple-700 font-semibold">
                Last Updated: August 2, 2026
              </p>
            </div>

            {/* Agreement / Overview */}
            <div>
              <p className="text-base text-gray-600 leading-relaxed">
                By accessing or using QB MASTER, you acknowledge that you have read, understood, and agreed to be bound by the terms and conditions of this agreement.
              </p>
            </div>

            {/* License */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600 shrink-0" />
                License
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All software licenses sold by QB MASTER are genuine, valid, and intended for perpetual use on the specified number of devices or users, as stated in the product description.
              </p>
            </div>

            {/* Refund Policy */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-purple-600 shrink-0" />
                Refund Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We offer a 30-day money-back guarantee. If your license fails to activate as described, please contact us within 30 days to request a full refund.
              </p>
            </div>

            {/* Contact Support */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Contact Support
              </h2>
              <p className="mb-3 text-sm text-gray-600">
                If you have any questions regarding our Terms & Conditions, please contact us:
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
