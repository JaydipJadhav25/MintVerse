import { useState  } from "react";
import type { ChangeEvent } from "react";
import { useWallet } from "../context/WalletProvider";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";

const MintNFT = () => {
  const { account, connectWallet } = useWallet();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    collection: "",
  });

  //  Handle Image Upload
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  //  Handle Input
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  Mint Handler (next step will connect blockchain)
  const handleMint = () => {
    console.log("Mint Data:", { image, ...form });
  };






  //  NOT CONNECTED UI
  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h2 className="text-3xl font-bold mb-4">
          Connect Wallet to Mint NFT
        </h2>

        <p className="text-gray-400 mb-6 max-w-md">
          You need to connect your wallet to start creating and minting your NFTs.
        </p>

        <button onClick={connectWallet} className="btn-primary">
           Connect Wallet
        </button>
      </div>
    );
  }

  //  CONNECTED UI
  return (
     <>
     <Navbar/>
      <div className="px-6 md:px-12 py-12 max-w-6xl mx-auto">
     

      {/* 🔥 TITLE */}
      <h1 className="text-4xl font-bold mb-10 text-center">
        Mint Your <span className="gradient-text">NFT</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* 📸 IMAGE PREVIEW */}
        <div className="glass p-6 flex flex-col items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="rounded-xl w-full max-h-[300px] object-cover"
            />
          ) : (
            <p className="text-gray-400">No image selected</p>
          )}

          <label className="mt-6 cursor-pointer btn-primary">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              hidden
            />
          </label>
        </div>

        {/*  FORM */}
        <div className="glass p-6 flex flex-col gap-4">
          
          <input
            type="text"
            name="name"
            placeholder="NFT Name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded-xl bg-black/30 outline-none"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="p-3 rounded-xl bg-black/30 outline-none"
          />

          <input
            type="text"
            name="collection"
            placeholder="Collection (optional)"
            value={form.collection}
            onChange={handleChange}
            className="p-3 rounded-xl bg-black/30 outline-none"
          />

          <input
            type="number"
            name="price"
            placeholder="Price (ETH)"
            value={form.price}
            onChange={handleChange}
            className="p-3 rounded-xl bg-black/30 outline-none"
          />

          <button
            onClick={handleMint}
            className="btn-primary mt-4"
          >
             Mint NFT
          </button>
        </div>
      </div>

      {/* 📖 STEPS SECTION */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          How Minting Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">

          <div className="glass p-6">
            <h3 className="font-semibold text-lg mb-2">1. Upload</h3>
            <p className="text-gray-400">
              Upload your image or digital asset.
            </p>
          </div>

          <div className="glass p-6">
            <h3 className="font-semibold text-lg mb-2">2. Store on IPFS</h3>
            <p className="text-gray-400">
              Your data is stored securely on decentralized storage.
            </p>
          </div>

          <div className="glass p-6">
            <h3 className="font-semibold text-lg mb-2">3. Mint NFT</h3>
            <p className="text-gray-400">
              Your NFT is created on blockchain and owned by you.
            </p>
          </div>

        </div>
      </div>

    </div>
    <Footer/>
     </> 
  );
};

export default MintNFT;