export function exportToCsv(data, filename) {
    const csvContent = [
      [
        "Title",
        "Authors",
        "DOI",
        "Journal",
        "Year",
        "Volume",
        "Issue",
        "Pages",
        "Abstract",
        "Publisher",
      ],
      ...data.map((item) => [
        item.title,
        item.authors,
        item.doi,
        item.journal,
        item.year,
        item.volume,
        item.issue,
        item.pages,
        item.abstract,
        item.publisher,
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