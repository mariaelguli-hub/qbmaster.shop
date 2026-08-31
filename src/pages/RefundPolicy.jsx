import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, RotateCcw, HelpCircle, AlertCircle, Mail, PackageCheck, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function RefundPolicy() {
  return (
    <>
      <Helmet>
        <title>Refund & Return Policy — QB MASTER</title>
        <meta 
          name="description" 
          content="30-day money-back guarantee and hassle-free return policy for QB MASTER home and garden products." 
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
                Return & Refund Policy
              </h1>
              <p className="text-sm text-purple-700 font-semibold">
                Last Updated: August 2026
              </p>
            </div>

            {/* Overview / Guarantee Banner */}
            <div className="bg-purple-50/60 border border-purple-200/60 p-6 rounded-2xl">
              <h2 className="text-lg font-bold text-purple-950 mb-2 flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-purple-600 shrink-0" />
                30-Day Risk-Free Money-Back Guarantee
              </h2>
              <p className="text-purple-900 text-sm leading-relaxed mb-3">
                At QB MASTER, customer satisfaction is our top priority. We stand behind the quality and durability of every home and garden product we ship. If you are not completely satisfied with your order, you can return it within <strong>30 days of delivery</strong> for a replacement or a full refund.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-purple-800">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" /> No Restocking Fees
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" /> Fast 3–5 Day Processing
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" /> 100% Insured Delivery
                </span>
              </div>
            </div>

            {/* Damaged or Defective Items */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-purple-600 shrink-0" />
                Damaged, Defective, or Incorrect Items
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Every order is carefully inspected and packaged in protective boxes before departure. In the rare event that your product arrives damaged during transit, defective, or missing parts:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600 mb-3">
                <li>Send us a photo or short video showing the issue along with your order number.</li>
                <li>We will immediately send an expedited free replacement or issue a 100% full refund at no extra cost to you.</li>
                <li>You will not be charged any return shipping fee for damaged or defective products.</li>
              </ul>
            </div>

            {/* How to Request a Return or Refund */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-600 shrink-0" />
                How to Initiate a Return
              </h2>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600 mb-4">
                <li>
                  <strong>Contact Support:</strong> Email us at <a href="mailto:contact@qbmaster.shop" className="text-purple-700 font-bold underline">contact@qbmaster.shop</a> with your order number and the reason for return.
                </li>
                <li>
                  <strong>Receive Instructions:</strong> Our support team will respond within 24 hours with return instructions and the return warehouse address.
                </li>
                <li>
                  <strong>Pack & Ship:</strong> Securely package the item in its original box with all included parts and accessories.
                </li>
              </ol>
            </div>

            {/* Refund Processing Timeline */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Refund Processing Timeline
              </h2>
              <p className="text-gray-600 leading-relaxed mb-2 text-sm">
                Once your returned item is received and inspected at our warehouse (or once a transit damage claim is verified), your refund will be processed immediately.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                The funds will automatically be applied back to your original payment method (Credit Card, Debit Card, or PayPal) within <strong className="text-gray-900">3–5 business days</strong> depending on your card issuer.
              </p>
            </div>

            {/* Return Conditions & Exceptions */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                Return Conditions & Guidelines
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Items must be initiated for return within 30 calendar days from the official carrier delivery date.</li>
                <li>Standard returns (buyer remorse or change of mind) must be in new, unused condition with all original hardware, parts, and manuals included.</li>
                <li>Items returned missing substantial components or with heavy unauthorized physical modifications may be subject to partial deductions.</li>
              </ul>
            </div>

            {/* Contact Support */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Need Help with a Return?
              </h2>
              <p className="mb-3 text-sm text-gray-600">
                Our support team is available 24/7 to assist with returns, warranty replacements, and refunds:
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
