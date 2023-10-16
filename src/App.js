import React from 'react';
import MyPDFViewer from './MyPDFView';

function App() {
    return (
        <div className='App'>
            <MyPDFViewer pdfUrl = "/home/kenji/workspace/pdf-viwer-app/src/pdf/sample01.pdf" />
        </div>
    );
}

export default App;