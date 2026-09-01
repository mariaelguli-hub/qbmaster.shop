// src/utils/loadHiddenProducts.js

export async function fetchCsvProducts() {
  try {
    const baseUrl = import.meta.env.BASE_URL || '/'
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`

    // تجربة جميع المسارات المحتملة لملف الـ CSV
    const possiblePaths = [
      `${cleanBase}home-and-garden.csv`,
      `${cleanBase}home-and-garden.csv.csv`,
      '/home-and-garden.csv',
      '/home-and-garden.csv.csv',
      './home-and-garden.csv',
      './home-and-garden.csv.csv',
      '/products.csv'
    ]

    let csvText = null
    let matchedPath = ''

    for (const path of possiblePaths) {
      try {
        const res = await fetch(path, { cache: 'no-store' })
        if (res.ok) {
          const text = await res.text()
          // التأكد من أن المسترجع هو CSV حقيقي وليس صفحة HTML
          const trimmed = text.trim()
          if (
            trimmed.length > 30 &&
            !trimmed.startsWith('<!DOCTYPE') &&
            !trimmed.startsWith('<html') &&
            !trimmed.startsWith('<?xml')
          ) {
            csvText = trimmed
            matchedPath = path
            break
          }
        }
      } catch (e) {
        // تجربة المسار التالي
      }
    }

    if (!csvText) {
      console.warn('⚠️ CSV file could not be loaded from public paths.')
      return []
    }

    // محلل CSV احترافي يتعامل مع الفواصل وعلامات التنصيص
    const parseCSVRows = (text) => {
      const rows = []
      let row = []
      let col = ''
      let inQuotes = false

      for (let i = 0; i < text.length; i++) {
        const char = text[i]
        const nextChar = text[i + 1]

        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            col += '"'
            i++ // تخطي علامة التنصيص المزدوجة
          } else {
            inQuotes = !inQuotes
          }
        } else if (char === ',' && !inQuotes) {
          row.push(col.trim())
          col = ''
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
          if (char === '\r' && nextChar === '\n') i++
          row.push(col.trim())
          if (row.some((cell) => cell.length > 0)) {
            rows.push(row)
          }
          row = []
          col = ''
        } else {
          col += char
        }
      }
      if (col.length > 0 || row.length > 0) {
        row.push(col.trim())
        if (row.some((cell) => cell.length > 0)) {
          rows.push(row)
        }
      }
      return rows
    }

    const rows = parseCSVRows(csvText)
    if (rows.length < 2) return []

    // قراءة الهيدرز وتوحيدها
    const headers = rows[0].map((h) =>
      h.replace(/^\uFEFF/, '').replace(/^"|"$/g, '').trim().toLowerCase()
    )

    const titleIdx = headers.findIndex((h) => h === 'title')
    const handleIdx = headers.findIndex((h) => h === 'handle')
    const bodyIdx = headers.findIndex((h) => h.includes('body') || h.includes('description'))
    const priceIdx = headers.findIndex((h) => h.includes('variant price') || h === 'price')
    const comparePriceIdx = headers.findIndex((h) => h.includes('variant compare') || h.includes('compare'))
    const imageIdx = headers.findIndex((h) => h.includes('image src') || h === 'image')
    const typeIdx = headers.findIndex((h) => h === 'type' || h === 'category')
    const optValIdx = headers.findIndex((h) => h.includes('option1 value'))

    const productsMap = new Map()

    for (let i = 1; i < rows.length; i++) {
      const cols = rows[i]
      const handle = handleIdx !== -1 && cols[handleIdx] ? cols[handleIdx] : `product-${i}`
      const title = titleIdx !== -1 && cols[titleIdx] ? cols[titleIdx] : ''

      if (title) {
        const rawPrice = priceIdx !== -1 ? parseFloat(cols[priceIdx]) : 127
        const price = !isNaN(rawPrice) && rawPrice > 0 ? rawPrice : 127
        const rawCompPrice = comparePriceIdx !== -1 ? parseFloat(cols[comparePriceIdx]) : null
        const comparePrice =
          !isNaN(rawCompPrice) && rawCompPrice > 0
            ? rawCompPrice
            : Number((price * 1.5).toFixed(2))

        const categoryName = typeIdx !== -1 && cols[typeIdx] ? cols[typeIdx] : 'Home & Garden'
        const imageUrl = imageIdx !== -1 && cols[imageIdx] ? cols[imageIdx] : '/images/pro.jpg'
        const rawDesc = bodyIdx !== -1 && cols[bodyIdx] ? cols[bodyIdx] : ''
        const description =
          rawDesc.replace(/<[^>]*>?/gm, '').slice(0, 160) ||
          'Premium home & garden essential engineered for durability.'

        productsMap.set(handle, {
          id: `shopify-csv-${i}`,
          slug: handle,
          name: title,
          category: categoryName,
          tag: 'Verified Quality',
          rating: 4.9,
          reviewsCount: 38,
          description: description,
          features: [
            'Premium build & durable craftsmanship',
            'Fast insured doorstep delivery',
            '30-day money-back satisfaction guarantee'
          ],
          price: price,
          comparePrice: comparePrice,
          variants: [
            {
              id: `var-${i}`,
              label: 'Standard Pack',
              price: price,
              comparePrice: comparePrice,
              users: 1,
              bestselling: true,
              paymentLink: '#'
            }
          ],
          image: imageUrl,
          hidden: false,
          isPhysical: true
        })
      } else if (!title && handle && productsMap.has(handle)) {
        const product = productsMap.get(handle)
        const rawPrice = priceIdx !== -1 ? parseFloat(cols[priceIdx]) : NaN
        if (!isNaN(rawPrice) && rawPrice > 0) {
          const rawCompPrice = comparePriceIdx !== -1 ? parseFloat(cols[comparePriceIdx]) : null
          const compPrice =
            !isNaN(rawCompPrice) && rawCompPrice > 0
              ? rawCompPrice
              : Number((rawPrice * 1.5).toFixed(2))

          product.variants.push({
            id: `var-sub-${i}`,
            label:
              optValIdx !== -1 && cols[optValIdx]
                ? cols[optValIdx]
                : `Option ${product.variants.length + 1}`,
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
    return finalProducts
  } catch (err) {
    console.error('❌ Error parsing CSV:', err)
    return []
  }
}
