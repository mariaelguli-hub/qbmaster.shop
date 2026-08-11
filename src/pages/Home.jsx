import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import TrustBadges from '../components/TrustBadges'
import Features from '../components/Features'
import ProductGrid from '../components/ProductGrid'
import HowItWorks from '../components/HowItWorks'
import ComparisonTable from '../components/ComparisonTable'
import Testimonials from '../components/Testimonials'
import FAQAccordion from '../components/FAQAccordion'
import CTASection from '../components/CTASection'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>QB MASTER — Genuine QuickBooks Desktop Licenses | One-Time Payment</title>
        <meta name="description" content="Buy genuine QuickBooks Desktop 2024 licenses with one-time payment. Instant email delivery, 30-day money-back guarantee. No subscription." />
      </Helmet>

      <main className="bg-white text-gray-900 selection:bg-purple-500 selection:text-white">
        <Hero />
        <TrustBadges />
        <Features />
        
        {/* 🎯 قسم المنتجات مع معرف السكرول */}
        <div id="products" className="scroll-mt-20">
          <ProductGrid />
        </div>

        <HowItWorks />
        <ComparisonTable />
        <Testimonials />
        <FAQAccordion />
        <CTASection />
      </main>
    </>
  )
}
