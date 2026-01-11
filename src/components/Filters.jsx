import React from "react";

function Filters({
  stores,
  skus,
  selectedStore,
  selectedSku,
  showDeadOnly,
  onStoreChange,
  onSkuChange,
  onDeadToggle
}) {
  return (
    <div className="card">
      <h3>🔍 Filters</h3>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "center"
        }}
      >
        {/* Store Filter */}
        <div>
          <label>Store</label><br />
          <select
            value={selectedStore}
            onChange={e => onStoreChange(e.target.value)}
          >
            <option value="">All Stores</option>
            {stores.map(store => (
              <option key={store} value={store}>
                {store}
              </option>
            ))}
          </select>
        </div>

        {/* SKU Filter */}
        <div>
          <label>SKU</label><br />
          <select
            value={selectedSku}
            onChange={e => onSkuChange(e.target.value)}
          >
            <option value="">All SKUs</option>
            {skus.map(sku => (
              <option key={sku} value={sku}>
                {sku}
              </option>
            ))}
          </select>
        </div>

        {/* Dead Stock Toggle */}
        <div style={{ marginTop: "18px" }}>
          <label style={{ cursor: "pointer", fontWeight: "500" }}>
            <input
              type="checkbox"
              checked={showDeadOnly}
              onChange={e => onDeadToggle(e.target.checked)}
              style={{ marginRight: "6px" }}
            />
            Show Dead Stock Only
          </label>
        </div>
      </div>
    </div>
  );
}

export default Filters;
