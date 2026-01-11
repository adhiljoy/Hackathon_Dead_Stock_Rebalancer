import React from "react";

function Legend() {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
        marginBottom: "20px"
      }}
    >
      <span>
        <span
          style={{
            display: "inline-block",
            width: "12px",
            height: "12px",
            backgroundColor: "#ffe6e6",
            marginRight: "6px"
          }}
        />
        Dead Stock
      </span>

      <span>
        <span
          style={{
            display: "inline-block",
            width: "12px",
            height: "12px",
            backgroundColor: "#e6ffe6",
            marginRight: "6px"
          }}
        />
        Healthy Stock
      </span>

      <span style={{ color: "#555" }}>
        Toggle filters to focus on risk items
      </span>
    </div>
  );
}

export default Legend;
