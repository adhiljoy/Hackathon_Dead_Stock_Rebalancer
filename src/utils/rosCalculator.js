// src/utils/rosCalculator.js

export function calculateROS(salesHistory, storeId, skuId) {
  const records = salesHistory.filter(
    r => r.store_id === storeId && r.sku_id === skuId
  );

  if (records.length === 0) return 0;

  const totalSold = records.reduce(
    (sum, r) => sum + r.units_sold, 0
  );

  return Number((totalSold / records.length).toFixed(2));
}
