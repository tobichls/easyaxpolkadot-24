// src/components/UploadContract.js
import React, { useState } from 'react';

function UploadContract({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result, file.name);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Contract</button>
    </div>
  );
}

export default UploadContract;
