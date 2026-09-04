import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, ArrowLeft, Truck, Clock, AlertCircle, PackageCheck, ShieldCheck, MapPin, Phone, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ShippingDelivery() {
  return (
    <>
      <Helmet>
        <title>Shipping & Delivery Policy — QB MASTER</title>
        <meta 
          name="description" 
          content="Shipping and delivery policy for QB MASTER. Fast, insured domestic shipping across the contiguous United States with transparent handling and transit times." 
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
            
            {/* Heading */}
            <div className="border-b border-gray-100 pb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                Shipping & Delivery Policy
              </h1>
              <p className="text-sm text-purple-700 font-semibold">
                Last Updated: August 2026
              </p>
            </div>

            {/* Scope & US Shipping Banner */}
            <div className="bg-purple-50/60 border border-purple-200/60 p-6 rounded-2xl">
              <h2 className="text-lg font-bold text-purple-950 mb-2 flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-600 shrink-0" />
                Domestic US Shipping Policy
              </h2>
              <p className="text-purple-900 text-sm mb-3 leading-relaxed">
                At QB MASTER, all products in our Home & Garden catalog are tangible physical goods packaged and dispatched directly from our verified domestic fulfillment centers. We ship exclusively to physical addresses within the <strong>contiguous United States (USA)</strong>.
              </p>
              <p className="text-xs text-purple-800 mb-4 bg-purple-100/60 p-3 rounded-xl border border-purple-200/70">
                <strong>Delivery Exclusions:</strong> We currently do not fulfill orders to Alaska, Hawaii, US Protectorates, APO/FPO military bases, or international addresses.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold text-purple-900">
                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-purple-100">
                  <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Free Standard Insured Shipping</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-purple-100">
                  <PackageCheck className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Doorstep Courier Tracking Included</span>
                </div>
              </div>
            </div>

            {/* Shipping Estimates Table */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600 shrink-0" />
                Shipping Times & Rates
              </h2>
              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-bold">
                    <tr>
                      <th className="p-4">Shipping Method</th>
                      <th className="p-4">Destination</th>
                      <th className="p-4">Handling Time</th>
                      <th className="p-4">Transit Time</th>
                      <th className="p-4">Shipping Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-4 font-semibold text-gray-900">Standard Insured Delivery</td>
                      <td className="p-4 text-gray-600">United States (Domestic)</td>
                      <td className="p-4 text-gray-600">1 – 2 Business Days (Mon–Fri)</td>
                      <td className="p-4 text-gray-600">3 – 7 Business Days (Mon–Sat)</td>
                      <td className="p-4 font-black text-purple-700">FREE ($0.00)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Cut-Off Time */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Order Cut-Off Time
              </h2>
              <p className="mb-2">
                Orders placed before <strong className="text-gray-900">5:00 PM Eastern Standard Time (EST)</strong>, Monday through Friday, enter order fulfillment and packaging on the same business day.
              </p>
              <p className="text-sm text-gray-500">
                Orders placed after 5:00 PM EST or over weekends/US federal holidays are scheduled for processing the following business day.
              </p>
            </div>

            {/* Tracking Your Order */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600 shrink-0" />
                Tracking Your Order
              </h2>
              <p className="mb-3">
                As soon as your package has been packaged and scanned by our carrier services (FedEx, UPS, or USPS), you will automatically receive an automated shipping confirmation email containing your official tracking number and live tracking portal link.
              </p>
              <p className="text-sm text-gray-500">
                Carrier scans may require up to 24 hours post-dispatch to update their online checkpoint logs.
              </p>
            </div>

            {/* Damaged or Missing Shipments */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                Damaged or Missing Shipments
              </h2>
              <p className="mb-3">
                All domestic parcels are fully insured. If your package arrives damaged or encounters carrier loss:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm mb-4">
                <li>Inspect outer packaging immediately upon delivery.</li>
                <li>Photograph any damaged contents and outer courier shipping labels.</li>
                <li>Reach out to our customer support within 7 days of delivery at <a href="mailto:contact@qbmaster.shop" className="text-purple-700 font-semibold underline">contact@qbmaster.shop</a>.</li>
                <li>We will dispatch a complimentary priority replacement or issue a full refund at no cost to you.</li>
              </ul>
            </div>

            {/* Address Corrections */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Address Changes & Cancellations
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Address modifications or cancellations are accommodated free of charge before fulfillment processing begins. Once a carrier tracking number has been generated, rerouting must follow standard carrier delivery guidelines.
              </p>
            </div>

            {/* Complete Business Contact Details */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Shipping Questions & Business Contact
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                For questions regarding transit updates, address modifications, or carrier assistance, reach out directly to our US operations team:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-gray-900 font-bold">
                    <Building2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Business Address</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    QB MASTER<br />
                    2236 Loftin Rd<br />
                    Denton, NC, 27239-8752, United States
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-gray-900 font-bold">
                    <Phone className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Customer Support</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Phone: <span className="font-semibold text-gray-900">+1 (571) 340-7798</span><br />
                    Email: <a href="mailto:contact@qbmaster.shop" className="font-semibold text-purple-700 underline">contact@qbmaster.shop</a><br />
                    Hours: Mon – Fri: 9:00 AM – 5:00 PM EST
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
