import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useWallet } from "../context/WalletProvider";
import { ethers } from "ethers";

function Transfer() {
  const [allNfts, setAllNfts] = useState<any[]>([]);
  const [selectedNft, setSelectedNft] = useState<any>(null);
  const [receiver, setReceiver] = useState("");
  const [loading, setLoading] = useState(false);

  const { account, connectWallet } = useWallet();


  
  //  Fetch NFTs
  useEffect(() => {
       
      if (!account) return; //

    async function fetchAllNfts() {
      try {
        setLoading(true);
        const response = await axios(
          `${import.meta.env.VITE_API_URL}/nft/explors`
        );

        //  Filter only current user NFTs
        const userNfts = (response?.data?.data || []).filter(
          (nft: any) =>
            nft.user?.toLowerCase() === account?.toLowerCase()
        );

        setAllNfts(userNfts);
      } catch (error) {
        console.log("error : ", error);
        toast.error("Fetch NFTs Error!");
      } finally {
        setLoading(false);
      }
    }

    fetchAllNfts();
  }, [ account ]);








  // 🔌 NOT CONNECTED UI
  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h2 className="text-3xl font-bold mb-4">Connect Wallet to Transfer NFT</h2>

        <p className="text-gray-400 mb-6 max-w-md">
          You need to connect your wallet to transfer your NFTs.
        </p>

        <button onClick={connectWallet} className="btn-primary">
          Connect Wallet
        </button>
      </div>
    );
  }




  // 🚀 Transfer Function
  const handleTransfer = async () => {


    if (!selectedNft) return toast.error("Select NFT first");
    if (!receiver) return toast.error("Enter receiver address");

    if (receiver.toLowerCase() === account.toLowerCase()) {
      return toast.error("You can't send NFT to yourself");
    }

    if (!ethers.isAddress(receiver)) {
      return toast.error("Invalid wallet address");
    }

    try {
      setLoading(true);
       
      // const tx = await contract?.safeTransferFrom(
      //   account,
      //   receiver,
      //   selectedNft.tokenId
      // );

      setTimeout(()=>{

         console.log(account , receiver , selectedNft.tokenId);

      },4000);

      toast.loading("Transferring NFT...");

      // await tx.wait();

      toast.dismiss();
      toast.success("NFT Transferred Successfully 🚀");

      // reset
      setSelectedNft(null);
      setReceiver("");

    } catch (error: any) {
      console.log(error);
      toast.error("Transfer failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-center mb-10">
         Transfer NFT
      </h1>

      {/* 🧩 NFT Selection */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Select Your NFT</h2>

        {loading ? (
          <p className="text-gray-400">Loading NFTs...</p>
        ) : allNfts.length === 0 ? (
          <p className="text-gray-400">No NFTs found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allNfts.map((nft) => (
              <div
                key={nft.tokenId}
                onClick={() => setSelectedNft(nft)}
                className={`cursor-pointer border rounded-xl p-3 transition ${
                  selectedNft?.tokenId === nft.tokenId
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-800 hover:border-gray-600"
                }`}
              >
                <img
                  src={nft.imageUrl}
                  alt="nft"
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />

                <p className="text-sm text-center">
                  Token #{nft.tokenId}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/*  Transfer Form */}
      <div className="max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Transfer Details</h2>

        {/* FROM */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">From</label>
          <input
            type="text"
            value={account}
            disabled
            className="w-full mt-1 p-2 rounded bg-gray-800 text-gray-400"
          />
        </div>

        {/* TO */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">To</label>
          <input
            type="text"
            placeholder="Enter receiver address"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-gray-800 text-white outline-none"
          />
        </div>

        {/* TOKEN */}
        <div className="mb-6">
          <label className="text-sm text-gray-400">Token ID</label>
          <input
            type="text"
            value={selectedNft?.tokenId || ""}
            disabled
            className="w-full mt-1 p-2 rounded bg-gray-800 text-gray-400"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleTransfer}
          disabled={loading}
          className="w-full btn-primary"
        >
          {loading ? "Processing..." : "Transfer NFT"}
        </button>
      </div>

      {/* 🔥 Animation Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Transferring NFT...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transfer;