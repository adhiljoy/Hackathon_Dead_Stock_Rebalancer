import React from "react";

function SummaryCards({ impactMetrics }) {
  if (!impactMetrics) return null;

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <div className="card">
        <h4>Total Units</h4>
        <h2>{impactMetrics.totalUnits}</h2>
      </div>

      <div className="card">
        <h4>Dead Stock Units</h4>
        <h2 style={{ color: "#c62828" }}>
          {impactMetrics.deadUnits}
        </h2>
      </div>

      <div className="card">
        <h4>Potential Revenue Saved</h4>
        <h2 style={{ color: "#2e7d32" }}>
          ₹{impactMetrics.revenueRecovered.toLocaleString()}
        </h2>
      </div>
    </div>
  );
}

export default SummaryCards;
