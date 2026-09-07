import fs from 'fs';
import path from 'path';
import products from './src/data/csvProducts.json' assert { type: 'json' };

const distPath = path.resolve('dist');
const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

products.forEach((product) => {
  const slug = product.slug || String(product.id);
  const title = `${product.name || product.title} — QB MASTER`;
  const desc = product.description || 'Premium Home & Garden Hardware';
  
  let img = product.image || product.image_link || '/products/cream-sofa.jpg';
  const imageUrl = img.startsWith('http') ? img : `https://qbmaster.shop${img.startsWith('/') ? '' : '/'}${img}`;
  const canonicalUrl = `https://qbmaster.shop/product/${slug}`;

  // تعويض الـ Tags فـ الـ HTML الخام لكل برودوي
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${desc}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${desc}" />`)
    .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${imageUrl}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${imageUrl}" />`);

  // إضافة Canonical و og:url مخصصين
  html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n  <meta property="og:url" content="${canonicalUrl}" />\n</head>`);

  const dir = path.join(distPath, 'product', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
});

console.log(`Generated pre-rendered HTML for ${products.length} products.`);
