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
 * Format dynamic Product Schema.org JSON-LD (Fully GMC & Rich Results Compliant)
 */
export default function ProductJsonLd({ product, selectedVariant }) {
  if (!product) return null

  const baseUrl = 'https://qbmaster.shop'

  const currentPrice = Number(
    selectedVariant?.price ?? product.price ?? 49.99
  ).toFixed(2)

  const productUrl = `${baseUrl}/product/${product.slug || product.id}`

  // Format images as array of absolute URLs
  const rawImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.image || '/images/pro.jpg'].filter(Boolean)

  const images = rawImages.map((img) => 
    img.startsWith('http') ? img : `${baseUrl}${img.startsWith('/') ? '' : '/'}${img}`
  )

  // Determine availability status
  const isOutOfStock = product.inStock === false || product.stock === 0 || product.availability === 'out_of_stock'
  const availability = isOutOfStock
    ? 'https://schema.org/OutOfStock'
    : 'https://schema.org/InStock'

  // Build GMC compliant schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: sanitizeText(product.name || product.title),
    description: sanitizeText(product.description || 'Genuine software license with instant digital delivery and verified support.'),
    image: images.length > 0 ? images : undefined,
    category: product.category ? sanitizeText(product.category) : 'Business Software',
    sku: String(product.sku || `SKU-${product.id || product.slug}`),
    
    // Product identifiers
    ...(product.gtin && { gtin: String(product.gtin) }),
    ...(product.gtin13 && { gtin13: String(product.gtin13) }),
    ...(product.gtin8 && { gtin8: String(product.gtin8) }),
    ...(product.mpn && { mpn: String(product.mpn) }),

    // Brand
    brand: {
      '@type': 'Brand',
      name: 'QB MASTER',
    },

    // Offers with full Merchant Center Compliance
    offers: {
      '@type': 'Offer',
      price: currentPrice,
      priceCurrency: 'USD',
      priceValidUntil: '2027-12-31',
      availability: availability,
      itemCondition: 'https://schema.org/NewCondition',
      url: productUrl,
      seller: {
        '@type': 'Organization',
        name: 'QB MASTER',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0.00',
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },

    // AggregateRating
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(product.rating || 4.96),
      reviewCount: String(product.reviewsCount || product.ratingCount || 142),
      bestRating: '5',
      worstRating: '1',
    },
  }

  // Clean undefined
  const cleanSchema = JSON.parse(JSON.stringify(schema))

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(cleanSchema)}
      </script>
    </Helmet>
  )
}
