window.function = async function (pdfUrl) {
  const url = pdfUrl.value;

  if (!url) return "No PDF URL provided.";

  try {
    const pdfjsLib = await import("https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.min.mjs");

    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items.map(item => item.str).join(" ");
      fullText += text + "\n";
    }

    return fullText.trim();
  } catch (err) {
    return `Error: ${err.message}`;
  }
};
