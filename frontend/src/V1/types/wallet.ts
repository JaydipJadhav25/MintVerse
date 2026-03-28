export interface WalletContextType {
  account: string | null;
  connectWallet: () => Promise<void>;
}