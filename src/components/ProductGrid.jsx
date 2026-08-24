import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products.json'
import ProductCard from './ProductCard'

export default function ProductGrid() {
  const [visibleProducts, setVisibleProducts] = useState([])

  useEffect(() => {
    // جلب قائمة الإعدادات المحفوظة من Dashboard
    const savedVisibility = JSON.parse(localStorage.getItem('qb_products_visibility') || '{}')

    // فلترة المنتجات: إذا كان هناك إعداد يدوي نطبقه، وإلا نعتمد على الحالة الأصلية
    const filtered = (products || []).filter((p) => {
      const slugOrId = p.slug || p.id
      if (savedVisibility[slugOrId] !== undefined) {
        return savedVisibility[slugOrId] === true
      }
      return !p.hidden
    })

    setVisibleProducts(filtered)
  }, [])

  return (
    <section className="py-16 lg:py-24 bg-purple-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-1">
              Choose your QuickBooks Desktop
            </h2>
            <p className="text-gray-500">
              Genuine 2024 editions — one-time purchase, instant delivery.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-purple-600 hover:text-purple-700 font-extrabold text-sm flex items-center gap-1 transition-colors group"
          >
            <span>All products</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>
        
        {visibleProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            No products available at the moment.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
