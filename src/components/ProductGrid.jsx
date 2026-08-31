import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products.json'
import { fetchCsvProducts } from '../utils/loadHiddenProducts'
import { supabase } from '../utils/supabase'
import ProductCard from './ProductCard'

export default function ProductGrid() {
  const [visibleProducts, setVisibleProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAllProducts = async () => {
      setLoading(true)

      // 1. جلب منتجات الـ CSV (Physical)
      let csvProds = []
      try {
        csvProds = await fetchCsvProducts()
      } catch (err) {
        console.error('Failed to load CSV products', err)
      }

      // 2. ضبط الافتراضي: Physical (CSV) كيبان، والـ Digital (JSON) كيتخبى
      const allCombined = [
        ...(csvProds || []).map(p => ({ ...p, hidden: false, isPhysical: true })),
        ...(products || []).map(p => ({ ...p, hidden: true, isPhysical: false }))
      ]

      // 3. قراءة الإعدادات المحفوظة من Supabase
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
          // Backup fallback من الـ localStorage إيلا مكانش نت
          visibilityMap = JSON.parse(localStorage.getItem('qb_products_visibility') || '{}')
        }
      } catch (e) {
        console.error('Error fetching visibility settings:', e)
      }

      // 4. فلترة المنتجات حسب إعدادات الـ Admin
      const filtered = allCombined.filter((p) => {
        const slugOrId = p.slug || p.id
        if (visibilityMap[slugOrId] !== undefined) {
          return visibilityMap[slugOrId] === true
        }
        // إيلا ما كاينش تعديل، عرض فقط المنتجات الفيزيائية
        return !p.hidden
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
              Featured Products
            </h2>
            <p className="text-gray-500">
              Quality home, garden & Garden products — Fast shipping.
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
            No products visible on Home. Turn on "Show on Home" from Admin Dashboard.
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
