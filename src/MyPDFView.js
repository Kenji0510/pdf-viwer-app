//import logo from './logo.svg';
import './App.css';
import { Document, Page, pdfjs } from 'react-pdf';
import React, { useEffect, useState } from 'react';
import pdf from './pdf/sample01.pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function MyPDFViewer(props) {
  const [numPages, setNumPages] = useState(null);
  const [isLoadingPDF, setIsLoadingPDF] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState(0);
  const [pdfURL, setPdfURL] = useState([]);
  //const API_URL = 'http://192.168.0.25:8000/';
  const API_URL = 'https://kapibara0510.tplinkdns.com/api';


  useEffect(() => {
    const fetchPdfUrl = async () => {
      try {
        let response = await fetch(API_URL);
        let result = await response.json();
        console.log(result);

        const fetchedData = await result.map((item) => item.pdfFileURL);
        setPdfURL(fetchedData);
        setIsLoadingPDF(false);
        console.log(fetchedData);
      } catch (error) {
        console.log("Error fetching the data:", error);
      }
    };

    fetchPdfUrl();
  }, []);
  
  function onDocumentLoadPages({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <h1 className='Title'>PDF可視化サイト</h1>
      
      {isLoadingPDF ? (<p>Loading...</p>) : (
        <>
        <div className='pdf_switch_button'>
          {pdfURL.map((_, index) => {
            return (
              <div className={`${index === selectedPdf ? "selected" : ""}`} key={index} onClick={() => {
                setSelectedPdf(index);
              }}
              >
                {index + 1}
              </div>
            );
          })}
        </div>

        <Document file={pdfURL[selectedPdf]} onLoadSuccess={onDocumentLoadPages} onLoadError={console.err}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index+1}`} pageNumber={index + 1} />
        ))}
        </Document>
        </>
      )}

    </div>
  );

}


export default MyPDFViewer;