import fs from 'fs';
import path from 'path';

const distPath = path.resolve('dist');
const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

const products = JSON.parse(
  fs.readFileSync(path.resolve('src/data/csvProducts.json'), 'utf-8')
);

// تأكد من وجود المجلدات
fs.mkdirSync(path.join(distPath, 'product'), { recursive: true });

products.forEach((product) => {
  const slug = product.slug || product.id;
  const title = `${product.name} — QB MASTER`;
  const desc = product.description.replace(/"/g, '&quot;');
  const imageUrl = product.image;
  const canonicalUrl = `https://qbmaster.shop/product/${slug}`;

  // إنشاء كود الميتا النقي والمباشر الخاص بالمنتج
  const metaBlock = `
    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="product" />
    <meta property="og:site_name" content="QB MASTER" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${imageUrl}" />
  `;

  // حذف أية وسوم عامة وحقن الوسوم المخصصة
  let html = template
    .replace(/<title>.*?<\/title>/i, '')
    .replace(/<meta\s+name="description"[^>]*>/i, '')
    .replace(/<meta\s+property="og:title"[^>]*>/i, '')
    .replace(/<meta\s+property="og:description"[^>]*>/i, '')
    .replace(/<meta\s+property="og:image"[^>]*>/i, '')
    .replace(/<meta\s+name="twitter:title"[^>]*>/i, '')
    .replace(/<meta\s+name="twitter:description"[^>]*>/i, '')
    .replace(/<meta\s+name="twitter:image"[^>]*>/i, '');

  html = html.replace('<head>', `<head>${metaBlock}`);

  // 1. توليد الملف للمسار العادي: dist/product/clay-plant-pot/index.html
  const dir = path.join(distPath, 'product', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);

  // 2. توليد الملف كـ HTML مباشر لـ GitHub Pages: dist/product/clay-plant-pot.html
  fs.writeFileSync(path.join(distPath, 'product', `${slug}.html`), html);
});

// 3. نسخ index.html الرئيسي إلى 404.html لضمان عمل SPA بالكامل على GitHub Pages
fs.copyFileSync(path.join(distPath, 'index.html'), path.join(distPath, '404.html'));

console.log(`Successfully generated ${products.length} pre-rendered products & 404.html fallback.`);
