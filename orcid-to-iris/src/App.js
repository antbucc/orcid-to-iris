import React, { useState } from "react";
import { fetchPublicationsWithToken } from "./services/orcidService";
import { exportToCsv } from "./utils/csvExporter";

function App() {
  const [orcidId, setOrcidId] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateCsv = async () => {
    setLoading(true);
    setError("");

    try {
      const publications = await fetchPublicationsWithToken(orcidId, token);

      if (publications.length > 0) {
        exportToCsv(publications, "iris_import.csv");
      } else {
        setError("No publications found for the provided ORCID ID.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>ORCID to IRIS CSV Generator</h1>
      <label>
        ORCID ID:
        <input
          type="text"
          value={orcidId}
          onChange={(e) => setOrcidId(e.target.value)}
          placeholder="Enter your ORCID ID"
          style={{ margin: "10px 0", padding: "10px", width: "100%" }}
        />
      </label>
      <br />
      <label>
        Access Token:
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter your access token"
          style={{ margin: "10px 0", padding: "10px", width: "100%" }}
        />
      </label>
      <br />
      <button
        onClick={handleGenerateCsv}
        disabled={loading}
        style={{ padding: "10px 20px", marginTop: "10px" }}
      >
        {loading ? "Generating..." : "Generate CSV"}
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

export default App;