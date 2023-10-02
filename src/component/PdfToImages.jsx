import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import * as htmlToImage from 'html-to-image';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import FlipBook from './FlipBook';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFToImages({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [imageArray, setImageArray] = useState([]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleImageConversion = async (numPages) => {
    const images = [];
    for (let page = 0; page < numPages; page++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const pdfPage = document.querySelector(`.react-pdf__Page[data-page-number="${page + 1}"]`);

      if (pdfPage) {
        try {
          const img = await htmlToImage.toPng(pdfPage);
          images.push(img);

          // Add a CSS class to hide the PDF pages
          pdfPage.classList.add("hidden-pdf-page");
        } catch (error) {
          console.error(`Error converting page ${page + 1} to image:`, error);
          // Handle the error here or skip this page and continue processing
        }
      } else {
        console.error(`Page ${page + 1} not found.`);
        // Handle the missing page here or skip this page and continue processing
      }
    }

    setImageArray(images);
  };

  useEffect(() => {
    if (numPages) {
      handleImageConversion(numPages);
    }
  }, [numPages]);

  return (
    <div>
      <style>
        {`
          /* CSS to hide the PDF pages */
          .hidden-pdf-page {
            display: none;
          }
        `}
      </style>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages }).map((_, index) => (
          <Page key={index} pageNumber={index + 1} />
        ))}
      </Document>
     
      <FlipBook imageArray={imageArray} />
    </div>
  );
}

export default PDFToImages;
