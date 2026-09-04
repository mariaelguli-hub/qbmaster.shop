import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, RotateCcw, HelpCircle, AlertCircle, Mail, PackageCheck, CheckCircle2, Phone, Building2, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function RefundPolicy() {
  return (
    <>
      <Helmet>
        <title>Refund & Return Policy — QB MASTER</title>
        <meta 
          name="description" 
          content="30-day money-back guarantee, free domestic return shipping, and transparent refund policies for QB MASTER home and garden items." 
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
                At QB MASTER, customer satisfaction is our top priority. We stand behind the quality and durability of every home and garden product we dispatch. If you are not completely satisfied with your purchase, you can initiate a return within <strong>30 calendar days of delivery</strong> for a full refund or direct exchange.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-purple-800">
                <span className="flex items-center gap-1.5 bg-white/80 p-2.5 rounded-xl border border-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> $0 Restocking Fees
                </span>
                <span className="flex items-center gap-1.5 bg-white/80 p-2.5 rounded-xl border border-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Free Return Shipping
                </span>
                <span className="flex items-center gap-1.5 bg-white/80 p-2.5 rounded-xl border border-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> 3–5 Day Card Refunds
                </span>
              </div>
            </div>

            {/* Return Fees & Shipping Labels (Crucial for GMC) */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                Return Shipping Fees & Restocking
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                We believe in straightforward, transparent pricing with no hidden deductions:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>
                  <strong>Defective or Damaged Items:</strong> If your product arrives flawed or encounters transit breakage, we provide a prepaid return courier label at <strong>no cost to you ($0.00)</strong>.
                </li>
                <li>
                  <strong>Customer Remorse (Change of Mind):</strong> If you simply change your mind or prefer a different model, we still offer <strong>Free Returns ($0.00)</strong> with prepaid return labels for all domestic US customers.
                </li>
                <li>
                  <strong>Restocking Fees:</strong> We do not charge restocking fees under any circumstances (<strong>$0.00 Restocking Fee</strong>).
                </li>
              </ul>
            </div>

            {/* Damaged or Defective Items */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-purple-600 shrink-0" />
                Damaged, Defective, or Incorrect Deliveries
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                Every shipment is inspected prior to carrier pickup. In the rare event that your product arrives damaged during shipping, defective, or missing components:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
                <li>Send a quick photo or video detailing the issue to <a href="mailto:contact@qbmaster.shop" className="text-purple-700 font-semibold underline">contact@qbmaster.shop</a> within 7 days of package delivery.</li>
                <li>Our operations team will issue an immediate replacement order or authorize a 100% full refund according to your preference.</li>
              </ul>
            </div>

            {/* Step-by-Step Return Instructions */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-600 shrink-0" />
                How to Initiate a Return (By Mail)
              </h2>
              <ol className="list-decimal pl-5 space-y-2.5 text-sm text-gray-600">
                <li>
                  <strong>Request Return:</strong> Email our support desk at <a href="mailto:contact@qbmaster.shop" className="text-purple-700 font-bold underline">contact@qbmaster.shop</a> or call our customer service with your order ID and the item you wish to return.
                </li>
                <li>
                  <strong>Receive Prepaid Label:</strong> Our team will email you a prepaid printable domestic return label (USPS or FedEx) along with your Return Merchandise Authorization (RMA).
                </li>
                <li>
                  <strong>Secure Packaging:</strong> Place the item securely inside its original packaging with all included hardware and accessories.
                </li>
                <li>
                  <strong>Carrier Drop-Off:</strong> Affix the prepaid label to the package exterior and drop it off at any authorized USPS or FedEx location.
                </li>
              </ol>
            </div>

            {/* Official US Return Warehouse Address */}
            <div className="bg-gray-50 border border-gray-200/80 p-5 rounded-2xl">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                Authorized US Return Facility
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                All physical mail returns must be shipped to our designated operations warehouse:<br />
                <strong className="text-gray-900">QB MASTER Returns Department</strong><br />
                2236 Loftin Rd<br />
                Denton, NC 27239-8752<br />
                United States
              </p>
            </div>

            {/* Refund Processing Timeline */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Refund Processing & Payouts
              </h2>
              <p className="text-gray-600 leading-relaxed mb-2 text-sm">
                Once your returned parcel is checked in and verified at our Denton, NC warehouse, your refund will be issued immediately.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Refunds are posted back to the original method of payment (Visa, Mastercard, or PayPal). Payouts typically reflect on your bank or credit card balance within <strong className="text-gray-900">3–5 business days</strong>.
              </p>
            </div>

            {/* Return Conditions & Guidelines */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                Return Guidelines
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Return requests must be submitted within 30 calendar days of documented carrier delivery.</li>
                <li>Items returned due to change of mind must be in new, unused condition with all original hardware and instruction manuals intact.</li>
                <li>Products showing extreme unauthorized structural modifications or missing major assemblies may receive proportional deductions upon warehouse inspection.</li>
              </ul>
            </div>

            {/* Verified Business Contact Details */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Need Help with a Return or Replacement?
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                Our US support staff is standing by to resolve any return queries or product concerns:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-gray-900 font-bold">
                    <Building2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Business Headquarters</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    QB MASTER<br />
                    2236 Loftin Rd<br />
                    Denton, NC 27239-8752<br />
                    United States
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-gray-900 font-bold">
                    <Phone className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Customer Care</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Phone: <span className="font-semibold text-gray-900">+1 (302) 280-9478</span><br />
                    Email: <a href="mailto:contact@qbmaster.shop" className="font-semibold text-purple-700 underline">contact@qbmaster.shop</a><br />
                    Hours: Monday – Friday: 9:00 AM – 5:00 PM EST
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  )
}
