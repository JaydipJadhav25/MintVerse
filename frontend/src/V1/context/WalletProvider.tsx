import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import type { WalletContextType } from "../types/wallet";



const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({ children }: { children: any }) => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window?.ethereum) {
      alert("Install MetaMask");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum?.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });
    }
  }, []);

  return (
    <WalletContext.Provider value={{ account, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within WalletProvider");
  return context;
};