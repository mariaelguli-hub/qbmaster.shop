import fs from 'fs';
import path from 'path';

const distPath = path.resolve('dist');
const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

// قراءة ملف المنتجات
const products = JSON.parse(
  fs.readFileSync(path.resolve('src/data/csvProducts.json'), 'utf-8')
);

products.forEach((product) => {
  // مطابقة الـ slug أو id
  const slug = String(product.slug || product.id || '').trim();
  if (!slug) return;

  const title = `${product.name || product.title || 'Product'} — QB MASTER`;
  const desc = String(product.description || 'Premium Home & Garden Hardware').slice(0, 160);
  
  let img = product.image || product.image_link || product.image_url || '/products/cream-sofa.jpg';
  const imageUrl = img.startsWith('http') ? img : `https://qbmaster.shop${img.startsWith('/') ? '' : '/'}${img}`;
  const canonicalUrl = `https://qbmaster.shop/product/${slug}`;

  // تعويض ذكي وشامل للـ Tags
  let html = template;

  // Title
  html = html.replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`);

  // Description
  html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/gi, `<meta name="description" content="${desc}" />`);

  // Open Graph
  html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/gi, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/gi, `<meta property="og:description" content="${desc}" />`);
  html = html.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/gi, `<meta property="og:image" content="${imageUrl}" />`);

  // Twitter
  html = html.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/gi, `<meta name="twitter:title" content="${title}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/gi, `<meta name="twitter:description" content="${desc}" />`);
  html = html.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/gi, `<meta name="twitter:image" content="${imageUrl}" />`);

  // تأكيد الـ Canonical والـ og:url
  html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n  <meta property="og:url" content="${canonicalUrl}" />\n</head>`);

  const dir = path.join(distPath, 'product', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
});

console.log(`Successfully generated pre-rendered pages for ${products.length} products.`);
