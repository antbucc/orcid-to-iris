import React, { useState } from "react";
import { fetchArticlesFromOrcid } from "./services/orcidService";
import { exportToCsv } from "./utils/csvExporter";

function App() {
  const [orcidId, setOrcidId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateCsv = async () => {
    setLoading(true);
    setError("");

    try {
      const articles = await fetchArticlesFromOrcid(orcidId, accessToken);
      if (articles.length > 0) {
        exportToCsv(articles, "iris_import.csv");
      } else {
        setError("Nessun articolo trovato con i dati forniti.");
      }
    } catch (err) {
      setError("Errore durante il recupero dei dati. Controlla i dati inseriti.");
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
          placeholder="Inserisci il tuo ORCID ID"
        />
      </label>
      <br />
      <label>
        Access Token:
        <input
          type="password"
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
          placeholder="Inserisci il tuo Access Token"
        />
      </label>
      <br />
      <button onClick={handleGenerateCsv} disabled={loading}>
        {loading ? "Generazione in corso..." : "Genera CSV"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
