import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ProductCard from '../components/ProductCard'
import productsData from '../data/csvProducts.json'

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState('')

  const products = Array.isArray(productsData) ? productsData : []

  const filteredProducts = products.filter((product) => {
    const title = (product.title || product.name || '').toLowerCase()
    return title.includes(searchTerm.toLowerCase())
  })

  return (
    <>
      <Helmet>
        <title>All Products — QB MASTER</title>
        <meta 
          name="description" 
          content="Explore our full collection of premium home and garden essentials with fast US shipping." 
        />
      </Helmet>

      <section className="py-12 bg-gray-50/50 min-h-screen font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Home & Garden Catalog
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Browse our curated collection of durable, weather-resistant living essentials.
            </p>

            {/* Search Input */}
            <div className="mt-6 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-600 bg-white text-sm shadow-xs"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 text-gray-500 text-sm">
              No products found matching your search.
            </div>
          )}

        </div>
      </section>
    </>
  )
}
