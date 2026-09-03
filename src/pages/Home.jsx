import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import TrustBadges from '../components/TrustBadges'
import Features from '../components/Features'
import ProductGrid from '../components/ProductGrid'
import FAQAccordion from '../components/FAQAccordion'
import CTASection from '../components/CTASection'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>QB MASTER — Premium Home & Garden Essentials</title>
        <meta 
          name="description" 
          content="Discover premium home and garden essentials. Fast domestic US shipping, high-grade materials, and transparent 30-day returns." 
        />
      </Helmet>

      <main className="bg-white text-gray-900 selection:bg-purple-500 selection:text-white">
        <Hero />
        <TrustBadges />
        <Features />
        
        {/* قسم المنتجات المتاح للمراجعة */}
        <div id="products" className="scroll-mt-20">
          <ProductGrid />
        </div>

        <FAQAccordion />
        <CTASection />
      </main>
    </>
  )
}
