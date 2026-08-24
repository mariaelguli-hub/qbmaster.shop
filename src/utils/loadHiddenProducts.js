// src/utils/loadHiddenProducts.js

export async function fetchCsvProducts() {
  try {
    // محاولة قراءة الملف بالمسارين المحتملين
    let response = await fetch('/home-and-garden.csv.csv')
    if (!response.ok) {
      response = await fetch('/home-and-garden.csv')
    }
    if (!response.ok) {
      console.warn('Shopify CSV file not found in public folder.')
      return []
    }
    
    const text = await response.text()
    const lines = text.split(/\r?\n/)
    
    if (lines.length < 2) return []

    // تحليل الـ CSV مع مراعاة النصوص اللي بين علامات التنصيص
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
      return result.map(val => val.replace(/^"|"$/g, '').replace(/""/g, '"'))
    }

    const headers = parseCSVLine(lines[0])
    
    // إيجاد مؤشرات الأعمدة في Shopify CSV
    const titleIdx = headers.indexOf('Title')
    const handleIdx = headers.indexOf('Handle')
    const bodyIdx = headers.indexOf('Body (HTML)')
    const priceIdx = headers.indexOf('Variant Price')
    const comparePriceIdx = headers.indexOf('Variant Compare At Price')
    const imageIdx = headers.indexOf('Image Src')
    const typeIdx = headers.indexOf('Type')
    const optValIdx = headers.indexOf('Option1 Value')

    const productsMap = new Map()

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue
      
      const cols = parseCSVLine(line)
      const handle = cols[handleIdx] || `product-${i}`
      const title = cols[titleIdx]

      // إذا كان السطر فيه Title جديد (منتج رئيسي)
      if (title && title !== '') {
        const price = parseFloat(cols[priceIdx]) || 127
        const comparePrice = cols[comparePriceIdx] ? parseFloat(cols[comparePriceIdx]) : Number((price * 1.5).toFixed(2))
        const categoryName = cols[typeIdx] || 'Home & Garden'
        
        productsMap.set(handle, {
          id: `shopify-csv-${i}`,
          slug: handle,
          name: title,
          category: categoryName,
          tag: 'Secret Item',
          rating: 4.9,
          reviewsCount: 48,
          description: cols[bodyIdx] ? cols[bodyIdx].replace(/<[^>]*>?/gm, '').slice(0, 160) : 'Exclusive product edition with instant delivery.',
          features: [
            'Exclusive collection item',
            'High quality verified build',
            'Direct secure delivery'
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
          image: cols[imageIdx] || '/images/pro.jpg',
          hidden: true
        })
      } 
      else if (!title && handle && productsMap.has(handle)) {
        // إذا كان السطر عبارة عن Variant إضافي لنفس المنتج
        const product = productsMap.get(handle)
        const price = parseFloat(cols[priceIdx])
        if (!isNaN(price)) {
          const compPrice = cols[comparePriceIdx] ? parseFloat(cols[comparePriceIdx]) : Number((price * 1.5).toFixed(2))
          product.variants.push({
            id: `var-sub-${i}`,
            label: (optValIdx !== -1 && cols[optValIdx]) ? cols[optValIdx] : `Option ${product.variants.length + 1}`,
            price: price,
            comparePrice: compPrice,
            users: 1,
            bestselling: false,
            paymentLink: '#'
          })
        }
      }
    }

    return Array.from(productsMap.values())
  } catch (err) {
    console.error('Error parsing Shopify CSV:', err)
    return []
  }
}
