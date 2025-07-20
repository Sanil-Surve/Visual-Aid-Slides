// import * as pdfjsLib from "./pdf.mjs";

// pdfjsLib.GlobalWorkerOptions.workerSrc = "./pdf.worker.mjs";

// const url = "./matching.pdf";

// const loadingTask = pdfjsLib.getDocument(url);
// loadingTask.promise
//   .then((pdf) => pdf.getPage(1))
//   .then((page) => {
//     const scale = 1.5;
//     const viewport = page.getViewport({ scale });

//     const canvas = document.getElementById("pdf-canvas");
//     const context = canvas.getContext("2d");
//     canvas.width = viewport.width;
//     canvas.height = viewport.height;

//     const renderContext = {
//       canvasContext: context,
//       viewport: viewport,
//     };

//     page.render(renderContext);
//   })
//   .catch((error) => {
//     console.error("PDF rendering error:", error);
//   });

import * as pdfjsLib from "./pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = "./pdf.worker.mjs";

const url = "matching.pdf";

const loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then((pdf) => {
  const container = document.querySelector("#pdfModal .modal-body > div");
  container.innerHTML = ""; // Clear previous canvases if any

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    pdf.getPage(pageNumber).then((page) => {
      const scale = 1.2;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      canvas.style.marginBottom = "20px";
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const context = canvas.getContext("2d");
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      container.appendChild(canvas);
      page.render(renderContext);
    });
  }
});
