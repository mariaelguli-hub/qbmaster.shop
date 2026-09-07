import fs from 'fs';
import path from 'path';

const distPath = path.resolve('dist');
const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

const products = JSON.parse(
  fs.readFileSync(path.resolve('src/data/csvProducts.json'), 'utf-8')
);

// إنشاء المجلد الرئيسي للـ products
fs.mkdirSync(path.join(distPath, 'product'), { recursive: true });

products.forEach((product) => {
  const slug = product.slug || product.id;
  const title = `${product.name} — QB MASTER`;
  const desc = product.description.replace(/"/g, '&quot;');
  const imageUrl = product.image;
  const canonicalUrl = `https://qbmaster.shop/product/${slug}`;

  // بلوك الميتا الخاص بالمنتج
  const productMetaTags = `
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <link rel="canonical" href="${canonicalUrl}">
    <meta property="og:type" content="product">
    <meta property="og:site_name" content="QB MASTER">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${desc}">
    <meta name="twitter:image" content="${imageUrl}">
  `;

  // مسح الميتا القديمة بهاد الـ Regex الشاملة (سواء مسدودة بـ > أو />)
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
    .replace(/<meta\s+property=["']og:title["'][^>]*>/gi, '')
    .replace(/<meta\s+property=["']og:description["'][^>]*>/gi, '')
    .replace(/<meta\s+property=["']og:image["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']twitter:title["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']twitter:description["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']twitter:image["'][^>]*>/gi, '');

  // حقن الميتا فـ أول الـ head
  html = html.replace('<head>', `<head>${productMetaTags}`);

  // توليد مسار الفولدر /product/slug/index.html
  const dir = path.join(distPath, 'product', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);

  // توليد مسار /product/slug.html لـ GitHub Pages
  fs.writeFileSync(path.join(distPath, 'product', `${slug}.html`), html);
});

// نسخ index.html الرئيسي إلى 404.html
fs.copyFileSync(path.join(distPath, 'index.html'), path.join(distPath, '404.html'));

console.log(`Generated HTML files for ${products.length} products.`);
