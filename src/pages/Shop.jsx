import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import products from '../data/products.json'
import categories from '../data/categories.json'
import { fetchCsvProducts } from '../utils/loadHiddenProducts'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [visibleProducts, setVisibleProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAllProducts = async () => {
      setLoading(true)

      let csvProds = []
      try {
        csvProds = await fetchCsvProducts()
      } catch (err) {
        console.error('Failed to load CSV products', err)
      }

      // دمج جميع المنتجات (JSON + CSV)
      const allCombined = [
        ...(products || []).map(p => ({ ...p, hidden: !!p.hidden })),
        ...(csvProds || []).map(p => ({ ...p, hidden: true }))
      ]

      const savedVisibility = JSON.parse(localStorage.getItem('qb_products_visibility') || '{}')

      const available = allCombined.filter((p) => {
        const slugOrId = p.slug || p.id
        if (savedVisibility[slugOrId] !== undefined) {
          return savedVisibility[slugOrId] === true
        }
        return !p.hidden
      })

      setVisibleProducts(available)
      setLoading(false)
    }

    loadAllProducts()
  }, [])

  const filtered = activeCategory === 'all'
    ? visibleProducts
    : visibleProducts.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase())

  return (
    <>
      <Helmet>
        <title>Shop — QBMASTER</title>
        <meta name="description" content="Browse all genuine QuickBooks Desktop 2024 editions. One-time purchase, instant delivery." />
      </Helmet>

      <section className="py-12 lg:py-20 bg-purple-50/20 min-h-[70vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">All Products</h1>
            <p className="text-gray-500 text-sm font-medium">Genuine QuickBooks Desktop licenses at unbeatable prices.</p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                  activeCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25 ring-2 ring-purple-600/20'
                    : 'bg-white text-gray-600 border border-gray-200/90 hover:border-purple-300 hover:bg-purple-50/30'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

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
