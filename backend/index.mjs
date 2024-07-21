import express from 'express';
import cors from 'cors';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { getFilesFromPath } from 'files-from-path';
import path from 'path';
import { ApiPromise, WsProvider } from '@polkadot/api';

const app = express();
app.use(cors());
app.use(express.json());

const ipfs = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});

const provider = new WsProvider('ws://127.0.0.1:9944'); // Connect to your local Substrate node
const api = await ApiPromise.create({ provider });

app.post('/upload', async (req, res) => {
  try {
    const { fileContent, fileName } = req.body;
    const buffer = Buffer.from(fileContent);

    const { cid } = await ipfs.add(buffer);
    console.log('File uploaded with CID:', cid.toString());

    // Example: Log the CID on the local Substrate node
    await api.isReady;
    const blockNumber = await api.query.system.number();
    console.log('Current block number:', blockNumber.toString());

    // Here you could create an extrinsic to log the CID on the blockchain or interact with a smart contract

    res.json({ cid: cid.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
