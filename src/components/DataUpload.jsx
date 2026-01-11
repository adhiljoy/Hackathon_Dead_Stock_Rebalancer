import React, { useState } from "react";

function DataUpload() {
  const [fileName, setFileName] = useState("");
  const [recordCount, setRecordCount] = useState(null);
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setError("");

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        if (file.name.endsWith(".json")) {
          const data = JSON.parse(event.target.result);
          setRecordCount(Array.isArray(data) ? data.length : 1);
        } else if (file.name.endsWith(".csv")) {
          const lines = event.target.result.split("\n");
          setRecordCount(lines.length - 1);
        } else {
          setError("Unsupported file format. Upload CSV or JSON.");
        }
      } catch (err) {
        setError("Failed to parse file.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="card">
      <h3>📥 ERP Data Import</h3>

      <input type="file" accept=".csv,.json" onChange={handleFileUpload} />

      {fileName && (
        <p>
          <strong>File:</strong> {fileName}
        </p>
      )}

      {recordCount !== null && (
        <p>
          <strong>Records detected:</strong> {recordCount}
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p style={{ fontSize: "12px", color: "#777" }}>
        Supports ERP exports in CSV or JSON format.
      </p>
    </div>
  );
}

export default DataUpload;
