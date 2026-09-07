import fs from 'fs';
import path from 'path';

const distPath = path.resolve('dist');
const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

const products = JSON.parse(
  fs.readFileSync(path.resolve('src/data/csvProducts.json'), 'utf-8')
);

// تأكد أن فولدر product كاين
fs.mkdirSync(path.join(distPath, 'product'), { recursive: true });

products.forEach((product) => {
  const slug = String(product.slug || product.id || '').trim();
  if (!slug) return;

  const title = `${product.name || product.title || 'Product'} — QB MASTER`;
  const desc = String(product.description || 'Premium Home & Garden Hardware').replace(/"/g, '&quot;').slice(0, 160);
  
  let img = product.image || product.image_link || product.image_url || '/products/cream-sofa.jpg';
  const imageUrl = img.startsWith('http') ? img : `https://qbmaster.shop${img.startsWith('/') ? '' : '/'}${img}`;
  const canonicalUrl = `https://qbmaster.shop/product/${slug}`;

  // حقن الـ Tags المخصصة
  const productMetaTags = `
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <link rel="canonical" href="${canonicalUrl}">
    <meta property="og:type" content="product">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="${imageUrl}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${desc}">
    <meta name="twitter:image" content="${imageUrl}">
  `;

  // تنظيف الـ default tags وحقن بيانات البرودوي
  let html = template
    .replace(/<title>.*?<\/title>/i, '')
    .replace(/<meta\s+name="description".*?>/i, '')
    .replace(/<meta\s+property="og:title".*?>/i, '')
    .replace(/<meta\s+property="og:description".*?>/i, '')
    .replace(/<meta\s+property="og:image".*?>/i, '')
    .replace(/<meta\s+name="twitter:title".*?>/i, '')
    .replace(/<meta\s+name="twitter:description".*?>/i, '')
    .replace(/<meta\s+name="twitter:image".*?>/i, '');

  html = html.replace('<head>', `<head>${productMetaTags}`);

  // 1. للمسار بالسلاش (/product/slug/):
  const dir = path.join(distPath, 'product', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);

  // 2. للمسار بلا سلاش (/product/slug):
  fs.writeFileSync(path.join(distPath, 'product', `${slug}.html`), html);
});

console.log(`Generated HTML files with and without trailing slash for ${products.length} products.`);
