/**
 * Identify dead stock based on:
 * - Zero or very low sales
 * - High stock age
 * - High stock quantity
 *
 * IMPORTANT DEMO RULE:
 * If sales data is missing for a SKU, we treat it as ZERO sales.
 */

export function identifyDeadStock(inventory, salesHistory, rules) {
  const {
    min_stock_age_days = 60,
    min_stock_units = 20,
    max_sales_threshold = 1
  } = rules.dead_stock_rules || {};

  return inventory.filter(item => {
    // Get sales records for this SKU
    const salesForSku = salesHistory.filter(
      s => s.sku_id === item.sku_id
    );

    // 👇 DEMO FIX:
    // If no sales data exists, treat sales as ZERO
    const totalSales = salesForSku.length
      ? salesForSku.reduce(
          (sum, s) => sum + (s.quantity || 0),
          0
        )
      : 0;

    return (
      totalSales <= max_sales_threshold &&
      item.stock_age_days >= min_stock_age_days &&
      item.current_stock >= min_stock_units
    );
  });
}

/**
 * Recommend transfers from dead-stock stores to demand stores
 * (simple heuristic for demo)
 */
export function recommendTransfers(
  deadStock,
  inventory,
  salesHistory,
  rules
) {
  const recommendations = [];

  deadStock.forEach(deadItem => {
    // Find stores where same SKU is selling
    const demandStores = salesHistory.filter(
      s =>
        s.sku_id === deadItem.sku_id &&
        s.quantity > 2
    );

    demandStores.forEach(store => {
      recommendations.push({
        sku_id: deadItem.sku_id,
        from_store: deadItem.store_id,
        to_store: store.store_id,
        quantity: Math.min(
          deadItem.current_stock,
          10
        )
      });
    });
  });

  return recommendations;
}
