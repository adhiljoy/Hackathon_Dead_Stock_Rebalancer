import React from "react";
import Papa from "papaparse";
import { supabase } from "../utils/supabase";

function DataUpload({ onUploadSuccess }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data.map(row => ({
          store_id: row.store_id,
          sku_id: row.sku_id,
          category: row.category,
          current_stock: Number(row.current_stock),
          stock_age_days: Number(row.stock_age_days),
          daily_sales: Number(row.daily_sales || 0)
        }));

        const { error } = await supabase
          .from("inventory")
          .insert(rows);

        if (error) {
          console.error("Upload failed:", error);
          alert("Upload failed. Check console for details.");
        } else {
          alert("Inventory uploaded successfully!");
          if (onUploadSuccess) onUploadSuccess();
        }
      }
    });
  };

  return (
    <div className="card">
      <h3>📤 Upload Inventory (ERP / CSV)</h3>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
    </div>
  );
}

export default DataUpload;
