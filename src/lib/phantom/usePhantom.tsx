import { useCallback, useEffect, useMemo } from "react";
import { Wallet, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletReadyState,
  SignerWalletAdapter,
} from "@solana/wallet-adapter-base";
import { PublicKey } from "@solana/web3.js";

type PhantomWallet = Pick<Wallet, "readyState"> & {
  adapter: SignerWalletAdapter;
};

type UsePhantomProps = {
  publicKey: PublicKey | null;
  handleDisconnect: () => Promise<void>;
  handleConnect: () => void;
  wallet: PhantomWallet | undefined;
  noPhantom: boolean;
};

export const usePhantom = (): UsePhantomProps => {
  const { wallets, publicKey, select, disconnect } = useWallet();

  const wallet = useMemo(() => {
    return wallets.find((w) => w?.adapter.name === "Phantom") as
      | PhantomWallet
      | undefined;
  }, [wallets]);

  const noPhantom =
    !wallet ||
    [WalletReadyState.NotDetected, WalletReadyState.Unsupported].includes(
      wallet?.readyState
    );

  useEffect(() => {
    (async () => {
      if (noPhantom) return;
      if (wallet.readyState === WalletReadyState.Installed) return;
      try {
        await wallet.adapter.connect();
      } catch (e) {
        console.log(wallet.adapter, e);
      }
    })();
  }, [noPhantom, wallet]);

  const handleConnect = useCallback(() => {
    select(wallet?.adapter.name ?? null);
  }, [select, wallet?.adapter]);

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error(error);
    }
  }, [disconnect]);

  return useMemo(
    () => ({
      publicKey,
      handleDisconnect,
      handleConnect,
      wallet,
      noPhantom,
    }),
    [handleConnect, handleDisconnect, noPhantom, publicKey, wallet]
  );
};
