import React from 'react'
import { Helmet } from 'react-helmet-async'

/**
 * Clean string mn HTML tags w dangerous characters
 */
function sanitizeText(str) {
  if (!str) return ''
  return String(str)
    .replace(/<[^>]*>?/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Format dynamic Product Schema.org JSON-LD
 */
export default function ProductJsonLd({ product, selectedVariant }) {
  if (!product) return null

  const baseUrl = typeof window !== 'undefined' && window.location.origin 
    ? window.location.origin 
    : 'https://qbmaster.shop'

  const currentPrice = Number(
    selectedVariant?.price ?? product.price ?? 0
  ).toFixed(2)

  const productUrl = `${baseUrl}/product/${product.slug || product.id}`

  // Format images as array of absolute URLs
  const rawImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.image].filter(Boolean)

  const images = rawImages.map((img) => 
    img.startsWith('http') ? img : `${baseUrl}${img.startsWith('/') ? '' : '/'}${img}`
  )

  // Determine availability status
  const isOutOfStock = product.inStock === false || product.stock === 0 || product.availability === 'out_of_stock'
  const availability = isOutOfStock
    ? 'https://schema.org/OutOfStock'
    : 'https://schema.org/InStock'

  // Build base schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: sanitizeText(product.name || product.title),
    description: sanitizeText(product.description),
    image: images.length > 0 ? images : undefined,
    category: product.category ? sanitizeText(product.category) : undefined,
    sku: product.sku ? String(product.sku) : String(product.id || product.slug),
    
    // Product identifiers - ghir ila kano f l-data
    ...(product.gtin && { gtin: String(product.gtin) }),
    ...(product.gtin13 && { gtin13: String(product.gtin13) }),
    ...(product.gtin8 && { gtin8: String(product.gtin8) }),
    ...(product.mpn && { mpn: String(product.mpn) }),

    // Brand - standard Schema format
    brand: {
      '@type': 'Brand',
      name: sanitizeText(product.brand || 'QB MASTER'),
    },

    // Offers
    offers: {
      '@type': 'Offer',
      price: currentPrice,
      priceCurrency: 'USD',
      priceValidUntil: product.priceValidUntil || undefined,
      availability: availability,
      itemCondition: 'https://schema.org/NewCondition',
      url: productUrl,
      seller: {
        '@type': 'Organization',
        name: 'QB MASTER',
      },
    },
  }

  // AggregateRating - ghir ila kano reviews w rating f l-data
  if (product.rating && (product.reviewsCount || product.ratingCount)) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: Number(product.rating),
      reviewCount: Number(product.reviewsCount || product.ratingCount || 1),
      bestRating: 5,
      worstRating: 1,
    }
  }

  // Remove undefined properties
  const cleanSchema = JSON.parse(JSON.stringify(schema))

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(cleanSchema)}
      </script>
    </Helmet>
  )
}
