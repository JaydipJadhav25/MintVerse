import { useEffect, useState } from "react";
import axios from "axios";

interface HistoryItem {
  _id: string;
  actionType: "mint" | "transfer" | "list" | "sale";
  from?: string;
  to: string;
  tokenId: string;
  transactionHash: string;
  amount: string;
  currency: string;
  createdAt: string;
}





function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios(
          `${import.meta.env.VITE_API_URL}/nft/history`
        );
        setHistory(response.data.data); //  important fix
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const short = (addr?: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "—";


 const CONTRACT_ADDRESS = '0xBdD833DA1989F0803AE212E8BB6be260ca00F462';







  const badge = (type: string) => {
    switch (type) {
      case "mint":
        return "bg-green-500/20 text-green-400";
      case "transfer":
        return "bg-blue-500/20 text-blue-400";
      case "sale":
        return "bg-purple-500/20 text-purple-400";
      case "list":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-400">
        Loading history...
      </div>
    );
  }

  return (
    <div className="mt-10 px-4 md:px-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Activity  <span className="gradient-text">History</span>
      </h1>

      {history.length === 0 ? (
        <p className="text-center text-gray-400">No history found</p>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item._id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-800 transition"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <a href={`https://sepolia.etherscan.io/tx/${item.transactionHash}`}>
                   <span
                  className={`px-3 py-1 text-xs rounded-full font-medium cursor-pointer ${badge(
                    item.actionType
                  )}`}
                >
                  {item.actionType.toUpperCase()}
                </span>
                </a>

                <p className="text-sm text-gray-300">
                  Token #{item.tokenId}
                </p>
              </div>

              {/* CENTER */}
              <div className="text-sm text-gray-400">
                { !item.from ? short(CONTRACT_ADDRESS) : item.from} → {short(item.to)}
              </div>

              {/* RIGHT */}
              <div className="text-right text-sm text-gray-400">
                {item.amount !== "0" && (
                  <p>
                    💰 {item.amount} {item.currency}
                  </p>
                )}
                <p className="text-xs">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>

              {/* TX HASH */}
              <div className="w-full text-xs text-gray-500 break-all mt-2 md:mt-0 md:w-auto">
                Tx: {item.transactionHash.slice(0, 12)}...
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;