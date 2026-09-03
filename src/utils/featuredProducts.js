import products from '../data/csvProducts.json';

// دالة نقية للتحكم بالمنتجات المعروضة فالواجهة بدون أي اتصال خارجي
export const getFeaturedProducts = (limit = 8) => {
  if (!Array.isArray(products)) return [];
  
  // تقدر تختار المنتجات حسب الـ ID لي بغيتيها تبان فالأول
  return products.slice(0, limit);
};
