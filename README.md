# 📊 Blockchain Voting System

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)  
[![Solidity](https://img.shields.io/badge/Solidity-0.8.28-blue.svg)](https://docs.soliditylang.org/en/v0.8.28/)  
[![React](https://img.shields.io/badge/React-v18.2.0-61dafb.svg)](https://reactjs.org/)  
[![Hardhat](https://img.shields.io/badge/Hardhat-v2.12.7-purple.svg)](https://hardhat.org/)  
[![License](https://img.shields.io/badge/Node.js-v18.x-green.svg)](https://nodejs.org/)  


## 🚀 Project Overview

This project implements a **decentralized blockchain voting system** using Ethereum smart contracts, deployed and tested with Hardhat, and a React-based frontend for user interaction.

- The system allows users to vote on predefined candidates on-chain.
- Each account can cast only one vote.
- Real-time UI updates reflect vote counts using smart contract event listening.
- Time-locked Ether withdrawal contract included for demonstrating smart contract utility.


## ✨ Features

- **Smart Contracts** written in Solidity for voting and locked funds.
- **Secure voting:** One vote per Ethereum account enforced on-chain.
- **Event-driven frontend:** React app listens for blockchain events and updates UI dynamically.
- **User account management:** Select from available local Ethereum accounts to vote.
- **Deployment with Hardhat:** Easy deployment to local/test networks.
- **Toast notifications:** For user feedback on transaction status.
- **Clean, responsive UI** using React and modern CSS.


## 📁 Folder Structure
```
├── artifacts/ # Compiled contracts and build info
├── cache/ # Solidity cache files
├── contracts/ # Solidity smart contracts
│ ├── Lock.sol # Time-locked Ether withdrawal contract
│ └── Voting.sol # Voting contract with candidates and voting logic
├── frontend/ # React frontend application
│ ├── src/
│ │ ├── App.jsx # Default React starter (not main voting UI)
│ │ ├── VotingApp.jsx # Main voting interface component
│ │ └── main.jsx # React app entry point
│ ├── package.json # Frontend dependencies and scripts
│ └── ... # Other frontend config files and assets
├── scripts/
│ └── deploy.js # Deployment script using Hardhat and ethers.js
├── test/
│ └── Lock.js # Tests for Lock contract
├── hardhat.config.js # Hardhat configuration file
├── package.json # Root project dependencies and scripts
└── README.md # This README file
```
## 🛠️ Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18.x or above  
- [npm](https://www.npmjs.com/) (comes with Node.js)  
- [Hardhat](https://hardhat.org/getting-started/) installed globally or as dev dependency  
- [Git](https://git-scm.com/) (optional)

---

### Clone the repository

```
git clone https://github.com/Ashank007/blockchain-votingsystem.git
cd blockchain-voting-system
```

### Install dependencies
Root project (Hardhat + scripts + tests)
```
npm install
```
Frontend
```
cd frontend
npm install
```

### Compile and deploy contracts

Start local Hardhat node (in a separate terminal):

```
npx hardhat node
```
Deploy contracts:
```
npx hardhat run scripts/deploy.js --network localhost
```

You will see the deployed contract address in the console.
- Important: Update the CONTRACT_ADDRESS constant in frontend/src/VotingApp.jsx with your deployed contract address.

### Run frontend React app

In the frontend directory:

```
npm run dev
```
Open your browser at http://localhost:5173

## 🧪 Running Tests

Tests for the Lock contract are located in the test/ directory.

Run tests using:
```
npx hardhat test
```

## 🔧 Usage

- Open the frontend UI.

- Select an Ethereum account from the dropdown.

- View candidates and their current vote counts.

- Click the "Vote" button next to a candidate to cast your vote.

- The UI will update automatically when votes are recorded on the blockchain.

- Notifications inform you of transaction success or failure.

## ⚙️ Technologies Used

| Technology     | Description                                |
|----------:|--------------------------------------|
| Solidity 0.8.28  | Smart contract programming language |
| Hardhat   | Ethereum development environment                |
| Ethers.js  | Library for Ethereum blockchain interaction          |
| React 18.2.0      | Frontend UI framework                                  |
| Web3.js| Ethereum JavaScript API             |
|react-toastify| Toast notifications UI library|

## 📜 License

This project is licensed under the MIT License.


