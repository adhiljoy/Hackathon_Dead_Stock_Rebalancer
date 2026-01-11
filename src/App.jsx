import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "./utils/supabase";
import { calculateImpactMetrics } from "./utils/impactMetrics";

import DataUpload from "./components/DataUpload";
import SummaryCards from "./components/SummaryCards";
import RiskTable from "./components/RiskTable";
import TransferRecommendations from "./components/TransferRecommendations";
import Filters from "./components/Filters";

import {
  identifyDeadStock,
  recommendTransfers
} from "./utils/inventoryLogic";

function App() {
  const [inventory, setInventory] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);
  const [rules, setRules] = useState({});

  const [deadStock, setDeadStock] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [impactMetrics, setImpactMetrics] = useState(null);

  const [selectedStore, setSelectedStore] = useState("");
  const [selectedSkuFilter, setSelectedSkuFilter] = useState("");
  const [showDeadOnly, setShowDeadOnly] = useState(true);

  // 🔁 CENTRAL INVENTORY FETCH FUNCTION
  const fetchInventory = useCallback(async () => {
    const { data, error } = await supabase
      .from("inventory")
      .select("*");

    if (error) {
      console.error("Error fetching inventory:", error);
      return;
    }

    setInventory(data);
  }, []);

  // 🔹 INITIAL LOAD
  useEffect(() => {
    async function loadInitialData() {
      await fetchInventory();

      const sales = await fetch("/data/sales_history.json").then(r => r.json());
      const rls = await fetch("/data/transfer_rules.json").then(r => r.json());

      setSalesHistory(sales);
      setRules(rls);
    }

    loadInitialData();
  }, [fetchInventory]);

  // 🔹 COMPUTE DEAD STOCK & IMPACT
  useEffect(() => {
    if (inventory.length && salesHistory.length && rules.dead_stock_rules) {
      const dead = identifyDeadStock(inventory, salesHistory, rules);
      setDeadStock(dead);

      const recs = recommendTransfers(dead, inventory, salesHistory, rules);
      setTransfers(recs);

      const metrics = calculateImpactMetrics(inventory, dead, recs);
      setImpactMetrics(metrics);
    }
  }, [inventory, salesHistory, rules]);

  // 🔹 APPLY FILTER (ALL vs DEAD ONLY)
  const displayedInventory = showDeadOnly
    ? inventory.filter(item =>
        deadStock.some(
          d =>
            d.store_id === item.store_id &&
            d.sku_id === item.sku_id
        )
      )
    : inventory;

  const stores = [...new Set(inventory.map(i => i.store_id))];
  const skus = [...new Set(inventory.map(i => i.sku_id))];

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧠 Smart Inventory Rebalancing Dashboard</h2>

      <SummaryCards impactMetrics={impactMetrics} />

      {/* 🔹 DataUpload now triggers inventory refresh */}
      <DataUpload onUploadSuccess={fetchInventory} />

      <Filters
        stores={stores}
        skus={skus}
        selectedStore={selectedStore}
        selectedSku={selectedSkuFilter}
        showDeadOnly={showDeadOnly}
        onStoreChange={setSelectedStore}
        onSkuChange={setSelectedSkuFilter}
        onDeadToggle={setShowDeadOnly}
      />

      <RiskTable
        inventory={displayedInventory}
        deadStock={deadStock}
      />

      <TransferRecommendations transfers={transfers} />
    </div>
  );
}

export default App;
