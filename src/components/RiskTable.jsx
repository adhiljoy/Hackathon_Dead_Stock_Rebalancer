import React from "react";

function RiskTable({ deadStock }) {
  return (
    <>
    <div className="card">
      <h3>🔴 Dead Stock Detected</h3>
      <table border="1" cellPadding="8" width="100%">
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>Store</th>
            <th>SKU</th>
            <th>Current Stock</th>
            <th>Stock Age (Days)</th>
          </tr>
        </thead>
        <tbody>
          {deadStock.map((item, idx) => (
            <tr
              key={idx}
              style={{ backgroundColor: "#ffe5e5" }} // 🔴 light red
            >
              <td>{item.store_id}</td>
              <td>{item.sku_id}</td>
              <td>{item.current_stock}</td>
              <td>{item.stock_age_days}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}

export default RiskTable;
