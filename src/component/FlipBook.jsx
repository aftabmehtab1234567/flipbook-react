import React, { useState, useEffect, useRef } from 'react';
import Flipbook from 'react-pageflip';

function FlipBook({ imageArray }) {
  const [currentPage, setCurrentPage] = useState(0);
  const flipPageRef = useRef(null);

  useEffect(() => {
    // You can remove the code to fetch and set imageArray here
    // since it is already received as a prop from the parent component.
  }, []);

  if (!Array.isArray(imageArray) || imageArray.length === 0) {
    return <div>No images to display.</div>;
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="background-container">
      <div className="centered-container">
        <Flipbook
          ref={flipPageRef}
          width={580} // Adjust the width as needed
          height={800} // Adjust the height as needed
          currentPage={currentPage}
          onFlip={handlePageChange}
        >
          {imageArray.map((imageDataUrl, index) => (
            <div key={index} className="page">
              <img src={imageDataUrl} alt={`Page ${index + 1}`} />
            </div>
          ))}
        </Flipbook>
      </div>
    </div>
  );
}

export default FlipBook;
