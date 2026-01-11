import React from "react";

function DemandStores({ skuId, demandStores }) {
  if (!skuId || demandStores.length === 0) return null;

  return (
    <>
    <div className="card">
      <h3>🟢 Demand Stores for {skuId}</h3>
      <table border="1" cellPadding="8" width="100%">
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>Store</th>
            <th>Stock Age (Days)</th>
            <th>Current Stock</th>
          </tr>
        </thead>
        <tbody>
          {demandStores.map((store, idx) => (
            <tr
              key={idx}
              style={{ backgroundColor: "#e6ffea" }} // 🟢 light green
            >
              <td>{store.store_id}</td>
              <td>{store.stock_age_days}</td>
              <td>{store.current_stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}

export default DemandStores;
