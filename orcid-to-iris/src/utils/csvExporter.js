import { parse } from "json2csv";

export function exportToCsv(data, filename = "publications.csv") {
  const csvFields = ["title", "doi", "journal", "year"];
  const csvData = parse(data, { fields: csvFields });

  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
