import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, ShieldCheck, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — QB MASTER</title>
        <meta name="description" content="Privacy Policy for QB MASTER explaining how we collect and protect your data." />
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
                Privacy Policy
              </h1>
              <p className="text-sm text-purple-700 font-semibold">
                Last Updated: August 2, 2026
              </p>
            </div>

            {/* Introduction */}
            <div>
              <p className="text-base text-gray-600 leading-relaxed">
                Your privacy matters to us. This Privacy Policy explains how we collect, use, and safeguard your personal information when you interact with QB MASTER.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0" />
                Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We collect personal information that you voluntarily provide, including your name, email address, and payment details when you place an order with us.
              </p>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use the information you provide to process your orders, deliver your license keys, assist you with customer support, and keep you informed about your purchases and order status.
              </p>
            </div>

            {/* Security */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement industry-standard security practices and encryption technologies to help protect your personal information from unauthorized access, disclosure, or misuse.
              </p>
            </div>

            {/* Contact Support */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Contact Support
              </h2>
              <p className="mb-3 text-sm text-gray-600">
                If you have any questions regarding our Privacy Policy, please reach out to us:
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
