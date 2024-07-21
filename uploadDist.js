// uploadDist.js
import { create } from '@web3-storage/w3up-client';
import { getFilesFromPath } from 'files-from-path';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const userEmail = 'your_email@example.com';  // Set your email used for web3.storage login

async function main() {
  const client = await create();

  // Log in to web3.storage
  const myAccount = await client.login(userEmail);
  console.log('Logged in with email:', userEmail);

  // Wait for email verification
  while (true) {
    const res = await myAccount.plan.get();
    if (res.ok) break;
    console.log('Waiting for payment plan to be selected...');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Create and provision a space
  const space = await client.createSpace('my-awesome-space');
  await myAccount.provision(space.did());
  await space.save();
  await client.setCurrentSpace(space.did());

  // Upload files
  const distPath = path.join(__dirname, 'frontend', 'dist');
  const files = await getFilesFromPath(distPath);
  const directoryCid = await client.uploadDirectory(files);
  console.log('Content added with CID:', directoryCid);
}

main().catch(console.error);
