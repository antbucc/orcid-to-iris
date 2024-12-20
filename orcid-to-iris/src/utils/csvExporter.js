export function exportToCsv(data, filename) {
    const csvContent = [
      ["Title", "Authors", "DOI", "Journal", "Year", "Volume", "Issue", "Pages", "Abstract"],
      ...data.map((article) => [
        article.title,
        article.authors,
        article.doi,
        article.journal,
        article.year,
        article.volume,
        article.issue,
        article.pages,
        article.abstract,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  