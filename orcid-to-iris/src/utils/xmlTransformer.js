import { parseStringPromise } from "xml2js";

export async function parseXmlToPublications(xml) {
  const publications = [];

  try {
    const result = await parseStringPromise(xml, { explicitArray: false });
    const works = result["record"]["activities-summary"]["works"]["group"] || [];

    works.forEach((work) => {
      const summary = work["work-summary"];
      const title = summary?.title?.title?.value || "No Title";
      const doi = summary?.["external-ids"]?.["external-id"]?.find((id) => id["external-id-type"] === "doi")?.["external-id-value"] || "";
      const journal = summary?.["journal-title"]?.value || "No Journal";
      const year = summary?.["publication-date"]?.year?.value || "No Year";
      const volume = summary?.volume || "";
      const issue = summary?.issue || "";
      const pages = summary?.["page-range"] || "";
      const abstract = summary?.["short-description"] || "";
      const authors = summary?.["contributors"]?.["contributor"]
        ?.map((contributor) => contributor["credit-name"]?.value)
        .join(", ") || "No Authors";
      const publisher = summary?.publisher || "";

      publications.push({
        title,
        authors,
        doi,
        journal,
        year,
        volume,
        issue,
        pages,
        abstract,
        publisher,
      });
    });

    return publications;
  } catch (error) {
    console.error("Error parsing XML:", error.message);
    throw new Error("Failed to parse XML.");
  }
}
