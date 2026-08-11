// src/utils/loadHiddenProducts.js

export async function fetchCsvProducts() {
  try {
    const response = await fetch('/home-and-garden.csv.csv') // أو '/home-and-garden.csv' على حسب التسمية في فولدر public
    if (!response.ok) throw new Error('Failed to load Shopify CSV file')
    
    const text = await response.text()
    const lines = text.split('\n')
    
    if (lines.length < 2) return []

    // تحليل الـ CSV مع مراعاة النصوص اللي بين علامات التنصيص (Quotes)
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

    const productsMap = new Map()

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue
      
      const cols = parseCSVLine(line)
      const handle = cols[handleIdx] || `product-${i}`
      const title = cols[titleIdx]

      // إذا كان السطر فيه Title جديد (منتج رئيسي)
      if (title && title !== '') {
        const price = parseFloat(cols[priceIdx]) || 19.99
        const comparePrice = cols[comparePriceIdx] ? parseFloat(cols[comparePriceIdx]) : null
        
        productsMap.set(handle, {
          id: `shopify-csv-${i}`,
          slug: handle,
          name: title,
          category: cols[typeIdx] || 'HOME',
          tag: 'Secret Item',
          rating: 4.9,
          reviewsCount: 35,
          description: cols[bodyIdx] ? cols[bodyIdx].replace(/<[^>]*>?/gm, '') : 'Exclusive home & garden product.',
          features: [
            'Exclusive collection item',
            'High quality verified build',
            'Direct secure delivery'
          ],
          variants: [
            {
              id: `var-${i}`,
              label: 'Standard Edition',
              price: price,
              comparePrice: comparePrice,
              users: 1,
              bestselling: true,
              paymentLink: '#' // يمكنك ربطه برابط الدفع لاحقاً
            }
          ],
          image: cols[imageIdx] || '/images/pro.jpg',
          hidden: true // 👈 ديما مخفي من الهوم والـ Shop وبايّن غير بالرابط المباشر
        })
      } 
      else if (!title && handle && productsMap.has(handle)) {
        // إذا كان السطر عبارة عن Variant إضافي لنفس المنتج
        const product = productsMap.get(handle)
        const price = parseFloat(cols[priceIdx])
        if (!isNaN(price)) {
          product.variants.push({
            id: `var-sub-${i}`,
            label: cols[8] || `Option ${product.variants.length + 1}`, // Option1 Value
            price: price,
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
