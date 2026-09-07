import fs from 'fs';
import path from 'path';

const distPath = path.resolve('dist');
const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

const products = JSON.parse(
  fs.readFileSync(path.resolve('src/data/csvProducts.json'), 'utf-8')
);

fs.mkdirSync(path.join(distPath, 'product'), { recursive: true });

products.forEach((product) => {
  const slug = product.slug || product.id;
  const title = `${product.name} — QB MASTER`;
  const desc = product.description.replace(/"/g, '&quot;');
  const imageUrl = product.image;
  const canonicalUrl = `https://qbmaster.shop/product/${slug}`;

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
    <meta property="og:image:secure_url" content="${imageUrl}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${desc}">
    <meta name="twitter:image" content="${imageUrl}">
  `;

  // مسح شامل لأي meta قديمة متعلقة بالصور أو العناوين مهما كانت طريقة كتابتها
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta[^>]+(name|property)=["']?(og:image|twitter:image|og:title|twitter:title|og:description|twitter:description|description)["']?[^>]*>/gi, '');

  html = html.replace('<head>', `<head>${productMetaTags}`);

  // توليد مسار الفولدر والملف المباشر
  const dir = path.join(distPath, 'product', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  fs.writeFileSync(path.join(distPath, 'product', `${slug}.html`), html);
});

fs.copyFileSync(path.join(distPath, 'index.html'), path.join(distPath, '404.html'));

console.log(`Successfully generated ${products.length} products with CDN image URLs.`);
