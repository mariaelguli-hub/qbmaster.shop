import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, 'dist');
const templatePath = path.join(distPath, 'index.html');
const productsPath = path.resolve(__dirname, 'src/data/csvProducts.json');

const template = fs.readFileSync(templatePath, 'utf-8');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

// إنشاء مجلد product داخل dist
fs.mkdirSync(path.join(distPath, 'product'), { recursive: true });

products.forEach((product) => {
  const slug = String(product.slug || product.id).trim();
  const title = `${product.name} — QB MASTER`;
  const desc = String(product.description).replace(/"/g, '&quot;');
  const imageUrl = product.image;
  const canonicalUrl = `https://qbmaster.shop/product/${slug}`;

  // بلوك الميتا الخاص بالمنتج (مضمون 100% بجميع التاغات)
  const productMetaTags = `
    <!-- Product Dynamic OG Tags -->
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <link rel="canonical" href="${canonicalUrl}">
    <meta property="og:type" content="product">
    <meta property="og:site_name" content="QB MASTER">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:secure_url" content="${imageUrl}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${desc}">
    <meta name="twitter:image" content="${imageUrl}">
  `;

  // مسح الميتا الافتراضية ديال المتجر
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta[^>]+(name|property)=["']?(og:url|og:image|og:image:secure_url|og:title|og:description|twitter:image|twitter:title|twitter:description|description)["']?[^>]*>/gi, '')
    .replace(/<link[^>]+rel=["']?canonical["']?[^>]*>/gi, '');

  html = html.replace('<head>', `<head>${productMetaTags}`);

  // 1. ملف مباشر باش يخدم الرابط يلا تبارطاجا بلا سلاش (/product/clay-plant-pot)
  fs.writeFileSync(path.join(distPath, 'product', `${slug}.html`), html);

  // 2. ملف داخلي باش يخدم الرابط يلا تبارطاجا بالسلاش (/product/clay-plant-pot/)
  const dir = path.join(distPath, 'product', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
});

// 3. تحديث 404.html كـ fallback
fs.copyFileSync(templatePath, path.join(distPath, '404.html'));

console.log(`Successfully prerendered ${products.length} products (both .html and /index.html).`);
