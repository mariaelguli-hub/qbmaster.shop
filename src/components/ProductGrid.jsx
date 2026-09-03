import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import productsData from '../data/csvProducts.json'
import { supabase } from '../utils/supabase'
import ProductCard from './ProductCard'

export default function ProductGrid() {
  const [visibleProducts, setVisibleProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAllProducts = async () => {
      setLoading(true)

      const allProducts = Array.isArray(productsData) ? productsData : []

      // قراءة إعدادات الرؤية من Supabase للتحكم فما يظهر فالواجهة
      let visibilityMap = {}
      try {
        const { data } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'qb_products_visibility')
          .maybeSingle()

        if (data && data.value) {
          visibilityMap = data.value
        } else {
          visibilityMap = JSON.parse(localStorage.getItem('qb_products_visibility') || '{}')
        }
      } catch (e) {
        console.error('Error fetching visibility settings:', e)
      }

      // فلترة المنتجات حسب رغبتك فـ لوحة التحكم
      const filtered = allProducts.filter((p) => {
        const slugOrId = p.slug || p.id
        if (visibilityMap[slugOrId] !== undefined) {
          return visibilityMap[slugOrId] === true
        }
        return true // افتراضياً معروض للزبون
      })

      setVisibleProducts(filtered)
      setLoading(false)
    }

    loadAllProducts()
  }, [])

  return (
    <section className="py-16 lg:py-24 bg-purple-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-1">
              Featured Essentials
            </h2>
            <p className="text-gray-500 text-sm">
              Premium home, living & garden essentials — Fast domestic US shipping.
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

        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            Loading products...
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            No products visible on Home. Turn on "Show on Store" from Admin Dashboard.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.slug || product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
