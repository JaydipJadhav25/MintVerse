import { Link } from "react-router-dom";
import { useWallet } from "../../context/WalletProvider";

const Navbar = () => {
  const { account, connectWallet } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
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
      </div>
    </nav>
  );
};

export default Navbar;
