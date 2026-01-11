import React from "react";

function RiskTable({ inventory, deadStock }) {
  // Create lookup for fast dead-stock check
  const deadStockSet = new Set(
    deadStock.map(
      item => `${item.store_id}-${item.sku_id}`
    )
  );

  return (
    <div className="card">
      <h3>📦 Inventory Overview</h3>

      <table>
        <thead>
          <tr>
            <th>Store</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Stock Age (Days)</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map(item => {
            const key = `${item.store_id}-${item.sku_id}`;
            const isDead = deadStockSet.has(key);

            return (
              <tr
                key={key}
                style={{
                  backgroundColor: isDead
                    ? "#ffe6e6"
                    : "white"
                }}
              >
                <td>{item.store_id}</td>
                <td>{item.sku_id}</td>
                <td>{item.category}</td>
                <td>{item.current_stock}</td>
                <td>{item.stock_age_days}</td>
                <td
                  style={{
                    fontWeight: "bold",
                    color: isDead ? "#c62828" : "#2e7d32"
                  }}
                >
                  {isDead ? "DEAD STOCK" : "HEALTHY"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RiskTable;
