import React from "react";

function TransferRecommendations({ transfers }) {
  if (transfers.length === 0) return null;

  return (
    <>
      <h3>🔁 Transfer Recommendations</h3>
      <table border="1" cellPadding="8" width="100%">
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>SKU</th>
            <th>From Store</th>
            <th>To Store</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((rec, idx) => (
            <tr
              key={idx}
              style={{ backgroundColor: "#fff8e1" }} // 🟡 light yellow
            >
              <td>{rec.sku_id}</td>
              <td>{rec.from_store}</td>
              <td>{rec.to_store}</td>
              <td>{rec.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TransferRecommendations;
