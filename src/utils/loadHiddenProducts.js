// src/utils/loadHiddenProducts.js

export async function fetchCsvProducts() {
  try {
    // 1. تجربة كل المسارات الممكنة لملف الـ CSV داخل public
    const possiblePaths = [
      './home-and-garden.csv.csv',
      '/home-and-garden.csv.csv',
      './home-and-garden.csv',
      '/home-and-garden.csv'
    ]

    let csvText = null

    for (const path of possiblePaths) {
      try {
        const res = await fetch(path)
        const contentType = res.headers.get('content-type') || ''
        // التأكد من أن الرابط جاب ملف CSV حقيقي وليس صفحة HTML
        if (res.ok && !contentType.includes('text/html')) {
          csvText = await res.text()
          if (csvText && csvText.length > 50) break
        }
      } catch (e) {
        // تجربة المسار الموالي
      }
    }

    if (!csvText) {
      console.error('❌ CSV file not found in public folder or returning HTML!')
      return []
    }

    const lines = csvText.split(/\r?\n/)
    if (lines.length < 2) return []

    // 2. محلل أسطر الـ CSV
    const parseCSVLine = (line) => {
      const result = []
      let insideQuote = false
      let currentVal = ''
      for (let i = 0; i < line.length; i++) {
        const char = line[i]
        if (char === '"') {
          insideQuote = !insideQuote
        } else if (char === ',' && !insideQuote) {
          result.push(currentVal.trim())
          currentVal = ''
        } else {
          currentVal += char
        }
      }
      result.push(currentVal.trim())
      return result.map((val) => val.replace(/^"|"$/g, '').replace(/""/g, '"'))
    }

    // 3. تنظيف الهيدرز من UTF-8 BOM وتوحيد الحروف الصغيرة
    const rawHeaders = parseCSVLine(lines[0])
    const cleanHeaders = rawHeaders.map((h) => h.replace(/^\uFEFF/, '').trim().toLowerCase())

    const titleIdx = cleanHeaders.findIndex((h) => h === 'title')
    const handleIdx = cleanHeaders.findIndex((h) => h === 'handle')
    const bodyIdx = cleanHeaders.findIndex((h) => h.includes('body') || h.includes('description'))
    const priceIdx = cleanHeaders.findIndex((h) => h.includes('variant price') || h === 'price')
    const comparePriceIdx = cleanHeaders.findIndex((h) => h.includes('variant compare') || h.includes('compare'))
    const imageIdx = cleanHeaders.findIndex((h) => h.includes('image src') || h === 'image')
    const typeIdx = cleanHeaders.findIndex((h) => h === 'type' || h === 'category')
    const optValIdx = cleanHeaders.findIndex((h) => h.includes('option1 value'))

    const productsMap = new Map()

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const cols = parseCSVLine(line)
      const handle = (handleIdx !== -1 && cols[handleIdx]) ? cols[handleIdx] : `product-${i}`
      const title = (titleIdx !== -1 && cols[titleIdx]) ? cols[titleIdx] : ''

      // منتج رئيسي جديد
      if (title && title !== '') {
        const rawPrice = priceIdx !== -1 ? parseFloat(cols[priceIdx]) : 127
        const price = !isNaN(rawPrice) && rawPrice > 0 ? rawPrice : 127
        const rawCompPrice = comparePriceIdx !== -1 ? parseFloat(cols[comparePriceIdx]) : null
        const comparePrice = !isNaN(rawCompPrice) && rawCompPrice > 0 ? rawCompPrice : Number((price * 1.5).toFixed(2))
        const categoryName = (typeIdx !== -1 && cols[typeIdx]) ? cols[typeIdx] : 'Home & Garden'
        const imageUrl = (imageIdx !== -1 && cols[imageIdx]) ? cols[imageIdx] : '/images/pro.jpg'
        const rawDesc = (bodyIdx !== -1 && cols[bodyIdx]) ? cols[bodyIdx] : ''
        const description = rawDesc.replace(/<[^>]*>?/gm, '').slice(0, 160) || 'Genuine edition with instant digital delivery.'

        productsMap.set(handle, {
          id: `shopify-csv-${i}`,
          slug: handle,
          name: title,
          category: categoryName,
          tag: 'Verified License',
          rating: 4.9,
          reviewsCount: 38,
          description: description,
          features: [
            'Instant digital delivery',
            'Full lifetime license',
            '24/7 dedicated support'
          ],
          price: price,
          comparePrice: comparePrice,
          variants: [
            {
              id: `var-${i}`,
              label: 'Standard Edition',
              price: price,
              comparePrice: comparePrice,
              users: 1,
              bestselling: true,
              paymentLink: '#'
            }
          ],
          image: imageUrl,
          hidden: true
        })
      } else if (!title && handle && productsMap.has(handle)) {
        // خيار إضافي (Variant) لنفس المنتج
        const product = productsMap.get(handle)
        const rawPrice = priceIdx !== -1 ? parseFloat(cols[priceIdx]) : NaN
        if (!isNaN(rawPrice) && rawPrice > 0) {
          const rawCompPrice = comparePriceIdx !== -1 ? parseFloat(cols[comparePriceIdx]) : null
          const compPrice = !isNaN(rawCompPrice) && rawCompPrice > 0 ? rawCompPrice : Number((rawPrice * 1.5).toFixed(2))
          product.variants.push({
            id: `var-sub-${i}`,
            label: (optValIdx !== -1 && cols[optValIdx]) ? cols[optValIdx] : `Option ${product.variants.length + 1}`,
            price: rawPrice,
            comparePrice: compPrice,
            users: 1,
            bestselling: false,
            paymentLink: '#'
          })
        }
      }
    }

    const finalProducts = Array.from(productsMap.values())
    console.log(`✅ Loaded ${finalProducts.length} CSV products successfully.`)
    return finalProducts
  } catch (err) {
    console.error('❌ Error parsing CSV:', err)
    return []
  }
}
