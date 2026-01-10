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

function App() {
  const [salesHistory, setSalesHistory] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [rules, setRules] = useState({});
  const [deadStock, setDeadStock] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [selectedSku, setSelectedSku] = useState(null);
  const [demandStores, setDemandStores] = useState([]);

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

  useEffect(() => {
    if (inventory.length && salesHistory.length && rules.dead_stock_rules) {
      const dead = identifyDeadStock(inventory, salesHistory, rules);
      setDeadStock(dead);

      const recs = recommendTransfers(dead, inventory, salesHistory, rules);
      setTransfers(recs);

      if (dead.length > 0) {
        const sku = dead[0].sku_id;
        setSelectedSku(sku);
        setDemandStores(
          identifyDemandStores(inventory, salesHistory, sku, rules)
        );
      }
    }
  }, [inventory, salesHistory, rules]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧠 Smart Inventory Rebalancing Dashboard</h2>

      <SummaryCards
        inventoryCount={inventory.length}
        deadStockCount={deadStock.length}
        transferCount={transfers.length}
      />

      <RiskTable deadStock={deadStock} />

      <DemandStores
        skuId={selectedSku}
        demandStores={demandStores}
      />

      <TransferRecommendations transfers={transfers} />
    </div>
  );
}

export default App;
