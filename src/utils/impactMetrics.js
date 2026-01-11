// src/utils/impactMetrics.js

export function calculateImpactMetrics(
  inventory,
  deadStock,
  transfers
) {
  const totalUnits = inventory.reduce(
    (sum, i) => sum + i.current_stock,
    0
  );

  const deadUnits = deadStock.reduce(
    (sum, d) => sum + d.current_stock,
    0
  );

  const avgPrice = 1000; // demo value

  const revenueRecovered =
    deadUnits * avgPrice * 0.4; // assume 40% recoverable

   return {
    totalUnits,
    deadUnits,
    revenueRecovered
  };
}
