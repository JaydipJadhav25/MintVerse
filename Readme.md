# 🚀 MintVerse

**MintVerse** is a decentralized NFT minting platform where users can create, own, and explore unique digital assets on the blockchain. It allows anyone to mint personal NFTs and browse NFTs created by others in a public marketplace.

---

## 🌟 Features

* 🖼️ **Mint Your Own NFT**

  * Upload image (IPFS)
  * Add name, description, metadata
  * Mint NFT using ERC721 smart contract

* 🌐 **Explore NFTs**

  * View all minted NFTs
  * Public gallery page
  * NFT details (owner, tokenId, metadata)

* 👛 **Wallet Integration**

  * Connect with MetaMask
  * Secure transactions

* 📦 **IPFS Storage**

  * Store images and metadata using IPFS (Pinata)

* 🔗 **Blockchain Powered**

  * Built on Ethereum / Polygon
  * ERC721 standard

---

## 🏗️ Tech Stack

### 🔹 Smart Contract

* Solidity
* ERC721 (OpenZeppelin)

### 🔹 Frontend

* React (Vite)
* Tailwind CSS
* Ethers.js / Viem

### 🔹 Storage

* IPFS (Pinata)

---

## 📁 Project Structure

```
MintVerse/
│
├── smartContract/    # Solidity Smart Contracts
├── frontend/        # React App
│   ├── components/
│   ├── pages/
│   └── utils/
├── metadata/        # Sample NFT metadata
└── README.md
├── backend/        

```

---

## ⚙️ Smart Contract Overview

* Based on **ERC721 standard**
* Each NFT has:

  * `tokenId`
  * `tokenURI` (IPFS metadata link)
* Functions:

  * `mintNFT(address to, string memory tokenURI)`
  * `totalSupply()`
  * `ownerOf(tokenId)`

---

## 🔄 Workflow

1. User connects wallet
2. Uploads image → stored on IPFS
3. Metadata JSON created → uploaded to IPFS
4. Smart contract mints NFT with `tokenURI`
5. NFT appears in Explore page

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/mintverse.git
cd mintverse
```

### 2️⃣ Install dependencies

```bash
cd frontend
npm install
```

### 3️⃣ Run frontend

```bash
npm run dev
```

### 4️⃣ Deploy Smart Contract

Using Foundry / Hardhat:

```bash
forge build
forge create
```

---

## 🔐 Environment Variables

Create `.env` file:

```
VITE_RPC_URL=your_rpc_url
VITE_CONTRACT_ADDRESS=your_contract_address
VITE_PINATA_API_KEY=your_key
VITE_PINATA_SECRET=your_secret
```

---

## 📸 Future Improvements

* 🔥 NFT marketplace (buy/sell)
* ❤️ Like / Favorite NFTs
* 👤 User profiles
* 📊 Trending NFTs
* 💬 Comments & social features

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a PR.

---

## 📄 License

MIT License

---

## 💡 Author

Built with ❤️ by you
**MintVerse — Create. Own. Explore.**
