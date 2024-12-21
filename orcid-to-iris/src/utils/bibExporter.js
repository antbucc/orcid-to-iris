export function exportToBib(data, filename) {
  const bibContent = data
    .map((item, index) => {
      const entryType = "article"; // Adjust the entry type based on your data (e.g., "book", "inproceedings")
      return `
@${entryType}{entry${index},
  title = {${item.title || "Unknown Title"}},
  author = {${item.authors || "Unknown Authors"}},
  journal = {${item.journal || "Unknown Journal"}},
  year = {${item.year || "Unknown Year"}},
  doi = {${item.doi || "Unknown"}},
  url = {${item.url || ""}}
}`;
    })
    .join("\n");

  const blob = new Blob([bibContent], { type: "text/plain;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
