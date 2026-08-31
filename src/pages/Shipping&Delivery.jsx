import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, ArrowLeft, Truck, Clock, AlertCircle, PackageCheck, ShieldCheck, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ShippingDelivery() {
  return (
    <>
      <Helmet>
        <title>Shipping & Delivery Policy — QB MASTER</title>
        <meta 
          name="description" 
          content="Shipping and delivery policy for QB MASTER. Learn about our handling times, transit times, shipping rates, and tracking for physical home & garden goods." 
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
                Shipping & Delivery Policy
              </h1>
              <p className="text-sm text-purple-700 font-semibold">
                Last Updated: August 2026
              </p>
            </div>

            {/* Free Insured Shipping Banner */}
            <div className="bg-purple-50/60 border border-purple-200/60 p-6 rounded-2xl">
              <h2 className="text-lg font-bold text-purple-950 mb-2 flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-600 shrink-0" />
                Fast & Insured Doorstep Shipping
              </h2>
              <p className="text-purple-900 text-sm mb-3 leading-relaxed">
                At QB MASTER, all items in our Home & Garden catalog are physical products safely packaged and shipped directly to your residential or commercial address. Every order is 100% insured against loss or transit damage.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-purple-900">
                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-purple-100">
                  <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Free Standard Insured Shipping</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-purple-100">
                  <PackageCheck className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Real-Time Online Tracking</span>
                </div>
              </div>
            </div>

            {/* Shipping Estimates & Timeline Table */}
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
                      <th className="p-4">Handling Time</th>
                      <th className="p-4">Transit Time</th>
                      <th className="p-4">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-4 font-semibold text-gray-900">Standard Insured Delivery</td>
                      <td className="p-4 text-gray-600">1 – 2 Business Days (Mon–Fri)</td>
                      <td className="p-4 text-gray-600">3 – 7 Business Days (Mon–Sat)</td>
                      <td className="p-4 font-black text-purple-700">FREE</td>
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
                Orders placed before <strong className="text-gray-900">5:00 PM Eastern Standard Time (EST)</strong>, Monday through Friday, will begin handling and processing on the same business day.
              </p>
              <p className="text-sm text-gray-500">
                Orders placed after 5:00 PM EST or over weekends/public holidays will be processed the following business day.
              </p>
            </div>

            {/* Order Tracking */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600 shrink-0" />
                Tracking Your Order
              </h2>
              <p className="mb-3">
                As soon as your package has been inspected and picked up by our courier service (such as FedEx, UPS, or USPS), you will automatically receive an email confirmation with your unique tracking number and direct tracking link.
              </p>
              <p className="text-sm text-gray-500">
                Please allow up to 24 hours for carrier tracking updates to register in their online system after dispatch.
              </p>
            </div>

            {/* Damaged or Lost Packages */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                Damaged or Missing Shipments
              </h2>
              <p className="mb-3">
                Your satisfaction and peace of mind are guaranteed. If your order arrives damaged or is lost in transit:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm mb-4">
                <li>Inspect your parcel upon delivery.</li>
                <li>If the product is damaged, take a quick photo of the item and its packaging.</li>
                <li>Contact our support team within 7 days of delivery at <a href="mailto:contact@qbmaster.shop" className="text-purple-700 font-semibold underline">contact@qbmaster.shop</a>.</li>
                <li>We will immediately arrange a free express replacement or issue a full refund.</li>
              </ul>
            </div>

            {/* Address Corrections */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Address Changes & Cancellations
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                If you notice an error in your shipping address after placing an order, please email us immediately. We can update shipping addresses or cancel orders freely before the shipment is dispatched from our fulfillment center.
              </p>
            </div>

            {/* Contact Support */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Need Help with a Shipment?
              </h2>
              <p className="mb-3 text-sm text-gray-600">
                If you have questions regarding shipping status, delivery addresses, or transit times:
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
