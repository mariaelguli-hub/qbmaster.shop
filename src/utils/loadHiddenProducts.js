// src/utils/loadHiddenProducts.js

export async function fetchCsvProducts() {
  try {
    // قراءة ملف الـ CSV من فولدر public (بدل الاسم إيلا كان مختلف عندك)
    const response = await fetch('/home-and-garden.csv.csv')
    if (!response.ok) throw new Error('Failed to load CSV file')
    
    const text = await response.text()
    const lines = text.split('\n')
    
    if (lines.length < 2) return []

    const products = []
    
    // تخطي السطر الأول (Headers) وبدء قراءة الصفوف
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      // تقسيم الصف حسب الفاصلة (يمكن يتأثر إيلا كانو فاصلات داخل النص، ولكن هذا البسيط كافٍ للبداية)
      const cols = line.split(',')
      
      const id = cols[0] || `csv-${i}`
      const name = cols[1] || cols[2] || `Hidden Product ${i}`
      const description = cols[2] || 'Exclusive secret product license.'
      const price = parseFloat(cols[6]) || 129.00
      const image = cols[4] || '/images/pro.jpg'
      const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')

      products.push({
        id: `csv-prod-${i}`,
        slug: slug,
        name: name,
        category: 'SECRET',
        tag: 'Secret Edition',
        rating: 5.0,
        reviewsCount: 1,
        description: description,
        features: [
          'Exclusive private product',
          'Instant digital delivery',
          'Full activation support'
        ],
        variants: [
          {
            id: `variant-csv-${i}`,
            label: 'Standard License',
            price: price,
            comparePrice: price * 3,
            users: 1,
            bestselling: true,
            paymentLink: cols[3]?.startsWith('http') ? cols[3] : '#'
          }
        ],
        image: image.startsWith('http') ? image : '/images/QuickBooks-Desktop-Enterprise-2024.png',
        hidden: true // 👈 ديما مخفي من الهوم والـ Shop وبايّن غير بالرابط المباشر
      })
    }

    return products
  } catch (err) {
    console.error('Error parsing CSV products:', err)
    return []
  }
}
