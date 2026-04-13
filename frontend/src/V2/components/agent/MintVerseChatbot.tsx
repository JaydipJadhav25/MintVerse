import { useState } from "react";
import { Send, Bot, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MintVerseChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "🚀 Welcome to MintVerse AI. Ask anything about NFTs.",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", text: input },
      { role: "ai", text: "Typing..." },
    ];

    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", text: "✨ Smart NFT response from AI" },
      ]);
    }, 1200);
  };

  return (
    <>
      {/* 🔥 Floating Button with Pulse + Glow */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 p-4 rounded-full 
          bg-gradient-to-tr from-orange-500 to-purple-600 
          shadow-[0_0_25px_rgba(255,100,0,0.6)] 
          animate-pulse z-50"
        >
          <Bot size={24} className="text-white" />
        </motion.button>
      )}

      {/* 💥 Chat Window with Boom Animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 100 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="fixed bottom-6 right-6 w-[370px] h-[520px] 
            rounded-2xl shadow-2xl overflow-hidden 
            border border-white/10 backdrop-blur-xl 
            bg-gradient-to-br from-black/80 to-gray-900/80 
            flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="bg-gradient-to-r from-orange-500 to-purple-600 p-2 rounded-full"
                >
                  <Bot size={16} className="text-white" />
                </motion.div>

                <div>
                  <h1 className="text-sm font-semibold flex items-center gap-2">
                    <span className="bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent font-bold">
                      MintVerse
                    </span>
                    <span className="text-[10px] px-2 py-[2px] rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      AI
                    </span>
                  </h1>
                  <p className="text-xs text-green-400 animate-pulse">
                    ● Online
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={() => setOpen(false)}
              >
                <X className="text-gray-400 hover:text-white" size={18} />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-end gap-2 max-w-[75%] ${
                        msg.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          msg.role === "ai" ? "bg-purple-600/20" : "bg-gray-700"
                        }`}
                      >
                        {msg.role === "ai" ? (
                          <Bot size={14} />
                        ) : (
                          <User size={14} />
                        )}
                      </div>

                      <div
                        className={`px-4 py-2 text-sm rounded-2xl backdrop-blur-md ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-lg"
                            : "bg-white/10 text-gray-200"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Suggestions */}
            <div className="px-3 pb-2 flex flex-wrap gap-2">
              {["Mint NFT", "Connect Wallet", "Gas Fees"].map((q, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setInput(q)}
                  className="text-xs bg-white/10 hover:bg-white/20 text-gray-300 px-3 py-1 rounded-full"
                >
                  {q}
                </motion.button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about NFTs..."
                className="flex-1 bg-white/10 text-white placeholder-gray-400 px-3 py-2 rounded-lg outline-none text-sm focus:ring-2 focus:ring-purple-500"
              />

              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={sendMessage}
                className="bg-gradient-to-r from-orange-500 to-purple-600 p-2 rounded-lg text-white shadow-lg"
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
