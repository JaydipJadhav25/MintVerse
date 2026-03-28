import { useState } from "react";
import type { ChangeEvent } from "react";

import axios from "axios";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
import { useWallet } from "../../V1/context/WalletProvider";
import { useContract } from "../../V1/context/useContract";
import { BitcoinIcon, Bot, FolderUp } from "lucide-react";

const MintNFTV2 = () => {
  const { account, connectWallet } = useWallet();
  const { mintNft } = useContract();

  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  Mint Handler (next step will connect blockchain)
  const handleMint = async () => {
    //check if loading ot not
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      if (!account) return;
      if (!image) {
        alert("No image selected!");
        return;
      }

      //  Create FormData
      const formData = new FormData();
      formData.append("file", image);
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("collection", form.collection);
      formData.append("user", account);

      //  Send properly
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-nft`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("response:", response.data);
      const metadataUrl: string = response?.data?.metadataUrl || "";

      //1. image uploaded on ipfs server
      toast.success("Image And MetaDate Uploaded successfully On IPFS.");

      // call to contract
      toast.warning("Nft Minting On Blockchain.....");

      const { success, tokenId, txHash } = await mintNft(metadataUrl);
      console.log(tokenId);
      if (success) {
        toast.success("You Nft Mint SuccessFully Tx Hash:" + txHash);
        //save indb  and redirect in exploer page
        navigate("/explore");
      } else {
        toast.error(" Nft Mint Error !");
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("NFT Minting Error!");
      // alert("Server Error!");
    } finally {
      setLoading(false);
    }
  };

  //  NOT CONNECTED UI
  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h2 className="text-3xl font-bold mb-4">Connect Wallet to Mint NFT</h2>

        <p className="text-gray-400 mb-6 max-w-md">
          You need to connect your wallet to start creating and minting your
          NFTs.
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
      <div className="px-6 md:px-12 py-12 max-w-6xl mx-auto">
        {/*  TITLE */}
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
              required
              type="text"
              name="name"
              placeholder="NFT Name"
              value={form.name}
              onChange={handleChange}
              className="p-3 rounded-xl bg-black/30 outline-none"
            />

            <textarea
              required
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
              disabled={loading}
              onClick={handleMint}
              className="btn-primary mt-4 cursor-pointer"
            >
              {!loading ? " Mint NFT" : "Loading...."}
            </button>
          </div>
        </div>

        {/* 📖 STEPS SECTION */}
        <div className="mt-28">
          {" "}
          <div className="text-center mb-16">
            {" "}
            <div className="badge mb-4 inline-block">Process</div>{" "}
            <h2 className="text-4xl font-bold mb-4">
              {" "}
              How NFT Minting <span className="gradient-text">Works</span>{" "}
            </h2>{" "}
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              {" "}
              A secure and intelligent pipeline that ensures your NFT is unique,
              verified, and permanently stored on decentralized
              infrastructure.{" "}
            </p>{" "}
          </div>{" "}
          <div className="grid md:grid-cols-3 gap-8">
            {" "}
            {/* STEP 1 */}{" "}
            <div className="glass p-8 text-center card-hover hover-scale">
              {" "}
              <div className="icon-circle mx-auto mb-4"> 
                <FolderUp />
                 </div>{" "}
              <h3 className="font-semibold text-lg mb-2"> Upload Asset </h3>{" "}
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {" "}
                Upload your digital asset along with metadata like name,
                description, and price to initiate the minting process.{" "}
              </p>{" "}
            </div>{" "}
            {/* STEP 2 */}{" "}
            <div className="glass p-8 text-center card-hover hover-scale">
              {" "}
              <div className="icon-circle mx-auto mb-4">
                <Bot/>
                </div>{" "}
              <h3 className="font-semibold text-lg mb-2"> AI Verification </h3>{" "}
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {" "}
                Our AI system scans your asset to detect duplicates and ensure
                uniqueness before it gets minted on blockchain.{" "}
              </p>{" "}
            </div>{" "}
            {/* STEP 3 */}{" "}
            <div className="glass p-8 text-center card-hover hover-scale">
              {" "}
              <div className="icon-circle mx-auto mb-4">
                <BitcoinIcon />
                </div>{" "}
              <h3 className="font-semibold text-lg mb-2">
                {" "}
                Mint on Blockchain{" "}
              </h3>{" "}
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {" "}
                Your NFT is securely minted using smart contracts (ERC-721),
                ensuring true ownership and transparency.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default MintNFTV2;
