import { calculateImpactMetrics } from "./utils/impactMetrics";
import DataUpload from "./components/DataUpload";
import React, { useEffect, useState } from "react";

import {
  identifyDeadStock,
  identifyDemandStores,
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
  const [filteredDeadStock, setFilteredDeadStock] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [impactMetrics, setImpactMetrics] = useState(null);


  const [selectedSku, setSelectedSku] = useState(null);
  const [demandStores, setDemandStores] = useState([]);

  // Filters state
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedSkuFilter, setSelectedSkuFilter] = useState("");
  const [showDeadOnly, setShowDeadOnly] = useState(true);

  useEffect(() => {
    async function loadData() {
      const sales = await fetch("/data/sales_history.json").then(r => r.json());
      const inv = await fetch("/data/inventory_snapshot.json").then(r => r.json());
      const rls = await fetch("/data/transfer_rules.json").then(r => r.json());

      setSalesHistory(sales);
      setInventory(inv);
      setRules(rls);
    }
    loadData();
  }, []);

  // Compute dead stock & transfers
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


  // Apply filters
  useEffect(() => {
    let filtered = [...deadStock];

    if (selectedStore) {
      filtered = filtered.filter(item => item.store_id === selectedStore);
    }

    if (selectedSkuFilter) {
      filtered = filtered.filter(item => item.sku_id === selectedSkuFilter);
    }

    setFilteredDeadStock(filtered);
  }, [deadStock, selectedStore, selectedSkuFilter]);

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

      <RiskTable deadStock={filteredDeadStock} />

      <DemandStores skuId={selectedSku} demandStores={demandStores} />

      <TransferRecommendations transfers={transfers} />
    </div>
  );
}

export default App;
