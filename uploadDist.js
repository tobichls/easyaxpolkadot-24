// uploadDist.js
// import { create } from '@web3-storage/w3up-client';
// import { getFilesFromPath } from 'files-from-path';
// import path from 'path';
// import dotenv from 'dotenv';
const path = require('path');
const dotenv = require('dotenv');
const { getFilesFromPath } = require('files-from-path');

dotenv.config();

async function main() {
  console.log("Starting the main function...");
  const { create } = await import('@web3-storage/w3up-client');
  console.log("Imported create function");

  const client = await create({
    token: process.env.WEB3_STORAGE_TOKEN,  // Assuming the token is needed and stored in .env
    proof: process.env.IPFS_STORAGE_PROOF  // Use the proof directly if the API supports this
  });
  console.log("Created client");

  const userEmail = 'tobifakoya@gmail.com';
  console.log("Logging in with email:", userEmail);

  // Log in to web3.storage
  const myAccount = await client.login(userEmail);
  console.log("Logged in with email:", userEmail);

  const spaceDID = 'did:key:z6Mkp4owiPjuPuD5LZxyoN9MggYLWG4BQFAhrumuKcd722Fz';  // Use the DID of 'dApp1'
  console.log("Using existing space with DID:", spaceDID);

  // Use the existing space
  await client.setCurrentSpace(spaceDID);
  console.log("Using existing space with DID:", spaceDID);

  // Upload files
  const distPath = path.join(__dirname, 'frontend', 'dist');
  const files = await getFilesFromPath(distPath);
  const directoryCid = await client.uploadDirectory(files);
  console.log('Content added with CID:', directoryCid);
}

main().catch(error => {
  console.error("Error in main function:", error);
});
