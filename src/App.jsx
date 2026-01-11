import Legend from "./components/Legend";
import { supabase } from "./utils/supabase";
import { calculateImpactMetrics } from "./utils/impactMetrics";
import DataUpload from "./components/DataUpload";
import React, { useEffect, useState } from "react";

import {
  identifyDeadStock,
  recommendTransfers
} from "./utils/inventoryLogic";

import SummaryCards from "./components/SummaryCards";
import RiskTable from "./components/RiskTable";
import DemandStores from "./components/DemandStores";
import TransferRecommendations from "./components/TransferRecommendations";
import Filters from "./components/Filters";

function App() {
  const [salesHistory, setSalesHistory] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [rules, setRules] = useState({});

  const [deadStock, setDeadStock] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [impactMetrics, setImpactMetrics] = useState(null);

  // Filters state
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedSkuFilter, setSelectedSkuFilter] = useState("");
  const [showDeadOnly, setShowDeadOnly] = useState(true);

  // 🔹 LOAD DATA
  useEffect(() => {
    async function loadData() {
      const { data: inventoryData, error } = await supabase
        .from("inventory")
        .select("*");

      if (error) {
        console.error("Error fetching inventory:", error);
        return;
      }

      const sales = await fetch("/data/sales_history.json").then(r => r.json());
      const rls = await fetch("/data/transfer_rules.json").then(r => r.json());

      setInventory(inventoryData);
      setSalesHistory(sales);
      setRules(rls);
    }

    loadData();
  }, []);

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

  // 🔹 APPLY FILTERS
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

      <DataUpload />

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
      <Legend />


      <RiskTable
        inventory={displayedInventory}
        deadStock={deadStock}
      />

      <TransferRecommendations transfers={transfers} />
    </div>
  );
}

export default App;
