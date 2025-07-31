window.function = async function (pdfUrl) {
  const url = pdfUrl.value;
  if (!url) return "No PDF URL provided.";

  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      if (window.pdfjsLib && window.pdfjsLib.getDocument) {
        clearInterval(interval);
        try {
          const loadingTask = window.pdfjsLib.getDocument(url);
          const pdf = await loadingTask.promise;

          let fullText = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const text = content.items.map(item => item.str).join(" ");
            fullText += text + "\n";
          }

          resolve(fullText.trim());
        } catch (error) {
          resolve(`Error: ${error.message}`);
        }
      }
    }, 100);
  });
};

