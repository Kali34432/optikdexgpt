// 📁 components/WalletConnectionProvider.tsx
"use client";

import { FC, ReactNode, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet
} from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletMultiButton
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

const network = WalletAdapterNetwork.Mainnet;
const endpoint = "https://api.mainnet-beta.solana.com";

export const WalletConnectionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const wallets = useMemo(
    () => [getPhantomWallet(), getSolletWallet(), getSolflareWallet()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
