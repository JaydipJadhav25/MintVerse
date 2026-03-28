import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { motion } from "framer-motion";
import { useWallet } from "../context/WalletProvider";
// import { useNavigate } from "react-router-dom";

function Explore() {
  const [allNfts, setAllNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();

  const { account } = useWallet();

  useEffect(() => {
    async function fetchAllNfts() {
      try {
        setLoading(true);
        const response = await axios(`${import.meta.env.VITE_API_URL}/explors`);
        setAllNfts(response?.data?.data || []);
      } catch (error) {
        console.log("error : ", error);
        toast.error("fetch Nfts Error!");
      } finally {
        setLoading(false);
      }
    }
    fetchAllNfts();
  }, []);

  return (
    <>


      <div className="min-h-screen text-white px-6 py-10">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Explore <span className="gradient-text">NFTs</span>
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : allNfts.length === 0 ? (
          <p className="text-center">No NFTs found</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {allNfts.map((nft) => {
              const isOwner =
                account &&
                nft.user.toLowerCase() === account.toLowerCase();

              return (
                <motion.div
                  key={nft._id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className={`group relative rounded-2xl overflow-hidden backdrop-blur-xl 
                  bg-white/5 border cursor-pointer hover:shadow-2xl
                  ${
                    isOwner
                      ? "border-orange-400 shadow-orange-500/30"
                      : "border-white/10"
                  }`}
                >
                  {/* Owner Badge */}
                  {isOwner && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 z-10 bg-orange-500 text-xs px-3 py-1 rounded-full shadow-lg"
                    >
                      Yours
                    </motion.div>
                  )}

                   {/* Owner Badge */}
                 
                 <a href={`${nft.metadataUrl}`}> 
                     <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 left-2 z-10 text-green-700 text-xs px-3 py-1 rounded-full shadow-lg"
                    >
                     <span className="gradient-text">Verified</span>
                    </motion.div>
                 </a>
                  

                  {/* Image */}
                  <div className="overflow-hidden">
                    <motion.img
                      src={nft.imageUrl}
                      alt={nft.name}
                      className="w-full h-60 object-contain"
                      whileHover={{ scale: 1.0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h2 className="text-lg font-semibold text-white truncate">
                      {nft.name}
                    </h2>

                    <p className="text-sm text-gray-400 line-clamp-2">
                      {nft.description}
                    </p>

                    <div className="flex justify-between items-center pt-3">
                      <span className="text-purple-400 font-bold text-lg">
                        {nft.price} ETH
                      </span>

                      <span className="text-xs text-gray-500">
                        #{nft._id.slice(-4)}
                      </span>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background:
                        "linear-gradient(90deg, #a855f7, #ec4899, #f97316)",
                      filter: "blur(40px)",
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </>
  );
}

export default Explore;