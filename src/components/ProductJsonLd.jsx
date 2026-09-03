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
    name: 'Home & Garden Essential',
    price: 49.99,
    description: 'Durable and heavy-duty home and garden equipment.',
    category: 'Home & Garden'
  }

  const baseUrl = 'https://qbmaster.shop'
  const currentPrice = Number(
    selectedVariant?.price ?? currentProduct.price ?? 49.99
  ).toFixed(2)

  const productUrl = `${baseUrl}/product/${currentProduct.slug || currentProduct.id || 'item'}`

  const rawImages = Array.isArray(currentProduct.images) && currentProduct.images.length > 0
    ? currentProduct.images
    : [currentProduct.image_link || currentProduct.image || '/images/default.jpg'].filter(Boolean)

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
    description: cleanStr(currentProduct.description || 'Premium quality home and garden hardware designed for durability and outdoor comfort.'),
    image: images.length > 0 ? images : undefined,
    category: cleanStr(currentProduct.category || 'Home & Garden'),
    sku: String(currentProduct.sku || `SKU-${currentProduct.id || currentProduct.slug || 'item'}`),
    
    brand: {
      '@type': 'Brand',
      name: 'QB Master',
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
        name: 'QB Master',
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
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 7,
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
  }

  const cleanSchema = JSON.parse(JSON.stringify(schema))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  )
}
