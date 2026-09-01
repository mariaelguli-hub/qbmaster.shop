import rawCsvData from '../data/home-and-garden.csv?raw'

function parseCSVRows(text) {
  if (!text) return []
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
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      row.push(col.trim())
      col = ''
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++
      row.push(col.trim())
      if (row.some((cell) => cell.length > 0)) rows.push(row)
      row = []
      col = ''
    } else {
      col += char
    }
  }
  if (col.length > 0 || row.length > 0) {
    row.push(col.trim())
    if (row.some((cell) => cell.length > 0)) rows.push(row)
  }
  return rows
}

export async function fetchCsvProducts() {
  try {
    const rows = parseCSVRows(rawCsvData)
    if (!rows || rows.length < 2) return []

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
        const comparePrice = !isNaN(rawCompPrice) && rawCompPrice > 0 ? rawCompPrice : Number((price * 1.5).toFixed(2))

        productsMap.set(handle, {
          id: `shopify-csv-${i}`,
          slug: handle,
          name: title,
          category: typeIdx !== -1 && cols[typeIdx] ? cols[typeIdx] : 'Home & Garden',
          tag: 'Verified Quality',
          rating: 4.9,
          reviewsCount: 38,
          description: (bodyIdx !== -1 && cols[bodyIdx] ? cols[bodyIdx] : '').replace(/<[^>]*>?/gm, '').slice(0, 160) || 'Premium essential.',
          price: price,
          comparePrice: comparePrice,
          variants: [{ id: `var-${i}`, label: 'Standard Pack', price: price, comparePrice: comparePrice, users: 1, bestselling: true, paymentLink: '#' }],
          image: imageIdx !== -1 && cols[imageIdx] ? cols[imageIdx] : '/images/pro.jpg',
          hidden: false,
          isPhysical: true
        })
      } else if (!title && handle && productsMap.has(handle)) {
        const product = productsMap.get(handle)
        const rawPrice = priceIdx !== -1 ? parseFloat(cols[priceIdx]) : NaN
        if (!isNaN(rawPrice) && rawPrice > 0) {
          const compPrice = !isNaN(parseFloat(cols[comparePriceIdx])) ? parseFloat(cols[comparePriceIdx]) : Number((rawPrice * 1.5).toFixed(2))
          product.variants.push({
            id: `var-sub-${i}`,
            label: optValIdx !== -1 && cols[optValIdx] ? cols[optValIdx] : `Option ${product.variants.length + 1}`,
            price: rawPrice,
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
    console.error('Error parsing CSV:', err)
    return []
  }
}
