export async function fetchArticlesFromOrcid(orcidId, accessToken) {
    const url = `https://pub.orcid.org/v3.0/${orcidId}/works`;
  
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Errore durante la richiesta all'API di ORCID.");
    }
  
    const data = await response.json();
    const articles = [];
  
    for (const work of data.group || []) {
      const summary = work["work-summary"][0];
      const title = summary.title?.title?.value || "Unknown Title";
      let doi = null;
  
      for (const extId of summary["external-ids"]?.["external-id"] || []) {
        if (extId["external-id-type"] === "doi") {
          doi = extId["external-id-value"];
          break;
        }
      }
  
      articles.push({
        title,
        authors: "Unknown Authors", // ORCID non restituisce gli autori
        doi,
        journal: summary["journal-title"]?.value || "Unknown Journal",
        year: summary["publication-date"]?.year?.value || "Unknown Year",
        volume: summary.volume || "Unknown Volume",
        issue: summary.issue || "Unknown Issue",
        pages: summary.pages || "Unknown Pages",
        abstract: "No abstract available",
      });
    }
  
    return articles;
  }
  