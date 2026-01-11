// src/utils/impactMetrics.js

export function calculateImpactMetrics(inventory, deadStock, transfers) {
  const totalUnits = inventory.reduce(
    (sum, item) => sum + item.current_stock,
    0
  );

  const deadStockUnits = deadStock.reduce(
    (sum, item) => sum + item.current_stock,
    0
  );

  const recoverableUnits = transfers.reduce(
    (sum, t) => sum + t.quantity,
    0
  );

  const riskPercentage =
    totalUnits > 0
      ? ((deadStockUnits / totalUnits) * 100).toFixed(1)
      : 0;

  // Simple revenue estimate (can be replaced later)
  const estimatedValueAtRisk = deadStockUnits * 500; // ₹500 per unit (assumption)

  return {
    totalUnits,
    deadStockUnits,
    recoverableUnits,
    riskPercentage,
    estimatedValueAtRisk
  };
}
