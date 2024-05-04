import { useEffect, useMemo, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { clusterApiUrl } from "@solana/web3.js";
import { SOLANA_CLUSTER } from "./config";
import { Main } from "./components/Main";
import { TokensContextProvider } from "./lib/tokens/TokenProvider";
import { Loader } from "./components/Loader";
import "./App.css";

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  const endpoint = useMemo(() => clusterApiUrl(SOLANA_CLUSTER), []);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <TokensContextProvider>
          {showLoader && <Loader />}
          <Main />
        </TokensContextProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
