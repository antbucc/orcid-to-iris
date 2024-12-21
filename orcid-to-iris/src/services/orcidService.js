import { parseStringPromise } from "xml2js";

export async function fetchPublicationsWithToken(orcidId, token) {
  if (!orcidId || !/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(orcidId)) {
    throw new Error("Invalid ORCID ID format. Please use the format ####-####-####-####.");
  }

  if (!token) {
    throw new Error("Missing access token. Please provide a valid token.");
  }

  const url = `https://api.orcid.org/v3.0/${orcidId}/activities`;
  const headers = {
    Accept: "application/xml",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch XML: ${response.status} - ${response.statusText}`);
    }

    const xml = await response.text();
    const result = await parseStringPromise(xml, { explicitArray: false });

    const works = result?.["activities:activities-summary"]?.["activities:works"]?.["activities:group"];
    if (!works) {
      return [];
    }

    return (Array.isArray(works) ? works : [works]).flatMap(parseWorkGroup);
  } catch (error) {
    throw new Error(`Error fetching or parsing XML: ${error.message}`);
  }
}

function parseWorkGroup(workGroup) {
  const summaries = Array.isArray(workGroup["work:work-summary"])
    ? workGroup["work:work-summary"]
    : [workGroup["work:work-summary"]];

  return summaries.map((summary) => {
    const externalIds = Array.isArray(summary?.["common:external-ids"]?.["common:external-id"])
      ? summary["common:external-ids"]["common:external-id"]
      : [summary?.["common:external-ids"]?.["common:external-id"]].filter(Boolean);

    const doi = externalIds.find((id) => id["common:external-id-type"] === "doi")?.["common:external-id-value"] || "";

    return {
      title: summary?.["work:title"]?.["common:title"] || "No Title",
      authors: extractContributors(summary),
      doi,
      journal: summary?.["work:journal-title"]?.["common:title"] || "No Journal",
      year: summary?.["common:publication-date"]?.["common:year"] || "No Year",
      volume: "No Volume",
      issue: "No Issue",
      pages: "No Pages",
      abstract: summary?.["common:short-description"] || "No Abstract",
      publisher: "No Publisher",
    };
  });
}

function extractContributors(summary) {
  const contributors = summary?.["work:contributors"]?.["work:contributor"];
  if (!contributors) return "No Authors";

  const contributorArray = Array.isArray(contributors) ? contributors : [contributors];
  return contributorArray
    .map((contributor) => contributor?.["common:credit-name"] || contributor?.["work:contributor-name"] || "Unknown Author")
    .join(", ");
}