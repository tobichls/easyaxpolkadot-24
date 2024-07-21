import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UploadContract from './components/UploadContract';

function App() {
  const [cid, setCid] = useState(null);

  const handleUpload = async (fileContent, fileName) => {
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileContent, fileName }),
    });
    const data = await response.json();
    setCid(data.cid);
  };

  return (
    <div>
      <h1>Smart Contract Upload</h1>
      <UploadContract onUpload={handleUpload} />
      {cid && <p>Uploaded CID: {cid}</p>}
    </div>
  );
}

export default App;
