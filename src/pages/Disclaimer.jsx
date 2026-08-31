import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, ArrowLeft, ShieldAlert, Info, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Disclaimer() {
  return (
    <>
      <Helmet>
        <title>Disclaimer — QB MASTER</title>
        <meta 
          name="description" 
          content="Legal disclaimer and product usage notice for QB MASTER home and garden store." 
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
                Disclaimer
              </h1>
              <p className="text-sm text-purple-700 font-semibold">
                Last Updated: August 2026
              </p>
            </div>

            {/* General Overview */}
            <div>
              <p className="text-base text-gray-600 leading-relaxed">
                The information provided by <strong className="text-gray-900">QB MASTER</strong> on our website is for general informational and shopping purposes only. All physical home, garden, and hardware products are sold in good faith; however, we make no representation or warranty of any kind regarding suitability for non-intended or commercial-grade industrial usage.
              </p>
            </div>

            {/* Product Color & Dimension Accuracy */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-purple-600 shrink-0" />
                Product Representation & Sizing
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                We make every effort to display the colors, textures, dimensions, and materials of our products as accurately as possible. However, actual item colors may vary slightly depending on monitor display settings, room lighting conditions, and manufacturing batch variations.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Measurements and weights provided in product descriptions are approximate and intended as a helpful guide for fitting your home or garden space.
              </p>
            </div>

            {/* Safe Usage & Assembly Notice */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                Assembly & Safe Product Usage
              </h2>
              <div className="bg-amber-50/60 border border-amber-200/60 p-5 rounded-2xl text-amber-950 text-sm leading-relaxed space-y-2">
                <p>
                  Customers are responsible for following all manufacturer assembly manuals, hardware fastening instructions, and safe handling procedures provided with physical items.
                </p>
                <p className="text-xs text-amber-900 font-medium">
                  QB MASTER is not liable for damages or injuries resulting from improper assembly, unauthorized item modification, overloading, or using outdoor products outside their intended environmental ratings.
                </p>
              </div>
            </div>

            {/* Brand Names & Third-Party Trademarks */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-purple-600 shrink-0" />
                Trademarks & Brand References
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                All third-party brand names, hardware trademarks, and registered logos referenced across this store remain the exclusive property of their respective owners.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Any reference to specific fittings, standards, or compatibility is strictly descriptive and does not imply endorsement, affiliation, or direct sponsorship by those respective trademark holders.
              </p>
            </div>

            {/* Contact Information */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Questions Regarding This Disclaimer?
              </h2>
              <p className="mb-3 text-sm text-gray-600">
                If you need product specifications, safety instructions, or clarification on our terms:
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
