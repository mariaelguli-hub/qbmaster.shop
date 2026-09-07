import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, 'dist');
const templatePath = path.join(distPath, 'index.html');

// قراءة القالب
if (!fs.existsSync(templatePath)) {
  console.error("Error: dist/index.html not found! Run vite build first.");
  process.exit(1);
}
const template = fs.readFileSync(templatePath, 'utf-8');

// فحص مسار ملف المنتجات بالحالتين (حروف كبيرة أو صغيرة)
let productsPath = path.resolve(__dirname, 'src/data/csvProducts.json');
if (!fs.existsSync(productsPath)) {
  productsPath = path.resolve(__dirname, 'src/data/csvproducts.json');
}

const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
fs.mkdirSync(path.join(distPath, 'product'), { recursive: true });

products.forEach((product) => {
  const slug = String(product.slug || product.id).trim();
  const title = `${product.name} — QB MASTER`;
  const desc = String(product.description).replace(/"/g, '&quot;');
  const imageUrl = product.image;
  const canonicalUrl = `https://qbmaster.shop/product/${slug}`;

  const productMetaTags = `
    <!-- Dynamic Product Meta -->
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

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta[^>]+(name|property)=["']?(og:url|og:image|og:image:secure_url|og:title|og:description|twitter:image|twitter:title|twitter:description|description)["']?[^>]*>/gi, '')
    .replace(/<link[^>]+rel=["']?canonical["']?[^>]*>/gi, '');

  html = html.replace('<head>', `<head>${productMetaTags}`);

  // كتابة الملف المباشر والمسار الداخلي
  fs.writeFileSync(path.join(distPath, 'product', `${slug}.html`), html);
  const dir = path.join(distPath, 'product', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
});

console.log(`Generated ${products.length} product static pages successfully.`);
