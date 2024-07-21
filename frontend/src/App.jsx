import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UploadContract from './components/UploadContract';
import QueryInput from './components/QueryInput';
import QueryResult from './components/QueryResult';

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

function App() {
  const [result, setResult] = useState(null);

  const handleUpload = async (fileContent, fileName) => {
    // Implement IPFS upload logic here
    // Example: upload to web3.storage
    const cid = await uploadToIPFS(fileContent, fileName);
    console.log('Uploaded CID:', cid);
  };

  const handleQuery = async (query) => {
    // Implement query logic here
    const response = await querySmartContract(query);
    setResult(response);
  };

  return (
    <div>
      <h1>Smart Contract Query System</h1>
      <UploadContract onUpload={handleUpload} />
      <QueryInput onQuery={handleQuery} />
      {result && <QueryResult result={result} />}
    </div>
  );
}

async function uploadToIPFS(fileContent, fileName) {
  // Implement IPFS upload logic here
  // Example using web3.storage
  const client = new Web3Storage({ token: 'YOUR_WEB3_STORAGE_API_KEY' });
  const files = [new File([fileContent], fileName)];
  const cid = await client.put(files);
  return cid;
}

async function querySmartContract(query) {
  // Implement smart contract query logic here
  return { message: 'Query result will be displayed here' };
}

export default App
