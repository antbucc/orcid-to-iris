import React, { useState } from "react";
import { fetchPublications } from "./services/orcidService";
import { exportToCsv } from "./utils/csvExporter";
import { exportToBib } from "./utils/bibExporter";

function App() {
  const [orcidId, setOrcidId] = useState("");
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    setLoading(true);
    setError("");

    try {
      const token = "Yfb637078-63a0-47d2-a186-6b479a15e901"; // Replace with your actual ORCID token
      const pubs = await fetchPublications(orcidId, token);
      setPublications(pubs);
    } catch (err) {
      setError("Failed to fetch publications. Please check the ORCID ID.");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>ORCID to CSV/BibTeX Exporter</h1>
      <input
        type="text"
        value={orcidId}
        onChange={(e) => setOrcidId(e.target.value)}
        placeholder="Enter ORCID ID"
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <br />
      <button onClick={handleFetch} disabled={loading} style={{ padding: "10px 20px" }}>
        {loading ? "Fetching..." : "Fetch Publications"}
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {publications.length > 0 && (
        <>
          <button
            onClick={() => exportToCsv(publications)}
            style={{ padding: "10px 20px", marginTop: "10px", marginRight: "10px" }}
          >
            Export CSV
          </button>
          <button onClick={() => exportToBib(publications)} style={{ padding: "10px 20px", marginTop: "10px" }}>
            Export BibTeX
          </button>
        </>
      )}
    </div>
  );
}

export default App;
