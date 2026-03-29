import { Link, useNavigate } from "react-router-dom";
import { useWallet } from "../../context/WalletProvider";

const Navbar = () => {
  const { account, connectWallet } = useWallet();
  const navigate = useNavigate();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <>
      {/* 🚀 V2 Upgrade Banner */}
      <div className="w-full border-b border-white/10 bg-[#0b1220] text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-center gap-2 text-gray-300">
          <span>
            Introducing{" "}
            <span className="text-white font-semibold gradient-text cursor-pointer">
              MintVerse V2
            </span>{" "}
            with{" "}
            <span className="text-indigo-400 font-medium">
              AI NFT Verification
            </span>
          </span>

          <button
            onClick={() => navigate("/v2")}
            className="ml-3 text-orange-400 font-medium hover:text-indigo-300 transition"
          >
            Try now →
          </button>
        </div>
      </div>

      <div className="w-full mb-1.5 border-b border-white/10 bg-orange-600 text-sm fade-in"></div>

      <nav className="flex justify-between items-center px-8 py-4 glass sticky top-0 z-50">
        {/* 🔮 Logo */}
        <h1 className="text-2xl font-bold gradient-text cursor-pointer">
          MintVerse
        </h1>

        {/* 📌 Menu */}
        <div className="flex gap-8 items-center text-sm font-medium">
          <Link to={"/"} className="text-gray-300 hover:text-white transition">
            Home
          </Link>
          <Link
            to={"/explore"}
            className="text-gray-300 hover:text-white transition"
          >
            Explore
          </Link>

          <Link
            to={"/mintNft"}
            className="text-gray-300 hover:text-white transition"
          >
            Mint NFT  
          </Link>



          <Link
            to={"/transcation"}
            className="text-gray-300 hover:text-white transition"
          >
             Transcation
          </Link>

          {/* 🔗 Wallet Section */}
          {account ? (
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass border border-white/10">
              {/* 🟢 Status Dot */}
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />

              {/* 👤 Address */}
              <span className="text-sm text-gray-200 font-medium">
                {formatAddress(account)}
              </span>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="btn-primary flex items-center gap-2"
            >
              Connect Wallet
            </button>
          )}

          <button
            onClick={() => navigate("/v2")}
            className="relative px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-white transition flex flex-col items-center leading-tight"
          >
            {" "}
            {/*  NEW Badge */}{" "}
            <span className="absolute -top-3 -left-3 px-2 py-[2px] text-[10px] rounded-full bg-indigo-500 text-white font-semibold tracking-wide">
              {" "}
              NEW{" "}
            </span>{" "}
            {/*  Button Text */} <span>Try V2 →</span>{" "}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
