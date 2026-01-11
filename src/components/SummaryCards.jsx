import React from "react";

function SummaryCards({ impactMetrics }) {
  if (!impactMetrics) return null;

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      <div className="card">
        <h4>Total Units</h4>
        <h2>{impactMetrics.totalUnits}</h2>
      </div>

      <div className="card badge-red">
        <h4>Dead Stock Units</h4>
        <h2>{impactMetrics.deadStockUnits}</h2>
      </div>

      <div className="card badge-yellow">
        <h4>Recoverable Units</h4>
        <h2>{impactMetrics.recoverableUnits}</h2>
      </div>

      <div className="card badge-green">
        <h4>Value at Risk</h4>
        <h2>₹{impactMetrics.estimatedValueAtRisk.toLocaleString()}</h2>
      </div>
    </div>
  );
}

export default SummaryCards;
