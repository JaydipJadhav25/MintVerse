import { Link } from "react-router-dom";
import { useWallet } from "../../../V1/context/WalletProvider";


const Navbar = () => {
  const { account, connectWallet } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="navbar flex justify-between items-center px-8 py-4 sticky top-0 z-50">

      {/* 🔮 Logo */}
      <h1 className="text-xl font-semibold cursor-pointer flex items-center gap-2">
        <span className="gradient-text">MintVerse</span>
        <span className="text-xs px-2 py-[2px] rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20">
          AI
        </span>
      </h1>

      {/* 📌 Menu */}
      <div className="flex gap-8 items-center text-sm font-medium">

        <Link to={"/"} className="nav-link">
          Home
        </Link>

        <Link to={"/explore"} className="nav-link">
          Explore
        </Link>

        <Link to={"/mintNft"} className="nav-link">
          Mint NFT
        </Link>

        {/* 🔗 Wallet Section */}
        {account ? (
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass border border-white/10">
            
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />

            <span className="text-sm text-gray-200 font-medium">
              {formatAddress(account)}
            </span>

          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="nav-btn flex items-center gap-2"
          >
            Connect Wallet
          </button>
        )}

      </div>
    </nav>
  );
};

export default Navbar;

