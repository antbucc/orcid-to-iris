import Papa from "papaparse";

export function exportToCsv(data, filename = "publications.csv") {
  const csvData = Papa.unparse(data);

  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
