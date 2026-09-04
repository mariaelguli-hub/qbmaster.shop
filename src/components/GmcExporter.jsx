import React, { useState } from 'react'
import { Download, Lock, CheckCircle2 } from 'lucide-react'
import products from '../data/csvProducts.json' // تم توجيهه للملف النظيف المعتمد

export default function GmcExporter() {
  const [pin, setPin] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)

  // كود الدخول للأدمن
  const ADMIN_SECRET = '123456' 

  const handleLogin = (e) => {
    e.preventDefault()
    if (pin === ADMIN_SECRET) {
      setIsAuthorized(true)
    } else {
      alert('Code PIN خاطئ!')
    }
  }

  // تحويل المنتجات لـ CSV رسمي مطابق لمعايير Google Merchant Center
  const exportToGMC = () => {
    const domain = 'https://qbmaster.shop'

    // 1. عناوين الأعمدة القياسية لـ GMC
    const headers = [
      'id',
      'title',
      'description',
      'link',
      'image_link',
      'availability',
      'price',
      'brand',
      'condition',
      'google_product_category'
    ]

    // 2. معالجة كل منتج كسلعة فيزيائية (Home & Garden)
    const rows = products.map((p) => {
      const cleanTitle = (p.name || p.title || '').replace(/"/g, '""')
      const cleanDesc = (p.description || '').replace(/"/g, '""')
      const priceFormatted = `${Number(p.price || 49.99).toFixed(2)} USD`
      const productLink = `${domain}/product/${p.slug || p.id}`
      
      const rawImg = p.image || p.image_link || ''
      const imageLink = rawImg.startsWith('http') ? rawImg : `${domain}${rawImg.startsWith('/') ? '' : '/'}${rawImg}`

      // تحديد تصنيف غوغل الصحيح حسب نوع المنتج
      const gmcCategory = p.category === 'Outdoor' 
        ? 'Home & Garden > Lawn & Garden' 
        : 'Home & Garden > Decor'

      return [
        `"${p.id}"`,
        `"${cleanTitle}"`,
        `"${cleanDesc}"`,
        `"${productLink}"`,
        `"${imageLink}"`,
        `"${p.availability || 'in_stock'}"`,
        `"${priceFormatted}"`,
        `"${p.brand || 'QB Master'}"`,
        `"${p.condition || 'new'}"`,
        `"${gmcCategory}"`
      ].join(',')
    })

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n')
    
    // 3. تصدير وتحميل الملف عبر Blob لتفادي أخطاء الرموز
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `gmc_feed_qbmaster_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-3xl border border-purple-100 shadow-xl my-10 font-sans">
      <h3 className="text-lg font-black text-gray-900 mb-2 flex items-center gap-2">
        <Lock className="w-5 h-5 text-purple-600" /> Admin GMC Feed Exporter
      </h3>
      <p className="text-xs text-gray-500 mb-6">
        Download your official Google Merchant Center product feed CSV for QB Master.
      </p>

      {!isAuthorized ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Enter Admin PIN Code"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-purple-600"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gray-900 text-white font-extrabold text-sm rounded-xl hover:bg-purple-600 transition-colors cursor-pointer"
          >
            Unlock Access
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 bg-purple-50 p-3 rounded-xl border border-purple-200">
            <CheckCircle2 className="w-4 h-4 text-purple-600" /> Access Granted
          </div>
          <button
            onClick={exportToGMC}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-sm rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download GMC Feed (.CSV)
          </button>
        </div>
      )}
    </div>
  )
}
