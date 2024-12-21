const backendUrl = "orcid2iris-backend.railway.internal/api/orcid"; // Replace with your backend URL

export async function fetchPublications(orcidId, token) {
  try {
    const response = await fetch(`${backendUrl}/${orcidId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch publications: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    const works = result?.["activities:activities-summary"]?.["activities:works"]?.["activities:group"];

    if (!works) {
      console.warn("No works found for this ORCID ID.");
      return [];
    }

    return works.flatMap((workGroup) => parseWorkGroup(workGroup));
  } catch (error) {
    console.error("Error fetching publications:", error.message);
    throw error;
  }
}

function parseWorkGroup(workGroup) {
  const summaries = Array.isArray(workGroup["work:work-summary"])
    ? workGroup["work:work-summary"]
    : [workGroup["work:work-summary"]];

  return summaries.map((summary) => ({
    title: summary?.["work:title"]?.["common:title"] || "No Title",
    doi: summary?.["common:external-ids"]?.["common:external-id"]
      ?.find((id) => id["common:external-id-type"] === "doi")?.["common:external-id-value"] || "",
    journal: summary?.["work:journal-title"]?.["common:title"] || "No Journal",
    year: summary?.["common:publication-date"]?.["common:year"] || "No Year",
  }));
}
