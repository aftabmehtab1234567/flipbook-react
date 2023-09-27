import React, { useState, useEffect } from 'react';
import './App.css';

import FlipBook from './component/FlipBook';
import PdfToImages from './component/PdfToImages'; // Import the PDFToImages component
import pdf from './images/intro.pdf'; // Import your PDF file here

function App() {
  const [imageArray, setImageArray] = useState([]); // Initialize imageArray state

  useEffect(() => {
    // Load the PDF file and set it as the initial value for imageArray
    fetch(pdf)
      .then(response => response.blob())
      .then(blob => {
        // Create an object URL from the blob
        const objectURL = URL.createObjectURL(blob);

        // Set the object URL as the initial value for imageArray
        setImageArray([objectURL]);
      });
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="App">
      <h1>PDF Flipbook Viewer</h1>
      <PdfToImages pdfFile={pdf}  /> {/* Pass pdf as a prop */}
      <FlipBook  imageArray={imageArray}  />
    </div>
  );
}

export default App;
