export function exportToBib(data, filename = "publications.bib") {
  const bibContent = data.map((item, index) => `
@article{entry${index},
  title = {${item.title}},
  year = {${item.year}},
  journal = {${item.journal}},
  doi = {${item.doi}}
}`).join("\n");

  const blob = new Blob([bibContent], { type: "text/plain;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
