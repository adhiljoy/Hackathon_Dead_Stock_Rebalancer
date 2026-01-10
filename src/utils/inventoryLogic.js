// src/utils/inventoryLogic.js

import { calculateROS } from "./rosCalculator";

// Identify Dead Stock Stores
export function identifyDeadStock(inventory, salesHistory, rules) {
  return inventory.filter(item => {
    const ros = calculateROS(
      salesHistory,
      item.store_id,
      item.sku_id
    );

    return (
      ros <= rules.dead_stock_rules.ros_threshold &&
      item.stock_age_days >= rules.dead_stock_rules.min_days_unsold &&
      item.current_stock >= rules.dead_stock_rules.min_stock_quantity
    );
  });
}

// Identify Demand Stores
export function identifyDemandStores(
  inventory,
  salesHistory,
  skuId,
  rules
) {
  return inventory.filter(item => {
    if (item.sku_id !== skuId) return false;

    const ros = calculateROS(
      salesHistory,
      item.store_id,
      item.sku_id
    );

    return (
      ros >= rules.demand_store_rules.min_ros &&
      item.stock_age_days <= rules.demand_store_rules.max_stock_age_days
    );
  });
}

// Recommend Transfers
export function recommendTransfers(
  deadStockItems,
  inventory,
  salesHistory,
  rules
) {
  const recommendations = [];

  deadStockItems.forEach(deadItem => {
    const demandStores = identifyDemandStores(
      inventory,
      salesHistory,
      deadItem.sku_id,
      rules
    );

    if (!demandStores.length) return;

    const receiver = demandStores[0];

    const maxTransferQty = Math.floor(
      deadItem.current_stock *
      (rules.transfer_constraints.max_transfer_percentage / 100)
    );

    const transferableQty = Math.max(
      0,
      maxTransferQty - rules.transfer_constraints.min_remaining_stock
    );

    if (transferableQty > 0) {
      recommendations.push({
        sku_id: deadItem.sku_id,
        from_store: deadItem.store_id,
        to_store: receiver.store_id,
        quantity: transferableQty
      });
    }
  });

  return recommendations;
}
