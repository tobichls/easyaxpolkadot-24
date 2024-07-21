# Smart Contract Storage and Polkadot Interaction

## Overview

This project provides a user-friendly interface for uploading smart contracts, storing them on IPFS, and interacting with the Polkadot blockchain. It simplifies the management of smart contracts by ensuring decentralized, secure storage and easy retrieval and verification.

## Features

- **Smart Contract Upload**: Users can upload their smart contracts through a web interface.
- **IPFS Storage**: Uploaded smart contracts are stored on IPFS for decentralized and persistent storage.
- **Polkadot Integration**: Interact with the Polkadot blockchain to log and retrieve smart contract data.
- **User-Friendly Interface**: Simplified process for users to manage their smart contracts.

## Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- Rust (for compiling the Substrate node and smart contracts)
- Cargo Contract (`cargo install cargo-contract --force`)
- IPFS CLI (`npm install -g ipfs-http-client`)

### Backend Setup

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name/backend
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Start the Substrate Node**:
    ```sh
    ./target/release/node-template --dev
    ```

4. **Run the Backend**:
    ```sh
    node index.mjs
    ```

### Frontend Setup

1. **Navigate to the Frontend Directory**:
    ```sh
    cd ../frontend
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Run the Frontend**:
    ```sh
    npm run dev
    ```

### Interacting with the Smart Contract

1. **Compile the Smart Contract**:
    ```sh
    cd ../cid_storage
    cargo +nightly contract build
    ```

2. **Deploy the Smart Contract**:
    - Open [Polkadot JS Apps](https://polkadot.js.org/apps/#/contracts).
    - Connect to your local node (`ws://127.0.0.1:9944`).
    - Upload the compiled WASM file and deploy the contract.

## Highlights

- **Decentralized Storage**: Ensures smart contracts are stored securely and persistently using IPFS.
- **Blockchain Integration**: Logs and retrieves smart contract data using the Polkadot blockchain, providing transparency and traceability.
- **User-Friendly Interface**: Simplifies the management and interaction with smart contracts, even for users with limited blockchain experience.

## Challenges

- **Compatibility Issues**: Ensuring compatibility between Node.js, IPFS, and Polkadot.js can be challenging. Make sure to use the recommended versions to avoid issues.
- **Network Configuration**: Proper setup and configuration of the local Substrate node are crucial. Ensure the node is running and accessible before attempting to interact with it.
- **Handling Asynchronous Operations**: Managing asynchronous interactions with IPFS and Polkadot requires careful handling to ensure smooth operation.

## Future Development

- **Advanced Query System**: Implementing a robust querying interface for smart contracts.
- **Cross-Chain Compatibility**: Extending support to other blockchain networks.
- **User Authentication**: Adding secure user authentication and account management features.
- **Enhanced Metadata and Analytics**: Providing detailed insights and performance metrics for smart contracts.

