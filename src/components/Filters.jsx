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

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div>
          <label>Store</label><br />
          <select value={selectedStore} onChange={e => onStoreChange(e.target.value)}>
            <option value="">All Stores</option>
            {stores.map(store => (
              <option key={store} value={store}>{store}</option>
            ))}
          </select>
        </div>

        <div>
          <label>SKU</label><br />
          <select value={selectedSku} onChange={e => onSkuChange(e.target.value)}>
            <option value="">All SKUs</option>
            {skus.map(sku => (
              <option key={sku} value={sku}>{sku}</option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "24px" }}>
          <label>
            <input
              type="checkbox"
              checked={showDeadOnly}
              onChange={e => onDeadToggle(e.target.checked)}
            /> Show Dead Stock Only
          </label>
        </div>
      </div>
    </div>
  );
}

export default Filters;
