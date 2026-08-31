import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import products from '../data/products.json'
import { fetchCsvProducts } from '../utils/loadHiddenProducts'
import { supabase } from '../utils/supabase'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [visibleProducts, setVisibleProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAllProducts = async () => {
      setLoading(true)

      // 1. جلب منتجات الـ CSV الفيزيائية
      let csvProds = []
      try {
        csvProds = await fetchCsvProducts()
      } catch (err) {
        console.error('Failed to load CSV products', err)
      }

      // 2. ضبط الافتراضي: Physical (CSV) ظاهر، والـ Digital (JSON) مخفي
      const allCombined = [
        ...(csvProds || []).map(p => ({ ...p, hidden: false, isPhysical: true })),
        ...(products || []).map(p => ({ ...p, hidden: true, isPhysical: false }))
      ]

      // 3. قراءة الإعدادات من Supabase (مع نسخة احتياطية من localStorage)
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
        visibilityMap = JSON.parse(localStorage.getItem('qb_products_visibility') || '{}')
      }

      // 4. تصفية المنتجات حسب ما تم تحديده في الداشبورد
      const available = allCombined.filter((p) => {
        const slugOrId = p.slug || p.id
        if (visibilityMap[slugOrId] !== undefined) {
          return visibilityMap[slugOrId] === true
        }
        return !p.hidden
      })

      setVisibleProducts(available)
      setLoading(false)
    }

    loadAllProducts()
  }, [])

  // استخراج التصنيفات تلقائياً من المنتجات الفيزيائية المعروضة
  const availableCategories = [
    'all',
    ...Array.from(new Set(visibleProducts.map(p => p.category?.trim()).filter(Boolean)))
  ]

  const filtered = activeCategory === 'all'
    ? visibleProducts
    : visibleProducts.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase())

  return (
    <>
      <Helmet>
        <title>Shop Home & Garden — QBMASTER</title>
        <meta 
          name="description" 
          content="Explore our complete catalog of premium home, garden, and hardware essentials. Built for durability with fast insured shipping." 
        />
      </Helmet>

      <section className="py-12 lg:py-20 bg-purple-50/20 min-h-[70vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
              Home & Garden Collection
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Carefully curated tools, equipment, and living upgrades with fast delivery to your door.
            </p>
          </div>

          {/* فلتر التصنيفات الديناميكي (كيظهر فقط إذا كانت المنتجات تحتوي على تصنيفات متعددة) */}
          {availableCategories.length > 2 && (
            <div className="flex flex-wrap gap-2.5 mb-10">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize shadow-xs ${
                    activeCategory === cat
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25 ring-2 ring-purple-600/20'
                      : 'bg-white text-gray-600 border border-gray-200/90 hover:border-purple-300 hover:bg-purple-50/30'
                  }`}
                >
                  {cat === 'all' ? 'All Products' : cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="text-center py-20 text-gray-400 text-sm">
              Loading catalog...
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.slug || product.id} product={product} />
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500 bg-white rounded-3xl border border-purple-100 shadow-sm p-8">
              <p className="font-semibold">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
