import React from "react";

function SummaryCards({ inventoryCount, deadStockCount, transferCount }) {
  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <div>
        <h4>Total Inventory Records</h4>
        <p>{inventoryCount}</p>
      </div>
      <div>
        <h4>Dead Stock Identified</h4>
        <p>{deadStockCount}</p>
      </div>
      <div>
        <h4>Transfer Recommendations</h4>
        <p>{transferCount}</p>
      </div>
    </div>
  );
}

export default SummaryCards;
