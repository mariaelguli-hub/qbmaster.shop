import React from 'react'

function cleanStr(str) {
  if (!str) return ''
  return String(str)
    .replace(/<[^>]*>?/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export default function ProductJsonLd({ product, selectedVariant }) {
  const currentProduct = product || {
    id: 'product',
    slug: 'product',
    name: 'QuickBooks Desktop License',
    price: 159.00,
    description: 'Genuine QuickBooks Desktop license with instant email delivery.',
    category: 'Business Software'
  }

  const baseUrl = 'https://qbmaster.shop'
  const currentPrice = Number(
    selectedVariant?.price ?? currentProduct.price ?? 159.00
  ).toFixed(2)

  const productUrl = `${baseUrl}/product/${currentProduct.slug || currentProduct.id || 'item'}`

  const rawImages = Array.isArray(currentProduct.images) && currentProduct.images.length > 0
    ? currentProduct.images
    : [currentProduct.image || '/images/pro.jpg'].filter(Boolean)

  const images = rawImages.map((img) => 
    img.startsWith('http') ? img : `${baseUrl}${img.startsWith('/') ? '' : '/'}${img}`
  )

  const isOutOfStock = currentProduct.inStock === false || currentProduct.stock === 0 || currentProduct.availability === 'out_of_stock'
  const availability = isOutOfStock
    ? 'https://schema.org/OutOfStock'
    : 'https://schema.org/InStock'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: cleanStr(currentProduct.name || currentProduct.title),
    description: cleanStr(currentProduct.description || 'Genuine software license with instant digital delivery and verified support.'),
    image: images.length > 0 ? images : undefined,
    category: currentProduct.category ? cleanStr(currentProduct.category) : 'Business Software',
    sku: String(currentProduct.sku || `SKU-${currentProduct.id || currentProduct.slug || 'item'}`),
    
    brand: {
      '@type': 'Brand',
      name: 'QB MASTER',
    },

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

    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(currentProduct.rating || 4.95),
      reviewCount: String(currentProduct.reviewsCount || currentProduct.ratingCount || 128),
      bestRating: '5',
      worstRating: '1',
    },
  }

  const cleanSchema = JSON.parse(JSON.stringify(schema))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  )
}
